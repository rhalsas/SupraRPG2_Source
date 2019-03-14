ig.module(
	'game.entities.spellKnight'
	)
.requires(
	'game.entities.heavyknight'
	)
.defines(function () {
    EntitySpellKnight = EntityHeavyknight.extend({

        size: { x: 8, y: 14 },
        offset: { x: 12, y: 9 },
        delayJump: null,
        shootarrow: false,
        setDelayArrow: false,
        health: 380,
        healthBuffer: 0,
        actHealth: 380,
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
            this.attackWholeTime = 0.3;
            this.attackAlertTime = 0.3;
            this.speed = 50;
            this.healthBuffer = this.health;
            this.EXP_BOUNTY = 105;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [90, 91, 92, 93, 94, 95]);
            this.addAnim('attack', 0.1, [96, 97, 96, 97, 96]);
            this.addAnim('attack2', 0.05, [102, 103, 104, 104, 104, 104, 104, 104, 104, 104]);
        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);

            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
            this.ATK = 0;
            this.attackWholeTime = 0.3;
            this.attackAlertTime = 0.3;
            this.speed = 50;
            this.healthBuffer = this.health;
            this.EXP_BOUNTY = 105;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [90, 91, 92, 93, 94, 95]);
            this.addAnim('attack', 0.1, [96, 97, 96, 97, 96]);
            this.addAnim('attack2', 0.05, [102, 103, 104, 104, 104, 104, 104, 104, 104, 104]);
        },

        kill: function () {
            this.parent();
            ig.game.player.killEvents.dark_knightKills += 1; ig.game.player.killEvents.heavy_knightKills -= 1;
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 9 });
        },

    });

    ig.EntityPool.enableFor(EntitySpellKnight);
});