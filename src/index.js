import CanvasGrid from './canvas/canvasGrid';

// import SVGGrid from './svg/SVG-grid';

// const grid = new JRGrid({});

// window.addEventListener('load', grid.begin());

const grid = new CanvasGrid({ target: 'jrGrid' });

window.addEventListener('load', () => {
  grid.build().play();
});

