window.this_ac = -1;
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
                this.y       = y;
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
        this.animating = false;
        var img = website.url + "/ui/" + image_map;
        var on_state_offset = (-this.width * 3) * this.state; // default background offset
        var getAttributeId = "console.log(123);";
        // Create button element
        var element = "<div class = 'button' " +
            "animating   = '0' " +
            "state       = '" + this.state + "' " +
            "onmouseover = 'if (this.ac == undefined) { this.ac = 0; } if ($(this).attr(\"animating\") == true) return; this.offset = 0; this.state = $(this).attr(\"state\"); if (state == 0) { this.offset = (-$(this).width() * 1); } if (state == 1) { this.offset = (-$(this).width() * 4); } var string = this.offset + \"px 0px\"; this.style.backgroundPosition = string;' " +
            "onmouseout  = 'this.offset = 0; this.state = $(this).attr(\"state\"); if (state == 0) { this.offset = 0; }                      if (state == 1) { this.offset = (-$(this).width() * 3); } var string = this.offset + \"px 0px\"; this.style.backgroundPosition = string;' " +
            "onmousedown = 'var offx = ($(this).width() * 3 * this.state) + $(this).width() * 2; var string = \"-\" + offx + \"px 0px\"; this.style.backgroundPosition = string;' " +
            "onmouseup   = 'var offx = ($(this).width() * 3 * this.state) + $(this).width(); var string = \"-\" + offx + \"px 0px\"; this.style.backgroundPosition = string;" +
            "if (window.this_ac == -1) { window.this_ac = 0; var t = setInterval(() => { if (this.getAttribute(\"state\") == 0) { var bgoffx = 6*$(this).width() + ((6 - window.this_ac) * $(this).width()); var string = \"-\" + bgoffx + \"px 0px\"; this.style.backgroundPosition = string; } else { var bgoffx = (6 * $(this).width()) + ((window.this_ac) * $(this).width()); var string = \"-\" + bgoffx + \"px 0px\"; this.style.backgroundPosition = string; } window.this_ac++; if (window.this_ac >= 7) { if (this.getAttribute(\"state\") == 0) { this.style.backgroundPosition = \"-114px 0px\"; } else { this.style.backgroundPosition = \"0px 0px\"; } clearInterval(t); t = null; window.this_ac = -1; if (this.getAttribute(\"state\") == 0) this.setAttribute(\"state\", \"1\"); else this.setAttribute(\"state\", \"0\"); $(this).trigger(\"mouseout\");  } }, 10) }' " +
            "style       = 'position: absolute; " +
            "left:"          + this.x + "px; " +
            "top:"           + this.y + "px; " +
            "width:"         + this.width + "px; " +
            "height:"        + this.height + "px; " +
            "background: url(" + img + ") " + on_state_offset + "px 0px;" +
            "id          = '" + idname + "'></div>";
        $("#UI").append(element);// html($("#UI").html() + element);
    };
}