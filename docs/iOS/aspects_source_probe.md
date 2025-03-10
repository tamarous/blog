---
category: iOS
tags:
  - 源码分析
---
# Aspects 源码分析
[Aspects](https://github.com/steipete/Aspects)是一个非常知名的用于 AOP 的 Objective-C 库，可以对类方法或者实例方法进行 Hook，虽然它的作者不推荐在生产环境下使用这个组件，但是了解 Aspects 的原理，对于我们更好地掌握 Objective-C 这门语言还是很有好处的，因此本文就来简要地分析下 Aspects 的实现细节。

## NSObject 分类

这个库里的代码不多，只有 `Aspects.h` 和 `Aspects.m` 两个文件。头文件里定义了一个 NSObject 的分类，给所有 NSObject 的子类添加了两个方法，分别用于对类方法和对类实例方法进行 Hook:

```
+ (id<AspectToken>)aspect_hookSelector:(SEL)selector
                           withOptions:(AspectOptions)options
                            usingBlock:(id)block
                                 error:(NSError **)error;

- (id<AspectToken>)aspect_hookSelector:(SEL)selector
                           withOptions:(AspectOptions)options
                            usingBlock:(id)block
                                 error:(NSError **)error;
```

options 指定了 AOP 切面执行的时机：

```
typedef NS_OPTIONS(NSUInteger, AspectOptions) {
    AspectPositionAfter   = 0,            /// 在原始方法执行后生效（默认）        
    AspectPositionInstead = 1,            /// 替换原始方法
    AspectPositionBefore  = 2,            /// 在原始方法执行前生效
    AspectOptionAutomaticRemoval = 1 << 3 /// 只执行一次
};
```
进入
```
- (id<AspectToken>)aspect_hookSelector:(SEL)selector
                      withOptions:(AspectOptions)options
                       usingBlock:(id)block
                            error:(NSError **)error {
    return aspect_add(self, selector, options, block, error);
}
```
它调用了 `aspect_add` 这个静态函数：

```
static id aspect_add(id self, SEL selector, AspectOptions options, id block, NSError **error) {
    NSCParameterAssert(self);
    NSCParameterAssert(selector);
    NSCParameterAssert(block);

    __block AspectIdentifier *identifier = nil;
    
    // 1.
    aspect_performLocked(^{
    
        // 2. 
        if (aspect_isSelectorAllowedAndTrack(self, selector, options, error)) {
            // 3
            AspectsContainer *aspectContainer = aspect_getContainerForObject(self, selector);
            // 4. 
            identifier = [AspectIdentifier identifierWithSelector:selector object:self options:options block:block error:error];
            if (identifier) {
                // 5. 
                [aspectContainer addAspect:identifier withOptions:options];

                // 6.  
                // Modify the class to allow message interception.
                aspect_prepareClassAndHookSelector(self, selector, error);
            }
        }
    });
    return identifier;
}
```
## aspect_performLocked

`aspect_performLocked` 这个方法在执行作为参数的 block 前会进行加锁操作，而在 block 执行完后进行解锁：
```
static void aspect_performLocked(dispatch_block_t block) {
    static OSSpinLock aspect_lock = OS_SPINLOCK_INIT;
    OSSpinLockLock(&aspect_lock);
    block();
    OSSpinLockUnlock(&aspect_lock);
}
```

## aspect_isSelectorAllowedAndTrack 

调用 `aspect_isSelectorAllowedAndTrack(self, selector, options, error)` 这个方法：

```
static BOOL aspect_isSelectorAllowedAndTrack(NSObject *self, SEL selector, AspectOptions options, NSError **error) {

    // `retain`，`release`，`autorelease`和`forwardInvocation`都是不允许被 hook ，它们会被加入黑名单中
    static NSSet *disallowedSelectorList;
    static dispatch_once_t pred;
    dispatch_once(&pred, ^{
        disallowedSelectorList = [NSSet setWithObjects:@"retain", @"release", @"autorelease", @"forwardInvocation:", nil];
    });

    // 如果要 Hook 的方法是以上黑名单中的四个方法中的一个，会打印出错误信息并且返回 NO
    NSString *selectorName = NSStringFromSelector(selector);
    if ([disallowedSelectorList containsObject:selectorName]) {
        NSString *errorDescription = [NSString stringWithFormat:@"Selector %@ is blacklisted.", selectorName];
        AspectError(AspectErrorSelectorBlacklisted, errorDescription);
        return NO;
    }

    // 如果 Hook 的是 dealloc 方法，并且 Hook 时机不是在 dealloc 方法执行之前，也会打印出错误信息，并且返回 NO
    AspectOptions position = options&AspectPositionFilter;
    if ([selectorName isEqualToString:@"dealloc"] && position != AspectPositionBefore) {
        NSString *errorDesc = @"AspectPositionBefore is the only valid position when hooking dealloc.";
        AspectError(AspectErrorSelectorDeallocPosition, errorDesc);
        return NO;
    }
 
 // 如果被 Hook 的类本身不能响应被 Hook 的方法，那么这里也会报错并且返回 NO
    if (![self respondsToSelector:selector] && ![self.class instancesRespondToSelector:selector]) {
        NSString *errorDesc = [NSString stringWithFormat:@"Unable to find selector -[%@ %@].", NSStringFromClass(self.class), selectorName];
        AspectError(AspectErrorDoesNotRespondToSelector, errorDesc);
        return NO;
    }

    // Search for the current class and the class hierarchy IF we are modifying a class object
    
    if (class_isMetaClass(object_getClass(self))) {
        // 如果 self 所属的类是一个元类
    
        Class klass = [self class];
        
        // aspect_getSwizzledClassesDict会返回一个全局唯一的`swizzledClassesDict`，以 Class 为键，以`AspectTracker`实例为值，下文中会介绍这个 dictionary 内的键值对是怎么添加的
        NSMutableDictionary *swizzledClassesDict = aspect_getSwizzledClassesDict();
        Class currentClass = [self class];

        AspectTracker *tracker = swizzledClassesDict[currentClass];
        if ([tracker subclassHasHookedSelectorName:selectorName]) {
            // 如果self 所属类的子类已经 Hook 了 selectorName 代表的 SEL，那么在这里就会打印出错误信息并且返回 NO
            NSSet *subclassTracker = [tracker subclassTrackersHookingSelectorName:selectorName];
            NSSet *subclassNames = [subclassTracker valueForKey:@"trackedClassName"];
            NSString *errorDescription = [NSString stringWithFormat:@"Error: %@ already hooked subclasses: %@. A method can only be hooked once per class hierarchy.", selectorName, subclassNames];
            AspectError(AspectErrorSelectorAlreadyHookedInClassHierarchy, errorDescription);
            return NO;
        }

        // 从 self 所属类的继承链上进行查找
        do {
            tracker = swizzledClassesDict[currentClass];
            // 如果继承链上的某个类的被交换的方法列表中有当前这个 SEL
            if ([tracker.selectorNames containsObject:selectorName]) {
            
                // 继承链上的这个类就是被 Hook 的那个类，说明之前已经 Hook 过它了，因此这里直接返回 YES
                if (klass == currentClass) {
                    // Already modified and topmost!
                    return YES;
                }
                
                // 继承链上的这个类不是被 Hook 的那个类，而是它的父类，那么这个方法已经被 Hook 过了，我们就不能再次进行 Hook 了，所以这里需要打印出一条错误信息，并且返回 NO
                NSString *errorDescription = [NSString stringWithFormat:@"Error: %@ already hooked in %@. A method can only be hooked once per class hierarchy.", selectorName, NSStringFromClass(currentClass)];
                AspectError(AspectErrorSelectorAlreadyHookedInClassHierarchy, errorDescription);
                return NO;
            }
        } while ((currentClass = class_getSuperclass(currentClass)));

        // Add the selector as being modified.
        currentClass = klass;
        AspectTracker *subclassTracker = nil;
        do {
            tracker = swizzledClassesDict[currentClass];
            if (!tracker) {
                // 为 self 所属的这个类创建对应的 AspectTracker
                tracker = [[AspectTracker alloc] initWithTrackedClass:currentClass];
                
                // 以 self 所属的类为键，以tracker 为值，添加到swizzledClassesDict中
                swizzledClassesDict[(id<NSCopying>)currentClass] = tracker;
            }
            if (subclassTracker) {
                [tracker addSubclassTracker:subclassTracker hookingSelectorName:selectorName];
            } else {
                [tracker.selectorNames addObject:selectorName];
            }

            // All superclasses get marked as having a subclass that is modified.
            subclassTracker = tracker;
        }while ((currentClass = class_getSuperclass(currentClass)));
	} else {
	
	   // 如果 self 所属的类不是元类，那么直接返回 YES
		return YES;
	}

    return YES;
}
```

## aspect_getContainerForObject 

以 self 和 selector 为参数，调用 `aspect_getContainerForObject` 函数，创建并返回一个 `AspectsContainer`：

```
AspectsContainer *aspectContainer = aspect_getContainerForObject(self, selector);

static AspectsContainer *aspect_getContainerForObject(NSObject *self, SEL selector) {
    NSCParameterAssert(self);
    SEL aliasSelector = aspect_aliasForSelector(selector);
    AspectsContainer *aspectContainer = objc_getAssociatedObject(self, aliasSelector);
    if (!aspectContainer) {
        aspectContainer = [AspectsContainer new];
        objc_setAssociatedObject(self, aliasSelector, aspectContainer, OBJC_ASSOCIATION_RETAIN);
    }
    return aspectContainer;
}
```
`AspectsContainer` 和 selector 是通过关联对象关联在一起的，因此这个方法里就是通过 selector 取出对应的 `AspectsContainer` 实例。

## identifierWithSelector:object:options:block:error:

创建出一个 `AspectsIdentifier` 实例：

```
+ (instancetype)identifierWithSelector:(SEL)selector object:(id)object options:(AspectOptions)options block:(id)block error:(NSError **)error {
    NSCParameterAssert(block);
    NSCParameterAssert(selector);
    NSMethodSignature *blockSignature = aspect_blockMethodSignature(block, error); // TODO: check signature compatibility, etc.
    if (!aspect_isCompatibleBlockSignature(blockSignature, object, selector, error)) {
        return nil;
    }

    AspectIdentifier *identifier = nil;
    if (blockSignature) {
        identifier = [AspectIdentifier new];
        identifier.selector = selector;
        identifier.block = block;
        identifier.blockSignature = blockSignature;
        identifier.options = options;
        identifier.object = object; // weak
    }
    return identifier;
}
```
## addAspect:withOptions:

将上一步中创建的 `AspectIdentifier` 实例添加到第3步创建的 `AspectsContainer` 中：

```
- (void)addAspect:(AspectIdentifier *)aspect withOptions:(AspectOptions)options {
    NSParameterAssert(aspect);
    NSUInteger position = options&AspectPositionFilter;
    
    // 根据options的设置，AspectIdentifier实例会被添加到AspectsContainer对应的数组里
    switch (position) {
        case AspectPositionBefore:  self.beforeAspects  = [(self.beforeAspects ?:@[]) arrayByAddingObject:aspect]; break;
        case AspectPositionInstead: self.insteadAspects = [(self.insteadAspects?:@[]) arrayByAddingObject:aspect]; break;
        case AspectPositionAfter:   self.afterAspects   = [(self.afterAspects  ?:@[]) arrayByAddingObject:aspect]; break;
    }
}
```
## aspect_prepareClassAndHookSelector

第6步是整个方法 Hook 的核心：

```
static void aspect_prepareClassAndHookSelector(NSObject *self, SEL selector, NSError **error) {
    NSCParameterAssert(selector);
    
    // 6-1 
    Class klass = aspect_hookClass(self, error);
    Method targetMethod = class_getInstanceMethod(klass, selector);
    IMP targetMethodIMP = method_getImplementation(targetMethod);
    
    // 6-2 
    if (!aspect_isMsgForwardIMP(targetMethodIMP)) {
        // Make a method alias for the existing method implementation, it not already copied.
        const char *typeEncoding = method_getTypeEncoding(targetMethod);
        
        // 6-3 
        SEL aliasSelector = aspect_aliasForSelector(selector);
        if (![klass instancesRespondToSelector:aliasSelector]) {
            // 如果第6-1步中创建出来的类不能响应第6-3步中新创建的 SEL，那么就通过class_addMethod 来给新创建出来的类添加一个方法，这个方法的 SEL 就是新创建的 SEL，IMP 和类型编码则是要被替换的方法的 IMP 和类型编码
            __unused BOOL addedAlias = class_addMethod(klass, aliasSelector, method_getImplementation(targetMethod), typeEncoding);
            NSCAssert(addedAlias, @"Original implementation for %@ is already copied to %@ on %@", NSStringFromSelector(selector), NSStringFromSelector(aliasSelector), klass);
        }

        // 6-4 
        class_replaceMethod(klass, selector, aspect_getMsgForwardIMP(self, selector), typeEncoding);
        AspectLog(@"Aspects: Installed hook for -[%@ %@].", klass, NSStringFromSelector(selector));
    }
}
```
这个方法也比较复杂，因此我们将它分成四个小步骤来分析。

第6-1步，调用 `aspect_hookClass`：
```
static Class aspect_hookClass(NSObject *self, NSError **error) {
    NSCParameterAssert(self);
    
   // 这里是比较容易混淆的地方
   // .class 方法，当 self 是一个 instance 的时候，返回 self 的类对象;
   // 当 self 是一个类对象的时候，返回它自身
   // object_getClass 方法则是获取 self 的 isa 指针指向的对象，如果self 是一个
   // instance，那么返回一个类对象;如果 self 是一个类对象，则返回一个元类

    
	Class statedClass = self.class;
	Class baseClass = object_getClass(self);
	NSString *className = NSStringFromClass(baseClass);

    // Already subclassed
    
	if ([className hasSuffix:AspectsSubclassSuffix]) {
	   // AspectsSubclassSuffix是个 static 字符串常量，也就是_Aspects_
		return baseClass;

	}else if (class_isMetaClass(baseClass)) {
        return aspect_swizzleClassInPlace((Class)self);
    }else if (statedClass != baseClass) {
        return aspect_swizzleClassInPlace(baseClass);
    }

    // 在原来的类名后加上_Aspects_后缀
	const char *subclassName = [className stringByAppendingString:AspectsSubclassSuffix].UTF8String;
	Class subclass = objc_getClass(subclassName);

	if (subclass == nil) {
	   // 创建出一个新的 Class 出来，基本步骤有下面几个：
	   // 1. 通过objc_allocateClassPair来创建一个新的子类
	   // 2. 通过class_addMethod, class_addIvar来向新的子类添加方法和实例变量
	   // 3. 通过objc_registerClassPair来向运行时系统注册这个新类
	   // 完成以上3步后就可以使用这个新建的类了
	   
	   // subclass是 baseClass 的子类，类名是subclassName
		subclass = objc_allocateClassPair(baseClass, subclassName, 0);
		if (subclass == nil) {
            NSString *errrorDesc = [NSString stringWithFormat:@"objc_allocateClassPair failed to allocate class %s.", subclassName];
            AspectError(AspectErrorFailedToAllocateClassPair, errrorDesc);
            return nil;
        }
    
      // 将新创建出来的类的forwardInvocation:方法替换成__ASPECTS_ARE_BEING_CALLED__方法，详见下面的注释
		aspect_swizzleForwardInvocation(subclass);
		// 替换subclass 的class 方法
		aspect_hookedGetClass(subclass, statedClass);
		// 替换subclass 的元类的class 方法
		aspect_hookedGetClass(object_getClass(subclass), statedClass);
		// 注册新创建出来的子类，现在可以使用了
		objc_registerClassPair(subclass);
	}

    // 将 self 所属类的类型改为我们刚刚创建出来的带有_Aspects_后缀的类
    // 这里可以通过在 Xcode 中打断点来进行验证
	object_setClass(self, subclass);
	// 返回这个子类
	return subclass;
}

static void aspect_swizzleForwardInvocation(Class klass) {
    NSCParameterAssert(klass);
    
    // class_replaceMethod的第一个参数是要进行方法替换的 Class，第二个参数是被替换方法的 SEL，第三个参数是进行替换的方法的 IMP，第四个参数是类型编码，返回值是被替换的方法原来的 IMP。
    // 如果 Class 中没有要被替换的SEL，那么这个方法和class_addMethod 就是一样的
    IMP originalImplementation = class_replaceMethod(klass, @selector(forwardInvocation:), (IMP)__ASPECTS_ARE_BEING_CALLED__, "v@:@");
    if (originalImplementation) {
        // 向 Class 中添加一个新的方法AspectsForwardInvocationSelectorName，也就是__aspects_forwardInvocation:，而它的IMP就是原来的forwardInvocation:的 IMP
        class_addMethod(klass, NSSelectorFromString(AspectsForwardInvocationSelectorName), originalImplementation, "v@:@");
    }
    AspectLog(@"Aspects: %@ is now aspect aware.", NSStringFromClass(klass));
}

static void aspect_hookedGetClass(Class class, Class statedClass) {
    NSCParameterAssert(class);
    NSCParameterAssert(statedClass);
    
   // 获得class 原来的 class 方法
	Method method = class_getInstanceMethod(class, @selector(class));
	// 创建一个新的 IMP
	IMP newIMP = imp_implementationWithBlock(^(id self) {
		return statedClass;
	});
	// 将class 的实现用我们新创建的 IMP 来替换
	class_replaceMethod(class, @selector(class), newIMP, method_getTypeEncoding(method));
}
```

第6-2步，调用了 `aspect_isMsgForwardIMP` 来判断我们要替换的 SEL 的 IMP 是不是 `_objc_msgForward`，如果不是才会进行第6-3、6-4步的操作

```
static BOOL aspect_isMsgForwardIMP(IMP impl) {
    return impl == _objc_msgForward
#if !defined(__arm64__)
    || impl == (IMP)_objc_msgForward_stret
#endif
    ;
}
```

第6-3步，创建出一个新的 selector，这个新的 selector 是由被替换的 selector 的字符串加上一个特定前缀字符串生成的，然后将它添加到上面新创建的类中：

```
static SEL aspect_aliasForSelector(SEL selector) {
    NSCParameterAssert(selector);
	return NSSelectorFromString([AspectsMessagePrefix stringByAppendingFormat:@"_%@", NSStringFromSelector(selector)]);
}
```

第6-4步，将 selector 对应的实现 IMP 替换为 `_objc_msgForward`：

```
class_replaceMethod(klass, selector, aspect_getMsgForwardIMP(self, selector), typeEncoding);

static IMP aspect_getMsgForwardIMP(NSObject *self, SEL selector) {
    IMP msgForwardIMP = _objc_msgForward;
#if !defined(__arm64__)
    // As an ugly internal runtime implementation detail in the 32bit runtime, we need to determine of the method we hook returns a struct or anything larger than id.
    // https://developer.apple.com/library/mac/documentation/DeveloperTools/Conceptual/LowLevelABI/000-Introduction/introduction.html
    // https://github.com/ReactiveCocoa/ReactiveCocoa/issues/783
    // http://infocenter.arm.com/help/topic/com.arm.doc.ihi0042e/IHI0042E_aapcs.pdf (Section 5.4)
    Method method = class_getInstanceMethod(self.class, selector);
    const char *encoding = method_getTypeEncoding(method);
    BOOL methodReturnsStructValue = encoding[0] == _C_STRUCT_B;
    if (methodReturnsStructValue) {
        @try {
            NSUInteger valueSize = 0;
            NSGetSizeAndAlignment(encoding, &valueSize, NULL);

            if (valueSize == 1 || valueSize == 2 || valueSize == 4 || valueSize == 8) {
                methodReturnsStructValue = NO;
            }
        } @catch (__unused NSException *e) {}
    }
    if (methodReturnsStructValue) {
        msgForwardIMP = (IMP)_objc_msgForward_stret;
    }
#endif
    return msgForwardIMP;
}
```

所以我们可以总结下第6步这个方法做了什么事情：

1. 创建了一个新的类，然后将这个新类的 `forwardInvocation:` 实现替换为了 `__ASPECTS_ARE_BEING_CALLED__`，并且将这个新类的类对象和元类的 class 修改为原来的类，最后将 self 所属的类修改为新类。

2. 将 selector 对应的 IMP 实现替换为 `_objc_msgForward` 或 `_objc_msgForward_stret`。

以上介绍的1~6步，完成了 Hook 的动作。

## __ASPECTS_ARE_BEING_CALLED__

在被 Hook 的对象执行被替换的方法时，就会转而执行 `__ASPECTS_ARE_BEING_CALLED__` 这个方法。

```
static void __ASPECTS_ARE_BEING_CALLED__(__unsafe_unretained NSObject *self, SEL selector, NSInvocation *invocation) {
    NSCParameterAssert(self);
    NSCParameterAssert(invocation);
    SEL originalSelector = invocation.selector;
    // 给invocation.selector 的 name 添加了aspects_前缀
	SEL aliasSelector = aspect_aliasForSelector(invocation.selector);
	
    invocation.selector = aliasSelector;
    
    // AspectsContainer 和 SEL 是在第3步中通过关联对象技术关联到一起的
    AspectsContainer *objectContainer = objc_getAssociatedObject(self, aliasSelector);
    AspectsContainer *classContainer = aspect_getContainerForClass(object_getClass(self), aliasSelector);
    AspectInfo *info = [[AspectInfo alloc] initWithInstance:self invocation:invocation];
    NSArray *aspectsToRemove = nil;

    // 在第5步中，根据 options 的设置，AspectIdentifier 会被加入到container 的 beforeAspects、insteadAspects或afterAspects中
    
    // 先执行 Hook 时机为调用原方法之前的方法
    aspect_invoke(classContainer.beforeAspects, info);
    aspect_invoke(objectContainer.beforeAspects, info);

    BOOL respondsToAlias = YES;
    if (objectContainer.insteadAspects.count || classContainer.insteadAspects.count) {
    
        //如果 option 为替代原方法，那么这里执行替代方法，原方法不执行
        aspect_invoke(classContainer.insteadAspects, info);
        aspect_invoke(objectContainer.insteadAspects, info);
    }else {
    
        // 如果 option 不是替代原方法，那么在这里去执行原来的方法
        Class klass = object_getClass(invocation.target);
        do {
            // 我们在第6-3步中向新创建出的类通过class_addMethod添加了aliasSelector
            if ((respondsToAlias = [klass instancesRespondToSelector:aliasSelector])) {
                [invocation invoke];
                break;
            }
        }while (!respondsToAlias && (klass = class_getSuperclass(klass)));
    }

    // 原方法已经执行完了，在这里执行 Hook 时机为调用原方法之后的方法
    aspect_invoke(classContainer.afterAspects, info);
    aspect_invoke(objectContainer.afterAspects, info);

    // 如果没有安装任何钩子函数（也就是没有进行方法 Hook），那么就调用原来的方法
    if (!respondsToAlias) {
        invocation.selector = originalSelector;
        SEL originalForwardInvocationSEL = NSSelectorFromString(AspectsForwardInvocationSelectorName);
        if ([self respondsToSelector:originalForwardInvocationSEL]) {
            ((void( *)(id, SEL, NSInvocation *))objc_msgSend)(self, originalForwardInvocationSEL, invocation);
        }else {
            [self doesNotRecognizeSelector:invocation.selector];
        }
    }

    [aspectsToRemove makeObjectsPerformSelector:@selector(remove)];
}
```

## 总结

下面是一个泳道图，展示了 Aspects 的完整工作流程和工作原理：

1. 首先检查类是否已被 Hook（是否已有 _Aspects_ 后缀的子类）
2. 如果未被 Hook，通过 Runtime 创建新的子类
3. 替换子类的 forwardInvocation 方法实现为 __ASPECTS_ARE_BEING_CALLED__
4. 保存原始的 forwardInvocation 实现到 __aspects_forwardInvocation:
5. 修改子类的 class 方法，使其返回原始类
6. 注册新创建的子类
7. 修改实例的 isa 指针，指向新创建的子类
8. 将原方法的实现替换为 _objc_msgForward
9. 当方法被调用时，触发消息转发，执行 __ASPECTS_ARE_BEING_CALLED__
10. 根据 Hook 时机（Before/Instead/After）执行对应的切面逻辑和原始方法

```mermaid
sequenceDiagram
    participant Client
    participant AspectIdentifier
    participant RuntimeSystem as Runtime System
    participant SubClass as 新创建的子类
    participant OriginalClass as 原始类

    Client->>AspectIdentifier: 调用 aspect_hookSelector
    
    AspectIdentifier->>RuntimeSystem: 检查类是否已被 Hook
    RuntimeSystem-->>AspectIdentifier: 返回检查结果
    
    Note over AspectIdentifier: 如果类未被 Hook，创建新的子类
    AspectIdentifier->>RuntimeSystem: objc_allocateClassPair
    RuntimeSystem-->>AspectIdentifier: 返回新创建的子类
    
    AspectIdentifier->>SubClass: 替换 forwardInvocation 为 __ASPECTS_ARE_BEING_CALLED__
    Note over SubClass: class_replaceMethod
    
    AspectIdentifier->>SubClass: 保存原始 forwardInvocation 实现
    Note over SubClass: class_addMethod(__aspects_forwardInvocation:)
    
    AspectIdentifier->>SubClass: 修改 class 方法实现
    Note over SubClass: 返回原始类而非子类
    
    AspectIdentifier->>RuntimeSystem: 注册新创建的子类
    RuntimeSystem-->>AspectIdentifier: objc_registerClassPair
    
    AspectIdentifier->>RuntimeSystem: 修改实例的 isa 指针
    RuntimeSystem->>OriginalClass: object_setClass 指向新子类
    
    AspectIdentifier->>RuntimeSystem: 替换原方法实现
    RuntimeSystem->>OriginalClass: 将方法实现替换为 _objc_msgForward
    
    Client->>SubClass: 调用被 Hook 的方法
    SubClass->>SubClass: 触发消息转发
    SubClass->>SubClass: 执行 __ASPECTS_ARE_BEING_CALLED__
    
    alt Hook 时机为 Before
        SubClass->>Client: 执行前置切面逻辑
        SubClass->>Client: 执行原始方法
    else Hook 时机为 Instead
        SubClass->>Client: 仅执行切面逻辑
    else Hook 时机为 After
        SubClass->>Client: 执行原始方法
        SubClass->>Client: 执行后置切面逻辑
    end
```





