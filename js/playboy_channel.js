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
    Sprite  -------------------------------------------------------------------
*/

// Constructs a new sprite
var Sprite = function() {
    this.viewClass  = null;
    this.view       = null;
}

// Returns the view of the sprite
Sprite.prototype.getView = function() {
    if(!this.view) {
        this.view = new this.viewClass();
    }
    return this.view;
}

// Returns the bounding box of the sprite
Sprite.prototype.getBoundingBox = function() {
    var element = this.view.getElement();
    
    return {
        top:    element.getTop(),
        right:  element.getRight(),
        bottom: element.getBottom(),
        left:   element.getLeft()
    }
}

// Determines whether the sprite's bounding box intersects that of the provided
// sprite.
Sprite.prototype.intersects = function(sprite) {
    thisBoundingBox = this.getBoundingBox();
    thatBoundingBox = sprite.getBoundingBox();
    
    return !(thatBoundingBox.bottom < thisBoundingBox.top ||
             thatBoundingBox.top > thisBoundingBox.bottom ||
             thatBoundingBox.right < thisBoundingBox.left ||
             thatBoundingBox.left > thisBoundingBox.right);
}

/*
    World  --------------------------------------------------------------------
*/
var World = {
    bots:       [],
    goals:      [],
    element:    null,
    
    addBot: function(botClass) {
        var bot = new botClass(this);
        var be  = bot.getView().getElement();
        var we  = this.getElement();
        be.setTop(Math.ceil(Math.random() * we.getBottom()));
        be.setLeft(Math.ceil(Math.random() * we.getRight()));
        
        this.bots.push(bot);
        we.insert({ top: be });
    },
    
    addGoal: function(goalClass) {
        var goal    = new goalClass(this);
        var ge      = goal.getView().getElement();
        var we      = this.getElement();
        
        ge.setTop(200);
        ge.setLeft(200);
        
        this.goals.push(goal);
        we.insert({ top: ge });
    },
    
    getElement: function() {
        if(!this.element) {
            this.element = $(document.body);
            this.element.absolutize();
            this.element.setStyle({
                top:    "0px",
                left:   "0px",
                width:  document.viewport.getWidth() - 10 + "px",
                height: document.viewport.getHeight() - 10 + "px"
            });
        }
        return this.element;
    }
}

/*
    Automaton  ----------------------------------------------------------------
*/
var Bot = function(world) {
    this.viewClass  = Bot.View;
    this.world      = world;
    this.motor      = setInterval(this._takeTurn.bind(this), 25);
    this.direction  = Bot.DIRECTIONS.WEST;
}

// Bot extends Sprite
Bot.prototype = new Sprite();

Bot.STEP          = 2;
Bot.DIRECTIONS    = {
    NORTH:  ["top",       -1],
    SOUTH:  ["bottom",     1],
    WEST:   ["left",      -1],
    EAST:   ["right",      1]
}

// This function represents a single motor revolution.
Bot.prototype._takeTurn = function() {
    if (this._metGoal()) {
	    clearInterval(this.motor);
	    return;
	}
	
    if(this._canStep()) {
        this._step();
        
        // ---------------------------------------------------
        // This random turning is here to prevent the bot
        // from following the perimeter of the world.
        // ---------------------------------------------------
        var i = Math.round(Math.random() * 100) % 60;
        if(i === 0) {
            this._turn();
        } else if (i < 20) {
			var ea              = this.getView().getElement();
			var nextPosition    = this._nextPosition(ea);
		 	if (this._hasProximalBot()) {
				//alert("number " + this.id + " turning 'cos of a bot!")
				this._turn();
			}
		}
		
        // ---------------------------------------------------
        // End Silly Hack
        // ---------------------------------------------------
        
    } else {
        this._turn();
    }
}

// Determines whether the bot can take a step
Bot.prototype._canStep = function() {
    var ea              = this.getView().getElement();
    var ew              = this.world.getElement();
    var nextPosition    = this._nextPosition(ea);
    var boundary        = ew[ this.direction.first().toGetter() ]();
    
    if(this.direction.last() === -1) {
        return nextPosition > boundary && !this._hasProximalBot();
    } else {
        return nextPosition < boundary && !this._hasProximalBot();
    }
}

// Moves the bot one step in its current direction
Bot.prototype._step = function() {
    var ea              = this.getView().getElement();
    ea[ this.direction.first().toSetter() ](this._nextPosition(ea));
}

/**
 * This function is responsible for making the bot turn.  For now, its direction
 * is random.
 */
Bot.prototype._turn = function() {
    var dki = Math.round(Math.random() * 3);
    var dk  = Object.keys(Bot.DIRECTIONS)[dki];
    this.direction = Bot.DIRECTIONS[dk];
}

// Returns the next position in the world this bot will occupy.
Bot.prototype._nextPosition = function(e) {
    return this.direction.last() * Bot.STEP + e[ this.direction.first().toGetter() ]();
}

// Determines whether this bot is proximal to any other bots in the world.
Bot.prototype._hasProximalBot = function() {
    var bots            = this.world.bots;
    var bot             = null;
    
    for(var i=0, n=bots.length; i<n; i++) {
        bot = bots[i];
        
        if(bot === this) continue;
        if(this.intersects(bot)) return true;
    }
    return false;
}

// Determines whether the bot has found the goal
Bot.prototype._metGoal = function() {
    var goals   = this.world.goals;
    var goal    = null;
    
    for(var i=0, n=goals.length; i<n; i++) {
        goal = goals[i];         
        if(this.intersects(goal)) return true;
    } 
    return false;
}

/**
 * Returns the bounding box of the bot.  This function overrides the basic
 * getBoundingBox function provided by Sprite to account for the bot's
 * trajectory.
 */
Bot.prototype.getBoundingBox = function() {
    var box = this.constructor.prototype.getBoundingBox.apply(this);
    box[this.direction.first()] = this._nextPosition(this.getView().getElement());
    return box;
}

/*
    Automaton View  -----------------------------------------------------------
*/
Bot.View = function() {
    this.element    = null;
    this.styleClass = "bot";
}

Bot.View.ID = 0;

// get the view's DOM element.
Bot.View.prototype.getElement = function() {
    if(!this.element) {
        this.element = new Element("div", { "className": this.styleClass });
				this.element.appendChild(document.createTextNode(++Bot.View.ID));
    }
    return this.element;
}

/*
    Goal  ---------------------------------------------------------------------
*/
var Goal = function(world) {
    this.viewClass  = Goal.View;
    this.world      = world;
}

// Goal extends Sprite
Goal.prototype = new Sprite();

/*
    Goal View  ----------------------------------------------------------------
*/
Goal.View = function(styleClass) {
    this.element    = null;
    this.styleClass = "goal";
}

// get the view's DOM element.
Goal.View.prototype.getElement = function() {
    if(!this.element) {
        this.element = new Element("div", {"className": this.styleClass });
    }
    return this.element;
}