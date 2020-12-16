/**
 * Tutorial sample code for library "p5-scaler".
 *
 * https://fal-works.github.io/p5-scaler/
 */

// ---- Prepare -----------------------------------------------------------

// First create a "Scaler" object,
// which will provide the main feature of `p5-scaler`.
// Here you select a scaling mode and pass a logical size before scaling.

// The below is for variable aspect ratio:
const scaler = p5s.variableRatio({ height: 100 });

// Alternatively, to keep the fixed aspect ratio:
//   const scaler = p5s.fixedRatio({ width: 100, height: 100 });

// Or to disable scaling:
//   const scaler = p5s.fixedSize({ width: 100, height: 100 });

// (Optional) Create an auto-resize function, which you can use in draw().
const autoResize = p5s.createAutoCanvasResizer(scaler);

// ---- Define Your Sketch ------------------------------------------------

function setup() {
  // For creating a canvas, use the scaler object.
  const canvas = scaler.createCanvas();

  // (Optional) Set a parent DOM element (here: ID "Sketch")
  // so that the canvas will fit it.
  p5s.setParentElement(canvas, "Sketch");

  // Any setup code...
  fill(196);
}

function draw() {
  // (Optional) See above. Here you can also pass any callback function.
  autoResize();

  // Any code that doesn't require scaling...
  background(240);

  // Use drawOnCanvas() for applying the scale factor.
  scaler.drawOnCanvas(() => {
    const circleSize = 70;
    circle(50, 50, circleSize);
  });
}
