ig.module(
	'plugins.touch-button'
)
.requires(
	'impact.system',
	'impact.input',
	'impact.image'
)
.defines(function(){ "use strict";


ig.TouchButton = ig.Class.extend({	
	action: 'undefined',
	
	pos: {x: 0, y: 0},
	size: {x: 0, y: 0},
	area: {x1: 0, y1:0, x2: 0, y2:0},
    image:null,
	pressed: false,	
	touchId: 0,
	anchor: null,
	tile: 0,
	show: false,
	timer: null,
	image2: null,

	tileMax: 0,
    buttonType: 0,
	init: function( action, anchor, width, height, image , tile, tileMax,buttonType, image2) {
		this.action = action;
		this.anchor = anchor;
		this.size = { x: width, y: height };
		
		this.image2 = image2 || null;
		this.image = image || null;
		this.tile = tile || 0;
		this.tileMax = tileMax || this.tile + 1;
		this.buttonType = buttonType || 0;
		//Hack because of the canvas marginal made with ejecta / css styling
                             // this.anchor.top-= (topMargin/gscalinVar);
	
		},
	
	align: function( w, h ) {
		if( 'left' in this.anchor ) {
			this.pos.x = this.anchor.left;
		}
		else if( 'right' in this.anchor ) {
			this.pos.x = w - this.anchor.right - w;
		}
		if( 'top' in this.anchor ) {
			this.pos.y = this.anchor.top;
		}
		else if( 'bottom' in this.anchor ) {
			this.pos.y = h - this.anchor.bottom - h;
		}
		
		var internalWidth = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth;
        var internalHeight = parseInt(ig.system.canvas.offsetHeight) || ig.system.realHeight;
		var s_w = ig.system.scale * (internalWidth / ig.system.realWidth);
        var s_h = ig.system.scale * (internalHeight / ig.system.realHeight);
                                 
                                
		this.area = {
		    x1: this.pos.x * s_w * gscalinVar, y1: this.pos.y * s_h * gscalinVar,
			x2: (this.pos.x + this.size.x) * s_w * gscalinVar, y2: (this.pos.y + this.size.y) * s_h * gscalinVar
		};
	},
	
	touchStart: function (ev, num) {
	   
		if( this.pressed ) { return; }
		
		var pos = {left: 0, top: 0};
		if( ig.system.canvas.getBoundingClientRect ) {
			pos = ig.system.canvas.getBoundingClientRect();
		}
                                 
		for( var i = 0; i < ev.touches.length; i++ ) {
			var touch = ev.touches[i];
			if( this.checkStart(touch.identifier, touch.clientX - pos.left, touch.clientY - pos.top,num) ) {
				return;
			}
		}
	},
	
	touchEnd: function( ev ) {
		if( !this.pressed ) { return; }
		
		for( var i = 0; i < ev.changedTouches.length; i++ ) {
			if( this.checkEnd(ev.changedTouches[i].identifier) ) {
				return;
			}
		}
	},
	
	touchStartMS: function (ev) {
	  
		if( this.pressed ) { return; }
		
		var pos = {left: 0, top: 0};
		if( ig.system.canvas.getBoundingClientRect ) {
			pos = ig.system.canvas.getBoundingClientRect();
		}
	    try {
	       
	        this.checkStart(ev.pointerId, ev.clientX - pos.left, ev.clientY - pos.top);
	    }
	    catch (e) {
	        console.log(e, " ERROR");
	    }
	},
	
	touchEndMS: function( ev ) {
		if( !this.pressed ) { return; }
		
		this.checkEnd(ev.pointerId);
	},
	
	checkStart: function (id, x, y, num) {
	   
		if( 
			x > this.area.x1 && x < this.area.x2 &&
			y > this.area.y1 && y < this.area.y2
		) {
		 
			this.pressed = true;
			this.touchId = id;
			ig.input.actions[this.action] = true;
			if( !ig.input.locks[this.action] ) {
				ig.input.presses[this.action] = true;
				ig.input.locks[this.action] = true;
			}
			return true;
		}
		
		return false;
	},
	
	checkEnd: function( id ) {
		if( id === this.touchId ) {
			this.pressed = false;
			this.touchId = 0;
			ig.input.delayedKeyup[this.action] = true;				
			return true;
		}
		
		return false;
	},
	toggleButton: function (bool) {
	    this.show = bool;
	    
	},
	checkAndDraw: function(boolVal){
	    if (boolVal) {
	        if (this.pressed) this.image.drawTile(this.pos.x, this.pos.y, this.tile + 1, this.size.x, this.size.y);
	        else { this.image.drawTile(this.pos.x, this.pos.y, this.tile, this.size.x, this.size.y); }
	    }
	    else {
	        if (this.pressed) this.image2.drawTile(this.pos.x, this.pos.y, this.tile + 1, this.size.x, this.size.y);
	        else { this.image2.drawTile(this.pos.x, this.pos.y, this.tile, this.size.x, this.size.y); }
	    }

	},
	draw: function () {
	    
	    if (this.image && this.show === true) {
	      

	        if (this.buttonType === 0
               ) {

	            
	            if (this.pressed) this.image.drawTile(this.pos.x, this.pos.y, this.tile + 1, this.size.x, this.size.y);
	            else { this.image.drawTile(this.pos.x, this.pos.y, this.tile, this.size.x, this.size.y); }
	        }
	        else if (this.buttonType === 1) {
	            this.image.drawTile(this.pos.x, this.pos.y, this.tile, this.size.x, this.size.y);

	            if (!this.timer) {
	                this.timer = new ig.Timer();
	                this.timer.set(0.05);
	            }
	            else if (this.timer.delta() > 0) {
	                this.timer.set(0.05);
	                if (this.goingBack === true) {
	                    this.tile--;
	                }
	                else {
	                    this.tile++;
	                }
	                if (this.tile > this.tileMax - 1) {
	                    this.goingBack = true;
	                    this.tile = this.tileMax - 1;
	                }
	                else if (this.tile < 0) {
	                    this.goingBack = false;
	                    this.tile = 0;
	                }
	            }

	        }

	      

	       
                //Double jump mechanism
	        else if (this.buttonType === 2) {
	         
	            if (ig.game.player) this.checkAndDraw(ig.game.player.standing);
	            
	        }
	            //Music button mechanism
	        else if (this.buttonType === 3) {

	           this.checkAndDraw(isMusicOn);

	        }
	        else if (this.buttonType === 4) {

	           this.checkAndDraw(ig.game.equip_menu_swords);

	        }
	        else if (this.buttonType === 5) {

	           this.checkAndDraw(ig.game.equip_menu_shields);
	        }
	        else if (this.buttonType === 6) {

	            this.checkAndDraw(ig.game.equip_menu_armor);
	        }
	        else if (this.buttonType === 7) {

	            this.checkAndDraw(ig.game.gameSaved1);
	        }
	        else if (this.buttonType === 8) {

	            this.checkAndDraw(ig.game.gameSaved2);
	        }
	        else if (this.buttonType === 9) {

	            this.checkAndDraw(ig.game.gameSaved3);
	        }

	        else if (this.buttonType === 10) {

	            this.checkAndDraw((client.currentUser && CloudSyncOn));
              
	        }
	    
	       
	    }
	}

});



ig.TouchButtonCollection = ig.Class.extend({
	//buttons: [],
	perfButtons: new store_buttons(),


	init: function( buttons ) {
	    
	    for (var i = 0; i < buttons.length; i++) {
	        this.perfButtons.push(buttons[i]);
	    }
		
		//document.addEventListener('touchstart', this.touchStart.bind(this), false);
		//document.addEventListener('touchend', this.touchEnd.bind(this), false);
		
	    //document.addEventListener('MSPointerDown', this.touchStartMS.bind(this), false);
	    //document.addEventListener('MSPointerUp', this.touchEndMS.bind(this), false);

		document.addEventListener('pointerdown', this.touchStartMS.bind(this), false);
		document.addEventListener('pointerup', this.touchEndMS.bind(this), false);
		document.body.style.msTouchAction = 'none';
	},
    removeButton: function(btn) {
   
        if (btn && btn.action) {
            this.perfButtons.erase(btn.action);
        }
        /*                                   var touchL = this.buttons.length;
                                           
                                           for(var i = 0; i < touchL; i++){
                                           //   window.myTouchButtons.buttons.splice(0,touchL);
                                           if(this.buttons[i].action === btn){
                                           //this.buttons[i].kill();
                                           this.buttons.erase(this.buttons[i]);
                                        
                                           this.removeButton(btn);
                                           
                                           
                                           break;
                                           }
                                           }*/
                                           
    },
                                           removeAllButtons: function(){
                                               // this.buttons.splice(0,this.buttons.length);

                                               this.perfButtons = {};
                                           },
	/*touchStart: function(ev) {
		ev.preventDefault();
	    //ev.stopPropagation();

      
		for( var i = 0; i < this.buttons.length; i++ ) {
			this.buttons[i].touchStart( ev ,i);
                                          
                                        
		}
	},
	
	touchEnd: function(ev) {
		ev.preventDefault();
		//ev.stopPropagation();
		for( var i = 0; i < this.buttons.length; i++ ) {
			this.buttons[i].touchEnd( ev );
		}
	},*/
	
	touchStartMS: function (ev) {
	    
		ev.preventDefault();
		ev.stopPropagation();

		for (var val in this.perfButtons) {
		    if (val != "push" && val != "erase") {
		        this.perfButtons[val].touchStartMS(ev);
		    }
		}
	   
        /*
	    for (var i = 0; i < this.buttons.length; i++) {
	        this.buttons[i].pressed = false;
	        this.buttons[i].touchStartMS( ev );
	    }*/
	    
	    
	},
	
	touchEndMS: function(ev) {
	    ev.preventDefault();
	    ev.stopPropagation();

	    for (var val in this.perfButtons) {
	        if (val != "push" && val != "erase") {
	            this.perfButtons[val].touchEndMS(ev);
	        }
	    }
		/*for( var i = 0; i < this.buttons.length; i++ ) {
			this.buttons[i].touchEndMS( ev );
		}*/
	},
	
	align: function() {
		var w = ig.system.width || window.innerWidth;
		var h = ig.system.height || window.innerHeight;

		for (var val in this.perfButtons) {
           
		    if (val !== "push" && val !== "erase") {
             
		        this.perfButtons[val].align(w, h);
		  
		    }
		}

		/*
		for( var i = 0; i < this.buttons.length; i++ ) {
			this.buttons[i].align( w, h );
		}*/
	},
	searchButton: function (name, bool) {
	    var found = false;
	    if (this.perfButtons[name]) {
	        this.perfButtons[name].toggleButton(bool);
	       
	        found = true;
	    }
	   /* for (var i = 0; i < this.buttons.length; i++) {
	        if (this.buttons[i].action === name) {
	            this.buttons[i].toggleButton(bool);
	            found = true;
	            break;
	        }
	     
	    }*/
	    if (!found) console.log("Didn't find button:", name);
	},
	toggleByString: function (value, bool) {

	    if (this.perfButtons[value]) {
	        this.perfButtons[value].toggleButton(bool);
	    }
        /*
	    for (var i = 0; i < this.buttons.length; i++) {

	        if (this.buttons[i].action.indexOf(value) > -1) this.buttons[i].toggleButton(bool);
	    }*/
	    
	},
	draw: function () {

	    for (var val in this.perfButtons) {
	        if (val != "push" && val != "erase") {
	            this.perfButtons[val].draw();
	        }
	    }

	    /*for (var i = 0; i < this.buttons.length; i++) {
	  
	        this.buttons[i].draw();
	    }*/
	}
});


});
