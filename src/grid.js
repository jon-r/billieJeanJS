import { setAttrs, isFactor, isFactorFilter } from './utils';
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

  return JSON.stringify(out);
}

function getRect(arr) {
  return setAttrs(presetRect.cloneNode(), {
    x: arr[0] * opts.rectSize,
    y: arr[1] * opts.rectSize,
    'data-routes': setGridRoutes(arr),
    'data-coords': JSON.stringify(arr),
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
        container.appendChild(rect);
        points.push(rect);
      }
    });
  });

  return points;
}
