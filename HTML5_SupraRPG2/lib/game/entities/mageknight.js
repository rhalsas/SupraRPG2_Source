ig.module(
	'game.entities.mageknight'
	)
.requires(
	'game.entities.heavyknight'
	)
.defines(function () {
    EntityMageknight = EntityHeavyknight.extend({

        size: { x: 8, y: 14 },
        offset: { x: 12, y: 9 },
        delayJump: null,
        shootarrow: false,
        setDelayArrow: false,
        health: 420,
        healthBuffer: 0,
        actHealth: 420,
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
            this.attackWholeTime = 0.2;
            this.attackAlertTime = 0.2;
            this.speed = 50;
            this.healthBuffer = this.health;
            this.EXP_BOUNTY = 90;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [72, 73, 74, 75, 76, 77]);
            this.addAnim('attack', 0.1, [78, 79, 78, 79, 78]);
            this.addAnim('attack2', 0.05, [84, 85, 86, 86, 86, 86, 86, 86, 86, 86]);
        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);

            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
            this.ATK = 0;
            this.attackWholeTime = 0.2;
            this.attackAlertTime = 0.2;
            this.speed = 50;
            this.healthBuffer = this.health;
            this.EXP_BOUNTY = 90;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [72, 73, 74, 75, 76, 77]);
            this.addAnim('attack', 0.1, [78, 79, 78, 79, 78]);
            this.addAnim('attack2', 0.05, [84, 85, 86, 86, 86, 86, 86, 86, 86, 86]);
          
        },

        kill: function () {
            this.parent();
            ig.game.player.killEvents.dark_knightKills += 1; ig.game.player.killEvents.heavy_knightKills -= 1;
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 9 });
        },

    });

    ig.EntityPool.enableFor(EntityMageknight);
});