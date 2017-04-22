import { setAttrs, isFactorOf } from './utils';
import opts from './config';

const doc = document;
const container = doc.querySelector(opts.selector);
const containerSize = container.getBBox();
const gridCountX = containerSize.width / opts.rectSize;
const gridCountY = containerSize.height / opts.rectSize;

const presetRect = setAttrs(doc.createElementNS('http://www.w3.org/2000/svg', 'rect'), {
  height: opts.rectSize - 1,
  width: opts.rectSize - 1,
  fill: '#fff', // TEMP?
  opacity: '0.1', // TEMP?
});

function setGridPos(coords) {
  // let gridPos = '';
  if (coords.some(n => n === 0 || n === gridCountX - 1)) {
    return 'start';
  }
  if (coords.every(isFactorOf, opts.gridLines)) {
    return 'join';
  }
  if (isFactorOf(coords[0], opts.gridlines)) {
    return 'horiz';
  }
  return 'vert';
}

function getRect(arr) {
  const x = arr[0];
  const y = arr[1];

  return setAttrs(presetRect.cloneNode(), {
    x: x * opts.rectSize,
    y: y * opts.rectSize,
    'data-grid-pos': setGridPos(arr),
  });
}

export default function buildGrid() {
  const gridX = new Array(gridCountX).fill();
  const gridY = new Array(gridCountY).fill();

  const points = [];

  gridX.forEach((_, x) => {
    gridY.forEach((__, y) => {
      const coords = [x, y];

      if (coords.some(isFactorOf, opts.gridLines)) {
        const rect = getRect(coords);
        container.appendChild(rect);
        points.push(rect);
      }
    });
  });

  return points;
}
