ig.module(
	'game.entities.desertKnight'
	)
.requires(
	'impact.entity',
    'impact.entity-pool'
	)
.defines(function () {
    EntityDesertKnight = ig.Entity.extend({

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
        actHealth: 1750,
        deadMonster: false,
        ShockWavedoneDamage: false,
        attackWholeTime: 2.0,
        attackAlertTime: 0.5,
        phase1FrameCounter: 0,
        lastPhaseFrameCounter: 0,
        turningInitiated: 0,
        EXP_BOUNTY: 100,
        CurrentSpell: 'EntitySandWave_E',
        flip: true,
        powerAttackDelayInitiated: false,
        powerAttackDelay: null,
        powerAttackAnim: false,
        setShock: false,
        IsMovingRight: false,
        IsBurning: false,
        BurningDMG: 0,
        resetBurn: null,
        frameCalc: 0,
        spellCount: 0,
        doOnce: false,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/Enemies/DesertKnight.png', 32, 32);
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
    
            this.EXP_BOUNTY = 125;
            this.powerAttackDelay = new ig.Timer();
            this.healthBuffer = this.health;
            this.waitingForScene = true;
            // Animation for the Enemy1
            this.addAnim('stand', 1, [0]);
            this.addAnim('idle', 0.07, [0, 1, 2, 3, 4, 5]);
            this.addAnim('attack', 0.1, [6, 7, 6, 7, 6]);
            this.addAnim('die', 0.3, [8, 8, 8, 8, 8, 9, 10], true);
            this.addAnim('attack2', 0.05, [12, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14]);
        },

        update: function () {

            if (this.waitingForScene) {

                this.currentAnim = this.anims.stand;
                this.immunity = true;
                if (ig.game.player &&this.distanceTo(ig.game.player) <= 120) { this.immunity = false; ig.game.invokeDialog("desertKnight1"); this.waitingForScene = false; }

            }
            else {


                if (ig.game.scene_Invoked === false) {

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
                        if (this.actHealth / this.Maxhealth >= 0.75) {

                            this.movement();
                        }
                        else if (this.actHealth / this.Maxhealth >= 0.5) {

                            this.barrage_1();
                        }
                        else if (this.actHealth / this.Maxhealth >= 0.25) {

                            this.movement();
                        }
                        else if (this.actHealth / this.Maxhealth >= 0) {
                            this.movement();
                          //  this.barrage_2();

                            //Cast Eclipse
                        }
                        else if (this.actHealth <= 0) {


                            ig.game.getSelectionUp(5);

                            this.vel.x = 0;
                            if (this.doOnce === false) {
                                ig.game.invokeDialog("desertKnight2");
                                this.scene_Invoked = true;
                                this.doOnce = true;
                            }
                            this.deathTimerInvoked = true;


                        }

                    }

                    if (!this.deathTimer && this.deathTimerInvoked == true && ig.game.scene_Invoked === false) {
                        this.deathTimer = new ig.Timer();
                        ig.game.player.EXP += this.EXP_BOUNTY;
                        this.currentAnim = this.anims.die.rewind();
                        this.deathTimer.set(2.1);
                        this.deathTimerInvoked = false;
                    }
                    if (this.deathTimer && this.deathTimer.delta() > 0 + 1.5) {


                        ig.game.spawnTreasure(this.pos.x, this.pos.y, 'DESERTKNIGHT');
                        ig.game.levelChangeButtonInvoked = true;
                        ig.game.myTouchButtons.searchButton("levelChangeButtonInvoked", true);
                        ig.game.levelChangeData = { name: 'LevelLevel_MagicForest_1', x_coord: 32, y_coord: 608 };
                        LevelSelectOptionSkip = 5;




                      
                        this.kill();
                    }
                }
            }
        

            this.currentAnim.flip.x = this.flip;
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

            if (ig.game.player.pos.x <= this.pos.x + 100 && ig.game.player.pos.x >= this.pos.x - 100) {
                this.vel.x = 0;

                if (ig.game.player.pos.x <= this.pos.x) { this.flip = true; var x_coord = -8; }
                if (ig.game.player.pos.x >= this.pos.x) { this.flip = false; var x_coord = 8; }


                if (this.powerAttackDelayInitiated == false) {
                    this.currentAnim = this.anims.attack; this.powerAttackDelayInitiated = true;
                    this.powerAttackDelay.set(this.attackWholeTime); this.powerAttackAnim = true;
                }

                if (this.powerAttackDelay.delta() < 0 && this.powerAttackDelay.delta() > -this.attackAlertTime && this.powerAttackAnim == true) {
                    var y_coord = 8;
                    if (this.spellCount >= 1) { this.CurrentSpell = "EntityHeavySandWave_E"; this.spellCount = 0; x_coord *= 2; y_coord += 24 }
                    else { this.CurrentSpell = "EntitySandWave_E"; }

                    ig.game.spawnEntity(this.CurrentSpell, this.pos.x + x_coord, this.pos.y - y_coord, { flip: this.flip });
                    this.spellCount++;
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
        barrage_1: function () {
            if (this.phase1FrameCounter == 0) {
                this.immunity = true;
                this.pos.x = 810;
                this.pos.y = 278;
                this.gravityFactor = 0;
               

            }
            if (this.phase1FrameCounter % 3 == 0) {

                ig.game.spawnEntity("EntitySandMissile2_E", this.pos.x, this.pos.y + this.size.y / 2);
            }
            if (this.phase1FrameCounter >= 600) {

                this.immunity = false;
                this.gravityFactor = 1;
                this.actHealth = this.Maxhealth * 0.495;
            }
            this.phase1FrameCounter++;
        },
        barrage_2: function () {
            if (this.phase2FrameCounter == 0) {

                this.pos.x = 810;
                this.pos.y = 278;
                this.gravityFactor = 0;
                this.immunity = true;
            }
            if (this.phase2FrameCounter % 2 == 0) {

                ig.game.spawnEntity("EntitySandMissile2_E", this.pos.x, this.pos.y + this.size.y / 2);
            }
            if (this.phase2FrameCounter >= 3000) {

                this.immunity = false;
                this.gravityFactor = 1;
                this.actHealth = this.Maxhealth * 0.495;
            }
            this.phase2FrameCounter++;
        },

    });
    EntitySandMissile2_E = ig.Entity.extend({



        size: { x: 8, y: 8 },
        offset: { x: 0, y: 0 },
        maxVel: { x: 500, y: 500 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'shockwave',
        flip: true,

        doneDamage: false,
        delayTimer: null,


        firstRound: true,

        goingRight: false,
        goingLeft: false,

        power: 16,


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
            this.animSheet = new ig.AnimationSheet('media/AttackAnimation/SandMissile.png', 8, 8);
            var rundam = Math.floor(Math.random() * 3)
            this.addAnim('idle', 1, [rundam]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/WaveSound.mp3');
            //sound.volume = 0.25;
            //sound.play();
            this.anims.idle.rewind();
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);
            if (difficultyLevel === 1) {
                this.power *= 2;
            }
            else if (difficultyLevel === 2) {
                this.power *= 4;
            }
            else if (difficultyLevel === 3) {
                this.power *= 8;
            }
            this.doneDamage = false;
            this.gravityFactor = 0;
            var randum = ((Math.random() * 180) - 1);
            var angle = randum;
            this.vel.x = 100 * Math.cos(angle);
            this.vel.y = 100 * Math.sin(angle);


        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            this.delayTimer.set(1.5);
            this.anims.idle.rewind();
          
            this.doneDamage = false;

            this.gravityFactor = 0;

            var randum = ((Math.random() * 180) - 1);
            var angle = randum;
            this.vel.x = 100 * Math.cos(angle);
            this.vel.y = 100 * Math.sin(angle);



        },

        update: function () {





            this.parent();

            this.currentAnim.flip.x = this.flip;
        },

        check: function (other) {


            if (this.doneDamage == false) {



                ig.game.checkDamage(other, this, 'MIXED', this.power);
                this.doneDamage = true;
                this.kill();
                


            }



        }
    });
    EntitySandWave_E = ig.Entity.extend({



        size: { x: 16, y: 20 },
        offset: { x: 6, y: 6 },
        maxVel: { x: 150, y: 0 },
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

        power: 40,


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
            if (difficultyLevel === 1) {
                this.power *= 2;
            }
            else if (difficultyLevel === 2) {
                this.power *= 4;
            }
            else if (difficultyLevel === 3) {
                this.power *= 8;
            }

            if (!this.flip) {

                this.vel.x = 250;
            }
            if (this.flip) {

                this.vel.x = -250;
            }


        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            this.delayTimer.set(1.5);

            this.doneDamage = false;
        
            if (!this.flip) {

                this.vel.x = 250;
            }
            if (this.flip) {

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
                ig.game.checkDamage(other, this, 'MIXED', this.power);
                this.kill();



            }



        }
    });
    EntityHeavySandWave_E = ig.Entity.extend({



        size: { x: 32, y: 40 },
        offset: { x: 12, y: 12 },
        maxVel: { x: 100, y: 0 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'shockwave',
        flip: true,
        reflect: false,
        doneDamage: false,
        delayTimer: null,
        power: 40,

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
            this.animSheet = new ig.AnimationSheet('media/AttackAnimation/HeavySandWave.png', 64, 64);
            this.addAnim('idle', 0.05, [0, 1, 2, 3, 3, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 5, 4, 5, 4, 5]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/WaveSound.mp3');
            //sound.volume = 0.25;
            //sound.play();
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);
            this.doneDamage = false;
            if (ig.game.difficultyLevel === 1) {
                this.power *= 2;
            }
            else if (ig.game.difficultyLevel === 2) {
                this.power *= 4;
            }
            else if (ig.game.difficultyLevel === 3) {
                this.power *= 8;
            }
            if (!this.flip) {

                this.vel.x = 250;
            }
            if (this.flip) {

                this.vel.x = -250;
            }


        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            this.delayTimer.set(1.5);

            this.doneDamage = false;
            if (!this.flip) {
                
                this.vel.x = 250;
            }
            if (this.flip) {
             
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


                var damage = this.power;
                this.doneDamage = true;
                //Add also mana DRAIN and when mana drained, attack with HEAVY Sand Wave
                ig.game.checkDamage(other, this, 'MIXED', damage);
                this.kill();



            }



        }
    });

});