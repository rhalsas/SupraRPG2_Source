ig.module(
	'game.entities.dreadknight'
	)
.requires(
	'game.entities.heavyknight'
	)
.defines(function(){
		EntityDreadknight = EntityHeavyknight.extend({
		    
			size: {x: 8,y: 14},
			offset: {x:12, y: 9},
			delayJump: null,
			shootarrow: false,
			setDelayArrow: false,
			health: 90,
			healthBuffer: 0,
			actHealth: 90,
			deadMonster: false,
			init: function(x,y,settings){
				this.parent(x, y, settings );
				this.animSheet = new ig.AnimationSheet('media/Enemies/Knights.png', 32, 32);
				this.delayATKCD = new ig.Timer();
				this.delayAnim = new ig.Timer();
				this.delayJump = new ig.Timer();
				this.Maxhealth = this.health;
				this.Maxmana = this.mana;
				this.ATK = 0;
				this.attackWholeTime = 0.5;
				this.attackAlertTime= 0.5;
				this.speed = 40;
				this.healthBuffer = this.health;
				
				this.EXP_BOUNTY = 33;
			    // Animation for the Enemy1


				this.addAnim( 'idle', 0.07, [36,37,38,39,40,41] );
				this.addAnim( 'attack', 0.1, [42,43,42,43,42] );
				this.addAnim('attack2', 0.05, [48, 49, 50, 50, 50, 50, 50, 50, 50, 50]);
			},
			reset: function (x, y, settings) {
			    this.parent(x, y, settings);
			    
			    this.Maxhealth = this.health;
			    this.Maxmana = this.mana;
			    this.ATK = 0;
			    this.attackWholeTime = 0.5;
			    this.attackAlertTime = 0.5;
			    this.speed = 40;
			    this.healthBuffer = this.health;
			    this.EXP_BOUNTY = 33;
			    // Animation for the Enemy1
			    this.addAnim('idle', 0.07, [36, 37, 38, 39, 40, 41]);
			    this.addAnim('attack', 0.1, [42, 43, 42, 43, 42]);
			    this.addAnim('attack2', 0.05, [48, 49, 50, 50, 50, 50, 50, 50, 50, 50]);
			},
			
			kill: function(){
			    this.parent();
			   ig.game.player.killEvents.dread_knightKills += 1; ig.game.player.killEvents.heavy_knightKills -= 1;
			    ig.game.spawnEntity(EntityDeathExplosion, this.pos.x,this.pos.y,{colorOffset:9} );
			},
				
		});

		ig.EntityPool.enableFor(EntityDreadknight);
});