var danceMat = {

  init : function(options) {
    var _this = danceMat;
    options = options || {};
    _this.config = {
      parent : options.hasOwnProperty('parentEl') ? options.parentEl : '#billieJS',
      height : options.hasOwnProperty('height') ? options.height : 600,
      width : options.hasOwnProperty('width') ? options.width : 1000,
      gridSize : options.hasOwnProperty('gridSize') ? options.gridSize : 20,
    };
    var get = _this.config,
      el = document.createElement('div');

    _this.sqX = Math.floor(get.width / get.gridSize);
    _this.sqY = Math.floor(get.height / get.gridSize);

    _this.parentEl = document.querySelector(get.parent);

    _this.parentEl.style.cssText = _this.setParentCss();
    el.style.cssText = _this.setTileCss();

    for (i = 0; i < _this.sqY; i++) {
      for (j = 0; j < _this.sqX; j++) {
        var newEl = el.cloneNode(false);
        newEl.className = 'tile x' + j + ' y' + i;
        _this.parentEl.appendChild(newEl);

        var newObj = new Tile(newEl,j,i);
      }
    }


  },

  setParentCss: function () {
    var get = this.config,
      height = this.sqY * get.gridSize, width = this.sqX * get.gridSize,
      cssArr = [
        'height:' + height + 'px',
        'width:' + width + 'px',
        'left: calc(50% - ' + (width / 2) + 'px)',
        'top: calc(50vh - ' + (height / 2) + 'px)',
        'position: absolute'
      ];
    return cssArr.join('; ');
  },
  setTileCss: function () {
    var size = this.config.gridSize, cssArr = [
      'height:' + size + 'px',
      'width:' + size + 'px',
      'float: left'
    ];
    return cssArr.join('; ');
  }




}

var Tile = function Tile(el, x, y) {
  el.addEventListener('click', function () { blink.all(x,y)} );
};


var blink = {

  go : function(direction,x,y) {
    var el = danceMat.parentEl.getElementsByClassName('tile x' + x + ' y' + y);
    if (el.length == 1) {
      el[0].classList.add('ping');

      if(direction) {
        setTimeout(function() {
          blink[direction](x,y);
        }, 50);
      }

      setTimeout(function() {
        el[0].classList.remove('ping');
      }, 500);
    }
  },
  up : function(x,y) {
    y--;
    blink.go('up',x,y);
  },
  down : function(x,y) {
    y++;
    blink.go('down',x,y);
  },
  left : function(x,y) {
    x--;
    blink.go('left',x,y);
  },
  right : function(x,y) {
    x++;
    blink.go('right',x,y);
  },

  all : function(x,y) {

    blink.go(false,x,y);
    setTimeout(function() {
       blink.up(x,y);
       blink.down(x,y);
       blink.left(x,y);
       blink.right(x,y);
    }, 50);

  }
}





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
