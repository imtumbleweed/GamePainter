var Rectangle = function(x, y, width, height)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.state = false;
	
	this.draw = function(color, filled, outline)
	{
		gfx.beginPath();
		gfx.rect(this.x, this.y, this.width, this.height);
		
		if (outline == true || outline == undefined) {
			gfx.strokeStyle = color;
			gfx.stroke();
		}
		
		if (filled) {
			gfx.fillStyle = color;
			gfx.fill();		
		}
	}

	// Align the rectangle with a [x,y] center point on the screen
	this.center = function(centerX, centerY) {
		this.x = centerX - this.width/2;
		this.y = centerY - this.height/2;
	}
	
	this.pressed = function(adj_x, adj_y) {
		if (Press == undefined) { console.log("Global Press object does not exist!"); return false; }
//		if (!Press.ed) { return false; }
		if (!adj_x) adj_x = 0;
		if (!adj_y) adj_y = 0;
		var px = Press.x + adj_x;
		var py = Press.y + adj_y;
		if (px >= this.x && px <= this.x + this.width)
			if (py >= this.y && py <= this.y + this.height)
				return true;
		return false;
	}

	this.rectInside = function( rect )
	{
		if (this.x < rect.x + rect.width && this.x + this.width > rect.x &&
			this.y < rect.y + rect.height && this.y + this.height > rect.y) {
			return true;
		}
		return false;
	}
	
	this.pointInside = function(px, py)
	{
		var px = px;
		var py = py;
		if (arguments.length == 1) {
			var pt = new Point(px.x, px.y);
			px = pt.x;
			py = pt.y;
		}
		if (px >= this.x && px <= this.x + this.width)
		{
			if (py >= this.y && py <= this.y + this.height)
			{
				return true;
			}
		}
		return false;
	}
	
}