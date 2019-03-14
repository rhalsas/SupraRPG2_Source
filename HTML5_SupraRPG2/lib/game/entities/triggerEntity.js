ig.module(
	'game.entities.triggerEntity'
	)
.requires(
	'impact.entity',
    'impact.entity-pool'
	)
.defines(function () {
    EntityTriggerEntity = ig.Entity.extend({

        collides: ig.Entity.COLLIDES.FIXED,
        checkAgainst: ig.Entity.TYPE.A,

        size: { x: 32, y: 64 },
        offset: { x: 0, y: 0 },
       
        textD: '',


        init: function (x, y, settings) {
            this.parent(x, y, settings);
       
         

        },
        

        update: function () {




            this.parent();
            






        },
        check: function (other) {
            //ig.game.dialogText = this.textD;
			//ig.game.dialog = false;
			//ig.game.dialogDelay = new ig.Timer();
			//ig.game.dialogDelay.set(0.5);
            this.kill();

        },
       
    });
    ig.EntityPool.enableFor(EntityTriggerEntity);
});