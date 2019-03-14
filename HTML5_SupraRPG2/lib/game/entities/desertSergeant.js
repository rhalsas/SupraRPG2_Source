ig.module(
	'game.entities.desertSergeant'
	)
.requires(
	'impact.entity',
    'impact.entity-pool'
	)
.defines(function () {
    EntityDesertSergeant = ig.Entity.extend({

        size: { x: 8, y: 14 },
        offset: { x: 12, y: 9 },
        collides: ig.Entity.COLLIDES.ACTIVE,

        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.BOTH,
        delayJump: null,
        shootarrow: false,
        setDelayArrow: false,
        health: 99999,
        healthBuffer: 0,
        STAGGER: 0,
        name: 'boss',
        FRENZYCOUNTER: 0,
        actHealth: 1500,
        deadMonster: false,
        ShockWavedoneDamage: false,
        attackWholeTime: 1.2,
        attackAlertTime: 0.5,
        phase1FrameCounter: 0,
        lastPhaseFrameCounter: 0,
        turningInitiated: 0,
        EXP_BOUNTY: 100,
        CurrentSpell: 'EntitySpellwave_E',
        flip: false,
        powerAttackDelayInitiated: false,
        powerAttackDelay: null,
        powerAttackAnim: false,
        setShock: false,
        IsMovingRight: false,
        IsBurning: false,
        BurningDMG: 0,
        resetBurn: null,
        frameCalc: 0,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/Enemies/DesertSergeant.png', 32, 32);
            this.delayATKCD = new ig.Timer();
            this.delayAnim = new ig.Timer();
            this.delayJump = new ig.Timer();
            this.delayShock = new ig.Timer();
            this.resetBurn = new ig.Timer();
            this.Maxhealth = this.actHealth;
            this.Maxmana = this.mana;
            this.ATK = 0;
            this.speed = 20;
            this.powerAttackAnim = false;
            this.healthBuffer = this.health;
            var randomnumber = Math.floor(Math.random() * 7);
            this.EXP_BOUNTY = 100 + randomnumber;
            this.powerAttackDelay = new ig.Timer();
            this.healthBuffer = this.health;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [0, 1, 2, 3, 4, 5]);
            this.addAnim('attack', 0.1, [6, 7, 6, 7, 6]);
            this.addAnim('attack2', 0.05, [12, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14]);
        },

        update: function () {
            if (ig.game.player) {

                ig.game.burningCalc(this);
            }

            if (this.vel.x > 0) { this.IsMovingRight = true; }
            else if (this.vel.x < 0) { this.IsMovingRight = false; }
            if (this.ShockWavedoneDamage == true) { if (!this.setShock) { this.setShock = true; this.delayShock.set(0.4); } }
            if (this.delayShock.delta() > 0) { this.ShockWavedoneDamage = false; this.setShock = false; }
            if (this.health != this.healthBuffer)
            { this.actHealth -= (this.healthBuffer - this.health); this.health = this.healthBuffer; }
            if (ig.game.player) {
                if (this.actHealth / this.Maxhealth >= 0.80) {
                    this.movement();
                }
                else if (this.actHealth / this.Maxhealth >= 0.55) {

                    this.barrage_1();
                }
                else if (this.actHealth / this.Maxhealth >= 0.40) {
                    this.movement();
                }
                else if (this.actHealth / this.Maxhealth >= 0.10) {
                    this.barrage_2();
                }
                else if (this.actHealth / this.Maxhealth >= 0) {
                    this.movement();

                    //Cast Eclipse
                }
                else if (this.actHealth <= 0) {
                    ig.game.currentLevel = 'LevelLevel_M1';
                    ig.game.player.killEvents.knightKills += 1; ig.game.player.killEvents.mageKnightKills += 1;
                    ig.game.player.EXP += 100;


                    ig.game.data_packet = { x_coord: 20, y_coord: 604 };
                    ig.game.screenFader = new ig.ScreenFader({ fade: 'in', speed: 2.0 });
                    ig.game.soft_paused = true;
                    ig.game.bossKill_Event = true;

                    this.kill();
                }
            }
            this.parent();
        },
        kill: function () {
            this.parent();



            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 2 });
            ig.game.invokedBossMusic = false;
        },

        handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x && this.turningInitiated == 0) {
                /*if(this.locationMoved == 'Right'){this.vel.x = -50;}
                
                else if(this.locationMoved == 'Left'){this.vel.x = 50;}*/
                //this.vel.y *= -1;
                this.flip = !this.flip;
                this.turningInitiated = 1;
            }

            /*if( res.collision.y ) {
                if(this.locationMoved == 'Down'){this.vel.y = -50;}
                else if(this.locationMoved == 'Up'){this.vel.y = 50;}
                
                }*/


        },
        movement: function () {

            if (ig.game.player.pos.x <= this.pos.x + 64 && ig.game.player.pos.x >= this.pos.x - 64) {
                this.vel.x = 0;

                if (ig.game.player.pos.x <= this.pos.x) { this.flip = true; var x_coord = -8; }
                if (ig.game.player.pos.x >= this.pos.x) { this.flip = false; var x_coord = 8; }


                if (this.powerAttackDelayInitiated == false) {
                    this.currentAnim = this.anims.attack; this.powerAttackDelayInitiated = true;
                    this.powerAttackDelay.set(this.attackWholeTime); this.powerAttackAnim = true;
                }

                if (this.powerAttackDelay.delta() < 0 && this.powerAttackDelay.delta() > -this.attackAlertTime && this.powerAttackAnim == true) {
                    ig.game.spawnEntity(this.CurrentSpell, this.pos.x + x_coord, this.pos.y - 8, { flip: this.flip });
                    this.anims.attack2.rewind(); this.currentAnim = this.anims.attack2; this.powerAttackAnim = false;
                }
                if (this.powerAttackDelay.delta() > 0) { this.powerAttackDelayInitiated = false; }
            }
            else {
                this.currentAnim = this.anims.idle; if (this.turningInitiated > 0) { this.turningInitiated++; }
                if (this.turningInitiated == 60) { this.turningInitiated = 0; }

                // near edge? return!
                if (!ig.game.collisionMap.getTile(
                    this.pos.x + (this.flip ? +4 : this.size.x - 4),
                        this.pos.y + this.size.y + 1
                        )
                    && this.turningInitiated == 0) {
                    this.flip = !this.flip;
                    this.turningInitiated = 1;
                } var xdir = this.flip ? -1 : 1; this.vel.x = this.speed * xdir; this.powerAttackDelayInitiated = false;
            }



            // near edge? return!

            this.currentAnim.flip.x = this.flip;

        },

        handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x && this.turningInitiated == 0) {

                this.flip = !this.flip;
                this.turningInitiated = 1;
            }




        }
    });

    EntitySandwave_E = ig.Entity.extend({



        size: { x: 16, y: 20 },
        offset: { x: 6, y: 6 },
        maxVel: { x: 450, y: 0 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'shockwave',
        flip: true,
        reflect: false,
        doneDamage: false,
        delayTimer: null,


        firstRound: true,

        goingRight: false,
        goingLeft: false,




        handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x || res.collision.y) {

                this.kill();

            }




        },
        kill: function () {
            this.parent();

            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 4 });
        },


        init: function (x, y, settings) {


            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/AttackAnimation/SandWave.png', 32, 32);
            this.addAnim('idle', 0.05, [0, 1, 2, 3, 3, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 5, 4, 5, 4, 5]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/WaveSound.mp3');
            //sound.volume = 0.25;
            //sound.play();
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);
            this.doneDamage = false;

            if (ig.game.player.pos.x > this.pos.x) {
                this.flip = false;
                this.vel.x = 250;
            }
            if (ig.game.player.pos.x <= this.pos.x) {
                this.flip = true;
                this.vel.x = -250;
            }


        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            this.delayTimer.set(1.5);

            this.doneDamage = false;
            if (ig.game.player.pos.x > this.pos.x) {
                this.flip = false;
                this.vel.x = 250;
            }
            if (ig.game.player.pos.x <= this.pos.x) {
                this.flip = true;
                this.vel.x = -250;
            }



        },

        update: function () {





            this.parent();
            if (this.delayTimer.delta() > 0) { this.kill(); }
            this.currentAnim.flip.x = this.flip;
        },

        check: function (other) {


            if (this.doneDamage == false) {



                this.doneDamage = true;
                //Add also mana DRAIN and when mana drained, attack with HEAVY Sand Wave
                ig.game.checkDamage(other, this, 'MIXED', 100);
                this.kill();



            }



        }
    });
    EntityHeavySandwave_E = ig.Entity.extend({



        size: { x: 32, y: 40 },
        offset: { x: 12, y: 12 },
        maxVel: { x: 450, y: 0 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'shockwave',
        flip: true,
        reflect: false,
        doneDamage: false,
        delayTimer: null,


        firstRound: true,

        goingRight: false,
        goingLeft: false,




        handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x || res.collision.y) {

                this.kill();

            }




        },
        kill: function () {
            this.parent();

            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 4 });
        },


        init: function (x, y, settings) {


            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/AttackAnimation/HeavySandWave.png', 32, 32);
            this.addAnim('idle', 0.05, [0, 1, 2, 3, 3, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 5, 4, 5, 4, 5]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/WaveSound.mp3');
            //sound.volume = 0.25;
            //sound.play();
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);
            this.doneDamage = false;

            if (ig.game.player.pos.x > this.pos.x) {
                this.flip = false;
                this.vel.x = 250;
            }
            if (ig.game.player.pos.x <= this.pos.x) {
                this.flip = true;
                this.vel.x = -250;
            }


        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            this.delayTimer.set(1.5);

            this.doneDamage = false;
            if (ig.game.player.pos.x > this.pos.x) {
                this.flip = false;
                this.vel.x = 250;
            }
            if (ig.game.player.pos.x <= this.pos.x) {
                this.flip = true;
                this.vel.x = -250;
            }



        },

        update: function () {





            this.parent();
            if (this.delayTimer.delta() > 0) { this.kill(); }
            this.currentAnim.flip.x = this.flip;
        },

        check: function (other) {


            if (this.doneDamage == false) {



                this.doneDamage = true;
                //Add also mana DRAIN and when mana drained, attack with HEAVY Sand Wave
                ig.game.checkDamage(other, this, 'MIXED', 250);
                this.kill();



            }



        }
    });
});