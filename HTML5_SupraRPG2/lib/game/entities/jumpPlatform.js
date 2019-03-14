ig.module(
	'game.entities.jumpPlatform'
	)
.requires(
	'impact.entity',
    'impact.entity-pool'
	)
.defines(function(){
		EntityJumpPlatform = ig.Entity.extend({
		
		collides: ig.Entity.COLLIDES.FIXED,
		checkAgainst: ig.Entity.TYPE.A,
		
		size: {x: 26,y: 3},
		offset: {x: 3,y: 15},
		friction: {x: 0, y: 0},
		delayTimer: null,
		gravity: 0,
		maxVel: {x: 0, y: 0},
		launchVel: -500,
		elevatorIsEnd: false,
		elevatorIsStart: false,
		elevatorDistance: 2,	
		vel: {x:0,y:0},
		counterGravity: 0,
		launchedObject: false,
		init: function( x, y, settings ) 
		{
		   
		    this.parent(x, y, settings);
		    this.animSheet = new ig.AnimationSheet('media/JumpPlatform.png', 32, 32);
			this.addAnim ('idle', 1, [0]);
			this.delayTimer = new ig.Timer();
			
			// Should increase with current level
			this.counterGravity = ig.game.gravity;
			
			
			
			this.gravityFactor = 0;
			
			
		},
		reset: function (x, y, settings) {
		   
		    this.parent(x, y, settings);
		    this.addAnim('idle', 1, [0]);
		    this.delayTimer = new ig.Timer();

		    // Should increase with current level
		    this.counterGravity = ig.game.gravity;


		    this.gravityFactor = 0;


		},
		
		
		update: function() 
		{
		    
			
			this.parent();
			
		},
		check: function(other){
			
		    if (other && other instanceof EntityPlayer && other.velLaunch && other.pos.y <= this.pos.y) {
		        other.velLaunch = this.launchVel;
		    }
			
			if(this.launchedObject === false){
				
				
				this.delayTimer.set(1);
				this.launchedObject = true;
			}
			if(this.delayTimer.delta() > 0)
			{
				this.launchedObject = false;
			}
			 
		}
      
		});
		
	});