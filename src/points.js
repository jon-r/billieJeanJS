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

function pointIs(filter, el) {
  const routes = JSON.parse(el.dataset.routes);
  const routeCount = routes.length;

  const out = {
    direction: routes[0],
    start: routeCount === 1,
  };

  return out[filter];
}

function setDirection(el) {
  const currData = el.dataset;
  const currDirection = currData.direction ? currData.direction : false;
  const currRoutes = JSON.parse(currData.routes);
  const possibleRoutes = currRoutes
  .filter(x => x !== directionFrom[currDirection]);

  // console.log(possibleRoutes);

  currData.direction = '';

  return randomFrom(possibleRoutes);
}


function nextPoint(currEl) {
  const newDirection = setDirection(currEl);
  if (!newDirection) {
    return false;
  }

  const currCoords = JSON.parse(currEl.dataset.coords);
  const offset = directionTo[newDirection];
  const newCoords = JSON.stringify(addArr(currCoords, offset));
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
  const pointsStarts = pointsAll.filter(point => pointIs('start', point));
  const pointsStartCount = pointsStarts.length;

  return setInterval(() => {
  // return setTimeout(() => {
    const rng = getRandom(pointsStartCount);

    if (pointsStarts) activatePoint(pointsStarts[rng], false);
  }, opts.spawnSpeed);
}
