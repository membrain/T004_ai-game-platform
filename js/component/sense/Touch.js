app.ensureNamespace("app.component.sense");

app.component.sense.Touch = function() {};

app.component.sense.Touch.prototype = new app.component.sense.AbstractSense();

app.component.sense.Touch.prototype.computeBoundingBox = function(botBox) {
    return Object.clone(botBox).resize(104);
};

app.component.sense.Touch.prototype.process = function(sprites) {

}