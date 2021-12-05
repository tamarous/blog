# 什么是 dyld_shared_cache 
## 背景

在 iOS 应用开发过程中，必然会利用到系统提供的框架，如 UIKit、Foundation 及 GCD，这些框架都是以动态库的方式提供的，因此在应用启动的过程中，dyld 会负责将这些动态库文件加载到应用的进程空间中。在 iOS 3.1 后，为了加快应用的启动速度，dyld 将所有系统提供的框架都打包到了一个大的缓存文件中，在系统启动之后就会进行加载，这个文件就称为 `dyld_shared_cache`。之后，在加载任何 macho 镜像前，dyld 都会先尝试在 cache 里去查找，找不到的话再去进行完整的打开、映射和绑定过程。

在 OS X 中，也使用了 dyld_shared_cache，并且原始的二进制文件都存储在磁盘上，因此可以使用 `update_dyld_shared_cache` 命令来更新这些文件。在 macOS 11 之后，`update_dyld_shared_cache` 这个命令就被苹果废弃了，和 iOS 一样无法动态更新 cache 了。

我们可以利用这些缓存文件来逆向分析系统库的源码，了解系统库的执行过程。本文来介绍一下如何获取和使用这些缓存文件进行分析。

## 获取 dyld_shared_cache
### 从 ipsw 中获取
`dyld_shared_cache` 能够从 ipsw 文件中提取。在 [ipsw.me](https://ipsw.me/) 上可以下载各个型号 iPhone 的 ipsw 文件。下载之后，将该文件的后缀名改为 .zip，然后进行解压。在解压后的文件夹里，双击其中文件体积最大的 dmg 文件，然后进入 `/System/Library/Caches/com.apple.dyld/`，就可以将 `dyld_shared_cache` 复制导出了。

![16386267613890](https://tamarous-blog-1256169911.cos.ap-chengdu.myqcloud.com/2021/12/04/16386267613890.jpg)

## 还原 dyld_shared_cache

在导出后，还需要一些工具来将系统库从二进制文件中还原出来。苹果官方就提供了一个可用的工具：[dsc_extractor](https://opensource.apple.com/source/dyld/dyld-433.5/launch-cache/)，不过这个工具是位于 dyld 源码中的，需要一些额外设置才能编译出来。

首先我们先从苹果开源网站上下载 dyld 的[代码](https://opensource.apple.com/tarballs/dyld/)，我这里选择的是较旧的 `dyld-519.2.2`，之所以不选最新的版本，是由于较新的版本在编译时，会有`CodeSigningTypes.h` 和 `Diagnostics.h` 两个头文件找不到的错误。下载解压后，进入 `launch-cache` 目录，修改 `dsc_extractor.cpp` main 函数之前的 `if 0` 为 `if 1`，然后再用 clang 进行编译：
```
clang++ -o dsc_extractor ./dsc_extractor.cpp dsc_iterator.cpp
```
编译出可执行文件后，我们就可以使用此可执行文件来从 dyld_shared_cache 中导出系统库：
```
./dsc_extractor dyld_shared_cache_arm64e ./frameworks
```
![16386332421419](https://tamarous-blog-1256169911.cos.ap-chengdu.myqcloud.com/2021/12/04/16386332421419.jpg)

除了上述苹果官方提供的工具外，[DyldExtractor](https://github.com/arandomdev/DyldExtractor) 也是一个不错的工具：

```
python3 -m pip install dyldextractor
dyldex_all dyld_shared_cache_arm64e
```
在获取到系统库的二进制之后，就可以使用如 Hopper 及 IDA 这样的工具来进行逆向分析了。




