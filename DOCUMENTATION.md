# Documentation

Here you can see all the functions and how they work. 

This documentation is divided into 3 parts:
  - Methods that start the chain;
  - Methods that manipulate the sequence without breaking the chain;
  - Methods that break the chain (Consumers);

<h2 align="center">Methods that can start the chain</h2>

#### circular\<T\>();
- **description**: Generates an infinitely repeating sequence of values.
- **params**: 
  - `values: Iterable<T>`
- **returns**: 
  - `lazyCollection: ILazyCollection<T, void, undefined>`

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.circular([1, 2, 3, 4]).take(8).toArray();
console.log(result) // [1, 2, 3, 4, 1, 2, 3, 4];
```

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.circular([1, 2]).take(8).toArray();
console.log(result) // [1, 2, 1, 2, 1, 2, 1, 2];
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### fibonacci();
- **description**: Generates the fibonacci sequence.
- **params**:
  - `minimum?: number = 1`
- **returns**:
  - `lazyCollection: ILazyCollection<number, void, number>`

```typescript
import Lazy from "lazzy.ts";

const fibonacci = Lazy.fibonacci().take(10).toArray();
console.log(fibonacci); // [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
```

```typescript
import Lazy from "lazzy.ts";

// Generates 10 fibonacci numbers greater than or equal to 10
const fibonacci = Lazy.fibonacci(10).take(10).toArray();
console.log(fibonacci); // [13, 21, 34, 55, 89, 144, 233, 377, 610, 987]
```

```typescript
import Lazy from "lazzy.ts";

// Skips the first 10 fibonacci numbers
const fibonacci = Lazy.fibonacci().skip(10).take(10).toArray();
console.log(fibonacci); // [ 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765]
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### from\<T, R, N\>();
- **description**: Creates an ILazyCollection from an iterable object.
- **params**:
  - `source: Iterable<T> | Iterator<T, R, N>`
- **returns**:
  - `lazyCollection: ILazyCollection<T, R | undefined, N | undefined> `

```typescript
import Lazy from "lazzy.ts";

const arr = [1, 2, 3, 4];
const gen = Lazy.from(arr);

let x = gen.next();
while(x.done !== true) {
  console.log(x.value);
  x = gen.next();
}

/* output:
1
2
3
4
*/
```

```typescript
import Lazy from "lazzy.ts";

const arr = [1, 2, 3, 4];
const totalSum = Lazy.from(arr).sum();
console.log(totalSum); // 10
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### fromAsync\<T, R, N\>();
- **description**: Creates an ILazyCollectionAsync from an async iterable object.
- **params**:
  - `source: AsyncIterable<T> | AsyncIterator<T, R, N>`
- **returns**:
  - `lazyCollection: ILazyCollectionAsync<T, R | void, N | undefined>`

```typescript
import Lazy from "lazzy.ts";

async function main() {

  async function* asyncGenerator<T>(arr: T[]) {
      yield * [1, 2, 3, 4];
  }

  const gen = await Lazy.fromAsync(asyncGenerator());

  let x = await gen.next();
  while(x.done !== true) {
    console.log(x.value);
    x = await gen.next();
  }
}

main();

/* output:
1
2
3
4
*/
```

```typescript
import Lazy from "lazzy.ts";

async function main() {

  async function* asyncGenerator<T>(arr: T[]) {
      yield * [1, 2, 3, 4];
  }

  const totalSum = await Lazy.fromAsync(asyncGenerator()).sum();
  console.log(totalSum); // 10
}

main();
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### generate\<T\>();
- **description**: Generates an infinite sequence of values from a custom function.
- **params**: 
  - `callback: () => T`
- **returns**: 
  - `lazyCollection: ILazyCollection<T, void, undefined>`

Custom generator for infinite sequence of numbers:
```typescript
import Lazy from "lazzy.ts";

// We declare an IIFE to create a scope where we can hold the current state of the 'number' variable
const generator = (function() {
    let number = 1;

    return function () {
        return number++;
    }
})();

const result = Lazy.generate(generator).take(10).toArray();
console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

The fibonacci number sequence:
```typescript
import Lazy from "lazzy.ts";

const fibonacci = (function () {
    let prev = 1, next = 1;

    return function() {
        const current = prev;
        prev = next;
        next += current;
        return current;
    }    
})();

const result = Lazy.generate(fibonacci).take(10).toArray();
console.log(result); // [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### generateAsync\<T\>();
- **description**: Generates an infinite sequence of values from a custom async function.
- **params**: 
  - `callback: () => T`
- **returns**: 
  - `lazyCollection: ILazyCollection<T, void, undefined>`

Custom generator for infinite sequence of numbers:
```typescript
import Lazy from "lazzy.ts";

async function main() {
  // We declare an IIFE to create a scope where we can hold the current state of the 'number' variable
  const asyncGenerator = (function() {
      let number = 1;

      return function () {
          return Promise.resolve(number++);
      }
  })();

  const result = await Lazy.generateAsync(asyncGenerator).take(10).toArray();
  console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}

main();
```

The fibonacci number sequence:
```typescript
import Lazy from "lazzy.ts";

async function main() {
  const asyncFibonacci = (function () {
      let prev = 1, next = 1;

      return function() {
          const current = prev;
          prev = next;
          next += current;
          return Promise.resolve(current);
      }
  })();

  const result = await Lazy.generateAsync(asyncFibonacci).take(10).toArray();
  console.log(result); // [1, 1, 2, 3, 5, 8, 13, 21, 34, 55]
}

main();
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### prime();
- **description**: Generates prime numbers.
- **params**: 
  - `minimum?: number`
- **returns**: 
  - `lazyCollection: ILazyCollection<number, void, number>`

```typescript
import Lazy from "lazzy.ts";

const primes = Lazy.prime().take(10).toArray();
console.log(primes); // [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
```

```typescript
import Lazy from "lazzy.ts";

const primes = Lazy.prime(10).take(10).toArray();
console.log(primes); // [11, 13, 17, 19, 23, 29, 31, 37, 41, 43]
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### random();
- **description**: Generates an infinite sequence of random floating-point numbers in specific range and precision.
- **params**: 
  - `randomParams?: { min: number, max: number, precision: number }`
  - `default: { min: 0, max: Number.MAX_SAFE_INTEGER - 1, precision: 0 }`
