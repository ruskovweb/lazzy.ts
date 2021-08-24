# Documentation

Here you can see all the functions and how they work:

### range()
- **description**: Generates an infinite sequence of numbers in specified range and step.
- **params**: rangeParams: { from: number, to: number, step: number }
- **returns**: value: Generator<number, undefined, undefined>

```typescript
// In increasing order
const result = Lazy.range({ from: 1, to: 10, step: 1 }).toArray();
console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// In decreasing order
const result = Lazy.range({ from: -1, to: -10, step: -1 }).toArray();
console.log(result); // [-1, -2, -3, -4, -5, -6, -7, -8, -9, -10]

// If you pass invalid arguments you will receive an empty sequence
const result = Lazy.range({ from: 1, to: 10, step: -1 }).toArray();
console.log(result); // []
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### random();
- **description**: Generates an infinite sequence of random floating-point numbers in specific range and precision.
- **params**: 
  - `randomParams: { min: number, max: number, precision: number }`
  - `default: { min: 0, max: Number.MAX_SAFE_INTEGER - 1, precision: 0 }`
- **returns**: 
  - `value: Generator<number, undefined, undefined>`

```typescript
const result = Lazy.random({ max: 10 }).take(10).toArray();
console.log(result); // Array of 10 random integers in range [0, 10]

const result = Lazy.random({ min: 10, max: 20 }).take(10).toArray();
console.log(result); // Array of 10 random integers in range [10-20]

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
    const result = Lazy.random({ min: -2, max: -1, precision: 1 }).take(10).toArray();
    console.log(result) // The possible values are between -2.0 and -1.0 INCLUSIVE.
    ```
    This is possible because the auto generated value can be -1.001 which is less than -1. Here we are in the proper range, but when we round that number to the specified precision, we will receive -1.0, which actually is -1.

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### circular();
- **description**: Generates an infinitely repeating sequence of values.
- **params**: values: Iterable<T>
- **returns**: Generator<T, undefined, undefined>

```typescript
const result = Lazy.circular([1, 2, 3, 4]).take(8).toArray();
console.log(result) // [1, 2, 3, 4, 1, 2, 3, 4];

const result = Lazy.circular([1, 2]).take(8).toArray();
console.log(result) // [1, 2, 1, 2, 1, 2, 1, 2];
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### generate();
- **description**: Generates an infinite sequence of values from a custom function.
- **params**: function: () => T
- **returns**: Generator<T, undefined, undefined>

Custom generator for infinite sequence of numbers:
```typescript
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
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### append();
- **description**: Inserts a set of values after the initial sequence.
- **params**: 
  - `values: [...Iterable<T>]`
- **returns**: 
  - `lazyCollection: ILazyCollection<T, R, N>`

```typescript
const result = Lazy.from([1, 2, 3, 4, 5]).append([6, 7, 8, 9, 10]).toArray();
console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

You can pass multiple iterable objects:
```typescript
const result = Lazy.from([1, 2, 3, 4, 5]).append([6, 7], new Set([8, 9, 10])).toArray();
console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

Or you can chain them:
```typescript
const result = Lazy.from([1, 2, 3, 4, 5]).append([6, 7]).append([8, 9, 10]).toArray();
console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### at();
- **description**: The at() method takes an integer value and returns the item at that index. If the index is outside the bounds of the sequence then 'undefined' is returned.
- **params**: index: number
- **returns**: lazyCollection: ILazyCollection<T, R, N>

```typescript
const value = Lazy.from(["Josh", "Michael", "Jonathan", "Bob"]).at(1).first();
console.log(value); // "Michael"

const value = Lazy.from(["Josh", "Michael", "Jonathan", "Bob"]).at(-1).first();
console.log(value); // undefined

const value = Lazy.from(["Josh", "Michael", "Jonathan", "Bob"]).at(4).first();
console.log(value); // undefined
```

Note that the 'at' function is a generator. This means that you should use some of the consumers or you can continue to chain the other generator functions. 
In the above examples we use the 'first()' method to consume the value.

```typescript
// You can continue the chain like this:
const value = Lazy.from(["Josh", "Michael", "Jonathan", "Bob"])
    .at(1)
    .map(name => `Hello, ${name}!`)
    .first();
console.log(value); // "Hello, Michael!"
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### chunk();
- **description**: Splits the sequence into multiple chunks of certain size.
- **params**: 
  - size: number
- **returns**: 
  - chunks: ILazyCollection<T[], R, N> 

```typescript
const chunks = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).chunk(3).toArray();
console.log(chunks); // [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### concat();
- **description**: Appends one or more iterators at the end of the initial sequence.
- **params**: 
  - `iterators: Array<Iterator<T, R, N>>`
- **returns**: 
  - `ILazyCollection<T, R, N>`

