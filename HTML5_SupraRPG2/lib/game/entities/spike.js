ig.module(
	'game.entities.spike'
	)
.requires(
	'impact.entity',
    'impact.entity-pool'
	)
.defines(function(){
		EntitySpike = ig.Entity.extend({
		
		collides: ig.Entity.COLLIDES.FIXED,
		checkAgainst: ig.Entity.TYPE.A,
		
		size: {x: 16,y: 10},
		offset: {x: 0,y: 3},
		maxVel: {x: 0,y: 0},
		
	
	
			
		init: function( x, y, settings ) 
		{
		    this.parent(x, y, settings);
		    this.animSheet = new ig.AnimationSheet('media/traps/spikes.png', 16,16);
			this.addAnim ('idle', 1, [0]);
			
			
		
		
		},
		reset: function (x, y, settings) {
		    this.parent(x, y, settings);
		
		    this.addAnim('idle', 1, [0]);




		},
		
		
		update: function() 
		{
			
			
			
			
			//this.parent();
			
			
			
			
			
			
			
		},
		check: function(other)
		{
			other.receiveDamage(5, this);
			
			
		}
		});
		ig.EntityPool.enableFor(EntitySpike)
	});