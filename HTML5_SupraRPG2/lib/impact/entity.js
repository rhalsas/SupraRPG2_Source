ig.module(
	'impact.entity'
)
.requires(
	'impact.animation',
	'impact.impact'
)
.defines(function(){ "use strict";

ig.Entity = ig.Class.extend({
	id: 0,
	settings: {},
	
	size: {x: 16, y:16},
	offset: {x: 0, y: 0},
	
	pos: {x: 0, y:0},
	last: {x: 0, y:0},
	vel: {x: 0, y: 0},
	accel: {x: 0, y: 0},
	friction: {x: 0, y: 0},
	maxVel: {x: 100, y: 100},
	zIndex: 0,
	gravityFactor: 1,
	standing: false,
	bounciness: 0,
	minBounceVelocity: 40,
    EXP_BOUNTY: 0,
	chilled: false,
	burn: false,
	IsBurning: false,
	BurnDMG: 0,
	doneDamage: false,
    immunity: false,
	anims: {},
	animSheet: null,
	currentAnim: null,
	health: 10,
	chillInvoked: false,
	resetChill: new ig.Timer(),
	resetBurn: new ig.Timer(),
	resetBurnLight: null,
	ARCANEDEVOCOUNTER: 0,
	venomSlash: false,
	applyVenom: false,
	weakeningPoison: false,
    weakeningDone: false,
    burnLightTimer: false,

    venomTimer: null,
    venomInvoked: false,
	type: 0, // TYPE.NONE
	checkAgainst: 0, // TYPE.NONE
	collides: 0, // COLLIDES.NEVER
	canDuplicate: true,
	_killed: false,
    waitingForScene: false,
    isDropping: false,
    dropLevel: 0,
    dropType: 'normal',
    chillPartic: null,
    counter: 0,
    isWeakened: "healthy",
    singularityAffection: false,
    delayShock: new ig.Timer(),
	slopeStanding: {min: (44).toRad(), max: (136).toRad() },
	
	checkChilled: function () {
	    var chillTimer = 1;
	    if (this.chilled === true) {
	       
	        if (this.name !== "player1") chillTimer = (1 + (0.5 * ig.game.player.SPELL_DEEPFREEZE_LEVEL));
	        this.resetChill.set(chillTimer);
			this.chilled = false;	
			this.chillInvoked = true;
		
	    }
	    this.counter++;
	    if (this.chillInvoked) { this.vel.x *= 0.5; }

		if (this.chillInvoked && this.resetChill.delta() > 0)
		{
		    
			this.chilled = false;	
			this.chillInvoked = false;
		}
		else {
		   
		    if (this.chillInvoked === true && (!this.chillPartic || this.chillPartic.delta()> 0)) {
		      
		        if (!this.chillPartic) {
		            this.chillPartic = new ig.Timer(); 
		          
		        }
		        this.chillPartic.set(chillTimer/3);
                ig.game.spawnEntity(EntityDeathExplosion, this.pos.x-2, this.pos.y+2, { colorOffset: 8 });
             
		    }
		   
		}
	},
	venomSlashed: function () {
	   
	    if (!this.venomTimer) {
	      
	        this.venomTimer = new ig.Timer();
	        this.venomTimer.set(1);
	        
		
	    }

	

	    if (this.venomTimer && this.venomTimer.delta() > 0)
	    {
	        this.receiveDamage(5, ig.game.player);
	        ig.game.damageTimer(1, 5, 'green', ig.game.player);
	       
	        this.venomTimer.set(1);
	    }
	   
	},
	terraFireCheckRadius: function(){
        
	    var entL = ig.game.entities;
	    for(var i = 0; i < entL.length; i++)
	    {

	      
	        if (this.distanceTo(entL[i]) < 48 && (entL[i].name === "monster" || entL[i].name === "knight" || entL[i].name === "wizard" || entL[i].name === "boss")
                && entL[i].IsBurning === false && ig.game.player) {

	           
	            entL[i].BurningDMG = Math.ceil(0.35 * ig.game.player.MATK);
	            entL[i].IsBurning = true;
	            entL[i].resetBurn.set(2);
	           
	          
	        }
	    }
       
	},
	burningLight: function(){

	    var entL = ig.game.entities;
	    var distance = 48;
	    var dMod = 1;
	    if (this.name === "player1" && this.shield.SPECIAL["Dark Light"]) {
	        distance = 24;
	        dMod = 2;
	    }
	    for(var i = 0; i < entL.length; i++)
	    {
	        if ((entL[i].name === "monster" || entL[i].name === "knight" || entL[i].name === "wizard" || entL[i].name === "boss") &&
                this.distanceTo(entL[i]) < distance) {

	      
	            if ((this.resetBurnLight && this.resetBurnLight.delta() > 0) || this.resetBurnLight === null) {

	                if (!this.resetBurnLight) this.resetBurnLight = new ig.Timer();
	                
	                this.resetBurnLight.set(1);
	                
	                var damage = 15 * dMod;
	                ig.game.damageTimer(1, damage, 'burning_orange', entL[i]);
	                entL[i].receiveDamage(damage, entL[i]);
	              
	            }
	         

	        }
	    }
        

	},
	shockWaveReset: function(){
	    if (this.name === 'boss' ||
            this.name === 'wizard' ||
            this.name === 'monster' ||
            this.name === 'knight') {
	        if (this.ShockWavedoneDamage) { if (!this.setShock) { this.setShock = true; this.delayShock.set(0.4); } }
	        if (this.delayShock && this.delayShock.delta() > 0) { this.ShockWavedoneDamage = false; this.setShock = false; }
	    }
	    

	},
	init: function( x, y, settings ) {
		this.id = ++ig.Entity._lastId;
		this.pos.x = this.last.x = x;
		this.pos.y = this.last.y = y;
		
		ig.merge(this, settings);
		if (this.waitingForScene) {
		    this.immunity = true;
		}
		if (this.name === 'boss' ||
            this.name === 'wizard' ||
            this.name === 'monster' ||
            this.name === 'knight') {


		    this.isDropping = true;
            

		}
	
		if (this.name === 'boss' && isBossKilled === true) {
	
		    this.isDropping = false;
		    ig.game.destroyBossWalls();
		    ig.game.removeEntity(this);
		}
		if (
            this.name === "monster" ||
            this.name === "boss" ||
            this.name === "knight" ||
            this.name === "wizard") {
		    this.setDifficultyModifiers();
		}
	
	},
	
	reset: function( x, y, settings ) {
		var proto = this.constructor.prototype;
		this.pos.x = x;
		this.pos.y = y;
		this.last.x = x;
		this.last.y = y;
		this.vel.x = proto.vel.x;
		this.vel.y = proto.vel.y;
		this.accel.x = proto.accel.x;
		this.accel.y = proto.accel.y;
		this.health = proto.health;
		this._killed = proto._killed;
		this.standing = proto.standing;
		
		this.type = proto.type;
		this.checkAgainst = proto.checkAgainst;
		this.collides = proto.collides;
	
		ig.merge( this, settings );
	},
	
	addAnim: function( name, frameTime, sequence, stop ) {
		if( !this.animSheet ) {
			throw( 'No animSheet to add the animation '+name+' to.' );
		}
		var a = new ig.Animation( this.animSheet, frameTime, sequence, stop );
		this.anims[name] = a;
		if( !this.currentAnim ) {
			this.currentAnim = a;
		}
		
		return a;
	},
	setDifficultyModifiers: function () {

	    var modifier = 1;
	    if (difficultyLevel === 1) {
	        modifier = 3;
	    }
	    else if (difficultyLevel === 2) {
	        modifier = 5;
	    }
	    else if (difficultyLevel === 3) {
	        modifier = 10;
	    }
	    
	    this.Maxhealth *= modifier;
	    this.health *= modifier;

	  
	    if (this.name === "boss") {
	        this.actHealth *= modifier;
	    }
	    this.ATK *= modifier;
	    console.log(difficultyLevel);
	    this.EXP_BOUNTY *= 0.5 + modifier/2;
	},
	update: function () {
	  
	    if (!ig.game.scene_Invoked || this.name === 'notNPC') {
	        this.last.x = this.pos.x;
	        this.last.y = this.pos.y;
	       this.vel.y += ig.game.gravity * ig.system.tick * this.gravityFactor;
	        
	        this.vel.x = this.getNewVelocity(this.vel.x, this.accel.x, this.friction.x, this.maxVel.x);
	        this.vel.y = this.getNewVelocity(this.vel.y, this.accel.y, this.friction.y, this.maxVel.y);
	   
	        if (this.weakeningPoison === true && this.weakeningDone === false) {
	            if (this.ATK) this.ATK *= 0.8;
	            this.weakeningDone = true;

                
	        }
	    this.shockWaveReset();
	    this.checkChilled();
	    if (this.venomSlash === true) {
	        this.venomSlashed();
	    }
	    if (this.name === 'player1' &&
            this.LIFE_BURNINGLIGHT
            ) {
	        this.burningLight();
	    }
	    if (this.name === 'player1' &&
       this.armor.SPECIAL["Heat"]
       ) {
	     
	        this.terraFireCheckRadius();
	    }
	    if (this.name === 'boss') {

	        if (this.distanceTo(ig.game.player) < 140) {
	            ig.game.bossHealthBar = true;
	        }
	        else {
	            ig.game.bossHealthBar = false;
	          
	        }
	       
	    }
	    if (this.isWeakened === "invoked" &&
            this.name === "monster" ||
            this.name === "boss" ||
            this.name === "knight" ||
            this.name === "wizard") {
	        this.isWeakened = "weakened";
	        this.ATK *= 0.8;
	    }
	    // movement & collision
	   
	        var mx = this.vel.x * ig.system.tick;
	        var my = this.vel.y * ig.system.tick;

	      
	        var res = ig.game.collisionMap.trace(
                this.pos.x, this.pos.y, mx, my, this.size.x, this.size.y
            );
	        this.handleMovementTrace(res);
	    }
		
		
		
		if( this.currentAnim ) {
			this.currentAnim.update();
		}
	},
	
	
	getNewVelocity: function( vel, accel, friction, max ) {
		if( accel ) {
			return ( vel + accel * ig.system.tick ).limit( -max, max );
		}
		else if( friction ) {
			var delta = friction * ig.system.tick;
			
			if( vel - delta > 0) {
				return vel - delta;
			} 
			else if( vel + delta < 0 ) {
				return vel + delta;
			}
			else {
				return 0;
			}
		}
		return vel.limit( -max, max );
	},
	
	
	handleMovementTrace: function( res ) {
		this.standing = false;
	
		if( res.collision.y ) {
			if( this.bounciness > 0 && Math.abs(this.vel.y) > this.minBounceVelocity ) {
				this.vel.y *= -this.bounciness;				
			}
			else {
				if( this.vel.y > 0 ) {
					this.standing = true;
				}
				if (!(this instanceof EntityElevator)) this.vel.y = 0;
			}
		}
		if( res.collision.x ) {
			if( this.bounciness > 0 && Math.abs(this.vel.x) > this.minBounceVelocity ) {
				this.vel.x *= -this.bounciness;				
			}
			else {
			    if (!(this instanceof EntityElevator)) this.vel.x = 0;
			}
		}
		if( res.collision.slope ) {
			var s = res.collision.slope;
			
			if( this.bounciness > 0 ) {
				var proj = this.vel.x * s.nx + this.vel.y * s.ny;
				
				this.vel.x = (this.vel.x - s.nx * proj * 2) * this.bounciness;
				this.vel.y = (this.vel.y - s.ny * proj * 2) * this.bounciness;
			}
			else {
				var lengthSquared = s.x * s.x + s.y * s.y;
				var dot = (this.vel.x * s.x + this.vel.y * s.y)/lengthSquared;
				
				this.vel.x = s.x * dot;
				this.vel.y = s.y * dot;
				
				var angle = Math.atan2( s.x, s.y );
				if( angle > this.slopeStanding.min && angle < this.slopeStanding.max ) {
					this.standing = true;
				}
			}
		}
		
		this.pos = res.pos;
	},
	
	
	draw: function() {
	    if (this.currentAnim) {
	        if (ig.game.player) {
	            
	              
	                this.currentAnim.draw(
                        this.pos.x - this.offset.x - ig.game._rscreen.x,
                        this.pos.y - this.offset.y - ig.game._rscreen.y
                    );
	                if (this.name === "boss" && ig.game.bossHealthBar) {
	                    var hp_modifier = this.actHealth / this.Maxhealth;
	                    if (hp_modifier > 0) {
	                        ig.game.bossHealthBarDraw.draw(80, 60, 0, 0, 77 * (hp_modifier), 5);
	                    }
	                }
	                
	            
	        }
	        else {
	            this.currentAnim.draw(
                        this.pos.x - this.offset.x - ig.game._rscreen.x,
                        this.pos.y - this.offset.y - ig.game._rscreen.y
                    );
	        }
		}
	},
	
	
	kill: function () {
	    if (this.EXP_BOUNTY && ig.game.player) {
	        ig.game.player.EXP += this.EXP_BOUNTY;
	    }
	    if (this.name === 'boss') {
	        if (ig.game.levelChangeButtonInvoked) {
	            TopHUDElementsTo(false);
	        }
	      
	        isBossKilled = true;
	    }
	    ig.game.destroyedEntitiesArray.push({x: this.pos.x,y: this.pos.y,name: this.name});
		ig.game.removeEntity( this );
	},
	
	
	receiveDamage: function (amount, from) {
        //Sanity Check for damage
	    if ((!amount || isNaN(amount)) && amount != 0) {
	        amount = 0; 
	    }
        if(this.immunity === false){
		this.health -= amount;
                            if(this.name){
                             if(this.name=="player1"){
                           /* if(ig.game.SOUNDON){
                            var sound = new ig.Sound('media/Music/BloodSplat.m4a');
                            sound.play();}*/
                             }
                             else if(this.name === "boss" ||
                                 this.name === "monster" ||
                                 this.name === "knight" ||
                                 this.name === "wizard"){
                                 if (ig.game.player) this.flip = !ig.game.player.flip;
                             }
                            
                            }
                           
                            if (this.health <= 0) {
                                if (this.isDropping === true) {
                                    var random = Math.floor(Math.random() * 20);
                                    if (random === 0) ig.game.spawnTreasure(this.pos.x, this.pos.y);
                                    var goldRandom = Math.floor(Math.random() * 10);
                                    if (goldRandom === 0) ig.game.spawnGold(this.name, this.pos.x, this.pos.y);
                                       
                                   
                                   
                                    this.isDropping = false;
                                }
                            
			this.kill();
            }
        }
	},
	
	
	touches: function( other ) {		
		return !(
			this.pos.x >= other.pos.x + other.size.x ||
			this.pos.x + this.size.x <= other.pos.x ||
			this.pos.y >= other.pos.y + other.size.y ||
			this.pos.y + this.size.y <= other.pos.y
		);
	},
	
	
	distanceTo: function( other ) {
                            if(other)
                            {
		var xd = (this.pos.x + this.size.x/2) - (other.pos.x + other.size.x/2); 
		var yd = (this.pos.y + this.size.y/2) - (other.pos.y + other.size.y/2);
		return Math.sqrt( xd*xd + yd*yd );
                            }else{return 0;}
                            
	},
	
	
	angleTo: function( other ) {
		return Math.atan2(
			(other.pos.y + other.size.y/2) - (this.pos.y + this.size.y/2),
			(other.pos.x + other.size.x/2) - (this.pos.x + this.size.x/2)
		);
	},
	
	
	check: function( other ) {},
	collideWith: function( other, axis ) {},
	ready: function() {},
	erase: function() {}
});


// Last used entity id; incremented with each spawned entity

ig.Entity._lastId = 0;


// Collision Types - Determine if and how entities collide with each other

// In ACTIVE vs. LITE or FIXED vs. ANY collisions, only the "weak" entity moves,
// while the other one stays fixed. In ACTIVE vs. ACTIVE and ACTIVE vs. PASSIVE
// collisions, both entities are moved. LITE or PASSIVE entities don't collide
// with other LITE or PASSIVE entities at all. The behaiviour for FIXED vs.
// FIXED collisions is undefined.

ig.Entity.COLLIDES = {
	NEVER: 0,
	LITE: 1,
	PASSIVE: 2,
	ACTIVE: 4,
	FIXED: 8
};


// Entity Types - used for checks

ig.Entity.TYPE = {
	NONE: 0,
	A: 1,
	B: 2,
	BOTH: 3
};



ig.Entity.checkPair = function( a, b ) {
	
	// Do these entities want checks?
	if( a.checkAgainst & b.type ) {
		a.check( b );
	}
	
	if( b.checkAgainst & a.type ) {
		b.check( a );
	}
	
	// If this pair allows collision, solve it! At least one entity must
	// collide ACTIVE or FIXED, while the other one must not collide NEVER.
	if(
		a.collides && b.collides &&
		a.collides + b.collides > ig.Entity.COLLIDES.ACTIVE
	) {
		ig.Entity.solveCollision( a, b );
	}
};


ig.Entity.solveCollision = function( a, b ) {
	
	// If one entity is FIXED, or the other entity is LITE, the weak
	// (FIXED/NON-LITE) entity won't move in collision response
         //OWN FIX
    
	var weak = null;
	if(
		a.collides == ig.Entity.COLLIDES.LITE ||
		b.collides == ig.Entity.COLLIDES.FIXED
	) {
		weak = a;
	}
	else if(
		b.collides == ig.Entity.COLLIDES.LITE ||
		a.collides == ig.Entity.COLLIDES.FIXED
	) {
		weak = b;
	}
		
	
	// Did they already overlap on the X-axis in the last frame? If so,
	// this must be a vertical collision!
	if(
		a.last.x + a.size.x > b.last.x &&
		a.last.x < b.last.x + b.size.x
	) {
		// Which one is on top?
		if( a.last.y < b.last.y ) {
			ig.Entity.seperateOnYAxis( a, b, weak );
		}
		else {
			ig.Entity.seperateOnYAxis( b, a, weak );
		}
		a.collideWith( b, 'y' );
		b.collideWith( a, 'y' );
	}
	
	// Horizontal collision
	else if(
		a.last.y + a.size.y > b.last.y &&
		a.last.y < b.last.y + b.size.y
	){
		// Which one is on the left?
		if( a.last.x < b.last.x ) {
			ig.Entity.seperateOnXAxis( a, b, weak );
		}
		else {
			ig.Entity.seperateOnXAxis( b, a, weak );
		}
		a.collideWith( b, 'x' );
		b.collideWith( a, 'x' );
	}
         
         if(a.name && a.name == "player1"){ig.game.moveItems(a);}
         else if( b.name && b.name == "player1"){ig.game.moveItems(b);}
        
};


// FIXME: This is a mess. Instead of doing all the movements here, the entities
// should get notified of the collision (with all details) and resolve it
// themselfs.

ig.Entity.seperateOnXAxis = function( left, right, weak ) {
	var nudge = (left.pos.x + left.size.x - right.pos.x);
	
	// We have a weak entity, so just move this one
	if( weak ) {
		var strong = left === weak ? right : left;
		weak.vel.x = -weak.vel.x * weak.bounciness + strong.vel.x;
		
		var resWeak = ig.game.collisionMap.trace(
			weak.pos.x, weak.pos.y, weak == left ? -nudge : nudge, 0, weak.size.x, weak.size.y
		);
		weak.pos.x = resWeak.pos.x;
	}
	
	// Normal collision - both move
	else {
		var v2 = (left.vel.x - right.vel.x)/2;
		left.vel.x = -v2;
		right.vel.x = v2;
	
		var resLeft = ig.game.collisionMap.trace(
			left.pos.x, left.pos.y, -nudge/2, 0, left.size.x, left.size.y
		);
		left.pos.x = Math.floor(resLeft.pos.x);
		
		var resRight = ig.game.collisionMap.trace(
			right.pos.x, right.pos.y, nudge/2, 0, right.size.x, right.size.y
		);
		right.pos.x = Math.ceil(resRight.pos.x);
	}
};


ig.Entity.seperateOnYAxis = function( top, bottom, weak ) {
	var nudge = (top.pos.y + top.size.y - bottom.pos.y);
	
	// We have a weak entity, so just move this one
	if( weak ) {
		var strong = top === weak ? bottom : top;
		weak.vel.y = -weak.vel.y * weak.bounciness + strong.vel.y;
		
		// Riding on a platform?
		var nudgeX = 0;
		if( weak == top && Math.abs(weak.vel.y - strong.vel.y) < weak.minBounceVelocity ) {
			weak.standing = true;
			nudgeX = strong.vel.x * ig.system.tick;
		}
		
		var resWeak = ig.game.collisionMap.trace( 
			weak.pos.x, weak.pos.y, nudgeX, weak == top ? -nudge : nudge, weak.size.x, weak.size.y
		);
		weak.pos.y = resWeak.pos.y;
		weak.pos.x = resWeak.pos.x;
	}
	
	// Bottom entity is standing - just bounce the top one
	else if( ig.game.gravity && (bottom.standing || top.vel.y > 0) ) {	
		var resTop = ig.game.collisionMap.trace( 
			top.pos.x, top.pos.y, 0, -(top.pos.y + top.size.y - bottom.pos.y), top.size.x, top.size.y
		);
		top.pos.y = resTop.pos.y;
		
		if( top.bounciness > 0 && top.vel.y > top.minBounceVelocity ) {
			top.vel.y *= -top.bounciness;		
		}
		else {
			top.standing = true;
			top.vel.y = 0;
		}
	}
	
	// Normal collision - both move
	else {
		var v2 = (top.vel.y - bottom.vel.y)/2;
		top.vel.y = -v2;
		bottom.vel.y = v2;
		
		var nudgeX = bottom.vel.x * ig.system.tick;
		var resTop = ig.game.collisionMap.trace( 
			top.pos.x, top.pos.y, nudgeX, -nudge/2, top.size.x, top.size.y
		);
		top.pos.y = resTop.pos.y;
		
		var resBottom = ig.game.collisionMap.trace( 
			bottom.pos.x, bottom.pos.y, 0, nudge/2, bottom.size.x, bottom.size.y
		);
		bottom.pos.y = resBottom.pos.y;
	}
};

});