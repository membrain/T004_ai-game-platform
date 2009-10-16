app.ensureNamespace("app.view");


app.view.Bot = function(styleClass) {
    this.element    = null;
    this.styleClass = styleClass || "bot";
}

app.view.Bot._ID = 0;

// get the view's DOM element.
app.view.Bot.prototype.getElement = function() {
    if(!this.element) {
        this.element = new Element("div", { "className": this.styleClass });
		this.element.appendChild(document.createTextNode(++app.view.Bot._ID));
    }
    return this.element;
}