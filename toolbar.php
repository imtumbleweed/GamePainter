<style>
    #Tools { background: #535353 url('toolboxbody.png') repeat-y; width: 72px; height: 200px; position: absolute; top: 80px; right: 100px;  }
    #ToolsHeader { position: relative; width: 72px; height: 22px; background: #535353 url('toolbox-top.png') no-repeat; }
    .ToolIcon { width: 33px; height: 26px; background: url("ic-empty.png") no-repeat; display: inline-block; margin:0; }
    .Toolpad { margin-left: 3px; }
    .ToolIC1 { background: url("") no-repeat; }
    .ToolIC-Empty { background: url("ic-empty.png") no-repeat; }
    .ToolIcon:hover { background: url("ic-empty.png") no-repeat; cursor: pointer; }
    .ToolIcon.Selected { background: url("ic-selected.png") no-repeat; }
</style>
<script>$(document).ready(function() {
        $("#Tool1").on("click", function(){ toolbox.currentToolID = toolbox.SELECTION_TOOL; });
        $("#Tool2").on("click", function(){ toolbox.currentToolID = toolbox.MOVE_WORLD;; });
        // Make clickable tool icons
        $('.ToolIcon').on("click", function() {
            $(".ToolIcon").removeClass("Selected");
            $(this).addClass("Selected");
        })});</script>
<div id = "Tools">
    <div id = "ToolsHeader"></div>
    <div style = "height: 6px;"></div>
    <div id = "Tool1" class = "ToolIcon Toolpad"><img src = "ic1a.png" alt = "Select Objects"/></div><div id = "Tool2" class = "ToolIcon"><img src = "ic2a.png" alt = "Move World"/></div>
    <div id = "Tool3" class = "ToolIcon Toolpad ToolIC-Empty Selected"></div><div id = "Tool4" class = "ToolIcon ToolIC-Empty"></div>
</div>