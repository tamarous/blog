---
category: Backend
tags:
  - 基础知识 
---
# Go 语言精进之路学习笔记

## 前言

《Go 语言精进之路》这本书真的非常好，深入讲解了 Go 语言的方方面面，是入门的不二之选。本文是在学习《Go 语言精进之路》时所做的一些摘要和记录。

## 理解 GO 语言的设计哲学

-  追求简单，少即是多
-  偏好组合，正交耦合
-  原生并发，轻量高效
-  面向工程，自带电池

Go 特点：

-  语法简洁，只有 25 个关键字
-  内置垃圾收集，降低内存管理心智负担
-  没有头文件
-  显式依赖
-  没有循环依赖
-  常量只是数字
-  首字母大小写决定可见性
-  任何类型都可以拥有方法
-  没有子类型继承
-  没有算数转换
-  接口是隐式的
-  方法就是函数
-  接口只是方法集合
-  方法仅按照名称匹配
-  没有构造或析构函数
-  赋值不是表达式
-  没有指针算数
-  内存总是初始化为零值
-  没有类型注解语法
-  没有模板或泛型
-  没有异常
-  内置字符串、切片、map 类型
-  内置数据边界检查
-  内置并发支持
-  ……

## 使用一致的变量声明形式

### 包级变量

只能使用带有 var 关键字的变量声明形式

1.  声明并同时显式初始化
2.  声明并延迟初始化
3.  声明聚类与就近原则

- 延迟初始化的变量放在一个 var 块
- 声明并显式初始化的变量放在另一个 var 块
- 尽可能在第一次使用变量的位置去声明该变量

### 局部变量

1. 对于延迟初始化的局部变量声明，采用带有 var 关键字的声明形式
2. 对于声明且显式初始化的局部变量，建议使用短变量声明形式
3. 尽量在分支控制时应用短变量声明形式

## 使用无类型常量简化代码

无类型变量在参与变量赋值和计算过程时，无需显式类型转换，从而能够简化代码

```
const (
    SeekStart = 0
    SeekCurrent = 1
    SeekEnd = 2
)
```

## 使用 iota 实现枚举常量

Go 的 const 提供了隐式重复前一个非空表达式的机制，如

```
const {
    Apple, Banana = 11, 22
    Strawberry, Grape
    Pear, Watermelon
}
```

等价于

```
const {
    Apple, Banana = 11, 22
    Strawberry, Grape = 11, 22
    Pear, Watermelon = 11, 22
}
```

Itoa 是 Go 中一个预定义标识符，表示的是 const 声明块中每个常量所处位置在块中的偏移量。同时 itoa 也是一个无类型常量，可以向无类型常量那样自动参与不同类型的求值过程，而不需要进行显式类型转换。

用法：

```
const {
    _ = itoa   
    IVP6_ONLY   // 1 
    SOMAXCONN   // 2
    SO_ERROR    // 3
}
```

## 尽量定义零值可用的类型

当通过声明或调用 new 为变量分配存储空间，或者通过复合文字字面量或调用 make 创建新值，且不提供显式初始化时，Go 会为变量或者值提供默认值。此外，零值初始是递归的，也就是数组、结构体等类型的零值初始化就是对其组成元素逐一进行零值初始化。

零值可用：

```
var zeroSlice []int
zeroSlice = append(zeroSlice, 1)
zeroSlice = append(zeroSlice, 2)

var mu sync.Mutex
mu.Lock()
mu.Unlock()
```

注意：并不是所有类型都是零值可用，有几点注意事项：

1.  在 append 场景下，零值可用的切片不能通过下标操作数据
2.  **Map 这种原生类型没有提供零值可用支持**
3.  零值可用类型要尽量避免值复制

 

## 使用复合字面值作为初值构造器

```
a := [5]int{1,2,3,4,5}
b := []int{1,2,3,4,5}
m := map[int]string {1:"hello",2:"world"}
```

### 结构体复合字面值

Go 推荐使用 field: value 的复合字面值形式对 struct 类型变量进行值构造

```
type pipe struct {
        wrMu sync.Mutex // Serialize Write operations
        wrCh chan []byte
        rdCh chan int
        
        once       sync.Once // Protects closing localDone
        done  chan struct{}
        rerr onceError
        werr onceError
}


func Pipe() (* PipeReader, * PipeWriter) {
        
        p := &pipe{
            wrCh: make(chan []byte),
            rdCh: make(chan int),
            done: make(chan struct{}),
        }
        
        return &PipeReader{p}, &PipeWriter{p}
}
```

复合字面值使得即便是类型零值，我们也会使用字面值构造器形式：

```
s := myStruct{}     // 常用
s := new(myStruct)  // 不常用
```

### 数组/切面复合字面值

使用下标 idx 作为 filed: value 中的 field，例

```
s := [5]int{0: -10, 1:2, 2:3, 3:4, 4:5}
```

### Map 复合字面值

```
var unitMap = map[string]int64 {
    "ns": int64(Nanosecond),
    "us": int64(Microsecond),
}
```

## 了解切片实现原理并高效使用

### 切片究竟是什么

切片之于数组就像是文件描述符之于文件。

```
type slice struct {
    array unsafe.Pointer   // 指向底层数组元素的指针
    len int                // 切片长度
    cap int                // 切片的最大容量
}
```


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7a0ca4bd9c540229dc1ada6bb7bd255~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3028&h=1462&s=356830&e=png&a=1&b=fbfbfb)

