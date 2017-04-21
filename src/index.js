import join from 'lodash';

function component () {
  var element = document.createElement('div');

  /* lodash is required for the next line to work */
  element.innerHTML = _.join(['Hello','webpack'], ' ');

  return element;
}

const array = [1];
const other = _.concat(array, 2, [3], [[4]]);

alert(other); //[1, 2, 3, [4]]

document.body.appendChild(component());
