ig.module(
	'game.entities.redgoblin'
	)
.requires(
	'game.entities.goblin'
	)
.defines(function(){
		EntityRedgoblin = EntityGoblin.extend({
			
			
			delayJump: null,
			
			ATK: 45,
			health: 150,
			healthBuffer: 0,
			actHealth: 150,
			deadMonster: false,
            burningTouch: true,
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
			
				this.EXP_BOUNTY = 50;
				// Animation for the Enemy1
                                               this.addAnim('idle', 0.07, [84,85, 86,87, 88,89]);
                                               this.addAnim('attack', 0.1, [90, 91]);
			},
			reset: function (x, y, settings) {
			    this.parent(x, y, settings);
			    
			    this.Maxhealth = this.health;
			    this.Maxmana = this.mana;
		
			    this.speed = 40;
			    this.HP_REGEN = 6;
			    this.healthBuffer = this.health;

			    this.EXP_BOUNTY = 50;
			    // Animation for the Enemy1
			    this.addAnim('idle', 0.07, [84, 85, 86, 87, 88, 89]);
			    this.addAnim('attack', 0.1, [90, 91]);
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
		ig.EntityPool.enableFor(EntityRedgoblin);
	
});