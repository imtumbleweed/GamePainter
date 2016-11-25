<html>
<head>
    <title>Game Development Tutorial</title>
    <script src = "jquery.js" type = "text/javascript"></script>
    <script src = "keyboard.js" type = "text/javascript"></script>
    <script src = "mouse.js" type = "text/javascript"></script>
    <script src = "utility.js" type = "text/javascript"></script>
    <script src = "canvas.js" type = "text/javascript"></script>
    <script src = "animate.js" type = "text/javascript"></script>
    <script src = "spritesheet.js" type = "text/javascript"></script>
    <script src = "sprite.js" type = "text/javascript"></script>
    <script src = "world.js" type = "text/javascript"></script>
    <script src = "point.js" type = "text/javascript"></script>
    <script src = "vector.js" type = "text/javascript"></script>
    <script src = "segment.js" type = "text/javascript"></script>
    <script src = "circle.js" type = "text/javascript"></script>
    <script src = "rectangle.js" type = "text/javascript"></script>
    <!--<script src = "collision.js" type = "text/javascript"></script>//-->
    
    <script language = "javascript">

        $(document).ready(function()
        {
            Context = new HTML("game", 640, 480);            
            window.gfx = Context.context;            
            InitializeKeyboard();
            Mouse.Initialize("#game");
            DisableScrollbars();
        });

        $(window).load(function() { });

        setInterval(function() {

        	gfx.beginPath();
        	gfx.rect(0, 0, 640, 480);
        	gfx.fillStyle = 'white';
        	gfx.fill();
        	
        	var pt = new Point(Mouse.x, Mouse.y);
        	pt.draw(2, "red");
        	
        	var rect = new Rectangle(100, 100, 300, 200);
        	rect.draw("blue");
        	
        	if (rect.pointInside( pt ))
	        	rect.draw("red");        		
        	
            if (key.left) { }
            if (key.right) { }
            if (key.up) { }
            if (key.down) { }
            if (key.w) { /* ... */ }
            if (key.s) { /* ... */ }
            if (key.a) { /* ... */ }
            if (key.d) { /* ... */ }

        }, 12);

    </script>
</head>
<body>

    <canvas id = "game"></canvas>

</body>
</html>