- **returns**: 
  - `lazyCollection: ILazyCollection<number, void, undefined>`

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.random({ max: 10 }).take(10).toArray();
console.log(result); // Array of 10 random integers in range [0, 10]
```

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.random({ min: 10, max: 20 }).take(10).toArray();
console.log(result); // Array of 10 random integers in range [10-20]
```

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.random({ min: -20, max: -10 }).take(10).toArray();
console.log(result); // Array of 10 random integers in range [-20, -10]
```

Range:
- `min: inclusive`
- `max: exclusive`

Notes **(IMPORTANT)**:
- If the 'min' value is greater than the 'max' value then they are swapped.
    ```typescript
    Lazy.random({ min: 10, max: 1 }).take(10).toArray();
    // is same as
    Lazy.random({ min: 1, max: 10 }).take(10).toArray();
    ```

- If you use a negative 'max' value and small precision you can receive the specified maximum value, although we said that it is exclusive.
    ```typescript
    import Lazy from "lazzy.ts";

    const result = Lazy.random({ min: -2, max: -1, precision: 1 }).take(10).toArray();
    console.log(result) // The possible values are between -2.0 and -1.0 INCLUSIVE.
    ```
    This is possible because the auto generated value can be -1.001 which is less than -1. Here we are in the proper range, but when we round that number to the specified precision, we will receive -1.0, which actually is -1.

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### randomFrom();
- **description**: Generates random values from an array.
- **params**: 
  - `array: T[]`
- **returns**: 
  - `lazyCollection: ILazyCollection<T, void, undefined>`

```typescript
import Lazy from "lazzy.ts";

const random = Lazy.randomFrom([1, 5, 9]).take(10).toArray();
console.log(random); // [1, 5, 9, 5, 1, 1, 9, 9, 5, 9]
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### range()
- **description**: Generates an infinite sequence of numbers in specified range and step.
- **params**: 
  - `rangeParams?: { from: number, to: number, step: number }`
- **returns**: 
  - `lazyCollection: ILazyCollection<number, void, undefined>`

```typescript
import Lazy from "lazzy.ts";

// In increasing order
const result = Lazy.range({ from: 1, to: 10, step: 1 }).toArray();
console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

```typescript
import Lazy from "lazzy.ts";

// In decreasing order
const result = Lazy.range({ from: -1, to: -10, step: -1 }).toArray();
console.log(result); // [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10]
```

```typescript
import Lazy from "lazzy.ts";

// If you pass invalid arguments you will receive an empty sequence
const result = Lazy.range({ from: 1, to: 10, step: -1 }).toArray();
console.log(result); // []
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

<h2 align="center">Methods that manipulate the sequence without breaking the chain</h2>

#### append\<T, R, N\>();
- **description**: Inserts a set of values after the initial sequence.
- **params**: 
  - `iterables: Array<Iterable<T>>`
- **returns**: 
  - `lazyCollection: ILazyCollection<T, R, N>`

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5]).append([6, 7, 8, 9, 10]).toArray();
console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

You can pass multiple iterable objects:
```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5]).append([6, 7], new Set([8, 9, 10])).toArray();
console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

Or you can chain them:
```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5]).append([6, 7]).append([8, 9, 10]).toArray();
console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### at\<T, R, N\>();
- **description**: The at() method takes an integer value and returns the item at that index. If the index is outside the bounds of the sequence then 'undefined' is returned.
- **params**: 
  - `index: number`
- **returns**: 
  - `lazyCollection: ILazyCollection<T, R, N>`

```typescript
import Lazy from "lazzy.ts";

const value = Lazy.from(["Josh", "Michael", "Jonathan", "Bob"]).at(1).first();
console.log(value); // "Michael"
```

```typescript
import Lazy from "lazzy.ts";

const value = Lazy.from(["Josh", "Michael", "Jonathan", "Bob"]).at(-1).first();
console.log(value); // undefined
```

```typescript
import Lazy from "lazzy.ts";

const value = Lazy.from(["Josh", "Michael", "Jonathan", "Bob"]).at(4).first();
console.log(value); // undefined
```

Note that the 'at' function is a generator. This means that you should use some of the consumers or you can continue to chain the other generator functions. 
In the above examples we use the 'first()' method to consume the value.

```typescript
import Lazy from "lazzy.ts";

// You can continue the chain like this:
const value = Lazy.from(["Josh", "Michael", "Jonathan", "Bob"])
    .at(1)
    .map(name => `Hello, ${name}!`)
    .first();
console.log(value); // "Hello, Michael!"
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### balancedChunk\<T, R, N\>();
- **description**: Splits the sequence into multiple balanced chunks by specified weight. 
- **params**: 
  - `weight: number`
  - `select?: (value: T) => number`
- **returns**: 
  - `chunks: ILazyCollection<T[], R, N>`

```typescript
import Lazy from "lazzy.ts";

class Cargo {
    weight: number;

    constructor(weight: number) {
        this.weight = weight;
    }
}

class Ship {
    cargos: Cargo[] = [];

    constructor(cargos: Cargo[]) {
        this.cargos = cargos;
    }
}

// Each ship has cargo with max weight 8000 tons.
const ships = Lazy.range({ from: 100, to: 1000, step: 20 }) // generates different weights
  .map((weight) => new Cargo(weight))                       // creates a new cargo
  .balancedChunk(8000, (cargo) => cargo.weight)             // balances all cargos
  .map((cargos) => new Ship(cargos))                        // creates new ship for each group of cargos
  .toArray();

console.log(ships);
/* output:
  [
    Ship: { cargos: Array(9)  } // total weight 8000,
    Ship: { cargos: Array(11) } // total weight 8000 
    Ship: { cargos: Array(18) } // total weight 7940 
    Ship: { cargos: Array(8)  } // total weight 1360 
  ]
*/
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### chunk\<T, R, N\>();
- **description**: Splits the sequence into multiple chunks of certain size.
- **params**: 
  - `size: number`
- **returns**: 
  - `chunks: ILazyCollection<T[], R, N>`

```typescript
import Lazy from "lazzy.ts";

const chunks = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).chunk(3).toArray();
console.log(chunks); // [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### concat\<T\>();
- **description**: Appends one or more iterators at the end of the initial sequence.
- **params**: 
  - `iterators: Array<Iterator<T, unknown, unknown>>`
- **returns**: 
  - `lazyCollection: ILazyCollection<T, void, undefined>`

```typescript
import Lazy from "lazzy.ts";

