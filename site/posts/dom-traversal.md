---
title: DOM Traversal
date: "2020-05-24"
description: "This post shows few things which will help in traversing the DOM with JavaScript."
tags:
  - html
  - javascript
  - dom
---

DOM Traversal is achieved through having the access to a certain node in the DOM, and then traversing through the DOM using its related nodes.

This post shows few things which will help in traversing the DOM with plain old JavaScript.

### Descendant & Ancestor Elements
First thing first, what are descendant and ancestor elements?
DOM is built with nested nodes as a tree structure. One node could have multiple nodes in it, and those nodes can have their own child/children. The parent node is an ancestor element with its child elements being called descendent elements.

Keep in mind, all operations on the DOM start with the document object. That’s the main “entry point” to DOM.

For example, take a look at this.

```html
<main id="accordion">
  <section class="item1">
    <a>
      <h2 id="id1">Item 1</h2>
    </a>
    <p class="generic">
      What is Lorem Ipsum? 
    </p>
  </section>
  <section class="item2">
    <a>
       <h2 id="id2">Item 2</h2>
    </a>
    <p class="generic">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci a scelerisque purus semper eget duis.
    </p>
  </section>
</main>
```

Here, `main` is the ancestor, and `section` are its immediate children. `section` itself has two more immediate children, and so on.

### 1. Searching DOM
There are 6 main methods that we can use to search an element in the DOM. The table below will make things clear.

| Method                 | Searches with | 
| :-------------:        |:-------------:|
| querySelector          | CSS Class     |
| querySelectorAll       | CSS Class     | 
| getElementById         | id            |
| getElementsByName      | name          | 
| getElementsByTagName   | tag           |
| getElementsByClassName | class         |

Use the one that suits the best. The most popular methods to search the DOM are `querySelector`, `querySelectorAll`, `getElementById` and `getElementsByClassName`.

**Performance Note**
`getElementById` and `getElementsByClassName` are more than twice as fast as `querySelector` and `querySelectorAll`.

`getElementById` can run about 15 million operations a second, compared to just 7 million per second for `querySelector` in the latest version of Chrome. That means `querySelector` is not slow by any means, it's just not as fast as `getElementById` or `getElementsByClassName`. :sip_on_coffee:
_https://gomakethings.com/javascript-selector-performance/_

<img src="https://media.giphy.com/media/JoVfICjBLe7EkJRahi/giphy.gif" width="150" height="150">

***

### 2. Finding Parent Node
```javascript
let parent = document.getElementById('id2').parentNode;
// returns section with class item-2

let grandParent = parent.parentNode;
// returns parent of section with class item-2, which is main
```

There is one more property called `parentElement` which does the same thing. The only difference comes when a node's `parentNode` is not an HTML element. If so, `parentElement` will return null.

```javascript
document.documentElement.parentNode; // the document node
document.documentElement.parentElement; // null
```
***

### 3. Finding All Immediate Children
```javascript
document.querySelectorAll('#accordion > *');
// returns both section elements

document.querySelector('#accordion').children;
// another way to grab all immediate children
```

Along with `.children`, there is one more property `.childNodes` which can be used to get all the children of a parent.

*There is one major difference though.*
`.children` returns only children elements, where `.childNodes` return all the children consisting of element nodes, text nodes and comment nodes. Most of the time, you want to use `.children` because generally you don't want to loop over text or comment nodes in your DOM manipulation.
```javascript
let element = document.createElement("div");
element.textContent = "foo";

element.childNodes.length === 1; // Contains a text node child.
element.children.length === 0; 
```

For clarity, just remember that `.children` returns all children which are _only_ elements and `.childNodes` returns all children which could be element nodes or text nodes or comment nodes.

One more caveat with using `.childNodes` is that it treats line-breaks and white-space as text nodes. Chose your weapon wisely!
***

### 4. Finding Special Children
firstChild and lastChild of a parent are considered the special children of that element.

Using our first HTML block as an example,
```javascript
document.querySelector('#accordion').firstChild;
// returns the first child node

document.querySelector('#accordion').lastChild;
// returns the last child node
```

Again, note that the firstChild and lastChild will give you back the first or last node. They will also treat line-break and white-space as text nodes. Depending on how your HTML is written, it could either give back the text-node or element-node. To avoid this, JavaScript provides two more properties called `firstElementChild` and `lastElementChild`. These two always return the first and last HTML elements only. Take the clue from `parentNode` vs `parentElement`
```javascript
document.querySelector('#accordion').firstElementChild;
// returns the first child element

document.querySelector('#accordion').lastElementChild;
// returns the last child element
```
***

### 5. Finding Siblings
When we have the access to a given node, we can access its sibling nodes using the `nextSibling` and `previousSibling` properties.

