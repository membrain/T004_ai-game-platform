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
    
    // set id
    this.id = ++app.component.Goal._ID;
    
    // state variables (common)
    this._viewClassName = "app.view.Goal";
    this._world         = world;
}


/**
 * This class extends app.component.AbstractSprite.
 */
app.component.Goal.prototype = new app.component.AbstractSprite();



// ---------------------------------------------------------------------
// static
// ---------------------------------------------------------------------

/**
 * This is a private property used to identify instances as they are
 * created.  The offset creates a value that can be used as a keycode.
 * Keycodes begin with keydown of A.
 */
app.component.Goal._ID = 64;