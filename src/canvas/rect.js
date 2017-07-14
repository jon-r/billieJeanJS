// TODO - recode have rectangles provide whats being changed info to the parent grid.
// only one request animation to do the whole render??

import { isFactor, randomFrom } from '../utils';


export default class GridRect {

  constructor(ctx, cfg, coords) {
    this.ctx = ctx;

    this.dims = [
      cfg.rectWidth * coords[0],  // x
      cfg.rectHeight * coords[1], // y
      cfg.rectWidth, // width
      cfg.rectHeight, // height
    ];

    this.coords = coords;
    this.id = coords.join(',');

    this.color = cfg.color;

    this.alpha = 0;

    this.triggeredBy = false;
    this.canTrigger = [];
  }

  draw() {
    const ctx = this.ctx;

    ctx.clearRect(...this.dims);

    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.alpha;
    ctx.fillRect(...this.dims);

    this.alpha = Math.max(this.alpha - 0.05, 0);
    return this;
  }

  setCanTrigger(grid, cfg, container) {
    const [x, y] = this.coords;
    // const y = coords[1];

    const isHoriz = isFactor(y, cfg.gridSpacing);
    const isVert = isFactor(x, cfg.gridSpacing);

    const out = [];

    if (isVert && y > 0) out.push(grid.get(`${x},${y - 1}`));
    if (isVert && y < container.rows - 1) out.push(grid.get(`${x},${y + 1}`));
    if (isHoriz && x > 0) out.push(grid.get(`${x - 1},${y}`));
    if (isHoriz && x < container.cols - 1) out.push(grid.get(`${x + 1},${y}`));

    this.canTrigger = out;
  }

  trigger(triggeredBy = false) {
    this.triggeredBy = triggeredBy;
    this.alpha = 1;
  }

  getNext() {
    const validTargets = this.canTrigger.filter(rect => rect.id !== this.triggeredBy);

    if (!validTargets.length) {
      return false;
    }

    const newTarget = (validTargets.length > 2) ? randomFrom(validTargets) : validTargets[0];

    newTarget.trigger(this.id);

    return newTarget;
  }



}
