import buildGrid from './grid';
import opts from './config';
import { getRandom } from './utils';

const pointsAll = Array.from(buildGrid());
const pointsStarts = pointsAll.filter(point => point.dataset.gridPos === 'start');
const pointStartCount = pointsStarts.length;

setTimeout(() => {
  // TODO: set this as interval
  const rng = getRandom(pointStartCount);

  pointsStarts[rng].classList.add('glow');
}, opts.spawnSpeed);
