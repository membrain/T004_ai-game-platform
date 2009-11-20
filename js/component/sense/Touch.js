app.ensureNamespace("app.component.sense");

app.component.sense.Touch = function() {
    this.klassName = "app.component.sense.Touch";
};

app.component.sense.Touch.prototype = new app.component.sense.AbstractSense();

app.component.sense.Touch.prototype.computeBoundingBox = function(botBox) {
    var sb = Object.clone(botBox).resize(100);
    return sb;
};

app.component.sense.Touch.prototype.process = function(sprite) {
    return true;
}