ig.module(
	'game.entities.summonEffect'
	)
.requires(
	'impact.entity'
	)
.defines(function(){
    EntitySummonEffect = ig.Entity.extend({


        animSheet: new ig.AnimationSheet('media/AttackAnimation/SummonSphere.png', 32, 32),

        size: { x: 32, y: 32 },

        maxVel: { x: 0, y: 0 },
        type: ig.Entity.TYPE.NONE,

        collides: ig.Entity.COLLIDES.NONE,

        name: 'summonEffect',
        flip: true,

  
        delayTimer: null,


        firstRound: true,

        goingRight: false,
        goingLeft: false,







        init: function (x, y, settings) {


            this.addAnim('idle', 0.1, [0, 1, 2, 3]);
            this.parent(x, y, settings);
            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
            //sound.volume = 0.25;
            //sound.play();
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);



        },
        reset: function (x, y, settings) {
            this.addAnim('idle', 0.1, [0, 1, 2, 3]);
            this.parent(x, y, settings);
            // Animation for the Enemy1
            //var sound = new ig.Sound('media/Music/MagicProjectile.mp3');
            //sound.volume = 0.25;
            //sound.play();
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(1.5);
        

        },
        update: function () {





            this.parent();
          
            if (this.delayTimer.delta() > 0) {
                this.kill();
            }
            this.currentAnim.flip.x = this.flip;
        }



    });
		
	});