```typescript
const lazyArray = Lazy.from([6, 7, 8, 9, 10]).toIterator();
const result = Lazy.from([1, 2, 3, 4, 5]).concat(lazyArray).toArray();
console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
```

```typescript
const iterator1 = Lazy.range({ from: 5: to: 7 }).toIterator();
const iterator2 = Lazy.range({ from: 8: to: 10 }).toIterator();
const result = Lazy.from([1, 2, 3, 4]).concat(iterator1, iterator2).toArray();
console.log(result); // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### distinct();
- **description**: Removes all duplicates from the initial sequence.
- **params**: 
  - `selector?: (value: T) => string | number | boolean`
- **returns**: 
  - `lazyCollection: ILazyCollection<T, R, N>`

You can omit the 'selector' if the sequence contains values of primitive type only:

```typescript
const result = Lazy.from([1, 2, 2, 1, 3, 5, 4, 5]).distinct().toArray();
console.log(result); // [1, 2, 3, 5, 4]
```

```typescript
const result = Lazy.from(["a", "b", "a", "c", "b", "e", "c", "g"]).distinct().toArray();
console.log(result); // ["a", "b", "c", "e", "g"]
```

If the sequence contains objects, you must pass a 'selector' function as an argument, to select a member of primitive type.

```typescript
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
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### feed();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### filter();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### filterWithIndex();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### flat();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### flatMap();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### forEach();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### groupBy();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### indices();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### intercept();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### lazyChunk();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### map();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### pair();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### prepend();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### repeat();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### skip();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### skipWhile();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### spread();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### take();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### takeWhile();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### toLazy();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### zip();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### average();
- **description**: Computes the average value of numeric sequence. If the sequence contains objects, then you should select some member of a numeric type.
- **params**:
  - selector?: (value: T) => number
- **returns**:
  - average: number

```typescript
const result = Lazy.from([1, 2, 3]).average();
console.log(result); // 2
```

```typescript
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
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### count();
- **description**: Counts the number of items in the sequence.
- **params**: 
  - `no parameters`
- **returns**: 
  - count: number

```typescript
const count = Lazy.from(["Josh", "Michael", "Jonathan", "Bob"]).count();
console.log(count); // 4
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### every();
- **description**: The every() method tests whether all elements in a the sequence satisfy the condition.
- **params**: predicate: (value: T, index: number) => boolean
- **returns**: result: boolean

```typescript
const result = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).every(n => n <= 10);
console.log(result); // true

const result = Lazy.from([1, 2, 3, 4, 5, 11, 6, 7, 8, 9, 10]).every(n => n <= 10);
console.log(result); // false
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### min();
- **description**: Returns the entry with lowest-valued number of the sequence. If the sequence contains objects, then you should select some member of a numeric type.
- **params**: 
  - selector?: (value: T) => number
- **returns**: 
  - min: number

```typescript
const min = Lazy.from([1, 2, 3, 4, 5, 6, -5, 7, 8, 9, 10]).min();
console.log(min); // -5
```

```typescript
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
console.log(youngest); // 25
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### max();
- **description**: Returns the entry with largest numeric value of the sequence. If the sequence contains objects, then you should select some member of a numeric type.
- **params**: 
  - selector?: (value: T) => number
- **returns**: 
  - max: number

```typescript
const max = Lazy.from([1, 2, 3, 4, 5, 6, -5, 7, 8, 9, 10]).max();
console.log(max); // 10
```

```typescript
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
console.log(oldest); // 35
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### sum();
- **description**: Computes the total sum of a sequence of numbers. If the sequence contains objects, then you should select some member of a numeric type.
- **params**: 
  - selector?: (value: T) => number
- **returns**: 
  - sum: number

```typescript
const sum = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).sum();
console.log(sum); // 55
```

```typescript
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
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### product();
- **description**: Computes the product of a sequence of numbers. If the sequence contains objects, then you should select some member of a numeric type.
- **params**: 
  - selector?: (value: T) => number
- **returns**: 
  - product: number

```typescript
const product = Lazy.from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).product();
console.log(product); // 3_628_800;
```

```typescript
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
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### toIterator();
- **description**: Returns the iterator from an ILazyCollection.
- **params**: 
  - `no parameters`
- **returns**: 
  - `Iterator<T, R, N>`

```typescript
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
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### toArray();
- **description**: Creates an array from an ILazyCollection.
- **params**: 
  - `no parameters`
- **returns**: 
  - array: `Array<T>`

```typescript
// With the 'range' method we generate the numbers from 1 to 4.
// Then we convert them to an array.
const result = Lazy.range({ from: 1, to: 4 }).toArray();
console.log(result); // [1, 2, 3, 4]
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### toMap();
- **description**: Creates a map from an ILazyCollection.
- **params**: 
  - `select: (value: T) => [K, V]`
- **returns**: 
  - `map: Map<K, V>`

```typescript
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
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### toSet();
- **description**: Creates a set from an ILazyCollection.
- **params**: 
  - `no parameters`
