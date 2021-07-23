---
title: CSS-Selectors Guide
date: "2020-06-27"
description: "Some super important and yet confusing CSS-Selectors"
tags:
  - html
  - css
---

# CSS Selectors

I put together a guide for some super important and yet confusing CSS-Selectors. The list should help you clear the confusion between many of them, or simply use this guide as a 5-minutes review book to prep yourself before that interview.
***

### Descendant Selector
```css
A B 
/* selects any B elements that are inside of the element A */
```

### Comma Combinator
```css
A, B
/* selects all A and B elements */
```

### Universal Selector
```css
*
/* selects all elements */
```

### Adjacent Sibling Selector
```css
A + B
/* This selects all B elements that directly follow A. Elements that follow one another are called siblings. They're on the same level, or depth. */
/* div + a selects every a element that directly follows a div */
```

### General Sibling Selector
```css
A ~ B
/* You can select all siblings of an element that follow it. This is like the Adjacent Selector (A + B) except it gets all of the following elements instead of one. */
/* A ~ B selects all B that follow a A */
```

General vs Adjacent Sibling Selector: With the general sibling combinator, one or potentially multiple elements will be styled. With the adjacent sibling combinator, only one element will be styled.

### Child Selector
```css
A > B
/* A > B selects all B that are a direct children A */
```

### First Child Pseudo-selector
```css
:first-child
/* p:first-child selects all first child p elements. */
```

### Only Child Pseudo-selector
```css
:only-child
/* span:only-child selects the span elements that are the only child of some other element. */
```

### Last Child Pseudo-selector
```css
:last-child
/* span:last-child selects all last-child span elements. */
```

### Nth Child Pseudo-selector
```css
:nth-child(A)
/* :nth-child(8) selects every element that is the 8th child of another element. */

:nth-child(odd)
/* :nth-child(odd) selects every odd element */

:nth-child(even)
/* :nth-child(even) selects every even element */
```

### Nth Last Child Selector
```css
/* Selects the children from the bottom of the parent. This is like nth-child, but counting from the back! */
:nth-last-child(A)
/* :nth-last-child(2) selects all second-to-last child elements. */
```

### First of Type Selector
```css
:first-of-type
/* span:first-of-type selects the first span in any element. */
```

### Nth of Type Selector
```css
/* Selects a specific element based on its type and order in another element - or even or odd instances of that element. */
:nth-of-type(A)
/* div:nth-of-type(2) selects the second instance of a div. */
```

### Nth-of-type Selector with Formula
```css
/* The nth-of-type formula selects every nth element, starting the count at a specific instance of that element. */
:nth-of-type(An+B)
/* span:nth-of-type(6n+2) selects every 6th instance of a span, starting from (and including) the second instance. */
```

### Only of Type Selector
```css
/* Selects the only element of its type within another element. */
:only-of-type
/* p span:only-of-type selects a span within any p if it is the only span in there. */
```

### Last of Type Selector
```css
/* Select the last element of a specific type */
:last-of-type
/* div:last-of-type selects the last div in every element. */
```

### Empty Selector
```css
/* Select elements that don't have children */
:empty
```

### Negation Pseudo-class
```css
/* Select all elements that don't match the negation selector */
:not(X)
/* :not(.someClass) selects all elements that do not have class="someClass" */
```