创建切面： s := make([]byte, 5)

创建对数组的切面：

```
u := [10]byte{1,2,3,4,5,6,7,8,9,10}
s := u[3:7]
s.cap = 7, s.len = 4
```

对于同一个数组，可以创建多个切面，对每个切面的修改，都会反映到其它切面上，因为他们的底层是同一个数组

### 动态扩容

Append 会根据切片需要，在当前数组容量无法满足的情况下，动态分配新的数组，新数组长度按照一定算法扩展。新数组建立后，append 会将旧数组中的元素复制到新数组中，之后旧数组会被垃圾回收掉。这样通过数组切面化创建的切面，在切面 cap 触碰到数组的上界，再对切片进行 append 操作，切片就会和原来的数组解除绑定关系

```
func growslice(et *_type, old slice, cap int) slice {

        newcap := old.cap
        doublecap := newcap + newcap
        if cap > doublecap {
                newcap = cap
        } else {
                const threshold = 256
                if old.cap < threshold {
                        newcap = doublecap
                } else {
                        // Check 0 < newcap to detect overflow
                        // and prevent an infinite loop.
                        for 0 < newcap && newcap < cap {
                                // Transition from growing 2x for small slices
                                // to growing 1.25x for large slices. This formula
                                // gives a smooth-ish transition between the two.
                                newcap += (newcap + 3*threshold) / 4
                        }
                        // Set newcap to the requested cap when
                        // the newcap calculation overflowed.
                        if newcap <= 0 {
                                newcap = cap
                        }
                }
        }
```

### 尽量使用 cap 参数创建切片

避免频繁重新创建底层数组及拷贝元素

## 了解 map 实现原理并高效使用

### 了解 map

1. map 类型不支持零值可用，未显式赋初值的 map 类型变量的零值为 nil，对于处零值状态的 map 变量进行操作将会导致运行时 panic
2. 总是使用 comma, ok 惯用法来读取 map 中的值。即使要删除的 key 在 map 中不存在，也不会 panic
3. 遍历 map 的顺序不可信赖
4. Map 实例不是并发写安全的，不支持并发读写
5. 尽量使用 cap 参数来创建 map，避免频繁扩容导致的性能损耗
 

### map 的内部实现

Go 运行时使用一张哈希表来实现抽象的 map 类型

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/035a7f2272b949e388ad2fa7893e21f1~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2508&h=2004&s=1357227&e=png&b=fafafa)

- count：当前 map 中的元素个数；对 map 类型变量运用 len 内置函数时，len 函数返回的就是 count 这个值。 
- flags：当前 map 所处的状态标志，目前定义了 4 个状态值 ——iterator、oldIterator、hashWriting 和 sameSizeGrow。 
- B：B 的值是 bucket 数量的以 2 为底的对数，即 2^B = bucket 数量。 
- noverflow：overflow bucket 的大约数量。 
- hash0：哈希函数的种子值。 
- buckets：指向 bucket 数组的指针。 
- oldbuckets：在 map 扩容阶段指向前一个 bucket 数组的指针。 
- nevacuate：在 map 扩容阶段充当扩容进度计数器。所有下标号小于 nevacuate 的 bucket 都已经完成了数据排空和迁移操作。 
- extra：可选字段。如果有 overflow bucket 存在，且 key、value 都因不包含指针而被内联（inline）的情况下，该字段将存储所有指向 overflow bucket 的指针，保证 overflow bucket 是始终可用的（不被垃圾回收掉）。 
- 真正用来存储键值对数据的是 bucket（桶），每个 bucket 中存储的是 Hash 值低 bit 位数值相同的元素，默认的元素个数为 BUCKETSIZE=8。当某个 bucket 的 8 个空槽（slot）都已填满且 map 尚未达到扩容条件时，运行时会建立 overflow bucket，并将该 overflow bucket 挂在上面 bucket 末尾的 overflow 指针上，这样两个 bucket 形成了一个链表结构，该结构的存在将持续到下一次 map 扩容。

hashcode:

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71c93a1bc7ce41768b844cc8f7c69238~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2508&h=1470&s=1067156&e=png&b=f8f8f8)

Go 运行时的 map 实现中引入了一个 LoadFactor（负载因子），当count > LoadFactor * 2^B 或 overflow bucket 过多时，运行时会对 map 进行扩容，并重新在 bucket 间均衡分配数据。

## 了解 string 实现原理并高效使用

Go 中 string 的特点：

- string 类型的数据是不可变的
- 零值可用
- 获取长度的时间复杂度是O(1)级别
- 支持通过+/+=操作符进行字符串连接
- 支持各种比较关系操作符：==、!= 、>=、<=、>和<

string 的内部表示：

