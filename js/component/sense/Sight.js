app.ensureNamespace("app.component.sense");

app.component.sense.Sight = function() {
    this.klassName = "app.component.sense.Sight";
}

app.component.sense.Sight.prototype = new app.component.sense.AbstractSense();

app.component.sense.Sight.prototype.computeBoundingBox = function(boundingBox, direction) {
    
    // Return a bounding box that is 200% the size of the bot and is shifted
    // 17 pixels forward with respect to the bot's trajectory.
    var sb = Object.clone(boundingBox).resize(200)["shift" + direction](17);
    return sb;
};

app.component.sense.Sight.prototype.process = function(sprite, spriteBoundingBox, spriteDirection) {
    return { klassName: sprite.klassName }
}