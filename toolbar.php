<style>
    #Tools { box-shadow: 0 0 40px #222; background: #535353 url('toolboxbody.png') repeat-y; width: 72px; height: 200px; position: absolute; top: 80px; left: calc(50% + 200px); }
    #ToolsHeader { position: relative; width: 72px; height: 22px; background: #535353 url('toolbox-top.png') no-repeat; }
    .ToolIcon { width: 33px; height: 26px; background: url("ic-empty.png") no-repeat; display: inline-block; margin:0; }
    .Toolpad { margin-left: 3px; }
    .ToolIC1 { background: url("") no-repeat; }
    .ToolIC-Empty { background: url("ic-empty.png") no-repeat; }
    .ToolIcon:hover { background: url("ic-empty.png") no-repeat; cursor: pointer; }
    .ToolIcon.Selected { background: url("ic-selected.png") no-repeat; }
    .CameraIcon { background: transparent url('camera.png') repeat-y; width: 24px; height: 24px; position: absolute; top: 70px; left: calc(50% - 350px); }
    #SecondaryToolbar { box-shadow: 0 0 40px #222;  background: #535353 url('SecondaryToolbar.png'); width: 100px; height: 50px; position: absolute; top: 32px; left: calc(50% + 140px); }
    .STPlaceholder { position: relative; margin; 2px; display: inline-block; width: 33px; height; 26px; background: url("SecondaryToolbarSelected.png") no-repeat; }
    .STPlaceholder img { pointer-events: none; }
    .STAdjuster { position: absolute; top: 16px; left: 18px; }
</style>
<script>$(document).ready(function() {
        //
        document.getElementsByTagName('img').ondragstart = function() { return false; };
        // Animate toolbar to its last position
        if (localStorage) {
            var x = parseInt(localStorage.getItem("toolbarx"));
            var y = parseInt(localStorage.getItem("toolbary"));
            console.log(x);
            console.log(y);
            $("#Tools").stop().animate({"left":x+"px","top":y+"px"}, 2000, "easeOutExpo");
        }
        // Set tool controls
        $("#Tool1").on("click", function(){ toolbox.currentToolID = toolbox.SELECTION_TOOL; console.log("Selected Selection Tool.");});
        $("#Tool2").on("click", function(){ toolbox.currentToolID = toolbox.MOVE_WORLD; console.log("Selected Move World.");});
        $("#Tool3").on("click", function(){ toolbox.currentToolID = toolbox.BOX_TOOL; console.log("Selected Box Tool.");});
        $("#Tool4").on("click", function(){ toolbox.currentToolID = toolbox.CIRCLE_TOOL; console.log("Selected Circle Tool.");});
        $("#Tool5").on("click", function(){ toolbox.currentToolID = toolbox.ERASER_TOOL; console.log("Selected Eraser Tool.");});
        $("#Tool6").on("click", function(){ toolbox.currentToolID = toolbox.PLAYER_TOOL; console.log("Player Tool.");});

        // Make clickable tool icons
        $('.ToolIcon').on("click", function() {
            $(".ToolIcon").removeClass("Selected");
            $(this).addClass("Selected");
        })});</script>
<div id = "Tools">
    <div id = "ToolsHeader"></div>
    <div style = "height: 6px;"></div>
    <div id = "Tool1" class = "ToolIcon Toolpad"><img src = "ic1a.png" alt = "Select Objects"/></div><div id = "Tool2" class = "ToolIcon"><img src = "ic2a.png" alt = "Move World"/></div>
    <div id = "Tool3" class = "ToolIcon Toolpad ToolIC-Empty Selected"><img src = "boxtool.png" alt = "Box Tool"/></div><div id = "Tool4" class = "ToolIcon ToolIC-Empty"><img src = "circletool.png" alt = "Circle Tool"/></div>
    <div id = "Tool5" class = "ToolIcon Toolpad ToolIC-Empty"><img src = "erasertool.png" alt = "Box Tool"/></div><div id = "Tool6" class = "ToolIcon ToolIC-Empty"></div>
    <div id = "Tool7" class = "ToolIcon Toolpad ToolIC-Empty"><img src = "playericon.png" alt = "Box Tool"/></div><div id = "Tool8" class = "ToolIcon ToolIC-Empty"></div>
</div>
<div id = "SecondaryToolbar">
    <div class = "STAdjuster">
        <div class = "STPlaceholder" onclick = "Player.spawn(Mouse.x, Mouse.y)">
            <img src = "playericon.png" alt = "" />
        </div>
        <div class = "STPlaceholder">
            <img src = "controllericon.png" alt = ""/>
        </div>
    </div>
</div>
<div class = "CameraIcon"></div>