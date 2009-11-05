app.ensureNamespace("app.component");


// ---------------------------------------------------------------------
// constructor
// ---------------------------------------------------------------------

/**
 * This class provides main logic for the bot component.
 */
app.component.Bot = function(world, id) {
    
    // set class name
    this.klassName      = "app.component.Bot";
    
    // state variables (common)
    // this._viewClassName = "app.view.Bot";
    this._world         = world;
    this._id            = id;
    
    // state variables (model-specific)
    this._brain         = null;
    this._direction     = app.component.Bot.DIRECTIONS.last();
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
app.component.Bot._STEP = 2;


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
        this._brain = setInterval(this._think.bind(this), 25);
    }
}



// ---------------------------------------------------------------------
// private
// ---------------------------------------------------------------------

/**
 * This function represents a single motor revolution.
 */
app.component.Bot.prototype._think = function() {
    
    // if goal collision, kill motor
    if (this._hasGoalIntersection()) {
        this.sleep();
    }
    
    // else, if boundary or bot collision, turn around and step
    else if (this._hasBoundaryIntersection() || this._hasBotIntersection()) {
        this._turn(2);
        this._move();
    }
    
    // else, determine if turn required and step
    else {
        this._randomizeDirection();
        this._move();
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
 * This function moves the bot one step in its current direction.
 */
app.component.Bot.prototype._move = function(step) {

    // scrub distance
    step = step || app.component.Bot._STEP;
    
    // move bot
    // var view = this.getView();
    this._world["move" + this._direction](this._id, step);
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


/**
 * This function determines whether or not the bot has an intersection with
 * the edge of the world.
 */
app.component.Bot.prototype._hasBoundaryIntersection = function() {
    return this._world.hasBoundaryIntersection(this._id);
}


/**
 * This function determines whether or not the bot has an intersection with
 * another bot.
 */
app.component.Bot.prototype._hasBotIntersection = function() {
    return this._world.hasBotIntersection(this._id);
}


/**
* This function determines whether or not the bot has an intersection with
* a goal.
*/
app.component.Bot.prototype._hasGoalIntersection = function() {
    return this._world.hasGoalIntersection(this._id);
}
