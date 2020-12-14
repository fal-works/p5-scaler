//eslint-disable-next-line
const p5s = p5starter;

let p;
p5s.onStartAssignP5.push((p5Inst) => {
  p = p5Inst;
});

let canvas;
p5s.onStartSetup.push(() => {
  canvas = p5s.canvas;
});

const { drawOnCanvas } = p5s;

const setup = () => {
  p.background("#f0f0f0");
  drawOnCanvas(() => {
    const { width, height } = canvas.size.logical;
    p.translate(width / 2, height / 2);
    p.circle(0, 0, 150);
  });
};

// p5s.fixedRatio({ width: 200, height: 200 }).start({ setup });
p5s.variableRatio({ height: 200 }).start({ setup });

p5s.autoResizeCanvas(setup);
