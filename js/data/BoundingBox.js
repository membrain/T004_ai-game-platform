app.ensureNamespace("app.data");

// You guessed it.  It's a bounding box!
app.data.BoundingBox = function(top, bottom, left, right) {
    this.top    = top       || 0;
    this.bottom = bottom    || 0;
    this.left   = left      || 0;
    this.right  = right     || 0;
}

// Determines whether this bounding box intersects the provided bounding box.
app.data.BoundingBox.prototype.intersects = function(boundingBox) {
    return !(boundingBox.bottom  < this.top       ||
             boundingBox.top     > this.bottom    ||
             boundingBox.right   < this.left      ||
             boundingBox.left    > this.right);
}

// Determines whether a bounding box that exists within another bounding box has
// gone beyond the bounds of its containing bounding box.
app.data.BoundingBox.prototype.outOfBounds = function(boundingBox) {
    return  boundingBox.top      < this.top    ||
            boundingBox.bottom   > this.bottom ||
            boundingBox.left     < this.left   ||
            boundingBox.right    > this.right;
}

// Resizes the bounding box by the supplied percentage, e.g. 100 causes no change, while 200
// doubles the size of the box.  As an added bonus, the center of the box is treated
// as the anchor during resizing, so the box resizes in all directions.
app.data.BoundingBox.prototype.resize = function(percent) {
    var factor          = (percent || 100) * .01;
    var currentWidth    = this.right - this.left;
    var currentHeight   = this.bottom - this.top
    var newWidth        = currentWidth * factor;
    var newHeight       = currentHeight * factor;
    var diffX           = (newWidth - currentWidth) / 2;
    var diffY           = (newHeight - currentHeight) / 2;
    this.left           -= diffX;
    this.right          += diffX;
    this.top            -= diffY;
    this.bottom         += diffY;
    return this;
}

app.data.BoundingBox.prototype.shiftLeft = function(pixels) {
    this._hShift(-pixels);
    return this;
}

app.data.BoundingBox.prototype.shiftRight = function(pixels) {
    this._hShift(pixels);
    return this;
}

app.data.BoundingBox.prototype.shiftUp = function(pixels) {
    this._vShift(-pixels);
    return this;
}

app.data.BoundingBox.prototype.shiftDown = function(pixels) {
    this._vShift(pixels);
    return this;
}

app.data.BoundingBox.prototype._hShift = function(pixels) {
    this.left   += pixels;
    this.right  += pixels;
}

app.data.BoundingBox.prototype._vShift = function(pixels) {
    this.top    += pixels;
    this.bottom += pixels;
}