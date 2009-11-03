app.ensureNamespace("app.component");


// ---------------------------------------------------------------------
// constructor
// ---------------------------------------------------------------------

/**
 * This class provides base logic for all sprite-like components. This is
 * intended as an abstract class and should not be instantiated directly.
 */
app.component.AbstractSprite = function() {
    
	// state variables
	this._view			= null;
	this._viewClassName	= null;
    this._world			= null;
    this._id            = null;
}



// ---------------------------------------------------------------------
// class
// ---------------------------------------------------------------------

/**
 * This property is an incrementor that allows each instance of abstract sprite
 * have a unique identifier.
 */
app.component.AbstractSprite.NEXT_ID = 1;



// ---------------------------------------------------------------------
// public
// ---------------------------------------------------------------------

/**
 * This function returns the sprite's unique ID.  This ensures all sprites
 * get an ID.
 */
app.component.AbstractSprite.prototype.getId = function() {
    if (!this._id) {
        this._id = app.component.AbstractSprite.NEXT_ID++;
    }
    return this._id;
}


/**
 * This function returns the view of the sprite.
 */
app.component.AbstractSprite.prototype.getView = function() {
    if (!this._view) {
        var util    = app.util.Object;
        this._view  = new (util.forName(this._viewClassName))(this);
    }
    return this._view;
}


/**
 * This function is a proxy for a method of the same name on the 
 * view class.
 */
app.component.AbstractSprite.prototype.getBoundingBox = function() {
    return this._view.getBoundingBox();
}


/**
 * This function determines whether the sprite's bounding box intersects 
 * that of the provided sprite.
 */
app.component.AbstractSprite.prototype.intersects = function(sprite) {
    
    // get working references
    thisBoundingBox = this.getBoundingBox();
    thatBoundingBox = sprite.getBoundingBox();
    
    // evaluate intersection
    return !(
        thatBoundingBox.bottom  < thisBoundingBox.top       ||
        thatBoundingBox.top     > thisBoundingBox.bottom    ||
        thatBoundingBox.right   < thisBoundingBox.left      ||
        thatBoundingBox.left    > thisBoundingBox.right
    );
}