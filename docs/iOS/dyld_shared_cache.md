# 如何分析 iOS 系统库的实现

## 背景
在 iOS 应用的 crash 治理过程中，有相当一大部分问题最终的堆栈是在系统库之中的，因此为了解决这些问题，就需要通过逆向手段来分析系统库的内在逻辑，找到 crash 发生的原因。本文介绍如何利用 `dyld_shared_cache` 和 [Hopper](https://www.hopperapp.com/) 进行分析。

## 获取系统库二进制文件

### 从真机上获取系统库
进行逆向分析的第一步，是获取系统库的二进制文件。如果你有一台 iPhone 设备，并且你要分析的 crash 就发生在这个设备或者这个设备对应的系统版本上，那么获取系统库二进制文件就非常简单，只需将设备连接到 Mac 上，然后在 Xcode 中将它选中作为 Build Target，Xcode 就会从 iPhone 中拷贝出所需的文件。

![16395763851488](https://tamarous-blog-1256169911.cos.ap-chengdu.myqcloud.com/2021/12/15/16395763851488.jpg)

这些文件会被拷贝到在 `~/Library/Developer/Xcode/iOS DeviceSupport/` 目录下，按照设备系统版本分门别类存储，如图所示：

![16395771725307](https://tamarous-blog-1256169911.cos.ap-chengdu.myqcloud.com/2021/12/15/16395771725307.jpg)

### 获取 dyld_shared_cache

但是如果你手边没有问题发生系统的设备，比如线上突发了一个老系统的 crash ，那么这时我们就需要通过 `dyld_shared_cache` 来进行提取了。

在 iOS 3.1 后，为了加快应用的启动速度，dyld 将所有系统框架的二进制都打包到了一个大的缓存文件中，在系统启动之后就会进行加载，这个文件就称为 `dyld_shared_cache`。

#### 从 ipsw 中获取
`dyld_shared_cache` 能够从 ipsw 文件中获得。在 [ipsw.me](https://ipsw.me/) 上可以下载各种 iOS 设备及各种 iOS 系统 的 ipsw 文件。下载之后，将该文件的后缀名改为 .zip，然后进行解压。在解压后的文件夹里，双击其中文件体积最大的 dmg 文件，然后进入 `/System/Library/Caches/com.apple.dyld/`，就可以将 `dyld_shared_cache` 复制导出了。

![16386267613890](https://tamarous-blog-1256169911.cos.ap-chengdu.myqcloud.com/2021/12/04/16386267613890.jpg)

### 还原 dyld_shared_cache

在导出后，还需要一些工具来将系统库从二进制文件中还原出来。苹果官方就提供了一个可用的工具：[dsc_extractor](https://opensource.apple.com/source/dyld/dyld-433.5/launch-cache/)，不过这个工具是位于 dyld 源码中的，需要一些额外设置才能编译出来。

首先我们先从苹果开源网站上下载 dyld 的[代码](https://opensource.apple.com/tarballs/dyld/)，我这里选择的是较旧的 `dyld-519.2.2`，之所以不选最新的版本，是由于较新的版本在编译时，会有`CodeSigningTypes.h` 和 `Diagnostics.h` 两个头文件找不到的错误。下载解压后，进入 `launch-cache` 目录，修改 `dsc_extractor.cpp` main 函数之前的 `if 0` 为 `if 1`，然后再用 clang 进行编译：
```
clang++ -o dsc_extractor ./dsc_extractor.cpp dsc_iterator.cpp
```
编译出可执行文件后，我们就可以使用此可执行文件来从 `dyld_shared_cache` 中导出系统库：
```
./dsc_extractor dyld_shared_cache_arm64e ./frameworks
```
![16386332421419](https://tamarous-blog-1256169911.cos.ap-chengdu.myqcloud.com/2021/12/04/16386332421419.jpg)

如果上述过程显得过于繁琐，[GitHub](https://github.com/dreampiggy/dsc_extractor/blob/master/bin/dsc_extractor) 上也有人提供了编译好的 dsc_extractor 可供直接下载使用。

除了上述苹果官方提供的工具外，[DyldExtractor](https://github.com/arandomdev/DyldExtractor) 也是一个不错的工具：

```
python3 -m pip install dyldextractor
dyldex_all dyld_shared_cache_arm64e
```
在获取到系统库的二进制之后，就可以使用如 Hopper 及 IDA 这样的工具来进行逆向分析了。

## 使用 Hopper 进行分析

Hopper 是一个知名的反汇编软件，功能非常强大，尤其是对于 Objective-C 的反汇编专门进行了优化，能够从二进制中生成较为易读的伪代码，因此对于分析 iOS 系统库执行过程来说，是一件神兵利器。Hopper 是一个收费软件，不付费的话每次可以免费使用 30 分钟，对于一般的分析问题来说也够用了。推荐大家尽量支持正版。

下面用一个真实的线上案例来介绍下 Hopper 的使用。系统堆栈如下：
```
Thread 0 name:  com.apple.main-thread
Thread 0: Crashed:
0   libobjc.A.dylib                 0x000000018ac37530 _objc_msgSend (in libobjc.A.dylib) + 16
1   UIKitCore                       0x00000001b80b6058 -[UIKeyboardImpl _keyboardBehaviorState] (in UIKitCore) + 436
2   UIKitCore                       0x00000001b80b63c4 -[UIKeyboardImpl updatedKeyBehaviors] (in UIKitCore) + 32
3   UIKitCore                       0x00000001b80b64f8 -[UIKeyboardImpl _updateKeyboardConfigurations] (in UIKitCore) + 172
4   UIKitCore                       0x00000001b809240c -[UIKeyboardImpl dealloc] (in UIKitCore) + 356
5   UIKitCore                       0x00000001b80c2ae8 -[UIKeyboardInputManagerMux setResponseDelegate:] (in UIKitCore) + 64
6   UIKitCore                       0x00000001b80a881c -[UIKeyboardImpl setInputManagerFromCurrentInputMode] (in UIKitCore) + 96
7   UIKitCore                       0x00000001b8097d4c -[UIKeyboardImpl setInputModeFromPreferences] (in UIKitCore) + 360
8   UIKitCore                       0x00000001b8091d3c -[UIKeyboardImpl initWithFrame:] (in UIKitCore) + 840
9   UIKitCore                       0x00000001b808f950 +[UIKeyboardImpl sharedInstance] (in UIKitCore) + 72
10  UIKitCore                       0x00000001b8083c50 -[UIKeyboard activate] (in UIKitCore) + 248
11  UIKitCore                       0x00000001b80fa98c -[UIKeyboardAutomatic activate] (in UIKitCore) + 124
12  UIKitCore                       0x00000001b80fa514 -[UIKeyboardAutomatic willResume:] (in UIKitCore) + 260
13  CoreFoundation                  0x000000018b9b8218 ___CFNOTIFICATIONCENTER_IS_CALLING_OUT_TO_AN_OBSERVER__ (in CoreFoundation) + 16
14  CoreFoundation                  0x000000018b9b81e4 ____CFXRegistrationPost_block_invoke (in CoreFoundation) + 60
15  CoreFoundation                  0x000000018b9b76d8 __CFXRegistrationPost (in CoreFoundation) + 388
16  CoreFoundation                  0x000000018b9b7384 ____CFXNotificationPost_block_invoke (in CoreFoundation) + 92
17  CoreFoundation                  0x000000018b930c50 -[_CFXNotificationRegistrar find:object:observer:enumerator:] (in CoreFoundation) + 1492
18  CoreFoundation                  0x000000018b9b6e34 __CFXNotificationPost (in CoreFoundation) + 692
19  Foundation                      0x000000018c3a01a0 -[NSNotificationCenter postNotificationName:object:userInfo:] (in Foundation) + 64
20  UIKitCore                       0x00000001b827cf7c -[UIApplication _sendWillEnterForegroundCallbacks] (in UIKitCore) + 228
21  UIKitCore                       0x00000001b7b27be0 -[__UICanvasLifecycleMonitor_Compatability activateEventsOnly:withContext:completion:] (in UIKitCore) + 2032
22  UIKitCore                       0x00000001b7b25b60 ___82-[_UIApplicationCanvas _transitionLifecycleStateWithTransitionContext:completion:]_block_invoke (in UIKitCore) + 740
23  UIKitCore                       0x00000001b7b25828 -[_UIApplicationCanvas _transitionLifecycleStateWithTransitionContext:completion:] (in UIKitCore) + 424
24  UIKitCore                       0x00000001b7b2a368 ___125-[_UICanvasLifecycleSettingsDiffAction performActionsForCanvas:withUpdatedScene:settingsDiff:fromSettings:transitionContext:]_block_invoke (in UIKitCore) + 216
25  UIKitCore                       0x00000001b7b2b14c __performActionsWithDelayForTransitionContext (in UIKitCore) + 108
26  UIKitCore                       0x00000001b7b2a220 -[_UICanvasLifecycleSettingsDiffAction performActionsForCanvas:withUpdatedScene:settingsDiff:fromSettings:transitionContext:] (in UIKitCore) + 240
27  UIKitCore                       0x00000001b7b2ef20 -[_UICanvas scene:didUpdateWithDiff:transitionContext:completion:] (in UIKitCore) + 356
28  UIKitCore                       0x00000001b7e5f2ac -[UIApplicationSceneClientAgent scene:handleEvent:withCompletion:] (in UIKitCore) + 460
29  FrontBoardServices              0x000000018e3c55d4 ___80-[FBSSceneImpl updater:didUpdateSettings:withDiff:transitionContext:completion:]_block_invoke_3 (in FrontBoardServices) + 220
30  libdispatch.dylib               0x000000018b4857d0 __dispatch_client_callout (in libdispatch.dylib) + 12
31  libdispatch.dylib               0x000000018b42a5d8 __dispatch_block_invoke_direct$VARIANT$mp (in libdispatch.dylib) + 220
32  FrontBoardServices              0x000000018e3ff03c ___FBSSERIALQUEUE_IS_CALLING_OUT_TO_A_BLOCK__ (in FrontBoardServices) + 36
33  FrontBoardServices              0x000000018e3fecd8 -[FBSSerialQueue _performNext] (in FrontBoardServices) + 404
34  FrontBoardServices              0x000000018e3ff290 -[FBSSerialQueue _performNextFromRunLoopSource] (in FrontBoardServices) + 48
35  CoreFoundation                  0x000000018b9d8f18 ___CFRUNLOOP_IS_CALLING_OUT_TO_A_SOURCE0_PERFORM_FUNCTION__ (in CoreFoundation) + 20
36  CoreFoundation                  0x000000018b9d8e98 ___CFRunLoopDoSource0 (in CoreFoundation) + 84
37  CoreFoundation                  0x000000018b9d8780 ___CFRunLoopDoSources0 (in CoreFoundation) + 172
38  CoreFoundation                  0x000000018b9d36bc ___CFRunLoopRun (in CoreFoundation) + 1000
39  CoreFoundation                  0x000000018b9d2fb0 _CFRunLoopRunSpecific (in CoreFoundation) + 432
40  GraphicsServices                0x000000018dbd5798 _GSEventRunModal (in GraphicsServices) + 100
41  UIKitCore                       0x00000001b8265c34 _UIApplicationMain (in UIKitCore) + 208
```

从堆栈上来看，crash 发生在给 `UIKeyboardImpl` 的实例发送 `_keyboardBehaviorState` 消息时，用户设备是 iPhone 6，对应系统版本为 12.5.5。

按照前文方法，通过 ipsw 提取出 12.5.5 系统的 `UIKitCore.dylib`，然后将其拖入 Hopper。在拖入时，会询问需要以什么文件格式打开，一般来说以默认设置打开就好。然后在左侧面板搜索栏中，输入`-[UIKeyboardImpl _keyboardBehaviorState]`，会跳转到这个方法对应的汇编代码：

![16395806199187](https://tamarous-blog-1256169911.cos.ap-chengdu.myqcloud.com/2021/12/15/16395806199187.jpg)
可以看到，这个方法的汇编实现是非常复杂的，在自动生成的注释中，有很多个 `objc_msgSend`，说明这个方法内部也有很多其他的方法调用。那么内部是对给哪个对象发送消息时 crash 的呢？

此处，我们就需要结合用户的 crash 日志来进行分析。从我们的 APM 系统上可以下载到这个用户的原始日志，以及符号解析后的日志，这两份日志都可以用来进行更为细致的分析。

原始日志如下：
```
Thread 0 name:  com.apple.main-thread
Thread 0 Crashed:
0   libobjc.A.dylib                 0x000000018ac37530 0x18ac1a000 + 120112 ((null)) + 0)
1   UIKitCore                       0x00000001b80b605c 0x1b79a9000 + 7393372 ((null)) + 0)
2   UIKitCore                       0x00000001b80b63c8 0x1b79a9000 + 7394248 ((null)) + 0)
```
从原始日志中，我们可以直接得到调用 objc_msgSend 的位置在` -[UIKeyboardImpl _keyboardBehaviorState]` 中的偏移量为 `7393372`。

或者从符号解析后的日志中：
```
Thread 0 name:  com.apple.main-thread
Thread 0: Crashed:
0   libobjc.A.dylib                 0x000000018ac37530 _objc_msgSend (in libobjc.A.dylib) + 16
1   UIKitCore                       0x00000001b80b6058 -[UIKeyboardImpl _keyboardBehaviorState] (in UIKitCore) + 436
2   UIKitCore                       0x00000001b80b63c4 -[UIKeyboardImpl updatedKeyBehaviors] (in UIKitCore) + 32
3   UIKitCore                       0x00000001b80b64f8 -[UIKeyboardImpl _updateKeyboardConfigurations] (in UIKitCore) + 172
4   UIKitCore                       0x00000001b809240c -[UIKeyboardImpl dealloc] (in UIKitCore) + 356


Binary Images:
       0x1b79a9000 -        0x1b8a8dfff  UIKitCore arm64 <005cfa346e6a3f36ba96e3db92f09362> /System/Library/PrivateFrameworks/UIKitCore.framework/UIKitCore
```
可以计算出偏移地址为

```
0x00000001b80b6058 - 0x1b79a9000 = 0x70D058 = 7393368
```
得到了偏移量之后，在 Hopper 中点击 `Navigate -> Go To File Offset`，在弹出的输入框中输入上述偏移量，就可以跳转到 crash 发生时的具体行数，如图中蓝色行所示：

![16395840700261](https://tamarous-blog-1256169911.cos.ap-chengdu.myqcloud.com/2021/12/16/16395840700261.jpg)

点击 Hopper 右上角按钮，

![16395841682241](https://tamarous-blog-1256169911.cos.ap-chengdu.myqcloud.com/2021/12/16/16395841682241.jpg)

即可将这段汇编代码转换为伪代码：

![16395843037293](https://tamarous-blog-1256169911.cos.ap-chengdu.myqcloud.com/2021/12/16/16395843037293.jpg)

从图中我们可以看到，是在向 `UIKeyboardImpl` 的 `m_candidateResultSet` 实例变量发送 `hasCandidates` 消息时崩溃了。因此我们需要继续去分析这个实例变量的赋值及使用场景，看看是不是存在野指针的可能性，其分析过程也是类似的。

以上即为使用 Hopper 来分析系统库内部实现的思路。





