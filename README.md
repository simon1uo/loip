# Loip

**Loip** is a Vue 3 library including components and functions to **generate placeholder text**.

When you develop a mockup page or backend API is not ready for data fetching and you have to make Frontend Development with static data until it comes, `loip` will create your gibberish texts for you.

In addition to Lorem Ipsum text, you can generate **random avatars, names, surnames, full names** and **usernames** to fill the fields about users randomly.

👍 **loip** is a zero-dependency, easy-to-use package.

## Install

```bash
npm install loip
```

or

```bash
pnpm add loip
```

or

```bash
yarn add loip
```

## How to Import

### Components

```js
import { Avatar, LoremIpsum } from 'loip'
```

### Functions

```js
import { fullname, loremIpsum, name, surname, username } from 'loip'
```

## Props

### LoremIpsum (Component), loremIpsum (function)

**loremIpsum** is function version of the component **LoremIpsum** which generates plain text instead of HTML. They both get the same props/inputs as a single object.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| p | number | 1 | Number of paragraphs that will be generated |
| avgWordsPerSentence | number | 8 | Avarage number of words created for each sentence (standard deviation is fixed ±25%) |
| avgSentencesPerParagraph | number | 8 | Avarage number of sentences created for each paragraph (standard deviation is fixed ±25%) |
| startWithLoremIpsum | bool | true | Start with 'Lorem ipsum odor amet...' to first sentence of first paragraph |
| random | bool | true | If disabled always generates the same text |

_Note:_ If you use loremIpsum function to generate plain text, it will return an "Array" with length of the desired count. You can use "Array.map" or similar methods to process the data. See [Examples](#examples) for details.

### Avatar (Component)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| gender | string | 'all' | Gender for the Avatar picture. Possible values are **'all'**, **'male'** and **'female'**. |

_Note:_ Avatar component returns an `<img />` tag with a random image. All other props like "className, width, height, alt" etc. will directly passed to element.

### name, fullname (Functions)

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| gender | string | 'all' | Gender for the generated name or full name. Possible values are **'all'**, **'male'** and **'female'**. |

### surname, username (Functions)

`surname` and `username` functions **does not take any inputs**. They just create random surnames and usernames respectively.

## Examples

### LoremIpsum (Component)

**Code**

```jsx
import { LoremIpsum } from 'loip'

<template>
  <div class="text-wrapper">
    <LoremIpsum :p="2" />
  </div>
</template>
```

**HTML Output**

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

### loremIpsum (Function)

**Code 1**

```jsx
import { loremIpsum } from 'loip'

<template>
  <div class="text-wrapper">{{ loremIpsum()[0] }}</div>
</template>
```

**HTML Output 1**

```html
<div class="text-wrapper">
  Lorem ipsum odor amet, consectetuer adipiscing elit. Imperdiet erat nullam tortor quis elit lacus
  blandit vitae. Nostra dapibus bibendum; curae magnis commodo metus vestibulum tristique. Tristique
  volutpat consectetur congue lorem pharetra habitant. Sodales gravida egestas venenatis dignissim
  molestie cursus porta. Massa lacus pulvinar aliquam mi tristique.
</div>
```

**Code 2**

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

**HTML Output 2**

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

**Code 1**

```jsx
import { Avatar, name, surname, username } from 'loip'

<template>
  <div class="user">
    <!-- All props will be directly transferred to img element -->
    <Avatar gender="male" class="avatar" width="200" height="200" alt="Avatar" />
    <div class="name">{{ name('male') }}</div>
    <div class="surname">{{ surname() }}</div>
    <div class="username">{{ username() }}</div>
  </div>
</template>
```

**HTML Output 1**

```html
<div class="user">
  <img class="avatar" src="https://randomuser.me/api/portraits/men/32.jpg" width="200" height="200" alt="Avatar" />
  <div class="name">John</div>
  <div class="surname">Smith</div>
  <div class="username">smart_guru</div>
</div>
```

**Code 2**

```jsx
import { fullname, username } from 'loip'

<template>
  <div class="user">
    <div class="full-name">{{ fullname('female') }}</div>
    <div class="username">@{{ username() }}</div>
  </div>
</template>
```

**HTML Output 2**

```html
<div class="user">
  <div class="full-name">Jennifer S. Rose</div>
  <div class="username">@smart.fox.19</div>
</div>
```
