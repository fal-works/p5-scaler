# p5-scaler

A small library for scaling p5.js sketches.

- Resizes/scales the canvas depending on the size of the parent HTML element.  
- The aspect ratio can be either fixed or variable.
- Works on both [global and instance mode](https://github.com/processing/p5.js/wiki/Global-and-instance-mode) of p5.js.
- TypeScript/ES6 friendly.

GitHub: <https://github.com/fal-works/p5-scaler>


## Use with \<script\> tag

After loading `p5.js`, load `p5-scaler.js` (or `*.min.js` for reducing size) via `<script>` tag.

The order is important as `p5-scaler.js` will refer to the global variable `p5`.

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.js"></script>
<script src="https://unpkg.com/@fal-works/p5-scaler@0.1.0/lib/p5-scaler.js"></script>
```

`p5-scaler.js` will define a global variable `p5s` so that you can use it in your sketch.

**For a tutorial sample code, see: <https://editor.p5js.org/FAL/sketches/W08t3h2qR>**


## Use on TypeScript / ES6

Install via NPM:

```text
npm install @fal-works/p5-scaler
```

And then something like:

```js
import * as p5s from "@fal-works/p5-scaler";
```

If you're on instance mode, be sure to associate the scaler object with the `p5` instance by calling the method `setP5Instance()`.
