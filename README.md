serialnum
=============

随机序列号生成器

### 安装

```shell
npm install git@112.74.84.77:base/serialnum.git --save
```

### 测试
```shell
npm run test
# or
make
```

### 例子
```javascript
var postal = require('serialnum')('postal');

// 生产新的随机序列号
var number = postal.generate();

// 校验
postal.check(1635500754); // => true
postal.check(1635500753); // => false
```

### 编号组成部分

例子:
```
16   3550075   4
==   *******   +
年    随机数  校验位
```

### 编号校验位的算法

例子: 1 **63550075** 4

```
  6   3   5   5   0   0   7   5
* 8   6   4   2   3   5   9   7
= 48+ 18+ 20+ 10+ 0+  0+  63+ 35 = 194

  194 / 11 = 17  余数为7  （规定用11去除）
  11 - 7 = 4     9为校验位 (规定以11为被减数)

  余数为0时，校验位定义为5；余数为1时，校验位定义为0；
```