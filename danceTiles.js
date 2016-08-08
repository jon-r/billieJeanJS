var DanceMat = function DanceMat(options) {
  options = options || {};

  this.config = {
    parentEl : options.hasOwnProperty('parentEl') ? options.parentEl : '#billieJS',
    height : options.hasOwnProperty('height') ? options.height : 600,
    width : options.hasOwnProperty('width') ? options.width : 1000,
    gridSize : options.hasOwnProperty('gridSize') ? options.gridSize : 20,
  };

}

function setCSS(arr) {

}

DanceMat.prototype = {
  init: function () {
    this.


  },
  setParentCss: function () {
    var height = this.squaresY * this.gridSize, width = this.squaresX * this.gridSize, cssArr = [
      'height:' + height + 'px',
      'width:' + width + 'px',
      'left: calc(50% - ' + (width / 2) + 'px)',
      'top: calc(50vh - ' + (height / 2) + 'px)',
      'position: absolute'
    ];
    return cssArr.join('; ');
  },
  setTileCss: function () {
    var height = this.gridSize, width = this.gridSize, cssArr = [
      'height:' + height + 'px',
      'width:' + width + 'px',
      'float: left'
    ];
    return cssArr.join('; ');
  };

}

var dancemat = new DanceMat();

dancemat.init();


//function danceMat(options) {
//  options = options || {};
//
//
//
//
//  var out = {
//    config:
//
//  }
//}
//
//
//(function () {
//  "use strict";
//
//  var danceFloor = {
//    init: function(options) {
//
//      options = options || {};
//      var config = {
//        tableElement : options.hasOwnProperty('tableElement') ? options.tableElement : '#billieJS',
//        deckCount : options.hasOwnProperty('deckCount') ? options.deckCount : 6,
//        players : options.hasOwnProperty('players') ? options.players : ['player']
//      }, control = {
//        parent : document.createElement('div'),
//      };
//
//      danceFloor.table = document.getElementById('billieJS');
//    }
//  };
//
//
//})();
