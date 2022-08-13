const SMOOTH = 0.02; // 動きのなめらかさ（小さいほどなめらか）
const LINE_WEIGHT = 3;

let circles = [];

class Circle {
  constructor(name, x, y, color, size, activity, coordinationLevel) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.color = color;
    this.size = size;
    this.lowerActivity = -activity * 0.87;
    this.upperActivity = activity;
    this.coordinationLevel = coordinationLevel;
    this.path = [{ x: x, y: y }];
    this.seed = floor(random(100000));
  }

  // 現在地に円を描写する
  drawCircle() {
    stroke(this.color);
    strokeWeight(LINE_WEIGHT);
    noFill();
    circle(this.x, this.y, this.size * 2);
  }

  // 円の位置を更新する
  update(id) {
    const step = this.getStep(id);

    noiseSeed(this.seed);
    this.x += map(noise(step, 0), 0, 1, this.lowerActivity, this.upperActivity);
    this.y += map(noise(0, step), 0, 1, this.lowerActivity, this.upperActivity);
  }

  getStep(id) {
    const noiseCycleShift = id / 100;
    return frameCount * SMOOTH + noiseCycleShift;
  }

  // ウィンドウからはみ出ないように位置を調整する
  check() {
    const lineWeight = round(LINE_WEIGHT / 2);
    // 右端に衝突
    if (this.x + this.size + lineWeight >= width) {
      this.x = width - this.size - lineWeight;
    }

    // 左端に衝突
    if (this.x - this.size - lineWeight <= 0) {
      this.x = this.size + lineWeight;
    }

    // 下端に衝突
    if (this.y + this.size + lineWeight >= height) {
      this.y = height - this.size - lineWeight;
    }

    // 上端に衝突
    if (this.y - this.size - lineWeight <= 0) {
      this.y = this.size + lineWeight;
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
}
