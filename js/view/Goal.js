app.ensureNamespace("app.view");


// ---------------------------------------------------------------------
// constructor
// ---------------------------------------------------------------------

/**
 * This class provides the view functionality for the goal component.
 */
app.view.Goal = function(component) {
    
	// set class name
	this.klassName = "app.view.Goal";
	
	// state variables
	this._component		= component;
	this._element    	= null;
    this._styleClass 	= "goal";
}


/**
 * This class extends app.view.AbstractSprite.
 */
app.view.Goal.prototype = new app.view.AbstractSprite();