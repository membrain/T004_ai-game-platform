/*
    Core Extensions  ----------------------------------------------------------
*/

Object.extend(String.prototype, {
    toGetter: function() {
        return "get" + this.capitalize();
    },
    
    toSetter: function() {
        return "set" + this.capitalize();
    }
});

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

/*
    World  --------------------------------------------------------------------
*/
var W = {
    bots:       [],
    goals:      [],
    element:    null,
    
    addBot: function(botClass) {
        var bot = new botClass(this);
        this.bots.push(bot);
        this.getElement().insert({ top: bot.getView().getElement() });
    },
    
    addGoal: function(goalClass) {
        var goal = new goalClass(this);
        this.goals.push(goal);
        this.getElement().insert({ top: goal.getView().getElement() });
    },
    
    getElement: function() {
        if(!this.element) {
            this.element = $(document.body);
            this.element.absolutize();
            this.element.setStyle({
                top:    "0px",
                left:   "0px",
                width:  document.viewport.getWidth() + "px",
                height: document.viewport.getHeight() + "px"
            });
        }
        return this.element;
    }
}

/*
    Automaton  ----------------------------------------------------------------
*/
var A = function(world) {
    this.view       = null;
    this.world      = world;
    this.motor      = setInterval(this._takeTurn.bind(this), 25);
    this.direction  = A.DIRECTIONS.WEST;
}

A.STEP          = 2;
A.DIRECTIONS    = {
    NORTH:  ["top",       -1],
    SOUTH:  ["bottom",     1],
    WEST:   ["left",      -1],
    EAST:   ["right",      1]
}

A.prototype._takeTurn = function() {
    if(this._canStep()) {
        this._step();
        
        // ---------------------------------------------------
        // This random turning is here to prevent the bot
        // from following the perimeter of the world.
        // ---------------------------------------------------
        var i = Math.round(Math.random() * 100) % 60;
        if(i === 0) {
            this._turn();
        }
        // ---------------------------------------------------
        // End Silly Hack
        // ---------------------------------------------------
        
    } else {
        this._turn();
    }
}

A.prototype._canStep = function() {
    var ea              = this.getView().getElement();
    var ew              = this.world.getElement();
    var nextPosition    = this._nextPosition(ea);
    var boundary        = ew[ this.direction.first().toGetter() ]();
    
    if(this.direction.last() === -1) {
        return nextPosition > boundary;
    } else {
        return nextPosition < boundary;
    }
}

A.prototype._step = function() {
    var ea              = this.getView().getElement();
    ea[ this.direction.first().toSetter() ](this._nextPosition(ea));
}

/**
 * This function is responsible for making the bot turn.  For now, its direction
 * is random.
 */
A.prototype._turn = function() {
    var dki = Math.round(Math.random() * 3);
    var dk  = Object.keys(A.DIRECTIONS)[dki];
    this.direction = A.DIRECTIONS[dk];
}

A.prototype._nextPosition = function(e) {
    return this.direction.last() * A.STEP + e[ this.direction.first().toGetter() ]()
}

// get the Automaton's view instance.
A.prototype.getView = function() {
    if(!this.view) {
        this.view = new A.View("bot");
    }
    return this.view
}

/*
    Automaton View  -----------------------------------------------------------
*/
A.View = function(styleClass) {
    this.element    = null;
    this.styleClass = styleClass;
}

// get the view's DOM element.
A.View.prototype.getElement = function() {
    if(!this.element) {
        this.element = new Element("div", { "className": this.styleClass });
    }
    return this.element;
}

/*
    Goal  ---------------------------------------------------------------------
*/
var G = function(world) {
    this.world = world;
}

// get the goal view
G.prototype.getView = function() {
    return new G.View("goal");
}

/*
    Goal View  ----------------------------------------------------------------
*/
G.View = function(styleClass) {
    this.element    = null;
    this.styleClass = styleClass;
}

// get the view's DOM element.
G.View.prototype.getElement = function() {
    if(!this.element) {
        this.element = new Element("div", {"className": this.styleClass });
    }
    return this.element;
}