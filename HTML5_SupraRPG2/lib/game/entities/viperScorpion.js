ig.module(
	'game.entities.viperScorpion'
	)
.requires(
	'impact.entity',
    'impact.entity-pool',
    'game.entities.explosiveScorpion'
	)
.defines(function () {
    EntityViperScorpion = ig.Entity.extend({

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
        actHealth: 1000,
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
        CurrentSpell: 'EntityPoisonSpell_E',
        IsBurning: false,
        BurningDMG: 0,
        resetBurn: null,
        enableAttacking: false,
        frameCalc: 0,
        amount: 5,
        delayAttack: null,
        bombSpringActive: false,
        bombCount: 0,
        ATK: 30,
        bombSpringCD: new ig.Timer(),
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/Enemies/PoisonScorpion.png', 32, 32),
            this.powerAttackDelay = new ig.Timer();
            this.delayShock = new ig.Timer();
            this.resetBurn = new ig.Timer();
            this.Maxhealth = this.actHealth;
            this.Maxmana = this.mana;
           
            this.speed = 25;
            this.attackWholeTime = 1.5;
            this.attackAlertTime = 0.5;
            this.healthBuffer = this.health;
        
            this.EXP_BOUNTY = 100;
            // Animation for the Enemy1

            this.delayAttack1 = new ig.Timer();
            this.delayAttack1.set(5);
            this.addAnim('idle', 0.07, [0, 1]);
            this.addAnim('attack', 0.1, [2, 3]);

            this.addAnim('attack2', 1, [4]);
            this.addAnim('die', 0.3, [5, 5, 5, 5, 5, 6, 7], true);
        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);

            this.Maxhealth = this.actHealth;
            this.Maxmana = this.mana;
           
            this.speed = 25;
            this.attackWholeTime = 1.5;
            this.attackAlertTime = 0.5;
            this.healthBuffer = this.health;
        
            this.EXP_BOUNTY = 100;
            // Animation for the Enemy1

            this.delayAttack1 = new ig.Timer();
            this.delayAttack1.set(5);

            this.addAnim('idle', 0.07, [0, 1]);
            this.addAnim('attack', 0.1, [2,3]);
           
            this.addAnim('attack2', 1, [4]);
            this.addAnim('die', 0.3, [5, 5, 5, 5, 5, 6, 7], true);
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
        spawnScorpions: function(){
            //When making smaller scorpions spawn here
            ig.game.spawnEntity(EntityExplosiveScorpion, this.pos.x+8, this.pos.y - 16, { colorOffset: 1 });
            ig.game.spawnEntity(EntityExplosiveScorpion, this.pos.x-8, this.pos.y - 16, { colorOffset: 1 });
    
         
            ig.game.spawnEntity(EntityExplosiveScorpion, this.pos.x, this.pos.y-24, { colorOffset: 1 });

        },
        update: function () {
            // near edge? return!
            if (this.health != this.healthBuffer)
            { this.actHealth -= (this.healthBuffer - this.health); this.health = this.healthBuffer; }

            var intensity = 0;
            if (this.actHealth / this.Maxhealth >= 0.75) {
                intensity = 0;
            }
            else if (this.actHealth / this.Maxhealth >= 0.50) {

                intensity = 0.5;
            }
            else if (this.actHealth / this.Maxhealth >= 0.25) {
                intensity = 1;
            }
            else if (this.actHealth / this.Maxhealth >= 0) {
                intensity = 2;
            }
            if (this.delayAttack1.delta() > 0 && this.distanceTo(ig.game.player) < 160) {
                this.spawnScorpions();
                this.delayAttack1.set(5);
                
            }
            else if (this.actHealth <= 0) {




              
                this.vel.x = 0;

                this.deathTimerInvoked = true;


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
                ig.game.spawnTreasure(this.pos.x, this.pos.y, 'VIPERSCORPION');
                this.kill();
            }

            if (this.actHealth > 0) {
                if (this.vel.x > 0) { this.IsMovingRight = true; }
                else if (this.vel.x < 0) { this.IsMovingRight = false; }
                if (this.ShockWavedoneDamage == true) { if (!this.setShock) { this.setShock = true; this.delayShock.set(0.4); } }
                if (this.delayShock.delta() > 0) { this.ShockWavedoneDamage = false; this.setShock = false; }
                if (ig.game.player != null) {

                    ig.game.burningCalc(this);
                    if (ig.game.player.pos.x <= this.pos.x + 32 && ig.game.player.pos.x >= this.pos.x - 32 && ig.game.player.pos.y <= this.pos.y + 16 && ig.game.player.pos.y >= this.pos.y - 16) {
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



                            if (this.actHealth / this.Maxhealth <= 0.75) {

                                ig.game.spawnEntity(this.CurrentSpell, this.pos.x + x_coord, this.pos.y + y_coord - 6, { flip: this.flip });
                            }
                            if (this.actHealth / this.Maxhealth <= 0.5) {
                                ig.game.spawnEntity(this.CurrentSpell, this.pos.x + x_coord, this.pos.y + y_coord - 12, { flip: this.flip });
                            }
                            if (this.actHealth / this.Maxhealth <= 0.25) {
                                ig.game.spawnEntity(this.CurrentSpell, this.pos.x + x_coord, this.pos.y + y_coord - 18, { flip: this.flip });
                            }
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
    
    EntityPoisonSpell_E = ig.Entity.extend({


        animSheet: new ig.AnimationSheet('media/AttackAnimation/PoisonSpell.png', 32, 32),
        size: { x: 14, y: 11 },
        offset: { x: 2, y: 5 },
        maxVel: { x: 150, y: 500 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'poisonspell',
        flip: true,
        reflect: false,
        doneDamage: false,
        delayTimer: null,

        gravityFactor: 0,
        firstRound: true,

        goingRight: false,
        goingLeft: false,




        power: 20,



        init: function (x, y, settings) {


            this.parent(x, y, settings);
            this.addAnim('idle', 0.1, [0, 1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
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
            if (this.flip) {

                this.vel.x = (this.reflect) ? 300 : -300;
            } else {
                this.vel.x = (this.reflect) ? -300 : 300;
            }

        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 0.1, [0, 1, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2]);

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

                

                    var retValue = ig.game.checkDamage(other, this, 'MAGICAL', damage, 'isProjectile');
                    
                


                this.kill();

            }



        }

    });
   
    


});