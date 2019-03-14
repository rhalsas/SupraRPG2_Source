ig.module(
	'game.entities.demonknight'
	)
.requires(
	'game.entities.heavyknight'
	)
.defines(function () {
    EntityDemonknight = EntityHeavyknight.extend({

        size: { x: 8, y: 14 },
        offset: { x: 12, y: 9 },
        delayJump: null,
        shootarrow: false,
        setDelayArrow: false,
        health: 600,
        healthBuffer: 0,
        actHealth: 600,
        deadMonster: false,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/Enemies/DarkKnightGhost.png', 32, 32);
            this.delayATKCD = new ig.Timer();
            this.delayAnim = new ig.Timer();
            this.delayJump = new ig.Timer();
            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
            this.ATK = 0;
            this.attackWholeTime = 0.08;
            this.attackAlertTime = 0.08;
            this.speed = 50;
            this.healthBuffer = this.health;
            this.EXP_BOUNTY = 125;
            // Animation for the Enemy1
            this.addAnim('stand', 1, [0]);
            this.addAnim('idle', 0.07, [0, 1, 2, 3, 4, 5]);
            this.addAnim('attack', 0.1, [6, 7, 6, 7, 6]);
         
            this.addAnim('attack2', 0.05, [12, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14]);
        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);

            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
            this.ATK = 0;
            this.attackWholeTime = 0.08;
            this.attackAlertTime = 0.08;

            this.RES = 30;
            this.M_RES = 30;
            this.speed = 50;
            this.healthBuffer = this.health;
            this.EXP_BOUNTY = 125;
            // Animation for the Enemy1
            this.addAnim('stand', 1, [0]);
            this.addAnim('idle', 0.07, [0, 1, 2, 3, 4, 5]);
            this.addAnim('attack', 0.1, [6, 7, 6, 7, 6]);

            this.addAnim('attack2', 0.05, [12, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14]);
        },

        kill: function () {
            this.parent();
            
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 9 });
        },

    });

    ig.EntityPool.enableFor(EntityDemonknight);
});