ig.module(
	'game.entities.necromancerWeak'
	)
.requires(
	'game.entities.redMage'
	)
.defines(function(){
    EntityNecromancerWeak = EntityRedMage.extend({
			
        size: {x: 8,y: 14},
        offset: {x:12, y:9},
        delayJump: null,
        shootarrow: false,
        setDelayArrow: false,
        health: 50,
        healthBuffer: 0,
        MP: 150,
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
            this.attackWholeTime = 2;
            this.attackAlertTime = 1;
           
            this.healthBuffer = this.health;
            this.CurrentSpell = 'EntityRaiseDead_1';
            this.EXP_BOUNTY = 35;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [60, 61, 62, 63, 64, 65]);
            this.addAnim('attack', 0.1, [66, 67, 66, 67, 66]);
            this.addAnim('attack2', 1, [69]);
        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
			
            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
            this.ATK = 0;
            this.speed = 25;
            this.attackWholeTime = 2;
            this.attackAlertTime = 1;
            this.healthBuffer = this.health;
            this.CurrentSpell = 'EntityRaiseDead_1';
            this.EXP_BOUNTY = 35;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [60, 61, 62, 63, 64, 65]);
            this.addAnim('attack', 0.1, [66, 67, 66, 67, 66]);
            this.addAnim('attack2', 1, [69]);
           
		
        },
		
			
        kill: function () {
            this.parent();
           
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 1 });
        },
        update: function () {
            this.parent();
           
            if (this.summoningAmount > 0) {
                var randum = (Math.random() * 3) << 0;
                if (randum == 0) { this.CurrentSpell = "EntityFireSpell2_E"; }
                else { this.CurrentSpell = "EntityRaiseDead_1"; }
            }
            else { this.CurrentSpell = "EntityFireSpell2_E"; }
    }
		});
		ig.EntityPool.enableFor(EntityNecromancerWeak);
	
});