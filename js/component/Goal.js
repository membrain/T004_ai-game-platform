app.ensureNamespace("app.component");


// ---------------------------------------------------------------------
// constructor
// ---------------------------------------------------------------------

/**
 * This class provides main logic for the goal component.
 */
app.component.Goal = function(world) {
    
	// set the class name
	this.klassName = "app.component.Goal";
	
	// state variables
	this.world = world;
}


/**
 * This class extends app.component.Sprite.
 */
app.component.Goal.prototype = new app.component.Sprite("app.view.Goal");