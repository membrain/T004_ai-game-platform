app.ensureNamespace("app.component");

app.component.AbstractPredicate = function() {}

app.component.AbstractPredicate.prototype.test = function(decider, sensedSprites) {
    throw new Error("Method Not Implemented");
}