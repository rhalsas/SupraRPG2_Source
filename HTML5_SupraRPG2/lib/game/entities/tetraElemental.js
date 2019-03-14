ig.module(
	'game.entities.tetraElemental'
	)
.requires(
	'impact.entity',
    'impact.entity-pool'
	)
.defines(function () {
    EntityTetraElemental = ig.Entity.extend({

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
        actHealth: 3500,
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
        CurrentSpell: 'EntityFlameBreath_E',
        IsBurning: false,
        BurningDMG: 0,
        resetBurn: null,
        enableAttacking: false,
        frameCalc: 0,
        amount: 5,
        delayAttack: null,
        bombSpringActive: false,
        bombCount: 0,
        bombSpringCD: new ig.Timer(),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/Enemies/TetraElemental.png', 32, 32),
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
            this.EXP_BOUNTY = 400;
            // Animation for the Enemy1

            this.delayAttack1 = new ig.Timer();
            this.delayAttack1.set(5);
            this.addAnim('idle', 0.07, [0, 1, 2, 3, 4, 5]);
            this.addAnim('attack', 0.1, [6, 7, 6, 7, 6]);
            this.addAnim('die', 0.3, [10, 11, 12],true);
            //this.addAnim( 'attack2', 0.05, [12,12,13,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14] );
            this.addAnim('attack2', 1, [7]);
        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);

            this.Maxhealth = this.actHealth;
            this.Maxmana = this.mana;
            this.ATK = 30;
            this.speed = 25;
            this.attackWholeTime = 1.5;
            this.attackAlertTime = 0.5;
            this.healthBuffer = this.health;
            this.EXP_BOUNTY = 400;
            // Animation for the Enemy1

            this.delayAttack1 = new ig.Timer();
            this.delayAttack1.set(5);

            this.addAnim('idle', 0.07, [0, 1, 2, 3, 4, 5]);
            this.addAnim('attack', 0.1, [6, 7, 6, 7, 6]);
            this.addAnim('die', 0.3, [10, 11, 12], true);
            //this.addAnim( 'attack2', 0.05, [12,12,13,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14] );
            this.addAnim('attack2', 1, [7]);
        },
        kill: function () {
            this.parent();
            if (ig.game.SOUNDON) {
                var sound = new ig.Sound('media/Music/BloodSplat.m4a');
                sound.play();
            }
            ig.game.player.killEvents.monsterKills += 1; ig.game.player.killEvents.red_wizardKills += 1;
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
        barrageLaunch: function () {
            
            for (var i = 0; i < 10; i++) {
                var ySpeed = -100 + (Math.random() * 100);
            
                if (this.actHealth / this.Maxhealth >= 0.75) {
                    ig.game.spawnEntity("EntityFlameSpell_E", this.pos.x, this.pos.y - 16, { flip: this.flip, vel: {x: 0, y:ySpeed} });
                }
                else if (this.actHealth / this.Maxhealth >= 0.50) {

                   
                    ig.game.spawnEntity("EntityFrostSpell_E", this.pos.x, this.pos.y - 16, { flip: this.flip, vel: { x: 0, y: ySpeed } });
                }
                else if (this.actHealth / this.Maxhealth >= 0.25) {
                    
                    ig.game.spawnEntity('EntityElectricSpell_E', this.pos.x, this.pos.y - 16, { flip: this.flip, vel: { x: 0, y: ySpeed } });
                }
                else if (this.actHealth / this.Maxhealth >= 0) {
                   
                    ig.game.spawnEntity("EntityFrostFireSpell_E", this.pos.x, this.pos.y - 16, { flip: this.flip, vel: { x: 0, y: ySpeed } });
                }
            }
        },
        update: function () {
            // near edge? return!
            if (this.health != this.healthBuffer)
            { this.actHealth -= (this.healthBuffer - this.health); this.health = this.healthBuffer; }

            if (this.actHealth / this.Maxhealth >= 0.75) {
                this.CurrentSpell = 'EntityFlameBreath_E';
            }
            else if (this.actHealth / this.Maxhealth >= 0.50) {

                this.CurrentSpell = 'EntityFrostBreath_E';
            }
            else if (this.actHealth / this.Maxhealth >= 0.25) {
                this.CurrentSpell = 'EntityFrostBreath_E';
            }
            else if (this.actHealth / this.Maxhealth >= 0) {
                this.CurrentSpell = 'EntityTetraBreath_E';
            }

            else if (this.actHealth <= 0) {


                ig.game.getSelectionUp(13);

                this.vel.x = 0;
                if (this.doOnce === false) {
                    ig.game.invokeDialog("tetraElemental2");
                    this.scene_Invoked = true;
                    this.doOnce = true;
                }
                this.deathTimerInvoked = true;


            }
            if (this.delayAttack1.delta() > 0) {
                this.barrageLaunch();
                this.delayAttack1.set(5);
                
            }
            if (!this.deathTimer && this.deathTimerInvoked == true) {
                this.deathTimer = new ig.Timer();

                ig.game.destroyBossWalls();
                ig.game.player.EXP += this.EXP_BOUNTY;
                this.currentAnim = this.anims.die.rewind();
                this.deathTimer.set(2.1);
                this.deathTimerInvoked = false;
            }
            if (this.deathTimer && this.deathTimer.delta() > 0 + 1.5) {

                ig.game.spawnTreasure(this.pos.x, this.pos.y, 'DEMONKING');
                LevelSelectOptionSkip = 13;
                this.kill();
            }
            if (this.vel.x > 0) { this.IsMovingRight = true; }
            else if (this.vel.x < 0) { this.IsMovingRight = false; }

            if (this.actHealth > 0) {
                if (this.ShockWavedoneDamage == true) { if (!this.setShock) { this.setShock = true; this.delayShock.set(0.4); } }
                if (this.delayShock.delta() > 0) { this.ShockWavedoneDamage = false; this.setShock = false; }
                if (ig.game.player != null) {

                    ig.game.burningCalc(this);
                    if (ig.game.player.pos.x <= this.pos.x + 32 && ig.game.player.pos.x >= this.pos.x - 32 && ig.game.player.pos.y <= this.pos.y + 16 && ig.game.player.pos.y >= this.pos.y - 16) {
                        this.enableAttacking = true;
                    }
                    if (this.enableAttacking == true) {
                        this.vel.x = 0;

                        if (ig.game.player.pos.x <= this.pos.x) { this.flip = true; var x_coord = -32; }
                        else if (ig.game.player.pos.x > this.pos.x) { this.flip = false; var x_coord = 8; }
                        var y_coord = -16;

                        if (this.powerAttackDelayInitiated == false) {
                            this.currentAnim = this.anims.attack; this.powerAttackDelayInitiated = true;
                            this.powerAttackDelay.set(this.attackWholeTime); this.powerAttackAnim = true;
                        }

                        if (this.powerAttackDelay.delta() < 0 && this.powerAttackDelay.delta() > -this.attackAlertTime && this.powerAttackAnim == true) {
                            this.enableAttacking = false;


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
    EntityElectricSpell_E = ig.Entity.extend({


        animSheet: new ig.AnimationSheet('media/AttackAnimation/LazorSpell.png', 16, 16),
        size: { x: 14, y: 11 },
        offset: { x: 0, y: 9 },
        maxVel: { x: 150, y: 100 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        type: "MAGIC",
        name: 'lazorspell',
        flip: true,
        reflect: false,
        doneDamage: false,
        delayTimer: null,

        gravityFactor: 0,
        firstRound: true,

        goingRight: false,
        goingLeft: false,


        power: 40,





        init: function (x, y, settings) {


            this.parent(x, y, settings);
            this.addAnim('idle', 0.1, [0, 1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
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
            if (this.flip) {

                this.vel.x = (this.reflect) ? 300 : -300;
            } else {
                this.vel.x = (this.reflect) ? -300 : 300;
            }

        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 0.1, [0, 1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
            //sound.volume = 0.25;
            //sound.play();
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);
            this.doneDamage = false;
         
            if (this.flip) {

                this.vel.x = (this.reflect) ? 300 : -300;
            } else {
                this.vel.x = (this.reflect) ? -300 : 300;
            }
        },
        handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x || res.collision.y) {

                this.kill();

            }




        },
        kill: function () {
            this.parent();
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 2 });
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

                

                    var retValue = ig.game.checkDamage(other, this, this.type, damage, 'isProjectile');
                   
                


                this.kill();

            }



        }

    });
    EntityFrostSpell_E = ig.Entity.extend({


        animSheet: new ig.AnimationSheet('media/AttackAnimation/FrostBall.png', 16, 16),
        size: { x: 14, y: 11 },
        offset: { x: 0, y: 9 },
        maxVel: { x: 150, y: 100 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        type: "MAGIC",
        name: 'lazorspell',
        flip: true,
        reflect: false,
        doneDamage: false,
        delayTimer: null,

        gravityFactor: 0,
        firstRound: true,

        goingRight: false,
        goingLeft: false,

        power: 40,






        init: function (x, y, settings) {


            this.parent(x, y, settings);
            this.addAnim('idle', 0.1, [0, 1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
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
            if (this.flip) {

                this.vel.x = (this.reflect) ? 300 : -300;
            } else {
                this.vel.x = (this.reflect) ? -300 : 300;
            }

        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 0.1, [0, 1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
            //sound.volume = 0.25;
            //sound.play();
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);
            this.doneDamage = false;
          
            if (this.flip) {

                this.vel.x = (this.reflect) ? 300 : -300;
            } else {
                this.vel.x = (this.reflect) ? -300 : 300;
            }
        },
        handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x || res.collision.y) {

                this.kill();

            }




        },
        kill: function () {
            this.parent();
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 2 });
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

                

                     var retValue = ig.game.checkDamage(other, this, this.type, damage, 'isProjectile');
                    
                


                this.kill();

            }



        }

    });
    EntityFlameSpell_E = ig.Entity.extend({


        animSheet: new ig.AnimationSheet('media/AttackAnimation/FireBall.png', 16, 16),
        size: { x: 14, y: 11 },
        offset: { x: 0, y: 9 },
        maxVel: { x: 150, y: 100 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        type: "MAGIC",
        name: 'lazorspell',
        flip: true,
        reflect: false,
        doneDamage: false,
        delayTimer: null,

        gravityFactor: 0,
        firstRound: true,

        goingRight: false,
        goingLeft: false,


        power: 40,





        init: function (x, y, settings) {


            this.parent(x, y, settings);
            this.addAnim('idle', 0.1, [0, 1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
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
            if (this.flip) {

                this.vel.x = (this.reflect) ? 300 : -300;
            } else {
                this.vel.x = (this.reflect) ? -300 : 300;
            }

        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 0.1, [0, 1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
            //sound.volume = 0.25;
            //sound.play();
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);
            this.doneDamage = false;
        
            if (this.flip) {

                this.vel.x = (this.reflect) ? 300 : -300;
            } else {
                this.vel.x = (this.reflect) ? -300 : 300;
            }
        },
        handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x || res.collision.y) {

                this.kill();

            }




        },
        kill: function () {
            this.parent();
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 2 });
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

               

                var retValue = ig.game.checkDamage(other, this, this.type, damage, 'isProjectile');
                   
                


                this.kill();

            }



        }

    });
    EntityFrostFireSpell_E = ig.Entity.extend({


        animSheet: new ig.AnimationSheet('media/AttackAnimation/FrostFireBall.png', 16, 16),
        size: { x: 14, y: 11 },
        offset: { x: 0, y: 9 },
        maxVel: { x: 150, y: 100 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        type: "MAGIC",
        name: 'lazorspell',
        flip: true,
        reflect: false,
        doneDamage: false,
        delayTimer: null,

        gravityFactor: 0,
        firstRound: true,

        goingRight: false,
        goingLeft: false,
        power: 40,







        init: function (x, y, settings) {


            this.parent(x, y, settings);
            this.addAnim('idle', 0.1, [0, 1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
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
            if (this.flip) {

                this.vel.x = (this.reflect) ? 300 : -300;
            } else {
                this.vel.x = (this.reflect) ? -300 : 300;
            }

        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 0.1, [0, 1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
            //sound.volume = 0.25;
            //sound.play();
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);
            this.doneDamage = false;
       
            if (this.flip) {

                this.vel.x = (this.reflect) ? 300 : -300;
            } else {
                this.vel.x = (this.reflect) ? -300 : 300;
            }
        },
        handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x || res.collision.y) {

                this.kill();

            }




        },
        kill: function () {
            this.parent();
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 2 });
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



                var retValue = ig.game.checkDamage(other, this, this.type, damage, 'isProjectile');




                this.kill();

            }



        }

    });
    EntityFlameBreath_E = ig.Entity.extend({


        animSheet: new ig.AnimationSheet('media/AttackAnimation/FlameBreath.png', 32, 32),
        size: { x: 32, y: 30 },
        offset: { x: 0, y: 1 },
        maxVel: { x: 0, y: 0 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        type: "MAGIC",
        name: 'flamebreath',
        flip: true,
        reflect: false,
        doneDamage: false,
        delayTimer: null,
        delayTimer2: null,

        firstRound: true,

        goingRight: false,
        goingLeft: false,


        power: 35,





        init: function (x, y, settings) {


            this.parent(x, y, settings);
            this.addAnim('idle', 0.1, [0, 1, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
            //sound.volume = 0.25;
            //sound.play();
            this.delayTimer2 = new ig.Timer();
            this.delayTimer = new ig.Timer();
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
           

        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 0.1, [0, 1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
            //sound.volume = 0.25;
            //sound.play();
            this.delayTimer2 = new ig.Timer();
            this.delayTimer2.set(0.4);
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);
       
           
        },
        handleMovementTrace: function (res) {
            this.parent(res);

            




        },
        kill: function () {
            this.parent();
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 2 });
        },
        update: function () {





            this.parent();
            if (this.delayTimer.delta() > 0) { this.kill(); }
            this.currentAnim.flip.x = this.flip;
        },

        check: function (other) {


            if (this.delayTimer2.delta() > 0) {
                var damage = this.power;

                this.delayTimer2.set(0.4);



                other.isBurning = true;

                var retValue = ig.game.checkDamage(other, this, this.type, damage, 'isProjectile');

            }
                
                


              

            



        }

    });
    EntityFrostBreath_E = ig.Entity.extend({


        animSheet: new ig.AnimationSheet('media/AttackAnimation/FrostBreath.png', 32, 32),
        size: { x: 32, y: 30 },
        offset: { x: 0, y: 1 },
        maxVel: { x: 0, y: 0 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        type: "MAGIC",
        name: 'flamebreath',
        flip: true,
        reflect: false,
        doneDamage: false,
        delayTimer: null,
        power: 28,

        firstRound: true,

        goingRight: false,
        goingLeft: false,
        delayTimer2: null,







        init: function (x, y, settings) {


            this.parent(x, y, settings);
            this.addAnim('idle', 0.1, [0, 1, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
            //sound.volume = 0.25;
            //sound.play();
            this.delayTimer2 = new ig.Timer();
            this.delayTimer2.set(0.4);
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


        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 0.1, [0, 1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
            //sound.volume = 0.25;
            //sound.play();
            this.delayTimer2 = new ig.Timer();
            this.delayTimer2.set(0.4);
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);
        

        },
        handleMovementTrace: function (res) {
            this.parent(res);






        },
        kill: function () {
            this.parent();
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 2 });
        },
        update: function () {





            this.parent();
            if (this.delayTimer.delta() > 0) { this.kill(); }
            this.currentAnim.flip.x = this.flip;
        },

        check: function (other) {



            if (this.delayTimer2.delta() > 0) {
                var damage = this.power;

                this.delayTimer2.set(0.4);



               

                var retValue = ig.game.checkDamage(other, this, this.type, damage, 'isProjectile');

            }










        }

    });
    EntityTetraBreath_E = ig.Entity.extend({


        animSheet: new ig.AnimationSheet('media/AttackAnimation/TetraBreath.png', 32, 32),
        size: { x: 32, y: 30 },
        offset: { x: 0, y: 1 },
        maxVel: { x: 0, y: 0 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,
        type: "MAGIC",
        name: 'flamebreath',
        flip: true,
        reflect: false,
        doneDamage: false,
        delayTimer: null,


        firstRound: true,

        goingRight: false,
        goingLeft: false,
        delayTimer2: null,

        power:  40,





        init: function (x, y, settings) {


            this.parent(x, y, settings);
            this.addAnim('idle', 0.1, [0, 1, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2, 3, 4, 2]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
            //sound.volume = 0.25;
            //sound.play();
            this.delayTimer2 = new ig.Timer();
            this.delayTimer2.set(0.4);
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


        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 0.1, [0, 1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
            //sound.volume = 0.25;
            //sound.play();
            this.delayTimer2 = new ig.Timer();
            this.delayTimer2.set(0.4);
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);
        

        },
        handleMovementTrace: function (res) {
            this.parent(res);






        },
        kill: function () {
            this.parent();
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 2 });
        },
        update: function () {





            this.parent();
            if (this.delayTimer.delta() > 0) { this.kill(); }
            this.currentAnim.flip.x = this.flip;
        },

        check: function (other) {



            if (this.delayTimer2.delta() > 0) {
                this.delayTimer2.set(0.4);
                var damage = this.power;





                other.isBurning = true;

                var retValue = ig.game.checkDamage(other, this, this.type, damage, 'isProjectile');

            }










        }

    });


});