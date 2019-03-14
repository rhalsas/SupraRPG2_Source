ig.module(
	'game.entities.extremePiggy'
	)
.requires(
	'impact.entity',
    'impact.entity-pool'
	)
.defines(function(){
		EntityExtremePiggy = ig.Entity.extend({
			
			size: {x:8,y: 14},
			offset: {x:12, y: 9},
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
              actHealth:500,
			deadMonster: false,
			ShockWavedoneDamage: false,
			attackWholeTime: 1.2,
			attackAlertTime: 0.5,
			phase1FrameCounter: 0,
			lastPhaseFrameCounter: 0,
			turningInitiated: 0,
			EXP_BOUNTY: 100,
			CurrentSpell: 'EntitySpellwave_E',
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
			ATK: 25,
			currentChasePhase: 2,
			rushingNow: false,
			CDtimerset: false,
			deathTimer: null,
            deathTimerInvoked: false,
            _ready: true,
            doOnce: false,
			init: function(x,y,settings){
				this.parent(x, y, settings );
				this.animSheet = new ig.AnimationSheet('media/Enemies/ExtremePiggy.png', 32, 32);
				this.delayATKCD = new ig.Timer();
				this.delayAnim = new ig.Timer();
				this.resetBurn = new ig.Timer();
				this.Maxhealth = this.actHealth;
				this.Maxmana = this.mana;
			
				this.speed = 20;
				this.powerAttackAnim = false;
				this.healthBuffer = this.health;
			
				this.EXP_BOUNTY = 50;
				this.powerAttackDelay = new ig.Timer();
				this.healthBuffer = this.health;
				this.waitingForScene = true;
			    // Animation for the Enemy1
				this.addAnim('stand', 1, [0]);
				this.addAnim('die', 0.3, [8, 8, 8, 8, 8, 9, 10], true);
				        this.addAnim('idle', 0.07, [0,1,2,3,4,5]);
			 this.addAnim( 'attack', 0.1, [6,7,6,7,6] );
			 this.addAnim('rush', 0.035, [0, 1, 2, 3, 4, 5]);
		
			},
			
				update: function()
				{
				    if (ig.game.player) {

				        ig.game.burningCalc(this);
				    }
				   

				    if (this.waitingForScene) {
				        this.immunity = true;
				        this.currentAnim = this.anims.idle;
				        if (this.distanceTo(ig.game.player) <= 130) { this.immunity = false; ig.game.invokeDialog("extremePiggy1",this); this.waitingForScene = false; }

				    }
				    if (ig.game.scene_Invoked === false) {
				       
				        if (this.vel.x > 0) { this.IsMovingRight = true; }
				        else if (this.vel.x < 0) { this.IsMovingRight = false; }


				        if (this._ready == false && this.CDtimerset == false) { this.delayATKCD.set(1); this.CDtimerset = true; }

				        if (this.delayATKCD.delta() > 0 && this._ready == false) { this._ready = true; this.CDtimerset = false; }




				        if (this.health != this.healthBuffer)
				        { this.actHealth -= (this.healthBuffer - this.health); this.health = this.healthBuffer; }
				        if (ig.game.player) {
				            if (this.actHealth / this.Maxhealth >= 0.80 && !this.immunity) {
				                this.movement();
				            }
				            else if (this.actHealth / this.Maxhealth >= 0.55) {

				                this.movement();
				            }
				            else if (this.actHealth / this.Maxhealth >= 0.40) {
				                this.movement();
				            }
				            else if (this.actHealth / this.Maxhealth >= 0.10) {
				                this.movement();
				            }
				            else if (this.actHealth / this.Maxhealth >= 0) {
				                this.movement();

				                //Cast Eclipse
				            }
				            else if (this.actHealth <= 0) {


				                ig.game.getSelectionUp(2);

				                this.vel.x = 0;
				                if (this.doOnce === false && this.distanceTo(ig.game.player) < 130) {
				                    ig.game.invokeDialog("extremePiggy2");
				                    ig.game.scene_Invoked = true;
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

                           
				            ig.game.spawnTreasure(this.pos.x, this.pos.y, 'EXTREMEPIGGY');
				            ig.game.levelChangeButtonInvoked = true;
				            ig.game.myTouchButtons.searchButton("levelChangeButtonInvoked", true);
				            LevelSelectOptionSkip = 2;
				            this.kill();
				        }
				    }
				    else {
				        if (this.pos.x + 32 > ig.game.player.pos.x && this.pos.x - 32 < ig.game.player.pos.x && this.actHealth > 0) {
				            this.currentAnim = this.anims.idle;
				            this.pos.x -= 1;
				        }
				        else {
				            this.currentAnim = this.anims.stand;
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
				check: function(other){
				    if (this._ready == true && other.type == ig.Entity.TYPE.A) {
				        var power = 1;
				        if (difficultyLevel === 1) {
				            power *= 2;
				        }
				        else if (difficultyLevel === 2) {
				            power *= 4;
				        }
				        else if (difficultyLevel === 3) {
				            power *= 8;
				        }
				        this.ATK = 25 * power;
				        ig.game.checkDamage(other, this, 'PHYSICAL');

				        this._ready = false;
				    }
				},
			movement:function()
			{
			
			if(ig.game.player.pos.x <= this.pos.x + 64&& ig.game.player.pos.x >= this.pos.x-64 && this.rushingNow === false){
			
			
				if(ig.game.player.pos.x <= this.pos.x){this.flip = true;var x_coord = -8;}
				if(ig.game.player.pos.x >= this.pos.x){this.flip = false;var x_coord = 8;}
				
				
				if(this.powerAttackDelayInitiated == false){this.vel.x = 0; this.currentAnim = this.anims.attack;this.powerAttackDelayInitiated = true;
				this.powerAttackDelay.set(this.attackWholeTime);this.powerAttackAnim = true;}
				
				if(this.powerAttackDelay.delta() < 0 && this.powerAttackDelay.delta() > -this.attackAlertTime && this.powerAttackAnim == true)
				{
				if(this.delayAnim.delta() > 0)
				{
				
				if(ig.game.player.pos.x <= this.pos.x){
				this.flip = true;
				var x_coord = 0;
				this.delayAnim.set(this.currentChasePhase);
				this.rushingNow = true;
				
				}
				else if(ig.game.player.pos.x > this.pos.x){
				this.flip = false;
				var x_coord = 0;
				this.delayAnim.set(this.currentChasePhase);
				this.rushingNow = true;
				}
				}
				}
				if(this.powerAttackDelay.delta() > 0){this.powerAttackDelayInitiated = false;}
				
			}
			else{this.currentAnim = this.anims.idle;if(this.turningInitiated > 0){this.turningInitiated++;}
			if(this.turningInitiated == 60){this.turningInitiated = 0;}
			if(this.delayAnim.delta() > (this.currentChasePhase / 2))
			{
			this.speed = 30;
			this.currentAnim = this.anims.idle;
			
			}
			else{
			this.speed = 90;
			this.currentAnim = this.anims.rush;
			}
			if(this.delayAnim.delta() > this.currentChasePhase + 1)
			{
			this.rushingNow = false;
			}
			// near edge? return!
			if ( !ig.game.collisionMap.getTile(
				this.pos.x + (this.flip ? +4 : this.size.x -4),
					this.pos.y + this.size.y+1
					)
				&&this.turningInitiated == 0){
					this.flip = !this.flip;
					this.turningInitiated = 1;
				}
				var xdir = this.flip ? -1 : 1;
				this.vel.x = this.speed * xdir;
				this.powerAttackDelayInitiated = false;}
		
			
		
			// near edge? return!
			
			this.currentAnim.flip.x = this.flip;
			
			},
			
			handleMovementTrace: function (res) {
			    this.parent(res);

			    if (res.collision.x && this.turningInitiated == 0) {
			       
			        this.flip = !this.flip;
			        this.turningInitiated = 1;
			    }

			   


			}
		});

	

});