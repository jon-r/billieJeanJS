
export function setAttrs(el, attrs) {
  Object.keys(attrs).forEach(key => el.setAttribute(key, attrs[key]));
  return el;
}

export function isFactorOf(i) {
  return i % this === 0 && i > 0;
}

export function getRandom(range) {
  return Math.floor(Math.random() * range);
}