- **returns**: 
  - `set: Set<T>`

```typescript
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
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### toWeakMap();
- **description**: Creates a weak map from an ILazyCollection.
- **params**: 
  - `selector: (value: T) => [Key, Value]`
- **returns**: 
  - `weakMap: WeakMap<T>`

```typescript
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
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### toWeakSet();
- **description**: Creates a weak set from an ILazyCollection.
- **params**: 
  - `selector: (value: T) => Key`
- **returns**: 
  - `weakSet: WeakSet<T>`

```typescript
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
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### reduce();
- **description**: Executes a user-supplied “reducer” callback function on each element of the sequence, passing in the return value from the calculation on the preceding element. The final result of running the reducer across all elements of the sequence is a single value.
- **params**:
  - `reducer: (value: T, accumulator: U) => U`
  - `initial: U`
- **returns**: 
  - `value: U`

```typescript
const result = Lazy.from([1, 2, 3, 4])
  .reduce((prev, next) => prev + next, 0);

console.log(result); // 10
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### join();
- **description**: Concatenates the elements of a sequence or the members, using the specified separator between each element or member. If the sequence contains objects, you must use the second parameter 'select' to choose a member.
- **params**: 
  - `separator: string`
  - `select?: (value: T) => string | number | boolean` 
- **returns**: 
  - `value: string`

```typescript
// If you work with primitive types you just need to pass a separator as an argument:
const result = Lazy.from([1, 2, 3]).join(", ");
console.log(result); // "1, 2, 3"
```

```typescript
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
console.log(result) // "Josh, Michael, Jonathan"

// If the type has 'toString' method, then you can omit the 'selector' function.
// But if you want, you can still use it like the example above.

// uncomment these lines to test this approach
// const result = Lazy.from(people).join("; ");
// console.log(result) // "Name: Josh, Age: 25; Name: Michael, Age: 36; Name: Jonathan, Age: 30;"
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### partition();
- **description**: Splits the sequence into two arrays according to certain criteria.
- **params**: 
  - `predicate: (value: T) => boolean`
- **returns**: 
  - result: [T[], T[]]

```typescript
const partition = Lazy.from([1, 2, 3, 4]).partition((n) => n % 2 === 0);
console.log(partition); // [[2, 4], [1, 3]]
```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### uppend();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### includes();
- **description**: Determines whether an interable includes a certain value among its entries, returning true or false as appropriate. 
- **params**: 
  - `predicate: (value: T) => boolean`
- **returns**: 
  - `result: boolean`

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
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### indexOf();
- **description**: Returns the first index of a sequence that satisfies a specified condition.
- **params**: 
  - `predicate: (value: T) => boolean`
- **returns**: 
  - `index: number`

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
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### lastIndexOf();
- **description**: Returns the last index of a sequence that satisfies a specified condition.
- **params**: 
  - `predicate: (value: T) => boolean`
- **returns**: 
  - `index: number`

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
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### first();
- **description**: Returns the first element of a sequence that satisfies a specified condition.
- **params**: 
  - `predicate: (value: T) => boolean`
- **returns**: 
  - `value: T | undefined`

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
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### firstWithIndex();
- **description**: Returns the first element of a sequence, and it's index, (a tuple **[element, index]**) that satisfies a specified condition. 
- **params**: 
  - `predicate: (value: T) => boolean`
- **returns**: 
  - `tuple: [T | undefined, number]`

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
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### last();
- **description**: Returns the last element of a sequence that satisfies a specified condition.
- **params**: 
  - `predicate: (value: T) => boolean`
- **returns**: 
  - `value: T | undefined`

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
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### lastWithIndex();
- **description**: Returns the last element of a sequence, and it's index, (a tuple **[element, index]**) that satisfies a specified condition.
- **params**: 
  - `predicate: (value: T) => boolean`
- **returns**: 
  - `tuple: [T | undefined, number]`

```typescript
const [value, index] = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .lastWithIndex(name => name.startsWith("J"));

console.log(value); // "Jonathan"
console.log(index); // 2
``` 

If the element is not found then it will return **[undefined, -1]**.
```typescript
const [value, index] = Lazy
    .from(["Josh", "Michael", "Jonathan", "Bob"])
    .lastWithIndex(name => name.startsWith("K"));

console.log(value); // undefined
console.log(index); // -1
``` 

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### run();
- **description:** All generators are executed when they are consumed. With this function you can consume the generator, without producing a value. In other words - executes the generator.
- **params:** 
  - `no parameters`
- **returns:** 
  - `void`

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
    <a href="README.md#api-reference">API Referance</a>
</p>

---

## License

[MIT](https://choosealicense.com/licenses/mit/)