const lazyArray = Lazy.from([6, 7, 8, 9, 10]).toIterator();
const result = Lazy.from([1, 2, 3, 4, 5]).concat(lazyArray).toArray();
console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
```

```typescript
import Lazy from "lazzy.ts";

const iterator1 = Lazy.range({ from: 5: to: 7 }).toIterator();
const iterator2 = Lazy.range({ from: 8: to: 10 }).toIterator();
const result = Lazy.from([1, 2, 3, 4]).concat(iterator1, iterator2).toArray();
console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### custom\<T, R, N, T2, R2, N2\>();
- **description**: Adds a custom generator function to the chain.
- **params**: 
  - `generator: (iterator: Iterator<T, R, N>) => Generator<T2, R2, N2>`
- **returns**: 
  - `lazyCollection: ILazyCollection<T2, R2, N2>`

```typescript
import Lazy from "lazzy.ts";

const double = function* (iterator: Iterator<number, unknown, unknown>) {
    let x = iterator.next();

    while (x.done !== true) {
        yield x.value * 2;
        x = iterator.next();
    }
};

const result = Lazy.from([1, 2, 3, 4]).custom(double).sum();
console.log(result); // 20
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### distinct\<T, R, N\>();
- **description**: Removes all duplicates from the initial sequence.
- **params**: 
  - `selector?: (value: T) => string | number | boolean`
- **returns**: 
  - `lazyCollection: ILazyCollection<T, R, undefined>`

You can omit the 'selector' if the sequence contains values of primitive type only:

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 2, 1, 3, 5, 4, 5]).distinct().toArray();
console.log(result); // [1, 2, 3, 5, 4]
```

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from(["a", "b", "a", "c", "b", "e", "c", "g"]).distinct().toArray();
console.log(result); // ["a", "b", "c", "e", "g"]
```

If the sequence contains objects, you must pass a 'selector' function as an argument, to select a member of primitive type.

```typescript
import Lazy from "lazzy.ts";

class Person {
    firstName: string;
    lastName: string;
    age: number;
    
    constructor(firstName: string, lastName: string, age: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
}

const people = [
    new Person("Josh", "Smith", 25),
    new Person("Michael", "Garcia", 35),
    new Person("Josh", "Brown", 48),
    new Person("Jonathan", "Davis", 30),
];

const result = Lazy.from(people).distinct((p) => p.firstName).toArray();
console.log(result); 
/* 
  [ 
    { firstName: "Josh", lastName: "Smith", age: 25 },
    { firstName: "Michael", lastName: "Garcia", age: 35 },
    { firstName: "Jonathan", lastName: "Davis", age: 30 },
  ]
*/
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### feed\<T, R, R2, N, V\>();
- **description**: Feeds the initial sequence with new values from another iterator.
- **params**:
  - `iterator: Iterator<V, R1, T>`
- **returns**:
  - `lazyCollection: ILazyCollection<V, void, undefined>`

```typescript
import Lazy from "lazzy.ts";

const primes = Lazy.prime(1000);
const result = Lazy.range({ from: 1000, to: 10000, step: 1000 }).feed(primes).toArray();
console.log(result); // [1009, 2003, 3001, 4001, 5003, 6007, 7001, 8009, 9001, 10007]
```

- First the `Lazy.range()` function generates an array with the following values:

  `[1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000]`

- Then the feed function iterates through these values and replaces each value with the returned value from the 'Lazy.prime()'.

- The 'Lazy.prime()' receives each value from the initial sequence and generates a prime number greater than or equal to the received value.

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### fill\<T, R, N\>();
- **description**: Fills the initial sequence with values at specified range.
- **params**:
  - `values: Iterable<T>`
  - `start: number = 0`
  - `end?: number`
- **returns**:
  - `lazyCollection: ILazyCollection<T, R, undefined>`

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5, 6, 7]).fill([0], 3, 5).toArray();
console.log(result); // [1, 2, 3, 0, 0, 6, 7]
```

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5, 6, 7]).fill([8, 9, 10], 0, 7).toArray();
console.log(result); // [8, 9, 10, 8, 9, 10, 8]
```

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5, 6, 7]).fill([8, 9, 10], 3, 5).toArray();
console.log(result); // [1, 2, 3, 8, 9, 6, 7]
```

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5, 6, 7]).fill([0], 3).toArray();
expect(result).to.be.deep.eq([1, 2, 3, 0, 0, 0, 0]);
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### filter\<T, R, N\>();
- **description**: Removes all elements which don't pass the test implemented by the provided predicate.
- **params**: 
  - `predicate: (value: T) => boolean`
- **returns**: 
  - `lazyCollection: ILazyCollection<T, R, undefined>`

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).filter((n) => n % 2 === 0).toArray();
console.log(result); // [2, 4, 6, 8, 10]
```

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([10, 2, 8, 1, 6, 7, 5, 4, 9]).filter((n) => n <= 5).toArray();
console.log(result); // [2, 1, 5, 4]
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### filterWithIndex\<T, R, N\>();
- **description**: Removes all elements which don't pass the test implemented by the provided predicate. Also yields a tuple of the current value and its old index.
- **params**:
  - predicate: (value: T) => boolean
- **returns**:
  - lazyCollection: ILazyCollection<[T, number], R, N>

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).filterWithIndex((n) => n % 2 === 0).toArray();
console.log(result);
/* output:
  [
    [2, 1],
    [4, 3],
    [6, 5],
    [8, 7],
    [10, 9],
  ]
*/
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### flat\<T, R, N, D extends Depth = 20\>();
- **description**: Creates a new array with all sub-array elements concatenated into it recursively up to the specified depth
- **params**:
  - `depth?: Depth`
- **returns**:
  - `ILazyCollection<FlatArray<T, D>, R, undefined>`

```typescript
import Lazy from "lazzy.ts";

const array = [[1, 2], 3, [[4], [5, 6]], [7, [[8], 9]]];
const flatten = Lazy.from(array).flat().toArray();
console.log(flatten); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

```typescript
import Lazy from "lazzy.ts";

const array = [[1, 2], 3, [[4], [5, 6]], [7, [[8], 9]]];
const flatten = Lazy.from(array).flat(1).toArray();
console.log(flatten); // [1, 2, 3, [4], [5, 6], 7, [[8], 9]]
```

```typescript
import Lazy from "lazzy.ts";

