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



