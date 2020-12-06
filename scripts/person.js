// Class that represents a player
class Person {
  constructor(opts) {
    if(typeof opts === "string") {
      /* call with just the name */
      this.name = opts;
    } else {
      this.name = "Anonymous";
    }
    /* prop initialisers */
    this.row = 0;
    this.col = 0;
		this.last_row = 0; // track prior position to "go back"
		this.last_col = 0; 
		this.description = '';
		this.age = randomInt(12, 15); 
		this.inventory = {};
    /* call with a config object, overriding some or all of the above */
    if(typeof opts === "object") {
      Object.keys(opts).forEach(function (pn) {
        this[pn] = clone(opts[pn]);
      }, this);
    }
  }
  get pos() {
    return this.row + "x" + this.col;
  }
	get userRow() {
		return this.row;
	}
	get userCol() {
		return this.col;
	}
	set userRow(r) {
		this.row = r;
	}
	set userCol(c) {
		this.col = c;
	}
	get possibleMoves() {
		var moves = new Array();
		
		if ((this.row == 0) && (this.col == 0)) { // top left
			// bottom
			if (!setup.map[this.row+1][this.col].blocked)
				moves.push([this.row+1,this.col, 'S']);
			// bottom right
			if (!setup.map[this.row+1][this.col+1].blocked)
				moves.push([this.row+1,this.col+1,'SE']);
			// right 
			if (!setup.map[this.row][this.col+1].blocked)
				moves.push([this.row,this.col+1,'E']);
		} else if ((this.row == 0) && (this.col == (WIDTH-1))) { // top right
			// left
			if (!setup.map[this.row][this.col-1].blocked)
				moves.push([this.row,this.col-1,'W']);
			// bottom left
			if (!setup.map[this.row+1][this.col-1].blocked)
				moves.push([this.row+1,this.col-1,'SW']);
			// bottom
			if (!setup.map[this.row+1][this.col].blocked)
				moves.push([this.row+1,this.col,'S']);
		} else if ((this.row == (HEIGHT-1)) && (this.col == 0)) { // bottom left
			// top
			if (!setup.map[this.row-1][this.col].blocked)
				moves.push([this.row-1,this.col,'N']);
			// top right
			if (!setup.map[this.row-1][this.col+1].blocked)
				moves.push([this.row-1,this.col+1,'NE']);
			// left
			if (!setup.map[this.row][this.col-1].blocked)
				moves.push([this.row,this.col-1,'W']);
			// right
			if (!setup.map[this.row][this.col+1].blocked)
				moves.push([this.row,this.col+1,'E']);
		} else if ((this.row == (HEIGHT-1)) && (this.col == (WIDTH-1))) { // bottom right
					
		} else if (this.row == 0) { // top row
			// left
			if (!setup.map[this.row][this.col-1].blocked)
				moves.push([this.row,this.col-1,'W']);
			// right
			if (!setup.map[this.row][this.col+1].blocked)
				moves.push([this.row,this.col+1,'E']);
			// bottom left
			if (!setup.map[this.row+1][this.col-1].blocked)
				moves.push([this.row+1,this.col-1,'SW']);
			// bottom
			if (!setup.map[this.row+1][this.col].blocked)
				moves.push([this.row+1,this.col,'S']);
			// bottom right
			if (!setup.map[this.row+1][this.col+1].blocked)
				moves.push([this.row+1,this.col+1,'SE']);
		} else if (this.row == (HEIGHT-1)) { // bottom row
			if (!setup.map[this.row][this.col-1].blocked) // left
				moves.push([this.row,this.col-1,'W']);
			if (!setup.map[this.row][this.col+1].blocked) // right
				moves.push([this.row,this.col+1,'E']);
			if (!setup.map[this.row-1][this.col-1].blocked) // top left
				moves.push([this.row-1,this.col-1,'NW']);
			if (!setup.map[this.row-1][this.col].blocked) // top
				moves.push([this.row-1,this.col,'N']);
			if (!setup.map[this.row-1][this.col+1].blocked) // top right
				moves.push([this.row-1,this.col+1,'NE']);
		} else if (this.col == 0) { // left column
			if (!setup.map[this.row-1][this.col].blocked) // top
				moves.push([this.row-1,this.col,'N']);
			if (!setup.map[this.row-1][this.col+1].blocked) // top right
				moves.push([this.row-1,this.col+1,'NE']);
			if (!setup.map[this.row][this.col+1].blocked) // right
				moves.push([this.row,this.col+1,'E']);
			if (!setup.map[this.row+1][this.col+1].blocked) // bottom right
				moves.push([this.row+1,this.col+1,'SE']);
			if (!setup.map[this.row+1][this.col].blocked) // bottom
				moves.push([this.row+1,this.col,'S']);
		} else if (this.col == (WIDTH-1)) { // right column
			if (!setup.map[this.row-1][this.col].blocked) // top
				moves.push([this.row-1,this.col,'N']);
			if (!setup.map[this.row-1][this.col-1].blocked) // top left
				moves.push([this.row-1,this.col-1,'NW']);
			if (!setup.map[this.row][this.col-1].blocked) // left
				moves.push([this.row,this.col-1,'W']);
			if (!setup.map[this.row+1][this.col-1].blocked) // bottom left
				moves.push([this.row+1,this.col-1,'SW']);
			if (!setup.map[this.row+1][this.col].blocked) // bottom
				moves.push([this.row+1,this.col,'S']);
		} else { // anywhere in between
			if (!setup.map[this.row][this.col-1].blocked) // left
				moves.push([this.row,this.col-1,'W']);
			if (!setup.map[this.row-1][this.col-1].blocked) // top left
				moves.push([this.row-1,this.col-1,'NW']);
			if (!setup.map[this.row-1][this.col].blocked) // top
				moves.push([this.row-1,this.col,'N']);
			if (!setup.map[this.row-1][this.col+1].blocked) // top right
				moves.push([this.row-1,this.col+1,'NE']);
			if (!setup.map[this.row][this.col+1].blocked) // right
				moves.push([this.row,this.col+1,'E']);
			if (!setup.map[this.row+1][this.col+1].blocked) // bottom right
				moves.push([this.row+1,this.col+1,'SE']);
			if (!setup.map[this.row+1][this.col].blocked) // bottom
				moves.push([this.row+1,this.col,'S']);
			if (!setup.map[this.row+1][this.col-1].blocked) // bottom left
				moves.push([this.row+1,this.col-1,'SW']);
		}

		
		return moves;
	}
	clone() {
    return new Player(this);
  }
  toJSON() {
    var ownData = {};
    Object.keys(this).forEach(function (pn) {
      ownData[pn] = clone(this[pn]);
    }, this);
    return JSON.reviveWrapper('new Player($ReviveData$)', ownData);
  }
}
window.Player = Person;
