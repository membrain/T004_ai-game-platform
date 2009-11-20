app.ensureNamespace("app.component");

app.component.WorldBotMethods = {
    addMethodsToBot: function(world, bot, view) {
        for(var fnName in this.generators) {
            bot[fnName] = 
                this.generators[fnName].apply(this, arguments);
        }
    },
    
    generators: {
        _move: function(world, bot, view) {
            return function(direction, steps) {
                if(world.hasSpriteIntersection(view) || world.hasBoundaryIntersection(view)) {
                    view.undo();
                    return false;
                }
                
                view["move" + direction](steps);
                return true;
            };
        },
        
        _sense: function(world, bot, view) {
            return function() {
                
                // get the bot's bounding box
                var viewBox = view.getBoundingBox();
                var info    = null;
                
                // iterate the sprites
                for (var i = 0; i < world.sprites.length; i++) {
                    var thatSprite  = world.sprites[i];
                    var thatView    = world.views[i];

                    // We're interested in all bots except for the bot that just moved.
                    if (thatSprite !== bot) {
                        for (var j = 0; j < bot.senses.length; j++) {
                            var sense       = bot.senses[j];
                            var computedBox = sense.computeBoundingBox(viewBox);

                            if (computedBox.intersects(thatView.getBoundingBox())) {
                                if(!info) {
                                    info = {};
                                    info[sense.klassName] = [sense.process(thatSprite)];
                                } else if(!info[sense.klassName]) {
                                    info[sense.klassName] = [sense.process(thatSprite)];
                                } else {
                                    info[sense.klassName].push(sense.process(thatSprite));
                                }
                            }
                        }
                    }
                }
                
                return info;  
            };
        }
    }
};