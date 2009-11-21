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
app.component.sense.AbstractSense.prototype.computeBoundingBox = function(boundingBox) {
    throw new Error("Method Not Implemented.");
};

// Sprites are all sprites that have intersected the sense's bounding box
app.component.sense.AbstractSense.prototype.process = function(sprite) {
    throw new Error("Method Not Implemented.");
};