app.ensureNamespace("app.component");


app.component.Goal = function(world) {
    this.world      = world;
}

// Goal extends Sprite
app.component.Goal.prototype = new app.component.Sprite("app.view.Goal");