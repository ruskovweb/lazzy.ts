# Lazzy.ts

**Lazzy.ts** is an easy to use, fast and lightweight typescript library, without any dependencies, which provides an easy way to work lazy with all kinds of iterable objects.

## Installation

Use the node package manager [npm](https://www.npmjs.com/package/lazzy.ts) to install lazzy.ts.
**It will be available soon!**
```bash
npm install lazzy.ts
```

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

In this case we will iterate only once through the array and we will produce only the final result, without using any extra memory. It is much much better!

## API Reference

### Generators

-   **Producing infinite count of values:**
    -   ƒ range();
    -   ƒ randomInt();
    -   ƒ circular();
    -   ƒ accumulate();

-   **Manipulating collections:**
    -   ƒ accumulate();
    -   ƒ append();
    -   ƒ chunk();
    -   ƒ circular();
    -   ƒ concat();
    -   ƒ distinct();
    -   ƒ feed();
    -   ƒ filter();
    -   ƒ filterWithIndex();
    -   ƒ flat();
    -   ƒ flatMap();
    -   ƒ forEach();
    -   ƒ groupBy();
    -   ƒ indices();
    -   ƒ intercept();
    -   ƒ lazyChunk();
    -   ƒ map();
    -   ƒ pair();
    -   ƒ prepend();
    -   ƒ repeat();
    -   ƒ skip();
    -   ƒ skipWhile();
    -   ƒ spread();
    -   ƒ take();
    -   ƒ takeWhile();
    -   ƒ toLazy();
    -   ƒ zip();

### Consumers

-   **Math operations:**
    -   ƒ average();
    -   ƒ count();
    -   ƒ min();
    -   ƒ max();
    -   ƒ sum();
    -   ƒ product();

-   **Convert to specific collection:**
    -   ƒ toIterator();
    -   ƒ toArray();
    -   ƒ toMap();
    -   ƒ toSet();
    -   ƒ toWeakMap();
    -   ƒ toWeakSet();

-   **Produce a new value:**
    -   ƒ reduce();
    -   ƒ join();
    -   ƒ partition();
    -   ƒ uppend();

-   **Checks:**
    -   ƒ includes();
    -   ƒ indexOf();
    -   ƒ lastIndexOf();

-   **Pick a value:**
    -   ƒ first();
    -   ƒ firstWithIndex();
    -   ƒ last();
    -   ƒ lastWithIndex();

-   **Triggers the generator:**
    -   ƒ run();

## Usage

Coming soon...

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
