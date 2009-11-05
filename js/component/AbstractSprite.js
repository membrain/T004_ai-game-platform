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
// app.component.AbstractSprite.NEXT_ID = 1;



// ---------------------------------------------------------------------
// public
// ---------------------------------------------------------------------

/**
 * This function returns the sprite's unique ID.  This ensures all sprites
 * get an ID.
 */
app.component.AbstractSprite.prototype.getId = function() {
    return this._id;
}