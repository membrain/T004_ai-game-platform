app.ensureNamespace("app.view");


// ---------------------------------------------------------------------
// constructor
// ---------------------------------------------------------------------

/**
 * This class provides the view functionality for world components.
 */
app.view.World = function() {
    
    // set class name
    this.klassName = "app.view.World";
    
    // state variables
    this._element    = null;
}

app.view.World.prototype = new app.view.AbstractView();

// ---------------------------------------------------------------------
// public 
// ---------------------------------------------------------------------

/**
 * This function returns the dom element for the view. In an effort to
 * be memory efficient, the element is instantiated lazily.
 */
app.view.World.prototype.getElement = function() {
    if (!this._element) {
        this._element = $(document.body);
        this._element.absolutize();
        this._element.setStyle({
            top:    "0px",
            left:   "0px",
            width:  document.viewport.getWidth() - 10 + "px",
            height: document.viewport.getHeight() - 10 + "px"
        });
    }
    return this._element;
}