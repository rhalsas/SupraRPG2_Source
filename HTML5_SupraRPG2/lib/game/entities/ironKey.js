ig.module(
	'game.entities.ironKey'
	)
.requires(
	'impact.entity'
	)
.defines(function(){
		EntityIronKey = ig.Entity.extend({
		
		collides: ig.Entity.COLLIDES.PASSIVE,
		checkAgainst: ig.Entity.TYPE.A,
                                         name: 'ironKey',
		size: {x: 24,y: 11},
		offset: {x: 4,y:10},
		maxVel: {x: 0,y: 0},
		
		goldGet : 0,
			
		init: function( x, y, settings ) 
		{
		    this.animSheet = new ig.AnimationSheet('media/BiggerItems.png', 32, 32);
			this.parent(x, y, settings );
			this.addAnim ('idle', 1, [2]);
                                      
                                     
		
		},
		
		
		update: function() 
		{
			   if(ig.game.player){    if(1 <= ig.game.player.ironKey){ig.game.player.ironKey = 1; this.kill();}}
			
		},
		check: function(other)
		{
			// Increase gold and update gold status
				
				other.ironKey += 1;
				// Play sound that you want to hear when you get gold
				this.kill();
				
				
			
		}
		});
		
	});