# p5starter

A small utility library for creating p5.js sketches with auto-scaling.

- Resizes/scales the canvas automatically depending on the parent HTML element.  
- The aspect ratio can be either fixed or variable.
- Also enables to insert initialization code (via `p5starter.init`) so you don't have to write everything in `setup()`.
- Works on [p5.js instance mode](https://github.com/processing/p5.js/wiki/Global-and-instance-mode). TypeScript/ES6 friendly.


## Usage

### With `<script>` tag

After loading `p5.js`, load `p5starter.js` (or `p5starter.min.js`) via `<script>` tag  
(The order is important as `p5starter.js` depends on `p5.js`).

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js" defer></script>
<script src="https://unpkg.com/@fal-works/p5starter@0.1.0/lib/p5starter.min.js" defer></script>
```

This will define a global variable `p5starter` so that you can use it in your sketch.

**For a tutorial sample code, see: <https://editor.p5js.org/FAL/sketches/uKrr1SGZF>**

### On TypeScript / ES6

Install via NPM:

```text
npm install @fal-works/p5starter
```

And then something like:

```js
import * as p5s from "@fal-works/p5starter";
```

Unlike using `<script>` tag, you may also directly import some common instances like the below, however note that they are available only after the setup process has been started.

```js
import { p, canvas } from "@fal-works/p5starter";
```