```
// $GOROOT/src/runtime/string.go 
type stringStruct struct { 
    str unsafe.Pointer 
    len int
}
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de6394a601574b97bb6645f9385e3fd9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2482&h=2296&s=695250&e=png&a=1&b=fdfdfd)
### string 的高效构造

除了 +，Go还提供了其他一些构造字符串的方法，如
- 使用 fmt.Sprintf；
- 使用 strings.Join；
- 使用 strings.Builder；
- 使用 bytes.Buffer。

基准测试结果：
- 做了预初始化的 strings.Builder 连接构建字符串效率最高；
- 带有预初始化的 bytes.Buffer 和 strings.Join 这两种方法效率十分接近，分列二三位；
- 未做预初始化的 strings.Builder、bytes.Buffer 和操作符连接在第三档次；
- fmt.Sprintf 性能最差，排在末尾。

由此可以得出一些结论：
- 在能预估出最终字符串长度的情况下，使用预初始化的strings.Builder连接构建字符串效率最高；
- strings.Join连接构建字符串的平均性能最稳定，如果输入的多个字符串是以[]string承载的，那么strings.Join也是不错的选择；
- 使用操作符连接的方式最直观、最自然，在编译器知晓欲连接的字符串个数的情况下，使用此种方式可以得到编译器的优化处理；
- fmt.Sprintf虽然效率不高，但也不是一无是处，如果是由多种不同类型变量来构建特定格式的字符串，那么这种方式还是最适合的。


## 理解 Go 语言的包导入

1. Go 编译器在编译过程中必然要使用的是编译单元所依赖的包的源码
2. Go 源码文件头部的包导入语句中 import 后面的部分是一个路径，路径的最后一个分段是目录名，而不是包名
3. Go 编译器的包源码搜索路径由基本搜索路径和包导入路径组成，两者结合在一起后，编译器便可以确定一个包的所有依赖包的源码路径的集合
4. 同一源码文件的依赖包在同一源码搜索路径空间下的包名冲突问题可以由显式指定包名的方式解决

## 理解 Go 表达式的求值顺序

1. 包级别变量声明语句中的表达式求值顺序由变量的声明顺序和初始化依赖关系决定，并且包级变量表达式求值顺序优先级最高
2. 表达式操作数中的函数、方法及 channel 操作按照普通求值顺序，即从左到右的顺序依次进行
3. 赋值语句求值分为两个阶段：先按照普通求值规则对等号左边的下标表达式、指针解引用表达式和等号右边的表达式中的操作数进行求值，然后按照从左到右的顺序对变量进行赋值
4. 重点关注 switch-case 和 select-case 语句中的表达式惰性求值的规则

## 理解 Go 语言代码块和作用域

## 理解 Go 语言控制语句惯用法和使用注意事项

### 使用 if 语句时遵循快乐路径原则

- 出现错误时，快速返回
- 成功逻辑不要嵌入if-else中

### for range 循环

1.  小心 for range 的循环变量重用

```
func main() {
   var m = []int{1, 2, 3, 4, 5}
   for i, v := range m {
      go func() {
         fmt.Println(i, v)
      }()
   }

   time.Sleep(time.Second * 5)
}

➜  LearnGo go run main.go  
4 5
4 5
4 5
4 5
4 5
```

=>

```
func main() {
   var m = []int{1, 2, 3, 4, 5}
   for i, v := range m {
      go func(i, v int) {
         fmt.Println(i, v)
      }(i, v)
   }

   time.Sleep(time.Second * 5)
}

➜  LearnGo go run main.go  
0 1
4 5
3 4
2 3
1 2
```

2.  注意参加迭代的是 range 表达式的副本
3.  String 类型迭代时，每次循环的单位是一个 rune，而不是一个 byte
4.  Map 类型迭代时，会得到一个 map 内部表示的副本，由于内部表示其实是一个 hmap 描述符结构的指针，因此对副本 map 的操作等同于对源 map 的操作
5.  Channel 在迭代时，也会创建一个 channel 的指针副本，指向原 channel；for range 会以阻塞读的方式阻塞在 channel 表达式上；当 channel 中无数据时，也会阻塞，直到 channel 关闭。

```
var c chan int
for v := range c {
    fmt.Println(v)
}
```

将永远阻塞在这个 nil channel 上，直到 go panic

### 明确 break 和 continue 执行后的真实目的地

Break 语句结束执行并跳出的是同一函数内 break 语句所在的最内层的 for switch select 的执行。可以使用 break label来实现定向跳转。

```
func main() {
    exit := make(chan interface{})

    go func() {
    loop:
        for {
            select {
            case <-time.After(time.Second):
                fmt.Println("tick")
            case <-exit:
                fmt.Println("exiting...")
                break loop
            }
        }
        fmt.Println("exit!")
    }()

    time.Sleep(3 * time.Second)
    exit <- struct{}{}

    // 等待子goroutine退出
    time.Sleep(3 * time.Second)
}
```

### 尽量使用 case 替换 fallthrough

## 在 init 函数中检查包级变量的初始状态

### Init 函数

如果一个包定义了 init 函数，Go 运行时会负责在该包初始化时候调用它的 init 函数。一个Go 包可以拥有多个 init 函数，每个源文件中可以定义多个 init 函数。在初始化时，Go 运行时会按照一定次序逐一调用该包的 init 函数。Go 会保证 init 函数的调用是按照一定顺序依次执行的，不会并发执行，每个 init 函数一定只会执行一次。

多个文件中的 init 函数按照文件编译顺序依次执行，同一个文件中的 init 函数按照声明顺序依次执行。因此，不要依赖 init 函数的执行顺序。

### Init 函数的作用

适合做包级数据的初始化及初始状态检查工作

### 使用 init 函数检查包级变量的初始状态

1. 重置包级变量值
2. 对包级变量进行初始化，保证其后续可用
3. Init 函数中的注册模式
4. Init 函数中检查失败的处理方法：建议直接让程序 panic，快速退出

## 让自己习惯于函数是一等公民

Go 中的函数可以像普通整型值那样被创建和使用

### 函数的特殊运用

进行显式类型转换

我们想将 MyAdd 方法赋值给 BinaryAdd 接口，直接赋值不行，我们就需要一个自定义类，这个自定义类的声明和原方法一致，然后让这个类型实现 BinaryAdd 接口。

```
type BinaryAddr interface {
    Add(int, int) int
}

