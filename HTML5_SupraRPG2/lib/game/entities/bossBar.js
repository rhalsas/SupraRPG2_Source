ig.module(
	'game.entities.bossBar'
	)
.requires(
	'impact.entity'
	)
.defines(function () {
    EntityBossBar= ig.Entity.extend({

        collides: ig.Entity.COLLIDES.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,

        size: { x: 267, y: 64 },
        offset: { x: 0, y: 0 },
        animSheet : new ig.AnimationSheet('media/aegonthegiant.png',267, 64),
        textD: '',
        fadeInDelay: null,
        fadeOutDelay: null,
       
        gravityFactor: 0,
        fps: 60,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            
            this.addAnim('idle', 1, [0]);
            this.currentAnim = this.anims.idle;
           this.currentAnim.alpha =0;
            this.fadeInDelay = new ig.Timer();
            this.fadeOutDelay = new ig.Timer();
            this.fadeInDelay.set(1);
            this.fadeOutDelay.set(3);
            
        },


        update: function () {




            this.parent();
            this.pos.x = ig.game.player.pos.x - 133.5;
            this.pos.y = ig.game.player.pos.y - 16;
            this.fps = (1 / ig.system.tick).round();
            if (this.fadeInDelay.delta() < 0)
            { if ((this.currentAnim.alpha + (1 / this.fps)) > 1) { this.currentAnim.alpha = 1; } else { this.currentAnim.alpha += 1 / this.fps; } }
            else if (this.fadeOutDelay.delta() > 0 && this.currentAnim.alpha > 0)
            { if (((this.currentAnim.alpha -( 1 / this.fps))) < 0) { this.currentAnim.alpha = 0; }this.currentAnim.alpha -=1 / this.fps; }
            else if (this.fadeOutDelay.delta() >= 0 && this.currentAnim.alpha <= 0) {
                this.kill();  
            }
            





        }

    });
   
});