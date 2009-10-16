


/*
    Core Extensions  ----------------------------------------------------------
*/

Object.extend(String.prototype, {
    toGetter: function() {
        return "get" + this.capitalize();
    },
    
    toSetter: function() {
        return "set" + this.capitalize();
    }
});

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



var app = {};

app.bootstrap = function() {
	for(var i=0; i<10; i++) {
		app.component.World.addBot(app.component.Bot);
	}
	app.component.World.addGoal(app.component.Goal);
};

app.ensureNamespace = function(ns) {
	var obj = window;
	var names = ns.split(".");
	var name = null;
	for (var i = 0, n = names.length; i < n; i++) {
		name = names[i];
		if (!obj[name]) {
			obj[name] = {};
		}
		obj = obj[name]
	}
};


