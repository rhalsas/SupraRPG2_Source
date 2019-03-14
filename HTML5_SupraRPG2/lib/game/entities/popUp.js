ig.module(
	'game.entities.popUp'
	)
.requires(
	'impact.entity'
	)
.defines(function(){
		EntityPopUp = ig.Entity.extend({
		
		
		
		size: {x: 32, y: 32},
		animSheet: new ig.AnimationSheet('media/POPUP.png', 32, 32),
		
                                       delayTimer: null,
		
		init: function( x, y, settings ) 
		{
			
			this.parent(x, y, settings );
                                       this.delayTimer = new ig.Timer();
                                       this.delayTimer.set(1);
			if(ig.game.typePopUp == "CHEST"){
				this.addAnim( 'idle', 1, [0] );
			}
			else if(ig.game.typePopUp == "DOOR"){
				this.addAnim( 'idle', 1, [0] );
			}
			else if(ig.game.typePopUp == "SIGN"){
				this.addAnim( 'idle', 1, [0] );
                                       }
            else{
                                       this.addAnim( 'idle', 1, [0] );
                                       }
                                       this.addAnim( 'idle', 1, [0]);
                                       console.log("POPUPINITIALIZED");
			ig.game.popUpActivated = this;
		},
		
                                       
		update: function() 
		{
                                    
                                       this.parent();
                                     
                                       if(ig.game.POPUP){
                                     
                                       ig.game.POPUP.anchor.left = (this.pos.x - ig.game.screen.x - 16);
                                       ig.game.POPUP.anchor.top = (this.pos.y- ig.game.screen.y - 16);
                                       ig.game.POPUP.align(this.size.x + 32,this.size.y + 32);
                                       }
                                       },
		
		});
		
	});