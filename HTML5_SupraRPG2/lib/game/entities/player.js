/// <reference path="dreadknight.js" />
ig.module(
	'game.entities.player'
	)
.requires(
	'impact.entity',

	'impact.entity-pool'
	)
.defines(function () {
	EntityPlayer = ig.Entity.extend({
		collides: ig.Entity.COLLIDES.LITE,
		checkAgainst: ig.Entity.TYPE.NONE,
		type: ig.Entity.TYPE.A,

		
		size: { x: 8, y: 14 },
		offset: { x: 12, y: 8 },
		// New variables for the talents
		killEvents: {
			totalKills:0,monsterKills: 0, knightKills: 0, wizardKills: 0, green_zombieKills: 0, blue_zombieKills: 0, purple_zombieKills: 0, speedpurple_zombieKills: 0,
			flame_zombieKills: 0, ice_zombieKills: 0, 
			rusherGreenKills: 0, rusherBlueKills: 0, rusherOrangeKills: 0,
			heavy_knightKills: 0, zombie_knightKills: 0, dread_knightKills: 0, dark_knightKills: 0,
			winterYetiKills: 0,
			winterMageKills: 0,
			ice_knightKills: 0,
			bombThrowerWeakKills: 0,
			bombThrowerKills: 0,
			bombThrowerStrongKills: 0,
			red_wizardKills: 0, blue_wizardKills: 0, purple_wizardKills: 0, dark_wizardKills: 0, thunder_wizardKills: 0,
			necromancerWeakKills: 0, necromancerKills: 0, necromancerStrongKills: 0,
			giantZombieKills: 0, mageKnightKills: 0, kozKills: 0,
			winterWitchKills: 0,
			fallenKnightKills: 0,
			elementalKnightKills: 0,
			sandWormKills: 0,
			grandMancerKills: 0,
			voidKnightKills: 0
		  
		},

		miniMap: { mapColor: '#0000FF', mapSize: 1 },
		chestEvents: { chestPicked: 0 },
	   // levelEvents: { levelReached: 0 },
		skillEvents: {
			amountSkills: 0,
			demonMaster: false, bladeMaster: false, lifeMaster: false,
			magicMaster: false, devastationMaster: false, hunterMaster: false
		},
	    //Weapon specialities
        //Probably not needed
/*
    HEAVY_WEAPON: false,
    LIGHT_WEAPON: false,
    SHARP_WEAPON: false,
    VAMPIRIC_WEAPON: false,
    SUPERIORITY_WEAPON: false,
    FURY_WEAPON: false,
    BACKSTAB_WEAPON: false,
    CONCENTRATION_WEAPON: false,
    HONOR_WEAPON: false,
    CHILLY_WEAPON: false,
    FIERY_WEAPON: false,
    DULL_WEAPON: false,
    BLAZE_WEAPON: false,
    EMBERBURN_WEAPON: false,

    CHROMATIC_FOCUS_WEAPON: false,
    ELEMENTAL_FOCUS_WEAPON: false,
    BLESSED_WEAPON: false,
    CURSED_WEAPON: false,
    DEMONIC_WEAPON: false,

    TIME_WARP_WEAPON: false,
    ARCANE_DEVOTION_WEAPON: false,
    EXECUTIONER_WEAPON: false,
    FINISHER_WEAPON: false,


*/
		// BLADE - talents
        BLADE_VIGOR: false,
        BLADE_FLURRY: false,

        BLADE_DOUBLEATTACK: false,
        BLADE_SHOCKPULSE: false,
        BLADE_FRENZY: false,

        BLADE_ESCALATION: false,
        BLADE_EXECUTE: false,
	    BLADE_BLOODLUST: false,

	    BLADE_BIGPLAY: false,
	    BLADE_SWORDSPECIALIST: false,
	    BLADE_AXESPECIALIST: false,

	    BLADE_PHANTOMSTRIKES: false,



	    // LIFE - talents

        LIFE_LIFESLASH_CHANCE: 30,
	    LIFE_BURNINGHEART: false,
	    LIFE_LIFESPIRIT: false,

	    LIFE_EMPOWEREDSLASH: false,
	    LIFE_CALMMIND: false,
	    LIFE_RADIANCE: false,

	    LIFE_HOLYBARRIER: false,
	    LIFE_WALLOFJUSTICE: false,
	    LIFE_RADIANTFURY: false,

	    LIFE_ZEAL: false,
	    LIFE_BURNINGLIGHT: false,
	    LIFE_LASTSTAND: false,

	    LIFE_HOLYSLASH: false,
		

		// Spell - talents

		SPELL_INTELLIGENCE: false,
		SPELL_FOCUS: false,

		SPELL_CRITICALRETURN: false,
		SPELL_FIREBLAST: false,
		SPELL_REPLENISHMENT: false,

		SPELL_DEMOLISH:false,
		SPELL_CRITICALCOMBO: false,

		SPELL_ELEMENTALSYNERGY: false,
		SPELL_DEEPFREEZE: false,
		SPELL_FROSTFIRE: false,

		SPELL_ARCANEBALL: false,

	    // Demon - talents


		DEMON_DEMONICFORTITUDE: false,
		DEMON_VAMPIRISM: false,

		DEMON_DARKRAGE: false,
		DEMON_MYSTICBARRIER: false,

		DEMON_DARKWAVE: false,
		DEMON_SACRIFICIALDRIVE: false,
		DEMON_EMPOWEREDDARKRAGE: false,

		DEMON_DEMONSTRENGTH: false,
		DEMON_DREADWAVE: false,
		DEMON_DEMONBLOOD: false,

		DEMON_DARKWILL: false,

//TALENTS
		BLADE_AMOUNT: 0,
        LIFE_AMOUNT: 0,
		SPELL_AMOUNT: 0,
		//RAGE
		BLADE_VIGOR_LEVEL : 0,
		BLADE_FLURRY_LEVEL: 0,

		BLADE_DOUBLEATTACK_LEVEL: 0,
		BLADE_SHOCKPULSE_LEVEL: 0,
		BLADE_FRENZY_LEVEL: 0,
	
		
		BLADE_ESCALATION_LEVEL: 0,
		BLADE_EXECUTE_LEVEL: 0,
		BLADE_BLOODLUST_LEVEL: 0,

		BLADE_BIGPLAY_LEVEL: 0,
		BLADE_SWORDSPECIALIST_LEVEL: 0,
		BLADE_AXESPECIALIST_LEVEL: 0,
		
		BLADE_PHANTOMSTRIKES_LEVEL: 0,

        shockHands: 0,
		

		//MAGIC

		SPELL_INTELLIGENCE_LEVEL : 0,
		SPELL_FOCUS_LEVEL: 0,

		SPELL_ENDLESSPOOL_LEVEL: 0,
		SPELL_FIRE_BLAST_LEVEL: 0,
	
		SPELL_CRITICALRETURN_LEVEL: 0,

		SPELL_DEMOLISH_LEVEL: 0,
		SPELL_CRITICAL_COMBO_LEVEL: 0,

		SPELL_ELEMENTALSYNERGY_LEVEL: 0,
		SPELL_DEEPFREEZE_LEVEL: 0,
		SPELL_FROSTFIRE_LEVEL: 0,

		SPELL_ARCANEBALL_LEVEL: 0,

        //LIFE

		LIFE_BURNINGHEART_LEVEL: 0,
		LIFE_LIFESPIRIT_LEVEL: 0,

		LIFE_EMPOWEREDSLASH_LEVEL: 0,
		LIFE_CALMMIND_LEVEL: 0,
		LIFE_RADIANCE_LEVEL: 0,

		LIFE_HOLYBARRIER_LEVEL: 0,
		LIFE_WALLOFJUSTICE_LEVEL: 0,
		LIFE_RADIANTFURY_LEVEL: 0,

		LIFE_ZEAL_LEVEL: 0,
		LIFE_BURNINGLIGHT_LEVEL: 0,
		LIFE_LASTSTAND_LEVEL: 0,

		LIFE_HOLYSLASH_LEVEL: 0,

	    //DEMON

		DEMON_DEMONICFORTITUDE_LEVEL: 0,
		DEMON_VAMPIRISM_LEVEL: 0,

		DEMON_DARKRAGE_LEVEL: 0,
		DEMON_MYSTICBARRIER_LEVEL: 0,

		DEMON_DARKWAVE_LEVEL: 0,
		DEMON_SACRIFICIALDRIVE_LEVEL: 0,
		DEMON_EMPOWEREDDARKRAGE_LEVEL: 0,

		DEMON_DEMONSTRENGTH_LEVEL: 0,
		DEMON_DREADWAVE_LEVEL: 0,
		DEMON_DEMONBLOOD_LEVEL: 0,

        DEMON_DARKWILL_LEVEL: 0,

	  //LEGACY TALENTS
		// Life - talents
		use: false,
		delayRegen: null,
		delayOnFive: null,
		lastStandCD: new ig.Timer(),
		RegenOnFive: 0,
		Amount_REGEN_Increased: 0,
		
		REFLECTON: false,
		REGENMODIFIER: 1,
		MREGENMODIFIER: 1,
		// Blade - talents

		
		ESCALATION_DamageCounter: 0,
		ESCALATION_SureCrit: false,
	
		maxLevels: 1,
		
 animATKCD: null,
		
		WallTouch: false,
	
		// Magic

		


		
		

	    FrenzyBonusDBLATK: 0,
		FrenzyBonusHp: 0,
		difficulty: 0,
		name: 'player1',
		flip: false,
		critTrue: false,
		itemArray: new Array(),
		weaponArray: new Array(),
		shieldArray: new Array(),
		armorArray: new Array(),

		// items
	
		isAttacking: false,
		canMove: true,
		ironKey: 0,

        ATKCD: new ig.Timer(),
		skillMenu1Selected: false,
		skillMenu2Selected: false,
		currentActionSkill1: 'EntityWeakSlash',
		currentActionSkill2: 'EntityWeakSlash',
		candidateActionskill: '',
		candidateAssignSkill: '',
		candidateManaCost: 0,
		
      
		
		equipmentChanged: false,
		accelGround: 100,
		accelAir: 100,
		maxVel: { x: 50, y: 150 },
		friction: { x: 900, y: 150 },
		currentPlayerLevel: 1,
		currentPlayerXp: 0,
		doubleJumpenabled: true,
		jump: 175,
		
		// attack sounds
		slashsound: null,
		// base_properties
		/*Supra RPG By Rasmus Halsas 10.8.2013*/
		BASE_LEVEL: 1,
		BASE_EXP: 200,
		BASE_SKILLSPHERE: 0,

        BASE_AbilityCD: 0.35,
		BASE_STR: 1,
		BASE_INT: 1,
        BASE_AGI: 1,
        BASE_DBLATKCHC: 0,
		BASE_ATK: 0,
		BASE_MATK: 1,
		BASE_MAX_VEL_X: 100,
		BASE_ACCEL_G: 100,
		BASE_ACCEL_A: 100,
		BASE_ATKSPEED: 2,
		BASE_RES: 0,
        BASE_VAMPIRIC: 0,
		BASE_HP: 100,
		BASE_MP: 50,

		BASE_MANA_REGEN: 0,
		BASE_HP_REGEN: 0,

		BASE_CRIT_DAMAGE: 50,
		
		BASE_MCRIT_DAMAGE: 50,
		

		
		BASE_MCRIT: 0,
		BASE_MAG_RES: 0,

		BASE_CRIT: 5,


		//NEW STATS


		// properties
		LEVEL: 1,
		EXP: 1,
		skillSpheres: 5,
		EXP_GOAL: 0,
		EXP_GOAL_BUFFER: 0,
	  CLASS: "",
		TREASURE_COLLECTED: 0,
		SECRETS_REVEALED: 0,
		LEVELS_CLEARED: 0,

		DBLATKCHC: 0,
		ATK: 0,
		MATK: 0,
		RES: 0,
		ATKSPEED: 2,
		MANA_REGEN: 0,
		HP_REGEN: 0,

		CRIT_DAMAGE: 0,
        MCRIT_DAMAGE: 0,
		MAG_RES: 0,
        VAMPIRIC: 0,
		CRIT: 0,
		MCRIT: 0,
		BLK: 0,
		BASE_BLK: 0,

		//NEW STATS

        AbilityCD: 0.35,
		AGI: 1,
		STR: 1,
		INT: 1,

		health: 50,

	    ArcaneDevoBonusMpR: 0,
		resisbreakBonus: 0,
		MresisbreakBonus: 0,
		Maxhealth: 50,
		mana: 50,
		Maxmana: 50,
		gold: 0,
		weapon: null,
		shield: null,
		armor: null,

		actionskill1: '',
		actionskill2: '',
		currentAction: 'EntityExecute',
		currentAction1Manacost: 3,
		currentAction2Manacost: 3,
		currentPath: 'Right',
		RESMODIFIER: 1,
		saveFrameCounter: 0,
		onElevator: false,
		currentLevel: 'dungeon',
		changedDirection: false,
		equipTarget: '',
		unequipTarget: '',
		inWater: false,
		MoveLeft: false,
		MoveRight: false,
		EquipMenu: false,
		EquipGoBack: false,
		SelectSword: false,
		SelectShield: false,
		SelectArmor: false,
		EquipItem: false,
		UnEquipItem: false,
	
		Talent_Selection: false,
		Talent_GoBackSelection: false,
		SkillMenu1: false,
		SkillMenu2: false,
		
		StatusMenuGoBack: false,


		


		spellVelo: 1,
		spellCD: 1,



		completeList: [],
		// input on equip menu

	   
		MovingLeft: false,
		MovingRight: false,
		clearLevel: 0,
		checkpos: false,

		velLaunch: -1,
		//Item specialities
	
		goingUp: false,
		buffer: 100,
		initEXP: function(){
		    this.EXP_GOAL = (((this.LEVEL) * 1.4) * (4000 * this.LEVEL) / 100) + 100;

		    if (this.LEVEL == 1) { this.EXP_GOAL_BUFFER = 0; }

		    else { this.EXP_GOAL_BUFFER = (((this.LEVEL - 1) * 1.4) * ((4000 * (this.LEVEL - 1)) / 100)) + 100; }

		},
		init: function (x, y, settings) {

			this.parent(x, y, settings);
		  //  (DEBUG) ?
			
			//: false;
								
									
			
			
								   
			
			//spawn items
		    //
            
			this.delayTimer = new ig.Timer();
			this.delayRegen = new ig.Timer();
		
				
				this.animSheet = new ig.AnimationSheet('media/runningAnimV2.png', 32, 32);
		    // Animation for the Hero!
			this.animATKCD = new ig.Timer();
			this.delayATKCD = new ig.Timer();
			this.delayOnFive = new ig.Timer();
			this.addAnim('idle', 0.14, [0, 0, 0, 0, 0, 0, 0, 0, 18, 19, 18, 0, 0, 0, 0, 0, 0, 0, 0]);
			this.addAnim('run', 0.07, [0, 1, 2, 3, 4, 5,4,3,2,1]);
			this.addAnim('jump', 1, [1]);
			this.addAnim('fall', 0.1, [6, 7]);
			this.addAnim('attack', 0.08, [10, 11, 12, 13, 14],true);
			this.addAnim('cast', 0.08, [10, 11, 12, 13, 14], true);
			//this.addAnim ('_goingDown', 1, [1]);
			//this.addAnim ('_goingRight', 1, [2]);
			//this.adƒdAnim ('_goingLeft', 1, [3]);
			this.delayRegen.set(1);
									
		},
		handleMovementTrace: function (res) {
			this.parent(res);

			//if standing on slope and no key press
			//stop all movement
			if (res.collision.slope)
			{ 
				//if (this.currentPath == 'Right') { this.vel.x = 200; } if (this.currentPath == 'Left') { this.vel.x = -200; }
			 this.vel.y = 0; 
			}


			if (res.collision.slope && this.standing && this.noKeyPress() && !this.MovingRight  &&  !this.MovingLeft) {
				this.pos.x = this.last.x;
				this.pos.y = this.last.y;
				this.vel.x = 0;
				this.vel.y = 0;
			}
			if (res.collision.x && this.C3_WALLJUMP) {
				this.WallTouch = true;
				this.vel.y = 0;



			}
			else { this.WallTouch = false; }

		},
		noKeyPress: function () {
			var actions = ig.input.actions;
			for (var action in actions) {
				if (actions[action]) {
					return false;
				}
			}
			var presses = ig.input.presses;
			for (var press in presses) {
				if (presses[press]) {
					return false;
				}
			}
			for (var state_val in state)
			{
			    if(state[state_val])
			    {
			        return false;
			    }
			}
			return true;
		},



		checkEquipPos: function (name) {
			var retPos = 0;
			var found = false;
			switch (name)
			{
				case 'weapon':
					var array = this.weaponArray;
					var array_l = array.length;
					for (retPos = 0; retPos < array_l; retPos++)
					{
						if (array[retPos] === this.weapon) { found = true; break; }
					}
					break;
				case 'shield':
					var array = this.shieldArray;
					var array_l = array.length;
					for (retPos = 0; retPos < array_l; retPos++) {
						if (array[retPos] === this.shield) { found = true; break; }
					}
					break;
				case 'armor':
					var array = this.armorArray;
					var array_l = array.length;
					for (retPos = 0; retPos < array_l; retPos++) {
						if (array[retPos] === this.armor) { found = true; break; }
					}
					break;
				default:
					break;
			}
			retPos = (found) ? retPos : 0;
			return retPos;

		},
		update: function () {
			var game = ig.game;
			
		    /*  var buffer_var = ig.global[game.currentLevel].entities;
	 
			for( var i = 0; i < buffer_var.length; i++ ) {
				var ent = buffer_var[i];
			  
				var xdist = Math.abs(this.pos.x - ent.x);
			  
				// spawns entity just outside of game box
				if (xdist <= (260 + this.buffer)) {
					
					ig.game.spawnEntity(ent.type, ent.x, ent.y, ent.settings);
					buffer_var.splice(i, 1); i -= 1;
					
				} else {  }
			}*/
		    //Check if cursed shield is purified in this gameplay



			if (ig.game.addBlockToCurse > 20 && this.shield.itemName == "Cursed Shield") {

			}
			var accel = this.standing ? this.accelGround : this.accelAir;
			var navigating = false;

			var weapon = game.getEntityByName('weapon');
			var shield = game.getEntityByName('shield');
			var armor = game.getEntityByName('armor');
			if (this.pos.y >= ig.game.collisionMap.pxHeight) { this.kill(); }
			if (this.health < 0) { this.kill(); }
		    // if (this.onElevator) { this.currentAnim = skill.idle; }

		    // Level up, change base stats and current stats

			if (this.EXP >= this.EXP_GOAL) {

			    if (this.LEVEL == 1)
			    { game.LevelUpInfo = true; }



			    this.skillSpheres++;
			    var bonusHP = 1;
			    var bonusMP = 1;

			    if (this.CLASS === "BLADE") {
			        bonusHP = 3;
			        bonusMP = 1;
			    }
			    else if (this.CLASS === "SPELL") {
			        bonusMP = 3;
			        bonusHP = 1;
			    }
			    else if (this.CLASS === "LIFE") {
			        bonusHP = 2;
			        bonusMP = 2;
			    }
			    else if (this.CLASS === "DEMON") {
			        bonusHP = 4;
			        bonusMP = 0;
			    }


			    this.equipmentChanged = true;
			    var randomnumber = 0
                    //Math.floor(Math.random() * this.LEVEL / 3);
			    game.LevelUpHp = bonusHP + randomnumber;
			    this.BASE_HP += game.LevelUpHp;
			    randomnumber = 0
                    //Math.floor(Math.random() * this.LEVEL / 3);
			    game.LevelUpMp = bonusMP + randomnumber;
			    this.BASE_MP += game.LevelUpMp;



			    if (this.LEVEL != 1) { game.InformLevelUp = true; }
			    this.EXP_GOAL_BUFFER = ((this.LEVEL * 1.4) * (4000 * this.LEVEL) / 100) + 100;

			    this.LEVEL++;
			    this.EXP_GOAL = ((this.LEVEL * 1.4) * (4000 * this.LEVEL) / 100) + 100;
			    //Spawn level up graphics !
			    ig.game.CalculateStats(this);
			    ig.game.saveGame(null, this, ig.game.saveSlot, true);
			    ig.game.drawAndFade('levelUp');




			    //game.InformLevelUp();

			}


		    // Update stats from items


		    //Draw Equipment Menu

		    // Static statistic increases




		    // Dynamic statistic changes
			this.RESMODIFIER = 1;
			this.REGENMODIFIER = 1;
			this.MREGENMODIFIER = 1;





			if (this.REFRESH_LEVEL > 0) {

			    if (this.health <= this.Maxhealth * 0.25) {
			        this.MREGENMODIFIER = (1 + (0.25 * this.REFRESH_LEVEL));
			    }



			}


			if (this.LIFE_LASTSTAND && (this.health / this.Maxhealth < 0.33)) {

			    if (this.lastStandCD.delta() > 0) {
			        this.lastStandCD.set(10);
			        ig.game.spawnEntity("EntityLastStandBuff", this.pos.x, this.pos.y);
			    }

			}

			if (this.RegenOnFive > 0) {

			    this.HP_REGEN += this.RegenOnFive / 300;

			    this.Amount_REGEN_Increased += this.RegenOnFive / 300;
			    if (this.Amount_REGEN_Increased > 10) { this.HP_REGEN -= (this.Amount_REGEN_Increased - 10); this.Amount_REGEN_Increased = 10; }
			}
			if (this.delayOnFive.delta() > 0) { this.HP_REGEN -= this.Amount_REGEN_Increased; this.RegenOnFive = 0; this.Amount_REGEN_Increased = 0; }

		    // Regen hp
			var BUFFER_REGEN = this.HP_REGEN;
			if (this.L4_LOWHPHIGHREGEN == true) { var BUFFER_REGEN = this.HP_REGEN; this.HP_REGEN *= this.REGENMODIFIER; }
			if (this.H2_RATINACORNER == true) { var BUFFER_MREGEN = this.MANA_REGEN; this.MANA_REGEN *= this.MREGENMODIFIER; }

			var fps = (1 / ig.system.tick).round();
			this.health += this.HP_REGEN / fps;
			this.mana += this.MANA_REGEN / fps;

		    // Check that hp doesn't go over maxhp

			if (this.health > this.Maxhealth) { this.health = this.Maxhealth; }
			if (this.mana > this.Maxmana) { this.mana = this.Maxmana; }

			if (this.L4_LOWHPHIGHREGEN === true) { this.HP_REGEN = BUFFER_REGEN; }
			if (this.H2_RATINACORNER === true) { this.MANA_REGEN = BUFFER_MREGEN; }


			    // Moving function

			    /*&&  !game.game_menu && !game.equip_menu && !game.item_menu && !game.setting_menu && !game.save_menu && !game.status_menu &&
                    !game.life_talents_menu && !game.magic_talents_menu && !game.blade_talents_menu && !game.demon_talents_menu
                    && !game.hunter_talents_menu && !game.devastation_talents_menu && !game.talentHUD
                    && !game.skillMenu1Selected && !game.skillMenu2Selected*/




			    // End menu
			    //  if (ig.input.pressed('onmusic') && ig.music.volume == 0) { ig.music.volume = 1; }
			    // else if (ig.input.pressed('offmusic') && ig.music.volume == 1) { ig.music.volume = 0; }

			    // Advance in the menus
			    // if (ig.input.pressed('status')) { game.status_menu = true; game.game_menu = false; }












			else if (game.menuOpen()) {

			    //if(ig.game.stickLeft.input.x != 0){
			    // if(this.currentPath == "Right" && ig.game.stickLeft.input.x < 0) {


			    //this.vel.x = 0;
			    // }
			    // else if(this.currentPath == "Left" && ig.game.stickLeft.input.x > 0) {


			    // this.vel.x = 0;
			    // }

			    // this.currentPath = (ig.game.stickLeft.input.x > 0) ? "Right" : "Left";
			    // this.flip = (ig.game.stickLeft.input.x > 0) ? false : true;


			    // }

			    // this.accel.x  = (TOUCHINGJOYSTICK) ? this.accel.x : 0;
			    // this.accel.x = ig.game.stickLeft.input.x * accel;


			    if (this.vel.y > 0) this.goingUp = true;
			    else if (this.vel.y < 0) this.goingUp = false;
			    /*    if(this.accel.x != 0){
                        if (!this.isAttacking) {
                        this.currentAnim = this.anims.run;
                        if (weapon != null) { weapon.currentAnim = weapon.anims.run; }
                        if (shield != null) { shield.currentAnim = shield.anims.run; }
                        if (armor != null) { armor.currentAnim = armor.anims.run; }
                    
                        }
                    }else {
                        if (!this.isAttacking) {
                        this.currentAnim = this.anims.idle;
                        if (weapon != null) { weapon.currentAnim = weapon.anims.idle; }
                        if (shield != null) { shield.currentAnim = shield.anims.idle; }
                        if (armor != null) { armor.currentAnim = armor.anims.idle; }
                        }
                    }*/


			    /*  if(ig.input.state("left")){
                  this.MovingLeft = true;
                  this.MovingRight = false;
                  }
                  else if(ig.input.state("right")){
                  this.MovingLeft = false;
                  this.MovingRight = true;
                  }
                  else{this.MovingLeft = false;
                  this.MovingRight = false;}
                  if(ig.input.released("left")){console.log("LEFTRELEASED");}*/
			    var absoluteJoy = 32767;


			    if (
                    this.MovingLeft === true
                    ||
                    ig.input.state('left')
			        //  ||
			        //   state.dpad_left
			        //  || 
			        // (state.leftThumbX < -0.4 * absoluteJoy)
                    ) {
			        if (this.currentPath == 'Right') { this.vel.x = 0; }

			        this.accel.x = -accel;

			        this.flip = true;
			        this.currentPath = 'Left';
			        if (!this.isAttacking) {
			            this.currentAnim = this.anims.run;
			            if (weapon != null) { weapon.currentAnim = weapon.anims.run; }
			            if (shield != null) { shield.currentAnim = shield.anims.run; }
			            if (armor != null) { armor.currentAnim = armor.anims.run; }
			        }
			    }
			    else if (
                    this.MovingRight === true ||
                    ig.input.state('right')

			        //     || state.dpad_right == true
			        //   ||
			        // (state.leftThumbX > 0.4 * absoluteJoy)
                    ) {

			        if (this.currentPath == 'Left') { this.vel.x = 0; }

			        this.accel.x = accel;

			        this.navigating = true;
			        this.flip = false;
			        this.currentPath = 'Right';

			        if (!this.isAttacking) {
			            this.currentAnim = this.anims.run;
			            if (weapon != null) { weapon.currentAnim = weapon.anims.run; }
			            if (shield != null) { shield.currentAnim = shield.anims.run; }
			            if (armor != null) { armor.currentAnim = armor.anims.run; }
			        };
			    }
			    else {

			        var gameEntities = ig.game.entities;
			        var singularityOn = false;
			        for (var i = 0; i < gameEntities.length; i++) {
			            var ent = gameEntities[i];
			            if (ent.name && ent.name == "singularity")
			            { singularityOn = true; }

			        }

			        this.accel.x = (singularityOn) ? this.accel.x : 0;

			        if (!this.isAttacking) {
			            this.currentAnim = this.anims.idle;
			            if (weapon != null) { weapon.currentAnim = weapon.anims.idle; }
			            if (shield != null) { shield.currentAnim = shield.anims.idle; }
			            if (armor != null) { armor.currentAnim = armor.anims.idle; }
			        }
			    }

			    //state.leftThumbX = 0;





			    game.showPopUp = false;
			    // attacks with slash for now
			    if (!this.isAttacking && !game.skillMenu1Selected && !game.skillMenu2Selected) {
			        if (ig.input.pressed('action1') || buttons.x_button.pressed) {


			            if (ig.game.calcManaCost(this.currentActionSkill1, this.currentAction1Manacost, "getState")) {
			                //Will attack

			                var randumDemonPower = Math.floor(Math.random() * 20);
			                if (randumDemonPower === 0) ig.game.spawnEntity('EntityDemonPowerBuff', 0, 0)


			                ig.game.calcManaCost(this.currentActionSkill1, this.currentAction1Manacost, "reduceMana");
			                var randum = Math.floor(Math.random() * 100);

			                if ((randum < this.DBLATKCHC) || (this.ESCALATION_SureCrit === true && this.BLADE_PHANTOMSTRIKES)
                                ) {
			                    if (this.ESCALATION_SureCrit === true && this.BLADE_PHANTOMSTRIKES) ig.game.damageTimer(1, 'escalation', 'escalation');
			                    this.ESCALATION_SureCrit = false;
			                    ig.game.damageTimer(1, 'SPACEWARP', 'SPACEWARP');
			                    if (this.armor.SPECIAL["Dragonbone"]) {
			                        var retMP = game.CheckOverFlowHeal(this, this.maxMana * 0.05, 'mp');
			                        this.mana += retMP;
			                        game.damageTimer(1, '+', 'cyan');
			                    }
			                    //game.damageTimer(1, '+' + ((Math.round(quarterPercentDamage * 10) / 10)), 'cyan');



			                    this.Action(this.currentActionSkill1, this.currentAction1Manacost, true);
			                    this.Action(this.currentActionSkill1, this.currentAction1Manacost, true);

			                }


			                this.Action(this.currentActionSkill1, this.currentAction1Manacost);
			            }


			        }
			        if (ig.input.pressed('action2') || buttons.b_button.pressed) {

			            if (ig.game.calcManaCost(this.currentActionSkill2, this.currentAction2Manacost, "getState")) {

			                ig.game.calcManaCost(this.currentActionSkill2, this.currentAction2Manacost, "reduceMana");
			                if ((randum < this.DBLATKCHC) || (this.ESCALATION_SureCrit === true && this.BLADE_PHANTOMSTRIKES)
                             ) {

			                    if (this.ESCALATION_SureCrit === true && this.BLADE_PHANTOMSTRIKES) ig.game.damageTimer(1, 'escalation', 'escalation');
			                    this.ESCALATION_SureCrit = false;
			                    ig.game.damageTimer(1, 'SPACEWARP', 'SPACEWARP');
			                    if (this.armor.SPECIAL["Dragonbone"]) {
			                        var retMP = game.CheckOverFlowHeal(this, this.maxMana * 0.05, 'mp');
			                        this.mana += retMP;
			                        game.damageTimer(1, '+', 'cyan');
			                    }
			                    //game.damageTimer(1, '+' + ((Math.round(quarterPercentDamage * 10) / 10)), 'cyan');
			                    game.damageTimer(1, '+', 'cyan');
			                    this.Action(this.currentActionSkill2, this.currentAction2Manacost, true);
			                    this.Action(this.currentActionSkill2, this.currentAction2Manacost, true);

			                }


			                this.Action(this.currentActionSkill2, this.currentAction2Manacost);
			            }
			        }


			    }

			    if (this.animATKCD.delta() > 0) {
			        this.isAttacking = false;
			    }
			    if (!(this.delayATKCD.delta() < 0) && this.isAttacking) {


			        this.currentAnim = this.anims.idle;
			        if (weapon != null) { weapon.currentAnim = weapon.anims.idle; weapon.currentAnim.update(); }
			        if (shield != null) { shield.currentAnim = shield.anims.idle; shield.currentAnim.update(); }
			        if (armor != null) { armor.currentAnim = armor.anims.idle; armor.currentAnim.update(); }
			        this.currentAnim.update();
			    }

			    if ((this.standing && (ig.input.pressed('jump') || buttons.a_button.pressed)) ||
                (this.onElevator && (ig.input.pressed('jump') || buttons.a_button.pressed)) ||
                (this.doubleJump && (ig.input.pressed('jump') || buttons.a_button.pressed))

                ) {




			        if (this.doubleJump && !this.standing && ig.game.DoubleJumpTutorialDone === false &&
                        ig.game.CurrentTutImg) {
			            ig.game.DoubleJumpTutorialDone = true;
			            ig.game.CurrentTutImg = null;
			        }
			        this.doubleJump = false;
			        this.vel.y = -this.jump;

			        this.onElevator = false;




			        //	else if (this.tripleJump) { this.tripleJump = false; }


			    }
			    if (this.standing && this.velLaunch != -1) {
			        this.vel.y += this.velLaunch;
			        this.onElevator = false;

			        this.velLaunch = -1;

			    }
			    if (!this.doublejump && (this.standing && this.doubleJumpenabled)) {
			        this.doubleJump = true;

			    }
			    if ((this.standing && this.C5_TRIPLEJUMP) || (this.C3_WALLJUMP && this.C5_TRIPLEJUMP && this.WallTouch)) {
			        this.tripleJump = true;
			    }

			    if (this.vel.y < 0 && this.onElevator === false && !this.isAttacking) {
			        this.currentAnim = this.anims.jump;
			        if (weapon != null) { weapon.currentAnim = weapon.anims.jump; }
			        if (shield != null) { shield.currentAnim = shield.anims.jump; }
			        if (armor != null) { armor.currentAnim = armor.anims.jump; }
			    }
			    if (this.WallTouch) { this.currentAnim = this.anims.walltouch; }
			    if (this.vel.y > 0 && this.onElevator === false && !this.isAttacking) {
			        this.currentAnim = this.anims.fall;
			        if (weapon != null) { weapon.currentAnim = weapon.anims.fall; }
			        if (shield != null) { shield.currentAnim = shield.anims.fall; }
			        if (armor != null) { armor.currentAnim = armor.anims.fall; }
			    }


			    this.currentAnim.flip.x = this.flip;
			}













			this.parent();

			if (armor != null) {
			    if (this.currentPath == 'Right') { armor.flip = false; }
			    else if (this.currentPath == 'Left') { armor.flip = true; }


			    armor.currentAnim.flip.x = armor.flip;
			    armor.pos.y = this.pos.y - 8;
			    armor.pos.x = this.pos.x - 12;

			}
			if (weapon != null) {
			    if (this.currentPath == 'Right') { weapon.flip = false; }
			    else if (this.currentPath == 'Left') { weapon.flip = true; }
			    weapon.currentAnim.flip.x = weapon.flip;
			    weapon.pos.y = this.pos.y - 8;
			    weapon.pos.x = this.pos.x - 12;

			}
			if (shield != null) {
			    if (this.currentPath == 'Right') { shield.flip = false; }
			    else if (this.currentPath == 'Left') { shield.flip = true; }
			    shield.currentAnim.flip.x = shield.flip;
			    shield.pos.y = this.pos.y - 8;

			    shield.pos.x = this.pos.x - 12;


			}

		    //For slippery Ice
			this.friction.x = 900;

			
		},
		kill: function (doNotLoad) {
		   /* var sound = new ig.Sound('media/Music/BloodSplat.m4a');
			sound.play();*/
		    if(!doNotLoad)ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { callBack: function () { ig.game.Load(ig.game.saveSlot) } });
			ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 1 });
			ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 1 });
			ig.game.deleteLevelUp();
			ig.game.removeEntity(this);
           
		},
		Action: function (currentActionSkill,currentActionManacost, isTrue) {
			
		   
		    if (ig.game.AttackTutorialDone === false && ig.game.CurrentTutImg) {
		        ig.game.AttackTutorialDone = true;
		        ig.game.CurrentTutImg = null;
		    }
			var AllowedToStrike = true;
					
			//Add Burning manacosts
			//Add manacost modifiers
			
                        
	
						if(AllowedToStrike == true)
						{
							var x_coord = 0;
							var weapon = ig.game.getEntityByName('weapon');
							var shield = ig.game.getEntityByName('shield');
							var armor = ig.game.getEntityByName('armor');
							var isVenomSlash = false;
							isVenomSlash = (this.weapon.SPECIAL["Venom Slash"]);
							var isDouble = false;
							if (isTrue) isDouble = true;
							

							if (this.DEMON_DEMONSTRENGTH) {
							    var randomDemonStrength = Math.floor(Math.random() * 5);
							    if (randomDemonStrength === 0) {
							        ig.game.spawnEntity("EntityDemonStrengthBuff", this.pos.x, this.pos.y);
							    }
							}
								if (this.currentPath == 'Right') { x_coord = this.pos.x; }
								if (this.currentPath == 'Left') { x_coord = this.pos.x - 8; }

								if (currentActionSkill == 'EntityShockwave' || currentActionSkill == 'EntitySpellwave' || currentActionSkill == 'EntityDarkWave' ||currentActionSkill == 'EntityDreadWave') {

								    ig.game.spawnEntity(currentActionSkill, x_coord, this.pos.y - 8, { flip: this.flip, applyVenom: isVenomSlash, canDuplicate: isDouble });
								}
								else if (currentActionSkill === 'EntityRadiance') {
								    ig.game.spawnEntity(currentActionSkill, x_coord - 12, this.pos.y, { flip: true, applyVenom: isVenomSlash, canDuplicate: isDouble });
								    ig.game.spawnEntity(currentActionSkill, x_coord + 8, this.pos.y, { flip: false, applyVenom: isVenomSlash, canDuplicate: isDouble });
								}
								else if (currentActionSkill === 'EntityArcaneBall') {
								    ig.game.spawnEntity(currentActionSkill, x_coord - 4, this.pos.y - 8, { flip: this.flip, applyVenom: isVenomSlash, canDuplicate: isDouble });
							
								}
								else {
								    ig.game.spawnEntity(currentActionSkill, x_coord - 4, this.pos.y, { flip: this.flip, applyVenom: isVenomSlash, canDuplicate: isDouble });
								   


								}
							
								if (currentActionSkill === "EntityRadiance") {
								    if (this.LIFE_ZEAL) {
								        game.spawnEntity("EntityZealPowerBuff", this.pos.x, this.pos.y);
								    }
								}
						    //Check if spells is casted or default attack
								var anim_buffer = null;
								if (currentActionSkill === "EntityFireBlast"
                                    || currentActionSkill === "EntityFrostball"
                                    || currentActionSkill === "EntityRadiance"
                                    || currentActionSkill === "EntityArcaneBall"
                                    || currentActionSkill === "EntityFrostFire") {anim_buffer = this.anims.cast; }
								else { anim_buffer = this.anims.attack; }
								this.currentAnim = anim_buffer.rewind();
								this.currentAnim = anim_buffer;
								if (weapon) {

								    if (anim_buffer === this.anims.cast) weapon.currentAnim = weapon.anims.cast.rewind();
								    else { weapon.currentAnim = weapon.anims.attack.rewind(); }
								    if (anim_buffer === this.anims.cast) weapon.currentAnim = weapon.anims.cast;
								    else { weapon.currentAnim = weapon.anims.attack; }
								 

								}
								if (shield) {

								    if (anim_buffer === this.anims.cast) shield.currentAnim = shield.anims.cast.rewind();
								    else { shield.currentAnim = shield.anims.attack.rewind(); }
								    if (anim_buffer === this.anims.cast) shield.currentAnim = shield.anims.cast;
								    else { shield.currentAnim = shield.anims.attack; }
								

								}
								if (armor) {

								    if (anim_buffer === this.anims.cast) armor.currentAnim = armor.anims.cast.rewind();
								    else { armor.currentAnim = armor.anims.attack.rewind(); }
								    if (anim_buffer === this.anims.cast) armor.currentAnim = armor.anims.cast;
								    else { armor.currentAnim = armor.anims.attack; }
							

								}
							}
						this.delayATKCD.set(this.AbilityCD);
						this.animATKCD.set(0.40);
							this.isAttacking = true;
					  

							this.canMove = false;
						
					


				
			
		}, 
		extractName: function (array) {
			var newArray = new Array();
			var array_length = array.length;
			for (var i = 0; i < array_length; i++) {
				newArray.push(array[i].itemName);

			}
			return newArray;
		}


	});
   EntityWeapon = ig.Entity.extend({
		size: { x: 16, y: 16 },
		offset: {x: 0, y: 0},
		maxVel: { x:0, y: 0},
		name: 'weapon',
		animatedWeapon: false,
		animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_WoodenSword.png', 32, 32),
		collides: ig.Entity.COLLIDES.NONE,
	  attackSPD: 0.4,
		flip: false,
		init: function (x, y, settings) {
			this.parent(x, y, settings);
	
		  
			if (this.animatedWeapon == true) { this.addAnim('idle',0.1, [1, 15]); }
			else { this.addAnim('idle', 1, [0]); }
		
			this.addAnim('run', 0.07, [0, 1, 2, 3, 4, 5,4,3,2,1]);
			this.addAnim('jump', 1, [1]);
			this.addAnim('fall', 0.1, [6, 7]);
			this.addAnim('attack', 0.08, [10, 11, 12, 13, 14], true);
			this.addAnim('cast', 0.08, [18, 19, 19, 19, 19], true);
			
		  this.currentAnim = this.anims.idle;
		},
		
		update: function () {
			//Nothing
			this.parent();
			
		   
			
		}
	   
	});
	EntityShield = ig.Entity.extend({
		size: { x: 16, y: 16 },
		offset: { x: 0, y: 0 },
		maxVel: { x: 0, y: 0 },
		name: 'shield',
		animatedWeapon: false,
		animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_WoodenShield.png', 32, 32),
		collides: ig.Entity.COLLIDES.NONE,
		attackSPD: 0.4,
		flip: false,
		init: function (x, y, settings) {
			this.parent(x, y, settings);

		   
			if (this.animatedWeapon == true) { this.addAnim('idle', 0.1, [0,14, 15]); }
			else { this.addAnim('idle', 1, [0]); }

			this.addAnim('run', 0.07, [0, 1, 2, 3, 4, 5,  4, 3, 2, 1]);
			this.addAnim('jump', 1, [1]);
			this.addAnim('fall', 0.1, [6, 7]);
		
			this.addAnim('attack', 0.08, [10, 11, 12, 13, 14], true);
			this.addAnim('cast', 0.08, [10, 11, 12, 13, 14], true);
		   
			
			this.currentAnim = this.anims.idle;
			
		},
		
		
		update: function () {
			//Nothing
			
			this.parent();
			



		}
	});
	EntityArmor = ig.Entity.extend({
		size: { x: 16, y: 16 },
		offset: { x: 0, y: 0 },
		maxVel: { x: 0, y: 0 },
		name: 'armor',
		animatedWeapon: false,
		animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_LeatherVest.png', 32, 32),
		collides: ig.Entity.COLLIDES.NONE,
		attackSPD: 0.4,
		flip: false,
		init: function (x, y, settings) {
			this.parent(x, y, settings);


			if (this.animatedWeapon == true) { this.addAnim('idle', 0.1, [0,  14, 15]); }
			else { this.addAnim('idle', 1, [0]); }

			this.addAnim('run', 0.07, [0, 1, 2, 3, 4, 5, 4, 3, 2, 1]);
			this.addAnim('jump', 1, [1]);
			this.addAnim('fall', 0.1, [6, 7]);
			this.addAnim('attack', 0.08, [10, 11, 12, 13, 14], true);
			this.addAnim('cast', 0.08, [10, 11, 12, 13, 14], true);


			this.currentAnim = this.anims.idle;
		},
		
		update: function () {
			//Nothing
			this.parent();



		}
	});
	EntityDummyPlayer = ig.Entity.extend({
	    size: { x: 8, y: 14 },
	    offset: { x: 12, y: 8 },
	 
	    maxVel: { x: 0, y: 0 },
	    name: 'EntityDummyPlayer',
	    animatedWeapon: false,
	    animSheet: null,
	    collides: ig.Entity.COLLIDES.NONE,
	    attackSPD: 0.4,
        gravityFactor: 0,
	    flip: false,
	    init: function (x, y, settings) {
	        this.parent(x, y, settings);



	        this.animSheet = new ig.AnimationSheet('media/runningAnimV2.png', 32, 32);
	        // Animation for the Hero!
	        this.animATKCD = new ig.Timer();
	        this.delayATKCD = new ig.Timer();
	        this.delayOnFive = new ig.Timer();
	        this.addAnim('idle', 1, [0]);
	        this.addAnim('run', 0.07, [0, 1, 2, 3, 4, 5, 4, 3, 2, 1]);
	        this.addAnim('jump', 1, [1]);
	        this.addAnim('fall', 0.1, [6, 7]);
	        this.addAnim('attack', 0.08, [10, 11, 12, 13, 14], true);
	        this.addAnim('cast', 0.08, [10, 11, 12, 13, 14], true);

	        this.currentAnim = this.anims.idle;
	    },

	    update: function () {
	        //Nothing
	        this.parent();
	       



	    }
	});
	EntityDeathExplosionParticle = ig.Entity.extend({
		size: { x: 2, y: 2 },
		maxVel: { x: 160, y: 200 },
		lifetime: 1,
		fadetime: 2,
		bounciness: 0,
		vel: { x: 100, y: 30 },
		friction: { x: 100, y: 0 },
		collides: ig.Entity.COLLIDES.LITE,
		colorOffset: 0,
		totalColors: 7,

		init: function (x, y, settings) {
			this.parent(x, y, settings);
			this.animSheet = new ig.AnimationSheet('media/blood.png', 2,2);
			var frameID = this.colorOffset;//Math.round(Math.random() * this.totalColors) + (this.colorOffset * (this.totalColors + 1));
			this.addAnim('idle', 0.2, [frameID]);
			this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
			this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
			this.idleTimer = new ig.Timer();
		},
		reset: function (x, y, settings) {
			this.parent(x, y, settings);
			var frameID = this.colorOffset;//Math.round(Math.random() * this.totalColors) + (this.colorOffset * (this.totalColors + 1));
			this.addAnim('idle', 0.2, [frameID]);
			this.vel.x = (Math.random() * 2 - 1) * this.vel.x;
			this.vel.y = (Math.random() * 2 - 1) * this.vel.y;
			this.idleTimer = new ig.Timer();
			
		},
		update: function () {
			if (this.idleTimer.delta() > this.lifetime) {
				this.kill();
				return;
			}
			this.currentAnim.alpha = this.idleTimer.delta().map(this.lifetime - this.fadetime, this.lifetime, 1, 0);
			this.parent();
		}
	});
	
	EntityDeathExplosion = ig.Entity.extend({
		lifetime: 1,
		callBack: null,
		particles: 2,
		init: function (x, y, settings) {
			this.parent(x, y, settings);
			var particle_l = this.particles;
		   for (var i = 0; i < particle_l; i++)
			{
				ig.game.spawnEntity(EntityDeathExplosionParticle, x, y, { colorOffset: settings.colorOffset ? settings.colorOffset : 0 });
			}
			this.idleTimer = new ig.Timer();

		},
		update: function () {
			if (this.idleTimer.delta() > this.lifetime) {
				this.kill();
				if (this.callBack)
					this.callBack();
				return;
			}
		}
	});
   // ig.EntityPool.enableFor(EntityDeathExplosionParticle);

   EntityPlayerSlash = ig.Entity.extend({
		collides: ig.Entity.COLLIDES.NONE,


		size: { x: 20, y: 20 },
		offset: { x: 4, y: 0 },
		maxVel: { x: 0, y: 0 },
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.NONE,
		type: "PHYSICAL",
		name: 'EntityPlayerSlash',
		flip: false,

		doneDamage: false,
		delayTimer: null,
		delayCollision: null,
		delayATKCD: null,

		CDtimerset: false,


       canDuplicate: false,






		init: function (x, y, settings) {


			this.parent(x, y, settings);
			//this.animSheet = new ig.AnimationSheet('media/AttackAnimation/FadeSlash.png', 32, 32);


			this.doneDamage = false;
		   // this.addAnim('idle', 0.06667, [0, 1, 2, 3, 4, 5]);
			this.delayTimer = new ig.Timer();
			this.delayTimer.set(ig.game.player.AbilityCD);
		   

		},
		reset: function (x, y, settings) {


			this.parent(x, y, settings);
		  //  this.anims.idle.rewind();

			
			this.doneDamage = false;
			this.delayTimer.set(ig.game.player.AbilityCD);
			


		},

		update: function () {
			if (ig.game.player) {


				this.parent();


				if (ig.game.player.currentPath == 'Right') { this.flip = false; this.pos.x = ig.game.player.pos.x; }
				if (ig.game.player.currentPath == 'Left') { this.flip = true; this.pos.x = ig.game.player.pos.x - 16;}
				this.pos.y = ig.game.player.pos.y - 8;


				if (this.delayTimer.delta() > 0) { this.kill(); }
				//this.currentAnim.flip.x = this.flip;
			}
		},

		check: function (other) {


		    if (this.doneDamage == false && ig.game.player) {
									   if(ig.game.SOUNDON){
									   var sound = new ig.Sound('media/Music/SlashSound.m4a');
									   sound.play();}
									   this.doneDamage = true;
									   if (this.applyVenom === true) other.venomSlash = true;
				var damage = ig.game.player.ATK  + ig.game.player.STR * 0.5;
				if (ig.game.player.weapon.SPECIAL["Flame Slashes"]) {
			
				    ig.game.spawnEntity("EntityFlameSlashEffect",other.pos.x,other.pos.y);
				}
				ig.game.CalculateDamage(ig.game.player, damage, other, function (data) {
					
				 	other.receiveDamage(data, this); }, false, this.type, this.name, this,this.canDuplicate);

				


			  }



		}

   });
   EntityWeakSlash = ig.Entity.extend({
       collides: ig.Entity.COLLIDES.NONE,


       size: { x: 20, y: 20 },
       offset: { x: 4, y: 0 },
       maxVel: { x: 0, y: 0 },
       type: ig.Entity.TYPE.NONE,
       checkAgainst: ig.Entity.TYPE.B,
       collides: ig.Entity.COLLIDES.NONE,
       type: "PHYSICAL",
       name: 'EntityWeakSlash',
       flip: false,

       doneDamage: false,
       delayTimer: null,
       delayCollision: null,
       delayATKCD: null,

       CDtimerset: false,



       canDuplicate: false,





       init: function (x, y, settings) {


           this.parent(x, y, settings);
           //this.animSheet = new ig.AnimationSheet('media/AttackAnimation/FadeSlash.png', 32, 32);


           this.doneDamage = false;
           // this.addAnim('idle', 0.06667, [0, 1, 2, 3, 4, 5]);
           this.delayTimer = new ig.Timer();
           this.delayTimer.set(ig.game.player.AbilityCD);


       },
       reset: function (x, y, settings) {


           this.parent(x, y, settings);
           //  this.anims.idle.rewind();


           this.doneDamage = false;
           this.delayTimer.set(ig.game.player.AbilityCD);



       },

       update: function () {
           if (ig.game.player) {


               this.parent();


               if (ig.game.player.currentPath == 'Right') { this.flip = false; this.pos.x = ig.game.player.pos.x; }
               if (ig.game.player.currentPath == 'Left') { this.flip = true; this.pos.x = ig.game.player.pos.x - 16; }
               this.pos.y = ig.game.player.pos.y - 8;


               if (this.delayTimer.delta() > 0) { this.kill(); }
               //this.currentAnim.flip.x = this.flip;
           }
       },

       check: function (other) {


           if (this.doneDamage == false && ig.game.player) {
               if (ig.game.SOUNDON) {
                   var sound = new ig.Sound('media/Music/SlashSound.m4a');
                   sound.play();
               }
               this.doneDamage = true;
              
               var damage = ig.game.player.ATK * 0.75  + ig.game.player.STR*0.5;
               if (this.applyVenom === true) other.venomSlash = true;

               if (ig.game.player.weapon.SPECIAL["Flame Slashes"]) {
                 
                   ig.game.spawnEntity("EntityFlameSlashEffect", other.pos.x, other.pos.y);
               }
               ig.game.CalculateDamage(ig.game.player, damage, other, function (data) {

                   other.receiveDamage(data, this);
               }, false, this.type, this.name, this,this.canDuplicate);




           }



       }

   });
   EntityHolyBarrier = ig.Entity.extend({
       collides: ig.Entity.COLLIDES.NONE,

       //animSheet: new ig.AnimationSheet( 'media/slash.png', 32, 32),
       size: { x: 25, y: 32 },
       offset: { x: 5, y: 0 },

       type: 'BUFF',
       name: 'EntityHolyBarrier',

       Rincrease: 0,
       MRincrease: 0,
      // health: 200,
       delayTimer: null,



       init: function (x, y, settings) {


           this.parent(x, y, settings);
           ig.game.arrayOfBuffs.push(this);

           // Animation for the Enemy1
           this.delayTimer = new ig.Timer();
           if (ig.game.player.shield.SPECIAL["Giant Barrier"]) {
               this.delayTimer.set(2);
               this.Rincrease = (ig.game.player.RES * 0.33);
               this.MRincrease = (ig.game.player.MAG_RES * 0.33);
           }
           else {
               this.delayTimer.set(1);
               this.Rincrease = (ig.game.player.RES * 0.5);
               this.MRincrease = (ig.game.player.MAG_RES * 0.5);
           }
         
           var buffer = 95;
          

           if (this.Rincrease > buffer && ig.game.player.RES > 0) {
               this.Rincrease = buffer - ig.game.player.RES;
           }

           if (this.MRincrease > buffer && ig.game.player.MAG_RES > 0) {
               this.MRincrease = buffer - ig.game.player.MAG_RES;
           }


           ig.game.player.RES += this.Rincrease;
           ig.game.player.MAG_RES += this.MRincrease;
           ig.game.damageTimer(1, 'barrier', 'barrier');

       },
       reset: function (x, y, settings) {


           this.parent(x, y, settings);
           ig.game.arrayOfBuffs.push(this);

           // Animation for the Enemy1

           if (ig.game.player.shield.SPECIAL["Giant Barrier"]) {
               this.delayTimer.set(2);
               this.Rincrease = (ig.game.player.RES * 0.33);
               this.MRincrease = (ig.game.player.MAG_RES * 0.33);
           }
           else {
               this.delayTimer.set(1);
               this.Rincrease = (ig.game.player.RES * 0.5);
               this.MRincrease = (ig.game.player.MAG_RES * 0.5);
           }
           var buffer = 95;
         

           if (this.Rincrease > buffer && ig.game.player.RES > 0) {
               this.Rincrease = buffer - ig.game.player.RES;
           }

           if (this.MRincrease > buffer && ig.game.player.MAG_RES > 0) {
               this.MRincrease = buffer - ig.game.player.MAG_RES;
           }

           ig.game.player.RES += this.Rincrease;
           ig.game.player.MAG_RES += this.MRincrease;
           ig.game.damageTimer(1, 'barrier', 'barrier');

       },

       update: function () {

           this.parent();
           if(ig.game.player){
               this.pos.x = ig.game.player.pos.x + ig.game.player.width/2;
               this.pos.y = ig.game.player.pos.y + ig.game.player.width/2;
           }
           
           if (this.delayTimer.delta() > 0) {


               this.kill();
           }
       },

       kill: function () {
           if (ig.game.player) {
               ig.game.player.RES -= this.Rincrease;
               ig.game.player.MAG_RES -= this.MRincrease;
           }
           ig.game.removeEntity(this);
       },
       check: function (other) {


           if(other.IsBurning === false && ig.game.player){
               if(ig.game.player.shield.SPECIAL["Flame Guard"]){
                   ig.game.spawnEntity(EntityBurningEffect, other.pos.x, other.pos.y);
               }
           }


       }

   });
   EntityLastStandBuff = ig.Entity.extend({
       collides: ig.Entity.COLLIDES.NONE,

       //animSheet: new ig.AnimationSheet( 'media/slash.png', 32, 32),
       size: { x: 25, y: 32 },
       offset: { x: 5, y: 0 },

       type: 'BUFF',
       name: 'EntityLastStandBuff',
       STRinc: 0,
       INTinc: 0,
       Rincrease: 0,
       MRincrease: 0,
      // health: 200,
       delayTimer: null,



       init: function (x, y, settings) {


           this.parent(x, y, settings);
           ig.game.arrayOfBuffs.push(this);

           // Animation for the Enemy1
           this.delayTimer = new ig.Timer();
           this.delayTimer.set(1);

           if (ig.game.player.shield.SPECIAL["Final Stand"]) {
               this.STRinc = ig.game.player.STR * 0.05 * ig.game.player.LIFE_LASTSTAND_LEVEL;
               this.INTinc = ig.game.player.INT * 0.05 * ig.game.player.LIFE_LASTSTAND_LEVEL;

               ig.game.player.STR += this.STRinc;
               ig.game.player.INT += this.INTinc;
           }

           this.Rincrease = (ig.game.player.RES * 0.05 * ig.game.player.LIFE_LASTSTAND_LEVEL);
           this.MRincrease = (ig.game.player.MAG_RES * 0.05 * ig.game.player.LIFE_LASTSTAND_LEVEL);
           var buffer = 95;
          

           if (this.Rincrease > buffer && ig.game.player.RES > 0) {
               this.Rincrease = buffer - ig.game.player.RES;
           }

           if (this.MRincrease > buffer && ig.game.player.MAG_RES > 0) {
               this.MRincrease = buffer - ig.game.player.MAG_RES;
           }


           ig.game.player.RES += this.Rincrease;
           ig.game.player.MAG_RES += this.MRincrease;
           ig.game.damageTimer(1, 'barrier', 'barrier');

       },
       reset: function (x, y, settings) {


           this.parent(x, y, settings);
           ig.game.arrayOfBuffs.push(this);

           // Animation for the Enemy1

           this.delayTimer.set(1);

           if (ig.game.player.shield.SPECIAL["Final Stand"]) {
               this.STRinc = ig.game.player.STR * 0.05 * ig.game.player.LIFE_LASTSTAND_LEVEL;
               this.INTinc = ig.game.player.INT * 0.05 * ig.game.player.LIFE_LASTSTAND_LEVEL;

               ig.game.player.STR += this.STRinc;
               ig.game.player.INT += this.INTinc;
           }

           this.Rincrease = (ig.game.player.RES * 0.05 * ig.game.player.LIFE_LASTSTAND_LEVEL);
           this.MRincrease = (ig.game.player.MAG_RES * 0.05 * ig.game.player.LIFE_LASTSTAND_LEVEL);
           var buffer = 95;
          

           if (this.Rincrease > buffer && ig.game.player.RES > 0) {
               this.Rincrease = buffer - ig.game.player.RES;
           }

           if (this.MRincrease > buffer && ig.game.player.MAG_RES > 0) {
               this.MRincrease = buffer - ig.game.player.MAG_RES;
           }

           ig.game.player.RES += this.Rincrease;
           ig.game.player.MAG_RES += this.MRincrease;
           ig.game.damageTimer(1, 'barrier', 'barrier');

       },

       update: function () {

           this.parent();
           if (ig.game.player) {
               this.pos.x = ig.game.player.pos.x + ig.game.player.width / 2;
               this.pos.y = ig.game.player.pos.y + ig.game.player.width / 2;
           }

           if (this.delayTimer.delta() > 0) {


               this.kill();
           }
       },

       kill: function () {
           if (ig.game.player) {
               ig.game.player.RES -= this.Rincrease;
               ig.game.player.MAG_RES -= this.MRincrease;


               if (ig.game.player.shield.SPECIAL["Final Stand"]) {
                 

                   ig.game.player.STR -= this.STRinc;
                   ig.game.player.INT -= this.INTinc;
               }
           }
           ig.game.removeEntity(this);
       }

   });
