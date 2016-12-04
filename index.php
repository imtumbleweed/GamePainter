<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en-US">
<head>
    <title>Game Painter</title>
    <link rel = "icon" href = "" /> <?php /* http://www.tigrisgames.com/property_stealth/games/gemini/favicon.gif */ ?>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" >
    <meta name = "viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <meta name = "language" content = "English" />
    <meta http-equiv="content-language" content="en-US" />
    <meta http-equiv="content-type" content="text/html; charset=UTF8">
    <meta content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" name = "viewport">
    <meta property="og:title" content="Game Painter"/>
    <meta property="og:type" content="game"/>
    <meta property="og:image" content=""/>
    <meta property="og:site_name" content="Game Painter"/>
    <meta property="fb:admins" content="gregsidelnikov"/>
    <meta name = "apple-mobile-web-app-capable" content = "yes"> <!-- iPhone iOS //-->
    <meta name = "mobile-web-app-capable" content = "yes"> <!-- Android //-->
    <script type = "text/javascript">
        window.w = 0; // responsive width
        window.website = new Object();
        website.url = 'http://localhost/autumn';
        website.img_dir_name = 'Images';
        website.bs_ip = '65.24.43.194';
        website.this_ip = '2600:3c01::f03c:91ff:feae:69f9';
        website.admin = 0;
        var GameManager = function() {      // Main game object
            this.state = -1;				// Game state; 0=main menu
            this.score = 0;					// Game score
            this.target_score = 0;			// For animating score counter
            this.lives = 3;					// Lives left
            this.level = 1;					// Current level
            this.resourcesLoaded = false;   // Check if graphics (png) resources have finished loading
        };
        var game = new GameManager();
    </script>
    <script src = 'js/jquery.js' type = 'text/javascript'></script>
    <script src = 'js/ui.js' type = 'text/javascript'></script>
    <script src = 'js/code-formatting.js' type = 'text/javascript'></script>
    <script src = 'js/default1.js' type = 'text/javascript'></script>
    <script src = 'js/util.js' type = 'text/javascript'></script>
    <script src = 'js/viewport.js' type = 'text/javascript'></script>
    <script src = 'js/scrollto.js' type = 'text/javascript'></script>
    <script src = "Tig_jsGE/utility.js?v=2" type = "text/javascript"></script>
    <script src = "Tig_jsGE/canvas.js" type = "text/javascript"></script>
    <script src = "Tig_jsGE/animate.js" type = "text/javascript"></script>
    <script src = "Tig_jsGE/spritesheet.js" type = "text/javascript"></script>
    <script src = "Tig_jsGE/sprite.js?v=10" type = "text/javascript"></script>
    <script src = "Tig_jsGE/sound.js?v=13" type = "text/javascript"></script>
    <script src = "Tig_jsGE/world.js" type = "text/javascript"></script>
    <script src = "Tig_jsGE/point.js" type = "text/javascript"></script>
    <script src = "Tig_jsGE/vector.js" type = "text/javascript"></script>
    <script src = "Tig_jsGE/segment.js?v=3" type = "text/javascript"></script>
    <script src = "Tig_jsGE/circle.js?v=3" type = "text/javascript"></script>
    <script src = "Tig_jsGE/rectangle.js?v=1" type = "text/javascript"></script>
    <script src = "Tig_jsGE/orientation.js?v=2" type = "text/javascript"></script>
    <script src = "Tig_jsGE/keyboard.js?v=2" type = "text/javascript"></script>
    <script src = "Tig_jsGE/mouse.js?v=4" type = "text/javascript"></script>
    <script src = "Tig_jsGE/touch.js?v=4" type = "text/javascript"></script>
    <script src = "Tig_jsGE/press.js?v=1" type = "text/javascript"></script>
    <script src = "Tig_jsGE/bullet.js?v=2" type = "text/javascript"></script>
    <script src = "Tig_jsGE/starfield.js?v=1" type = "text/javascript"></script>
    <script src = "Tig_jsGE/text.js?v=1" type = "text/javascript"></script>
    <script src = 'Tig_jsGE/register.js' type = 'text/javascript'></script>
    <script src = 'Tig_jsGE/grid.js?v=2' type = 'text/javascript'></script>
    <script src = 'Tig_jsGE/toolbox.js' type = 'text/javascript'></script>
    <script src = 'Tig_jsGE/box.js' type = 'text/javascript'></script>
    <script src = 'Tig_jsGE/player.js?v=3' type = 'text/javascript'></script>
    <script src = 'Tig_jsGE/rain.js?v=1' type = 'text/javascript'></script>
    <script src = 'Tig_jsGE/celestial.js?v=1' type = 'text/javascript'></script>
    <script src = 'Tig_jsGE/timeline.js' type = 'text/javascript'></script>
    <script type = "text/javascript">

        /** ----- Custom objects ----- **/

        var FrameView = new Rectangle(0,0,720,405);

        var Player = new PlayerClass();

        var Celestial = new CelestialManager(0,0);

        var Timeline = new TimelinePanel(0, 0, $(window).width(), 200);

        var grid = new Grid(64, 64); // Initialize grid

        var toolbox = new Toolbox();

        toolbox.ConfigureRightClick();

        var fox = new Sprite("fox.png");

        var des = new Sprite("des.png");

        var H2 = 0;
        var A1 = 169;

        function IsMobile() { if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) { window.mobile = true; $("body *").addClass("IncreaseFontSize"); } }
        function Resize() {
            if (w < 900) { $("body").addClass("MiniSite"); } else { $("body").removeClass("MiniSite"); }
            /* Collapse all grid view tables in smaller views */
            if (w < 600) { $(".grid td").addClass("CollapseBlock"); } else { $(".CollapsibleSide").removeClass("CollapseBlock"); }
            /* Hide vertical mid point separators (or rather turn them into vertical with height=16px) */
            if (w < 600) { $(".MidPointSeparator").addClass("Hide"); } else { $(".MidPointSeparator").removeClass("Hide"); }
            /* When width is too small; center content in "MiniMiddle" cells */
            if (w < 600) { $(".MiniMiddle").addClass("Center"); } else { $(".MiniMiddle").removeClass("Center"); }
        }
        $(window).resize(function() { Resize(); });
        $(window).load(function() { Resize(); }); window.alreadyScrolled = false;
        $(window).on("scroll", function() { /*if (!alreadyScrolled) { $.scrollTo("#game", 500); alreadyScrolled = true; } */ } );

        window.mobileWidth = 375;//$(window).width();
        window.mobileHeight = 650;//$(window).height();

        var LoadingBarRect = new Rectangle(0,0,0,0);

        $(document).ready(function() {

            // Registration menu hook ups
            $(".selectable").each(function(i,v) {
                $(this).on("click", function(obj) {
                    $(".selectable").removeClass("selected");
                    $(this).addClass("selected");
                })
            });

            // Load loading bar graphics
            // window.LoadingBar1 = new Sprite("http://www.tigrisgames.com/property_stealth/games/gemini/resources/loading1.png");
            // window.LoadingBar2 = new Sprite("http://www.tigrisgames.com/property_stealth/games/gemini/resources/loading2.png");
            // window.glowingbar = new Sprite("http://www.tigrisgames.com/property_stealth/games/gemini/resources/glowingbar.png");

            IsMobile();
            Resize();

            game.width = $(window).width();
            game.height = $(window).height();

            if (window.mobile) {
                window.mobileWidth = $(window).width();
                window.mobileHeight = $(window).height();
                if (mobileWidth == 375) Context = new HTML("game", mobileWidth, mobileHeight); else

                if (mobileWidth == 480) Context = new HTML("game", mobileWidth, mobileHeight); else
                    Context = new HTML("game", game.width, game.height); // default-development machine

            } else {
                Context = new HTML("game", game.width, game.height); // default-development machine
            }

            window.gfx = Context.context;

            gfx.globalAlpha = 1;
            gfx.beginPath();
            gfx.rect(0, 0, game.width, game.height);
            gfx.fillStyle = 'white';
            gfx.fill();

            InitializeKeyboard();
            InitializeOnscreenKeyboard();
            Mouse.Initialize("#game");
            Touch.Initialize("#game");
            DisableScrollbars();
            Sound.Initialize();
            //InitializeLongevityMap();

            // make toolbox draggable
            $("#Tools").draggable({
                stop : function(){
                    localStorage.setItem("toolbarx", $("#Tools").offset().left);
                    localStorage.setItem("toolbary", $("#Tools").offset().top);
                }
            });

            game.engineReady = true;



            //RainArea.add(100,100,400,700,150);
            //RainArea.add(700,200,200,800,150);







            setTimeout(function() {
                //game.displayLoadingBar = true;







                /*
                 $.ajax( { "url" : "http://www.tigrisgames.com/property_stealth/Tig_jsGE/addTester.php",
                 type : "POST",
                 data: { "width" : mobileWidth, "height" : mobileHeight },
                 success: function(msg) { }
                 });  */

                // 375 = iPhone
//                if ($(window).width() == 480)
  //                  $("#game").width(480);


                // Load graphics resources
                $.ajax({"url" : "getResourceList.php", type : "POST", success: function(msg) {
                    console.log("Loading graphics resources from getReourceList.php");
                    if (JSON.parse(msg) != undefined) {
                        var json = JSON.parse(msg);
                        game.resourceNumber = json.length;
                        for (var i = 0; i < json.length; i++) {
                            var appropriateName = json[i].split(".")[0];
                            window.LoadingFileName = json[i];
                            window[appropriateName] = new Sprite("resources/" + window.LoadingFileName);
							console.log(i + " loaded... ("+appropriateName+")");
                        }
                    }

                    // Graphics resources finished loading
                    game.ResourcesLoaded = true;

                    BoxManager.load(); // Load box objects
                }});

                // Load sound resources
                /*
                 $.ajax({"url" : "http://www.learnjquery.org/games/gem/getSfxList.php", type : "POST", success: function(msg) {
                 if (JSON.parse(msg) != undefined) {
                 var json = JSON.parse(msg);
                 game.resourceNumber = json.length;
                 for (var i = 0; i < json.length; i++) {
                 var appropriateName = json[i].split(".")[0];
                 window.LoadingFileName = json[i];
                 window[appropriateName] = new Sprite("http://www.learnjquery.org/games/gem/resources/" + window.LoadingFileName);
                 console.log(i + " loaded... ("+appropriateName+")");
                 }
                 }
                 }}); */
//		        $("#animator").css({"left" : game.width/2 + "px", "top" : game.height/2 + "px", "padding-left" : "1px"});

            }, 500);

        });

        function ClearCanvas() {
            gfx.globalAlpha = 1;
            gfx.beginPath();
            gfx.rect(0, 0, $(window).width(), $(window).height());
            gfx.fillStyle = 'black';
            gfx.fill();
        }

        //var ripple0 = new Sprite("http://www.tigrisgames.com/property_stealth/games/gemini/resources/ripple0.png");
        //var ripple1 = new Sprite("http://www.tigrisgames.com/property_stealth/games/gemini/resources/ripple1.png");

        var LogoRot = 0;
        var sub_beam_rot = 0;
        var panorama_y = 400;
        var panorama_y_target = 0;
        var panorama_s = 0;

        zoomPointX = game.width/2;
        zoomPointY = game.height/2;

       // var Diamond = new Sprite("http://www.tigrisgames.com/property_stealth/games/gemini/resources/diamond.png");

        InitializeAnimationCounters();

        function draw_gemini_loading_logo() {

            /*
            $("#loading_bar_anim").css( { "left" : (game.width / 2) - (278 / 2) + "px" } );

            // Draw loading bar
            var BarHeight = 160;
            var percent = Math.round(LoadingPercent * 100) / 100;
            var H = percent * BarHeight / 100;
            var hdiff = ( parseInt(H) - parseInt(H2) ) / 40;
            window.LoadingBar1.draw(game.width/2 - 278/2, 40);
            gfx.globalAlpha = 0.5;
            if (!isNaN(hdiff)  && hdiff != Number.NEGATIVE_INFINITY && hdiff != 0) {
//				console.log("hdiff=" + hdiff);
                H2 = H2 + hdiff;
            }
            LoadingBarRect.x = game.width/2 - 100;
            LoadingBarRect.y = 240 - H2 + 10;
            LoadingBarRect.width = 200;
            LoadingBarRect.height = H2;
            LoadingBarRect.draw("#49dbff", true, true);
            gfx.globalAlpha = 1;
            window.LoadingBar2.draw(game.width/2 - 278/2, 40);
            window.glowingbar.draw(100 + LoadingBarRect.x - 40, LoadingBarRect.y - 16);
            // Animate selected player background
            var zoomFactor2 = 100 + Math.sin(SelectedPlayerSin2) * 25;
            SelectedPlayerSin2 += 0.01;
            selRunning_x2 += 0.005; //SelectedPlayerSin;
            selRunning_y2 += zoomFactor2 * 0.0075; //SelectedPlayerSin;
            $("#loading_GlowBar").css({"top": -20 + LoadingBarRect.y + "px"});
            $(".loading_Candy").css( { "top" : LoadingBarRect.y + "px", "height" : LoadingBarRect.height + "px",
                          				"background-size" : zoomFactor + "% " + zoomFactor + "%",
                "background-position-x" : selRunning_x2 + zoomFactor2 + "%",
                "background-position-y" : selRunning_y2 + zoomFactor2 + "%"
            } );
            */
        }

        var x = 0;


        //var cursorhand1 = new Sprite("cursorhand1.png");

        //RainArea.add(100,100,200,200,25)

        //var loaded = false;

        setInterval(function() {

            Press.capture(Mouse, Touch); // Press stores either mouse or touch (whichever was done)

            //scalechange = scalefactor - 1; // calculate camera zoom in real time

            ClearCanvas();

            if (game.ResourcesLoaded) {
                //if (window.Gemgrid == null) { // Grid is resource dependent, because it needs gem icons loaded
                  //  window.Gemgrid = new Grid(game.boardWidth, game.boardHeight, game.boardCellSize);
                    //InitializeGalaxy(); // Create galaxy simulator
//					Sound.play(7); // delune music
                //}
                //if (game.state == -1)
                    //geminilogo.rotscale(mobileWidth/2, 135, 1,1, 0);
            }

            switch (game.state) {
                // case 0: wam_menu(); break;
                case -1:

                    //test.draw(Mouse.x,Mouse.y);

                    grid.draw();

                    // Draw celestial
                    Celestial.process();
                    Celestial.draw();

                    // Drag cursor
                    //if (game.ResourcesLoaded)
                        //cursorhand1.draw(Mouse.x, Mouse.y);

                    // Process grid
                    toolbox.process();
                    toolbox.draw();

                    // Draw rain (background layer)
                    for (var i = 0; i < RainArea.length; i++) {
                        RainArea[i].process();
                        RainArea[i].draw();
                    }

                    // Draw objects
                    if (BoxManager.objectsLoaded) {
                        BoxManager.draw();
                    }

                    // Draw player
                    Player.process();
                    Player.draw();
                    Player.collide(); // Collide player with the world


                    //fox.draw(Player.x,Player.y);
                    if (Player.dirx == RIGHT) {
                        if (Player.controlKeysPressed)
                            fox.rotAnim(Player.body.x, Player.body.y, [0, 1, 2, 3, 4], 0, 64,8, 10);
                        else
                            fox.rotAnim(Player.body.x, Player.body.y, [17], 1, 64, 8, 10);
                    }
                    if (Player.dirx == LEFT) {
                        if (Player.controlKeysPressed)
                            fox.rotAnim(Player.body.x, Player.body.y, [24,25,26,27,28], 0, 64, 8,  10);
                        else
                            fox.rotAnim(Player.body.x, Player.body.y, [16], 1, 64, 8, 10);
                    }

                    gfx.globalAlpha = 0.35;
                    FrameView.center(game.width/2, FrameView.height/2 + 100);
                    FrameView.draw("#fff", false, true);
                    gfx.globalAlpha = 1;

                    // Draw timeline panel
                    Timeline.process();
                    Timeline.draw();

                    //room.draw(Mouse.x,Mouse.y);

                    //des.rotAnim(Mouse.x + 210, Mouse.y + 280,
                        //[1,2,3,4,5,6,7,8,9], 0, 96, 10,  7);



  //                  if (toolbox.currentToolID == toolbox.MOVE_WORLD) {
//                        //smallhand1.draw(Mouse.x, Mouse.y);
//                        if (!$("body").hasClass("hidecursor"))
//                            $("body").addClass("hidecursor");
                    //} else { $("body").removeClass("hidecursor"); }

                    break;
                // case 1: wam_story();
                // break;
                case 2:
                   // wam_createplayer();
                    break;
//        		case 2: wam_pre(); break;
                // game play
                case 3:
//                    Gemgrid.draw();
//                    draw_ripples();
//                    proc_bullets();
//                    draw_bullets();
//                    proc_scorenotes();
//                    draw_scorenotes();
//                    proc_SwirlSparks();
//                    draw_SwirlSparks();
//                    proc_ElectronSparks();
//                    draw_ElectronSparks();
                    break;
                case 4:
                    //wam_selectworld();
                    break;
                case 5:
                    //wam_systemsettings();
                    break;
                case 6:
                    //wam_completed();	// level completed, count time, score etc.
                    break;
                case 7:
                    //wam_dicethrower();
                    break;
                case 8:
                    //wam_avatar();
                    break;
                case 9:
                    //wam_store();
                    break;
                /*
                 case 5: wam_map(); break;
                 case 6: wam_gameover(); break;
                 case 7: wam_hiscore(); break;
                 case 8: wam_about(); break;
                 case 9: wam_credits(); break;
                 case 10: wam_quit(); break; */
                default: break;
            }

            //if (game.state != 3 && game.ResourcesLoaded) // Displayed on all screens during debug/production
                //home.draw(0, game.height-64);

            //if (Press.ed && home.pressed()) { game.state = -1; }

            if (key.left) { Player.x -= 1; Player.momx = -1; Player.controlKeysPressed = true; Player.dirx = LEFT; }
            if (key.right) { Player.x += 1; Player.momx = 1; Player.controlKeysPressed = true; Player.dirx = RIGHT; }
            if (key.up) { }
            if (key.down) { }
            if (key.w) { /* ... */ }
            if (key.s) { /* ... */ }
            if (key.a) { /* ... */ }
            if (key.d) { /* ... */ }

            if (!key.left && !key.right && !key.top && !key.down) {
                Player.controlKeysPressed = false;
            }



            /* Draw misc icons, etc.
             if (game.ResourcesLoaded == true && game.state == -1) {
             if (Sound.available)
             window["icon_sound"].rotscale(170, 540, 0.75,0.75, 0); else
             window["icon_nosound"].rotscale(170, 540, 0.75,0.75, 0);
             icon_controller.rotscale(220, 540,0.75,0.75,0);
             }*/

            ResetAnimationCounter();

            if (!game.ResourcesLoaded) {

                // Do something while game is loading

            } else {
                if (game.state == -1) {
                    //if (LoadingPercent >= 100) {
//                        text("Gemini requires a Tigris game account.", game.width/2, 350, "silver", "center", "13px", "Verdana");
//                        if (Press.ed && debug_nextLvl.pressed()) { game.start(game.level + 1); }
                    //}
                }
            }

            // Always last step...

            window.touched = false;		// reset touch
            window.released = false;	// release touch
            window.clicked = false;		// reset click
            Press.ed = false;			// reset main Press object
            Mouse.down = false;    // reset single frame mouse click
            Mouse.middleclick = false;
            Mouse.rightclick = false;

            gfx.globalAlpha = 1;

        }, 0);



    </script>
</head>
<body>
<style>
    body { margin: 0; }
    * { outline: none; }
    .noselect {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none;   /* Chrome/Safari/Opera */
        -khtml-user-select: none;    /* Konqueror */
        -moz-user-select: none;      /* Firefox */
        -ms-user-select: none;       /* Internet Explorer/Edge */
        user-select: none;           /* Non-prefixed version, currently
                                  not supported by any browser */
    }
    #game { cursor: grab !important; }
    .hidecursor { cursor: none; }
</style>
<div id = "game_container" class = "noselect" style = "position: relative; margin: 0 auto; padding-top: 0px; padding-bottom: 0px;">
    <canvas id = "game"></canvas>
    <?php include("toolbar.php"); ?>
</body>
</html>