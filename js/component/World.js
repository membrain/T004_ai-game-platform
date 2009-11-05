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
    this.bots       = [];
    this.goals      = [];
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
    var bot = new botClass(this, id);
    var botView = new app.view.Bot(id);
    
    // position sprite in world
    this._positionSprite(botView);
    
    // add bot to array
    this.bots.push(bot);
    this.views.push(botView);
    
    this.idx++;
};


/**
 * This function adds a new goal to the world.
 */
app.component.World.prototype.addGoal = function() {
    // create new bot and add to array
    var id = this.idx;
    var goalView = new app.view.Goal(id);
    
    // add sprite to world
    this._positionSprite(goalView);
    
    // add goal to array
    this.views.push(goalView);
    
    this.idx++;
};


/**
 * This function returns an array of all sprite objects.
 */
app.component.World.prototype.getSprites = function() {
    return this.bots.concat(this.goals);
};

app.component.World.prototype.getSpriteViews = function() {
    return this.views;
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
app.component.World.prototype._isSpritePositionValid = function(thisSprite) {
    
    // get all sprites
    var sprites = this.getSpriteViews();
    
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
app.component.World.prototype._generateSpritePositionValues = function(sv) {
    // get convenience references
    var sb = sv.getBoundingBox();
    var we = this.getView().getElement();
    
    // determine new top and left
    var top  = Math.ceil(Math.random() * (we.getBottom() - 30));
    var left = Math.ceil(Math.random() * (we.getRight() - 30));
    
    // move sprite to new position (consider current position in the event we 
    // are repositioning the element due to initial intersection)
    sv.moveDown(top - sb["top"]);
    sv.moveRight(left - sb["left"]);
};


app.component.World.prototype.hasBotIntersection = function(id) {
    return this._hasSpriteIntersection(id, false);
};

app.component.World.prototype.hasGoalIntersection = function(id) {
    return this._hasSpriteIntersection(id, true);
};

app.component.World.prototype.hasBoundaryIntersection = function(id) {
    // get working references
    var we = this.getView().getElement();
    var wb = {
        "top":      we.getTop(),
        "bottom":   we.getBottom(),
        "left":     we.getLeft(),
        "right":    we.getRight()
    };
    var sb = this.views[id].getBoundingBox();
    
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

app.component.World.prototype._hasSpriteIntersection = function(id, expectsGoal) {
    // get convenience references
    var sprite      = null;
    var thisSprite  = this.views[id];
    
    // loop collection and look for intersects (any will do)
    for (var i = 0, n = this.views.length; i < n; i++) {
        sprite = this.views[i];         
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

app.component.World.prototype.moveUp = function(id, steps) {
  this.views[id].moveUp(steps);  
};

app.component.World.prototype.moveDown = function(id, steps) {
  this.views[id].moveDown(steps);  
};

app.component.World.prototype.moveLeft = function(id, steps) {
  this.views[id].moveLeft(steps);  
};

app.component.World.prototype.moveRight = function(id, steps) {
  this.views[id].moveRight(steps);  
};
