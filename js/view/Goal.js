app.ensureNamespace("app.view");


// ---------------------------------------------------------------------
// constructor
// ---------------------------------------------------------------------

/**
 * This class provides the view functionality for the goal component.
 */
app.view.Goal = function(id) {
    
    // set class name
    this.klassName = "app.view.Goal";
    
    // state variables
    this._id            = id;
    this._element       = null;
    this._styleClass    = "goal";
}


/**
 * This class extends app.view.AbstractSprite.
 */
app.view.Goal.prototype = new app.view.AbstractSprite();