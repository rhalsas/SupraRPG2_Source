ig.module(
	'game.entities.arcanist'
	)
.requires(
	'game.entities.redMage'
	)
.defines(function () {
    EntityArcanist = EntityRedMage.extend({

        size: { x: 8, y: 14 },
        offset: { x: 12, y: 9 },
        delayJump: null,
        shootarrow: false,
        setDelayArrow: false,
        health: 250,
        healthBuffer: 0,
        actHealth: 250,
        deadMonster: false,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/Enemies/Wizards.png', 32, 32);
            this.delayATKCD = new ig.Timer();
            this.delayAnim = new ig.Timer();
            this.delayJump = new ig.Timer();
            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
          
            this.speed = 45;
                                             
            this.healthBuffer = this.health;
            this.CurrentSpell = 'EntityArcaneBolt_ES';
            this.EXP_BOUNTY = 102;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [96, 97, 98, 99, 100, 101]);
            this.addAnim('attack', 0.1, [102, 103, 102, 103, 102]);
            this.addAnim('attack2', 1, [104]);
        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);

            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
           
            this.speed = 45;
                                            
            this.healthBuffer = this.health;
            this.CurrentSpell = 'EntityArcaneBolt_ES';
            this.EXP_BOUNTY = 102;
            // Animation for the Enemy1
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [96, 97, 98, 99, 100, 101]);
            this.addAnim('attack', 0.1, [102, 103, 102, 103, 102]);
            this.addAnim('attack2', 1, [104]);
        },


        kill: function () {
            this.parent();
      
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 1 });
        }
    });
    ig.EntityPool.enableFor(EntityArcanist);

});