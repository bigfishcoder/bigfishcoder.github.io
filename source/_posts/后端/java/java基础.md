---
title: "Java 基础教程"
categories: 
  - Backend
  - Java
tags:
  - 技术
  - 后端
  - 查缺补漏
  - 基础
excerpt: 记录学习中一些不熟悉的内容

---

## 练习1:杨辉三角

```java
import java.util.Arrays;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) {
        int numberOfRows = 9;
        int[][] yangHuiTriangle = new int[numberOfRows][];
        yangHuiTriangle[0] = new int[1];
        yangHuiTriangle[0][0] = 1;

        for (int i = 1; i < numberOfRows; i++) {
            yangHuiTriangle[i] = new int[i + 1]; // 初始化当前行
            for (int j = 0; j < i; j++) {
                if (j == 0 || j == i - 1) {
                    yangHuiTriangle[i][j] = 1;
                    continue;
                }
                yangHuiTriangle[i][j] = yangHuiTriangle[i - 1][j - 1] + yangHuiTriangle[i - 1][j];
            }
        }
        for (int[] row : yangHuiTriangle) {
            for (int element : row) {
                if (element == 0) continue;
                System.out.print(element + " ");
            }
            System.out.println();
        }
    }
}

```

在写杨辉三角案例的时候发现了一个二维数组初始化的问题。

如果只初始化行的话, 二维的数组默认值是null

```java
int numberOfRows = 5; // 例如5行
int[][] yangHuiTriangle = new int[numberOfRows][]; // 只初始化行
yangHuiTriangle[0][0] = 1;
```

如果不初始化就进行赋值的话就会报错

```java
Exception in thread "main" java.lang.NullPointerException: Cannot store to int array because "yangHuiTriangle[0]" is null
	at Main.main(Main.java:10)
```

所以必须初始化之后在进行赋值

```java
int numberOfRows = 5; // 例如5行
int[][] yangHuiTriangle = new int[numberOfRows][]; // 只初始化行
yangHuiTriangle[0] = new int[1];
yangHuiTriangle[0][0] = 1;
```

## 随机数

在java中有常见的两种生成随机数的方法是Math.random() 和java.util.Random类

### 1. 基本用法

### `Math.random()` 方法

功能: 生成[0.0,1.0)范围内的double类型的伪随机数,线程安全的

语法:Math.ranndom()

```java
// 0-100
int randomInt = (int)(Math.random() * 100)
    
// 1-30
int randomInt = (int)(Math.random() * 30) + 1

// 生成 [5, 20] 的随机整数（通用公式）
int min = 5, max = 20;
int randomInt = (int) (Math.random * (max - min + 1)) + min
```

### `java.util.Random` 类

#### 1. 基本用法

- **功能**：生成多种类型的随机数（整数、浮点数、布尔值等）。线程不安全
- **语法**：

```java
Random random = new Random(); // 默认种子为系统时间
Random seededRandom = new Random(123L); // 指定种子
```

#### 2. 核心方法

| 方法                 | 返回值    | 范围                 |
| :------------------- | :-------- | :------------------- |
| `nextInt()`          | `int`     | 所有可能的 `int` 值  |
| `nextInt(int bound)` | `int`     | `[0, bound)`         |
| `nextDouble()`       | `double`  | `[0.0, 1.0)`         |
| `nextBoolean()`      | `boolean` | `true` 或 `false`    |
| `nextLong()`         | `long`    | 所有可能的 `long` 值 |

## 练习2:随机赋值

创建一个长度为6的int型数组，要求数组元素的值都在1-30之间， 且是随机赋值。同时，要求元素的值各不相同。

```java
int[] arr = new int[6];

for(int i = 0; i < arr.length; i++){
    for(int j = 0; j < i; j++){
        if(arr[i] == arr[j]){
            i--;
            break;
        }
    }
}
```

##  练习3:遍历扑克牌 

