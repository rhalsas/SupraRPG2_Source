ig.module(
	'game.entities.infoStand'
	)
.requires(
	'impact.entity'
	)
.defines(function(){
		EntityInfoStand = ig.Entity.extend({
		
		
		
		size: {x: 32, y: 32},
		
		  name: "clickable",
		Text_1: '',
		Text_2: '',
		Text_3: '',
		Text_4: '',
		Text_5: '',
		Text_6: '',
		checkAgainst: ig.Entity.TYPE.A,
		
		init: function( x, y, settings ) 
		{
			this.parent(x, y, settings );
                                          
		
		},
		
		
		update: function() 
		{
                                          
                                        
                                           },
		check: function(other)
		{
          
			if(other instanceof EntityPlayer)
			{
                                           ig.game.showPopUp = true;
                                           ig.game.currentX = this.pos.x;
                                           ig.game.currentY = this.pos.y;
                                           ig.game.typePopUp = "SIGN";
                                           if(ig.game.POPUP){
                                           
                                           ig.game.POPUP.anchor.left = (this.pos.x - ig.game.screen.x);
                                           ig.game.POPUP.anchor.top = (this.pos.y- ig.game.screen.y - 16);
                                           ig.game.POPUP.align(this.size.x,this.size.y);
                                           }
				ig.game.InfoStandAreaCounter++;
				
                                          
                                           
				
                                           ig.game.checkPopUpPress(this.Text_1,
                                                                   this.Text_2,
                                                                   this.Text_3,
                                                                   this.Text_4,
                                                                   this.Text_5,
                                                                   this.Text_6
                                                                   );

                                         
				}
			
			
			
		}
		});
		
	});