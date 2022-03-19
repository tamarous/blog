---
category: iOS
tags:
  - 源码分析
---
# Stinger 源码分析

## 前言

[前文](./aspects_source_probe.md)分析过 `Aspects` 实现 AOP 的原理，而由饿了么开源的组件 [Stinger](https://github.com/eleme/Stinger)同样是一个用于 AOP 的组件，并且饿了么宣称 `Stinger` 在性能上能够吊打 `Aspects`，并且给出了测试的数据。那么 `Stinger` 究竟是如何实现性能的飞跃的呢？让我们一起来探究一下。

> 本文分析时的 `Stinger` 版本为 [1.0.0](https://github.com/eleme/Stinger/tree/1.0.0)。

## 接口设计

`Stinger` 提供了同 `Aspects` 类似的接口，分别用于 Hook 一个类以及 Hook 一个实例对象：
 ```
 @interface NSObject (Stinger)
 
#pragma mark - For specific class
+ (STHookResult)st_hookInstanceMethod:(SEL)sel option:(STOption)option usingIdentifier:(STIdentifier)identifier withBlock:(id)block;
+ (STHookResult)st_hookClassMethod:(SEL)sel option:(STOption)option usingIdentifier:(STIdentifier)identifier withBlock:(id)block;

#pragma mark - For specific instance
- (STHookResult)st_hookInstanceMethod:(SEL)sel option:(STOption)option usingIdentifier:(STIdentifier)identifier withBlock:(id)block;

@end
```
### STOption
`STOption` 用于设置 AOP 切面逻辑的执行时机及签名校验：
```
typedef NS_OPTIONS(NSInteger, STOption) {
  STOptionAfter = 0,     // 在原方法调用后执行
  STOptionInstead = 1,   // 替换原方法
  STOptionBefore = 2,    // 在原方法调用前执行
  STOptionAutomaticRemoval = 1 << 3, // Hook 逻辑只执行一次，第二次及以后都等同于调用原方法
  STOptionWeakCheckSignature = 1 << 16, // 弱校验模式
};
```
在默认情况下，原方法和 hook block 的方法签名应该是完全相同的。
```
  //argument count
  if (strictCheck && methodSignature.numberOfArguments != blockSignature.numberOfArguments) {
    NSCAssert(NO, @"count of arguments isn't equal. Class: (%@), SEL: (%@), Identifier: (%@)", cls, NSStringFromSelector(sel), identifier);
    return NO;
  };
  if (strictCheck) {
    // from loc 2.
    for (NSInteger i = 2; i < methodSignature.numberOfArguments; i++) {
      const char *methodType = [methodSignature getArgumentTypeAtIndex:i];
      const char *blockType = [blockSignature getArgumentTypeAtIndex:i];
      if (!methodType || !blockType || methodType[0] != blockType[0]) {
        NSCAssert(NO, @"argument (%zd) type isn't equal. Class: (%@), SEL: (%@), Identifier: (%@)", i, cls, NSStringFromSelector(sel), identifier);
        return NO;
      }
    }
  }
```
当 `STOptionWeakCheckSignature` 选项开启时，`Stinger` 内部只会检查第一个参数和返回值的类型。
### STHookResult
`STHookResult`表示 Hook 的结果，有以下几种取值：
```
typedef NS_ENUM(NSInteger, STHookResult) {
  STHookResultSuccuss = 1, // fix typo
  STHookResultSuccess = 1,
  STHookResultErrorMethodNotFound = -1,
  STHookResultErrorBlockNotMatched = -2,
  STHookResultErrorIDExisted = -3,
  STHookResultOther = -4,
};
```
### Hook 一个类
> 当 Hook 的对象是一个类的时候，Hook 逻辑对于这个类的所有实例都生效。

Hook 一个类时，实质是调用 `hookMethod` 这个静态方法，当 Hook 的为实例方法时，传入类对象本身，当 Hook 的为类方法时，传入类的元类。
```
+ (STHookResult)st_hookInstanceMethod:(SEL)sel option:(STOption)option usingIdentifier:(STIdentifier)identifier withBlock:(id)block {
  return hookMethod(self, sel, option, identifier, block);
}

+ (STHookResult)st_hookClassMethod:(SEL)sel option:(STOption)option usingIdentifier:(STIdentifier)identifier withBlock:(id)block {
  return hookMethod(object_getClass(self), sel, option, identifier, block);
}
```

### Hook 一个类的实例
> 当 Hook 的对象是一个类的实例的时候，Hook 逻辑仅对这个特定的实例对象生效。

```
- (STHookResult)st_hookInstanceMethod:(SEL)sel option:(STOption)option usingIdentifier:(STIdentifier)identifier withBlock:(id)block {
  @synchronized(self) {
    Class stSubClass = getSTSubClass(self);
    if (!stSubClass) return STHookResultOther;
    
    STHookResult hookMethodResult = hookMethod(stSubClass, sel, option, identifier, block);
    if (hookMethodResult != STHookResultSuccess) return hookMethodResult;
    if (!objc_getAssociatedObject(self, STSubClassKey)) {
      object_setClass(self, stSubClass);
      objc_setAssociatedObject(self, STSubClassKey, stSubClass, OBJC_ASSOCIATION_ASSIGN);
    }
    
    id<STHookInfoPool> instanceHookInfoPool = st_getHookInfoPool(self, sel);
    if (!instanceHookInfoPool) {
      instanceHookInfoPool = [STHookInfoPool poolWithTypeEncoding:nil originalIMP:NULL selector:sel];
      st_setHookInfoPool(self, sel, instanceHookInfoPool);
    }
    
    STHookInfo *instanceHookInfo = [STHookInfo infoWithOption:option withIdentifier:identifier withBlock:block];
    return [instanceHookInfoPool addInfo:instanceHookInfo] ? STHookResultSuccess : STHookResultErrorIDExisted;
  }
}
```
Hook 类实例的时候，由于目的是只让 Hook 逻辑对于这个特定的实例生效，那么其实只要将这个实例的类对象通过 runtime 修改为一个唯一的类，就可以将逻辑转换为 Hook 类对象的方法，因此其核心同样是 `hookMethod` 方法。

## hookMethod
如前文所述，`hookMethod` 是 `Stinger` 的核心，它的实现如下：
```
NS_INLINE STHookResult hookMethod(Class hookedCls, SEL sel, STOption option, STIdentifier identifier, id block) {
  NSCParameterAssert(hookedCls);
  NSCParameterAssert(sel);
  NSCParameterAssert(identifier);
  NSCParameterAssert(block);
  Method m = class_getInstanceMethod(hookedCls, sel);
  NSCAssert(m, @"SEL (%@) doesn't has a imp in Class (%@) originally", NSStringFromSelector(sel), hookedCls);
  if (!m) return STHookResultErrorMethodNotFound;
  const char * typeEncoding = method_getTypeEncoding(m);
  NSMethodSignature *methodSignature = [NSMethodSignature signatureWithObjCTypes:typeEncoding];
  NSMethodSignature *blockSignature = st_getSignatureForBlock(block);

  if (!isMatched(methodSignature, blockSignature, option, hookedCls, sel, identifier)) {
    return STHookResultErrorBlockNotMatched;
  }
  
  IMP originalImp = method_getImplementation(m);
  @synchronized(hookedCls) {
    id<STHookInfoPool> hookInfoPool = st_getHookInfoPool(hookedCls, sel);
    if (!hookInfoPool) {
      hookInfoPool = [STHookInfoPool poolWithTypeEncoding:[NSString stringWithUTF8String:typeEncoding] originalIMP:NULL selector:sel];
      hookInfoPool.hookedCls = hookedCls;
      hookInfoPool.statedCls = [hookedCls class];
      
      IMP stingerIMP = [hookInfoPool stingerIMP];
      hookInfoPool.originalIMP = originalImp;
      if (!class_addMethod(hookedCls, sel, stingerIMP, typeEncoding)) {
        class_replaceMethod(hookedCls, sel, stingerIMP, typeEncoding);
      }
      
      st_setHookInfoPool(hookedCls, sel, hookInfoPool);
    }
    if (st_isIntanceHookCls(hookedCls)) {
      return STHookResultSuccess;
    } else {
      STHookInfo *hookInfo = [STHookInfo infoWithOption:option withIdentifier:identifier withBlock:block];
      return [hookInfoPool addInfo:hookInfo] ? STHookResultSuccess :  STHookResultErrorIDExisted;
    }
  }
}
```
粗略看来，这个方法内部的逻辑和 `Method Swizzling` 的步骤基本上类似，首先拿到被 hook 的 selector 的原始实现 originalImp，然后通过一个类 `STHookInfoPool` 的实例 hookInfoPool 拿到 stingerIMP，之后通过 `class_addMethod` 和 `class_replaceMethod` 来交换 selector 对应的实现。
hookInfoPool 实例，先尝试通过 hookedClass 和 selector 来获取：

```
id<STHookInfoPool> st_getHookInfoPool(id obj, SEL key) {
  NSCParameterAssert(obj);
  NSCParameterAssert(key);
  return objc_getAssociatedObject(obj, NSSelectorFromString([NSString stringWithFormat:@"%@%@", STSelectorPrefix, NSStringFromSelector(key)]));
}
```

如果获得不到，则传入 selector 和 selector 对应的原方法的 IMP 的 type encoding 和 selector 来创建一个新的实例，并保存类对象和类的元类对象：
```
// STHookInfoPool.m
+ (instancetype)poolWithTypeEncoding:(NSString *)typeEncoding originalIMP:(IMP)imp selector:(SEL)sel {
  STHookInfoPool *pool = [[STHookInfoPool alloc] init];
  pool.typeEncoding = typeEncoding;
  pool.originalIMP = imp;
  pool.sel = sel;
  return pool;
}

- (instancetype)init {
  if (self = [super init]) {
    _beforeInfos = [[NSMutableArray alloc] init];
    _insteadInfo = nil;
    _afterInfos = [[NSMutableArray alloc] init];
    _semaphore = dispatch_semaphore_create(1);
  }
  return self;
}

- (void)setTypeEncoding:(NSString *)typeEncoding {
  _typeEncoding = typeEncoding;
  _signature = typeEncoding ? [NSMethodSignature signatureWithObjCTypes:[typeEncoding UTF8String]]: nil;
  _argsCount = _signature.numberOfArguments;
}

- (void)setHookedCls:(Class)hookedCls {
  _hookedCls = hookedCls;
  _isInstanceHook = st_isIntanceHookCls(hookedCls);
}

- (void)setSel:(SEL)sel {
  _sel = sel;
  _uniqueKey = NSSelectorFromString([NSString stringWithFormat:@"%@%@", STSelectorPrefix, NSStringFromSelector(sel)]);
}
```

在方法交换后，将 hookInfoPool 对象关联到 hookedClass 上。
```
void st_setHookInfoPool(id obj, SEL key, id<STHookInfoPool> infoPool) {
  NSCParameterAssert(obj);
  NSCParameterAssert(key);
  objc_setAssociatedObject(obj, NSSelectorFromString([STSelectorPrefix stringByAppendingString:NSStringFromSelector(key)]), infoPool, OBJC_ASSOCIATION_RETAIN);
}
```
最后，通过 `st_isInstanceHook` 来判断是不是对 hookedCls 类实例的 hook，是的话直接返回，不是的话，生成一个 hookInfo 实例，加入到 hookInfoPool 中。

## libffi
在继续分析之前，我们先停下来，简单了解下 `libffi` 的使用。

FFI（Foreign Function Interface，外部函数接口）允许在一门语言中动态地去调用另一门语言的代码，而[libffi](https://github.com/libffi/libffi) 就是一种提供最底层支持、面向架构的 FFI。让我们通过两个例子来看下如何使用 `libffi`。

### 直接调用 C 方法
```
int hello(int a , int b) {
    int x = a + b;
    return x;
}

int main() {
    ffi_cif cif;
    ffi_type *argTypes[] = {&ffi_type_sint, &ffi_type_sint};
    ffi_prep_cif(&cif, FFI_DEFAULT_ABI, 2, &ffi_type_sint, argTypes);

    int a = 123;
    int b = 456;
    void *args[] = {&a, &b};
    int retValue;
    ffi_call(&cif, (void *)hello, &retValue, args);
    
    return 0;
}
```
总共分为以下几步：
1. 首先先生成一个 `ffi_cif` 对象 ，这个对象相当于 Objective-C 中的 Method Signature。
2. argsTypes 数组用于告诉 cif 每个参数的类型。
3. 调用 `ffi_prep_cif` 来告诉 cif，参数的数量、返回值的类型。
4. 最后调用 `ffi_call`，传入参数、保存返回值的地址和被调用方法的地址。

### 通用闭包函数
```
/* Acts like puts with the file given at time of enclosure. */
void puts_binding(ffi_cif *cif, unsigned int *ret, void* args[],
    FILE *stream)
{
  *ret = fputs(*(char **)args[0], stream);
}

int main()
{
  ffi_cif cif;
  ffi_type *args[1];
  ffi_closure *closure;

  int (*bound_puts)(char *);
  int rc;

  /* Allocate closure and bound_puts */
  closure = ffi_closure_alloc(sizeof(ffi_closure), &bound_puts);

  if (closure)
  {
    /* Initialize the argument info vectors */
    args[0] = &ffi_type_pointer;

    /* Initialize the cif */
    if (ffi_prep_cif(&cif, FFI_DEFAULT_ABI, 1,
          &ffi_type_uint, args) == FFI_OK)
    {
      /* Initialize the closure, setting stream to stdout */
      if (ffi_prep_closure_loc(closure, &cif, puts_binding,
            stdout, bound_puts) == FFI_OK)
      {
        printf("Before bound_put()\n");
        rc = bound_puts("Hello World!");
        /* rc now holds the result of the call to fputs */
      }
    }
  }

  /* Deallocate both closure, and bound_puts */
  ffi_closure_free(closure);

  return 0;
}
```
在上述的例子中，通过`ffi_prep_closure_loc`创建了一个新的指向 puts_binding 方法的函数指针 bounds_puts，并且将 stdout 作为 user_data 传入到了 puts_binding 中。
```
fi_prep_closure_loc (ffi_closure *closure, ffi_cif *cif, void (*fun) (ffi_cif *cif, void *ret, void **args, void *user_data), void *user_data, void *codeloc)
```
实际上，可以将任意数据通过 user_data 塞到 fun 中。比如我们可以自定义一个类型，存储想要 hook 的方法的原始实现地址、方法参数、返回值等信息，那么我们就可以在 fun 中通过 user_data 拿到被 hook 方法的原始实现地址、方法参数及返回值，然后通过前面介绍的 `ffi_call` 来进行调用，这样便实现了一个能 hook 各种函数调用的通用闭包方法。

## stingerIMP
stingerIMP 这个方法的实现就是对上文中 `libffi` 的利用：
```
// STHookInfoPool.m
- (StingerIMP)stingerIMP {
  if (_stingerIMP == NULL) {
    ffi_type *returnType = st_ffiTypeWithType(self.signature.methodReturnType);
    NSCAssert(returnType, @"can't find a ffi_type of %s", self.signature.methodReturnType);
    
    NSUInteger argumentCount = self->_argsCount;
    _args = malloc(sizeof(ffi_type *) * argumentCount) ;
    
    for (int i = 0; i < argumentCount; i++) {
      ffi_type* current_ffi_type = st_ffiTypeWithType([self.signature getArgumentTypeAtIndex:i]);
      NSCAssert(current_ffi_type, @"can't find a ffi_type of %s", [self.signature getArgumentTypeAtIndex:i]);
      _args[i] = current_ffi_type;
    }
    
    _closure = ffi_closure_alloc(sizeof(ffi_closure), (void **)&_stingerIMP);
    
    if(ffi_prep_cif(&_cif, FFI_DEFAULT_ABI, (unsigned int)argumentCount, returnType, _args) == FFI_OK) {
      if (ffi_prep_closure_loc(_closure, &_cif, _st_ffi_function, (__bridge void *)(self), _stingerIMP) != FFI_OK) {
        NSCAssert(NO, @"genarate IMP failed");
      }
    } else {
      NSCAssert(NO, @"OMG");
    }
    
    [self _genarateBlockCif];
  }
  return _stingerIMP;
}
```
前面我们分析过，被 hook 的 selector 的实现已经被替换为 stingerIMP，那么在调用selector 时，会调用 stingerIMP，进而调用 `_st_ffi_function`。

## _st_ffi_function
```
NS_INLINE void _st_ffi_function(ffi_cif *cif, void *ret, void **args, void *userdata) {
  STHookInfoPool *hookedClassInfoPool = (__bridge STHookInfoPool *)userdata;
  STHookInfoPool *statedClassInfoPool = nil;
  STHookInfoPool *instanceInfoPool = nil;
  
  void **innerArgs = alloca(hookedClassInfoPool->_argsCount * sizeof(*innerArgs));
  void **slf = args[0];
  
  if (hookedClassInfoPool->_isInstanceHook) {
    statedClassInfoPool = _st_fast_get_HookInfoPool(hookedClassInfoPool->_statedCls, hookedClassInfoPool->_uniqueKey);
    instanceInfoPool = _st_fast_get_HookInfoPool((__bridge id)(*slf), hookedClassInfoPool->_uniqueKey);
  }

  StingerParams *params = [[StingerParams alloc] initWithType:hookedClassInfoPool->_typeEncoding originalIMP:hookedClassInfoPool->_originalIMP sel:hookedClassInfoPool->_sel args:args argumentTypes:hookedClassInfoPool->_signature.argumentTypes];
  innerArgs[1] = &params;
  
  memcpy(innerArgs + 2, args + 2, (hookedClassInfoPool->_argsCount - 2) * sizeof(*args));
  
  // before hooks
  if (REAL_STATED_CALSS_INFO_POOL) ffi_call_infos(REAL_STATED_CALSS_INFO_POOL->_beforeInfos);
  if (instanceInfoPool) ffi_call_infos(instanceInfoPool->_beforeInfos);

  // instead hooks
  if (instanceInfoPool && instanceInfoPool->_insteadInfo) {
    innerArgs[0] = &(((STHookInfo *)(instanceInfoPool->_insteadInfo))->_block);
    ffi_call(&(hookedClassInfoPool->_blockCif), _st_impForBlock(((STHookInfo *)(instanceInfoPool->_insteadInfo))->_block), ret, innerArgs);
    if (((STHookInfo *)(instanceInfoPool->_insteadInfo))->automaticRemoval) {
      instanceInfoPool->_insteadInfo = nil;
    }
  } else if (REAL_STATED_CALSS_INFO_POOL && REAL_STATED_CALSS_INFO_POOL->_insteadInfo) {
    innerArgs[0] = &(((STHookInfo *)(REAL_STATED_CALSS_INFO_POOL->_insteadInfo))->_block);
    ffi_call(&(hookedClassInfoPool->_blockCif), _st_impForBlock(((STHookInfo *)(REAL_STATED_CALSS_INFO_POOL->_insteadInfo))->_block), ret, innerArgs);
    if (((STHookInfo *)(REAL_STATED_CALSS_INFO_POOL->_insteadInfo))->automaticRemoval) {
      REAL_STATED_CALSS_INFO_POOL->_insteadInfo = nil;
    }
  } else {
    /// original IMP
    /// if original selector is hooked by aspects or jspatch.., which use message-forwarding, invoke invacation.
    BOOL isForward = hookedClassInfoPool->_originalIMP == _objc_msgForward
#if !defined(__arm64__)
    || hookedClassInfoPool->_originalIMP == (IMP)_objc_msgForward_stret
#endif
    ;
    if (isForward) {
      [params invokeAndGetOriginalRetValue:ret];
    } else {
      ffi_call(cif, (void (*)(void))hookedClassInfoPool->_originalIMP, ret, args);
    }
  }
  // after hooks
  if (REAL_STATED_CALSS_INFO_POOL) ffi_call_infos(REAL_STATED_CALSS_INFO_POOL->_afterInfos);
  if (instanceInfoPool) ffi_call_infos(instanceInfoPool->_afterInfos);
}
```
粗略来说，该方法就是从 hookInfoPool 中依次取出 beforeInfos、insteadInfos、afterInfos，然后遍历 infos 数组，从 info 中取出 block，然后通过 `ffi_call` 来调用各个 block。

`ffi_call_infos` 是 `Stinger` 内部定义的宏：
```
#define REAL_STATED_CALSS_INFO_POOL (statedClassInfoPool ?: hookedClassInfoPool)

#define ffi_call_infos(infos) \
for (NSUInteger i = 0; i < infos.count; i++) { \
  STHookInfo *info = infos[i];\
  innerArgs[0] = &(info->_block); \
  ffi_call(&(hookedClassInfoPool->_blockCif), _st_impForBlock(info->_block), NULL, innerArgs); \
  if (info->automaticRemoval) { \
    [(NSMutableArray *)infos removeObject:info]; \
    i--; \
  } \
}  \
```
在调用原始实现的时候，可以看到 `Stinger` 已经兼容了 `Aspects` 及 `JSPatch` 这种将被 selector 的原始实现交换为 `objc_msgForward` 的情况：

```
/// original IMP
    /// if original selector is hooked by aspects or jspatch.., which use message-forwarding, invoke invacation.
    BOOL isForward = hookedClassInfoPool->_originalIMP == _objc_msgForward
#if !defined(__arm64__)
    || hookedClassInfoPool->_originalIMP == (IMP)_objc_msgForward_stret
#endif
    ;
    if (isForward) {
      [params invokeAndGetOriginalRetValue:ret];
    } else {
      ffi_call(cif, (void (*)(void))hookedClassInfoPool->_originalIMP, ret, args);
    }
```

## 总结
总结下 `Stinger` 实现 AOP 的基本原理：
1. 将被 hook 的 selector 的实现交换为 stingerIMP。
2. 使用 `libffi`的创建函数闭包的能力，将 stingerIMP 和 `_st_ffi_function` 绑定在一起。
3. 执行被 hook 的 selector 的时候，转为执行 stingerIMP 方法，进而执行 `_st_ffi_function`。
4. 在 `_st_ffi_function` 中，通过 `ffi_call`来执行被 hook 的 selector 对应的原始实现，并根据设置在合适时机执行切面的逻辑。

可以看出，`Stinger` 在执行 hook 逻辑时，并没有走 `Objective-C` 的消息转发的流程，因此它在性能上要显著优于 Aspects。