app.ensureNamespace("app.component");


// ---------------------------------------------------------------------
// constructor
// ---------------------------------------------------------------------

/**
 * This class establishes the world in which our agents interact.
 */
app.component.World = function() {
    
	// set class name
	this.klassName = "app.component.World";
	
	// state variables
	this.bots 		= [];
    this.goals 		= [];
    this._view 		= null;
}

    

// ---------------------------------------------------------------------
// private
// ---------------------------------------------------------------------

/**
 * This function adds a sprite to the world.
 */
app.component.World.prototype._addSprite = function(sprite) {

	// create working variables
	var se  = sprite.getView().getElement();
	var we  = this.getView().getElement();
	
	// position new sprite view
	se = this._setElementPosition(se);
	while (!this._isSpritePositionValid(sprite)) {
		se = this._setElementPosition(se);
	}
    
	// add sprite view to world view
	we.insert({ top: se });
};


/**
 * This function accepts a sprite and determines whether or not its
 * position intersects with any sprite already in the world.
 */
app.component.World.prototype._isSpritePositionValid = function(thisSprite) {
	
	// get all sprites
	var sprites = this.getSprites();
	
	// loop sprites and check for intersections
	var thatSprite = null;
	for (var i = 0, n = sprites.length; i < n; i++) {
		thatSprite = sprites[i];
		if (thisSprite !== thatSprite) {
			if (thisSprite.intersects(thatSprite)) {
				return false;
			}
		}
	}
	
	// if we got here, return true
	return true;
};


/**
 * This function accepts an element and sets randomly generated
 * top and left values.
 */
app.component.World.prototype._setElementPosition = function(el) {
	
	// get reference to world element
	var we = this.getView().getElement();
	
	// randomize position of element
	el.setTop(Math.ceil(Math.random() * we.getBottom()));
    el.setLeft(Math.ceil(Math.random() * we.getRight()));

	// return the element
	return el;
};



// ---------------------------------------------------------------------
// public
// ---------------------------------------------------------------------

/**
 * This function adds a new bot to the world.
 */
app.component.World.prototype.addBot = function(botClass) {
    
	// create new bot and add to array
	var bot = new botClass(this);
	this.bots.push(bot);

	// add sprite to world
	this._addSprite(bot);
};


/**
 * This function adds a new goal to the world.
 */
app.component.World.prototype.addGoal = function(goalClass) {
	
	// create new bot and add to array
	var goal = new goalClass(this);
	this.goals.push(goal);

	// add sprite to world
	this._addSprite(goal);
};


/**
 * This function returns an array of all sprite objects.
 */
app.component.World.prototype.getSprites = function() {
	return this.bots.concat(this.goals);
};


/**
 * This function returns the view instance for this component.
 */
app.component.World.prototype.getView = function() {
	if (!this._view) {
		this._view = new app.view.World(this);
	}
	return this._view;
};