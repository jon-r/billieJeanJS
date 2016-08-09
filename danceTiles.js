var danceMat = (function() {

  function danceMat(options) {


    options = options || {};
    this.config = {
      parent : options.hasOwnProperty('parentEl') ? options.parentEl : '#billieJS',
      height : options.hasOwnProperty('height') ? options.height : 600,
      width : options.hasOwnProperty('width') ? options.width : 1000,
      gridSize : options.hasOwnProperty('gridSize') ? options.gridSize : 20,
    };

    this.buildGrid();
    this.addParentListener();

  };
  danceMat.prototype = {

    buildGrid: function() {
      var get = this.config,
        el = document.createElement('div');

      this.sqX = Math.floor(get.width / get.gridSize);
      this.sqY = Math.floor(get.height / get.gridSize);

      this.parentEl = document.querySelector(get.parent);

      this.parentEl.style.cssText = this.setParentCss();
      el.style.cssText = this.setTileCss();

      for (i = 0; i < this.sqY; i++) {
        for (j = 0; j < this.sqX; j++) {
          var newEl = el.cloneNode(false);
          newEl.className = 'tile x' + j + ' y' + i;
          this.parentEl.appendChild(newEl);
        }
      }
    },

    addParentListener: function() {
      this.parentEl.addEventListener("click", blink.set, false);
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

  return danceMat;

})();

var blink = (function() {

  var out = {

    go : function(direction,x,y) {
      var el = document.getElementsByClassName('tile x' + x + ' y' + y), classes;
      if (el.length == 1 ) {

        classes = el[0].classList;

        if (!classes.contains('lock')) {


          var blinkers = delay(function() {
            classes.add('ping');


          }, 0)
          .delay(function() {

            if(direction) {
              blink[direction](x,y);
            }
          }, 50)
          .delay(function() {
            classes.remove('ping');
          }, 300);
        } else {

          classes.remove('lock');
          blink.all(x,y);

        }
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

      blink.go(false, x,y);

      setTimeout(function() {
         blink.up(x,y);
         blink.down(x,y);
         blink.left(x,y);
         blink.right(x,y);
      }, 50);

    },

    set : function(e) {
      var el = e.target;
      if (el !== e.currentTarget) {
        if (el.classList.contains('lock')) {
          var styleArr = el.className.split(' ');
          x = styleArr.filter(matches('x'))[0].slice(1);
          y = styleArr.filter(matches('y'))[0].slice(1);
          blink.all(x,y);
        } else {
          el.classList.add('lock');
        }
      }
      e.stopPropagation();
    },
  }
  return out;
})();

function matches(match) {
  return function(value) {
    return value.indexOf(match) === 0;
  }
}


//http://stackoverflow.com/a/6921279
function delay(fn, t) {
  // private instance variables
  var queue = [],
    self, timer;

  function schedule(fn, t) {
    timer = setTimeout(function () {
      timer = null;
      fn();
      if (queue.length) {
        var item = queue.shift();
        schedule(item.fn, item.t);
      }
    }, t);
  }
  self = {
    delay: function (fn, t) {
      // if already queuing things or running a timer,
      //   then just add to the queue
      if (queue.length || timer) {
        queue.push({
          fn: fn,
          t: t
        });
      } else {
        // no queue or timer yet, so schedule the timer
        schedule(fn, t);
      }
      return self;
    },
    cancel: function () {
      clearTimeout(timer);
      queue = [];
    }
  };
  return self.delay(fn, t);
}
var floor = new danceMat();
