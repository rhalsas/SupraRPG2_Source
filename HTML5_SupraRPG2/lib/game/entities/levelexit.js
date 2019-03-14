ig.module(
	'game.entities.levelexit'
	)
.requires(
	'impact.entity'
	)
.defines(function(){
		EntityLevelexit = ig.Entity.extend({
		/*Supra RPG By Rasmus Halsas 10.8.2013*/
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(0, 0, 255, 0.7)',
		size: {x: 19, y: 25},
		level: null,
		x_coord: 0,
		y_coord: 0,
                                             name: "clickable",
        multiplier: 1,
		ironKeyNeeded: false,
		allowedToChange: true,
		checkPoint: 0,
		isTravel: 0,
        instantTravel: 0,
		checkAgainst: ig.Entity.TYPE.A,
		isGoingUp: 0,
            gfx: '',
		init: function( x, y, settings ) 
		{
        this.parent(x, y, settings);
		   this.multiplier = 1;
	
		    
		    
		},
		
		
		update: function() 
		{
                                 
		},
		check: function(other)
		{
		    this.allowedToChange = true;
		    if (ig.game.player != null) {
                                           
                                           
		        if (other instanceof EntityPlayer) {

		          
                    ig.game.showPopUp = true;
                    ig.game.currentX = this.pos.x;
                                           ig.game.currentY = this.pos.y;
                                           ig.game.typePopUp = "DOOR";
                                           if(ig.game.POPUP){
                                           
                                           ig.game.POPUP.anchor.left = (this.pos.x - ig.game.screen.x);
                                           ig.game.POPUP.anchor.top = (this.pos.y- ig.game.screen.y - 32);
                                           ig.game.POPUP.align(this.size.x,this.size.y);
                                           }
                if (this.ironKeyNeeded && ig.game.player.ironKey === 0) { ig.game.typePopUp = "KEYDOOR"; }
                else if (this.isTravel === 1) {
                    ig.game.typePopUp = "TRAVEL";
                }
              
                if ((this.instantTravel === 1) || ((ig.input.released("popup") ) && ig.game.delayChangeLevel.delta() > 0 && ig.game.menuOpen())) {
                                        
              
                        if (this.ironKeyNeeded) { if (ig.game.player.ironKey > 0) { ig.game.player.ironKey = 0; } else { this.allowedToChange = false; } }
                        if (this.level && this.allowedToChange) {
                        
                            //check if selectio value changed
                            if (this.checkPoint > 0) {
                            
                                ig.game.getSelectionUp(this.checkPoint);
                                ig.game.screenFader = new ig.ScreenFader({ fade: 'in', speed: 2.0 });
                                ig.game.soft_paused = true;
                                //  ig.game.bossKill_Event = true;
                                LevelSelectOptionSkip = this.checkPoint;
                                OptionElementsTo(false);
                                HUDElementsTo(false);
                                ig.game.saveGame(ig.game.player);
                                saveSkip = ig.game.saveSlot;
                                LevelSelectSkip = true;

                                ig.system.setGame(MyGame);
                            }
                         
                       

		                var levelName = this.level.replace(/^(Level)?(\w)(\w*)/, function (m, l, a, b) {
		                    return a.toUpperCase() + b;
		                });
		                ig.game.currentLevel = 'Level' + levelName;
		                ig.game.data_packet = { x_coord: this.x_coord, y_coord: this.y_coord }
		                ig.game.soft_paused = true;
		          
		                if (this.isGoingUp === 1) {
		                    if(other)ig.game.isGoingUp = other.vel.y;
		                }

		                ig.game.screenFader = new ig.ScreenFader({
		                    fade: 'in', speed: 2.0, callback: function () {
		                       
		                        ig.game.delayChangeLevel.set(0.5);
		                     
		                        ig.game.levelReseted = true;
		                       		                        
		                        ig.game.InvokedChangeLevel = true;
		                       
		                    }
		                });
		                 
                        checkIfReview += 1;
		                //ig.game.loadLevel(ig.global['Level' + levelName]);
                      
		                
		               // var another_player = ig.game.getEntityByName('player1')[0];
		               
		               

                        }
                    }
                }
            }
		},
		extractName: function(array) {
				var newArray = new Array();
				for (var i = 0; i < array.length; i++) {
            newArray.push(array[i].itemName);
           
			}
        return newArray;
		}
		});
		
	});