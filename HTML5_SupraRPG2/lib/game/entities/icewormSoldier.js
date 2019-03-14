ig.module(
	'game.entities.icewormSoldier'
	)
.requires(
	'impact.entity',
    'impact.entity-pool'
    
	)
.defines(function () {
    EntityIcewormSoldier = ig.Entity.extend({
        collides: ig.Entity.COLLIDES.ACTIVE,


        size: { x: 32, y: 8 },
        offset: { x: 0, y: 12 },
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.BOTH,

        isInvu: true,

        name: 'monster',
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
        strenght: 1,
        wisdom: 1,
        cunning: 1,
        luck: 0,
        ATK: 15,
        STAGGER: 0,
        HP_REGEN: 15,
        FRENZYCOUNTER: 0,
        RESISBREAK: 0,
        RES: 0,
        MAG_RES: 0,
        EXP_BOUNTY: 3,
        health: 300,
        Maxhealth: 35,
        mana: 50,
        Maxmana: 50,
        locationMoved: '',
        actionskill1: 'Slash',
        actionskill2: 'Defend',
        maxVel: { x: 30, y: 30 },
        friction: { x: 50, y: 0 },
        speed: 10,
        track_player: null,
        C4_FIRSTSTRIKE: false,

        init: function (x, y, settings) {
            this.parent(x, y, settings);
            /*var randomnumber=Math.floor(Math.random()*101);
            if(randomnumber <= 25){this.vel.x = 0; this.vel.y = 50;this.locationMoved = 'Down';}
            else if(randomnumber <= 50){this.vel.x = 0; this.vel.y = -50;this.locationMoved = 'Up';}
            else if(randomnumber <= 75){this.vel.x = 50; this.vel.y = 0;this.locationMoved = 'Right';}
            else if(randomnumber <= 100){this.vel.x = -50; this.vel.y = 0;this.locationMoved = 'Left';}
            this.delayTimer = new ig.Timer();
            */
            this.animSheet = new ig.AnimationSheet('media/Enemies/IceWorm.png', 32, 32);
            this.delayATKCD = new ig.Timer();
            this.delayAnim = new ig.Timer();
            this.delayShock = new ig.Timer();
            this.delayShock = new ig.Timer();
            //this.delayCollision = new ig.Timer();
            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
            this.ATK = 88;

            var randomnumber = Math.floor(Math.random() * 17);
            this.EXP_BOUNTY = 100 + randomnumber;
        
            // Animation for the Enemy1
            this.addAnim('idle', 0.2, [0,1,2,3,2,1]);
            this.addAnim('attack', 0.05, [4,5,4,5,4,5,4,5,4,5]);
       

        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            /*var randomnumber=Math.floor(Math.random()*101);
            if(randomnumber <= 25){this.vel.x = 0; this.vel.y = 50;this.locationMoved = 'Down';}
            else if(randomnumber <= 50){this.vel.x = 0; this.vel.y = -50;this.locationMoved = 'Up';}
            else if(randomnumber <= 75){this.vel.x = 50; this.vel.y = 0;this.locationMoved = 'Right';}
            else if(randomnumber <= 100){this.vel.x = -50; this.vel.y = 0;this.locationMoved = 'Left';}
            this.delayTimer = new ig.Timer();
            */
            
        
            //this.delayCollision = new ig.Timer();
            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
            this.ATK = 88;

            var randomnumber = Math.floor(Math.random() * 7);
            this.EXP_BOUNTY = 100 + randomnumber;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [0,1,2,3,2,1]);
            this.addAnim('attack', 0.05, [4,5,4,5,4,5,4,5,4,5]);
       

        },

        update: function () {

            if (this.ShockWavedoneDamage == true) { if (!this.setShock) { this.setShock = true; this.delayShock.set(0.4); } }
            if (this.delayShock.delta() > 0) { this.ShockWavedoneDamage = false; this.setShock = false; }
            this.health += this.HP_REGEN / 60;
            if (this.health >= this.Maxhealth) { this.health = this.Maxhealth; }
            if (ig.game.player != null) {
                if (ig.game.player.pos.x <= this.pos.x + 280 && ig.game.player.pos.x >= this.pos.x - 264) {


                    if (this.delayAnim.delta() < 0) { this.currentAnim = this.anims.attack; }
                    if (this._ready == false && this.CDtimerset == false) { this.delayATKCD.set(1); this.CDtimerset = true; }

                    if (this.delayATKCD.delta() > 0 && this._ready == false) { this._ready = true; this.CDtimerset = false; }
                    if (this.turningInitiated > 0) { this.turningInitiated++; }
                    if (this.turningInitiated == 20) { this.turningInitiated = 0; }

                    // near edge? return!
                    if (!ig.game.collisionMap.getTile(
                        this.pos.x + (this.flip ? +4 : this.size.x - 4),
                            this.pos.y + this.size.y + 1
                            )
                        && this.turningInitiated == 0) {
                        this.flip = !this.flip;
                        this.turningInitiated = 1;
                    }


                    var xdir = this.flip ? -1 : 1;
                    // near edge? return!
                    if (this.delayAnim.delta() > 0) {


                        this.vel.x = this.speed * xdir;
                        this.currentAnim = this.anims.idle;
                    }
                    this.currentAnim.flip.x = this.flip;
                    this.parent();
                }
            }
        },
        handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x && this.turningInitiated == 0) {

                this.flip = !this.flip;
                this.turningInitiated = 1;
            }




        },
        kill: function () {
            this.parent();
                                         if(ig.game.SOUNDON){
                                         var sound = new ig.Sound('media/Music/BloodSplat.m4a');
                                         sound.play();}
            ig.game.player.killEvents.monsterKills += 1; ig.game.player.killEvents.wormKills += 1;
            
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 6 });
        },
        check: function (other) {

            if (this._ready == true && other.type == ig.Entity.TYPE.A) {
                this.currentAnim = this.anims.attack;
                this.delayAnim.set(1);
                ig.game.checkDamage(other, this, 'PHYSICAL');
                this._ready = false;
            }
            if (other.type == ig.Entity.TYPE.B) { this.flip = !this.flip; }

        }
    });
   
});