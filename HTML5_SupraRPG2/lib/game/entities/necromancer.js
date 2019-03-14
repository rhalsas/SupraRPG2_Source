ig.module(
	'game.entities.necromancer'
	)
.requires(
	'game.entities.redMage'
	)
.defines(function(){
		EntityNecromancer = EntityRedMage.extend({
			
			size: {x: 8,y: 14},
			offset: {x:12, y:9},
			delayJump: null,
			shootarrow: false,
			setDelayArrow: false,
			health: 70,
			healthBuffer: 0,
		
			deadMonster: false,
			summoningAmount: 3,
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
				this.CurrentSpell = 'EntityRaiseDead_2';
				this.EXP_BOUNTY = 45;
				// Animation for the Enemy1
				this.addAnim('idle', 0.07, [72, 73, 74, 75, 76, 77]);
				this.addAnim('attack', 0.1, [78, 79, 78, 79, 78]);
				this.addAnim('attack2', 1, [80]);
			
			},
			reset: function (x, y, settings) {
			    this.parent(x, y, settings);
			
			    this.Maxhealth = this.health;
			    this.Maxmana = this.mana;
			    this.ATK = 0;
			    this.speed = 25;
			    this.healthBuffer = this.health;
			   this.CurrentSpell = 'EntityRaiseDead_2';
			   this.EXP_BOUNTY = 45;
			    // Animation for the Enemy1
			   this.addAnim('idle', 0.07, [72, 73, 74, 75, 76, 77]);
			   this.addAnim('attack', 0.1, [78, 79, 78, 79, 78]);
			   this.addAnim('attack2', 1, [80]);
			   
			},
		
			
		    kill: function () {
		    this.parent();
		    ig.game.player.killEvents.necromancerKills += 1; ig.game.player.killEvents.red_wizardKills -= 1;
		    ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 1 });
		    },
		    update: function () {

		        this.parent();
		        if (this.summoningAmount > 0) {
		            var randum = (Math.random() * 3) << 0;
		            if (randum == 0) { this.CurrentSpell = "EntityFireSpell_E"; }
		            else { this.CurrentSpell = "EntityRaiseDead_2"; }
		        }
		        else { this.CurrentSpell = "EntityFireSpell_E"; }
		    }
		});
		ig.EntityPool.enableFor(EntityNecromancer);
	
});