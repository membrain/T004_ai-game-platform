app.ensureNamespace("app.component");


// Constructs a new sprite
app.component.Sprite = function(viewClassName) {
    this.viewClassName  = viewClassName;
    this.view           = null;
}

// Returns the view of the sprite
app.component.Sprite.prototype.getView = function() {
    if(!this.view) {
		var util  = app.util.Object;
		this.view = new (util.forName(this.viewClassName))();
    }
    return this.view;
}

// Returns the bounding box of the sprite
app.component.Sprite.prototype.getBoundingBox = function() {
    var element = this.view.getElement();
    
    return {
        top:    element.getTop(),
        right:  element.getRight(),
        bottom: element.getBottom(),
        left:   element.getLeft()
    }
}

// Determines whether the sprite's bounding box intersects that of the provided
// sprite.
app.component.Sprite.prototype.intersects = function(sprite) {
    thisBoundingBox = this.getBoundingBox();
    thatBoundingBox = sprite.getBoundingBox();
    
    return !(thatBoundingBox.bottom < thisBoundingBox.top ||
             thatBoundingBox.top > thisBoundingBox.bottom ||
             thatBoundingBox.right < thisBoundingBox.left ||
             thatBoundingBox.left > thisBoundingBox.right);
}