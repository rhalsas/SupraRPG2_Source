﻿ig.module(
	'game.entities.flameVerticalLeftRight'
	)
.requires(
 
	'impact.entity',
    'impact.entity-pool'
	)
.defines(function(){
		EntityFlameVerticalLeftRight  = ig.Entity.extend({
		
		    collides: ig.Entity.COLLIDES.NONE,
		
		    name: 'notNPC',
		size: {x: 6,y:9},
		offset: {x: 28,y: 28},
		maxVel: {x: 0,y: 0},
		bursting: false,
		bursting_animation: false,
		delayTimer: null,
		delayATKCD: null,
		goldGet : 0,
		trapType: "",
		delayAmount: 0,
			
		init: function( x, y, settings ) 
		{
		    this.parent(x, y, settings);
		    this.animSheet = new ig.AnimationSheet('media/flameVerticalStill.png',64, 64);
			this.addAnim ('idle', 1, [2]);
			
			
			this.delayStart = new ig.Timer()
			this.delayTimer = new ig.Timer();
			this.delayATKCD = new ig.Timer();
			this.delayStart.set(this.delayAmount);
		
		},
		
		
		update: function() 
		{
			
			if(this.delayTimer.delta() > 0 && this.delayStart.delta() > 0)
			{
				switch(this.trapType)
			   {
			   case "":
			    ig.game.spawnEntity('EntityFlameDamagingHorinzonalLeftRight', this.pos.x+8, this.pos.y,{flip:this.flip} ); this.delayTimer.set(2);
			   break;
			   case "fireball":
			    ig.game.spawnEntity('EntityFireSpell_E', this.pos.x+6, this.pos.y+4, { flip: this.flip, angle: 0}); this.delayTimer.set(2);

			   break;
			   }
				
			}
			
			
			
			//this.parent();
			
			
			
			
			
			
			
		},
		check: function(other)
		{
			
			
			
		}
		});
		EntityFlameDamagingHorinzonalLeftRight = ig.Entity.extend({
		
		collides: ig.Entity.COLLIDES.NONE,
		checkAgainst: ig.Entity.TYPE.A,
		
		size: {x: 56,y: 10},
		offset: {x:8,y: 26},
		maxVel: {x: 0,y: 0},
		delayAttack: null,
		
		init: function( x, y, settings ) 
		{
			this.parent(x, y, settings );
			this.animSheet = new ig.AnimationSheet('media/flameVerticalLeftRight.png', 64, 64);
			this.addAnim('idle',0.05,[0,1,2,3,4,5,4,5,4,5,4,5,4,5,4,5]);
			this.addAnim('shut',0.05,[3,2,1,0]);
			this.delayTimer = new ig.Timer();
			this.delayTimer2 = new ig.Timer();
			this.delayAttack = new ig.Timer();
			this.delayAttack.set(0.2);
			this.delayTimer2.set(0.8);
			this.delayTimer.set(1);
		    //   this.set = false;

		},
		    reset: function (x, y, settings) {
		        this.parent(x, y, settings);



		        this.delayAttack.set(0.2);
		        this.delayTimer2.set(0.8);
		        this.delayTimer.set(1);
		        this.currentAnim = this.anims.idle.rewind();
		        this.anims.shut.rewind();
		        //   this.set = false;

		    },


		    update: function () {


		        this.parent();
		        if (this.delayTimer2.delta() > 0) { this.currentAnim = this.anims.shut }


		        if (this.delayTimer.delta() > 0) { this.kill(); }

		    },
		check: function(other)
		{
			if(this.delayTimer.delta() < 0 && this.delayAttack.delta() > 0){
			this.delayAttack.set(0.2);
			damage = (10 * ((100.00 - other.MAG_RES) / 100.00));
			other.receiveDamage(damage, this);
			ig.game.damageTimer(1,damage,'red');
			}
		}
		});
		ig.EntityPool.enableFor(EntityFlameDamagingHorinzonalLeftRight);
	});