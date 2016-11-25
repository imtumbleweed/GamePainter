window.clicked = false;
var MouseControls = function()
{
	this.x = 0;
	this.y = 0;
	this.velocityx = 0;	// Velocity at which mouse cursor is moving
	this.velocityy = 0;
	this.down = false;
	var that = this;
	this.Initialize = function(element)
	{
		$(element).on("mousemove", function(event) {
			var oldx = that.x;
			var oldy = that.y;
			that.x = event.pageX - $(element).offset().left;
			that.y = event.pageY - $(element).offset().top;
			that.velocityx = that.x - oldx;
			that.velocityy = that.y - oldy;

		});
		$(element).on("click", function(e) {		
            if (!e) var e = event;
			e.preventDefault();
			that.x = e.clientX - $(element).offset().left;
			that.y = e.clientY - $(element).offset().top;			
			window.clicked = true;
		});
		$(element).on("mousedown", function(e) {
			if (!e) var e = event;
			e.preventDefault();
			that.down = true;
		});
	}
}

var Mouse = new MouseControls();