new p5((p) => {
  const cols = 12;
  const rows = 7;

  const getSize = () => {
    const container = document.getElementById("p5-container");
    const width = container ? container.clientWidth : 640;
    const height = Math.round(width * 0.56);
    return { width, height };
  };

  p.setup = () => {
    const { width, height } = getSize();
    const canvas = p.createCanvas(width, height);
    canvas.parent("p5-container");
    p.noiseDetail(3, 0.5);
    p.stroke(24, 64, 68, 160);
    p.noFill();
  };

  p.windowResized = () => {
    const { width, height } = getSize();
    p.resizeCanvas(width, height);
  };

  p.draw = () => {
    p.background(242, 237, 229);
    const t = p.frameCount * 0.015;

    for (let y = 0; y < rows; y += 1) {
      p.beginShape();
      for (let x = 0; x <= cols; x += 1) {
        const px = p.map(x, 0, cols, 20, p.width - 20);
        const py = p.map(y, 0, rows - 1, 40, p.height - 40);
        const offset = p.noise(x * 0.3, y * 0.4, t) * 40;
        p.curveVertex(px, py + offset);
      }
      p.endShape();
    }
  };
});