As mentioned with parent and children selectors, there are again four ways to achieve this.
- .nextSibling
- .nextElementSibling
- .previousSibling
- .previousElementSibling

Taking a clue from the examples above, `nextElementSibling` will always return an element whereas `nextSibling` can return any kind of node. Same logic applies to `previousElementSibling` and `previousSibling`.

```javascript
document.querySelector('#accordion').firstElementChild.nextElementSibling;
// returns the next sibling of the first child element

document.querySelector('#accordion').lastElementChild.previousElementSibling;
// returns the previous sibling of the last child element
```

If we get to the last element of the parent node, using the `nextSibling` will return null because there are no more siblings after the last child node.

If we get to the first element of the parent node, using the `previousSibling` will return null because there are no more siblings prior the first child node.
***

### 6. Finding NodeType
By this time, you are aware of the differences between `.parentNode` vs `.parentElement`, `.children` vs `.childNodes`, `.firstChild` vs `.firstElementChild` and so on.

You might be asking, is there a way we can check what type of node we are getting back when we are dealing with the code written by somebody else? YES, we can!

You can check the type of the node(text vs element vs comment) with a special property called `nodeType`. The read-only `Node.nodeType` property is an integer that identifies what kind of node we are traversing or fetching.

These read-only integer values are constant, which helps you identify what kind of node you are getting. There are **eight** different values, but you mostly need all the major ones, which are listed below.

| NodeType            | Value         | Description    |
| :-------------:     |:-------------:| :-------------:|
| Node.ELEMENT_NODE   | 1             | Element Node.  |
| Node.ATTRIBUTE_NODE | 2             | Attribute Node |
| Node.TEXT_NODE      | 3             | Text Node.     |
| Node.COMMENT_NODE   | 8             | Comment Node   |
| Node.DOCUMENT_NODE  | 9             | Document Node  |

How do we use it though? Check out the example below.
```javascript
let el = document.querySelector('#accordion').lastElementChild.previousElementSibling;
alert(el.nodeType === Node.ELEMENT_NODE); // alerts true
alert(el.nodeType === Node.COMMENT_NODE); // alerts false
```

Use the `Node.nodeType` check while looping over the nodes object, to make sure you are manipulating the right kind of node.

***

### 7. Finding Content
We learned how to traverse to the parent element, grab children elements, find siblings or special children. But how do we manipulate the content inside a given node?

We have 3 special properties for it.
- innerHTML
- innerText
- textContent

Let's breakdown the subtle differences while choosing one over another.

**innerHTML**
It returns string inside our element and the HTML (or XML) markup contained within our string, including any spacing, line breaks, etc. Check out the below code,
```javascript
let el = document.querySelector('#accordion').lastElementChild.previousElementSibling.innerHTML;
alert(el);

// will return
// "
//   <a>
//     <h2 id=\"id1\">Item 1</h2>
//   </a>
//   <p class=\"generic\">
//     What is Lorem Ipsum? 
//   </p>
// "
```

Use `innerHTML` when you want to grab the entire HTML markup exactly how it is in the code with the proper formatting.

One caveat is if your markup includes special character inside, `innerHTML` will return the equivalent HTML entities for those characters. Be aware of that.

**innerText**
It returns the string inside our Node. It's similar to you highlighting the content on your screen and copying it.
```javascript
let el = document.querySelector('#accordion').lastElementChild.previousElementSibling.innerText;
alert(el);

// returns
// "Item 1
// What is Lorem Ipsum?"
```

It does not preserve any formatting while returning. Although, it's aware of all the styling and CSS applied to that node. Think of it returning a plain text without any formatting.

**textContent**
It returns the content inside our Node including any style elements if applied.
```javascript
let el = document.querySelector('#accordion').lastElementChild.previousElementSibling.textContent;
alert(el);

// returns
// "
//   Item 1
//   What is Lorem Ipsum? 
// "
```

`textContent` is aware of formatting like spacing, line breaks and styles and will return those as well. Use `textContent` when you want to see what's in the element with the stylings applied to it.

This makes `textContent` very similar to `innerText` with only one difference. `innerText` is not aware of the appearance of the rendered text (line-breaks & spaces) while `textContent` is! `innerText` will not include text that is hidden by CSS, but `textContent` will.

You can also set or update the content with one of these three properties to update the existing content on the page.

**Bonus Tip**
Be aware while using `innerHTML` to set or update your content. Every time innerHTML is set, the new HTML has to be parsed, a DOM has to be constructed, and inserted into the document object. This turns out to be a very performance heavy process and takes time to finish.
***

That's all for now in DOM Traversal. Hope this helps you navigating your next DOM.

![DOM](https://media.giphy.com/media/Cdu2nlYJip236/giphy.gif)