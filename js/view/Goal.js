app.ensureNamespace("app.view");


// ---------------------------------------------------------------------
// constructor
// ---------------------------------------------------------------------

/**
 * This class provides the view functionality for the goal component.
 */
app.view.Goal = function(styleClass) {
    
	// set class name
	this.klassName = "app.view.Goal";
	
	// offset id to convert to letter keycode
	this.id	= ++app.view.Goal._ID + 64;
	
	// state variables
	this.element    = null;
    this.styleClass = styleClass || "goal";
}



// ---------------------------------------------------------------------
// static 
// ---------------------------------------------------------------------

/**
 * This is a private property used to identify instances as they are
 * created.
 */
app.view.Goal._ID = 0;



// ---------------------------------------------------------------------
// public 
// ---------------------------------------------------------------------

/**
 * This function returns the dom element for the view. In an effort to
 * be memory efficient, the element is instantiated lazily.
 */
app.view.Goal.prototype.getElement = function() {
    if (!this.element) {
		this.element = new Element("div", {"className": this.styleClass });
		this.element.appendChild(document.createTextNode(String.fromCharCode(this.id)));
	}
    return this.element;
}