EntityDemonSlash = ig.Entity.extend({
		collides: ig.Entity.COLLIDES.NONE,


		size: { x: 20, y: 20 },
		offset: { x: 4, y: 0 },
		maxVel: { x: 0, y: 0 },
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.NONE,
		type: "MIXED",
		name: 'EntityDemonSlash',
		flip: false,

		doneDamage: false,
		delayTimer: null,
		delayCollision: null,
		delayATKCD: null,

		CDtimerset: false,
		canDuplicate: false,








		init: function (x, y, settings) {


			this.parent(x, y, settings);
			//this.animSheet = new ig.AnimationSheet('media/AttackAnimation/FadeSlash.png', 32, 32);


			this.doneDamage = false;
		   // this.addAnim('idle', 0.06667, [0, 1, 2, 3, 4, 5]);
			this.delayTimer = new ig.Timer();
			this.delayTimer.set(ig.game.player.AbilityCD);
		   

		},
		reset: function (x, y, settings) {


			this.parent(x, y, settings);
		  //  this.anims.idle.rewind();

			
			this.doneDamage = false;
			this.delayTimer.set(ig.game.player.AbilityCD);
			


		},

		update: function () {
			if (ig.game.player) {


				this.parent();


				if (ig.game.player.currentPath == 'Right') { this.flip = false; this.pos.x = ig.game.player.pos.x; }
				if (ig.game.player.currentPath == 'Left') { this.flip = true; this.pos.x = ig.game.player.pos.x - 16;}
				this.pos.y = ig.game.player.pos.y - 8;


				if (this.delayTimer.delta() > 0) { this.kill(); }
				//this.currentAnim.flip.x = this.flip;
			}
		},

		check: function (other) {


		    if (this.doneDamage == false && ig.game.player) {
									   if(ig.game.SOUNDON){
									   var sound = new ig.Sound('media/Music/SlashSound.m4a');
									   sound.play();}
				this.doneDamage = true;
				var damage = ig.game.player.ATK * 0.75 + ig.game.player.MATK * 0.75  + ig.game.player.STR * 0.75;
				if (this.applyVenom === true) other.venomSlash = true;

				if (ig.game.player.weapon.SPECIAL["Flame Slashes"]) {

				    ig.game.spawnEntity("EntityFlameSlashEffect", other.pos.x, other.pos.y);
				}
				ig.game.CalculateDamage(ig.game.player, damage, other, function (data) {
					
				 	other.receiveDamage(data, this); }, false, this.type,this.name, this,this.canDuplicate);

				


			  }



		}

	});
   EntityLifeSlash = ig.Entity.extend({
		collides: ig.Entity.COLLIDES.NONE,


		size: { x: 20, y: 20 },
		offset: { x: 4, y: 0 },
		maxVel: { x: 0, y: 0 },
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.NONE,
		type: "MIXED",
		name: 'EntityLifeSlash',
		flip: false,

		doneDamage: false,
		delayTimer: null,
		delayCollision: null,
		delayATKCD: null,

		CDtimerset: false,


		canDuplicate: false,






		init: function (x, y, settings) {


			this.parent(x, y, settings);
			//this.animSheet = new ig.AnimationSheet('media/AttackAnimation/FadeSlash.png', 32, 32);


			this.doneDamage = false;
		   // this.addAnim('idle', 0.06667, [0, 1, 2, 3, 4, 5]);
			this.delayTimer = new ig.Timer();
			this.delayTimer.set(ig.game.player.AbilityCD);
		   

		},
		reset: function (x, y, settings) {


			this.parent(x, y, settings);
		  //  this.anims.idle.rewind();

			
			this.doneDamage = false;
			this.delayTimer.set(ig.game.player.AbilityCD);
			


		},

		update: function () {
			if (ig.game.player) {


				this.parent();


				if (ig.game.player.currentPath == 'Right') { this.flip = false; this.pos.x = ig.game.player.pos.x; }
				if (ig.game.player.currentPath == 'Left') { this.flip = true; this.pos.x = ig.game.player.pos.x - 16;}
				this.pos.y = ig.game.player.pos.y - 8;


				if (this.delayTimer.delta() > 0) { this.kill(); }
				//this.currentAnim.flip.x = this.flip;
			}
		},

		check: function (other) {


		    if (this.doneDamage == false && ig.game.player) {
									   if(ig.game.SOUNDON){
									   var sound = new ig.Sound('media/Music/SlashSound.m4a');
									   sound.play();}
									   this.doneDamage = true;
									  
				var damage = ig.game.player.ATK * 0.4 + ig.game.player.MATK * 0.4 + ig.game.player.STR * 0.5;;
				
				if (this.applyVenom === true) other.venomSlash = true;

				if (ig.game.player.weapon.SPECIAL["Flame Slashes"]) {
			
				    ig.game.spawnEntity("EntityFlameSlashEffect", other.pos.x, other.pos.y);
				}
				ig.game.CalculateDamage(ig.game.player, damage, other, function (data) {
					
				 	other.receiveDamage(data, this); }, false, this.type,this.name, this,this.canDuplicate);

				


			  }



		}

   });
  
   EntityRadiance = ig.Entity.extend({



       size: { x: 12, y: 12 },
       offset: { x: 10, y: 10 },
       maxVel: { x: 200, y: 0},
       type: ig.Entity.TYPE.NONE,
       checkAgainst: ig.Entity.TYPE.B,
       collides: ig.Entity.COLLIDES.NONE,
       type: "PHYSICAL",
       name: 'EntityRadiance',
       flip: true,
       gravityFactor: 0,
       doneDamage: false,
       delayTimer: null,


       firstRound: true,

       goingRight: false,
       goingLeft: false,


       canDuplicate: false,





       init: function (x, y, settings) {


           this.parent(x, y, settings);
           this.animSheet = new ig.AnimationSheet('media/AttackAnimation/RadianceWave.png', 32, 32);
           this.addAnim('idle', 0.05, [0, 1, 2, 3, 3, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 5, 4, 5, 4, 5]);

           //this.addAnim('idle',1, [5]);
           this.delayTimer = new ig.Timer();
           this.delayTimer.set(1.5);
           this.doneDamage = false;
           if (ig.game.SOUNDON) {
               var sound = new ig.Sound('media/Music/WaveSound.m4a');
               sound.play();
           }
           if (this.flip) { this.vel.x = -100; }
           else { this.vel.x = 100; }
          


       },
       reset: function (x, y, settings) {


           this.parent(x, y, settings);
           this.anims.idle.rewind();
           this.delayTimer.set(1.5);
           this.doneDamage = false;
           if (ig.game.SOUNDON) {
               var sound = new ig.Sound('media/Music/WaveSound.m4a');
               sound.play();
           }
           if (this.flip) { this.vel.x = -100; }
           else { this.vel.x = 100; }


       },
       handleMovementTrace: function (res) {
           this.parent(res);

           if (
              res.collision.x 
               ) {
               this.kill();
           }
       },
       kill: function () {
           this.parent();
           ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 6 });
       },
       update: function () {
           this.parent();
           if (this.delayTimer.delta() > 0) { this.kill(); }
           this.currentAnim.flip.x = this.flip;
       },

       check: function (other) {


           if (other.ShockWavedoneDamage === false && ig.game.player) {

               if (ig.game.SOUNDON) {
                   var sound = new ig.Sound('media/Music/BloodSplat.m4a');
                   sound.play();
               }
               other.ShockWavedoneDamage = true;
               var damage = 2 * ig.game.player.MATK + ig.game.player.INT * 2 + 20;

               ig.game.CalculateDamage(ig.game.player, damage, other, function (data) {

                   other.receiveDamage(data, this);
               }, false, this.type, this.name, this,this.canDuplicate);




           }
       }
   });
   EntityHolyPower = ig.Entity.extend({



       size: { x: 32, y: 32 },
       offset: { x: 0, y: 0 },
       maxVel: { x: 0, y: 0 },
       type: ig.Entity.TYPE.NONE,
       checkAgainst: ig.Entity.NONE,
       collides: ig.Entity.COLLIDES.NONE,
      
       name: 'notNPC',
       flip: true,
       gravityFactor: 0,
       doneDamage: false,
       delayTimer: null,


       firstRound: true,

       goingRight: false,
       goingLeft: false,


       canDuplicate: false,





       init: function (x, y, settings) {


           this.parent(x, y, settings);
           this.animSheet = new ig.AnimationSheet('media/AttackAnimation/HolyPower.png', 32, 32);
           this.addAnim('idle', 0.1, [0, 1, 2, 3],true);

           //this.addAnim('idle',1, [5]);
           this.delayTimer = new ig.Timer();
           this.delayTimer.set(0.5);
           this.doneDamage = false;
           if (ig.game.SOUNDON) {
               var sound = new ig.Sound('media/Music/WaveSound.m4a');
               sound.play();
           }
        



       },
       reset: function (x, y, settings) {


           this.parent(x, y, settings);
           this.anims.idle.rewind();
           this.delayTimer.set(1.5);
           this.doneDamage = false;
           if (ig.game.SOUNDON) {
               var sound = new ig.Sound('media/Music/WaveSound.m4a');
               sound.play();
           }
  


       },
    
       update: function () {
           this.parent();

           if (ig.game.player) {
          
           this.pos.x = ig.game.player.pos.x + ig.game.player.size.x / 2 - this.size.x / 2;
           this.pos.y = ig.game.player.pos.y + ig.game.player.size.y / 2 - this.size.y / 2;
           }
           if (this.delayTimer.delta() > 0) { this.kill(); }
           this.currentAnim.flip.x = this.flip;
       }

   });
