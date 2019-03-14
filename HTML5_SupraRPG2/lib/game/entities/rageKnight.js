ig.module(
	'game.entities.rageKnight'
	)
.requires(
	'impact.entity',
    'impact.entity-pool'
	)
.defines(function () {
    EntityRageKnight = ig.Entity.extend({

        size: { x: 8, y: 14 },
        offset: { x: 12, y: 9 },
        maxVel: {x: 300, y: 500},
        collides: ig.Entity.COLLIDES.ACTIVE,
        ShockWavedoneDamage: false,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.BOTH,
        delayJump: null,
        shootarrow: false,
        setDelayArrow: false,
        health: 99999,
        name: 'boss',
        STAGGER: 0,
        healthBuffer: 0,
        actHealth: 2500,
        deadMonster: false,
        EXP_BOUNTY: 8,
        FRENZYCOUNTER: 0,
        MP: 100,
        turningInitiated: 0,
        powerAttackDelayInitiated: false,
        powerAttackDelay: null,
        powerAttackAnim: false,
        setShock: false,
        IsMovingRight: false,
        CurrentSpell: 'EntityRageWave_E',
        IsBurning: false,
        BurningDMG: 0,
        resetBurn: null,
        enableAttacking: false,
        frameCalc: 0,
        amount: 5,
        delayAttack: null,
        bombSpringActive: false,
        bombCount: 0,
        damageCounter: 0,
        barrageStarted: false,
        bombSpringCD: new ig.Timer(),
        flip: true,

        phaseFrameCounter: 0,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/Enemies/RageKnight.png', 32, 32),
            this.powerAttackDelay = new ig.Timer();
            this.delayShock = new ig.Timer();
            this.resetBurn = new ig.Timer();
            this.Maxhealth = this.actHealth;
            this.Maxmana = this.mana;
            this.ATK = 30;
            this.speed = 25;
            this.attackWholeTime = 2.0;
            this.attackAlertTime = 0.5;
            this.healthBuffer = this.health;
            this.doOnce = false;
            this.EXP_BOUNTY = 250;
            // Animation for the Enemy1
            this.waitingForScene = true;
            this.delayAttack1 = new ig.Timer();
            this.delayAttack1.set(5);
            this.addAnim('stand', 1, [0]);
            this.addAnim('idle', 0.07, [0, 1, 2, 3, 4, 5]);
            this.addAnim('attack', 0.1, [6, 7, 6, 7, 6]);
            this.addAnim('die', 0.1, [8, 8, 8, 8, 8, 9, 10], true);
           
            this.addAnim('attack2', 0.05, [12, 13, 14, 14, 14, 14, 14, 14, 14, 14]);
        },
       
        kill: function () {
            this.parent();
            if (ig.game.SOUNDON) {
                var sound = new ig.Sound('media/Music/BloodSplat.m4a');
                sound.play();
            }
       
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 1 });
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
        barrage_1: function () {
            if (this.barrageStarted === true) {
                if (this.phaseFrameCounter === 0) {

                    this.vel.y = -200;
                 
                  
                }
                this.phaseFrameCounter++;
                if (this.phaseFrameCounter % 2 == 0) {

                    ig.game.spawnEntity("EntityRageMissile_E", this.pos.x, this.pos.y + this.size.y / 2);
                }
                if (this.phaseFrameCounter >= 60) {

                    this.barrageStarted = false;
                    this.phaseFrameCounter = 0;


                }
                
            }
        },
        
        update: function () {
            // near edge? return!

            if (this.waitingForScene) {

                this.currentAnim = this.anims.stand;
                this.immunity = true;
                if (this.distanceTo(ig.game.player) <= 120) { this.immunity = false; ig.game.invokeDialog("rageKnight"); this.waitingForScene = false; }

            }
            if(ig.game.scene_Invoked === false && !this.waitingForScene) {
                if (this.health != this.healthBuffer)
                { this.actHealth -= (this.healthBuffer - this.health); this.damageCounter += (this.healthBuffer - this.health); this.health = this.healthBuffer; }
                var intensity = 1;
                if (this.actHealth / this.Maxhealth >= 0.75) {
                    intensity = 1;
                }
                else if (this.actHealth / this.Maxhealth >= 0.50) {

                    intensity = 2;
                }
                else if (this.actHealth / this.Maxhealth >= 0.25) {
                    intensity = 3;
                }
                else if (this.actHealth / this.Maxhealth >= 0) {
                    intensity = 4;
                }

                else if (this.actHealth <= 0) {





                    ig.game.getSelectionUp(10);

                    this.vel.x = 0;
                    if (this.doOnce === false) {
                        ig.game.invokeDialog("rageKnight2");
                        this.scene_Invoked = true;
                        this.doOnce = true;
                    }
                    this.deathTimerInvoked = true;


                }
                if (this.damageCounter >= (400 / intensity)) {
                    this.damageCounter = 0;
                    this.barrageStarted = true;




                }
                this.barrage_1();
                if (!this.deathTimer && this.deathTimerInvoked == true) {
                    this.deathTimer = new ig.Timer();

                    ig.game.destroyBossWalls();
                    ig.game.player.EXP += this.EXP_BOUNTY;
                    this.currentAnim = this.anims.die.rewind();
                    this.deathTimer.set(2.1);
                    this.deathTimerInvoked = false;
                }
                if (this.deathTimer && this.deathTimer.delta() > 0 + 1.5) {



                    ig.game.spawnTreasure(this.pos.x, this.pos.y, 'RAGEKNIGHT');
                    ig.game.levelChangeButtonInvoked = true;
                    ig.game.myTouchButtons.searchButton("levelChangeButtonInvoked", true);
                    ig.game.levelChangeData = { name: 'LevelLevel_DemonCave1', x_coord: 120, y_coord: 32 };
                    LevelSelectOptionSkip = 10;




                    this.kill();
                }
                if (this.actHealth > 0) {
                    if (this.vel.x > 0) { this.IsMovingRight = true; }
                    else if (this.vel.x < 0) { this.IsMovingRight = false; }
                    if (this.ShockWavedoneDamage == true) { if (!this.setShock) { this.setShock = true; this.delayShock.set(0.4); } }
                    if (this.delayShock.delta() > 0) { this.ShockWavedoneDamage = false; this.setShock = false; }
                    if (ig.game.player != null) {

                        ig.game.burningCalc(this);
                        if (ig.game.player.pos.x <= this.pos.x + 128 && ig.game.player.pos.x >= this.pos.x - 128 && ig.game.player.pos.y <= this.pos.y + 16 && ig.game.player.pos.y >= this.pos.y - 16) {
                            this.enableAttacking = true;
                        }
                        if (this.enableAttacking == true) {
                            this.vel.x = 0;

                            if (ig.game.player.pos.x <= this.pos.x) { this.flip = true; var x_coord = 0; }
                            else if (ig.game.player.pos.x > this.pos.x) { this.flip = false; var x_coord = 8; }
                            var y_coord = 0;

                            if (this.powerAttackDelayInitiated == false) {
                                this.currentAnim = this.anims.attack; this.powerAttackDelayInitiated = true;
                                this.powerAttackDelay.set(this.attackWholeTime); this.powerAttackAnim = true;
                            }

                            if (this.powerAttackDelay.delta() < 0 && this.powerAttackDelay.delta() > -this.attackAlertTime && this.powerAttackAnim == true) {
                                this.enableAttacking = false;

                                y_coord -= 8
                                ig.game.spawnEntity(this.CurrentSpell, this.pos.x + x_coord, this.pos.y + y_coord, { flip: this.flip });

                                this.anims.attack2.rewind(); this.currentAnim = this.anims.attack2; this.powerAttackAnim = false;
                            }
                            if (this.powerAttackDelay.delta() > 0) { this.powerAttackDelayInitiated = false; }
                        }

                        else { this.currentAnim = this.anims.idle; var xdir = this.flip ? -1 : 1; this.vel.x = this.speed * xdir; this.powerAttackDelayInitiated = false; }
                    }

                    if (this.turningInitiated > 0) { this.turningInitiated++; }
                    if (this.turningInitiated >= 15 && this.powerAttackDelayInitiated == false) { this.turningInitiated = 0; }

                    if (!ig.game.collisionMap.getTile(
                        this.pos.x + (this.flip ? +4 : this.size.x - 4),
                            this.pos.y + this.size.y + 1
                            )
                        && this.turningInitiated == 0) {
                        this.flip = !this.flip;

                        this.turningInitiated = 1;
                    }

                }
            }
            this.currentAnim.flip.x = this.flip;
            this.parent();
        },

        check: function (other) {
            if (ig.Entity.TYPE.A == other.type) {

                if (other.pos.x <= this.pos.x) { this.flip = true; }
                else if (other.pos.x >= this.pos.x) { this.flip = false; }
            } else {
                if (other.type == ig.Entity.TYPE.B && this.turningInitiated == 0) {
                    this.turningInitiated = 1; this.flip = !this.flip;
                }

            }




        },
        kill: function () {
            this.parent();
            /*  var sound = new ig.Sound('media/Music/BloodSplat.m4a');
              sound.play();*/
         
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 1 });
            //ig.game.EndScreen();
        }

    });
    EntityRageWave_E = ig.Entity.extend({



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

        power: 50,
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
            this.animSheet = new ig.AnimationSheet('media/AttackAnimation/RageWave.png', 32, 32);
            this.addAnim('idle', 0.05, [0, 1, 2, 3, 3, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 5, 4, 5, 4, 5]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/WaveSound.mp3');
            //sound.volume = 0.25;
            //sound.play();
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
                ig.game.checkDamage(other, this, 'MIXED',this.power);
                this.kill();



            }



        }
    });
    EntityRageMissile_E = ig.Entity.extend({



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

        power: 15,


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
            this.animSheet = new ig.AnimationSheet('media/AttackAnimation/RageMissile.png', 8, 8);
            var rundam = Math.floor(Math.random() * 3)
            this.addAnim('idle', 1, [rundam]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/WaveSound.mp3');
            //sound.volume = 0.25;
            //sound.play();
            this.anims.idle.rewind();
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);
            this.doneDamage = false;
            this.gravityFactor = 0;
            if (difficultyLevel === 1) {
                this.power *= 2;
            }
            else if (difficultyLevel === 2) {
                this.power *= 4;
            }
            else if (difficultyLevel === 3) {
                this.power *= 8;
            }
            var randum = ((Math.random() * 180) - 1);
            var angle = randum;
            this.vel.x = 200 * Math.cos(angle);
            this.vel.y = 200 * Math.sin(angle);


        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            this.delayTimer.set(1.5);
            this.anims.idle.rewind();
            this.doneDamage = false;
          
            this.gravityFactor = 0;

            var randum = ((Math.random() * 180) - 1);
            var angle = randum;
            this.vel.x = 200 * Math.cos(angle);
            this.vel.y = 200 * Math.sin(angle);



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
   


});