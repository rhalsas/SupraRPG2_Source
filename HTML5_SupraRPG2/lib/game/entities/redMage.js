ig.module(
	'game.entities.redMage'
	)
.requires(
	'impact.entity',
    'impact.entity-pool',
	'game.entities.goblin',
	'game.entities.bluegoblin',
	'game.entities.orangegoblin',
	'game.entities.purplegoblin',
	'game.entities.flameJuggernaut',
	'game.entities.iceJuggernaut'
	)
.defines(function () {
    EntityRedMage = ig.Entity.extend({

        size: { x: 8, y: 14 },
        offset: { x: 12, y: 9 },
        collides: ig.Entity.COLLIDES.ACTIVE,
        ShockWavedoneDamage: false,
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.BOTH,
        delayJump: null,
        shootarrow: false,
        setDelayArrow: false,
        health: 25,
        name: 'wizard',
        STAGGER: 0,
        healthBuffer: 0,
        actHealth: 25,
        deadMonster: false,
        EXP_BOUNTY: 8,
                                                              FRENZYCOUNTER: 0,
        MP: 0,
        turningInitiated: 0,
        powerAttackDelayInitiated: false,
        powerAttackDelay: null,
        powerAttackAnim: false,
        setShock: false,
        IsMovingRight: false,
        CurrentSpell: 'EntityFireSpell2_E',
        IsBurning: false,
        BurningDMG: 0,
        resetBurn: null,
        enableAttacking: false,
        frameCalc: 0,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/Enemies/Wizards.png', 32, 32),
            this.powerAttackDelay = new ig.Timer();
            this.delayShock = new ig.Timer();
            this.resetBurn = new ig.Timer();
            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
            this.ATK = 0;
            this.speed = 25;
            this.attackWholeTime = 1.5;
            this.attackAlertTime = 0.5;
            this.healthBuffer = this.health;
            this.EXP_BOUNTY = 12;
            // Animation for the Enemy1
        

            this.addAnim('idle', 0.07, [12, 13, 14, 15, 16,17]);
            this.addAnim('attack', 0.1, [18, 19, 18, 19, 18]);
            this.addAnim('attack2', 1, [20]);
            this.addAnim('alert', 1, [18,19]);
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
            this.EXP_BOUNTY = 12;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [12, 13, 14, 15, 16, 17]);
            this.addAnim('attack', 0.1, [18, 19, 18, 19, 18]);
            this.addAnim('attack2', 1, [20]);
            this.addAnim('alert', 1, [18, 19]);
        },
        kill: function () {
            this.parent();
                                     if(ig.game.SOUNDON){
                                     var sound = new ig.Sound('media/Music/BloodSplat.m4a');
                                     sound.play();}
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
        update: function () {
            // near edge? return!

            if (this.vel.x > 0) { this.IsMovingRight = true; }
            else if (this.vel.x < 0) { this.IsMovingRight = false; }
            if (this.ShockWavedoneDamage == true) { if (!this.setShock) { this.setShock = true; this.delayShock.set(0.4); } }
            if (this.delayShock.delta() > 0) { this.ShockWavedoneDamage = false; this.setShock = false; }
            if (ig.game.player != null) {
              
                ig.game.burningCalc(this);
                if (ig.game.player.pos.x <= this.pos.x + 80 && ig.game.player.pos.x >= this.pos.x - 80 && ig.game.player.pos.y <= this.pos.y + 16 && ig.game.player.pos.y >= this.pos.y - 16) {
                    this.enableAttacking = true;
                }
                if(this.enableAttacking == true){
                    this.vel.x = 0;
                   
                    if (ig.game.player.pos.x <= this.pos.x) {  this.flip = true; var x_coord = 0; }
                    else if (ig.game.player.pos.x > this.pos.x) { this.flip = false; var x_coord = 8; }
                    var y_coord = 0;

                    if (this.powerAttackDelayInitiated == false) {
                        this.currentAnim = this.anims.attack; this.powerAttackDelayInitiated = true;
                        this.powerAttackDelay.set(this.attackWholeTime); this.powerAttackAnim = true;
                    }

                    if (this.powerAttackDelay.delta() < 0 && this.powerAttackDelay.delta() > -this.attackAlertTime && this.powerAttackAnim == true) {
                        this.enableAttacking = false;
                        if (this.CurrentSpell === "EntityRaiseDead_1" || this.CurrentSpell === "EntityRaiseDead_2" || this.CurrentSpell === "EntityRaiseDead_3" ||this.CurrentSpell === "EntityRaiseDead_4")
                        {
                            y_coord = -16;
                            if (ig.game.player.pos.x <= this.pos.x) {x_coord -= 32; }
                            else if (ig.game.player.pos.x > this.pos.x) {
                               // x_coord += 24;
                            }
                            if (this.summoningAmount) { this.summoningAmount -= 1; }
                        }
                        
                        if (this.CurrentSpell === "EntityBombThrow_1_E"
                            || this.CurrentSpell === "EntityBombThrow_2_E"
                            || this.CurrentSpell === "EntityBombThrow_3_E"
                            || this.CurrentSpell === "EntityBombThrow_4_E"
                            || this.CurrentSpell === "EntityBombThrow_Bouncy_1_E"
                            || this.CurrentSpell === "EntityBombThrow_Bouncy_2_E"
                            )
                        {
                            y_coord = -16;
                            if (ig.game.player.pos.x <= this.pos.x) {x_coord -= 8; }
                            else if (ig.game.player.pos.x > this.pos.x) {
                               // x_coord += 24;
                            }
                        }

                        if (this.CurrentSpell === "BombCluster") {
                            y_coord = -16;
                            if (ig.game.player.pos.x <= this.pos.x) { x_coord -= 8; }
                            else if (ig.game.player.pos.x > this.pos.x) {
                                // x_coord += 24;
                                ig.game.spawnEntity(EntityBombThrow_Bouncy_2_E, this.pos.x + x_coord, this.pos.y + y_coord, { flip: this.flip });
                                ig.game.spawnEntity(EntityBombThrow_Bouncy_2_E, this.pos.x + x_coord, this.pos.y + y_coord * 2, { flip: this.flip });
                                ig.game.spawnEntity(EntityBombThrow_Bouncy_2_E, this.pos.x + x_coord, this.pos.y + y_coord * 3, { flip: this.flip });
                            }
                        }
                        else {
                            ig.game.spawnEntity(this.CurrentSpell, this.pos.x + x_coord, this.pos.y + y_coord, { flip: this.flip });
                        }
                                    
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


            this.currentAnim.flip.x = this.flip;
            this.parent();
        },
                                
        check: function (other) {
                                     if(ig.Entity.TYPE.A == other.type){
                              
                                        if (other.pos.x <= this.pos.x) { this.flip = true; }
                                        else if (other.pos.x >= this.pos.x) { this.flip = false; }
                                     }else{
                                        if (other.type == ig.Entity.TYPE.B && this.turningInitiated == 0){ this.turningInitiated = 1; this.flip = !this.flip;
                                        }
                                     
                                     }
       


                                   
        },
        kill: function () {
            this.parent();
          /*  var sound = new ig.Sound('media/Music/BloodSplat.m4a');
            sound.play();*/
            ig.game.player.killEvents.wizardKills += 1; ig.game.player.killEvents.red_wizardKills += 1;
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 1 });
            //ig.game.EndScreen();
        }

    });
    ig.EntityPool.enableFor(EntityRedMage);
    EntityFireSpell_E = ig.Entity.extend({


        animSheet: new ig.AnimationSheet('media/AttackAnimation/FireBall.png', 16, 16),
        size: { x: 14, y: 11 },
        offset: { x: 0, y: 9 },
        maxVel: { x: 450, y: 450 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'firespell',
        flip: true,
        reflect: false,
        doneDamage: false,
        delayTimer: null,
        angle: 0,
        gravityFactor: 0,
        firstRound: true,
        projSpeed: 150,
        goingRight: false,
        goingLeft: false,


        power: 20,





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
            this.currentAnim.angle = this.angle;
            this.vel.y = Math.floor(Math.sin(this.currentAnim.angle) * this.projSpeed); 
            this.vel.x = Math.floor(Math.cos(this.currentAnim.angle) * this.projSpeed);                  

             if(this.reflect){
                this.vel.x *= -1;
                this.vel.y *= -1;
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
          
            this.currentAnim.angle = this.angle;
            /*if (this.flip) {
                                         
                                         this.vel.x = (this.reflect) ? 300 : -300;
                                         }else{
                                         this.vel.x =  (this.reflect) ? -300 : 300;
                                         }*/

            this.vel.y = Math.floor(Math.sin(this.currentAnim.angle)  * this.projSpeed); 
            this.vel.x =  Math.floor(Math.cos(this.currentAnim.angle) * this.projSpeed);

            if(this.reflect){
                this.vel.x *= -1;
                this.vel.y *= -1;
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

                if (this.reflect) {
                    other.receiveDamage(damage, this); ig.game.damageTimer(1, damage, 'red');
                }
                else {

                    var retValue = ig.game.checkDamage(other, this, 'MAGIC', damage, 'isProjectile');
                    if (retValue) {
                        if (retValue == 'REFLECTION') {
                            ig.game.spawnEntity(EntityFireSpell_E, this.pos.x, this.pos.y, { colorOffset: 8, checkAgainst: ig.Entity.TYPE.B, reflect: true });
                        }
                    }
                }


                this.kill();

            }



        }

    });
    EntityFireSpell2_E = ig.Entity.extend({


        animSheet: new ig.AnimationSheet('media/AttackAnimation/FireBall.png', 16, 16),
        size: { x: 14, y: 11 },
        offset: { x: 0, y: 9 },
        maxVel: { x: 450, y: 450 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'firespell',
        flip: true,
        reflect: false,
        doneDamage: false,
        delayTimer: null,
        angle: 0,
        gravityFactor: 0,
        firstRound: true,
        projSpeed: 150,
        goingRight: false,
        goingLeft: false,

        power:20,






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
                this.vel.x = -150;
            }
            else {
                this.vel.x = 150;
            }

            if (this.reflect) {
                this.vel.x *= -1;
                this.vel.y *= -1;
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
         
         
            /*if (this.flip) {
                                         
                                         this.vel.x = (this.reflect) ? 300 : -300;
                                         }else{
                                         this.vel.x =  (this.reflect) ? -300 : 300;
                                         }*/

            if (this.flip) {
                this.vel.x = -150;
            }
            else {
                this.vel.x= 150;
            }

            if (this.reflect) {
                this.vel.x *= -1;
                this.vel.y *= -1;
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
                other.isBurning = true;
                if (this.reflect) {
                    other.receiveDamage(damage, this); ig.game.damageTimer(1, damage, 'red');
                }
                else {

                    var retValue = ig.game.checkDamage(other, this, 'MAGIC', damage, 'isProjectile');
                    if (retValue) {
                        if (retValue == 'REFLECTION') {
                            ig.game.spawnEntity(EntityFireSpell_E, this.pos.x, this.pos.y, { colorOffset: 8, checkAgainst: ig.Entity.TYPE.B, reflect: true });
                        }
                    }
                }


                this.kill();

            }



        }

    });
    EntityBombThrow_Bouncy_1_E = ig.Entity.extend({



        size: { x: 16, y: 16 },
        offset: { x: 8, y: 10 },
        maxVel: { x: 50, y: 50 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'bombthrow',
        flip: true,

        doneDamage: false,
        delayTimer: null,
        delayTimer2: null,

        firstRound: true,

        goingRight: false,
        goingLeft: false,

        delayDamage: null,

        bounciness: 0.75,

        power: 35,

        init: function (x, y, settings) {


            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/AttackAnimation/BombAndExplosion.png', 32, 32);
            this.addAnim('idle', 0.05, [0, 1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3]);
            this.addAnim('explosion', 0.05, [4, 5, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9]);

            // Animation for the Enemy1

            this.delayTimer = new ig.Timer();
            this.delayDamage = new ig.Timer();
            this.delayTimer2 = new ig.Timer();
            this.delayDamage = new ig.Timer();
            this.delayTimer2.set(0.4);
            this.delayTimer.set(2);
            this.delayDamage.set(1.5);
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

            if (this.flip) {

                this.vel.x = -50;
            } else {
                this.vel.x = 50;
            }
            this.vel.y = -50;



        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/AttackAnimation/BombAndExplosion.png', 32, 32);
            this.addAnim('idle', 0.05, [0, 1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3]);
            this.addAnim('explosion', 0.05, [4, 5, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9]);

            // Animation for the Enemy1

            this.delayTimer = new ig.Timer();
            this.delayDamage = new ig.Timer();
            this.delayTimer2 = new ig.Timer();
            this.delayDamage = new ig.Timer();
            this.delayTimer2.set(0.4);
            this.delayTimer.set(2);
            this.delayDamage.set(1.5);
            this.doneDamage = false;
          
            if (this.flip) {

                this.vel.x = -50;
            } else {
                this.vel.x = 50;
            }
            this.vel.y = -50;
        },

        update: function () {


            this.parent();
            if (this.delayTimer.delta() > 0) { this.kill(); }
            if (this.delayDamage.delta() > 0) { this.currentAnim = this.anims.explosion; }
        },
        
        check: function (other) {






            if (this.delayDamage.delta() > 0) {

                if (this.doneDamage === false) {

                    ig.game.checkDamage(other, this, 'MAGIC', this.power, 'isProjectile');
                    this.doneDamage = true;
                }




            }










        }

    });
    EntityBombThrow_Bouncy_2_E = ig.Entity.extend({



        size: { x: 16, y: 16 },
        offset: { x: 8, y: 10 },
        maxVel: { x: 50, y: 50 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'bombthrow',
        flip: true,

        doneDamage: false,
        delayTimer: null,
        delayTimer2: null,

        firstRound: true,

        goingRight: false,
        goingLeft: false,

        delayDamage: null,

        bounciness: 0.75,
        power: 50,


        init: function (x, y, settings) {


            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/AttackAnimation/BombAndExplosion.png', 32, 32);
            this.addAnim('idle', 0.05, [0, 1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3]);
            this.addAnim('explosion', 0.05, [4, 5, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9]);

            // Animation for the Enemy1

            this.delayTimer = new ig.Timer();
            this.delayDamage = new ig.Timer();
            this.delayTimer2 = new ig.Timer();
            this.delayDamage = new ig.Timer();
            this.delayTimer2.set(0.4);
            this.delayTimer.set(2);
            this.delayDamage.set(1.5);
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

            if (this.flip) {

                this.vel.x = -50;
            } else {
                this.vel.x = 50;
            }
            this.vel.y = -50;



        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/AttackAnimation/BombAndExplosion.png', 32, 32);
            this.addAnim('idle', 0.05, [0, 1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3]);
            this.addAnim('explosion', 0.05, [4, 5, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9]);

            // Animation for the Enemy1

            this.delayTimer = new ig.Timer();
            this.delayDamage = new ig.Timer();
            this.delayTimer2 = new ig.Timer();
            this.delayDamage = new ig.Timer();
            this.delayTimer2.set(0.4);
            this.delayTimer.set(2);
            this.delayDamage.set(1.5);
            this.doneDamage = false;
          
            if (this.flip) {

                this.vel.x = -50;
            } else {
                this.vel.x = 50;
            }
            this.vel.y = -50;
        },

        update: function () {


            this.parent();
            if (this.delayTimer.delta() > 0) { this.kill(); }
            if (this.delayDamage.delta() > 0) { this.currentAnim = this.anims.explosion; }
        },
        
        check: function (other) {






            if (this.delayDamage.delta() > 0) {

                if (this.doneDamage === false) {
                    ig.game.checkDamage(other, this, 'MAGIC', this.power, 'isProjectile');
                    this.doneDamage = true;
                }




            }










        }

    });
	  EntityBombThrow_1_E = ig.Entity.extend({



        size: { x: 16, y: 16 },
        offset: { x: 8, y: 10 },
        maxVel: { x: 50, y: 50 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'bombthrow',
        flip: true,

        doneDamage: false,
        delayTimer: null,
        delayTimer2: null,

        firstRound: true,

        goingRight: false,
        goingLeft: false,

        delayDamage: null,

          power: 40,



        init: function (x, y, settings) {


            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/AttackAnimation/BombAndExplosion.png', 32, 32);
            this.addAnim('idle', 0.05, [0, 1, 2, 3, 2, 3,2, 3,  2, 3, 2, 3,2, 3,2, 3, 2, 3,2, 3,  2, 3, 2, 3,2, 3, 2, 3, 2, 3]);
			this.addAnim('explosion', 0.05, [4, 5, 6, 7, 8, 9,6, 7,  8, 9, 6, 7, 8, 9,6, 7,  8, 9,6, 7, 8, 9,6, 7,  8, 9,6, 7,8,9]);

            // Animation for the Enemy1

			this.delayTimer = new ig.Timer();
			this.delayDamage = new ig.Timer();
            this.delayTimer2 = new ig.Timer();
                                          this.delayDamage = new ig.Timer();
            this.delayTimer2.set(0.4);
            this.delayTimer.set(2);
            this.delayDamage.set(1.5);
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

                                          if (this.flip) {

                                              this.vel.x = -50;
                                          } else {
                                              this.vel.x = 50;
                                          }
                                          this.vel.y = -50;



        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/AttackAnimation/BombAndExplosion.png', 32, 32);
            this.addAnim('idle', 0.05, [0, 1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3]);
            this.addAnim('explosion', 0.05, [4, 5, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9]);

            // Animation for the Enemy1

            this.delayTimer = new ig.Timer();
            this.delayDamage = new ig.Timer();
            this.delayTimer2 = new ig.Timer();
            this.delayDamage = new ig.Timer();
            this.delayTimer2.set(0.4);
            this.delayTimer.set(2);
            this.delayDamage.set(1.5);
         
            this.doneDamage = false;
                                              if (this.flip) {

                                                  this.vel.x = -50;
                                              } else {
                                                  this.vel.x = 50;
                                              }
                                              this.vel.y = -50;
        },

        update: function () {


            this.parent();
            if (this.delayTimer.delta() > 0) { this.kill(); }
            if (this.delayDamage.delta()>0) { this.currentAnim = this.anims.explosion; }
        },
        handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x || res.collision.y) {

                this.vel.x = 0;

            }




        },
        check: function (other) {






            if (this.delayDamage.delta() > 0) {
                
                if (this.doneDamage === false) {
                    
                    ig.game.checkDamage(other, this, 'MAGIC', this.power, 'isProjectile');
										   this.doneDamage = true;
										  }
                                               
                                   
                                          
                                          
                                          }

      
            







        }

	  });

	  EntityBombThrow_2_E = ig.Entity.extend({



	      size: { x: 16, y: 16 },
	      offset: { x: 8, y: 10 },
	      maxVel: { x: 50, y: 50 },
	      type: ig.Entity.TYPE.NONE,
	      checkAgainst: ig.Entity.TYPE.A,
	      collides: ig.Entity.COLLIDES.NONE,

	      name: 'bombthrow',
	      flip: true,

	      doneDamage: false,
	      delayTimer: null,
	      delayTimer2: null,

	      firstRound: true,

	      goingRight: false,
	      goingLeft: false,

	      delayDamage: null,

          power: 40,



	      init: function (x, y, settings) {


	          this.parent(x, y, settings);
	          this.animSheet = new ig.AnimationSheet('media/AttackAnimation/BombAndExplosion.png', 32, 32);
	          this.addAnim('idle', 0.05, [0, 1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3]);
	          this.addAnim('explosion', 0.05, [4, 5, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9]);

	          // Animation for the Enemy1

	          this.delayTimer = new ig.Timer();
	          this.delayDamage = new ig.Timer();
	          this.delayTimer2 = new ig.Timer();
	          this.delayDamage = new ig.Timer();
	          this.delayTimer2.set(0.4);
	          this.delayTimer.set(2);
	          this.delayDamage.set(1.5);
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

	          if (this.flip) {

	              this.vel.x = -50;
	          } else {
	              this.vel.x = 50;
	          }
	          this.vel.y = -50;



	      },
	      reset: function (x, y, settings) {
	          this.parent(x, y, settings);
	          this.animSheet = new ig.AnimationSheet('media/AttackAnimation/BombAndExplosion.png', 32, 32);
	          this.addAnim('idle', 0.05, [0, 1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3]);
	          this.addAnim('explosion', 0.05, [4, 5, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9]);

	          this.delayTimer = new ig.Timer();
	          this.delayDamage = new ig.Timer();
	          this.delayTimer2 = new ig.Timer();
	          this.delayDamage = new ig.Timer();
	          this.delayTimer2.set(0.4);
	          this.delayTimer.set(2);
	        
	          this.doneDamage = false;
	          this.delayDamage.set(1.5);

	          if (this.flip) {

	              this.vel.x = -50;
	          } else {
	              this.vel.x = 50;
	          }
	          this.vel.y = -50;
	      },

	      update: function () {


	          this.parent();
	          if (this.delayTimer.delta() > 0) { this.kill(); }
	          if (this.delayDamage.delta() > 0) { this.currentAnim = this.anims.explosion; }
	      },
	      handleMovementTrace: function (res) {
	          this.parent(res);

	          if (res.collision.x || res.collision.y) {

	              this.vel.x = 0;

	          }




	      },
	      check: function (other) {






	          if (this.delayDamage.delta() > 0) {

	              if (this.doneDamage === false) {

	                  ig.game.checkDamage(other, this, 'MAGIC', this.power, 'isProjectile');
	                  this.doneDamage = true;
	              }




	          }










	      }

	  });
	  EntityBombThrow_3_E = ig.Entity.extend({



	      size: { x: 16, y: 16 },
	      offset: { x: 8, y: 10 },
	      maxVel: { x: 50, y: 50 },
	      type: ig.Entity.TYPE.NONE,
	      checkAgainst: ig.Entity.TYPE.A,
	      collides: ig.Entity.COLLIDES.NONE,

	      name: 'bombthrow',
	      flip: true,
          power: 70,
	      doneDamage: false,
	      delayTimer: null,
	      delayTimer2: null,

	      firstRound: true,

	      goingRight: false,
	      goingLeft: false,

	      delayDamage: null,





	      init: function (x, y, settings) {


	          this.parent(x, y, settings);
	          this.animSheet = new ig.AnimationSheet('media/AttackAnimation/BombAndExplosion.png', 32, 32);
	          this.addAnim('idle', 0.05, [0, 1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3]);
	          this.addAnim('explosion', 0.05, [4, 5, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9]);

	          // Animation for the Enemy1

	          this.delayTimer = new ig.Timer();
	          this.delayDamage = new ig.Timer();
	          this.delayTimer2 = new ig.Timer();
	          this.delayDamage = new ig.Timer();
	          this.delayTimer2.set(0.4);
	          this.delayTimer.set(2);
	          this.delayDamage.set(1.5);
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

	          if (this.flip) {

	              this.vel.x = -50;
	          } else {
	              this.vel.x = 50;
	          }
	          this.vel.y = -50;



	      },
	      reset: function (x, y, settings) {
	          this.parent(x, y, settings);
	          this.animSheet = new ig.AnimationSheet('media/AttackAnimation/BombAndExplosion.png', 32, 32);
	          this.addAnim('idle', 0.05, [0, 1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3]);
	          this.addAnim('explosion', 0.05, [4, 5, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9]);

	          this.delayTimer = new ig.Timer();
	          this.delayDamage = new ig.Timer();
	          this.delayTimer2 = new ig.Timer();
	          this.delayDamage = new ig.Timer();
	        
	          this.delayTimer2.set(0.4);
	          this.delayTimer.set(2);
	          this.delayDamage.set(1.5);
	          this.doneDamage = false;
	          if (this.flip) {

	              this.vel.x = -50;
	          } else {
	              this.vel.x = 50;
	          }
	          this.vel.y = -50;
	      },

	      update: function () {


	          this.parent();
	          if (this.delayTimer.delta() > 0) { this.kill(); }
	          if (this.delayDamage.delta() > 0) { this.currentAnim = this.anims.explosion; }
	      },
	      handleMovementTrace: function (res) {
	          this.parent(res);

	          if (res.collision.x || res.collision.y) {

	              this.vel.x = 0;

	          }




	      },
	      check: function (other) {






	          if (this.delayDamage.delta() > 0) {

	              if (this.doneDamage === false) {

	                  var retValue = ig.game.checkDamage(other, this, 'MAGIC', this.power, 'isProjectile');
	                  this.doneDamage = true;
	              }




	          }










	      }

	  });
	  EntityBombThrow_4_E = ig.Entity.extend({



	      size: { x: 16, y: 16 },
	      offset: { x: 8, y: 10 },
	      maxVel: { x: 50, y: 50 },
	      type: ig.Entity.TYPE.NONE,
	      checkAgainst: ig.Entity.TYPE.A,
	      collides: ig.Entity.COLLIDES.NONE,

	      name: 'bombthrow',
	      flip: true,

	      doneDamage: false,
	      delayTimer: null,
	      delayTimer2: null,

	      firstRound: true,

	      goingRight: false,
	      goingLeft: false,

	      delayDamage: null,

          power: 100,



	      init: function (x, y, settings) {


	          this.parent(x, y, settings);
	          this.animSheet = new ig.AnimationSheet('media/AttackAnimation/BombAndExplosion.png', 32, 32);
	          this.addAnim('idle', 0.05, [0, 1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3]);
	          this.addAnim('explosion', 0.05, [4, 5, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9]);

	          // Animation for the Enemy1

	          this.delayTimer = new ig.Timer();
	          this.delayDamage = new ig.Timer();
	          this.delayTimer2 = new ig.Timer();
	          this.delayDamage = new ig.Timer();
	          this.delayTimer2.set(0.4);
	          this.delayTimer.set(2);

	          if (difficultyLevel === 1) {
	              this.power *= 2;
	          }
	          else if (difficultyLevel === 2) {
	              this.power *= 4;
	          }
	          else if (difficultyLevel === 3) {
	              this.power *= 8;
	          }
	          this.delayDamage.set(1.5);

	          this.doneDamage = false;

	          if (this.flip) {

	              this.vel.x = -50;
	          } else {
	              this.vel.x = 50;
	          }
	          this.vel.y = -50;



	      },
	      reset: function (x, y, settings) {
	          this.parent(x, y, settings);
	          this.animSheet = new ig.AnimationSheet('media/AttackAnimation/BombAndExplosion.png', 32, 32);
	          this.addAnim('idle', 0.05, [0, 1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3]);
	          this.addAnim('explosion', 0.05, [4, 5, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9, 6, 7, 8, 9]);

	          // Animation for the Enemy1

	          this.delayTimer = new ig.Timer();
	          this.delayDamage = new ig.Timer();
	          this.delayTimer2 = new ig.Timer();
	          this.delayDamage = new ig.Timer();
	          this.delayTimer2.set(0.4);
	          this.delayTimer.set(2);

	       
	          this.delayDamage.set(1.5);
	          this.doneDamage = false;
	          if (this.flip) {

	              this.vel.x = -50;
	          } else {
	              this.vel.x = 50;
	          }
	          this.vel.y = -50;
	      },

	      update: function () {


	          this.parent();
	          if (this.delayTimer.delta() > 0) { this.kill(); }
	          if (this.delayDamage.delta() > 0) { this.currentAnim = this.anims.explosion; }
	      },
	      handleMovementTrace: function (res) {
	          this.parent(res);

	          if (res.collision.x || res.collision.y) {

	              this.vel.x = 0;

	          }




	      },
	      check: function (other) {






	          if (this.delayDamage.delta() > 0) {

	              if (this.doneDamage === false) {

	                  var retValue = ig.game.checkDamage(other, this, 'MAGIC', this.power, 'isProjectile');
	                  this.doneDamage = true;
	              }




	          }










	      }

	  });
    EntityIcespike_E = ig.Entity.extend({


        animSheet: new ig.AnimationSheet('media/AttackAnimation/FrostBall.png', 16, 16),
        size: { x: 14, y: 11 },
        offset: { x: 0, y: 3 },
        maxVel: { x: 150, y: 0 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'icespell',
        flip: true,
        reflect: false,
        doneDamage: false,
        delayTimer: null,


        firstRound: true,

        goingRight: false,
        goingLeft: false,

        power: 15,






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
                                        }else{
                                        this.vel.x =  (this.reflect) ? -300 : 300;
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
                                        }else{
                                        this.vel.x =  (this.reflect) ? -300 : 300;
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
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 4 });
        },
        update: function () {





            this.parent();
            if (this.delayTimer.delta() > 0) { this.kill(); }
            this.currentAnim.flip.x = this.flip;
        },

        check: function (other) {


            if (this.doneDamage == false) {




                this.doneDamage = true;
                var damage = this.power;
            

                if (this.reflect) {
                    other.receiveDamage(damage, this); ig.game.damageTimer(1, damage, 'red');
                }
                else {

                    var retValue = ig.game.checkDamage(other, this, 'MAGIC', damage, 'isProjectile');
                    if (retValue) {
                        if (retValue == 'REFLECTION') {
                            ig.game.spawnEntity(EntityIcespike_E, this.pos.x, this.pos.y, { colorOffset: 8, checkAgainst: ig.Entity.TYPE.B, reflect: true });
                        }
                    }
                }
                this.kill();

            }



        }
    });
    EntityIceShards_E = ig.Entity.extend({


        animSheet: new ig.AnimationSheet('media/AttackAnimation/IceShards.png', 16, 16),
        size: { x: 14, y: 11 },
        offset: { x: 0, y: 3 },
        maxVel: { x: 250, y: 0 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'icespell',
        flip: true,

        doneDamage: false,
        delayTimer: null,
        reflect: false,

        firstRound: true,

        goingRight: false,
        goingLeft: false,

        power: 35,






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
            console.log(this.power);
                                         if (this.flip) {
                                         
                                         this.vel.x = (this.reflect) ? 400 : -400;
                                         }else{
                                         this.vel.x =  (this.reflect) ? -400 : 400;
                                         }

        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 0.05, [0, 1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]);
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);
            this.doneDamage = false;
         
           
                                         if (this.flip) {
                                         
                                         this.vel.x = (this.reflect) ? 400 : -400;
                                         }else{
                                         this.vel.x =  (this.reflect) ? -400 : 400;
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




                this.doneDamage = true;
                var damage = this.power;
                this.doneDamage = true;

                if (this.reflect) {
                    other.receiveDamage(damage, this); ig.game.damageTimer(1, damage, 'red');
                }
                else {

                    var retValue = ig.game.checkDamage(other, this, 'MAGIC', damage, 'isProjectile');
                    if (retValue) {
                        if (retValue == 'REFLECTION') {
                            ig.game.spawnEntity(EntityIceShards_E, this.pos.x, this.pos.y, { colorOffset: 8, checkAgainst: ig.Entity.TYPE.B, reflect: true });
                        }
                    }
                }
                this.kill();

            }



        }
    });
    EntityDarkBlast_E = ig.Entity.extend({


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

        power: 40,






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
                                         }else{
                                         this.vel.x =  (this.reflect) ? -300 : 300;
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
                                         }else{
                                         this.vel.x =  (this.reflect) ? -300 : 300;
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

                    var retValue = ig.game.checkDamage(other, this, 'MAGIC', damage, 'isProjectile');
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
         EntityLightningSpell_E = ig.Entity.extend({
                                              
                                              
                                              animSheet: new ig.AnimationSheet('media/AttackAnimation/ElectricSpell.png', 16, 16),
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
                                              
                                              power: 60,
                                              firstRound: true,
                                              
                                              goingRight: false,
                                              goingLeft: false,
                                              
                                              
                                              
                                              
                                              
                                              
                                              
                                              
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
                                                   }else{
                                                   this.vel.x =  (this.reflect) ? -300 : 300;
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
                                                   }else{
                                                   this.vel.x =  (this.reflect) ? -300 : 300;
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
                                              ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 13 });
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
                                              
                                              var retValue = ig.game.checkDamage(other, this, 'MAGIC', damage, 'isProjectile');
                                              if (retValue) {
                                              if (retValue == 'REFLECTION') {
                                              ig.game.spawnEntity(EntityLightningSpell_E, this.pos.x, this.pos.y, { colorOffset: 8, checkAgainst: ig.Entity.TYPE.B, reflect: true });
                                              }
                                              }
                                              }
                                              this.kill();
                                              }
                                              
                                              
                                              
                                              }
         });
         EntityRaiseDead_G = ig.Entity.extend({


             animSheet: new ig.AnimationSheet('media/AttackAnimation/SummonSphere.png', 32, 32),

             size: { x: 32, y: 32 },

             maxVel: { x: 0, y: 0 },
             type: ig.Entity.TYPE.NONE,

             collides: ig.Entity.COLLIDES.NONE,

             name: 'raisedead',
             flip: true,

             doneDamage: false,
             delayTimer: null,


             firstRound: true,

             goingRight: false,
             goingLeft: false,

             spawningMonster: true,






             init: function (x, y, settings) {


                 this.addAnim('idle', 0.1, [0, 1, 2, 3]);
                 this.parent(x, y, settings);
                 // Animation for the Enemy1
                 //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
                 //sound.volume = 0.25;
                 //sound.play();
                 this.delayTimer = new ig.Timer();
                 this.delayTimer.set(1.5);
                 this.doneDamage = false;


             },
             reset: function (x, y, settings) {
                 this.addAnim('idle', 0.1, [0, 1, 2, 3]);
                 this.parent(x, y, settings);
                 // Animation for the Enemy1
                 //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
                 //sound.volume = 0.25;
                 //sound.play();
                 this.delayTimer = new ig.Timer();
                 this.delayTimer.set(1.5);
                 this.doneDamage = false;

             },
             handleMovementTrace: function (res) {
                 this.parent(res);

                 if (res.collision.x || res.collision.y) {

                     this.kill();

                 }




             },
             kill: function () {
                 this.parent();

             },
             update: function () {





                 this.parent();
                 if (this.spawningMonster === true) {
                     var randum = ((Math.random() * 2) >> 0);

                     if (randum == 0) {
                         ig.game.spawnEntity(EntityNecromancer, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2);

                     }
                     else {
                         ig.game.spawnEntity(EntityNecromancer, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2);
                     }
                     this.spawningMonster = false;
                 }
                 if (this.delayTimer.delta() > 0) {
                     this.kill();
                 }
                 this.currentAnim.flip.x = this.flip;
             }



         });
		EntityRaiseDead_1 = ig.Entity.extend({

         
        animSheet: new ig.AnimationSheet('media/AttackAnimation/SummonSphere.png', 32, 32),
   
        size: { x: 32, y: 32 },
        
        maxVel: { x: 0, y: 0 },
        type: ig.Entity.TYPE.NONE,

        collides: ig.Entity.COLLIDES.NONE,

        name: 'raisedead',
        flip: true,
     
        doneDamage: false,
        delayTimer: null,


        firstRound: true,

        goingRight: false,
        goingLeft: false,

		spawningMonster: true,






        init: function (x, y, settings) {
            this.addAnim('idle', 0.1, [0, 1, 2, 3]);
            this.parent(x, y, settings);
            
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);
            this.doneDamage = false;
                                       

        },
        reset: function (x, y, settings) {
            this.addAnim('idle', 0.1, [0, 1, 2, 3]);
            this.parent(x, y, settings);
           
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);
            this.doneDamage = false;
                                       
        },
        handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x || res.collision.y) {

                this.kill();

            }




        },
        kill: function () {
            this.parent();
          
        },
        update: function () {





            this.parent();
			if(this.spawningMonster === true)
			{

			    var randum = ((Math.random() * 2) >> 0);
			    
			    if (randum == 0) {
			        ig.game.spawnEntity(EntityOrangegoblin, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2);
			      
			    }
			    else {
			        ig.game.spawnEntity(EntityGoblin, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2);
			    }
				this.spawningMonster = false;
			}
            if (this.delayTimer.delta() > 0) 
			{ 
				this.kill();
			}
            this.currentAnim.flip.x = this.flip;
        }

       

    });
	EntityRaiseDead_2 = ig.Entity.extend({

         
        animSheet: new ig.AnimationSheet('media/AttackAnimation/SummonSphere.png', 32, 32),
   
        size: { x: 32, y: 32 },
        
        maxVel: { x: 0, y: 0 },
        type: ig.Entity.TYPE.NONE,

        collides: ig.Entity.COLLIDES.NONE,

        name: 'raisedead',
        flip: true,
     
        doneDamage: false,
        delayTimer: null,


        firstRound: true,

        goingRight: false,
        goingLeft: false,

		spawningMonster: true,






        init: function (x, y, settings) {


            this.addAnim('idle', 0.1, [0, 1, 2, 3]);
            this.parent(x, y, settings);
            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
            //sound.volume = 0.25;
            //sound.play();
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);
            this.doneDamage = false;
                                       

        },
        reset: function (x, y, settings) {
            this.addAnim('idle', 0.1, [0, 1, 2, 3]);
            this.parent(x, y, settings);
            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
            //sound.volume = 0.25;
            //sound.play();
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);
            this.doneDamage = false;
                                       
        },
        handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x || res.collision.y) {

                this.kill();

            }




        },
        kill: function () {
            this.parent();
          
        },
        update: function () {





            this.parent();
			if(this.spawningMonster === true)
			{
			    var randum = ((Math.random() * 2) >> 0);

			    if (randum == 0) {
			        ig.game.spawnEntity(EntityBluegoblin, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2);

			    }
			    else {
			        ig.game.spawnEntity(EntityPurplegoblin, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2);
			    }
			    this.spawningMonster = false;
			}
            if (this.delayTimer.delta() > 0) 
			{ 
				this.kill();
			}
            this.currentAnim.flip.x = this.flip;
        }

       

    });
	EntityRaiseDead_3 = ig.Entity.extend({

         
        animSheet: new ig.AnimationSheet('media/AttackAnimation/SummonSphere.png', 32, 32),
   
        size: { x: 32, y: 32 },
        
        maxVel: { x: 0, y: 0 },
        type: ig.Entity.TYPE.NONE,

        collides: ig.Entity.COLLIDES.NONE,

        name: 'raisedead',
        flip: true,
     
        doneDamage: false,
        delayTimer: null,


        firstRound: true,

        goingRight: false,
        goingLeft: false,

		spawningMonster: true,






        init: function (x, y, settings) {


            this.addAnim('idle', 0.1, [0, 1, 2, 3]);
            this.parent(x, y, settings);
            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
            //sound.volume = 0.25;
            //sound.play();
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);
            this.doneDamage = false;
           

        },
        reset: function (x, y, settings) {
		   this.addAnim('idle', 0.1, [0, 1, 2, 3]);
		   this.parent(x, y, settings);
		   this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);
            this.doneDamage = false;
           
        },
        handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x || res.collision.y) {

                this.kill();

            }




        },
        kill: function () {
            this.parent();
          
        },
        update: function () {





            this.parent();
			if(this.spawningMonster === true)
			{
			    var randum = ((Math.random() * 2) >> 0);

			    if (randum == 0) {
			        ig.game.spawnEntity(EntityFlameJuggernaut, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2);

			    }
			    else {
			        ig.game.spawnEntity(EntityArmoredgoblin, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2);
			    }
				this.spawningMonster = false;
			}
            if (this.delayTimer.delta() > 0) 
			{ 
				this.kill();
			}
            this.currentAnim.flip.x = this.flip;
        }

       

	});
	EntityRaiseDead_4 = ig.Entity.extend({


	    animSheet: new ig.AnimationSheet('media/AttackAnimation/SummonSphere.png', 32, 32),

	    size: { x: 32, y: 32 },

	    maxVel: { x: 0, y: 0 },
	    type: ig.Entity.TYPE.NONE,

	    collides: ig.Entity.COLLIDES.NONE,

	    name: 'raisedead',
	    flip: true,

	    doneDamage: false,
	    delayTimer: null,


	    firstRound: true,

	    goingRight: false,
	    goingLeft: false,

	    spawningMonster: true,






	    init: function (x, y, settings) {
	        this.parent(x, y, settings);

	        this.addAnim('idle', 0.1, [0, 1, 2, 3]);

	        // Animation for the Enemy1
	        //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
	        //sound.volume = 0.25;
	        //sound.play();
	        this.delayTimer = new ig.Timer();
	        this.delayTimer.set(1.5);

	     
	    },
	    reset: function (x, y, settings) {
	        this.parent(x, y, settings);
	        this.addAnim('idle', 0.1, [0, 1, 2, 3]);

	        this.delayTimer = new ig.Timer();
	        this.delayTimer.set(1.5);
	     

	    },
	    handleMovementTrace: function (res) {
	        this.parent(res);

	        if (res.collision.x || res.collision.y) {

	            this.kill();

	        }




	    },
	    kill: function () {
	        this.parent();

	    },
	    update: function () {



	      

	        this.parent();
	        if (this.spawningMonster === true) {

	            var randum = ((Math.random() * 2) >> 0);

	            if (randum == 0) {
	                ig.game.spawnEntity(EntityNecromancerStrong, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2);

	            }
	            else {
	                ig.game.spawnEntity(EntityNecromancer, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2);
	            }
	            this.spawningMonster = false;
	        }
	        if (this.delayTimer.delta() > 0) {
	            this.kill();
	        }
	        this.currentAnim.flip.x = this.flip;
	    }



	});
	EntityArcaneBolt_E = ig.Entity.extend({


	    animSheet: new ig.AnimationSheet('media/AttackAnimation/LazorSpell.png', 16, 16),
	    size: { x: 14, y: 11 },
	    offset: { x: 0, y: 9 },
	    maxVel: { x: 450, y: 450 },
	    type: ig.Entity.TYPE.NONE,
	    checkAgainst: ig.Entity.TYPE.B,
	    collides: ig.Entity.COLLIDES.NONE,

	    name: 'arcanespell',
	    flip: true,
	    reflect: false,
	    doneDamage: false,
	    delayTimer: null,
	    angle: 0,
	    gravityFactor: 0,
	    firstRound: true,
	    projSpeed: 150,
	    goingRight: false,
	    goingLeft: false,

        power: 150,






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
	        this.currentAnim.angle = this.angle;
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
	            this.vel.y = -Math.floor(Math.sin(this.currentAnim.angle) * this.projSpeed);
	            this.vel.x = -Math.floor(Math.cos(this.currentAnim.angle) * this.projSpeed);
	        }
	        else {
	            this.vel.y = Math.floor(Math.sin(this.currentAnim.angle) * this.projSpeed);
	            this.vel.x = Math.floor(Math.cos(this.currentAnim.angle) * this.projSpeed);
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
	        this.currentAnim.angle = this.angle;
	      
	        /*if (this.flip) {
                                         
                                         this.vel.x = (this.reflect) ? 300 : -300;
                                         }else{
                                         this.vel.x =  (this.reflect) ? -300 : 300;
                                         }*/
	        if (this.flip) {
	            this.vel.y = -Math.floor(Math.sin(this.currentAnim.angle) * this.projSpeed);
	            this.vel.x = -Math.floor(Math.cos(this.currentAnim.angle) * this.projSpeed);
	        }
	        else {
	            this.vel.y = Math.floor(Math.sin(this.currentAnim.angle) * this.projSpeed);
	            this.vel.x = Math.floor(Math.cos(this.currentAnim.angle) * this.projSpeed);
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
	        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 4 });
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
	                        ig.game.spawnEntity(EntityLightningSpell_E, this.pos.x, this.pos.y, { colorOffset: 8, checkAgainst: ig.Entity.TYPE.B, reflect: true });
	                    }
	                }
	            }
	            this.kill();
	        }




	    }

	});
	EntityArcaneBolt_ES = ig.Entity.extend({


	    animSheet: new ig.AnimationSheet('media/AttackAnimation/LazorSpell.png', 16, 16),
	    size: { x: 14, y: 11 },
	    offset: { x: 0, y: 9 },
	    maxVel: { x: 450, y: 450 },
	    type: ig.Entity.TYPE.NONE,
	    checkAgainst: ig.Entity.TYPE.A,
	    collides: ig.Entity.COLLIDES.NONE,
        type: "MAGIC",
	    name: 'arcanespell',
	    flip: true,
	    reflect: false,
	    doneDamage: false,
	    delayTimer: null,
	    angle: 0,
	    gravityFactor: 0,
	    firstRound: true,
	    projSpeed: 150,
	    goingRight: false,
	    goingLeft: false,

        power: 100,






	    init: function (x, y, settings) {


	        this.parent(x, y, settings);
	        this.addAnim('idle', 0.1, [0, 1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]);


	        if (difficultyLevel === 1) {
	            this.power *= 2;
	        }
	        else if (difficultyLevel === 2) {
	            this.power *= 4;
	        }
	        else if (difficultyLevel === 3) {
	            this.power *= 8;
	        }
	        // Animation for the Enemy1
	        //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
	        //sound.volume = 0.25;
	        //sound.play();
	        this.delayTimer = new ig.Timer();
	        this.delayTimer.set(1.5);
	        this.doneDamage = false;
	  
	        if (this.flip) {
	            this.vel.x = -150;
	        }
	        else {
	            this.vel.x = 150;
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
	 
	        /*if (this.flip) {
                                         
                                         this.vel.x = (this.reflect) ? 300 : -300;
                                         }else{
                                         this.vel.x =  (this.reflect) ? -300 : 300;
                                         }*/
	        if (this.flip) {
	            this.vel.x = -150;
	        }
	        else {
	            this.vel.x = 150;
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
	        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 4 });
	    },
	    update: function () {





	        this.parent();
	        if (this.delayTimer.delta() > 0) { this.kill(); }
	        this.currentAnim.flip.x = this.flip;
	    },

	    check: function (other) {

	        if (this.doneDamage == false) {
	            
	            this.doneDamage = true;

	            if (this.reflect) {
	                other.receiveDamage(this.power, this); ig.game.damageTimer(1, this.power, 'red');
	            }
	            else {

	                var retValue = ig.game.checkDamage(other, this, this.type, this.power, 'isProjectile');
	                if (retValue) {
	                    if (retValue == 'REFLECTION') {
	                        ig.game.spawnEntity(EntityLightningSpell_E, this.pos.x, this.pos.y, { colorOffset: 8, checkAgainst: ig.Entity.TYPE.B, reflect: true });
	                    }
	                }
	            }
	            this.kill();
	        }




	    }

	});
	ig.EntityPool.enableFor(EntityArcaneBolt_ES);
    ig.EntityPool.enableFor(EntityLightningSpell_E);
    ig.EntityPool.enableFor(EntityDarkBlast_E);
    ig.EntityPool.enableFor(EntityIceShards_E);
    ig.EntityPool.enableFor(EntityIcespike_E);
    ig.EntityPool.enableFor(EntityFireSpell_E);

});