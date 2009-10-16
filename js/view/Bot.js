app.ensureNamespace("app.view");


// ---------------------------------------------------------------------
// constructor
// ---------------------------------------------------------------------

/**
 * This class provides the view functionality for the bot component.
 */
app.view.Bot = function(styleClass) {
    
	// set class name
	this.klassName = "app.view.Bot";
	
	// set id
	this.id	= ++app.view.Bot._ID + 47;
	
	// state variables
	this.element    = null;
    this.styleClass = styleClass || "bot";
}



// ---------------------------------------------------------------------
// static 
// ---------------------------------------------------------------------

/**
 * This is a private property used to identify instances as they are
 * created.
 */
app.view.Bot._ID = 0;



// ---------------------------------------------------------------------
// public 
// ---------------------------------------------------------------------

/**
 * This function returns the dom element for the view. In an effort to
 * be memory efficient, the element is instantiated lazily.
 */
app.view.Bot.prototype.getElement = function() {
    if (!this.element) {
		this.element = new Element("div", { "className": this.styleClass });
		this.element.appendChild(document.createTextNode(String.fromCharCode(this.id)));
    }
    return this.element;
}