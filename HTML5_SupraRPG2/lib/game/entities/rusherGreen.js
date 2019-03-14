ig.module(
	'game.entities.rusherGreen'
	)
.requires(
	'impact.entity',
    'impact.entity-pool'
	)
.defines(function () {
    EntityRusherGreen = ig.Entity.extend({
collides: ig.Entity.COLLIDES.NONE,
        size: { x: 8, y: 14 },
        offset: { x: 12, y: 9 },
		 type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.BOTH,
        name: 'rusher',
        delayJump: null,
        shootarrow: false,
        setDelayArrow: false,
        health: 20,
        healthBuffer: 0,
        actHealth: 20,
        deadMonster: false,
		attackWholeTime: 1.5,
			attackAlertTime: 0.5,
			turningInitiated: 0,
			EXP_BOUNTY: 30,
			STAGGER: 0,
            FRENZYCOUNTER: 0,
			
			flip: false,
			ATK: 25,
   
        delayTimer: null,
        delayCollision: null,
        delayATKCD: null,
        delayAnim: null,
        timerSet: false,
        collidedWall: false,
        CDtimerset: false,
        turningInitiated: 0,
        _ready: true,
      
		
			canAttack: false,
			deadMonster: false,
			IsHenchMan1: false,
			ShockWavedoneDamage: false,
			IsHenchMan2: false,
			flip: false,
			powerAttackDelayInitiated: false,
			powerAttackDelay: null,
			powerAttackAnim: false,
			waitUntilRush: 1,
			setShock: false,
			IsMovingRight: false,
			delayAnim: null,
			IsBurning: false,
			BurningDMG: 0,
			resetBurn: null,
			frameCalc: 0,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/Enemies/Rusher.png', 32, 32);
            this.delayATKCD = new ig.Timer();
            this.delayAnim = new ig.Timer();
            this.delayJump = new ig.Timer();
			this.delayShock = new ig.Timer();
            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
        
			  this.resetBurn = new ig.Timer();
            this.waitUntilRush = 3;
            this.attackAlertTime = 0.15;
            this.speed = 30;
            this.healthBuffer = this.health;
            this.EXP_BOUNTY = 25;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [0,1,2,3,4,5]);
           this.addAnim( 'attack', 0.1, [6,7,6,7,6] );
		    this.addAnim('rush', 0.035, [0,1,2,3,4,5]);
        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);

            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
          
            this.resetBurn = new ig.Timer();
            this.waitUntilRush = 3;
            this.attackAlertTime = 0.15;
            this.speed = 30;
            this.healthBuffer = this.health;
            this.EXP_BOUNTY = 25;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [0,1,2,3,4,5]);
			 this.addAnim( 'attack', 0.1, [6,7,6,7,6] );
		    this.addAnim('rush', 0.035, [0,1,2,3,4,5]);
            
        },

        kill: function () {
            this.parent();
            ig.game.player.killEvents.rusherGreenKills += 1; ig.game.player.killEvents.heavy_knightKills -= 1;
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 9 });
        },
		update: function()
			{
			    if (this.vel.x > 0) { this.IsMovingRight = true; }
			    else if (this.vel.x < 0) { this.IsMovingRight = false; }
			if(ig.game.player)
			{
			   

			    ig.game.burningCalc(this);
				if(this.ShockWavedoneDamage == true){
				if(!this.setShock){
				this.setShock = true;this.delayShock.set(0.4);
				}
				}
			if(this.delayShock.delta() > 0){this.ShockWavedoneDamage = false;this.setShock = false;}
			 if (this._ready == false && this.CDtimerset == false) { this.delayATKCD.set(1); this.CDtimerset = true; }

                    if (this.delayATKCD.delta() > 0 && this._ready == false) { this._ready = true; this.CDtimerset = false; }
					
			if (ig.game.checkIfInArea(ig.game.player,this,64,16)
			)
			{
			
			if(this.powerAttackDelayInitiated == false)
				{
				if(ig.game.player.pos.x <= this.pos.x){
				this.flip = true;
				var x_coord = 0;
				}
				else if(ig.game.player.pos.x > this.pos.x){
				this.flip = false;
				var x_coord = 0;
				}
				
				
				
				//this.vel.x = 0;
				this.currentAnim = this.anims.attack;
				this.powerAttackDelayInitiated = true;
				this.delayAnim.set(this.waitUntilRush);
				this.powerAttackAnim = true;
				}
				if(this.delayAnim.delta() > 0)
				{
				this.powerAttackDelayInitiated = false;
				this.speed = 30;
				}
				
				
				if(
				this.delayAnim.delta() < 0 
				&& this.delayAnim.delta() > -this.waitUntilRush 
				&& this.powerAttackAnim == true
				){
				
				this.anims.rush.rewind();
				this.currentAnim = this.anims.rush;
				this.powerAttackAnim = false;
			    this.speed = 60;
				}
			
			}
			else{
			this.currentAnim = this.anims.idle;
			if(this.turningInitiated > 0){this.turningInitiated++;}
			if(this.turningInitiated == 15){this.turningInitiated = 0;}
		
			// near edge? return!
			if ( !ig.game.collisionMap.getTile(
				this.pos.x + (this.flip ? +4 : this.size.x -4),
					this.pos.y + this.size.y+1
					)
				&& this.turningInitiated == 0){
					this.flip = !this.flip;
                                             this.turningInitiated = 1;
				}
				this.powerAttackDelayInitiated = false;
				
				}
		
			var xdir = this.flip ? -1 : 1;
				this.vel.x = this.speed * xdir;
		
			// near edge? return!
			
			this.currentAnim.flip.x = this.flip;
			}
			this.parent();
			},
			 handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x) {

                this.flip = !this.flip;
               
            }

        },
			 check: function (other) {

            if (this._ready == true && other.type == ig.Entity.TYPE.A) {
             //   this.currentAnim = this.anims.attack;
                this.delayAnim.set(1);
                ig.game.checkDamage(other,this, 'PHYSICAL');
               
                this._ready = false;
            }
            if (other.type == ig.Entity.TYPE.B && this.turningInitiated == 0){ this.turningInitiated = 1; this.flip = !this.flip; }

        }
    });

    ig.EntityPool.enableFor(EntityRusherGreen);
});