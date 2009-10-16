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
	
	// state variables
	this.world      = world;
    this.motor      = setInterval(this._takeTurn.bind(this), 25);
    this.direction  = app.component.Bot.DIRECTIONS.WEST;
}


/**
 * This class extends app.component.Sprite.
 */
app.component.Bot.prototype = new app.component.Sprite("app.view.Bot");



// ---------------------------------------------------------------------
// static
// ---------------------------------------------------------------------

/**
 * This defines the distance a bot moves each time it takes a step.
 */
app.component.Bot._STEP = 2;


/**
 * This defines the directions a bot can move and provides associated dom
 * and mathematical values.
 */
app.component.Bot.DIRECTIONS = {
    NORTH:  ["top",       -1],
    SOUTH:  ["bottom",     1],
    WEST:   ["left",      -1],
    EAST:   ["right",      1]
}



// ---------------------------------------------------------------------
// private
// ---------------------------------------------------------------------

/**
 * This function represents a single motor revolution.
 */
app.component.Bot.prototype._takeTurn = function() {
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


/**
 * This function determines whether the bot can take a step.
 */
app.component.Bot.prototype._canStep = function() {
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


/**
 * This function moves the bot one step in its current direction.
 */
app.component.Bot.prototype._step = function() {
    var ea              = this.getView().getElement();
    ea[ this.direction.first().toSetter() ](this._nextPosition(ea));
}


/**
 * This function is responsible for making the bot turn.  For now, its direction
 * is random.
 */
app.component.Bot.prototype._turn = function() {
    var dki = Math.round(Math.random() * 3);
    var dk  = Object.keys(app.component.Bot.DIRECTIONS)[dki];
    this.direction = app.component.Bot.DIRECTIONS[dk];
}


/**
 * This function returns the next position in the world this bot will 
 * occupy.
 */
app.component.Bot.prototype._nextPosition = function(e) {
    return this.direction.last() * app.component.Bot._STEP + e[ this.direction.first().toGetter() ]();
}


/**
 * This function determines whether this bot is proximal to any other 
 * bots in the world.
 */
app.component.Bot.prototype._hasProximalBot = function() {
    var bots            = this.world.bots;
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
    var goals   = this.world.goals;
    var goal    = null;
    
    for(var i=0, n=goals.length; i<n; i++) {
        goal = goals[i];         
        if(this.intersects(goal)) return true;
    } 
    return false;
}



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
    box[this.direction.first()] = this._nextPosition(this.getView().getElement());
    return box;
}