const array = [[1, 2], 3, [[4], [5, 6]], [7, [[8], 9]]];
const flatten = Lazy.from(array).flat(2).toArray();
console.log(flatten); // [1, 2, 3, 4, 5, 6, 7, [8], 9]
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### flatMap\<T, R, N, V, D extends Depth = 20\>();
- **description**: Returns a new array formed by applying a given callback function to each element of the array, and then flattening the result. It is identical to a map() followed by a flat(). 
- **params**:
  - `callback: (currentValue: T, index: number) => V`
  - `depth?: D = 20`
- **returns**:
  - `lazyCollection: ILazyCollection<FlatArray<V, D>, R, undefined>`

```typescript
import Lazy from "lazzy.ts";

const array = ["it's Sunny in", "", "California"];
const flatten = Lazy.from(array).flatMap((x) => x.split(" ")).toArray();
console.log(flatten); // ["it's", "Sunny", "in", "", "California"]
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### forEach\<T, R, N\>();
- **description**: Executes a provided function once for each element in the sequence and doesn't change the elements in that sequence.
- **params**: 
  - `action: (value: T, index: number) => void`
- **returns**:
  - `lazyCollection: ILazyCollection<T, R, undefined>`

```typescript
import Lazy from "lazzy.ts";

Lazy.from([1, 2, 3]).forEach((n, i) => console.log(`Value: ${n}; Index: ${i};`)).run();
/* output:
  "Value: ${1}; Index: ${0};"
  "Value: ${2}; Index: ${1};"
  "Value: ${3}; Index: ${2};"
*/
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### groupBy\<T, R, N, TKey, TElement, TResult\>();
- **description**: Groups the elements of the sequence.
- **params**:
  - `keySelector: (v: T) => TKey`
    - A function to extract the key for each element.
  - `elementSelector: (v: T) => TElement`
    - A function to map each source element to an element in an Map\<TKey, TElement\>.
  - `resultSelector: (key: TKey, elements: TElement[]) => TResult`
    - A function to create a result value from each group.
- **returns**:
  - `lazyCollection: ILazyCollection<TResult, R, undefined>`

```typescript
import Lazy from "lazzy.ts";

const usersData = [
    { name: "Ivan", age: 30 },
    { name: "Ivan", age: 15 },
    { name: "Georgi", age: 10 },
    { name: "Georgi", age: 19 },
    { name: "Ivan", age: 42 },
];

const grouped = Lazy.from(usersData)
    .groupBy(
        (user) => user.name,
        (user) => user.age,
        (key, ages) => ({
            name: key,
            average: ages.reduce((prev, cur) => prev + cur, 0) / ages.length,
        })
    )
    .toArray();

console.log(grouped);
/* output:
[
  { name: "Ivan", average: 29 },
  { name: "Georgi", average: 14.5 },
]
*/
```

In this example we want to group all people by name and to get the average age.

See also the [lazyGroupBy()](#lazygroupbyt-r-n) function.

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### indices\<T, R, N\>();
- **description**: Returns the indices of the elements which pass the test implemented by the provided predicate.
- **params**:
  - `predicate: (value: T) => boolean`
- **returns**:
  - `lazyCollection: ILazyCollection<number, R, undefined>`

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).indices((n) => n % 2 === 0).toArray();
console.log(result); // [1, 3, 5, 7, 9];
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### lazyChunk\<T, R, N\>();
- **description**: Splits the sequence into multiple chunks of certain size. Returns lazyCollection instead of arrays.
- **params**:
  - `size: number`
- **returns**:
  - `lazyCollection: ILazyCollection<ILazyCollection<T, void, unknown>, R, undefined>`

**IMPORTANT!!!** Be very careful with this function!
You must consume the returned chunk immediately, otherwise you will fall into an infinite loop!
The chunk is of type 'ILazyCollection' so you can still use the chain functionality.

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  .lazyChunk(3)
  .map(chunk => chunk.sum())
  .toArray();

console.log(result); // [6, 15, 24, 19]
```

```typescript
import Lazy from "lazzy.ts";

const result =Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  .lazyChunk(3)
  .map(chunk => chunk.toArray())
  .toArray();

console.log(result); // [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### lazyGroupBy\<T, R, N\>();
- **description**: Groups the elements of the sequence. In the result selector we receive an ILazyCollection instead of arrays.
- **params**:
  - `keySelector: (v: T) => TKey`
    - A function to extract the key for each element.
  - `elementSelector: (v: T) => TElement`
    - A function to map each source element to an element in an Map\<TKey, TElement\>.
  - `resultSelector: (key: TKey, elements: ILazyCollectionAsync<TElement, void, undefined>) => TResult`
    - A function to create a result value from each group.
- **returns**:
  - `lazyCollection: ILazyCollection<TResult, R, undefined>`

```typescript
import Lazy from "lazzy.ts";

const usersData = [
    { name: "Ivan", age: 30 },
    { name: "Ivan", age: 15 },
    { name: "Georgi", age: 10 },
    { name: "Georgi", age: 19 },
    { name: "Ivan", age: 42 },
];

// Important thing to note! Always use promiseAll() with lazyGroupBy()!
const groups = await Lazy.from(usersData)
    .lazyGroupBy(
        (user) => user.name,
        (user) => user.age,
        async (key, ages) => ({
            name: key,
            average: await ages.average(),
        })
    )
    .promiseAll();

console.log(groups);

/* output:
[
  { name: "Ivan", average: 29 },
  { name: "Georgi", average: 14.5 },
]
*/
```

