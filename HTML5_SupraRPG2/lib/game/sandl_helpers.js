 ig.module(
    'game.sandl_helpers'
)
.requires(
    
    
    'impact.game',
  'game.entities.player'
)
    .defines(function () {

 ig.Game.inject({

     createSave: function(){
         var player = ig.game.spawnEntity(EntityPlayer, 0, 0, { flip: ig.game.flip });
         ig.game.LoadStats(function () { ig.game.saveGame(null, null, ig.game.saveSlot); }, ig.game.saveSlot);
         player.kill(true);
     },
     saveDifficulty: function(number){
        
         if (number === 1) {
             bufferObject = JSON.parse(localStorage.getItem('SupraSave_1'));
           
         }
         else if (number === 2) {
             bufferObject = JSON.parse(localStorage.getItem('SupraSave_2'));
         }
         else if (number === 3) {
             bufferObject = JSON.parse(localStorage.getItem('SupraSave_3'));
         }
         bufferObject["difficultyLevel"] = difficultyLevel;
        // bufferObject["difficultyAvailable"] = difficultyAvailable;
         bufferObject["maxLevels"] = ig.game.maxLevels;
         if (number === 1) {
             localStorage.setItem('SupraSave_1', JSON.stringify(bufferObject));

         }
         else if (number === 1) {
             localStorage.setItem('SupraSave_2', JSON.stringify(bufferObject));
         }
         else if (number === 3) {
             localStorage.setItem('SupraSave_3', JSON.stringify(bufferObject));
         }
       
     },
     saveGame: function (data, player, number, dontSaveCoord) {
 	   
 	     //localStorage.clear();
 
 	     var save_player = null;
 	    // ig.game.clearStorage();
 	    
 	     if (player) {
 	    
 	         save_player = player;
 	     }
 	     else {
 	         save_player = ig.game.getEntityByName('player1');
 	     }
        
                if (save_player) {
                  
                  

                    
                   
                    var itemVal = function (item) {
                        this.bonusStats = item.bonusStats;
                        this.id = item.id;
                        this.isBossItem = item.isBossItem;
                        this.itemEquipped = item.itemEquipped;
                        this.itemName = item.itemName;
                        this.isShield = item.isShield;
                        this.isSword = item.isSword;
                        this.isArmor = item.isArmor;
                        this.itemType= item.itemType;
                        this.itemSubClass = item.itemSubClass;
                        this.itemTier = item.itemTier;
 	                    this.QualityLevel = item.QualityLevel;
 	                    this.QualityScale = item.QualityScale;
 	                    this.Attribute_1 = item.Attribute_1;
 	                    this.Attribute_2 = item.Attribute_2;
 	                    this.Attribute_3 = item.Attribute_3;
 	                    this.Attribute_4 = item.Attribute_4;

 	                    this.Max_Chance = item.Max_Chance;
 	                    this.Set_Zero = item.Set_Zero;
 	                    this.QUALITY_ICON = item.QUALITY_ICON;

 	                    this.HP = item.HP;
 	                    this.MP = item.MP;

 	                    this.STR = item.STR;
 	                    this.INT = item.INT;
 	                    this.AGI = item.AGI;

 	                    this.MATK = item.MATK;
 	                    this.HP_R = item.HP_R;
 	                    this.MP_R = item.MP_R;
 	                    this.ATK = item.ATK;

 	                    this.RES = item.RES;
 	                    this.M_RES = item.M_RES;

 	                    this.CRIT_CHANCE = item.CRIT_CHANCE;

 	                    this.CRIT_DAMAGE = item.CRIT_DAMAGE;
 	                    this.BLK = item.BLK;
 	                    this.VAMPIRIC = item.VAMPIRIC;
 	                    this.SPECIAL = item.SPECIAL;
 	                    this.description = item.description;

                    }
                    var bufX = 0;
                    var bufY = 0;
                    if (!dontSaveCoord) {
                        bufX = save_player.pos.x;

                        bufY = save_player.pos.y;
                    }
                    else
                    {
                     
                        var loadObject = null;
                        if (ig.game.saveSlot === 1) {
                            loadObject = JSON.parse(localStorage.getItem('SupraSave_1'));
                        }
                        else if (ig.game.saveSlot === 2) {
                            loadObject = JSON.parse(localStorage.getItem('SupraSave_2'));
                        }
                        else if (ig.game.saveSlot === 3) {
                            loadObject = JSON.parse(localStorage.getItem('SupraSave_3'));

                        }
                        if (loadObject) {
                            bufX = parseInt(loadObject['posX']);
                       
                            bufY = parseInt(loadObject['posY']);
                        }
              

                    }
                    var saveObject = {
                        savedDate: new Date(),
                        difficultyAvailable: difficultyAvailable,
                        difficultyLevel: difficultyLevel,
                        maxLevels: ig.game.maxLevels,
                        Level: ig.game.currentLevel,
                        posX: bufX,
                        posY: bufY,
                        difficulty: save_player.difficulty,
                        checkedAlready: ig.game.checkedAlready,
                        EXP: save_player.EXP,
                    
                        LEVEL: save_player.LEVEL,
                        skillSpheres: save_player.skillSpheres,
                   
                        CheckIfReview: 0,
                        mana: save_player.mana,
                        health: save_player.health,
                        BASE_HP: save_player.BASE_HP,
                        BASE_MP: save_player.BASE_MP,
                        weapon: new itemVal(save_player.weapon),
                        armor: new itemVal(save_player.armor),
                        shield: new itemVal(save_player.shield),

                        weapon_array: null,
                        shield_array: null,
                        armor_array: null,
                        gold: save_player.gold,
                        ironKey: save_player.ironKey,
                        currentActionSkill1: save_player.currentActionSkill1,
                        currentActionSkill2: save_player.currentActionSkill2,
                        currentAction1Manacost: save_player.currentAction1Manacost,
                        currentAction2Manacost: save_player.currentAction2Manacost,

                        killEvents: null,
                        chestEvents: null,
                   
                        skillEvents: null,

                        completeMeter: ig.game.completeMeter,
                        completeMeterAmount: ig.game.completeMeterAmount,
                        completeList: save_player.completeList,

                        clearLevel: save_player.clearLevel,
                        buttonScheme: ig.game.buttonScheme,

                        
                        CLASS: save_player.CLASS,

                        // BLADE - talents
                        BLADE_VIGOR: save_player.BLADE_VIGOR,
                        BLADE_FLURRY: save_player.BLADE_FLURRY,

                        BLADE_DOUBLEATTACK: save_player.BLADE_DOUBLEATTACK,
                        BLADE_SHOCKPULSE: save_player.BLADE_SHOCKPULSE,
                        BLADE_FRENZY: save_player.BLADE_FRENZY,

                        BLADE_ESCALATION: save_player.BLADE_ESCALATION,
                        BLADE_EXECUTE: save_player.BLADE_EXECUTE,
                        BLADE_BLOODLUST: save_player.BLADE_BLOODLUST,

                        BLADE_BIGPLAY: save_player.BLADE_BIGPLAY,
                        BLADE_SWORDSPECIALIST: save_player.BLADE_SWORDSPECIALIST,
                        BLADE_AXESPECIALIST: save_player.BLADE_AXESPECIALIST,

                        BLADE_PHANTOMSTRIKES: save_player.BLADE_PHANTOMSTRIKES,



                        LIFE_BURNINGHEART: save_player.LIFE_BURNINGHEART,
                        LIFE_LIFESPIRIT: save_player.LIFE_LIFESPIRIT,

                        LIFE_EMPOWEREDSLASH: save_player.LIFE_EMPOWEREDSLASH,
                        LIFE_CALMMIND: save_player.LIFE_CALMMIND,
                        LIFE_RADIANCE: save_player.LIFE_RADIANCE,

                        LIFE_HOLYBARRIER: save_player.LIFE_HOLYBARRIER,
                        LIFE_WALLOFJUSTICE: save_player.LIFE_WALLOFJUSTICE,
                        LIFE_RADIANTFURY: save_player.LIFE_RADIANTFURY,

                        LIFE_ZEAL: save_player.LIFE_ZEAL,
                        LIFE_BURNINGLIGHT: save_player.LIFE_BURNINGLIGHT,
                        LIFE_LASTSTAND: save_player.LIFE_LASTSTAND,

                        LIFE_HOLYSLASH: save_player.LIFE_HOLYSLASH,
		

                        // Spell - talents

                        SPELL_INTELLIGENCE: save_player.SPELL_INTELLIGENCE,
                        SPELL_FOCUS: save_player.SPELL_FOCUS,

                        SPELL_CRITICALRETURN: save_player.SPELL_CRITICALRETURN,
                        SPELL_FIREBLAST: save_player.SPELL_FIREBLAST,
                        SPELL_REPLENISHMENT: save_player.SPELL_REPLENISHMENT,

                        SPELL_DEMOLISH:save_player.SPELL_DEMOLISH,
                        SPELL_CRITICALCOMBO: save_player.SPELL_CRITICALCOMBO,

                        SPELL_ELEMENTALSYNERGY: save_player.SPELL_ELEMENTALSYNERGY,
                        SPELL_DEEPFREEZE: save_player.SPELL_DEEPFREEZE,
                        SPELL_FROSTFIRE: save_player.SPELL_FROSTFIRE,

                        SPELL_ARCANEBALL: save_player.SPELL_ARCANEBALL,


                        // Demon - talents

                        DEMON_DEMONICFORTITUDE : save_player.DEMON_DEMONICFORTITUDE ,
                        DEMON_VAMPIRISM : save_player.DEMON_VAMPIRISM ,

                        DEMON_DARKRAGE : save_player.DEMON_DARKRAGE ,
                        DEMON_MYSTICBARRIER : save_player.DEMON_MYSTICBARRIER ,

                        DEMON_DARKWAVE : save_player.DEMON_DARKWAVE ,
                        DEMON_SACRIFICIALDRIVE : save_player.DEMON_SACRIFICIALDRIVE ,
                        DEMON_EMPOWEREDDARKRAGE : save_player.DEMON_EMPOWEREDDARKRAGE ,

                        DEMON_DREADWAVE : save_player.DEMON_DREADWAVE ,
                        DEMON_DEMONBLOOD : save_player.DEMON_DEMONBLOOD ,
                        DEMON_DEMONSTRENGTH : save_player.DEMON_DEMONSTRENGTH ,

                        DEMON_DARKWILL : save_player.DEMON_DARKWILL ,

                        //TALENTS
                        BLADE_AMOUNT: save_player.BLADE_AMOUNT,
                        LIFE_AMOUNT: save_player.LIFE_AMOUNT,
                        SPELL_AMOUNT: save_player.SPELL_AMOUNT,
                        //RAGE
                        BLADE_VIGOR_LEVEL : save_player.BLADE_VIGOR_LEVEL,
                        BLADE_FLURRY_LEVEL: save_player.BLADE_FLURRY_LEVEL,

                        BLADE_DOUBLEATTACK_LEVEL: save_player.BLADE_DOUBLEATTACK_LEVEL,
                        BLADE_SHOCKPULSE_LEVEL: save_player.BLADE_SHOCKPULSE_LEVEL,
                        BLADE_FRENZY_LEVEL: save_player.BLADE_FRENZY_LEVEL,
	
		
                        BLADE_ESCALATION_LEVEL: save_player.BLADE_ESCALATION_LEVEL,
                        BLADE_EXECUTE_LEVEL: save_player.BLADE_EXECUTE_LEVEL,
                        BLADE_BLOODLUST_LEVEL: save_player.BLADE_BLOODLUST_LEVEL,

                        BLADE_BIGPLAY_LEVEL: save_player.BLADE_BIGPLAY_LEVEL,
                        BLADE_SWORDSPECIALIST_LEVEL: save_player.BLADE_SWORDSPECIALIST_LEVEL,
                        BLADE_AXESPECIALIST_LEVEL: save_player.BLADE_AXESPECIALIST_LEVEL,
		
                        BLADE_PHANTOMSTRIKES_LEVEL: save_player.BLADE_PHANTOMSTRIKES_LEVEL,


		

                        //MAGIC

                        SPELL_INTELLIGENCE_LEVEL : save_player.SPELL_INTELLIGENCE_LEVEL,
                        SPELL_FOCUS_LEVEL: save_player.SPELL_FOCUS_LEVEL,

                        SPELL_ENDLESSPOOL_LEVEL: save_player.SPELL_ENDLESSPOOL_LEVEL,
                        SPELL_FIRE_BLAST_LEVEL: save_player.SPELL_FIRE_BLAST_LEVEL,
	
                        SPELL_CRITICALRETURN_LEVEL: save_player.SPELL_CRITICALRETURN_LEVEL,

                        SPELL_DEMOLISH_LEVEL: save_player.SPELL_DEMOLISH_LEVEL,
                        SPELL_CRITICAL_COMBO_LEVEL: save_player.SPELL_CRITICAL_COMBO_LEVEL,

                        SPELL_ELEMENTALSYNERGY_LEVEL: save_player.SPELL_ELEMENTALSYNERGY_LEVEL,
                        SPELL_DEEPFREEZE_LEVEL: save_player.SPELL_DEEPFREEZE_LEVEL,
                        SPELL_FROSTFIRE_LEVEL: save_player.SPELL_FROSTFIRE_LEVEL,

                        SPELL_ARCANEBALL_LEVEL: save_player.SPELL_ARCANEBALL_LEVEL,

                        //LIFE

                        LIFE_BURNINGHEART_LEVEL: save_player.LIFE_BURNINGHEART_LEVEL,
                        LIFE_LIFESPIRIT_LEVEL: save_player.LIFE_LIFESPIRIT_LEVEL,

                        LIFE_EMPOWEREDSLASH_LEVEL: save_player.LIFE_EMPOWEREDSLASH_LEVEL,
                        LIFE_CALMMIND_LEVEL: save_player.LIFE_CALMMIND_LEVEL,
                        LIFE_RADIANCE_LEVEL: save_player.LIFE_RADIANCE_LEVEL,

                        LIFE_HOLYBARRIER_LEVEL: save_player.LIFE_HOLYBARRIER_LEVEL,
                        LIFE_WALLOFJUSTICE_LEVEL: save_player.LIFE_WALLOFJUSTICE_LEVEL,
                        LIFE_RADIANTFURY_LEVEL: save_player.LIFE_RADIANTFURY_LEVEL,

                        LIFE_ZEAL_LEVEL: save_player.LIFE_ZEAL_LEVEL,
                        LIFE_BURNINGLIGHT_LEVEL: save_player.LIFE_BURNINGLIGHT_LEVEL,
                        LIFE_LASTSTAND_LEVEL: save_player.LIFE_LASTSTAND_LEVEL,

                        LIFE_HOLYSLASH_LEVEL: save_player.LIFE_HOLYSLASH_LEVEL,

                        DEMON_DEMONICFORTITUDE_LEVEL: save_player.DEMON_DEMONICFORTITUDE_LEVEL,
                        DEMON_VAMPIRISM_LEVEL: save_player.DEMON_VAMPIRISM_LEVEL,

                        DEMON_DARKRAGE_LEVEL: save_player.DEMON_DARKRAGE_LEVEL,
                        DEMON_MYSTICBARRIER_LEVEL: save_player.DEMON_MYSTICBARRIER_LEVEL,

                        DEMON_DARKWAVE_LEVEL: save_player.DEMON_DARKWAVE_LEVEL,
                        DEMON_SACRIFICIALDRIVE_LEVEL: save_player.DEMON_SACRIFICIALDRIVE_LEVEL,
                        DEMON_EMPOWEREDDARKRAGE_LEVEL: save_player.DEMON_EMPOWEREDDARKRAGE_LEVEL,
                        
                        DEMON_DREADWAVE_LEVEL: save_player.DEMON_DREADWAVE_LEVEL,
                        DEMON_DEMONBLOOD_LEVEL: save_player.DEMON_DEMONBLOOD_LEVEL,
                        DEMON_DEMONSTRENGTH_LEVEL: save_player.DEMON_DEMONSTRENGTH_LEVEL,

                        DEMON_DARKWILL_LEVEL: save_player.DEMON_DARKWILL_LEVEL

                    };
                   
                    if (data) {
                        if (data.x_coord  && data.y_coord ) {
                            saveObject.posX = data.x_coord;
                            saveObject.posY = data.y_coord; 
                            
                        }

                        if (data.difficulty != null) {
                            saveObject.difficulty = data.difficulty;
                        }
                    }
                   
                   
                   
                  

                 

/*
                    if (save_player.weaponArray.length > 0) {
                        saveObject.weapon_array = ig.game.extractName(save_player.weaponArray);
                    }
                    if (save_player.shieldArray.length > 0) {
                        saveObject.shield_array = ig.game.extractName(save_player.shieldArray);
                    }
                    if (save_player.armorArray.length > 0) {
                        saveObject.armor_array = ig.game.extractName(save_player.armorArray);
                    }
*/
                    //Parse items to the array
                    var buffer_array = new Array();
                    for(var i = 0; i < save_player.weaponArray.length; i++){
                        buffer_array.push(new itemVal(save_player.weaponArray[i]));
                    }
                    saveObject.weapon_array = buffer_array;

                    buffer_array = new Array();
                    for(var i = 0; i < save_player.shieldArray.length; i++){
                        buffer_array.push(new itemVal(save_player.shieldArray[i]));
                    }
                    saveObject.shield_array = buffer_array;

                    buffer_array = new Array();
                    for(var i = 0; i < save_player.armorArray.length; i++){
                        buffer_array.push(new itemVal(save_player.armorArray[i]));
                    }
                    saveObject.armor_array = buffer_array;

                    buffer_array = null;
                    //Save current active skills
               
                   
                    //Save events

                    saveObject.killEvents = save_player.killEvents;
                    saveObject.chestEvents = save_player.chestEvents;
                    saveObject.skillEvents = save_player.skillEvents;
                  
                        if (ig.game.saveSlot === 1) localStorage.setItem('SupraSave_1', JSON.stringify(saveObject));
                        else if (ig.game.saveSlot === 2) localStorage.setItem('SupraSave_2', JSON.stringify(saveObject));
                        else if (ig.game.saveSlot === 3) localStorage.setItem('SupraSave_3', JSON.stringify(saveObject));
                    
                   
                    
                }



            },
 	        ConvertItems: function (item) {
 	            var settings = null;
 	            if (item) {
 	                settings = {
 	                    _killed: true,
 	                    bonusStats : item.bonusStats,
 	                    isBossItem: item.isBossItem,
 	                    id: item.id,
                        itemEquipped: item.itemEquipped,
 	                    itemName : item.itemName,
 	                    isShield: item.isShield,
 	                    isSword: item.isSword,
 	                    isArmor: item.isArmor,
 	                     itemType : item.itemType,
 	                     itemSubClass: item.itemSubClass,
 	                     itemTier: item.itemTier,
                      QualityLevel : item.QualityLevel,
                      QualityScale : item.QualityScale,
                      Attribute_1 : item.Attribute_1,
                      Attribute_2 : item.Attribute_2,
                      Attribute_3 : item.Attribute_3,
                      Attribute_4 : item.Attribute_4,

                      Max_Chance : item.Max_Chance,
                      Set_Zero : item.Set_Zero,
                      QUALITY_ICON : item.QUALITY_ICON,


                      HP : item.HP,
                      MP : item.MP,

                      STR : item.STR,
                      INT : item.INT,
                      AGI : item.AGI,

                      MATK : item.MATK,
                      HP_R : item.HP_R,
                      MP_R : item.MP_R,
                      ATK : item.ATK,

                      RES : item.RES,
                      M_RES : item.M_RES,
                        
                      CRIT_CHANCE : item.CRIT_CHANCE,

                      CRIT_DAMAGE : item.CRIT_DAMAGE,
                      BLK : item.BLK,
                      VAMPIRIC : item.VAMPIRIC,
                      SPECIAL: item.SPECIAL,
                      description: item.description,
                      doNotRandomize: true
 	                };
 	                return new EntityRandomTreasure(-128, -128, settings);
 	            }

 	        },
 	        UpdateItemArray: function (type, id) {
             
 	            var loadObject = null;
 	            if (ig.game.saveSlot) {
 	                if (ig.game.saveSlot === 1) loadObject = JSON.parse(localStorage.getItem('SupraSave_1'));
 	                else if (ig.game.saveSlot === 2) loadObject = JSON.parse(localStorage.getItem('SupraSave_2'));
 	                else if (ig.game.saveSlot === 3) loadObject = JSON.parse(localStorage.getItem('SupraSave_3'));

 	            }
 	       
 	            if (!loadObject) {
 	                return;
 	            }
 	            if (type === "sell") {
 	                    if (loadObject['shield_array']) {


 	                        for (var i = 0; i < loadObject['shield_array'].length; i++) {
 	                            if (loadObject['shield_array'][i].id === id) {
 	                                loadObject['shield_array'].splice(i, 1);
 	                            }
 	                        }



 	                    }
 	                    if (loadObject['weapon_array']) {


 	                        for (var i = 0; i < loadObject['weapon_array'].length; i++) {
 	                            if (loadObject['weapon_array'][i].id === id) {
 	                                loadObject['weapon_array'].splice(i, 1);
 	                            }
 	                        }



 	                    }
 	                    if (loadObject['armor_array']) {


 	                        for (var i = 0; i < loadObject['armor_array'].length; i++) {
 	                            if (loadObject['armor_array'][i].id === id) {
 	                                loadObject['armor_array'].splice(i, 1);
 	                            }
 	                        }



 	                    }

 	                }
 	                

 	            
 	            else if (type === "upgrade") {
 	                
 	                if (loadObject['shield_array']) {


 	                    for (var i = 0; i < loadObject['shield_array'].length; i++) {
 	                        if (loadObject['shield_array'][i].id === id) {
 	                            loadObject['shield_array'][i] = ig.game.loadPackage.itemArray[ig.game.input_location_equip];
 	                        }
 	                    }



 	                }
 	                if (loadObject['weapon_array']) {
 	                    

 	                    for (var i = 0; i < loadObject['weapon_array'].length; i++) {
 	                   
 	                        if (loadObject['weapon_array'][i].id === id) {
 	                            
 	                            loadObject['weapon_array'][i] = ig.game.loadPackage.itemArray[ig.game.input_location_equip];
 	                        }
 	                    }



 	                }
 	                if (loadObject['armor_array']) {


 	                    for (var i = 0; i < loadObject['armor_array'].length; i++) {
 	                        if (loadObject['armor_array'][i].id === id) {
 	                            loadObject['armor_array'][i] = ig.game.loadPackage.itemArray[ig.game.input_location_equip];
 	                        }
 	                    }



 	                }

 	                if (ig.game.loadPackage.itemArray[ig.game.input_location_equip].itemEquipped) {
 	                    if (ig.game.loadPackage.itemArray[ig.game.input_location_equip].isSword) loadObject['weapon'] = ig.game.loadPackage.itemArray[ig.game.input_location_equip];
 	                    if (ig.game.loadPackage.itemArray[ig.game.input_location_equip].isArmor) loadObject['armor'] = ig.game.loadPackage.itemArray[ig.game.input_location_equip];
 	                    if (ig.game.loadPackage.itemArray[ig.game.input_location_equip].isShield) loadObject['shield'] = ig.game.loadPackage.itemArray[ig.game.input_location_equip];
 	                }
 	               
 	            }

 	            if (ig.game.saveSlot) {
 	                if (ig.game.saveSlot === 1) localStorage.setItem('SupraSave_1', JSON.stringify(loadObject));
 	                else if (ig.game.saveSlot === 2) localStorage.setItem('SupraSave_2', JSON.stringify(loadObject));
 	                else if (ig.game.saveSlot === 3) localStorage.setItem('SupraSave_3', JSON.stringify(loadObject));

 	            }
 	          

 	        },
            Load: function (number) {

                var game = ig.game;

                game.levelReseted = true;
              
                var loadObject = null;
                if (number) {
                    if (number === 1) loadObject = JSON.parse(localStorage.getItem('SupraSave_1'));
                    else if (number === 2) loadObject = JSON.parse(localStorage.getItem('SupraSave_2'));
                    else if (number === 3) loadObject = JSON.parse(localStorage.getItem('SupraSave_3'));
                    
                }
               
            
            
              
                var changed_player = null;

             
                if (loadObject) {


                    game.currentLevel = loadObject['Level'];

                  

                    game.itemLevel = game.checkSpecialLevel(ig.game.currentLevel);
                    game.loadLevel(ig.global[game.currentLevel]);

                    var settings = { name: 'player1' };
                    game.spawnEntity(EntityPlayer, parseFloat(loadObject['posX']), parseFloat(loadObject['posY']), settings);
                    var changed_player = game.getEntityByName('player1');


         

                   

                    var needToReSave = false;
                   
                    changed_player.shield = game.ConvertItems(loadObject['shield']);
                    changed_player.armor = game.ConvertItems(loadObject['armor']);
                    changed_player.weapon = game.ConvertItems(loadObject['weapon']);
              
                    if (loadObject['shield_array']) {

                        
                        for (var i = 0; i < loadObject['shield_array'].length; i++) {
                            changed_player.shieldArray.push(game.ConvertItems(loadObject['shield_array'][i]));
                        }
                    
                       
                    }
                    else {


                    
                        var settings = { _killed: true, itemName: 'Wooden Shield', BLK: 8, STR: 0, AGI: 1, INT: 0, HP: 10, SPECIAL: new special(), isShield: true, itemEquipped: true, description: 'Weak shield made of wood.', doNotRandomize: true };
                        var myEnt_s = new EntityRandomTreasure(-128, -128, settings);
                

                        changed_player.armorArray.push(myEnt_s);
                     

                        needToReSave = true;
                        if (!changed_player.armor) {
                            changed_player.armor = myEnt_s;

                        }
                    }

                    if (loadObject['armor_array']) {


                        for (var i = 0; i < loadObject['armor_array'].length; i++) {
                            changed_player.armorArray.push(game.ConvertItems(loadObject['armor_array'][i]));
                        }
                        
                    }
                    else {
                       
                        var settings = { _killed: true, itemName: 'Leather Armor', RES: 8, M_RES: 12, HP: 10, HP_R: 3, MP_R: 3, SPECIAL: new special(), isArmor: true, itemEquipped: true, description: 'Leather made basic armor.', doNotRandomize: true };
                        var myEnt_a = new EntityRandomTreasure(-128, -128, settings);
                      

                        changed_player.shieldArray.push(myEnt_a);

                        needToReSave = true;

                        if (!changed_player.shield ) {
                            changed_player.shield = myEnt_a;

                        }
                    }
                    if (loadObject['weapon_array']) {

                        for (var i = 0; i < loadObject['weapon_array'].length; i++) {
                            changed_player.weaponArray.push(game.ConvertItems(loadObject['weapon_array'][i]));
                        }
                        
                        
                    }
                    else {

                      
                        needToReSave = true;
                        this.itemName = "Wooden Sword"

                        var settings = { _killed: true, itemName: 'Wooden Sword', STR: 2, INT: 0, AGI: 3, HP: 10, MP: 0, HP_R: 0, MP_R: 0, ATK: 10, MATK: 0, SPECIAL: new special(), isSword: true, itemEquipped: true, description: 'Weak sword made of wood.', doNotRandomize: true };
                        var myEnt_w = new EntityRandomTreasure(-128, -128, settings);
                  
                        changed_player.weaponArray.push(myEnt_w);
                      


                        if (!changed_player.weapon) {
                            changed_player.weapon = myEnt_w;

                        }

                    }

                
                
                    
              
                    checkIfReview = parseInt(loadObject['CheckIfReview']);
                    if (loadObject['checkedAlready']) {
                        checkedAlready = loadObject['checkedAlready'];
                    }
                    difficultyAvailable = 3;
                    difficultyLevel = parseInt(loadObject['difficultyLevel']);
                   
                    changed_player.EXP = parseInt(loadObject['EXP']);
                    ig.game.maxLevels = parseInt(loadObject['maxLevels']);
           
                    changed_player.LEVEL = parseInt(loadObject['LEVEL']);

                    changed_player.initEXP();
                    changed_player.skillSpheres = parseInt(loadObject['skillSpheres']);
                   

                    changed_player.BASE_HP = parseInt(loadObject['BASE_HP']);
                    changed_player.BASE_MP = parseInt(loadObject['BASE_HP']);
                    changed_player.health = parseInt(loadObject['health']);
                    changed_player.mana = parseInt(loadObject['mana']);
                    changed_player.gold = parseInt(loadObject['gold']);
                    changed_player.ironKey = parseInt(loadObject['ironKey']);

                    changed_player.BLADE_AMOUNT = parseInt(loadObject["BLADE_AMOUNT"]);
                    changed_player.SPELL_AMOUNT = parseInt(loadObject["SPELL_AMOUNT"]);
                    changed_player.LIFE_AMOUNT = parseInt(loadObject["LIFE_AMOUNT"]);

                    changed_player.CLASS = loadObject["CLASS"];

                    changed_player.BLADE_VIGOR = loadObject["BLADE_VIGOR"];
                    changed_player.BLADE_VIGOR_LEVEL = parseInt(loadObject["BLADE_VIGOR_LEVEL"]);
                    changed_player.BLADE_FLURRY = loadObject["BLADE_FLURRY"];
                    changed_player.BLADE_FLURRY_LEVEL = parseInt(loadObject["BLADE_FLURRY_LEVEL"]);

                    changed_player.BLADE_DOUBLEATTACK = loadObject["BLADE_DOUBLEATTACK"];
                    changed_player.BLADE_DOUBLEATTACK_LEVEL = parseInt(loadObject["BLADE_DOUBLEATTACK_LEVEL"]);

                    changed_player.BLADE_SHOCKPULSE = loadObject["BLADE_SHOCKPULSE"];
                    changed_player.BLADE_SHOCKPULSE_LEVEL = parseInt(loadObject["BLADE_SHOCKPULSE_LEVEL"]);

                    changed_player.BLADE_FRENZY = loadObject["BLADE_FRENZY"];
                    changed_player.BLADE_FRENZY_LEVEL = parseInt(loadObject["BLADE_FRENZY_LEVEL"]);

                    changed_player.BLADE_ESCALATION = loadObject["BLADE_ESCALATION"];
                    changed_player.BLADE_ESCALATION_LEVEL = parseInt(loadObject["BLADE_ESCALATION_LEVEL"]);

                    changed_player.BLADE_EXECUTE = loadObject["BLADE_EXECUTE"];
                    changed_player.BLADE_EXECUTE_LEVEL = parseInt(loadObject["BLADE_EXECUTE_LEVEL"]);

                    changed_player.BLADE_BLOODLUST = loadObject["BLADE_BLOODLUST"];
                    changed_player.BLADE_BLOODLUST_LEVEL = parseInt(loadObject["BLADE_BLOODLUST_LEVEL"]);

                    changed_player.BLADE_BIGPLAY = loadObject["BLADE_BIGPLAY"];
                    changed_player.BLADE_BIGPLAY_LEVEL = parseInt(loadObject["BLADE_BIGPLAY_LEVEL"]);
                   
                    changed_player.BLADE_SWORDSPECIALIST = loadObject["BLADE_SWORDSPECIALIST"];
                    changed_player.BLADE_SWORDSPECIALIST_LEVEL = parseInt(loadObject["BLADE_SWORDSPECIALIST_LEVEL"]);
                    changed_player.BLADE_AXESPECIALIST = loadObject["BLADE_AXESPECIALIST"];
                    changed_player.BLADE_AXESPECIALIST_LEVEL = parseInt(loadObject["BLADE_AXESPECIALIST_LEVEL"]);

                    changed_player.BLADE_PHANTOMSTRIKES = loadObject["BLADE_PHANTOMSTRIKES"];
                    changed_player.BLADE_PHANTOMSTRIKES_LEVEL = parseInt(loadObject["BLADE_PHANTOMSTRIKES_LEVEL"]);
		

                    changed_player.SPELL_INTELLIGENCE = loadObject["SPELL_INTELLIGENCE"];
                    changed_player.SPELL_INTELLIGENCE_LEVEL = parseInt(loadObject["SPELL_INTELLIGENCE_LEVEL"]);

                    changed_player.SPELL_FOCUS = loadObject["SPELL_FOCUS"];
                    changed_player.SPELL_FOCUS_LEVEL = parseInt(loadObject["SPELL_FOCUS_LEVEL"]);

                    changed_player.SPELL_ENDLESSPOOL = loadObject["SPELL_ENDLESSPOOL"];
                    changed_player.SPELL_ENDLESSPOOL_LEVEL = parseInt(loadObject["SPELL_ENDLESSPOOL_LEVEL"]);

                    changed_player.SPELL_FIREBLAST = loadObject["SPELL_FIREBLAST"];
                    changed_player.SPELL_FIRE_BLAST_LEVEL = parseInt(loadObject["SPELL_FIRE_BLAST_LEVEL"]);

                    changed_player.SPELL_CRITICALRETURN = loadObject["SPELL_CRITICALRETURN"];
                    changed_player.SPELL_CRITICALRETURN_LEVEL = parseInt(loadObject["SPELL_CRITICALRETURN_LEVEL"]);

                    changed_player.SPELL_DEMOLISH = loadObject["SPELL_DEMOLISH"];
                    changed_player.SPELL_DEMOLISH_LEVEL = parseInt(loadObject["SPELL_DEMOLISH_LEVEL"]);

                    changed_player.SPELL_CRITICALCOMBO = loadObject["SPELL_CRITICALCOMBO"];
                    changed_player.SPELL_CRITICAL_COMBO_LEVEL = parseInt(loadObject["SPELL_CRITICAL_COMBO_LEVEL"]);

                    changed_player.SPELL_ELEMENTALSYNERGY = loadObject["SPELL_ELEMENTALSYNERGY"];
                    changed_player.SPELL_ELEMENTALSYNERGY_LEVEL = parseInt(loadObject["SPELL_ELEMENTALSYNERGY_LEVEL"]);

                    changed_player.SPELL_DEEPFREEZE = loadObject["SPELL_DEEPFREEZE"];
                    changed_player.SPELL_DEEPFREEZE_LEVEL = parseInt(loadObject["SPELL_DEEPFREEZE_LEVEL"]);

                    changed_player.SPELL_FROSTFIRE = loadObject["SPELL_FROSTFIRE"];
                    changed_player.SPELL_FROSTFIRE_LEVEL = parseInt(loadObject["SPELL_FROSTFIRE_LEVEL"]);

                    changed_player.SPELL_ARCANEBALL = loadObject["SPELL_ARCANEBALL"];
                    changed_player.SPELL_ARCANEBALL_LEVEL = parseInt(loadObject["SPELL_ARCANEBALL_LEVEL"]);

                    changed_player.LIFE_BURNINGHEART = loadObject["LIFE_BURNINGHEART"];
                    changed_player.LIFE_BURNINGHEART_LEVEL = parseInt(loadObject["LIFE_BURNINGHEART_LEVEL"]);

                    changed_player.LIFE_LIFESPIRIT = loadObject["LIFE_LIFESPIRIT"];
                    changed_player.LIFE_LIFESPIRIT_LEVEL = parseInt(loadObject["LIFE_LIFESPIRIT_LEVEL"]);

                    changed_player.LIFE_EMPOWEREDSLASH = loadObject["LIFE_EMPOWEREDSLASH"];
                    changed_player.LIFE_EMPOWEREDSLASH_LEVEL = parseInt(loadObject["LIFE_EMPOWEREDSLASH_LEVEL"]);

                    changed_player.LIFE_CALMMIND = loadObject["LIFE_CALMMIND"];
                    changed_player.LIFE_CALMMIND_LEVEL = parseInt(loadObject["LIFE_CALMMIND_LEVEL"]);
                    
                    changed_player.LIFE_RADIANCE = loadObject["LIFE_RADIANCE"];
                    changed_player.LIFE_RADIANCE_LEVEL = parseInt(loadObject["LIFE_RADIANCE_LEVEL"]);

                    changed_player.LIFE_HOLYBARRIER = loadObject["LIFE_HOLYBARRIER"];
                    changed_player.LIFE_HOLYBARRIER_LEVEL = parseInt(loadObject["LIFE_HOLYBARRIER_LEVEL"]);

                    changed_player.LIFE_WALLOFJUSTICE = loadObject["LIFE_WALLOFJUSTICE"];
                    changed_player.LIFE_WALLOFJUSTICE_LEVEL = parseInt(loadObject["LIFE_WALLOFJUSTICE_LEVEL"]);

                    changed_player.LIFE_RADIANTFURY = loadObject["LIFE_RADIANTFURY"];
                    changed_player.LIFE_RADIANTFURY_LEVEL = parseInt(loadObject["LIFE_RADIANTFURY_LEVEL"]);

                    changed_player.LIFE_ZEAL = loadObject["LIFE_ZEAL"];
                    changed_player.LIFE_ZEAL_LEVEL = parseInt(loadObject["LIFE_ZEAL_LEVEL"]);

                    changed_player.LIFE_BURNINGLIGHT = loadObject["LIFE_BURNINGLIGHT"];
                    changed_player.LIFE_BURNINGLIGHT_LEVEL = parseInt(loadObject["LIFE_BURNINGLIGHT_LEVEL"])
 
                    changed_player.LIFE_LASTSTAND = loadObject["LIFE_LASTSTAND"];
                    changed_player.LIFE_LASTSTAND_LEVEL = parseInt(loadObject["LIFE_LASTSTAND_LEVEL"]);

                    changed_player.LIFE_HOLYSLASH = loadObject["LIFE_HOLYSLASH"];
                    changed_player.LIFE_HOLYSLASH_LEVEL = parseInt(loadObject["LIFE_HOLYSLASH_LEVEL"]);

                    if (loadObject["DEMON_DEMONICFORTITUDE"]) changed_player.DEMON_DEMONICFORTITUDE = loadObject["DEMON_DEMONICFORTITUDE"];

                    if (loadObject["DEMON_DEMONICFORTITUDE_LEVEL"]) changed_player.DEMON_DEMONICFORTITUDE_LEVEL = parseInt(loadObject["DEMON_DEMONICFORTITUDE_LEVEL"]);

                    if (loadObject["DEMON_VAMPIRISM"]) changed_player.DEMON_VAMPIRISM = loadObject["DEMON_VAMPIRISM"];
                    if (loadObject["DEMON_VAMPIRISM_LEVEL"]) changed_player.DEMON_VAMPIRISM_LEVEL = parseInt(loadObject["DEMON_VAMPIRISM_LEVEL"]);

                    if (loadObject["DEMON_MYSTICBARRIER"]) changed_player.DEMON_MYSTICBARRIER = loadObject["DEMON_MYSTICBARRIER"];
                    if (loadObject["DEMON_MYSTICBARRIER_LEVEL"]) changed_player.DEMON_MYSTICBARRIER_LEVEL = parseInt(loadObject["DEMON_MYSTICBARRIER_LEVEL"]);

                    if (loadObject["DEMON_DARKRAGE"]) changed_player.DEMON_DARKRAGE = loadObject["DEMON_DARKRAGE"];
                    if (loadObject["DEMON_DARKRAGE_LEVEL"]) changed_player.DEMON_DARKRAGE_LEVEL = parseInt(loadObject["DEMON_DARKRAGE_LEVEL"]);

                    if (loadObject["DEMON_DARKWAVE"]) changed_player.DEMON_DARKWAVE = loadObject["DEMON_DARKWAVE"];
                    if (loadObject["DEMON_DARKWAVE_LEVEL"]) changed_player.DEMON_DARKWAVE_LEVEL = parseInt(loadObject["DEMON_DARKWAVE_LEVEL"]);

                    if (loadObject["DEMON_EMPOWEREDDARKRAGE"]) changed_player.DEMON_EMPOWEREDDARKRAGE = loadObject["DEMON_EMPOWEREDDARKRAGE"];
                    if (loadObject["DEMON_EMPOWEREDDARKRAGE_LEVEL"]) changed_player.DEMON_EMPOWEREDDARKRAGE_LEVEL = parseInt(loadObject["DEMON_EMPOWEREDDARKRAGE_LEVEL"]);

                    if (loadObject["DEMON_SACRIFICIALDRIVE"]) changed_player.DEMON_SACRIFICIALDRIVE = loadObject["DEMON_SACRIFICIALDRIVE"];
                    if (loadObject["DEMON_SACRIFICIALDRIVE_LEVEL"]) changed_player.DEMON_SACRIFICIALDRIVE_LEVEL = parseInt(loadObject["DEMON_SACRIFICIALDRIVE_LEVEL"]);

                    if (loadObject["DEMON_DREADWAVE"]) changed_player.DEMON_DREADWAVE = loadObject["DEMON_DREADWAVE"];
                    if (loadObject["DEMON_DREADWAVE_LEVEL"]) changed_player.DEMON_DREADWAVE_LEVEL = parseInt(loadObject["DEMON_DREADWAVE_LEVEL"]);

                    if (loadObject["DEMON_DEMONBLOOD"]) changed_player.DEMON_DEMONBLOOD = loadObject["DEMON_DEMONBLOOD"];
                    if (loadObject["DEMON_DEMONBLOOD_LEVEL"]) changed_player.DEMON_DEMONBLOOD_LEVEL = parseInt(loadObject["DEMON_DEMONBLOOD_LEVEL"]);

                    if (loadObject["DEMON_DEMONSTRENGTH"]) changed_player.DEMON_DEMONSTRENGTH = loadObject["DEMON_DEMONSTRENGTH"];
                    if (loadObject["DEMON_DEMONSTRENGTH_LEVEL"]) changed_player.DEMON_DEMONSTRENGTH_LEVEL = parseInt(loadObject["DEMON_DEMONSTRENGTH_LEVEL"])

                    if (loadObject["DEMON_DARKWILL"]) changed_player.DEMON_DARKWILL = loadObject["DEMON_DARKWILL"];
                    if (loadObject["DEMON_DARKWILL_LEVEL"]) changed_player.DEMON_DARKWILL_LEVEL = parseInt(loadObject["DEMON_DARKWILL_LEVEL"]);

                    changed_player.completeList = loadObject["completeList"];

                    var parsed_array = loadObject['killEvents'];
                    //Check for older array
                    /*
                                        if ((!("knightKills" in parsed_array)) == false) { parsed_array.knightKills = 0; }
                                        if ((!("wizardKills" in parsed_array)) == false) { parsed_array.wizardKills = 0; }
                                        if ((!("winterYetiKills" in parsed_array)) == false) { parsed_array.winterYetiKills = 0; }
                                        if ((!("dark_knightKills" in parsed_array)) == false) { parsed_array.dark_knightKills = 0; }
                                        if ((!("winterMageKills" in parsed_array)) == false) { parsed_array.winterMageKills = 0; }
                                        if ((!("dark_wizardKills" in parsed_array)) == false) { parsed_array.dark_wizardKills = 0; }
                                        if ((!("winterWitchKills" in parsed_array)) == false) { parsed_array.winterWitchKills = 0; }
                                        if ((!("fallenKnightKills" in parsed_array)) == false) { parsed_array.fallenKnightKills = 0; }
                                        if ((!("thunder_wizardKills" in parsed_array)) == false) { parsed_array.thunder_wizardKills = 0; }
                                        if ((!("ice_knightKills" in parsed_array)) == false) { parsed_array.ice_knightKills = 0; }
                                        if ((!("flame_zombieKills" in parsed_array)) == false) { parsed_array.flame_zombieKills = 0; }
                                        if ((!("elementalKnightKills" in parsed_array)) == false) { parsed_array.elementalKnightKills = 0; }
                                       
                                        if (!parsed_array.wizardKills) { parsed_array.wizardKills = 0; }
                                        if (!parsed_array.knightKills) { parsed_array.knightKills = 0; }
                                        if (!parsed_array.winterYetiKills) { parsed_array.winterYetiKills = 0; }
                                        if (!parsed_array.dark_knightKills) { parsed_array.dark_knightKills = 0; }
                                        if (!parsed_array.winterMageKills) { parsed_array.winterMageKills = 0; }
                                        if (!parsed_array.dark_wizardKills) { parsed_array.dark_wizardKills = 0; }
                                        if (!parsed_array.winterWitchKills) { parsed_array.winterWitchKills = 0; }
                                        if (!parsed_array.fallenKnightKills) { parsed_array.fallenKnightKills = 0; }
                    
                                        if (!parsed_array.thunder_wizardKills) { parsed_array.thunder_wizardKills = 0; }
                                        if (!parsed_array.ice_knightKills) { parsed_array.ice_knightKills = 0; }
                                        if (!parsed_array.flame_zombieKills) { parsed_array.flame_zombieKills = 0; }
                                        if (!parsed_array.elementalKnightKills) { parsed_array.elementalKnightKills = 0; }
                    */
                    changed_player.killEvents = parsed_array;

                    changed_player.chestEvents  = loadObject['chestEvents'];
                    //   changed_player.levelEvents = JSON.parse(localStorage.getItem('SUPRARPG_levelEvents'));
                    parsed_array = loadObject['skillEvents'];

                    /*       if ((!("demonMaster" in parsed_array)) == false) { parsed_array.demonMaster = false; }
                           if ((!("bladeMaster" in parsed_array)) == false) { parsed_array.bladeMaster = false; }
                           if ((!("lifeMaster" in parsed_array)) == false) { parsed_array.lifeMaster = false; }
                           if ((!("magicMaster" in parsed_array)) == false) { parsed_array.magicMaster = false; }
                           if ((!("devastationMaster" in parsed_array)) == false) { parsed_array.devastationMaster = false; }
                           if ((!("hunterMaster" in parsed_array)) == false) { parsed_array.hunterMaster =false; }*/
                    changed_player.skillEvents = parsed_array;

                    //     game.completeMeter = parseInt(localStorage.getItem('SUPRARPG_completeMeter'));
                    //    game.completeMeterAmount = parseInt(localStorage.getItem('SUPRARPG_completeMeterAmount'));


                    //Item data is already loaded

                    //Get current difficulty level

                    changed_player.difficulty = parseInt(loadObject['difficulty']);


                    //Get current active skills
                    changed_player.currentActionSkill1 = loadObject['currentActionSkill1'];
                    //localStorage.getItem('SUPRARPG_currentActionSkill1');

                    changed_player.currentActionSkill2 = loadObject['currentActionSkill2'];
                    //localStorage.getItem('SUPRARPG_currentActionSkill2');
                    changed_player.currentAction1Manacost = parseInt(loadObject['currentAction1Manacost']);
                    changed_player.currentAction2Manacost = parseInt(loadObject['currentAction2Manacost']);

                    changed_player.clearLevel = parseInt(loadObject['clearLevel']);

                 
             

                    
                    

                     game.changeArmorGFX(changed_player);
                     changed_player = game.sanityCheck(changed_player);

                     ig.game.player = changed_player;
             

                }
                else {
                    ig.game.LoadBasicItems(changed_player);
                    ig.game.saveGame(null, changed_player, number);

                }
                if (changed_player) {
                    ig.game.CalculateStats(changed_player);

                    if (ig.game.isGoingUp != 0) { changed_player.vel.y = ig.game.isGoingUp; ig.game.isGoingUp = 0; }
                  //  ig.game.alignHUDButtons();
                }
                

            },
            goThroughUndefined: function (array) {

                for (var i = 0; i < array.length; i++) {
                    
                    for (var value in array[i]) {
                      //  console.log(value);
                        
                       // if (value === "undefined") value = 0;
                    }

                }

            },
            LoadBasicItems: function(changed_player){
           
                if (!changed_player) return;
              
                var settings = { _killed: true, itemName: 'Leather Armor', RES: 8, M_RES: 12, HP: 10, HP_R: 3, MP_R: 3, SPECIAL: new special(), isArmor: true, itemEquipped: true, description: 'Leather made basic armor.', doNotRandomize: true };
                var myEnt_a = new EntityRandomTreasure(-128, -128, settings);
       
              
                changed_player.armorArray.push(myEnt_a);


           
               
                changed_player.armor = myEnt_a;

                

               
                var settings = { _killed: true, itemName: 'Wooden Shield', BLK: 8, STR: 0, AGI: 1, INT: 0, HP: 10, SPECIAL: new special(), isShield: true, itemEquipped: true, description: 'Weak shield made of wood.', doNotRandomize: true };
                var myEnt_s = new EntityRandomTreasure(-128, -128, settings);
           
                changed_player.shieldArray.push(myEnt_s);

            

               
                changed_player.shield = myEnt_s;

                


                var settings = { _killed: true, itemName: 'Wooden Sword', STR: 2, INT: 0, AGI: 3, HP: 10, MP: 0, HP_R: 0, MP_R: 0, ATK: 10, MATK: 0, SPECIAL: new special(), isSword: true, itemEquipped: true, description: 'Weak sword made of wood.', doNotRandomize: true };
                var myEnt_w = new EntityRandomTreasure(-128, -128, settings);
              
                changed_player.weaponArray.push(myEnt_w);
                
               
                changed_player.weapon = myEnt_w;

                
               
            
            },
            
            LoadStats: function (callback,number) {
                game = ig.game;

                game.levelReseted = true;

                var changed_player = game.getEntityByName('player1');

                if (number) {
                    if (number === 1) loadObject = JSON.parse(localStorage.getItem('SupraSave_1'));
                    else if (number === 2) loadObject = JSON.parse(localStorage.getItem('SupraSave_2'));
                    else if (number === 3) loadObject = JSON.parse(localStorage.getItem('SupraSave_3'));
                }


                if (loadObject && changed_player) {

                 
                    var needToReSave = false;
                    changed_player.shield = game.ConvertItems(loadObject['shield']);
                    changed_player.armor = game.ConvertItems(loadObject['armor']);
                    changed_player.weapon = game.ConvertItems(loadObject['weapon']);

                    if (loadObject['shield_array']) {



                        for (var i = 0; i < loadObject['shield_array'].length; i++) {
                            changed_player.shieldArray.push(game.ConvertItems(loadObject['shield_array'][i]));
                        }

                    }
                    else {
                        var settings = { _killed: true, itemName: 'Wooden Shield', BLK: 8, STR: 0, AGI: 1, INT: 0, HP: 10, SPECIAL: ['Light'], isShield: true, itemEquipped: true, description: 'Weak shield made of wood.', doNotRandomize: true };
                        var myEnt_s = new EntityRandomTreasure(-128, -128, settings);
         


                        changed_player.armorArray.push(myEnt_s);


                        needToReSave = true;
                        if (!changed_player.armor) {
                            changed_player.armor = myEnt_s;

                        }
                    }

                    if (loadObject['armor_array']) {


                        for (var i = 0; i < loadObject['armor_array'].length; i++) {
                            changed_player.armorArray.push(game.ConvertItems(loadObject['armor_array'][i]));
                        }

                    }
                    else {

                        var settings = { _killed: true, itemName: 'Leather Armor', RES: 8, M_RES: 12, HP: 10, HP_R: 3, MP_R: 3, SPECIAL: new special(), isArmor: true, itemEquipped: true, description: 'Leather made basic armor.', doNotRandomize: true };
                        var myEnt_a = new EntityRandomTreasure(-128, -128, settings);
                 
                        changed_player.shieldArray.push(myEnt_a);

                        needToReSave = true;

                        if (!changed_player.shield) {
                            changed_player.shield = myEnt_a;

                        }
                    }
                    if (loadObject['weapon_array']) {

                        for (var i = 0; i < loadObject['weapon_array'].length; i++) {
                            changed_player.weaponArray.push(game.ConvertItems(loadObject['weapon_array'][i]));
                        }


                    }
                    else {


                        needToReSave = true;
                        this.itemName = "Wooden Sword"

                        var settings = { _killed: true, itemName: 'Wooden Sword', STR: 2, INT: 0, AGI: 3, HP: 10, MP: 0, HP_R: 0, MP_R: 0, ATK: 10, MATK: 0, SPECIAL: new special(), isSword: true, itemEquipped: true, description: 'Weak sword made of wood.', doNotRandomize: true };
                        var myEnt_w = new EntityRandomTreasure(-128, -128, settings);
                      
                  
                        changed_player.weaponArray.push(myEnt_w);



                        if (!changed_player.weapon) {
                            changed_player.weapon = myEnt_w;

                        }

                    }

                  
                  
                 
                    
                  
                    checkIfReview = parseInt(loadObject['CheckIfReview']);
                    if (loadObject['checkedAlready']) {
                        checkedAlready = loadObject['checkedAlready'];
                    }

                    difficultyAvailable = 3;
                    difficultyLevel = parseInt(loadObject['difficultyLevel']);
                    changed_player.EXP = parseInt(loadObject['EXP']);
                    ig.game.maxLevels = parseInt(loadObject['maxLevels']);
                    changed_player.LEVEL = parseInt(loadObject['LEVEL']);

                    changed_player.initEXP();
                   
                    changed_player.skillSpheres = parseInt(loadObject['skillSpheres']);;

                      
                    changed_player.BASE_HP = parseInt(loadObject['BASE_HP']);
                    changed_player.BASE_MP = parseInt(loadObject['BASE_HP']);
                    changed_player.health = parseInt(loadObject['health']);
                    changed_player.mana = parseInt(loadObject['mana']);
                    changed_player.gold = parseInt(loadObject['gold']);
                    changed_player.ironKey = parseInt(loadObject['ironKey']);

                    changed_player.BLADE_AMOUNT = parseInt(loadObject["BLADE_AMOUNT"]);
                    changed_player.SPELL_AMOUNT = parseInt(loadObject["SPELL_AMOUNT"]);
                    changed_player.LIFE_AMOUNT = parseInt(loadObject["LIFE_AMOUNT"]);


                    changed_player.CLASS = loadObject["CLASS"];
                    
                    changed_player.BLADE_VIGOR = loadObject["BLADE_VIGOR"];
                    changed_player.BLADE_VIGOR_LEVEL = parseInt(loadObject["BLADE_VIGOR_LEVEL"]);
                    changed_player.BLADE_FLURRY = loadObject["BLADE_FLURRY"];
                    changed_player.BLADE_FLURRY_LEVEL = parseInt(loadObject["BLADE_FLURRY_LEVEL"]);


                    changed_player.BLADE_DOUBLEATTACK = loadObject["BLADE_DOUBLEATTACK"];
                    changed_player.BLADE_DOUBLEATTACK_LEVEL = parseInt(loadObject["BLADE_DOUBLEATTACK_LEVEL"]);
                    changed_player.BLADE_SHOCKPULSE = loadObject["BLADE_SHOCKPULSE"];
                    changed_player.BLADE_SHOCKPULSE_LEVEL = parseInt(loadObject["BLADE_SHOCKPULSE_LEVEL"]);

                    changed_player.BLADE_FRENZY = loadObject["BLADE_FRENZY"];
                    changed_player.BLADE_FRENZY_LEVEL = parseInt(loadObject["BLADE_FRENZY_LEVEL"]);

                    changed_player.BLADE_ESCALATION = loadObject["BLADE_ESCALATION"];
                    changed_player.BLADE_ESCALATION_LEVEL = parseInt(loadObject["BLADE_ESCALATION_LEVEL"]);

                    changed_player.BLADE_EXECUTE = loadObject["BLADE_EXECUTE"];
                    changed_player.BLADE_EXECUTE_LEVEL = parseInt(loadObject["BLADE_EXECUTE_LEVEL"]);

                    changed_player.BLADE_BLOODLUST = loadObject["BLADE_BLOODLUST"];
                    changed_player.BLADE_BLOODLUST_LEVEL = parseInt(loadObject["BLADE_BLOODLUST_LEVEL"]);

                    changed_player.BLADE_BIGPLAY = loadObject["BLADE_BIGPLAY"];
                    changed_player.BLADE_BIGPLAY_LEVEL = parseInt(loadObject["BLADE_BIGPLAY_LEVEL"]);
                 
                    changed_player.BLADE_SWORDSPECIALIST = loadObject["BLADE_SWORDSPECIALIST"];
                    changed_player.BLADE_SWORDSPECIALIST_LEVEL = parseInt(loadObject["BLADE_SWORDSPECIALIST_LEVEL"]);
                    changed_player.BLADE_AXESPECIALIST = loadObject["BLADE_AXESPECIALIST"];
                    changed_player.BLADE_AXESPECIALIST_LEVEL = parseInt(loadObject["BLADE_AXESPECIALIST_LEVEL"]);

                    changed_player.BLADE_PHANTOMSTRIKES = loadObject["BLADE_PHANTOMSTRIKES"];
                    changed_player.BLADE_PHANTOMSTRIKES_LEVEL = parseInt(loadObject["BLADE_PHANTOMSTRIKES_LEVEL"]);
		

                    changed_player.SPELL_INTELLIGENCE = loadObject["SPELL_INTELLIGENCE"];
                    changed_player.SPELL_INTELLIGENCE_LEVEL = parseInt(loadObject["SPELL_INTELLIGENCE_LEVEL"]);

                    changed_player.SPELL_FOCUS = loadObject["SPELL_FOCUS"];
                    changed_player.SPELL_FOCUS_LEVEL = parseInt(loadObject["SPELL_FOCUS_LEVEL"])

                    changed_player.SPELL_ENDLESSPOOL = loadObject["SPELL_ENDLESSPOOL"];
                    changed_player.SPELL_ENDLESSPOOL_LEVEL = parseInt(loadObject["SPELL_ENDLESSPOOL_LEVEL"]);

                    changed_player.SPELL_FIREBLAST = loadObject["SPELL_FIREBLAST"];
                    changed_player.SPELL_FIRE_BLAST_LEVEL = parseInt(loadObject["SPELL_FIRE_BLAST_LEVEL"]);

                    changed_player.SPELL_CRITICALRETURN = loadObject["SPELL_CRITICALRETURN"];
                    changed_player.SPELL_CRITICALRETURN_LEVEL = parseInt(loadObject["SPELL_CRITICALRETURN_LEVEL"]);

                    changed_player.SPELL_DEMOLISH = loadObject["SPELL_DEMOLISH"];
                    changed_player.SPELL_DEMOLISH_LEVEL = parseInt(loadObject["SPELL_DEMOLISH_LEVEL"]);

                    changed_player.SPELL_CRITICALCOMBO = loadObject["SPELL_CRITICALCOMBO"];
                    changed_player.SPELL_CRITICAL_COMBO_LEVEL = parseInt(loadObject["SPELL_CRITICAL_COMBO_LEVEL"]);

                    changed_player.SPELL_ELEMENTALSYNERGY = loadObject["SPELL_ELEMENTALSYNERGY"];
                    changed_player.SPELL_ELEMENTALSYNERGY_LEVEL = parseInt(loadObject["SPELL_ELEMENTALSYNERGY_LEVEL"]);

                    changed_player.SPELL_DEEPFREEZE = loadObject["SPELL_DEEPFREEZE"];
                    changed_player.SPELL_DEEPFREEZE_LEVEL = parseInt(loadObject["SPELL_DEEPFREEZE_LEVEL"]);

                    changed_player.SPELL_FROSTFIRE = loadObject["SPELL_FROSTFIRE"];
                    changed_player.SPELL_FROSTFIRE_LEVEL = parseInt(loadObject["SPELL_FROSTFIRE_LEVEL"]);

                    changed_player.SPELL_ARCANEBALL = loadObject["SPELL_ARCANEBALL"];
                    changed_player.SPELL_ARCANEBALL_LEVEL = parseInt(loadObject["SPELL_ARCANEBALL_LEVEL"]);

                    changed_player.LIFE_BURNINGHEART = loadObject["LIFE_BURNINGHEART"];
                    changed_player.LIFE_BURNINGHEART_LEVEL = parseInt(loadObject["LIFE_BURNINGHEART_LEVEL"]);

                    changed_player.LIFE_LIFESPIRIT = loadObject["LIFE_LIFESPIRIT"];
                    changed_player.LIFE_LIFESPIRIT_LEVEL = parseInt(loadObject["LIFE_LIFESPIRIT_LEVEL"]);

                    changed_player.LIFE_EMPOWEREDSLASH = loadObject["LIFE_EMPOWEREDSLASH"];
                    changed_player.LIFE_EMPOWEREDSLASH_LEVEL = parseInt(loadObject["LIFE_EMPOWEREDSLASH_LEVEL"]);

                    changed_player.LIFE_CALMMIND = loadObject["LIFE_CALMMIND"];
                    changed_player.LIFE_CALMMIND_LEVEL = parseInt(loadObject["LIFE_CALMMIND_LEVEL"]);
                    
                    changed_player.LIFE_RADIANCE = loadObject["LIFE_RADIANCE"];
                    changed_player.LIFE_RADIANCE_LEVEL = parseInt(loadObject["LIFE_RADIANCE_LEVEL"]);

                    changed_player.LIFE_HOLYBARRIER = loadObject["LIFE_HOLYBARRIER"];
                    changed_player.LIFE_HOLYBARRIER_LEVEL = parseInt(loadObject["LIFE_HOLYBARRIER_LEVEL"]);

                    changed_player.LIFE_WALLOFJUSTICE = loadObject["LIFE_WALLOFJUSTICE"];
                    changed_player.LIFE_WALLOFJUSTICE_LEVEL = parseInt(loadObject["LIFE_WALLOFJUSTICE_LEVEL"]);

                    changed_player.LIFE_RADIANTFURY = loadObject["LIFE_RADIANTFURY"];
                    changed_player.LIFE_RADIANTFURY_LEVEL = parseInt(loadObject["LIFE_RADIANTFURY_LEVEL"]);

                    changed_player.LIFE_ZEAL = loadObject["LIFE_ZEAL"];
                    changed_player.LIFE_ZEAL_LEVEL = parseInt(loadObject["LIFE_ZEAL_LEVEL"]);

                    changed_player.LIFE_BURNINGLIGHT = loadObject["LIFE_BURNINGLIGHT"];
                    changed_player.LIFE_BURNINGLIGHT_LEVEL = parseInt(loadObject["LIFE_BURNINGLIGHT_LEVEL"])
 
                    changed_player.LIFE_LASTSTAND = loadObject["LIFE_LASTSTAND"];
                    changed_player.LIFE_LASTSTAND_LEVEL = parseInt(loadObject["LIFE_LASTSTAND_LEVEL"]);

                    changed_player.LIFE_HOLYSLASH = loadObject["LIFE_HOLYSLASH"];
                    changed_player.LIFE_HOLYSLASH_LEVEL = parseInt(loadObject["LIFE_HOLYSLASH_LEVEL"]);


                    //
                    if (loadObject["DEMON_DEMONICFORTITUDE"]) changed_player.DEMON_DEMONICFORTITUDE = loadObject["DEMON_DEMONICFORTITUDE"];
                  
                    if (loadObject["DEMON_DEMONICFORTITUDE_LEVEL"]) changed_player.DEMON_DEMONICFORTITUDE_LEVEL = parseInt(loadObject["DEMON_DEMONICFORTITUDE_LEVEL"]);

                    if (loadObject["DEMON_VAMPIRISM"]) changed_player.DEMON_VAMPIRISM = loadObject["DEMON_VAMPIRISM"];
                    if (loadObject["DEMON_VAMPIRISM_LEVEL"]) changed_player.DEMON_VAMPIRISM_LEVEL = parseInt(loadObject["DEMON_VAMPIRISM_LEVEL"]);

                    if (loadObject["DEMON_MYSTICBARRIER"]) changed_player.DEMON_MYSTICBARRIER = loadObject["DEMON_MYSTICBARRIER"];
                    if (loadObject["DEMON_MYSTICBARRIER_LEVEL"]) changed_player.DEMON_MYSTICBARRIER_LEVEL = parseInt(loadObject["DEMON_MYSTICBARRIER_LEVEL"]);

                    if (loadObject["DEMON_DARKRAGE"]) changed_player.DEMON_DARKRAGE = loadObject["DEMON_DARKRAGE"];
                    if (loadObject["DEMON_DARKRAGE_LEVEL"]) changed_player.DEMON_DARKRAGE_LEVEL = parseInt(loadObject["DEMON_DARKRAGE_LEVEL"]);

                    if (loadObject["DEMON_DARKWAVE"]) changed_player.DEMON_DARKWAVE = loadObject["DEMON_DARKWAVE"];
                    if (loadObject["DEMON_DARKWAVE_LEVEL"]) changed_player.DEMON_DARKWAVE_LEVEL = parseInt(loadObject["DEMON_DARKWAVE_LEVEL"]);

                    if (loadObject["DEMON_EMPOWEREDDARKRAGE"]) changed_player.DEMON_EMPOWEREDDARKRAGE = loadObject["DEMON_EMPOWEREDDARKRAGE"];
                    if (loadObject["DEMON_EMPOWEREDDARKRAGE_LEVEL"]) changed_player.DEMON_EMPOWEREDDARKRAGE_LEVEL = parseInt(loadObject["DEMON_EMPOWEREDDARKRAGE_LEVEL"]);

                    if (loadObject["DEMON_SACRIFICIALDRIVE"]) changed_player.DEMON_SACRIFICIALDRIVE = loadObject["DEMON_SACRIFICIALDRIVE"];
                    if (loadObject["DEMON_SACRIFICIALDRIVE_LEVEL"]) changed_player.DEMON_SACRIFICIALDRIVE_LEVEL = parseInt(loadObject["DEMON_SACRIFICIALDRIVE_LEVEL"]);

                    if (loadObject["DEMON_DREADWAVE"]) changed_player.DEMON_DREADWAVE = loadObject["DEMON_DREADWAVE"];
                    if (loadObject["DEMON_DREADWAVE_LEVEL"]) changed_player.DEMON_DREADWAVE_LEVEL = parseInt(loadObject["DEMON_DREADWAVE_LEVEL"]);

                    if (loadObject["DEMON_DEMONBLOOD"]) changed_player.DEMON_DEMONBLOOD = loadObject["DEMON_DEMONBLOOD"];
                    if (loadObject["DEMON_DEMONBLOOD_LEVEL"]) changed_player.DEMON_DEMONBLOOD_LEVEL = parseInt(loadObject["DEMON_DEMONBLOOD_LEVEL"]);

                    if (loadObject["DEMON_DEMONSTRENGTH"]) changed_player.DEMON_DEMONSTRENGTH = loadObject["DEMON_DEMONSTRENGTH"];
                    if (loadObject["DEMON_DEMONSTRENGTH_LEVEL"]) changed_player.DEMON_DEMONSTRENGTH_LEVEL = parseInt(loadObject["DEMON_DEMONSTRENGTH_LEVEL"])

                    if (loadObject["DEMON_DARKWILL"]) changed_player.DEMON_DARKWILL = loadObject["DEMON_DARKWILL"];
                    if (loadObject["DEMON_DARKWILL_LEVEL"]) changed_player.DEMON_DARKWILL_LEVEL = parseInt(loadObject["DEMON_DARKWILL_LEVEL"]);

               
                    changed_player.completeList = loadObject["completeList"];

                    var parsed_array = loadObject['killEvents'];
                  
                    changed_player.killEvents = parsed_array;

                    changed_player.chestEvents = loadObject['chestEvents'];
                    //   changed_player.levelEvents = JSON.parse(localStorage.getItem('SUPRARPG_levelEvents'));
                    parsed_array = loadObject['skillEvents'];

                    /*       if ((!("demonMaster" in parsed_array)) == false) { parsed_array.demonMaster = false; }
                           if ((!("bladeMaster" in parsed_array)) == false) { parsed_array.bladeMaster = false; }
                           if ((!("lifeMaster" in parsed_array)) == false) { parsed_array.lifeMaster = false; }
                           if ((!("magicMaster" in parsed_array)) == false) { parsed_array.magicMaster = false; }
                           if ((!("devastationMaster" in parsed_array)) == false) { parsed_array.devastationMaster = false; }
                           if ((!("hunterMaster" in parsed_array)) == false) { parsed_array.hunterMaster =false; }*/
                    changed_player.skillEvents = parsed_array;

                    //     game.completeMeter = parseInt(localStorage.getItem('SUPRARPG_completeMeter'));
                    //    game.completeMeterAmount = parseInt(localStorage.getItem('SUPRARPG_completeMeterAmount'));


                    //Item data is already loaded

                    //Get current difficulty level

                    changed_player.difficulty = parseInt(loadObject['difficulty']);


                    //Get current active skills
                    changed_player.currentActionSkill1 = loadObject['currentActionSkill1'];
                    //localStorage.getItem('SUPRARPG_currentActionSkill1');

                    changed_player.currentActionSkill2 = loadObject['currentActionSkill2'];
                    //localStorage.getItem('SUPRARPG_currentActionSkill2');
                    changed_player.currentAction1Manacost = parseInt(loadObject['currentAction1Manacost']);
                    changed_player.currentAction2Manacost = parseInt(loadObject['currentAction2Manacost']);

                    changed_player.clearLevel = parseInt(loadObject['clearLevel']);



                   

                    game.changeArmorGFX(changed_player);


                    changed_player = game.sanityCheck(changed_player);

                    ig.game.player = changed_player;
                }
                else {
                    ig.game.LoadBasicItems(changed_player);
                  
                    ig.game.saveGame(null, changed_player,number);

                }
                    //Load items

                    if(changed_player){
                    game.changeArmorGFX(changed_player);
                    
                    game.CalculateStats(changed_player);
                    game.alignHUDButtons();
                    }
                
                callback();

            },

     sanityCheck: function(player){
        

         if (isNaN(player.health) || player.health == 0) {
             player.health = player.Maxhealth;
         }
         if (isNaN(player.BASE_HP) || player.BASE_HP == 0) {
             player.BASE_HP = 100;
         }
         if (isNaN(player.BASE_MP) || player.BASE_MP == 0) {
             player.BASE_MP = 50;
         }
         return player;
     }

 });
});