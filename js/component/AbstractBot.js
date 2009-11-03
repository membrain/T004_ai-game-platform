app.ensureNamespace("app.component");

app.component.AbstractBot = function() {
    this.klassName = "app.component.AbstractBot";
    
    // state variables (common)
	this._motor      	= null;
	
    // A map of sense objects, indexed on their ids.
	this._senses        = null;
	
	// A map of decision-predicate arrays, indexed on their ids.
	this._predicates    = null;
	
	// A map of actions, indexed on their ids.
	this._actions       = null;
	
    // A map of sprites detected during the sensing phase, indexed on their ids.
	this._sensed        = null;
}

app.component.AbstractBot.prototype = new app.component.AbstractSprite();

// ----------------------------------------------------------------------------
// Private Instance Methods
// ----------------------------------------------------------------------------

app.component.AbstractBot.prototype._cycle = function() {
    this._sense();
    this._think();
    this._act();
}

app.component.AbstractBot.prototype._sense = function() {
    this._sensed    = [];
    var sensed      = null;
    
    // iterate the senses, and collect all sensed sprites.
    for(var i=0, n<this._senses.length; i<n; i++) {
        sensed = this._senses[i].interrogate(this);
        if(sensed && !this._sensed[sensed.id]) this._sensed[sensed.id] = sensed;
    }
}

app.component.AbstractBot.prototype._think = function() {
    for(var i=0, n<this._predicates.length; i<n; i++) {
        this._predicates[i].test(this, this._sensed);
    }
}

app.component.AbstractBot.prototype._act = function() {
    
}

app.component.AbstractBot.prototype._start = function(period) {
    period  = period || 25;
    if(!this._motor) {
        this._motor = setInterval(this._cycle.bind(this), period);
    }
}

app.component.AbstractBot.prototype._stop = function() {
    if(this._motor) {
        clearInterval(this._motor);
        this._motor = null;
    }
}

// ----------------------------------------------------------------------------
// Public Instance Methods
// ----------------------------------------------------------------------------

app.component.AbstractBot.prototype.addSense = function(sense) {
    if(sense && sense.id) {
        this._senses = this._senses || {};
        this._senses[sense.id] = sense;
    }
}

app.component.AbstractBot.prototype.addPredicate = function(predicate) {
    if(predicate && predicate.id) {
        this._predicates = this._predicates || {};
        this._predicates[predicate.id] = predicate;
    }
}

app.component.AbstractBot.prototype.addAction = function(action) {
    if(action && action.id) {
        this._actions = this._actions || {};
        this._actions[action.id] = action;
    }
}
