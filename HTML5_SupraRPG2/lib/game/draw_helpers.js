

ig.module(
    'game.draw_helpers'
)
.requires(
    
   
    'impact.game'
  
)
    .defines(function () {

 ig.Game.inject({

 	 TalentBase: new ig.Image("media/Talents/TalentBase.png"),
     TalentsIMG: new ig.Image("media/Talents/TalentsNew2.png"),
     TalentsDIMG: new ig.Image("media/Talents/TalentsNewGreyscale2.png"),
     EnduranceTree: new ig.Image("media/Talents/EnduranceTalentsNew.png"),
     RageTree: new ig.Image("media/Talents/BladeTalentsNew.png"),
     LifeTree: new ig.Image("media/Talents/LifeTalentsNew.png"),
     SpellTree: new ig.Image("media/Talents/SpellTalentsNew.png"),
     DemonTree: new ig.Image("media/Talents/DemonTalentsNew.png"),
     TalentSelection: new ig.Image("media/TalentSelection.png"),
     TalentSelect2: new ig.Image("media/Talents/TalentSelect2.png"),
    // ClassSelection: new ig.Image("media/Talents/ChooseYourClass.png"),
   


     BladeClass: new ig.Image("media/Talents/ClassSelect_Blade.png"),
     WizardClass: new ig.Image("media/Talents/ClassSelect_Wizard.png"),
     LifeClass: new ig.Image("media/Talents/ClassSelect_Life.png"),
     DemonClass: new ig.Image("media/Talents/ClassSelect_Demon.png"),

     map_twinkle: new ig.Image("media/Effects/Map/twinkle.png"),
     map_smallBird: new ig.Image("media/Effects/Map/smallBird.png"),
     map_bigdiagflash: new ig.Image("media/Effects/Map/bigdiagflash.png"),
     map_smallflash: new ig.Image("media/Effects/Map/smallflash.png"),
     map_redflag: new ig.Image("media/Effects/Map/redflag.png"),
     intro: new ig.Image("media/SupraIntro.png"),
     mapEffectLoop: 0,
     mapEffectTimer: null,
     mapEffectGoingBack: false,
     map_birdX1Coord: 0,
     map_birdY1Coord: 64,

     map_birdX2Coord: 64 ,
     map_birdY2Coord: 112,
  
     levelSelectScrollTimer: null,
     optionSelectedLevel: 0,
     levelPointerCoords: { x: 0, y: 0 },
     canLevelPointer: false,
     introTimer: null,
     introTile: 0,
     introGoingBack: false,
     introGoing: true,

     basicClass: new ig.Image("media/BasicClass.png"),
     bladeClass: new ig.Image('media/BladeClass.png'),
     lifeClass: new ig.Image('media/LifeClass.png'),
     wizardClass: new ig.Image('media/WizardClass.png'),
     demonClass: new ig.Image('media/DemonClass.png'),
     drawDummyPlayer: function (playerData,no) {

         //if (ig.game.getEntityByName("EntityDummyPlayer1")) { console.log("Im here"); }
         var x = 56;
         var y = 22;
         if (playerData.CLASS === "BLADE") {
             ig.game.bladeClass.draw(x, 35 * no);
         }
         else if (playerData.CLASS === "SPELL") {
             ig.game.wizardClass.draw(x, 35 * no);
         }
         else if (playerData.CLASS === "LIFE") {
             ig.game.lifeClass.draw(x, 35 * no);
         }
         else if (playerData.CLASS === "DEMON") {
             ig.game.demonClass.draw(x, 35 * no);
         }
         else {
             ig.game.basicClass.draw(x, 35 * no);
         }
        // ig.game.runningAnim.drawTile(72, 22,0,32);
         
        // ig.game.runningAnim.drawTile(72, 57, 0, 32);

        // ig.game.runningAnim.drawTile(72, 92, 0, 32);
         //ig.game.spawnEntity("EntityDummyPlayer", 50, 20, { name: 'EntityDummyPlayer1' });

        // ig.game.spawnEntity("EntityWeapon", dummyplayer.pos.x, dummyplayer.pos.y);
        // ig.game.spawnEntity("EntityShield", dummyplayer.pos.x, dummyplayer.pos.y);
         //ig.game.spawnEntity("EntityArmor", dummyplayer.pos.x, dummyplayer.pos.y);

     },
    
     drawIntro: function(){
         
             this.intro.drawTile(0, 0, this.introTile, 256, 160);
             if (!this.introTimer) {
                 this.introTimer = new ig.Timer();
                 this.introTimer.set(0.15);
             }
             else if (this.introTimer.delta() > 0) {
                 this.introTimer.set(0.15);
                 if (this.introGoingBack === true) {
                     this.introTile--;
                 }
                 else {
                     this.introTile++;
                 }
                 if (this.introTile > 5) {
                     this.introGoingBack = true;
                     this.introTile = 5;
                 }
                 else if (this.introTile < 3 && this.introGoingBack === true) {
                     this.introGoingBack = false;
                     this.introTile = 3;
                 }
             }
         
     },
     presentationTimer2: null,
     presentationTile: 0,
     presentationGoBack: false,
     SupraStart: new ig.Image('media/StartGame.png'),
     drawPresentation: function (type) {
   
         //if (type === 'intro1')
             ig.game.SupraStart.drawTile(0, 0, ig.game.presentationTile, 267, 160);
        // else if (type === 'intro2') 
            // ig.game.SupraStart.drawTile(0, 0, ig.game.presentationTile, 267, 160);
         if (!ig.game.presentationTimer) {
        
             ig.game.presentationTimer = new ig.Timer();
             ig.game.presentationTimer.set(0.15);
           
         }
         else if (ig.game.presentationTimer.delta() > 0 && ig.game.presentationTile < 10 && !ig.game.presentationGoBack) {
             
             if (ig.game.presentationTile === 0) ig.game.presentationTimer.set(2);
             else { ig.game.presentationTimer.set(0.15); }
           
             ig.game.presentationTile++;
         
             if (ig.game.presentationTile === 9) {
                 ig.game.presentationGoBack = true;
                 ig.game.presentationTimer.set(2);
             }
           
         }
         if (ig.game.presentationTimer.delta() > 0 && ig.game.presentationTile > 0 && ig.game.presentationGoBack) {
             ig.game.presentationTile--;
             ig.game.presentationTimer.set(0.15);
           
         }
         

         if (ig.game.presentationTimer2.delta() > 0) {
             ig.game.presentationOn = false;
             ig.game.presentationTile = 0;
             ig.game.presentationGoBack = false;
         }
         
     },
     drawMapOptions: function(){
         ig.game.levelOptions.drawTile(95.5, 32, ig.game.optionSelectedLevel, 64);

         if (ig.game.canLevelPointer) ig.game.levelPointer.drawTile(ig.game.levelPointerCoords.x, ig.game.levelPointerCoords.y, ig.game.mapEffectLoop, 16);
     },

   
            drawMapEffects: function(mapNumber){
        

         

         if (!this.mapEffectTimer) {
             this.mapEffectTimer = new ig.Timer();
             this.mapEffectTimer.set(0.1);
         }
         else if (this.mapEffectTimer.delta() > 0) {
            
             if (mapNumber === 1) {
                 ig.game.map_birdX1Coord++;


                 ig.game.map_birdX2Coord++;
             }
             this.mapEffectTimer.set(0.1);
             if (this.mapEffectGoingBack === true) {
                 this.mapEffectLoop--;
                
             }
             else {
                 this.mapEffectLoop++;
             
             }
             if (this.mapEffectLoop > 3) {
                 this.mapEffectGoingBack = true;
                 this.mapEffectLoop = 3;
               
             }
             else if (this.mapEffectLoop < 0) {
                 this.mapEffectGoingBack = false;
                 this.mapEffectLoop = 0;
             }
         }
         if (mapNumber === 1) {
            
             ig.game.map_twinkle.drawTile((-120 + 179 + levelSelectScroll), (145 + levelSelectScrollY), ig.game.mapEffectLoop, 8, 8);
             ig.game.map_twinkle.drawTile((-100 + 179 + levelSelectScroll), (126 + levelSelectScrollY), ig.game.mapEffectLoop, 8, 8);
             ig.game.map_twinkle.drawTile((-150 + 179 + levelSelectScroll), (124 + levelSelectScrollY), ig.game.mapEffectLoop, 8, 8);
             ig.game.map_twinkle.drawTile((-60 + 179 + levelSelectScroll), (150 + levelSelectScrollY), ig.game.mapEffectLoop, 8, 8);

             ig.game.map_smallflash.drawTile((98 + 179 + levelSelectScroll),( 137 + levelSelectScrollY), ig.game.mapEffectLoop, 2, 2);
             ig.game.map_smallflash.drawTile((102 + 179 + levelSelectScroll) , (137 + levelSelectScrollY), ig.game.mapEffectLoop, 2, 2);
             ig.game.map_smallflash.drawTile((106 + 179 + levelSelectScroll) , (137 + levelSelectScrollY), ig.game.mapEffectLoop, 2, 2);
             ig.game.map_smallflash.drawTile((110 + 179 + levelSelectScroll) , (137 + levelSelectScrollY), ig.game.mapEffectLoop, 2, 2);

             ig.game.map_bigdiagflash.drawTile((112 + 179 + levelSelectScroll), (127 + levelSelectScrollY), ig.game.mapEffectLoop, 8, 8);
             ig.game.map_bigdiagflash.drawTile((112 + 179 + levelSelectScroll) , (134 + levelSelectScrollY), ig.game.mapEffectLoop, 8, 8);


             ig.game.map_smallBird.drawTile((ig.game.map_birdX1Coord + 179 + levelSelectScroll) , (ig.game.map_birdY1Coord + levelSelectScrollY), ig.game.mapEffectLoop, 8, 8);
             ig.game.map_smallBird.drawTile((ig.game.map_birdX2Coord + 179 + levelSelectScroll) , (ig.game.map_birdY2Coord + levelSelectScrollY), ig.game.mapEffectLoop, 8, 8);

             ig.game.map_redflag.drawTile((98 + 179 + levelSelectScroll), (120 + levelSelectScrollY) , ig.game.mapEffectLoop, 8, 8);

             if (ig.game.map_birdX1Coord > 840) {
                 ig.game.map_birdX1Coord = -8;
             }
             if (ig.game.map_birdX2Coord > 840 ) {
                 ig.game.map_birdX2Coord = -8;
             }
            
         }

     },
   
   
            drawTalentSelection: function(name,s_width_p,s_height_p){

         var game = ig.game;
         var s_width = s_width_p;
         var s_height = s_height_p;
         if (name === "BLADE_VIGOR") {
          
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 +3, s_height / 2 - game.TalentSelect.height / 2 + 3, 0, 25);
         }
         else if (name === "BLADE_FLURRY") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 1, 25);
         }
         else if (name === "BLADE_FRENZY") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 3, 25);
         }
         else if (name === "BLADE_SHOCKPULSE") {
             //game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 4, 25);
             game.drawskillsheet(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 3, 25, 'slow');
         }
         else if (name === "BLADE_DOUBLEATTACK") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 2, 25);
         }
         else if (name === "BLADE_BLOODLUST") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 6, 25);
         }
         else if (name === "BLADE_EXECUTE") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 5, 25);
         }
         else if (name === "BLADE_ESCALATION") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 7, 25);
         }
         else if (name === "BLADE_BIGPLAY") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 8, 25);
         }
         else if (name === "BLADE_SWORDSPECIALIST") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 9, 25);
         }
         else if (name === "BLADE_AXESPECIALIST") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 10, 25);
         }
         else if (name === "BLADE_PHANTOMSTRIKES") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 11, 25);
         }
         else if (name === "BLADE_PLAYERSLASH_INFO") {
             //game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 38, 25);
             game.drawskillsheet(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 0, 25, 'slow');
         }
         else if (name === "BLADE_SHOCKWAVE_INFO") {
            // game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 12, 25);
             game.drawskillsheet(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 30, 25, 'slow');
         }



         else if (name === "LIFE_BURNINGHEART") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 26, 25);
         }
         else if (name === "LIFE_LIFESPIRIT") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 25, 25);
         }
         else if (name === "LIFE_EMPOWEREDSLASH") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 30, 25);
         }
         else if (name === "LIFE_RADIANCE") {
             //game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 44, 25);
             game.drawskillsheet(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 21, 25);
         }
         else if (name === "LIFE_CALMMIND") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 40, 25);
         }
         else if (name === "LIFE_HOLYBARRIER") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 39, 25);
         }
         else if (name === "LIFE_WALLOFJUSTICE") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 34, 25);
         }
         else if (name === "LIFE_RADIANTFURY") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 28, 25);
         }
         else if (name === "LIFE_ZEAL") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 41, 25);
         }
         else if (name === "LIFE_BURNINGLIGHT") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 45, 25);
         }
         else if (name === "LIFE_LASTSTAND") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 42, 25);
         }
         else if (name === "LIFE_HOLYSLASH") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 43, 25);
         }

       
         else if (name === "SPELL_FOCUS") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 13, 25);
         }
         else if (name === "SPELL_INTELLIGENCE") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 14, 25);
         }
         else if (name === "SPELL_ENDLESSPOOL") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 15, 25);
            
         }
         else if (name === "SPELL_FIREBLAST") {
            // game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 16, 25);
             game.drawskillsheet(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 9, 25);
         }
         else if (name === "SPELL_CRITICALRETURN") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 17, 25);
         }
         else if (name === "SPELL_CRITICALCOMBO") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 19, 25);
         }
         else if (name === "SPELL_DEMOLISH") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 18, 25);
         }
         else if (name === "SPELL_ELEMENTALSYNERGY") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 21, 25);
         }
         else if (name === "SPELL_DEEPFREEZE") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 22, 25);
         }
         else if (name === "SPELL_FROSTFIRE") {
            // game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 20, 25);
             game.drawskillsheet(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 12, 25);
         }
         else if (name === "SPELL_ARCANEBALL") {
             //game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 23, 25);
             game.drawskillsheet(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 15, 25);
         }
         else if (name === "SPELL_FROSTBALL_INFO") {
             //game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 24, 25);
             game.drawskillsheet(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 6, 25);
         }
         

         else if (name === "LIFE_LIFESLASH_INFO") {
            // game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 37, 25);
             game.drawskillsheet(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 18, 25, 'slow');
         }
         else if (name === "LIFE_HOLYPOWER_INFO") {
            // game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 36, 25);
             game.drawskillsheet(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 27, 25, 'slow');
         }
        

        
         else if (name === "DEMON_DEMONICFORTITUDE") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 46, 25);
         
         }
         else if (name === "DEMON_VAMPIRISM") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 47, 25);
         }
         else if (name === "DEMON_DARKRAGE") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 49, 25);
         }
         else if (name === "DEMON_MYSTICBARRIER") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 50, 25);
         }
         else if (name === "DEMON_DARKWAVE") {
             game.drawskillsheet(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 33, 25);
         }
         else if (name === "DEMON_SACRIFICIALDRIVE") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 52, 25);
         }
         else if (name === "DEMON_EMPOWEREDDARKRAGE") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 53, 25);
         }
         else if (name === "DEMON_DEMONSTRENGTH") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 54, 25);
         }

         else if (name === "DEMON_DREADWAVE") {
             game.drawskillsheet(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 36, 25);
         }
         else if (name === "DEMON_DEMONBLOOD") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 56, 25);
         }
         else if (name === "DEMON_DARKWILL") {
             game.TalentsIMG.drawTile(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 57, 25);
         }

         else if (name === "DEMON_DEMONSLASH_INFO") {
             game.drawskillsheet(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 39, 25);
         }
         else if (name === "DEMON_BLOODENERGY_INFO") {
             game.drawskillsheet(s_width / 2 - game.TalentSelect.width / 2 + 3, s_height / 2 - game.TalentSelect.height / 2 + 3, 42, 25);
         }
     },
     
            
            drawClassExtraInfo: function(s_width, s_height) {
         
         if (ig.game.bladeClassInfo === true) {
         
             ig.game.BladeClass.draw(s_width / 2 - ig.game.BladeClass.width / 2, s_height / 2 - ig.game.BladeClass.height / 2);
             ig.game.drawskillsheet(s_width / 2 - ig.game.BladeClass.width / 2+ 99, s_height / 2 - ig.game.BladeClass.height / 2 +17,0,26,'slow');
             ig.game.drawskillsheet(s_width / 2 - ig.game.BladeClass.width / 2 + 120, s_height / 2 - ig.game.BladeClass.height / 2 + 17, 30, 26, 'slow');
         }
         else if (ig.game.wizardClassInfo === true) {
           
             ig.game.WizardClass.draw(s_width / 2 - ig.game.WizardClass.width / 2, s_height / 2 - ig.game.WizardClass.height / 2);
             ig.game.drawskillsheet(s_width / 2 - ig.game.WizardClass.width / 2 + 117, s_height / 2 - ig.game.WizardClass.height / 2 + 17, 6, 26);
         }
         else if (ig.game.lifeClassInfo === true) {
          
             ig.game.LifeClass.draw(s_width / 2 - ig.game.LifeClass.width / 2, s_height / 2 - ig.game.LifeClass.height / 2);
             ig.game.drawskillsheet(s_width / 2 - ig.game.LifeClass.width / 2 + 99, s_height / 2 - ig.game.LifeClass.height / 2 + 17, 18, 26, 'slow');
             ig.game.drawskillsheet(s_width / 2 - ig.game.LifeClass.width / 2 + 120, s_height / 2 - ig.game.LifeClass.height / 2 + 17, 27, 26, 'slow');
             
         }
         else if (ig.game.demonClassInfo === true) {

             ig.game.DemonClass.draw(s_width / 2 - ig.game.DemonClass.width / 2, s_height / 2 - ig.game.DemonClass.height / 2);
             ig.game.drawskillsheet(s_width / 2 - ig.game.DemonClass.width / 2 + 99, s_height / 2 - ig.game.DemonClass.height / 2 + 17, 39, 26, 'slow');
             ig.game.drawskillsheet(s_width / 2 - ig.game.DemonClass.width / 2 + 120, s_height / 2 - ig.game.DemonClass.height / 2 + 17, 42, 26, 'slow');

         }
     },
 	        drawTalents: function(player,s_width,s_height){

        var game = ig.game;
        var yBuff = 2;
       
        if (game.blade_talents_menu === true) {
            // game.TalentBase.draw(0, 0);
            game.RageTree.draw(0, 0);
            game.font_YELLOW_16.draw(player.skillSpheres, 4, 33);
                                  
                               
            
                game.TalentsIMG.drawTile(0.0825 * s_width, 0.625 * s_height, 0, 25);
            
            game.font_YELLOW_STYLED.draw(player.BLADE_VIGOR_LEVEL + "/5", 0.0825 * s_width, 0.625 * s_height - yBuff);
                                  
                game.TalentsDIMG.drawTile(0.0825 * s_width, 0.425 * s_height, 1, 25);
                                      
                                    
           
           
                game.TalentsIMG.drawTile(0.0825 * s_width, 0.425 * s_height, 1, 25);
            


            game.font_YELLOW_STYLED.draw(player.BLADE_FLURRY_LEVEL + "/5", 0.0825 * s_width, 0.425 * s_height - yBuff);

            if (player.BLADE_AMOUNT < 5) {
                          
                                     
                game.TalentsDIMG.drawTile(0.2325 * s_width, 0.77 * s_height, 2, 25);
                                      
                                    
            }
            else { 
                game.TalentsIMG.drawTile(0.2325 * s_width, 0.77 * s_height, 2, 25);
            }

            game.font_YELLOW_STYLED.draw(player.BLADE_DOUBLEATTACK_LEVEL + "/4", 0.2325 * s_width, 0.77 * s_height - yBuff);
            if (player.BLADE_AMOUNT < 5) {
                          
                game.TalentsDIMG.drawTile(0.2325 * s_width, 0.53 * s_height, 4, 25);
                                      
                                    
            }
            else { 
                game.TalentsIMG.drawTile(0.2325 * s_width, 0.53 * s_height, 4, 25);
            }
            
            game.font_YELLOW_STYLED.draw(player.BLADE_SHOCKPULSE_LEVEL + "/1", 0.2325 * s_width, 0.53 * s_height - yBuff);

            if (player.BLADE_AMOUNT < 5) {
                               
                                   
                game.TalentsDIMG.drawTile(0.2325 * s_width, 0.295 * s_height, 3, 25);
                                      
                                    
            }
            else { 
                game.TalentsIMG.drawTile(0.2325 * s_width, 0.295 * s_height, 3, 25);
            }
            game.font_YELLOW_STYLED.draw(player.BLADE_FRENZY_LEVEL + "/5", 0.2325 * s_width, 0.295 * s_height - yBuff);
            if (player.BLADE_AMOUNT < 10) {
                                 
                game.TalentsDIMG.drawTile(0.3825 * s_width, 0.53 * s_height, 7, 25);
                                      
                                    
            }
                               
            else { 
                game.TalentsIMG.drawTile(0.3825 * s_width, 0.53 * s_height, 7, 25);
            }

            game.font_YELLOW_STYLED.draw(player.BLADE_ESCALATION_LEVEL + "/4", 0.3825 * s_width, 0.53 * s_height - yBuff);



            if (player.BLADE_AMOUNT < 10 || player.BLADE_FRENZY_LEVEL < 5) {
                                  
                game.TalentsDIMG.drawTile(0.3825 * s_width, 0.295 * s_height, 6, 25);
                                      
                                    
            }
            else { 
                game.TalentsIMG.drawTile(0.3825 * s_width, 0.295 * s_height, 6, 25);
            }
            game.font_YELLOW_STYLED.draw(player.BLADE_BLOODLUST_LEVEL + "/5", 0.3825 * s_width, 0.295 * s_height - yBuff);
            if (player.BLADE_AMOUNT < 10) {
                             
                game.TalentsDIMG.drawTile(0.3825 * s_width, 0.77 * s_height, 5, 25);
                                      
                                    
            }
            else { 
                game.TalentsIMG.drawTile(0.3825 * s_width, 0.77 * s_height, 5, 25);
            }
            game.font_YELLOW_STYLED.draw(player.BLADE_EXECUTE_LEVEL + "/1", 0.3825 * s_width, 0.77 * s_height - yBuff);
            if (player.BLADE_AMOUNT < 15) {
                             
                game.TalentsDIMG.drawTile(0.5325 * s_width, 0.53 * s_height, 8, 25);

            }
            else { 
                game.TalentsIMG.drawTile(0.5325 * s_width, 0.53 * s_height, 8, 25);
            }

            game.font_YELLOW_STYLED.draw(player.BLADE_BIGPLAY_LEVEL + "/4", 0.5325 * s_width, 0.53 * s_height - yBuff);

            if (player.BLADE_AMOUNT < 15) {
                               
                game.TalentsDIMG.drawTile(0.5325 * s_width, 0.295 * s_height, 9, 25);
                                      
                                    
            }
            else { 
                game.TalentsIMG.drawTile(0.5325 * s_width, 0.295 * s_height, 9, 25);
            }
            game.font_YELLOW_STYLED.draw(player.BLADE_SWORDSPECIALIST_LEVEL + "/3", 0.5325 * s_width, 0.295 * s_height - yBuff);

            if (player.BLADE_AMOUNT < 15) {
                             
                game.TalentsDIMG.drawTile(0.5325 * s_width, 0.77 * s_height, 10, 25);
                                      
                                    
            }
            else { 
                game.TalentsIMG.drawTile(0.5325 * s_width, 0.77 * s_height, 10, 25);
            }
            game.font_YELLOW_STYLED.draw(player.BLADE_AXESPECIALIST_LEVEL + "/3", 0.5325 * s_width, 0.77 * s_height - yBuff);
                               
            if (player.BLADE_AMOUNT < 20) {
                                 
                game.TalentsDIMG.drawTile(0.6825 * s_width, 0.53 * s_height, 11, 25);
                                    
                                    

            }
            else { 
                game.TalentsIMG.drawTile(0.6825 * s_width, 0.53 * s_height, 11, 25);
            }
            game.font_YELLOW_STYLED.draw(player.BLADE_PHANTOMSTRIKES_LEVEL + "/1", 0.6825 * s_width, 0.53 * s_height - yBuff);

                                
        }
        else if (game.life_talents_menu === true) {
            // game.TalentBase.draw(0, 0);
            game.LifeTree.draw(0, 0);

            game.font_YELLOW_16.draw(player.skillSpheres, 4, 33);

           
                game.TalentsIMG.drawTile(0.0825 * s_width, 0.625 * s_height, 26, 25);
            
            game.font_YELLOW_STYLED.draw(player.LIFE_BURNINGHEART_LEVEL + "/5", 0.0825 * s_width, 0.625 * s_height - yBuff);
          
                game.TalentsDIMG.drawTile(0.0825 * s_width, 0.425 * s_height, 25, 25);


           
                game.TalentsIMG.drawTile(0.0825 * s_width, 0.425 * s_height, 25, 25);
            


            game.font_YELLOW_STYLED.draw(player.LIFE_LIFESPIRIT_LEVEL + "/5", 0.0825 * s_width, 0.425 * s_height - yBuff);

            if (player.LIFE_AMOUNT < 5) {


                game.TalentsDIMG.drawTile(0.2325 * s_width, 0.77 * s_height, 30, 25);


            }
            else {
                game.TalentsIMG.drawTile(0.2325 * s_width, 0.77 * s_height, 30, 25);
            }

            game.font_YELLOW_STYLED.draw(player.LIFE_EMPOWEREDSLASH_LEVEL + "/6", 0.2325 * s_width, 0.77 * s_height - yBuff);
            if (player.LIFE_AMOUNT < 5) {

                game.TalentsDIMG.drawTile(0.2325 * s_width, 0.53 * s_height, 44, 25);


            }
            else {
                game.TalentsIMG.drawTile(0.2325 * s_width, 0.53 * s_height, 44, 25);
            }
            game.font_YELLOW_STYLED.draw(player.LIFE_RADIANCE_LEVEL + "/1", 0.2325 * s_width, 0.53 * s_height - yBuff);

            if (player.LIFE_AMOUNT < 5) {


                game.TalentsDIMG.drawTile(0.2325 * s_width, 0.295 * s_height, 40, 25);


            }
            else {
                game.TalentsIMG.drawTile(0.2325 * s_width, 0.295 * s_height, 40, 25);
            }
            game.font_YELLOW_STYLED.draw(player.LIFE_CALMMIND_LEVEL + "/3", 0.2325 * s_width, 0.295 * s_height - yBuff);
            if (player.LIFE_AMOUNT < 10) {

                game.TalentsDIMG.drawTile(0.3825 * s_width, 0.53 * s_height, 39, 25);


            }

            else {
                game.TalentsIMG.drawTile(0.3825 * s_width, 0.53 * s_height, 39, 25);
            }
            game.font_YELLOW_STYLED.draw(player.LIFE_HOLYBARRIER_LEVEL + "/1", 0.38325 * s_width, 0.53 * s_height - yBuff);


           


            if (player.LIFE_AMOUNT < 10) {

                game.TalentsDIMG.drawTile(0.3825 * s_width, 0.295 * s_height, 34, 25);


            }
            else {
                game.TalentsIMG.drawTile(0.3825 * s_width, 0.295 * s_height, 34, 25);
            }
            game.font_YELLOW_STYLED.draw(player.LIFE_WALLOFJUSTICE_LEVEL + "/5", 0.3825 * s_width, 0.295 * s_height - yBuff);
            if (player.LIFE_AMOUNT < 10) {

                game.TalentsDIMG.drawTile(0.3825 * s_width, 0.77 * s_height, 28, 25);


            }
            else {
                game.TalentsIMG.drawTile(0.3825 * s_width, 0.77 * s_height, 28, 25);
            }
            game.font_YELLOW_STYLED.draw(player.LIFE_RADIANTFURY_LEVEL + "/4", 0.3825 * s_width, 0.77 * s_height - yBuff);
            if (player.LIFE_AMOUNT < 15) {

                game.TalentsDIMG.drawTile(0.5325 * s_width, 0.53 * s_height, 41, 25);

            }
            else {
                game.TalentsIMG.drawTile(0.5325 * s_width, 0.53 * s_height, 41, 25);
            }
            game.font_YELLOW_STYLED.draw(player.LIFE_ZEAL_LEVEL + "/1", 0.5325 * s_width, 0.53 * s_height - yBuff);

           

            if (player.LIFE_AMOUNT < 15) {

                game.TalentsDIMG.drawTile(0.5325 * s_width, 0.295 * s_height, 45, 25);


            }
            else {
                game.TalentsIMG.drawTile(0.5325 * s_width, 0.295 * s_height, 45, 25);
            }
            game.font_YELLOW_STYLED.draw(player.LIFE_BURNINGLIGHT_LEVEL + "/5", 0.5325 * s_width, 0.295 * s_height - yBuff);

            if (player.LIFE_AMOUNT < 15) {

                game.TalentsDIMG.drawTile(0.5325 * s_width, 0.77 * s_height, 42, 25);


            }
            else {
                game.TalentsIMG.drawTile(0.5325 * s_width, 0.77 * s_height, 42, 25);
            }
            game.font_YELLOW_STYLED.draw(player.LIFE_LASTSTAND_LEVEL + "/4", 0.5325 * s_width, 0.77 * s_height - yBuff);

            if (player.LIFE_AMOUNT < 20) {

                game.TalentsDIMG.drawTile(0.6825 * s_width, 0.53 * s_height, 43, 25);



            }
            else {
                game.TalentsIMG.drawTile(0.6825 * s_width, 0.53 * s_height, 43, 25);
            }
            game.font_YELLOW_STYLED.draw(player.LIFE_HOLYSLASH_LEVEL + "/1", 0.6825 * s_width, 0.53 * s_height - yBuff);



        }
                           
                            else if ( game.magic_talents_menu === true) {
                               // game.TalentBase.draw(0, 0);
                                game.SpellTree.draw(0, 0);

                                game.font_YELLOW_16.draw(player.skillSpheres,4,33);

                            
                                    game.TalentsDIMG.drawTile(0.0825 * s_width, 0.425 * s_height, 13, 25);


                           
                                    game.TalentsIMG.drawTile(0.0825 * s_width, 0.425 * s_height, 13, 25);
                                
                                    game.font_YELLOW_STYLED.draw(player.SPELL_FOCUS_LEVEL + "/5", 0.0825 * s_width, 0.425 * s_height - yBuff);
                              
                                    game.TalentsDIMG.drawTile(0.0825 * s_width, 0.625 * s_height, 14, 25);



                              
                                    game.TalentsIMG.drawTile(0.0825 * s_width, 0.625 * s_height, 14, 25);
                                
                                    game.font_YELLOW_STYLED.draw(player.SPELL_INTELLIGENCE_LEVEL + "/5", 0.0825 * s_width, 0.625 * s_height - yBuff);

                                if (player.SPELL_AMOUNT < 5) {

                                    game.TalentsDIMG.drawTile(0.2325 * s_width, 0.295 * s_height, 17, 25);


                                }
                                else {
                                    game.TalentsIMG.drawTile(0.2325 * s_width, 0.295 * s_height, 17, 25);
                                }
                                game.font_YELLOW_STYLED.draw(player.SPELL_CRITICALRETURN_LEVEL + "/4", 0.2325 * s_width, 0.295 * s_height - yBuff);

                                if (player.SPELL_AMOUNT < 5) {

                                    game.TalentsDIMG.drawTile(0.2325 * s_width, 0.53 * s_height, 16, 25);


                                }
                                else {
                                    game.TalentsIMG.drawTile(0.2325 * s_width, 0.53 * s_height, 16, 25);
                                }
                                game.font_YELLOW_STYLED.draw(player.SPELL_FIRE_BLAST_LEVEL + "/1", 0.2325 * s_width, 0.53 * s_height - yBuff);


                                if (player.SPELL_AMOUNT < 5) {

                                    game.TalentsDIMG.drawTile(0.2325 * s_width, 0.77 * s_height, 15, 25);


                                }
                                else {
                                    game.TalentsIMG.drawTile(0.2325 * s_width, 0.77 * s_height, 15, 25);
                                }
                                game.font_YELLOW_STYLED.draw(player.SPELL_ENDLESSPOOL_LEVEL + "/5", 0.2325 * s_width, 0.77 * s_height - yBuff);



                                if (player.SPELL_AMOUNT < 10 ||player.FIRE_BLAST_LEVEL < 1) {

                                    game.TalentsDIMG.drawTile(0.3825 * s_width, 0.53 * s_height, 18, 25);


                                }
                                else {
                                    game.TalentsIMG.drawTile(0.3825 * s_width, 0.53 * s_height, 18, 25);
                                }
                                game.font_YELLOW_STYLED.draw(player.SPELL_DEMOLISH_LEVEL + "/5", 0.3825 * s_width, 0.53 * s_height - yBuff);

                                if (player.SPELL_AMOUNT < 10) {

                                    game.TalentsDIMG.drawTile(0.3825 * s_width, 0.295 * s_height, 19, 25);


                                }
                                else {
                                    game.TalentsIMG.drawTile(0.3825 * s_width, 0.295 * s_height, 19, 25);
                                }
                                game.font_YELLOW_STYLED.draw(player.SPELL_CRITICAL_COMBO_LEVEL + "/5", 0.3825 * s_width, 0.295 * s_height - yBuff);

                                if (player.SPELL_AMOUNT < 15) {

                                    game.TalentsDIMG.drawTile(0.5325 * s_width, 0.295 * s_height, 21, 25);


                                }
                                else {
                                    game.TalentsIMG.drawTile(0.5325 * s_width, 0.295 * s_height, 21, 25);
                                }
                                game.font_YELLOW_STYLED.draw(player.SPELL_ELEMENTALSYNERGY_LEVEL + "/5", 0.5325 * s_width, 0.295 * s_height - yBuff);


                                if (player.SPELL_AMOUNT < 15) {

                                    game.TalentsDIMG.drawTile(0.5325 * s_width, 0.77 * s_height, 22, 25);


                                }
                                else {
                                    game.TalentsIMG.drawTile(0.5325 * s_width, 0.77 * s_height, 22, 25);
                                }
                                game.font_YELLOW_STYLED.draw(player.SPELL_DEEPFREEZE_LEVEL + "/4", 0.5325 * s_width, 0.77 * s_height - yBuff);

                                if (player.SPELL_AMOUNT < 15) {

                                    game.TalentsDIMG.drawTile(0.5325 * s_width, 0.53 * s_height, 20, 25);


                                }
                                else {
                                    game.TalentsIMG.drawTile(0.5325 * s_width, 0.53 * s_height, 20, 25);
                                }
                                game.font_YELLOW_STYLED.draw(player.SPELL_FROSTFIRE_LEVEL + "/1", 0.5325 * s_width, 0.53 * s_height - yBuff);

                                if (player.SPELL_AMOUNT < 20 || player.FROSTFIRE_LEVEL < 1) {

                                    game.TalentsDIMG.drawTile(0.6825 * s_width, 0.53 * s_height, 23, 25);


                                }
                                else {
                                    game.TalentsIMG.drawTile(0.6825 * s_width, 0.53 * s_height, 23, 25);
                                }
                                game.font_YELLOW_STYLED.draw(player.SPELL_ARCANEBALL_LEVEL + "/1", 0.6825 * s_width, 0.53 * s_height - yBuff);

                            
                            

                            }
                            else if (game.demon_talents_menu === true) {
                                // game.TalentBase.draw(0, 0);
                                game.DemonTree.draw(0, 0);

                                game.font_YELLOW_16.draw(player.skillSpheres, 4, 33);


                                game.TalentsDIMG.drawTile(0.0825 * s_width, 0.425 * s_height, 46, 25);



                                game.TalentsIMG.drawTile(0.0825 * s_width, 0.425 * s_height, 46, 25);

                                game.font_YELLOW_STYLED.draw(player.DEMON_DEMONICFORTITUDE_LEVEL + "/5", 0.0825 * s_width, 0.425 * s_height - yBuff);

                                game.TalentsDIMG.drawTile(0.0825 * s_width, 0.625 * s_height, 47, 25);




                                game.TalentsIMG.drawTile(0.0825 * s_width, 0.625 * s_height, 47, 25);

                                game.font_YELLOW_STYLED.draw(player.DEMON_VAMPIRISM_LEVEL + "/5", 0.0825 * s_width, 0.625 * s_height - yBuff);



                                if (player.DEMON_AMOUNT < 5) {

                                    game.TalentsDIMG.drawTile(0.2325 * s_width, 0.295 * s_height, 50, 25);


                                }
                                else {
                                    game.TalentsIMG.drawTile(0.2325 * s_width, 0.295 * s_height, 50, 25);
                                }
                                game.font_YELLOW_STYLED.draw(player.DEMON_MYSTICBARRIER_LEVEL + "/5", 0.2325 * s_width, 0.295 * s_height - yBuff);



                                if (player.DEMON_AMOUNT < 5) {

                                    game.TalentsDIMG.drawTile(0.2325 * s_width, 0.53 * s_height, 49, 25);


                                }
                                else {
                                    game.TalentsIMG.drawTile(0.2325 * s_width, 0.53 * s_height, 49, 25);
                                }
                                game.font_YELLOW_STYLED.draw(player.DEMON_DARKRAGE_LEVEL + "/5", 0.2325 * s_width, 0.53 * s_height - yBuff);


                                

                                if (player.DEMON_AMOUNT < 10) {

                                    game.TalentsDIMG.drawTile(0.3825 * s_width, 0.295 * s_height, 51, 25);


                                }
                                else {
                                    game.TalentsIMG.drawTile(0.3825 * s_width, 0.295 * s_height, 51, 25);
                                }
                                game.font_YELLOW_STYLED.draw(player.DEMON_DARKWAVE_LEVEL + "/1", 0.3825 * s_width, 0.295 * s_height - yBuff);


                                if (player.DEMON_AMOUNT < 10) {

                                    game.TalentsDIMG.drawTile(0.3825 * s_width, 0.77 * s_height, 52, 25);


                                }
                                else {
                                    game.TalentsIMG.drawTile(0.3825 * s_width, 0.77 * s_height, 52, 25);
                                }
                                game.font_YELLOW_STYLED.draw(player.DEMON_SACRIFICIALDRIVE_LEVEL + "/5", 0.3825 * s_width, 0.77 * s_height - yBuff);


                                if (player.DEMON_AMOUNT < 10 || player.DEMON_DARKRAGE_LEVEL < 5) {

                                    game.TalentsDIMG.drawTile(0.3825 * s_width, 0.53 * s_height, 53, 25);


                                }
                                else {
                                    game.TalentsIMG.drawTile(0.3825 * s_width, 0.53 * s_height, 53, 25);
                                }
                                game.font_YELLOW_STYLED.draw(player.DEMON_EMPOWEREDDARKRAGE_LEVEL + "/4", 0.3825 * s_width, 0.53 * s_height - yBuff);


                               
                                if (player.DEMON_AMOUNT < 15 || player.DEMON_DARKWAVE_LEVEL < 1) {

                                    game.TalentsDIMG.drawTile(0.5325 * s_width, 0.295 * s_height, 55, 25);


                                }
                                else {
                                    game.TalentsIMG.drawTile(0.5325 * s_width, 0.295 * s_height, 55, 25);
                                }
                                game.font_YELLOW_STYLED.draw(player.DEMON_DREADWAVE_LEVEL + "/1", 0.5325 * s_width, 0.295 * s_height - yBuff);




                                if (player.DEMON_AMOUNT < 15) {

                                    game.TalentsDIMG.drawTile(0.5325 * s_width, 0.53 * s_height, 54, 25);


                                }
                                else {
                                    game.TalentsIMG.drawTile(0.5325 * s_width, 0.53 * s_height, 54, 25);
                                }
                                game.font_YELLOW_STYLED.draw(player.DEMON_DEMONSTRENGTH_LEVEL + "/5", 0.5325 * s_width, 0.53 * s_height - yBuff);

                                if (player.DEMON_AMOUNT < 15) {

                                    game.TalentsDIMG.drawTile(0.5325 * s_width, 0.77 * s_height, 56, 25);


                                }
                                else {
                                    game.TalentsIMG.drawTile(0.5325 * s_width, 0.77 * s_height, 56, 25);
                                }
                                game.font_YELLOW_STYLED.draw(player.DEMON_DEMONBLOOD_LEVEL + "/4", 0.5325 * s_width, 0.77 * s_height - yBuff);


                                if (player.DEMON_AMOUNT < 20) {

                                    game.TalentsDIMG.drawTile(0.6825 * s_width, 0.53 * s_height, 57, 25);


                                }
                                else {
                                    game.TalentsIMG.drawTile(0.6825 * s_width, 0.53 * s_height, 57, 25);
                                }
                                game.font_YELLOW_STYLED.draw(player.DEMON_DARKWILL_LEVEL + "/1", 0.6825 * s_width, 0.53 * s_height - yBuff);


                            }
                            if((game.blade_talents_menu ||
                                game.life_talents_menu ||
                                game.magic_talents_menu ||
                                game.demon_talents_menu
                                )) {
                                game.drawTalentSelectGFX(s_width,s_height)
                                   // game.TalentSelection.draw(0,0);
                            }
                        
                  
 	},
 	        woodenChest: new ig.Image('media/BuyAnimations/WoodenChest.png'),
 	        ironChest: new ig.Image('media/BuyAnimations/IronChest.png'),
 	        steelChest: new ig.Image('media/BuyAnimations/SteelChest.png'),
 	        magicChest: new ig.Image('media/BuyAnimations/MagicChest.png'),
 	        ancientChest: new ig.Image('media/BuyAnimations/AncientChest.png'),

 	        chest_presentationTile: 0,
     chest_presentationTimer: null,
     drawChestOpening: function (itemname,x,y) {
         var hopToNext = false;
     
         if (itemname === 'Wooden Chest') {
         
             ig.game.woodenChest.drawTile(x, y, ig.game.chest_presentationTile, 32);
         }
         else if (itemname === 'Iron Chest') {
             ig.game.ironChest.drawTile(x, y, ig.game.chest_presentationTile, 32);
         }
         else if (itemname === 'Steel Chest') {
             ig.game.steelChest.drawTile(x, y, ig.game.chest_presentationTile, 32);
         }
         else if (itemname === 'Magic Chest') {
             ig.game.magicChest.drawTile(x, y, ig.game.chest_presentationTile, 32);
         }
         else if (itemname === 'Ancient Chest') {
             ig.game.ancientChest.drawTile(x, y, ig.game.chest_presentationTile, 32);
         }
         

         if (!ig.game.chest_presentationTimer) {

             ig.game.chest_presentationTimer = new ig.Timer();
             ig.game.chest_presentationTimer.set(0.25);

         }
         else if (ig.game.chest_presentationTimer.delta() > 0 && ig.game.chest_presentationTile < 4 ) {

             if (ig.game.chest_presentationTile === 0) ig.game.chest_presentationTimer.set(1);
             else { ig.game.chest_presentationTimer.set(0.15); }

             ig.game.chest_presentationTile++;
             

             if (ig.game.chest_presentationTile === 4) {
                 hopToNext = true;
             }
           
            
           

         }
         if (ig.game.chest_presentationTile === 4 && ig.game.chest_presentationTimer.delta() > 0 && !hopToNext) {
             ig.game.buy_prompt = false;
             ig.game.buy_item_draw_anim = false;

             var itemName = ig.game.buy_and_save(ig.game.buy_item, ig.game.buy_item_price);
            // ig.game.player.lastItem = itemName;
            // ig.game.player.gotItem = true;

             ig.game.buy_item = '';

         }
         else if (ig.game.chest_presentationTile === 4 && hopToNext && ig.game.chest_presentationTimer.delta() > 0) {
             ig.game.chest_presentationTimer.set(1);

         }
         
        
 	        },
 	        drawTalentSelectGFX: function (s_width,s_height) {
 	    
 	    if (ig.game.talentConfirm === true) {
 	        ig.game.darkScreen.draw(0, 0);
 	        ig.game.checkIfCanBeSelected();

 	        ig.game.TalentSelect.draw(s_width / 2 - ig.game.TalentSelect.width / 2, s_height / 2 - ig.game.TalentSelect.height / 2);

 	        if (ig.game.smallDesc !== "") {
 	            ig.game.font.draw(ig.game.smallDesc, s_width / 2 - ig.game.TalentSelect.width / 2 + 3, s_height / 2 - ig.game.TalentSelect.height / 2 + 32);
 	        }
 	        ig.game.font.draw(ig.game.parseRetText(ig.game.talent_info, 'skilldesc'), s_width / 2 - ig.game.TalentSelect.width / 2 + 48, s_height / 2 - ig.game.TalentSelect.height / 2 + 4);
 	        ig.game.drawTalentSelection(ig.game.talentSelected, s_width, s_height);
 	    }
 	},
            drawDiag: function () {
                ig.game.sceneIMG.draw(0, 0);
                ig.game.font.draw(game.sceneArray[game.scenePos], 4, 128);
            },
            DrawMiniMap: function () {
                if (ig.game.minimap_Open == true) {
                    var collision_map = ig.game.getMapByName('collision');
                    var position_var = 9;
                    if (collision_map.width) {

                        element = document.getElementById("canvas");
                        c = element.getContext("2d");

                        if (ig.game.levelReseted == true) {
                            // x , y , red, green, blue

                            
                         
                            // read the width and height of the canvas
                            
                            width = element.width * 0.26;
                            height = element.height * 0.25;
                           

                            // create a new batch of pixels with the same
                            // dimensions as the image:
                            ig.game.imageData = c.createImageData(width, height);
                            var y_length = collision_map.data.length;
                            for (var y = 0; y < y_length; y++) {

                                var x_length = collision_map.data[y].length;
                                for (var x = 0; x < x_length; x++) {


                                    if (collision_map.data[y][x] == 1) {

                                        // var x = data_height % y;
                                        // var x = data_height % y;
                                        // for (var a = 0; a < this.scalingVar; a++) {

                                        //  for (var b = 0; b < this.scalingVar; b++) {

                                        setPixel(ig.game.imageData,  x + position_var, y, 255, 255, 255, 255);

                                        //  }

                                        // }


                                    }
                                    
                                }

                            }

                            ig.game.levelReseted = false;
                          
                        }
                        c.putImageData(ig.game.imageData, position_var + 2, ig.system.height * 0.2);
                       
                        
                       
                        //Draw the minimap
                        if (ig.game.player) {

                            var player_pos_x = ig.game.player.pos.x;
                            var player_pos_y = ig.game.player.pos.y;

                            //Calculate position in the matrix

                            var calc_pos_x = Math.floor(player_pos_x / 16);
                            var calc_pos_y = Math.floor(player_pos_y / 16);




                            ig.game.b_pixel.draw((position_var*2) + 2 + calc_pos_x, 32 + calc_pos_y);


                        }



                        //Draw the player
                    }
                }
               
            },
            checkSpecialTile: function(special){
                if (special ==='Heavy W' ) { return 0; }
                else if (special ==='Light W'     ) { return 1; }
                else if (special === 'Sharp'   ) { return 2; }
                else if (special ==='Vampiric'    ) { return 3; }
                else if (special ==='Superiority'    ) { return 4; }
                else if (special ==='Fury'   ) { return 5; }
                else if (special ==='Backstab'    ) { return 6; }
                else if (special ==='Concentration'   ) { return 7; }
                else if (special ==='Honor'  ) { return 8; }
                else if (special ==='Chilly'   ) { return 9; }
                else if (special ==='Fiery'    ) { return 10; }
                else if (special ==='Dull'    ) { return 11; }
                else if (special ==='Blaze'    ) { return 12; }
                else if (special ==='Emberburn'    ) { return 13; }
                else if (special ==='Chromatic Focus'    ) { return 14; }
                else if (special ==='Elemental Focus'    ) { return 15; }
                else if (special === 'Blessed'   ) { return 16; }
                else if (special ==='Cursed'    ) { return 17; }
                else if (special ==='Demonic'    ) { return 18; }
                else if (special ==='Time Warp'    ) { return 19; }
                else if (special ==='Arcane Devotion'   ) { return 20; }
                else if (special ==='Executioner'   ) { return 21; }
                else if (special ==='Finisher'    ) { return 22; }
                else if (special ==='Heavy S'     ) { return 23; }
                else if (special ==='Light S'   ) { return 24; }
                else if (special ==='Spikes'    ) { return 25; }
                else if (special ==='Leech'   ) { return 26; }
                else if (special ==='Absorb'    ) { return 27; }

                else if (special ==='Focus Strength'   ) { return 28; }
                else if (special ==='Frozen'    ) { return 29; }
                else if (special ==='Imbued'    ) { return 30; }
                else if (special ==='Great Wall'    ) { return 31; }
                else if (special ==='Heavy Spikes'    ) { return 32; }
                else if (special ==='Furious Blocks'    ) { return 33; }
                else if (special ==='Grand Shield'    ) { return 34; }
                else if (special ==='Negation'    ) { return 35; }
                else if (special ==='Raging Slam'    ) { return 36; }
                else if (special ==='Burning Shield'    ) { return 37; }

                else if (special ==='Heavy A'     ) { return 38; }
                else if (special ==='Light A'     ) { return 39; }
                else if (special ==='Treasure Hunt'    ) { return 40; }

                else if (special ==='Replenish'    ) { return 41; }
                else if (special ==='High Spirit'    ) { return 42; }
                else if (special ==='Resourceful'    ) { return 43; }

                else if (special ==='Great Hunt'    ) { return 44; }
                else if (special ==='Wizard Armor'    ) { return 45; }
                else if (special ==='Demon Armor'    ) { return 46; }

                else if (special ==='Second Wind'    ) { return 47; }
                else if (special ==="Hero's Aura"    ) { return 48; }

                else if (special ==='Fade'    ) { return 49; }
                else if (special ==='Chromatic'    ) { return 50; }
                else if (special === 'Legendary Hunt') { return 51; }

                else if (special ==='Demon Execute'    ) { return 52; }
                else if (special ==='Wise Radiance'    ) { return 53; }
                else if (special ==='Dark Aura'    ) { return 54; }

                else if (special ==='Grand Return'    ) { return 55; }
                else if (special ==="Mage's Will"    ) { return 56; }
                else if (special ==='Exploding Slams'    ) { return 57; }



                else if (special ==='Crazed Lust'    ) { return 58; }
                else if (special ==="Mana Pummel"   ) { return 59; }

                else if (special ==='Giant Barrier'    ) { return 60; }
                else if (special ==="Frozen Death"    ) { return 61; }



            

                else if (special ==='Venom Slash'  ) { return 66; }
                else if (special ==="Green Fire"    ) { return 63; }

                else if (special ==='Harsh Nature'    ) { return 64; }


                else if (special ==='Green Glimmer'    ) { return 65; }
                else if (special ==="Poisonous Feedback"    ) { return 62; }

                else if (special ==='Desert Storm'    ) { return 67; }
                else if (special ==="Legendary Spring"    ) { return 68; }


                else if (special ==='Mirage'    ) { return 69; }
                else if (special ==="Dragonbone"    ) { return 70; }

                else if (special ==='Final Stand'    ) { return 71; }
                else if (special ==="Dark Light"    ) { return 72; }

                else if (special ==='Flesh Blade'    ) { return 73; }
                else if (special ==="Dark Matter"    ) { return 74; }

                else if (special ==='Shock Therapy'    ) { return 75; }
                else if (special ==="Spell Focus"    ) { return 76; }

                else if (special ==='Heat'    ) { return 77; }
                else if (special ==="Flame Slashes"    ) { return 78; }

                else if (special ==="Greatworm's Heart"    ) { return 79; }
                else if (special ==="Master of Fire"    ) { return 80; }

                else if (special ==="Flame Shield"    ) { return 81; }
                else if (special ==="Berserk"    ) { return 82; }

                else if (special ==="Crazed Frenzy"    ) { return 83; }
                else if (special ==="Intense Pain"    ) { return 84; }

                else if (special ==="Mad Tap"    ) { return 85; }
                else if (special ==="Bloodrage"    ) { return 86; }

                else if (special ==="Demon's Bane"    ) { return 87; }
                else if (special ==="Redemption"    ) { return 88; }
                else if (special ==="Mystic Sphere"    ) { return 89; }
                else if (special ==="Demonic Leech"    ) { return 90; }
                else if (special ==="Hero's Protection"    ) { return 91; }

                else if (special ==="Ember Pyre"    ) { return 92; }
                else if (special ==="Dispersion"    ) { return 93; }
                else if (special ==="Frostburn"    ) { return 94; }
                else if (special ==="Fortitude"    ) { return 95; }
                else if (special ==="Sovereign"    ) { return 96; }

                else if (special ==="Singularity Strike"    ) { return 97; }
                else if (special ==="Grudge"    ) { return 98; }
                else if (special ==="Grand Energy"    ) { return 99; }
                else if (special ==="Dark Energy"    ) { return 100; }
                else if (special === "Guarding Light") { return 101; }



                else if (special === "Chosen's Power") { return 102; }
                else if (special === "Demonic Blessing") { return 103; }
                else if (special === "Arcane Sap") { return 104; }

                else if (special === "Sage's Will") { return 105; }
                else if (special === "Godlike Blocks") { return 106; }
                else if (special === "Insanity") { return 107; }

                else if (special === "Titan's Signet") { return 108; }
                else if (special === "Koz's Whisper") { return 109; }
                else if (special === "Relife") { return 110; }
               
                else return -1;
            },
            drawSpecial: function (item, drawToEquip, drawToStats) {
                var game = ig.game;
                var special_a = item.SPECIAL;
            //    var special_L = special_a.length;
               
                var first_S = -1;
                var second_S = -1;
                var third_S = -1;
                var special_L = 1;
               
                var aS = [firstS = first_S, secondS = second_S, thirdS = third_S];
                ig.game.firstSpecial_w = "";
                ig.game.firstSpecial_s = "";
                ig.game.firstSpecial_a = "";

                ig.game.secondSpecial_w = "";
                ig.game.secondSpecial_s = "";
                ig.game.secondSpecial_a = "";

                ig.game.thirdSpecial_w = "";
                ig.game.thirdSpecial_s = "";
                ig.game.thirdSpecial_a = "";
              
            //    for (value in special_a) special_L++
                for (value in special_a) {

                    if (value === 'push') continue;
                    
                 

                    if (first_S === -1) {
                        first_S = game.checkSpecialTile(value);




                        if (first_S > -1) {
                            if (item.isSword) { ig.game.firstSpecial_w = value; }
                            else if (item.isShield) { ig.game.firstSpecial_s = value; }
                            else if (item.isArmor) { ig.game.firstSpecial_a = value; }
                            continue;
                        }
                    }

                   
                    else if (second_S === -1)
                    {
                      //  console.log(value);
                        second_S = game.checkSpecialTile(value);
                      
                        if (second_S > -1) {
                            if (item.isSword) { ig.game.secondSpecial_w = value; }
                            else if (item.isShield) { ig.game.secondSpecial_s = value; }
                            else if (item.isArmor) { ig.game.secondSpecial_a = value; }
                            continue;
                        }
                    }
                    

                    else if (third_S === -1) {
                        third_S = game.checkSpecialTile(value);

                        if (third_S > -1) {
                            if (item.isSword) { ig.game.thirdSpecial_w = value; }
                            else if (item.isShield) { ig.game.thirdSpecial_s = value; }
                            else if (item.isArmor) { ig.game.thirdSpecial_a = value; }
                            continue;
                        }
                    }
                    
                  
                }
               
         /*       if (special_L < 3) {
                    if (item.isSword) { ig.game.thirdSpecial_w = ""; }
                    else if (item.isShield) { ig.game.thirdSpecial_s = ""; }
                    else if (item.isArmor) { ig.game.thirdSpecial_a = ""; }

                }
                if (special_L < 2) {

                    if (item.isSword) { ig.game.secondSpecial_w = ""; }
                    else if (item.isShield) { ig.game.secondSpecial_s = ""; }
                    else if (item.isArmor) { ig.game.secondSpecial_a = ""; }

                }
                if (special_L < 1) {
                    if (item.isSword) { ig.game.firstSpecial_w = ""; }
                    else if (item.isShield) { ig.game.firstSpecial_s = ""; }
                    else if (item.isArmor) { ig.game.firstSpecial_a = ""; }

                }*/
            //    console.log(ig.game.firstSpecial_w + " and " + ig.game.secondSpecial_w);
                aS = [firstS = first_S, secondS = second_S, thirdS = third_S];
                if (aS) {
                    if (drawToEquip) {



                        for (var i = 0; i < aS.length; i++) {
                            if (aS[i] !== -1) {
                                
                              //  ig.game.smallIcon_B.draw(36 + (75 * i), 11);
                                ig.game.smallIcons.drawTile(39 + (77 * i), 9, aS[i], 16);
                            }

                        }
                        //ig.game.firstSpecial_w
                        if (item.isSword) { ig.game.font.draw(ig.game.checkCharLength_E(ig.game.firstSpecial_w), 59, 16); }
                        else if (item.isShield) { ig.game.font.draw(ig.game.checkCharLength_E(ig.game.firstSpecial_s), 59, 16); }
                        else if (item.isArmor) { ig.game.font.draw(ig.game.checkCharLength_E(ig.game.firstSpecial_a), 59, 16); }

                        if (item.isSword) { ig.game.font.draw(ig.game.checkCharLength_E(ig.game.secondSpecial_w), 134, 16); }
                        else if (item.isShield) { ig.game.font.draw(ig.game.checkCharLength_E(ig.game.secondSpecial_s), 134, 16); }
                        else if (item.isArmor) { ig.game.font.draw(ig.game.checkCharLength_E(ig.game.secondSpecial_a), 134, 16); }

                        if (item.isSword) { ig.game.font.draw(ig.game.checkCharLength_E(ig.game.thirdSpecial_w), 209, 16); }
                        else if (item.isShield) { ig.game.font.draw(ig.game.checkCharLength_E(ig.game.thirdSpecial_s), 209, 16); }
                        else if (item.isArmor) { ig.game.font.draw(ig.game.checkCharLength_E(ig.game.thirdSpecial_a), 209, 16); }
                    }
                    else if (drawToStats) {


                        for (var i = 0; i < aS.length; i++) {
                            if (aS[i] != -1) {

                                // ig.game.smallIcon_B.draw(0.51 * ig.system.width, 0.63 * ig.system.height + (19 * i));
                                //ig.game.firstSpecial_w
                                if (item.isSword) { ig.game.smallIcons.drawTile(135, 99 + (21 * i), aS[i], 16); }
                                else if (item.isShield) { ig.game.smallIcons.drawTile(179, 99 + (21 * i), aS[i], 16); }
                                else if (item.isArmor) { ig.game.smallIcons.drawTile(223, 99 + (21 * i), aS[i], 16); }


                            }

                        }
                        var x_mod = 0.57 * 267;
                        //ig.game.firstSpecial_w

                        if (item.isSword) { ig.game.font.draw((ig.game.checkCharLength(ig.game.firstSpecial_w)), x_mod, 0.62 * 160); }
                        else if (item.isShield) { ig.game.font.draw((ig.game.checkCharLength(ig.game.firstSpecial_s)), x_mod + 44, 0.62 * 160); }
                        else if (item.isArmor) { ig.game.font.draw(ig.game.checkCharLength(ig.game.firstSpecial_a), x_mod + 88, 0.62 * 160); }

                        if (item.isSword) { ig.game.font.draw((ig.game.checkCharLength(ig.game.secondSpecial_w)), x_mod, 0.73875 * 160); }
                        else if (item.isShield) { ig.game.font.draw((ig.game.checkCharLength(ig.game.secondSpecial_s)), x_mod + 44, 0.73875 * 160); }
                        else if (item.isArmor) { ig.game.font.draw((ig.game.checkCharLength(ig.game.secondSpecial_a)), x_mod + 88, 0.73875 * 160); }

                        if (item.isSword) { ig.game.font.draw((ig.game.checkCharLength(ig.game.thirdSpecial_w)), x_mod, 0.8575 * 160); }
                        else if (item.isShield) { ig.game.font.draw((ig.game.checkCharLength(ig.game.thirdSpecial_s)), x_mod + 44, 0.8575 * 160); }
                        else if (item.isArmor) { ig.game.font.draw((ig.game.checkCharLength(ig.game.thirdSpecial_a)), x_mod + 88, 0.8575 * 160); }
                    }
                }


            },

            drawPopUp: function (x, y) {
                x -= ig.game.screen.x;
                y -= (ig.game.screen.y + 12);
                var extraY_Buf = 0;

                switch (ig.game.typePopUp) {
                    case "SIGN":
                        ig.game.PopUp.drawTile(x, y, 1, 32);
                        break;
                    case "CHEST":
                        extraY_Buf = 16;
                        ig.game.PopUp.drawTile(x, y - extraY_Buf, 0, 32);
                        break;
                    case "PICK":
                        extraY_Buf = 16;
                        ig.game.PopUp.drawTile(x, y - extraY_Buf, 4, 32);
                        break;
                    case "DOOR":
                        extraY_Buf = 16;
                        ig.game.PopUp.drawTile(x, y - extraY_Buf, 0, 32);
                        break;
                    case "KEYDOOR":
                        extraY_Buf = 16;
                        ig.game.PopUp.drawTile(x, y - extraY_Buf, 2, 32);
                        break;
                    case "TRAVEL":
                        extraY_Buf = 16;
                        ig.game.PopUp.drawTile(x, y - extraY_Buf, 3, 32);
                        break;
                }
                var frameBet = 10;
                var xbuffer = 8;
                var ybuffer = 12;
                ybuffer = ybuffer + extraY_Buf;
                if (ig.game.popUpFrameCount >= frameBet * 6) {

                    ig.game.popUpFrameCount = 0;
                }
                else if (ig.game.popUpFrameCount >= frameBet * 5) {
                    ig.game.touchbubble.drawTile(x + xbuffer, y - ybuffer, 5, 32);

                }
                else if (ig.game.popUpFrameCount >= frameBet * 4) {
                    ig.game.touchbubble.drawTile(x + xbuffer, y - ybuffer, 4, 32);

                }
                else if (ig.game.popUpFrameCount >= frameBet * 3) {
                    ig.game.touchbubble.drawTile(x + xbuffer, y - ybuffer, 3, 32);

                }
                else if (ig.game.popUpFrameCount >= frameBet * 2) {
                    ig.game.touchbubble.drawTile(x + xbuffer, y - ybuffer, 2, 32);

                }
                else if (ig.game.popUpFrameCount >= frameBet) {
                    ig.game.touchbubble.drawTile(x + xbuffer, y - ybuffer, 1, 32);

                }
                else if (ig.game.popUpFrameCount >= 0) {
                    ig.game.touchbubble.drawTile(x + xbuffer, y - ybuffer, 0, 32);

                }
                ig.game.popUpFrameCount++;


            },

            damageTimer: function (time, damage, color, data_packet) {

                var x_coord = 0;
                var y_coord = 0;
                if (!ig.game.player) return;
                x_coord = (data_packet) ? data_packet.pos.x : ig.game.player.pos.x;
                y_coord = (data_packet) ? data_packet.pos.y : ig.game.player.pos.y;

                if (!(typeof damage == "string")) {
                    damage = Math.floor(damage);

                } else { if (color == 'yellow') { color += "_text"; } }
                ig.game.dmgTimerArray.push(new ig.Timer(time));

                var x_buffer = 0;
                var y_buffer = 0;
                // Center in the viewport - would be better if the position was above enemies head

                if ((color == 'white' || color == 'orange')) {   x_buffer = 0;   y_buffer = 0; }
                else if ((color == 'white' || color == 'orange')) {   x_buffer = 0;   y_buffer = 0; }
                else if (color == 'burning_orange') {   x_buffer = 0;   y_buffer = 0; }
                else if (color == 'darkgreen') {   x_buffer = 0;   y_buffer = 0; }
                else if (color == 'green') {   x_buffer = 0;   y_buffer = 0; }
                else if (color == 'red') {   x_buffer = 0;   y_buffer = 0; }
                else if (color == 'green') {   x_buffer = 0;   y_buffer = 0; }
                else if (color == 'yellow') {   x_buffer = 0;   y_buffer = -16; }
                else if (color == 'yellow_text') {   x_buffer = 0;   y_buffer = 0; }
                else if (color == 'cyan') {   x_buffer = -8;   y_buffer = 2; }
                else if (color == 'free_cast') {   x_buffer = -8;   y_buffer = 2; }
                else if (color == 'myst_sphere') {   x_buffer = -8;   y_buffer = 2; }
                else if (color == 'red_blocked') {   x_buffer = -4;   y_buffer = 2; }
                else if (color == 'glimmer') {   x_buffer = -8;   y_buffer = 2; }
                else if (color == 'undyingrage') {   x_buffer = -8;   y_buffer = 2; }
                else if (color == 'fade') {   x_buffer = -8;   y_buffer = 2; }
                else if (color == 'executed') {   x_buffer = -8;   y_buffer = 0; }
                else if (color == 'wrath') {   x_buffer = -8;   y_buffer = 0; }
                else if (color == 'bloodlust') {   x_buffer = -8;   y_buffer = 0; }
                else if (color == 'absorb') {   x_buffer = -8;   y_buffer = 0; }
                else if (color == 'energized') {   x_buffer = -8;   y_buffer = 0; }
                else if (color == 'meleeheal') {   x_buffer = -8;   y_buffer = 0; }
                else if (color == 'regentemp') {   x_buffer = -8;   y_buffer = 0; }
                else if (color == 'barrier') {   x_buffer = -8;   y_buffer = 0; }
                else if (color == 'reflect') {   x_buffer = -8;   y_buffer = 0; }

                else if (color == 'regenUP') {   x_buffer = -8;   y_buffer = 0; }
                else if (color == 'manaSLD') {   x_buffer = -8;   y_buffer = 0; }
                else if (color == 'firstATK') {   x_buffer = -8;   y_buffer = 0; }
                else if (color == 'ratinacorner') {   x_buffer = -8;   y_buffer = 0; }

                else if (color == 'burn') {   x_buffer = -4;   y_buffer = 0; }
                else if (color == 'demonpower') {   x_buffer = -8;   y_buffer = 0; }
                else if (color == 'escalation') {   x_buffer = -8;   y_buffer = 0; }
                else if (color == 'lightningstrikes') {   x_buffer = -8;   y_buffer = 0; }

                else if (color == 'vampirism') {   x_buffer = -8;   y_buffer = 0; }
                else if (color == 'stagger') {   x_buffer = -8;   y_buffer = 0; }
                else if (color == 'frenzy') {   x_buffer = -8;   y_buffer = 0; }
                else if (color == 'SPACEWARP') {   x_buffer = -8;   y_buffer = 0; }

              
                if (!data_packet) {
                    if (ig.game.player) {
                        if (ig.game.player.flip) {
                            x_buffer += 48;
                        }
                        else {
                            x_buffer += 0;
                        }
                    }
                }
                y_buffer -= 16;
               


                var extrabufferY = ig.game.dmgTimerArray.length * 4;
                if (x_buffer < 0) ig.game.dmgTextArray.push({ x: x_coord - ig.game.screen.x + x_buffer, y: y_coord - ig.game.screen.y + y_buffer + extrabufferY });
                else ig.game.dmgTextArray.push({ x: x_coord - ig.game.screen.x + x_buffer, y: y_coord - ig.game.screen.y + y_buffer + extrabufferY });
            
                ig.game.dmgAmountArray.push(damage);
                ig.game.dmgColorArray.push(color);
            },

            // called from draw() function
            damageText: function () {
                var dmgTimerArray = ig.game.dmgTimerArray;
                var dmgColorArray = ig.game.dmgColorArray;
                var dmgAmountArray = ig.game.dmgAmountArray;
                var dmgTextArray = ig.game.dmgTextArray;
                var dmgLength = ig.game.dmgTimerArray.length;
                var game = ig.game;
                var color_a = "";
                         
                for (var i = 0; i < dmgLength; i++) {
                    if (dmgTimerArray[i]) {
                        if (dmgTimerArray[i].delta() < 0) {
                            color_a = dmgColorArray[i];
                               
                            if (color_a == 'burning_orange') { game.font_ORANGE.draw(dmgAmountArray[i], dmgTextArray[i].x, dmgTextArray[i].y -= 0.5, 'center', 'rgba( 255, 153, 0, 1 )'); }
                            else if (color_a == 'red') { game.font_RED.draw(dmgAmountArray[i], dmgTextArray[i].x, dmgTextArray[i].y -= 0.5, 'center', 'rgba( 255, 0, 0, 1 )'); }
                            else if (color_a == 'green') { game.font_GREEN.draw(dmgAmountArray[i], dmgTextArray[i].x, dmgTextArray[i].y -= 0.5, 'center', 'rgba( 0, 255, 0, 1 )'); }
                            else if (color_a == 'darkgreen') { game.font_DARKGREEN.draw(dmgAmountArray[i], dmgTextArray[i].x, dmgTextArray[i].y -= 0.5, 'center', 'rgba( 0, 128, 0, 1 )'); }
                            else if (color_a == 'white') { game.font.draw(dmgAmountArray[i], dmgTextArray[i].x, dmgTextArray[i].y -= 0.5, 'center'); }
                            else if (color_a == 'orange') { game.eventIcons.drawTile(dmgTextArray[i].x + 10, (dmgTextArray[i].y -= 0.5) - 6, 0, 8); game.font_ORANGE.draw(dmgAmountArray[i], dmgTextArray[i].x, dmgTextArray[i].y, 'center', 'rgba( 255, 153, 0, 1 )'); }
                            else if (color_a == 'executed') { game.eventIcons.drawTile(dmgTextArray[i].x + 8, (dmgTextArray[i].y -= 0.5) - 6, 6, 8); }
                            else if (color_a == 'yellow') { game.font_YELLOW_STYLED.draw(dmgAmountArray[i] + " XP", dmgTextArray[i].x, dmgTextArray[i].y -= 0.5, 'center', 'rgba( 255, 255, 0, 1 )'); }
                            else if (color_a == 'yellow_text') { game.font_YELLOW.draw(dmgAmountArray[i], dmgTextArray[i].x, dmgTextArray[i].y -= 0.5, 'center', 'rgba( 255, 255, 0, 1 )'); }
                            else if (color_a == 'cyan') { game.font_CYAN.draw(dmgAmountArray[i], dmgTextArray[i].x, dmgTextArray[i].y -= 0.5, 'center', 'rgba( 0, 255, 255, 1 )'); }
                            else if (color_a == 'free_cast') { game.free_cast.draw(dmgTextArray[i].x - 48, (dmgTextArray[i].y -= 0.5) - 12); }
                            else if (color_a == 'myst_sphere') { game.eventIcons.drawTile(dmgTextArray[i].x - 16, (dmgTextArray[i].y -= 0.5) - 4, 2, 8); game.font.draw(dmgAmountArray[i], dmgTextArray[i].x, dmgTextArray[i].y); }
                            else if (color_a == 'red_blocked') { game.eventIcons.drawTile(dmgTextArray[i].x - 16, (dmgTextArray[i].y -= 0.5) - 4, 1, 8); }
                            else if (color_a == 'glimmer') { game.eventIcons.drawTile(dmgTextArray[i].x - 16, (dmgTextArray[i].y -= 0.5) - 4, 4, 8); game.font.draw(dmgAmountArray[i], dmgTextArray[i].x, dmgTextArray[i].y); }
                            else if (color_a == 'fade') { game.eventIcons.drawTile(dmgTextArray[i].x - 16, (dmgTextArray[i].y -= 0.5) - 4, 5, 8); game.font.draw(dmgAmountArray[i], dmgTextArray[i].x, dmgTextArray[i].y); }
                            else if (color_a == 'undyingrage') { game.eventIcons.drawTile(dmgTextArray[i].x - 16, (dmgTextArray[i].y -= 0.5) - 4, 7, 8); game.font_GREEN.draw('+' + dmgAmountArray[i], dmgTextArray[i].x, dmgTextArray[i].y); }
                            else if (color_a == 'wrath') { game.eventIcons.drawTile(dmgTextArray[i].x - 16, (dmgTextArray[i].y -= 0.5) - 4, 8, 8); }
                            else if (color_a == 'absorb') { game.eventIcons.drawTile(dmgTextArray[i].x - 16, (dmgTextArray[i].y -= 0.5) - 4, 9, 8); }
                            else if (color_a == 'bloodlust') { game.eventIcons.drawTile(dmgTextArray[i].x - 16, (dmgTextArray[i].y -= 0.5) - 4, 27, 8); }
                            else if (color_a == 'energized') { game.eventIcons.drawTile(dmgTextArray[i].x - 16, (dmgTextArray[i].y -= 0.5) - 4, 10, 8); }

                            else if (color_a == 'meleeheal') { game.eventIcons.drawTile(dmgTextArray[i].x - 16, (dmgTextArray[i].y -= 0.5) - 4, 11, 8); }
                            else if (color_a == 'regentemp') { game.eventIcons.drawTile(dmgTextArray[i].x - 16, (dmgTextArray[i].y -= 0.5) - 4, 12, 8); }
                            else if (color_a == 'barrier') { game.eventIcons.drawTile(dmgTextArray[i].x - 16, (dmgTextArray[i].y -= 0.5) - 4, 13, 8); }
                            else if (color_a == 'reflect') { game.eventIcons.drawTile(dmgTextArray[i].x - 16, (dmgTextArray[i].y -= 0.5) - 4, 14, 8); }

                            else if (color_a == 'regenUP') { game.eventIcons.drawTile(dmgTextArray[i].x - 16, (dmgTextArray[i].y -= 0.5) - 4, 15, 8); }
                            else if (color_a == 'manaSLD') { game.eventIcons.drawTile(dmgTextArray[i].x - 16, (dmgTextArray[i].y -= 0.5) - 8, 16, 8); }
                            else if (color_a == 'firstATK') { game.eventIcons.drawTile(dmgTextArray[i].x - 16, (dmgTextArray[i].y -= 0.5) - 4, 17, 8); }
                            else if (color_a == 'ratinacorner') { game.eventIcons.drawTile(dmgTextArray[i].x - 16, (dmgTextArray[i].y -= 0.5) - 4, 18, 8); }

                            else if (color_a == 'burn') { game.eventIcons.drawTile(dmgTextArray[i].x , (dmgTextArray[i].y -= 0.5) - 2, 19, 8); }
                            else if (color_a == 'demonpower') { game.eventIcons.drawTile(dmgTextArray[i].x - 16, (dmgTextArray[i].y -= 0.5) - 4, 20, 8); }
                            else if (color_a == 'escalation') { game.eventIcons.drawTile(dmgTextArray[i].x - 16, (dmgTextArray[i].y -= 0.5) - 4, 21, 8); }
                            else if (color_a == 'lightningstrikes') { game.eventIcons.drawTile(dmgTextArray[i].x - 16, (dmgTextArray[i].y -= 0.5) - 4, 22, 8); }

                            else if (color_a == 'vampirism') { game.eventIcons.drawTile(dmgTextArray[i].x - 16, (dmgTextArray[i].y -= 0.5) - 4, 23, 8); }
                            else if (color_a == 'stagger') { game.eventIcons.drawTile(dmgTextArray[i].x - 16, (dmgTextArray[i].y -= 0.5) - 4, 24, 8); }
                            else if (color_a == 'frenzy') { game.eventIcons.drawTile(dmgTextArray[i].x - 16, (dmgTextArray[i].y -= 0.5) - 4, 25, 8); }
                            else if (color_a == 'SPACEWARP') { game.eventIcons.drawTile(dmgTextArray[i].x - 16, (dmgTextArray[i].y -= 0.5) - 4, 26, 8); }
                        }
                        else { dmgTimerArray.splice(i, 1); dmgTextArray.splice(i, 1); dmgAmountArray.splice(i, 1); dmgColorArray.splice(i, 1); }
                    }
                }
            },

            statsImages: new ig.Image("media/Stats/stats.png"),
            drawequipment_HELPER_1: function(item,currentitem){
                                
               
                                var game = ig.game;
                                var s_width = 267;
                                var s_height = 160;
                                var x_spot = s_width * 0.55 +1
                                var modifier = 0.1675 * s_height;
                                if(currentitem)game.drawBigItem(item.itemName,s_width * 0.70,s_height * 0.25 );
                                var changer = 9;
                               

                                if (currentitem) {
                                    game.draw_stats(ig.game.player.ATK, item,"ATK", x_spot, modifier += changer);
                                    game.draw_stats(ig.game.player.MATK, item, "MATK", x_spot, modifier += changer);
                                    game.draw_stats(ig.game.player.Maxhealth, item, "HP", x_spot, modifier += changer);
                                    game.draw_stats(ig.game.player.Maxmana, item, "MP", x_spot, modifier += changer);

                                    game.draw_stats(ig.game.player.STR, item, "STR", x_spot, modifier += changer);
                                    game.draw_stats(ig.game.player.INT, item, "INT", x_spot, modifier += changer);
                                    game.draw_stats(ig.game.player.AGI, item, "AGI", x_spot, modifier += changer);
                                   
                                    game.draw_stats(ig.game.player.MANA_REGEN, item, "MANA_REGEN", x_spot, modifier += changer);
                                    game.draw_stats(ig.game.player.HP_REGEN, item, "HP_REGEN", x_spot, modifier += changer);

                                    game.draw_stats(ig.game.player.RES, item, "RES", x_spot - 5, modifier += changer, "res");
                                    game.draw_stats(ig.game.player.MAG_RES, item, "MAG_RES", x_spot - 5, modifier += changer, "res");
                                    game.draw_stats(ig.game.player.BLK, item, "BLK", x_spot - 5, modifier += changer);
                                }
                                else {
                                    game.draw_stats(item.ATK, item, "ATK", x_spot, modifier += changer, null, true);
                                    game.draw_stats(item.MATK, item, "MATK", x_spot, modifier += changer, null, true);
                                    game.draw_stats(item.HP, item, "HP", x_spot, modifier += changer, null, true);
                                    game.draw_stats(item.MP, item, "MP", x_spot, modifier += changer, null, true);

                                    game.draw_stats(item.STR, item, "STR", x_spot, modifier += changer, null, true);
                                    game.draw_stats(item.INT, item, "INT", x_spot, modifier += changer, null, true);
                                    game.draw_stats(item.AGI, item, "AGI", x_spot, modifier += changer, null, true);
                                 
                                    game.draw_stats(item.MP_R, item, "MANA_REGEN", x_spot, modifier += changer, null, true);
                                    game.draw_stats(item.HP_R, item, "HP_REGEN", x_spot, modifier += changer, null, true);

                                    game.draw_stats(item.RES, item, "RES", x_spot, modifier += changer, "res", true);
                                    game.draw_stats(item.M_RES, item, "MAG_RES", x_spot, modifier += changer, "res", true);
                                    game.draw_stats(item.BLK, item, "BLK", x_spot, modifier += changer, null, true);
                                }
                                
                            
                             
                                
            },
            equipSign: new ig.Image('media/EquippedSign.png'),
            qualityWeapon: new ig.Image('media/RarityWeapons.png'),
            qualityShield: new ig.Image('media/RarityShields.png'),
            qualityArmor: new ig.Image('media/RarityArmor.png'),
            rarityBubble: new ig.Image('media/RarityBubble.png'),
            BqualityWeapon: new ig.Image('media/BigRarityWeapons.png'),
            BqualityShield: new ig.Image('media/BigRarityShields.png'),
            BqualityArmor: new ig.Image('media/BigRarityArmor.png'),
            upgradeArrow: new ig.Image('media/UpgradeArrow.png'),
            upgradeArrowTimer: null,
          
            upgradeArrowTile: 0,

            
            drawUpgradeGFX: function (type, upgradedFrom) {
            
                if (type === "weapon") {
                    ig.game.BqualityWeapon.drawTile(80, 48, upgradedFrom-1,16);

                    ig.game.BqualityWeapon.drawTile(180, 48, upgradedFrom, 16);
                }
                else if (type === "shield") {
                    ig.game.BqualityShield.drawTile(80, 48, upgradedFrom-1, 16);

                    ig.game.BqualityShield.drawTile(180, 48, upgradedFrom, 16);
                }
                else if (type === "armor") {
                    ig.game.BqualityArmor.drawTile(80, 48, upgradedFrom-1, 16);

                    ig.game.BqualityArmor.drawTile(180, 48, upgradedFrom, 16);
                }
                ig.game.upgradeArrow.drawTile(125, 48, ig.game.upgradeArrowTile, 16);
              if (!ig.game.upgradeArrowTimer) {
                    ig.game.upgradeArrowTimer = new ig.Timer();
                    ig.game.upgradeArrowTimer.set(0.2);
                }
              if (ig.game.upgradeArrowTimer && ig.game.upgradeArrowTimer.delta() > 0) {

                    ig.game.upgradeArrowTimer.set(0.1);
                   
                        ig.game.upgradeArrowTile++;
                    
                    if (ig.game.upgradeArrowTile > 4) {
                      
                        ig.game.upgradeArrowTile = 0;
                    }
                    

                }
            },
            equipmentQuality: new ig.Image('media/equipmentQuality.png'),
            drawQuality: function (itemQuality, x, y) {
         
                ig.game.equipmentQuality.drawTile(x-1, y, itemQuality - 1, 80,8);
            },
            drawequipment: function (isShop,isMenu){
                             
                                var game = ig.game;
                                var s_width = 267;
                                var s_height = 160;
                                var y_buffer = s_height * 0.05;
                                var draw_y_buffer = 0;
                                var draw2_y_buffer = 0;
                                var itemArray = null;
                                var weaponArray = null;
                                var shieldArray = null;
                                var armorArray = null;
                                var weapon = null;
                                var shield = null;
                                var armor = null; 
                                if (isMenu) {
                                    itemArray = game.loadPackage.itemArray;

                                    weapon = game.loadPackage.weapon;
                                    shield = game.loadPackage.shield;
                                    armor = game.loadPackage.armor;
                                   // console.log(game.loadPackage.weaponArray.length + " JEP ");
                                }
                                else {
                                    weaponArray = game.player.weaponArray;
                                    shieldArray = game.player.shieldArray;
                                    armorArray = game.player.armorArray;

                                    weapon = game.player.weapon;
                                    shield = game.player.shield;
                                    armor = game.player.armor;
                                }
                                //Local variables for performance
                              /*  if (DEBUG) {
                                    
                                    ig.game.FillInventory(0);
                                    DEBUG = false;
                                }*/
                                
                      
                                if (isMenu === true) {
                                    var ListHeight = 0.4 * s_height;
                                    var inputLocation = game.input_location_equip;
                                    var x_buffer = 4;
                                   
                                    var checkAgainst = null;
                                

                                    //for (var i = game.input_location_equip - 2; i < 12 + game.input_location_equip; i++) {
                                    for (var i = game.input_location_equip -3; i < game.input_location_equip + 8; i++) {


                                        if (itemArray[i] && itemArray[i].isSword) {
                                            checkAgainst = weapon.id;
                                        }
                                        else if (itemArray[i] && itemArray[i].isShield) {
                                            checkAgainst = shield.id;
                                        }
                                        else if (itemArray[i] && itemArray[i].isArmor) {
                                            checkAgainst = armor.id;
                                        }
                                  
                                        if (itemArray[game.input_location_equip] && checkAgainst && itemArray[i]
                                            ) {
                                            if (
                                                itemArray[i].id === checkAgainst && itemArray[i].itemEquipped) {
                                                game.equipSign.draw(x_buffer - 1, ListHeight - 1 + y_buffer * draw2_y_buffer);
                                            }
                                            game.font.draw(itemArray[i].itemName, x_buffer, ListHeight + y_buffer * draw2_y_buffer, ig.Font.ALIGN.LEFT); 
                                          
                                             
                                            if (itemArray[i].isSword) game.qualityWeapon.drawTile(x_buffer + 84, ListHeight - 1 + y_buffer * draw2_y_buffer, itemArray[i].QualityLevel - 1, 8);
                                            else if (itemArray[i].isShield) game.qualityShield.drawTile(x_buffer + 84, ListHeight - 1 + y_buffer * draw2_y_buffer, itemArray[i].QualityLevel - 1, 8);
                                            else if (itemArray[i].isArmor) game.qualityArmor.drawTile(x_buffer + 84, ListHeight - 1 + y_buffer * draw2_y_buffer, itemArray[i].QualityLevel - 1, 8);

                                          
                                           game.font_YELLOW.draw(game.checkItemPrice(ig.game.loadPackage.itemArray[i], true), x_buffer + 100, ListHeight + y_buffer * draw2_y_buffer, ig.Font.ALIGN.LEFT);

                                           
                                        }
                                       
                                        draw2_y_buffer++;
                                    }
                                    if (itemArray[game.input_location_equip]) {
                                        game.drawSpecial(itemArray[game.input_location_equip], 'special');
                                        game.drawequipment_HELPER_1(itemArray[game.input_location_equip], null);
                                    }
                                    
                                    game.font_YELLOW.draw(accountHardCurrency, 58, ListHeight - 24, ig.Font.ALIGN.LEFT);
                                 
                                }
                                else {
                                    
                                    var inputLocation = game.input_location_equip;
                                    var weaponListHeight = s_height * 0.745;
                                    var shieldListHeight = s_height * 0.745;
                                    var armorListHeight = s_height * 0.745;

                                    if (weaponArray.length === 1 || weaponArray.length === 2) {
                                        weaponListHeight = s_height * 0.735;

                                    }
                                    if (shieldArray.length === 1 || shieldArray.length === 2) {
                                        shieldListHeight = s_height * 0.735;

                                    }

                                    if (armorArray.length === 1 || armorArray.length === 2) {
                                        armorListHeight = s_height * 0.735;

                                    }
                                    //2 less of maximum
                                    // if(ig.game.equipmentSelectY === 0) ig.game.equipmentSelectY = weaponListHeight;
                                    //   ig.game.equipmentListSmoother((weaponListHeight - (y_buffer * game.input_location_equip - 2)));
                                    if (game.equip_menu_swords && weaponArray[game.input_location_equip]) {
                                        var currentitem = weapon;
                                        item = weaponArray[game.input_location_equip];
                                        game.drawequipment_HELPER_1(item, currentitem);
                                        game.drawSpecial(item, 'special');
                                    }
                                    else if (game.equip_menu_shields && shieldArray[game.input_location_equip]) {
                                        var currentitem = shield;
                                        item = shieldArray[game.input_location_equip];
                                        game.drawequipment_HELPER_1(item, currentitem);
                                        game.drawSpecial(item, 'special');
                                    }
                                    else if (game.equip_menu_armor && armorArray[game.input_location_equip]){

                                        var currentitem = armor;
                                        item = armorArray[game.input_location_equip];


                                        game.drawequipment_HELPER_1(item, currentitem);
                                        game.drawSpecial(item, 'special');
                                    }
                                    for (var i = game.input_location_equip - 2; i < 5 + game.input_location_equip; i++) {
                                        var item = null;
                                        var x_buffer = 4;

                                        if (game.equip_menu_swords  && weaponArray[i]) {


                                            

                                            //draw specialities

                                            game.font.draw(weaponArray[i].itemName, x_buffer, weaponListHeight + y_buffer * draw_y_buffer, ig.Font.ALIGN.LEFT);
                                            game.drawQuality(weaponArray[i].QualityLevel, x_buffer, weaponListHeight + y_buffer * draw_y_buffer);
                                            





                                        }
                                        else if (game.equip_menu_shields  && shieldArray[i]) {

                                            

                                            //draw specialities
                                            game.font.draw(shieldArray[i].itemName, x_buffer, shieldListHeight + y_buffer * draw_y_buffer, ig.Font.ALIGN.LEFT);
                                            game.drawQuality(shieldArray[i].QualityLevel, x_buffer, weaponListHeight + y_buffer * draw_y_buffer);
                                           
                                        }
                                        else if (game.equip_menu_armor && armorArray[i]) {
                                            

                                            //draw specialities
                                            game.font.draw(armorArray[i].itemName, x_buffer, armorListHeight + y_buffer * draw_y_buffer, ig.Font.ALIGN.LEFT);
                                            game.drawQuality(armorArray[i].QualityLevel, x_buffer, weaponListHeight + y_buffer * draw_y_buffer);
                                          

                                        }
                                   
                                        draw_y_buffer++;
                                    }
                                    var description = "";
                                    if (game.equip_menu_swords && weaponArray[game.input_location_equip]) {
                                        description = weaponArray[game.input_location_equip].description;
                                    }
                                    else if (game.equip_menu_shields && shieldArray[game.input_location_equip]) {
                                        description = shieldArray[game.input_location_equip].description;
                                    }
                                    else if (game.equip_menu_armor && armorArray[game.input_location_equip]) {
                                        description = armorArray[game.input_location_equip].description;
                                    }
                                    game.font_YELLOW.draw(game.parseRetText(description, 'description'), 155, 116, ig.Font.ALIGN.LEFT);
                                }
   
            },

            uparrow: new ig.Image('media/uparrow.png'),

            dummyPlayer: null,
            draw_stats: function (amount,comparisionitem,type,  x_coord, y_coord, settings,isShop) {

                var isVal = "neutral";
                if (!ig.game.player) return;
                var settings2 = { _killed: true, name: 'dummy', CLASS : ig.game.player.CLASS };

                if (!ig.game.dummyPlayer) ig.game.dummyPlayer = new EntityPlayer(-64, -64, settings2)


           
                
                var newamount = ig.game.CalculateStats(ig.game.dummyPlayer, type, comparisionitem);
              

            
                if (settings) {




                    if (amount > 90 && settings == "res") { amount = 90; }
                    if (amount > 100 && settings == "crit") { amount = 100; }
                    if (newamount > 90 && settings == "res") { newamount = 90; }
                    if (newamount > 100 && settings == "crit") { newamount = 100; }
                    if (settings == "critD") {

                        amount = Math.floor(amount * 10) / 10;

                        newamount = Math.floor(newamount * 10) / 10;

                    } else {



                        amount = Math.floor(amount);

                        newamount = Math.floor(newamount);

                    }


                }
                else {
                    amount = Math.floor(amount);

                    newamount = Math.floor(newamount);

                }

          
                if (amount != newamount) {

                    if (amount > newamount) isVal = "neg";
                    else if (amount < newamount) isVal = "pos";

                }
              
                               
                 
                            
                              

                         
                                

                              
                                
                                switch(isVal){
                                
                                case "neg":
                                    if (isShop) {
                                        ig.game.font.draw(amount, x_coord + 100, y_coord);
                                    }
                                    else {
                                       
                                        ig.game.font_GREY.draw(newamount, x_coord, y_coord);
                                       // ig.game.uparrow.drawTile(x_coord - 2, y_coord, 1, 8)
                                    }
                               
                                break;
                                
                                case "neutral":
                                    if (isShop) {
                                        ig.game.font.draw(amount, x_coord+100, y_coord);
                                    }
                                    else {
                                      
                                        ig.game.font.draw("-", x_coord, y_coord);
                                    }
                                        
                               
                                break;
                                case "pos":
                                    if (isShop) {
                                        ig.game.font.draw(amount, x_coord+100, y_coord);
                                    }
                                    else {
                                        // ig.game.uparrow.drawTile(x_coord - 2, y_coord, 0, 8)
                                     
                                        ig.game.font_YELLOW.draw(newamount, x_coord, y_coord);
                                    }
                               
                                
                                break;
                                
                                }
                                
                                if (!isShop) {
                                    if (type === "RES" || type === "MAG_RES" || type === "BLK") x_coord += 5;
                                    ig.game.font.draw(amount, x_coord - 26, y_coord);
                                }
            },
            drawBigItem: function (itemname, x, y) {
                var armorImage = ig.game.armorImage
                var shieldImage = ig.game.shieldImage;
                var weaponImage = ig.game.weaponImage;
               
                

                if (itemname == 'Leather Armor') {
                    armorImage.drawTile(x, y, 0, 64);
                }
                else if (itemname == 'Heavy Leather') {
                    armorImage.drawTile(x, y, 1, 64);
                }
                else if (itemname == 'Leather Robe') {
                    armorImage.drawTile(x, y, 2, 64);
                }
                else if (itemname == 'Copper Armor') {
                    armorImage.drawTile(x, y, 3, 64);
                }
                else if (itemname == 'Bronze Armor') {
                    armorImage.drawTile(x, y, 4, 64);
                }
                else if (itemname == 'Iron Armor') {
                    armorImage.drawTile(x, y, 5, 64);
                }
                else if (itemname == 'Heavy Armor') {
                    armorImage.drawTile(x, y, 6, 64);
                }
                else if (itemname == 'Steel Armor') {
                    armorImage.drawTile(x, y, 7, 64);
                }
                else if (itemname == 'Chainmail') {
                    armorImage.drawTile(x, y, 8, 64);
                }
                else if (itemname == 'Heavy Steel') {
                    armorImage.drawTile(x, y, 9, 64);
                }
                else if (itemname == 'Cotton Robe') {
                    armorImage.drawTile(x, y, 10, 64);
                }
                else if (itemname == 'Mythril Armor') {
                    armorImage.drawTile(x, y, 11, 64);
                }
                else if (itemname == 'Imbued Robe') {
                    armorImage.drawTile(x, y, 12, 64);
                }
                else if (itemname == 'Delisirrian Arm.') {
                    armorImage.drawTile(x, y, 13, 64);
                }
                else if (itemname == 'Delisirrian Rob.') {
                    armorImage.drawTile(x, y, 14, 64);
                }
                else if (itemname == "Hero's Armor") {
                    armorImage.drawTile(x, y, 15, 64);
                }
                else if (itemname == "Sage's Robe") {
                    armorImage.drawTile(x, y, 16, 64);
                }
                else if (itemname == "Mage's Robe") {
                    armorImage.drawTile(x, y, 17, 64);
                }

                else if (itemname == 'Demon Mail') {
                    armorImage.drawTile(x, y, 18, 64);
                }
                else if (itemname == 'Spell Vest') {
                    armorImage.drawTile(x, y, 19, 64);
                }
              
                else if (itemname == 'Scale Armor') {
                    armorImage.drawTile(x, y, 20, 64);
                }
                else if (itemname == "Whirlwind") {
                    armorImage.drawTile(x, y, 21, 64);
                }
                else if (itemname == "Bonemail") {
                    armorImage.drawTile(x, y, 22, 64);
                }
                else if (itemname == "Black Hood") {
                    armorImage.drawTile(x, y, 23, 64);
                }

                else if (itemname == "Terrafire") {
                    armorImage.drawTile(x, y, 24, 64);
                }
                else if (itemname == "Flame Guard") {
                    armorImage.drawTile(x, y, 25, 64);
                }
                else if (itemname == "Berserker Vest") {
                    armorImage.drawTile(x, y, 26, 64);
                }
                else if (itemname == "Fallen Armor") {
                    armorImage.drawTile(x, y, 27, 64);
                }

                else if (itemname == "Elemental Armor") {
                    armorImage.drawTile(x, y, 28, 64);
                }
               
                


                //Shield
                if (itemname == 'Wooden Shield') {
                    shieldImage.drawTile(x, y, 0, 64);

                }
                else if (itemname == 'Stone Shield') {
                    shieldImage.drawTile(x, y, 1, 64);

                }
                else if (itemname == 'Practice Shield') {
                    shieldImage.drawTile(x, y, 2, 64);

                }
                else if (itemname == 'Copper Shield') {
                    shieldImage.drawTile(x, y, 3, 64);

                }
                else if (itemname == 'Bronze Shield') {
                    shieldImage.drawTile(x, y, 4, 64);

                }
                else if (itemname == 'Iron Shield') {
                    shieldImage.drawTile(x, y, 5, 64);

                }
                else if (itemname == 'Heavy Shield') {
                    shieldImage.drawTile(x, y, 6, 64);

                }
                else if (itemname == 'Steel Shield') {
                    shieldImage.drawTile(x, y, 7, 64);

                }
                else if (itemname == 'Hardened Shield') {
                    shieldImage.drawTile(x, y, 8, 64);

                }
                else if (itemname == 'Mythril Shield') {
                    shieldImage.drawTile(x, y, 9, 64);

                }
                else if (itemname == 'Magic Shield') {
                    shieldImage.drawTile(x, y, 10, 64);

                }
                else if (itemname == 'Delisirrian Sld.') {
                    shieldImage.drawTile(x, y, 11, 64);

                }
                else if (itemname == 'Red Shield') {
                    shieldImage.drawTile(x, y, 12, 64);

                }
                else if (itemname == 'Blue Shield') {
                    shieldImage.drawTile(x, y, 13, 64);

                }
                else if (itemname == 'Yellow Shield') {
                    shieldImage.drawTile(x, y, 14, 64);

                }
           
                else if (itemname == 'Power Orb') {
                    shieldImage.drawTile(x, y, 15, 64);
                }
                else if (itemname == "Mana Orb") {
                    shieldImage.drawTile(x, y, 16, 64);
                }
                else if (itemname == "Hero's Shield") {
                    shieldImage.drawTile(x, y, 17, 64);
                }
                else if (itemname == "Duelist's Shield") {
                    shieldImage.drawTile(x, y, 18, 64);

                }
                else if (itemname == "Giant's Shield") {
                    shieldImage.drawTile(x, y, 19, 64);
                }
                else if (itemname == "Magic Orb") {
                    shieldImage.drawTile(x, y, 20, 64);
                }
                else if (itemname == "Scorpion's Heart") {
                    shieldImage.drawTile(x, y, 21, 64);
                }
                else if (itemname == "Sting Shield") {
                    shieldImage.drawTile(x, y, 22, 64);
                }


                else if (itemname == "Sacred Relic") {
                    shieldImage.drawTile(x, y, 23, 64);
                }
                else if (itemname == "Mystic Skull") {
                    shieldImage.drawTile(x, y, 24, 64);
                }
                else if (itemname == "Necro Book") {
                    shieldImage.drawTile(x, y, 25, 64);
                }

                else if (itemname == "Emberstone") {
                    shieldImage.drawTile(x, y, 26, 64);
                }
              

                else if (itemname == "Rage") {
                    shieldImage.drawTile(x, y, 27, 64);
                }
                else if (itemname == "Demon's Heart") {
                    shieldImage.drawTile(x, y, 28, 64);
                }
                else if (itemname == "Demon Shield") {
                    shieldImage.drawTile(x, y, 29, 64);
                }

                else if (itemname == "Demon Orb") {
                    shieldImage.drawTile(x, y, 30, 64);
                }


                else if (itemname == "Sovereign") {
                    shieldImage.drawTile(x, y, 31, 64);
                }

                else if (itemname == "Summoning Stone") {
                    shieldImage.drawTile(x, y, 32, 64);
                }

                else if (itemname == "Sage's Memento") {
                    shieldImage.drawTile(x, y, 33, 64);
                }

                //Sword
                if (itemname == 'Wooden Sword') {
                     weaponImage.drawTile(x, y, 0, 64);
                 
                }
                else if (itemname == 'Stone Sword') {
                     weaponImage.drawTile(x, y, 1, 64);
                }
                else if (itemname == 'Practice Sword') {
                     weaponImage.drawTile(x, y, 2, 64);
                }
                else if (itemname == 'Stick') {
                     weaponImage.drawTile(x, y, 3, 64);
                }
                else if (itemname == 'Wooden Staff') {
                     weaponImage.drawTile(x, y, 4, 64);
                }
                else if (itemname == 'Copper Sword') {
                     weaponImage.drawTile(x, y, 5, 64);
                }
                else if (itemname == 'Bronze Sword') {
                     weaponImage.drawTile(x, y, 6, 64);
                }
                else if (itemname == 'Slasher') {
                     weaponImage.drawTile(x, y, 7, 64);
                }
                else if (itemname == 'Copper Stick') {
                     weaponImage.drawTile(x, y, 8, 64);
                }
                else if (itemname == 'Bronze Staff') {
                     weaponImage.drawTile(x, y, 9, 64);
                }
                else if (itemname == 'Iron Blade') {
                     weaponImage.drawTile(x, y, 10, 64);
                }
                else if (itemname == 'Iron Sword') {
                     weaponImage.drawTile(x, y, 11, 64);
                }
                else if (itemname == 'Iron Grand') {
                     weaponImage.drawTile(x, y, 12, 64);
                }
                else if (itemname == 'Iron Staff') {
                     weaponImage.drawTile(x, y, 13, 64);
                }
                else if (itemname == 'Imbued Stick') {
                     weaponImage.drawTile(x, y, 14, 64);
                }
                else if (itemname == 'Steel Sword') {
                     weaponImage.drawTile(x, y, 15, 64);
                }
                else if (itemname == 'Cleaver') {
                     weaponImage.drawTile(x, y, 16, 64);
                }
                else if (itemname == 'Iron Mallet') {
                     weaponImage.drawTile(x, y, 17, 64);
                }
                else if (itemname == 'Imbued Staff') {
                     weaponImage.drawTile(x, y, 18, 64);
                }
                else if (itemname == 'Grand Staff') {
                     weaponImage.drawTile(x, y, 19, 64);
                }
                else if (itemname == 'Mythril Sword') {
                     weaponImage.drawTile(x, y, 20, 64);
                }
                else if (itemname == 'Elven Blade') {
                     weaponImage.drawTile(x, y, 21, 64);
                }
                else if (itemname == 'Great Sword') {
                    weaponImage.drawTile(x, y, 22, 64);
                }
                else if (itemname == 'Mythril Staff') {
                     weaponImage.drawTile(x, y, 23, 64);
                }
                else if (itemname == 'Golden Oak') {
                    weaponImage.drawTile(x, y, 24, 64);
                }
                else if (itemname == 'Delisirrian Swd.') {
                    weaponImage.drawTile(x, y, 25, 64);
                }
                else if (itemname == 'Noble Blade') {
                    weaponImage.drawTile(x, y, 26, 64);
                }
                else if (itemname == 'Claymore') {
                    weaponImage.drawTile(x, y, 27, 64);
                }
                else if (itemname == "Executor's Axe") {
                    weaponImage.drawTile(x, y, 28, 64);
                }
                else if (itemname == 'Delisirrian Sta.') {
                    weaponImage.drawTile(x, y, 29, 64);
                }
                else if (itemname == "Duelist's Blade") {
                    weaponImage.drawTile(x, y, 30, 64);
                }
                else if (itemname == "Hero's Sword") {
                    weaponImage.drawTile(x, y, 31, 64);
                }
                else if (itemname == "Grand Mallet") {
                    weaponImage.drawTile(x, y, 32, 64);
                }
                else if (itemname == "Wizard's Staff") {
                    weaponImage.drawTile(x, y, 33, 64);
                }

                else if (itemname == "Piggy's Spike") {
                    weaponImage.drawTile(x, y, 34, 64);
                }
                else if (itemname == "Holy Sword") {
                    weaponImage.drawTile(x, y, 35, 64);
                }
                else if (itemname == "Blessed Staff") {
                    weaponImage.drawTile(x, y, 36, 64);
                }
                else if (itemname == "Exploding Axe") {
                    weaponImage.drawTile(x, y, 37, 64);
                }
                else if (itemname == "Devastator") {
                    weaponImage.drawTile(x, y, 38, 64);
                }

                else if (itemname == "Oaken Pole") {
                    weaponImage.drawTile(x, y, 39, 64);
                }
                else if (itemname == "Viper Slicer") {
                    weaponImage.drawTile(x, y, 40, 64);
                }
                else if (itemname == "Green Staff") {
                    weaponImage.drawTile(x, y, 41, 64);
                }

                else if (itemname == "Sand Sword") {
                    weaponImage.drawTile(x, y, 42, 64);
                }
                else if (itemname == "Desert Star") {
                    weaponImage.drawTile(x, y, 43, 64);
                }
                else if (itemname == "Blood Sword") {
                    weaponImage.drawTile(x, y, 44, 64);
                }

                else if (itemname == "Dark Staff") {
                    weaponImage.drawTile(x, y, 45, 64);
                }
                else if (itemname == "Flamebrand") {
                    weaponImage.drawTile(x, y, 46, 64);
                }
                else if (itemname == "Pyroforian") {
                    weaponImage.drawTile(x, y, 47, 64);
                }

                else if (itemname == "Axe of the Madman") {
                    weaponImage.drawTile(x, y, 48, 64);
                }
                else if (itemname == "Agony") {
                    weaponImage.drawTile(x, y, 49, 64);
                }
                else if (itemname == "Mad Fury") {
                    weaponImage.drawTile(x, y, 50, 64);
                }

                else if (itemname == "Cursed Mageslayer") {
                    weaponImage.drawTile(x, y, 51, 64);
                }
                else if (itemname == "Yggdrassil") {
                    weaponImage.drawTile(x, y, 52, 64);
                }
                else if (itemname == "Tetrarz") {
                    weaponImage.drawTile(x, y, 53, 64);
                }

                else if (itemname == "Frostfire Sword") {
                    weaponImage.drawTile(x, y, 54, 64);
                }
                else if (itemname == "The Void") {
                    weaponImage.drawTile(x, y, 55, 64);
                }
                else if (itemname == "Abyss") {
                    weaponImage.drawTile(x, y, 56, 64);
                }
                else if (itemname == "Black Staff") {
                    weaponImage.drawTile(x, y, 57, 64);
                }
               
            },
            drawSmallItem: function (itemname, x , y) {
                var s_armorImage = ig.game.s_armorImage
                var s_shieldImage = ig.game.s_shieldImage;
                var s_weaponImage = ig.game.s_weaponImage;
                



                if (itemname == 'Leather Armor') {
                    s_armorImage.drawTile(x, y, 0, 32);
                }
                else if (itemname == 'Heavy Leather') {
                    s_armorImage.drawTile(x, y, 1, 32);
                }
                else if (itemname == 'Leather Robe') {
                    s_armorImage.drawTile(x, y, 2, 32);
                }
                else if (itemname == 'Copper Armor') {
                    s_armorImage.drawTile(x, y, 3, 32);
                }
                else if (itemname == 'Bronze Armor') {
                    s_armorImage.drawTile(x, y, 4, 32);
                }
                else if (itemname == 'Iron Armor') {
                    s_armorImage.drawTile(x, y, 5, 32);
                }
                else if (itemname == 'Heavy Armor') {
                    s_armorImage.drawTile(x, y, 6, 32);
                }
                else if (itemname == 'Steel Armor') {
                    s_armorImage.drawTile(x, y, 7, 32);
                }
                else if (itemname == 'Chainmail') {
                    s_armorImage.drawTile(x, y, 8, 32);
                }
                else if (itemname == 'Heavy Steel') {
                    s_armorImage.drawTile(x, y, 9, 32);
                }
                else if (itemname == 'Cotton Robe') {
                    s_armorImage.drawTile(x, y, 10, 32);
                }
                else if (itemname == 'Mythril Armor') {
                    s_armorImage.drawTile(x, y, 11, 32);
                }
                else if (itemname == 'Imbued Robe') {
                    s_armorImage.drawTile(x, y, 12, 32);
                }
                else if (itemname == 'Delisirrian Arm.') {
                    s_armorImage.drawTile(x, y, 13, 32);
                }
                else if (itemname == 'Delisirrian Rob.') {
                    s_armorImage.drawTile(x, y, 14, 32);
                }
                else if (itemname == "Hero's Armor") {
                    s_armorImage.drawTile(x, y, 15, 32);
                }
                else if (itemname == "Sage's Robe") {
                    s_armorImage.drawTile(x, y, 16, 32);
                }
                else if (itemname == "Mage's Robe") {
                    s_armorImage.drawTile(x, y, 17, 32);
                }

                else if (itemname == 'Demon Mail') {
                    s_armorImage.drawTile(x, y, 18, 32);
                }
                else if (itemname == 'Spell Vest') {
                    s_armorImage.drawTile(x, y, 19, 32);
                }
              
                else if (itemname == 'Scale Armor') {
                    s_armorImage.drawTile(x, y, 20, 32);
                }
                else if (itemname == "Whirlwind") {
                    s_armorImage.drawTile(x, y, 21, 32);
                }
                else if (itemname == "Bonemail") {
                    s_armorImage.drawTile(x, y, 22, 32);
                }
                else if (itemname == "Black Hood") {
                    s_armorImage.drawTile(x, y, 23, 32);
                }

                else if (itemname == "Terrafire") {
                    s_armorImage.drawTile(x, y, 24, 32);
                }
                else if (itemname == "Flame Guard") {
                    s_armorImage.drawTile(x, y, 25, 64);
                }
                else if (itemname == "Berserker Vest") {
                    s_armorImage.drawTile(x, y, 26, 32);
                }
                else if (itemname == "Fallen Armor") {
                    s_armorImage.drawTile(x, y, 27, 32);
                }

                else if (itemname == "Elemental Armor") {
                    s_armorImage.drawTile(x, y, 28, 32);
                }
              



                //Shield
                if (itemname == 'Wooden Shield') {
                    s_shieldImage.drawTile(x, y, 0, 32);

                }
                else if (itemname == 'Stone Shield') {
                    s_shieldImage.drawTile(x, y, 1, 32);

                }
                else if (itemname == 'Practice Shield') {
                    s_shieldImage.drawTile(x, y, 2, 32);

                }
                else if (itemname == 'Copper Shield') {
                    s_shieldImage.drawTile(x, y, 3, 32);

                }
                else if (itemname == 'Bronze Shield') {
                    s_shieldImage.drawTile(x, y, 4, 32);

                }
                else if (itemname == 'Iron Shield') {
                    s_shieldImage.drawTile(x, y, 5, 32);

                }
                else if (itemname == 'Heavy Shield') {
                    s_shieldImage.drawTile(x, y, 6, 32);

                }
                else if (itemname == 'Steel Shield') {
                    s_shieldImage.drawTile(x, y, 7, 32);

                }
                else if (itemname == 'Hardened Shield') {
                    s_shieldImage.drawTile(x, y, 8, 32);

                }
                else if (itemname == 'Mythril Shield') {
                    s_shieldImage.drawTile(x, y, 9, 32);

                }
                else if (itemname == 'Magic Shield') {
                    s_shieldImage.drawTile(x, y, 10, 32);

                }
                else if (itemname == 'Delisirrian Sld.') {
                    s_shieldImage.drawTile(x, y, 11, 32);

                }
                else if (itemname == 'Red Shield') {
                    s_shieldImage.drawTile(x, y, 12, 32);

                }
                else if (itemname == 'Blue Shield') {
                    s_shieldImage.drawTile(x, y, 13, 32);

                }
                else if (itemname == 'Yellow Shield') {
                    s_shieldImage.drawTile(x, y, 14, 32);

                }

                else if (itemname == 'Power Orb') {
                    s_shieldImage.drawTile(x, y, 15, 32);
                }
                else if (itemname == "Mana Orb") {
                    s_shieldImage.drawTile(x, y, 16, 32);
                }
                else if (itemname == "Hero's Shield") {
                    s_shieldImage.drawTile(x, y, 17, 32);
                }
                else if (itemname == "Duelist's Shield") {
                    s_shieldImage.drawTile(x, y, 18, 32);

                }
                else if (itemname == "Giant's Shield") {
                    s_shieldImage.drawTile(x, y, 19, 32);
                }
                else if (itemname == "Magic Orb") {
                    s_shieldImage.drawTile(x, y, 20, 32);
                }
                else if (itemname == "Scorpion's Heart") {
                    s_shieldImage.drawTile(x, y, 21, 32);
                }
                else if (itemname == "Sting Shield") {
                    s_shieldImage.drawTile(x, y, 22, 32);
                }


                else if (itemname == "Sacred Relic") {
                    s_shieldImage.drawTile(x, y, 23, 32);
                }
                else if (itemname == "Mystic Skull") {
                    s_shieldImage.drawTile(x, y, 24, 32);
                }
                else if (itemname == "Necro Book") {
                    s_shieldImage.drawTile(x, y, 25, 32);
                }

                else if (itemname == "Emberstone") {
                    s_shieldImage.drawTile(x, y, 26, 32);
                }
               

                else if (itemname == "Rage") {
                    s_shieldImage.drawTile(x, y, 27, 32);
                }
                else if (itemname == "Demon's Heart") {
                    s_shieldImage.drawTile(x, y, 28, 32);
                }

                else if (itemname == "Demon Shield") {
                    s_shieldImage.drawTile(x, y, 29, 32);
                }

                else if (itemname == "Demon Orb") {
                    s_shieldImage.drawTile(x, y, 30, 32);
                }


                else if (itemname == "Sovereign") {
                    s_shieldImage.drawTile(x, y, 31, 32);
                }

                else if (itemname == "Summoning Stone") {
                    s_shieldImage.drawTile(x, y, 32, 32);
                }

                else if (itemname == "Sage's Memento") {
                    s_shieldImage.drawTile(x, y, 33, 32);
                }

                //Sword
                if (itemname == 'Wooden Sword') {
                    s_weaponImage.drawTile(x, y, 0, 32);

                }
                else if (itemname == 'Stone Sword') {
                    s_weaponImage.drawTile(x, y, 1, 32);
                }
                else if (itemname == 'Practice Sword') {
                    s_weaponImage.drawTile(x, y, 2, 32);
                }
                else if (itemname == 'Stick') {
                    s_weaponImage.drawTile(x, y, 3, 32);
                }
                else if (itemname == 'Wooden Staff') {
                    s_weaponImage.drawTile(x, y, 4, 32);
                }
                else if (itemname == 'Copper Sword') {
                    s_weaponImage.drawTile(x, y, 5, 32);
                }
                else if (itemname == 'Bronze Sword') {
                    s_weaponImage.drawTile(x, y, 6, 32);
                }
                else if (itemname == 'Slasher') {
                    s_weaponImage.drawTile(x, y, 7, 32);
                }
                else if (itemname == 'Copper Stick') {
                    s_weaponImage.drawTile(x, y, 8, 32);
                }
                else if (itemname == 'Bronze Staff') {
                    s_weaponImage.drawTile(x, y, 9, 32);
                }
                else if (itemname == 'Iron Blade') {
                    s_weaponImage.drawTile(x, y, 10, 32);
                }
                else if (itemname == 'Iron Sword') {
                    s_weaponImage.drawTile(x, y, 11, 32);
                }
                else if (itemname == 'Iron Grand') {
                    s_weaponImage.drawTile(x, y, 12, 32);
                }
                else if (itemname == 'Iron Staff') {
                    s_weaponImage.drawTile(x, y, 13, 32);
                }
                else if (itemname == 'Imbued Stick') {
                    s_weaponImage.drawTile(x, y, 14, 32);
                }
                else if (itemname == 'Steel Sword') {
                    s_weaponImage.drawTile(x, y, 15, 32);
                }
                else if (itemname == 'Cleaver') {
                    s_weaponImage.drawTile(x, y, 16, 32);
                }
                else if (itemname == 'Iron Mallet') {
                    s_weaponImage.drawTile(x, y, 17, 32);
                }
                else if (itemname == 'Imbued Staff') {
                    s_weaponImage.drawTile(x, y, 18, 32);
                }
                else if (itemname == 'Grand Staff') {
                    s_weaponImage.drawTile(x, y, 19, 32);
                }
                else if (itemname == 'Mythril Sword') {
                    s_weaponImage.drawTile(x, y, 20, 32);
                }
                else if (itemname == 'Elven Blade') {
                    s_weaponImage.drawTile(x, y, 21, 32);
                }
                else if (itemname == 'Great Sword') {
                    s_weaponImage.drawTile(x, y, 22, 32);
                }
                else if (itemname == 'Mythril Staff') {
                    s_weaponImage.drawTile(x, y, 23, 32);
                }
                else if (itemname == 'Golden Oak') {
                    s_weaponImage.drawTile(x, y, 24, 32);
                }
                else if (itemname == 'Delisirrian Swd.') {
                    s_weaponImage.drawTile(x, y, 25, 32);
                }
                else if (itemname == 'Noble Blade') {
                    s_weaponImage.drawTile(x, y, 26, 32);
                }
                else if (itemname == 'Claymore') {
                    s_weaponImage.drawTile(x, y, 27, 32);
                }
                else if (itemname == "Executor's Axe") {
                    s_weaponImage.drawTile(x, y, 28, 32);
                }
                else if (itemname == 'Delisirrian Sta.') {
                    s_weaponImage.drawTile(x, y, 29, 32);
                }
                else if (itemname == "Duelist's Blade") {
                    s_weaponImage.drawTile(x, y, 30, 32);
                }
                else if (itemname == "Hero's Sword") {
                    s_weaponImage.drawTile(x, y, 31, 32);
                }
                else if (itemname == "Grand Mallet") {
                    s_weaponImage.drawTile(x, y, 32, 32);
                }
                else if (itemname == "Wizard's Staff") {
                    s_weaponImage.drawTile(x, y, 33, 32);
                }

                else if (itemname == "Piggy's Spike") {
                    s_weaponImage.drawTile(x, y, 34, 32);
                }
                else if (itemname == "Holy Sword") {
                    s_weaponImage.drawTile(x, y, 35, 32);
                }
                else if (itemname == "Blessed Staff") {
                    s_weaponImage.drawTile(x, y, 36, 32);
                }
                else if (itemname == "Exploding Axe") {
                    s_weaponImage.drawTile(x, y, 37, 32);
                }
                else if (itemname == "Devastator") {
                    s_weaponImage.drawTile(x, y, 38, 32);
                }

                else if (itemname == "Oaken Pole") {
                    s_weaponImage.drawTile(x, y, 39, 32);
                }
                else if (itemname == "Viper Slicer") {
                    s_weaponImage.drawTile(x, y, 40, 32);
                }
                else if (itemname == "Green Staff") {
                    s_weaponImage.drawTile(x, y, 41, 32);
                }

                else if (itemname == "Sand Sword") {
                    s_weaponImage.drawTile(x, y, 42, 32);
                }
                else if (itemname == "Desert Star") {
                    s_weaponImage.drawTile(x, y, 43, 32);
                }
                else if (itemname == "Blood Sword") {
                    s_weaponImage.drawTile(x, y, 44, 32);
                }

                else if (itemname == "Dark Staff") {
                    s_weaponImage.drawTile(x, y, 45, 32);
                }
                else if (itemname == "Flamebrand") {
                    s_weaponImage.drawTile(x, y, 46, 32);
                }
                else if (itemname == "Pyroforian") {
                    s_weaponImage.drawTile(x, y, 47, 32);
                }

                else if (itemname == "Axe of the Madman") {
                    s_weaponImage.drawTile(x, y, 48, 32);
                }
                else if (itemname == "Agony") {
                    s_weaponImage.drawTile(x, y, 49, 32);
                }
                else if (itemname == "Mad Fury") {
                    s_weaponImage.drawTile(x, y, 50, 32);
                }

                else if (itemname == "Cursed Mageslayer") {
                    s_weaponImage.drawTile(x, y, 51, 32);
                }
                else if (itemname == "Yggdrassil") {
                    s_weaponImage.drawTile(x, y, 52, 32);
                }
                else if (itemname == "Tetrarz") {
                    s_weaponImage.drawTile(x, y, 53, 32);
                }

                else if (itemname == "Frostfire Sword") {
                    s_weaponImage.drawTile(x, y, 54, 32);
                }
                else if (itemname == "The Void") {
                    s_weaponImage.drawTile(x, y, 55, 32);
                }
                else if (itemname == "Abyss") {
                    s_weaponImage.drawTile(x, y, 56, 32);
                }
                else if (itemname == "Black Staff") {
                    s_weaponImage.drawTile(x, y, 57, 32);
                }

               
            },
            drawAndFade: function (name,onlyIn,onlyOut) {
                
                // ig.game.spawnEntity(EntityLevelUp, ig.game.player.pos.x - ig.system.width / 2, ig.game.player.pos.y - ig.system.height / 8, { animSheet: new ig.AnimationSheet('media/' + name + '.png', 267, 160) });
                if (onlyIn) { ig.game.spawnEntity(EntityLevelUp, 0, 0, { animSheet: new ig.AnimationSheet('media/' + name + '.png', 267, 160), ofadeIn: true }); }
                else if (onlyOut) { ig.game.spawnEntity(EntityLevelUp, 0, 0, { animSheet: new ig.AnimationSheet('media/' + name + '.png', 267, 160), ofadeOut: true }); }
                else { ig.game.spawnEntity(EntityLevelUp, 0, 0, { animSheet: new ig.AnimationSheet('media/' + name + '.png', 267, 160) }); }
               
            },

            drawLoading: function(x,y,result){
                               
                            switch(result)
                                {
                                
                                case 'loading':
                             
                                ig.game.LoadingIMG.drawTile(x,y,ig.game.img_multi,64);
                                if(40 <= ig.game.LoadingIMG_calc){ig.game.img_multi = 2}
                                else if(20 <= ig.game.LoadingIMG_calc){ig.game.img_multi = 1}

                                else if(0 <= ig.game.LoadingIMG_calc){ig.game.img_multi = 0}
                                
                                
                               
                                    ig.game.LoadingIMG_calc++;
                                if(60 <ig.game.LoadingIMG_calc){
                                ig.game.LoadingIMG_calc = 0;
                                }
                                
                                
                                break;
                                case  true:
                                    if(ig.game.InvokedMenuTimer_ONCE == false)
                                    {
                                    ig.game.LoadingIMG.drawTile(x,y,3,64);
                                    ig.game.LoadingIMG_calc = 0;
                                    ig.game.InvokedMenuTimer.set(2);
                                    ig.game.InvokedMenuTimer_ONCE = true;
                                    }
                                else{
                                if(ig.game.InvokedMenuTimer.delta() < 0){ ig.game.LoadingIMG.drawTile(x,y,3,64);}
                                else if(0 < ig.game.InvokedMenuTimer.delta())
                                    {invokedResult = false;
                                    allowedToDisplayInfo = true;
                                    loadingSuccess = false;
                                
                                    ig.game.InvokedMenuTimer_ONCE = false;
                                }
                                
                                }
                                continueChecking = false;
                                break;
                                case  false:
                                ig.game.LoadingIMG.drawTile(x,y,4,64);
                                if(ig.game.sellMenuCounter == 0){continueChecking = true;}
                                ig.game.sellMenuCounter++;
                           
                                                                break;
                              
                                default:
                                break;
                                }
            },

            drawEnemyDesc: function (v, n) {
                var object = {health : 0, MP: 0,HP_REGEN: 0, EXP:'', ATK: 0, SPECIAL: 0};
                var killedAmount = 0;
                var spriteS = null;
               
                if (v) {
                    if (ig.game.player) {
                        var killEvents = ig.game.player.killEvents;
                        var dname = '?';
                        if (ig.game.BeastiaryType == 'Monster') {
                            spriteS = ig.game.Monsters;
                        }
                        else if (ig.game.BeastiaryType == 'Knight') {
                            spriteS = ig.game.Knights;
                        }
                        else if (ig.game.BeastiaryType == 'Wizard') {
                            spriteS = ig.game.Wizards;
                        }
                        else if (ig.game.BeastiaryType == 'Boss') {
                            spriteS = ig.game.Bosses;
                        }
                        switch (v) {
                            case 'greenZ':
                                //Temporary solution to just hardcode numbers

                                killedAmount = killEvents.green_zombieKills;
                                object.health = 15;
                                object.MP = 0;
                                object.HP_REGEN = 2;
                                object.EXP = '9';
                                object.ATK = 15;
                                object.SPECIAL = 'Only melee attack.';
                                object.DESCRIPTION = 'A weak mindless monster. Summoned by the Dark Wizard to do his bidding.';
                                dname = 'Zombie';
                                break;
                            case 'purpleZ':
                                object = ig.game.getEntitiesByType(EntityPurplegoblin);
                                dname = 'Fat Zombie';
                                killedAmount = killEvents.purple_zombieKills;
                                object.health = 100;
                                object.MP = 0;
                                object.HP_REGEN = 5;
                                object.EXP = '24';
                                object.ATK = 30;
                                object.SPECIAL = 'Only melee attack.';
                                object.DESCRIPTION = 'A slow but strong monster. Can regenerate missing limbs in a matter of seconds.';
                                break;
                            case 'speedpurpleZ':
                                object = ig.game.getEntitiesByType(EntityOrangegoblin);
                                dname = 'Speed Zombie';
                                killedAmount = killEvents.speedpurple_zombieKills;
                                object.health = 25;
                                object.MP = 0;
                                object.HP_REGEN = 1;
                                object.EXP = '13';
                                object.ATK = 12;
                                object.SPECIAL = 'Only melee attack.';
                                object.DESCRIPTION = 'A fast running monster. Summoned by the Dark Wizard to do his bidding. The zombie has sacrificed strength for agility.';
                                break;
                            case 'blueZ':
                                object = ig.game.getEntitiesByType(EntityBluegoblin);
                                dname = 'Thunder Zombie';
                                killedAmount = killEvents.blue_zombieKills;

                                object.health = 150;
                                object.MP = 0;
                                object.HP_REGEN = 1;
                                object.EXP = '47';
                                object.ATK = 50;
                                object.SPECIAL = 'Only melee attack.';
                                object.DESCRIPTION = 'A strong zombie. Summoned by the Dark Wizard to do his bidding. Imbued with arcane energies.';
                                break;
                            case 'winterY':
                                object = ig.game.getEntitiesByType(EntityWinterYeti);
                                dname = 'Yeti';
                                killedAmount = killEvents.winterYetiKills;
                                object.health = 220;
                                object.MP = 0;
                                object.HP_REGEN = 10;
                                object.EXP = '103';
                                object.ATK = 70;
                                object.SPECIAL = 'Only melee attack.';
                                object.DESCRIPTION = 'A beast found from the snowy lands. The Winter Witch seems to have tamed these beasts to his cause.';
                                break;
                            case 'flameZ':
                                object = ig.game.getEntitiesByType(EntityFlameJuggernaut);
                                dname = 'Flame Juggernaut';
                                killedAmount = killEvents.flame_zombieKills;
                                object.health = 380;
                                object.MP = 0;
                                object.HP_REGEN = 25;
                                object.EXP = '158';
                                object.ATK = 100;
                                object.SPECIAL = 'Only melee attack.';
                                object.DESCRIPTION = 'An aggressive entity clad in flames. Patrols inside elemental realm. Extremely strong regeneration.';
                                break;

                            case 'iceZ':
                                object = ig.game.getEntitiesByType(EntityIceJuggernaut);
                                dname = 'Ice Juggernaut';
                                killedAmount = killEvents.ice_zombieKills;
                                object.health = 500;
                                object.MP = 0;
                                object.HP_REGEN = 35;
                                object.EXP = '207';
                                object.ATK = 150;
                                object.SPECIAL = 'Only melee attack.';
                                object.DESCRIPTION = 'An aggressive entity clad in ice. Patrols inside elemental realm. Extremely strong regeneration.';
                                break;
                            case 'worm':
                                object = ig.game.getEntitiesByType(EntityWormSoldier);
                                dname = 'Worm';
                                killedAmount = killEvents.wormKills;
                                object.health = 300;
                                object.MP = 0;
                                object.HP_REGEN = 15;
                                object.EXP = '103';
                                object.ATK = 88;
                                object.SPECIAL = 'Only melee attack.';
                                object.DESCRIPTION = 'A huge worm that devours anything it that moves. Worms are the reason of the ever-spreading desert.';
                                break;
                            case 'redW':
                                object = ig.game.getEntitiesByType(EntityRedMage);
                                dname = 'Red Mage';
                                killedAmount = killEvents.red_wizardKills;
                                object.health = 45;
                                object.MP = 100;
                                object.HP_REGEN = 0;
                                object.EXP = '15';
                                object.ATK = 30;
                                object.SPECIAL = 'Fire Magic.';
                                object.DESCRIPTION = 'A wizard training under the Dark Wizard. The wizards seems to have mastered fire magic.';
                                break;
                            case 'blueW':
                                object = ig.game.getEntitiesByType(EntityBlueMage);
                                dname = 'Blue Mage';
                                killedAmount = killEvents.blue_wizardKills;
                                object.health = 50;
                                object.MP = 150;
                                object.HP_REGEN = 0;
                                object.EXP = '15';
                                object.ATK = 20;
                                object.SPECIAL = 'Ice Magic.';
                                object.DESCRIPTION = 'A wizard training under the Dark Wizard. The wizards seems to have mastered ice magic.';
                                break;
                            case 'purpleW':
                                object = ig.game.getEntitiesByType(EntityMysticMage);
                                dname = 'Mystic Mage'
                                killedAmount = killEvents.purple_wizardKills;
                                object.health = 60;
                                object.MP = 200;
                                object.HP_REGEN = 0;
                                object.EXP = '24';
                                object.ATK = 35;
                                object.SPECIAL = 'Arcane Magic.';
                                object.DESCRIPTION = 'A wizard training under the Dark Wizard. The wizards seems to have mastered arcane magic.';
                                break;
                            case 'darkW':
                                object = ig.game.getEntitiesByType(EntityDarkMage);
                                dname = 'Dark Mage';
                                killedAmount = killEvents.dark_wizardKills;
                                object.health = 150;
                                object.MP = 400;
                                object.HP_REGEN = 0;
                                object.EXP = '123';
                                object.ATK = 150;
                                object.SPECIAL = 'Dark Magic.';
                                object.DESCRIPTION = 'A wizard who has mastered the dark arts. The devastating dark projectiles can kill the unprepared with one hit.';
                                break;
                            case 'winterM':
                                object = ig.game.getEntitiesByType(EntityWinterMage);
                                dname = 'Yeti Mage';
                                killedAmount = killEvents.winterMageKills;
                                object.health = 300;
                                object.MP = 100;
                                object.HP_REGEN = 0;
                                object.EXP = '100';
                                object.ATK = 90;
                                object.SPECIAL = 'Extreme Magic.';
                                object.DESCRIPTION = 'An intelligent Yeti who combines the brutal strength of Yeti with magical prowess.';
                                break;
                            case 'thunderW':
                                object = ig.game.getEntitiesByType(EntityThunderMage);
                                dname = 'Thunder Wizard';
                                killedAmount = killEvents.thunder_wizardKills;
                                object.health = 300;
                                object.MP = 500;
                                object.HP_REGEN = 0;
                                object.EXP = '153';
                                object.ATK = 125;
                                object.SPECIAL = 'Extremely fast.';
                                object.DESCRIPTION = 'A Grand Wizard who has mastered the power of the thunder, A power only available to selected few.';
                                break;

                            case 'bombW':
                                object = ig.game.getEntitiesByType(EntityBombThrowerWeak);
                                dname = 'Lighter';
                                killedAmount = killEvents.bombThrowerWeakKills;
                                object.health = 100;
                                object.MP = 0;
                                object.HP_REGEN = 0;
                                object.EXP = '24';
                                object.ATK = 50;
                                object.SPECIAL = 'Throws bombs.';
                                object.DESCRIPTION = 'A soldier that throws damaging bombs.';
                                break;
                            case 'bomb':
                                object = ig.game.getEntitiesByType(EntityBombThrower);
                                dname = 'Bomber';
                                killedAmount = killEvents.bombThrowerKills;
                                object.health = 200;
                                object.MP = 0;
                                object.HP_REGEN = 0;
                                object.EXP = '74';
                                object.ATK = 100;
                                object.SPECIAL = 'Throws bombs.';
                                object.DESCRIPTION = 'A soldier that throws deadly bombs.';
                                break;
                            case 'bombS':
                                object = ig.game.getEntitiesByType(EntityBombThrowerStrong);
                                dname = 'Nuker';
                                killedAmount = killEvents.bombThrowerStrongKills;
                                object.health = 400;
                                object.MP = 0;
                                object.HP_REGEN = 0;
                                object.EXP = '123';
                                object.ATK = 200;
                                object.SPECIAL = 'Throws bombs.';
                                object.DESCRIPTION = 'A soldier that throws devastating bombs.';
                                break;
                            case 'necromancerW':
                                object = ig.game.getEntitiesByType(EntityNecromancerWeak);
                                dname = 'Trainee';
                                killedAmount = killEvents.necromancerWeakKills;
                                object.health = 35;
                                object.MP = 100;
                                object.HP_REGEN = 0;
                                object.EXP = '24';
                                object.ATK = 0;
                                object.SPECIAL = 'Summons enemies.';
                                object.DESCRIPTION = 'A necromancy trainee, capable of summoning weak monsters.';
                                break;
                            case 'necromancer':
                                object = ig.game.getEntitiesByType(EntityNecromancer);
                                dname = 'Adept';
                                killedAmount = killEvents.necromancerKills;
                                object.health = 100;
                                object.MP = 250;
                                object.HP_REGEN = 0;
                                object.EXP = '123';
                                object.ATK = 0;
                                object.SPECIAL = 'Summons enemies.';
                                object.DESCRIPTION = 'A skilled user of necromancy, capable of summoning monsters.';
                                break;
                            case 'necromancerS':
                                object = ig.game.getEntitiesByType(EntityNecromancerStrong);
                                dname = 'Necromancer';
                                killedAmount = killEvents.necromancerStrongKills;
                                object.health = 200;
                                object.MP = 500;
                                object.HP_REGEN = 0;
                                object.EXP = '208';
                                object.ATK = 0;
                                object.SPECIAL = 'Summons enemies.';
                                object.DESCRIPTION = 'A master of necromancy, capable of summoning strong monsters.';
                                break;
                            case 'rusherGreen':
                                object = ig.game.getEntitiesByType(EntityRusherGreen);
                                dname = 'Runner';
                                killedAmount = killEvents.rusherGreenKills;
                                object.health = 75;
                                object.MP = 0;
                                object.HP_REGEN = 0;
                                object.EXP = '24';
                                object.ATK = 50;
                                object.SPECIAL = 'Rushes towards.';
                                object.DESCRIPTION = "A zombie with strong legs. Chases foes down easily. Deadly, even thought it's wielding a dull spear.";
                                break;
                            case 'rusherBlue':
                                object = ig.game.getEntitiesByType(EntityRusherBlue);
                                dname = 'Rusher';
                                killedAmount = killEvents.rusherBlueKills;
                                object.health = 200;
                                object.MP = 0;
                                object.HP_REGEN = 0;
                                object.EXP = '123';
                                object.ATK = 110;
                                object.SPECIAL = 'Rushes towards.';
                                object.DESCRIPTION = 'A zombie with strong legs and a sharp spear. Chases foes down easily.';
                                break;
                            case 'rusherOrange':
                                object = ig.game.getEntitiesByType(EntityRusherOrange);
                                dname = 'Blazer';
                                killedAmount = killEvents.rusherOrangeKills;
                                object.health = 330;
                                object.MP = 0;
                                object.HP_REGEN = 0;
                                object.EXP = '208';
                                object.ATK = 220;
                                object.SPECIAL = 'Rushes towards.';
                                object.DESCRIPTION = 'A zombie with strong legs and very sharp spear. Chases foes down easily.';
                                break;
                            case 'heavyK':
                                object = ig.game.getEntitiesByType(EntityHeavyknight);
                                killedAmount = killEvents.heavy_knightKills;
                                object.health = 80;
                                object.MP = 0;
                                object.HP_REGEN = 0;
                                object.EXP = '15';
                                object.ATK = 40;
                                object.SPECIAL = 'Strong melee.';
                                object.DESCRIPTION = 'A sellsword hired by the Dark Wizard. Carries around a big sword and hits hard with it.';
                                dname = 'Heavy Knight';
                                break;
                            case 'zombieK':
                                object = ig.game.getEntitiesByType(EntityZombieknight);
                                dname = 'Zombie Knight';
                                killedAmount = killEvents.zombie_knightKills;
                                object.health = 200;
                                object.MP = 0;
                                object.HP_REGEN = 0;
                                object.EXP = '24';
                                object.ATK = 32;
                                object.SPECIAL = 'Strong melee.';
                                object.DESCRIPTION = 'A sellsword who refused to die. Carries around a big rusty sword.';
                                break;
                            case 'dreadK':
                                object = ig.game.getEntitiesByType(EntityDreadknight);
                                dname = 'Demon Knight';
                                killedAmount = killEvents.dread_knightKills;
                                object.health = 170;
                                object.MP = 0;
                                object.HP_REGEN = 0;
                                object.EXP = '53';
                                object.ATK = 80;
                                object.SPECIAL = 'Strong and fast.';
                                object.DESCRIPTION = 'A knight who uses demonic strength to hit lightning-fast.';
                                break;
                            case 'darkK':
                                object = ig.game.getEntitiesByType(EntityDarkKnight);
                                dname = 'Dark Knight';
                                killedAmount = killEvents.dark_knightKills;
                                object.health = 400;
                                object.MP = 0;
                                object.HP_REGEN = 0;
                                object.EXP = '123';
                                object.ATK = 260;
                                object.SPECIAL = 'Extremely Strong.';
                                object.DESCRIPTION = 'A knight who uses dark arts to hit lightning-fast.';
                                break;
                            case 'iceK':
                                object = ig.game.getEntitiesByType(EntityIceKnight);
                                dname = 'Frost Knight';
                                killedAmount = killEvents.ice_knightKills;
                                object.health = 700;
                                object.MP = 0;
                                object.HP_REGEN = 0;
                                object.EXP = '208';
                                object.ATK = 160;
                                object.SPECIAL = 'Extremely Strong.';
                                object.DESCRIPTION = 'A knight in heavy armor. A loyal servant of the Elemental Knight.';
                                break;

                            case 'giantZ':
                                object = ig.game.getEntitiesByType(EntityGiantZombie);
                                dname = 'Aeg the Giant';
                                killedAmount = killEvents.giantZombieKills;
                                object.health = 280;
                                object.MP = 0;
                                object.HP_REGEN = 0;
                                object.EXP = '63';
                                object.ATK = 0;
                                object.SPECIAL = 'Cannot attack.';
                                object.DESCRIPTION = "A Huge zombie that was build from other zombies' corpses";
                                break;
                            case 'mageK':
                                object = ig.game.getEntitiesByType(EntityMageknight);
                                dname = 'The Mage Knight';
                                killedAmount = killEvents.mageKnightKills;
                                object.health = 1500;
                                object.MP = 0;
                                object.HP_REGEN = 0;
                                object.EXP = '103';
                                object.ATK = 0;
                                object.SPECIAL = 'High damage.';
                                object.DESCRIPTION = "The orginal owner of the Mageslayer. His courage was crushed by the Dark Wizard and he is now a mindless minion.";
                                break;
                            case 'koz':
                                object = ig.game.getEntitiesByType(EntityKoz);
                                dname = 'The Dark Wizard';
                                killedAmount = killEvents.kozKills;
                                object.health = 5000;
                                object.MP = 9999;
                                object.HP_REGEN = 0;
                                object.EXP = '173';
                                object.ATK = 0;
                                object.SPECIAL = 'Extreme Magic.';
                                object.DESCRIPTION = "The Dark Wizard. Responsible of summoning The Winter Witch. A True master of the magic.";
                                break;
                            case 'winterW':
                                object = ig.game.getEntitiesByType(EntityWinterWitch);
                                dname = 'The Winter Witch';
                                killedAmount = killEvents.winterWitchKills;
                                object.health = 8000;
                                object.MP = 1000;
                                object.HP_REGEN = 0;
                                object.EXP = '273';
                                object.ATK = 0;
                                object.SPECIAL = 'Extreme Magic.';
                                object.DESCRIPTION = "The Winter Witch holds absolute power in the frozen wastelands. You can feel the warmth fleeing your body...";
                                break;
                            case 'fallenK':
                                object = ig.game.getEntitiesByType(EntityFallenKnight);
                                dname = 'Fallen Warrior';
                                killedAmount = killEvents.fallenKnightKills;
                                object.health = 12000;
                                object.MP = 1200;
                                object.HP_REGEN = 0;
                                object.EXP = '303';
                                object.ATK = 0;
                                object.SPECIAL = 'Extreme damage.';
                                object.DESCRIPTION = "A Forgotten hero, who was corrupted by dark energies. The current leader of the dark knights.";
                                break;
                            case 'elementalK':
                                object = ig.game.getEntitiesByType(EntityElementalKnight);
                                dname = 'Elemental Overlord';
                                killedAmount = killEvents.elementalKnightKills;
                                object.health = 15000;
                                object.MP = 2000;
                                object.HP_REGEN = 0;
                                object.EXP = '403';
                                object.ATK = 0;
                                object.SPECIAL = 'Absolute Magic.';
                                object.DESCRIPTION = "Governs the elemental energies and bends them to his will. The unprepared will perish.";
                                break;
                            case 'sandW':
                                object = ig.game.getEntitiesByType(EntityBigWorm);
                                dname = 'Sand Worm';
                                killedAmount = killEvents.sandWormKills;
                                object.health = 20000;
                                object.MP = 2000;
                                object.HP_REGEN = 0;
                                object.EXP = '603';
                                object.ATK = 0;
                                object.SPECIAL = 'Sandstorm.';
                                object.DESCRIPTION = "King of the deserts. Countless people have been lost to this monstrosity.";
                                break;
                            case 'skullW':
                                object = ig.game.getEntitiesByType(EntityGrandmancer);
                                dname = 'The Grandmancer';
                                killedAmount = killEvents.grandMancerKills;
                                object.health = 15000;
                                object.MP = 2000;
                                object.HP_REGEN = 0;
                                object.EXP = '803';
                                object.ATK = 0;
                                object.SPECIAL = 'Dark Magic.';
                                object.DESCRIPTION = "The reincarnated Dark Wizard. Now wields even darker magic.";
                                break;
                            case 'voidTravel':
                                object = ig.game.getEntitiesByType(EntityVoidKnight);
                                dname = 'Void Knight';
                                killedAmount = killEvents.voidKnightKills;
                                object.health = 18000;
                                object.MP = 2000;
                                object.HP_REGEN = 0;
                                object.EXP = '1003';
                                object.ATK = 0;
                                object.SPECIAL = 'Space Magic.';
                                object.DESCRIPTION = "Controls the dark matter. Summons galactic energies to aid him in the battle.";
                                break;
                            default:
                                break;

                        }

                        if (v == 'giantZ') { ig.game.GiantZombie.drawTile(110, -44, 0, 160); }
                        else if (v == 'sandW') { ig.game.GiantZombie.drawTile(110, -44, 1, 160); }
                        else { spriteS.drawTile(170, 48, n, 32); }

                        if (object) {
                            ig.game.BeastiaryStats.NAME = dname;

                            ig.game.BeastiaryStats.HP = (object.health) ? ig.game.returnCorrectHealth(object) : 0;
                            ig.game.BeastiaryStats.MP = (object.MP) ? object.MP : 0;
                            ig.game.BeastiaryStats.HP_REGEN = (object.HP_REGEN) ? object.HP_REGEN : 0;
                            ig.game.BeastiaryStats.EXP = (object.EXP) ? object.EXP : '0';
                            ig.game.BeastiaryStats.ATK = (object.ATK) ? object.ATK : 0;
                            ig.game.BeastiaryStats.SPECIAL = (object.SPECIAL) ? object.SPECIAL : "EMPTY";
                            ig.game.BeastiaryStats.DESCRIPTION = (object.DESCRIPTION) ? object.DESCRIPTION : "EMPTY";
                        }
                        ig.game.font.draw(ig.game.BeastiaryStats.NAME, 170, 10, ig.Font.ALIGN.CENTER);
                        ig.game.font.draw(ig.game.BeastiaryStats.HP, 88, 6);
                        ig.game.font.draw(ig.game.BeastiaryStats.MP, 88, 16);
                        ig.game.font.draw(ig.game.BeastiaryStats.HP_REGEN, 88, 26);
                        ig.game.font_YELLOW.draw(ig.game.BeastiaryStats.EXP, 88, 35);
                        ig.game.font.draw(ig.game.BeastiaryStats.ATK, 88, 44);
                        ig.game.font.draw(killedAmount, 88, 53);
                        ig.game.font.draw(ig.game.parseRetText(ig.game.BeastiaryStats.SPECIAL, 'beastiaryS'), 45, 62);
                        ig.game.font.draw(ig.game.parseRetText(ig.game.BeastiaryStats.DESCRIPTION, 'beastiaryD'), 45, 86);
                    }
                } else {
                    ig.game.QuestionM.draw(170, 48);
                    ig.game.font.draw('????', 170, 10, ig.Font.ALIGN.CENTER);
                    ig.game.font.draw('?', 90, 6);
                    ig.game.font.draw('?', 90, 16);
                    ig.game.font.draw('?', 90, 26);
                    ig.game.font_YELLOW.draw('?', 90, 35);
                    ig.game.font.draw('?', 90, 44);
                    ig.game.font.draw('?', 90, 53);
                    ig.game.font.draw('????', 45, 62);
                    ig.game.font.draw('????', 45, 86);
                }
                ig.game.font_YELLOW_STYLED.draw((ig.game.BeastiaryInput + 1), 107, 136, ig.Font.ALIGN.RIGHT);

                ig.game.font_YELLOW_STYLED.draw((ig.game.BeastiaryAvail + 1), 120, 136, ig.Font.ALIGN.LEFT);
                
            },

            drawEnemyStats: function () {

                if (ig.game.BeastiaryType == 'Monster') {
                    switch (ig.game.BeastiaryInput) {
                        case 0:
                            (ig.game.loopAndCheck('GreenZombie')) ? ig.game.drawEnemyDesc('greenZ', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 3:
                            (ig.game.loopAndCheck('BlueZombie')) ? ig.game.drawEnemyDesc('blueZ', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 1:
                            (ig.game.loopAndCheck('PurpleZombie')) ? ig.game.drawEnemyDesc('purpleZ', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 2:
                            (ig.game.loopAndCheck('SpeedPurpleZombie')) ? ig.game.drawEnemyDesc('speedpurpleZ', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);

                            break;
                        case 4:
                            (ig.game.loopAndCheck('WinterYeti')) ? ig.game.drawEnemyDesc('winterY', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 5:
                            (ig.game.loopAndCheck('FlameZombie')) ? ig.game.drawEnemyDesc('flameZ', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 6:
                            (ig.game.loopAndCheck('IceZombie')) ? ig.game.drawEnemyDesc('iceZ', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 7:
                            (ig.game.loopAndCheck('RusherGreen')) ? ig.game.drawEnemyDesc('rusherGreen', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 8:
                            (ig.game.loopAndCheck('RusherBlue')) ? ig.game.drawEnemyDesc('rusherBlue', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 9:
                            (ig.game.loopAndCheck('RusherOrange')) ? ig.game.drawEnemyDesc('rusherOrange', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 10:
                            (ig.game.loopAndCheck('Worm')) ? ig.game.drawEnemyDesc('worm', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                    }
                }
                else if (ig.game.BeastiaryType == 'Knight') {
                    switch (ig.game.BeastiaryInput) {

                        case 0:
                            (ig.game.loopAndCheck('HeavyKnight')) ? ig.game.drawEnemyDesc('heavyK', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 1:
                            (ig.game.loopAndCheck('ZombieKnight')) ? ig.game.drawEnemyDesc('zombieK', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 2:
                            (ig.game.loopAndCheck('DreadKnight')) ? ig.game.drawEnemyDesc('dreadK', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 3:
                            (ig.game.loopAndCheck('DarkKnight')) ? ig.game.drawEnemyDesc('darkK', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 4:
                            (ig.game.loopAndCheck('IceKnight')) ? ig.game.drawEnemyDesc('iceK', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 5:
                            (ig.game.loopAndCheck('BombThrowerWeak')) ? ig.game.drawEnemyDesc('bombW', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 6:
                            (ig.game.loopAndCheck('BombThrower')) ? ig.game.drawEnemyDesc('bomb', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 7:
                            (ig.game.loopAndCheck('BombThrowerStrong')) ? ig.game.drawEnemyDesc('bombS', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                    }
                }
                else if (ig.game.BeastiaryType == 'Wizard') {
                    switch (ig.game.BeastiaryInput) {
                        case 0:
                            (ig.game.loopAndCheck('RedWizard')) ? ig.game.drawEnemyDesc('redW', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 1:
                            (ig.game.loopAndCheck('BlueWizard')) ? ig.game.drawEnemyDesc('blueW', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 2:
                            (ig.game.loopAndCheck('PurpleWizard')) ? ig.game.drawEnemyDesc('purpleW', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 3:
                            (ig.game.loopAndCheck('DarkWizard')) ? ig.game.drawEnemyDesc('darkW', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 4:
                            (ig.game.loopAndCheck('WinterMage')) ? ig.game.drawEnemyDesc('winterM', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 5:
                            (ig.game.loopAndCheck('ThunderWizard')) ? ig.game.drawEnemyDesc('thunderW', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 6:
                            (ig.game.loopAndCheck('NecromancerWeak')) ? ig.game.drawEnemyDesc('necromancerW', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 7:
                            (ig.game.loopAndCheck('Necromancer')) ? ig.game.drawEnemyDesc('necromancer', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 8:
                            (ig.game.loopAndCheck('NecromancerStrong')) ? ig.game.drawEnemyDesc('necromancerS', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                    }
                }
                else if (ig.game.BeastiaryType == 'Boss') {
                    switch (ig.game.BeastiaryInput) {
                        case 0:
                            (ig.game.loopAndCheck('GiantZombie')) ? ig.game.drawEnemyDesc('giantZ', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);

                            break;
                        case 1:
                            (ig.game.loopAndCheck('MageKnight')) ? ig.game.drawEnemyDesc('mageK', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 2:
                            (ig.game.loopAndCheck('Koz')) ? ig.game.drawEnemyDesc('koz', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;

                        case 3:
                            (ig.game.loopAndCheck('WinterWitch')) ? ig.game.drawEnemyDesc('winterW', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 4:
                            (ig.game.loopAndCheck('FallenKnight')) ? ig.game.drawEnemyDesc('fallenK', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 5:
                            (ig.game.loopAndCheck('ElementalKnight')) ? ig.game.drawEnemyDesc('elementalK', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 6:
                            (ig.game.loopAndCheck('SandWorm')) ? ig.game.drawEnemyDesc('sandW', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 7:
                            (ig.game.loopAndCheck('Grandmancer')) ? ig.game.drawEnemyDesc('skullW', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;
                        case 8:
                            (ig.game.loopAndCheck('VoidKnight')) ? ig.game.drawEnemyDesc('voidTravel', ig.game.BeastiaryInput) : ig.game.drawEnemyDesc(null, null);
                            break;

                        default:
                            break;
                    }
                }
             },
             skillSheetTileFaster: 0,
             skillSheetTile: 0,
             skillSheetGoingBack: false,
             skillSheetGoingBackFaster: false,
             skillSheetTimer: null,
             skillSheetFastTimer: null,
            drawskillsheet: function (x, y, tile, tileSize,type) {
                 var delay = 0.1;
                 var delayFaster = 0.05;

                 //tileSize constant for now

                 tileSize = 26;
                 if (type) ig.game.skillsheet.drawTile(x, y, tile + ig.game.skillSheetTile, tileSize);
                 else { ig.game.skillsheet.drawTile(x, y, tile + ig.game.skillSheetTileFaster, tileSize); }
                 
                 if (!ig.game.skillSheetTimer) {
                     ig.game.skillSheetTimer = new ig.Timer();
                     ig.game.skillSheetTimer.set(delay);

                 }
                 else if (ig.game.skillSheetTimer.delta() > 0) {

                     ig.game.skillSheetTimer.set(delay);
                     if (ig.game.skillSheetGoingBack === true) {
                         ig.game.skillSheetTile--;
                     }
                     else {
                         ig.game.skillSheetTile++;
                     }
                     if (ig.game.skillSheetTile > 2) {
                         ig.game.skillSheetGoingBack = true;
                         ig.game.skillSheetTile = 2;
                     }
                     else if (ig.game.skillSheetTile < 0) {
                         ig.game.skillSheetGoingBack = false;
                         ig.game.skillSheetTile = 0;
                     }

                 }

                 if (!ig.game.skillSheetFastTimer) {
                     ig.game.skillSheetFastTimer = new ig.Timer();
                     ig.game.skillSheetFastTimer.set(delayFaster);

                 }
                 else if (ig.game.skillSheetFastTimer.delta() > 0) {

                     ig.game.skillSheetFastTimer.set(delayFaster);
                     if (ig.game.skillSheetGoingBackFaster === true) {
                         ig.game.skillSheetTileFaster--;
                     }
                     else {
                         ig.game.skillSheetTileFaster++;
                     }
                     if (ig.game.skillSheetTileFaster > 2) {
                         ig.game.skillSheetGoingBackFaster = true;
                         ig.game.skillSheetTileFaster = 2;
                     }
                     else if (ig.game.skillSheetTileFaster < 0) {
                         ig.game.skillSheetGoingBackFaster = false;
                         ig.game.skillSheetTileFaster = 0;
                     }

                 }
                
            },
            drawSkillToGrid: function () {
                var game = ig.game;
                if (ig.game.player.CLASS === "BLADE") {game.skillsheet.drawTile(267 - 124, 66, 0, 26);}
                else{
                    game.skillsheetG.drawTile(267 - 124, 66, 0, 26);
                }
                if (ig.game.player.CLASS === "SPELL") { game.skillsheet.drawTile(267 - 124, 98,  6, 26); }
                else {
                    game.skillsheetG.drawTile(267 - 124, 98, 6, 26);
                }
                if (ig.game.player.BLADE_SHOCKPULSE) { game.skillsheet.drawTile(267 - 92, 66,  3, 26); }
                else {
                    game.skillsheetG.drawTile(267 - 92, 66, 3, 26);
                }
                if (ig.game.player.SPELL_FIREBLAST) { game.skillsheet.drawTile(267 - 92, 98, 9, 26); }
                else {
                    game.skillsheetG.drawTile(267 - 92, 98, 9, 26);
                }
                if (ig.game.player.CLASS === "LIFE") { game.skillsheet.drawTile(267 - 60, 66, 18,26); }
                else {
                    game.skillsheetG.drawTile(267 - 60, 66, 18, 26);
                }
                if (ig.game.player.SPELL_FROSTFIRE) { game.skillsheet.drawTile(267 - 60, 98,  12,26); }
                else {
                    game.skillsheetG.drawTile(267 - 60, 98, 12, 26);
                }
                if (ig.game.player.LIFE_RADIANCE) { game.skillsheet.drawTile(267 - 32, 66,  21, 26); }
                else {
                    game.skillsheetG.drawTile(267 - 32, 66, 21, 26);
                }
               
                if (ig.game.player.SPELL_ARCANEBALL) { game.skillsheet.drawTile(267 - 32, 98,  15, 26); }
                else {
                    game.skillsheetG.drawTile(267 - 32, 98,  15, 26);
                }

                if (ig.game.player.DEMON_DARKWAVE) { game.skillsheet.drawTile(267 - 60, 34, 33, 26); }
                else {
                    game.skillsheetG.drawTile(267 - 60, 34, 33, 26);
                }
                if (ig.game.player.DEMON_DREADWAVE) { game.skillsheet.drawTile(267 -32, 34, 36, 26); }
                else {
                    game.skillsheetG.drawTile(267 - 32, 34, 36, 26);
                }

                if (ig.game.player.CLASS === "DEMON") { game.skillsheet.drawTile(267 - 92, 34, 39, 26); }
                else {
                    game.skillsheetG.drawTile(267 - 92, 34, 39, 26);
                }
                game.skillsheet.drawTile(267 - 124, 34, 24, 26); 
               
            
            },
            drawSkills: function (skill, number,isHUD) {
                var game = ig.game;
                var s_width = 267;
                var s_height = 160;
                var x_spot = s_width * 0.77;
         
                if (ig.game.buttonScheme == 0) { y_spot = s_height * 0.82; }
                if (ig.game.buttonScheme == 1) { y_spot = s_height * 0.72; }
                if (ig.game.buttonScheme == 2) { y_spot = s_height * 0.62; }
                if (ig.game.buttonScheme == 3) {
                    if (ig.game.currentDevice == 2) { y_spot = s_height * 0.62; }
                    else { y_spot = s_height * 0.58; }

                }
                if (ig.game.buttonScheme == 4) { y_spot = s_height * 0.62; x_spot = s_width * 0.65; }
                if (ig.game.buttonScheme == 5) { y_spot = s_height * 0.72; x_spot = s_width * 0.65; }
                if (ig.game.buttonScheme == 6) { y_spot = s_height * 0.82; x_spot = s_width * 0.65; }

                if (isHUD) {
                    
                    var manaCost = (number == 0) ? game.player.currentAction1Manacost : game.player.currentAction2Manacost;

                
                  
                    if(game.calcManaCost(skill, manaCost,"getState")){
                        if (skill == 'EntityPlayerSlash') { game.drawskillsheet(x_spot + (number * (0.2 * s_height)), y_spot, 0, 26, 'slow'); }
                        else if (skill == 'EntityShockpulse') { game.drawskillsheet(x_spot + (number * (0.2 * s_height)), y_spot, 3, 26, 'slow'); }
                        else if (skill == 'EntityFrostball') { game.drawskillsheet(x_spot + (number * (0.2 * s_height)), y_spot, 6, 26); }
                        else if (skill == 'EntityFireBlast') { game.drawskillsheet(x_spot + (number * (0.2 * s_height)), y_spot, 9, 26); }

                        else if (skill == 'EntityFrostFire') { game.drawskillsheet(x_spot + (number * (0.2 * s_height)), y_spot, 12, 26); }
                        else if (skill == 'EntityArcaneBall') { game.drawskillsheet(x_spot + (number * (0.2 * s_height)), y_spot, 15, 26); }
                        else if (skill == 'EntityLifeSlash') { game.drawskillsheet(x_spot + (number * (0.2 * s_height)), y_spot, 18, 26, 'slow'); }
                        else if (skill == 'EntityRadiance') { game.drawskillsheet(x_spot + (number * (0.2 * s_height)), y_spot, 21, 26); }
                        else if (skill == 'EntityWeakSlash') { game.drawskillsheet(x_spot + (number * (0.2 * s_height)), y_spot, 24, 26, 'slow'); }

                        else if (skill == 'EntityDemonSlash') { game.drawskillsheet(x_spot + (number * (0.2 * s_height)), y_spot, 39, 26, 'slow'); }
                        else if (skill == 'EntityDarkWave') { game.drawskillsheet(x_spot + (number * (0.2 * s_height)), y_spot, 33, 26); }
                        else if (skill == 'EntityDreadWave') { game.drawskillsheet(x_spot + (number * (0.2 * s_height)), y_spot, 36, 26); }
                    }
                    else {
                        if (skill == 'EntityPlayerSlash') { game.skillsheetG.drawTile(x_spot + (number * (0.2 * s_height)), y_spot, 0, 26); }
                        else if (skill == 'EntityShockpulse') { game.skillsheetG.drawTile(x_spot + (number * (0.2 * s_height)), y_spot, 3, 26); }
                        else if (skill == 'EntityFrostball') { game.skillsheetG.drawTile(x_spot + (number * (0.2 * s_height)), y_spot, 6, 26); }
                        else if (skill == 'EntityFireBlast') { game.skillsheetG.drawTile(x_spot + (number * (0.2 * s_height)), y_spot, 9, 26); }

                        else if (skill == 'EntityFrostFire') { game.skillsheetG.drawTile(x_spot + (number * (0.2 * s_height)), y_spot, 12, 26); }
                        else if (skill == 'EntityArcaneBall') { game.skillsheetG.drawTile(x_spot + (number * (0.2 * s_height)), y_spot, 15, 26); }
                        else if (skill == 'EntityLifeSlash') { game.skillsheetG.drawTile(x_spot + (number * (0.2 * s_height)), y_spot, 18, 26); }
                        else if (skill == 'EntityRadiance') { game.skillsheetG.drawTile(x_spot + (number * (0.2 * s_height)), y_spot, 21, 26); }
                        else if (skill == 'EntityWeakSlash') { game.skillsheetG.drawTile(x_spot + (number * (0.2 * s_height)), y_spot, 24, 26); }

                        else if (skill == 'EntityDemonSlash') { game.skillsheetG.drawTile(x_spot + (number * (0.2 * s_height)), y_spot, 40, 26); }
                        else if (skill == 'EntityDarkWave') { game.skillsheetG.drawTile(x_spot + (number * (0.2 * s_height)), y_spot, 33, 26); }
                        else if (skill == 'EntityDreadWave') { game.skillsheetG.drawTile(x_spot + (number * (0.2 * s_height)), y_spot, 37, 26); }
                    }
                    
                }
                else {
                    if (skill == 'EntityPlayerSlash') { game.drawskillsheet(x_spot + (number * (0.2 * s_height)), y_spot, 0, 26, 'slow'); }
                    else if (skill == 'EntityShockpulse') { game.drawskillsheet(x_spot + (number * (0.2 * s_height)), y_spot, 3, 26, 'slow'); }
                    else if (skill == 'EntityFrostball') { game.drawskillsheet(x_spot + (number * (0.2 * s_height)), y_spot, 6, 26); }
                    else if (skill == 'EntityFireBlast') { game.drawskillsheet(x_spot + (number * (0.2 * s_height)), y_spot, 9, 26); }

                    else if (skill == 'EntityFrostFire') { game.drawskillsheet(x_spot + (number * (0.2 * s_height)), y_spot, 12, 26); }
                    else if (skill == 'EntityArcaneBall') { game.drawskillsheet(x_spot + (number * (0.2 * s_height)), y_spot, 15, 26); }
                    else if (skill == 'EntityLifeSlash') { game.drawskillsheet(x_spot + (number * (0.2 * s_height)), y_spot, 18, 26, 'slow'); }
                    else if (skill == 'EntityRadiance') { game.drawskillsheet(x_spot + (number * (0.2 * s_height)), y_spot, 21, 26); }
                    else if (skill == 'EntityWeakSlash') { game.drawskillsheet(x_spot + (number * (0.2 * s_height)), y_spot, 24, 26, 'slow'); }

                    else if (skill == 'EntityDemonSlash') { game.drawskillsheet(x_spot + (number * (0.2 * s_height)), y_spot, 39, 26, 'slow'); }
                    else if (skill == 'EntityDarkWave') { game.drawskillsheet(x_spot + (number * (0.2 * s_height)), y_spot, 33, 26); }
                    else if (skill == 'EntityDreadWave') { game.drawskillsheet(x_spot + (number * (0.2 * s_height)), y_spot, 36, 26); }
                }


               
            },

             })
  })