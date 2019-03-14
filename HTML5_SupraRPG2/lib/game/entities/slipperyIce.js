ig.module(
	'game.entities.slipperyIce'
	)
.requires(
	'impact.entity',
    'impact.entity-pool'
	)
.defines(function () {
    EntitySlipperyIce = ig.Entity.extend({

        collides: ig.Entity.COLLIDES.NONE,
        checkAgainst: ig.Entity.TYPE.A,

        size: { x: 16, y: 16 },
        offset: { x: 0, y: 0 },
        maxVel: { x: 0, y: 0 },

        checkThis: true,


        init: function (x, y, settings) {
            this.parent(x, y, settings);
          
           

      


        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);

        

         


        },


        update: function () {




            this.parent();
           
          
      








        },
        check: function (other) {
            
            other.friction.x = 0;

        }
      
    });
    ig.EntityPool.enableFor(EntitySlipperyIce)
});