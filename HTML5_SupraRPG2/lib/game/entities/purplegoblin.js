﻿ig.module(
	'game.entities.purplegoblin'
	)
.requires(
	'game.entities.goblin'
	)
.defines(function(){
		EntityPurplegoblin = EntityGoblin.extend({
			
			
			delayJump: null,
			shootarrow: false,
			setDelayArrow: false,
			health: 65,
			healthBuffer: 0,
			actHealth: 65,
			ATK: 15,
			deadMonster: false,
			init: function(x,y,settings){
				this.parent(x, y, settings );
				this.animSheet = new ig.AnimationSheet('media/Enemies/Zombies.png', 16,16);
				this.delayATKCD = new ig.Timer();
				this.delayAnim = new ig.Timer();
				this.delayJump = new ig.Timer();
				this.Maxhealth = this.health;
				this.Maxmana = this.mana;
			
				this.speed = 15;
				this.MAG_RES = 0;
				this.RES = 0;
				this.HP_REGEN = 3;
				this.healthBuffer = this.health;
			
				this.EXP_BOUNTY = 13;
				// Animation for the Enemy1
				this.addAnim( 'idle', 0.07, [0,1,2,3,4,5] );
				this.addAnim( 'attack', 0.1, [6,7] );
			},
			reset: function (x, y, settings) {
			    this.parent(x, y, settings);
			    
			    this.Maxhealth = this.health;
			    this.Maxmana = this.mana;
			
			    this.speed = 15;
			    this.MAG_RES = 0;
			    this.RES = 0;
			    this.HP_REGEN = 3;
			    this.healthBuffer = this.health;
			
			    this.EXP_BOUNTY = 13;
			    // Animation for the Enemy1
			    this.addAnim('idle', 0.07, [0, 1, 2, 3, 4, 5]);
			    this.addAnim('attack', 0.1, [6, 7]);
			},
			update: function()
			{
				
				
			if(this.delayAnim.delta() < 0){this.currentAnim = this.anims.attack;}
			if(this._ready == false && this.CDtimerset == false){this.delayATKCD.set(1); this.CDtimerset = true;}
			
			if(this.delayATKCD.delta() > 0 && this._ready == false){ this._ready = true; this.CDtimerset = false;}
		
			
		
			// near edge? return!
			if(this.delayAnim.delta() > 0){
			
			
			this.vel.x = 200;
			this.currentAnim = this.anims.idle;
			}
			this.currentAnim.flip.x = this.flip;
			this.parent();
			},
		    kill: function () {
		    this.parent();
		   ig.game.player.killEvents.purple_zombieKills += 1; ig.game.player.killEvents.green_zombieKills -= 1;
		    ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 1 });
		        //ig.game.EndScreen();
		    },
				
		});
		ig.EntityPool.enableFor(EntityPurplegoblin);
	
});