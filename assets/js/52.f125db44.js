(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{408:function(e,t,s){"use strict";s.r(t);var a=s(42),o=Object(a.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"揭开runtime-的神秘面纱"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#揭开runtime-的神秘面纱"}},[e._v("#")]),e._v(" 揭开Runtime 的神秘面纱")]),e._v(" "),s("h2",{attrs:{id:"概述"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#概述"}},[e._v("#")]),e._v(" 概述")]),e._v(" "),s("h3",{attrs:{id:"动态-vs-静态语言"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#动态-vs-静态语言"}},[e._v("#")]),e._v(" 动态 vs 静态语言")]),e._v(" "),s("p",[e._v("Objective-C 是一门动态语言，刚接触Objective-C 的时候，你一定会为它使用方括号这种怪异的“函数调用”方式而感到惊讶。准确的说，Objective-C 中的如下语句")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[e._v("[receiver message]\n")])])]),s("p",[e._v("并不等同于C语言中的函数调用，而是向receiver 对象发送message 消息。C语言中的函数调用是在编译期间确定的，而Objective-C 是一门面向 Runtime 的语言，也就是说，它把消息发送的时机从编译&链接时延后到了运行时。这正是Objective-C 众多的黑魔法的源头所在。")]),e._v(" "),s("h3",{attrs:{id:"什么是objectie-c-runtime"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#什么是objectie-c-runtime"}},[e._v("#")]),e._v(" 什么是Objectie-C Runtime？")]),e._v(" "),s("p",[e._v("Objective-C Runtime 是一个主要用C和汇编语言写成的库，它为C语言添加了面向对象的一些特性。运行时要负责诸如加载类信息、进行方法分发、方法传递等一系列工作。")]),e._v(" "),s("h2",{attrs:{id:"objective-c-中的对象模型"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#objective-c-中的对象模型"}},[e._v("#")]),e._v(" Objective-C 中的对象模型")]),e._v(" "),s("p",[e._v("在介绍 Runtime 之前，我们还得先介绍一下 Objective-C 的对象模型，只有掌握了它，才能对 Objective-C 的 Runtime 有更好的理解。我们知道，C语言是不支持面向对象特性的，而 Objective-C 作为一门面向对象语言，却架构在C语言的基础上，这其中 Apple 的工程师一定做了相当多的努力。下面就让我们从Objective-C 的"),s("a",{attrs:{href:"https://opensource.apple.com/source/objc4/objc4-706/",target:"_blank",rel:"noopener noreferrer"}},[e._v("源代码"),s("OutboundLink")],1),e._v("出发，去看一看Objective-C 是怎么实现这一切的。\n在Objective-C 中，类的类型为"),s("code",[e._v("Class")]),e._v("。它实质上是一个指向结构体"),s("code",[e._v("objc_class")]),e._v("的指针。")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[e._v("typedef struct objc_class *Class;\n\nstruct objc_class {\n    Class isa;\n#if !__OBJC2__\n    Class super_class;\n    const char *name;\n    long version;\n    long info;\n    long instance_size;\n    struct objc_ivar_list *ivars;\n    struct objc_method_list **methodLists;\n    struct objc_cache *cache;\n    struct objc_protocol_list *protocols;\n#endif\n}\n")])])]),s("p",[e._v("其中有几个字段是比较重要的：")]),e._v(" "),s("ul",[s("li",[e._v("isa：指向类本身的指针。")]),e._v(" "),s("li",[e._v("super_class：指向该类的父类。如果该类已经是最顶层的根类，则super_class的值为NULL。")]),e._v(" "),s("li",[e._v("cache：用来缓存最近使用过的方法。")]),e._v(" "),s("li",[e._v("methodLists：用来存储类中的方法。")]),e._v(" "),s("li",[e._v("protocols：用来存储类所遵循的协议。")])]),e._v(" "),s("p",[e._v("isa 指针指明了当前对象所属的类。实例对象的isa 指向了该实例对象所属的类，称为"),s("strong",[e._v("类对象")]),e._v("。一个实例对象本身并不存储它能响应的消息，当我们给它发送一个消息时，Runtime 会从它的类对象的 methodslist 中进行寻找。")]),e._v(" "),s("p",[e._v("举例来说：")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[e._v('NSString *str = [NSString stringWithFormat:@"%d",1];\n')])])]),s("p",[e._v("在这里，str 是 NSString 类的一个实例，因此 str 的 isa 指针指向的就是NSString，NSString 就是一个类对象。")]),e._v(" "),s("p",[e._v("类对象呢，它本身也为一个 Objective-C 对象，因此也有一个 isa 指针。那么类对象的 isa 指针指向谁呢？\n在Objective-C 中，有一个元类（"),s("code",[e._v("metaclass")]),e._v("）的概念，可以解释这个问题。")]),e._v(" "),s("blockquote",[s("p",[e._v("The meta-class is the class for a Class object.")])]),e._v(" "),s("p",[e._v("类对象的isa 指针指向这个类对象的元类。元类本身也是一个类。当我们向一个实例对象发送消息时，Runtime 会在这个对象的类对象的 methodlists 中寻找方法；当我们向一个类对象发送消息时，Runtime 会在这个类对象的元类的 methodlists 中寻找方法实现。")]),e._v(" "),s("p",[e._v("既然元类本身也是一个类，所以元类也有一个isa 指针。\n元类的isa 指向基类（NSObject）的isa。而基类的isa 指针指向它们自身。")]),e._v(" "),s("h3",{attrs:{id:"objc-method-与objc-method-list"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#objc-method-与objc-method-list"}},[e._v("#")]),e._v(" objc_method 与objc_method_list")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[e._v("struct objc_method {\n    SEL method_name; // 方法的签名\n    char *method_types; // 方法参数的类型\n    IMP method_imp; // 方法的指针\n}\n")])])]),s("p",[e._v("关于SEL 和IMP 的关系，可以参考下"),s("RouterLink",{attrs:{to:"/iOS/www.cocoawithlove.com/2008/02/imp-of-current-method.html"}},[e._v("这篇文章")]),e._v("。简而言之，SEL 和 IMP 是一一对应的关系，SEL 是方法的名称，而 IMP 则是实际的方法实现的指针。类的消息分发表会把 SEL 和 IMP 进行一一映射，使得 Runtime 在进行消息分发时，可以依据 SEL 找到对应的 IMP，也就是找到真正的方法实现。")],1),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[e._v("struct objc_method_list {\n    struct objc_method_list *obsolete;\n    int method_count;\n#ifdef __LP64__\n    int space;\n#endif\n    struct objc_method method_list[1];\n}\n")])])]),s("p",[e._v("从成员上看，"),s("code",[e._v("objc_method_list")]),e._v("其实就是一个存储"),s("code",[e._v("objc_method")]),e._v("对象的可变长度的数组。")]),e._v(" "),s("h2",{attrs:{id:"消息传递机制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#消息传递机制"}},[e._v("#")]),e._v(" 消息传递机制")]),e._v(" "),s("h3",{attrs:{id:"正常的消息分发过程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#正常的消息分发过程"}},[e._v("#")]),e._v(" 正常的消息分发过程")]),e._v(" "),s("p",[e._v("在Objective-C 中，消息直到运行时才会被绑定到对应的方法上。编译器会将[receiver selector]这种消息表达式转换为一个"),s("code",[e._v("objc_msgSend")]),e._v("调用，而receiver 和selector 被当作参数传入该函数中：")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[e._v("objc_msgSend(receiver, selector)\n")])])]),s("p",[e._v("objc_msgSend的函数原型如下：")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[e._v("objc_msgSend(id self, SEL op, ...);\n")])])]),s("p",[e._v("如果消息表达式中有更多参数，那么这些参数也都会被传入"),s("code",[e._v("objc_msgSend")]),e._v("函数中：")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[e._v("objc_msgSend(receiver, selector, arg1, arg2,...)\n")])])]),s("p",[e._v("消息分发的关键就在于编译器为每个类和对象建立的结构体。每个结构体都包含了两个关键元素：")]),e._v(" "),s("ul",[s("li",[e._v("上文提到过的isa 指针。")]),e._v(" "),s("li",[e._v("一个class dispatch table。这个表中的每个条目将某个方法的 SEL 和该方法实现的地址 IMP 相联系，然后记录在表中。")])]),e._v(" "),s("p",[e._v("当一个新的对象被创建时，先分配给这个对象一块内存，然后对它进行初始化。"),s("code",[e._v("isa")]),e._v("指针给予了对象访问它自身的类及其父类的能力。")]),e._v(" "),s("p",[s("img",{attrs:{src:"https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/ObjcRuntimeGuide/Art/messaging1.gif",alt:"Messaging Framework"}})]),e._v(" "),s("p",[e._v("当发送一条消息"),s("code",[e._v("[receiver selector]")]),e._v("时，如果receiver 是一个实例对象：")]),e._v(" "),s("ol",[s("li",[e._v("通过receiver 的isa 指针找到receiver 的类对象；")]),e._v(" "),s("li",[e._v("在receiver 的类的methodLists 中寻找对应的selector；")]),e._v(" "),s("li",[e._v("如果receiver 的类中没有selector，那么就继续在receiver 的superclass 中进行寻找；")]),e._v(" "),s("li",[e._v("一旦找到这个selector，就去执行此方法对应的IMP。")])]),e._v(" "),s("p",[e._v("如果receiver 是一个类对象，那么所有的查找都是在类对象的元类中进行的。\n用流程图来表示如下：")]),e._v(" "),s("div",{staticClass:"language-flow extra-class"},[s("pre",{pre:!0,attrs:{class:"language-flow"}},[s("code",[e._v("st"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=>")]),e._v("start"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" 开始\ne"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=>")]),e._v("end"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" 结束\nop1"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=>")]),e._v("operation"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" 通过isa 寻找到"),s("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("class")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token class-name"}},[e._v("op2")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=>")]),e._v("operation"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" 寻找selector\nop3"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=>")]),e._v("operation"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" 执行selector 的"),s("span",{pre:!0,attrs:{class:"token constant"}},[e._v("IMP")]),e._v("\ncon"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=>")]),e._v("condition"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" 是否找到？\n\nst"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("-")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v("op1"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("-")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v("op2"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("-")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v("con\n"),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("con")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("yes"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("-")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v("op3"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("-")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v("e\n"),s("span",{pre:!0,attrs:{class:"token function"}},[e._v("con")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),e._v("no"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("-")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v("op1\n")])])]),s("p",[e._v("为了加速消息分发的过程，Runtime 使用了一个叫做cache的指针来缓存selector 和IMP 。当下一次调用的时候，Runtime 就会首先在cache 中进行查找，如果cache 里面没有，才会到methodLists 中查找方法。")]),e._v(" "),s("h3",{attrs:{id:"使用隐藏参数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#使用隐藏参数"}},[e._v("#")]),e._v(" 使用隐藏参数")]),e._v(" "),s("p",[e._v("在上节中，我们提到编译器会将receiver 和selector 以及其他附加参数当作参数传入"),s("code",[e._v("objc_msgSend")]),e._v("中，其中receiver 和 selector 是以一种隐藏的方式来进行传递的。虽然没有明确地在方法实现中进行定义，但是它们会在编译时被添加进方法实现中。在方法实现中，也可以引用它们。self 被用来引用receiver，而_cmd 则用来引用selector。")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[e._v("- strange {\n    id target = getTheReceiver();\n    SEL method = getTheMethod();\n    if (target == self || method == _cmd) {\n        return nil;\n    } \n    return [target performSelector: method];\n}\n")])])]),s("h3",{attrs:{id:"获得一个方法的地址"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#获得一个方法的地址"}},[e._v("#")]),e._v(" 获得一个方法的地址")]),e._v(" "),s("p",[e._v("当某一方法在一个过程中被大量多次重复调用时，我们可以先去获得这个方法的地址然后把它当作一个函数来进行直接调用，这样可以避免每次消息分发时的开销。")]),e._v(" "),s("p",[e._v("通过使用一个NSObject 中定义的方法"),s("code",[e._v("methodForSelector:")]),e._v("，我们可以获得一个指向方法实现的指针，然后使用这个指针来调用该过程。"),s("code",[e._v("methodForSelector:")]),e._v("返回的指针必须被转化为合适的函数类型。")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[e._v("void (*setter)(id, SEL, BOOL);\nint i;\n\nsetter = (void (*)(id, SEL, BOOL))[target methodForSelector:@selector(setFilled:)];\nfor(i = 0;i < 1000;i++) {\n    setter(targetList[i], @selector(setFilled:), YES);\n}\n")])])]),s("h2",{attrs:{id:"消息转发机制"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#消息转发机制"}},[e._v("#")]),e._v(" 消息转发机制")]),e._v(" "),s("p",[e._v("如果一个对象不能处理某个消息，那么通常会引发一个"),s("code",[e._v("unrecognized selector sent to...")]),e._v("的异常。但是在抛出这个异常之前，Runtime 会给你三次处理该错误的机会。")]),e._v(" "),s("ul",[s("li",[e._v("Method resolution")]),e._v(" "),s("li",[e._v("Fast forwarding")]),e._v(" "),s("li",[e._v("Normal forwarding")])]),e._v(" "),s("h3",{attrs:{id:"dynamic-method-resolution"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dynamic-method-resolution"}},[e._v("#")]),e._v(" Dynamic Method Resolution")]),e._v(" "),s("p",[e._v("假设我们给一个类 MyClass的实例发送"),s("code",[e._v("resolveThisMethodDynamically")]),e._v("，而 MyClass 并没有实现这个方法，那么可以像这样使用"),s("code",[e._v("resolveInstanceMethod:")]),e._v("或是"),s("code",[e._v("resolveClassMethod:")]),e._v("来提供一个函数实现：")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[e._v('@implementation MyClass\n+ (BOOL) resolveInstanceMethod:(SEL) aSEL {\n    if (aSEL == @selector(resolveThisMethodDynamically)) {\n        class_addMethod([self class], aSEL, (IMP)dynamicMethodIMP, "v@:");\n        return YES;\n    }\n    return [super resolveInstanceMethod: aSEL];\n}\n@end\n')])])]),s("p",[e._v("Runtime 会将"),s("code",[e._v("dynamicMethodIMP")]),e._v("这个函数添加到MyClass 的方法中。")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[e._v("void dynamicMethodIMP(id self, SEL _cmd) {\n    // implementation\n}\n")])])]),s("p",[e._v("在iOS 4.3以后，可以使用block 来快速创建一个IMP：")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[e._v("IMP dynamicIMP = imp_implementationWithBlock:(^(id _self) {\n    // implementation\n});\n")])])]),s("p",[e._v("因此上面的程序可以简化为：")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[e._v('class_addMethod([self class], aSEL, dynamicIMP, "v@:");\n')])])]),s("p",[e._v("如果没有提供一个方法，那么resolveXX 方法就会返回NO，Runtime 就会转向下一步：Fast Forwarding。")]),e._v(" "),s("h3",{attrs:{id:"fast-forwarding"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#fast-forwarding"}},[e._v("#")]),e._v(" Fast Forwarding")]),e._v(" "),s("p",[e._v("在这个时候，Runtime 试图将这个selector 转发给另外一个对象来进行处理：")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[e._v("-(id) forwardingTargetForSelector:(SEL) aSEL {\n    if ([SecondObject respondToSelector: aSEL]) {\n        return SecondObject;\n    }\n    return [super forwardingTargetForSelector: aSEL];\n}\n")])])]),s("p",[e._v("只要这个方法返回的不是nil或者self，整个消息发送的过程就会在 SecondObject 上重新启动。否则就会继续进行Normal Forwarding。")]),e._v(" "),s("h3",{attrs:{id:"normal-forwarding"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#normal-forwarding"}},[e._v("#")]),e._v(" Normal Forwarding")]),e._v(" "),s("p",[e._v("当事情真的进行到这一步的时候，就要启用完整的消息转发机制了。\n首先Runtime 会发送"),s("code",[e._v("methodSignatureForSelector:")]),e._v("消息获得函数的参数和返回值类型，如果返回值为nil，运行时就会发出一个"),s("code",[e._v("doesNotRecognizeSelector:")]),e._v("消息，然后程序就挂掉了。如果这返回的是一个函数签名，Runtime 就会创建一个NSInvocation 对象，这个对象实际上就是对aSEL的描述，包括aSEL的selector以及各种参数等信息，之后发送"),s("code",[e._v("forwardInvocation")]),e._v("消息给receiver，即目标对象。")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[e._v("- （void) forwardInvocation:(NSInvocation *)anInvocation {\n    if ([someOtherObject respondsToSelector:[anInvocation selector]]) {\n        [anInvocation invokeWithTarget: someOtherObject];\n    } else {\n        [super forwardInvocation: anInvocation];\n    }\n}\n")])])]),s("p",[e._v("然后在"),s("code",[e._v("someObject")]),e._v("中会从头进行消息查找与分发工作。")]),e._v(" "),s("h2",{attrs:{id:"操纵类的实现"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#操纵类的实现"}},[e._v("#")]),e._v(" 操纵类的实现")]),e._v(" "),s("h3",{attrs:{id:"与类有关的函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#与类有关的函数"}},[e._v("#")]),e._v(" 与类有关的函数")]),e._v(" "),s("p",[e._v("Runtime 中以class 开头的函数都是用来直接对类进行操作的。我将这些方法按照目的分为了以下几类：用来查询的，用来判断的，用来拷贝的，用来添加的，用于控制类的生命周期的等等。")]),e._v(" "),s("h4",{attrs:{id:"查询函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#查询函数"}},[e._v("#")]),e._v(" 查询函数")]),e._v(" "),s("blockquote",[s("p",[e._v("const char *class_getName(Class cls);")])]),e._v(" "),s("ul",[s("li",[e._v("获得类的名字。如果传入的cls 为nil，则返回“nil”，否则返回cls->name。")])]),e._v(" "),s("blockquote",[s("p",[e._v("Class class_getSuperclass(Class cls);")])]),e._v(" "),s("ul",[s("li",[s("p",[e._v("获得传入的cls 的超类。")])]),e._v(" "),s("li",[s("blockquote",[s("p",[e._v("size_t class_getInstanceSize(Class cls);")])])]),e._v(" "),s("li",[s("p",[e._v("获得类中实例对象的大小。")])])]),e._v(" "),s("blockquote",[s("p",[e._v("Ivar class_getInstanceVariable(Class cls, const char *name);")])]),e._v(" "),s("ul",[s("li",[e._v("获得类中的某个以name 指定的实例成员。")])]),e._v(" "),s("blockquote",[s("p",[e._v("Ivar class_getClassVariable(Class cls, const char *name);")])]),e._v(" "),s("ul",[s("li",[e._v("获得类中的某个以name 指定的类成员。")])]),e._v(" "),s("blockquote",[s("p",[e._v("Method class_getInstanceMethod(Class cls, SEL name);")])]),e._v(" "),s("ul",[s("li",[e._v("获得类中的某个名为name的实例方法。")])]),e._v(" "),s("blockquote",[s("p",[e._v("Method class_getClassMethod(Class cls, SEL name);")])]),e._v(" "),s("ul",[s("li",[e._v("获得类中某个名为name 的类方法。")])]),e._v(" "),s("blockquote",[s("p",[e._v("IMP class_getMethodImplementation(Class cls, SEL name);")])]),e._v(" "),s("ul",[s("li",[e._v("获得类中的某个名为name 的方法的具体实现。")])]),e._v(" "),s("blockquote",[s("p",[e._v("objc_property_t class_getProperty(Class cls, const char *name);")])]),e._v(" "),s("ul",[s("li",[e._v("获得类中的某个名为name 的属性。")])]),e._v(" "),s("h4",{attrs:{id:"判断函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#判断函数"}},[e._v("#")]),e._v(" 判断函数")]),e._v(" "),s("blockquote",[s("p",[e._v("BOOL class_isMetaClass(Class cls);")])]),e._v(" "),s("ul",[s("li",[e._v("判断传入的cls 是否是一个元类。")])]),e._v(" "),s("blockquote",[s("p",[e._v("BOOl class_respondsToSelector(Class cls, SEL sel);")])]),e._v(" "),s("ul",[s("li",[e._v("判断某个类的实例能否响应某个特定的选择子。")])]),e._v(" "),s("blockquote",[s("p",[e._v("BOOL class_conformsToProtocol(Class cls, Protocol *protocol);")])]),e._v(" "),s("ul",[s("li",[e._v("判断某个类是否遵循了特定协议。")])]),e._v(" "),s("h4",{attrs:{id:"拷贝函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#拷贝函数"}},[e._v("#")]),e._v(" 拷贝函数")]),e._v(" "),s("blockquote",[s("p",[e._v("Ivar *class_copyIvarList(Class cls, unsigned int *outCount);")])]),e._v(" "),s("ul",[s("li",[e._v("返回一个数组，这个数组中的元素是指向类中实例成员变量的指针。一个元素对应一个成员变量。")])]),e._v(" "),s("blockquote",[s("p",[e._v("Method *class_copyMethodList(Class cls, unsigned int *outCount);")])]),e._v(" "),s("ul",[s("li",[e._v("返回一个数组，这个数组中的元素是指向类中的实例方法的指针。一个元素对应一个实例方法。")])]),e._v(" "),s("blockquote",[s("p",[e._v("objc_property_t *class_copyPropertyList(Class cls, unsigned int *outCount);")])]),e._v(" "),s("ul",[s("li",[e._v("返回一个数组，这个数组中的元素是指向类中的属性的指针。一个元素对应一个属性。")])]),e._v(" "),s("blockquote",[s("p",[e._v("Protocol * __unsafe_unretained *class_copyProtocolList(Class cls, unsigned int *outCount);")])]),e._v(" "),s("ul",[s("li",[e._v("返回一个数组，这个数组中的元素是指向类所遵循的协议的指针。一个元素对应一个协议。")])]),e._v(" "),s("p",[e._v("以上函数中的outCount 的值，是所返回的数组的大小。在使用完这些数组后，必须使用free()来释放掉数组的内存空间。")]),e._v(" "),s("h4",{attrs:{id:"添加函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#添加函数"}},[e._v("#")]),e._v(" 添加函数")]),e._v(" "),s("blockquote",[s("p",[e._v("BOOL class_addMethod(Class cls, SEL name, IMP imp,\nconst char *types);")])]),e._v(" "),s("ul",[s("li",[e._v("向一个类中添加方法。如果添加成功了就返回YES，否则返回NO。")])]),e._v(" "),s("blockquote",[s("p",[e._v("IMP class_replaceMethod(Class cls, SEL name, IMP imp,\nconst char *types);")])]),e._v(" "),s("ul",[s("li",[e._v("更换一个类中的已有方法的实现。name 是要更换的方法的选择子，imp 是新的方法的实现。types 是方法的参数。返回的是被替换的方法的实现。")])]),e._v(" "),s("blockquote",[s("p",[e._v("BOOL class_addIvar(Class cls, const char *name, size_t size,\nuint8_t alignment, const char *types);")])]),e._v(" "),s("ul",[s("li",[e._v("向一个类中添加某个实例变量。要注意的是，这个方法只能用在"),s("code",[e._v("objc_allocateClassPair")]),e._v("和    "),s("code",[e._v("objc_registerClassPair")]),e._v("两个函数调用之间。不能用这个方法向一个已经存在的类添加实例变量，因为已经存在的类的内存布局已经固定了。这也是我们"),s("strong",[e._v("不能在分类中向一个类添加属性")]),e._v("的原因。")])]),e._v(" "),s("blockquote",[s("p",[e._v("BOOL class_addProtocol(Class cls, Protocol *protocol);")])]),e._v(" "),s("ul",[s("li",[e._v("向一个类添加某个协议。")])]),e._v(" "),s("blockquote",[s("p",[e._v("BOOL class_addProperty(Class cls, const char *name, const objc_property_attribute_t *attributes, unsigned int attributeCount);")])]),e._v(" "),s("ul",[s("li",[e._v("向一个类中添加某个属性。attributes是这个属性应该有的特性，详见"),s("a",{attrs:{href:"http://www.tamarous.com/2016/05/22/objectivec-zhong-de-shu-xing/",target:"_blank",rel:"noopener noreferrer"}},[e._v("这里"),s("OutboundLink")],1),e._v("。attributesCount 是特性的数量。")])]),e._v(" "),s("blockquote",[s("p",[e._v("void class_replaceProperty(Class cls, const char *name, const objc_property_attribute_t *attributes, unsigned int attributeCount);")])]),e._v(" "),s("ul",[s("li",[e._v("更换某个类中的现有属性。使用方法与上一个方法类似。")])]),e._v(" "),s("h4",{attrs:{id:"类的生命周期函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#类的生命周期函数"}},[e._v("#")]),e._v(" 类的生命周期函数")]),e._v(" "),s("blockquote",[s("p",[e._v("id class_createInstance(Class cls, size_t extraBytes);")])]),e._v(" "),s("ul",[s("li",[e._v("用于创建类的实例。返回成功创建的这个实例。extraBytes是想在这个类中添加的额外实例变量的大小。")])]),e._v(" "),s("blockquote",[s("p",[e._v("void *objc_destructInstance(id obj);")])]),e._v(" "),s("ul",[s("li",[e._v("用于销毁类的实例。CF和其他一些底层类会在垃圾回收环境下调用这个类（此处存疑）。")])]),e._v(" "),s("blockquote",[s("p",[e._v("Class objc_allocateClassPair(Class superclass, const char *name,\nsize_t extraBytes);")])]),e._v(" "),s("ul",[s("li",[e._v("用来创建一个新的类及其元类。superclass 制定了要创建的这个类的父类。name 是要创建的类的名字。extraBytes 通常设置为0。返回的是新创建的类，或者是nil。")]),e._v(" "),s("li",[e._v("在创建了新的类之后，可以通过调用"),s("code",[e._v("class_addMethod")]),e._v(" 和 "),s("code",[e._v("class_addIvar")]),e._v("来为这个新类添加方法及实例变量。在添加完之后，调用"),s("code",[e._v("objc_registerClassPair")]),e._v("。这样这个新类就可以使用了。")]),e._v(" "),s("li",[e._v("实例方法应该被添加到类中，类方法应该被添加到类的元类中。")])]),e._v(" "),s("blockquote",[s("p",[e._v("void objc_registerClassPair(Class cls);")])]),e._v(" "),s("ul",[s("li",[e._v("注册一个刚刚创建的类。只有在这之后，这个类才可以被使用。")])]),e._v(" "),s("h3",{attrs:{id:"与method-有关的函数"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#与method-有关的函数"}},[e._v("#")]),e._v(" 与Method 有关的函数")]),e._v(" "),s("p",[e._v("与Method 有关的函数很多，但是我们在这只关心一个函数：")]),e._v(" "),s("blockquote",[s("p",[e._v("void method_exchangeImplementations(Method m1, Method m2);")])]),e._v(" "),s("p",[e._v("可以用这个函数来交换两个方法的实现。Effective Objective-C 在条款13中举了一个例子：用自定义的方法来交换NSString 中的"),s("code",[e._v("lowercaseString")]),e._v("实现。假设这个自定义的方法名为"),s("code",[e._v("eoc_myLowercaseString")]),e._v("，位于NSString 的一个分类中：")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[e._v('- (NSString *) eoc_myLowercaseString {\n    NSString *lowercase =   [self eoc_myLowercaseString];\n    NSLog(@"%@ => %@",self, lowercase);\n    return lowercase;\n}\n')])])]),s("p",[e._v("实现交换的代码如下：")]),e._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",[s("code",[e._v("Method original = class_getInstanceMethod([NSString class], @selector(lowercaseString));\nMethod swapped = class_getInstanceMethod([NSString class], @selector(eoc_myLowercaseString));\n\nmethod_exchangeImplementations(original, swapped);\n")])])]),s("h2",{attrs:{id:"小结"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#小结"}},[e._v("#")]),e._v(" 小结")]),e._v(" "),s("p",[e._v("Objective-C 中的Runtime 的知识点很多，而且不管是在面试还是在实际工作中都有着超高的出场率。因此掌握Runtime 的原理和用途非常有必要。")]),e._v(" "),s("h3",{attrs:{id:"reference"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#reference"}},[e._v("#")]),e._v(" Reference:")]),e._v(" "),s("ul",[s("li",[s("RouterLink",{attrs:{to:"/iOS/southpeak.github.io/2014/10/25/objective-c-Runtime-1/"}},[e._v("Objective-C Runtime运行时之一：类与对象")])],1),e._v(" "),s("li",[s("RouterLink",{attrs:{to:"/iOS/tech.glowing.com/cn/objective-c-Runtime/"}},[e._v("Objective-C Runtime")])],1),e._v(" "),s("li",[s("a",{attrs:{href:"https://developer.apple.com/library/content/documentation/Cocoa/Conceptual/ObjCRuntimeGuide/Introduction/Introduction.html#//apple_ref/doc/uid/TP40008048-CH1-SW1",target:"_blank",rel:"noopener noreferrer"}},[e._v("Objective-C Runtime Programming Guide"),s("OutboundLink")],1)]),e._v(" "),s("li",[e._v("Effective Objective-C，#12 理解消息转发机制")]),e._v(" "),s("li",[s("a",{attrs:{href:"https://www.cocoawithlove.com/2010/01/what-is-meta-class-in-objective-c.html",target:"_blank",rel:"noopener noreferrer"}},[e._v("What is a meta-class in Objective-C?"),s("OutboundLink")],1)])])])}),[],!1,null,null,null);t.default=o.exports}}]);