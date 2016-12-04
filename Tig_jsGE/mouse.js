window.clicked = false;
var MouseControls = function()
{
	this.x = 0;
	this.y = 0;
	this.velocityx = 0;	// Velocity at which mouse cursor is moving
	this.velocityy = 0;

	this.down = false; // Left click only (todo: rename to leftclick)
	this.middleclick = false; // Middle button
	this.rightclick = false; // Right button

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

			// Left mouse button up
			if (e.which == 1) {
				that.x = e.clientX - $(element).offset().left;
				that.y = e.clientY - $(element).offset().top;
				window.clicked = true;
			}

		});
		$(element).on("mousedown", function(e) {
			if (!e) var e = event;
			e.preventDefault();

			// Left mouse button
			if (e.which == 1) that.down = true;
			if (e.which == 2) { that.middleclick = true; }
			if (e.which == 3) { that.rightclick = true; }
		});
	}
}

var Mouse = new MouseControls();