app.ensureNamespace("app.component");


// ---------------------------------------------------------------------
// constructor
// ---------------------------------------------------------------------

/**
 * This class provides main logic for the bot component.
 */
app.component.Bot = function() {
    
    // set class name
    this.klassName      = "app.component.Bot";
    
    // state variables (model-specific)
    this._brain         = null;
    this._direction     = app.component.Bot.DIRECTIONS.last();
    this._senseHanders  = {};
    this.senses         = {};
    
    this._registerSense(app.component.sense.Touch, this._onTouch);
}


/**
 * This class extends app.component.AbstractSprite.
 */
app.component.Bot.prototype = new app.component.AbstractSprite();



// ---------------------------------------------------------------------
// static
// ---------------------------------------------------------------------

/**
 * This defines the distance a bot moves each time it takes a step.
 */
app.component.Bot._STEP = 1;


/**
 * This defines the directions a bot can move.
 */
app.component.Bot.DIRECTIONS = [
    "Up",
    "Right",
    "Down",
    "Left"
];



// ---------------------------------------------------------------------
// public
// ---------------------------------------------------------------------

/**
 * This function destroys the event loop that functions as the bot's brain.
 */
app.component.Bot.prototype.sleep = function() {
    if (this._brain) {
        clearInterval(this._brain);
        this._brain = null;
    }
}


/**
 * This function creates the event loop that functions as the bot's brain.
 */
app.component.Bot.prototype.wake = function() {
    if (!this._brain) {
        this._brain = setInterval(this._think.bind(this), 10);
    }
}

// ---------------------------------------------------------------------
// private
// ---------------------------------------------------------------------

app.component.Bot.prototype._registerSense = function(senseClass, handlerFn) {
    var sense                           = new senseClass();
    this.senses[sense.getId()]          = sense;
    this._senseHanders[sense.getId()]   = handlerFn || function() {};
}

app.component.Bot.prototype._act = function(sensoryInput) {
    for(var senseId in sensoryInput) {
        this._senseHanders[senseId].call(this, sensoryInput[senseId]);
    }
}

/**
 * This function represents a single motor revolution.
 */
app.component.Bot.prototype._think = function() {
    var sensoryInput = this._sense();
    
    if(sensoryInput) {
        this._act(sensoryInput);
    } else {
        this._randomizeDirection();
        var moved = this._move(this._direction, app.component.Bot._STEP);
        if(!moved) {
            this._turn(2);
            this._move(this._direction, app.component.Bot._STEP);
        }
        
    }
}


/**
 * This function uses a randomized algorithm to force the bot to turn
 * every so often (but not very often).
 */
app.component.Bot.prototype._randomizeDirection = function() {
    var i = Math.round(Math.random() * 100);
    var j = i % 60;
    if (j === 0) {
        this._turn(i);
    }
}

/**
 * This function is responsible for making the bot turn.
 */
app.component.Bot.prototype._turn = function(times) {
    
    // scrub number of turns
    times           = times || 1;
    
    // detemine new direction
    var directions  = app.component.Bot.DIRECTIONS;
    var current     = directions.indexOf(this._direction);
    var next        = (current + directions.length + times) % directions.length;
    
    // save new direction
    this._direction = app.component.Bot.DIRECTIONS[next];
}

// ---------------------------------------------------------------------
// Sense Handlers
// ---------------------------------------------------------------------

app.component.Bot.prototype._onTouch = function(touchInfo) {
    this._turn(2);
    this._move(this._direction, app.component.Bot._STEP);
}