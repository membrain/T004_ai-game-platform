app.ensureNamespace("app.view");

app.view.AbstractView = function() {
    this._element       = null;
    this._styleClass    = null;
    this._boundingBox   = null;
}


/**
 * This function returns the dom element for the view. In an effort to
 * be memory efficient, the element is instantiated lazily.
 */
app.view.AbstractView.prototype.getElement = function() {
    if (!this._element) {
		this._element = new Element("div", { "className": this._styleClass });
		this._element.appendChild(document.createTextNode(this._id));
    }
    return this._element;
}

/**
 * This function returns the public bounding box object.
 */
app.view.AbstractView.prototype.getBoundingBox = function() {
    
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
 * This function determines whether the sprite's bounding box intersects 
 * that of the provided sprite.
 */
app.view.AbstractView.prototype.intersects = function(sprite) {
    
    // get working references
    thisBoundingBox = this.getBoundingBox();
    thatBoundingBox = sprite.getBoundingBox();
    
    // evaluate intersection
    return thisBoundingBox.intersects(thatBoundingBox);
}

/**
 * This function returns a private bounding box object that is
 * structured slightly differently from the public object. This box 
 * stores width and height rather than right and bottom.
 */
app.view.AbstractView.prototype._getBoundingBox = function() {

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


