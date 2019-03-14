ig.module(
	'game.entities.gold'
	)
.requires(
	'impact.entity',
    'impact.entity-pool'
	)
.defines(function(){
		EntityGold = ig.Entity.extend({
		
		collides: ig.Entity.COLLIDES.NONE,
		checkAgainst: ig.Entity.TYPE.A,
		
		size: {x: 4,y: 8},
		offset: {x: 2,y: 0},
	
		delayTimer: null,
		gravity: 0,
		maxVel: {x: 100, y: 100},
	
	    name: 'notNPC',
		vel: {x:0,y:-100},
		counterGravity: 0,
		launchedObject: false,
		init: function( x, y, settings ) 
		{
		   
		    this.parent(x, y, settings);
		    this.animSheet = new ig.AnimationSheet('media/Gold.png', 8, 8);
			this.addAnim ('idle', 1, [0]);
			this.delayTimer = new ig.Timer();
			
			// Should increase with current level
		
			
			
		},
		reset: function (x, y, settings) {
		   
		    this.parent(x, y, settings);
		    this.addAnim('idle', 1, [0]);
		    this.delayTimer = new ig.Timer();

		    // Should increase with current level
	


		},
		
		
		update: function() 
		{
		    
			
			this.parent();
			
		},
		check: function (other) {

		    if (other && other instanceof EntityPlayer) {

		        accountHardCurrency += 1;
		        localStorage.setItem('SUPRARPG_GOLD', accountHardCurrency);
		        this.kill();
		    }
		}
      
		});
		
	});