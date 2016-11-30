<style>
    #Tools { background: #535353 url('toolboxbody.png') repeat-y; width: 72px; height: 200px; position: absolute; top: 80px; left: calc(50% + 200px);  }
    #ToolsHeader { position: relative; width: 72px; height: 22px; background: #535353 url('toolbox-top.png') no-repeat; }
    .ToolIcon { width: 33px; height: 26px; background: url("ic-empty.png") no-repeat; display: inline-block; margin:0; }
    .Toolpad { margin-left: 3px; }
    .ToolIC1 { background: url("") no-repeat; }
    .ToolIC-Empty { background: url("ic-empty.png") no-repeat; }
    .ToolIcon:hover { background: url("ic-empty.png") no-repeat; cursor: pointer; }
    .ToolIcon.Selected { background: url("ic-selected.png") no-repeat; }
</style>
<script>$(document).ready(function() {
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
        // Make clickable tool icons
        $('.ToolIcon').on("click", function() {
            $(".ToolIcon").removeClass("Selected");
            $(this).addClass("Selected");
        })});</script>
<div id = "Tools">
    <div id = "ToolsHeader"></div>
    <div style = "height: 6px;"></div>
    <div id = "Tool1" class = "ToolIcon Toolpad"><img src = "ic1a.png" alt = "Select Objects"/></div><div id = "Tool2" class = "ToolIcon"><img src = "ic2a.png" alt = "Move World"/></div>
    <div id = "Tool3" class = "ToolIcon Toolpad ToolIC-Empty Selected"><img src = "boxtool.png" alt = "Box Tool"/></div><div id = "Tool4" class = "ToolIcon ToolIC-Empty"></div>
</div>