# p5-scaler

A small utility library for creating p5.js sketches with scaling feature.

- Resizes/scales the canvas depending on the size of the parent HTML element.  
- The aspect ratio can be either fixed or variable.
- Also enables to insert initialization code (via `p5-scaler.init`) so you don't have to write everything in `setup()`.
- Works on [p5.js instance mode](https://github.com/processing/p5.js/wiki/Global-and-instance-mode). TypeScript/ES6 friendly.


## Usage

### With `<script>` tag

After loading `p5.js`, load `p5-scaler.js` (or `p5-scaler.min.js`) via `<script>` tag  
(The order is important as `p5-scaler.js` depends on `p5.js`).

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js" defer></script>
<script src="https://unpkg.com/@fal-works/p5-scaler@0.1.0/lib/p5-scaler.min.js" defer></script>
```

This will define a global variable `p5s` so that you can use it in your sketch.

**For a tutorial sample code, see: <https://editor.p5js.org/FAL/sketches/uKrr1SGZF>**

### On TypeScript / ES6

Install via NPM:

```text
npm install @fal-works/p5-scaler
```

And then something like:

```js
import * as p5s from "@fal-works/p5-scaler";
```

Unlike using `<script>` tag, you may also directly import some common instances like the below, however note that they are available only after the setup process has been started.

```js
import { p, canvas } from "@fal-works/p5-scaler";
```