You can compare this example with the regular [groupBy()](#groupbyt-r-n-tkey-telement-tresult) function to see the difference.

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### lazyPartition\<T, R, N\>();
- **description**: Splits the sequence into two new 'ILazyCollectionAsync' objects according to certain criteria.
- **params**:
  - `predicate: (value: T, index: number) => boolean`
- **returns**:
  - `ILazyCollection<ILazyCollectionAsync<T, void, undefined>, R, undefined>`

```typescript
import Lazy from "lazzy.ts";

async function main() {
  const generator = (function() {
    let n = 1;

    return function() {
      return n++;
    }
  })();

  // Important thing to note! Always use promiseAll() with lazyGroupBy()!
  const partitions = await Lazy.generateAsync(generator)
    .take(4)
    .lazyPartition((n) => n % 2 === 0)
     // Each partition is of type ILazyCollectionAsync. Now you can decide what to do. You can convert it to array, set or map, or you can get the sum of all numbers in each partition (see the example below).
    .map(partition => partition.toArray())
    .promiseAll();

  console.log(partitions); // [[2, 4], [1, 3]]
}

main();
```

```typescript
import Lazy from "lazzy.ts";

async function main() {
  const generator = (function() {
    let n = 1;

    return function() {
      return n++;
    }
  })();

// Important thing to note! Always use promiseAll() with lazyGroupBy()!
  const partitions = await Lazy.generateAsync(generator)
    .take(4)
    .lazyPartition((n) => n % 2 === 0)
    .map(partition => partition.sum()) // We are getting the sum of each partition.
    .promiseAll();

  console.log(partitions); // [6, 4]
}

main();
```

You can compare this example with the regular [partition()](#partitiont-r-n) function to see the difference.

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### map\<T, R, N, V\>();
- **description**: Transforms each element in the sequence.
- **params**: 
  - `transformer: (v: T) => V`
- **returns**: 
  - `lazyCollection: ILazyCollection<V, R, undefined>`

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((n) => n * 2).toArray();
console.log(result); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### prepend\<T, R, N\>();
- **description**: Inserts a set of values before the initial sequence.
- **params**:
  - `iterables: Array<Iterable<T>>`
- **returns**: 
  - `lazyCollection: ILazyCollection<T, R, undefined>`

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5]).prepend([6, 7, 8, 9, 10]).toArray();
console.log(result); // [6, 7, 8, 9, 10, 1, 2, 3, 4, 5]
```

```typescript
import Lazy from "lazzy.ts";

const set = new Set([6, 7, 6, 8, 8, 9, 10]);
const result = Lazy.from([1, 2, 3, 4, 5]).prepend(set).toArray();
console.log(result); // [6, 7, 8, 9, 10, 1, 2, 3, 4, 5]
```

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5]).prepend([6, 7], [8, 9, 10]).toArray();
console.log(result); // [6, 7, 8, 9, 10, 1, 2, 3, 4, 5]
```

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5]).prepend([6, 7]).prepend([8, 9, 10]).toArray();
console.log(result); // [8, 9, 10, 6, 7, 1, 2, 3, 4, 5]
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### repeat\<T, R, N\>();
- **description**: Repeats each value in the sequence by a certain number
- **params**: 
  - `count: number`
- **returns**: 
  - `lazyCollection: ILazyCollection<T, R, undefined>`

```typescript
import Lazy from "lazzy.ts";

const repeated = Lazy.from([1, 2, 3]).repeat(1).toArray();
console.log(repeated); // [1, 1, 2, 2, 3, 3]
```

```typescript
import Lazy from "lazzy.ts";

const repeated = Lazy.from([1, 2, 3]).repeat(2).toArray();
console.log(repeated); // [1, 1, 1, 2, 2, 2, 3, 3, 3]
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### skip\<T, R, N\>();
- **description**: Skips a certain number of elements of the sequence.
- **params**:
  - `count: number`
- **returns**:
  - `lazyCollection: ILazyCollection<T, R, undefined>`

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).skip(5).toArray();
console.log(result); // [6, 7, 8, 9, 10]
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### skipWhile\<T, R, N\>();
- **description**: Skips elements of the sequence while the condition is still true.
- **params**:
  - `predicate: (value: T) => boolean`
- **returns**:
  - `lazyCollection: ILazyCollection<T, R, undefined>`

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).skipWhile((n) => n <= 5).toArray();
console.log(result); // [6, 7, 8, 9, 10]
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### sort\<T, R, N\>();
- **description**: Sorts the elements of a sequence (by default in ascending order).
- **params**: 
  - `comparer?: OptionalComparer<T>`
- **returns**: 
  - `lazyCollection: ILazyCollection<T, R, undefined>`

```typescript
import Lazy from "lazzy.ts";

const ordered = Lazy.from([6, 8, 3, 5, 9, 1, 7, 2, 4]).sort().toArray();
console.log(ordered); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

```typescript
import Lazy from "lazzy.ts";

const ordered = Lazy.from([6, 8, 3, 5, 9, 1, 7, 2, 4]).sort((a, b) => b - a).toArray();
console.log(ordered); // [9, 8, 7, 6, 5, 4, 3, 2, 1]
```

```typescript
import Lazy from "lazzy.ts";

const ordered = Lazy.from(["Josh", "Michael", "Jonathan", "Bob"]).sort().toArray();
console.log(ordered); // ["Bob", "Jonathan", "Josh", "Michael"]
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### splice\<T, R, N\>();
- **description**: Changes the contents of the sequence by removing or replacing existing elements and/or adding new elements in place.
- **params**: 
  - `start: number`
  - `deleteCount?: number`
  - `...items: T[]`
- **returns**: 
  - `lazyCollection: ILazyCollection<T, T[], undefined>`

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9]).splice(2, 2, 30, 40).toArray();
console.log(result); // [1, 2, 30, 40, 5, 6, 7, 8, 9]
```

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9]).splice(2, 2, 30, 40, 50, 60).toArray();
console.log(result); // [1, 2, 30, 40, 50, 60, 5, 6, 7, 8, 9]
```

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9]).splice(2, undefined, 30, 40).toArray();
console.log(result); // [1, 2, 30, 40]
```

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9]).splice(0).toArray();
console.log(result); // []
```

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9]).splice(-1).toArray();
console.log(result); // []
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### spread\<T, R, N\>();
- **description**: Spreads all values from an array of iterable objects into a single dimensional array.
- **params**:
  - `no parameters`
- **returns**:
  - `generator: Generator<T extends Iterable<infer U> ? U : T, R, undefined>`

```typescript
import Lazy from "lazzy.ts";

const spread = Lazy.from(["Hello", ",", " ", "World", "!"]).spread().toArray();
console.log(spread); // ["H", "e", "l", "l", "o", ",", " ", "W", "o", "r", "l", "d", "!"]
```

```typescript
import Lazy from "lazzy.ts";

const spread = Lazy.from([ [1, 2, 3], [4, 5, 6], [7, 8] ]).spread().toArray();
console.log(spread); // [1, 2, 3, 4, 5, 6, 7, 8]
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### take\<T, R, N\>();
- **description**: Takes a certain number of elements of the sequence.
- **params**:
  - `count: number`
- **returns**:
  - `lazyCollection: ILazyCollection<T, R | undefined, undefined> `

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).take(5).toArray();
console.log(result); // [1, 2, 3, 4, 5]
```

You can combine it with the 'skip' function:
```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).skip(3).take(5).toArray();
console.log(result); // [4, 5, 6, 7, 8]
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### takeWhile\<T, R, N\>();
- **description**: Takes elements of the sequence while the condition is still true.
- **params**:
  - `predicate: (value: T) => boolean`
