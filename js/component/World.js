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
    this.idx        = 0;
    this.sprites    = [];
    this.views      = [];
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
    var id = this.idx;
     
    var view    = new app.view.Bot(id);
    var bot     = new botClass();
    
    app.component.WorldBotMethods.addMethodsToBot(this, bot, view);
    
    // position sprite in world
    this._positionSprite(view);
    
    // add bot to array
    this.sprites.push(bot);
    this.views.push(view);
    
    this.idx++;
};


/**
 * This function adds a new goal to the world.
 */
app.component.World.prototype.addGoal = function() {
    // create new bot and add to array
    var id = this.idx;
    
    var view = new app.view.Goal(id);
    var goal = new app.component.Goal();
    
    // add sprite to world
    this._positionSprite(view);
    
    // add goal to array
    this.sprites.push(goal);
    this.views.push(view);
    
    this.idx++;
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

/**
 * Returns true if we're at the edge of the World
 */
app.component.World.prototype.hasBoundaryIntersection = function(view) {
    return this.isOutOfBounds(view.getBoundingBox());
};

app.component.World.prototype.isOutOfBounds = function(box) {
    return this._view.getBoundingBox().outOfBounds(box);
};

/**
 * Checks for intersection with another sprite in the world. Returns true if so.
 * The expectsGoal parameter can be true, false, or null. In the case of null, any
 * sprite intersection will return true. For true, only goals will be checked. For
 * false, only bots will be checked.
 */
app.component.World.prototype.hasSpriteIntersection = function(view) {
    // get convenience references
    var sprite          = null;
    var thisSprite      = view;
    var thoseSprites    = this.views;
    
    // loop collection and look for intersects (any will do)
    for (var i = 0, n = thoseSprites.length; i < n; i++) {
        sprite = thoseSprites[i];
        if (thisSprite === sprite) {
            continue;
        }
        else if (thisSprite.intersects(sprite)) {
            return true;
        }
    }

    // defaults to no intersections 
    return false;
};

// ---------------------------------------------------------------------
// private
// ---------------------------------------------------------------------

/**
 * This function position a sprite view on the world view.
 */
app.component.World.prototype._positionSprite = function(view) {

    // add sprite view to world view
    var se = view.getElement();
    var we = this.getView().getElement();
    we.insert({ top: se });
    
    // position new sprite view
    do {
        this._generateSpritePositionValues(view);
    }
    while (!this._isSpritePositionValid(view))
};


/**
 * This function accepts a sprite and determines whether or not its
 * position intersects with any sprite already in the world.
 */
app.component.World.prototype._isSpritePositionValid = function(thisSpriteView) {
    
    // get all sprite views
    var spriteViews = this.views;
    
    // loop sprites and check for intersections
    var thatSpriteView = null;
    for (var i = 0, n = spriteViews.length; i < n; i++) {
        thatSpriteView = spriteViews[i];
        if (thisSpriteView.intersects(thatSpriteView)) {
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
app.component.World.prototype._generateSpritePositionValues = function(sv) {
    // get convenience references
    var sb = sv.getBoundingBox();
    var we = this.getView().getElement();
    
    // determine new top and left
    var top  = Math.ceil(Math.random() * (we.getBottom() - 30));
    var left = Math.ceil(Math.random() * (we.getRight() - 30));
    
    // move sprite to new position (consider current position in the event we 
    // are repositioning the element due to initial intersection)
    sv.moveDown(top - sb.top);
    sv.moveRight(left - sb.left);
};

