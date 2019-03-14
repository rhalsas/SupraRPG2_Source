ig.module(
	'game.entities.iceJuggernaut'
	)
.requires(
	'game.entities.goblin'
	)
.defines(function () {
    EntityIceJuggernaut = EntityGoblin.extend({


        delayJump: null,


        health: 500,
        healthBuffer: 0,
        actHealth: 2750,
        deadMonster: false,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/Enemies/Zombies.png', 16, 16);
            this.delayATKCD = new ig.Timer();
            this.delayAnim = new ig.Timer();
            this.delayJump = new ig.Timer();
            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
            this.ATK = 150;
            this.speed = 25;
            this.HP_REGEN = 35;
            this.healthBuffer = this.health;
            var randomnumber = Math.floor(Math.random() * 7);
            this.EXP_BOUNTY = 205 + randomnumber;
            // Animation for the Enemy1
                                                this.addAnim('idle', 0.07, [120, 121, 122, 123, 124, 125]);
                                                this.addAnim( 'attack', 0.1, [126,127] );
        },
        reset: function (x, y, settings) {
            this.parent(x, y, settings);

            this.Maxhealth = this.health;
            this.Maxmana = this.mana;
            this.ATK = 150;
            this.speed = 25;
            this.HP_REGEN = 35;
            this.healthBuffer = this.health;
            var randomnumber = Math.floor(Math.random() * 7);
            this.EXP_BOUNTY = 205 + randomnumber;
            // Animation for the Enemy1
                                                this.addAnim('idle', 0.07, [120, 121, 122, 123, 124, 125]);
                                                this.addAnim( 'attack', 0.1, [126,127] );
        },
        kill: function () {
            this.parent();
            ig.game.player.killEvents.ice_zombieKills += 1; ig.game.player.killEvents.green_zombieKills -= 1;
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
    ig.EntityPool.enableFor(EntityIceJuggernaut);

});