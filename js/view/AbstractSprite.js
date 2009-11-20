app.ensureNamespace("app.view");


// ---------------------------------------------------------------------
// constructor
// ---------------------------------------------------------------------

/**
 * This class provides the view functionality for sprite-like components. This is
 * intended as an abstract class and should not be instantiated directly.
 *
 * IMPORTANT: We store the bounding box values in memory in order to make good
 * collision decisions at all times. We cannot rely on the dom element because
 * painting occurs on a separate thread. The resulting race conditions will
 * inevitably create logic problems here.
 */
app.view.AbstractSprite = function() {
	// state variables
	this._id    	    = null;
    this._painter       = null;
}

app.view.AbstractSprite.prototype = new app.view.AbstractView();

// ---------------------------------------------------------------------
// public 
// ---------------------------------------------------------------------

/**
 * This function moves the bot to the left by the provided pixels.
 */
app.view.AbstractSprite.prototype.moveLeft = function(steps) {
    this._moveCoordinate("left", 0 - steps);
}


/**
 * This function moves the bot to the right by the provided pixels.
 */
app.view.AbstractSprite.prototype.moveRight = function(steps) {
    this._moveCoordinate("left", steps);
}


/**
 * This function moves the bot up by the provided pixels.
 */
app.view.AbstractSprite.prototype.moveUp = function(steps) {
    this._moveCoordinate("top", 0 - steps);
}


/**
 * This function moves the bot down by the provided pixels.
 */
app.view.AbstractSprite.prototype.moveDown = function(steps) {
    this._moveCoordinate("top", steps);
}

// ---------------------------------------------------------------------
// private 
// ---------------------------------------------------------------------

/**
 * This function is a generic move function. It takes a coordinate value (top or left)
 * and the relative change to that property.
 */ 
app.view.AbstractSprite.prototype._moveCoordinate = function(coord, value) {
    // store new value in memory
    this._getBoundingBox()[coord] += value;
    
    if (!this._painter) {
        this._painter = setInterval(this._paint.bind(this), 10);
    }
}

/**
 * This function actually sets the HTML element to the right position
 * on the screen.
 */
app.view.AbstractSprite.prototype._paint = function() {
    // make corresponding change to dom
    var box = this._getBoundingBox();
    this.getElement().setTop(box.top);
    this.getElement().setLeft(box.left);
};

