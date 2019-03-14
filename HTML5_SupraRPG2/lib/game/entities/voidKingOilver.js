ig.module(
	'game.entities.voidKingOilver'
	)
.requires(
	'impact.entity',
    'impact.entity-pool'
	)
.defines(function () {
    EntityVoidKingOilver = ig.Entity.extend({

        size: { x: 8, y: 14 },
        offset: { x: 12, y: 9 },
        collides: ig.Entity.COLLIDES.ACTIVE,
        name: 'boss',

        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.BOTH,
        delayJump: null,
        shootarrow: false,
        setDelayArrow: false,
        health: 99999,
        healthBuffer: 0,
        STAGGER: 0,
        actHealth: 4000,
        deadMonster: false,
        ShockWavedoneDamage: false,
        attackWholeTime: 1.2,
        attackAlertTime: 1,
        phase1FrameCounter: 0,
        phase2FrameCounter: 0,
        lastPhaseFrameCounter: 0,
        turningInitiated: 0,
        EXP_BOUNTY: 300,
        FRENZYCOUNTER: 0,
        waitingForScene: true,
        CurrentSpell: 'EntityDarkwave',
        flip: false,
        powerAttackDelayInitiated: false,
        powerAttackDelay: null,
        powerAttackAnim: false,
        setShock: false,
        intensity: 1,
        frameCounter: 0,
        buffer: 0,
        IsBurning: false,
        BurningDMG: 0,
        resetBurn: null,
        frameCalc: 0,
        doOnce: false,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/Enemies/VoidKing.png', 32, 32);
            this.delayATKCD = new ig.Timer();
            this.delayAnim = new ig.Timer();
            this.delayJump = new ig.Timer();
            this.delayShock = new ig.Timer();
            this.resetBurn = new ig.Timer();
            this.Maxhealth = this.actHealth;
            this.Maxmana = this.mana;
            this.ATK = 100;
            this.speed = 20;
            this.intensity = 1;

            this.powerAttackAnim = false;
            this.healthBuffer = this.health;
            var randomnumber = Math.floor(Math.random() * 7);
            this.EXP_BOUNTY = 300 + randomnumber;
            this.powerAttackDelay = new ig.Timer();
            this.healthBuffer = this.health;
            // Animation for the Enemy1
            this.addAnim('stand', 1, [0]);
            this.addAnim('idle', 0.07, [0, 1, 2, 3, 4, 5]);
            this.addAnim('attack', 0.1, [6, 7, 6, 7, 6]);
            this.addAnim('die', 0.3, [8, 8, 8, 8, 8, 9, 10], true);
            this.addAnim('attack2', 0.05, [12, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14]);
        },
        checkAttack: function () {

            //1 - 10 random
            var random_number = Math.floor(Math.random() * 11);
            var attack_seed = random_number * this.intensity

            //intensity 1 - 3
            this.CurrentSpell = "EntitySingularity_E";
            /* if (attack_seed > 10) {
 
                 this.CurrentSpell = "EntityDarkwave";
 
             }
 
             else {
                 this.CurrentSpell = "EntitySpellwave_E";
             }*/
        },


        update: function () {


            if (this.waitingForScene) {
       
                this.currentAnim = this.anims.stand;
                this.immunity = true;
                if (ig.game.player && this.distanceTo(ig.game.player) <= 120) { this.immunity = false; ig.game.invokeDialog("voidKnight1"); this.flip = true; this.waitingForScene = false; }

            }
            else {


                if (ig.game.scene_Invoked === false) {

                    this.checkAttack();

                    if (ig.game.player) {
                        ig.game.burningCalc(this);

                        if (this.ShockWavedoneDamage == true) { if (!this.setShock) { this.setShock = true; this.delayShock.set(0.6 / this.intensity); } }
                        if (this.delayShock.delta() > 0) { this.ShockWavedoneDamage = false; this.setShock = false; }
                        if (this.health != this.healthBuffer)
                        { this.actHealth -= (this.healthBuffer - this.health); this.health = this.healthBuffer; }
                        if (this.actHealth / this.Maxhealth >= 0.80) {
                            this.movement();
                            //  this.barrage_1();
                        }
                        else if (this.actHealth / this.Maxhealth >= 0.55) {

                            this.intensity = 2;
                            // this.barrage_1();
                            this.movement();
                        }
                        else if (this.actHealth / this.Maxhealth >= 0.40) {
                            this.movement();
                        }
                        else if (this.actHealth / this.Maxhealth >= 0.25) {
                            this.intensity = 3;

                            //this.barrage_2();
                            this.movement();
                        }
                        else if (this.actHealth / this.Maxhealth >= 0) {
                            this.intensity = 6;
                            this.movement();
                        }
                        else if (this.actHealth <= 0) {

                          
                            ig.game.getSelectionUp(13);

                            this.vel.x = 0;
                            if (this.doOnce === false) {
                                this.currentAnim = this.anims.stand;
                                ig.game.invokeDialog("voidKnight2");
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
                     
                
                       /* if (difficultyAvailable < 1 &&  difficultyLevel ===  0) {
                            difficultyAvailable = 1;
                            informUnlock = 1;
                            
                         
                        }
                        else if (difficultyAvailable < 2 && difficultyLevel === 1) {
                            difficultyAvailable = 2;
                            informUnlock = 2;
                        }
                        else if (difficultyAvailable < 3 && difficultyLevel === 2) {
                            difficultyAvailable = 3;
                            informUnlock = 3;
                            
                        }*/
                    
                        ig.game.spawnTreasure(this.pos.x, this.pos.y, 'VOIDKING');
                        ig.game.levelChangeButtonInvoked = true;
                        
                        ig.game.myTouchButtons.searchButton("levelChangeButtonInvoked", true);
                        ig.game.levelChangeData = { name: 'LevelLevel_TutorialCastle_1', x_coord: 32, y_coord: 608 };
                        LevelSelectOptionSkip = 13;
                        ig.game.saveDifficulty(ig.game.saveSlot);
                        this.kill();
                    }
                }
            }
            // near edge? return!

            this.currentAnim.flip.x = this.flip;
            this.parent();
        },
        kill: function () {
            this.parent();

            ig.game.player.accel.x = 0;
            ig.game.player.accel.y = 0;

            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 2 });
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

            if (this.distanceTo(ig.game.player) < 128) {
                this.vel.x = 0;

                if (ig.game.player.pos.x <= this.pos.x) { this.flip = true; var x_coord = -4; }
                if (ig.game.player.pos.x >= this.pos.x) { this.flip = false; var x_coord = 4; }
                if(this.distanceTo(ig.game.player) < 32)
                {
                    this.CurrentSpell = "EntityVoidwave";
                }
                else
                {

                    this.CurrentSpell = "EntitySingularity_E";
                }

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
                } var xdir = this.flip ? -1 : 1;
                //this.vel.x = this.speed * xdir;
                this.powerAttackDelayInitiated = false;
            }



          

        },
        barrage_1: function () {


            if (this.phase1FrameCounter == 0) {
                this.phase1FrameCounter = 1;
                ig.game.spawnEntity(EntitySingularity_E, 600, 300);
                ig.game.spawnEntity(EntitySingularity_E, 300, 300);

            }

        },
        barrage_2: function () {


            if (this.phase2FrameCounter == 0) {
                this.phase2FrameCounter = 1;
                ig.game.spawnEntity(EntitySingularity_E, 600, 300);
                ig.game.spawnEntity(EntitySingularity_E, 300, 300);
                ig.game.spawnEntity(EntitySingularity_E, 450, 150);
            }

        }
    });
    EntityVoidwave = ig.Entity.extend({



        size: { x: 16, y: 20 },
        offset: { x: 6, y: 6 },
        maxVel: { x: 450, y: 0 },
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

        power: 90,


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
            this.animSheet = new ig.AnimationSheet('media/AttackAnimation/DarkWave.png', 32, 32);
            this.addAnim('idle', 0.05, [0, 1, 2, 3, 3, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 5, 4, 5, 4, 5]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/WaveSound.mp3');
            //sound.volume = 0.25;
            //sound.play();      
            this.doneDamage = false;
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

            if (!this.flip) {
               
                this.vel.x = 150;
            }
            else {
              
                this.vel.x = -150;
            }


        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            this.delayTimer.set(1.5);
            this.anims.idle.rewind();
            this.doneDamage = false;
          
            if (!this.flip) {

                this.vel.x = 150;
            }
            else {

                this.vel.x = -150;
            }



        },

        update: function () {





            this.parent();
            if (this.delayTimer.delta() > 0) { this.kill(); }
            this.currentAnim.flip.x = this.flip;
        },

        check: function (other) {


            if (this.doneDamage == false) {



                ig.game.checkDamage(other, this, 'PHYSICAL', this.power);
                this.kill();



            }



        }
    });
    EntitySingularity_E = ig.Entity.extend({



        size: { x: 16, y: 16 },
        offset: { x: 8, y: 8 },
        maxVel: { x: 250, y: 0 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        animSheet: new ig.AnimationSheet('media/AttackAnimation/singularity.png', 32, 32),
        name: 'singularity',
        flip: true,

        doneDamage: false,
        delayTimer: null,
        delayTimer2: null,

        firstRound: true,
        gravityFactor: 0,
        goingRight: false,
        goingLeft: false,

        searchDistance: 100,




        power: 45,
        init: function (x, y, settings) {


            this.parent(x, y, settings);

            this.addAnim('idle', 0.1, [0, 1, 2, 3]);

            // Animation for the Enemy1

            this.delayTimer = new ig.Timer();
            this.delayTimer2 = new ig.Timer();
            this.delayTimer2.set(0.4);
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


            if (!this.flip) {
                this.vel.x = 100;
            }

            else {
                this.vel.x = -100;

            }


        },
        reset: function (x, y, settings) {


            this.parent(x, y, settings);

            if (ig.game.difficultyLevel === 1) {
                this.power *= 2;
            }
            else if (ig.game.difficultyLevel === 2) {
                this.power *= 4;
            }
            else if (ig.game.difficultyLevel === 3) {
                this.power *= 8;
            }

            this.delayTimer2.set(0.4);
            this.delayTimer.set(1.5);
            

            if (!this.flip) {
                this.vel.x = 100;
            }

            else {
                this.vel.x = -100;
            }

        




        },
       
        update: function () {


            this.parent();
            //   if (this.delayTimer.delta() > 0) { this.kill(); }
       

            if (ig.game.player && this.distanceTo(ig.game.player) <= this.searchDistance) {

                ig.game.player.accel.x = -1 * (Math.cos(this.angleTo(ig.game.player)) * (Math.pow(this.searchDistance, 2) / this.distanceTo(ig.game.player) + 1));
              //  ig.game.player.accel.y = -1 * (Math.sin(this.angleTo(ig.game.player)) * (Math.pow(this.searchDistance, 2) / this.distanceTo(ig.game.player) + 1));

            }
            if (this.delayTimer.delta() > 0) this.kill();


        },

        check: function (other) {








            if (this.delayTimer2.delta() > 0) {
                ig.game.checkDamage(other, this, 'MIXED', this.power);
                this.delayTimer2.set(0.4);
            }
          




        }
    });



    ig.EntityPool.enableFor(EntityVoidwave);
});