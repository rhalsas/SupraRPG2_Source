ig.module(
	'game.entities.armoredgoblin'
	)
.requires(
	'game.entities.goblin'
	)
.defines(function(){
		EntityArmoredgoblin = EntityGoblin.extend({
			
			
			delayJump: null,
			
			ATK: 60,
			health: 400,
			healthBuffer: 0,
			actHealth: 400,
			RES: 25,
            MAG_RES: 25,
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
				this.HP_REGEN = 8;
				this.healthBuffer = this.health;
		
				this.EXP_BOUNTY = 80;
				// Animation for the Enemy1
                                               this.addAnim('idle', 0.07, [96, 97, 98, 99, 100,101]);
                                               this.addAnim('attack', 0.1, [102, 103]);
			},
			reset: function (x, y, settings) {
			    this.parent(x, y, settings);
			    
			    this.Maxhealth = this.health;
			    this.Maxmana = this.mana;
			    this.ATK = 60;
			    this.speed = 40;
			    this.HP_REGEN = 8;
			    this.healthBuffer = this.health;

			    this.EXP_BOUNTY = 80;
			    // Animation for the Enemy1
			    this.addAnim('idle', 0.07, [96, 97, 98, 99, 100, 101]);
			    this.addAnim('attack', 0.1, [102, 103]);
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
		ig.EntityPool.enableFor(EntityArmoredgoblin);
	
});