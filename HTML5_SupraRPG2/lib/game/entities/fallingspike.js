ig.module(
	'game.entities.fallingspike'
	)
.requires(
	'impact.entity',
    'impact.entity-pool'
	)
.defines(function () {
    EntityFallingspike = ig.Entity.extend({

        collides: ig.Entity.COLLIDES.FIXED,
        checkAgainst: ig.Entity.TYPE.A,
        name: 'notNPC',
        size: { x: 5, y: 14 },
        offset: { x: 3, y: 0 },
        maxVel: { x: 0, y: 180 },
        vel: { x: 0, y: 0 },
      
        checkThis: true,


        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/traps/fallingspike.png',16, 16);
            this.addAnim('idle', 1, [0]);
            this.vel.y = 0;
            this.checkThis = true;
            this.gravityFactor = 0;
          


        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);

            this.addAnim('idle', 1, [0]);
            this.vel.y = 0;
            this.checkThis = true;
            this.gravityFactor = 0;


        },
        handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x || res.collision.y) {

                this.kill();

            }




        },

        update: function () {




            this.parent();
            if (this.checkThis == true) {
                if (ig.game.player) {
                    if (ig.game.player.pos.x >= this.pos.x && ig.game.player.pos.x <= this.pos.x + 8 &&
                        ig.game.player.pos.y <= this.pos.y + 72 && ig.game.player.pos.y >= this.pos.y)
                    { this.accel.y = 60; this.checkThis = false; }
                }
               
            }








        },
        check: function (other) {
            other.receiveDamage(30, this);
            ig.game.damageTimer(1, 30, 'red');
            this.kill();

        },
        kill: function () {
            this.parent();

           

            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 8 });
        }
    });
    ig.EntityPool.enableFor(EntityFallingspike)
});