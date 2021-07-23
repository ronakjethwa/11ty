---
title: Singleton In JavaScript
date: "2020-05-30"
description: "This post is dedicated to my understanding on Singleton in JavaScript."
tags:
  - javascript
  - singleton
comments: false
claps: false
bookmarks: false
---

**What is Singleton?**
The Singleton Pattern limits the number of instances of a particular object to just one. This single instance is called the singleton.

**Usage?**
Singletons are useful in co-ordinating system-wide actions from a single central place of the code. An example could be a database connection pool. The pool manages the creation, destruction, and lifetime of all database connections for the entire application ensuring that no connections are 'lost'.

Singletons also reduce the need for global variables which is particularly important in JavaScript because it limits namespace pollution and associated risk of name collisions. 

**How to create one?**
The Singleton object can be implemented as an immediate anonymous function.

**Example Below:**
```js
var Singleton = (function () {
  var instance;

  function createInstance() {
    var object = new Object("I am the instance");
    return object;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

function run() {
  var instance1 = Singleton.getInstance();
  var instance2 = Singleton.getInstance();

  alert("Same instance? " + Object.is(instance1, instance2));
}

run();

```
***

Feel free to chime in the comment section with more information about Singleton to help a fellow developer. :)
