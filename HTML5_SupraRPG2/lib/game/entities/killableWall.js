ig.module(
	'game.entities.killableWall'
	)
.requires(
	'impact.entity',
    'impact.entity-pool'
	)
.defines(function(){
		EntityKillableWall = ig.Entity.extend({
		
		collides: ig.Entity.COLLIDES.FIXED,
		type: ig.Entity.TYPE.B,
		
		size: {x: 16,y: 16},
		offset: {x: 0,y: 0},
		friction: {x: 0, y: 0},
		name: "Wall",
		isBossWall: 0,

		gravity: 0,
		maxVel: {x: 0, y: 0},
		health: 20,
		elevatorIsEnd: false,
		elevatorIsStart: false,
		elevatorDistance: 2,	
		vel: {x:0,y:0},
		gravityFactor: 0,
		
		init: function( x, y, settings ) 
		{
		   
		    this.parent(x, y, settings);
		    this.animSheet = new ig.AnimationSheet('media/crushableWall.png', 16, 16);
		    if (this.isBossWall === 1) {
		        this.addAnim('idle', 1, [1]);
		        this.name = "BossWall";
		        this.immunity = true;
		    }
		    else {
		        this.addAnim('idle', 1, [0]);
		    }
			
		
			
			// Should increase with current level
		
			
			
			
			this.gravityFactor = 0;
			
			
		},
		reset: function (x, y, settings) {
		   
		    this.parent(x, y, settings);
		    if (this.isBossWall) {
		        this.addAnim('idle', 1, [1]);
		        this.name = "BossWall";
		    }
		    else {
		        this.addAnim('idle', 1, [0]);
		    }
	
		    // Should increase with current level
		 


		    this.gravityFactor = 0;


		},
		
		
		update: function() 
		{
		    
			
			this.parent();
			
		},
      	kill: function () {
            this.parent();
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 2 });
            ig.game.removeEntity(this);
        }
		});
		
	});