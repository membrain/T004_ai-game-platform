app.ensureNamespace("app.component");

app.component.AbstractSense = function() {};

// Returns the sensed sprite; otherwise, returns null.
app.component.AbstractSense.prototype.interrogate = function(sensor) {
    throw new Error("Method Not Implemented.");
};