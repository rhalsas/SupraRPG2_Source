ig.module(
	'game.entities.darkKnight'
	)
.requires(
	'game.entities.heavyknight'
	)
.defines(function () {
    EntityDarkKnight = EntityHeavyknight.extend({

        size: { x: 8, y: 14 },
        offset: { x: 12, y: 9 },
        delayJump: null,
        shootarrow: false,
        setDelayArrow: false,
        health: 150,
        healthBuffer: 0,
        actHealth: 150,
        deadMonster: false,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/Enemies/Knights.png', 32, 32);
            this.delayATKCD = new ig.Timer();
            this.delayAnim = new ig.Timer();
            this.delayJump = new ig.Timer();
            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
            this.ATK = 0;
            this.attackWholeTime = 0.75;
            this.attackAlertTime = 0.75;
            this.speed = 50;
            this.healthBuffer = this.health;
            this.EXP_BOUNTY = 52;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [54,55,56,57,58,59]);
            this.addAnim('attack', 0.1, [60,61,60,61,60]);
            this.addAnim('attack2', 0.05, [66, 67, 68, 68, 68, 68, 68, 68, 68, 68]);
        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);

            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
            this.ATK = 0;
            this.attackWholeTime = 0.75;
            this.attackAlertTime = 0.75;
            this.speed = 50;
            this.healthBuffer = this.health;
            this.EXP_BOUNTY = 52;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [54, 55, 56, 57, 58, 59]);
            this.addAnim('attack', 0.1, [60, 61, 60, 61, 60]);
            this.addAnim('attack2', 0.05, [66, 67, 68, 68, 68, 68, 68, 68, 68, 68]);
        },

        kill: function () {
            this.parent();
            ig.game.player.killEvents.dark_knightKills += 1; ig.game.player.killEvents.heavy_knightKills -= 1;
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 9 });
        },

    });

    ig.EntityPool.enableFor(EntityDarkKnight);
});