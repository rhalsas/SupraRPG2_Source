ig.module(
	'game.entities.elementalKnight'
	)
.requires(
	'impact.entity',
    'impact.entity-pool'
	)
.defines(function () {
    EntityElementalKnight = ig.Entity.extend({

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
        actHealth: 15000,
        deadMonster: false,
        ShockWavedoneDamage: false,
        attackWholeTime: 1.2,
        attackAlertTime: 1,
        phase1FrameCounter: 0,
        phase2FrameCounter: 0,
        phase3FrameCounter: 0,
        lastPhaseFrameCounter: 0,
        turningInitiated: 0,
        EXP_BOUNTY: 400,
                                               FRENZYCOUNTER: 0,
        CurrentSpell: 'EntityFlameWave',
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
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/Enemies/ElementalKnight.png', 32, 32);
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
            this.EXP_BOUNTY = 400 + randomnumber;
            this.powerAttackDelay = new ig.Timer();
            this.healthBuffer = this.health;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [0, 1, 2, 3, 4, 5]);
            this.addAnim('attack', 0.1, [6, 7, 6, 7, 6]);
            this.addAnim('attack2', 0.05, [12, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14]);
        },
        
        spawnAoe: function () {


            if (this.frameCounter >= 60) { this.buffer++; this.frameCounter = 0; }
            if (this.buffer > 11) { this.buffer = 0; }
            this.frameCounter += this.intensity;
                                             if((this.frameCounter % 10) == 0){
                                             ig.game.spawnEntity('EntityIceHoriShard_E', 514 + (this.buffer * 26), 500, { flip: this.flip });}
            
        },

        update: function () {

         
            if (ig.game.player) {
                   
                if(ig.game.player.pos.y > 600)
                this.spawnAoe();
                ig.game.burningCalc(this);
            
            if (this.ShockWavedoneDamage == true) { if (!this.setShock) { this.setShock = true; this.delayShock.set(0.6 / this.intensity); } }
            if (this.delayShock.delta() > 0) { this.ShockWavedoneDamage = false; this.setShock = false; }
            if (this.health != this.healthBuffer)
            { this.actHealth -= (this.healthBuffer - this.health); this.health = this.healthBuffer; }
            if (this.actHealth / this.Maxhealth >= 0.85) {
                this.movement();
                this.CurrentSpell = 'EntityFlamewave_E';
            }
            else if (this.actHealth / this.Maxhealth >= 0.70) {

                this.intensity = 2;
                this.barrage_1();
            }
            else if (this.actHealth / this.Maxhealth >= 0.55) {
                this.movement();
                this.CurrentSpell = 'EntityIcewave_E';
            }
            else if (this.actHealth / this.Maxhealth >= 0.40) {
                this.intensity = 4;
                this.barrage_2();
                                          
            }
            else if (this.actHealth / this.Maxhealth >= 0.25) {
                this.intensity = 5;
                this.movement();
                this.CurrentSpell = 'EntityThunderwave_E';
                                      
            }
            else if (this.actHealth / this.Maxhealth >= 0.15) {
                this.intensity = 6;
                this.barrage_3();
                this.CurrentSpell = 'EntityThunderwave_E';
                                            
            }
            else if (this.actHealth / this.Maxhealth >= 0) {
                this.intensity = 7;
                this.mageFlare();
                this.movement();
                this.CurrentSpell = 'EntityThunderwave_E';
                                           
            }   
            else if (this.actHealth <= 0) {
                                             var deletedObj = ig.game.getEntityByName('flameFlare');
                                             if(deletedObj){ ig.game.removeEntity(deletedObj);}
                ig.game.currentLevel = 'LevelLevel_DESERT1';
                ig.game.player.killEvents.knightKills += 1; ig.game.player.killEvents.elementalKnightKills += 1;
                difficulty = 5;
                ig.game.player.EXP += this.EXP_BOUNTY;


                 ig.game.data_packet = {x_coord: 64, y_coord: 81, difficulty: ig.game.difficulty };
                                             ig.game.saveGame(ig.game.data_packet);
                ig.game.screenFader = new ig.ScreenFader({ fade: 'in', speed: 2.0 });
                ig.game.soft_paused = true;
                ig.game.bossKill_Event = true;
                ig.game.bossKillElemental_EndScreen = true;

                this.kill();
            }
            }
            this.parent();
        },
        kill: function () {
            this.parent();



            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 2 });
        },
        mageFlare: function () {
            if (this.lastPhaseFrameCounter == 0) {
                ig.game.spawnEntity('EntityFlameFlare', 658, 526, { flip: this.flip });
                this.lastPhaseFrameCounter++;
            }
                                             if (this.lastPhaseFrameCounter == 200) { console.log("damageTaken");ig.game.checkDamage(ig.game.player, this, 'MAGICAL', 100); this.lastPhaseFrameCounter = 1; }
            this.lastPhaseFrameCounter++;
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
           
                if (ig.game.player.pos.x <= this.pos.x + 200 && ig.game.player.pos.x >= this.pos.x - 200) {
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
        barrage_1: function () {
            if (this.phase1FrameCounter == 0) {

               this.pos.x = 190; this.pos.y = 534;
                                             this.immunity = true;
                var settings = { Crystal1: true };
                var settings2 = { Crystal2: true };
                ig.game.spawnEntity('EntityCrystal', 514, 568, settings);
                ig.game.spawnEntity('EntityCrystal', 802, 568, settings2);
                ig.game.spawnEntity('EntityThunderMage', 614, 446);
                ig.game.spawnEntity('EntityThunderMage', 642, 446);
                                             
            }
            this.mageFlare();
            if (ig.game.CrystalDead1 == true && ig.game.CrystalDead2 == true) {
                                              this.immunity = false;
                this.actHealth = this.Maxhealth * 0.695;
                ig.game.CrystalDead1 = false;
                ig.game.CrystalDead2 = false;
                this.lastPhaseFrameCounter = 0;
                                             var deletedObj = ig.game.getEntityByName('flameFlare');
                                             if(deletedObj){ ig.game.removeEntity(deletedObj);}
                                             this.pos.x = 642; this.pos.y = 446;
                                             
                                            
            }
            if(this.phase1FrameCounter >= 3000){ig.game.spawnEntity('EntityThunderMage', 614, 446);
                                             ig.game.spawnEntity('EntityThunderMage', 642, 446);
                                             this.phase1FrameCounter = 1;}
            this.phase1FrameCounter++;
        },
        barrage_2: function () {
            if (this.phase2FrameCounter == 0) {

               this.pos.x = 190; this.pos.y = 534;
                                             this.immunity = true;
                var settings = { Crystal1: true };
                var settings2 = { Crystal2: true };
                                          
                                             ig.game.spawnEntity('EntityCrystal', 514, 568, settings);
                                             ig.game.spawnEntity('EntityCrystal', 802, 568, settings2);

                ig.game.spawnEntity('EntityFlameJuggernaut', 800, 500);
                ig.game.spawnEntity('EntityFlameJuggernaut', 600, 500);
                ig.game.spawnEntity('EntityThunderMage', 642, 446);
                                             
            }
this.mageFlare();
            if (ig.game.CrystalDead1 == true && ig.game.CrystalDead2 == true) {
                                              this.immunity = false;
                this.actHealth = this.Maxhealth * 0.395;
                ig.game.CrystalDead1 = false;
                ig.game.CrystalDead2 = false;
                                             this.lastPhaseFrameCounter = 0;
                                             var deletedObj = ig.game.getEntityByName('flameFlare');
                                             if(deletedObj){ ig.game.removeEntity(deletedObj);
                                             }
                                             this.pos.x = 642; this.pos.y = 446;
                                            
            }

            if(this.phase2FrameCounter >= 3000){ig.game.spawnEntity('EntityFlameJuggernaut', 800, 500);
                                             ig.game.spawnEntity('EntityFlameJuggernaut', 600, 500);
                                             ig.game.spawnEntity('EntityThunderMage', 642, 446);
                                             this.phase2FrameCounter = 1;}
            this.phase2FrameCounter++;

        },
        barrage_3: function () {
            if (this.phase3FrameCounter == 0) {

                this.pos.x = 190; this.pos.y = 534;
                                              this.immunity = true;
                var settings = { Crystal1: true };
                var settings2 = { Crystal2: true };
                                             ig.game.spawnEntity('EntityCrystal', 514, 568, settings);
                                             ig.game.spawnEntity('EntityCrystal', 802, 568, settings2);

                ig.game.spawnEntity('EntityIceKnight', 600, 500);
                ig.game.spawnEntity('EntityIceKnight', 800, 500);
                ig.game.spawnEntity('EntityThunderMage', 642, 446);
                                             
            }
this.mageFlare();
            if (ig.game.CrystalDead1 == true && ig.game.CrystalDead2 == true) {
                                              this.immunity = false;
                this.actHealth = this.Maxhealth * 0.145;
                ig.game.CrystalDead1 = false;
                ig.game.CrystalDead2 = false;
                                             this.lastPhaseFrameCounter = 0;
                                             var deletedObj = ig.game.getEntityByName('flameFlare');
                                             if(deletedObj){  ig.game.removeEntity(deletedObj);}
                                             this.pos.x = 642; this.pos.y = 446;
                                             
            }
            if(this.phase3FrameCounter >= 3000){ig.game.spawnEntity('EntityIceKnight', 600, 500);
                                             ig.game.spawnEntity('EntityIceKnight', 800, 500);
                                             ig.game.spawnEntity('EntityThunderMage', 642, 466);
                                             this.phase3FrameCounter = 1;}
                                             
                                             
            this.phase3FrameCounter++;

        },
        handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x && this.turningInitiated === 0) {

                this.flip = !this.flip;
                this.turningInitiated = 1;
            }




        }
    });
         EntityCrystal = ig.Entity.extend({
                                          
                                          collides: ig.Entity.COLLIDES.FIXED,
                                          
                                          type: ig.Entity.TYPE.B,
                                          size: { x: 22, y: 22 },
                                          offset: { x: 4, y: 4 },
                                          maxVel: { x: 0, y: 0 },
                                          counterGravity: 0,
                                          health: 150,
                                          maxHealth: 150,
                                          actHealth: 150,
                                          EXP_BOUNTY: 33,
                                          Crystal1: false,
                                          Crystal2: false,
                                          
                                          init: function (x, y, settings) {
                                          this.parent(x, y, settings);
                                          this.animSheet = new ig.AnimationSheet('media/Crystal.png', 32, 32);
                                          
                                          this.addAnim('idle', 1, [0]);
                                          
                                          
                                          
                                          
                                          
                                          
                                          
                                          
                                          
                                          },
                                          
                                          
                                          update: function () {
                                          this.parent();
                                          
                                          },
                                          
                                          kill: function(){
                                           ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 4 });
                                          ig.game.CrystalDead1 = (this.Crystal1) ? true : ig.game.CrystalDead1;
                                          ig.game.CrystalDead2 = (this.Crystal2) ? true : ig.game.CrystalDead2;
                                          
                                          ig.game.removeEntity(this);
                                          }
                                          });
         EntityFlamewave_E = ig.Entity.extend({



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




        handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x || res.collision.y) {

                this.kill();

            }




        },
        kill: function () {
            this.parent();

            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 1 });
        },


        init: function (x, y, settings) {


            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/AttackAnimation/FlameWave.png', 32, 32);
            this.addAnim('idle', 0.05, [0, 1, 2, 3, 3, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 5, 4, 5, 4, 5]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/WaveSound.mp3');
            //sound.volume = 0.25;
            //sound.play();
            this.anims.idle.rewind();
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);
            this.doneDamage = false;

            if (ig.game.player.pos.x > this.pos.x) {
                this.flip = false;
                this.vel.x = 100;
            }
            if (ig.game.player.pos.x <= this.pos.x) {
                this.flip = true;
                this.vel.x = -100;
            }


        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            this.delayTimer.set(1.5);
            this.anims.idle.rewind();
            this.doneDamage = false;
            if (ig.game.player.pos.x > this.pos.x) {
                this.flip = false;
                this.vel.x = 100;
            }
            if (ig.game.player.pos.x <= this.pos.x) {
                this.flip = true;
                this.vel.x = -100;
            }


        },

        update: function () {





            this.parent();
            if (this.delayTimer.delta() > 0) { this.kill(); }
            this.currentAnim.flip.x = this.flip;
        },

        check: function (other) {


            if (this.doneDamage == false) {

                var damage = 80;
                var random_c = Math.floor(Math.random() * 10);
                damage *= (random_c > 7) ? 2 : 1;
                ig.game.checkDamage(other, this, 'MAGICAL', damage);
                this.kill();



            }



        }
    });

    EntityIcewave_E = ig.Entity.extend({



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
            this.animSheet = new ig.AnimationSheet('media/AttackAnimation/IceWave.png', 32, 32);
            this.addAnim('idle', 0.05, [0, 1, 2, 3, 3, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 5, 4, 5, 4, 5]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/WaveSound.mp3');
            //sound.volume = 0.25;
            //sound.play();
            this.doneDamage = false;
            this.anims.idle.rewind();
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);


            if (ig.game.player.pos.x > this.pos.x) {
                this.flip = false;
                this.vel.x = 100;
            }
            if (ig.game.player.pos.x <= this.pos.x) {
                this.flip = true;
                this.vel.x = -100;
            }


        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            this.delayTimer.set(1.5);
            this.anims.idle.rewind();
            this.doneDamage = false;
            if (ig.game.player.pos.x > this.pos.x) {
                this.flip = false;
                this.vel.x = 100;
            }
            if (ig.game.player.pos.x <= this.pos.x) {
                this.flip = true;
                this.vel.x = -100;
            }



        },

        update: function () {





            this.parent();
            if (this.delayTimer.delta() > 0) { this.kill(); }
            this.currentAnim.flip.x = this.flip;
        },

        check: function (other) {


            if (this.doneDamage == false) {

                var damage = 150;
                
                ig.game.checkDamage(other, this, 'MAGICAL', damage);
                this.kill();



            }



        }
    });

    EntityThunderwave_E = ig.Entity.extend({



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
            this.animSheet = new ig.AnimationSheet('media/AttackAnimation/ThunderWave.png', 32, 32);
            this.addAnim('idle', 0.05, [0, 1, 2, 3, 3, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 5, 4, 5, 4, 5]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/WaveSound.mp3');
            //sound.volume = 0.25;
            //sound.play();
            this.doneDamage = false;
            this.anims.idle.rewind();
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);


            if (ig.game.player.pos.x > this.pos.x) {
                this.flip = false;
                this.vel.x = 200;
            }
            if (ig.game.player.pos.x <= this.pos.x) {
                this.flip = true;
                this.vel.x = -200;
            }


        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            this.delayTimer.set(1.5);
            this.anims.idle.rewind();
            this.doneDamage = false;
            if (ig.game.player.pos.x > this.pos.x) {
                this.flip = false;
                this.vel.x = 200;
            }
            if (ig.game.player.pos.x <= this.pos.x) {
                this.flip = true;
                this.vel.x = -200;
            }



        },
        
        update: function () {





            this.parent();
            if (this.delayTimer.delta() > 0) { this.kill(); }
            this.currentAnim.flip.x = this.flip;
        },

        check: function (other) {


            if (this.doneDamage == false) {

                var damage = 70;
                var type = 'MAGICAL';
                var random_c = Math.floor(Math.random() * 10);
                if (random_c > 7) { type = 'MIXED';}
                ig.game.checkDamage(other, this, type, damage);
                this.kill();



            }



        }
    });
    EntityFlameFlare = ig.Entity.extend({



        size: { x: 64, y: 64 },
        offset: { x: 0, y: 0 },
        maxVel: { x: 0, y: 0 },
        type: ig.Entity.TYPE.NONE,

        collides: ig.Entity.COLLIDES.NONE,

        name: 'flameFlare',
        flip: true,










        init: function (x, y, settings) {


            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/AttackAnimation/flameFlare.png', 64, 64);
            this.addAnim('idle', 0.15, [0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0, 1, 2, 3, 0]);
            //var sound = new ig.Sound('media/Music/Electric.mp3');
            //sound.volume = 0.25;
            //sound.play();
            // Animation for the Enemy1







        },

        update: function () {





            this.parent();
            if (ig.game.secondBossKilled == true) { this.kill(); }
            this.currentAnim.flip.x = this.flip;
        }



    });
  
    EntityIceHoriShard_E = ig.Entity.extend({



        size: { x: 14, y: 11 },
        offset: { x: 0, y: 3 },
        maxVel: { x: 250, y: 250 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,


        flip: true,

        doneDamage: false,
        delayTimer: null,
        delayTimer2: null,

        firstRound: true,

        goingRight: false,
        goingLeft: false,

        intensity: 1,






        init: function (x, y, settings) {


            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/AttackAnimation/IceShards.png', 16, 16);
            this.addAnim('idle', 0.05, [0, 1, 0, 1, 0, 1, 0, 1, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]);
           
            // Animation for the Enemy1
            this.currentAnim.angle = (90 * (Math.PI / 180));
            this.delayTimer = new ig.Timer();
            this.delayTimer2 = new ig.Timer();
            this.delayTimer2.set(0.4);
            this.delayTimer.set(1.5);
            this.doneDamage = false;
            this.intensity = 1;
            if (ig.game.player != null) {

                if (ig.game.player.pos.x > this.pos.x) {
                    this.flip = false;
                    this.vel.y = 400;
                }
                if (ig.game.player.pos.x <= this.pos.x) {
                    this.flip = true;
                    this.vel.y = -400;
                }
            }








        },
        reset: function (x, y, settings) {


            this.parent(x, y, settings);



            this.delayTimer2.set(0.4);
            this.delayTimer.set(1.5);
            this.currentAnim.angle = (90 * (Math.PI / 180));
            this.doneDamage = false;
            if (ig.game.player != null) {

                if (ig.game.player.pos.x > this.pos.x) {
                    this.flip = false;
                    this.vel.y = 400;
                }
                if (ig.game.player.pos.x <= this.pos.x) {
                    this.flip = true;
                    this.vel.y = -400;
                }
            }





        },

        update: function () {


            this.parent();
           

        },
        kill: function () {
            this.parent();
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 8 });
        },
        check: function (other) {


            if (this.doneDamage == false) {




                this.doneDamage = true;
                var type = 'MAGICAL';
                var damage = (10 * this.intensity);
                ig.game.checkDamage(other, this, type, damage);
                                            this.kill();


            }



        },
        handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x || res.collision.y) {

                this.kill();

            }




        },
    });
    ig.EntityPool.enableFor(EntityIceHoriShard_E);
 

 

});