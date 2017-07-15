import GridRect from './rect';

import { isFactorFilter, randomFrom } from '../utils';

export default class CanvasGrid {
  constructor({
    target = 'jsGridCanvas',
    rectHeight = 8,
    rectWidth = 8,
    color = '#fff',
    gridSpacing = 16,
    limit = 5,
  }) {
    this.target = document.getElementById(target);

    this.ctx = this.target.getContext('2d');

    this.config = {
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

    this.isPaused = false;
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


  play() {
    this.isPaused = false;
    this.maintainPoints();
    this.updateGrid();
  }

  maintainPoints() {
    const newRect = randomFrom(this.gridStarters);

    this.activePoints = this.activePoints.filter(rect => rect.isActive);

    if (this.startCap < this.config.limit) {
      newRect.trigger();

      this.activePoints.push(newRect);
      this.startCap += 1;
    }

    if (!this.isPaused) {
      setTimeout(() => this.maintainPoints(), 1000);
    }
  }

  // TODO: spead functions across frames.
  // we now have 3 empty frames with every 4th doing all the work.
  updateGrid(n) {
    let m = n + 1 || 0;

    const active = this.activePoints;

    if (m === 3) {
      m = 0;

      active.forEach((rect) => {
        rect.draw();

        if (rect.isNew) {
          const next = rect.getNext();

          if (next) {
            active.push(next);
          } else {
            this.startCap -= 1;
          }
        }
      });
    }

    // if (m === 1) {
    //   m = 1;
    //
    // }

    if (!this.isPaused) {
      requestAnimationFrame(() => this.updateGrid(m));
    }
    return true;
  }

  pause() {
    this.isPaused = true;
  }
}
