
export function setAttrs(el, attrs) {
  Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
  return el;
}

export function isFactor(i, n) {
  return i % n === 0 && i > 0;
}

export function isFactorFilter(i) {
  return isFactor(i, this);
}

export function getRandom(range) {
  return Math.floor(Math.random() * range);
}

export function randomFrom(arr) {
  const rng = getRandom(arr.length);

  return arr[rng];
}

export function addArr(arr1, arr2) {
  return arr1.map((n, i) => Number(n) + Number(arr2[i]));
}
