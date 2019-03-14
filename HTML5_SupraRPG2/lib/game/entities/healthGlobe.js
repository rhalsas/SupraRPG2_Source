ig.module(
	'game.entities.healthGlobe'
	)
.requires(
	'impact.entity'
	)
.defines(function(){
		EntityHealthGlobe = ig.Entity.extend({
		
		collides: ig.Entity.COLLIDES.NONE,
		checkAgainst: ig.Entity.TYPE.A,
		
		size: {x: 12,y: 12},
		offset: {x: 2,y: 2},
		
		
		healthGet : 0,
        gravityFactor   :  0,
		init: function( x, y, settings ) 
		{
		    this.parent(x, y, settings);
		    this.animSheet = new ig.AnimationSheet('media/PickableItems.png', 16, 16);
			this.addAnim ('idle', 0.25, [4,6,7,8]);
			
			// Should increase with current level
				
			this.healthGet = 20;
				
		
			
		
		},
		
		
		update: function() 
		{
			this.parent();
			
		},
		check: function(other)
		{
                if(other instanceof EntityPlayer){
                                             if(other.health < other.Maxhealth)
                                                {
                                                other.health += this.healthGet;
                                             if(other.health > other.Maxhealth)
                                                {
                                                other.health = other.Maxhealth;
                                                }
                                             }
                }
		
				this.kill();
				
				
			
		}
		});
		
	});