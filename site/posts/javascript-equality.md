---
title: JavaScript Equality Checks
date: "2020-05-29"
description: "Are those Objects equal?"
tags:
  - javascript
---

### Some Fun Equality Checks In JavaScript

There are mainly 3 ways to check the value equality in JavaScript. You already know two of them. There is a fun third one, `Object.is().`
```js
- Strict Equality: a === b (triple equals).
- Loose Equality: a == b (double equals).
- Same Value Equality: Object.is(a, b).
```

```js
// Zero, look closely!
-0 == 0; // true
-0 === 0; // true
Object.is(-0,0); // false
```

```js
// One, an obvious one!
-1 == 1; //false
-1 === 1; // false
Object.is(-1,1); // false
```

```js
// NaN, look closely again!
NaN == NaN; // false
NaN === NaN; // false
Object.is(NaN,NaN); // true
Object.is(NaN, 0/0); // true
```

```js
// String, one more obvious one!
'foo' == 'foo'; // true
'foo' === 'foo'; // true
Object.is('foo', 'foo'); // true
```

```js
// Array
[] == []; // false
[] === []; // false 
Object.is([], []); // false
```

```js
// Objects
var foo = { a: 1 };
var bar = { a: 1 };
Object.is(foo, foo); // true
Object.is(foo, bar); // false

// One more, for better clarity
let banana = {};
let cherry = banana;
let chocolate = cherry;
cherry = {};

Object.is(banana, cherry); // false
Object.is(cherry, chocolate); // false
Object.is(chocolate, banana); // true
```

```js
// Null
null == null; // true
null === null; // true
Object.is(null, null); // true
```
***

### Quick Recap
This tells us `Object.is()` is way more superior check than `===` in JavaScript. It handles two special cases where `===` fails horribly.
```js
// Special Cases
-0 === 0; // true
Object.is(0, -0); // false

NaN === NaN; // false
Object.is(NaN, NaN); // true
```
***

### Additional: Implementation of `===` Function strictEquals
```js
function strictEquals(a,b){
  // handle special cases, else return the right value!
  if (Object.is(a,NaN) || Object.is(b,NaN)) return false;
  if (Object.is(a,-0) && Object.is(b,0)) return true;
  if (Object.is(a,0) && Object.is(b,-0)) return true;
  return Object.is(a, b);
}
```

Ciao!