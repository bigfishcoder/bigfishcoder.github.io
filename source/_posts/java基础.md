###  java基础

记录学习中一些不熟悉的内容

<!-- more -->

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

## 练习2:创建一个长度为6的int型数组，要求数组元素的值都在1-30之间， 且是随机赋值。同时，要求元素的值各不相同。

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

### 练习3:遍历扑克牌 

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

