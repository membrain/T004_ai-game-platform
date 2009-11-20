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
    
    // if no box map, make one
    if (!this._boundingBox) {
        
        // get element reference
        var el = this.getElement();
        
        this._boundingBox = 
            new app.data.BoundingBox(0, el.getHeight(), 0, el.getWidth());
    }
    
    // return box
    return this._boundingBox;
    
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



