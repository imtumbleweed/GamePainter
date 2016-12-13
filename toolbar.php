<style>
    #WelcomeToolbar { position: absolute; top: 100px; left: 100px; width: 236px; height: 201px; background: url("welcomebox.png") no-repeat; }
    #WelcomeToolbar .ProgressBar { position: absolute; top: 106px; left: 61px; width: 114px; height: 12px; background: url("progressbar.png") no-repeat; }
    #WelcomeToolbar .ProgressBar2 { position: absolute; top: 0; left: 0; width: 0px; height: 12px; background: url("progressbar2.png") no-repeat; }
    #GamePainterTitle { width: 236px; color: white; position: absolute; top: 40px; font-size: 11px; font-family: Arial; text-align: center; }
    .StaticButton { width: 114px; height: 25px; background: url("staticbutton.png"); font-family: Arial; line-height: 24px; font-size: 12px; text-align: center; color: silver; }
    #MakeGamesButton { z-index: 10; cursor: pointer; position: absolute; left: 60px; top: 140px; }
    #MakeGamesButtonOn { z-index: 11; cursor: pointer; position: absolute; left: 60px; top: 140px; background: url("staticbutton-on.png"); display: none; color: #feff83; }
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
            $("#Tools").css({"left":x+"px","top":y+"px"});
        }
        // Set tool controls
        $("#Tool1").on("click", function(){ toolbox.currentToolID = toolbox.SELECTION_TOOL; console.log("Selected Selection Tool.");});
        $("#Tool2").on("click", function(){ toolbox.currentToolID = toolbox.MOVE_WORLD; console.log("Selected Move World.");});
        $("#Tool3").on("click", function(){ toolbox.currentToolID = toolbox.BOX_TOOL; console.log("Selected Box Tool.");});
        $("#Tool4").on("click", function(){ toolbox.currentToolID = toolbox.CIRCLE_TOOL; console.log("Selected Circle Tool.");});
        $("#Tool5").on("click", function(){ toolbox.currentToolID = toolbox.ERASER_TOOL; console.log("Selected Eraser Tool.");});
        $("#Tool6").on("click", function(){ toolbox.currentToolID = toolbox.SOME_TOOL; console.log("Selected Some Tool.");});
        $("#Tool7").on("click", function(){ toolbox.currentToolID = toolbox.RAINMAKER; console.log("Selected Rain Maker Tool.");});
        $("#Tool8").on("click", function(){ toolbox.currentToolID = toolbox.CELESTIAL; console.log("Celestial Body Tool."); Celestial.place($(window).width()/2, $(window).height()/2 + 500); });

        // Attach events to context menu
        $("#Context1").on("click", function(){ toolbox.action(ACTION_MAKE_LEFT_SLOPE); });
        $("#Context2").on("click", function(){ toolbox.action(ACTION_MAKE_RIGHT_SLOPE); });
        $("#Context3").on("click", function(){ toolbox.action(ACTION_MAKE_COLLECTIBLE); });

        // Draggable mini map
        $( "#MinimapView" ).draggable({
            containment: '#Minimap',
            drag: function(event) {
                var top = $(this).position().top;
                var left = $(this).position().left;
            }
        });

        $("#Tool2,#Tool3,#Tool4,#Tool5,#Tool6,#Tool7").on("click", function(){MakeRainsSelectable(false);})
        $("#Tool1").on("click", function(){MakeRainsSelectable(true);})

        // Make clickable tool icons
        $('.ToolIcon').on("click", function() {
            $(".ToolIcon").removeClass("Selected");
            $(this).addClass("Selected");
        })});</script>
<div id = "Tools">
    <div id = "ToolsHeader"></div>
    <div style = "height: 6px;"></div>
    <div id = "Tool1" class = "ToolIcon Toolpad Selected"><img src = "ic1a.png" alt = "Select Objects"/></div><div id = "Tool2" class = "ToolIcon"><img src = "ic2a.png" alt = "Move World"/></div>
    <div id = "Tool3" class = "ToolIcon Toolpad ToolIC-Empty"><img src = "boxtool.png" alt = "Box Tool"/></div><div id = "Tool4" class = "ToolIcon ToolIC-Empty"><img src = "circletool.png" alt = "Circle Tool"/></div>
    <div id = "Tool5" class = "ToolIcon Toolpad ToolIC-Empty"><img src = "erasertool.png" alt = "Box Tool"/></div><div id = "Tool6" class = "ToolIcon ToolIC-Empty"></div>
    <div id = "Tool7" class = "ToolIcon Toolpad ToolIC-Empty"><img src = "rainmaker.png" alt = "Box Tool"/></div><div id = "Tool8" class = "ToolIcon ToolIC-Empty"><img src = "celestialicon.png" alt = "Celestial Tool"/></div>
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
<div id = "SidePanel">
    <img src = "sidepanelheader.png" alt = ""/>
    <div id = "Minimap">
        <div id = "MinimapView"></div>
    </div>
</div>
<div class = "CameraIcon"></div>
<div id = "ContextMenu">
    <div id = "Context1" class = "ContextItem" action = "Convert to Left Slope"><img src = "leftslope.png" alt = "Left slope"/> Left Slope</div>
    <div id = "Context2" class = "ContextItem" action = "Convert to Right Slope"><img src = "rightslope.png" alt = "Right slope"/> Right Slope</div>
    <div id = "Context3" class = "ContextItem" action = "Convert to Collectible"><img src = "collectible.png" alt = "Right slope"/> Collectible</div>
</div>
<div id = "WelcomeToolbar">
    <div id = "GamePainterTitle">Game Painter<div style = "height: 8px;"></div><span style = "color: gray;">v0.007</span></div>
    <div class = "ProgressBar" id = "ProgressBar">
        <div class = "ProgressBar2" id = "ProgressBarPercent">
            <div class = "ProgressBar3"></div>
        </div>
        <div id = "ProgressBarCounter" style = "text-shadow: 0 0 5px #000; display: none; width: 60px; font-weight: normal; position: absolute; top: -16px; left: 35px; font-family: Arial; font-size: 10px; color: silver;"><span id = "a"></span> of <span id = "b"></span></div>
    </div>
    <div class = "StaticButton" id = "MakeGamesButton">Make Games</div>
    <div class = "StaticButton" id = "MakeGamesButtonOn" onclick = "window.sfxclick1.play(); $('#WelcomeToolbar').fadeOut()">Make Games</div>
</div>