ig.module(
	'game.entities.lavaGFX'
	)
.requires(
	'impact.entity',
    'impact.entity-pool'
	)
.defines(function(){
		EntityLavaGFX = ig.Entity.extend({
		
		collides: ig.Entity.COLLIDES.NONE,
	
		
		size: {x: 32,y: 32},
		offset: {x: 0,y: 3},
		maxVel: {x: 0,y: 0},
		gravityFactor: 0,
		delayTimer: null,
	
			
		init: function( x, y, settings ) 
		{
		    this.parent(x, y, settings);
		
			this.delayTimer = new ig.Timer();
			this.animSheet = new ig.AnimationSheet('media/lavaGFX.png', 32, 32);
			this.addAnim('idle', 0.1, [0, 1, 2, 3, 4]);
			this.delayTimer.set(0.3);
			this.anims.idle.rewind();
		},
		reset: function (x, y, settings) {
		    this.parent(x, y, settings);
	
			this.delayTimer = new ig.Timer();
			this.animSheet = new ig.AnimationSheet('media/lavaGFX.png', 32, 32);
			this.addAnim('idle', 0.1, [0, 1, 2, 3, 4]);
			this.delayTimer.set(0.3);
			this.anims.idle.rewind();

		},
		
		
		update: function() 
		{
			
			
			
			
			this.parent();
			
			if(this.delayTimer.delta() > 0)
			{
				this.kill();
				
			}
			
			
			
			
			
			
		},
		
		});
		ig.EntityPool.enableFor(EntityLavaGFX)
	});