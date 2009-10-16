app.ensureNamespace("app.component");


app.component.World = {
    bots:       [],
    goals:      [],
    element:    null,
    
    addBot: function(botClass) {
        var bot = new botClass(this);
        var be  = bot.getView().getElement();
        var we  = this.getElement();
        be.setTop(Math.ceil(Math.random() * we.getBottom()));
        be.setLeft(Math.ceil(Math.random() * we.getRight()));
        
        this.bots.push(bot);
        we.insert({ top: be });
    },
    
    addGoal: function(goalClass) {
        var goal    = new goalClass(this);
        var ge      = goal.getView().getElement();
        var we      = this.getElement();
        
        ge.setTop(200);
        ge.setLeft(200);
        
        this.goals.push(goal);
        we.insert({ top: ge });
    },
    
    getElement: function() {
        if(!this.element) {
            this.element = $(document.body);
            this.element.absolutize();
            this.element.setStyle({
                top:    "0px",
                left:   "0px",
                width:  document.viewport.getWidth() - 10 + "px",
                height: document.viewport.getHeight() - 10 + "px"
            });
        }
        return this.element;
    }
}