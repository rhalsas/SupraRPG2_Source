ig.module(
	'game.entities.humanNPC'
	)
.requires(
	'impact.entity',
    'impact.entity-pool'
    
	)
.defines(function () {
    EntityHumanNPC = ig.Entity.extend({
        collides: ig.Entity.COLLIDES.ACTIVE,


        size: { x: 8, y: 14 },
        offset: { x: 4, y: 2 },
        type: ig.Entity.TYPE.A,
        checkAgainst: ig.Entity.TYPE.BOTH,

        isInvu: true,

        name: 'notNPC',
        flip: false,
        itemArray: null,
        // items
        gotItem: false,
        ShockWavedoneDamage: false,
        lastItem: '',
        delayTimer: null,
        delayCollision: null,
        delayATKCD: null,
        delayAnim: null,
        timerSet: false,
        collidedWall: false,
        CDtimerset: false,
        turningInitiated: 0,
        _ready: true,
        setShock: false,
        // properties
      
        ATK: 5,
        STAGGER: 0,
        HP_REGEN: 2,
        FRENZYCOUNTER: 0,
        RESISBREAK: 0,
        RES: 0,
        MAG_RES: 0,
        EXP_BOUNTY: 0,
        health: 9999,
        Maxhealth: 9999,
        mana: 9999,
        Maxmana: 999,



        locationMoved: '',
        actionskill1: 'Slash',
        actionskill2: 'Defend',
        maxVel: { x: 100, y: 100 },
        friction: { x: 150, y: 0 },
        speed: 0,
        track_player: null,
        C4_FIRSTSTRIKE: false,
        IsMovingRight: false,
        IsBurning: false,
        BurningDMG: 0,
        resetBurn: null,
        frameCalc:0,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            /*var randomnumber=Math.floor(Math.random()*101);
            if(randomnumber <= 25){this.vel.x = 0; this.vel.y = 50;this.locationMoved = 'Down';}
            else if(randomnumber <= 50){this.vel.x = 0; this.vel.y = -50;this.locationMoved = 'Up';}
            else if(randomnumber <= 75){this.vel.x = 50; this.vel.y = 0;this.locationMoved = 'Right';}
            else if(randomnumber <= 100){this.vel.x = -50; this.vel.y = 0;this.locationMoved = 'Left';}
            this.delayTimer = new ig.Timer();
            */
            this.animSheet = new ig.AnimationSheet('media/Enemies/HumanNPC.png', 16, 16);
            this.delayATKCD = new ig.Timer();
            this.delayAnim = new ig.Timer();
            this.delayShock = new ig.Timer();
            this.delayShock = new ig.Timer();
            this.resetBurn = new ig.Timer();
            //this.delayCollision = new ig.Timer();
            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
            this.ATK = 15;
            this.immunity = true;
            var randomnumber = Math.floor(Math.random() * 7);
            this.EXP_BOUNTY = 0;
            // Animation for the Enemy1
            var animBox = [0, 0, 0, 0, 0, 0, 6, 7, 6];
            var randomAnim = Math.floor(Math.random() * 4);

            for (var i = 0; i < randomAnim ; i++) {
                animBox.splice(0, 0, 0);
            }
           
            this.addAnim('run', 0.07, [0, 1, 2, 3, 4, 5]);
            this.addAnim('idle', 0.2, animBox);
       

        },
        

        update: function () {
            
            if (this.vel.x > 0) { this.IsMovingRight = true; }
            else if (this.vel.x < 0) { this.IsMovingRight = false;}
         
            this.health += this.HP_REGEN / 60;
            if (this.health >= this.Maxhealth) { this.health = this.Maxhealth; }
           

                    if (this.delayAnim.delta() < 0) { this.currentAnim = this.anims.attack; }
                    if (this._ready == false && this.CDtimerset == false) { this.delayATKCD.set(1); this.CDtimerset = true; }

                    if (this.delayATKCD.delta() > 0 && this._ready == false) { this._ready = true; this.CDtimerset = false; }
                    if (this.turningInitiated > 0) { this.turningInitiated++; }
                    if (this.turningInitiated == 15) { this.turningInitiated = 0; }

                    // near edge? return!
                    if (!ig.game.collisionMap.getTile(
                        this.pos.x + (this.flip ? +4 : this.size.x - 4),
                            this.pos.y + this.size.y + 1
                            )
                       &&this.turningInitiated == 0) {
                        this.flip = !this.flip;
                                    this.turningInitiated = 1;
                    }


                    var xdir = this.flip ? -1 : 1;
                    // near edge? return!
                    if (this.delayAnim.delta() > 0) {


                        this.vel.x = this.speed * xdir;
                        this.currentAnim = this.anims.idle;
                        if (this.vel.x !== 0) this.currentAnim = this.anims.run;
                    }
                    this.currentAnim.flip.x = this.flip;
                    this.parent();
             
        },
        handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x && this.turningInitiated == 0) {

                this.flip = !this.flip;
               
            }

        },
        kill: function () {
            this.parent();
                                    if(ig.game.SOUNDON){
            var sound = new ig.Sound('media/Music/BloodSplat.m4a');
            sound.play();}

           
            
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 6 });
        }
       
    });
   
});