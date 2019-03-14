ig.module(
	'game.entities.bombThrowerNuker'
	)
.requires(
	'game.entities.redMage'
	)
.defines(function(){
		EntityBombThrowerNuker = EntityRedMage.extend({
			
			size: {x: 8,y: 14},
			offset: {x:12, y:9},
			delayJump: null,
			shootarrow: false,
			setDelayArrow: false,
			health: 450,
			healthBuffer: 0,
		
			deadMonster: false,
			init: function(x,y,settings){
				this.parent(x, y, settings );
				this.animSheet = new ig.AnimationSheet('media/Enemies/BombThrowerNuker.png',32, 32);
				this.delayATKCD = new ig.Timer();
				this.delayAnim = new ig.Timer();
				this.delayJump = new ig.Timer();
				this.Maxhealth = this.health;
				this.Maxmana = this.mana;
				this.ATK = 0;
				this.speed = 25;
				this.healthBuffer = this.health;
				this.CurrentSpell = 'EntityBombThrow_4_E';
				this.EXP_BOUNTY = 90;
				// Animation for the Enemy1
				this.addAnim('idle', 0.07, [0, 1, 2, 3, 4, 5]);
				this.addAnim('attack', 0.1, [12,13, 14]);
				this.addAnim('attack2', 1,[ 12,13, 14]);
				this.addAnim( 'alert', 0.1, [6,7] );
			},
			reset: function (x, y, settings) {
			    this.parent(x, y, settings);
			
			    this.Maxhealth = this.health;
			    this.Maxmana = this.mana;
			    this.ATK = 0;
			    this.speed = 25;
			    this.healthBuffer = this.health;
			    this.CurrentSpell = 'EntityBombThrow_4_E';
			    this.EXP_BOUNTY = 90;
			    // Animation for the Enemy1
			    this.addAnim('idle', 0.07, [0, 1, 2, 3, 4, 5]);
			    this.addAnim('attack', 0.1, [12, 13, 14]);
			    this.addAnim('attack2', 1, [12,13, 14]);
			    this.addAnim('alert', 0.1, [6, 7]);
			},
		
			
		    kill: function () {
		    this.parent();
		    ig.game.player.killEvents.bombThrowerWeakKills += 1; ig.game.player.killEvents.red_wizardKills -= 1;
		    ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 1 });
		    }
		});
		ig.EntityPool.enableFor(EntityBombThrowerNuker);
	
});