- **returns**:
  - `lazyCollection: ILazyCollection<T, R | undefined, undefined>`

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).takeWhile((n) => n <= 5).toArray();
console.log(result); // [1, 2, 3, 4, 5]
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### toLazy\<T\>();
- **description**: Creates a generator from an iterable object.
- **params**:
  - `iterable: Iterable<T>`
- **returns**:
  - `generator: Generator<T, void, undefined> `

```typescript
import { toLazy } from "lazzy.ts";

const arr = [1, 2, 3, 4];
const gen = toLazy(arr);

let x = gen.next();
while(x.done !== true) {
  console.log(x.value);
  x = gen.next();
}

/* output:
1
2
3
4
*/
```

```typescript
import { toLazy, sum } from "lazzy.ts";

const arr = [1, 2, 3, 4];
const totalSum = sum(toLazy(arr));
console.log(totalSum); // 10
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### zip\<T, R, N, T2, R2, TResult\>();
- **description**: Applies a specified function to the corresponding elements of two sequences, producing a sequence of the results.
- **params**:
  - `iterator: Iterator<T2, R2, N>`
  - `resultSelector: (first: T1, second: T2) => TResult`
- **returns**:
  - `lazyCollection: ILazyCollection<TResult, R | R2 | undefined, undefined>`

```typescript
import Lazy from "lazzy.ts";

const words = Lazy.from(["one", "two", "three"]).toIterator();
const zipped = Lazy.from([1, 2, 3, 4])
  .zip(words, (num, word) => `${num} - ${word}`)
  .toArray();
console.log(zipped); // ["1 - one", "2 - two", "3 - three"]
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

<h2 align="center">Methods that break the chain</h2>
<h4 align="center">(Consumers)</h4>

#### average\<T, R, N\>();
- **description**: Computes the average value of numeric sequence. If the sequence contains objects, then you should select some member of a numeric type.
- **params**:
  - `selector?: (value: T) => number`
- **returns**:
  - `average: number`

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3]).average();
console.log(result); // 2
```

```typescript
import Lazy from "lazzy.ts";

class Person {
    name: string;
    age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

const people = [
    new Person("Josh", 25),
    new Person("Michael", 35),
    new Person("Jonathan", 30),
];

const result = Lazy.from([1, 2, 3]).average(p => p.age);
console.log(result); // 30
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### count\<T, R, N\>();
- **description**: Counts the number of items in the sequence.
- **params**: 
  - `no parameters`
- **returns**: 
  - `count: number`

```typescript
import Lazy from "lazzy.ts";

const count = Lazy.from(["Josh", "Michael", "Jonathan", "Bob"]).count();
console.log(count); // 4
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### every\<T, R, N\>();
- **description**: The every() method tests whether all elements in a the sequence satisfy the condition.
- **params**: 
  - `predicate: (value: T, index: number) => boolean`
- **returns**: 
  - `result: boolean`

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).every(n => n <= 10);
console.log(result); // true
```

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4, 5, 11, 6, 7, 8, 9, 10]).every(n => n <= 10);
console.log(result); // false
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### first\<T, R, N\>();
- **description**: Returns the first element of a sequence that satisfies a specified condition.
- **params**: 
  - `predicate: (value: T) => boolean`
- **returns**: 
  - `value: T | undefined`

```typescript
import Lazy from "lazzy.ts";

const value = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .first(e => e.startsWith("J"));

console.log(value); // "Josh"
```

If the element is not found then it will return **undefined**.
```typescript
import Lazy from "lazzy.ts";

const value = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .last(e => e.startsWith("K"));

console.log(value); // undefined
``` 

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### firstWithIndex\<T, R, N\>();
- **description**: Returns the first element of a sequence, and it's index, (a tuple **[element, index]**) that satisfies a specified condition. 
- **params**: 
  - `predicate: (value: T) => boolean`
- **returns**: 
  - `tuple: [T | undefined, number]`

```typescript
import Lazy from "lazzy.ts";

const [value, index] = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .lastWithIndex(name => name.startsWith("J"));

console.log(value); // "Josh"
console.log(index); // 0
``` 

If the searched value is not found then it will return **[undefined, -1]**.
```typescript
import Lazy from "lazzy.ts";

const [value, index] = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .lastWithIndex(name => name.startsWith("K"));

console.log(value); // undefined
console.log(index); // -1
``` 

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### includes\<T, R, N\>();
- **description**: Determines whether an interable includes a certain value among its entries, returning true or false as appropriate. 
- **params**: 
  - `predicate: (value: T) => boolean`
- **returns**: 
  - `result: boolean`

```typescript
import Lazy from "lazzy.ts";

const value = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .includes(e => e.startsWith("J"));

console.log(value); // true
```

```typescript
import Lazy from "lazzy.ts";

const value = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .includes(e => e.startsWith("K"));

console.log(value); // false
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### indexOf\<T, R, N\>();
- **description**: Returns the first index of a sequence that satisfies a specified condition.
- **params**: 
  - `predicate: (value: T) => boolean`
- **returns**: 
  - `index: number`

```typescript
import Lazy from "lazzy.ts";

const value = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .indexOf(e => e.startsWith("J"));

console.log(value); // 0
```

If the element is not found then it will return **-1**.
```typescript
import Lazy from "lazzy.ts";

const value = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .indexOf(e => e.startsWith("K"));

console.log(value); // -1
``` 

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### join\<T, R, N\>();
- **description**: Concatenates the elements of a sequence or the members, using the specified separator between each element or member. If the sequence contains objects, you must use the second parameter 'select' to choose a member.
- **params**: 
  - `separator: string`
  - `select?: (value: T) => string | number | boolean` 
- **returns**: 
  - `value: string`

```typescript
import Lazy from "lazzy.ts";

// If you work with primitive types you just need to pass a separator as an argument:
const result = Lazy.from([1, 2, 3]).join(", ");
console.log(result); // "1, 2, 3"
```

```typescript
import Lazy from "lazzy.ts";

class Person {
    name: string;
    age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    // uncomment these lines to test the second approach
    // toString(): string {
    //     return `Name: ${this.name}, Age: ${this.age}`;
    // }
}

const people = [
    new Person("Josh", 25),
    new Person("Michael", 36),
    new Person("Jonathan", 30),
];

