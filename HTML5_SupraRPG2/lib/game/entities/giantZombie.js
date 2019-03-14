ig.module(
	'game.entities.giantZombie'
	)
.requires(
	'impact.entity'
	)
.defines(function () {
		EntityGiantZombie = ig.Entity.extend({
			
			size: {x: 40,y: 70},
			offset: { x: 20, y: 10 },
			collides: ig.Entity.COLLIDES.ACTIVE,
			type: ig.Entity.TYPE.B,
			checkAgainst: ig.Entity.TYPE.BOTH,
			delayJump: null,
			shootarrow: false,
			setDelayArrow: false,
			STAGGER: 0,
			name: 'boss',
			health: 99999,
			healthBuffer: 0,
			actHealth: 280,
			EXP_BOUNTY: 60,
                                               FRENZYCOUNTER: 0,
			ShockWavedoneDamage: false,
			deadMonster: false,
			currentSpeed: 0,
			firstPhase: false,
			secondPhase: false,
			thirdPhase: false,
			setShock: false,
			turningInitiated: 0,
            bossInvoked: false,
            IsMovingRight: false,
            IsBurning: false,
            BurningDMG: 0,
            resetBurn: null,
            frameCalc: 0,
			init: function(x,y,settings){
				this.parent(x, y, settings );
				this.animSheet = new ig.AnimationSheet('media/Enemies/Giantzombie.png', 80, 80);
				this.delayATKCD = new ig.Timer();
				this.delayAnim = new ig.Timer();
				this.delayJump = new ig.Timer();
				this.delayShock = new ig.Timer();
				this.resetBurn = new ig.Timer();
				

				this.Maxhealth = this.actHealth;
				this.Maxmana = this.mana;
				this.ATK = 10;
				this.speed = 10;
				
				this.healthBuffer = this.health;
				var randomnumber=Math.floor(Math.random()*7);
				this.EXP_BOUNTY = 60 + randomnumber;
				// Animation for the Enemy1
				this.addAnim( 'idle', 0.07, [0,1,2,3,4,5] );
				this.addAnim( 'attack', 0.1, [6,7] );
			},
			update: function()
			{
			    if (ig.game.player) {
			        ig.game.burningCalc(this);
			    
			   /* if (ig.game.player != null && this.bossInvoked == false) {
			        if (ig.game.player.vel.y == 0
                        && ig.game.player.pos.y >= this.pos.y
                        && ig.game.player.pos.x <= this.pos.x + 180 && ig.game.player.pos.x >= this.pos.x - 164) {
			           
			            ig.game.invokeDisplayBar('aegonthegiant'); this.bossInvoked = true; ig.game.invokedBossMusic = true;
			        }
			    }*/
			    if (this.vel.x > 0) { this.IsMovingRight = true; }
			    else if (this.vel.x < 0) { this.IsMovingRight = false; }
			if(this.ShockWavedoneDamage == true){if(!this.setShock){this.setShock = true;this.delayShock.set(0.4);}}
			if(this.delayShock.delta() > 0){this.ShockWavedoneDamage = false;this.setShock = false;}
			if((this.actHealth / this.Maxhealth) <= 0.67 && !this.firstPhase ){	
					this.speed = 15;	// Speed is increased
					ig.game.spawnEntity(EntityPurplegoblin, this.pos.x, this.pos.y-8 ,{flip:this.flip} );// Spawn purple, orange and one blue monster
					ig.game.spawnEntity(EntityOrangegoblin, this.pos.x, this.pos.y-8 ,{flip:this.flip} );
					
					this.firstPhase = true;
			}
			if((this.actHealth  / this.Maxhealth) <= 0.34 && !this.secondPhase ){	
					this.speed = 30;	// Speed is increased
				
					
					ig.game.spawnEntity(EntityBluegoblin, this.pos.x, this.pos.y-8 ,{flip:this.flip} );
					this.secondPhase = true;
			}
			if((this.actHealth  / this.Maxhealth) <= 0.2 && !this.thirdPhase ){	
					this.speed = 60;	// Speed is increased
					this.ATK = 15;
					this.thirdPhase = true;
			}
				if(this.health  != this.healthBuffer)
				{this.actHealth -= (this.healthBuffer - this.health);this.health = this.healthBuffer;}
				
				if (this.actHealth <= 0) {

				    //Wait for 2 seconds
				    ig.game.player.killEvents.monsterKills += 1; ig.game.player.killEvents.giantZombieKills += 1;
				    ig.game.player.EXP += 50;
				  
				        ig.game.currentLevel = 'LevelLevel_S0';
				        ig.game.data_packet = { x_coord: 32, y_coord: 433 };
                        ig.game.saveGame(ig.game.data_packet);
				        ig.game.screenFader = new ig.ScreenFader({ fade: 'in', speed: 2.0 });
				        ig.game.soft_paused = true;
				    
				    ig.game.bossKill_Event = true;
                    
				    
				   
				 
				    
				    this.kill();}
				
			if(this.delayAnim.delta() < 0){this.currentAnim = this.anims.attack;}
			if(this._ready == false && this.CDtimerset == false){this.delayATKCD.set(1); this.CDtimerset = true;}
			
			if(this.delayATKCD.delta() > 0 && this._ready == false){ this._ready = true; this.CDtimerset = false;}
		
			
			if(this.delayJump.delta() > 0 && this.vel.y == 0){this.vel.y = -200;var randomnumber=Math.floor(Math.random()*11);var rand_number = randomnumber / 20;rand_number += 1;this.delayJump.set(rand_number);}
			// near edge? return!
			if(this.delayAnim.delta() > 0){
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
			    } var xdir = this.flip ? -1 : 1; this.vel.x = this.speed * xdir;
			
			this.currentAnim = this.anims.idle;
			}
                                             this.currentAnim.flip.x = this.flip;
                                             }
			this.parent();
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


			},
			kill: function () {
			    this.parent();
			    
                //Do death animation and screen.
			    ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 2 });
			    ig.game.invokedBossMusic = false;
			},
			check: function (other) {

			    if (this._ready == true && other.type == ig.Entity.TYPE.A) {
			        

			        this._ready = false;
			    }
			    //if (other.type == ig.Entity.TYPE.B) { this.flip = !this.flip; }

			}
				
		});

	
});