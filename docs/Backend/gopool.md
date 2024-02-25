---
category: Backend
tags:
  - 源码分析
---

# Gopool 实现分析
Gopool 是字节跳动开源项目 [gopkg](https://github.com/bytedance/gopkg) 中的一个小工具，作用是以池化的思想来实现 goroutine 的复用，限制应用中 goutine 数量的无限增长。

## 使用介绍
Gopool 使用起来非常简单，只需要将项目中的 go 关键字替换为 gopool.Go：
```go
go func() {
	// do your job
}()
```
替换成
```go
gopool.Go(func(){
	/// do your job
})
```

## 文件目录

Gopool 目录下共有 6 个文件，非常简洁：
```
.
├── README.md
├── config.go
├── gopool.go
├── pool.go
├── pool_test.go
└── worker.go
```
### gopool
首先来看 gopool.go 这个文件。在这个文件的 init 方法中创建了 defaultPool:

```
func init() {
	defaultPool = NewPool("gopool.DefaultPool", math.MaxInt32, NewConfig())
}
```
示例中的 gopool.Go 实际上是在调用 defaultPool 的同名方法：
```
func Go(f func()) {
	CtxGo(context.Background(), f)
}

// CtxGo is preferred than Go.
func CtxGo(ctx context.Context, f func()) {
	defaultPool.CtxGo(ctx, f)
}
```
### pool

defaultPool 实现了 Pool 接口，其定义位于 pool.go 中：

```
type Pool interface {
	// 返回当前 pool 的名称
	Name() string
	// 设置 pool 中 goroutine 的最大数量
	SetCap(cap int32)
	// 执行用户传入的 func
	Go(f func())
	// 在用户指定的 context 中执行用户传入的 func
	CtxGo(ctx context.Context, f func())
	// 设置异常处理方法
	SetPanicHandler(f func(context.Context, interface{}))
	// 返回当前 running 状态的 worker
	WorkerCount() int32
}
```

同时在这个文件里定义了名为 pool 的结构体，并实现了上述 Pool 接口

```
type pool struct {
	// 当前 pool 的名称
	name string

	// 当前 pool 的容量
	cap int32
	// 配置信息
	config *Config
	// 由 task 组成的链表
	taskHead  *task
	taskTail  *task
	taskLock  sync.Mutex
	taskCount int32

	// 记录当前处于 running 状态的 worker 数量
	workerCount int32

	// worker 异常时的恢复方法
	panicHandler func(context.Context, interface{})
}
```

让我们深入看一下 CtxGo 这个接口方法是怎么实现的：
```
func (p *pool) CtxGo(ctx context.Context, f func()) {

   // 从 taskPool 中获取一个 task
	t := taskPool.Get().(*task)
	t.ctx = ctx
	t.f = f
	
	// 更新 taskHead 和 taskTail 两个指针的指向
	p.taskLock.Lock()
	if p.taskHead == nil {
		p.taskHead = t
		p.taskTail = t
	} else {
		p.taskTail.next = t
		p.taskTail = t
	}
	p.taskLock.Unlock()
	atomic.AddInt32(&p.taskCount, 1)
		
	// 如果 task 的数量比设置的阈值大，并且 p 的 worker 的数量小于 pool 的容量
	// 或者 p 的 worker 数量为 0
	if (atomic.LoadInt32(&p.taskCount) >= p.config.ScaleThreshold && p.WorkerCount() < atomic.LoadInt32(&p.cap)) || p.WorkerCount() == 0 {
	
	   //  从 workerPool 中获取一个 worker，并启动
		p.incWorkerCount()
		w := workerPool.Get().(*worker)
		w.pool = p
		w.run()
	}
}
```
taskPool 和 workerPool 是两个 sync.Pool 类型的全局对象，分别负责 task 和 worker 对象的复用。CtxGo 方法中首先会从 taskPool 的池子中取出一个 task 来复用，并调整 p 的 taskHead/taskTail/taskCount 等属性的值。在满足一些前提的情况下，还需要从 workerPool 中取出 worker，将 worker 的 pool 属性指向当前的 p，并调用 worker.run 方法。

### task
task 是一个结构体，封装了用户传入的 func，同时还有一个指向下一个任务的属性
```
type task struct {
	ctx context.Context
	f   func()

	next *task
}

func (t *task) zero() {
	t.ctx = nil
	t.f = nil
	t.next = nil
}

func (t *task) Recycle() {
	t.zero()
	taskPool.Put(t)
}
```

### worker
worker 其实就是嵌入了一个 pool 的结构体：
```
type worker struct {
	pool *pool
}
```
run 方法的实现如下：
```
func (w *worker) run() {
   // 启动一个 goroutine
	go func() {
	   // 在这个 goroutine 中，循环执行如下逻辑
		for {
		   // 从 w.pool 的队头取出一个 task 
			var t *task
			w.pool.taskLock.Lock()
			if w.pool.taskHead != nil {
				t = w.pool.taskHead
				w.pool.taskHead = w.pool.taskHead.next
				atomic.AddInt32(&w.pool.taskCount, -1)
			}
			if t == nil {
				// 如果 w.pool 的队头取不到 task 了，说明当前没有需要执行的 task 了，清理当前 worker
				w.close()
				w.pool.taskLock.Unlock()
				// 将当前 worker 放回 workerPool 中，供之后复用
				w.Recycle()
				return
			}
			w.pool.taskLock.Unlock()
			func() {
				defer func() {
				   // 如果在执行 t.f 的过程中发生了异常，进行异常恢复或记录现场
					if r := recover(); r != nil {
						if w.pool.panicHandler != nil {
							w.pool.panicHandler(t.ctx, r)
						} else {
							msg := fmt.Sprintf("GOPOOL: panic in pool: %s: %v: %s", w.pool.name, r, debug.Stack())
							logger.CtxErrorf(t.ctx, msg)
						}
					}
				}()
				
			   // 执行 task 上的 func
				t.f()
			}()
			
			// 将 t 放回到 taskPool 中，供之后复用
			t.Recycle()
		}
	}()
}
```
### sync.Pool
频繁地分配、回收内存会给 GC 带来一定的负担，严重的时候会引起 CPU 的毛刺，而 sync.Pool 可以将暂时不用的对象缓存起来到一个池子中，待下次需要的时候直接使用，不用再次经过内存分配，可以减轻 GC 的压力，提升系统的性能。

使用 sync.Pool的步骤非常简单：
1. 声明需要缓存对象的 new 方法

```
var taskPool sync.Pool

func init() {
	taskPool.New = newTask
}

func newTask() interface{} {
	return &task{}
}
```

2. 使用 Get 方法来从缓存池中获取一个对象

```
t := taskPool.Get().(*task)
t.ctx = ctx
t.f = f
```

3. 对象不再使用时，放回到缓存池中
```
func (t *task) zero() {
	t.ctx = nil
	t.f = nil
	t.next = nil
}

func (t *task) Recycle() {
	t.zero()
	taskPool.Put(t)
}
```

## 总结
以上逻辑就是 gopool 实现 goroutine 复用的核心逻辑。我们来总结下它的原理：
1. 当使用 gopool.Go 来执行用户传入的逻辑 func 时，这个 func 会被包装成为一个 task，添加到 defaultPool 的 task 链表中
2. task 由 defaultPool 中的 worker 来实际负责执行。
3. 当满足以下两种情况之一时，会新建一个 worker，并立即执行 worker 的调度逻辑：
* task 的数量比设置的阈值大，并且 p 的 worker 的数量小于 pool 的容量
* p 的 worker 数量为 0
4. 不满足上述条件时，现有 worker 会按照 FIFO 顺序依次执行 task 链表中的 task。
5. task 和 worker 实例都会通过 sync.Pool 来实现复用，减少内存分配，降低 GC 压力。




















