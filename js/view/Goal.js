app.ensureNamespace("app.view");


app.view.Goal = function(styleClass) {
    this.element    = null;
    this.styleClass = styleClass || "goal";
}

app.view.Goal._ID = 0;

// get the view's DOM element.
app.view.Goal.prototype.getElement = function() {
    if(!this.element) {
        this.element = new Element("div", {"className": this.styleClass });
    	this.element.appendChild(document.createTextNode(++app.view.Goal._ID));
	}
    return this.element;
}