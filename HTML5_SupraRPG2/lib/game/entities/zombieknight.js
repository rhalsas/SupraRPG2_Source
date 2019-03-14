ig.module(
	'game.entities.zombieknight'
	)
.requires(
	'game.entities.heavyknight'
	)
.defines(function(){
		EntityZombieknight = EntityHeavyknight.extend({
			
			size: {x:8,y: 14},
			offset: {x:12, y: 9},
			delayJump: null,
			shootarrow: false,
			setDelayArrow: false,
			health: 80,
			healthBuffer: 0,
			actHealth: 80,
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
				this.speed = 10;
				this.RES = 0;
				this.MAG_RES = 0;
				
				this.attackWholeTime = 1.25;
				this.attackAlertTime= 0.5;
				this.healthBuffer = this.health;
				
				this.EXP_BOUNTY = 18;
				// Animation for the Enemy1
				this.addAnim( 'idle', 0.07, [18,19,20,21,22,23] );
				this.addAnim( 'attack', 0.1, [24,25,24,25,24] );
				this.addAnim('attack2', 0.05, [30, 30, 31, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32]);
			},
			reset: function (x, y, settings) {
			    this.parent(x, y, settings);
			    
			    this.Maxhealth = this.health;
			    this.Maxmana = this.mana;
			    this.ATK = 0;
			    this.speed = 10;
			    this.RES = 0;
			    this.MAG_RES = 0;

			    this.attackWholeTime = 1.25;
			    this.attackAlertTime = 0.5;
			    this.healthBuffer = this.health;
			    this.EXP_BOUNTY = 18;
			    // Animation for the Enemy1
			    this.addAnim('idle', 0.07, [18, 19, 20, 21, 22, 23]);
			    this.addAnim('attack', 0.1, [24, 25, 24, 25, 24]);
			    this.addAnim('attack2', 0.05, [30, 30, 31, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32]);
			},
			
			kill: function(){
			    this.parent();
			    ig.game.player.killEvents.zombie_knightKills += 1; ig.game.player.killEvents.heavy_knightKills -= 1;
			    ig.game.spawnEntity(EntityDeathExplosion, this.pos.x,this.pos.y,{colorOffset: 5} );
			},
				
		});
		ig.EntityPool.enableFor(EntityZombieknight);
	
});