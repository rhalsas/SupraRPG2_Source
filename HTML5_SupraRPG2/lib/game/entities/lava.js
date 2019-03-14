ig.module(
	'game.entities.lava'
	)
.requires(
	'impact.entity',
          'game.entities.lavaGFX',
    'impact.entity-pool'
	)
.defines(function(){
		EntityLava = ig.Entity.extend({
		
		collides: ig.Entity.COLLIDES.NONE,
		checkAgainst: ig.Entity.TYPE.A,
		
		size: {x: 32,y: 32},
		offset: {x: 0,y: 3},
		maxVel: {x: 0,y: 0},
		gravityFactor: 0,
		delayTimer: null,
	
			
		init: function( x, y, settings ) 
		{
		    this.parent(x, y, settings);
		
			this.delayTimer = new ig.Timer();
			
			this.delayTimer.set(2);
		
		},
		reset: function (x, y, settings) {
		    this.parent(x, y, settings);
	
			this.delayTimer = new ig.Timer();
			
			this.delayTimer.set(2);


		},
		
		
		update: function() 
		{
			
			
			
			
			this.parent();
			
			if(this.delayTimer.delta() > 0)
			{
				var rand_number = Math.floor(Math.random() * 3);
				this.delayTimer.set(1 + rand_number);
				var rand_number_2 = Math.floor(Math.random() * (this.size.x - 16)) ;
				ig.game.spawnEntity(EntityLavaGFX, this.pos.x + (rand_number_2), this.pos.y - 24);
				
			}
			
			
			
			
			
			
		},
		check: function(other)
		{
			other.receiveDamage(15, this);
			
			
		}
		});
	    ig.EntityPool.enableFor(EntityLava)
	});