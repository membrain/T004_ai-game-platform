app.ensureNamespace("app.component.sense");

app.component.sense.AbstractSense = function() {};

// Returns the bounding-box of the sense.  This will be a resized version of the
// sensing bot's bounding-box.
app.component.sense.AbstractSense.prototype.getBoundingBox = function() {
    throw new Error("Method Not Implemented.");
};

// This method should convert the supplied sprite to some info for the bot.
app.component.sense.AbstractSense.prototype.process = function(sprite) {
    throw new Error("Method Not Implemented.");
}

// Is called by the workd to activate the sense.
app.component.sense.AbstractSense.prototype.activate = function(sprite) {
    this.onActivate(this.process(sprite));
};

// The bot should overwrite this function with its own handler
app.component.sense.AbstractSense.prototype.onActivate = function(info) {}