// If you work with more complicated types then you are obliged to pass a selector function, 
// which selects some member of primitive type. 
const result = Lazy.from(people).join(", ", (person) => person.name);
console.log(result); // "Josh, Michael, Jonathan"

// If the type has 'toString' method, then you can omit the 'selector' function.
// But if you want, you can still use it like the example above.

// uncomment these lines to test this approach
// const result2 = Lazy.from(people).join("; ");
// console.log(result2) // "Name: Josh, Age: 25; Name: Michael, Age: 36; Name: Jonathan, Age: 30;"
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### last\<T, R, N\>();
- **description**: Returns the last element of a sequence that satisfies a specified condition.
- **params**: 
  - `predicate: (value: T) => boolean`
- **returns**: 
  - `value: T | undefined`

```typescript
import Lazy from "lazzy.ts";

const value = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .last(e => e.startsWith("J"));

console.log(value); // "Jonathan"
```

If the element is not found then it will return **undefined**.
```typescript
import Lazy from "lazzy.ts";

const value = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .last(e => e.startsWith("K"));

console.log(value); // undefined
``` 

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### lastIndexOf\<T, R, N\>();
- **description**: Returns the last index of a sequence that satisfies a specified condition.
- **params**: 
  - `predicate: (value: T) => boolean`
- **returns**: 
  - `index: number`

```typescript
import Lazy from "lazzy.ts";

const value = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .indexOf(e => e.startsWith("J"));

console.log(value); // 2
```

If the element is not found then it will return **-1**.
```typescript
import Lazy from "lazzy.ts";

const value = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .indexOf(e => e.startsWith("K"));

console.log(value); // -1
``` 

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### lastWithIndex\<T, R, N\>();
- **description**: Returns the last element of a sequence, and it's index, (a tuple **[element, index]**) that satisfies a specified condition.
- **params**: 
  - `predicate: (value: T) => boolean`
- **returns**: 
  - `tuple: [T | undefined, number]`

```typescript
import Lazy from "lazzy.ts";

const [value, index] = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .lastWithIndex(name => name.startsWith("J"));

console.log(value); // "Jonathan"
console.log(index); // 2
``` 

If the element is not found then it will return **[undefined, -1]**.
```typescript
import Lazy from "lazzy.ts";

const [value, index] = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .lastWithIndex(name => name.startsWith("K"));

console.log(value); // undefined
console.log(index); // -1
``` 

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### max\<T, R, N\>();
- **description**: Returns the entry with largest numeric value of the sequence. If the sequence contains objects, then you should select some member of a numeric type.
- **params**: 
  - `selector?: (value: T) => number`
- **returns**: 
  - `max: T | undefined`

```typescript
import Lazy from "lazzy.ts";

const max = Lazy.from([1, 2, 3, 4, 5, 6, -5, 7, 8, 9, 10]).max();
console.log(max); // 10
```

```typescript
import Lazy from "lazzy.ts";

class Person {
    name: string;
    age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

const people = [
    new Person("Josh", 25),
    new Person("Michael", 35),
    new Person("Jonathan", 30),
];

const oldest = Lazy.from(people).max(p => p.age);
console.log(oldest); // Person: { name: "Michael", age: "35" }
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### min\<T, R, N\>();
- **description**: Returns the entry with lowest-valued number of the sequence. If the sequence contains objects, then you should select some member of a numeric type.
- **params**: 
  - `selector?: (value: T) => number`
- **returns**: 
  - `min: T | undefined`

```typescript
import Lazy from "lazzy.ts";

const min = Lazy.from([1, 2, 3, 4, 5, 6, -5, 7, 8, 9, 10]).min();
console.log(min); // -5
```

```typescript
import Lazy from "lazzy.ts";

