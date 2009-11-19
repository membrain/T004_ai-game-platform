app.ensureNamespace("app.component");


// ---------------------------------------------------------------------
// constructor
// ---------------------------------------------------------------------

/**
 * This class provides main logic for the goal component.
 */
app.component.Goal = function() {
    
    // set the class name
    this.klassName = "app.component.Goal";
}


/**
 * This class extends app.component.AbstractSprite.
 */
app.component.Goal.prototype = new app.component.AbstractSprite();