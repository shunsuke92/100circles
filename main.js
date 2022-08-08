const SMOOTH = 0.02; // 動きのなめらかさ（小さいほどなめらか）

let circles = [];
let px = 0;
let py = 0;

class Circle {
  constructor(name, x, y, color, size, activity, coordinationLevel) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.activity = activity;
    this.coordinationLevel = coordinationLevel;
    this.path = [{ x: x, y: y }];
  }

  // 現在地に円を描写する
  drawCircle() {
    stroke(this.color);
    strokeWeight(3);
    noFill();
    circle(this.x, this.y, this.size * 2);
  }

  // 円の位置を更新する
  update(id) {
    const x = px + id / 100;
    const y = py + id / 100;

    noiseSeed(id);
    this.x += map(noise(x, 0), 0, 1, -this.activity * 0.87, this.activity);
    this.y += map(noise(0, y), 0, 1, -this.activity * 0.87, this.activity);
  }

  // ウィンドウからはみ出ないように位置を調整する
  check() {
    if (this.x + this.size >= width) {
      this.x -= this.activity;
    }

    if (this.x - this.size <= 0) {
      this.x += this.activity;
    }

    if (this.y + this.size >= height) {
      this.y -= this.activity;
    }

    if (this.y - this.size <= 0) {
      this.y += this.activity;
    }
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  colorMode(HSB);
  background(0, 0, 0);

  const x = width / 2;
  const y = height / 2;

  for (let i = 0; i < 100; i++) {
    circles.push(new Circle('blue', x, y, color(190 + i, 60, 90), 40, 3, null));
  }
}

function draw() {
  // 残像を少し残す
  background(0, 0, 0, 0.25);

  // 各円の描写と更新を行う
  for (let i = 0; i < circles.length; i++) {
    circles[i].drawCircle();
    circles[i].update(i);
    circles[i].check();
  }
  px += SMOOTH;
  py += SMOOTH;
}