EntityShockwave = ig.Entity.extend({



		size: { x: 12, y: 12 },
		offset: { x: 10, y: 10 },
		maxVel: { x: 350, y: 0 },
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.NONE,
		type: "PHYSICAL",
		name: 'EntityShockwave',
		flip: true,

		doneDamage: false,
		delayTimer: null,


		firstRound: true,

		goingRight: false,
		goingLeft: false,

		canDuplicate: false,






		init: function (x, y, settings) {


			this.parent(x, y, settings);
			this.animSheet = new ig.AnimationSheet('media/AttackAnimation/BlueShockWave.png', 32, 32);
			this.addAnim('idle', 0.05, [0, 1, 2, 3, 3, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 5, 4, 5, 4, 5]);

			//this.addAnim('idle',1, [5]);
			this.delayTimer = new ig.Timer();
			this.delayTimer.set(1.5);
			this.doneDamage = false;
									   if(ig.game.SOUNDON){
									   var sound = new ig.Sound('media/Music/WaveSound.m4a');
									   sound.play();}

			if (ig.game.player.currentPath === 'Right') { this.flip = false; this.vel.x = 175; }
			if (ig.game.player.currentPath === 'Left') { this.flip = true; this.vel.x = -175; }


		},
		reset: function (x, y, settings) {


			this.parent(x, y, settings);
			this.anims.idle.rewind();
			this.delayTimer.set(1.5);
			this.doneDamage = false;
									   if(ig.game.SOUNDON){
									   var sound = new ig.Sound('media/Music/WaveSound.m4a');
									   sound.play();}

			if (ig.game.player.currentPath === 'Right') { this.flip = false; this.vel.x = 175; }
			if (ig.game.player.currentPath === 'Left') { this.flip = true; this.vel.x = -175; }


		},
		handleMovementTrace: function (res) {
			this.parent(res);

			if (res.collision.x || res.collision.y) {

				this.kill();

			}




		},
		kill: function () {
			this.parent();

			ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 6 });
		},
		update: function () {





			this.parent();
			if (this.delayTimer.delta() > 0) { this.kill(); }
			this.currentAnim.flip.x = this.flip;
		},

		check: function (other) {


		    if (other.ShockWavedoneDamage == false && ig.game.player) {

									   if(ig.game.SOUNDON){
									   var sound = new ig.Sound('media/Music/BloodSplat.m4a');
									   sound.play();}


				other.ShockWavedoneDamage = true;
				var damage = 0.6 * ig.game.player.ATK + ig.game.player.STR * 0.5;
					
				ig.game.CalculateDamage(ig.game.player, damage, other, function (data) {
					
				 	other.receiveDamage(data, this); }, false, this.type,this.name, this,this.canDuplicate);

				


			  }
		}
});
EntityDarkWave = ig.Entity.extend({



    size: { x: 12, y: 12 },
    offset: { x: 10, y: 10 },
    maxVel: { x: 350, y: 0 },
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.B,
    collides: ig.Entity.COLLIDES.NONE,
    type: "MIXED",
    name: 'EntityDarkWave',
    flip: true,

    doneDamage: false,
    delayTimer: null,


    firstRound: true,

    goingRight: false,
    goingLeft: false,

    canDuplicate: false,






    init: function (x, y, settings) {


        this.parent(x, y, settings);
        this.animSheet = new ig.AnimationSheet('media/AttackAnimation/DarkWave2.png', 32, 32);
        this.addAnim('idle', 0.05, [0, 1, 2, 3, 3, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 5, 4, 5, 4, 5]);

        //this.addAnim('idle',1, [5]);
        this.delayTimer = new ig.Timer();
        this.delayTimer.set(1.5);
        this.doneDamage = false;
        if (ig.game.SOUNDON) {
            var sound = new ig.Sound('media/Music/WaveSound.m4a');
            sound.play();
        }

        if (ig.game.player.currentPath === 'Right') { this.flip = false; this.vel.x = 175; }
        if (ig.game.player.currentPath === 'Left') { this.flip = true; this.vel.x = -175; }


    },
    reset: function (x, y, settings) {


        this.parent(x, y, settings);
        this.anims.idle.rewind();
        this.delayTimer.set(1.5);
        this.doneDamage = false;
        if (ig.game.SOUNDON) {
            var sound = new ig.Sound('media/Music/WaveSound.m4a');
            sound.play();
        }

        if (ig.game.player.currentPath === 'Right') { this.flip = false; this.vel.x = 175; }
        if (ig.game.player.currentPath === 'Left') { this.flip = true; this.vel.x = -175; }


    },
    handleMovementTrace: function (res) {
        this.parent(res);

        if (res.collision.x || res.collision.y) {

            this.kill();

        }




    },
    kill: function () {
        this.parent();

        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 6 });
    },
    update: function () {





        this.parent();
        if (this.delayTimer.delta() > 0) { this.kill(); }
        this.currentAnim.flip.x = this.flip;
    },

    check: function (other) {


        if (other.ShockWavedoneDamage == false && ig.game.player) {

            if (ig.game.SOUNDON) {
                var sound = new ig.Sound('media/Music/BloodSplat.m4a');
                sound.play();
            }


            other.ShockWavedoneDamage = true;
            var damage = (0.5 * ig.game.player.ATK)  + (0.5 * ig.game.player.MATK) + ig.game.player.STR * 0.5;

            ig.game.CalculateDamage(ig.game.player, damage, other, function (data) {

                other.receiveDamage(data, this);
            }, false, this.type, this.name, this, this.canDuplicate);




        }
    }
});
EntityDreadWave = ig.Entity.extend({



    size: { x: 12, y: 12 },
    offset: { x: 10, y: 10 },
    maxVel: { x: 350, y: 0 },
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.B,
    collides: ig.Entity.COLLIDES.NONE,
    type: "MIXED",
    name: 'EntityDreadWave',
    flip: true,

    doneDamage: false,
    delayTimer: null,


    firstRound: true,

    goingRight: false,
    goingLeft: false,

    canDuplicate: false,






    init: function (x, y, settings) {


        this.parent(x, y, settings);
        this.animSheet = new ig.AnimationSheet('media/AttackAnimation/DreadWave.png', 32, 32);
        this.addAnim('idle', 0.05, [0, 1, 2, 3, 3, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 5, 4, 5, 4, 5]);

        //this.addAnim('idle',1, [5]);
        this.delayTimer = new ig.Timer();
        this.delayTimer.set(1.5);
        this.doneDamage = false;
        if (ig.game.SOUNDON) {
            var sound = new ig.Sound('media/Music/WaveSound.m4a');
            sound.play();
        }

        if (ig.game.player.currentPath === 'Right') { this.flip = false; this.vel.x = 175; }
        if (ig.game.player.currentPath === 'Left') { this.flip = true; this.vel.x = -175; }


    },
    reset: function (x, y, settings) {


        this.parent(x, y, settings);
        this.anims.idle.rewind();
        this.delayTimer.set(1.5);
        this.doneDamage = false;
        if (ig.game.SOUNDON) {
            var sound = new ig.Sound('media/Music/WaveSound.m4a');
            sound.play();
        }

        if (ig.game.player.currentPath === 'Right') { this.flip = false; this.vel.x = 175; }
        if (ig.game.player.currentPath === 'Left') { this.flip = true; this.vel.x = -175; }


    },
    handleMovementTrace: function (res) {
        this.parent(res);

        if (res.collision.x || res.collision.y) {

            this.kill();

        }




    },
    kill: function () {
        this.parent();

        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 6 });
    },
    update: function () {





        this.parent();
        if (this.delayTimer.delta() > 0) { this.kill(); }
        this.currentAnim.flip.x = this.flip;
    },

    check: function (other) {


        if (other.ShockWavedoneDamage == false && ig.game.player) {

            if (ig.game.SOUNDON) {
                var sound = new ig.Sound('media/Music/BloodSplat.m4a');
                sound.play();
            }


            other.ShockWavedoneDamage = true;
            var damage = (0.75 * ig.game.player.ATK) + (0.75 * ig.game.player.MATK) + ig.game.player.STR * 0.5;

            ig.game.CalculateDamage(ig.game.player, damage, other, function (data) {

                other.receiveDamage(data, this);
            }, false, this.type, this.name, this, this.canDuplicate);




        }
    }
});
EntityShockpulse = ig.Entity.extend({



    size: { x: 12, y: 12 },
    offset: { x: 10, y: 10 },
    maxVel: { x: 350, y: 0 },
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.B,
    collides: ig.Entity.COLLIDES.NONE,
    type: "PHYSICAL",
    name: 'EntityShockpulse',
    flip: true,

    doneDamage: false,
    delayTimer: null,


    firstRound: true,

    goingRight: false,
    goingLeft: false,



    canDuplicate: false,




    init: function (x, y, settings) {


        this.parent(x, y, settings);
        this.animSheet = new ig.AnimationSheet('media/AttackAnimation/ShockWave.png', 32, 32);
        this.addAnim('idle', 0.05, [0, 1, 2, 3, 3, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 4, 5, 5, 4, 5, 4, 5]);

        //this.addAnim('idle',1, [5]);
        this.delayTimer = new ig.Timer();
        this.delayTimer.set(1.5);
        this.doneDamage = false;
        if (ig.game.SOUNDON) {
            var sound = new ig.Sound('media/Music/WaveSound.m4a');
            sound.play();
        }

        if (this.flip) { this.vel.x = -175; }
        else { this.vel.x = 175; }
      


    },
    reset: function (x, y, settings) {


        this.parent(x, y, settings);
        this.anims.idle.rewind();
        this.delayTimer.set(1.5);
        this.doneDamage = false;
        if (ig.game.SOUNDON) {
            var sound = new ig.Sound('media/Music/WaveSound.m4a');
            sound.play();
        }
        if (this.flip) { this.vel.x = -175; }
        else { this.vel.x = 175; }


    },
    handleMovementTrace: function (res) {
        this.parent(res);

        if (res.collision.x ) {

            

        }




    },
    kill: function () {
        this.parent();

        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 3 });
    },
    update: function () {





        this.parent();
        if (this.delayTimer.delta() > 0) { this.kill(); }
        this.currentAnim.flip.x = this.flip;
    },

    check: function (other) {


        if (other.ShockWavedoneDamage == false && ig.game.player) {

            if (ig.game.SOUNDON) {
                var sound = new ig.Sound('media/Music/BloodSplat.m4a');
                sound.play();
            }


            other.ShockWavedoneDamage = true;
            var damage = 0.8 * ig.game.player.ATK + ig.game.player.STR * 0.5;

            ig.game.CalculateDamage(ig.game.player, damage, other, function (data) {

                other.receiveDamage(data, this);
            }, false, this.type, this.name, this,this.canDuplicate);




        }
    }
});

	


	EntityFireBlast = ig.Entity.extend({



		size: { x: 14, y: 8 },
		offset: { x: 0, y: 4 },
		maxVel: { x: 500, y: 0 },
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.NONE,

		name: 'EntityFireBlast',
		flip: true,

		doneDamage: false,
		delayTimer: null,


		firstRound: true,
        canDuplicate: false,
		goingRight: false,
		goingLeft: false,

        type: "MAGIC",






		init: function (x, y, settings) {


			this.parent(x, y, settings);
			this.animSheet = new ig.AnimationSheet('media/AttackAnimation/Fireball.png', 16, 16);
			if(ig.game.player.weapon.SPECIAL["Green Fire"]){
			    this.addAnim('idle', 0.05, [6, 7, 8, 9, 10, 11, 9, 10, 11, 9, 10, 11, 9, 10, 11, 9, 10, 11, 9, 10, 11, 9, 10, 11, 9, 10, 11, 9, 10, 11]);
			}
			else{
			    this.addAnim('idle', 0.05, [0, 1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]);
			}
		

			
			this.delayTimer = new ig.Timer();
			this.delayTimer.set(1.5);
									  if(ig.game.SOUNDON){
									  var sound = new ig.Sound('media/Music/WaveSound.m4a');
									  sound.play();}
									  this.doneDamage = false;
									  if (this.flip) { this.vel.x = -175; }
									  else { this.vel.x = 175; }
			


		},
		reset: function (x, y, settings) {


			this.parent(x, y, settings);
			this.anims.idle.rewind();
			this.delayTimer.set(1.5);
			this.doneDamage = false;
									  if(ig.game.SOUNDON){
									  var sound = new ig.Sound('media/Music/WaveSound.m4a');
									  sound.play();}
									  if (this.flip) { this.vel.x = -175; }
									  else { this.vel.x = 175; }


		},
		kill: function () {
			this.parent();

			ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 5 });
		},
		update: function () {





			this.parent();
			if (this.delayTimer.delta() > 0|| 400 == this.distanceTo(ig.game.player)) { this.kill(); }
			this.currentAnim.flip.x = this.flip;
		},
		handleMovementTrace: function (res) {
			this.parent(res);

			if (res.collision.x || res.collision.y) {

				

				this.kill();

			}




		},
		check: function (other) {


		    if (this.doneDamage == false && ig.game.player) {

									  if(ig.game.SOUNDON){
									  var sound = new ig.Sound('media/Music/BloodSplat.m4a');
									  sound.play();}

									
									  this.doneDamage = true;
									  if(ig.game.player && ig.game.player.weapon.SPECIAL["Green Fire"] &&
                                          other.isWeakened === "healthy") this.isWeakened = "invoked";
				var damage = (ig.game.player.MATK * 1) + 15;
				ig.game.spawnEntity(EntityBurningEffect, this.pos.x,this.pos.y);
				ig.game.CalculateDamage(ig.game.player, damage, other, function (data) {
					
				 	other.receiveDamage(data, this); }, false, this.type, this.name, this, this.canDuplicate);
					this.kill();
				


			  }



		}

	});

	EntitySandMissile = ig.Entity.extend({



	    size: { x: 14, y: 8 },
	    offset: { x: 0, y: 4 },
	    maxVel: { x: 500, y: 0 },
	    type: ig.Entity.TYPE.NONE,
	    checkAgainst: ig.Entity.TYPE.B,
	    collides: ig.Entity.COLLIDES.NONE,

	    name: 'EntitySandMissile',
	    flip: true,

	    doneDamage: false,
	    delayTimer: null,


	    firstRound: true,

	    goingRight: false,
	    goingLeft: false,
	    type: "MAGIC",

	    canDuplicate: false,





	    init: function (x, y, settings) {


	        this.parent(x, y, settings);
	        this.animSheet = new ig.AnimationSheet('media/AttackAnimation/SandMissile.png', 16, 16);
	        this.addAnim('idle', 0.05, [0, 1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]);


	        this.delayTimer = new ig.Timer();
	        this.delayTimer.set(1.5);
	        if (ig.game.SOUNDON) {
	            var sound = new ig.Sound('media/Music/WaveSound.m4a');
	            sound.play();
	        }
	        this.doneDamage = false;
	        if (this.flip) { this.vel.x = -175; }
	        else { this.vel.x = 175; }



	    },
	    reset: function (x, y, settings) {


	        this.parent(x, y, settings);
	        this.anims.idle.rewind();
	        this.delayTimer.set(1.5);
	        this.doneDamage = false;
	        if (ig.game.SOUNDON) {
	            var sound = new ig.Sound('media/Music/WaveSound.m4a');
	            sound.play();
	        }
	        if (this.flip) { this.vel.x = -175; }
	        else { this.vel.x = 175; }



	    },
	    kill: function () {
	        this.parent();

	        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 5 });
	    },
	    update: function () {





	        this.parent();
	        if (this.delayTimer.delta() > 0 || 400 == this.distanceTo(ig.game.player)) { this.kill(); }
	        this.currentAnim.flip.x = this.flip;
	    },
	    handleMovementTrace: function (res) {
	        this.parent(res);

	        if (res.collision.x || res.collision.y) {



	            this.kill();

	        }




	    },
	    check: function (other) {


	        if (this.doneDamage == false && ig.game.player) {

	            if (ig.game.SOUNDON) {
	                var sound = new ig.Sound('media/Music/BloodSplat.m4a');
	                sound.play();
	            }


	            this.doneDamage = true;
	            var damage = (ig.game.player.MATK * 0.33) + 2;
	        
	            ig.game.CalculateDamage(ig.game.player, damage, other, function (data) {

	                other.receiveDamage(data, this);
	            }, false, this.type, this.name, this, this.canDuplicate);
	            this.kill();



	        }



	    }

	});
	
    //Burning Effect
    EntityBurningEffect = ig.Entity.extend({
            collides: ig.Entity.COLLIDES.NONE,


            size: { x: 20, y: 22 },
            offset: { x: 4, y: 0 },
            maxVel: { x: 0, y: 0 },
            type: ig.Entity.TYPE.NONE,
            checkAgainst: ig.Entity.TYPE.B,
            collides: ig.Entity.COLLIDES.NONE,

            name: 'EntityBurningEffect',
            flip: false,

            doneDamage: false,
            delayTimer: null,
            delayCollision: null,
            delayATKCD: null,

            CDtimerset: false,

       	
            canDuplicate: false,






            init: function (x, y, settings) {


                this.parent(x, y, settings);
             //   this.animSheet = new ig.AnimationSheet('media/AttackAnimation/FadeSlash.png', 32, 32);

               
                this.doneDamage = false;
            
                this.delayTimer = new ig.Timer();
                this.delayTimer.set(ig.game.player.AbilityCD);
           

            },
            reset: function (x, y, settings) {


                
                this.parent(x, y, settings);
                this.anims.idle.rewind();

            
                this.doneDamage = false;
                this.delayTimer.set(ig.game.player.AbilityCD);
            


            },

            update: function () {
                if (ig.game.player) {


                    this.parent();


                    if (ig.game.player.currentPath == 'Right') { this.flip = false; this.pos.x = ig.game.player.pos.x; }
                    if (ig.game.player.currentPath == 'Left') { this.flip = true; this.pos.x = ig.game.player.pos.x - 16;}
                    this.pos.y = ig.game.player.pos.y - 8;


                    if (this.delayTimer.delta() > 0) { this.kill(); }
              
                }
            },

            check: function (other) {


                if (this.doneDamage == false) {

                    this.doneDamage = true;
                   
                    other.IsBurning = true;
                    other.BurningDMG = Math.ceil(0.35 * ig.game.player.MATK);

                    var TalentAddition = 1;
                    other.resetBurn.set(4 * TalentAddition);
                    
                    


                }



            }

    });
    EntityCrazedFrenzyBuff = ig.Entity.extend({



        size: { x: 4, y: 4 },
        offset: { x: 0, y: 0 },
        maxVel: { x: 0, y: 0 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'EntityCrazedFrenzyBuff',
        type: "BUFF",
        flip: true,
        POWER: 1,
        doneDamage: false,
        delayTimer: null,


        firstRound: true,

        goingRight: false,
        goingLeft: false,


        STRb: 0,
        INTb: 0,
        AGIb: 0,




        giveBonus: function(){
            if (ig.game.player) {
                ig.game.player.DBLATKCHC += 5;
                
               
            }

        },
        init: function (x, y, settings) {


            this.parent(x, y, settings);
            ig.game.arrayOfBuffs.push(this);
            this.giveBonus();
            
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(5);



        },
        reset: function (x, y, settings) {


            this.parent(x, y, settings);
            ig.game.arrayOfBuffs.push(this);
            this.giveBonus();
            this.delayTimer.set(5);
            this.doneDamage = false;



        },
        kill: function () {
            if (ig.game.player) {
                ig.game.player.DBLATKCHC -= 5;
               
            }
            this.parent();

         
        },
        update: function () {





            this.parent();
          
            if (this.delayTimer.delta() > 0) {
                this.kill();
            }

        }
       

    });
    EntityDarkRageBuff = ig.Entity.extend({



        size: { x: 4, y: 4 },
        offset: { x: 0, y: 0 },
        maxVel: { x: 0, y: 0 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'EntityDarkRageBuff',
        type: "BUFF",
        flip: true,
        POWER: 1,
        doneDamage: false,
        delayTimer: null,


        firstRound: true,

        goingRight: false,
        goingLeft: false,


        STRb: 0,
        INTb: 0,
        AGIb: 0,




        giveBonus: function () {
            if (ig.game.player) {
               
                ig.game.player.STR += 3;
                ig.game.player.HP_REGEN += 2;


            }

        },
        init: function (x, y, settings) {


            this.parent(x, y, settings);
            ig.game.arrayOfBuffs.push(this);
            this.giveBonus();
          
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(5);



        },
        reset: function (x, y, settings) {


            this.parent(x, y, settings);
            ig.game.arrayOfBuffs.push(this);
            this.giveBonus();
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(5);
            



        },
        kill: function () {
            if (ig.game.player) {
                ig.game.player.STR -= 3;
                ig.game.player.HP_REGEN -= 2;
                //ig.game.CalculateStats();
            }
            this.parent();


        },
        update: function () {





            this.parent();

            if (this.delayTimer.delta() > 0) {
                this.kill();
            }

        }


    });
    EntityDemonStrengthBuff = ig.Entity.extend({



        size: { x: 4, y: 4 },
        offset: { x: 0, y: 0 },
        maxVel: { x: 0, y: 0 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'EntityDemonStrengthBuff',
        type: "BUFF",
        flip: true,
        POWER: 1,
        doneDamage: false,
        delayTimer: null,


        firstRound: true,

        goingRight: false,
        goingLeft: false,


        STRb: 0,
        INTb: 0,
        AGIb: 0,




        giveBonus: function () {
            if (ig.game.player) {

                this.STRb = 1 * ig.game.player.DEMON_DEMONSTRENGTH_LEVEL;
                ig.game.player.STR += this.STRb;
             


            }

        },
        init: function (x, y, settings) {


            this.parent(x, y, settings);
            ig.game.arrayOfBuffs.push(this);
            this.giveBonus();

            this.delayTimer = new ig.Timer();
            this.delayTimer.set(5);



        },
        reset: function (x, y, settings) {


            this.parent(x, y, settings);
            ig.game.arrayOfBuffs.push(this);
            this.giveBonus();
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(5);




        },
        kill: function () {
            if (ig.game.player) {
                ig.game.player.STR -= this.STRb;
              
                //ig.game.CalculateStats();
            }
            this.parent();


        },
        update: function () {





            this.parent();

            if (this.delayTimer.delta() > 0) {
                this.kill();
            }

        }


    });
    EntityArcaneDevotionBuff = ig.Entity.extend({



        size: { x: 4, y: 4 },
        offset: { x: 0, y: 0 },
        maxVel: { x: 0, y: 0 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'EntityArcaneDevotionBuff',
        type: "BUFF",
        flip: true,
        POWER: 1,
        doneDamage: false,
        delayTimer: null,


        firstRound: true,

        goingRight: false,
        goingLeft: false,


        STRb: 0,
        INTb: 0,
        AGIb: 0,




        giveBonus: function () {
            if (ig.game.player) {
                player.MANA_REGEN += 2;
             
            }

        },
        init: function (x, y, settings) {


            this.parent(x, y, settings);
            ig.game.arrayOfBuffs.push(this);
            this.giveBonus();

            this.delayTimer = new ig.Timer();
            this.delayTimer.set(5);



        },
        reset: function (x, y, settings) {


            this.parent(x, y, settings);
            ig.game.arrayOfBuffs.push(this);
            this.giveBonus();
            this.delayTimer.set(5);
            this.doneDamage = false;



        },
        kill: function () {
            if (ig.game.player) {
                player.MANA_REGEN -= 2;
               
            }
            this.parent();


        },
        update: function () {





            this.parent();

            if (this.delayTimer.delta() > 0) {
                this.kill();
            }

        }


    });

    EntitySecondWind = ig.Entity.extend({



        size: { x: 4, y: 4 },
        offset: { x: 0, y: 0 },
        maxVel: { x: 0, y: 0 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'EntitySecondWind',
        type: "BUFF",
        flip: true,
        POWER: 1,
        doneDamage: false,
        delayTimer: null,

        RegIncrease: 0,
        firstRound: true,

        goingRight: false,
        goingLeft: false,

        giveBonus: function () {
            if (ig.game.player) {
                this.RegIncrease = player.HP_REGEN * 0.33;
                player.HP_REGEN += this.RegIncrease;

            }

        },
        init: function (x, y, settings) {


            this.parent(x, y, settings);

            this.giveBonus();

            this.delayTimer = new ig.Timer();
            this.delayTimer.set(5);



        },
        reset: function (x, y, settings) {


            this.parent(x, y, settings);

            this.giveBonus();
            this.delayTimer.set(5);
            this.doneDamage = false;



        },
        kill: function () {
            if (ig.game.player) {
                player.HP_REGEN -= this.RegIncrease;

            }
            this.parent();


        },
        update: function () {





            this.parent();

            if (this.delayTimer.delta() > 0) {
                this.kill();
            }

        }


    });
    EntityGreenGlimmerBuff = ig.Entity.extend({



        size: { x: 4, y: 4 },
        offset: { x: 0, y: 0 },
        maxVel: { x: 0, y: 0 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'EntityGreenGlimmerBuff',
        type: "BUFF",
        flip: true,
        POWER: 1,
        doneDamage: false,
        delayTimer: null,

        RegIncrease: 0,
        firstRound: true,

        goingRight: false,
        goingLeft: false,

        giveBonus: function () {
            if (ig.game.player) {
                this.RegIncrease = player.HP_REGEN * 0.20;
                player.HP_REGEN += this.RegIncrease;

            }

        },
        init: function (x, y, settings) {


            this.parent(x, y, settings);
            ig.game.arrayOfBuffs.push(this);
            this.giveBonus();

            this.delayTimer = new ig.Timer();
            this.delayTimer.set(2);



        },
        reset: function (x, y, settings) {


            this.parent(x, y, settings);
            ig.game.arrayOfBuffs.push(this);
            this.giveBonus();
            this.delayTimer.set(2);
            this.doneDamage = false;



        },
        kill: function () {
            if (ig.game.player) {
                player.HP_REGEN -= this.RegIncrease;

            }
            this.parent();


        },
        update: function () {





            this.parent();

            if (this.delayTimer.delta() > 0) {
                this.kill();
            }

        }


    });
    EntityFuriousBlocksBuff = ig.Entity.extend({



        size: { x: 4, y: 4 },
        offset: { x: 0, y: 0 },
        maxVel: { x: 0, y: 0 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'EntityFuriousBlocksBuff',
        type: "BUFF",
        flip: true,
        POWER: 1,
        doneDamage: false,
        delayTimer: null,


        firstRound: true,

        goingRight: false,
        goingLeft: false,
        giveBonus: function () {
            if (ig.game.player) {
             
                ig.game.player.CRIT += 5;
                ig.game.player.MCRIT += 5;
               
            }

        },
        init: function (x, y, settings) {


            this.parent(x, y, settings);
            ig.game.arrayOfBuffs.push(this);
            this.giveBonus();

            this.delayTimer = new ig.Timer();
            this.delayTimer.set(5);



        },
        reset: function (x, y, settings) {


            this.parent(x, y, settings);
            ig.game.arrayOfBuffs.push(this);
            this.giveBonus();
            this.delayTimer.set(5);
            this.doneDamage = false;



        },
        kill: function () {
            if (ig.game.player) {
                ig.game.player.CRIT -= 5;
                ig.game.player.MCRIT -= 5;
            }
            this.parent();


        },
        update: function () {





            this.parent();

            if (this.delayTimer.delta() > 0) {
                this.kill();
            }

        }


    });
    EntityBloodlustBuff = ig.Entity.extend({



        size: { x: 4, y: 4 },
        offset: { x: 0, y: 0 },
        maxVel: { x: 0, y: 0 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'EntityBloodlustBuff',
        type: "BUFF",
        flip: true,
        POWER: 1,
        doneDamage: false,
        delayTimer: null,


        firstRound: true,
        STRb: 0,
        AGIb: 0,
        goingRight: false,
        goingLeft: false,
        giveBonus: function () {
           
            if (ig.game.player) {
                var modVal = ((ig.game.player.BLADE_BLOODLUST_LEVEL *2))
                if (ig.game.player.weapon.SPECIAL["Crazed Lust"]) modVal *= 2;
                this.STRb = modVal;
                this.AGIb = modVal;
               
                ig.game.player.STR += this.STRb;
                ig.game.player.AGI += this.AGIb;
             
              //  ig.game.equipmentChanged();
            }

        },
        init: function (x, y, settings) {

            
            this.parent(x, y, settings);
            ig.game.arrayOfBuffs.push(this);
            this.giveBonus();
            var timer = 5;
            if (ig.game.player.weapon.SPECIAL["Crazed Lust"]) timer = 4;
            this.delayTimer = new ig.Timer();
            this.delayTimer.set(timer);



        },
        reset: function (x, y, settings) {

           
            this.parent(x, y, settings);
            ig.game.arrayOfBuffs.push(this);
            this.giveBonus();
            var timer = 5;
            if (ig.game.player.weapon.SPECIAL["Crazed Lust"]) timer = 4;
            this.delayTimer.set(timer);
            this.doneDamage = false;



        },
        kill: function () {
            if (ig.game.player) {
               
             
                ig.game.player.STR -= this.STRb;
                ig.game.player.AGI -= this.AGIb;
          
                
            }
            this.parent();


        },
        update: function () {





            this.parent();

            if (this.delayTimer.delta() > 0) {
                this.kill();
            }

        }


    });
   


    EntityGreatWallBuff = ig.Entity.extend({



        size: { x: 4, y: 4 },
        offset: { x: 0, y: 0 },
        maxVel: { x: 0, y: 0 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'EntityGreatWallBuff',
        type: "BUFF",
        flip: true,
        POWER: 1,
        doneDamage: false,
        delayTimer: null,


        firstRound: true,
        
        changeBLK: 0,
        goingRight: false,
        goingLeft: false,
        giveBonus: function () {
            if (ig.game.player) {
                this.oldBLK = ig.game.player.BLK;
                ig.game.player.BLK += this.oldBLK;
               

            }

        },
        init: function (x, y, settings) {


            this.parent(x, y, settings);
            ig.game.arrayOfBuffs.push(this);
            this.giveBonus();

            this.delayTimer = new ig.Timer();
            this.delayTimer.set(5);



        },
        reset: function (x, y, settings) {


            this.parent(x, y, settings);
            ig.game.arrayOfBuffs.push(this);
            this.giveBonus();
            this.delayTimer.set(5);
            this.doneDamage = false;



        },
        kill: function () {
            if (ig.game.player) {
                ig.game.player.BLK -= this.oldBLK;
            }
            this.parent();


        },
        update: function () {





            this.parent();

            if (this.delayTimer.delta() > 0) {
                this.kill();
            }

        }


    });
    EntityDemonPowerBuff = ig.Entity.extend({



        size: { x: 4, y: 4 },
        offset: { x: 0, y: 0 },
        maxVel: { x: 0, y: 0 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'EntityDemonPowerBuff',
        type: "BUFF",
        flip: true,
        POWER: 1,
        doneDamage: false,
        delayTimer: null,

        STRb : 0,
        INTb: 0,
        AGIb: 0,

        firstRound: true,

        changeBLK: 0,
        goingRight: false,
        goingLeft: false,
        giveBonus: function () {
            if (ig.game.player) {
                this.STRb = ig.game.player.STR * 0.4;
                this.INTb = ig.game.player.INT * 0.4;
                this.AGIb = ig.game.player.AGI * 0.4;
 
                ig.game.player.STR += this.STRb;
                ig.game.player.INT += this.INTb;
                ig.game.player.AGI += this.AGIb;

            }

        },
        init: function (x, y, settings) {


            this.parent(x, y, settings);
            ig.game.arrayOfBuffs.push(this);
            this.giveBonus();

            this.delayTimer = new ig.Timer();
            this.delayTimer.set(5);



        },
        reset: function (x, y, settings) {


            this.parent(x, y, settings);
            ig.game.arrayOfBuffs.push(this);
            this.giveBonus();
            this.delayTimer.set(5);
            this.doneDamage = false;



        },
        kill: function () {
            if (ig.game.player) {

                ig.game.player.STR -= this.STRb;
                ig.game.player.INT -= this.INTb;
                ig.game.player.AGI -= this.AGIb;
            }
            this.parent();


        },
        update: function () {





            this.parent();

            if (this.delayTimer.delta() > 0) {
                this.kill();
            }

        }


    });
    EntityZealPowerBuff = ig.Entity.extend({



        size: { x: 4, y: 4 },
        offset: { x: 0, y: 0 },
        maxVel: { x: 0, y: 0 },
        type: ig.Entity.TYPE.NONE,
        checkAgainst: ig.Entity.TYPE.B,
        collides: ig.Entity.COLLIDES.NONE,

        name: 'EntityZealPowerBuff',
        type: "BUFF",
        flip: true,
        POWER: 1,
        doneDamage: false,
        delayTimer: null,

       

        firstRound: true,

        changeBLK: 0,
        goingRight: false,
        goingLeft: false,
        giveBonus: function () {
            if (ig.game.player) {
                ig.game.player.LIFE_LIFESLASH_CHANCE += 25;
            

           

            }

        },
        init: function (x, y, settings) {


            this.parent(x, y, settings);
            ig.game.arrayOfBuffs.push(this);
            this.giveBonus();

            this.delayTimer = new ig.Timer();
            this.delayTimer.set(5);



        },
        reset: function (x, y, settings) {


            this.parent(x, y, settings);
            ig.game.arrayOfBuffs.push(this);
            this.giveBonus();
            this.delayTimer.set(5);
            this.doneDamage = false;



        },
        kill: function () {
            if (ig.game.player) {

                ig.game.player.LIFE_LIFESLASH_CHANCE -= 25;
            }
            this.parent();


        },
        update: function () {





            this.parent();

            if (this.delayTimer.delta() > 0) {
                this.kill();
            }

        }


    });
EntityFireExplosion = ig.Entity.extend({



		size: { x: 32, y: 32 },
		offset: { x: 0, y: 0 },
		maxVel: { x: 500, y: 0 },
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.NONE,

		name: 'EntityFireExplosion',
		type: "MAGIC",
		flip: true,
		power: 10,
		doneDamage: false,
		delayTimer: null,


		firstRound: true,

		goingRight: false,
		goingLeft: false,

		canDuplicate: false,






		init: function (x, y, settings) {


			this.parent(x, y, settings);
			this.animSheet = new ig.AnimationSheet('media/AttackAnimation/Explosion.png', 32, 32);
			this.addAnim('idle', 0.05, [0, 1, 2, 3]);

			
			this.delayTimer = new ig.Timer();
			this.delayTimer.set(0.2);
			


		},
		reset: function (x, y, settings) {


			this.parent(x, y, settings);
			this.anims.idle.rewind();
			this.delayTimer.set(0.2);
			this.doneDamage = false;
		


		},
		kill: function () {
			this.parent();

			ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 5 });
		},
		update: function () {





			this.parent();
			if(this.currentAnim.alpha-0.05 <= 0){this.kill();}
			if (this.delayTimer.delta() > 0){
				this.currentAnim.alpha -= 0.05;
				this.currentAnim.gotoFrame(3);
			}
			
		},
		handleMovementTrace: function (res) {
			this.parent(res);

			




		},
		check: function (other) {


		    if(this.doneDamage === false && ig.game.player){
		    this.doneDamage = true;
			
		    var damage = (ig.game.player.MATK * 1.5)  +  10;
		
		    ig.game.CalculateDamage(ig.game.player, damage, other, function (data) {

		        other.receiveDamage(data, this);
		    }, false, this.type, this.name, this,this.canDuplicate);

		    ig.game.spawnEntity(EntityBurningEffect, this.pos.x, this.pos.y);
		    
		  
		    }
	


			  

			


		}

	});
EntityFlameSlashEffect = ig.Entity.extend({



    size: { x: 16, y: 16 },
    offset: { x: 8, y: 8 },
    maxVel: { x: 0, y: 0 },
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.B,
    collides: ig.Entity.COLLIDES.NONE,

    name: 'EntityFlameSlashEffect',
    type: "MAGIC",
    flip: true,
    power: 20,
    doneDamage: false,
    delayTimer: null,


    firstRound: true,

    goingRight: false,
    goingLeft: false,

    canDuplicate: false,






    init: function (x, y, settings) {


        this.parent(x, y, settings);
  
        this.animSheet = new ig.AnimationSheet('media/AttackAnimation/FadeSlash.png', 32, 32);
        this.addAnim('idle', 0.1, [0, 1, 2, 3,4,5],true);
        this.anims.idle.rewind();

        this.delayTimer = new ig.Timer();
        this.delayTimer.set(0.6);



    },
    reset: function (x, y, settings) {


        this.parent(x, y, settings);
  
        this.animSheet = new ig.AnimationSheet('media/AttackAnimation/FadeSlash.png', 32, 32);
        this.addAnim('idle', 0.1, [0, 1, 2, 3, 4, 5], true);
        this.anims.idle.rewind();
        this.delayTimer.set(0.6);
        this.doneDamage = false;



    },
    kill: function () {
        this.parent();

        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 5 });
    },
    update: function () {





        this.parent();
    
        if (this.delayTimer.delta() > 0) {
            this.kill();
          
        }

    },
    handleMovementTrace: function (res) {
        this.parent(res);






    },
    check: function (other) {


        if (this.doneDamage === false && ig.game.player) {
            this.doneDamage = true;

            var damage = (ig.game.player.STR*0.3  + ig.game.player.INT*0.3) + this.power;

            ig.game.CalculateDamage(ig.game.player, damage, other, function (data) {

                other.receiveDamage(data, this);
            }, false, this.type, this.name, this,this.canDuplicate);

            ig.game.spawnEntity(EntityBurningEffect, this.pos.x, this.pos.y);


        }








    }

});
EntityFrostball = ig.Entity.extend({



		size: { x: 14, y: 11 },
		offset: { x: 0, y: 3 },
		maxVel: { x: 500, y: 0 },
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.NONE,

		name: 'EntityFrostball',
		flip: true,
		type: "MAGIC",
		doneDamage: false,
		delayTimer: null,


		firstRound: true,

		goingRight: false,
		goingLeft: false,


		canDuplicate: false,





		init: function (x, y, settings) {


			this.parent(x, y, settings);
			this.animSheet = new ig.AnimationSheet('media/AttackAnimation/Frostball.png', 16, 16);
			this.addAnim('idle', 0.05, [0, 1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]);

			
			this.delayTimer = new ig.Timer();
			this.delayTimer.set(1.5);
									  if(ig.game.SOUNDON){
									  var sound = new ig.Sound('media/Music/WaveSound.m4a');
									  sound.play();}
									  this.doneDamage = false;
									  if (this.flip) { this.vel.x = -175; }
									  else { this.vel.x = 175; }



		},
		reset: function (x, y, settings) {


			this.parent(x, y, settings);
			this.anims.idle.rewind();
			this.delayTimer.set(1.5);
			this.doneDamage = false;
									  if(ig.game.SOUNDON){
									  var sound = new ig.Sound('media/Music/WaveSound.m4a');
									  sound.play();}
									  if (this.flip) { this.vel.x = -175; }
									  else { this.vel.x = 175; }



		},
		kill: function () {
			this.parent();

			ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 5 });
		},
		update: function () {





			this.parent();
			if (this.delayTimer.delta() > 0|| 400 == this.distanceTo(ig.game.player)) { this.kill(); }
			this.currentAnim.flip.x = this.flip;
		},
		handleMovementTrace: function (res) {
			this.parent(res);

			if (res.collision.x || res.collision.y) {

				this.kill();

			}




		},
		check: function (other) {


		    if (this.doneDamage == false && ig.game.player) {

									  if(ig.game.SOUNDON){
									  var sound = new ig.Sound('media/Music/BloodSplat.m4a');
									  sound.play();}



				this.doneDamage = true;
				other.chilled = true;
				
				var damage = (ig.game.player.MATK * 0.75 ) + 10;
				
				ig.game.CalculateDamage(ig.game.player, damage, other, function (data) {
					
				 	other.receiveDamage(data, this); }, false, this.type,this.name, this,this.canDuplicate);
					this.kill();
				


			  }



		}

});
EntityFrostFire = ig.Entity.extend({



    size: { x: 14, y: 11 },
    offset: { x: 0, y: 3 },
    maxVel: { x: 500, y: 0 },
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.B,
    collides: ig.Entity.COLLIDES.NONE,

    name: 'EntityFrostFire',
    flip: true,
    type: "MAGIC",
    doneDamage: false,
    delayTimer: null,


    firstRound: true,

    goingRight: false,
    goingLeft: false,




    canDuplicate: false,



    init: function (x, y, settings) {


        this.parent(x, y, settings);
        this.animSheet = new ig.AnimationSheet('media/AttackAnimation/FrostFireBall.png', 16, 16);
        this.addAnim('idle', 0.05, [0, 1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]);


        this.delayTimer = new ig.Timer();
        this.delayTimer.set(1.5);
        if (ig.game.SOUNDON) {
            var sound = new ig.Sound('media/Music/WaveSound.m4a');
            sound.play();
        }
        this.doneDamage = false;
        if (this.flip) { this.vel.x = -175; }
        else { this.vel.x = 175; }



    },
    reset: function (x, y, settings) {


        this.parent(x, y, settings);
        this.anims.idle.rewind();
        this.delayTimer.set(1.5);
        this.doneDamage = false;
        if (ig.game.SOUNDON) {
            var sound = new ig.Sound('media/Music/WaveSound.m4a');
            sound.play();
        }
        if (this.flip) { this.vel.x = -175; }
        else { this.vel.x = 175; }



    },
    kill: function () {
        this.parent();

        ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 5 });
    },
    update: function () {





        this.parent();
        if (this.delayTimer.delta() > 0 || 400 == this.distanceTo(ig.game.player)) { this.kill(); }
        this.currentAnim.flip.x = this.flip;
    },
    handleMovementTrace: function (res) {
        this.parent(res);

        if (res.collision.x || res.collision.y) {

            this.kill();

        }




    },
    check: function (other) {


        if (this.doneDamage == false && ig.game.player) {

            if (ig.game.SOUNDON) {
                var sound = new ig.Sound('media/Music/BloodSplat.m4a');
                sound.play();
            }



            this.doneDamage = true;
            other.chilled = true;
            var damage = (ig.game.player.MATK * 1);
            ig.game.spawnEntity(EntityBurningEffect, this.pos.x, this.pos.y);
            ig.game.CalculateDamage(ig.game.player, damage, other, function (data) {

                other.receiveDamage(data, this);
            }, false, this.type, this.name, this,this.canDuplicate);
            this.kill();



        }



    }

});
EntityArcaneBall = ig.Entity.extend({



		size: { x: 14, y: 11 },
		offset: { x: 0, y: 3 },
		maxVel: { x: 500, y: 0 },
		type: ig.Entity.TYPE.NONE,
		checkAgainst: ig.Entity.TYPE.B,
		collides: ig.Entity.COLLIDES.NONE,

		name: 'EntityArcaneBall',
		flip: true,
		type: "MAGIC",
		doneDamage: false,
		delayTimer: null,


		firstRound: true,

		goingRight: false,
		goingLeft: false,
		canDuplicate: false,







		init: function (x, y, settings) {


			this.parent(x, y, settings);
			this.animSheet = new ig.AnimationSheet('media/AttackAnimation/ArcaneBall.png',32, 32);
			if(ig.game.player.shield.SPECIAL["Dark Matter"]){
			    this.addAnim('idle', 0.05, [6, 7, 8, 9, 10, 11, 9, 10, 11, 9, 10, 11, 9, 10, 11, 9, 10, 11, 9, 10, 11, 9, 10, 11, 9, 10, 11, 9, 10, 11]);
			}
			else{
			    this.addAnim('idle', 0.05, [0, 1, 2, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5, 3, 4, 5]);
			}
			

			
			this.delayTimer = new ig.Timer();
			this.delayTimer.set(1.5);
									  if(ig.game.SOUNDON){
									  var sound = new ig.Sound('media/Music/WaveSound.m4a');
									  sound.play();}
									  this.doneDamage = false;
									  if (this.flip) { this.vel.x = -175; }
									  else { this.vel.x = 175; }



		},
		reset: function (x, y, settings) {


			this.parent(x, y, settings);
			this.anims.idle.rewind();
			this.delayTimer.set(1.5);
			this.doneDamage = false;
									  if(ig.game.SOUNDON){
									  var sound = new ig.Sound('media/Music/WaveSound.m4a');
									  sound.play();}
									  if (this.flip) { this.vel.x = -175; }
									  else { this.vel.x = 175; }



		},
		kill: function () {
			this.parent();

			ig.game.spawnEntity(EntityDeathExplosion, this.pos.x, this.pos.y, { colorOffset: 5 });
		},
		update: function () {





			this.parent();
			if (this.delayTimer.delta() > 0|| 400 == this.distanceTo(ig.game.player)) { this.kill(); }
			this.currentAnim.flip.x = this.flip;
		},
		
		check: function (other) {


			if (this.doneDamage == false && ig.game.player) {

									  if(ig.game.SOUNDON){
									  var sound = new ig.Sound('media/Music/BloodSplat.m4a');
									  sound.play();}


               
				this.doneDamage = true;
				var damage = (ig.game.player.INT * 1) + ig.game.player.MATK * 1;
				
				ig.game.CalculateDamage(ig.game.player, damage, other, function (data) {
					
				    other.receiveDamage(data, this);
				}, false, this.type, this.name, this, this.canDuplicate);
				
				


			  }



		}

});
EntityPlayerSingularity = ig.Entity.extend({



    size: { x: 16, y: 16 },
    offset: { x: 8, y: 8 },
    maxVel: { x: 250, y:0 },
    type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.B,
    collides: ig.Entity.COLLIDES.NONE,
    animSheet: new ig.AnimationSheet('media/AttackAnimation/singularity.png', 32, 32),
    name: 'PlayerSingularity',
    flip: true,
    type: "MAGIC",
    doneDamage: false,
    delayTimer: null,
    delayTimer2: null,

    firstRound: true,
    flip: false,
    goingRight: false,
    goingLeft: false,

    searchDistance: 16,





    init: function (x, y, settings) {


        this.parent(x, y, settings);

        this.addAnim('idle', 0.1, [0, 1, 2, 3]);

        // Animation for the Enemy1

        this.delayTimer = new ig.Timer();
        this.delayTimer2 = new ig.Timer();
        this.delayTimer2.set(0.1);
        this.delayTimer.set(1.5);
        if (!this.flip) { this.vel.x = 100; }
        else { this.vel.x = -100; }






    },
    reset: function (x, y, settings) {


        this.parent(x, y, settings);



        this.delayTimer2.set(0.1);
        this.delayTimer.set(1.5);
        if (!this.flip) { this.vel.x = 100; }
        else{ this.vel.x = -100; }



 




    },
  
    update: function () {


        this.parent();
        if (this.delayTimer.delta() > 0) { this.kill(); }

/*
        for (var i = 0; i < ig.game.entities.length; i++) {
            if(ig.game.entities[i].name === "boss" ||
               ig.game.entities[i].name === "monster" ||
               ig.game.entities[i].name === "knight" ||
               ig.game.entities[i].name === "wizard") {

          
                if (this.distanceTo(ig.game.entities[i]) <= this.searchDistance) {

                //  ig.game.entities[i].accel.x = -5 * (Math.cos(this.angleTo(ig.game.entities[i])) * (Math.pow(this.searchDistance, 2) / this.distanceTo(ig.game.entities[i]) + 1));
                //  ig.game.entities[i].accel.y = -5 * (Math.sin(this.angleTo(ig.game.entities[i])) * (Math.pow(this.searchDistance, 2) / this.distanceTo(ig.game.entities[i]) + 1));

                }
            }
        }
        
        */

    },
    /*kill: function () {
        for (var i = 0; i < ig.game.entities.length; i++) {
            if (ig.game.entities[i].singularityAffection) {
                ig.game.entities[i].singularityAffection = false;
                ig.game.entities[i].accel.x = 0;
                ig.game.entities[i].accel.y = 0;
            }
        }
        ig.game.removeEntity(this);
    },*/
    check: function (other) {







        if (this.delayTimer2.delta() > 0) {
            other.singularityAffection = true;
            ig.game.checkDamage(other, this, 'MIXED', 15);
            this.delayTimer2.set(0.4);
        }





    }
});
	/*
	ig.EntityPool.enableFor(EntityLifeSlash);
	ig.EntityPool.enableFor(EntityDemonSlash);
	ig.EntityPool.enableFor(EntityLeechwave);

	ig.EntityPool.enableFor(EntityPlayerSlash);
	ig.EntityPool.enableFor(EntityShockwave);
	

	ig.EntityPool.enableFor(EntityFrostball);

	ig.EntityPool.enableFor(EntityFireball);*/
	

});