(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{405:function(e,a,n){"use strict";n.r(a);var o=n(42),r=Object(o.a)({},(function(){var e=this,a=e.$createElement,n=e._self._c||a;return n("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[n("h1",{attrs:{id:"sdwebimage-源代码剖析-缓存策略"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#sdwebimage-源代码剖析-缓存策略"}},[e._v("#")]),e._v(" SDWebImage 源代码剖析-缓存策略")]),e._v(" "),n("p",[e._v("今天我们将对另外一个在iOS 开发中广泛使用的库的源代码进行分析，这个库就是鼎鼎大名的"),n("code",[e._v("SDWebImage")]),e._v("。")]),e._v(" "),n("h2",{attrs:{id:"使用方法"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#使用方法"}},[e._v("#")]),e._v(" 使用方法")]),e._v(" "),n("p",[n("code",[e._v("SDWebImage")]),e._v(" 的使用非常简洁，往往可以用一行代码来完成图片设置工作。下面列出一些常用设置方法。")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("- (void) sd_setImageWithURL:(nullable NSURL *) url;\n\n- (void) sd_setImageWithURL:(nullable NSURL *) url placeholderImage:(nullable UIImage *) placeholder;\n\n- (void) sd_setImageWithURL:(nullable NSURL *) url placeholderImage:(nullable UIImage *) placeholder options:(SDWebImageOptions) options;\n    \n- (void）sd_setImageWithURL:(nullable NSURL *) url completed:(nullable SDExternalCompletionBlock) completedBlock;\n\n- (void) sd_setImageWithURL:(nullable NSURL *) url placeholderImage:(nullable UIImage *) placeholder options:(SDWebImageOptions) options completed:(nullable SDExternalCompletionBlock) completedBlock;\n")])])]),n("p",[e._v("url 是远程图片的url 地址，placeholderImage 是远程图片尚未下载完成时显示的占位图片，completedBlock 是远程图片下载完成后将要执行的block，options 是一组NS_OPTIONS枚举值：")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("typedef NS_OPTIONS(NSUInteger, SDWebImageOptions) {\n\n    // 当按照给出的url 下载失败后，这个url 会被加入黑名单，\n    // 如果下次这个url 再次出现，就不会尝试去下载\n    SDWebImageRetryFailed = 1 << 0,\n    \n    // 通常来说，图像下载是在UI交互过程中进行的，\n    // 如果使用这个flag 的话就会延迟图片的下载\n    SDWebImageLowPriority = 1 << 1,\n    \n    // 禁止磁盘缓存，只允许内存缓存 \n    SDWebImageCacheMemoryOnly = 1 << 2,\n    \n    // 允许渐进式加载。默认的是加载完成才显示\n    SDWebImageProgressiveDownload = 1 << 3,\n    \n    // 磁盘缓存将会由NSURLCache 而不是SDWebImage 来处理，因此可能带来轻微的性能下降。\n    // 使用于使用固定的图片url 但是图片内容可能变化的场景\n    SDWebImageRefreshCached = 1 << 4,\n    \n    // 如果应用进入后台状态，继续图片下载，应用因此将会额外活跃一段时间，\n    // 如果这段时间用完但是下载任务尚未完成，那么下载就会被取消\n    SDWebImageContinueInBackground = 1 << 5,\n    \n    // 处理存储在NSHTTPCookieStore 中的cookie\n    SDWebImageHandleCookie = 1 << 6,\n    \n    // 允许不受信任的SSL认证。通常用于测试环境，很少用于生产环境\n    SDWebImageAllowInvalidSSLCertificates = 1 << 7,\n    \n    // 提高该图片下载的优先级\n    SDWebImageHighPriority = 1 << 8,\n    \n    // 通常在图片加载时都会显示placeholder。但是这个flag 会将placeholder 的显示延迟到\n    // 图片加载之后（不是很懂这个选项的意思）\n    /**\n     * By default, placeholder images are loaded while the image is loading. This flag will delay the loading\n     * of the placeholder image until after the image has finished loading.\n     */\n    SDWebImageDelayPlaceholder = 1 << 9,\n    \n    // 并不常用的方法。用于对下载的图片进行变换。\n    // 这个变换工作由实现了transformDownloadedImage 的协议的类完成\n    SDWebImageTransformAnimatedImage = 1 << 10,\n    \n    // 在下载完成之后将图片设置成imageView.image 之前，\n    // 允许你对下载的图片进行额外的处理\n    SDWebImageAvoidAutoSetImage = 1 << 11,\n    \n    // 图片默认会被解码成它们的原始尺寸。这个flag 会将图片按照设备的内存来进行缩放。\n    // 如果SDWebImageProgressiveDownload 被设置了，那么这个选项就不起作用 \n    SDWebImageScaleDownLargeImages = 1 << 12\n};\n    \n")])])]),n("h2",{attrs:{id:"内部实现"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#内部实现"}},[e._v("#")]),e._v(" 内部实现")]),e._v(" "),n("h3",{attrs:{id:"uiview-webcache"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#uiview-webcache"}},[e._v("#")]),e._v(" UIView+WebCache")]),e._v(" "),n("p",[e._v("上面列出的方法其实是一个核心方法接受不同参数时的不同版本。")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[e._v("- (void)sd_setImageWithURL:(nullable NSURL *)url\n      placeholderImage:(nullable UIImage *)placeholder\n               options:(SDWebImageOptions)options\n              progress:(nullable SDWebImageDownloaderProgressBlock)progressBlock\n             completed:(nullable SDExternalCompletionBlock)completedBlock;\n")])])]),n("p",[e._v("这个核心方法内部是这样实现的：")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[e._v("- (void)sd_setImageWithURL:(nullable NSURL *)url\n      placeholderImage:(nullable UIImage *)placeholder\n               options:(SDWebImageOptions)options\n              progress:(nullable SDWebImageDownloaderProgressBlock)progressBlock\n             completed:(nullable SDExternalCompletionBlock)completedBlock {\n[self sd_internalSetImageWithURL:url\n                placeholderImage:placeholder\n                         options:options\n                    operationKey:nil\n                   setImageBlock:nil\n                        progress:progressBlock\n                       completed:completedBlock];\n}\n")])])]),n("p",[e._v("进入"),n("code",[e._v("sd_internalSetImageWithURL:")]),e._v(" 这个方法的内部，我们总算看到了一段期望中的复杂代码：")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('// UIView+WebCache.m\n- (void)sd_internalSetImageWithURL:(nullable NSURL *)url\n                  placeholderImage:(nullable UIImage *)placeholder\n                           options:(SDWebImageOptions)options\n                      operationKey:(nullable NSString *)operationKey\n                     setImageBlock:(nullable SDSetImageBlock)setImageBlock\n                          progress:(nullable SDWebImageDownloaderProgressBlock)progressBlock\n                         completed:(nullable SDExternalCompletionBlock)completedBlock {\n    // 1\n    NSString *validOperationKey = operationKey ?: NSStringFromClass([self class]); \n    \n    // 2\n    [self sd_cancelImageLoadOperationWithKey:validOperationKey];\n    \n    // 3\n    objc_setAssociatedObject(self, &imageURLKey, url, OBJC_ASSOCIATION_RETAIN_NONATOMIC);\n    \n    // 4\n    if (!(options & SDWebImageDelayPlaceholder)) {\n        dispatch_main_async_safe(^{\n            [self sd_setImage:placeholder imageData:nil basedOnClassOrViaCustomSetImageBlock:setImageBlock];\n        });\n    }\n    \n    if (url) {\n        // check if activityView is enabled or not\n        if ([self sd_showActivityIndicatorView]) {\n            [self sd_addActivityIndicator];\n        }\n        \n        __weak __typeof(self)wself = self;\n        \n        // 5\n        id <SDWebImageOperation> operation = [SDWebImageManager.sharedManager loadImageWithURL:url options:options progress:progressBlock completed:^(UIImage *image, NSData *data, NSError *error, SDImageCacheType cacheType, BOOL finished, NSURL *imageURL) {\n            __strong __typeof (wself) sself = wself;\n            [sself sd_removeActivityIndicator];\n            if (!sself) {\n                return;\n            }\n            dispatch_main_async_safe(^{\n                if (!sself) {\n                    return;\n                }\n                // 6\n                if (image && (options & SDWebImageAvoidAutoSetImage) && completedBlock) {\n                    completedBlock(image, error, cacheType, url);\n                    return;\n                } else if (image) {\n                \n                    // 7\n                    [sself sd_setImage:image imageData:data basedOnClassOrViaCustomSetImageBlock:setImageBlock];\n                    [sself sd_setNeedsLayout];\n                } else {\n                    // 8\n                    if ((options & SDWebImageDelayPlaceholder)) {\n                        [sself sd_setImage:placeholder imageData:nil basedOnClassOrViaCustomSetImageBlock:setImageBlock];\n                        [sself sd_setNeedsLayout];\n                    }\n                }\n                if (completedBlock && finished) {\n                    completedBlock(image, error, cacheType, url);\n                }\n            });\n        }];\n        \n        // 9\n        [self sd_setImageLoadOperation:operation forKey:validOperationKey];\n    } else {\n        dispatch_main_async_safe(^{\n            [self sd_removeActivityIndicator];\n            if (completedBlock) {\n                NSError *error = [NSError errorWithDomain:SDWebImageErrorDomain code:-1 userInfo:@{NSLocalizedDescriptionKey : @"Trying to load a nil url"}];\n                completedBlock(nil, error, SDImageCacheTypeNone, url);\n            }\n        });\n    }\n}\n')])])]),n("ol",[n("li",[e._v("用当前视图的类名来作为一个key。"),n("code",[e._v("SDWebImage")]),e._v(" 不仅能用来设置UIImageView，也可以用来设置UIButton。")]),e._v(" "),n("li",[e._v("在当前视图的operationDictionary 中进行查找，如果已经有key为operationKey 的operation，则取消这个operation。")]),e._v(" "),n("li",[e._v("将该远程图片的url 与当前视图的imageURLKey 用关联对象设置在一起。关于关联对象，网上也已经有很多不错的分析文章。")]),e._v(" "),n("li",[e._v("如果没有设置"),n("code",[e._v("SDWebImageDelayPlaceholder")]),e._v("这个选项，那么就先将当前视图设置成placeholder。")]),e._v(" "),n("li",[e._v("使用"),n("code",[e._v("SDWebImageManager")]),e._v("的"),n("code",[e._v("loadImageWithURL:")]),e._v(" 创建一个operation 对象。")]),e._v(" "),n("li",[e._v("如果image下载完成了，并且设置了"),n("code",[e._v("SDWebImageAvoidAutoSetImage")]),e._v("选项，而且传入了对下载的图片进行处理的block，那么就进行对应处理。")]),e._v(" "),n("li",[e._v("如果image下载完成了，没有额外处理要求，那么将当前视图设置为image。")]),e._v(" "),n("li",[e._v("如果image下载失败了，那么还是将当前视图设置为placeholder。")]),e._v(" "),n("li",[e._v("将5中创建的operation 的key 设置为operationKey，然后加入当前视图的operationDictionary 中。")])]),e._v(" "),n("h3",{attrs:{id:"sdwebimagemanager"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#sdwebimagemanager"}},[e._v("#")]),e._v(" SDWebImageManager")]),e._v(" "),n("p",[e._v("由代码可知，operation 这个对象是设置过程的核心与关键。既然它是"),n("code",[e._v("SDWebImageManager")]),e._v("创建的，我们自然要去探究下"),n("code",[e._v("SDWebImageManager")]),e._v("的内部秘密。")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('- (id <SDWebImageOperation>)loadImageWithURL:(nullable NSURL *)url\n                                     options:(SDWebImageOptions)options\n                                    progress:(nullable SDWebImageDownloaderProgressBlock)progressBlock\n                                   completed:(nullable SDInternalCompletionBlock)completedBlock {\n                                   \n    // 1\n    // Invoking this method without a completedBlock is pointless\n    NSAssert(completedBlock != nil, @"If you mean to prefetch the image, use -[SDWebImagePrefetcher prefetchURLs] instead");\n\n    ... \n    // 2\n    @synchronized (self.runningOperations) {\n        [self.runningOperations addObject:operation];\n    }\n    \n    // 3\n    NSString *key = [self cacheKeyForURL:url];\n    \n    // 4\n    ...\n}\n')])])]),n("h4",{attrs:{id:"_1"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_1"}},[e._v("#")]),e._v(" 1")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v('// Invoking this method without a completedBlock is pointless\n    NSAssert(completedBlock != nil, @"If you mean to prefetch the image, use -[SDWebImagePrefetcher prefetchURLs] instead");\n\n    // Very common mistake is to send the URL using NSString object instead of NSURL. For some strange reason, Xcode won\'t\n    // throw any warning for this type mismatch. Here we failsafe this error by allowing URLs to be passed as NSString.\n    if ([url isKindOfClass:NSString.class]) {\n        url = [NSURL URLWithString:(NSString *)url];\n    }\n\n    // Prevents app crashing on argument type error like sending NSNull instead of NSURL\n    if (![url isKindOfClass:NSURL.class]) {\n        url = nil;\n    }\n\n    __block SDWebImageCombinedOperation *operation = [SDWebImageCombinedOperation new];\n    __weak SDWebImageCombinedOperation *weakOperation = operation;\n\n    BOOL isFailedUrl = NO;\n    if (url) {\n        @synchronized (self.failedURLs) {\n            isFailedUrl = [self.failedURLs containsObject:url];\n        }\n    }\n\n    if (url.absoluteString.length == 0 || (!(options & SDWebImageRetryFailed) && isFailedUrl)) {\n        [self callCompletionBlockForOperation:operation completion:completedBlock error:[NSError errorWithDomain:NSURLErrorDomain code:NSURLErrorFileDoesNotExist userInfo:nil] url:url];\n        return operation;\n    }\n')])])]),n("p",[e._v("首先进行异常处理。这是编程时一个常见的习惯，将可能遇到的各种问题和对应的解决方案放在方法的开头，可以使得逻辑变得清晰，同时也避免了无谓的函数调用开销。SDWebImage 团队贴心地为我们处理了常见的误将NSString 类型的对象传入NSURL 类型的参数的错误。这启示我们，在编写自己的库时，应尽可能考虑到各种常见错误，并对它们进行处理，这样可以使得你的库对于别的开发者更加友好。")]),e._v(" "),n("h4",{attrs:{id:"_2"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_2"}},[e._v("#")]),e._v(" 2")]),e._v(" "),n("p",[e._v("将operation 加入"),n("code",[e._v("SDWebImageManager")]),e._v(" 的runningOperations 数组中。")]),e._v(" "),n("h4",{attrs:{id:"_3"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_3"}},[e._v("#")]),e._v(" 3")]),e._v(" "),n("p",[e._v("获得远程图片url 所对应的key。")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",[n("code",[e._v('- (nullable NSString *)cacheKeyForURL:(nullable NSURL *)url {\nif (!url) {\n    return @"";\n}\n\nif (self.cacheKeyFilter) {\n    // 如果定义了用来对url 进行过滤的filter，那么就用filter 来处理\n    return self.cacheKeyFilter(url);\n} else {\n    // 否则就返回url 的string表示\n    return url.absoluteString;\n}\n}\n')])])]),n("h4",{attrs:{id:"_4"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#_4"}},[e._v("#")]),e._v(" 4")]),e._v(" "),n("p",[e._v("先查询operation 的缓存操作。")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("- (nullable NSOperation *)queryCacheOperationForKey:(nullable NSString *)key done:(nullable SDCacheQueryCompletedBlock)doneBlock {\n    if (!key) {\n        if (doneBlock) {\n            doneBlock(nil, nil, SDImageCacheTypeNone);\n        }\n        return nil;\n    }\n\n    // First check the in-memory cache...   \n    // 首先检查该图片在内存中是否有缓存\n    UIImage *image = [self imageFromMemoryCacheForKey:key];\n    if (image) {\n        NSData *diskData = nil;\n        if ([image isGIF]) {\n            diskData = [self diskImageDataBySearchingAllPathsForKey:key];\n        }\n        if (doneBlock) {\n            doneBlock(image, diskData, SDImageCacheTypeMemory);\n        }\n        // 如果在内存中有缓存，这里就会直接返回了\n        return nil;\n    }\n\n    // 当该图片在内存中没有缓存的时候才会执行下面的代码\n    NSOperation *operation = [NSOperation new];\n    dispatch_async(self.ioQueue, ^{\n        if (operation.isCancelled) {\n            // do not call the completion if cancelled\n            return;\n        }\n\n        @autoreleasepool {\n        \n            // 获得该图片在磁盘中的缓存\n            NSData *diskData = [self diskImageDataBySearchingAllPathsForKey:key];\n            UIImage *diskImage = [self diskImageForKey:key];\n            if (diskImage && self.config.shouldCacheImagesInMemory) {\n                NSUInteger cost = SDCacheCostForImage(diskImage);\n                // 将磁盘缓存保存在内存中\n                [self.memCache setObject:diskImage forKey:key cost:cost];\n            }\n\n            if (doneBlock) {\n                dispatch_async(dispatch_get_main_queue(), ^{\n                    doneBlock(diskImage, diskData, SDImageCacheTypeDisk);\n                });\n            }\n        }\n    });\n\n    return operation;\n}\n")])])]),n("p",[e._v("在查询到operation 的缓存操作后，设置doneBlock:")]),e._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[e._v("operation.cacheOperation = [self.imageCache queryCacheOperationForKey:key done:^(UIImage *cachedImage, NSData *cachedData, SDImageCacheType cacheType) {\n        if (operation.isCancelled) {\n            [self safelyRemoveOperationFromRunning:operation];\n            return;\n        }\n        // 1\n        if ((!cachedImage || options & SDWebImageRefreshCached) && (![self.delegate respondsToSelector:@selector(imageManager:shouldDownloadImageForURL:)] || [self.delegate imageManager:self shouldDownloadImageForURL:url])) {\n        \n            // 2\n            if (cachedImage && options & SDWebImageRefreshCached) {\n                // If image was found in the cache but SDWebImageRefreshCached is provided, notify about the cached image\n                // AND try to re-download it in order to let a chance to NSURLCache to refresh it from server.\n                [self callCompletionBlockForOperation:weakOperation completion:completedBlock image:cachedImage data:cachedData error:nil cacheType:cacheType finished:YES url:url];\n            }\n\n            // download if no image or requested to refresh anyway, and download allowed by delegate\n            // 3\n            SDWebImageDownloaderOptions downloaderOptions = 0;\n            if (options & SDWebImageLowPriority) downloaderOptions |= SDWebImageDownloaderLowPriority;\n            if (options & SDWebImageProgressiveDownload) downloaderOptions |= SDWebImageDownloaderProgressiveDownload;\n            if (options & SDWebImageRefreshCached) downloaderOptions |= SDWebImageDownloaderUseNSURLCache;\n            if (options & SDWebImageContinueInBackground) downloaderOptions |= SDWebImageDownloaderContinueInBackground;\n            if (options & SDWebImageHandleCookies) downloaderOptions |= SDWebImageDownloaderHandleCookies;\n            if (options & SDWebImageAllowInvalidSSLCertificates) downloaderOptions |= SDWebImageDownloaderAllowInvalidSSLCertificates;\n            if (options & SDWebImageHighPriority) downloaderOptions |= SDWebImageDownloaderHighPriority;\n            if (options & SDWebImageScaleDownLargeImages) downloaderOptions |= SDWebImageDownloaderScaleDownLargeImages;\n            \n            // 4\n            if (cachedImage && options & SDWebImageRefreshCached) {\n                // force progressive off if image already cached but forced refreshing\n                downloaderOptions &= ~SDWebImageDownloaderProgressiveDownload;\n                // ignore image read from NSURLCache if image if cached but force refreshing\n                downloaderOptions |= SDWebImageDownloaderIgnoreCachedResponse;\n            }\n            \n            // 5\n            SDWebImageDownloadToken *subOperationToken = [self.imageDownloader downloadImageWithURL:url options:downloaderOptions progress:progressBlock completed:^(UIImage *downloadedImage, NSData *downloadedData, NSError *error, BOOL finished) {\n                __strong __typeof(weakOperation) strongOperation = weakOperation;\n                if (!strongOperation || strongOperation.isCancelled) {\n                    // Do nothing if the operation was cancelled\n                    // See #699 for more details\n                    // if we would call the completedBlock, there could be a race condition between this block and another completedBlock for the same object, so if this one is called second, we will overwrite the new data\n                } else if (error) {\n                    [self callCompletionBlockForOperation:strongOperation completion:completedBlock error:error url:url];\n\n                    // 6\n                    if (   error.code != NSURLErrorNotConnectedToInternet\n                        && error.code != NSURLErrorCancelled\n                        && error.code != NSURLErrorTimedOut\n                        && error.code != NSURLErrorInternationalRoamingOff\n                        && error.code != NSURLErrorDataNotAllowed\n                        && error.code != NSURLErrorCannotFindHost\n                        && error.code != NSURLErrorCannotConnectToHost\n                        && error.code != NSURLErrorNetworkConnectionLost) {\n                        @synchronized (self.failedURLs) {\n                            [self.failedURLs addObject:url];\n                        }\n                    }\n                }\n                else {\n                    if ((options & SDWebImageRetryFailed)) {\n                        @synchronized (self.failedURLs) {\n                            [self.failedURLs removeObject:url];\n                        }\n                    }\n                    \n                    \n                    BOOL cacheOnDisk = !(options & SDWebImageCacheMemoryOnly);\n\n                    // 7\n                    if (options & SDWebImageRefreshCached && cachedImage && !downloadedImage) {\n                        // Image refresh hit the NSURLCache cache, do not call the completion block\n                    } else if (downloadedImage && (!downloadedImage.images || (options & SDWebImageTransformAnimatedImage)) && [self.delegate respondsToSelector:@selector(imageManager:transformDownloadedImage:withURL:)]) {\n                        \n// 8\ndispatch_async(dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_HIGH, 0), ^{\n                            UIImage *transformedImage = [self.delegate imageManager:self transformDownloadedImage:downloadedImage withURL:url];\n\n                            if (transformedImage && finished) {\n                                BOOL imageWasTransformed = ![transformedImage isEqual:downloadedImage];\n                                // pass nil if the image was transformed, so we can recalculate the data from the image\n                                [self.imageCache storeImage:transformedImage imageData:(imageWasTransformed ? nil : downloadedData) forKey:key toDisk:cacheOnDisk completion:nil];\n                            }\n                            \n                            [self callCompletionBlockForOperation:strongOperation completion:completedBlock image:transformedImage data:downloadedData error:nil cacheType:SDImageCacheTypeNone finished:finished url:url];\n                        });\n                    } else {\n                        if (downloadedImage && finished) {\n                            [self.imageCache storeImage:downloadedImage imageData:downloadedData forKey:key toDisk:cacheOnDisk completion:nil];\n                        }\n                        [self callCompletionBlockForOperation:strongOperation completion:completedBlock image:downloadedImage data:downloadedData error:nil cacheType:SDImageCacheTypeNone finished:finished url:url];\n                    }\n                }\n\n                if (finished) {\n                    [self safelyRemoveOperationFromRunning:strongOperation];\n                }\n            }];\n            operation.cancelBlock = ^{\n                [self.imageDownloader cancel:subOperationToken];\n                __strong __typeof(weakOperation) strongOperation = weakOperation;\n                [self safelyRemoveOperationFromRunning:strongOperation];\n            };\n        } else if (cachedImage) {\n        \n            // 9\n            __strong __typeof(weakOperation) strongOperation = weakOperation;\n            [self callCompletionBlockForOperation:strongOperation completion:completedBlock image:cachedImage data:cachedData error:nil cacheType:cacheType finished:YES url:url];\n            [self safelyRemoveOperationFromRunning:operation];\n        } else {\n            // Image not in cache and download disallowed by delegate\n            \n            // 10\n            __strong __typeof(weakOperation) strongOperation = weakOperation;\n            [self callCompletionBlockForOperation:strongOperation completion:completedBlock image:nil data:nil error:nil cacheType:SDImageCacheTypeNone finished:YES url:url];\n            [self safelyRemoveOperationFromRunning:operation];\n        }\n    }];\n\n")])])]),n("ol",[n("li",[e._v("由if条件，假设后一条件成立，如果缓存存在，那么只有在设置了"),n("code",[e._v("SDWebImageRefreshCache")]),e._v("才会进入if 语句体中；如果缓存不存在，那么肯定会进入if 语句体中。")]),e._v(" "),n("li",[e._v("如果说缓存存在，而且设置了"),n("code",[e._v("SDWebImageRefreshCache")]),e._v("，那么就应该从server 上重新下载图片以更新本地缓存。")]),e._v(" "),n("li",[e._v("设置下载时的选项。")]),e._v(" "),n("li",[e._v("如果设置了"),n("code",[e._v("SDWebImageRefreshCache")]),e._v("，那么必须取消渐进式下载，而且还要忽略从NSURLCache 中获得的缓存响应。（此处我还没有理解到底是怎么回事，等了解了NSURLCache 的知识后再来填这个坑）")]),e._v(" "),n("li",[e._v("调用imageDownloader 进行图片下载。")]),e._v(" "),n("li",[e._v("如果发生了错误，且错误原因不是列出来的这些原因中的一个，那么就把这个url 加入黑名单中。")]),e._v(" "),n("li",[e._v("如果缓存存在，设置了"),n("code",[e._v("SDWebImageRefreshCache")]),e._v("，而且downloadedImage为nil，那么说明命中了\nNSURLCache 缓存，什么事也不做。")]),e._v(" "),n("li",[e._v("如果downloadedImage非nil，并且设置了"),n("code",[e._v("SDWebImageTransformAnimatedImage")]),e._v("，那么就在主线程中对图片进行变换，然后将变换后的图片存储在内存中或内存和磁盘上。如果不需要变换，那么直接将downloadedImage 存储在内存中或内存和磁盘上。")]),e._v(" "),n("li",[e._v("如果缓存存在，且其他条件都不成立，那么直接取出缓存中的图片，然后在主线程中更新视图。")]),e._v(" "),n("li",[e._v("如果缓存不存在，并且也不允许下载，那么直接调用completedBlock。")])]),e._v(" "),n("h4",{attrs:{id:"缓存策略小结"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#缓存策略小结"}},[e._v("#")]),e._v(" 缓存策略小结")]),e._v(" "),n("p",[e._v("我们来小结一下"),n("code",[e._v("SDWebImage")]),e._v("的缓存策略。在给一个UIimageView 或者UIButton 设置了远端图片的url 后，"),n("code",[e._v("SDWebImage")]),e._v("首先以url 为key 在内存中寻找图片缓存，如果在内存中没找到就会去磁盘中寻找，如果找到了，则将磁盘中的缓存拷贝一份到内存中，然后使用缓存来设置视图。如果在\n磁盘和内存中都没有找到，那么才会下载远程图片，然后将远程图片缓存在内存中或者是内存和磁盘上。")]),e._v(" "),n("h2",{attrs:{id:"总结"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[e._v("#")]),e._v(" 总结")]),e._v(" "),n("p",[e._v("本文对"),n("code",[e._v("SDWebImage")]),e._v(" 的源代码进行了分析，其中着重介绍了它的缓存策略。因为篇幅有限，所以对于它的其他方面，如GCD 和NSOperationQueue 的使用，网络请求等知识都没有进行深入研究。在日后的系列文章中，我将回过头来针对这些知识进行再次探索，期待有新的收获。")])])}),[],!1,null,null,null);a.default=r.exports}}]);