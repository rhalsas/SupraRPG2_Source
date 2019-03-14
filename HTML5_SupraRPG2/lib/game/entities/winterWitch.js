ig.module(
	'game.entities.winterWitch'
	)
.requires(
	'impact.entity',
    'impact.entity-pool'
	)
.defines(function () {
    EntityWinterWitch = ig.Entity.extend({

        size: { x: 8, y: 14 },
        offset: { x: 12, y: 9 },
        collides: ig.Entity.COLLIDES.ACTIVE,

        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.BOTH,
        delayJump: null,
        shootarrow: false,
        setDelayArrow: false,
        health: 99999,
        STAGGER: 0,
        healthBuffer: 0,
        actHealth: 8000,
        name: 'boss',
                                         type_name: 'wizard',
        deadMonster: false,
        ShockWavedoneDamage: false,
        turningInitiated: 0,
        attackWholeTime: 1.25,
        attackAlertTime: 0.5,
        phase1FrameCounter: 0,
        lastPhaseFrameCounter: 0,
        CurrentSpell: 'EntityIceShards_E',
        flip: false,
        EXP_BOUNTY: 170,
        powerAttackDelayInitiated: false,
        powerAttackDelay: null,
        powerAttackAnim: false,
        setShock: false,
        bossInvoked: false,
        deadMonster: false,
        IsMovingRight: false,
        IsBurning: false,
        BurningDMG: 0,
        resetBurn: null,
        frameCalc: 0,
        init: function (x, y, settings) {
            this.parent(x, y, settings);
            this.animSheet = new ig.AnimationSheet('media/Enemies/winterWitch.png', 32, 32);
            this.delayATKCD = new ig.Timer();
            this.delayAnim = new ig.Timer();
            this.delayJump = new ig.Timer();
            this.delayShock = new ig.Timer();
            this.resetBurn = new ig.Timer();
            this.Maxhealth = this.actHealth;
            this.Maxmana = this.mana;
            this.ATK = 0;
            this.speed = 40;
            this.powerAttackAnim = false;
            this.healthBuffer = this.health;
            var randomnumber = Math.floor(Math.random() * 17);
            this.EXP_BOUNTY = (270 + randomnumber)
            this.powerAttackDelay = new ig.Timer();
            this.healthBuffer = this.health;
            // Animation for the Enemy1
            this.addAnim('idle', 0.07, [0, 1, 2, 3, 4, 5]);
            this.addAnim('attack', 0.1, [13, 12, 13, 12, 13]);
            this.addAnim('attack2', 0.1, [14]);
            this.addAnim('alert', 0.1, [6, 7]);
        },
        kill: function () {
            this.parent();
       
            ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 1 });
            //ig.game.EndScreen();
        },
        handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x && this.turningInitiated == 0) {
                /*if(this.locationMoved == 'Right'){this.vel.x = -50;}
                
                else if(this.locationMoved == 'Left'){this.vel.x = 50;}*/
                //this.vel.y *= -1;
                this.flip = !this.flip;
                this.turningInitiated = 1;
            }

            /*if( res.collision.y ) {
                if(this.locationMoved == 'Down'){this.vel.y = -50;}
                else if(this.locationMoved == 'Up'){this.vel.y = 50;}
                
                }*/


        },
        update: function () {
            if (ig.game.player) {

                ig.game.burningCalc(this);
               
            }
            if (this.vel.x > 0) { this.IsMovingRight = true; }
            else if (this.vel.x < 0) { this.IsMovingRight = false; }
            if (this.ShockWavedoneDamage == true) { if (!this.setShock) { this.setShock = true; this.delayShock.set(0.4); } }
            if (this.delayShock.delta() > 0) { this.ShockWavedoneDamage = false; this.setShock = false; }
            if (this.health != this.healthBuffer)
            { this.actHealth -= (this.healthBuffer - this.health); this.health = this.healthBuffer; }
            if (this.actHealth / this.Maxhealth >= 0.90) {
                this.movement();
            }
            else if (this.actHealth / this.Maxhealth >= 0.70) {
                this.movement();
                this.manaflare_barrage_1();
            }
            else if (this.actHealth / this.Maxhealth >= 0.50) {
                this.movement();
            }
            else if (this.actHealth / this.Maxhealth >= 0.20) {
                this.movement();
                this.manaflare_barrage_2();
                this.manaflare_barrage_3();
            }
            else if (this.actHealth / this.Maxhealth >= 0) {
                this.movement();
                //Cast Eclipse
            }
            else if (this.actHealth <= 0) {

                ig.game.player.EXP += 400;
                ig.game.player.killEvents.wizardKills += 1; ig.game.player.killEvents.winterWitchKills += 1;
                ig.game.difficulty = 3;
                ig.game.currentLevel = "LevelLevel_FINALE1";
                                         console.log(ig.game.player.killEvents.winterWitchKills);
                ig.game.invokedBossMusic = false;
                                        
                                         ig.game.data_packet = { x_coord: 28, y_coord: 29,difficulty: ig.game.difficulty };
                                         ig.game.saveGame(ig.game.data_packet);
                ig.game.screenFader = new ig.ScreenFader({ fade: 'in', speed: 2.0 });
                ig.game.soft_paused = true;
                ig.game.bossKill_Event = true;
                ig.game.bossKillWinter_EndScreen = true;

                this.kill();
            }


            this.parent();
        },
        movement: function () {
            if (ig.game.player) {
               /* if (this.bossInvoked == false) {
                    if (ig.game.player.vel.y == 0
                        && ig.game.player.pos.y >= this.pos.y
                        && ig.game.player.pos.x <= this.pos.x + 180 && ig.game.player.pos.x >= this.pos.x - 164) {

                        ig.game.invokeDisplayBar('thewinterwitch'); this.bossInvoked = true; ig.game.invokedBossMusic = true;
                    }
                }*/
                if (ig.game.player.pos.x <= this.pos.x + 180 && ig.game.player.pos.x >= this.pos.x - 180) {
                    this.vel.x = 0;

                    if (ig.game.player.pos.x <= this.pos.x) { this.flip = true; var x_coord = -8; }
                    if (ig.game.player.pos.x >= this.pos.x) { this.flip = false; var x_coord = 8; }


                    if (this.powerAttackDelayInitiated == false) {
                        this.currentAnim = this.anims.attack; this.powerAttackDelayInitiated = true;
                        this.powerAttackDelay.set(this.attackWholeTime); this.powerAttackAnim = true;
                    }

                    if (this.powerAttackDelay.delta() < 0 && this.powerAttackDelay.delta() > -this.attackAlertTime && this.powerAttackAnim == true) {
                        ig.game.spawnEntity(this.CurrentSpell, this.pos.x + x_coord, this.pos.y - 8, { flip: this.flip });
                        this.anims.attack2.rewind(); this.currentAnim = this.anims.attack2; this.powerAttackAnim = false;
                    }
                    if (this.powerAttackDelay.delta() > 0) { this.powerAttackDelayInitiated = false; }
                }
                else {
                    this.currentAnim = this.anims.idle; if (this.turningInitiated > 0) { this.turningInitiated++; }
                    if (this.turningInitiated == 60) { this.turningInitiated = 0; }

                    // near edge? return!
                    if (!ig.game.collisionMap.getTile(
                        this.pos.x + (this.flip ? +4 : this.size.x - 4),
                            this.pos.y + this.size.y + 1
                            )
                        && this.turningInitiated == 0) {
                        this.flip = !this.flip;
                        this.turningInitiated = 1;
                    } var xdir = this.flip ? -1 : 1; this.vel.x = this.speed * xdir; this.powerAttackDelayInitiated = false;
                }



                // near edge? return!

                this.currentAnim.flip.x = this.flip;
            }
        },
        manaflare_barrage_1: function () {
            if (this.phase1FrameCounter == 0) {

            }
           
            if (this.phase1FrameCounter == 240) {

                for (var i = 0; i < 26; i++)
                { ig.game.spawnEntity('EntityIceHoriShard_E', 312 + (i * 16), 420, { flip: this.flip }); }

            }
            if (this.phase1FrameCounter == 300) {
                for (var i = 0; i < 26; i++)
                { ig.game.spawnEntity('EntityIceHoriShard_E', 312 + (i * 16), 420, { flip: this.flip }); }
            }
            if (this.phase1FrameCounter == 360) {
                for (var i = 0; i < 26; i++)
                { ig.game.spawnEntity('EntityIceHoriShard_E', 312 + (i * 16), 420, { flip: this.flip }); }

            }
            if (this.phase1FrameCounter == 420) {

                for (var i = 0; i < 26; i++)
                { ig.game.spawnEntity('EntityIceHoriShard_E', 312 + (i * 16), 420, { flip: this.flip }); }
            }
            if (this.phase1FrameCounter == 480) {
                for (var i = 0; i < 26; i++)
                { ig.game.spawnEntity('EntityIceHoriShard_E', 312 + (i * 16), 420, { flip: this.flip }); }

            }
            if (this.phase1FrameCounter == 540) {
                for (var i = 0; i < 26; i++)
                { ig.game.spawnEntity('EntityIceHoriShard_E', 312 + (i * 16), 420, { flip: this.flip }); }
            }
            if (this.phase1FrameCounter == 600) {
                this.actHealth = this.Maxhealth * 0.695; this.phase1FrameCounter = 0;
                for (var i = 0; i < 26; i++)
                { ig.game.spawnEntity('EntityIceHoriShard_E', 312 + (i * 16), 420, { flip: this.flip }); }

            }
            this.phase1FrameCounter++;

        },
        manaflare_barrage_2: function () {
            if (this.phase1FrameCounter == 0) {

            }
          
            this.flip = true;
            if (this.phase1FrameCounter == 240) {

                for (var i = 0; i < 26; i++)
                { ig.game.spawnEntity('EntityIceHoriShard_E', 312 + (i * 16), 420, { flip: this.flip }); }
            }
            if (this.phase1FrameCounter == 300) {
                for (var i = 0; i < 26; i++)
                { ig.game.spawnEntity('EntityIceHoriShard_E', 312 + (i * 16), 420, { flip: this.flip }); }
            }
            if (this.phase1FrameCounter == 360) {
                for (var i = 0; i < 26; i++)
                { ig.game.spawnEntity('EntityIceHoriShard_E', 312 + (i * 16), 420, { flip: this.flip }); }
            }
            if (this.phase1FrameCounter == 420) {

                for (var i = 0; i < 26; i++)
                { ig.game.spawnEntity('EntityIceHoriShard_E', 312 + (i * 16), 420, { flip: this.flip }); }
            }
            if (this.phase1FrameCounter == 480) {
                for (var i = 0; i < 26; i++)
                { ig.game.spawnEntity('EntityIceHoriShard_E', 312 + (i * 16), 420, { flip: this.flip }); }
            }
            if (this.phase1FrameCounter == 540) {
                for (var i = 0; i < 26; i++)
                { ig.game.spawnEntity('EntityIceHoriShard_E', 312 + (i * 16), 420, { flip: this.flip }); }
            }
            if (this.phase1FrameCounter == 600) {
                this.phase1FrameCounter = 0;
                for (var i = 0; i < 26; i++)
                { ig.game.spawnEntity('EntityIceHoriShard_E', 312 + (i * 16), 420, { flip: this.flip }); }
            }
            this.phase1FrameCounter++;

        },
        manaflare_barrage_3: function () {
            if (this.phase1FrameCounter == 0) {

            }
            
            if (this.phase1FrameCounter == 240) {
                for (var i = 0; i < 26; i++)
                { ig.game.spawnEntity('EntityIceHoriShard_E', 312 + (i * 16), 420, { flip: this.flip }); }
               
            
            }
            if (this.phase1FrameCounter == 300) {
                for (var i = 0; i < 26; i++)
                { ig.game.spawnEntity('EntityIceHoriShard_E', 312 + (i * 16), 420, { flip: this.flip }); }
            }
            if (this.phase1FrameCounter == 360) {
                for (var i = 0; i < 26; i++)
                { ig.game.spawnEntity('EntityIceHoriShard_E', 312 + (i * 16), 420, { flip: this.flip }); }
            }
            if (this.phase1FrameCounter == 420) {

                for (var i = 0; i < 26; i++)
                { ig.game.spawnEntity('EntityIceHoriShard_E', 312 + (i * 16), 420, { flip: this.flip }); }
            }
            if (this.phase1FrameCounter == 480) {
                for (var i = 0; i < 26; i++)
                { ig.game.spawnEntity('EntityIceHoriShard_E', 312 + (i * 16), 420, { flip: this.flip }); }
            }
            if (this.phase1FrameCounter == 540) {
                for (var i = 0; i < 26; i++)
                { ig.game.spawnEntity('EntityIceHoriShard_E', 312 + (i * 16), 420, { flip: this.flip }); }
            }
            if (this.phase1FrameCounter == 600) {
                this.actHealth = this.Maxhealth * 0.195;
                this.phase1FrameCounter = 0;
                for (var i = 0; i < 26; i++)
                { ig.game.spawnEntity('EntityIceHoriShard_E', 312 + (i * 16), 420, { flip: this.flip }); }
            }
            this.phase1FrameCounter++;

        },
        handleMovementTrace: function (res) {
            this.parent(res);

            if (res.collision.x && this.turningInitiated === 0) {
                /*if(this.locationMoved == 'Right'){this.vel.x = -50;}
                
                else if(this.locationMoved == 'Left'){this.vel.x = 50;}*/
                //this.vel.y *= -1;
                this.flip = !this.flip;
                this.turningInitiated = 1;
            }

            /*if( res.collision.y ) {
                if(this.locationMoved == 'Down'){this.vel.y = -50;}
                else if(this.locationMoved == 'Up'){this.vel.y = 50;}
                
                }*/


        }


    });
    
});