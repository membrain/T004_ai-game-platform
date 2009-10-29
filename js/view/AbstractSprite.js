app.ensureNamespace("app.view");


// ---------------------------------------------------------------------
// constructor
// ---------------------------------------------------------------------

/**
 * This class provides the view functionality for sprite-like components. This is
 * intended as an abstract class and should not be instantiated directly.
 */
app.view.AbstractSprite = function() {
    
    // state variables
    this._component  = null;
    this._element    = null;
    this._styleClass = null;
}



// ---------------------------------------------------------------------
// public 
// ---------------------------------------------------------------------

/**
 * This function returns the dom element for the view. In an effort to
 * be memory efficient, the element is instantiated lazily.
 */
app.view.AbstractSprite.prototype.getElement = function() {
    if (!this._element) {
        this._element = new Element("div", { "className": this._styleClass });
        this._element.appendChild(document.createTextNode(String.fromCharCode(this._component.id)));
    }
    return this._element;
}