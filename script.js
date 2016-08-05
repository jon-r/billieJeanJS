var parentEl;
parentEl = document.getElementById('billieJS');
//interface DanceMat {
//  height: number;
//  width: number;
//  gridSize: number;
//  color: number;
//}
//
//function build(mat : DanceMat) {
//
//}
var DanceMat = (function () {
    //private cssArr: Array<string>;
    function DanceMat(height, width, gridSize) {
        this.height = height;
        this.width = width;
        this.gridSize = gridSize;
        this.squaresX = Math.floor(width / gridSize);
        this.squaresY = Math.floor(height / gridSize);
        this.sqCount = this.squaresX * this.squaresY;
    }
    DanceMat.prototype.setParentCss = function () {
        var height = this.squaresY * this.gridSize, width = this.squaresX * this.gridSize, cssArr = [
            'height:' + height + 'px',
            'width:' + width + 'px',
            'left: calc(50% - ' + (width / 2) + 'px)',
            'top: calc(50vh - ' + (height / 2) + 'px)',
            'position: absolute'
        ];
        return cssArr.join('; ');
    };
    DanceMat.prototype.setTileCss = function () {
        var height = this.gridSize, width = this.gridSize, cssArr = [
            'height:' + height + 'px',
            'width:' + width + 'px',
            'float: left'
        ];
        return cssArr.join('; ');
    };
    /*private setAbsStyle () {

    }*/
    DanceMat.prototype.init = function (parent) {
        var el, i, j;
        el = document.createElement('div');
        el.style.cssText = this.setTileCss();
        parent.style.cssText = this.setParentCss();
        for (i = 0; i < this.squaresY; i++) {
            for (j = 0; j < this.squaresX; j++) {
                var newEl = el.cloneNode();
                newEl.dataset.x = j;
                newEl.dataset.y = i;
                parent.appendChild(newEl);
            }
        }
    };
    return DanceMat;
}());
var frame = new DanceMat(600, 1000, 20);
frame.init(parentEl);
