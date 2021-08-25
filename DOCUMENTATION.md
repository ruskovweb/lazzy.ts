# Documentation

Here you can see all the functions and how they work:

### range()
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### random();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### circular();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### generate();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### append();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

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
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### circular();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### concat();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### distinct();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

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
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### count();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

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
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### max();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### sum();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### product();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

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
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

```

<p align='right' style='font-size: 10px'>
    <a href="README.md#api-reference">API Referance</a>
</p>

---

### toWeakSet();
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

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
- **description**: Coming soon...
- **params**: -
- **returns**: -

```typescript

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