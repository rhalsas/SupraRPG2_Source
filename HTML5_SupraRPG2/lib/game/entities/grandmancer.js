ig.module(
	'game.entities.grandmancer'
	)
.requires(
	'impact.entity',
    'impact.entity-pool'
	)
.defines(function () {
    EntityGrandmancer = ig.Entity.extend({

        size: { x: 8, y: 14 },
        offset: { x: 12, y: 9 },
        collides: ig.Entity.COLLIDES.ACTIVE,

        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.BOTH,
        delayJump: null,
        shootarrow: false,
        setDelayArrow: false,
        health: 99999,
        STAGGER: 0,
        healthBuffer: 0,
        actHealth: 1800,
        name: 'boss',
                                         type_name: 'wizard',
        deadMonster: false,
        ShockWavedoneDamage: false,
        turningInitiated: 0,
        attackWholeTime: 1.25,
        attackAlertTime: 0.5,
        phase1FrameCounter: 0,
        phase2FrameCounter: 0,
        lastPhaseFrameCounter: 0,
        CurrentSpell: 'EntityDarkBlast_ES',
        flip: false,
        EXP_BOUNTY: 170,
        powerAttackDelayInitiated: false,
        powerAttackDelay: null,
        powerAttackAnim: false,
        setShock: false,
        bossInvoked: false,
        deadMonster: false,
        IsMovingRight: false,
        IsBurning: false,
        BurningDMG: 0,
        resetBurn: null,
        frameCalc: 0,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/Enemies/grandMancer.png', 32, 32);
            this.delayATKCD = new ig.Timer();
            this.delayAnim = new ig.Timer();
            this.delayJump = new ig.Timer();
            this.delayShock = new ig.Timer();
            this.resetBurn = new ig.Timer();
            this.Maxhealth = this.actHealth;
            this.Maxmana = this.mana;
            this.ATK = 0;
            this.speed = 40;
            this.powerAttackAnim = false;
            this.healthBuffer = this.health;
        
            this.EXP_BOUNTY = 150;
            this.powerAttackDelay = new ig.Timer();
            this.healthBuffer = this.health;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [0, 1, 2, 3, 4, 5]);
            this.addAnim('attack', 0.1, [6, 7, 6, 7, 6]);
            this.addAnim('die', 0.3, [10,10,10,10,10,11,12],true);
            this.addAnim('attack2', 1, [8]);
        },
        kill: function () {
            this.parent();
       
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 1 });
            //ig.game.EndScreen();
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
            if (this.actHealth / this.Maxhealth >= 0.90) {
                this.movement();
            }
            else if (this.actHealth / this.Maxhealth >= 0.70) {
                this.movement();
                this.manaflare_barrage_1();
            }
            else if (this.actHealth / this.Maxhealth >= 0.50) {
                this.movement();
                this.manaflare_barrage_2();
            }
            else if (this.actHealth / this.Maxhealth >= 0.20) {
                this.movement();
                this.manaflare_barrage_3();
                
            }
            else if (this.actHealth / this.Maxhealth >= 0) {
                this.movement();
                //Cast Eclipse
            }
            else if (this.actHealth <= 0) {





               

                this.vel.x = 0;
                if (this.doOnce === false) {
                    ig.game.invokeDialog("grandmancer2");
                    this.scene_Invoked = true;
                    this.doOnce = true;
                }
                this.deathTimerInvoked = true;


                }
            if (!this.deathTimer && this.deathTimerInvoked == true) {
                this.deathTimer = new ig.Timer();
                if (ig.game.player) {
                    if (ig.game.player.pos.x < this.pos.x) { this.flip = true; }
                    else { this.flip = false;}
                }
                ig.game.destroyBossWalls();
                ig.game.player.EXP += this.EXP_BOUNTY;
                this.currentAnim = this.anims.die.rewind();
                this.deathTimer.set(2.1);
                this.deathTimerInvoked = false;
            }
            if (this.deathTimer && this.deathTimer.delta() > 0 + 1.5) {
                ig.game.spawnTreasure(this.pos.x, this.pos.y, 'GRANDMANCER');
                this.kill();
            }

            this.currentAnim.flip.x = this.flip;
            this.parent();
        },
        movement: function () {
            if (ig.game.player) {
               /* if (this.bossInvoked == false) {
                    if (ig.game.player.vel.y == 0
                        && ig.game.player.pos.y >= this.pos.y
                        && ig.game.player.pos.x <= this.pos.x + 180 && ig.game.player.pos.x >= this.pos.x - 164) {

                        ig.game.invokeDisplayBar('thewinterwitch'); this.bossInvoked = true; ig.game.invokedBossMusic = true;
                    }
                }*/
                if (ig.game.player.pos.x <= this.pos.x + 180 && ig.game.player.pos.x >= this.pos.x - 180) {
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
                    } var xdir = this.flip ? -1 : 1;
                                        // this.vel.x = this.speed * xdir;
                                         this.powerAttackDelayInitiated = false;
                }



                // near edge? return!

                
            }
        },
        manaflare_barrage_1: function () {
            if (this.phase1FrameCounter == 0) {


                ig.game.spawnEntity("EntityRaiseDead_G", 100, this.pos.y - 128);
          
				
            }
           
          
            this.phase1FrameCounter=1;

        },
        manaflare_barrage_2: function () {
            if (this.phase2FrameCounter == 0) {
                ig.game.spawnEntity("EntityRaiseDead_G", 50, this.pos.y - 128);
                ig.game.spawnEntity("EntityRaiseDead_G", 100, this.pos.y - 128);
         
            }


            this.phase2FrameCounter = 1;

        },
        manaflare_barrage_3: function () {
            if (this.lastPhaseFrameCounter == 0) {
                ig.game.spawnEntity("EntityRaiseDead_G", 100, this.pos.y - 128);
                ig.game.spawnEntity("EntityRaiseDead_G", 200, this.pos.y - 128);
                ig.game.spawnEntity("EntityRaiseDead_G", 300, this.pos.y - 128);
          
            }


            this.lastPhaseFrameCounter = 1;

        },
        handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x && this.turningInitiated === 0) {
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


        }


    });

    EntityDarkBlast_ES = ig.Entity.extend({


        animSheet: new ig.AnimationSheet('media/AttackAnimation/darkBlast.png', 16, 16),
        size: { x: 14, y: 11 },
        offset: { x: 0, y: 3 },
        maxVel: { x: 200, y: 0 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'darkspell',
        flip: true,
        reflect: false,
        doneDamage: false,
        delayTimer: null,


        firstRound: true,

        goingRight: false,
        goingLeft: false,




        power: 30,



        init: function (x, y, settings) {

            this.parent(x, y, settings);

            this.addAnim('idle', 0.05, [0, 1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]);

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
            this.addAnim('idle', 0.05, [0, 1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]);
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
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 8 });
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

                if (this.reflect) {
                    other.receiveDamage(damage, this); ig.game.damageTimer(1, damage, 'red');
                }
                else {

                    var retValue = ig.game.checkDamage(other, this, 'MAGICAL', damage, 'isProjectile');
                    if (retValue) {
                        if (retValue == 'REFLECTION') {
                            ig.game.spawnEntity(EntityDarkBlast_E, this.pos.x, this.pos.y, { colorOffset: 8, checkAgainst: ig.Entity.TYPE.B, reflect: true });
                        }
                    }
                }
                this.kill();
            }



        }
    });
    
});