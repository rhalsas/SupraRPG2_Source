ig.module(
	'game.entities.friendlyKnight'
	)
.requires(
	'impact.entity'
	)
.defines(function(){
		EntityFriendlyKnight = ig.Entity.extend({
		    
			size: {x: 8,y: 14},
			offset: {x:12, y: 9},
			collides: ig.Entity.COLLIDES.ACTIVE,
			
			type: ig.Entity.TYPE.A,
			checkAgainst: ig.Entity.TYPE.BOTH,
			delayJump: null,
			shootarrow: false,
			setDelayArrow: false,
			health: 9999,
			name: 'knight',
			healthBuffer: 0,
			actHealth: 9999,
			attackWholeTime: 1.0,
			attackAlertTime: 0.5,
			turningInitiated: 0,
			EXP_BOUNTY: 10,
			STAGGER: 0,
                                               FRENZYCOUNTER: 0,
			canAttack: false,
			deadMonster: false,
			IsHenchMan1: false,
			ShockWavedoneDamage: false,
			IsHenchMan2: false,
			flip: true,
			powerAttackDelayInitiated: false,
			powerAttackDelay: null,
			powerAttackAnim: false,
			setShock: false,
			IsMovingRight: false,
			IsBurning: false,
			BurningDMG: 0,
			resetBurn: null,
            behavior: '',
			frameCalc: 0,
			init: function(x,y,settings){
				this.parent(x, y, settings );
				//this.animSheet = new ig.AnimationSheet('media/Enemies/Knights.png', 32, 32);
				this.animSheet = new ig.AnimationSheet('media/Enemies/KnightNPC.png', 32, 32);
				this.delayATKCD = new ig.Timer();
				this.delayAnim = new ig.Timer();
				this.delayJump = new ig.Timer();
				this.delayShock = new ig.Timer();
				this.resetBurn = new ig.Timer();
				this.Maxhealth = this.actHealth;
				this.Maxmana = this.mana;
				this.ATK = 0;
				this.speed = 40;
				this.immunity = true;
				this.powerAttackAnim = false;
				this.healthBuffer = this.health;
				var randomnumber=Math.floor(Math.random()*7);
				this.EXP_BOUNTY = 13 + randomnumber;
				this.powerAttackDelay = new ig.Timer();
				this.teleportDelay = new ig.Timer();

			    // Animation for the Enemy1
				if (this.behavior !== 'player') {
				    this.addAnim('idle', 0.07, [0, 1, 2, 3, 4, 5]);
				    this.addAnim('attack', 0.1, [6, 7, 6, 7, 6]);
				    //this.addAnim( 'attack2', 0.05, [12,12,13,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14] );
				    this.addAnim('attack2', 1, [7]);
				    
				}
				else {
				    this.addAnim('idle', 0.07, [18]);
				    this.addAnim('attack', 0.1, [24, 25, 24, 25, 24]);
				    //this.addAnim( 'attack2', 0.05, [12,12,13,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14,14] );
				    this.addAnim('attack2', 1, [26]);
				    this.flip = false;
				    ig.game.spawnEntity('EntitySummonEffect', this.pos.x - 8, this.pos.y - 16);
				    this.teleportDelay.set(1);
				}
				
			},
		
		
			update: function()
			{

			    if (this.behavior !== 'player') {
			        if (this.vel.x > 0) { this.IsMovingRight = true; }
			        else if (this.vel.x < 0) { this.IsMovingRight = false; }




			        if (this.ShockWavedoneDamage == true) { if (!this.setShock) { this.setShock = true; this.delayShock.set(0.4); } }
			        if (this.delayShock.delta() > 0) { this.ShockWavedoneDamage = false; this.setShock = false; }


			        this.vel.x = 0;




			        if (this.powerAttackDelayInitiated == false) {
			            this.currentAnim = this.anims.attack; this.powerAttackDelayInitiated = true;
			            this.powerAttackDelay.set(this.attackWholeTime); this.powerAttackAnim = true;
			        }

			        if (this.powerAttackDelay.delta() < 0 && this.powerAttackDelay.delta() > -this.attackAlertTime && this.powerAttackAnim == true) {
			            ig.game.spawnEntity('EntitySlash_E', this.pos.x + x_coord, this.pos.y - 8, { flip: this.flip });
			            this.anims.attack2.rewind(); this.currentAnim = this.anims.attack2; this.powerAttackAnim = false;
			        }
			        if (this.powerAttackDelay.delta() > 0) { this.powerAttackDelayInitiated = false; }


			        if (this.turningInitiated == 15) { this.turningInitiated = 0; }

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
			    else {
			        if (this.teleportDelay && this.teleportDelay.delta() > 0) {
			            ig.game.spawnEntity('EntitySummonEffect', this.pos.x - 8, this.pos.y - 16);
			            this.kill();
			            this.teleportDelay = null;
			        }
			    }
			   
		
			// near edge? return!
				this.currentAnim = this.anims.idle;
			this.currentAnim.flip.x = this.flip;
			
			this.parent();
			},
			handleMovementTrace: function (res) 
			{
				this.parent (res);
				
					if( res.collision.x &&this.turningInitiated == 0) {
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
			check: function(other)
			{
			if(this._ready == true && other.type == ig.Entity.TYPE.A)
				{
					if(other.pos.x <= this.pos.x){this.flip = true;}
					else if(other.pos.x >= this.pos.x){this.flip = false;}
					
					this._ready = false;
				}
                                             if(other.type == ig.Entity.TYPE.B && this.turningInitiated == 0){ this.turningInitiated = 1;this.flip = !this.flip;}
			}
				
		});

		EntitySlash_NPC = ig.Entity.extend({
		
		
		//animSheet: new ig.AnimationSheet( 'media/AttackAnimation/ManaBurst.png', 32, 32),
			size: {x: 25,y: 16},
			offset: {x: 0, y: 4},
			maxVel: {x: 0, y: 0},
			type: ig.Entity.TYPE.NONE,
			checkAgainst: ig.Entity.TYPE.A,
			collides: ig.Entity.COLLIDES.NONE,
			
			name: 'slash_E',
			flip: true,
			
			doneDamage: false,
			delayTimer: null,
			delayTimer2: null,
		
			firstRound: true,
			
			goingRight: false,
			goingLeft: false,
			
			
			ATK: 40,
			
			
			
			
			
			init: function( x, y, settings ) 
			{
				
				
				this.parent(x, y, settings );
			
				
				// Animation for the Enemy1
				
				this.delayTimer = new ig.Timer();
				this.delayTimer2 = new ig.Timer();
				this.delayTimer2.set(0.4);
				this.delayTimer.set(1.5);
				if(ig.game.player.pos.x > this.pos.x){this.flip = false;}
				if(ig.game.player.pos.x <= this.pos.x){this.flip = true;}
				
			
			
			
			
			
				
				
			},
			
			update: function() {
			
			
			
			
			
			this.parent();
			if(this.delayTimer.delta() > 0){this.kill();}
			
			},
			
			check: function (other) {
			
					if(this.doneDamage == false)
					{
					this.doneDamage = true;
					
					
					ig.game.checkDamage(other, this, 'PHYSICAL',this.ATK);
                     this.kill();
					}
				
					
				
				
			}
		});	
});