app.ensureNamespace("app.component.sense");

app.component.sense.AbstractSense = function() {
    this._id = null;
};

app.component.sense.AbstractSense.ID_SEED = 0;

app.component.sense.AbstractSense.prototype.getId = function() {
    return this._id || (this._id = app.component.sense.AbstractSense.ID_SEED++);
};

// Returns the bounding-box of the sense.  This will be a resized version of the
// sensing bot's bounding-box.
app.component.sense.AbstractSense.prototype.computeBoundingBox = function(boundingBox, direction) {
    throw new Error("Method Not Implemented.");
};

// The bounding box is the sensed bot's bounding box, and the direction is its
// direction.
app.component.sense.AbstractSense.prototype.process = function(sprite, spriteBoundingBox, spriteDirection) {
    throw new Error("Method Not Implemented.");
};