ig.module(
	'game.entities.blueMage'
	)
.requires(
	'game.entities.redMage'
	)
.defines(function(){
		EntityBlueMage = EntityRedMage.extend({
			
			size: {x: 8,y: 14},
			offset: {x:12, y:9},
			delayJump: null,
			shootarrow: false,
			setDelayArrow: false,
			health: 35,
			healthBuffer: 0,
			MP: 150,
			deadMonster: false,
			init: function(x,y,settings){
				this.parent(x, y, settings );
				this.animSheet = new ig.AnimationSheet('media/Enemies/Wizards.png',32, 32);
				this.delayATKCD = new ig.Timer();
				this.delayAnim = new ig.Timer();
				this.delayJump = new ig.Timer();
				this.Maxhealth = this.health;
				this.Maxmana = this.mana;
				this.ATK = 0;
				this.speed = 25;
				this.healthBuffer = this.health;
				this.CurrentSpell = 'EntityIcespike_E';
				this.EXP_BOUNTY = 13;
				// Animation for the Enemy1
				this.addAnim('idle', 0.07, [24,25, 26, 27, 28, 29]);
				this.addAnim('attack', 0.1, [30, 31, 30, 31, 30]);
				this.addAnim('attack2', 1, [32]);
				this.addAnim( 'alert', 0.1, [30,31] );
			},
			reset: function (x, y, settings) {
			    this.parent(x, y, settings);
			
			    this.Maxhealth = this.health;
			    this.Maxmana = this.mana;
			    this.ATK = 0;
			    this.speed = 25;
			    this.healthBuffer = this.health;
			    this.CurrentSpell = 'EntityIcespike_E';
			    this.EXP_BOUNTY = 13;
			    // Animation for the Enemy1
			    this.addAnim('idle', 0.07, [24, 25, 26, 27, 28, 29]);
			    this.addAnim('attack', 0.1, [30, 31, 30, 31, 30]);
			    this.addAnim('attack2', 1, [32]);
			    this.addAnim('alert', 0.1, [30, 31]);
			},
		
			
		    kill: function () {
		    this.parent();
		    ig.game.player.killEvents.blue_wizardKills += 1; ig.game.player.killEvents.red_wizardKills -= 1;
		    ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 1 });
		    }
		});
		ig.EntityPool.enableFor(EntityBlueMage);
	
});