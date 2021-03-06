﻿ig.module(
	'game.entities.thunderMage'
	)
.requires(
	'game.entities.redMage'
	)
.defines(function () {
    EntityThunderMage = EntityRedMage.extend({

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
            this.animSheet = new ig.AnimationSheet('media/Enemies/Wizards.png', 32, 32);
            this.delayATKCD = new ig.Timer();
            this.delayAnim = new ig.Timer();
            this.delayJump = new ig.Timer();
            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
            this.ATK = 0;
            this.speed = 45;
                                             
            this.healthBuffer = this.health;
            this.CurrentSpell = 'EntityLightningSpell_E';
            this.EXP_BOUNTY = 89;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [48, 49, 50, 51, 52, 53]);
            this.addAnim('attack', 0.1, [54, 55, 54, 55, 54]);
            this.addAnim('attack2', 1, [56]);
        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);

            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
            this.ATK = 0;
            this.speed = 45;
                                            
            this.healthBuffer = this.health;
            this.CurrentSpell = 'EntityLightningSpell_E';
            this.EXP_BOUNTY = 89;
            // Animation for the Enemy1
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [48, 49, 50, 51, 52, 53]);
            this.addAnim('attack', 0.1, [54, 55, 54, 55, 54]);
            this.addAnim('attack2', 1, [56]);
        },


        kill: function () {
            this.parent();
        
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 1 });
        }
    });
    ig.EntityPool.enableFor(EntityThunderMage);

});