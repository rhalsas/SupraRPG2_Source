ig.module(
	'game.entities.magmaWorm'
	)
.requires(
	'impact.entity'
	)
.defines(function () {
		EntityMagmaWorm = ig.Entity.extend({
			
			size: { x: 120, y:40 },
        offset: { x: 20, y: 60 },
			collides: ig.Entity.COLLIDES.ACTIVE,
			type: ig.Entity.TYPE.B,
			checkAgainst: ig.Entity.TYPE.A,
			delayJump: null,
			shootarrow: false,
			setDelayArrow: false,
			STAGGER: 0,
            _ready: true,
			health: 99999,
			healthBuffer: 0,
			actHealth: 3000,
			EXP_BOUNTY: 160,
			ShockWavedoneDamage: false,
			deadMonster: false,
			currentSpeed: 0,
			name: 'boss',
			firstPhase: false,
			secondPhase: false,
			thirdPhase: false,
			setShock: false,
			resetBurn: null,
			turningInitiated: 0,
			bossInvoked: false,
            ATK: 22,
            phase1FrameCounter: 0,
            phase2FrameCounter: 0,
            attackWholeTime: 0,
            attackAlertTime: 0,
            isGivenTreasure: false,
		    CurrentSpell: "EntityHeavyFlameBreath_E",
            lastPhaseFrameCounter: 0,
			init: function(x,y,settings){
				this.parent(x, y, settings );
				this.animSheet = new ig.AnimationSheet('media/Enemies/Magma_Worm.png', 160, 160);
				this.delayATKCD = new ig.Timer();
				this.delayAnim = new ig.Timer();
				this.delayJump = new ig.Timer();
				this.delayShock = new ig.Timer();
				this.powerAttackDelay = new ig.Timer();
				this.resetBurn = new ig.Timer();
				this.Maxhealth = this.actHealth;
				this.Maxmana = this.mana;
				
				this.speed = 10;
				this.attackWholeTime = 1.5;
				this.attackAlertTime = 0.5;
				this.healthBuffer = this.health;
		
				this.EXP_BOUNTY = 200;
				// Animation for the Enemy1
				this.addAnim( 'idle', 0.07, [0,1,2,3] );
				this.addAnim('attack', 1, [5]);
				this.addAnim('die', 0.3, [5,6,6,6,7,7,7],true);
				this.addAnim('attack2', 0.055, [4, 5,6]);
			},
			update: function () {
			    if (this.health != this.healthBuffer)
			    { this.actHealth -= (this.healthBuffer - this.health); this.health = this.healthBuffer; }

			    if (this.actHealth / this.Maxhealth >= 0.75) {
			        
			    }
			    else if (this.actHealth / this.Maxhealth >= 0.50) {
			        this.flameBarrage_1();
			        
			    }
			    else if (this.actHealth / this.Maxhealth >= 0.25) {
			      
			    }
			    else if (this.actHealth / this.Maxhealth > 0) {
			        this.flameBarrage_3();
			    }
			   
			    else if (this.actHealth <= 0) {






			        this.vel.x = 0;
			       
			        this.deathTimerInvoked = true;


			    }
			    if (!this.deathTimer && this.deathTimerInvoked == true) {
			        this.currentAnim = this.anims.die.rewind();
			        this.deathTimer = new ig.Timer();
			        if (ig.game.player) {
			            if (ig.game.player.pos.x < this.pos.x) { this.flip = true; }
			            else { this.flip = false; }
			        }
			        ig.game.destroyBossWalls();
			        ig.game.player.EXP += this.EXP_BOUNTY;
			        
			        this.deathTimer.set(2.1);
			        this.deathTimerInvoked = false;
			    }
			    if (this.deathTimer && this.deathTimer.delta() > 0 + 1.5) {
			        if (!this.isGivenTreasure) {
			            ig.game.spawnTreasure(this.pos.x - 32, this.pos.y - 64, 'MAGMAWORM');
			            this.isGivenTreasure = true;
			        }
			        //this.kill();
			    }
			 if (this.actHealth > 0) {

			        if (this._ready == false && this.CDtimerset == false) { this.delayATKCD.set(1); this.CDtimerset = true; }

			        if (this.delayATKCD.delta() > 0 && this._ready == false) { this._ready = true; this.CDtimerset = false; }
			        if (this.vel.x > 0) { this.IsMovingRight = true; }
			        else if (this.vel.x < 0) { this.IsMovingRight = false; }
			        if (this.ShockWavedoneDamage == true) { if (!this.setShock) { this.setShock = true; this.delayShock.set(0.4); } }
			        if (this.delayShock.delta() > 0) { this.ShockWavedoneDamage = false; this.setShock = false; }
			        if (ig.game.player != null) {

			            ig.game.burningCalc(this);
			            if (this.distanceTo(ig.game.player) <= 120) {
			                this.enableAttacking = true;
			            }
			            if (this.enableAttacking == true) {
			                this.vel.x = 0;

			                if (ig.game.player.pos.x <= this.pos.x + this.size.x / 2) { this.flip = true; var x_coord = 0; }
			                else if (ig.game.player.pos.x > this.pos.x + this.size.x / 2) { this.flip = false; var x_coord = 8; }
			                var y_coord = 0;

			                if (this.powerAttackDelayInitiated == false) {
			                    this.currentAnim = this.anims.attack; this.powerAttackDelayInitiated = true;
			                    this.powerAttackDelay.set(this.attackWholeTime); this.powerAttackAnim = true;
			                }

			                if (this.powerAttackDelay.delta() < 0 && this.powerAttackDelay.delta() > -this.attackAlertTime && this.powerAttackAnim == true) {
			                    this.enableAttacking = false;

			                    if (this.CurrentSpell === "EntityHeavyFlameBreath_E") {
			                        y_coord = -20;
			                        if (ig.game.player.pos.x <= this.pos.x + this.size.x / 2) { x_coord -= 64; }
			                        else if (ig.game.player.pos.x > this.pos.x + this.size.x / 2) {
			                            x_coord += 120;
			                        }
			                    }
			                    this.vel.x = 0;
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
			
			handleMovementTrace: function (res) {
			    this.parent(res);

			    if (res.collision.x && this.turningInitiated === 0) {
			        /*if(this.locationMoved == 'Right'){this.vel.x = -50;}
                    
                    else if(this.locationMoved == 'Left'){this.vel.x = 50;}*/
			        //this.vel.y *= -1;
			        //  this.flip = !this.flip
			        this.vel.x = 0;
			        this.turningInitiated = 1;
			    }

			    /*if( res.collision.y ) {
                    if(this.locationMoved == 'Down'){this.vel.y = -50;}
                    else if(this.locationMoved == 'Up'){this.vel.y = 50;}
                    
                    }*/


			},
			kill: function () {
			    this.parent();
			    
                //Do death animation and screen.
			    ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 2 });
			    ig.game.invokedBossMusic = false;
			},
			flameBarrage_1: function () {

			    if (this.phase1FrameCounter == 0) {

			      
			        this.immunity = true;
			    }
			    if (this.phase1FrameCounter % 12 == 0) {

			       ig.game.spawnEntity("EntityFlameMissile_E",this.pos.x, this.pos.y + this.size.y/2);
			    }
			    if (this.phase1FrameCounter >= 200) {
			        
			        this.immunity = false;
			        this.actHealth = this.Maxhealth * 0.495;
			    }
			    this.phase1FrameCounter++;
			},
			flameBarrage_2: function () {

			    if (this.phase2FrameCounter == 0) {


			        this.immunity = true;
			    }
			    if (this.phase2FrameCounter % 10 == 0) {

			        ig.game.spawnEntity("EntityFlameMissile_E", this.pos.x, this.pos.y + this.size.y / 2);
			    }
			    if (this.phase2FrameCounter >= 300) {

			        this.immunity = false;
			        this.actHealth = this.Maxhealth * 0.495;
			    }
			    this.phase2FrameCounter++;
			},
			flameBarrage_3: function () {

			   /* if (this.lastPhaseFrameCounter == 0) {


			        //this.immunity = true;
			    }*/
			    if (this.lastPhaseFrameCounter % 8 == 0) {

			        ig.game.spawnEntity("EntityFlameMissile_E", this.pos.x, this.pos.y + this.size.y / 2);
			    }
			  /*  if (this.lastPhaseFrameCounter >= 1200) {

			        //this.immunity = false;
			        //this.actHealth = this.Maxhealth * 0.545;
			    }*/
			    this.lastPhaseFrameCounter++;
			},
			
			
				
		});
		EntityFlameMissile_E = ig.Entity.extend({



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

            power: 12,


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
		        this.animSheet = new ig.AnimationSheet('media/AttackAnimation/FireBall2.png', 8, 8);
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
		        var randum = ((Math.random() * 11) - 5) >> 0;
		        if (!this.flip) {
		           
		            this.vel.x = 500;
		            this.vel.y = 50 * randum;
		        }
		        else if (this.flip) {
		           
		            this.vel.x = -500;
		            this.vel.y = 50 * randum;
		        }


		    },
		    reset: function (x, y, settings) {
		        this.parent(x, y, settings);
		        this.delayTimer.set(1.5);
		        this.anims.idle.rewind();
		        this.doneDamage = false;

		        this.gravityFactor = 0;
		     
		        var randum = ((Math.random() * 11) - 5) >> 0;
		        if (ig.game.player.pos.x > this.pos.x) {
		            this.flip = false;
		            this.vel.x = 500;
		            this.vel.y = 50 * randum;
		        }
		        if (ig.game.player.pos.x <= this.pos.x) {
		            this.flip = true;
		            this.vel.x = -500;
		            this.vel.y = 50 * randum;
		        }



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
		           this.doneDamage = true;


		        }



		    }
		});
		EntityHeavyFlameBreath_E = ig.Entity.extend({


		    animSheet: new ig.AnimationSheet('media/AttackAnimation/HeavyFlameBreath.png', 64, 64),
		    size: { x: 64, y: 60 },
		    offset: { x: 0, y: 2 },
		    maxVel: { x: 0, y: 0 },
		    type: ig.Entity.TYPE.NONE,
		    checkAgainst: ig.Entity.TYPE.A,
		    collides: ig.Entity.COLLIDES.NONE,

		    name: 'flamebreath',
		    flip: true,
		    reflect: false,
		    doneDamage: false,
		    delayTimer: null,
		    delayTimer2: null,


		    firstRound: true,

		    goingRight: false,
		    goingLeft: false,


            power: 30,





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
		        this.delayTimer = new ig.Timer();
		        this.delayTimer2.set(0.4);
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

		            this.delayTimer2.set(0.5);



		            other.isBurning = true;

		            var retValue = ig.game.checkDamage(other, this, 'MAGICAL', damage);

		        }










		    }

		});
	
});