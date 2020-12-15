/**
 * Tutorial sample code for library "p5-scaler".
 *
 * https://fal-works.github.io/p5-scaler/
 */

// ---- Prepare -------------------------------------------------------

// "p5-scaler" works on p5.js instance mode.
// Here we're going to share the p5 instance within the entire sketch.
let p;

// The below will be automatically called before setup().
// The variable p5s is defined by loading "p5-scaler".
p5s.init.onStartSetup.push((p5Instance) => {
  p = p5Instance;
});

// ---- Config (optional) ---------------------------------------------

// Specify the HTML element that will contain the canvas.
// See index.html and style.css for the "Sketch" element here.
p5s.config.setRootElementID("Sketch");

// Auto-resize the canvas whenever the container size is changed.
// You may also pass a callback function here.
p5s.config.autoResizeCanvas();

// ---- Define Your Sketch --------------------------------------------

// Define some p5 methods such as setup/draw.
const setup = () => {
  // Don't call createCanvas() here; it will be automatically done.
  p.fill(196);
};
const draw = () => {
  p.background(240);

  // The canvas size is automatically scaled.
  // Use drawOnCanvas() for applying the scale factor.
  p5s.drawOnCanvas(() => {
    const circleSize = 70;
    p.circle(50, 50, circleSize);
  });
};

// Here you may also define/include other p5 methods e.g. keyPressed().
const sketch = { setup, draw };

// ---- Start Your Sketch ---------------------------------------------

// First choose the scaling mode (here: variable aspect ratio)
// and pass the logical canvas size before scaling.
// Then call start() with the p5 methods you defined above.
p5s.variableRatio({ height: 100 }).start(sketch);

// Alternatively, to keep the aspect ratio:
//   p5s.fixedRatio({ width: 100, height: 100 }).start(sketch);

// Or to disable scaling:
//   p5s.fixedSize({ width: 100, height: 100 }).start(sketch);
