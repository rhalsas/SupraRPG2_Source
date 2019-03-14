

ig.module(
	'game.entities.randomTreasure'
	)
.requires(
	'impact.entity'
	)
.defines(function(){
		EntityRandomTreasure = ig.Entity.extend({
		
		collides: ig.Entity.COLLIDES.NONE,
		checkAgainst: ig.Entity.TYPE.A,
		
		size: {x: 8,y: 8},
		offset: {x: 4,y: 4},
		maxVel:{x: 50,y:50},
		friction: { x: 99999, y: 100 },
		name: "clickable",
		itemName: 'Wooden Shield',
		
        id: 0,
		itemEquipped: false,
		name: '',
		description: '',
		textbuffer: '',
		doOnce: true,
		bossNumber: '',


		legbuf: 0,
		epicbuf: 0,
            
		doNotRandomize: false,
        fixedItemLevel: false,
		itemSubClass: "",
		QualityLevel: 1,
		QualityScale: 1,
		itemTier: 1,
		isBossItem:false,
		Attribute_1: null,
		Attribute_2: null,
		Attribute_3: null,
		Attribute_4: null,
		isShield: false,
		isArmor: false,
		isSword: false,
        bonusStats: 1,
		Max_Chance: 100,
		Set_Zero: false,
					QUALITY_ICON: 0,
					
					HP: 0,
					MP: 0,
					
					STR: 0,
					INT: 0,
					AGI: 0,
				
                    MATK: 0,
					HP_R: 0,
					MP_R: 0,
					ATK: 0,
			    
					RES: 0,
					M_RES: 0,
				
					CRIT_CHANCE: 0,
				
					CRIT_DAMAGE: 0,
					BLK: 0,
		            VAMPIRIC: 0,
		            SPECIAL: new special(),
					
				
		init: function(x,y,settings) 
		{
		    this.parent(x, y, settings);
		    
		    
		    var game = ig.game;
		    if (this.doNotRandomize === true) {
		        this.vel.x = 0;
		        this.vel.y = 0;
		        return this;
		    }

		    this.animSheet = new ig.AnimationSheet('media/ItemDrops2.png', 16, 16); 
		    this.vel.x = ((Math.floor(Math.random() * 2)) - 1) * (50);
		    this.vel.y = -50;
		 
		
		    var Legendary_Chance = 0.5; // 1% default
		
		   var Epic_Chance = 1.5; // 1% default
		   var Rare_Chance = 5; // 3% default
		   var Uncommon_Chance = 32; // 15% default
		   var Common_Chance = 62.49;
		   var legMod = 1;
		   var epicMod = 1;
		   var rareMod = 1;

		   epicMod += this.epicbuf;
		   legMod += this.legbuf;

		   if (game.player && game.player.armor.SPECIAL["Treasure Hunt"]) rareMod += 4;
		   if (game.player && game.player.armor.SPECIAL["Great Hunt"]) epicMod += 2;
		   if (game.player && game.player.armor.SPECIAL["Legendary Hunt"]) legMod += 1;
		   if (difficultyLevel === 0) {
		       Legendary_Chance = 0.5 + legMod;
		       // 0.5% default
		       Epic_Chance = 1.5 + epicMod;
		       Rare_Chance = 5 + rareMod; // 3% default
		       Uncommon_Chance = 32; // 15% default
		       Common_Chance = 60 - legMod - epicMod - rareMod;
		   }
		  
		   else if (difficultyLevel === 1) {
		       Legendary_Chance = 0.75 + legMod;
		       // 0.5% default
		       Epic_Chance = 3 + epicMod;
		       Rare_Chance = 7.5 + rareMod; // 3% default
		       Uncommon_Chance = 43; // 15% default
		       Common_Chance = 45.75 - legMod - epicMod - rareMod;
		   }
		   else if (difficultyLevel === 2) {
		       Legendary_Chance = 1 + legMod;
		       // 0.5% default
		       Epic_Chance = 4.5 + epicMod;
		       Rare_Chance = 10 + rareMod; // 3% default
		       Uncommon_Chance = 54; // 15% default
		       Common_Chance = 30.5 - legMod - epicMod - rareMod;
		   }
		   else if (difficultyLevel === 3) {
		       Legendary_Chance = 1.25 + legMod;
		       // 0.5% default
		       Epic_Chance = 6 + epicMod;
		       Rare_Chance = 12.5 + rareMod;// 3% default
		       Uncommon_Chance = 65; // 15% default
		       Common_Chance = 15.25 - legMod - epicMod - rareMod;
		   }



		    //Calculate actual chance -->




		 
		   Legendary_Chance = this.checkChance(Legendary_Chance);
		   Epic_Chance = this.checkChance(Epic_Chance);
		   Rare_Chance = this.checkChance(Rare_Chance);
		   Uncommon_Chance = this.checkChance(Uncommon_Chance);
		   Common_Chance = this.checkChance(Common_Chance);

		   var random_number = Math.random() * 100;
		    //Check the quality
		 
		   var bufferVal = 0;
		
		   if (random_number <= Legendary_Chance) {
		       this.QualityLevel = 5; this.QualityScale = 1.6;
		       bufferVal = 4;
		   }
		   else if (random_number <= Epic_Chance) {
		       this.QualityLevel = 4; this.QualityScale = 1.45;
		       bufferVal = 3;
		   }
		   else if (random_number <= Rare_Chance) {
		       this.QualityLevel = 3; this.QualityScale = 1.3;
		       bufferVal = 2;
		   }
		   else if (random_number <= Uncommon_Chance) {
		       this.QualityLevel = 2; this.QualityScale = 1.15;
		       bufferVal = 1;
		   }
		   else if (random_number <= Common_Chance) {
		       this.QualityLevel = 1; this.QualityScale = 1;
		       bufferVal = 0;
		   }
		    //Probably the location should have specific items
		    //Wooden for starting zones ect.

		    //Generating the item anyhow
		
		   this.addAnim('idle', 1, [bufferVal
		   ]);
		    
		 
		   if (this.bossNumber !== '') {
		       this.isBossItem = true;
		       this.generateItemStats(this.bossNumber);
		   }
		  
		   else { this.generateItem(); }
	
			
		},
		
		
		update: function() 
		{
                                             

		    this.parent();
			
		},
		
		set_random_number: function(amount){
			return Math.floor(Math.random() * amount);
		},
		generateBossItem: function(){
		    this.generateItemStats(this.bossNumber);
		},
		generateItem: function(){
		

		    if(!this.fixedItemLevel)ig.game.itemLevel = ig.game.checkSpecialLevel(ig.game.currentLevel);
		
		    var randomArray = new Array();

		  
		  
		    this.itemTier = ig.game.itemLevel

		 
			//console.log(this.itemTier + " JE P ");
		    this.generateItemStats(ig.game.itemLevel)
			
		},
		generateSpecials: function (amount, ItemLevel, isLegendary) {
		    var firstSpecial = "";
		    var secondSpecial = "";
		    var thirdSpecial = "";
		    var special = "";
		    console.log(ItemLevel + "WAT");
		    if (isNaN(ItemLevel)) {
		   
		        if (ItemLevel === "EXTREMEPIGGY") { ItemLevel = 1; }
		        else if (ItemLevel === "BOMBLAZORMAN") { ItemLevel = 2; }
		        else if (ItemLevel === "VIPERSCORPION") { ItemLevel = 3; }
		        else if (ItemLevel === "DESERTKNIGHT") { ItemLevel = 3; }
		        else if (ItemLevel === "NECROMANCER") { ItemLevel = 4; }
		        else if (ItemLevel === "MAGMAWORM") { ItemLevel = 4; }
		        else if (ItemLevel === "RAGEKNIGHT") { ItemLevel = 5; }
		        else if (ItemLevel === "BLACKKNIGHT") { ItemLevel = 6; }
		        else if (ItemLevel === "DEMONKING") { ItemLevel = 6; }
		        else if (ItemLevel === "VOIDKING") { ItemLevel = 7; }
		        else { ItemLevel = 1; }

		    }
		    if (this.isSword) {
		        for (var i = 0; i < amount; i++) {
		            if (i === 0) {
		                var random = Math.floor(Math.random() * ItemLevel);
		                
		                var random2 = Math.floor(Math.random() * ig.game.WeaponSpecialArray[random].length);
		              
		                firstSpecial = ig.game.WeaponSpecialArray[random][random2];
		                this.SPECIAL.push(firstSpecial);
		            }
		            else if (i === 1) {
		                var random = Math.floor(Math.random() * ItemLevel);
		          
		                var random2 = Math.floor(Math.random() * ig.game.WeaponSpecialArray[random].length);
		               
		                secondSpecial = ig.game.WeaponSpecialArray[random][random2];
                        
		                if (firstSpecial === secondSpecial
                            ||
                            ((firstSpecial === "Heavy W" && secondSpecial === "Light W") ||
                               (firstSpecial === "Light W" && secondSpecial === "Heavy W")
                            )

                            ) { i--;  continue; }
		                this.SPECIAL.push(secondSpecial);
		            }
		         
                    
		           
		        }
		        if (isLegendary && !this.isBossItem) {
		            
		                var randomLeg= Math.floor(Math.random() * 3);
		                if(randomLeg === 0){
		                    this.SPECIAL.push("Chosen's Power");
		                }
		                else if(randomLeg === 1){
		                    this.SPECIAL.push('Demonic Blessing');
		                }
		                else if(randomLeg === 2){
		                    this.SPECIAL.push('Arcane Sap');
		                }
		                
		        }

		       
		       
		    }
		    else if (this.isShield) {
		        for (var i = 0; i < amount; i++) {
		            if (i === 0) {
		                var random = Math.floor(Math.random() * ItemLevel);

		                var random2 = Math.floor(Math.random() * ig.game.ShieldSpecialArray[random].length);

		                firstSpecial = ig.game.ShieldSpecialArray[random][random2];
		                this.SPECIAL.push(firstSpecial);
		            }
		            else if (i === 1) {
		                var random = Math.floor(Math.random() * ItemLevel);

		                var random2 = Math.floor(Math.random() * ig.game.ShieldSpecialArray[random].length);

		                secondSpecial = ig.game.ShieldSpecialArray[random][random2];

		                if (firstSpecial === secondSpecial
                            ||
                            ((firstSpecial === "Heavy S" && secondSpecial === "Light S") ||
                               (firstSpecial === "Light S" && secondSpecial === "Heavy S")
                            )

                            ) { i--; continue; }
		                this.SPECIAL.push(secondSpecial);
		            }


		         
		          
		        }
		        if (isLegendary && !this.isBossItem) {
		            var randomLeg= Math.floor(Math.random() * 3);
		            if(randomLeg === 0){
		                this.SPECIAL.push("Sage's Will");
		            }
		            else if(randomLeg === 1){
		                this.SPECIAL.push('Godlike Blocks');
		            }
		            else if(randomLeg === 2){
		                this.SPECIAL.push('Insanity');
		            }
		           
		        
		        }

		    
		      
		    }
		    else if (this.isArmor) {
		        for (var i = 0; i < amount; i++) {
		            if (i === 0) {
		                var random = Math.floor(Math.random() * ItemLevel);

		                var random2 = Math.floor(Math.random() * ig.game.ArmorSpecialArray[random].length);

		                firstSpecial = ig.game.ArmorSpecialArray[random][random2];
		                this.SPECIAL.push(firstSpecial);
		            }
		            else if (i === 1) {
		                var random = Math.floor(Math.random() * ItemLevel);

		                var random2 = Math.floor(Math.random() * ig.game.ArmorSpecialArray[random].length);

		                secondSpecial = ig.game.ArmorSpecialArray[random][random2];

		                if (firstSpecial === secondSpecial
                            ||
                            ((firstSpecial === "Heavy A" && secondSpecial === "Light A") ||
                               (firstSpecial === "Light A" && secondSpecial === "Heavy A")
                            )

                            ) { i--; continue; }
		                this.SPECIAL.push(secondSpecial);
		            }

		          

		     
		        }
		        if (isLegendary && !this.isBossItem) {
		            var randomLeg= Math.floor(Math.random() * 3);
		            if(randomLeg === 0){
		                this.SPECIAL.push("Titan's Signet");
		            }
		            else if(randomLeg === 1){
		                this.SPECIAL.push("Koz's Whisper");
		            }
		            else if(randomLeg === 2){
		                this.SPECIAL.push("Relife");
		            }
		        }

		    
		       
		    }
		   
		},
		reRandomize: function () {
		    this.SPECIAL = new special();

		
		    if (this.QualityLevel == 5) {
		        this.QualityLevel = 5; this.QualityScale = 1.6;
		        //bufferVal = 4;
		        this.ATK =  this.ATK * (1/1.45);
		        this.MATK =  this.MATK * (1/1.45);
		        this.STR =  this.STR * (1/1.45);
		        this.INT =  this.INT * (1/1.45);
		        this.AGI =  this.AGI * (1/1.45);


		        this.HP =  this.HP * (1/1.45);
		        this.MP =  this.MP * (1/1.45);
		        this.HP_R =  this.HP_R * (1/1.45);
		        this.MP_R =  this.MP_R * (1/1.45);
		    }
		    else if (this.QualityLevel == 4) {
		        this.QualityLevel = 4; this.QualityScale = 1.45;
		        //bufferVal = 3;
		        this.ATK =  this.ATK * (1/1.3);
		        this.MATK =  this.MATK * (1/1.3);
		        this.STR =  this.STR * (1/1.3);
		        this.INT =  this.INT * (1/1.3);
		        this.AGI =  this.AGI * (1/1.3);


		        this.HP =  this.HP * (1/1.3);
		        this.MP =  this.MP * (1/1.3);
		        this.HP_R =  this.HP_R * (1/1.3);
		        this.MP_R =  this.MP_R * (1/1.3);
		    }
		    else if (this.QualityLevel == 3) {
		        this.QualityLevel = 3; this.QualityScale = 1.3;
		        //bufferVal = 2;
		        this.ATK =  this.ATK * (1/1.15);
		        this.MATK =  this.MATK * (1/1.15);
		        this.STR =  this.STR * (1/1.15);
		        this.INT =  this.INT * (1/1.15);
		        this.AGI =  this.AGI * (1/1.15);


		        this.HP =  this.HP * (1/1.15);
		        this.MP =  this.MP * (1/1.15);
		        this.HP_R =  this.HP_R * (1/1.15);
		        this.MP_R =  this.MP_R * (1/1.15);
		    }
		    else if (this.QualityLevel == 2) {
		        this.QualityLevel = 2; this.QualityScale = 1.15;
		        //bufferVal = 1;
		        this.ATK =  this.ATK * (1/1);
		        this.MATK =  this.MATK * (1/1);
		        this.STR =  this.STR * (1/1);
		        this.INT =  this.INT * (1/1);
		        this.AGI =  this.AGI * (1/1);


		        this.HP =  this.HP * (1/1);
		        this.MP =  this.MP * (1/1);
		        this.HP_R =  this.HP_R * (1/1);
		        this.MP_R =  this.MP_R * (1/1);
		    }
		    
		    this.generateItemStats("SKIP");

		    
		},
		generaterandomSpecials: function(ItemLevel){

	
		    var randomVal2 = Math.floor(Math.random() * 100);
		    if (this.QualityLevel === 1) {
		        //
		    }
		    else if (this.QualityLevel === 2) {
		        //
		        if (randomVal2 >= 50) {
		            this.generateSpecials( 1, ItemLevel);
		        }
		    }
		    else if (this.QualityLevel === 3) {
		        //100%, 25%
		        this.generateSpecials( 1, ItemLevel);
		    }
		    else if (this.QualityLevel === 4) {
		       
		        this.generateSpecials( 2, ItemLevel);
		    }
		    else if (this.QualityLevel === 5) {
		        //100%, 100%, 10%
		        this.generateSpecials( 2, ItemLevel, true);
		        
		    }
                /*
		    else if (this.QualityLevel === 6) {
		        //100%, 75%, 25%
		        if (randomVal2 >= 75) {
		            this.generateSpecials(this.itemType, 3, ItemLevel);
		        }
		        else if (randomVal2 >= 25) {
		            this.generateSpecials(this.itemType, 2, ItemLevel);
		        }
		        else {
		            this.generateSpecials(this.itemType, 1, ItemLevel);
		        }
		    }
		    else if (this.QualityLevel === 7) {
		        //100%, 100%, 33%
		        if (randomVal2 >= 67) {
		            this.generateSpecials(this.itemType, 3, ItemLevel);
		        }
		        
		        else {
		            this.generateSpecials(this.itemType, 2, ItemLevel);
		        }
		    }
		    else if (this.QualityLevel === 8) {
		        //100%, 100%, 75% + Legendary Buff
		        if (randomVal2 >= 25) {
		            this.generateSpecials(this.itemType, 3, ItemLevel, true);
		        }
		        
		        else {
		            this.generateSpecials(this.itemType, 2, ItemLevel, true);
		        }

		       
		    }*/
		    
		},
		generateItemStats: function(ItemType){
		
		    if (
		        ItemType === 1
                )
		    {
		        var randomVal = 0;
		    
		        randomVal = Math.floor(Math.random() * 10);
		        switch (randomVal) {

		            case 0:
		                this.itemName = "Wooden Sword";
		                this.HP = 10;
		                this.ATK = 10;
		                this.STR = 2;
		                this.AGI = 3;
		                this.INT = 0;
		                this.HP_R = 0;
		                this.MP_R = 0;
		                this.setType('sword');
		                this.description = 'Weak sword made of wood.';

		                break;
		            case 1:

		                this.itemName = "Stone Sword";

			                  
		                this.HP = 15;
		                this.ATK = 12;
		                this.STR = 2;
		                this.AGI = 2;
		                this.INT = 0;
		                this.HP_R = 0;
		                this.MP_R = 0;
		                this.setType('sword');

		                this.description = 'Weak sword made of stone.';
		                break;
		            case 2:
		                this.itemName = "Practice Sword";

			                  
		                this.HP = 10;
		                this.ATK = 8;
		                this.STR = 1;
		                this.AGI = 4;
		                this.INT = 0;
		                this.HP_R = 0;
		                this.MP_R = 0;
		                this.setType('sword');
		                this.description = 'Dull blade for trainees.';
		                break;
		            case 3:

		                this.itemName = "Stick";

			                  
		                this.HP = 5;
		                this.MP = 20;
		                this.MATK = 2;
		                this.ATK = 4;
		                this.STR = 0;
		                this.AGI = 0;
		                this.INT = 5;
		                this.HP_R = 0;
		                this.MP_R = 4;
		                this.setType('sword');
		                this.description = 'Stick.';
		                break;
		            case 4:

		                this.itemName = "Wooden Staff";

			                  
		                this.HP = 10;
		                this.MP = 15;
		                this.MATK = 4;
		                this.ATK = 5;
		                this.STR = 1;
		                this.AGI = 1;
		                this.INT = 4;
		                this.HP_R = 0;
		                this.MP_R = 2;
		                this.setType('sword');
		                this.description = 'Staff for a wizard.';
		                break;
			        
			    
		            case 5:
			              
		                this.itemName = "Wooden Shield";

			                 
		                this.BLK = 8;
		                this.STR = 0;
		                this.AGI = 1;
		                this.INT = 0;
		                this.HP = 10;
		                this.MP = 10;
			             
		                this.setType('shield');
		                this.description = 'Weak shield made of wood.';
		                break;
		            case 6:

		                this.itemName = "Stone Shield";

			                 
		                this.BLK = 8;
		                this.STR = 1;
		                this.AGI = 0;
		                this.INT = 0;
		                this.HP = 15;
		                this.MP = 0;
		                this.setType('shield');
		                this.description = 'Heavy and impractical stone shield.';
		                break;
		            case 7:

		                this.itemName = "Practice Shield";

			                 
		                this.BLK = 6;
		                this.STR = 0;
		                this.AGI = 0;
		                this.INT = 0;
		                this.HP = 15;
		                this.MP = 15;
		                this.setType('shield');
		                this.description = 'Shield for the beginners.';
		                break;
			        
		            case 8:

		                this.itemName = "Leather Armor";


			                 
		                this.RES = 8;
		                this.M_RES = 12;
		                this.STR = 0;
		                this.AGI = 0;
		                this.INT = 0;
		                this.HP = 10;
		                this.MP = 10;
		                this.HP_R = 2;
		                this.MP_R = 2;
		                this.setType('armor');
		                this.description = 'Basic and a cheap way of protection.';
		                break;
		            case 9:

		                this.itemName = "Heavy Leather";

			                 
		                this.RES = 12;
		                this.M_RES = 12;
		                this.STR = 0;
		                this.AGI = 0;
		                this.INT = 0;
		                this.HP = 20;
		                this.MP = 5;
		                this.HP_R = 3;
		                this.MP_R = 0;

		                this.setType('armor');
		                this.description = 'Sturdier or heavier version of the standard leather armor.';
		                break;
		        }

		    
			        //ADD STAT RANDOMIZATION LATER
			        
			    
			    
			        
			        
			    
				
			}
            
		    else if (
		        ItemType === 2
                ) {
		        var randomVal = 0;
		       
		            randomVal = Math.floor(Math.random() * 10);
		            switch (randomVal) {

		                case 0:
		                    this.itemName = "Copper Sword";


		                    this.HP = 15;
		                    this.MP = 5;
		                    this.MATK = 0;
		                    this.ATK = 13;
		                    this.STR = 3;
		                    this.AGI = 2;
		                    this.INT = 0;
		                    this.HP_R = 1;
		                    this.MP_R = 0;
		                    this.setType('sword');
		                    this.description = 'Sword made of soft metal.';

		                    break;
		                case 1:

		                    this.itemName = "Bronze Sword";


		                    this.HP = 15;
		                    this.MP = 5;
		                    this.MATK = 0;
		                    this.ATK = 15;
		                    this.STR = 5;
		                    this.AGI = 0;
		                    this.INT = 1;
		                    this.HP_R = 1;
		                    this.MP_R = 0;
		                    this.setType('sword');
		                    this.description = 'Sword used by lesser knights.';
		                    break;
		                case 2:
		                    this.itemName = "Slasher";


		                    this.HP = 5;
		                    this.MP = 5;
		                    this.MATK = 0;
		                    this.ATK = 14;
		                    this.STR = 2;
		                    this.INT = 0;
		                    this.AGI = 3;
		                    this.HP_R = 0;
		                    this.MP_R = 0;
		                    this.setType('sword');
		                    this.description = 'Rusty and deadly blade for mercenaries.';
		                    break;
		                case 3:

		                    this.itemName = "Copper Stick";


		                    this.HP = 7;
		                    this.MP = 25;
		                    this.MATK = 3;
		                    this.ATK = 6;
		                    this.STR = 0;
		                    this.AGI = 0;
		                    this.INT = 6;
		                    this.HP_R = 0;
		                    this.MP_R = 5;
		                    this.setType('sword');
		                    this.description = 'Copper stick with some magic power lingering inside.';
		                    break;
		                case 4:

		                    this.itemName = "Bronze Staff";


		                    this.HP = 10;
		                    this.MP = 25;
		                    this.MATK = 5;
		                    this.ATK = 7;
		                    this.STR = 0;
		                    this.AGI = 0;
		                    this.INT = 5;
		                    this.HP_R = 0;
		                    this.MP_R = 3;
		                    this.setType('sword');
		                    this.description = 'Metal staff that can imbue magical energies decently.';
		                    break;



		                case 5:

		                    this.itemName = "Copper Shield";


		                    this.BLK = 12;
		                    this.STR = 1;

		                    this.INT = 0;
		                    this.AGI = 1;
		                    this.HP = 20;
		                    this.MP = 10;
		                    this.setType('shield');
		                    this.description = 'Shield made of soft metal.';
		                    break;
		                case 6:

		                    this.itemName = "Bronze Shield";


		                    this.BLK = 12;
		                    this.STR = 2;

		                    this.INT = 0;
		                    this.AGI = 1;
		                    this.HP = 30;
		                    this.MP = 0;
		                    this.setType('shield');
		                    this.description = 'Heavy, but somewhat strong shield for the price. ';
		                    break;


		                case 7:

		                    this.itemName = "Leather Robe";


		                    this.RES = 4;
		                    this.M_RES = 16;
		                    this.STR = 0;
		                    this.AGI = 0;
		                    this.INT = 2;
		                    this.HP = 10;
		                    this.MP = 15;
		                    this.HP_R = 2;
		                    this.MP_R = 3;

		                    this.setType('armor');
		                    this.description = 'Robe for your average wizard.';
		                    break;
		                case 8:

		                    this.itemName = "Copper Armor";


		                    this.RES = 12;
		                    this.M_RES = 16;
		                    this.STR = 1;
		                    this.AGI = 1;
		                    this.INT = 1;
		                    this.HP = 30;
		                    this.MP = 5;
		                    this.HP_R = 3;
		                    this.MP_R = 1;
		                    this.setType('armor');
		                    this.description = 'Armor made of soft metal.';
		                    break;
		                case 9:

		                    this.itemName = "Bronze Armor";


		                    this.RES = 16;
		                    this.M_RES = 16;
		                    this.STR = 2;
		                    this.AGI = 1;
		                    this.INT = 1;
		                    this.HP = 35;
		                    this.MP = 0;
		                    this.HP_R = 3;
		                    this.MP_R = 0;
		                    this.setType('armor');
		                    this.description = 'Armor for poor knights.';
		                    break;

		                    //ADD STAT RANDOMIZATION LATER

		            }
		    }

		    else if (
               ItemType === 3
               ) {
		        var randomVal = 0;
		    
		            randomVal = Math.floor(Math.random() * 9);
		            switch (randomVal) {

		                case 0:
		                    this.itemName = "Iron Blade";


		                    this.HP = 20;
		                    this.MP = 15;
		                    this.MATK = 0;
		                    this.ATK = 19;
		                    this.STR = 6;
		                    this.INT = 1;
		                    this.AGI = 5;
		                    this.HP_R = 2;
		                    this.MP_R = 2;
		                    this.setType('sword');
		                    this.description = 'A sharp blade made of iron.';

		                    break;
		                case 1:

		                    this.itemName = "Iron Sword";


		                    this.HP = 25;
		                    this.MP = 5;
		                    this.MATK = 0;
		                    this.ATK = 16;
		                    this.STR = 8;
		                    this.INT = 0;
		                    this.AGI = 2;
		                    this.HP_R = 3;
		                    this.MP_R = 1;
		                    this.setType('sword');
		                    this.description = 'Weapon of a knight.';
		                    break;
		                case 2:
		                    this.itemName = "Iron Grand";


		                    this.HP = 35;
		                    this.MP = 5;
		                    this.MATK = 0;
		                    this.ATK = 22;
		                    this.STR = 10;
		                    this.INT = 0;
		                    this.AGI = 0;
		                    this.HP_R = 4;
		                    this.MP_R = 0;
		                    this.setType('sword');
		                    this.description = 'Only the strongest knights can wield these.';
		                    break;
		                case 3:
                           
		                    this.itemName = "Iron Staff";


		                    this.HP = 15;
		                    this.MP = 35;
		                    this.MATK = 8;
		                    this.ATK = 8;
		                    this.STR = 2;
		                    this.INT = 11;
		                    this.AGI = 0;
		                    this.HP_R = 0;
		                    this.MP_R = 5;
		                    this.setType('sword');
		                    this.description = 'Strong staff for fighting wizards.';
		                    break;
		                case 4:

		                    this.itemName = "Imbued Stick";


		                    this.HP = 10;
		                    this.MP = 30;
		                    this.MATK = 6;
		                    this.ATK = 7;
		                    this.STR = 0;
		                    this.INT = 8;
		                    this.AGI = 0;
		                    this.HP_R = 0;
		                    this.MP_R = 8;
		                    this.setType('sword');
		                    this.description = 'Stick with magical energies imbued inside.';
		                    break;


		                case 5:

		                    this.itemName = "Iron Shield";


		                    this.BLK = 16;
		                    this.STR = 3;

		                    this.INT = 0;
		                    this.AGI = 2;
		                    this.HP = 50;
		                    this.MP = 20;
		                    this.setType('shield');
		                    this.description = 'Standard shield of a knight.';
		                    break;
		                case 6:

		                    this.itemName = "Heavy Shield";


		                    this.BLK = 20;
		                    this.STR = 4;

		                    this.INT = 0;
		                    this.AGI = 1;
		                    this.HP = 60;
		                    this.MP = 0;
		                    this.setType('shield');
		                    this.description = 'Heavy shield for extreme protection.';
		                    break;


		                case 7:

		                    this.itemName = "Iron Armor";


		                    this.RES = 18;
		                    this.M_RES = 16;
		                    this.STR = 1;
		                    this.AGI = 2;
		                    this.INT = 0;
		                    this.HP = 50;
		                    this.MP = 10;
		                    this.HP_R = 3;
		                    this.MP_R = 5;
		                    this.setType('armor');
		                    this.description = 'Armor of a knight.';
		                    break;
		                case 8:

		                    this.itemName = "Heavy Armor";


		                    this.RES = 20;
		                    this.M_RES = 16;
		                    this.STR = 2;
		                    this.AGI = 1;
		                    this.INT = 1;
		                    this.HP = 60;
		                    this.MP = 5;
		                    this.HP_R = 3;
		                    this.MP_R = 4;
		                    this.setType('armor');
		                    this.description = 'Heavy and protective. An armor only the strongest can use.';
		                    break;


		                    //ADD STAT RANDOMIZATION LATER

		            }
		    }

		    else if (
               ItemType === 4
               ) {
		        var randomVal = 0;
		      
		            randomVal = Math.floor(Math.random() * 11);
		            switch (randomVal) {

		                case 0:
		                    this.itemName = "Steel Sword";

		                     
		                    this.HP = 20;
		                    this.MP = 20;
		                    this.MATK = 0;
		                    this.ATK = 20;
		                    this.STR = 10;
		                    this.INT = 2;
		                    this.AGI = 3;
		                    this.HP_R = 3;
		                    this.MP_R = 2;
		                    this.setType('sword');
		                    this.description = 'Steel swords are only handed for the talented fighters.';

		                    break;
		                case 1:

		                    this.itemName = "Cleaver";

		                     
		                    this.HP = 35;
		                    this.MP = 0;
		                    this.MATK = 0;
		                    this.ATK = 30;
		                    this.STR = 14;
		                    this.INT = 0;
		                    this.AGI = 1;
		                    this.HP_R = 4;
		                    this.MP_R = 2;
		                    this.setType('sword');
		                    this.description = 'Huge axe that can cut through the armor.';
		                    break;
		                case 2:
		                    this.itemName = "Iron Mallet";

		                     
		                    this.HP = 50;
		                    this.MP = 5;
		                    this.MATK = 0;
		                    this.ATK = 33;
		                    this.STR = 15;
		                    this.INT = 0;
		                    this.AGI = 0;
		                    this.HP_R = 5;
		                    this.MP_R = 2;
		                    this.setType('sword');
		                    this.description = 'Dull but powerful mallet.';
		                    break;
		                case 3:

		                    this.itemName = "Imbued Staff";

		                     
		                    this.HP = 15;
		                    this.MP = 60;
		                    this.MATK = 17;
		                    this.ATK = 10;
		                    this.STR = -2;
		                    this.INT = 14;
		                    this.AGI = -2;
		                    this.HP_R = 0;
		                    this.MP_R = 3;
		                    this.setType('sword');
		                    this.description = 'Staff with magical energies.';
		                    break;
		                case 4:

		                    this.itemName = "Grand Staff";

		                     
		                    this.HP = 20;
		                    this.MP = 55;
		                    this.MATK = 15;
		                    this.ATK = 12;
		                    this.STR = 0;
		                    this.INT = 10;
		                    this.AGI = 0;
		                    this.HP_R = 0;
		                    this.MP_R = 10;
		                    this.setType('sword');
		                    this.description = 'Large staff of a wizard. Optimal for firing spells.';
		                    break;
		       
		                case 5:

		                    this.itemName = "Steel Shield";

		                     
		                    this.BLK = 16;
		                    this.STR = 5;

		                    this.INT = 0;
		                    this.AGI = 2;
		                    this.HP = 60;
		                    this.MP = 20;
		                    this.setType('shield');
		                    break;
		                case 6:

		                    this.itemName = "Hardened Shield";

		                     
		                    this.BLK = 20;
		                    this.STR = 6;

		                    this.INT = 0;
		                    this.AGI = 1;
		                    this.HP = 70;
		                    this.MP = 10;
		                    this.setType('shield');
		                    this.description = 'Heavier, but stronger version of the Steel Shield.';
		                    break;

		        
		                case 7:

		                    this.itemName = "Steel Armor";

		                     
		                    this.RES = 16;
		                    this.M_RES = 16;
		                    this.STR = 6;
		                    this.AGI = 3;
		                    this.INT = 0;
		                    this.HP = 90;
		                    this.MP = 20;
		                    this.HP_R = 4;
		                    this.MP_R = 3;
		                    this.setType('armor');
		                    this.description = 'Strong armor for the selected few.';
		                    break;
		                case 8:

		                    this.itemName = "Chainmail";

		                     
		                    this.RES = 12;
		                    this.M_RES = 12;
		                    this.STR = 2;
		                    this.AGI = 6;
		                    this.INT = 1;
		                    this.HP = 80;
		                    this.MP = 50;
		                    this.HP_R = 6;
		                    this.MP_R = 6;
		                    this.setType('armor');
		                    this.description = 'Lightweight armor for the more agile knights. ';
		                    break;


		                case 9:

		                    this.itemName = "Heavy Steel";

		                     
		                    this.RES = 20;
		                    this.M_RES = 20;
		                    this.STR = 8;
		                    this.AGI = 2;
		                    this.INT = -1;
		                    this.HP = 150;
		                    this.MP = 0;
		                    this.HP_R = 8;
		                    this.MP_R = 0;
		                    this.setType('armor');
		                    this.description = 'Armor made of stronger, but heavier steel.';
		                    break;

		                case 10:

		                    this.itemName = "Cotton Robe";

		                     
		                    this.RES = 6;
		                    this.M_RES = 24;
		                    this.STR = 0;
		                    this.AGI = 0;
		                    this.INT = 10;
		                    this.HP = 25;
		                    this.MP = 135;
		                    this.HP_R = 2;
		                    this.MP_R = 5;
		                    this.setType('armor');
		                    this.description = "Cotton robe let's the users to restore their energies faster.";
		                    break;

		            
		            //ADD STAT RANDOMIZATION LATER

		        }
		    }

		    else if (
               ItemType === 5
               ) {
		   
		        var randomVal = 0;
		      
		            randomVal = Math.floor(Math.random() * 9);
		            switch (randomVal) {

		                case 0:
		                    this.itemName = "Mythril Sword";

		                     
		                    this.HP = 35;
		                    this.MP = 35;
		                    this.MATK = 5;
		                    this.ATK = 30;
		                    this.STR = 15;
		                    this.INT = 3;
		                    this.AGI = 5;
		                    this.HP_R = 3;
		                    this.MP_R = 4;
		                    this.setType('sword');
		                    this.description = 'Powerful weapon made of one of the rarest materials.';

		                    break;
		                case 1:

		                    this.itemName = "Elven Blade";

		                     
		                    this.HP = 15;
		                    this.MP = 20;
		                    this.MATK = 10;
		                    this.ATK = 25;
		                    this.STR = 9;
		                    this.INT = 4;
		                    this.AGI = 12;
		                    this.HP_R = 3;
		                    this.MP_R = 5;
		                    this.setType('sword');
		                    this.description = 'Special blade forged by the elves.';
		                    break;
		                case 2:
		                    this.itemName = "Great Sword";

		                     
		                    this.HP = 60;
		                    this.MP = 10;
		                    this.MATK = 5;
		                    this.ATK = 40;
		                    this.STR = 20;
		                    this.INT = 2;
		                    this.AGI = 0;
		                    this.HP_R = 6;
		                    this.MP_R = 0;
		                    this.setType('sword');
		                    this.description = 'Great sword capable of fighting the demons.';
		                    break;
		                case 3:

		                    this.itemName = "Mythril Staff";

		                     
		                    this.HP = 15;
		                    this.MP = 100;
		                    this.MATK = 20;
		                    this.ATK = 10;
		                    this.STR = 3;
		                    this.INT = 18;
		                    this.AGI = 0;
		                    this.HP_R = 0;
		                    this.MP_R = 12;
		                    this.setType('sword');
		                    this.description = 'Powerful staff made of one of the rarest materials.';
		                    break;
		                case 4:

		                    this.itemName = "Golden Oak";

		                     
		                    this.HP = 0;
		                    this.MP = 80;
		                    this.MATK = 30;
		                    this.ATK = 10;
		                    this.STR = 2;
		                    this.INT = 25;
		                    this.AGI = 0;
		                    this.HP_R = -1;
		                    this.MP_R = 4;
		                    this.setType('sword');
		                    this.description = 'Staves made from Golden Oak hold replenishing powers.';
		                    break;
		           
		                case 5:

		                    this.itemName = "Mythril Shield";

		                     
		                    this.BLK = 16;
		                    this.STR = 8;

		                    this.INT = 4;
		                    this.AGI = 2;
		                    this.HP = 80;
		                    this.MP = 30;
		                    this.setType('shield');
		                    this.description = 'Powerful shield made of one of the rarest materials.';
		                    break;
		                case 6:

		                    this.itemName = "Magic Shield";

		                     
		                    this.BLK = 16;
		                    this.STR = 4;

		                    this.INT = 8;
		                    this.AGI = 0;
		                    this.HP = 30;
		                    this.MP = 70;
		                    this.setType('shield');
		                    this.description = 'Magical shield for the warriors fighting with spells.';
		                    break;

		            
		                case 7:

		                    this.itemName = "Mythril Armor";

		                     
		                    this.RES = 20;
		                    this.M_RES = 20;
		                    this.STR = 6;
		                    this.AGI = 2;
		                    this.INT = 4;
		                    this.HP = 80;
		                    this.MP = 40;
		                    this.HP_R = 3;
		                    this.MP_R = 5;
		                    this.setType('armor');
		                    this.description = 'Powerful armor made of one of the rarest materials.';
		                    break;
		                case 8:

		                    this.itemName = "Imbued Robe";

		                     
		                    this.RES = 12;
		                    this.M_RES = 24;
		                    this.STR = -2;
		                    this.AGI = -2;
		                    this.INT = 10;
		                    this.HP = 30;
		                    this.MP = 100;
		                    this.HP_R = 3;
		                    this.MP_R = 7;
		                    this.setType('armor');
		                    this.description = 'Robe imbued with arcane energies.';
		                    break;


		               

		            
		            //ADD STAT RANDOMIZATION LATER

		        }
		   
		    }

		    else if (
               ItemType === 6
               ) {
		        var randomVal = 0;
		      
		            randomVal = Math.floor(Math.random() * 11);
		            switch (randomVal) {

		                case 0:
		                    this.itemName = "Delisirrian Swd.";

		                     
		                    
		                    this.ATK = 50;
		                    this.MATK = 15;

		                    this.HP = 40;
		                    this.MP = 30;
		                    
		                    this.STR = 20;
		                    this.INT = 2;
		                    this.AGI = 10;
		                    this.HP_R = 10;
		                    this.MP_R = 2;
		                    this.setType('sword');
		                    this.description = 'Sword used by Delisirrian Demon Knights.';

		                    break;
		                case 1:

		                     

		                    this.ATK = 40;
		                    this.MATK = 25;

		                    this.HP = 35;
		                    this.MP = 40;

		                    this.STR = 15;
		                    this.INT = 15;
		                    this.AGI = 0;
		                    this.HP_R = 9;
		                    this.MP_R = 4;
		                    this.setType('sword');

		                    this.description = 'Rare weapon of the now fallen Paladins.';
		                    break;
		                case 2:
		                    this.itemName = "Claymore";

		                     

		                    this.ATK = 60;
		                    this.MATK = 10;

		                    this.HP = 65;
		                    this.MP = 0;

		                    this.STR = 25;
		                    this.INT = 1;
		                    this.AGI = 5;
		                    this.HP_R = 11;
		                    this.MP_R = 2;
		                    this.setType('sword');

		                    this.description = 'Weapon for the captain of the Knights.';
		                    break;
		                case 3:

		                    this.itemName = "Executor's Axe";

		                     

		                    this.ATK = 80;
		                    this.MATK = 0;

		                    this.HP = 80;
		                    this.MP = 0;

		                    this.STR = 30;
		                    this.INT = 0;
		                    this.AGI = 0;
		                    this.HP_R = 12;
		                    this.MP_R = 1;
		                    this.setType('sword');
		                    this.description = 'Weapon used to end the lives of the criminals.';
		                    break;
		                case 4:

		                    this.itemName = "Delisirrian Sta.";

		                     

		                    this.ATK = 10;
		                    this.MATK = 50;

		                    this.HP = 10;
		                    this.MP = 125;

		                    this.STR = 0;
		                    this.INT = 50;
		                    this.AGI = 0;
		                    this.HP_R = 0;
		                    this.MP_R = 20;
		                    this.setType('sword');
		                    this.description = 'Magical staff of the Delisirrian Demon Mages.';
		                    break;
		            
		                case 5:

		                    this.itemName = "Delisirrian Sld.";

		                     
		                    this.BLK = 20;
		                    this.STR = 15;

		                    this.INT = 5;
		                    this.AGI = 5;
		                    this.HP = 66;
		                    this.MP = 66;
		                    this.description = 'Shield of a Demon Knight.';
		                    this.setType('shield');
		                    break;
		                case 6:

		                    this.itemName = "Red Shield";

		                     
		                    this.BLK = 16;
		                    this.STR = 20;

		                    this.INT = 0;
		                    this.AGI = 0;
		                    this.HP = 100;
		                    this.MP = 0;
		                    this.setType('shield');
		                    this.description = 'Red shield capable burning energy to its user.';
		                    break;

		                case 7:

		                    this.itemName = "Blue Shield";

		                     
		                    this.BLK = 16;
		                    this.STR = 0;

		                    this.INT = 100;
		                    this.AGI = 0;
		                    this.HP = 0;
		                    this.MP = 100;
		                    this.setType('shield');
		                    this.description = 'Blue shield capable giving arcane energies to its user.';
		                    break;

		                case 8:

		                    this.itemName = "Yellow Shield";

		                     
		                    this.BLK = 16;
		                    this.STR = 0;

		                    this.INT = 0;
		                    this.AGI = 20;
		                    this.HP = 50;
		                    this.MP = 50;
		                    this.setType('shield');
		                    this.description = 'Shield of the Paladins.';
		                    break;

		            
		                case 9:

		                    this.itemName = "Delisirrian Arm.";

		                     
		                    this.RES = 24;
		                    this.M_RES = 24;
		                    this.STR = 10;
		                    this.AGI = 5;
		                    this.INT = 5;
		                    this.HP = 150;
		                    this.MP = 50;
		                    this.HP_R = 7;
		                    this.MP_R = 4;
		                    this.setType('armor');
		                    this.description = 'Armor of the Demon Knights.';
		                    break;
		                case 10:

		                    this.itemName = "Delisirrian Rob.";

		                 
		                     
		                    this.RES = 12;
		                    this.M_RES = 30;
		                    this.STR = 5;
		                    this.AGI = 5;
		                    this.INT = 10;
		                    this.HP = 50;
		                    this.MP = 175;
		                    this.HP_R = 4;
		                    this.MP_R = 7;
		                    this.setType('armor');

		                    this.description = 'Robe worn by the Demon Mages.';
		                    break;




		            
		            //ADD STAT RANDOMIZATION LATER

		        }
		    }

		    else if (
              ItemType === 7
              ) {
		        var randomVal = 0;
		     
		            randomVal = Math.floor(Math.random() * 11);
		            switch (randomVal) {

		                case 0:
		                    this.itemName = "Duelist's Blade";

		                     

		                    this.ATK = 75;
		                    this.MATK = 15;

		                    this.HP = 50;
		                    this.MP = 50;

		                    this.STR = 30;
		                    this.INT = 0;
		                    this.AGI = 30;
		                    this.HP_R = 10;
		                    this.MP_R = 10;
		                    this.setType('sword');
		                    this.description = "Only the sharpest blades can be called 'Duelist's.'";

		                    break;
		                case 1:

		                    this.itemName = "Hero's Sword";

		                     

		                    this.ATK = 60;
		                    this.MATK = 30;

		                    this.HP = 80;
		                    this.MP = 20;

		                    this.STR = 35;
		                    this.INT = 13;
		                    this.AGI = 20;
		                    this.HP_R = 15;
		                    this.MP_R = 8;
		                    this.setType('sword');
		                    this.description = 'The land of Supra was once filled with heroes.';
		                    break;
		                case 2:
		                    this.itemName = "Grand Mallet";

		                     

		                    this.ATK = 90;
		                    this.MATK = 0;

		                    this.HP = 100;
		                    this.MP = 0;

		                    this.STR = 45;
		                    this.INT = 5;
		                    this.AGI = 5;
		                    this.HP_R = 20;
		                    this.MP_R = 5;
		                    this.setType('sword');
		                    this.description = 'Capable for heavy damage.';
		                    break;
		                case 3:

		                    this.itemName = "Wizard's Staff";

		                     

		                    this.ATK = 15;
		                    this.MATK = 100;

		                    this.HP = 10;
		                    this.MP = 150;

		                    this.STR = 5;
		                    this.INT = 70;
		                    this.AGI = 0;
		                    this.HP_R = 5;
		                    this.MP_R = 20;
		                    this.setType('sword');
		                    this.description = 'Staff for the master of magic.';
		                    break;
		                
		           
		                case 4:

		                    this.itemName = "Power Orb";

		                     
		                    this.BLK = 2;
		                    this.STR = 30;

		                    this.INT = -8;
		                    this.AGI = -8;
		                    this.HP = 30;
		                    this.MP = -50;
		                    this.setType('shield');
		                    this.description = 'Orb that empowers the user.';
		                    break;
		                case 5:

		                    this.itemName = "Mana Orb";

		                     
		                    this.BLK = 2;
		                    this.STR = -7;

		                    this.INT = 30;
		                    this.AGI = -7;
		                    this.HP = -40;
		                    this.MP = 30;
		                    this.setType('shield');
		                    this.description = "Magical orb that seems to replenish the user's energies.";
		                    break;

		                case 6:

		                    this.itemName = "Hero's Shield";

		                     
		                    this.BLK = 24;
		                    this.STR = 25;

		                    this.INT = 5;
		                    this.AGI = 5;
		                    this.HP = 125;
		                    this.MP = 60;
		                    this.setType('shield');
		                    this.description = 'Shield of a fallen hero.';
		                    break;

		                case 7:

		                    this.itemName = "Duelist's Shield";

		                     
		                    this.BLK = 16;
		                    this.STR = 15;

		                    this.INT = 10;
		                    this.AGI = 15;
		                    this.HP = 75;
		                    this.MP = 75;
		                    this.setType('shield');
		                    this.description = "Only the best of the shields can be called 'Duel' shields";
		                    break;

		            
		                case 8:

		                    this.itemName = "Hero's Armor";

		                     
		                    this.RES = 24;
		                    this.M_RES = 24;
		                    this.STR = 20;
		                    this.INT = 0;
		                    this.AGI = 10;
		                    this.HP = 125;
		                    this.MP = 80;
		                    this.HP_R = 7;
		                    this.MP_R = 3;
		                    this.setType('armor');
		                    this.description = 'Armor of a fallen hero.';
		                    break;
		                case 9:

		                    this.itemName = "Sage's Robe";

		                     
		                    this.RES = 12;
		                    this.M_RES = 34;
		                    this.STR = 0;
		                    this.INT = 25;
		                    this.AGI = 0;
		                    this.HP = 0;
		                    this.MP = 300;
		                    this.HP_R = 3;
		                    this.MP_R = 10;
		                    this.setType('armor');
		                    this.description = 'Robe with vast magical energies.';
		                    break;

		                case 10:

		                    this.itemName = "Mage's Robe";

		                     
		                    this.RES = 16;
		                    this.M_RES = 24;
		                    this.STR = 2;
		                    this.INT = 22;
		                    this.AGI = 2;
		                    this.HP = 100;
		                    this.MP = 200;
		                    this.HP_R = 5;
		                    this.MP_R = 8;
		                    this.setType('armor');
		                    this.description = 'Robe for fully trained wizard.';
		                    break;





		            
		            

		        }
		    }


		    else if (
         ItemType === "EXTREMEPIGGY"
              ) {
		        var randomVal = 0;
		       
		            randomVal = Math.floor(Math.random() * 3);
		            switch (randomVal) {
		                case 0:
		                    if (ig.game.player.CLASS === "BLADE") {
		                        this.itemName = "Piggy's Spike"

		                         
		                     
		                        this.ATK = 16;
		                        this.MATK = 0;

		                        this.HP = 20;
		                        this.MP = 0;

		                        this.STR = 5;
		                        this.INT = 0;
		                        this.AGI = 1;
		                        this.HP_R = 2;
		                        this.MP_R = 0;
		                        this.setType('sword');
		                        this.SPECIAL.push("Demon Execute");
		                        this.description = "Spike of the Piggy the Guard.";
		                    }
		                    else if (ig.game.player.CLASS === "LIFE") {
		                        this.itemName = "Holy Sword"
		                         
		                        this.ATK = 12;
		                        this.MATK = 3;

		                        this.HP = 15;
		                        this.MP = 5;

		                        this.STR = 2;
		                        this.INT = 2;
		                        this.AGI = 2;
		                        this.HP_R = 1;
		                        this.MP_R = 1;
		                        this.setType('sword');
		                        this.SPECIAL.push("Wise Radiance");
		                        this.description = "Great sword of a holy warrior.";
		                    }
		                    else if (ig.game.player.CLASS === "SPELL") {
		                        this.itemName = "Blessed Staff"
		                         
		                        this.ATK = 5;
		                        this.MATK = 6;

		                        this.HP = 10;
		                        this.MP = 30;

		                        this.STR = 1;
		                        this.INT = 7;
		                        this.AGI = 0;
		                        this.HP_R = 0;
		                        this.MP_R = 4;
		                        this.setType('sword');
		                        this.SPECIAL.push("Grand Return");
		                        this.description = "Powerful memento of a executed wizard.";
		                    }
		                    else {
		                        this.itemName = "Demon Mail"


		                        this.RES = 16;
		                        this.M_RES = 16;
		                        this.STR = 1;
		                        this.INT = 0;
		                        this.AGI = 0;
		                        this.HP = 35;
		                        this.MP = 10;
		                        this.HP_R = 4;
		                        this.MP_R = 1;
		                        this.setType('armor');
		                        this.SPECIAL.push("Dark Aura");
		                        this.description = 'Mail given to Piggy by the Demon Knights.';
		                        break;
		                    }
		                    break;






		                case 1:

		                    this.itemName = "Demon Mail"

		                     
		                    this.RES = 16;
		                    this.M_RES = 16;
		                    this.STR = 1;
		                    this.INT = 0;
		                    this.AGI = 0;
		                    this.HP = 35;
		                    this.MP = 10;
		                    this.HP_R = 4;
		                    this.MP_R = 1;
		                    this.setType('armor');
		                    this.SPECIAL.push("Dark Aura");
		                    this.description = 'Mail given to Piggy by the Demon Knights.';
		                    break;
		                case 2:

		                    this.itemName = "Spell Vest"

		                     
		                    this.RES = 4;
		                    this.M_RES = 16;
		                    this.STR = 0;
		                    this.INT = 2;
		                    this.AGI = 0;
		                    this.HP = 0;
		                    this.MP = 25;
		                    this.HP_R = 1;
		                    this.MP_R = 4;
		                    this.setType('armor');
		                    this.SPECIAL.push("Mage's Will");
		                    this.description = 'Robe that Piggy kept under his armor.';
		                    break;





		            }
		    }

		    else if (
         ItemType === "BOMBLAZORMAN"
              ) {
		        var randomVal = 0;
		   
		            randomVal = Math.floor(Math.random() * 5);
		            switch (randomVal) {

		                case 0:
		                   
		                    if (ig.game.player.CLASS === "BLADE") {
		                        this.itemName = "Devastator"

		                         
		                        this.ATK = 24;
		                        this.MATK = 0;

		                        this.HP = 30;
		                        this.MP = 0;

		                        this.STR = 15;
		                        this.INT = -1;
		                        this.AGI = -1;
		                        this.HP_R = 4;
		                        this.MP_R = -1;
		                        this.SPECIAL.push("Crazed Lust");
		                        this.setType('sword');
		                        this.description = "Heavy axe that empowers the user's lust for blood.";
		                    }
		                    else {
		                        this.itemName = "Exploding Axe"

		                         
		                        this.ATK = 18;
		                        this.MATK = 0;

		                        this.HP = 20;
		                        this.MP = 0;

		                        this.STR = 8;
		                        this.INT = 0;
		                        this.AGI = 1;
		                        this.HP_R = 2;
		                        this.MP_R = 0;
		                        this.SPECIAL.push("Exploding Slams");
		                        this.setType('sword');
		                        this.description = "End result of experimenting with explosives.";
		                    }
		                   
		                    break;
		                case 1:
		                    this.itemName = "Exploding Axe"

		                     
		                    this.ATK = 18;
		                    this.MATK = 0;

		                    this.HP = 20;
		                    this.MP = 0;

		                    this.STR = 8;
		                    this.INT = 0;
		                    this.AGI = 1;
		                    this.HP_R = 2;
		                    this.MP_R = 0;
		                    this.SPECIAL.push("Exploding Slams");
		                    this.setType('sword');
		                    this.description = "End result of experimenting with explosives.";
		                    break;

		                case 2:
		                    this.itemName = "Oaken Pole"

		                     
		                    this.ATK = 12;
		                    this.MATK = 10;

		                    this.HP = 15;
		                    this.MP = 40;

		                    this.STR = 2;
		                    this.INT = 10;
		                    this.AGI = 0;
		                    this.HP_R = 0;
		                    this.MP_R = 6;
		                    this.SPECIAL.push("Mana Pummel");
		                    this.setType('sword');
		                    this.description = "Every hit you make seem to make magic appear.";
		                    break;



		     

		    
		                case 3:
		                    if (ig.game.player.CLASS === "LIFE") {
		                        this.itemName = "Giant's Shield"

		                         
		                        this.BLK = 16;
		                        this.STR = 20;

		                        this.INT = 0;
		                        this.AGI = 0;
		                        this.HP = 100;
		                        this.MP = 0;
		                        this.SPECIAL.push("Giant Barrier");
		                        this.setType('shield');
		                        this.description = 'Shield worn by the legendary Giant Knight.';
		                     
		                    }
		                    else {
		                        this.itemName = "Oaken Pole"


		                         
		                        this.ATK = 12;
		                        this.MATK = 10;

		                        this.HP = 15;
		                        this.MP = 40;

		                        this.STR = 2;
		                        this.INT = 10;
		                        this.AGI = 0;
		                        this.HP_R = 0;
		                        this.MP_R = 6;
		                        this.SPECIAL.push("Mana Pummel");
		                        this.setType('sword');
		                        this.description = "Every hit you make seem to make magic appear.";
		                        
		                    }
		                    break;
		                case 4:
		                    if (ig.game.player.CLASS === "SPELL") {
		                        this.itemName = "Magic Orb"

		                         
		                        this.BLK = 2;
		                        this.STR = -1;

		                        this.INT = 15;
		                        this.AGI = -1;
		                        this.HP = 30;
		                        this.MP = 90;
		                        this.SPECIAL.push("Frozen Death");
		                        this.setType('shield');
		                        this.description = "Orb found from the bombman's baggage.";
		                    }
		                    else {
		                        this.itemName = "Oaken Pole"


		                         
		                        this.ATK = 12;
		                        this.MATK = 10;

		                        this.HP = 15;
		                        this.MP = 40;

		                        this.STR = 2;
		                        this.INT = 10;
		                        this.AGI = 0;
		                        this.HP_R = 0;
		                        this.MP_R = 6;
		                        this.SPECIAL.push("Mana Pummel");
		                        this.setType('sword');
		                        this.description = "Every hit you make seem to make magic appear.";
		                    }
		                    
		                    break;







		        }
		    }

		    else if (
         ItemType === "VIPERSCORPION"
             ) {
		        var randomVal = 0;
		    
		            randomVal = Math.floor(Math.random() * 4);
		            switch (randomVal) {

		                case 0:

		                    if (ig.game.player.CLASS === "BLADE") {
		                        this.itemName = "Viper Slicer"


		                         
		                        this.ATK = 22;
		                        this.MATK = 5;

		                        this.HP = 17;
		                        this.MP = 7;

		                        this.STR = 7;
		                        this.INT = 2;
		                        this.AGI = 5;
		                        this.HP_R = 1;
		                        this.MP_R = 3;
		                        this.SPECIAL.push("Venom Slash");
		                        this.setType('sword');
		                        this.description = "Blade embedded in deadly venom.";
		                    }
		                   
		                    else if (ig.game.player.CLASS === "WIZARD") {
		                        this.itemName = "Green Staff"


		                         
		                        this.ATK = 10;
		                        this.MATK = 15;

		                        this.HP = 15;
		                        this.MP = 50;

		                        this.STR = 3;
		                        this.INT = 15;
		                        this.AGI = 1;
		                        this.HP_R = 1;
		                        this.MP_R = 7;
		                        this.SPECIAL.push("Green Fire");
		                        this.setType('sword');
		                        this.description = "Staff empowers the fire balls with poisonous 'Green Fire'.";
		                    }
		                    else {
		                        this.itemName = "Scorpion's Heart"

		                         
		                        this.BLK = 2;
		                        this.STR = 4;

		                        this.INT = 2;
		                        this.AGI = 4;
		                        this.HP = 50;
		                        this.MP = 50;
		                        this.SPECIAL.push("Harsh Nature");
		                        this.setType('shield');
		                        this.description = "Holding the heart of the fallen scorpion makes you feel more able.";
		                    }

		                    break;
		              



		          

		      
		     
		                case 1:

		                    this.itemName = "Sting Shield"

		                     
		                    this.BLK = 16;
		                    this.STR = 5;

		                    this.INT = 0;
		                    this.AGI = 5;
		                    this.HP = 35;
		                    this.MP = 35;
		                    this.SPECIAL.push("Poisonous Feedback");
		                    this.setType('shield');
		                    this.description = 'Shield full of poisonous spikes.';
		                    break;
		                case 2:

		                    if (ig.game.player.CLASS === "LIFE") {
		                        this.itemName = "Scale Armor"

		                         
		                        this.HP = 10;
		                        this.ATK = 5;
		                        this.STR = 1;
		                        this.AGI = 2;
		                        this.INT = 0;
		                        this.CRIT_DAMAGE = 150;
		                        this.SPECIAL.push("Green Glimmer");
		                        this.setType('armor');
		                        this.description = "Desert Scorpion's scales are extremely durable.";
		                    }
		                    else {
		                        this.itemName = "Sting Shield"

		                         
		                        this.BLK = 16;
		                        this.STR = 5;

		                        this.INT = 0;
		                        this.AGI = 5;
		                        this.HP = 35;
		                        this.MP = 35;
		                        this.SPECIAL.push("Poisonous Feedback");
		                        this.setType('shield');
		                        this.description = 'Shield full of poisonous spikes.';
		                    }
		                    break;

		                case 3:
		                    this.itemName = "Scorpion's Heart"

		                     
		                    this.BLK = 2;
		                    this.STR = 4;

		                    this.INT = 2;
		                    this.AGI = 4;
		                    this.HP = 50;
		                    this.MP = 50;
		                    this.SPECIAL.push("Harsh Nature");
		                    this.setType('shield');
		                    this.description = "Holding the heart of the fallen scorpion makes you feel more able.";
		                    break;






		           

		            }

		    }

		    else if (
         ItemType === "DESERTKNIGHT"
             ) {
		        var randomVal = 0;

		        randomVal = Math.floor(Math.random() * 5);
		        switch (randomVal) {

		            case 0:
		                this.itemName = "Sand Sword"

		                 

		                 
		                this.ATK = 30;
		                this.MATK = 12;

		                this.HP = 40;
		                this.MP = 20;

		                this.STR = 18;
		                this.INT = 8;
		                this.AGI = 1;
		                this.HP_R = 4;
		                this.MP_R = 4;
		                this.SPECIAL.push("Desert Storm");
		                this.setType('sword');
		                this.description = "Weapon of the Desert Knight.";
		                

		                break;








		            case 1:
		                if (ig.game.player.CLASS === "SPELL") {
		                    this.itemName = "Desert Star"


		                     
		                    this.ATK = 25;
		                    this.MATK = 35;

		                    this.HP = 35;
		                    this.MP = 70;

		                    this.STR = 5;
		                    this.INT = 10;
		                    this.AGI = 0;
		                    this.HP_R = 3;
		                    this.MP_R = 8;
		                    this.SPECIAL.push("Legendary Spring");
		                    this.setType('sword');
		                    this.description = 'Mysterious spiked malled used by the Desert Knight.';
		                }
		                else {
		                    this.itemName = "Sand Sword"

		                     
		                    this.ATK = 30;
		                    this.MATK = 12;

		                    this.HP = 40;
		                    this.MP = 20;

		                    this.STR = 18;
		                    this.INT = 8;
		                    this.AGI = 1;
		                    this.HP_R = 4;
		                    this.MP_R = 3;
		                    this.SPECIAL.push("Desert Storm");
		                    this.setType('sword');
		                    this.description = "Weapon of the Desert Knight.";
		                }
		                break;
		            case 2:

		                    this.itemName = "Whirlwind"

		                     
		                    this.RES = 12;
		                    this.M_RES = 24;
		                    this.STR = -2;
		                    this.INT = 10;
		                    this.AGI = -2;
		                    this.HP = 50;
		                    this.MP = 150;
		                    this.HP_R = 3;
		                    this.MP_R = 4;
		                    this.SPECIAL.push("Mirage");
		                    this.setType('armor');
		                    this.description = "Cape with the power of wind.";
		                
		             
		                break;

		            case 3:

		                if (ig.game.player.CLASS === "LIFE") {
		                    this.itemName = "Bonemail"

		                     
		                    this.RES = 18;
		                    this.M_RES = 18;
		                    this.STR = 10;
		                    this.INT = -3;
		                    this.AGI = 5;
		                    this.HP = 90;
		                    this.MP = 60;
		                    this.HP_R = 4;
		                    this.MP_R = 3;
		                    this.SPECIAL.push("Dragonbone");
		                    this.setType('armor');
		                    this.description = "Armor made of the bones of fallen enemies.";
		                }
                        else {
		                    this.itemName = "Whirlwind"

		                     
		                    this.RES = 12;
		                    this.M_RES = 24;
		                    this.STR = -2;
		                    this.INT = 10;
		                    this.AGI = -2;
		                    this.HP = 50;
		                    this.MP = 150;
		                    this.HP_R = 3;
		                    this.MP_R = 4;
		                    this.SPECIAL.push("Mirage");
		                    this.setType('armor');
		                    this.description = "Cape with the power of wind.";
		                    }
		                    break;
		               
		            case 4:
		                if (ig.game.player.CLASS === "LIFE") {
		                    this.itemName = "Sacred Relic"

		                     
		                    this.BLK = 2;
		                    this.STR = 8;

		                    this.INT = 8;
		                    this.AGI = 8;
		                    this.HP = 70;
		                    this.MP = 70;
		                    this.SPECIAL.push("Final Stand");
		                    this.setType('shield');
		                    this.description = "Sacred relic used by great paladins.";
		                }
		                else {
		                    this.itemName = "Whirlwind"

		                     
		                    this.RES = 12;
		                    this.M_RES = 24;
		                    this.STR = -2;
		                    this.INT = 10;
		                    this.AGI = -2;
		                    this.HP = 50;
		                    this.MP = 150;
		                    this.HP_R = 3;
		                    this.MP_R = 4;
		                    this.SPECIAL.push("Mirage");
		                    this.setType('armor');
		                    this.description = "Cape with the power of wind.";
		                }
		                break;









		        }

		    }

		    else if (
         ItemType === "GRANDMANCER"
            ) {
		        var randomVal = 0;

		        randomVal = Math.floor(Math.random() * 5);
		        switch (randomVal) {

		            case 0:
		                if (ig.game.player.CLASS === "LIFE") {
		                    this.itemName = "Mystic Skull"

		                     
		                    this.BLK = 2;
		                    this.STR = 10;

		                    this.INT = 10;
		                    this.AGI = -8;
		                    this.HP = 90;
		                    this.MP = 90;
		                    this.SPECIAL.push("Dark Light");
		                    this.setType('shield');
		                    this.description = "Dark energies flow within this abomination";
		                }
		                else {
		                    this.itemName = "Blood Sword"

		                     
		                    this.ATK = 40;
		                    this.MATK = 0;

		                    this.HP = 50;
		                    this.MP = 0;

		                    this.STR = 20;
		                    this.INT = 0;
		                    this.AGI = 10;
		                    this.HP_R = 8;
		                    this.MP_R = 2;
		                    this.SPECIAL.push("Flesh Blade");
		                    this.setType('sword');
		                    this.description = 'The bleeding blade. Every hit makes the blade sharper.';
		                }


		                break;








		            case 1:
		               
		                    this.itemName = "Blood Sword"

		                     
		                    this.ATK = 40;
		                    this.MATK = 0;

		                    this.HP = 50;
		                    this.MP = 0;

		                    this.STR = 20;
		                    this.INT = 0;
		                    this.AGI = 10;
		                    this.HP_R = 8;
		                    this.MP_R = 2;
		                    this.SPECIAL.push("Flesh Blade");
		                    this.setType('sword');
		                    this.description = 'The bleeding blade. Every hit makes the blade sharper.';
		               
		                break;
		            case 2:

		                this.itemName = "Dark Staff"

		                 
		                this.ATK = 15;
		                this.MATK = 40;

		                this.HP = 25;
		                this.MP = 150;

		                this.STR = 5;
		                this.INT = 30;
		                this.AGI = 0;
		                this.HP_R = 2;
		                this.MP_R = 13;
		                this.SPECIAL.push("Spell Focus");
		                this.setType('sword');
		                this.description = "Legendary staff for the dark wizards.";


		                break;

		            case 3:

		                if (ig.game.player.CLASS === "SPELL") {
		                    this.itemName = "Necro Book"

		                     
		                    this.BLK = 2;
		                    this.STR = -2;

		                    this.INT = 20;
		                    this.AGI = -2;
		                    this.HP = -50;
		                    this.MP = 150;
		                    this.SPECIAL.push("Dark Matter");
		                    this.setType('shield');
		                    this.description = "Book with learnings of forbidden magic, 'Dark Matter'";
		                }
		                else {
		                    this.itemName = "Dark Staff"

		                     
		                    this.ATK = 15;
		                    this.MATK = 40;

		                    this.HP = 25;
		                    this.MP = 150;

		                    this.STR = 5;
		                    this.INT = 30;
		                    this.AGI = 0;
		                    this.HP_R = 2;
		                    this.MP_R = 13;
		                    this.SPECIAL.push("Spell Focus");
		                    this.setType('sword');
		                    this.description = "Legendary staff for the dark wizards.";
		                }
		                break;

		            case 4:
		                if (ig.game.player.CLASS === "BLADE") {
		                    this.itemName = "Black Hood"

		                     
		                    this.RES = 16;
		                    this.M_RES = 24;
		                    this.STR = 10;
		                    this.INT = -2;
		                    this.AGI = 10;
		                    this.HP = 100;
		                    this.MP = 90;
		                    this.HP_R = 4;
		                    this.MP_R = 4;
		                    this.SPECIAL.push("Shock Therapy");
		                    this.setType('armor');
		                    this.description = "Users of this hood seem to fire endless strings of shockwaves.";
		                }
		                else {
		                    this.itemName = "Blood Sword"

		                     
		                    this.ATK = 40;
		                    this.MATK = 0;

		                    this.HP = 50;
		                    this.MP = 0;

		                    this.STR = 20;
		                    this.INT = 0;
		                    this.AGI = 10;
		                    this.HP_R = 8;
		                    this.MP_R = 2;
		                    this.SPECIAL.push("Flesh Blade");
		                    this.setType('sword');
		                    this.description = 'The bleeding blade. Every hit makes the blade sharper.';
		                }
		                break;









		        }

		    }

		    else if (
         ItemType === "MAGMAWORM"
            ) {
		        var randomVal = 0;

		        randomVal = Math.floor(Math.random() * 5);
		        switch (randomVal) {

		            case 0:
		                if (ig.game.player.CLASS === "BLADE") {
		                    this.itemName = "Flamebrand"

		                     
		                    this.ATK = 22;
		                    this.MATK = 22;

		                    this.HP = 60;
		                    this.MP = 30;

		                    this.STR = 18;
		                    this.INT = 3;
		                    this.AGI = 15;
		                    this.HP_R = 8;
		                    this.MP_R = 5;
		                    this.SPECIAL.push("Flame Slashes");
		                    this.setType('sword');
		                    this.description = "A sword left inside the Magma Worm.";
		                }
		                else {
		                    this.itemName = "Terrafire"

		                     
		                    this.RES = 24;
		                    this.M_RES = 24;
		                    this.STR = 10;
		                    this.INT = 8;
		                    this.AGI = 5;
		                    this.HP = 70;
		                    this.MP = 120;
		                    this.HP_R = 5;
		                    this.MP_R = 3;
		                    this.SPECIAL.push("Heat");
		                    this.setType('armor');
		                    this.description = 'Legendary armor that burns enemies around you.';
		                }


		                break;








		            case 1:

		                this.itemName = "Terrafire"

		                 
		                this.RES = 24;
		                this.M_RES = 24;
		                this.STR = 10;
		                this.INT = 8;
		                this.AGI = 5;
		                this.HP = 70;
		                this.MP = 120;
		                this.HP_R = 5;
		                this.MP_R = 3;
		                this.SPECIAL.push("Heat");
		                this.setType('armor');
		                this.description = 'Legendary armor that burns enemies around you.';

		                break;
		            case 2:
		                if (ig.game.player.CLASS === "SPELL") {
		                    this.itemName = "Pyroforian"

		                     
		                    this.ATK = 10;
		                    this.MATK = 50;

		                    this.HP = 20;
		                    this.MP = 140;

		                    this.STR = 5;
		                    this.INT = 40;
		                    this.AGI = 5;
		                    this.HP_R = 2;
		                    this.MP_R = 14;
		                    this.SPECIAL.push("Master of Fire");
		                    this.setType('sword');
		                    this.description = "Staff used by the masters of flame.";
		                }
		                else {
		                    this.itemName = "Terrafire"

		                     
		                    this.RES = 24;
		                    this.M_RES = 24;
		                    this.STR = 10;
		                    this.INT = 8;
		                    this.AGI = 5;
		                    this.HP = 70;
		                    this.MP = 120;
		                    this.HP_R = 5;
		                    this.MP_R = 3;
		                    this.SPECIAL.push("Heat");
		                    this.setType('armor');
		                    this.description = 'Legendary armor that burns enemies around you.';
		                }

		                break;

		            case 3:

		               
		                    this.itemName = "Emberstone"

		                     
		                    this.BLK = 2;
		                    this.STR = 12;

		                    this.INT = 2;
		                    this.AGI = 2;
		                    this.HP = 100;
		                    this.MP = 40;
		                    this.SPECIAL.push("Greatworm's Heart");
		                    this.setType('shield');
		                    this.description = "The stone of immortality.";
		                
		                break;

		            case 4:
		                if (ig.game.player.CLASS === "LIFE") {
		                    this.itemName = "Flame Guard"

		                     
		                    this.HP = 10;
		                    this.ATK = 5;
		                    this.STR = 1;
		                    this.AGI = 2;
		                    this.INT = 0;
		                    this.CRIT_DAMAGE = 150;
		                    this.SPECIAL.push("Flame Shield");
		                    this.setType('armor');
		                    this.description = "Shield, that will burn the enemies with holy light.";
		                }
		                else {
		                    this.itemName = "Emberstone"

		                     
		                    this.BLK = 2;
		                    this.STR = 12;

		                    this.INT = 2;
		                    this.AGI = 2;
		                    this.HP = 100;
		                    this.MP = 40;
		                    this.SPECIAL.push("Greatworm's Heart");
		                    this.setType('shield');
		                    this.description = "The stone of immortality.";
		                }
		                break;









		        }

		    }

		    else if (
         ItemType === "RAGEKNIGHT"
           ) {
		        var randomVal = 0;

		        randomVal = Math.floor(Math.random() * 5);
		        switch (randomVal) {

		            case 0:
		                if (ig.game.player.CLASS === "BLADE") {
		                    this.itemName = "Axe of Madman"

		                     
		                    this.ATK = 50;
		                    this.MATK = 0

		                    this.HP = 120;
		                    this.MP = 30;

		                    this.STR = 25;
		                    this.INT = 0;
		                    this.AGI = 5;
		                    this.HP_R = 9;
		                    this.MP_R = 2;
		                    this.SPECIAL.push("Crazed Frenzy");
		                    this.setType('sword');
		                    this.description = "You can feel the madness and despair.";
		                }
		                else {
		                    this.itemName = "Berserker"

		                     
		                    this.RES = 16;
		                    this.M_RES = 16;
		                    this.STR = 15;
		                    this.INT = 0;
		                    this.AGI = 15;
		                    this.HP = 200;
		                    this.MP = 200;
		                    this.HP_R = 0;
		                    this.MP_R = 0;
		                    this.SPECIAL.push("Berserk");
		                    this.setType('armor');
		                    this.description = 'You only feel...rage!';
		                }


		                break;








		            case 1:

		                this.itemName = "Berserker"

		                 
		                this.RES = 16;
		                this.M_RES = 16;
		                this.STR = 15;
		                this.INT = 0;
		                this.AGI = 15;
		                this.HP = 200;
		                this.MP = 200;
		                this.HP_R = 0;
		                this.MP_R = 0;
		                this.SPECIAL.push("Berserk");
		                this.setType('armor');
		                this.description = 'You only feel...rage!';

		                break;
		            case 2:
		                if (ig.game.player.CLASS === "SPELL") {
		                    this.itemName = "Agony"

		                     
		                    this.ATK = 10;
		                    this.MATK = 45;

		                    this.HP = 20;
		                    this.MP = 130;

		                    this.STR = 0;
		                    this.INT = 45;
		                    this.AGI = 0;
		                    this.HP_R = 2;
		                    this.MP_R = 15;
		                    this.SPECIAL.push("Intense Pain");
		                    this.setType('sword');
		                    this.description = "Staff used by the demon torturers.";
		                }
		                else {
		                    this.itemName = "Rage"

		                     
		                    this.BLK = 24;
		                    this.STR = 25;

		                    this.INT = -5;
		                    this.AGI = -5;
		                    this.HP = 150;
		                    this.MP = -20;
		                    this.SPECIAL.push("Bloodrage");
		                    this.setType('shield');
		                    this.description = "Every foe that falls to your blade energizes.";
		                }

		                break;

		            case 3:


		                this.itemName = "Rage"

		                 
		                this.BLK = 24;
		                this.STR = 25;

		                this.INT = -5;
		                this.AGI = -5;
		                this.HP = 150;
		                this.MP = -20;
		                this.SPECIAL.push("Bloodrage");
		                this.setType('shield');
		                this.description = "Every foe that falls to your blade energizes.";

		                break;

		            case 4:
		                if (ig.game.player.CLASS === "LIFE") {
		                    this.itemName = "Mad Fury"

		                     
		                    this.ATK = 30;
		                    this.MATK = 25;

		                    this.HP = 70;
		                    this.MP = 30;

		                    this.STR = 15;
		                    this.INT = 10;
		                    this.AGI = 5;
		                    this.HP_R = 5;
		                    this.MP_R = 5;
		                    this.SPECIAL.push("Mad Tap");
		                    this.setType('sword');
		                    this.description = "Sword capable of devastating even the strongest enemies.";
		                }
		                else {
		                    this.itemName = "Rage"

		                     
		                    this.BLK = 24;
		                    this.STR = 25;

		                    this.INT = -5;
		                    this.AGI = -5;
		                    this.HP = 150;
		                    this.MP = -20;
		                    this.SPECIAL.push("Bloodrage");
		                    this.setType('shield');
		                    this.description = "Every foe that falls to your blade energizes.";
		                }
		                break;









		        }

		    }


		    else if (
         ItemType === "BLACKKNIGHT"
          ) {
		        var randomVal = 0;

		        randomVal = Math.floor(Math.random() * 5);
		        switch (randomVal) {

		            case 0:
		                if (ig.game.player.CLASS === "BLADE") {
		                    this.itemName = "Cursed Mageslayer"

		                     
		                    this.ATK = 65;
		                    this.MATK = 20;

		                    this.HP = 100;
		                    this.MP = 40;

		                    this.STR = 35;
		                    this.INT = 25;
		                    this.AGI = 25;
		                    this.HP_R = 10;
		                    this.MP_R = 10;
		                    this.SPECIAL.push("Demon's Bane");
		                    this.setType('sword');
		                    this.description = "As Baston corrupted, so did the legendary blade.";
		                }
		                else {
		                    this.itemName = "Demon Shield"

		                     
		                    this.BLK = 24;
		                    this.STR = 30;

		                    this.INT = -4;
		                    this.AGI = 5;
		                    this.HP = 166;
		                    this.MP = 30;
		                    this.SPECIAL.push("Mystic Sphere");
		                    this.setType('shield');
		                    this.description = 'Shield of a demon lord. Extremely sturdy.';
		                }


		                break;








		            case 1:

		                this.itemName = "Demon Shield"

		                 
		                this.BLK = 24;
		                this.STR = 30;

		                this.INT = -4;
		                this.AGI = 5;
		                this.HP = 166;
		                this.MP = 30;
		                this.SPECIAL.push("Mystic Sphere");
		                this.setType('shield');
		                this.description = 'Shield of a demon lord. Extremely sturdy.';

		                break;
		            case 2:
		                if (ig.game.player.CLASS === "LIFE") {
		                    this.itemName = "Fallen Armor"

		                     
		                    this.RES = 24;
		                    this.M_RES = 24;
		                    this.STR = 15;
		                    this.INT = 15;
		                    this.AGI = 0;
		                    this.HP = 250;
		                    this.MP = 50;
		                    this.HP_R = 5;
		                    this.MP_R = 5;
		                    this.SPECIAL.push("Redemption");
		                    this.setType('armor');
		                    this.description = "Armor worn by fallen heroes.";
		                }
		                else {
		                    this.itemName = "Demon Shield"

		                     
		                    this.BLK = 24;
		                    this.STR = 30;

		                    this.INT = -4;
		                    this.AGI = 5;
		                    this.HP = 166;
		                    this.MP = 30;
		                    this.SPECIAL.push("Mystic Sphere");
		                    this.setType('shield');
		                    this.description = 'Shield of a demon lord. Extremely sturdy.';
		                }

		                break;

		            case 3:


		                this.itemName = "Yggdrassil"

		                 
		                this.ATK = 30;
		                this.MATK = 50;

		                this.HP = 40;
		                this.MP = 80;

		                this.STR = 20;
		                this.INT = 30;
		                this.AGI = 15;
		                this.HP_R = 8;
		                this.MP_R = 15;
		                this.SPECIAL.push("Hero's Protection");
		                this.setType('sword');
		                this.description = "Legendary sword, blessed with the power of life.";

		                break;

		            case 4:
		                if (ig.game.player.CLASS === "SPELL") {
		                    this.itemName = "Demon Orb"

		                     
		                    this.BLK = 2;
		                    this.STR = 5;

		                    this.INT = 35;
		                    this.AGI = 0;
		                    this.HP = 20;
		                    this.MP = 150;
		                    this.SPECIAL.push("Demonic Leech");
		                    this.setType('shield');
		                    this.description = "Demonic orb used to leech the energies of your enemies.";
		                }
		                else {
		                    this.itemName = "Demon Shield"

		                     
		                    this.BLK = 24;
		                    this.STR = 30;

		                    this.INT = -4;
		                    this.AGI = 5;
		                    this.HP = 166;
		                    this.MP = 30;
		                    this.SPECIAL.push("Mystic Sphere");
		                    this.setType('shield');
		                    this.description = 'Shield of a demon lord. Extremely sturdy.';
		                }
		                break;









		        }

		    }

		    else if (
         ItemType === "DEMONKING"
         ) {
		        var randomVal = 0;

		        randomVal = Math.floor(Math.random() * 5);
		        switch (randomVal) {

		            case 0:
		               
		                    this.itemName = "Tetrarz"

		                     
		                    this.ATK = 10;
		                    this.MATK = 88;

		                    this.HP = 20;
		                    this.MP = 200;

		                    this.STR = 5;
		                    this.INT = 60;
		                    this.AGI = 0;
		                    this.HP_R = 5;
		                    this.MP_R = 25;
		                    this.SPECIAL.push("Ember Pyre");
		                    this.setType('sword');
		                    this.description = "The legendary staff, Tetrarz. ";
		                
		           

		                break;








		            case 1:

		                this.itemName = "Elemental Armor"

		                 
		                this.RES = 24;
		                this.M_RES = 30;
		                this.STR = 10;
		                this.INT = 15;
		                this.AGI = 10;
		                this.HP = 250;
		                this.MP = 50;
		                this.HP_R = 5;
		                this.MP_R = 5;
		                this.SPECIAL.push("Dispersion");
		                this.setType('armor');
		                this.description = 'Armor that negates the elemental damage.';

		                break;
		            case 2:
		               
		                    this.itemName = "Frostfire Sword"

		                     
		                    this.ATK = 44;
		                    this.MATK = 33;

		                    this.HP = 80;
		                    this.MP = 50;

		                    this.STR = 35;
		                    this.INT = 15;
		                    this.AGI = 10;
		                    this.HP_R = 7;
		                    this.MP_R = 12;
		                    this.SPECIAL.push("Frostburn");
		                    this.setType('sword');
		                    this.description = "Sword that chills the enemies with frostburns.";
		                

		                break;

		            case 3:


		                this.itemName = "Demon's Heart"

		                 
		                this.BLK = 2;
		                this.STR = 25;

		                this.INT = 5;
		                this.AGI = 10;
		                this.HP = 100;
		                this.MP = 70;
		                this.SPECIAL.push("Demon's Heart");
		                this.setType('shield');
		                this.description = "Heart of the demon is a source of true strength.";

		                break;

		            case 4:
		                
		                    this.itemName = "Sovereign"

		                     
		                    this.BLK = 20;
		                    this.STR = 16;

		                    this.INT = 16;
		                    this.AGI = 16;
		                    this.HP = 77;
		                    this.MP = 77;
		                    this.SPECIAL.push("Sovereign");
		                    this.setType('shield');
		                    this.description = "Shield wielded by the king of the demons.";
		                
		                break;









		        }

		    }

		    else if (
         ItemType === "VOIDKING"
         ) {
		        var randomVal = 0;

		        randomVal = Math.floor(Math.random() * 5);
		        switch (randomVal) {

		            case 0:

		                this.itemName = "The Void"

		                 
		                this.ATK = 100;
		                this.MATK = 50;

		                this.HP = 100;
		                this.MP = 100;

		                this.STR = 40;
		                this.INT = 25;
		                this.AGI = 10;
		                this.HP_R = 15;
		                this.MP_R = 10;
		                this.SPECIAL.push("Singularity Strike");
		                this.setType('sword');
		                this.description = "The area around the blade seem to disappear.";



		                break;








		            case 1:

		                this.itemName = "Abyss"

		                 
		                this.ATK = 135;
		                this.MATK = 0;

		                this.HP = 150;
		                this.MP = 0;

		                this.STR = 50;
		                this.INT = 0;
		                this.AGI = 35;
		                this.HP_R = 25;
		                this.MP_R = 7;
		                this.SPECIAL.push("Grudge");
		                this.setType('sword');
		                this.description = 'Considered the most powerful weapon in the world.';

		                break;
		            case 2:

		                this.itemName = "Summoning Stone"

		                 
		                this.BLK = 2;
		                this.STR = 25;

		                this.INT = 25
		                this.AGI = 25;
		                this.HP = 250;
		                this.MP = 250;
		                this.SPECIAL.push("Grand Energy");
		                this.setType('shield');
		                this.description = "Legendary stone used to summon the Winter Witch.";


		                break;

		            case 3:


		                this.itemName = "Black Staff"

		                 
		                this.ATK = 20;
		                this.MATK = 150;

		                this.HP = 50;
		                this.MP = 200;

		                this.STR = 10;
		                this.INT = 75;
		                this.AGI = 0;
		                this.HP_R = 10;
		                this.MP_R = 35;
		                this.SPECIAL.push("Dark Energy");
		                this.setType('sword');
		                this.description = "The grand staff of the black mages.";

		                break;

		            case 4:

		                this.itemName = "Sage's Memento"

		            
		                this.BLK = 2;
		                this.STR = 5;

		                this.INT = 40
		                this.AGI = 0;
		                this.HP = 100;
		                this.MP = 100;
		                this.SPECIAL.push("Guarding Light");
		                this.setType('shield');
		                this.description = "Memento of the fallen sage.";

		                break;









		        }

		    }
		    this.generaterandomSpecials(ItemType);
		   
		    if (ItemType !== "SKIP") {
		        if (difficultyLevel === 1) {
		            this.bonusStats = 1;
		        }
		        else if (difficultyLevel === 2) {
		            this.bonusStats = 1.5;
		        }
		        else if (difficultyLevel === 3) {
		            this.bonusStats = 2;
		        }

		        this.ATK = Math.ceil(this.ATK * this.QualityScale);
		        this.MATK = Math.ceil(this.MATK * this.QualityScale);
		        this.STR = Math.ceil(this.STR * this.QualityScale);
		        this.INT = Math.ceil(this.INT * this.QualityScale);
		        this.AGI = Math.ceil(this.AGI * this.QualityScale);


		        this.HP = Math.ceil(this.HP * this.QualityScale);
		        this.MP = Math.ceil(this.MP * this.QualityScale);
		        this.HP_R = Math.ceil(this.HP_R * this.QualityScale);
		        this.MP_R = Math.ceil(this.MP_R * this.QualityScale);
		    }
		    else {

		        this.ATK = Math.ceil(this.ATK * this.QualityScale * this.bonusStats);
		        this.MATK = Math.ceil(this.MATK * this.QualityScale * this.bonusStats);
		        this.STR = Math.ceil(this.STR * this.QualityScale * this.bonusStats);
		        this.INT = Math.ceil(this.INT * this.QualityScale * this.bonusStats);
		        this.AGI = Math.ceil(this.AGI * this.QualityScale * this.bonusStats);


		        this.HP = Math.ceil(this.HP * this.QualityScale * this.bonusStats);
		        this.MP = Math.ceil(this.MP * this.QualityScale * this.bonusStats);
		        this.HP_R = Math.ceil(this.HP_R * this.QualityScale * this.bonusStats);
		        this.MP_R = Math.ceil(this.MP_R * this.QualityScale * this.bonusStats);
		    }
		   
		   

		

			if (this.SPECIAL["Heavy W"]) this.ATK *= 1.1;
			if (this.SPECIAL["Light W"]) this.ATK *= 0.9;
			if (this.SPECIAL["Dull"]) this.CRIT = 0;

			if (this.SPECIAL["Chosen's Power"]) this.ATK *= 1.2;


			if (this.SPECIAL["Heavy S"]) this.BLK += -8;
			if (this.SPECIAL["Light S"]) this.BLK += 16;

			if (this.SPECIAL["Grand Shield"]) this.BLK += 25;
			
			if (this.SPECIAL["Godlike blocks"]) {
			    this.BLK += 24;
			}


			if (this.SPECIAL["Light W"]) this.CRIT += 5;
			if (this.SPECIAL["Sharp"]) this.CRIT += 3;

			if (this.SPECIAL["Honor"]) {
			    this.CRIT += 10;

			}

			if (this.SPECIAL["Berserk"]) {
			    this.RES *= 0.5;
			    this.M_RES *= 0.5;
			    this.HP_R *= 1.4;
			    this.MP_R *= 1.4;
			 
			}

			if (this.SPECIAL["Heavy A"]) {
			    this.HP+= 15;

			}
			if (this.SPECIAL["Light A"]) {
			    this.HP_R += 3;

			}

			if (this.SPECIAL["Imbued"]) {
			    this.MRES += 25;


			}
			if (this.SPECIAL["Chromatic"]) {
			    this.M_RES += 20;


			}
			if (this.SPECIAL["Harsh Nature"]) {
			    this.RES += 20;
			    this.M_RES += 20;


			}



			if (this.SPECIAL["Concentration"]) this.MP_R *= 1.25;

			if (this.SPECIAL["Replenish"]) {
			    this.HP_R += 4;
			    this.MP_R += 4;
			}
			if (this.SPECIAL["Dark Energy"]) {

			    this.MP_R += 15;
			 
			}
			if (this.SPECIAL["High Spirit"]) {
			    this.HP += 5;

			}
			if (this.SPECIAL["Resourceful"]) {
			    this.MP += 5;

			}
			if (this.SPECIAL["Demon Armor"]) {
			    this.HP *= 0.8;
                
			    this.HP_R += 10;
			}

			if (this.SPECIAL["Fortitude"]) {
			    this.HP += 50;
			    this.HP_R += 5;
			}
			if (this.SPECIAL["Greatworm's Heart"]) {

			    this.MP_R = -8;
			}


			if (this.SPECIAL["Insanity"]) {

			    this.INT -= 5;
			}
			if (this.SPECIAL["Blessed"]) {
			    this.STR *= 1.1;
			    this.INT *= 1.1;
			    this.AGI *= 1.1;
			}
			if (this.SPECIAL["Cursed"]) {
			    this.STR *= 0.9;
			    this.INT *= 0.9;
			    this.AGI *= 0.9;
			}
			if (this.SPECIAL["Titan's Signet"]) {
			    this.STR += 20;

			}
			if (this.SPECIAL["Demonic Blessing"]) {
			    this.HP += 100;

			}
			if (this.SPECIAL["Koz's Whisper"]) {
			    this.INT += 20;

			}

			if (this.SPECIAL["High Spirit"]) {
			    this.STR += 5;

			}
			if (this.SPECIAL["Resourceful"]) {
			    this.INT += 5;

			}
			if (this.SPECIAL["Grand Energy"]) {

			    this.MP_R = -16;
			}
		
		},
	
		setType: function (value) {
		    this.isSword = false;
		    this.isShield = false;
		    this.isArmor = false;
		    switch (value) {
             
		        case 'sword':
		            this.isSword = true;
		            break;
		        case 'armor':
		            this.isArmor = true;
		            break;
		        case 'shield':
		            this.isShield = true;
		            break;
		    }
		},
		randomize: function(value,variance,maxValue){
			
			if(!maxValue){
			
				maxValue = 9999;
			}
			var random_number = Math.random() * (value * 0.1)
			var random_pos_neg = Math.floor(Math.random() * 2);
			var value_neg = Math.floor(value - random_number);
			var value_pos = Math.ceil(value + random_number);
			if(random_pos_neg === 0) return ((value_neg > 0) ? value_neg : 0);
			else if(random_pos_neg === 1) return ((value_pos < maxValue) ? value_pos : maxValue);
			return undefined;
		
		},
		checkChance: function(chance){
			if(this.Set_Zero === true)
			{
				return 0;
			}
			else if(this.Max_Chance - chance > 0){
				this.Max_Chance -= chance;
				return chance;
			}
			else{
				this.Set_Zero = true;
				return this.Max_Chance;
			}
		
			return undefined;
		},
		check: function(other)
		{

		    if (other instanceof EntityPlayer) {

		        ig.game.showPopUp = true;
		        ig.game.currentX = this.pos.x;
		        ig.game.currentY = this.pos.y;
		        ig.game.typePopUp = "PICK";
		        if (ig.game.POPUP) {

		            ig.game.POPUP.anchor.left = (this.pos.x - ig.game.screen.x);
		            ig.game.POPUP.anchor.top = (this.pos.y - ig.game.screen.y - 32);
		            ig.game.POPUP.align(this.size.x, this.size.y);
		        }
		        //Pickup event
		        if (ig.input.released("popup") && ig.game.menuOpen()) {

		            ig.game.player.use = false;
		            var Duplicate = false;


		        
		            if (this.isSword) {
		             
		                other.weaponArray.push(this);

		            }
		            if (this.isShield) {
		              
		                other.shieldArray.push(this);
		              
		            }
		            if (this.isArmor) {
		              
		                other.armorArray.push(this);

		            
		            }
		     
		            ig.game.gotItem = true;
		            ig.game.lastItem = this.itemName;
		            ig.game.lastItemQuality = this.QualityLevel;
		        
		            other.delayTimer.set(0.5);
		            ig.game.saveGame(null, ig.game.player, ig.game.saveSlot, true);
		            this.kill();
		            
		        }
		    }
		}
		});
		
	});