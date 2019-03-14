ig.module(
	'game.entities.bluegoblin'
	)
.requires(
	'game.entities.goblin'
	)
.defines(function(){
		EntityBluegoblin = EntityGoblin.extend({
			
			
			delayJump: null,
			
			ATK: 40,
			health: 100,
			healthBuffer: 0,
			actHealth: 100,
			deadMonster: false,
			init: function(x,y,settings){
				this.parent(x, y, settings );
				this.animSheet = new ig.AnimationSheet('media/Enemies/Zombies.png', 16, 16);
				this.delayATKCD = new ig.Timer();
				this.delayAnim = new ig.Timer();
				this.delayJump = new ig.Timer();
				this.Maxhealth = this.health;
				this.Maxmana = this.mana;
		
				this.speed = 40;
				this.HP_REGEN = 6;
				this.healthBuffer = this.health;
			
				this.EXP_BOUNTY = 35;
				// Animation for the Enemy1
                                               this.addAnim('idle', 0.07, [72, 73, 74, 75, 76, 77]);
                                               this.addAnim('attack', 0.1, [78, 79]);
			},
			reset: function (x, y, settings) {
			    this.parent(x, y, settings);
			    
			    this.Maxhealth = this.health;
			    this.Maxmana = this.mana;
			 
			    this.speed = 40;
			    this.HP_REGEN = 6;
			    this.healthBuffer = this.health;

			    this.EXP_BOUNTY = 35;
			    // Animation for the Enemy1
                                               this.addAnim('idle', 0.07, [72, 73, 74, 75, 76, 77]);
                                               this.addAnim('attack', 0.1, [78, 79]);
			},
			kill: function(){
			    this.parent();
			   ig.game.player.killEvents.blue_zombieKills += 1; ig.game.player.killEvents.green_zombieKills -= 1;
			    ig.game.spawnEntity(EntityDeathExplosion, this.pos.x,this.pos.y,{colorOffset: 4} );
			},
			update: function()
			{
				
				
			if(this.delayAnim.delta() < 0){this.currentAnim = this.anims.attack;}
			if(this._ready == false && this.CDtimerset == false){this.delayATKCD.set(1); this.CDtimerset = true;}
			
			if(this.delayATKCD.delta() > 0 && this._ready == false){ this._ready = true; this.CDtimerset = false;}
		
			
		
			// near edge? return!
			if(this.delayAnim.delta() > 0){
			
			
			
			this.currentAnim = this.anims.idle;
			}
			this.currentAnim.flip.x = this.flip;
			this.parent();
			}
			
				
		});
		ig.EntityPool.enableFor(EntityBluegoblin);
	
});