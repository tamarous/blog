(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{520:function(e,a,n){"use strict";n.r(a);var s=n(1),t=Object(s.a)({},(function(){var e=this,a=e.$createElement,n=e._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"sdwebimage-源代码剖析-多线程策略"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#sdwebimage-源代码剖析-多线程策略"}},[e._v("#")]),e._v(" SDWebImage 源代码剖析-多线程策略")]),e._v(" "),n("p",[e._v("前一篇"),n("RouterLink",{attrs:{to:"/iOS/sdwebimage_cache.html"}},[e._v("文章")]),e._v("从缓存策略的角度分析了"),n("code",[e._v("SDWebImage")]),e._v(" 的部分代码，下面从多线程的角度对它的其他模块进行分析。")],1),e._v(" "),n("p",[e._v("苹果的多线程解决方案有三种：")]),e._v(" "),n("ul",[n("li",[e._v("NSThread")]),e._v(" "),n("li",[e._v("GCD")]),e._v(" "),n("li",[e._v("NSOperation")])]),e._v(" "),n("p",[e._v("在实际开发中，我们往往只使用GCD 和NSOperation。\n关于应该如何在GCD 和NSOperation 中进行选择，StackOverflow 上已经有很多详细和深入的"),n("a",{attrs:{href:"http://stackoverflow.com/a/10375616/6552680",target:"_blank",rel:"noopener noreferrer"}},[e._v("讨论"),n("OutboundLink")],1),e._v("。本文中，我们只介绍 NSOperation 。")]),e._v(" "),n("h2",{attrs:{id:"nsoperation"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#nsoperation"}},[e._v("#")]),e._v(" NSOperation")]),e._v(" "),n("p",[e._v("NSOperation 定义在Foundation 框架中，表示一个用来完成某项工作的操作。它是一个抽象类，因此在实际使用时，必须让一个类继承它，然后实现某些方法。Foundation 为我们事先定义好了两个子类，分别是"),n("code",[e._v("NSInvocationOperation")]),e._v(" 和"),n("code",[e._v("NSBlockOperation")]),e._v("，这两个类可以直接使用，但是它们的适用场景是不同的：")]),e._v(" "),n("table",[n("thead",[n("tr",[n("th",[e._v("类")]),e._v(" "),n("th",[e._v("描述")])])]),e._v(" "),n("tbody",[n("tr",[n("td",[e._v("NSInvocationOperation")]),e._v(" "),n("td",[e._v("A class you use as-is to create an operation object based on an object and selector from your application. You can use this class in cases where you have an existing method that already performs the needed task.")])]),e._v(" "),n("tr",[n("td",[e._v("NSBlockOperation")]),e._v(" "),n("td",[e._v("A class you use as-is to execute one or more block objects concurrently. Because it can execute more than one block, a block operation object operates using a group semantic; only when all of the associated blocks have finished executing is the operation itself considered finished.")])])])]),e._v(" "),n("h3",{attrs:{id:"实现自定义的nsoperation-子类"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#实现自定义的nsoperation-子类"}},[e._v("#")]),e._v(" 实现自定义的NSOperation 子类")]),e._v(" "),n("p",[e._v("如果说上面提到的两个子类不能满足我们的需求，我们还可以自己去实现一个NSOperation 的子类。\n如果你的这个子类是非并行的，那很好办，只要实现下面两个方法，加上对取消操作的响应即可；如果子类是并行的，那稍微复杂一些，还需要重载NSOperation 中的某些方法。\n我们先看下并行和串行子类都必须实现的几个方法。")]),e._v(" "),n("h4",{attrs:{id:"每个operation-对象都应该实现的方法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#每个operation-对象都应该实现的方法"}},[e._v("#")]),e._v(" 每个operation 对象都应该实现的方法")]),e._v(" "),n("ul",[n("li",[e._v("一个自定义"),n("code",[e._v("initialization")]),e._v(" 方法")]),e._v(" "),n("li",[n("code",[e._v("main")]),e._v(" 方法")])]),e._v(" "),n("p",[n("code",[e._v("initialization")]),e._v(" 用于对operation 对象进行初始化设置，"),n("code",[e._v("main")]),e._v("用于执行具体的任务。")]),e._v(" "),n("p",[e._v("其他的方法则可以根据需要来实现，比如说：")]),e._v(" "),n("ul",[n("li",[e._v("用于在"),n("code",[e._v("main")]),e._v(" 中调用的辅助方法")]),e._v(" "),n("li",[e._v("用于设置和获取operation 对象的数据的"),n("code",[e._v("accessor")]),e._v("方法")]),e._v(" "),n("li",[e._v("用于序列化和反序列化的NSCoding 协议中的某些方法")])]),e._v(" "),n("p",[e._v("下面是一个NSOperation 子类可能的样子：")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("@interface MyNonConcurrentOperation : NSOperation\n@property id (strong) myData;\n-(id)initWithData:(id)data;\n@end\n \n@implementation MyNonConcurrentOperation\n- (id)initWithData:(id)data {\n   if (self = [super init])\n      myData = data;\n   return self;\n}\n \n-(void)main {\n   @try {\n      // Do some work on myData and report the results.\n   }\n   @catch(...) {\n      // Do not rethrow exceptions.\n   }\n}\n@end\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br"),n("span",{staticClass:"line-number"},[e._v("8")]),n("br"),n("span",{staticClass:"line-number"},[e._v("9")]),n("br"),n("span",{staticClass:"line-number"},[e._v("10")]),n("br"),n("span",{staticClass:"line-number"},[e._v("11")]),n("br"),n("span",{staticClass:"line-number"},[e._v("12")]),n("br"),n("span",{staticClass:"line-number"},[e._v("13")]),n("br"),n("span",{staticClass:"line-number"},[e._v("14")]),n("br"),n("span",{staticClass:"line-number"},[e._v("15")]),n("br"),n("span",{staticClass:"line-number"},[e._v("16")]),n("br"),n("span",{staticClass:"line-number"},[e._v("17")]),n("br"),n("span",{staticClass:"line-number"},[e._v("18")]),n("br"),n("span",{staticClass:"line-number"},[e._v("19")]),n("br"),n("span",{staticClass:"line-number"},[e._v("20")]),n("br"),n("span",{staticClass:"line-number"},[e._v("21")]),n("br")])]),n("h4",{attrs:{id:"对取消操作做出响应"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#对取消操作做出响应"}},[e._v("#")]),e._v(" 对取消操作做出响应")]),e._v(" "),n("p",[e._v("注意，上面的那个例子没有实现对取消操作的响应。而事实上，对取消事件作出响应是operation 对象的一个重要工作。当一个operation 对象被执行后，它会一直运行，直到任务完成或者是操作被取消，而取消操作甚至可能发生在任务开始执行之前。当操作被取消的时候，operation 对象需要回收已经被分配的资源，并且优雅地退出。")]),e._v(" "),n("p",[e._v("为了能对取消操作作出反应，在代码中应该周期性地调用operation 对象的"),n("code",[e._v("isCancelled")]),e._v(" 方法。更进一步地说，应该是在如下几个场景处调用此方法：")]),e._v(" "),n("ul",[n("li",[e._v("当进行任何实际性的工作时。")]),e._v(" "),n("li",[e._v("在每次循环中至少调用一次，如果每次循环的时间很久，则可以在一次循环中多次调用。这个方法本身的开销很小，因此不必担心多次调用会带来性能上的下降。")]),e._v(" "),n("li",[e._v("当取消操作很可能发生的时候。")])]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("- (void)main {\n   @try {\n      BOOL isDone = NO;\n \n      while (![self isCancelled] && !isDone) {\n          // Do some work and set isDone to YES when finished\n      }\n   }\n   @catch(...) {\n      // Do not rethrow exceptions.\n   }\n}\n\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br"),n("span",{staticClass:"line-number"},[e._v("8")]),n("br"),n("span",{staticClass:"line-number"},[e._v("9")]),n("br"),n("span",{staticClass:"line-number"},[e._v("10")]),n("br"),n("span",{staticClass:"line-number"},[e._v("11")]),n("br"),n("span",{staticClass:"line-number"},[e._v("12")]),n("br"),n("span",{staticClass:"line-number"},[e._v("13")]),n("br")])]),n("h4",{attrs:{id:"并行operation-对象的配置"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#并行operation-对象的配置"}},[e._v("#")]),e._v(" 并行operation 对象的配置")]),e._v(" "),n("blockquote",[n("p",[e._v("Operation objects execute in a synchronous manner by default—that is, they perform their task in the thread that calls their start method.")])]),e._v(" "),n("p",[e._v("下面这张表列出了并行operation 对象所需要重载的一些方法。")]),e._v(" "),n("table",[n("thead",[n("tr",[n("th",[e._v("方法")]),e._v(" "),n("th",[e._v("类型")]),e._v(" "),n("th",[e._v("描述")])])]),e._v(" "),n("tbody",[n("tr",[n("td",[e._v("start")]),e._v(" "),n("td",[e._v("必须实现")]),e._v(" "),n("td",[e._v("通常在这个方法中来设置并行任务的执行环境，如具体的线程等。这个方法是operation 对象的起始点。在这个方法中不可以调用super 的方法。")])]),e._v(" "),n("tr",[n("td",[e._v("main")]),e._v(" "),n("td",[e._v("可选的")]),e._v(" "),n("td",[e._v("在这个方法中实现具体要完成的任务。虽然实现也可以放在start 方法中来做，但是放在main 方法中可以使得设置和执行分离，使得代码的逻辑更加清晰。")])]),e._v(" "),n("tr",[n("td",[e._v("isExecuting, isFinished")]),e._v(" "),n("td",[e._v("必须实现")]),e._v(" "),n("td",[e._v("这两个方法用来向外部对象报告operation 对象的运行状态。 这两个方法的实现必须是线程安全的。")])]),e._v(" "),n("tr",[n("td",[e._v("isConcurrent")]),e._v(" "),n("td",[e._v("必须实现")]),e._v(" "),n("td",[e._v("为了确认一个operation 对象是否是并行的，需要重载这个方法，让它返回YES。")])])])]),e._v(" "),n("p",[e._v("有了以上知识作铺垫，我们来看下一个并行operation 对象应该怎么完整地实现：")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('@interface MyOperation : NSOperation {\n    BOOL        executing;\n    BOOL        finished;\n}\n- (void)completeOperation;\n@end\n \n@implementation MyOperation\n- (id)init {\n    self = [super init];\n    if (self) {\n        executing = NO;\n        finished = NO;\n    }\n    return self;\n}\n \n- (void)start {\n   // Always check for cancellation before launching the task.\n   if ([self isCancelled])\n   {\n      // Must move the operation to the finished state if it is canceled.\n      [self willChangeValueForKey:@"isFinished"];\n      finished = YES;\n      [self didChangeValueForKey:@"isFinished"];\n      return;\n   }\n \n   // If the operation is not canceled, begin executing the task.\n   [self willChangeValueForKey:@"isExecuting"];\n   \n   // 在另一个线程上执行main 方法\n   [NSThread detachNewThreadSelector:@selector(main) toTarget:self withObject:nil];\n   executing = YES;\n   [self didChangeValueForKey:@"isExecuting"];\n}\n\n- (void)main {\n   @try {\n \n       // Do the main work of the operation here.\n \n       [self completeOperation];\n   }\n   @catch(...) {\n      // Do not rethrow exceptions.\n   }\n}\n \n- (void)completeOperation {\n    [self willChangeValueForKey:@"isFinished"];\n    [self willChangeValueForKey:@"isExecuting"];\n \n    executing = NO;\n    finished = YES;\n \n    [self didChangeValueForKey:@"isExecuting"];\n    [self didChangeValueForKey:@"isFinished"];\n}\n \n \n- (BOOL)isConcurrent {\n    return YES;\n}\n\n\n- (BOOL)isExecuting {\n    return executing;\n}\n \n- (BOOL)isFinished {\n    return finished;\n}\n\n@end\n\n')])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br"),n("span",{staticClass:"line-number"},[e._v("8")]),n("br"),n("span",{staticClass:"line-number"},[e._v("9")]),n("br"),n("span",{staticClass:"line-number"},[e._v("10")]),n("br"),n("span",{staticClass:"line-number"},[e._v("11")]),n("br"),n("span",{staticClass:"line-number"},[e._v("12")]),n("br"),n("span",{staticClass:"line-number"},[e._v("13")]),n("br"),n("span",{staticClass:"line-number"},[e._v("14")]),n("br"),n("span",{staticClass:"line-number"},[e._v("15")]),n("br"),n("span",{staticClass:"line-number"},[e._v("16")]),n("br"),n("span",{staticClass:"line-number"},[e._v("17")]),n("br"),n("span",{staticClass:"line-number"},[e._v("18")]),n("br"),n("span",{staticClass:"line-number"},[e._v("19")]),n("br"),n("span",{staticClass:"line-number"},[e._v("20")]),n("br"),n("span",{staticClass:"line-number"},[e._v("21")]),n("br"),n("span",{staticClass:"line-number"},[e._v("22")]),n("br"),n("span",{staticClass:"line-number"},[e._v("23")]),n("br"),n("span",{staticClass:"line-number"},[e._v("24")]),n("br"),n("span",{staticClass:"line-number"},[e._v("25")]),n("br"),n("span",{staticClass:"line-number"},[e._v("26")]),n("br"),n("span",{staticClass:"line-number"},[e._v("27")]),n("br"),n("span",{staticClass:"line-number"},[e._v("28")]),n("br"),n("span",{staticClass:"line-number"},[e._v("29")]),n("br"),n("span",{staticClass:"line-number"},[e._v("30")]),n("br"),n("span",{staticClass:"line-number"},[e._v("31")]),n("br"),n("span",{staticClass:"line-number"},[e._v("32")]),n("br"),n("span",{staticClass:"line-number"},[e._v("33")]),n("br"),n("span",{staticClass:"line-number"},[e._v("34")]),n("br"),n("span",{staticClass:"line-number"},[e._v("35")]),n("br"),n("span",{staticClass:"line-number"},[e._v("36")]),n("br"),n("span",{staticClass:"line-number"},[e._v("37")]),n("br"),n("span",{staticClass:"line-number"},[e._v("38")]),n("br"),n("span",{staticClass:"line-number"},[e._v("39")]),n("br"),n("span",{staticClass:"line-number"},[e._v("40")]),n("br"),n("span",{staticClass:"line-number"},[e._v("41")]),n("br"),n("span",{staticClass:"line-number"},[e._v("42")]),n("br"),n("span",{staticClass:"line-number"},[e._v("43")]),n("br"),n("span",{staticClass:"line-number"},[e._v("44")]),n("br"),n("span",{staticClass:"line-number"},[e._v("45")]),n("br"),n("span",{staticClass:"line-number"},[e._v("46")]),n("br"),n("span",{staticClass:"line-number"},[e._v("47")]),n("br"),n("span",{staticClass:"line-number"},[e._v("48")]),n("br"),n("span",{staticClass:"line-number"},[e._v("49")]),n("br"),n("span",{staticClass:"line-number"},[e._v("50")]),n("br"),n("span",{staticClass:"line-number"},[e._v("51")]),n("br"),n("span",{staticClass:"line-number"},[e._v("52")]),n("br"),n("span",{staticClass:"line-number"},[e._v("53")]),n("br"),n("span",{staticClass:"line-number"},[e._v("54")]),n("br"),n("span",{staticClass:"line-number"},[e._v("55")]),n("br"),n("span",{staticClass:"line-number"},[e._v("56")]),n("br"),n("span",{staticClass:"line-number"},[e._v("57")]),n("br"),n("span",{staticClass:"line-number"},[e._v("58")]),n("br"),n("span",{staticClass:"line-number"},[e._v("59")]),n("br"),n("span",{staticClass:"line-number"},[e._v("60")]),n("br"),n("span",{staticClass:"line-number"},[e._v("61")]),n("br"),n("span",{staticClass:"line-number"},[e._v("62")]),n("br"),n("span",{staticClass:"line-number"},[e._v("63")]),n("br"),n("span",{staticClass:"line-number"},[e._v("64")]),n("br"),n("span",{staticClass:"line-number"},[e._v("65")]),n("br"),n("span",{staticClass:"line-number"},[e._v("66")]),n("br"),n("span",{staticClass:"line-number"},[e._v("67")]),n("br"),n("span",{staticClass:"line-number"},[e._v("68")]),n("br"),n("span",{staticClass:"line-number"},[e._v("69")]),n("br"),n("span",{staticClass:"line-number"},[e._v("70")]),n("br"),n("span",{staticClass:"line-number"},[e._v("71")]),n("br"),n("span",{staticClass:"line-number"},[e._v("72")]),n("br"),n("span",{staticClass:"line-number"},[e._v("73")]),n("br"),n("span",{staticClass:"line-number"},[e._v("74")]),n("br"),n("span",{staticClass:"line-number"},[e._v("75")]),n("br"),n("span",{staticClass:"line-number"},[e._v("76")]),n("br")])]),n("p",[e._v("注意：即使operation 对象是被取消的，也需要通知这个对象的观察者它已经完成了。因为如果一个operation 对象依赖于其他对象，那么它会观察其他对象的"),n("code",[e._v("isFinished")]),e._v("属性，只有当它所依赖的对象都已经发出了完成的信号后，这个对象才会开始运行。所以如果忘记发出完成通知，那么可能就有一个operation 对象永远都无法执行。")]),e._v(" "),n("h3",{attrs:{id:"自定义operation-对象的执行行为"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#自定义operation-对象的执行行为"}},[e._v("#")]),e._v(" 自定义operation 对象的执行行为")]),e._v(" "),n("h4",{attrs:{id:"配置对象间的依赖关系"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#配置对象间的依赖关系"}},[e._v("#")]),e._v(" 配置对象间的依赖关系")]),e._v(" "),n("p",[e._v("前面多次提到，一个operation 对象可能依赖于另外几个operation 对象。在它所依赖的一个operation 对象都运行完成后，这个operation 对象才可以开始运行。")]),e._v(" "),n("p",[e._v("为一个operation 对象配置依赖的操作很简单，只需要调用下面这个函数：")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[e._v("- (void) addDependency:(NSOperation *)op;\n")])])]),n("h4",{attrs:{id:"改变operation-对象的执行优先级"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#改变operation-对象的执行优先级"}},[e._v("#")]),e._v(" 改变operation 对象的执行优先级")]),e._v(" "),n("p",[e._v("对于队列中的operation 对象，它们的执行顺序取决于它们各自的优先级。更准确的说，对于那些已经ready 的operation 对象来说，优先级高的先执行，优先级低的后执行。")]),e._v(" "),n("p",[e._v("operation 对象的优先级用这个函数来设置：")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[e._v("- (void) setQueuePriority:(NSOperationQueuePriority) priority;\n")])])]),n("p",[e._v("priority 的可能取值有这几个：")]),e._v(" "),n("ul",[n("li",[e._v("NSOperationQueuePriorityVeryLow")]),e._v(" "),n("li",[e._v("NSOperationQueuePriorityLow")]),e._v(" "),n("li",[e._v("NSOperationQueuePriorityNormal")]),e._v(" "),n("li",[e._v("NSOperationQueuePriorityHigh")]),e._v(" "),n("li",[e._v("NSOperationQueuePriorityVeryHigh")])]),e._v(" "),n("h4",{attrs:{id:"设置完成时的block"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#设置完成时的block"}},[e._v("#")]),e._v(" 设置完成时的block")]),e._v(" "),n("p",[e._v("当operation 对象执行完它的任务后，可以用"),n("code",[e._v("setCompletionBlock:")]),e._v(" 这个函数来设置接下来的工作。")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[e._v("- (void) setCompletionBlock:(void ^(void))block\n")])])]),n("h3",{attrs:{id:"执行operations"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#执行operations"}},[e._v("#")]),e._v(" 执行operations")]),e._v(" "),n("p",[e._v("当完成了对operation 对象的配置后，就可以执行了。")]),e._v(" "),n("h4",{attrs:{id:"使用operationqueue"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#使用operationqueue"}},[e._v("#")]),e._v(" 使用OperationQueue")]),e._v(" "),n("p",[e._v("执行Operation 的最简单的方法是使用"),n("code",[e._v("NSOperationQueue")]),e._v(" 。它也是我们分析"),n("code",[e._v("SDWebImage")]),e._v(" 时所关注的一个核心类。")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("NSOperationQueue* aQueue = [[NSOperationQueue alloc] init];\n\n[aQueue addOperation:anOp]; // Add a single operation\n[aQueue addOperations:anArrayOfOps waitUntilFinished:NO]; // Add multiple operations\n[aQueue addOperationWithBlock:^{\n   /* Do something. */\n}];\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br")])]),n("blockquote",[n("p",[e._v("Never modify an operation object after it has been added to a queue. While waiting in a queue, the operation could start executing at any time, so changing its dependencies or the data it contains could have adverse effects. If you want to know the status of an operation, you can use the methods of the NSOperation class to determine if the operation is running, waiting to run, or already finished.")])]),e._v(" "),n("p",[e._v("如果使用"),n("code",[e._v("setMaxConcurrentOperationCount:")]),e._v(" 将一个operationQueue 的最大可并行operation 数设置为1， 那么这个队列一次只能执行一个operation。")]),e._v(" "),n("h4",{attrs:{id:"取消operations"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#取消operations"}},[e._v("#")]),e._v(" 取消operations")]),e._v(" "),n("p",[n("code",[e._v("cancelAllOperations")]),e._v(" 可以用来取消一个operationQueue 内的所有operation。")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[e._v("[operationQueue cancelAllOperations];\n")])])]),n("h4",{attrs:{id:"等待operations-完成"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#等待operations-完成"}},[e._v("#")]),e._v(" 等待operations 完成")]),e._v(" "),n("p",[e._v("在一个operation 实例上调用"),n("code",[e._v("waitUntilFinished")]),e._v("可以短暂地阻塞这个operation，直到此opeartion 执行完。但是通常应该避免这样做。尤其是不要在主线程上调用这个方法，否则可能阻塞主线程，导致程序失去响应。")]),e._v(" "),n("h4",{attrs:{id:"阻塞operation"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#阻塞operation"}},[e._v("#")]),e._v(" 阻塞operation")]),e._v(" "),n("p",[e._v("在operationQueue 上调用"),n("code",[e._v("setSuspended")]),e._v(" 可以阻塞那些还没有执行的operation，但是不会影响那些正在执行的和已经执行的operation。")]),e._v(" "),n("h2",{attrs:{id:"sdwebimage-中的实现"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#sdwebimage-中的实现"}},[e._v("#")]),e._v(" SDWebImage 中的实现")]),e._v(" "),n("p",[n("code",[e._v("SDWebImage")]),e._v(" 中，使用NSOperation 对象和GCD 的地方主要有两处，一处是在"),n("code",[e._v("SDWebImageDownloader")]),e._v(" 中使用"),n("code",[e._v("SDWebImageDownloaderOperation")]),e._v(" 来完成图片的"),n("strong",[e._v("下载")]),e._v("任务；一处是在"),n("code",[e._v("SDWebImageManager")]),e._v(" 使用"),n("code",[e._v("SDWebImageCombinedOperation")]),e._v("来完成下载后图片的"),n("strong",[e._v("缓存")]),e._v("任务。我们只分析"),n("code",[e._v("SDWebImageDownloader")]),e._v(" 中的多线程策略。")]),e._v(" "),n("h3",{attrs:{id:"sdwebimagedownloader"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#sdwebimagedownloader"}},[e._v("#")]),e._v(" SDWebImageDownloader")]),e._v(" "),n("p",[e._v("在这个类的类扩展中，有几个属性是与Operation 和OperationQueue 对象有联系的：")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("@property (strong, nonatomic, nonnull) NSOperationQueue *downloadQueue;\n@property (weak, nonatomic, nullable) NSOperation *lastAddedOperation;\n\n// This queue is used to serialize the handling of the network responses of all the download operation in a single queue\n@property (SDDispatchQueueSetterSementics, nonatomic, nullable) dispatch_queue_t barrierQueue;\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br")])]),n("p",[e._v("从名字和注释中不难猜测到它们各自的作用：")]),e._v(" "),n("ul",[n("li",[e._v("downloadQueue：用来管理 download 操作的队列。")]),e._v(" "),n("li",[e._v("lastAddedOperation：上一个被添加进队列的 operation。")]),e._v(" "),n("li",[e._v("barrierQueue：这是一个dispatch_queue_t 类型的属性，作用是串行地处理所有 download 操作的网络响应。")])]),e._v(" "),n("h4",{attrs:{id:"sdwebimagedownloaderoperation"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#sdwebimagedownloaderoperation"}},[e._v("#")]),e._v(" SDWebImageDownloaderOperation")]),e._v(" "),n("p",[n("code",[e._v("SDWebImageDownloaderOperation")]),e._v(" 是"),n("code",[e._v("NSOperation")]),e._v(" 的子类，是"),n("code",[e._v("SDWebImage")]),e._v(" 中完成下载任务的operation 对象。这个operation 对象的设计，符合我们在『实现自定义的NSOperation 子类』一节中介绍的各种要求。对于它的start 和其他方法，由于是对网络请求部分的具体实现，与本文主题无关，因此暂时不做介绍（日后若有时间，我将专门写一篇博客来介绍"),n("code",[e._v("SDWebImage")]),e._v(" 中的网络部分）。")]),e._v(" "),n("h4",{attrs:{id:"downloadqueue"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#downloadqueue"}},[e._v("#")]),e._v(" downloadQueue")]),e._v(" "),n("p",[e._v("在"),n("code",[e._v("downloadImageWithURL:options:progress:completed:")]),e._v("这个方法中，"),n("code",[e._v("SDWebImageDownloader")]),e._v(" 为每一个下载图片的请求创建一个"),n("code",[e._v("SDWebImageDownloaderOperation")]),e._v(" ，并将这个"),n("code",[e._v("SDWebImageDownloaderOperation")]),e._v(" 加入downloadQueue 中。")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("SDWebImageDownloaderOperation *operation = [[sself.operationClass alloc] initWithRequest: request inSession: sself.session options: options];\n\n\n// 根据传入的SDWebImageDownloaderOptions 来设置当前operation 的优先级\nif (options & SDWebImageDownloaderHighPriority) {\n    operation.queuePriority = NSOperationQueuePriorityHigh;\n} else if (options & SDWebImageDownloaderLowPriority) {\n    operation.queuePriority = NSOperationQueuePriorityLow;\n}\n\n[sself.downloadQueue addOperation:operation];\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br"),n("span",{staticClass:"line-number"},[e._v("8")]),n("br"),n("span",{staticClass:"line-number"},[e._v("9")]),n("br"),n("span",{staticClass:"line-number"},[e._v("10")]),n("br"),n("span",{staticClass:"line-number"},[e._v("11")]),n("br")])]),n("p",[e._v("在将operation 添加进downloadQueue 后，还可以设置operation 对象在这个队列中的执行顺序：")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("if (sself.executionOrder == SDWebImageDownloaderLIFOExecutionOrder) {\n    [sself.lastAddedOperation addDependency:operation];\n    sself.lastAddedOperation = operation;\n}\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br")])]),n("p",[e._v("downloadQueue 的默认执行顺序是")]),e._v(" "),n("ul",[n("li",[n("code",[e._v("SDWebImageDownloaderFIFOExecutionOrder")]),e._v("，也就是先入先出，其行为类似于一个队列；")])]),e._v(" "),n("p",[e._v("当执行顺序改为")]),e._v(" "),n("ul",[n("li",[n("code",[e._v("SDWebImageDownloaderLIFOExecutionOrder")]),e._v(" 时，则是后入先出，其行为类似于一个栈。"),n("code",[e._v("lastAddedOperation")]),e._v(" 就是用来记录当前栈顶的那个operation 的，当有新的operation 要进栈时，就把这个新的operation 设置为"),n("code",[e._v("lastAddedOperation")]),e._v(" 的依赖，这样的话，只有新的operation 执行完毕，"),n("code",[e._v("lastAddedOperation")]),e._v(" 才能开始执行，因此就实现了后入先出的效果。")])]),e._v(" "),n("h4",{attrs:{id:"barrierqueue"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#barrierqueue"}},[e._v("#")]),e._v(" barrierQueue")]),e._v(" "),n("p",[e._v("前面提到，"),n("code",[e._v("barrierQueue")]),e._v(" 是用来串行地处理所有的download 操作的网络响应的。关于"),n("code",[e._v("dispatch_queue_t")]),e._v(" 和"),n("code",[e._v("NSOperation")]),e._v(" 的对比，可以参见"),n("a",{attrs:{href:"http://stackoverflow.com/questions/10373331/nsoperation-vs-grand-central-dispatch",target:"_blank",rel:"noopener noreferrer"}},[e._v("这儿"),n("OutboundLink")],1),e._v("。\n我们来看下具体的操作过程是什么样子的。")]),e._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("- (nullable SDWebImageDownloadToken *)addProgressCallback:(SDWebImageDownloaderProgressBlock)progressBlock\n                                           completedBlock:(SDWebImageDownloaderCompletedBlock)completedBlock\n                                                   forURL:(nullable NSURL *)url\n                                           createCallback:(SDWebImageDownloaderOperation *(^)())createCallback {\n    // The URL will be used as the key to the callbacks dictionary so it cannot be nil. If it is nil immediately call the completed block with no image or data.\n    if (url == nil) {\n        if (completedBlock != nil) {\n            completedBlock(nil, nil, nil, NO);\n        }\n        return nil;\n    }\n\n    __block SDWebImageDownloadToken *token = nil;\n\n    dispatch_barrier_sync(self.barrierQueue, ^{\n        SDWebImageDownloaderOperation *operation = self.URLOperations[url];\n        if (!operation) {\n            operation = createCallback();\n            self.URLOperations[url] = operation;\n\n            __weak SDWebImageDownloaderOperation *woperation = operation;\n            operation.completionBlock = ^{\n              SDWebImageDownloaderOperation *soperation = woperation;\n              if (!soperation) return;\n              if (self.URLOperations[url] == soperation) {\n                  [self.URLOperations removeObjectForKey:url];\n              };\n            };\n        }\n        id downloadOperationCancelToken = [operation addHandlersForProgress:progressBlock completed:completedBlock];\n\n        token = [SDWebImageDownloadToken new];\n        token.url = url;\n        token.downloadOperationCancelToken = downloadOperationCancelToken;\n    });\n\n    return token;\n}\n\n\n- (void)cancel:(nullable SDWebImageDownloadToken *)token {\n    dispatch_barrier_async(self.barrierQueue, ^{\n        SDWebImageDownloaderOperation *operation = self.URLOperations[token.url];\n        BOOL canceled = [operation cancel:token.downloadOperationCancelToken];\n        if (canceled) {\n            [self.URLOperations removeObjectForKey:token.url];\n        }\n    });\n}\n")])]),e._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[e._v("1")]),n("br"),n("span",{staticClass:"line-number"},[e._v("2")]),n("br"),n("span",{staticClass:"line-number"},[e._v("3")]),n("br"),n("span",{staticClass:"line-number"},[e._v("4")]),n("br"),n("span",{staticClass:"line-number"},[e._v("5")]),n("br"),n("span",{staticClass:"line-number"},[e._v("6")]),n("br"),n("span",{staticClass:"line-number"},[e._v("7")]),n("br"),n("span",{staticClass:"line-number"},[e._v("8")]),n("br"),n("span",{staticClass:"line-number"},[e._v("9")]),n("br"),n("span",{staticClass:"line-number"},[e._v("10")]),n("br"),n("span",{staticClass:"line-number"},[e._v("11")]),n("br"),n("span",{staticClass:"line-number"},[e._v("12")]),n("br"),n("span",{staticClass:"line-number"},[e._v("13")]),n("br"),n("span",{staticClass:"line-number"},[e._v("14")]),n("br"),n("span",{staticClass:"line-number"},[e._v("15")]),n("br"),n("span",{staticClass:"line-number"},[e._v("16")]),n("br"),n("span",{staticClass:"line-number"},[e._v("17")]),n("br"),n("span",{staticClass:"line-number"},[e._v("18")]),n("br"),n("span",{staticClass:"line-number"},[e._v("19")]),n("br"),n("span",{staticClass:"line-number"},[e._v("20")]),n("br"),n("span",{staticClass:"line-number"},[e._v("21")]),n("br"),n("span",{staticClass:"line-number"},[e._v("22")]),n("br"),n("span",{staticClass:"line-number"},[e._v("23")]),n("br"),n("span",{staticClass:"line-number"},[e._v("24")]),n("br"),n("span",{staticClass:"line-number"},[e._v("25")]),n("br"),n("span",{staticClass:"line-number"},[e._v("26")]),n("br"),n("span",{staticClass:"line-number"},[e._v("27")]),n("br"),n("span",{staticClass:"line-number"},[e._v("28")]),n("br"),n("span",{staticClass:"line-number"},[e._v("29")]),n("br"),n("span",{staticClass:"line-number"},[e._v("30")]),n("br"),n("span",{staticClass:"line-number"},[e._v("31")]),n("br"),n("span",{staticClass:"line-number"},[e._v("32")]),n("br"),n("span",{staticClass:"line-number"},[e._v("33")]),n("br"),n("span",{staticClass:"line-number"},[e._v("34")]),n("br"),n("span",{staticClass:"line-number"},[e._v("35")]),n("br"),n("span",{staticClass:"line-number"},[e._v("36")]),n("br"),n("span",{staticClass:"line-number"},[e._v("37")]),n("br"),n("span",{staticClass:"line-number"},[e._v("38")]),n("br"),n("span",{staticClass:"line-number"},[e._v("39")]),n("br"),n("span",{staticClass:"line-number"},[e._v("40")]),n("br"),n("span",{staticClass:"line-number"},[e._v("41")]),n("br"),n("span",{staticClass:"line-number"},[e._v("42")]),n("br"),n("span",{staticClass:"line-number"},[e._v("43")]),n("br"),n("span",{staticClass:"line-number"},[e._v("44")]),n("br"),n("span",{staticClass:"line-number"},[e._v("45")]),n("br"),n("span",{staticClass:"line-number"},[e._v("46")]),n("br"),n("span",{staticClass:"line-number"},[e._v("47")]),n("br"),n("span",{staticClass:"line-number"},[e._v("48")]),n("br"),n("span",{staticClass:"line-number"},[e._v("49")]),n("br")])]),n("p",[e._v("这段代码中，"),n("code",[e._v("SDWebImageDownloader")]),e._v(" 维护了一个NSDictionary 用以将url 和url 对应的operation 联系起来。值得注意的是，在前一个方法中，使用了"),n("code",[e._v("dispatch_barrier_async")]),e._v("，在后一个方法中，则使用了"),n("code",[e._v("dispatch_barrier_sync")]),e._v("，那么这两个函数究竟有什么区别呢？")]),e._v(" "),n("p",[e._v("我们知道"),n("code",[e._v("dispatch_barrier_async")]),e._v(" 和"),n("code",[e._v("dispatch_barrier_sync")]),e._v("都是为了解决竞争问题而提出来的。举例来说，现在我们在项目中使用一个数据库，那么对数据库的操作就有读和写两种操作。假设我们需要先读两次数据库，然后再写入一个数据，然后再读出两个数据，那么显然读和写的操作是不能同时发生的，如果同时发生，就有可能造成数据错误。")]),e._v(" "),n("p",[e._v("使用"),n("code",[e._v("dispatch_barrier_(a)sync")]),e._v("，上述任务可以这样实现：")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[e._v("dispatch_async(queue, blk1_read);\ndispatch_async(queue, blk2_read);\ndispatch_async(queue, blk3_read);\ndispatch_barrier_async(queue, blk_write);\ndispatch_async(queue, blk4_read);\ndispatch_async(queue, blk5_read);\n")])])]),n("p",[n("code",[e._v("dispatch_barrier_(a)sync")]),e._v(" 就像是一个屏障一样，它确保blk_write 一定会等到blk1，blk2，blk3 全部执行完毕才开始执行，在blk_write 执行完毕后，blk4 和blk5 又正常地并行运行。")]),e._v(" "),n("p",[n("code",[e._v("sync")]),e._v(" 和"),n("code",[e._v("async")]),e._v(" 的区别体现在：将block 追加到指定的queue 中是否是同步的。如果是"),n("code",[e._v("async")]),e._v(" 的，那么"),n("code",[e._v("dispatch_barrier_async")]),e._v(" 不会等待追加操作结束，当前进程会继续进行；如果是"),n("code",[e._v("sync")]),e._v(" 的，那么"),n("code",[e._v("dispatch_barrier_async")]),e._v(" 会等待一直追加操作结束，当前进程会因此阻塞。")]),e._v(" "),n("p",[e._v("用例子来解释：")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[e._v("// A\n// step1\ndispatch_barrier_async(queue, ^{\n    step2\n});\n// step3\n\n// B\n// step4\ndispatch_barrier_sync(queue, ^{\n    // step5\n});\n// step6\n")])])]),n("p",[e._v("在A 中，step1 先执行，但是step3 可能会在step2 之前执行完，因此执行顺序可能是"),n("code",[e._v("step1->step2->step3")]),e._v("，也可能是"),n("code",[e._v("step1->step3->step2")]),e._v("；在B 中，执行的顺序则一定是"),n("code",[e._v("step4->step5->step6")]),e._v("。")]),e._v(" "),n("p",[e._v("在"),n("code",[e._v("addProgressCallback:")]),e._v("方法中，因为需要返回一个token，而这个token 是在block 中计算的，所以我们一定要等到block 的追加操作完成才可以返回，否则就会得到nil，因此需要使用"),n("code",[e._v("dispatch_barrier_sync")]),e._v("；而在"),n("code",[e._v("cancel:")]),e._v(" 方法中，不需要等待，因此使用"),n("code",[e._v("dispatch_barrier_async")]),e._v(" 就可以了。")])])}),[],!1,null,null,null);a.default=t.exports}}]);