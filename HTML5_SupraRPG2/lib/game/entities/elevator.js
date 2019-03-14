ig.module(
	'game.entities.elevator'
	)
.requires(
	'impact.entity',
    'impact.entity-pool'
	)
.defines(function(){
		EntityElevator = ig.Entity.extend({
		
		collides: ig.Entity.COLLIDES.FIXED,
		checkAgainst: ig.Entity.TYPE.A,
		
            name: 'notNPC',
		size: {x: 26,y: 3},
		offset: {x: 3,y: 15},
		friction: {x: 0, y: 0},
		delayTimer: null,
		gravity: 0,
		maxVel: {x: 300, y: 300},
		elevatorIsEnd: false,
		elevatorIsStart: false,
		elevatorDistance: 4,	
		vel: {x:0,y:-20},
		counterGravity: 0,
		allowedToMove: true,
            isTouchMove: 0,
		init: function( x, y, settings ) 
		{
		   
		    this.parent(x, y, settings);
		    this.animSheet = new ig.AnimationSheet('media/Elevator.png', 32, 32);
			this.addAnim ('idle', 1, [0]);
			this.delayTimer = new ig.Timer();
			
			// Should increase with current level
			this.counterGravity = ig.game.gravity;
			
			
			
			this.gravityFactor = 0;
			if (this.isTouchMove === 1) {
			    this.allowedToMove = false;
			}
			else {
			    this.delayTimer.set(this.elevatorDistance);
			}
			
		},
		reset: function (x, y, settings) {
		   
		    this.parent(x, y, settings);
		    this.addAnim('idle', 1, [0]);
		    this.delayTimer = new ig.Timer();

		    // Should increase with current level
		    this.counterGravity = ig.game.gravity;

		    

		    this.gravityFactor = 0;
		    if (this.isTouchMove === 1) {
		        this.allowedToMove = false;
		    } else {
		        this.delayTimer.set(this.elevatorDistance);
		    }

		},
		
		
		update: function() 
		{
		 
		    if (!this.allowedToMove) return;
		

		    if (this.elevatorIsStart === false) {
		        this.delayTimer.set(this.elevatorDistance);


		       

		        this.elevatorIsStart = true;
		       
		    }
		    else if (this.delayTimer.delta() > 0) {
		      
		        this.vel.y *= -1;
		        this.vel.x *= -1;
		        this.elevatorIsStart = false;
		    }
			
			
			
			
			
			if (ig.game.player) {
			  
			    if ((ig.game.player.pos.y >= this.pos.y - 32) && (ig.game.player.pos.y <= this.pos.y) && (ig.game.player.pos.x >= this.pos.x - 2) && (ig.game.player.pos.x <= this.pos.x + 32)) {
			        ig.game.player.accel.x = 0; ig.game.player.onElevator = true;
			    }
                  
			}
		
			this.parent();
			
		},

		    check: function(other) 
		{
		    
		    
		        if(other instanceof EntityPlayer)
		        {
		            this.allowedToMove = true;
		         
		        }
			
		    }
		    

        
		});
		ig.EntityPool.enableFor(EntityElevator);
	});