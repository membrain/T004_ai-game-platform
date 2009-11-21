app.ensureNamespace("app.component");

app.component.WorldBotMethods = {
    
    addMethodsToBot: function(world, bot, view) {
        for(var fnName in this.generators) {
            bot[fnName] = 
                this.generators[fnName].apply(this, arguments);
        }
    },
    
    // These are our generator functions.  They generate mixin methods for the bot, with references
    // to the view and the world frozen into their local scope.
    generators: {
        
        // Generates the bot's move method.
        _move: function(world, bot, view) {
            return function(direction, steps) {
                
                // This let's us take into account the trajectory of the bot.
                var nextBox = Object.clone(view.getBoundingBox())["shift" + direction](steps);
                
                if( (world.hasSpriteIntersection(view) || world.hasBoundaryIntersection(view)) && 
                    (world.isOutOfBounds(nextBox))) {  // We need a second condition to test against other bots.
                    return false;
                }
                
                view["move" + direction](steps);
                return true;
            };
        },
        
        // Generates the bot's sense method.
        _sense: function(world, bot, view) {
            return function() {
                
                // get the bot's bounding box
                var viewBox = view.getBoundingBox();
                var allInfo = null;
                var info    = null
                
                // iterate the sprites
                for (var i=0, n=world.sprites.length; i<n ; i++) {
                    var thatSprite  = world.sprites[i];
                    var thatView    = world.views[i];

                    // We're interested in all bots except for the bot that just moved.
                    if (thatSprite !== bot) {
                        var senses = Object.values(bot.senses);
                        
                        for (var j=0, o=senses.length; j<o; j++) {
                            var sense       = senses[j];
                            var senseId     = sense.getId();
                            var computedBox = sense.computeBoundingBox(viewBox);

                            if (computedBox.intersects(thatView.getBoundingBox())) {
                                
                                info = sense.process(thatSprite);
                                
                                if(!allInfo) {
                                    allInfo = {};
                                    allInfo[senseId] = [info];
                                } else if(!allInfo[senseId]) {
                                    allInfo[senseId] = [info];
                                } else {
                                    allInfo[senseId].push(info);
                                }
                            }
                        }
                    }
                }
                
                return allInfo;  
            };
        }
    }
};