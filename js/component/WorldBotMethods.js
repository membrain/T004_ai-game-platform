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
                view["move" + direction](steps);
                world.botMoved(bot, view);
            };
        }
    }
};