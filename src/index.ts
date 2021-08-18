import Lazy from "./lazy";

export default Lazy;
export * from "./consumers";
export * from "./generators";

const str = "HelloWorld!";

const result = Lazy.from(str).splice(5, -1, ",", " ").join("");
console.log(result);

const arr = Array.from(str);
arr.splice(5, -1, ",", " ");
console.log(arr.join(""));