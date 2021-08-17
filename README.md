# Lazzy.ts

**Lazzy.ts** is an easy to use, fast and lightweight typescript library, without any dependencies, which provides an easy way to work lazy with all kinds of iterable objects.

## Installation

Use the node package manager [npm](https://www.npmjs.com/package/lazzy.ts) to install lazzy.ts.

```bash
npm install lazzy.ts
```

## How to use it?

You have two options:

- you can import the entire **Lazy** object which combines all functions in one place and gives the ability to chain them together:
```typescript
import Lazy from "lazzy.ts";

const sum = Lazy.from([1, 2, 3, 4, 5, 6])
  .map((n) => n * 3)
  .filter((n) => n % 2 === 0)
  .sum();

console.log(sum); // 36
```

- or you can import each function separately and use them without chaining:
```typescript
import { toLazy, map, filter, sum } from "lazzy.ts";

const result = sum(
  filter(
    (n) => n % 2 === 0,
    map(
        (n) => n * 3, 
        toLazy([1, 2, 3, 4, 5, 6])
    )
  )
);

console.log(result); // 36
```

- or you can combine them:
```typescript
import Lazy, { filter, sum } from "lazzy.ts";

const iterator = Lazy.from([1, 2, 3, 4, 5, 6])
  .map((n) => n * 3)
  .toIterator();

const result = sum(filter((n) => n % 2 === 0, iterator));

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

In this case we will iterate only once through the array and we will produce only the final result, without using any extra memory. It is much much better!

## API Reference

### Generators

-   **Producing infinite count of values:**
    -   [ƒ range();](#ƒ-range)
    -   [ƒ randomInt();](#ƒ-randomint)
    -   [ƒ circular();](#ƒ-circular)
    -   [ƒ accumulate();](#ƒ-accumulate)

-   **Manipulating collections:**
    -   [ƒ append();](#ƒ-append)
    -   [ƒ chunk();](#ƒ-chunk)
    -   [ƒ circular();](#ƒ-circular)
    -   [ƒ concat();](#ƒ-concat)
    -   [ƒ distinct();](#ƒ-distinct)
    -   [ƒ feed();](#ƒ-feed)
    -   [ƒ filter();](#ƒ-filter)
    -   [ƒ filterWithIndex();](#ƒ-filterwithindex)
    -   [ƒ flat();](#ƒ-flat)
    -   [ƒ flatMap();](#ƒ-flatmap)
    -   [ƒ forEach();](#ƒ-foreach)
    -   [ƒ groupBy();](#ƒ-groupby)
    -   [ƒ indices();](#ƒ-indices)
    -   [ƒ intercept();](#ƒ-intercept)
    -   [ƒ lazyChunk();](#ƒ-lazychunk)
    -   [ƒ map();](#ƒ-map)
    -   [ƒ pair();](#ƒ-pair)
    -   [ƒ prepend();](#ƒ-prepend)
    -   [ƒ repeat();](#ƒ-repeat)
    -   [ƒ skip();](#ƒ-skip)
    -   [ƒ skipWhile();](#ƒ-skipwhile)
    -   [ƒ spread();](#ƒ-spread)
    -   [ƒ take();](#ƒ-take)
    -   [ƒ takeWhile();](#ƒ-takewhile)
    -   [ƒ toLazy();](#ƒ-tolazy)
    -   [ƒ zip();](#ƒ-zip)

### Consumers

-   **Math operations:**
    -   [ƒ average();](#ƒ-average)
    -   [ƒ count();](#ƒ-count)
    -   [ƒ min();](#ƒ-min)
    -   [ƒ max();](#ƒ-max)
    -   [ƒ sum();](#ƒ-sum)
    -   [ƒ product();](#ƒ-product)

-   **Convert to specific collection:**
    -   [ƒ toIterator();](#ƒ-toiterator)
    -   [ƒ toArray();](#ƒ-toarray)
    -   [ƒ toMap();](#ƒ-tomap)
    -   [ƒ toSet();](#ƒ-toset)
    -   [ƒ toWeakMap();](#ƒ-toweakmap)
    -   [ƒ toWeakSet();](#ƒ-toweakset)

-   **Produce a new value:**
    -   [ƒ reduce();](#ƒ-reduce)
    -   [ƒ join();](#ƒ-join)
    -   [ƒ partition();](#ƒ-partition)
    -   [ƒ uppend();](#ƒ-uppend)

-   **Checks:**
    -   [ƒ includes();](#ƒ-includes)
    -   [ƒ indexOf();](#ƒ-indexof)
    -   [ƒ lastIndexOf();](#ƒ-lastindexof)

-   **Pick a value:**
    -   [ƒ first();](#ƒ-first)
    -   [ƒ firstWithIndex();](#ƒ-firstwithindex)
    -   [ƒ last();](#ƒ-last)
    -   [ƒ lastWithIndex();](#ƒ-lastwithindex)

-   **Triggers the generator:**
    -   [ƒ run();](#ƒ-run)

## Usage

### **ƒ range();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ randomInt();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ circular();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ accumulate();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ append();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ chunk();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ circular();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ concat();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ distinct();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ feed();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ filter();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ filterWithIndex();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ flat();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ flatMap();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ forEach();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ groupBy();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ indices();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ intercept();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ lazyChunk();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ map();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ pair();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ prepend();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ repeat();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ skip();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ skipWhile();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ spread();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ take();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ takeWhile();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ toLazy();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ zip();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ average();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ count();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ min();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ max();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ sum();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ product();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ toIterator();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ toArray();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ toMap();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ toSet();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ toWeakMap();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ toWeakSet();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ reduce();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ join();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ partition();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ uppend();**
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ includes();**
- **description**: Determines whether an interable includes a certain value among its entries, returning true or false as appropriate. 
- **params**: predicate: (value: T) => boolean
- **returns**: resutl: boolean

```typescript
const value = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .includes(e => e.startsWith("J"));

console.log(value); // true
```

```typescript
const value = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .includes(e => e.startsWith("K"));

console.log(value); // false
```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ indexOf();**
- **description**: Returns the first index at which a given element can be found in the stream, or -1 if it is not present.
- **params**: predicate: (value: T) => boolean
- **returns**: index: number

```typescript
const value = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .indexOf(e => e.startsWith("J"));

console.log(value); // 0
```

If the element is not found then it will return **-1**.
```typescript
const value = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .indexOf(e => e.startsWith("K"));

console.log(value); // -1
``` 

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ lastIndexOf();**
- **description**: Searches for the last element which matches the predicate and returns the index of that element.
- **params**: predicate: (value: T) => boolean
- **returns**: index: number

```typescript
const value = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .indexOf(e => e.startsWith("J"));

console.log(value); // 2
```

If the element is not found then it will return **-1**.
```typescript
const value = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .indexOf(e => e.startsWith("K"));

console.log(value); // -1
``` 

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ first();**
- **description**: Searches for the first element which matches the predicate and returns it.
- **params**: predicate: (value: T) => boolean
- **returns**: value: T | undefined

```typescript
const value = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .first(e => e.startsWith("J"));

console.log(value); // "Josh"
```

If the element is not found then it will return **undefined**.
```typescript
const value = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .last(e => e.startsWith("K"));

console.log(value); // undefined
``` 

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ firstWithIndex();**
- **description**: Searches for the first element which matches the predicate and returns a tuple **[value, index]**. 
- **params**: predicate: (value: T) => boolean
- **returns**: tuple: [T | undefined, number]

```typescript
const [value, index] = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .lastWithIndex(name => name.startsWith("J"));

console.log(value); // "Josh"
console.log(index); // 0
``` 

If the searched value is not found then it will return **[undefined, -1]**.
```typescript
const [value, index] = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .lastWithIndex(name => name.startsWith("K"));

console.log(value); // undefined
console.log(index); // -1
``` 

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ last();**
- **description**: Searches for the last element which matches the predicate and returns it.
- **params**: predicate: (value: T) => boolean
- **returns**: value: T | undefined

```typescript
const value = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .last(e => e.startsWith("J"));

console.log(value); // "Jonathan"
```

If the element is not found then it will return **undefined**.
```typescript
const value = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .last(e => e.startsWith("K"));

console.log(value); // undefined
``` 

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ lastWithIndex();**
- **description**: Searches for the last element which matches the predicate and returns a tuple **[value, index]**. 
- **params**: predicate: (value: T) => boolean
- **returns**: tuple: [T | undefined, number]

```typescript
const [value, index] = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .lastWithIndex(name => name.startsWith("J"));

console.log(value); // "Jonathan"
console.log(index); // 2
``` 

If the searched value is not found then it will return **[undefined, -1]**.
```typescript
const [value, index] = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .lastWithIndex(name => name.startsWith("K"));

console.log(value); // undefined
console.log(index); // -1
``` 

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

### **ƒ run();**
- **description:** All generators are executed when they are consumed. With this function you can consume the generator, without producing a value. In other words - executes the generator.
- **params:** -
- **returns:** void

```typescript
// At this point the generator is not executed. We have to consume it.
const generator = Lazy.from([1, 2, 3]).forEach(n => console.log(n));

// Here we consume the generator.
generator.run();

/* output:
1
2
3
*/
```

<p align='right' style='font-size: 10px'>
    <a href="#api-reference">API Referance</a>
</p>

---

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
