ig.module(
	'game.entities.star'
	)
.requires(
	'impact.entity'
	)
.defines(function () {
    EntityStar = ig.Entity.extend({

        collides: ig.Entity.COLLIDES.NONE,
        checkAgainst: ig.Entity.TYPE.NONE,

        size: { x: 8, y: 8 },
        offset: { x: 0, y: 0 },
        animSheet: new ig.AnimationSheet('media/star.png', 8,8),
        name: 'MBG_VAR',

        gravityFactor: 0,
        fps: 60,
        init: function (x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim('idle', 0.2, [0,1,2]);
            this.currentAnim = this.anims.idle;
            

        },


        update: function () {




            this.parent();
          






        }

    });

});