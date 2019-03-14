ig.module(
	'game.entities.flameJuggernaut'
	)
.requires(
	'game.entities.goblin'
	)
.defines(function () {
    EntityFlameJuggernaut = EntityGoblin.extend({


        delayJump: null,

        ATK: 80,
        health: 300,
        healthBuffer: 0,
        actHealth: 300,
        deadMonster: false,
        burningTouch: true,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/Enemies/Zombies.png', 16, 16);
            this.delayATKCD = new ig.Timer();
            this.delayAnim = new ig.Timer();
            this.delayJump = new ig.Timer();
            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
         
            this.speed = 40;
            this.HP_REGEN = 8;
            this.healthBuffer = this.health;
   
            this.EXP_BOUNTY = 100;
            // Animation for the Enemy1
                                                this.addAnim('idle', 0.07, [108, 109, 110, 111, 112, 113]);
                                                this.addAnim( 'attack', 0.1, [114,115] );
        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);

            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
       
            this.speed = 40;
            this.HP_REGEN = 8;
            this.healthBuffer = this.health;

            this.EXP_BOUNTY = 100;
            // Animation for the Enemy1
                                                this.addAnim('idle', 0.07, [108, 109, 110, 111, 112, 113]);
                                                this.addAnim( 'attack', 0.1, [114,115] );
        },
        kill: function () {
            this.parent();
            ig.game.player.killEvents.flame_zombieKills += 1; ig.game.player.killEvents.green_zombieKills -= 1;
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 4 });
        },
        update: function () {


            if (this.delayAnim.delta() < 0) { this.currentAnim = this.anims.attack; }
            if (this._ready == false && this.CDtimerset == false) { this.delayATKCD.set(1); this.CDtimerset = true; }

            if (this.delayATKCD.delta() > 0 && this._ready == false) { this._ready = true; this.CDtimerset = false; }



            // near edge? return!
            if (this.delayAnim.delta() > 0) {



                this.currentAnim = this.anims.idle;
            }
            this.currentAnim.flip.x = this.flip;
            this.parent();
        }


    });
    ig.EntityPool.enableFor(EntityFlameJuggernaut);

});