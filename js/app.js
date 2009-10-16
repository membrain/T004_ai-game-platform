// ---------------------------------------------------------------------
// core extensions
// ---------------------------------------------------------------------

/**
 * These commands extend the core functionality of the String object.
 */
Object.extend(String.prototype, {
    toGetter: function() {
        return "get" + this.capitalize();
    },
    
    toSetter: function() {
        return "set" + this.capitalize();
    }
});


/**
 * These commands extend the core functionality of the Element object.
 */
Object.extend(Element.Methods, {
    getLeft: function(element) {
        return parseInt(element.style.left) || 0;
    },
    
    setLeft: function(element, left) {
        element.style.left = left + "px";
    },
    
    getRight: function(element) {
        return element.getLeft() + element.getWidth();
    },
    
    setRight: function(element, right) {
        element.style.left = (right - element.getWidth()) + "px";
    },

    getTop: function(element) {
        return parseInt(element.style.top) || 0;
    },
    
    setTop: function(element, top) {
        element.style.top = top + "px";
    },

    getBottom: function(element) {
        return element.getTop() + element.getHeight();
    },
    
    setBottom: function(element, bottom) {
        element.style.top = (bottom - element.getHeight()) + "px";
    }
});
Element.addMethods();



// ---------------------------------------------------------------------
// define the application
// ---------------------------------------------------------------------

/**
 * This object serves as the root namespace for all of our classes.
 */
var app = {};


/**
 * This function accepts a dot-delimited string and then iterates the
 * nodes of that string, ensuring that the nodes exist as objects under
 * the window object.  If any node does not exist, this function creates 
 * an object literal with the node name.
 */
app.ensureNamespace = function(ns) {
	var obj 	= window;
	var nodes 	= ns.split(".");
	var node 	= null;
	for (var i = 0, n = nodes.length; i < n; i++) {
		node = nodes[i];
		if (!obj[node]) {
			obj[node] = {};
		}
		obj = obj[node]
	}
};


/**
 * This function starts the application.
 */
app.start = function() {
	
	// create world
	var world 		= new app.component.World();

	// get convenience references
	var botClass	= app.component.Bot;
	var goalClass 	= app.component.Goal;
	
	// create goals
	for (var i = 0; i < 3; i++) {
		world.addGoal(goalClass);
	}
	
	// create bots
	for (var i = 0; i < 10; i++) {
		world.addBot(botClass);
	}
};