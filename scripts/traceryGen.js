function drunkardsWalk(_map, _start, _target) {
	// Now carve out a path with a drunkard's walk from one corner to the other
	var done = false;
	var c_row  = _start[0];
	var c_col  = _start[1];
	while (!done) {
		_map[c_row][c_col].blocked = false;
		
		if ((c_row == (_target[0]-1)) && (c_col == (_target[1]-1)))
				done = true;
		else { // update our slobbering drunk
		  /*
			0 1 2
			3 . 4
			5 6 7
			*/
			var dir = randomInt(0,8);
		  switch (dir) {
				case 0:
					if (c_col > 0)
						c_col -= 1;
					if (c_row > 0)
						c_row -= 1;
				  break;
				case 1:
					if (c_row > 0)
						c_row -= 1;
					break;
				case 2:
					if (c_row < (_target[0]-1))
						c_row += 1;
					if (c_col < (_target[1]-1))
						c_col += 1;
					break;
				case 3:
					if (c_col > 0)
						c_col -= 1;
					break;
				case 4:
					if (c_col < (_target[0]-1))
						c_col += 1;
					break;
				case 5:
					if (c_col > 0)
						c_col -= 1;
					if (c_row < (_target[0]-1))
						c_row += 1;
					break;
				case 6:
					if (c_row < (_target[0]-1))
						c_row += 1;
					break;
				case 7:
				default:
					if (c_row < (_target[0]-1))
						c_row += 1;
					if (c_col < (_target[1]-1))
						c_col += 1;
					break;
			}
		}
	}
	
  return _map;
}

// Import a script while saving the returned Promise so it may be used later
setup.traceryImport = importScripts("js/tracery.js", "js/mods-eng-basic.js", "js/simplex-noise.js");

// Use the returned Promise later on to ensure that the script has been fully
// loaded before executing dependent code
setup.traceryImport.then(function () {
 var rules = {
    "origin":["[myPlace:#path#]#line#"],
    "line":["#stream.a.capitalize#"],
    "nearby":["beyond the #path#", "far away", "ahead", "behind me"],
    "substance":["light", "reflections", "mist", "shadow", "darkness", "brightness", "gaiety", "merriment"],
    "mood":["overcast", "alight", "clear", "darkened", "blue", "shadowed", "illuminated", "silver", "cool", "warm", "summer-warmed"],
    "path":["path", "rock", "cavern wall", "underfoot", "stalagmites"],
    "move":["spiral", "twirl", "curl", "dance", "twine", "weave", "meander", "wander", "flow"],
    "stream": ["#stream-type# #stream-verb.s# #nearby#"],
    "stream-type": ["#stream-size# of #stream-adjective# water"],
    "stream-size": ["ribbon", "trickle", "rivulet", "stream"],
    "stream-adjective": ["clear, cool", "muddy", "cloudy", "iron-tinged"],
    "stream-verb": ["burble", "tinkle", "meander", "gush", "cut", "twirl", "curl", "dance", "twine", "flow"]
  };

  var grammar = tracery.createGrammar(rules);
  
  /* Generate map */
  var simplex = new SimplexNoise();
	var map = new Array(HEIGHT);
  for (var row = 0; row < HEIGHT; row++) {
	  var t_row = new Array(WIDTH);
    for (var col = 0; col < WIDTH; col++) {
      t_row[col] = new Room("title " + row + "," + col, "desc", simplex.noise2D(col, row));
    }
    map[row] = t_row;
	}
	
	map = drunkardsWalk(map, [0,0], [map.length,map[0].length]);

	// Then initialize yourself fool
	map[0][0].discovered = true;
	
	// setup friends while in here
	setup.friends = new Array();
	var _friendLookup = new Array();
	for (var i = 0; i < NUM_FRIENDS; i++) {
		var name = firstNames[randomInt(0,firstNames.length)];
		if (!_friendLookup.includes(name)) {
			_friendLookup.push(name);
			setup.friends.push(new Person({name: name, description: "Fill me with tracery"}));
		} else {
			var done = false;
			while (!done) {
				var name = firstNames[randomInt(0,firstNames.length)];
				if (!_friendLookup.includes(name)) {
					_friendLookup.push(name);
					setup.friends.push(new Person(name));
					done = true;
				}
			}
		}
	}
	setup.flashlightFriend = randomInt(0, NUM_FRIENDS);
	setup.friends[setup.flashlightFriend].inventory['flashlight'] = true;

	// Then place your friends and carve out paths to them and beyond
	for (let _f = 0; _f < setup.friends.length; _f++) {
		let _c = randomInt(0, map[0].length);
		let _r = randomInt(0, map.length);
		setup.friends[_f].row = _r;
		setup.friends[_f].col = _c;

		map = drunkardsWalk(map, [_r,_c],[randomInt(0,map.length),randomInt(0,map[0].length)]);
	}
	
	
	console.log(setup.friends);
	setup.currentChar = "TBD"; // set a global to make loading in the passage easier

	setup.map = map;
	setup.WIDTH = map[0].length;
	setup.HEIGHT = map.length;
	console.log(setup.map);//window.GameMap);
	
	
	grammar.addModifiers(baseEngModifiers);
	var story = grammar.flatten("#origin#");
	document.getElementById('info').innerHTML = "<h3>Tracery Demo</h3><p style='border:1px solid red;'>" + story + "</p>";
}).catch(function (err) {
  // There was an error loading the script, log it to the console.
  console.log(err);
});