```java
import java.util.Arrays;


public class Main {
    public static void main(String[] args) {
        String[] suit = new String[]{"♣", "♦", "♥", "♠"};
        String[] scores = new String[]{"3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A", "2"};
        String[] poker = new String[56];

        int total = 0;
        for (int i = 0; i < suit.length; i++) {
            for (int j = 0; j < scores.length; j++) {
                poker[total++] = suit[i] + scores[j];
            }
        }

        poker[total++] = "Big Joker";
        poker[total++] = "Little Joker";


        for (int i = 0; i < total; i++) {
            if (i % 13 == 0 && i != 0) {
                System.out.println();
            }
            System.out.print(poker[i] + " ");

        }

    }
}
```

## 练习4: 螺旋矩阵

### 思路分析

`1. 螺旋矩阵的特点`

螺旋矩阵是指数字从外向内顺时针螺旋排列方阵.

我们来拿4 * 4的方阵举例

```java
1 → 2 → 3 → 4
           ↓
12 →13 →14  5
↑        ↓  ↓
11  16 ←15  6
↑           ↓
10 ←9 ←8 ←  7
```

`2. 实现思路`

我们采用"边界收缩法"来实现

- 定义四个边界 top, bottom, left, right
- 按照"上边 -> 右边 -> 下边 -> 左边"的顺序来填充
- 每填充完一条边,对应的边界像内搜索
- 重复此过程直到所有数字填完

1. 我们先来定义一个nxn的二维数组来存放数据

```java
n = 4
int num = 1;
int[][] arr = new int[n][n]
```

2. 我们来定义4条边界

```java
int top = 0, bottom = n -1, left = 0, right = n -1
```

top = 0 代表上边界的第0行

bottom = 0 代表下边界的 最后一行

left = 0  代表左边界的第 0 列

right = n -1 代表 右边的最后一列

3. 定义循环控制条件

```java
  while (num <= n * n) {}
```

4. 从左向右填充

```java
for(int i = left; i <= right;i++){
  		arr[left][i] = num++;
}
  	top++
```

此时我们就完成了从左到右的填充

```
[

​	[1, 2, 3, 4],

​   [0, 0, 0, 0], ←  top++ 将移动到这行

​   [0, 0, 0, 0],

​   [0, 0, 0, 0]

]

top++ 
```

5. 从上到下填充

```java
for(int i = top; i <= bottom;i++){
  		arr[i][right] = num++;
  	}
right--
```

此时就完成了从上到下的填充

```
[

​	[1, 2, 3, 4],

​   [0, 0, 0, 5], 

​   [0, 0, 0, 6],

​   [0, 0, 0, 7]
		   ↑ 
		   right-- 此时就指向了这一列
]


```

6. 从右到左填充

```java
for(int i = right; i >= left; i--){
     arr[bottom][i] = num++;
}
bottom--;
```

此时就完成了从右到左的填充

```
[

​		                     [1, 2, 3, 4],

​  		                     [0, 0, 0, 5], 

​  bottom--之后指向的位置     → [0, 0, 0, 6],
  
​                            [10, 9, 8, 7]

]

```

7. 从下到上填充

```
for(int i = bottom; i >= top; i--){
     arr[i][left] = num++;
}
left++;
```

此时就填充完了一圈

```
[

​		[1, 2, 3, 4],
             ↓ 此时的left ++  

​  		[12, 0, 0, 5], 

​ 		[11, 0, 0, 6],
  
​       [10, 9, 8, 7]

]


```

在填充 n轮后 到达 边界检测条件后就完成了填充 

```java
  while (num <= n * n) {}
```

`完整代码`

```java

public class Main {

    public static void main(String[] args) {

        int n = 4;
        int[][] arr = new int[n][n];
        int num = 1;
        int top = 0, bottom = n - 1, left = 0, right = n - 1;

        while (num <= n * n) {
            for (int i = left; i <= right; i++) {
                arr[top][i] = num++;
            }
            top++;

            for (int i = top; i <= bottom; i++) {
                arr[i][right] = num++;
            }
            right--;

            for (int i = right; i >= left; i--) {
                arr[bottom][i] = num++;
            }
            bottom--;

            for (int i = bottom; i >= top; i--) {
                arr[i][left] = num++;
            }
            left++;

        }
    }
}

```

*这套实现方法有局限性只能 做固定起点、固定顺时针的矩阵填充,不能做动态方向/中心扩展/不规则矩阵/变化版螺旋布局*

### 第二套实现方案

方向数组 + 步长控制





