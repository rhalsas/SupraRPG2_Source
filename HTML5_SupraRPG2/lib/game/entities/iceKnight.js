ig.module(
	'game.entities.iceKnight'
	)
.requires(
	'game.entities.heavyknight'
	)
.defines(function () {
    EntityIceKnight = EntityHeavyknight.extend({

        size: { x: 8, y: 14 },
        offset: { x: 12, y: 9 },
        delayJump: null,
        shootarrow: false,
        setDelayArrow: false,
        health: 180,
        healthBuffer: 0,
        actHealth:180,
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
            this.attackWholeTime = 0.25;
            this.attackAlertTime = 0.25;
            this.speed = 15;
            this.healthBuffer = this.health;
            this.EXP_BOUNTY = 81;
            // Animation for the Enemy1
           
            this.addAnim('idle', 0.07, [270, 271, 272, 273, 274, 275]);
            
            this.addAnim('attack', 0.1, [276, 277, 276, 277, 276]);
            this.addAnim('attack2', 0.05, [282, 283, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284]);
            
        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);

            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
            this.ATK = 0;
            this.attackWholeTime = 0.25;
            this.attackAlertTime = 0.25;
            this.speed = 15;
            this.healthBuffer = this.health;
            this.EXP_BOUNTY = 81;
            // Animation for the Enemy1
                                               this.addAnim('idle', 0.07, [270, 271, 272, 273, 274, 275]);
                                               
                                               this.addAnim('attack', 0.1, [276, 277, 276, 277, 276]);
                                               this.addAnim('attack2', 0.05, [282, 283, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284, 284]);

        },

        kill: function () {
            this.parent();
            ig.game.player.killEvents.ice_knightKills += 1; ig.game.player.killEvents.heavy_knightKills -= 1;
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 9 });
        },

    });

    ig.EntityPool.enableFor(EntityIceKnight);
});