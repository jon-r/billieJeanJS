
function setAttrs(el, attrs) {
  Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
  return el;
}

const doc = document;
const gridContainer = doc.querySelector('[data-gridme]');
const gridSize = 5;
const rectSize = 5; // including 1px pad
const baseRect = doc.createElementNS('http://www.w3.org/2000/svg', 'rect');
const presetRect = setAttrs(baseRect, {
  height: gridSize - 1,
  width: gridSize - 1,
  fill: '#fff', // TEMP
  opacity: '0.3', // TEMP
});


function getRect(x, y) {
  const modX = x % gridSize;
  const modY = y % gridSize;

  if ((x === 0 && y === 0) || (x === 0 && modY > 0)
      || (y === 0 && modX > 0)
      || (modX > 0 && modY > 0)) {
    return false;
  }


  let gridPos = '';
  if (x === 0 || y === 0) {
    gridPos = 'start';
  } else if (modX === 0 && modY === 0) {
    gridPos = 'join';
  }

  return setAttrs(presetRect.cloneNode(), {
    x: x * rectSize,
    y: y * rectSize,
    'data-grid-pos': gridPos,
  });
}

function rectFilter()

function buildGrid() {
  // TODO make these update to the screenwidth?
  // console.log(gridContainer.clientHeight , rectSize);
  const gridX = new Array(gridContainer.clientWidth / rectSize).fill();
  const gridY = new Array(gridContainer.clientHeight / rectSize).fill();

  gridX.forEach((_, i) => {
    gridY.forEach((__, j) => {
      const rect = getRect(i, j);
      if (rect) gridContainer.appendChild(rect);
    });
  });
}

buildGrid(5);
