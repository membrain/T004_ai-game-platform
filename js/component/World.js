app.ensureNamespace("app.component");


// ---------------------------------------------------------------------
// constructor
// ---------------------------------------------------------------------

/**
 * This class establishes the world in which our agents interact.
 */
app.component.World = function() {
    
	// set class name
	this.klassName = "app.component.World";
	
	// state variables
	this.bots 		= [];
    this.goals 		= [];
    this._view 		= null;
}

    

// ---------------------------------------------------------------------
// public
// ---------------------------------------------------------------------

/**
 * This function adds a new bot to the world.
 */
app.component.World.prototype.addBot = function(botClass) {
    var bot = new botClass(this);
    var be  = bot.getView().getElement();
    var we  = this.getView().getElement();
    
	be.setTop(Math.ceil(Math.random() * we.getBottom()));
    be.setLeft(Math.ceil(Math.random() * we.getRight()));
    
    this.bots.push(bot);
    we.insert({ top: be });
};


/**
 * This function adds a new goal to the world.
 */
app.component.World.prototype.addGoal = function(goalClass) {
    var goal    = new goalClass(this);
    var ge      = goal.getView().getElement();
    var we      = this.getView().getElement();

	ge.setTop(Math.ceil(Math.random() * we.getBottom()));
    ge.setLeft(Math.ceil(Math.random() * we.getRight()));
    
    this.goals.push(goal);
    we.insert({ top: ge });
};


/**
 * This function returns the view instance for this component.
 */
app.component.World.prototype.getView = function() {
	if(!this._view) {
		this._view = new app.view.World(this);
	}
	return this._view;
}