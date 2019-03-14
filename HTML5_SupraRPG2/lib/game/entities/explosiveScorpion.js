ig.module(
	'game.entities.explosiveScorpion'
	)
.requires(
	'impact.entity',
    'impact.entity-pool'
	)
.defines(function () {
    EntityExplosiveScorpion = ig.Entity.extend({
collides: ig.Entity.COLLIDES.NONE,
        size: { x: 8, y: 14 },
        offset: { x: 4, y: 1 },
		 type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.BOTH,


        name: 'monster',
        delayJump: null,
        shootarrow: false,
        setDelayArrow: false,
        health: 5,
        healthBuffer: 0,
        actHealth:5,
        deadMonster: false,
		attackWholeTime: 1.5,
			attackAlertTime: 0.5,
			turningInitiated: 0,
			EXP_BOUNTY: 30,
			STAGGER: 0,
            FRENZYCOUNTER: 0,
			
			flip: false,

   
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
            this.animSheet = new ig.AnimationSheet('media/Enemies/DesertViper.png',16, 16);
            this.delayATKCD = new ig.Timer();
            this.delayAnim = new ig.Timer();
            this.delayJump = new ig.Timer();
			this.delayShock = new ig.Timer();
            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
            this.ATK = 8;
			  this.resetBurn = new ig.Timer();
            this.waitUntilRush = 3;
            this.attackAlertTime = 0.15;
            this.speed = 20;
            this.healthBuffer = this.health;
        
            this.EXP_BOUNTY = 2;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [0,1,2]);
           
           this.addAnim('rush', 0.035, [0, 1, 2]);
        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);

            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
            this.ATK = 8;
            this.waitUntilRush =3;
         
            this.speed = 20;
            this.healthBuffer = this.health;
            var randomnumber = Math.floor(Math.random() * 8);
            this.EXP_BOUNTY = 2;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [0, 1, 2]);

            this.addAnim('rush', 0.035, [0, 1, 2]);
            
        },

        kill: function () {
            this.parent();
            
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 9 });
        },
		update: function()
			{
			    if (this.vel.x > 0) { this.IsMovingRight = true; }
			    else if (this.vel.x < 0) { this.IsMovingRight = false; }
			if(ig.game.player)
			{
			   

			    ig.game.burningCalc(this);
		
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

			     if (other instanceof EntityPlayer) {
			         ig.game.checkDamage(other, this, 'PHYSICAL');
			         ig.game.spawnEntity("EntityPoisonExplosion", this.pos.x - 16, this.pos.y- 8);
			         this.kill();

			     }

        }
    });
    EntityPoisonExplosion = ig.Entity.extend({



        size: { x: 32, y: 32 },
        offset: { x: 0, y: 0 },
        maxVel: { x: 0, y: 0 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'EntityPoisonExplosion',
        type: "MAGIC",
        flip: true,
        POWER: 1,
        doneDamage: false,
        delayTimer: null,


        firstRound: true,

        goingRight: false,
        goingLeft: false,








        init: function (x, y, settings) {


            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/AttackAnimation/PoisonExplosion.png', 32, 32);
            this.addAnim('idle', 0.05, [0, 1, 2, 3]);

            this.anims.idle.rewind();
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(0.2);
            this.currentAnim.alpha = 1;


        },
        reset: function (x, y, settings) {


            this.parent(x, y, settings);
            this.anims.idle.rewind();
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(0.2);
            this.currentAnim.alpha = 1;



        },
        
        update: function () {





            this.parent();
            if (this.currentAnim.alpha - 0.05 <= 0) { this.kill(); }
            if (this.delayTimer.delta() > 0) {
                this.currentAnim.alpha -= 0.05;
                this.currentAnim.gotoFrame(3);
            }

        },
        handleMovementTrace: function (res) {
            this.parent(res);

            




        },
        

    });
    ig.EntityPool.enableFor(EntityPoisonExplosion);
    ig.EntityPool.enableFor(EntityExplosiveScorpion);
});