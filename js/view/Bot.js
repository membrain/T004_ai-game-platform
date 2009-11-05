app.ensureNamespace("app.view");


// ---------------------------------------------------------------------
// constructor
// ---------------------------------------------------------------------

/**
 * This class provides the view functionality for the bot component.
 */
app.view.Bot = function(id) {
    
    // set class name
    this.klassName = "app.view.Bot";
    
    // state variables
    this._id         = id;
    this._element    = null;
    this._styleClass = "bot";
}


/**
 * This class extends app.view.AbstractSprite.
 */
app.view.Bot.prototype = new app.view.AbstractSprite();