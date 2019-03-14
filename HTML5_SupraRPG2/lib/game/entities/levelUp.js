ig.module(
	'game.entities.levelUp'
	)
.requires(
	'impact.entity'
	)
.defines(function () {
    EntityLevelUp = ig.Entity.extend({

        collides: ig.Entity.COLLIDES.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,

        size: { x: 267, y: 160 },
        offset: { x: 0, y: 0 },
        animSheet: new ig.AnimationSheet('media/levelUp.png', 267, 160),
        textD: '',
        fadeInDelay: null,
        fadeOutDelay: null,
        ofadeIn: false,
        name: 'lvlup',
        ofadeOut: false,
        gravityFactor: 0,
        fps: 60,
        init: function (x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim('idle', 1, [0]);
            this.currentAnim = this.anims.idle;
            this.currentAnim.alpha = 0;
            this.fadeInDelay = new ig.Timer();
            this.fadeOutDelay = new ig.Timer();
            this.fadeInDelay.set(1);
            this.fadeOutDelay.set(3);
            ig.game.specialEntity = this;
        },

        draw: function( reallyDraw ) {
            // Only draw when the 'reallyDraw' param is true, 
            // so it ignores the "normal" draw call
            if( reallyDraw ) {
                this.parent();
            }
        },
        update: function () {

             this.parent();

           
           
           
            this.fps = (1 / ig.system.tick).round();

         /*   if (this.ofadeIn == true)
            {
                if (this.fadeInDelay.delta() < 0)
                { if ((this.currentAnim.alpha + (1 / this.fps)) > 1) { this.currentAnim.alpha = 1; } else { this.currentAnim.alpha += 1 / this.fps; } }
            }
            else if (this.ofadeOut == true) {
                if (this.fadeInDelay.delta() < 0)
                { if ((this.currentAnim.alpha - (1 / this.fps)) < 0) { this.currentAnim.alpha = 0; } else { this.currentAnim.alpha -= 1 / this.fps; } }
            }*/
           // else {

                if (this.fadeInDelay.delta() < 0)
                { if ((this.currentAnim.alpha + (1 / this.fps)) > 1) { this.currentAnim.alpha = 1; } else { this.currentAnim.alpha += 1 / this.fps; } }
                else if (this.fadeOutDelay.delta() > 0 && this.currentAnim.alpha > 0)
                { if (((this.currentAnim.alpha - (1 / this.fps))) <= 0) { this.currentAnim.alpha = 0; } else { this.currentAnim.alpha -= 1 / this.fps; } }
                else if (this.fadeOutDelay.delta() >= 0 || this.currentAnim.alpha <= 0) {

                    this.currentAnim.alpha = 0;
                    ig.game.InformLevelUp = false;
                    ig.game.LevelUpInfo = false;
                    ig.game.specialEntity = null;
                    this.kill();
                }
           // }

        }

    });

});