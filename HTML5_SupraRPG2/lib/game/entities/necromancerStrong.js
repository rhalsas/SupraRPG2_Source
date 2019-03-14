ig.module(
	'game.entities.necromancerStrong'
	)
.requires(
	'game.entities.redMage'
	)
.defines(function(){
		EntityNecromancerStrong = EntityRedMage.extend({
			
			size: {x: 8,y: 14},
			offset: {x:12, y:9},
			delayJump: null,
			shootarrow: false,
			setDelayArrow: false,
			health: 100,
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
				this.CurrentSpell = 'EntityRaiseDead_3';
				this.EXP_BOUNTY = 65;
			    // Animation for the Enemy1
				this.addAnim('idle', 0.07, [84, 85, 86, 87, 88, 89]);
				this.addAnim('attack', 0.1, [90, 91, 90, 91, 90]);
				this.addAnim('attack2', 1, [92]);
			
			},
			reset: function (x, y, settings) {
			    this.parent(x, y, settings);
			
			    this.Maxhealth = this.health;
			    this.Maxmana = this.mana;
			    this.ATK = 0;
			    this.speed = 25;
			    this.healthBuffer = this.health;
			   this.CurrentSpell = 'EntityRaiseDead_3';
			   this.EXP_BOUNTY = 65;
			    // Animation for the Enemy1
			   this.addAnim('idle', 0.07, [84, 85, 86, 87, 88, 89]);
			   this.addAnim('attack', 0.1, [90, 91, 90, 91, 90]);
			   this.addAnim('attack2', 1, [92]);
			},
		
			
		    kill: function () {
		    this.parent();
		   
		    ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 1 });
		    },
		    update: function () {

		        this.parent();
		        if (this.summoningAmount > 0) {
		            var randum = (Math.random() * 3) << 0;
		            if (randum == 0) { this.CurrentSpell = 'EntityDarkBlast_E'; }
		            else { this.CurrentSpell = "EntityRaiseDead_3"; }
		        } else {
		            this.CurrentSpell = 'EntityDarkBlast_E';
		        }
		        
		    }
		});
		ig.EntityPool.enableFor(EntityNecromancerStrong);
	
});