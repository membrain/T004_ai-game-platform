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
    
    // state variables (common)
    this._viewClassName = "app.view.Goal";
    this._world         = world;
}


/**
 * This class extends app.component.AbstractSprite.
 */
app.component.Goal.prototype = new app.component.AbstractSprite();