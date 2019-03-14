ig.module(
	'game.entities.rusherRed'
	)
.requires(
	'game.entities.rusherGreen'
	)
.defines(function () {
    EntityRusherRed = EntityRusherGreen.extend({
collides: ig.Entity.COLLIDES.NONE,
        size: { x: 8, y: 14 },
        offset: { x: 12, y: 9 },
		 type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.BOTH,
        ATK:100,
        delayJump: null,
        shootarrow: false,
        setDelayArrow: false,
        health: 120,
        healthBuffer: 0,
        actHealth: 120,
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
            this.animSheet = new ig.AnimationSheet('media/Enemies/RusherOrange.png', 32, 32);
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
          
            this.EXP_BOUNTY = 70;
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

            this.EXP_BOUNTY = 70;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [0,1,2,3,4,5]);
			 this.addAnim( 'attack', 0.1, [6,7,6,7,6] );
		    this.addAnim('rush', 0.035, [0,1,2,3,4,5]);
            
        },

        kill: function () {
            this.parent();
      
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 9 });
        }
		
    });

    ig.EntityPool.enableFor(EntityRusherRed);
});