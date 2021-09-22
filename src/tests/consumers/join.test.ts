import { expect } from "chai";
import Lazy from "../..";
import { asyncGenerator } from "../helpers";

describe("ƒ join()", function () {
    it("should join numbers with comma and space", function () {
        const result = Lazy.from([1, 2, 3]).join(", ");
        expect(result).to.be.equal("1, 2, 3");
    });

    it("should join booleans with comma and space", function () {
        const result = Lazy.from([true, false, true]).join(", ");
        expect(result).to.be.equal("true, false, true");
    });

    it("should join strings with comma and space", function () {
        const result = Lazy.from(["value1", "value 2", "value, 3"]).join(", ");
        expect(result).to.be.equal("value1, value 2, value, 3");
    });

    it("should join numbers with comma and space from objects", function () {
        const result = Lazy.from([{ n: true }, { n: false }, { n: true }, { n: false }]).join(", ", (obj) => obj.n);
        expect(result).to.be.equal("true, false, true, false");
    });

    it("should join booleans with comma and space from objects", function () {
        const result = Lazy.from([{ n: 2 }, { n: 4 }, { n: 1 }, { n: 3 }]).join(", ", (obj) => obj.n);
        expect(result).to.be.equal("2, 4, 1, 3");
    });

    it("should join strings with comma and space from objects", function () {
        const result = Lazy.from([{ n: "value1" }, { n: "value 2" }, { n: "value, 3" }]).join(", ", (obj) => obj.n);
        expect(result).to.be.equal("value1, value 2, value, 3");
    });

    it("should join specific members of an object", function () {
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
            new Person("Bob", 50),
        ];
        
        const result = Lazy.from(people).join(", ", person => person.name);
        expect(result).to.be.equal("Josh, Michael, Jonathan, Bob");
    });

    it("should join all returned strings from 'toString' method", function () {
        class Person {
            name: string;
            age: number;
            
            constructor(name: string, age: number) {
                this.name = name;
                this.age = age;
            }
        
            toString(): string {
                return `Name: ${this.name}, Age: ${this.age}`;
            }
        }
        
        const people = [
            new Person("Josh", 25),
            new Person("Michael", 36),
            new Person("Jonathan", 30),
        ];
        
        const result = Lazy.from(people).join("; ");
        expect(result).to.be.equal("Name: Josh, Age: 25; Name: Michael, Age: 36; Name: Jonathan, Age: 30");
    });
});

describe("ƒ joinAsync()", function () {
    it("should join numbers with comma and space", async function () {
        const result = await Lazy.fromAsync(asyncGenerator([1, 2, 3])).join(", ");
        expect(result).to.be.equal("1, 2, 3");
    });

    it("should join booleans with comma and space", async function () {
        const result = await Lazy.fromAsync(asyncGenerator([true, false, true])).join(", ");
        expect(result).to.be.equal("true, false, true");
    });

    it("should join strings with comma and space", async function () {
        const result = await Lazy.fromAsync(asyncGenerator(["value1", "value 2", "value, 3"])).join(", ");
        expect(result).to.be.equal("value1, value 2, value, 3");
    });

    it("should join numbers with comma and space from objects", async function () {
        const result = await Lazy.fromAsync(asyncGenerator([{ n: true }, { n: false }, { n: true }, { n: false }])).join(", ", (obj) => obj.n);
        expect(result).to.be.equal("true, false, true, false");
    });

    it("should join booleans with comma and space from objects", async function () {
        const result = await Lazy.fromAsync(asyncGenerator([{ n: 2 }, { n: 4 }, { n: 1 }, { n: 3 }])).join(", ", (obj) => obj.n);
        expect(result).to.be.equal("2, 4, 1, 3");
    });

    it("should join strings with comma and space from objects", async function () {
        const result = await Lazy.fromAsync(asyncGenerator([{ n: "value1" }, { n: "value 2" }, { n: "value, 3" }])).join(", ", (obj) => obj.n);
        expect(result).to.be.equal("value1, value 2, value, 3");
    });

    it("should join specific members of an object", async function () {
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
            new Person("Bob", 50),
        ];
        
        const result = await Lazy.fromAsync(asyncGenerator(people)).join(", ", person => person.name);
        expect(result).to.be.equal("Josh, Michael, Jonathan, Bob");
    });

    it("should join all returned strings from 'toString' method", async function () {
        class Person {
            name: string;
            age: number;
            
            constructor(name: string, age: number) {
                this.name = name;
                this.age = age;
            }
        
            toString(): string {
                return `Name: ${this.name}, Age: ${this.age}`;
            }
        }
        
        const people = [
            new Person("Josh", 25),
            new Person("Michael", 36),
            new Person("Jonathan", 30),
        ];
        
        const result = await Lazy.fromAsync(asyncGenerator(people)).join("; ");
        expect(result).to.be.equal("Name: Josh, Age: 25; Name: Michael, Age: 36; Name: Jonathan, Age: 30");
    });
});
