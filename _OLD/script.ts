var parentEl: HTMLElement  = document.getElementById('billieJS');



class DanceMat {

  private squaresX: number;
  private squaresY: number;
  private sqCount: number;
  private tiles: Array<HTMLElement> = [];

  constructor(public height: number, public width : number, public gridSize : number) {
    this.squaresX = Math.floor(width / gridSize);
    this.squaresY = Math.floor(height / gridSize);
    this.sqCount = this.squaresX * this.squaresY;
  }

  private setParentCss () {
    var height = this.squaresY * this.gridSize,
      width = this.squaresX * this.gridSize,
    cssArr = [
      'height:' + height + 'px',
      'width:' + width + 'px',
      'left: calc(50% - ' + (width / 2) + 'px)',
      'top: calc(50vh - ' + (height / 2) + 'px)',
      'position: absolute'
    ]
    return cssArr.join('; ');
  }
  private setTileCss () {
    var height = this.gridSize,
      width = this.gridSize,
      cssArr = [
      'height:' + height + 'px',
      'width:' + width + 'px',
      'float: left'
    ]
    return cssArr.join('; ');
  }

  init(parent: HTMLElement) {

    var el: HTMLElement,
    i : number, j: number;

    el = document.createElement('div');
    el.style.cssText = this.setTileCss();

    parent.style.cssText = this.setParentCss();

    for (i = 0; i < this.squaresY; i++) {

      for (j = 0; j < this.squaresX; j++) {

        var newEl: HTMLElement = el.cloneNode();
        newEl.dataset.x = j;
        newEl.dataset.y = i;
        newEl.className = 'tile';


        parent.appendChild(newEl);
        this.tiles.push(newEl);

      }
    }
  }
}



let frame = new DanceMat(600, 1000, 20);

frame.init(parentEl);
