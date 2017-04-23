import opts from './config';
import { getRandom, randomFrom, addArr } from './utils';
import buildGrid from './grid';

const pointsAll = Array.from(buildGrid());

const directionTo = {
  u: [0, -1],
  d: [0, 1],
  l: [-1, 0],
  r: [1, 0],
};

const directionFrom = {
  u: 'd',
  d: 'u',
  l: 'r',
  r: 'l',
};

function setDirection(el) {
  const currData = el.dataset;
  const currDirection = currData.direction ? currData.direction : false;
  currData.direction = '';

  const currSpecial = currData.special;
  if (currSpecial === 'line') {
    return currDirection;
  }

  const currRoutes = JSON.parse(currData.routes);
  if (currSpecial === 'start') {
    return currRoutes[0];
  }


  const possibleRoutes = currRoutes
  .filter(x => x !== directionFrom[currDirection]);

  return randomFrom(possibleRoutes);
}


function nextPoint(currEl) {
  const newDirection = setDirection(currEl);
  if (!newDirection) {
    return false;
  }

  const currCoords = currEl.dataset.coords.split(',');
  const offset = directionTo[newDirection];
  const newCoords = addArr(currCoords, offset).join(',');
  const newEl = pointsAll.find(point => point.dataset.coords === newCoords);

  newEl.dataset.direction = newDirection;

  return newEl;
}

function activatePoint(el) {
  const nextEl = nextPoint(el);
  if (!nextEl) {
    return false;
  }

  el.classList.add('glow');

  setTimeout(() => activatePoint(nextEl), opts.runSpeed);
  setTimeout(() => el.classList.remove('glow'), opts.spawnSpeed);

  return true;
}

export default function activatePoints() {
  const pointsStarts = pointsAll.filter(point => point.dataset.special === 'start');
  const pointsStartCount = pointsStarts.length;

  return setInterval(() => {
  // return setTimeout(() => {
    const rng = getRandom(pointsStartCount);

    if (pointsStarts) activatePoint(pointsStarts[rng], false);
  }, opts.spawnSpeed);
}
