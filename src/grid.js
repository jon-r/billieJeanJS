import { setAttrs, isFactor, isFactorFilter } from './utils';
import { cacheAdd } from './cache';
import opts from './config';

const doc = document;
const container = doc.querySelector(opts.selector);
const containerSize = container.getBBox();
const gridCountX = containerSize.width / opts.rectSize;
const gridCountY = containerSize.height / opts.rectSize;

const presetRect = setAttrs(doc.createElementNS('http://www.w3.org/2000/svg', 'rect'), {
  height: opts.rectSize - 1,
  width: opts.rectSize - 1,
  class: 'grid-rect',
});

function pointIs(filter, el) {
  const routes = JSON.parse(el.dataset.routes);
  const routeCount = routes.length;

  const out = {
    direction: routes[0],
    line: routeCount === 2,
    start: routeCount === 1,
  };

  return out[filter];
}

function setGridRoutes(coords) {
  const x = coords[0];
  const y = coords[1];
  const grid = opts.gridLines;

  const isHoriz = isFactor(y, grid);
  const isVert = isFactor(x, grid);

  const out = [];

  if (isVert && y > 0) out.push('u');
  if (isVert && y < gridCountY - 1) out.push('d');
  if (isHoriz && x > 0) out.push('l');
  if (isHoriz && x < gridCountX - 1) out.push('r');

  // TODO: add 'specials' (eg linear, start to filter in advance);

  return JSON.stringify(out);
}

function setSpecial(rect) {
  if (pointIs('line', rect)) {
    return 'line';
  }
  if (pointIs('start', rect)) {
    return 'start';
  }
  return false;
}

function getRect(arr) {
  return setAttrs(presetRect.cloneNode(), {
    x: arr[0] * opts.rectSize,
    y: arr[1] * opts.rectSize,
    'data-routes': setGridRoutes(arr),
    'data-coords': arr.join(','),
  });
}

export default function buildGrid() {
  const gridX = new Array(gridCountX).fill();
  const gridY = new Array(gridCountY).fill();

  const points = [];

  gridX.forEach((_, x) => {
    gridY.forEach((__, y) => {
      const coords = [x, y];

      if (coords.some(isFactorFilter, opts.gridLines)) {
        const rect = getRect(coords);
        rect.dataset.special = setSpecial(rect);
        cacheAdd(coords.join(','), rect);
        container.appendChild(rect);
        points.push(rect);
      }
    });
  });

  return points;
}
