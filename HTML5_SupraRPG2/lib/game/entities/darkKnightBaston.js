ig.module(
	'game.entities.darkKnightBaston'
	)
.requires(
	'impact.entity',
    'impact.entity-pool'
	)
.defines(function () {
    EntityDarkKnightBaston = ig.Entity.extend({

        size: { x: 8, y: 14 },
        offset: { x: 12, y: 9 },
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
        actHealth: 4000,
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
        CurrentSpell: 'EntityThunderwave_E',
        IsBurning: false,
        BurningDMG: 0,
        resetBurn: null,
        enableAttacking: false,
        frameCalc: 0,
        amount: 5,
        delayAttack: null,
        bombSpringActive: false,
        bombCount: 0,
        deathTimer: null,
        deathTimerInvoked: false,
        waitingForScene: true,
        phaseOnNro: '0',
        phase1FrameCounter: 0,
        phaseTimer: new ig.Timer(),
        bombSpringCD: new ig.Timer(),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/Enemies/DarkKnight.png', 32, 32),
            this.powerAttackDelay = new ig.Timer();
            this.delayShock = new ig.Timer();
            this.resetBurn = new ig.Timer();
            this.Maxhealth = this.actHealth;
            this.Maxmana = this.mana;
            this.ATK = 30;
            this.speed = 25;
            this.attackWholeTime = 1.5;
            this.attackAlertTime = 0.5;
            this.healthBuffer = this.health;
            this.doOnce = false;
            this.EXP_BOUNTY = 400;
            // Animation for the Enemy1

            this.delayAttack1 = new ig.Timer();
            this.delayAttack1.set(5);
            this.addAnim('stand', 1, [0]);
            this.addAnim('idle', 0.07, [0, 1, 2, 3, 4, 5]);
            this.addAnim('attack', 0.1, [6, 7, 6, 7, 6]);
            this.addAnim('die', 0.3, [8, 8, 8, 8, 8, 9, 10], true);
            this.addAnim('attack2', 0.05, [12, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14]);
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
     
        manaflare_barrage_1: function () {
            if (this.phase1FrameCounter === 0 && !this.immunity) {
                ig.game.spawnEntity('EntitySummonEffect', this.pos.x - 16, this.pos.y - 16);
                this.immunity = true;
                this.phaseTimer.set(0.5);
            }
            this.pos.x =388;
            this.pos.y =86;
            this.flip = true;
            if (this.phase1FrameCounter == 1 && this.phaseTimer.delta() > 0) {

                for (var i = 0; i < 8; i++) {
                    ig.game.spawnEntity('EntityDarkBurst_E', 144 + 64 * i, 190, { flip: this.flip });
                }


            }
            if (this.phase1FrameCounter == 2 && this.phaseTimer.delta() > 0) {
                for (var i = 0; i < 8; i++) {
                    ig.game.spawnEntity('EntityDarkBurst_E', 176 + 64 * i, 190, { flip: this.flip });
                }
            }
            if (this.phase1FrameCounter == 3 && this.phaseTimer.delta() > 0) {
                for (var i = 0; i < 8; i++) {
                    ig.game.spawnEntity('EntityDarkBurst_E', 144 + 64 * i, 190, { flip: this.flip });
                }

            }
            if (this.phase1FrameCounter == 4 && this.phaseTimer.delta() > 0) {

                for (var i = 0; i < 8; i++) {
                    ig.game.spawnEntity('EntityDarkBurst_E', 176 + 64 * i, 190, { flip: this.flip });
                }
            }
            if (this.phase1FrameCounter == 5 && this.phaseTimer.delta() > 0) {
                for (var i = 0; i < 8; i++) {
                    ig.game.spawnEntity('EntityDarkBurst_E', 144 + 64 * i, 190, { flip: this.flip });
                }

            }
            if (this.phase1FrameCounter == 6 && this.phaseTimer.delta() > 0) {
                for (var i = 0; i < 8; i++) {
                    ig.game.spawnEntity('EntityDarkBurst_E', 176 + 64 * i, 190, { flip: this.flip });
                }
            }
            else if (this.phase1FrameCounter == 7 && this.phaseTimer.delta() > 0) {
                this.immunity = false;
                this.phase1FrameCounter = 0;
                this.phaseOnNro = "2";




            }

            if (this.phaseTimer.delta() > 0 && this.immunity) {
                this.phase1FrameCounter++;
                this.phaseTimer.set(0.5);
            }
         
           

        },
       
        manaflare_barrage_3: function () {
            if (this.phase1FrameCounter === 0 &&  !this.immunity) {
                ig.game.spawnEntity('EntitySummonEffect', this.pos.x - 16, this.pos.y - 16);
                this.immunity = true;
                this.phaseTimer.set(0.5);
            }
            this.pos.x = 388;
            this.pos.y = 86;
            this.flip = true;
           

            if (this.phase1FrameCounter == 1 && this.phaseTimer.delta() > 0) {

                for (var i = 0; i < 8; i++) {
                    ig.game.spawnEntity('EntityDarkBurst_E', 144 + 64 * i, 190, { flip: this.flip });
                }


            }
            if (this.phase1FrameCounter == 2 && this.phaseTimer.delta() > 0) {
                for (var i = 0; i < 8; i++) {
                    ig.game.spawnEntity('EntityDarkBurst_E', 176 + 64 * i, 190, { flip: this.flip });
                }
            }
            if (this.phase1FrameCounter == 3 && this.phaseTimer.delta() > 0) {
                for (var i = 0; i < 8; i++) {
                    ig.game.spawnEntity('EntityDarkBurst_E', 144 + 64 * i, 190, { flip: this.flip });
                }

            }
            if (this.phase1FrameCounter == 4 && this.phaseTimer.delta() > 0) {

                for (var i = 0; i < 8; i++) {
                    ig.game.spawnEntity('EntityDarkBurst_E', 176 + 64 * i, 190, { flip: this.flip });
                }
            }
            if (this.phase1FrameCounter == 5 && this.phaseTimer.delta() > 0) {
                for (var i = 0; i < 8; i++) {
                    ig.game.spawnEntity('EntityDarkBurst_E', 144 + 64 * i, 190, { flip: this.flip });
                }

            }
            if (this.phase1FrameCounter == 6 && this.phaseTimer.delta() > 0) {
                for (var i = 0; i < 8; i++) {
                    ig.game.spawnEntity('EntityDarkBurst_E', 176 + 64 * i, 190, { flip: this.flip });
                }
            }
            else if (this.phase1FrameCounter == 7 && this.phaseTimer.delta() > 0) {
                this.immunity = false;
                this.phase1FrameCounter = 0;
                this.phaseOnNro = "4";




            }

            if (this.phaseTimer.delta() > 0 && this.immunity) {
                this.phase1FrameCounter++;
                this.phaseTimer.set(0.5);
            }

        },
        update: function () {
            // near edge? return!

            if (this.waitingForScene) {

                this.currentAnim = this.anims.stand;
                this.immunity = true;
                if (ig.game.player && this.distanceTo(ig.game.player) <= 120 &&   ig.game.player.pos.y <= this.pos.y + 32 && ig.game.player.pos.y >= this.pos.y -32) { this.immunity = false; ig.game.invokeDialog("darkKnight"); this.waitingForScene = false; }

            }
            if (ig.game.scene_Invoked === false) {


                if (this.health != this.healthBuffer)
                { this.actHealth -= (this.healthBuffer - this.health); this.health = this.healthBuffer; }

                if (this.actHealth / this.Maxhealth >= 0.75 && this.phaseOnNro === "0") {
                    this.CurrentSpell = "EntityThunderwave_E";

                }
                else if (this.actHealth / this.Maxhealth < 0.75 && this.phaseOnNro === "0") {
                    this.phaseOnNro = "1";
                }

               
                if (this.actHealth / this.Maxhealth >= 0.5 && this.phaseOnNro === "2") {

                    this.CurrentSpell = "EntityFlamewave_E";
                }
                else if (this.actHealth / this.Maxhealth < 0.5 && this.phaseOnNro === "2") {
                    this.phaseOnNro = "3";
                  
                }


                if (this.actHealth / this.Maxhealth >= 0 && this.phaseOnNro === "4") {
                    this.CurrentSpell = "EntityDarkwave";
                }
               
                
               if (this.actHealth / this.Maxhealth <= 0) {
                    ig.game.getSelectionUp(11);

                    this.vel.x = 0;
                    if (this.doOnce === false) {
                        ig.game.invokeDialog("darkKnight2");
                        this.scene_Invoked = true;
                        this.doOnce = true;
                    }
                    this.deathTimerInvoked = true;
                }
                if (this.delayAttack1.delta() > 0) {
                    
                    this.delayAttack1.set(5);

                }
                if (this.phaseOnNro === "1") {
                    this.manaflare_barrage_1();
                }
                else if(this.phaseOnNro === "3"){
                    this.manaflare_barrage_3();
                }

                if (!this.deathTimer && this.deathTimerInvoked === true) {
                    this.deathTimer = new ig.Timer();

                    ig.game.destroyBossWalls();
                    ig.game.player.EXP += this.EXP_BOUNTY;
                    this.currentAnim = this.anims.die.rewind();
                    this.deathTimer.set(2.1);
                    this.deathTimerInvoked = false;
                }
                if (this.deathTimer && this.deathTimer.delta() > 0 + 1.5) {



                    ig.game.spawnTreasure(this.pos.x, this.pos.y, 'BLACKKNIGHT');
                    ig.game.levelChangeButtonInvoked = true;
                    ig.game.myTouchButtons.searchButton("levelChangeButtonInvoked", true);
                    ig.game.levelChangeData = { name: 'LevelLevel_DimensionOfDespair1', x_coord: 120, y_coord: 32 };
                    LevelSelectOptionSkip = 11;




                    this.kill();
                }
                if (this.vel.x > 0) { this.IsMovingRight = true; }
                else if (this.vel.x < 0) { this.IsMovingRight = false; }
                if (this.ShockWavedoneDamage == true) { if (!this.setShock) { this.setShock = true; this.delayShock.set(0.4); } }
                if (this.delayShock.delta() > 0) { this.ShockWavedoneDamage = false; this.setShock = false; }
                if (ig.game.player != null) {

                    ig.game.burningCalc(this);
                    if (ig.game.player && this.distanceTo(ig.game.player) <= 100) {
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

        power: 50,


        handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x || res.collision.y) {

              

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
            this.delayTimer.set(1.5);
            this.anims.idle.rewind();
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

                this.vel.x = 100;
            }
            else {

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

                var damage = this.power;
                var random_c = Math.floor(Math.random() * 10);
                damage *= (random_c > 7) ? 2 : 1;
                ig.game.checkDamage(other, this, 'MAGICAL', damage);
              



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
        power:  60,



        handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x || res.collision.y) {

         

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
            this.delayTimer.set(1.5);
            this.anims.idle.rewind();
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

                this.vel.x = 100;
            }
            else {

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

                var damage = this.power;

                ig.game.checkDamage(other, this, 'MAGICAL', damage);
                



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

        power: 70,


        handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x || res.collision.y) {

               

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
            this.delayTimer.set(1.5);
            this.anims.idle.rewind();
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

                this.vel.x = 100;
            }
            else {

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

                var damage = this.power;
                var type = 'MAGICAL';
                var random_c = Math.floor(Math.random() * 10);
                if (random_c > 7) { type = 'MIXED'; }
                ig.game.checkDamage(other, this, type, damage);
              



            }



        }
    });
    EntityDarkwave = ig.Entity.extend({



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


        power: 100,

        handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x || res.collision.y) {

               

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
            this.anims.idle.rewind();
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

                this.vel.x = 100;
            }
            else {

                this.vel.x = -100;
            }


        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            this.delayTimer.set(1.5);
            this.anims.idle.rewind();
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

                this.vel.x = 100;
            }
            else {

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



                ig.game.checkDamage(other, this, 'MIXED', this.power);
               



            }



        }
    });
    EntityDarkBurst_E = ig.Entity.extend({



        size: { x: 32, y: 32 },
        offset: { x: 0, y: 4 },
        maxVel: { x: 0, y: 0 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'DarkBurst',
        flip: true,

        doneDamage: false,
        delayTimer: null,
        delayTimer2: null,

        firstRound: true,

        goingRight: false,
        goingLeft: false,



        power: 30,




        init: function (x, y, settings) {


            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/AttackAnimation/DarkBurst.png', 32, 32);
            this.addAnim('idle', 0.05, [0, 1, 0, 1, 0, 1, 0, 1, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]);

            // Animation for the Enemy1
            if (difficultyLevel === 1) {
                this.power *= 2;
            }
            else if (difficultyLevel === 2) {
                this.power *= 4;
            }
            else if (difficultyLevel === 3) {
                this.power *= 8;
            }
            this.delayTimer = new ig.Timer();
            this.delayTimer2 = new ig.Timer();
            this.delayTimer2.set(0.4);
            this.delayTimer.set(1.5);
            this.delayDamage = new ig.Timer();
            this.delayDamage.set(0.3);
            if (ig.game.player.pos.x > this.pos.x) { this.flip = false; }
            if (ig.game.player.pos.x <= this.pos.x) { this.flip = true; }








        },
        reset: function (x, y, settings) {


            this.parent(x, y, settings);

            if (difficultyLevel === 1) {
                this.power *= 2;
            }
            else if (difficultyLevel === 2) {
                this.power *= 4;
            }
            else if (difficultyLevel === 3) {
                this.power *= 8;
            }

            this.delayTimer2.set(0.4);
            this.delayTimer.set(1.5);
            this.delayDamage.set(0.3);
            if (ig.game.player.pos.x > this.pos.x) { this.flip = false; }
            if (ig.game.player.pos.x <= this.pos.x) { this.flip = true; }








        },

        update: function () {


            this.parent();
            if (this.delayTimer.delta() > 0) { this.kill(); }

        },

        check: function (other) {








            if (this.delayDamage.delta() > 0) {
                ig.game.checkDamage(other, this, 'MAGICAL', this.power);

                this.delayDamage.set(0.3);
            }









        }
    });

    ig.EntityPool.enableFor(EntityDarkBurst_E);

    ig.EntityPool.enableFor(EntityDarkwave);


});