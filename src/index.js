import activatePoints from './points';

export default function jrGrid() {
  activatePoints('#js_gridBox');
}

window.addEventListener('load', jrGrid);
