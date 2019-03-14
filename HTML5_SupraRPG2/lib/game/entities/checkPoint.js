ig.module(
	'game.entities.checkPoint'
	)
.requires(
	'impact.entity'
	)
.defines(function(){
		EntityCheckPoint = ig.Entity.extend({
		/*Supra RPG By Rasmus Halsas 10.8.2013*/
		_wmDrawBox: true,
		_wmBoxColor: 'rgba(0, 0, 255, 0.7)',
		size: {x: 19, y: 25},
		level: null,
		x_coord: 0,
		y_coord: 0,
        name: "notNPC",
       
	
		isActive: false,
        instantTravel: 0,
		checkAgainst: ig.Entity.TYPE.A,
	
		init: function( x, y, settings ) 
		{


		    this.parent(x, y, settings);
		   
		    this.animSheet = new ig.AnimationSheet('media/Effects/Level/checkPointTorch.png', 16, 16);
		    this.multiplier = 1;
		    this.addAnim('idle', 1, [0]);
		    this.addAnim('active', 0.3, [1, 2, 3]);
		    
		    
		},
		
		
		update: function() 
		{
		    this.parent();
		    if (this.isActive && this.currentAnim !== this.anims.active) {
		        this.currentAnim = this.anims.active;
		    }
		},
		check: function(other)
		{
		    this.allowedToChange = true;
		    if (ig.game.player) {
                                           
                                           
		        if (other instanceof EntityPlayer) {

		            if (!this.isActive) {
		                ig.game.saveGame(other); this.isActive = true;
		            }
                   
                }
            }
		}
		});
		
	});