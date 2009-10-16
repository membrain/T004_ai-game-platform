app.ensureNamespace("app.util");


// ---------------------------------------------------------------------
// singleton
// ---------------------------------------------------------------------

/**
 * This class exposes a set of useful object hash manipulation methods.
 * Because this class is created as a new function, it operates as a 
 * singleton and cannot be used as a constructor. 
 */
app.util.Object = new function() {
	
	// set class name
	this.klassName = "app.util.Object";
};



// ---------------------------------------------------------------------
// public methods
// ---------------------------------------------------------------------

/**
 * This function converts a string version of a class name into a 
 * reference for the class itself.
 */
app.util.Object.forName = function(name) {
    
	// define working variables
	var obj     = window;
    var parts	= name.split(".");
	
	// loop parts and walk down object hash
    for (var i = 0, n = parts.length; i < n; i++) {
        if (!obj) {
            throw new Error("Could not dereference: " + name);
        }
        obj = obj[parts[i]];
    }
    
	// return the reference
    return obj;
};