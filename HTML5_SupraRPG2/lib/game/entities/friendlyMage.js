ig.module(
	'game.entities.friendlyMage'
	)
.requires(
	'impact.entity'
	)
.defines(function () {
    EntityFriendlyMage = ig.Entity.extend({

        size: { x: 8, y: 14 },
        offset: { x: 12, y: 9 },
        maxVel: {x : 0, y: 0},
        delayJump: null,
        shootarrow: false,
        setDelayArrow: false,
        health: 9999,
        healthBuffer: 0,
        actHealth: 99999,
        flip: true,
        deadMonster: false,
        behavior: '',
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/Enemies/WizardNPC.png', 32, 32);
            this.delayATKCD = new ig.Timer();
            this.delayAnim = new ig.Timer();
            this.delayJump = new ig.Timer();
            this.powerAttackDelay = new ig.Timer();
            this.powerAttackDelay.set(0.5);
            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
            this.attackWholeTime = 0.5 + Math.random();
            this.attackAlertTime = 0.5;
            this.ATK = 0;
            this.speed = 45;
            this.immune = true;
            this.healthBuffer = this.health;
            this.CurrentSpell = 'EntityArcaneBolt_NPC';
            var randomnumber = Math.floor(Math.random() * 7);
            this.EXP_BOUNTY = 155 + randomnumber;
            this.teleportDelay = new ig.Timer();
            this.teleportDelay.set(1);
            // Animation for the Enemy1

            if (this.behavior === 'sage') {
                this.addAnim('idle', 0.07, [102, 103, 102, 103, 102]);
                this.addAnim('idle2', 0.07, [96]);
                this.flip = false;
              
            }
            else {
                this.addAnim('idle', 0.07, [96, 97, 98, 99, 100, 101]);
            }
           
            this.addAnim('attack', 0.1, [102, 103, 102, 103, 102]);
            // this.addAnim('attack2', 0.05, [12, 12, 13, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14]);
            this.addAnim('attack2', 1, [104]);
        },
       
        update: function () {

            if (this.behavior !== 'sage') {
                if (this.powerAttackDelayInitiated == false) {
                    this.currentAnim = this.anims.attack; this.powerAttackDelayInitiated = true;
                    this.powerAttackDelay.set(this.attackWholeTime); this.powerAttackAnim = true;
                }

                if (this.powerAttackDelay.delta() < 0 && this.powerAttackDelay.delta() > -this.attackAlertTime && this.powerAttackAnim == true) {
                    this.enableAttacking = false;


                    ig.game.spawnEntity(this.CurrentSpell, this.pos.x, this.pos.y, { flip: this.flip });


                    this.anims.attack2.rewind(); this.currentAnim = this.anims.attack2; this.powerAttackAnim = false;
                }
                if (this.powerAttackDelay.delta() > 0) { this.powerAttackDelayInitiated = false; }
            }
            else {
                if (this.teleportDelay && this.teleportDelay.delta() > 0) {
                    this.flip = true;
                    this.currentAnim = this.anims.idle2;
                    this.teleportDelay = null;
                }
            }
           
            this.currentAnim.flip.x = this.flip;
            this.parent();
        },

        kill: function () {
            this.parent();
           
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 1 });
        }
    });
    EntityArcaneBolt_NPC = ig.Entity.extend({


        animSheet: new ig.AnimationSheet('media/AttackAnimation/LazorSpell.png', 16, 16),
        size: { x: 14, y: 11 },
        offset: { x: 0, y: 9 },
        maxVel: { x: 450, y: 450 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'firespell',
        flip: true,
        reflect: false,
        doneDamage: false,
        delayTimer: null,
        angle: 0,
        gravityFactor: 0,
        firstRound: true,
        projSpeed: 150,
        goingRight: false,
        goingLeft: false,








        init: function (x, y, settings) {


            this.parent(x, y, settings);
            this.addAnim('idle', 0.1, [0, 1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
            //sound.volume = 0.25;
            //sound.play();
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);
            this.doneDamage = false;
            this.currentAnim.angle = this.angle;
            if (this.flip) {
                this.vel.y = -Math.floor(Math.sin(this.currentAnim.angle) * this.projSpeed);
                this.vel.x = -Math.floor(Math.cos(this.currentAnim.angle) * this.projSpeed);
            }
            else {
                this.vel.y = Math.floor(Math.sin(this.currentAnim.angle) * this.projSpeed);
                this.vel.x = Math.floor(Math.cos(this.currentAnim.angle) * this.projSpeed);
            }

         

        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);
            this.addAnim('idle', 0.1, [0, 1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]);

            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
            //sound.volume = 0.25;
            //sound.play();
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);
            this.doneDamage = false;
            this.currentAnim.angle = this.angle;
            /*if (this.flip) {
                                         
                                         this.vel.x = (this.reflect) ? 300 : -300;
                                         }else{
                                         this.vel.x =  (this.reflect) ? -300 : 300;
                                         }*/
            if (this.flip) {
                this.vel.y = -Math.floor(Math.sin(this.currentAnim.angle) * this.projSpeed);
                this.vel.x = -Math.floor(Math.cos(this.currentAnim.angle) * this.projSpeed);
            }
            else {
                this.vel.y = Math.floor(Math.sin(this.currentAnim.angle) * this.projSpeed);
                this.vel.x = Math.floor(Math.cos(this.currentAnim.angle) * this.projSpeed);
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
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 4 });
        },
        update: function () {





            this.parent();
            if (this.delayTimer.delta() > 0) { this.kill(); }
            this.currentAnim.flip.x = this.flip;
        },

        check: function (other) {


            if (this.doneDamage == false) {
               


                this.kill();

            }



        }

    });
 

});