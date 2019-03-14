ig.module(
	'game.entities.mysticMage'
	)
.requires(
	'game.entities.redMage',
    'impact.entity-pool'
	)
.defines(function () {
    EntityMysticMage = EntityRedMage.extend({

        size: { x: 8, y: 14 },
        offset: { x: 12, y: 9 },
        collides: ig.Entity.COLLIDES.ACTIVE,

        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.BOTH,
        delayJump: null,
        shootarrow: false,
        setDelayArrow: false,
        health: 15,
        healthBuffer: 0,
        actHealth: 15,
        deadMonster: false,
        powerAttackDelayInitiated: false,
        powerAttackDelay: null,
        powerAttackAnim: false,
        CurrentSpell: 'EntityFireSpell_E',
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/Enemies/Wizards.png', 32, 32),
            this.powerAttackDelay = new ig.Timer();
            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
            this.ATK = 0;
            this.speed = 25;
            this.attackWholeTime = 1.5;
            this.attackAlertTime = 0.5;
            this.healthBuffer = this.health;
      
            this.EXP_BOUNTY = 14;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [0, 1, 2, 3, 4, 5]);
            this.addAnim('attack', 0.1, [6, 7, 6, 7, 6]);
            this.addAnim('attack2', 1, [8]);
        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
           
            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
            this.ATK = 0;
            this.speed = 25;
            this.attackWholeTime = 1.5;
            this.attackAlertTime = 0.5;
            this.healthBuffer = this.health;
            this.EXP_BOUNTY = 14;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [0, 1, 2, 3, 4, 5]);
            this.addAnim('attack', 0.1, [6, 7, 6, 7, 6]);
            this.addAnim('attack2', 1, [8]);
        },

        update: function () {
            if (ig.game.player != null) {
                //var x_coord = 0;
                if (ig.game.player.pos.x <= this.pos.x + 64 && ig.game.player.pos.x >= this.pos.x - 64) {
                    this.vel.x = 0;

                    if (ig.game.player.pos.x <= this.pos.x) { this.flip = true; var x_coord = -40; }
                    if (ig.game.player.pos.x >= this.pos.x) { this.flip = false; var x_coord = 16; }


                    if (this.powerAttackDelayInitiated == false) {
                        this.currentAnim = this.anims.attack; this.powerAttackDelayInitiated = true;
                        this.powerAttackDelay.set(this.attackWholeTime); this.powerAttackAnim = true;
                    }

                    if (this.powerAttackDelay.delta() < 0 && this.powerAttackDelay.delta() > -this.attackAlertTime && this.powerAttackAnim == true) {
                        ig.game.spawnEntity(EntityManaBurst_ES, this.pos.x + x_coord, this.pos.y - 8, { flip: this.flip });
                       
                        this.anims.attack2.rewind(); this.currentAnim = this.anims.attack2; this.powerAttackAnim = false;
                    }
                    if (this.powerAttackDelay.delta() > 0) { this.powerAttackDelayInitiated = false; }
                }
                else { this.currentAnim = this.anims.idle; var xdir = this.flip ? -1 : 1; this.vel.x = this.speed * xdir; this.powerAttackDelayInitiated = false; }



                // near edge? return!

                this.currentAnim.flip.x = this.flip;
                this.parent();
            }
        },
        check: function (other) {

            if (other.pos.x <= this.pos.x) { this.flip = true; }
            else if (other.pos.x >= this.pos.x) { this.flip = false; }


            if (other.type == ig.Entity.TYPE.B) { this.flip = !this.flip; }
        },
        kill: function () {
            this.parent();
             ig.game.player.killEvents.purple_wizardKills += 1; ig.game.player.killEvents.red_wizardKills -= 1;
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 1 });
            //ig.game.EndScreen();
        }

    });
    ig.EntityPool.enableFor(EntityMysticMage);
    EntityManaBurst_ES = ig.Entity.extend({



        size: { x: 32, y: 32 },
        offset: { x: 0, y: 0 },
        maxVel: { x: 0, y: 0 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'manaburst',
        flip: true,

        doneDamage: false,
        delayTimer: null,
        delayTimer2: null,

        firstRound: true,

        goingRight: false,
        goingLeft: false,







        init: function (x, y, settings) {


            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/AttackAnimation/ManaBurst.png', 32, 32);
            this.addAnim('idle', 0.05, [0, 1, 0, 1, 0, 1, 0, 1, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]);

            // Animation for the Enemy1

            this.delayTimer = new ig.Timer();
            this.delayTimer2 = new ig.Timer();
                                          this.delayDamage = new ig.Timer();
            this.delayTimer2.set(0.4);
            this.delayTimer.set(1.5);
                                          this.delayDamage.set(0.3);
            if (ig.game.player != null) {
                if (ig.game.player.pos.x > this.pos.x) { this.flip = false; }
                if (ig.game.player.pos.x <= this.pos.x) { this.flip = true; }

            }






        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            this.delayTimer2.set(0.4);
            this.delayTimer.set(1.5);
                                              this.delayDamage.set(0.3);
            if (ig.game.player != null) {
                if (ig.game.player.pos.x > this.pos.x) { this.flip = false; }
                if (ig.game.player.pos.x <= this.pos.x) { this.flip = true; }

            }

        },

        update: function () {


            this.parent();
            if (this.delayTimer.delta() > 0) { this.kill(); }

        },

        check: function (other) {






                                          if(this.delayDamage.delta() > 0){
                                                ig.game.checkDamage(other, this, 'MAGICAL',10);
                                          this.delayDamage.set(0.3);
                                          
                                          
                                          }

      
            







        }

    });
    ig.EntityPool.enableFor(EntityManaBurst_ES);
});