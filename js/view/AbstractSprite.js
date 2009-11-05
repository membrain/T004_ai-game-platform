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
	this._element       = null;
    this._styleClass    = null;
    this._boundingBox   = null;
    this._painter       = null;
}

// ---------------------------------------------------------------------
// public 
// ---------------------------------------------------------------------

/**
 * This function returns the dom element for the view. In an effort to
 * be memory efficient, the element is instantiated lazily.
 */
app.view.AbstractSprite.prototype.getElement = function() {
    if (!this._element) {
		this._element = new Element("div", { "className": this._styleClass });
		this._element.appendChild(document.createTextNode(this._id));
    }
    return this._element;
}

app.view.AbstractSprite.prototype.isGoal = function() {
    return false;
}


/**
 * This function returns the public bounding box object.
 */
app.view.AbstractSprite.prototype.getBoundingBox = function() {
    
    // get internal box map
    var box = this._getBoundingBox();
    
    // return modified version to comply with expected result elsewhere
    // in the application.
    return new app.data.BoundingBox(
            box.top, 
            box.top + box.height, 
            box.left, 
            box.left + box.width);
}


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
 * This function returns a private bounding box object that is
 * structured slightly differently from the public object. This box 
 * stores width and height rather than right and bottom.
 */
app.view.AbstractSprite.prototype._getBoundingBox = function() {

    // if no box map, make one
    if (!this._boundingBox) {
        
        // get element reference
        var el = this.getElement();
        
        // set new bounding box values
        this._boundingBox = {
            top:    0,
            height: el.getHeight(),
            left:   0,
            width:  el.getWidth()
        };
    }
    
    // return box
    return this._boundingBox;
}


/**
 * This function is a generic move function. It takes a coordinate value (top or left)
 * and the relative change to that property.
 */ 
app.view.AbstractSprite.prototype._moveCoordinate = function(coord, value) {
    // store new value in memory
    this._getBoundingBox()[coord] += value;
    
    if (!this._painter) {
        this._painter = setInterval(this._paint.bind(this), 100);
    }
}

/**
 * This function determines whether the sprite's bounding box intersects 
 * that of the provided sprite.
 */
app.view.AbstractSprite.prototype.intersects = function(sprite) {
    
    // get working references
    thisBoundingBox = this.getBoundingBox();
    thatBoundingBox = sprite.getBoundingBox();
    
    // evaluate intersection
    return thisBoundingBox.intersects(thatBoundingBox);
}

app.view.AbstractSprite.prototype._paint = function() {
    // make corresponding change to dom
    var box = this._getBoundingBox();
    this.getElement().setTop(box.top);
    this.getElement().setLeft(box.left);
};
