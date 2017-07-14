import GridRect from './rect';

import { isFactorFilter, randomFrom } from '../utils';

export default class CanvasGrid {
  constructor({
    target = 'jsGridCanvas',
    speed = 100,
    rectHeight = 5,
    rectWidth = 5,
    color = '#fff',
    gridSpacing = 20,
    limit = 10,
  }) {
    this.target = document.getElementById(target);

    this.ctx = this.target.getContext('2d');

    this.config = {
      speed,
      rectHeight,
      rectWidth,
      color,
      gridSpacing,
      limit,
    };

    this.count = 0;
    this.grid = new Map();
    this.startCap = 0;
    this.activePoints = [];

    this.gridStarters = [];
    this.ticker = null;

    this.container = this.updateContainer();
  }

  updateContainer() {
    const target = this.target;
    const cfg = this.config;

    target.height = target.parentElement.offsetHeight;
    target.width = target.parentElement.offsetWidth;

    return {
      rows: Math.floor(target.height / cfg.rectHeight),
      cols: Math.floor(target.width / cfg.rectWidth),
    };
  }

  build() {
    const container = this.container;
    const cfg = this.config;

    const rows = new Array(container.rows).fill();
    const cols = new Array(container.cols).fill();
    const grid = this.grid;

    cols.forEach((i, x) => {
      rows.forEach((j, y) => {
        const coords = [x, y];

        if (coords.some(isFactorFilter, cfg.gridSpacing)) {
          const newRect = new GridRect(this.ctx, cfg, coords);
          grid.set(newRect.id, newRect);
        }
      });
    });

    grid.forEach((rect) => {
      rect.setCanTrigger(grid, cfg, container);
      if (rect.canTrigger.length === 1) this.gridStarters.push(rect);
    });

    return this;
  }

  // TODO: find and remove artifacts
  updateGrid() {
    const active = this.activePoints;
    const activeClone = this.activePoints.slice(0);

    activeClone.forEach((rect, i) => {

      if (rect.alpha === 0) active.splice(i, 1);
      if (rect.alpha === 1) {
        const next = rect.getNext();

//        console.log(next);

        if (next) {
          active.push(next);
        } else {
          this.startCap -= 1;
        }
      }

      rect.draw();
    });

//    const test = this.grid.values.filter(rect => rect.alpha > 0);
//    console.log(test.length);

//    active.forEach(rect => rect.draw());
  }

  play() {
    const spawnSpeed = this.config.speed;

//    setTimeout(() => {
    this.ticker = setInterval(() => {
      const newRect = randomFrom(this.gridStarters);

      if (this.startCap < this.config.limit) {
        newRect.trigger();

        this.activePoints.push(newRect);
        this.startCap += 1;
      }

      requestAnimationFrame(() => this.updateGrid());
    }, spawnSpeed);


  }

  pause() {
    clearInterval(this.ticker);
  }
}
