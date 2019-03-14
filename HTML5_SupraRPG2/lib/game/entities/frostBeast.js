ig.module(
	'game.entities.frostBeast'
	)
.requires(
	'game.entities.redMage'
	)
.defines(function () {
    EntityFrostBeast = EntityRedMage.extend({

        size: { x: 8, y: 14 },
        offset: { x: 12, y: 9 },
        delayJump: null,
        shootarrow: false,
        setDelayArrow: false,
        health: 250,
        healthBuffer: 0,

        deadMonster: false,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/Enemies/MagmaBeast.png', 32, 32);
            this.delayATKCD = new ig.Timer();
            this.delayAnim = new ig.Timer();
            this.delayJump = new ig.Timer();
            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
            this.ATK = 0;
            this.speed = 25;
            this.healthBuffer = this.health;
            this.CurrentSpell = 'EntityFrostBreath_E';
            this.EXP_BOUNTY = 120;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [0, 1, 2, 3, 4, 5]);
            this.addAnim('attack', 0.1, [6, 7, 6, 7, 6]);
            this.addAnim('attack2', 1, [7]);
            this.addAnim('alert', 1, [0]);
        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);

            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
            this.ATK = 0;
            this.speed = 25;
            this.healthBuffer = this.health;
            this.CurrentSpell = 'EntityFrostBreath_E';
            this.EXP_BOUNTY = 120;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [0, 1, 2, 3, 4, 5]);
            this.addAnim('attack', 0.1, [6, 7, 6, 7, 6]);
            this.addAnim('attack2', 1, [7]);
            this.addAnim('alert', 1, [0]);
        },


        kill: function () {
            this.parent();

            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 1 });
        }
    });
    ig.EntityPool.enableFor(EntityThunderBeast);

});