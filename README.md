<p align="center">
    <img src="/assets/images/lazy-corgi.png" />
</p>

<h1 align="center">Lazzy.ts</h1>

<p align="center">
Fast, lightweight and easy to use typescript library for lazy operations with iterable objects.
</p>

<div align="center" >

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/ruskovweb/lazzy.ts/Node.js%20CI) ![npm](https://img.shields.io/npm/v/lazzy.ts)  ![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/ruskovweb/lazzy.ts?include_prereleases) ![GitHub](https://img.shields.io/github/license/ruskovweb/lazzy.ts) ![GitHub repo size](https://img.shields.io/github/repo-size/ruskovweb/lazzy.ts) ![npm bundle size](https://img.shields.io/bundlephobia/min/lazzy.ts?color=important)

</div>

## Installation

You can use one of the following package managers:

- Node package manager [npm](https://www.npmjs.com/package/lazzy.ts):

```bash
npm install lazzy.ts
```

- Yarn package manager [yarn](https://yarnpkg.com/package/lazzy.ts):

```bash
yarn add lazzy.ts
```

## Try it online!
You can use [codesandbox.io](https://codesandbox.io) to try *Lazzy.ts*.

Follow these steps to create a new project:
- Click on the link above;
- Click on the 'Create Sandbox' button;
- Choose 'Vanilla Typescript';
- In the left sidebar, we have a section called 'Dependencies'. Type 'lazzy.ts' in the input field 'Add Dependency' and hit enter to add the *Lazzy.ts* library.
- Delete the autogenerated code in the index.ts file.

Now you can try all the examples shown here. Just copy one of the examples and paste it in your newly created project.

## How to use it?

You have several options:

- you can import the entire **Lazy** object which combines all functions in one place and gives the ability to chain them together:
```typescript
import Lazy from "lazzy.ts";

const sum = Lazy.from([1, 2, 3, 4, 5, 6])
  .map(n => n * 3)
  .filter(n => n % 2 === 0)
  .sum();

console.log(sum); // 36
```

- or you can import each function separately and use them without chaining:
```typescript
import { toLazy, map, filter, sum } from "lazzy.ts";

// Without chaining:
const lazy = toLazy([1, 2, 3, 4, 5, 6]);
const transformed = map(lazy, n => n * 3);
const filtered = filter(transformed, n => n % 2 === 0);
const result = sum(filtered);

console.log(result); // 36
```

```typescript
import { toLazy, map, filter, sum } from "lazzy.ts";

// Nested:
const result = sum(
    filter(
        map(toLazy([1, 2, 3, 4, 5, 6]), (n) => n * 3),
        (n) => n % 2 === 0
    )
);

console.log(result); // 36
```

- or you can combine them:
```typescript
import Lazy, { filter, sum } from "lazzy.ts";

const iterator = Lazy.from([1, 2, 3, 4, 5, 6])
  .map(n => n * 3)
  .toIterator();

const result = sum(filter(iterator, n => n % 2 === 0));

console.log(result); // 36
```

As you can see we can achieve the same thing with three different approaches.

## Introduction

What is lazy? What does this mean?

Let's see one simple example to illustrate what lazy is and why it's so useful and powerful.

So let's assume that we have an array of numbers and we want to multiply each number by 3, then we want to filter only the even numbers and finally to take the total sum of the even numbers.

In a traditional JavaScript this logic will look like this:

```typescript
const source = [1, 2, 3, 4];
const result = source
    .map(n => n * 3)
    .filter(n => n % 2 === 0)
    .reduce((prev, next) => prev + next, 0);

console.log(result); // 18
```

With **lazzy.ts** it will look like this:

```typescript
import Lazy from "lazzy.ts";

const source = [1, 2, 3, 4];
const result = Lazy.from(source)
    .map(n => n * 3)
    .filter(n => n % 2 === 0)
    .sum();

console.log(result); // 18
```

So what is the difference? The result is the same, right? Why do we need this **lazzy.ts** library?

The answer is very simple. Because it is **Lazy**.
In the first example each function (map, filter and reduce) produces a new array or value, which means that we will iterate through each array. In this case we have the initial array and two newly created arrays (one from the 'map' function and one from the 'filter' function) and finally we will produce a new value with the 'reduce' function. This is very expensive! Don't do this! You can do it better!

With the **lazzy.ts** example we will iterate only once through the initial array and we will apply all operations for each value. This means that we will not produce new arrays. We will produce only the final result, which is 18 in this case. This is much better, right?

So let's rewrite these two examples with 'for' loops to see what happens under the hood:

```typescript
// The first example will execute something like this
const source = [1, 2, 3, 4];

const resultAfterMap = [];                            // map
for (let i = 0; i < source.length; i++) {
    resultAfterMap.push(source[i] * 3);
}

const resultAfterFilter = [];                         // filter
for (let i = 0; i < resultAfterMap.length; i++) {
    if (resultAfterMap[i] % 2 === 0) {
        resultAfterFilter.push(resultAfterMap[i]);
    }
}

let result = 0;                                       // sum
for (let i = 0; i < resultAfterFilter.length; i++) {
    result += resultAfterFilter[i];
}

console.log(result); // 18
```

So we have two newly created arrays and three 'for' loops.

```typescript
// The second example will execute something like this
const source = [1, 2, 3, 4];

let result = 0;
for (let i = 0; i < source.length; i++) {
    const newValue = source[i] * 3;       // map
    if (newValue % 2 === 0) {             // filter
        result += newValue;               // sum
    }
}

console.log(result); // 18
```

In this case we will iterate only once through the initial array and we will produce only the final result, without using any extra memory. It is much much better!


## API Reference
We have a bunch of lazy functions that you can see here!

### Generators

-   **Producing infinite count of values:**
    -   [ƒ range();](DOCUMENTATION.md#range)
    -   [ƒ random();](DOCUMENTATION.md#random)
    -   [ƒ circular();](DOCUMENTATION.md#circular)
    -   [ƒ accumulate();](DOCUMENTATION.md#accumulate)
    -   [ƒ generate();](DOCUMENTATION.md#generate)

-   **Manipulating collections:**
    -   [ƒ append();](DOCUMENTATION.md#append)
    -   [ƒ chunk();](DOCUMENTATION.md#chunk)
    -   [ƒ circular();](DOCUMENTATION.md#circular)
    -   [ƒ concat();](DOCUMENTATION.md#concat)
    -   [ƒ distinct();](DOCUMENTATION.md#distinct)
    -   [ƒ feed();](DOCUMENTATION.md#feed)
    -   [ƒ filter();](DOCUMENTATION.md#filter)
    -   [ƒ filterWithIndex();](DOCUMENTATION.md#filterwithindex)
    -   [ƒ flat();](DOCUMENTATION.md#flat)
    -   [ƒ flatMap();](DOCUMENTATION.md#flatmap)
    -   [ƒ forEach();](DOCUMENTATION.md#foreach)
    -   [ƒ groupBy();](DOCUMENTATION.md#groupby)
    -   [ƒ indices();](DOCUMENTATION.md#indices)
    -   [ƒ intercept();](DOCUMENTATION.md#intercept)
    -   [ƒ lazyChunk();](DOCUMENTATION.md#lazychunk)
    -   [ƒ map();](DOCUMENTATION.md#map)
    -   [ƒ prepend();](DOCUMENTATION.md#prepend)
    -   [ƒ repeat();](DOCUMENTATION.md#repeat)
    -   [ƒ skip();](DOCUMENTATION.md#skip)
    -   [ƒ skipWhile();](DOCUMENTATION.md#skipwhile)
    -   [ƒ spread();](DOCUMENTATION.md#spread)
    -   [ƒ take();](DOCUMENTATION.md#take)
    -   [ƒ takeWhile();](DOCUMENTATION.md#takewhile)
    -   [ƒ toLazy();](DOCUMENTATION.md#tolazy)
    -   [ƒ zip();](DOCUMENTATION.md#zip)

### Consumers

-   **Math operations:**
    -   [ƒ average();](DOCUMENTATION.md#average)
    -   [ƒ count();](DOCUMENTATION.md#count)
    -   [ƒ min();](DOCUMENTATION.md#min)
    -   [ƒ max();](DOCUMENTATION.md#max)
    -   [ƒ sum();](DOCUMENTATION.md#sum)
    -   [ƒ product();](DOCUMENTATION.md#product)

-   **Convert to specific collection:**
    -   [ƒ toIterator();](DOCUMENTATION.md#toiterator)
    -   [ƒ toArray();](DOCUMENTATION.md#toarray)
    -   [ƒ toMap();](DOCUMENTATION.md#tomap)
    -   [ƒ toSet();](DOCUMENTATION.md#toset)
    -   [ƒ toWeakMap();](DOCUMENTATION.md#toweakmap)
    -   [ƒ toWeakSet();](DOCUMENTATION.md#toweakset)

-   **Produce a new value:**
    -   [ƒ reduce();](DOCUMENTATION.md#reduce)
    -   [ƒ join();](DOCUMENTATION.md#join)
    -   [ƒ partition();](DOCUMENTATION.md#partition)
    -   [ƒ uppend();](DOCUMENTATION.md#uppend)

-   **Checks:**
    -   [ƒ includes();](DOCUMENTATION.md#includes)
    -   [ƒ indexOf();](DOCUMENTATION.md#indexof)
    -   [ƒ lastIndexOf();](DOCUMENTATION.md#lastindexof)

-   **Pick a value:**
    -   [ƒ first();](DOCUMENTATION.md#first)
    -   [ƒ firstWithIndex();](DOCUMENTATION.md#firstwithindex)
    -   [ƒ last();](DOCUMENTATION.md#last)
    -   [ƒ lastWithIndex();](DOCUMENTATION.md#lastwithindex)

-   **Triggers the generator:**
    -   [ƒ run();](DOCUMENTATION.md#run)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
