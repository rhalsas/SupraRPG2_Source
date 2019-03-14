var TOUCHINGJOYSTICK = false;
var isTrial = true;
var DEBUG = true;
var gscalinVar = 1;
var topMargin = 0;
var checkIfReview = 0;
var checkedAlready = 'false';
var checkedAlreadyTwice = 'false';
var OSVERSION = "7Pre";
var isMusicOn = true;
var sellPromptInvoked = false;
var welcomeInvoked = false;
var welcomeTimer = 0;
var continueChecking = false;
var restoreTransactionInvoked = false;
var alignOnce = true;
var controller = null;
var controller2 = null;
var controller3 = null;
var controller4 = null;
var state = null;
var state2 = null;
var state3 = null;
var state4 = null;
var LevelSelectSkip = false;
var LevelSelectOptionSkip = 0;
var informUnlock = 0;
var accountHardCurrency = 0;

var difficultyAvailable = 3;
var difficultyLevel = 0;


var _uniqueID = 0;
function Buttons() {

    this.controller = null;
    this.state = null;
    this.a_button = new Button();
    this.b_button = new Button();
    this.x_button = new Button();
    this.y_button = new Button();
    this.start_button = new Button();

    this.SetController = function(controller) {
        this.controller = controller;
    }
    this.Update = function() {


        this.state = this.controller.getState();

        if (!this.state) return;

        this.a_button.Update(this.state.a);
        this.b_button.Update(this.state.b);
        this.x_button.Update(this.state.x);
        this.y_button.Update(this.state.y);
        this.start_button.Update(this.state.start);

        return this.state;
    }

    function Button() {

        this.down = false;
        this.pressed = false;
        //this.is_up = true;

        this.Update = function (isTrue) {
            if (this.down === false && isTrue === true) { this.down = true; this.pressed = true;}
            else if (this.down === true && isTrue === true) { this.pressed = false; }
            else if (this.down === true && isTrue === false) { this.down = false; }

        }
        
    }

}

var special = function () {

    this.push = function (val) {
        this[val] = true;
    }
    
};

var store_buttons = function () {

    this.push = function (val) {
        this[val.action] = val;
    }
    this.erase = function (name) {
        if (this[name]) delete this[name];
    }
};

var buttons = new Buttons(null);
ig.module(
	'game.main'
)
.requires(

    'game.helpers',
    'impact.game',
     'plugins.minimap',
	//'plugins.webgl-2d',
    'bootstrap.plugins.pause',
	
    //'bootstrap.platforms.win8',
    'plugins.impact-splash-loader',
  

	//'plugins.fadein',
    'game.screens.myGame',
    'impact.entity-pool',

   // 'impact.debug.debug',
	'impact.font'
)
    .defines(function () {

        ig.System.inject({
            setGameNow: function (gameClass, startLevel) {
                ig.game = new (gameClass)(startLevel);
                ig.system.setDelegate(ig.game);
            },
        });
        appInit();
        checkLicence();
        /*
        try{
        //    controller = new GameController.Controller(0);
        }
        catch (e) { console.log("nope");}
        if (controller) buttons.SetController(controller);
   */
       //  localStorage.clear();
 
        if (localStorage.getItem('SUPRARPG_GOLD')) {
            accountHardCurrency = parseInt(localStorage.getItem('SUPRARPG_GOLD'));
        }

      
      
        var newHeight = 160;
        var newWidth = 267;
        var scalinVar = 1;
        
        scalinVar = Math.floor(window.innerHeight / newHeight);
        
      
        gscalinVar = scalinVar;
        ts_width = 267 * gscalinVar * 1.005;
        ts_height = 160 * gscalinVar * 1.005;
        //topMargin = window.innerHeight - (newHeight* scalinVar)
        //canvas.style.width = (newWidth * scalinVar) + "px";
        //canvas.style.height = (newHeight *scalinVar) + "px";
       // canvas.style.width = window.innerWidth + 'px';
       // canvas.style.height = window.innerHeight + 'px';
      
        //canvas.style.top = topMargin;
        canvas.retinaResolutionEnabled = true;

       
  
        ig.main('#canvas', MyGame, 60, newWidth * scalinVar, newHeight * scalinVar, 1, ig.ImpactSplashLoader);
        canvas.getContext("2d").scale(scalinVar, scalinVar);

        
       
        widthBuf = (window.innerWidth > screen.height) ? window.innerWidth : screen.height;

       
        heightBuf = (window.innerWidth > screen.height) ? window.innerHeight : screen.width;
       // canvas.style.width = widthBuf   + 'px';
       // canvas.style.height = heightBuf +   'px';

        document.getElementById('canvas').focus();
 
       
    });
