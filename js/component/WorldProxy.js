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
    this._view.moveUp(steps);  
};

app.component.WorldProxy.prototype.moveDown = function(steps) {
    this._view.moveDown(steps);  
};

app.component.WorldProxy.prototype.moveLeft = function(steps) {
    this._view.moveLeft(steps);  
};

app.component.WorldProxy.prototype.moveRight = function(steps) {
    this._view.moveRight(steps);  
};

app.component.WorldProxy.prototype.hasBotIntersection = function() {
    return this.hasSpriteIntersection(false);
};

app.component.WorldProxy.prototype.hasGoalIntersection = function() {
    return this.hasSpriteIntersection(true);
};

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
}

app.component.WorldProxy.prototype.hasSpriteIntersection = function(expectsGoal) {
    // get convenience references
    var sprite          = null;
    var thisSprite      = this._view;
    var thoseSprites    = this._world.getSpriteViews();
    
    // loop collection and look for intersects (any will do)
    for (var i = 0, n = thoseSprites.length; i < n; i++) {
        sprite = thoseSprites[i];
        if (thisSprite === sprite || sprite.isGoal() !== expectsGoal) {
            continue;
        }
        else if (thisSprite.intersects(sprite)) {
            return true;
        }
    }

    // defaults to no intersections 
    return false;
}

