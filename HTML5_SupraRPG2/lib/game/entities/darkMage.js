ig.module(
	'game.entities.darkMage'
	)
.requires(
	'game.entities.redMage',
    'impact.entity-pool'
	)
.defines(function () {
    EntityDarkMage = EntityRedMage.extend({

        size: { x: 8, y: 14 },
        offset: { x: 12, y: 9 },
        collides: ig.Entity.COLLIDES.ACTIVE,

        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.BOTH,
        delayJump: null,
        shootarrow: false,
        setDelayArrow: false,
        health: 80,
        healthBuffer: 0,
        actHealth: 80,
        deadMonster: false,
        powerAttackDelayInitiated: false,
        powerAttackDelay: null,
        powerAttackAnim: false,
        CurrentSpell: 'EntityDarkBlast_E',
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/Enemies/Wizards.png', 32, 32),
            this.powerAttackDelay = new ig.Timer();
            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
            this.ATK = 0;
     
            this.speed = 20;
            this.attackWholeTime = 1.5;
            this.attackAlertTime = 0.5;
            this.healthBuffer = this.health;
            this.EXP_BOUNTY = 55;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [36, 37, 38, 39, 40, 41]);
            this.addAnim('attack', 0.1, [42, 43, 42, 43, 42]);
            this.addAnim('attack2', 1, [44]);
        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);

            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
            this.ATK = 0;
            this.speed = 20;
            this.attackWholeTime = 1.5;
            this.attackAlertTime = 0.5;
            this.healthBuffer = this.health;
            this.EXP_BOUNTY = 55;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [36, 37, 38, 39, 40, 41]);
            this.addAnim('attack', 0.1, [42, 43, 42, 43, 42]);
            this.addAnim('attack2', 1, [44]);
        },

      
        check: function (other) {

            if (other.pos.x <= this.pos.x) { this.flip = true; }
            else if (other.pos.x >= this.pos.x) { this.flip = false; }


            if (other.type == ig.Entity.TYPE.B) { this.flip = !this.flip; }
        },
        kill: function () {
            this.parent();
          
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 1 });
            //ig.game.EndScreen();
        }

    });
    ig.EntityPool.enableFor(EntityDarkMage);
    
});