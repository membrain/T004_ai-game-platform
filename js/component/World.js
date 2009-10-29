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
    this.bots       = [];
    this.goals      = [];
    this._view      = null;
}

    

// ---------------------------------------------------------------------
// public
// ---------------------------------------------------------------------

/**
 * This function adds a new bot to the world.
 */
app.component.World.prototype.addBot = function(botClass) {
    
    // create new bot and add to array
    var bot = new botClass(this);
    
    // position sprite in world
    this._positionSprite(bot);
    
    // add bot to array
    this.bots.push(bot);
};


/**
 * This function adds a new goal to the world.
 */
app.component.World.prototype.addGoal = function(goalClass) {
    
    // create new bot and add to array
    var goal = new goalClass(this);
    
    // add sprite to world
    this._positionSprite(goal);
    
    // add goal to array
    this.goals.push(goal);
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



// ---------------------------------------------------------------------
// private
// ---------------------------------------------------------------------

/**
 * This function adds a sprite view to the world.
 */
app.component.World.prototype._positionSprite = function(sprite) {

    // position new sprite view
    do {
        this._generateSpritePositionValues(sprite);
    }
    while (!this._isSpritePositionValid(sprite))
    
    // add sprite view to world view
    var se = sprite.getView().getElement();
    var we = this.getView().getElement();
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
        if (thisSprite.intersects(thatSprite)) {
            return false;
        }
    }
    
    // if we got here, return true
    return true;
};


/**
 * This function accepts a sprite and sets randomly generated
 * top and left values for its element.
 */
app.component.World.prototype._generateSpritePositionValues = function(sprite) {
    
    // get references to elements
    var se = sprite.getView().getElement();
    var we = this.getView().getElement();
    
    // randomize position of element
    se.setTop(Math.ceil(Math.random() * (we.getBottom() - 30)));
    se.setLeft(Math.ceil(Math.random() * (we.getRight() - 30)));
};