class Person {
    name: string;
    age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

const people = [
    new Person("Josh", 25),
    new Person("Michael", 35),
    new Person("Jonathan", 30),
];

const youngest = Lazy.from(people).min(p => p.age);
console.log(oldest); // Person: { name: "Josh", age: "25" }
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### partition\<T, R, N\>();
- **description**: Splits the sequence into two arrays according to certain criteria.
- **params**: 
  - `predicate: (value: T) => boolean`
- **returns**: 
  - `result: [T[], T[]]`

```typescript
import Lazy from "lazzy.ts";

const partition = Lazy.from([1, 2, 3, 4]).partition((n) => n % 2 === 0);
console.log(partition); // [[2, 4], [1, 3]]
```

```typescript
import Lazy from "lazzy.ts";

const partition = Lazy.from([1, 2, 3, 4])
  .partition((n) => n % 2 === 0)
  .map(partition => partition.reduce((acc, cur) => acc + cur), 0); // This transformation is not so efficient. Checkout the lazyPartition()
console.log(partition); // [6, 4]
```

See also the [lazyPartition()](#lazypartitiont-r-n) function.

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### product\<T, R, N\>();
- **description**: Computes the product of a sequence of numbers. If the sequence contains objects, then you should select some member of a numeric type.
- **params**: 
  - `selector?: (value: T) => number`
- **returns**: 
  - `product: number`

```typescript
import Lazy from "lazzy.ts";

const product = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).product();
console.log(product); // 3_628_800;
```

```typescript
import Lazy from "lazzy.ts";

class Person {
    name: string;
    age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

const people = [
    new Person("Josh", 25),
    new Person("Michael", 35),
    new Person("Jonathan", 30),
];

const product = Lazy.from(people).product(p => p.age);
console.log(product); // 26_250
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### promiseAll\<T, R, N\>();
- **description**: The method returns a single Promise that resolves to an array of the results of the input promises. This returned promise will resolve when all of the input's promises have resolved, or if the input iterable contains no promises. It rejects immediately upon any of the input promises rejecting or non-promises throwing an error, and will reject with this first rejection message / error. 
- **params**: 
  - `no parameters`
- **returns**: 
  - `promise: Promise<PromiseValue<T>[]>`

```typescript
import Lazy from "lazzy.ts";
import { delay } from "lazzy.ts/common/delay";

async function main() {
  const p1 = async function () {
      return delay(100, 1); // delays with 100 ms, then returns 1
  }

  const p2 = async function () {
      return delay(50, 2); // delays with 50 ms, then returns 2
  }

  const result = await Lazy.from([p1(), p2(), 3, 4]).promiseAll();
  console.log(result); // [1, 2, 3, 4]
}

main();
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### promiseRace\<T, R, N\>();
- **description**: The method returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects, with the value or reason from that promise.  
- **params**: 
  - `no parameters`
- **returns**: 
  - `promise: Promise<PromiseValue<T>>`

```typescript
import Lazy from "lazzy.ts";
import { delay } from "lazzy.ts/common/delay";

async function main() {
  const p1 = async function () {
      return delay(50, 1); // delays with 50 ms, then returns 1
  };

  const p2 = async function () {
      return delay(20, 2); // delays with 20 ms, then returns 2
  };

  const result = await Lazy.from([p1(), p2()]).promiseRace();
  console.log(result); // 2;
}

main();
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### reduce\<T, R, N, V\>();
- **description**: Executes a user-supplied “reducer” callback function on each element of the sequence, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the sequence is a single value.
- **params**:
  - `reducer: (value: T, accumulator: V) => V`
  - `initial: V`
- **returns**:
  - `value: V`

```typescript
import Lazy from "lazzy.ts";

const result = Lazy.from([1, 2, 3, 4])
  .reduce((prev, next) => prev + next, 0);

console.log(result); // 10
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### run\<T, R, N\>();
- **description:** All generators are executed when they are consumed. With this function you can consume the generator, without producing a value. In other words - executes the generator.
- **params:** 
  - `no parameters`
- **returns:** 
  - `value: R`

```typescript
import Lazy from "lazzy.ts";

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
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### sum\<T, R, N\>();
- **description**: Computes the total sum of a sequence of numbers. If the sequence contains objects, then you should select some member of a numeric type.
- **params**: 
  - `selector?: (value: T) => number`
- **returns**: 
  - `sum: number`

```typescript
import Lazy from "lazzy.ts";

const sum = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).sum();
console.log(sum); // 55
```

```typescript
import Lazy from "lazzy.ts";

class Person {
    name: string;
    age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

const people = [
    new Person("Josh", 25),
    new Person("Michael", 35),
    new Person("Jonathan", 30),
];

const sum = Lazy.from(people).sum(p => p.age);
console.log(sum); // 90
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### toArray\<T, R, N\>();
- **description**: Creates an array from an ILazyCollection.
- **params**: 
  - `no parameters`
- **returns**: 
  - `array: T[]`

```typescript
import Lazy from "lazzy.ts";

// With the 'range' method we generate the numbers from 1 to 4.
// Then we convert them to an array.
const result = Lazy.range({ from: 1, to: 4 }).toArray();
console.log(result); // [1, 2, 3, 4]
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### toIterator\<T, R, N\>();
- **description**: Returns the iterator from an ILazyCollection.
- **params**: 
  - `no parameters`
- **returns**: 
  - `iterator: Iterator<T, R, N>`

```typescript
import Lazy from "lazzy.ts";

// If you want you can get the iterator and perform some custom operations.
// In this example we will print the values.
const iterator = Lazy.range().take(5).toIterator();

function printValues<T, R, N>(iterator: Iterator<T, R, N>): void {
  let x = iterator.next();
  while (x.done !== true) {
    console.log(x.value);
    x = iterator.next();
  }
}

printValues(iterator);

/* output:
0
1
2
3
4
5
*/
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### toMap\<T, R, N, K, V\>();
- **description**: Creates a map from an ILazyCollection.
- **params**: 
  - `select: (value: T) => [K, V]`
- **returns**:
  - `map: Map<K, V>`

```typescript
import Lazy from "lazzy.ts";

class Person {
    name: string;
    age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

const people = [
    new Person("Josh", 25),
    new Person("Michael", 36),
    new Person("Jonathan", 30),
];

const map = Lazy.from(people).toMap(person => [person.name, person]);

console.log(map);
/* output:
Map {}
    Josh: Person
    Michael: Person
    Jonathan: Person
*/

console.log(map.get("Josh"));
/* output:
Person {}
    name: "Josh"
    age: 25
*/
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### toSet\<T, R, N\>();
- **description**: Creates a set from an ILazyCollection.
- **params**: 
  - `no parameters`
- **returns**: 
  - `set: Set<T>`

```typescript
import Lazy from "lazzy.ts";

const set = Lazy.from([1, 2, 3, 2, 4, 3]).toSet();
console.log(set);

/* output:
Set {}
    0: 1
    1: 2
    2: 3
    3: 4
*/
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### toWeakMap\<T, R, N, K extends object, V\>();
- **description**: Creates a weak map from an ILazyCollection.
- **params**: 
  - `selector: (value: T) => [K, V]`
- **returns**: 
  - `weakMap: WeakMap<K, V>`

```typescript
import Lazy from "lazzy.ts";

class Person {
    name: string;
    age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

const people = [
    new Person("Michael", 25),
    new Person("Michael", 36),
    new Person("Michael", 40),
];

const weakMap = Lazy.from(people).toWeakMap(p => [p, p.age]);
console.log(weakMap.get(people[1])); // 36
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### toWeakSet\<T, R, N, K extends object\>();
- **description**: Creates a weak set from an ILazyCollection.
- **params**: 
  - `selector: (value: T) => K`
- **returns**: 
  - `weakSet: WeakSet<K>`

```typescript
import Lazy from "lazzy.ts";

class Person {
    name: string;
    age: number;
    
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}

const people = [
    new Person("Michael", 25),
    new Person("Michael", 36),
    new Person("Michael", 40),
];

const set = Lazy.from(people).toWeakSet();
console.log(set.get(people[1]).age); // 36
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

#### uppend\<T, R, N\>();
- **description**: Updates the current sequence and appends new elements simultaneously.
- **params**:
  - `newValues: Iterator<T, R, N>`
  - `predicate: (oldElement: T, newElement: T) => boolean`
- **returns**:
  - `array: T[]`

Updates the elements from the initial sequence with the new values, which match the predicate.
Appends the new values which don't match the predicate.

```typescript
import Lazy from "lazzy.ts";

const database = [
    { name: "Ivan", age: 20 },
    { name: "Petar", age: 30 },
];

const userInput = [
    { name: "Ivan", age: 40 },
    { name: "Spas", age: 20 }
];

const it = Lazy.from(userInput).toIterator();
const uppended = Lazy.from(database).uppend(it, (oldValue, newValue) => oldValue.name === newValue.name);
console.log(uppended);

/* output:
[
  { name: "Ivan", age: 40 },
  { name: "Petar", age: 30 },
  { name: "Spas", age: 20 },
]
*/
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Reference</a>
</p>

---

## License

[MIT](https://choosealicense.com/licenses/mit/)