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
}



// ---------------------------------------------------------------------
// public
// ---------------------------------------------------------------------

/**
 * This function returns the view of the sprite.
 */
app.component.AbstractSprite.prototype.getView = function() {
    if (!this._view) {
		var util	= app.util.Object;
		this._view 	= new (util.forName(this._viewClassName))(this);
    }
    return this._view;
}


/**
 * This function returns the bounding box of the sprite.
 */
app.component.AbstractSprite.prototype.getBoundingBox = function() {
    
	// get view element
	var element = this._view.getElement();
    
	// use element to construct map of vertices
    return {
        top:    element.getTop(),
        right:  element.getRight(),
        bottom: element.getBottom(),
        left:   element.getLeft()
    };
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
		thatBoundingBox.bottom 	< thisBoundingBox.top 		||
        thatBoundingBox.top 	> thisBoundingBox.bottom 	||
        thatBoundingBox.right 	< thisBoundingBox.left 		||
        thatBoundingBox.left 	> thisBoundingBox.right
	);
}