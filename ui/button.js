class Button {
    constructor(x,              // x
                y,              // y
                width,          // width of the button
                height,         // height of the button
                idname,         // button element id
                image_map,      // (example: "map_pausebutton.png")
                state,
                func_onclick) { // Onclick function
                this.x       = x;
                this.x       = y;
                this.width   = width;
                this.height  = height;
                this.OFF     = 0;
                this.ON      = 1;
                this.TO_OFF  = 2;            // animating to off
                this.TO_ON   = 3;            // animating to on
                this.counter = 0;           // state animation counter
                this.state   = state;
                this.offset  = 0;
                this.idname  = idname;

        var img = website.url + "/ui/" + image_map;

        var on_state_offset = (-this.width * 3) * this.state; // default background offset

        ;

        // Create button element
        var element = "<div class = 'button' " +

            "state       = '" + this.state + "' " +
            "onmouseover = 'this.offset = 0; this.state = $(this).attr(\"state\"); if (state == 0) { this.offset = (-$(this).width() * 1); } if (state == 1) { this.offset = (-$(this).width() * 4); } var string = this.offset + \"px 0px\"; this.style.backgroundPosition = string;' " +
            "onmouseout  = '' " +
            "onmousedown = 'var offx = (-$(this).width() * 3 * this.state) + $(this).width() * 2; var string = \"-\" + offx + \"px 0px\"; this.style.backgroundPosition = string;' " +
            "onmouseup   = 'var offx = (-$(this).width() * 3 * this.state) + $(this).width() * 1; var string = \"-\" + offx + \"px 0px\"; this.style.backgroundPosition = string;' " +
            "style       = 'position: absolute; " +
            "left:"          + this.x + "px; " +
            "top:"           + this.y + "px; " +
            "width:"         + this.width + "px; " +
            "height:"        + this.height + "px; " +
            "background: url(" + img + ") " + on_state_offset + "px 0px;" +
            "id          = '" + idname + "'></div>";

        $("#UI").html(element);

        //$("#" + idname).on("click", function(){ console.log('da'); } );
        //$("#" + idname).on("mouseover", function(){ this.mouseover(); } );
        //$("#" + idname).on("mouseout", function(){ this.mouseout(); });
        //var div = document.createElement("div");
        //div.innerHTML = element;
        //document.body.appendChild(div);
    };
};