func MyAdd(x, y int) int {
    return x + y
}

func main() {
    var i BinaryAddr = MyAddrFunc(MyAdd)
    fmt.Println(i.Add(5,6))
}

type MyAdderFunc func(int, int) int

func (f MyAdderFunc) Add(x, y int) int {
    return f(x, y)
}
```

## 使用 defer 让函数更简洁、更健壮

### 运作机制

1. 在 Go 中，只有在函数和方法内部才能使用 defer
2. defer 关键字后面只能接函数或方法，这些函数被称为 deferred 函数，defer 将他们注册在其所在 goroutine 用于存放 defer 函数的栈数据结构中，在执行 defer 的函数退出前，按照后进先出的顺序依次执行

### 常见用法

1.  拦截 panic

```
func makeSlice(n int) []byte {
    defer func() {
        if recover() != nil {
            panic(ErrTooLarge)
        }
    }()
    
    return make([]byte, n)
 }
 // 
 func bar() {
     panic(-1)
 }
 
 func foo() {
     defer func() {
         if e := recover(); e != nil {
         }
     }()
     bar()
 }             
```

defer 在出现 panic 的时候仍然能够被调度执行

2. 修改函数的具名返回值

```
func foo(a, b int) (x, y int) {
    defer func() {
        x = x * 5
        y = y * 10
    }()
    
    x = a + 5
    y = b + 6
    return
}
```

3.  输出调试信息
4.  还原变量旧值

### 关于 defer 的几个问题

1.  明确哪些函数可以作为 deferred 函数

对于有返回值的自定义函数或者方法，返回值会在 defer 函数被调度执行的时候自动被丢弃。

2.  掌握 defer 关键字后表达式的求值时机

Defer 关键字后面的表达式是将 deferred 函数注册到 deferred 函数栈的时候进行求值的。

3.  知晓 defer 带来的性能损耗

## 理解方法的本质以选择正确的 receiver 类型

Go 方法的一般声明形式：

```
func (receiver T/*T) MethodName(param list) (return list) {

}
```

Go 方法的特点：

1. 方法的首字母是否大写决定了该方法是不是导出方法
2. 方法定义要与类型声明放在同一个包里。因此，不能为原生类型添加方法，只能为自定义类型添加方法。

Go 方法的本质：一个以方法所绑定类型实例为第一个参数的普通函数。

## 方法集合决定接口实现

1. 对于非接口类型的自定义类型 T，其方法集合由所有 receiver 为 T 类型的方法组成；而类型为 * T 的方法集合则包含所有 receiver 为 T 和 T * 类型的方法。

1. 类型嵌入：

- 接口类型中嵌入接口类型：嵌入其他接口类型而创建的新接口类型的方法集合包含了被嵌入接口类型的方法集合

- 结构体类型中嵌入接口类型：在结构体类型中嵌入接口类型后，该结构体类型的方法集合中将包含被嵌入接口类型的方法集合

- 结构体类型中嵌入结构体类型：在结构体类型中嵌入结构体类型为 Gopher 提供了一种实现 “继承” 的手段，外部的结构体类型 T 可以 “继承” 嵌入的结构体类型的所有方法的实现，并且无论是 T 类型的变量实例还是 T 指针类型变量实例，都可以调用所有 “继承” 的方法

3. Define 类型


```
type MyInterface I
type Mystruct T
```

- 基于接口类型创建的defined类型与原接口类型的方法集合是一致的
- 基于自定义非接口类型创建的 defined 类型则并没有 “继承” 原类型的方法集合，新的 defined 类型的方法集合是空的。方法集合决定接口实现。基于自定义非接口类型的 defined 类型的方法集合为空，这决定了即便原类型实现了某些接口，基于其创建的 defined 类型也没有 “继承” 这一隐式关联。新 defined 类型要想实现那些接口，仍需重新实现接口的所有方法。

4. 类型别名

```
type T1 = T
type Interface1 = Interface
```
类型别名与原类型拥有完全相同的方法集合，无论原类型是接口类型还是非接口类型。

## 了解变长参数函数的妙用

```
func Println(a ...interface{}) (n int, err error)
```

- 变长参数函数只能有一个“...T”类型形式参数，并且该形式参数应该为函数参数列表中的最后一个形式参数
- 变长参数函数的“...T”类型形式参数在函数体内呈现为[]T类型的变量，我们可以将其理解为一个Go语法糖：


```
// chapter4/sources/variadic_function_1.go
func sum(args ...int) int {
    var total int

    // 下面的args的类型为[]int
    for _, v := range args {
        total += v
    }

    return total
}
```

- 参数函数可以在有限情况下模拟函数重载、可选参数和默认参数


```
// chapter4/sources/variadic_function_5.go

func concat(sep string, args ...interface{}) string {
    var result string
    for i, v := range args {
        if i != 0 {
            result += sep
        }
        switch v.(type) {
        case int, int8, int16, int32, int64,
            uint, uint8, uint16, uint32, uint64:
            result += fmt.Sprintf("%d", v)
        case string:
            result += fmt.Sprintf("%s", v)
        case []int:
            ints := v.([]int)
            for i, v := range ints {
                if i != 0 {
                    result += sep
                }
                result += fmt.Sprintf("%d", v)
            }
        case []string:
            strs := v.([]string)
            result += strings.Join(strs, sep)
        default:
            fmt.Printf("the argument type [%T] is not supported", v)
            return ""
        }
    }
    return result
}

func main() {
    println(concat("-", 1, 2))
    println(concat("-", "hello", "gopher"))
    println(concat("-", "hello", 1, uint32(2),
        []int{11, 12, 13}, 17,
        []string{"robot", "ai", "ml"},
        "hacker", 33))
}
```

- 变长参数函数实现功能选项模式


```
// chapter4/sources/variadic_function_9.go

type FinishedHouse struct {
    style                  int    // 0: Chinese; 1: American; 2: European
    centralAirConditioning bool   // true或false
    floorMaterial          string  // "ground-tile"或"wood"
    wallMaterial           string // "latex"或"paper"或"diatom-mud"
}

type Option func(*FinishedHouse)

func NewFinishedHouse(options ...Option) *FinishedHouse {
    h := &FinishedHouse{
        // default options
        style:                  0,
        centralAirConditioning: true,
        floorMaterial:          "wood",
        wallMaterial:           "paper",
    }

    for _, option := range options {
        option(h)
    }

    return h
}

func WithStyle(style int) Option {
    return func(h *FinishedHouse) {
        h.style = style
    }
}

func WithFloorMaterial(material string) Option {
    return func(h *FinishedHouse) {
        h.floorMaterial = material
    }
}

func WithWallMaterial(material string) Option {
    return func(h *FinishedHouse) {
        h.wallMaterial = material
    }
}

func WithCentralAirConditioning(centralAirConditioning bool) Option {
    return func(h *FinishedHouse) {
        h.centralAirConditioning = centralAirConditioning
    }
}

func main() {
    fmt.Printf("%+v\n", NewFinishedHouse()) // 使用默认选项
    fmt.Printf("%+v\n", NewFinishedHouse(WithStyle(1),
        WithFloorMaterial("ground-tile"),
        WithCentralAirConditioning(false)))
}
```

## 了解接口类型变量的内部表示

接口的静态特性

-  接口类型变量具有静态类型
-  支持在编译阶段的类型检查：当一个接口类型变量被赋值时，编译器会检查右值的类型是否实现了该接口方法集合中的所有方法

接口的动态特性

-  接口类型变量兼具动态类型，即在运行时存储在接口类型变量中的值的真实类型
-  接口类型变量在程序运行时可以被赋值为不同的动态类型变量

接口类型变量在运行时表示为 eface 和 iface

iface：用于表示其余拥有方法的接口（interface）类型变量。

```
// $GOROOT/src/runtime/runtime2.go 
type iface struct { 
    tab *itab 
    data unsafe.Pointer 
}

// $GOROOT/src/runtime/runtime2.go 
type itab struct { 
    inter *interfacetype 
    _type *_type 
    hash uint32 
    _ [4]byte 
    fun [1]uintptr
}

// $GOROOT/src/runtime/type.go 
type interfacetype struct {
    typ _type
    pkgpath name
    mhdr []imethod 
}
```

eface：用于表示没有方法的空接口（empty interface）类型变量，即interface{}类型的变量。

```
type eface struct { 
    _type *_type 
    data unsafe.Pointer
}

// $GOROOT/src/runtime/type.go 
type _type struct { 
    size uintptr 
    ptrdata uintptr 
    hash uint32 
    tflag tflag
    align uint8
    fieldalign uint8 
    kind uint8 
    alg *typeAlg 
    gcdata *byte 
    str nameOff 
    ptrToThis typeOff
}
```

看一个例子：

```
type T struct { 
    n int
    s string
} 
func main() { 
    var t = T { 
        n: 17, s: "hello, interface",
    } 
    var ei interface{} = t // Go运行时使用eface结构表示ei 
}

func (T) M1() {} 
func (T) M2() {} 

type NonEmptyInterface interface { 
    M1() 
    M2() 
} 

func main() { 
    var t = T{ 
        n: 18, 
        s: "hello, interface", 
    } 
    var i NonEmptyInterface = t 
}
```


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/129fb32e21b14ee3921d392ddd5e0d25~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1852&h=1384&s=467811&e=png&b=fefefe)


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34844aea24174d7c934798ee7ccd6f0f~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3638&h=2290&s=996010&e=png&a=1&b=ffffff)


当前仅当两个接口类型变量的类型信息相同，且数据指针所指数据相同时，两个接口类型才是相等的。

通过 println 可以输出接口类型变量的两部分指针变量的值

接口类型变量的装箱由 Go 编译器和运行时共同完成


## 尽量定义小接口

1.  接口越小，抽象程度越高，被接纳度越高
2.  易于实现和测试
3.  契约职责单一，易于复用组合

## 尽量避免使用空接口作为函数参数类型

-  仅在处理未知类型数据时使用空接口类型
-  在其他情况下，尽可能将你需要的行为抽象为带有方法的接口，并使用这样的非空接口类型作为函数或方法的参数


## 使用接口作为程序水平组合的连接点

偏向组合，正交解耦

通过接口进行水平组合的一种常见模式是使用接受接口类型参数的函数或方法。几种惯用形式：

1.  基本形式

接受接口类型参数的函数或方法

2.  包裹函数

接受接口类型参数，并返回与其参数类型相同的返回值，因此可以将多个接受同一接口类型参数的包裹函数组合成一条链来调用

3.  适配器函数类型

是一种类型，可以将一个满足特定函数签名的普通函数显式转换成自身类型的实例，转换后的实例同时也是某个单方法接口类型的实现者。

4.  中间件

中间件就是包裹函数和适配器函数类型结合的产物

  


## 使用接口提高代码的可测试性

为一段代码编写测试代码的前提是这段代码具有可测试性。如果被测代码耦合了对外部资源的依赖，那么被测代码的可测试性就不高。因此，可以使用接口来降低这种耦合。

## 优先考虑并发设计

并行：在处理器核数充足的情况下，启动多个单线程应用的实例

并发：重新做应用结构设计，将应用分解成多个在基本执行单元中执行的，可能有一定关联关系的代码片段。Go 实现了 goroutine 这一由 Go 运行时负责调度的用户层轻量级线程为并发程序提供原生支持。特点：

1.  资源占用小，每个 goroutine 的初始栈大小仅为 2KB
2.  由 GO 运行时而不是操作系统调度，上下文切换代价小
3.  语言原生支持
4.  语言内置 channel 作为 goroutine 间通信原语

```
chan<- int是一个只能发送的通道，可以发送但是不能接收；
<-chan int是一个只能接收的通道，可以接收但是不能发送。
```

## 了解 goroutine 的调度原理

### Goroutine 调度模型与演进过程

1. G-M 模型

每个 goroutine 对应于运行时中的一个抽象结构 G（goroutine），而被视作 “物理 CPU” 的操作系统线程则被抽象为另一个结构 M（machine）

2. G-P-M 模型

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f339b58bebba4ac3a2a80dafc798e188~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2566&h=2148&s=1217794&e=png&a=1&b=fcfcfc)
  
P 是一个 “逻辑处理器”，每个 G 要想真正运行起来，首先需要被分配一个 P，即进入 P 的本地运行队列（local runq）中，这里暂忽略全局运行队列（global runq）那个环节。对于 G 来说，P 就是运行它的 “CPU”，可以说在 G 的眼里只有 P。但从 goroutine 调度器的视角来看，真正的 “CPU” 是 M，只有将 P 和 M 绑定才能让 P 的本地运行队列中的 G 真正运行起来。这样的 P 与 M 的关系就好比 Linux 操作系统调度层面用户线程（user thread）与内核线程（kernel thread）的对应关系：多对多（N:M）。

### GMP 调度
1. 抢占式调度

在 Go 程序启动时，运行时会启动一个名为 sysmon 的 M（一般称为监控线程），该 M 的特殊之处在于它无须绑定 P 即可运行（以 g0 这个 G 的形式）。

sysmon 每 20us~10ms 启动一次，主要完成如下工作：
- 释放闲置超过 5 分钟的 span 物理内存
- 如果超过 2 分钟没有垃圾回收，强制执行
- 将长时间未处理的 netpoll 结果添加到任务队列
- 向长时间运行的 G 任务发出抢占调度
- 收回因 syscall 长时间阻塞的 P。

如果一个 G 任务运行超过 10ms，sysmon 就会认为其运行时间太久而发出抢占式调度的请求。一旦 G 的抢占标志位被设为 true，那么在这个 G 下一次调用函数或方法时，运行时便可以将 G 抢占并移出运行状态，放入 P 的本地运行队列中（如果 P 的本地运行队列已满，那么将放在全局运行队列中），等待下一次被调度。

2. channel 阻塞或网络 I/O 情况下的调度

如果 G 被阻塞在某个 channel 操作或网络 I/O 操作上，那么 G 会被放置到某个等待队列中，而 M 会尝试运行 P 的下一个可运行的 G。如果此时 P 没有可运行的 G 供 M 运行，那么 M 将解绑 P，并进入挂起状态。当 I/O 操作完成或 channel 操作完成，在等待队列中的 G 会被唤醒，标记为 runnable（可运行），并被放入某个 P 的队列中，绑定一个 M 后继续执行。

3. 系统调用阻塞情况下的调度

如果 G 被阻塞在某个系统调用上，那么不仅 G 会阻塞，执行该 G 的 M 也会解绑 P（实质是被 sysmon 抢走了），与 G 一起进入阻塞状态。如果此时有空闲的 M，则 P 会与其绑定并继续执行其他 G；如果没有空闲的 M，但仍然有其他 G 要执行，那么就会创建一个新 M（线程）。当系统调用返回后，阻塞在该系统调用上的 G 会尝试获取一个可用的 P，如果有可用 P，之前运行该 G 的 M 将绑定 P 继续运行 G；如果没有可用的 P，那么 G 与 M 之间的关联将解除，同时 G 会被标记为 runnable，放入全局的运行队列中，等待调度器的再次调度。

## 掌握 Go 并发模型和常见并发模式

不要通过共享内存来通信，而应该通过通信来共享内存。

三种并发原语

-  Goroutine，对应 CSP模型中的 P，封装了数据的处理逻辑，是 Go 运行时调度的基本单位
-  channel，对应于 CSP 模型中的输入输出原语，用于 goroutine 间的通信和同步
-  select，用于多路输入输出，可以让 goroutine 同时协调处理多个 channel

并发模式

1.  创建模式：在内部创建一个 goroutine 并返回一个 channel 类型变量的函数
1.  退出模式

-   分离模式：对于分离的 goroutine，创建它的 goroutine 不需要关心它的退出，这类 goroutine 在启动后即与其创建者彻底分离，生命周期由其主函数决定
-   Join 模式：goroutine 的创建者需要等待新的 goroutine 的结束

```
var OK = errors.New("ok")

func worker(args ...interface{}) error {
   if len(args) == 0 {
      return errors.New("invalid args")
   }
   interval, ok := args[0].(int)
   if !ok {
      return errors.New("invalid interval args")
   }
   time.Sleep(time.Second * (time.Duration(interval)))
   return OK
}

func spawn(f func(args ...interface{}) error, args ...interface{}) chan error {
   c := make(chan error)
   go func() {
      c <- f(args...)
   }()
   return c
}

func main() {
   done := spawn(worker, 5)
   println("spawn worker1")
   err := <-done
   fmt.Println("worker 1 done: ", err)

   done = spawn(worker)
   println("spawn worker2")
   err = <- done
   println("worker2 done: ", err)
}
```

sync.WaitGroup 可以用来等待多个 goroutine 退出

```
func worker(args ...interface{}) {
   if len(args) == 0 {
      return
   }
   interval, ok := args[0].(int)
   if !ok {
      return
   }
   time.Sleep(time.Second * (time.Duration(interval)))
   return
}

func spawnGroup(n int, f func(args ...interface{}), args ...interface{}) chan struct{} {
   c := make(chan struct{})
   var wg sync.WaitGroup
   for i := 0; i < n; i++ {
      wg.Add(1)
      go func(i int) {
         name := fmt.Sprintf("worker-%d", i)
         f(args)
         println(name, "done")
         wg.Done()
      }(i)
   }

   go func() {
      wg.Wait()
      c <- struct{}{}
   }()

   return c
}

func main() {
   done := spawnGroup(5, worker, 3)
   println("spawn a group of workers")
   <-done
   println("group workers done")
}
```

超时等待机制：

```
func main() {
   done := spawnGroup(100000, worker, 3)
   println("spawn a group of workers")

   timer := time.NewTimer(time.Second * 1)
   defer timer.Stop()
   select {
   case <-timer.C:
      println("wait group workers exit timeout")
   case <-done:
      println("group workers done")
   }
}
```

-   Notify-and-wait 模式

通知单一 goroutine 退出

```
func worker(i int) {
   time.Sleep(time.Second * (time.Duration(i)))
   return
}

func spawn(f func(i int)) chan string {
   quit := make(chan string)
   go func() {
      var job chan int
      for {
         select {
         case j := <-job:
            f(j)
         case <-quit:
            quit <- "Ok"
         }
      }
   }()
   return quit
}

func main() {
   quit := spawn(worker)

   time.Sleep(time.Second * 5)

   quit <- "quit"
   timer := time.NewTimer(time.Second * 10)
   defer timer.Stop()
   select {
   case status := <-quit:
      println("workder done: ", status)
   case <-timer.C:
      println("wait for worker exit timeout")
   }
}
```

通知并等待多个 goroutine 退出：当使用 close 关闭 channel 时，所有阻塞在该 channel 上的 goroutine 都会得到通知

```
func worker(i int) {
   time.Sleep(time.Second * (time.Duration(i)))
}

func spawnGroup(n int, f func(int)) chan struct{} {
   quit := make(chan struct{})
   job := make(chan int)

   var wg sync.WaitGroup
   for i := 0; i < n; i++ {
      wg.Add(1)
      go func(i int) {
         defer wg.Done()
         name := fmt.Sprintf("worker %d", i)
         for {
            j, ok := <-job
            if !ok {
               println(name, "done")
               return
            }
            worker(j)
         }
      }(i)
   }

   go func() {
      <-quit
      close(job)
      wg.Wait()
      quit <- struct{}{}

   }()

   return quit
}

func main() {
   quit := spawnGroup(5, worker)

   time.Sleep(time.Second * 5)

   quit <- struct{}{}
   timer := time.NewTimer(time.Second * 5)
   defer timer.Stop()
   select {
   case <-quit:
      println("workder done: ")
   case <-timer.C:
      println("wait for worker exit timeout")
   }
}
```

3.  管道模式

Goroutine 从数据输入 channel 获取前一个环节生产的数据，进行处理后，通过 channel 发往下一个环节

扇出模式：在某个处理环节，多个功能相同的 goroutine 从同一个 channel 读取数据并处理，直到该 channel 关闭

扇入模式：将所有输入 channel 的数据汇聚到一个统一的输入 channel，然后处理程序再从这个 channel中读取数据并处理，直到该 channel 因为所有输入 channel 关闭而关闭

4.  超时与取消模式

使用 context 包来实现取消模式

## 了解 channel 的妙用

```
c := make(chan int)
c := make(chan int, 5)
c <- x
<- c
x = <- c
x, ok = <- c
for i := range c
close(c)

c := make(chan chan int) // 一个无缓冲的chan int 类型的 channel
```

通过 select，可以同时在多个 channel 上进行发送接收操作

### 无缓冲 channel

不带有缓冲区，因此对无缓冲 channel 的接收和发送操作是同步的，因此发送和接收必须同时存在，否则就会陷入阻塞状态

结论

-  发送动作一定**发生**在接受动作**完成**之前
-  接受动作一定**发生**在发送动作**完成**之前

应用：

1. 用作信号传递
2. 用作替代锁机制

### 带缓冲 channel

对带缓冲 channel 的发送操作在缓冲区未满、接收操作在缓冲区非空的情况下是异步的。也就是说，当缓冲区无数据或者没满的时候，进行发送不会阻塞；当缓冲区满的时候，进行发送会阻塞；当缓冲区空的时候，进行接收会阻塞

应用：

1.  用作消息队列
2.  用作计数信号量：当前数据个数代表的是当前同时处于活动状态的 goroutine 的数量，容量代表允许同时处于活动状态的 goroutine 的最大数量。一个发往带缓冲 channel 的发送操作表示获得一个信号量槽位，一个来自带缓冲 channel 的接收操作表示释放一个信号量槽位。

```
var active = make(chan struct{}, 3)
var jobs = make(chan int, 10)

func main() {
   go func() {
      for i := 0; i < 10; i++ {
         jobs <- i + 1
      }
      close(jobs)
   }()

   var wg sync.WaitGroup
   for j := range jobs {
      wg.Add(1)
      go func(j int) {
         active <- struct{}{}
         log.Printf("Handle job :%d", j)
         time.Sleep(2 * time.Second)
         <-active
         wg.Done()
      }(j)
   }
   wg.Wait()
}
```

3.  len(channel) 的应用

当 channel 是无缓冲 channel 时，len(channel) 总是返回 0

当 channel 为带缓冲 channel 时，len(channel) 返回当前 channel 中尚未被读取的元素个数

使用 len(channel) 来判空后，多个 goroutine 之间可能存在竞态，导致判断失效。

因此常见的方法是将判空与读取放在一个事务中，将判满和写入放在一个事务中，这类事务可以通过 select 来实现。当是单接收多发送或者单发送多接收这两种场景时，可以使用 len(channel)

### Nil channel 的使用

对没有初始化的 channel 进行读写操作将会发生阻塞

```
对一个关闭的通道再发送值就会导致panic。
对一个关闭的通道进行接收会一直获取值直到通道为空。
对一个关闭的并且没有值的通道执行接收操作会得到对应类型的零值。
关闭一个已经关闭的通道会导致panic。
```

### 与 select 结合使用的一些惯用法

1.  利用 default 分支避免阻塞

select 的 default 分支会在其它分支均因通信未就绪而无法被选择的时候执行，因此可以利用此特性来避免阻塞

2.  实现超时机制

```
func worker() {
   select {
   case <-c:
   // ...
   case <-time.After(30 * time.Second):
      return
   }
}
```

3.  实现心跳机制

```
func worker() {
   heartbeat := time.NewTicker(30 * time.Second)
   defer heartbeat.Stop()
   for {
      select {
      case <-c:
      //
      case <-heartbeat.C:
         //...
      }
   }
}
```

## 了解 Sync 包的正确用法

Go 提倡不通过共享内存来通信，而是通过通信来共享内存。

-   在使用 sync 包中类型时，推荐通过闭包方式或传递类型实例的地址或者指针的方式进行
-   读写锁适用于具有一定并发量并且读多写少的场合
-   synx.Cond 实例的初始化需要一个满足实现了 sync.Locker 接口的类型实例，通常使用 sync.Mutex

```
groupSignal := sync.NewCond(&sync.Mutex{})
```

-   使用 sync.Once 来实现单例模式

```
var instance *Foo
var once sync.Once
func getInstance() *Foo {
   once.Do(func() {
      instance = &Foo{}  
   })
   return instance
}
```

-   使用 sync.Pool 来减轻垃圾回收压力

sync.Pool 是一个数据对象缓冲池，具有如下特点：

-   是 goroutine 并发安全的，可以被多个 goroutine 同时使用
-   放入该缓存池的数据对象的生命是暂时的，随时都可能被垃圾回收掉
-   缓存池中的对象是可以被重复利用的

存在问题：如果从 pool 中返回的 buffer 是刚刚被大数据撑大的，并且即将长期被用于处理一些小数据，那么这个 buffer 占用的大内存将长时间得不到释放。Go 标准库的做法：

1.  限制要放回缓存池中的数据对象的大小
1.  建立多级缓冲池

## 使用 atomic 包实现伸缩性更好的并发读取

适合一些对性能十分敏感、并发量较大且读多写少的场合

## 了解错误处理的 4 种策略

-   构造错误值
-   透明错误处理策略

使用 Go 标准库提供的两个基本错误值构造方法 errors.New 和 fmt.Errorf构造出来的错误值，对错误处理方是透明的，这种策略被称为透明错误处理策略

-   哨兵错误处理策略

通过定义导出的错误值的方式，避免字符串的硬编码，这种值就称为哨兵值

-   错误值类型检视策略

## 尽量优化反复出现的 if err != nil

## 不要使用 panic 进行正常的错误处理