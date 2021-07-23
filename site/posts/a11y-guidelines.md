---
title: A11y Guidelines
date: "2021-03-01"
description: "A11y Helper Guidelines"
tags:
  - html
  - css
  - javascript
  - a11y
  - accessibility
---

# General Guidelines

The main goal of this document is to outline the steps a developer can take to maximize the a11y support and along with it use proper semantic attributes to fulfil the accessibility requirements as well as be consistent codebase.

## A11Y Guidelines & Principles

[https://www.w3.org/TR/wai-aria-practices-1.1/](https://www.w3.org/TR/wai-aria-practices-1.1/)

The above document provides a detailed guide and recommended approaches to make widgets, navigation, and behaviors accessible using  WAI-ARIA roles, states, and properties.

### Focus

We'll look at how to build pages that can be operated with a keyboard instead of a mouse. This is important for users with motor impairments, of course, but it also ensures that your UI is in good shape for all users.

Focus is critical and all page functionality should be available using the keyboard, unless it's something you cannot do with a keyboard, such as freehand drawing.

How to ensure an element is focusable:

- Use the right HTML element that is inherently focusable (ex: anchor or button tag)
    - Remember, anchor tag/link = navigation, button = action
- Or by adding the tabindex="0" attribute, for example <div tabindex="0">
    - This should only be used in situations when an element shall be focusable, but not interactive (a very rare case).
- Anchor tags aren’t focusable unless they have the href attribute (ex: use “#”)
    - Although if you don’t have a real href, why not use a button?

Few other techniques recommended to work with focusable elements,

[https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets#Technique_1_Roving_tabindex](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets#Technique_1_Roving_tabindex)

Few guidelines on focus,

- Use element.focus() to send focus to an element
- Track focus using onfocus and onblur
- Use the document.activeElement to get the active element
- Use document.hasFocus to make sure if the current document focus

More on focusable native elements → [https://allyjs.io/data-tables/focusable.html](https://allyjs.io/data-tables/focusable.html)

### Tab Order

Never ever mess with the default tab order.

When it’s acceptable to add the tabindex attribute:

- Setting tabindex="-1" to prevent the user from tabbing to an element
- Setting tabindex="0" to elements that are normally not focusable (ex: div)

Tab order should match visual order

- Tab order is based on the logical DOM order
- When content is reordered using flexbox, CSS grid, or position techniques, the tab order no longer matches with the visual order of elements. (See [https://web.dev/content-reordering/](https://web.dev/content-reordering/))
    - Restructure your code to ensure that the tab order, logical DOM order and visual order match.
    - If you can’t restructure your code, bring it to UX for discussion.

## Semantics

We'll make sure that we express our user interface in a robust way that works with a variety of assistive technologies.

### HTML

- Leverage specific HTML attributes (role and aria-*) that allow adding specific semantic meaning to existing HTML elements.
- Follow [Aria Design Pattern Guide](https://www.w3.org/TR/wai-aria-practices/#aria_ex) for the semantic roles, states and properties.
- Use native elements freely. Native controls (such as <button> and <select>) have accessibility built-in by the browser. They are focusable using the tab key, respond to keyboard events (like Enter, space and arrow keys), and have semantic roles, states and properties used by accessibility tools by default.
- Ensure that all functionality in your UI component can be reached by a keyboard. During your UX design, think about how you would use your element with the keyboard alone, and figure out a consistent set of keyboard interactions.

### CSS

- Use [aria-*] selectors instead of classes when the styling you are applying is directly related to the ARIA state. This also allows us to toggle display without leveraging adding/removing CSS classes added via JS, and helps us clean CSS noise.
- This pattern has ‘DRY’ written all over it.
- Using ARIA attributes as CSS hooks ensures our components will only look (and/or function) properly if said attributes are used in the HTML, which, in turn, ensures that they will always be added.

```css
// good?
[aria-expanded=”true”] { 
    display: block; 
}
// bad?
.open {
    display: block; 
}
```

```css
// good?
[aria-hidden='true'] {
  display: none;
}
// bad?
.close {
  display: none;
}
```

- Leverage :focus-within
    - To avoid adding event listeners for mouseover (?) and then add a class for styling AND doing the same for keyboard focus.
    - :focus-within should take care of mouse & keyboard navigation.
- [https://css-tricks.com/aria-in-css/](https://css-tricks.com/aria-in-css/)
- [https://ecss.io/chapter6.html](https://ecss.io/chapter6.html)

### JavaScript

- Standardize keys and expected behavior
    - Ex: mega nav dropdown menus open on Enter/Space/Down
    - Ex: tooltip open on Tab
- Key Event Listeners
    - Keydown is the only keyboard event worth using, keypress can be ignored entirely, listening to keyup events is too late for calling preventDefault.
    - Proposing to make `keydown` for listening to key event a standard pattern

## Common Practises

Following these practises should serve us to achieve that higher accessibility score for most of our pages. This is a dump from Google lighthouse a11y requirements.

- [aria-*] attributes match their roles
- [aria-hidden="true"] is not present on the document <body>
- [aria-hidden="true"] elements do not contain focusable descendents
- [role]s have all required [aria-*] attributes
- Elements with an ARIA [role] that require children to contain a specific [role] have all required children.
- [role]s are contained by their required parent element
- [role] values are valid
- [aria-*] attributes have valid values
- [aria-*] attributes are valid and not misspelled
- Buttons have an accessible name
- The page contains a heading, skip link, or landmark region
- Background and foreground colors have a sufficient contrast ratio
- Document has a <title> element
- [id] attributes on active, focusable elements are unique
- ARIA IDs are unique
- Heading elements appear in a sequentially-descending order
- <html> element has a [lang] attribute
- <html> element has a valid value for its [lang] attribute
- Image elements have [alt] attributes
- Form elements have associated labels
- Lists contain only <li> elements and script supporting elements (<script> and <template>).
- List items (<li>) are contained within <ul> or <ol> parent elements
- [user-scalable="no"] is not used in the <meta name="viewport"> element and the [maximum-scale] attribute is not less than 5.
- No element has a [tabindex] value greater than 0
- button, link, and menuitem elements have accessible names
- ARIA input fields have accessible names
- ARIA meter elements have accessible names
- ARIA progressbar elements have accessible names
- ARIA toggle fields have accessible names
- ARIA tooltip elements have accessible names
- ARIA treeitem elements have accessible names
- No form fields have multiple labels
- <frame> or <iframe> elements have a title
- <input type="image"> elements have [alt] text
- The document does not use <meta http-equiv="refresh">
- <object> elements have [alt] text
- Cells in a <table> element that use the [headers] attribute refer to table cells within the same table.
- <th> elements and elements with [role="columnheader"/"rowheader"] have data cells they describe.
- <video> elements contain a <track> element with [kind="captions"]

## Resources

[https://developers.google.com/web/updates/2021/02/devtools#accesibility-tree](https://developers.google.com/web/updates/2021/02/devtools#accesibility-tree)

[https://developers.google.com/web/fundamentals/accessibility](https://developers.google.com/web/fundamentals/accessibility)