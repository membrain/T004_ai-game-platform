app.ensureNamespace("app.util");


// ---------------------------------------------------------------------
// constructor
// ---------------------------------------------------------------------

/**
 * This class exposes a set of useful object hash manipulation methods. 
 */
app.util.Object = new function() {
	
	// set class name
	this.klassName = "app.util.Object";
};



// ---------------------------------------------------------------------
// public methods
// ---------------------------------------------------------------------

/**
 * This function allows one to provide a complex object and a '.' 
 * delimited property key--which represents an object property
 * hierarchy--and have returned the property value residing at the
 * last item in the property list.
 * 
 * For the programmer:
 * 
 * This functionality is a candidate for recursion; however, given our
 * performance requrements, it makes more sense to flatten the
 * required stack space into one item by way of looping, instead
 * of pushing a process onto the stack.  As well, we don't risk blowing
 * the stack!
 
 * @param {Object} object       the object being inspected
 * @param {Object} property     the property on that object to be read
 * @param {Object} defaultValue the value to return if the property cannot be found
 */
app.util.Object.forName = function(name) {
    var branch  = name.split(".");
    var obj     = window;
    
    for(var i=0, n=branch.length; i<n; i++) {
        if(!obj) {
            throw new Error("Could not dereference: " + name);
        }
        
        obj = obj[branch[i]];
    }
    
    return obj;
};