# Loip

[English Documentation](README.md)

[![npm 版本](https://img.shields.io/npm/v/loip.svg)](https://www.npmjs.com/package/loip)
[![许可证](https://img.shields.io/npm/l/loip.svg)](https://github.com/simon1uo/loip/blob/main/LICENSE)
[![Vue 版本](https://img.shields.io/badge/Vue-3.x-brightgreen.svg)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![GitHub 星标](https://img.shields.io/github/stars/simon1uo/loip.svg?style=social)](https://github.com/simon1uo/loip)

**Loip** 是一个 Vue 3 库，包含用于**生成占位文本**的组件和函数。

当您开发模拟页面或后端 API 尚未准备好进行数据获取，而您必须使用静态数据进行前端开发直到数据就绪时，`loip` 将为您创建随机文本。

除了 Lorem Ipsum 文本外，您还可以生成**随机头像、名字、姓氏、全名**和**用户名**，以随机填充有关用户的字段。

👍 **loip** 是一个零依赖、易于使用的包。

## DEMO

[https://loip-demo.vercel.app/](https://loip-demo.vercel.app/)

## 安装

```bash
npm install loip
```

或者

```bash
pnpm add loip
```

或者

```bash
yarn add loip
```

## 如何导入

### 组件

```js
import { Avatar, LoremIpsum } from 'loip'
```

### 函数

```js
import { fullname, loremIpsum, name, surname, username } from 'loip'
```

## 属性

### LoremIpsum (组件), loremIpsum (函数)

**loremIpsum** 是组件 **LoremIpsum** 的函数版本，它生成纯文本而不是 HTML。它们都接收相同的属性/输入作为单个对象。

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| p | number | 1 | 将生成的段落数 |
| avgWordsPerSentence | number | 8 | 每个句子创建的平均单词数（标准偏差固定为 ±25%） |
| avgSentencesPerParagraph | number | 8 | 每个段落创建的平均句子数（标准偏差固定为 ±25%） |
| startWithLoremIpsum | bool | true | 第一段的第一句以 'Lorem ipsum odor amet...' 开始 |
| random | bool | true | 如果禁用，则始终生成相同的文本 |

_注意：_ 如果您使用 loremIpsum 函数生成纯文本，它将返回一个长度为所需计数的"数组"。您可以使用 "Array.map" 或类似方法来处理数据。有关详细信息，请参见[示例](#示例)。

### Avatar (组件)

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| gender | string | 'all' | 头像图片的性别。可能的值是 **'all'**、**'male'** 和 **'female'**。 |

_注意：_ Avatar 组件返回一个带有随机图像的 `<img />` 标签。所有其他属性如 "className, width, height, alt" 等将直接传递给元素。

### name, fullname (函数)

| 名称 | 类型 | 默认值 | 描述 |
| --- | --- | --- | --- |
| gender | string | 'all' | 生成的名字或全名的性别。可能的值是 **'all'**、**'male'** 和 **'female'**。 |

### surname, username (函数)

`surname` 和 `username` 函数**不接受任何输入**。它们只是分别创建随机姓氏和用户名。

## 示例

### LoremIpsum (组件)

**代码**

```jsx
import { LoremIpsum } from 'loip'

<template>
  <div class="text-wrapper">
    <LoremIpsum :p="2" />
  </div>
</template>
```

**HTML 输出**

```html
<div class="text-wrapper">
  <p>
    Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius;
    dignissim elementum. Mollis tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare.
    Hendrerit parturient habitant pharetra rutrum gravida porttitor eros feugiat. Mollis elit
    sodales taciti duis praesent id. Consequat urna vitae morbi nunc congue.
  </p>
  <p>
    Non etiam tempor id arcu magna ante eget. Nec per posuere cubilia cras porttitor condimentum
    orci suscipit. Leo maecenas in tristique, himenaeos elementum placerat. Taciti rutrum nostra,
    eget cursus velit ultricies. Quam molestie tellus himenaeos cubilia congue vivamus ultricies.
    Interdum praesent ut penatibus fames eros ad consectetur sed.
  </p>
</div>
```

### loremIpsum (函数)

**代码 1**

```jsx
import { loremIpsum } from 'loip'

<template>
  <div class="text-wrapper">{{ loremIpsum()[0] }}</div>
</template>
```

**HTML 输出 1**

```html
<div class="text-wrapper">
  Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet erat nullam tortor quis elit lacus
  blandit vitae. Nostra dapibus bibendum; curae magnis commodo metus vestibulum tristique. Tristique
  volutpat consectetur congue lorem pharetra habitant. Sodales gravida egestas venenatis dignissim
  molestie cursus porta. Massa lacus pulvinar aliquam mi tristique.
</div>
```

**代码 2**

```jsx
import { loremIpsum } from 'loip'

<template>
  <div class="text-wrapper">
    <div v-for="(text, index) in loremIpsum({ p: 3 })" :key="index" class="text">
      {{ text }}
    </div>
  </div>
</template>
```

**HTML 输出 2**

```html
<div class="text-wrapper">
  <div class="text">
    Lorem ipsum odor amet, consectetuer adipiscing elit. Primis eros nunc fringilla id rutrum nibh.
    Orci convallis pulvinar urna fusce at purus neque nam leo? Suspendisse semper facilisi
    parturient sit euismod placerat. Orci ante luctus praesent torquent orci commodo aptent blandit.
    Placerat arcu dui potenti; nullam taciti taciti amet.
  </div>
  <div class="text">
    Ridiculus proin etiam justo vivamus dignissim suscipit maecenas. Gravida ornare interdum ex dui
    eu faucibus dictum dis blandit. Rhoncus habitasse suscipit felis massa, ultrices auctor. Laoreet
    magnis justo velit vulputate iaculis at pulvinar augue. Condimentum suspendisse habitasse metus
    cubilia curabitur non sem. Primis nam in nulla phasellus bibendum pretium.
  </div>
  <div class="text">
    Augue malesuada massa torquent diam tortor; porttitor dis massa. Habitasse nunc ad placerat;
    ante netus gravida a porttitor. Vel aliquet hendrerit efficitur facilisis fames lacinia porta
    per. Integer euismod aenean mi hendrerit in volutpat consequat tempus turpis. Bibendum massa ad
    tincidunt, platea montes ac arcu. Penatibus elit justo adipiscing magna vulputate leo per.
  </div>
</div>
```

### Avatar, name, surname, fullname, username

**代码 1**

```jsx
import { Avatar, name, surname, username } from 'loip'

<template>
  <div class="user">
    <!-- 所有属性将直接传递给 img 元素 -->
    <Avatar gender="male" class="avatar" width="200" height="200" alt="Avatar" />
    <div class="name">{{ name('male') }}</div>
    <div class="surname">{{ surname() }}</div>
    <div class="username">{{ username() }}</div>
  </div>
</template>
```

**HTML 输出 1**

```html
<div class="user">
  <img class="avatar" src="https://randomuser.me/api/portraits/men/32.jpg" width="200" height="200" alt="Avatar" />
  <div class="name">John</div>
  <div class="surname">Smith</div>
  <div class="username">smart_guru</div>
</div>
```

**代码 2**

```jsx
import { fullname, username } from 'loip'

<template>
  <div class="user">
    <div class="full-name">{{ fullname('female') }}</div>
    <div class="username">@{{ username() }}</div>
  </div>
</template>
```

**HTML 输出 2**

```html
<div class="user">
  <div class="full-name">Jennifer S. Rose</div>
  <div class="username">@smart.fox.19</div>
</div>
```

## License

[MIT](LICENSE) © 2024 Simon Luo
