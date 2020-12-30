// move this elsewhere eventually
setup.drawMap = function(_map, _player, _friends) {
  let _render = "<table>";
  for (let _row = 0; _row < _map.length; _row++) {
    _render += "<tr>";
    for (let _col = 0; _col < _map[_row].length; _col++) {
			_render += `<td style="background-color: ${(_map[_row][_col].blocked ? "#666": "#444")};">`;
			if (_player.col == _col && _player.row == _row)
				_render += "😐";
		  else {
				var isEmpty = true;
				for (let f = 0; f < _friends.length; f++) {
					if (_friends[f].row == _row && _friends[f].col == _col) {
						if (isEmpty)
						  _render += "🤪";
						isEmpty = false;
					}
				}
				if (isEmpty && !_map[_row][_col].blocked) {
					switch (_map[_row][_col].room_type) {
						case ROOM_TYPES.STALAGS:
							_render += "△";
							break;
						case ROOM_TYPES.OPEN:
							_render += "_";
							break;
						case ROOM_TYPES.TIGHT:
							_render += "⁜";
							break;
						case ROOM_TYPES.STREAM:
							_render += "~";
							break;
						case ROOM_TYPES.POOL:
							_render += "⊜";
							break;
						case ROOM_TYPES.VOID:
							_render += "ↈ";
							break;
						case ROOM_TYPES.ROCKY:
							_render += "⋙";
							break;
						case ROOM_TYPES.NORMAL:
						default:
							_render += " ";
							break;
					}
					 //_render += "";
				} else {
				  _render += " ";
				}
			}
			_render += `</td>`;
    }
    _render += "</tr>";
  }
	_render += "</table>";
	return _render;
}

// Class that outlines a room
class Room {
	constructor (title, description, noise_value) {
		this.title       = title;
		this.description = description;
		this.noise_value = noise_value;
		this.items       = new Array();
		this.encounters  = new Array();
		this.prior_room  = -1;
		this.connectors  = new Array();
		this.discovered  = false;
		this.blocked     = true;
		
		/* Generate room type from Simplex noise */
		if (noise_value < 0) {
			this.room_type = ROOM_TYPES.NORMAL;
		 	this.title = "A normal room";
			this.description = "A normal room description";
		} else if (noise_value < 0.25) {
			this.room_type = ROOM_TYPES.OPEN;
			this.title = "An open room";
			this.description = "A room with a view!";
		} else if (noise_value < 0.35) {
			this.room_type = ROOM_TYPES.TIGHT;
			this.title = "A tight room";
			this.description = "There is a very tight squeeze here";
		} else if (noise_value < 0.55) {
			this.room_type = ROOM_TYPES.STREAM;
			this.title = "A streamy room";
			this.description = "A stream meanders about";
		} else if (noise_value < 0.65) {
			this.room_type = ROOM_TYPES.POOL;
			this.title = "A room with a shimmering pool";
			this.description = "There is a large, shimmering pool in this room.";
		} else if (noise_value < 0.75) {
			this.room_type = ROOM_TYPES.ROCKY;
			this.title = "A room with rocky ground";
			this.description = "Lots of rocks abound on this ground.  Watch your step.";
		} else if (noise_value < 0.95) {
			this.room_type = ROOM_TYPES.STALAGS;
			this.title = "A room with stalagtites/mites";
			this.description = "Many rocky outcroppings seem to be in this room";
		} else {
			this.room_type = ROOM_TYPES.VOID;
			this.title = "A room with a precipice";
			this.description = "There is a gaping void here.  Don't fall.";
		}
	}	
}