app.ensureNamespace("app.component");


// ---------------------------------------------------------------------
// constructor
// ---------------------------------------------------------------------

/**
 * This class provides main logic for the bot component.
 */
app.component.Bot = function(world) {
	
	// set class name
	this.klassName = "app.component.Bot";
	
	// set id
	this.id = ++app.component.Bot._ID;
	
	// state variables (common)
	this._viewClassName = "app.view.Bot";
	this._world      	= world;
	
	// state variables (model-specific)
    this._motor      	= null;
    this._direction  	= app.component.Bot.DIRECTIONS.last();
}


/**
 * This class extends app.component.AbstractSprite.
 */
app.component.Bot.prototype = new app.component.AbstractSprite();



// ---------------------------------------------------------------------
// static
// ---------------------------------------------------------------------

/**
 * This is a private property used to identify instances as they are
 * created.  The offset creates a value that can be used as a keycode.
 * Keycodes begin with keydown of A.
 */
app.component.Bot._ID = 47;


/**
 * This defines the distance a bot moves each time it takes a step.
 */
app.component.Bot._STEP = 2;


/**
 * This defines the directions a bot can move and provides associated dom
 * and mathematical values.
 */
app.component.Bot.DIRECTIONS = [
    ["top",       -1],  // North
    ["right",      1],  // East
    ["bottom",     1],  // South
    ["left",      -1]   // West
];



// ---------------------------------------------------------------------
// public
// ---------------------------------------------------------------------

/**
 * This function returns the bounding box of the bot.  It overrides the basic
 * getBoundingBox function provided by Sprite to account for the bot's
 * trajectory.
 */
app.component.Bot.prototype.getBoundingBox = function() {
    var box = this.constructor.prototype.getBoundingBox.apply(this);
    box[this._direction.first()] = this._nextPosition(this.getView().getElement());
    return box;
}


/**
 * This function destroys the event loop that functions as the bot's brain.
 */
app.component.Bot.prototype.sleep = function() {
	if (this._motor) {
		clearInterval(this._motor);
		this._motor = null;
	}
}


/**
 * This function creates the event loop that functions as the bot's brain.
 */
app.component.Bot.prototype.wake = function() {
	if (!this._motor) {
		this._motor = setInterval(this._takeTurn.bind(this), 25);
	}
}



// ---------------------------------------------------------------------
// private
// ---------------------------------------------------------------------

/**
 * This function represents a single motor revolution.
 */
app.component.Bot.prototype._takeTurn = function() {
    if (this._metGoal()) {
	    this.sleep();
	    return;
	}
	
    if(this._canStep()) {
        this._step();
    
        // ---------------------------------------------------
        // This random turning is here to prevent the bot
        // from following the perimeter of the world.
        // ---------------------------------------------------
        var i = Math.round(Math.random() * 100);
        var j = i % 60;
        if(j === 0) {
            this._turn(i);
        }
	
        // ---------------------------------------------------
        // End Silly Hack
        // ---------------------------------------------------
    } else {
        this._turn();
    }
}


/**
 * This function determines whether the bot can take a step.
 */
app.component.Bot.prototype._canStep = function() {
    var ea              = this.getView().getElement();
    var ew              = this._world.getView().getElement();
    var nextPosition    = this._nextPosition(ea);
    var boundary        = ew[ this._direction.first().toGetter() ]();
    
    if(this._direction.last() === -1) {
        return nextPosition > boundary && !this._hasProximalBot();
    } else {
        return nextPosition < boundary && !this._hasProximalBot();
    }
}


/**
 * This function moves the bot one step in its current direction.
 */
app.component.Bot.prototype._step = function() {
    var ea              = this.getView().getElement();
    ea[ this._direction.first().toSetter() ](this._nextPosition(ea));
}


/**
 * This function is responsible for making the bot turn.  For now, its direction
 * is random.
 */
app.component.Bot.prototype._turn = function(times) {
    times           = times || 1;
    var directions  = app.component.Bot.DIRECTIONS;
    var current     = directions.indexOf(this._direction);
    var next        = (current + directions.length + times) % directions.length;
    this._direction = app.component.Bot.DIRECTIONS[next];
}

/**
 * This function returns the next position in the world this bot will 
 * occupy.
 */
app.component.Bot.prototype._nextPosition = function(e) {
    return this._direction.last() * app.component.Bot._STEP + e[ this._direction.first().toGetter() ]();
}


/**
 * This function determines whether this bot is proximal to any other 
 * bots in the world.
 */
app.component.Bot.prototype._hasProximalBot = function() {
    var bots            = this._world.bots;
    var bot             = null;
    
    for(var i=0, n=bots.length; i<n; i++) {
        bot = bots[i];
        
        if(bot === this) continue;
        if(this.intersects(bot)) return true;
    }
    return false;
}


/**
 * This function determines whether the bot has found the goal.
 */
app.component.Bot.prototype._metGoal = function() {
    var goals   = this._world.goals;
    var goal    = null;
    
    for(var i=0, n=goals.length; i<n; i++) {
        goal = goals[i];         
        if(this.intersects(goal)) return true;
    } 
    return false;
}