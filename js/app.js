// ---------------------------------------------------------------------
// core extensions
// ---------------------------------------------------------------------

/**
 * These commands extend the core functionality of the String object.
 */
Object.extend(String.prototype, {
    toGetter: function() {
        return "get" + this.capitalize();
    },
    
    toSetter: function() {
        return "set" + this.capitalize();
    }
});


/**
 * These commands extend the core functionality of the Element object.
 */
Object.extend(Element.Methods, {
    getLeft: function(element) {
        return parseInt(element.style.left) || 0;
    },
    
    setLeft: function(element, left) {
        element.style.left = left + "px";
    },
    
    getRight: function(element) {
        return element.getLeft() + element.getWidth();
    },
    
    setRight: function(element, right) {
        element.style.left = (right - element.getWidth()) + "px";
    },

    getTop: function(element) {
        return parseInt(element.style.top) || 0;
    },
    
    setTop: function(element, top) {
        element.style.top = top + "px";
    },

    getBottom: function(element) {
        return element.getTop() + element.getHeight();
    },
    
    setBottom: function(element, bottom) {
        element.style.top = (bottom - element.getHeight()) + "px";
    }
});
Element.addMethods();



// ---------------------------------------------------------------------
// define the application
// ---------------------------------------------------------------------

/**
 * This object serves as the root namespace for all of our classes.
 */
var app = {};


/**
 * This property stores a reference to the play/pause state of the game.
 */
app._isPaused = false;


/**
 * This property stores a reference to the world object.
 */
app._world = null;


/**
 * This function accepts a dot-delimited string and then iterates the
 * nodes of that string, ensuring that the nodes exist as objects under
 * the window object.  If any node does not exist, this function creates 
 * an object literal with the node name.
 */
app.ensureNamespace = function(ns) {

    // get working references
    var obj     = window;
    var nodes   = ns.split(".");
    var node    = null;
    
    // loop the nodes and construct objects as needed
    for (var i = 0, n = nodes.length; i < n; i++) {
        node = nodes[i];
        if (!obj[node]) {
            obj[node] = {};
        }
        obj = obj[node]
    }
};


/**
 * This function loads the game environment and starts the game.
 */
app.load = function() {
    
    // create world
    app._world      = new app.component.World();

    // get convenience references
    var botClass    = app.component.Bot;
    var goalClass   = app.component.Goal;
    
    // create goals
    for (var i = 0; i < 3; i++) {
        app._world.addGoal(goalClass);
    }
    
    // create bots
    for (var i = 0; i < 10; i++) {
        app._world.addBot(botClass);
    }
    
    // trap keydown events
    Event.observe(window, "keydown", function(evt) {
        app._onKeyDown(evt);
    });
    
    // wake all the bots
    app.start();
};


/**
 * This function wakes all the bots.
 */
app.start = function() {
    
    // loop bots and wake them up
    var bots = app._world.getSprites();
    var bot  = null;
    for (var i = 0, n = bots.length; i < n; i++) {
        bot = bots[i];
        if (bot.wake) {
            bots[i].wake();
        }
    }
    
    // set state
    app._isPaused = false;
}


/**
 * This function puts all the bots to sleep.
 */
app.stop = function() {
    
    // loop bots and put them all to sleep
    var bots = app._world.bots;
    var bot  = null;
    for (var i = 0, n = bots.length; i < n; i++) {
        bot = bots[i];
        if (bot.sleep) {
            bots[i].sleep();
        }
    }
    
    // set state
    app._isPaused = true;
}


/**
 * This function evaluates key codes and delegates to the appropriate
 * handler.
 */
app._onKeyDown = function(evt) {
    
    // convenience reference
    var kc = evt.keyCode;
    
    // if spacebar, toggle lay/pause state of game
    if (kc == 32) {
        app._togglePlayPause(evt);
    }
}


/**
 * This function starts and stops the game.
 */
app._togglePlayPause = function(evt) {
    
    // start if paused; stop if playing
    if (app._isPaused) {
        app.start();
    }
    else {
        app.stop();
    }
}