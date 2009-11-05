app.ensureNamespace("app.component.sense");

app.component.sense.Touch = function() {};

app.component.sense.Touch.prototype = new app.component.sense.AbstractSense();

app.component.sense.Touch.prototype.getBoundingBox = function() {
    // This should return the the sensing bot's bounding box.
};


app.component.sense.Touch.prototype.process = function(sprite) {
    // For the sense of touch, we just need to return a boolean value indicating
    // whether the sensing bot's bounding box has intersected with the supplied
    // sprite's bounding box.
}