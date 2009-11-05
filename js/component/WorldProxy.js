app.ensureNamespace("app.component");


// ---------------------------------------------------------------------
// constructor
// ---------------------------------------------------------------------

/**
 * This class provides the interface for the bot to interact with it's World.
 */
 
app.component.WorldProxy = function(world, view) {
    // set class name
    this.klassName = "app.component.WorldProxy";

    // state variables
    this._world = world;
    this._view = view;
};

/**
 * The move* methods provide the ability for the bot to move around.
 */
app.component.WorldProxy.prototype.moveUp = function(steps) {
    this._move("Up", steps); 
};

app.component.WorldProxy.prototype.moveDown = function(steps) {
    this._move("Down", steps); 
};

app.component.WorldProxy.prototype.moveLeft = function(steps) {
    this._move("Left", steps); 
};

app.component.WorldProxy.prototype.moveRight = function(steps) {
    this._move("Right", steps); 
};

/**
 * Shortcut function for "are we intersecting any bots"
 */
app.component.WorldProxy.prototype.hasBotIntersection = function() {
    return this.hasSpriteIntersection(false);
};

/**
 * Shortcut function for "are we intersecting any goals"
 */
app.component.WorldProxy.prototype.hasGoalIntersection = function() {
    return this.hasSpriteIntersection(true);
};

/**
 * Returns true if we're at the edge of the World
 */
app.component.WorldProxy.prototype.hasBoundaryIntersection = function() {
    // get working references
    var we = this._world.getView().getElement();
    var wb = {
        "top":      we.getTop(),
        "bottom":   we.getBottom(),
        "left":     we.getLeft(),
        "right":    we.getRight()
    };
    var sb = this._view.getBoundingBox();
    
    // if any boundaries crossed, return true
    if (
        sb.top      < wb.top    ||
        sb.bottom   > wb.bottom ||
        sb.left     < wb.left   ||
        sb.right    > wb.right
    ) {
        return true;
    }
    
    // defaults to no intersections
    return false;
};

/**
 * Checks for intersection with another sprite in the world. Returns true if so.
 * The expectsGoal parameter can be true, false, or null. In the case of null, any
 * sprite intersection will return true. For true, only goals will be checked. For
 * false, only bots will be checked.
 */
app.component.WorldProxy.prototype.hasSpriteIntersection = function(expectsGoal) {
    // get convenience references
    var sprite          = null;
    var thisSprite      = this._view;
    var thoseSprites    = this._world.getSpriteViews();
    
    // loop collection and look for intersects (any will do)
    for (var i = 0, n = thoseSprites.length; i < n; i++) {
        sprite = thoseSprites[i];
        if (thisSprite === sprite || (expectsGoal != null && sprite.isGoal() !== expectsGoal)) {
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
 * If the bot can actually move in the direction it's trying to move, allow this
 * to happen by calling the appropriate view method.
 */
app.component.WorldProxy.prototype._move = function(direction, steps) {
    this._view["move" + direction](steps);
    
    // this is kind of a hack, but once we've moved the view, check for an intersection and move
    // back to the last position if we actually intersect with something.
    if (this.hasBotIntersection() || this.hasGoalIntersection() || this.hasBoundaryIntersection()) {
        this._view.undo();
    }
};