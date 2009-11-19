app.ensureNamespace("app.component.sense");

app.component.sense.AbstractSense = function() {};

// Returns the bounding-box of the sense.  This will be a resized version of the
// sensing bot's bounding-box.
app.component.sense.AbstractSense.prototype.computeBoundingBox = function(boundingBox) {
    throw new Error("Method Not Implemented.");
};

// Sprites are all sprites that have intersected the sense's bounding box
app.component.sense.AbstractSense.prototype.process = function(sprite) {
    throw new Error("Method Not Implemented.");
}

// Is called by the world to activate the sense.
// Sprites are all sprites that have intersected the sense's bounding box
app.component.sense.AbstractSense.prototype.activate = function(sprite) {
    this.onActivate({ sense: this, info: this.process(sprite) });
};

// The bot should overwrite this function with its own handler
app.component.sense.AbstractSense.prototype.onActivate = function(sense, info) {}