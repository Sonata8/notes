# C语言速通

学 OI 的时候基本语法都学过了，这里记录一些细节。

**教材：《C语言程序设计：现代方法(第二版·修订版)》 By K.N.King**

## 字符串

- `getchar()` 要么返回一个 `unsigned char` 转换成的 `int`，要么返回特殊值 `EOF`（通常是 -1）。因此，应当使用`int`型变量接收，若使用`char`当 `getchar()` 返回 `EOF` 时可能会被错误地截断成一个正常字符（例如在有符号 `char` 的系统上，`EOF` = -1 会被当作 `0xFF`，这就和输入的 `ÿ` 混淆）。
- C风格的字符串**必须**以`\0`结束，否则后续在`printf/puts`会由于访问越界而导致 UB。

```c
int read_line(char str[], int n) { 
    int ch, i = 0; 
    while ((ch = getchar()) != '\n') 
        if (i < n) 
            str[i++] = ch; 
    str[i] = '\0'; /* terminates string */ 
    return i; /* number of characters stored */ 
}
```



# 宏定义

在有参数的宏定义标识符中，会**先把参数中存在的宏展开**，然后把标识符所在的位置替换成**展开后的实际内容**。**但是**如果替换内容中**直接**对参数使用了 `#`（stringize）或 `##`（token-paste），该参数在进入 `#`/`##` 前就**不会**先宏展开。

例如，我们想要定义一个调用后可以输出调用时所在行和文件的宏，**下面的写法是错误的**。

```c
#define STR_BAD(x) #x
#define LINE_BAD STR_BAD(__LINE__)

const char *s = LINE_BAD;  /* 这里 s 会成为 " __LINE__ " 而不是 "50" */
```

想要解决这个问题，我们需要用一种“**逐步展开**”的技巧：

```c
#define STR_HELPER(x) #x
#define STR(x) STR_HELPER(x)
#define LINE_FILE "Line " STR(__LINE__) " of file " __FILE__


const char *str = LINE_FILE;
```

此时，我们的过程是：首先把`LINE_FILE`的内容替换了；然后，我们要先替换`STR(__LINE__)`为`STR_HELPER(x)`、`__FILE__`则被替换为文件名称。由于`STR(x)`中**没有直接使用`#`**，因此先替换了`__LINE__`，然后再传入`STR_HELPER(x)`给“串化”。如此得到了我们希望的效果。
