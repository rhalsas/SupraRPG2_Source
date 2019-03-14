
var STRTOATKMOD = 0.5;
var STRTORESMOD = 0.05;

var INTTOMATKMOD = 0.5;
var INTTOMCRITMOD = 0.15;
var INTTOMRESMOD = 0.03;


var AGITOCRITMOD = 0.25
ig.module(
    'game.game_helpers'
)
.requires(


    'impact.game',
    'game.entities.player',
    'game.entities.randomTreasure'
)
    .defines(function () {

        ig.Game.inject({


            WeaponSpecialArray: new Array(),
            ShieldSpecialArray: new Array(),
            ArmorSpecialArray: new Array(),
            talentConfirm: false,
            skipInput: false,
            classSelection: false,
            classSelected: '',
            classSpecialInfo: false,
            bladeClassInfo: false,
            wizardClassInfo: false,
            lifeClassInfo: false,
            demonClassInfo: false,
            smallDesc: "",
            talentCannotBeSelected: 0,
            dungeonLevel: 1,
           
            changeLevel: function () {


                

                ig.game.saveGame(ig.game.data_packet)

                ig.game.Load();
            },
            emptyBuffs: function () {
                var array = ig.game.arrayOfBuffs;
                var array_l = array.length;
                while (array_l--) {
                    array[array_l].kill();
                }
            },
            getStates: function () {



            },
            getLimits: function (y) {

                var modifier = 0;
                if (ig.game.currentDevice == 2) {
                    ymodifier = 0.025;
                    xmodifier = 0.221;
                }
                else {
                    ymodifier = 0;
                    xmodifier = 0.161;
                }
                ig.game.TouchMoveXLimit = xmodifier * window.innerWidth;
                ig.game.TouchMoveYLimit = (y - ymodifier) * window.innerHeight;
                //
            },


            
            alignHUDButtons: function () {

                var ms_width = 267;
                var ms_height = 160;
                
             
                //First remove the elements
                ig.game.myTouchButtons.removeButton("jump");
                ig.game.myTouchButtons.removeButton("action1");
                ig.game.myTouchButtons.removeButton("action2");














                //Ipad mini / Ipad scheme
                if (ig.game.buttonScheme == 0) {


                    ig.game.getLimits(0.7875);

                    ig.game.setAndAlign("jump", 0.64 * ms_width, 0.8 * ms_height, 0.12 * ms_width, 0.2 * ms_height,ig.game.JUMPBUTTON1, ig.game.JUMPBUTTON2,2);


                    ig.game.setAndAlign("action1", 0.76 * ms_width, 0.8 * ms_height, 0.12 * ms_width, 0.2 * ms_height,ig.game.ACTIONBUTTON);


                    ig.game.setAndAlign("action2", 0.88 * ms_width, 0.8 * ms_height, 0.12 * ms_width, 0.2 * ms_height, ig.game.ACTIONBUTTON);







                }

                    //Alternate Ipad/Iphone scheme
                else if (ig.game.buttonScheme == 1) {
                    ig.game.getLimits(0.675);

                    ig.game.setAndAlign("jump", 0.64 * ms_width, 0.675 * ms_height, 0.12 * ms_width, 0.2 * ms_height);


                    ig.game.setAndAlign("action1", 0.76 * ms_width, 0.675 * ms_height, 0.12 * ms_width, 0.2 * ms_height);


                    ig.game.setAndAlign("action2", 0.88 * ms_width, 0.675 * ms_height, 0.12 * ms_width, 0.2 * ms_height);




                }

                    //Iphone scheme
                else if (ig.game.buttonScheme == 2) {

                    ig.game.getLimits(0.58125);
                    ig.game.setAndAlign("jump", 0.64 * ms_width, 0.58125 * ms_height, 0.12 * ms_width, 0.2 * ms_height);


                    ig.game.setAndAlign("action1", 0.76 * ms_width, 0.58125 * ms_height, 0.12 * ms_width, 0.2 * ms_height);


                    ig.game.setAndAlign("action2", 0.88 * ms_width, 0.58125 * ms_height, 0.12 * ms_width, 0.2 * ms_height);





                }

                else if (ig.game.buttonScheme == 3) {

                    ig.game.getLimits(0.675);


                    if (ig.game.currentDevice == 0) {
                        ig.game.setAndAlign("jump", 0.82 * ms_width, 0.75625 * ms_height, 0.12 * ms_width, 0.2 * ms_height);
                    }
                    else {
                        ig.game.setAndAlign("jump", 0.82 * ms_width, 0.8 * ms_height, 0.12 * ms_width, 0.2 * ms_height);
                    }
                    if (ig.game.currentDevice == 0) {
                        ig.game.setAndAlign("action1", 0.76 * ms_width, 0.55625 * ms_height, 0.12 * ms_width, 0.2 * ms_height);
                    }
                    else {
                        ig.game.setAndAlign("action1", 0.76 * ms_width, 0.6 * ms_height, 0.12 * ms_width, 0.2 * ms_height);
                    }

                    if (ig.game.currentDevice == 0) {
                        ig.game.setAndAlign("action2", 0.88 * ms_width, 0.55625 * ms_height, 0.12 * ms_width, 0.2 * ms_height);
                    }
                    else {
                        ig.game.setAndAlign("action2", 0.88 * ms_width, 0.6 * ms_height, 0.12 * ms_width, 0.2 * ms_height);
                    }







                }
                else if (ig.game.buttonScheme == 4) {
                    /* if(ig.game.currentDevice == 0){
                     ig.game.getLimits(0.58125);
                     }*/


                    ig.game.getLimits(0.58125);

                    ig.game.setAndAlign("jump", 0.88 * ms_width, 0.58125 * ms_height, 0.12 * ms_width, 0.2 * ms_height);


                    ig.game.setAndAlign("action1", 0.64 * ms_width, 0.58125 * ms_height, 0.12 * ms_width, 0.2 * ms_height);


                    ig.game.setAndAlign("action2", 0.76 * ms_width, 0.58125 * ms_height, 0.12 * ms_width, 0.2 * ms_height);





                }
                else if (ig.game.buttonScheme == 5) {

                    ig.game.getLimits(0.675);

                    ig.game.setAndAlign("jump", 0.88 * ms_width, 0.675 * ms_height, 0.12 * ms_width, 0.2 * ms_height);


                    ig.game.setAndAlign("action1", 0.64 * ms_width, 0.675 * ms_height, 0.12 * ms_width, 0.2 * ms_height);


                    ig.game.setAndAlign("action2", 0.76 * ms_width, 0.675 * ms_height, 0.12 * ms_width, 0.2 * ms_height);







                }
                else if (ig.game.buttonScheme == 6) {




                    ig.game.getLimits(0.7875);

                    ig.game.setAndAlign("jump", 0.88 * ms_width, 0.8 * ms_height, 0.12 * ms_width, 0.2 * ms_height);


                    ig.game.setAndAlign("action1", 0.64 * ms_width, 0.8 * ms_height, 0.12 * ms_width, 0.2 * ms_height);


                    ig.game.setAndAlign("action2", 0.76 * ms_width, 0.8 * ms_height, 0.12 * ms_width, 0.2 * ms_height);



                }






            },
         
            setAndAlign: function (name, left, top, w, h, image, image2,type) {
                var newBTN = null;
              
                if (image) {

                    
                    if(image2) {
                  
                        newBTN = new ig.TouchButton(name, { left: left, top: top }, w, h, image, 0, 1, type, image2);
                   
                    }
                    else {
                        newBTN = new ig.TouchButton(name, { left: left, top: top }, w, h, image, 0, 1, 0);
                    }
                }
                else { newBTN = new ig.TouchButton(name, { left: left, top: top }, w, h); }
                newBTN.align();


                ig.game.myTouchButtons.perfButtons.push(newBTN);


            },
            moveItems: function (a) {

                if (a) {

                    var weapon = ig.game.getEntityByName('weapon');
                    var shield = ig.game.getEntityByName('shield');
                    var armor = ig.game.getEntityByName('armor');
                    if (armor !== null) {
                        if (a.currentPath == 'Right') { armor.flip = false; }
                        else if (a.currentPath == 'Left') { armor.flip = true; }


                        armor.currentAnim.flip.x = armor.flip;
                        armor.pos.y = a.pos.y - 8;
                        armor.pos.x = a.pos.x - 12;

                    }
                    if (weapon !== null) {
                        if (a.currentPath == 'Right') { weapon.flip = false; }
                        else if (a.currentPath == 'Left') { weapon.flip = true; }
                        weapon.currentAnim.flip.x = weapon.flip;
                        weapon.pos.y = a.pos.y - 8;
                        weapon.pos.x = a.pos.x - 12;

                    }
                    if (shield !== null) {
                        if (a.currentPath == 'Right') { shield.flip = false; }
                        else if (a.currentPath == 'Left') { shield.flip = true; }
                        shield.currentAnim.flip.x = shield.flip;
                        shield.pos.y = a.pos.y - 8;

                        shield.pos.x = a.pos.x - 12;


                    }
                }
            },
            levelSelectScrollSmoother: 0,
            bufferScroller: 0,
            bufferScrollerY: 0,
            ScrollLevelSelectionScreenTo: function () {
                if (!ig.game.LevelSelect) return;
                var targetX = 0;
                var targetY = 0;
                if (ig.game.optionSelectedLevel === 0) {
                    targetX = -120;
                    targetY = 0;

                    ig.game.levelPointerCoords.x = 64;
                    ig.game.levelPointerCoords.y = 140;
                }
                else if (ig.game.optionSelectedLevel === 1) {
                    targetX = -160;
                    targetY = 0;

                    ig.game.levelPointerCoords.x = 120;
                    ig.game.levelPointerCoords.y = 140;
                }
                else if (ig.game.optionSelectedLevel === 2) {
                    targetX = -245;
                    targetY = 0;

                    ig.game.levelPointerCoords.x = 120;
                    ig.game.levelPointerCoords.y = 140;
                }
                else if (ig.game.optionSelectedLevel === 3) {
                    targetX = -300;
                    targetY = 0;

                    ig.game.levelPointerCoords.x = 110;
                    ig.game.levelPointerCoords.y = 120;
                }
                else if (ig.game.optionSelectedLevel === 4) {
                    targetX = -260;
                    targetY = 30;

                    ig.game.levelPointerCoords.x = 130;
                    ig.game.levelPointerCoords.y = 120;
                }
                else if (ig.game.optionSelectedLevel === 5) {
                    targetX = 0;
                    targetY = 0;
                    ig.game.levelPointerCoords.x = 40;
                    ig.game.levelPointerCoords.y = 140;
                }
                else if (ig.game.optionSelectedLevel === 6) {
                    targetX = 0;
                    targetY = 30;
                    ig.game.levelPointerCoords.x = 120;
                    ig.game.levelPointerCoords.y = 140;
                }
                else if (ig.game.optionSelectedLevel === 7) {
                    targetX = -100;
                    targetY = 50;
                    ig.game.levelPointerCoords.x = 120;
                    ig.game.levelPointerCoords.y = 140;
                }
                else if (ig.game.optionSelectedLevel === 8) {
                    targetX = -400;
                    targetY = 0;
                    ig.game.levelPointerCoords.x = 120;
                    ig.game.levelPointerCoords.y = 120;
                }
                else if (ig.game.optionSelectedLevel === 9) {
                    targetX = -480;
                    targetY = 40;
                    ig.game.levelPointerCoords.x = 120;
                    ig.game.levelPointerCoords.y = 140;
                }
                else if (ig.game.optionSelectedLevel === 10) {
                    targetX = -500;
                    targetY = 40;
                    ig.game.levelPointerCoords.x = 160;
                    ig.game.levelPointerCoords.y = 140;
                }

                else if (ig.game.optionSelectedLevel === 11) {
                    targetX = -500;
                    targetY = 120;
                    ig.game.levelPointerCoords.x = 120;
                    ig.game.levelPointerCoords.y = 120;
                }
                else if (ig.game.optionSelectedLevel === 12) {
                    targetX = -340;
                    targetY = 30;
                    ig.game.levelPointerCoords.x = 115;
                    ig.game.levelPointerCoords.y = 125;
                }
                else if (ig.game.optionSelectedLevel === 13) {
                    targetX = -360;
                    targetY = 140;
                    ig.game.levelPointerCoords.x = 120;
                    ig.game.levelPointerCoords.y = 110;
                }
             
                levelSelectScroll -= ig.game.bufferScroller;
                ig.game.bufferScroller = ((targetX - levelSelectScroll) * Math.sin((ig.game.levelSelectScrollSmoother / 60) * 0.5 * PI));
                ig.game.bufferScrollerY = ((targetY - levelSelectScrollY) * Math.sin((ig.game.levelSelectScrollSmoother / 60) * 0.5 * PI));
                levelSelectScroll += ig.game.bufferScroller;
                levelSelectScrollY += ig.game.bufferScrollerY;
                
               /* else {
                    levelSelectScroll = ((targetX ) * Math.sin((ig.game.levelSelectScrollSmoother / 100) * 0.5 * 3.14));
                }*/

                if (ig.game.levelSelectScrollSmoother < 60) {
                    ig.game.levelSelectScrollSmoother += 1;
                    if (ig.game.canLevelPointer === true) ig.game.canLevelPointer = false;
                }
                else { ig.game.canLevelPointer = true; }
          
            },
            equipmentSmoother : 0,
            bufferEquipmentY: 0,
            equipmentSelectY: 0,
            equipmentCanChange: 0,
            equipmentListSmoother: function(targetY){
                ig.game.equipmentSelectY -= ig.game.bufferEquipmentY;
             
                ig.game.bufferEquipmentY = ((targetY - ig.game.equipmentSelectY) * Math.sin((ig.game.equipmentSmoother / 60) * 0.5 * PI));
                ig.game.equipmentSelectY += ig.game.bufferEquipmentY;
          
                if (ig.game.equipmentSmoother < 60) {
                    ig.game.equipmentSmoother += 1;
                    if (ig.game.equipmentCanChange === true) ig.game.equipmentCanChanger = false;
                }
                else { ig.game.equipmentCanChange = true; }
                
            },
            checkDeviceLayout: function () {
                var retVal = 2;
                if (ig.ua.iPhone) { retVal = 2; }
                else if (ig.ua.iPad) { retVal = 0; }
                return retVal;
            },
            spawnMainMenuBG: function () {
                //Nothing yet
            },
            /*  checkReviewStatus: function(){
                                 
                                  
                                  if(localStorage.getItem("SUPRARPGCheckIfReview"))
                                  {
                                  checkIfReview = parseInt(localStorage.getItem("SUPRARPGCheckIfReview"));
  
                                  }
                                  
                                  },*/
            checkOSVersion: function (string) {
                var counter = 0;
                var buffer_a = string.split(";");
                if (buffer_a[1]) {
                    var buffer2_a = buffer_a[1].split("");

                    for (var i = 0; i < buffer2_a.length; i++) {

                        if (buffer2_a[i] == "O" || buffer2_a[i] == "S" || buffer2_a[i] == "7") {
                            counter += 1;
                        }

                    }
                }

                if (counter == 3) { OSVERSION = "7Past"; }
                else { OSVERSION = "7Pre"; }




            },

            

            invokeDisplayBar: function (name) {
                var music = ig.music;
                ig.game.spawnEntity(EntityBossBar, ig.game.player.pos.x - ig.system.width / 2, ig.game.player.pos.y - ig.system.height / 8, { animSheet: new ig.AnimationSheet('media/' + name + '.png', 267, 64) });
                ig.game.bossBarPause.set(2.2);

                ig.game.bossBarPause_T = true;
                switch (name) {
                    case 'aegonthegiant':
                        music.play('rooibosch');
                        music.loop = true;
                        break;
                    case 'themageknight':
                        music.play('rooibosch');
                        music.loop = true;
                        break;
                    case 'kozthedarkwizard':
                        music.play('surge');
                        music.loop = true;
                        break;
                    case 'thewinterwitch':
                        music.play('pursuit');
                        music.loop = true;

                        break;
                    case 'thefallenwarrior':
                        music.play('finalboss');
                        music.loop = true;
                        break;
                    default:

                        break;
                }



            },


            spawnTreasure: function(x_coord,y_coord,setValue){
                if (setValue) ig.game.spawnEntity(EntityRandomTreasure, x_coord, y_coord, { bossNumber: setValue });
                else { ig.game.spawnEntity(EntityRandomTreasure, x_coord, y_coord); }
               
            },
            spawnGold: function (name, x_coord, y_coord) {
                var randomAmount = 0;
                if (name === "boss") {
                    randomAmount = Math.floor(Math.random() * 3) + 2;
                }
                else {
                    randomAmount = Math.floor(Math.random() * 2) + 1;
                }

                for (var i = 0; i < randomAmount; i++) {
                    ig.game.spawnEntity('EntityGold', x_coord + (i * 4), y_coord - (i * 4), {vel :{y:(-100 - (i * 10)),x:0} });
                }
            },
            checkDamage: function (target, attacker, type, overRideD, isProjectile, isBurn, color) {
                var allowedToContinue = true;
                var damage = 0;
                var d_type = "";
                var randomnumber = 0

                if (target.name !== "player1") {
                    
                    if (ig.game.player.weapon.SPECIAL["Mana Pummel"]
                        ) {
                    
                        var quarterPercentDamage = 5;
                        var retMP = game.CheckOverFlowHeal(ig.game.player, quarterPercentDamage, 'mp');
                        ig.game.player.mana += retMP;
                        //game.damageTimer(1, '+' + ((Math.round(quarterPercentDamage * 10) / 10)), 'cyan');
                        game.damageTimer(1, '+', 'cyan');
                    }

                }
                if (target.armor) {
              
                    if (target.armor.SPECIAL["Dark Aura"]) {
                 
                        ig.game.damageTimer(1, target.health * 0.04, 'white', attacker);
                        attacker.receiveDamage((target.health * 0.04), attacker);
                    }
                    if (target.armor.SPECIAL["Mirage"] && type === "MAGIC") {
                        randomnumber = Math.floor(Math.random() * 5);
                        if (randomnumber === 0) {
                            allowedToContinue = false;
                            d_type = 'FADE';
                        }

                    }
                    if (target.armor.SPECIAL["Dispersion"] && type === "MAGIC") {
                        damage *= 0.7;
                    }

                }
                if (target.shield) {
                    if (target.shield.SPECIAL["Guarding Light"]) {
                        var retMP = ig.game.CheckOverFlowHeal(target, target.Maxmana * 0.05, 'mp');
                        target.mana += retMP;
                        ig.game.damageTimer(1, 'absorb', 'absorb');
                        ig.game.damageTimer(1, '+', 'cyan');

                        var retHP = ig.game.CheckOverFlowHeal(target, target.Maxhealth * 0.05, 'hp');
                        target.health += retHP;
                        ig.game.damageTimer(1, 'absorb', 'absorb');
                        ig.game.damageTimer(1, '+', 'green');
                    }
                   

                    

                    if (target.shield.SPECIAL["Negation"]) {
                        randomnumber = Math.floor(Math.random() * 10);
                        if (randomnumber === 0) {
                            allowedToContinue = false;
                            d_type = 'MSPHERE';
                        }
                       
                    }
                   
                    if (target.shield.SPECIAL["Great Wall"]) {
                        var randomGreatWall = Math.floor(Math.random() * 5);
                        if (randomGreatWall === 0) ig.game.spawnEntity('EntityGreatWallBuff', target.pos.x, target.pos.y);
                    }
              
                    if (target.shield.SPECIAL["Mystic Sphere"]) {
                        damage *= 0.8;
                    }
                   
                    if (target.shield.SPECIAL["Spikes"]) {
                        attacker.receiveDamage(1 + Math.ceil((damage * 0.10)), attacker); ig.game.damageTimer(1, 1 + Math.ceil(damage * 0.05), 'white', attacker);
                    }
                    if (target.shield.SPECIAL["Heavy Spikes"]) {
                        attacker.receiveDamage(1 + Math.ceil((damage * 0.15)), attacker); ig.game.damageTimer(1, 1 + Math.ceil(damage * 0.1), 'white', attacker);
                    }

                  
                }
                if (target.name === "player1" && target.DEMON_MYSTICBARRIER) {
                    randomnumber = Math.floor(Math.random() * 100);
                    if (randomnumber < (target.DEMON_MYSTICBARRIER_LEVEL * 4)) {
                        allowedToContinue = false;
                        d_type = 'MSPHERE';
                    }

                }
               
                
                if (allowedToContinue == true) {

                    damage = (overRideD) ? overRideD : attacker.ATK;

                    var damage_Buf = damage;

                    attacker.doneDamage = (attacker.doneDamage != 'undefined') ? true : attacker.doneDamage;

                  
                    /*if (ig.game.player.REFLECTON == true) {
                        if (attacker.health - damage_Buf <= 0) { ig.game.player.EXP += attacker.EXP_BOUNTY; } attacker.receiveDamage(damage_Buf, attacker);
                        ig.game.damageTimer(1, damage_Buf, 'white');
                    }*/
                    if (ig.game.player.L4_REGENDAMAGETAKEN == true) { ig.game.player.RegenOnFive = damage / 2; ig.game.player.delayOnFive.set(5); }
                    // var damage = this.ATK;
                    var small_a = { damage: damage, isBlocked: false };

                    if (type == "PHYSICAL") {
                        if (target.RES) {
                           
                            small_a = ig.game.checkRES(target.RESMODIFIER, target.RES, target.BLK, damage);
                        }
                    }
                    else if (type == "MAGIC") {
                        if (target.MAG_RES) {
                            small_a = ig.game.checkRES(target.RESMODIFIER, target.MAG_RES, target.BLK, damage);
                        }
                    }
                    else if (type == "MIXED") {
                        if (target.MAG_RES && target.RES) {
                            small_a = ig.game.checkRES(target.RESMODIFIER, (target.RES + target.MAG_RES) / 2, target.BLK, damage);
                        }
                    }
                    else if (type == "TRUE") {
                        //
                    }
                    
                    if (target.health - damage_Buf <= 0) {
                        //Enemy dies

                        if (target.name !== "player1") {
                            if (ig.game.player.SPELL_DEMOLISH) {
                                //Chance

                                var randomdemolish = Math.floor(Math.random() * 10) + 1;
                       
                                if (randomdemolish <= ig.game.player.SPELL_DEMOLISH_LEVEL) {
                                    ig.game.spawnEntity("EntityFireExplosion", target.pos.x - 10, target.pos.y - 8);

                                    var retMP = ig.game.CheckOverFlowHeal(ig.game.player, target.Maxhealth * (ig.game.player.SPELL_DEMOLISH_LEVEL * 0.01), 'mp');


                                    ig.game.player.mana += retMP; ig.game.damageTimer(1, '+', 'cyan');
                                }
                               
                            }
                            if (ig.game.player.BLADE_BLOODLUST) {


                                ig.game.spawnEntity("EntityBloodlustBuff", ig.game.player.pos.x, ig.game.player.pos.y);
                                ig.game.damageTimer(1, 'bloodlust', 'bloodlust');




                            }
                            if (ig.game.player.weapon.SPECIAL["Bloodrage"]) {
                                var retMP = ig.game.CheckOverFlowHeal(ig.game.player, 20, 'mp');
                                ig.game.player.mana += retMP; ig.game.damageTimer(1, '+', 'cyan');
                                var retHP = ig.game.CheckOverFlowHeal(ig.game.player, 20, 'hp');
                                ig.game.player.health += retHP; ig.game.damageTimer(1, '+', 'green');
                            }
                            if (ig.game.player.weapon.SPECIAL["Flesh Blade"]) {
                                if (ig.game.player.weapon.bonusATK < 20) {
                                    ig.game.player.weapon.bonusATK += 0.05;
                                    ig.game.player.weapon.ATK += 0.05;
                                }

                            }


                        }
                    }


                    damage = Math.ceil(small_a.damage);
                    if (small_a.isBlocked == true) {
                        if (target.shield) {
                            if (target.shield.SPECIAL["Absorb"]) {
                                var retMP = ig.game.CheckOverFlowHeal(target, randomnumber + Math.ceil(damage / 0.20), 'mp');
                                target.mana += retMP;
                                ig.game.damageTimer(1, 'absorb', 'absorb');
                                ig.game.damageTimer(1, '+', 'cyan');
                            }
                            if (target.shield.SPECIAL["Leech"]) {
                                var retHP = ig.game.CheckOverFlowHeal(target, randomnumber + Math.ceil(damage / 0.20), 'hp');
                                target.health += retHP;
                                ig.game.damageTimer(1, 'absorb', 'absorb');
                                ig.game.damageTimer(1, '+', 'green');
                            }
                            if (target.shield.SPECIAL["Frozen"]) {
                                if (attacker) attacker.chilledInvoked = true;
                            }
                            if (target.shield.SPECIAL["Burning"]) {
                                ig.game.spawnEntity("EntityBurningEffect", attacker.pos.x, attacker.pos.y);

                            }
                        }
                       

                        if (target.name && target.name === "player1") {
                            ig.game.damageTimer(1, damage, 'red_blocked');
                            ig.game.damageTimer(1, damage, 'red');
                        }
                        else {
                            ig.game.damageTimer(1, damage, 'red_blocked');
                            ig.game.damageTimer(1, damage, 'white');
                        }

                        //Spawn crit buff for few seconds;
                        if (target.shield) {

                            if (target.shield.SPECIAL["Furious Blocks"]) {
                                ig.game.spawnEntity("EntityFuriousBlocksBuff", target.pos.x, target.pos.y, { flip: target.flip });
                            }
                            if (target.shield.SPECIAL["Raging Slam"]) {
                                ig.game.spawnEntity("EntityShockpulse", target.pos.x, target.pos.y, { flip: target.flip });
                            }
                            if (target.shield.SPECIAL["Poisonous Feedback"]) {
                                attacker.receiveDamage(10, attacker); ig.game.damageTimer(1, 10, 'white',attacker);
                            }
                        }
                        
                    }
                    else {

                        if (target.name && target.name === "player1") {
                            ig.game.damageTimer(1, damage, 'red');
                        }
                        else {

                            if (color) {
                                ig.game.damageTimer(1, damage, color, target);
                            }
                            else {
                                ig.game.damageTimer(1, damage, 'white');
                            }




                        }
                    }
                
                    if (target.name === "player1" && target.DEMON_DARKRAGE
                        && target.health <= target.Maxhealth * (0.2 + (0.05 * target.DEMON_EMPOWEREDDARKRAGE_LEVEL))
                        ) {
                        var randomDarkRage = Math.floor(Math.random() * 100);
                        
                        if (randomDarkRage < target.DEMON_DARKRAGE_LEVEL * 8) {
                            
                            game.spawnEntity("EntityDarkRageBuff", target.pos.x, target.pos.y);
                            
                            
                            
                        }
                    }

                    if (target.name === "player1" && target.armor.SPECIAL["Hero's Aura"]) {
                        var retHP = ig.game.CheckOverFlowHeal(player, target.Maxhealth * 0.05, 'hp');
                        player.health += retHP; ig.game.damageTimer(1, '+', 'green');
                        var retMP = ig.game.CheckOverFlowHeal(player, target.Maxmana * 0.05, 'mp');
                        player.mana += retMP; ig.game.damageTimer(1, '+', 'cyan');
                    }

                    var doDamage = true;
                    if (target.name === "player1" && target.DEMON_DARKWILL && ((target.health - damage) <= 0)) {
                        var randomDarkWill = Math.floor(Math.random() * 2);
                
                        var heal = (randomDarkWill === 0) ? true : false;
                        if (heal == true) {
                            doDamage = false;
                            var retHP = ig.game.CheckOverFlowHeal(target, target.Maxhealth * 0.20, 'hp');
                            target.health += retHP;
                            ig.game.damageTimer(1, (target.Maxhealth * 0.20), 'undyingrage');
                        }
                    }

                    if (target.name === "player1" && target.armor.SPECIAL['Second Wind'] && ((target.health - damage) <= 0)) {
                        var randomSecondWind = Math.floor(Math.random() * 5);
                        var heal = (randomSecondWind === 0) ? true : false;
                        if (heal == true) {
                            doDamage = false;
                            var retHP = ig.game.CheckOverFlowHeal(target, target.Maxhealth * 0.15, 'hp');
                            target.health += retHP;
                            ig.game.damageTimer(1, (target.Maxhealth * 0.15), 'undyingrage');
                           
                        }
                    }
                  
                    if(doDamage)target.receiveDamage(damage, attacker);
                    
                } else {
                    if (d_type == 'MSPHERE') { ig.game.damageTimer(1, damage, "myst_sphere"); }
                    else if (d_type == 'FADE') { ig.game.damageTimer(1, damage, "fade"); }
                    else if (d_type == 'GLIMMER') { ig.game.damageTimer(1, damage, "glimmer"); }
                    else if (d_type == 'REFLECTION') { ig.game.damageTimer(1, damage, "reflect"); return 'REFLECTION'; }

                }
            },
            CalculateDamage: function (player, damage, other, callback, isTrue, type, name, object, isDuplicate) {

                var critFLAG = false;
                var critCPlus = 0;
                var executed = false;
                var game = ig.game;
                if (!player) return 0;

                //Not when attack is burn typed



                if (player.CLASS === "BLADE" && !isTrue) {
                    
                    if (player.shockHands >= 5) {
                        var x_coord = 0;
                        if (player.currentPath == 'Right') { x_coord = player.pos.x; }
                        if (player.currentPath == 'Left') { x_coord = player.pos.x - 8; }
                        game.spawnEntity('EntityShockwave', x_coord, player.pos.y );
          
                        //Reset shock hands counter
                        player.shockHands = 0;

                    }
                    else {
                        player.shockHands++;
                    }
                }

                if (player.weapon) {
                    if (player.weapon.SPECIAL["Executioner"] && other.name !== "boss") {
                        var randomVal3 = Math.floor(Math.random() * 100);
                        if (randomVal3 < 4) executed = true;
                    }
                }
                if (executed == false) {

                    if (name === "EntityShockwave" && player.weapon.SPECIAL["Demon's Bane"]) {
                        if ( other.name === "boss" || other.name === "knight") damage *= 1.4;
                    }
                    if (player.armor.SPECIAL["Green Glimmer"] && name === "EntityRadiance") ig.game.spawnEntity("EntityGreenGlimmerBuff", player.pos.x, player.pos.y);
                    if (player.weapon.SPECIAL["Spell Focus"] && (type === 'MIXED' ||type === 'MAGIC')) {
                        critCPlus += 10;
                    }
                    if (name === 'EntityFrostball') {
                        critCPlus += 25;
                    }
                    if (player.shield.SPECIAL["Dark Matter"]) {
                        if (player.mana <= player.Maxmana * 0.1) { critCPlus += 50; }
                        else if (player.mana <= player.Maxmana * 0.15) { critCPlus += 32; }
                        else if (player.mana <= player.Maxmana * 0.2) { critCPlus += 24; }
                        else if (player.mana <= player.Maxmana * 0.25) { critCPlus += 16; }
                        else if (player.mana <= player.Maxmana * 0.3) { critCPlus += 8; }

                    }

                    if (player.BLADE_EXECUTE) {
                        var thresHold = 0.33;
                        if (player.weapon.SPECIAL["Demon Execute"]) {
                            thresHold = 0.5;
                        }
                       if (other.name === "boss")
                        {
                            if (other.health / other.Maxhealth < thresHold) {
                                critCPlus += 25;
                            }
                        }
                        else {
                           if (other.actHealth / other.Maxhealth < thresHold) {
                                critCPlus += 25;
                            }
                        }
                        
                     
                        

                    }
                    if (player.weapon.SPECIAL["Finisher"]) {
                        
                       
                        if (other.name === "boss") {
                            if (other.health / other.Maxhealth < 0.3) {
                                critCPlus += 15;
                            }
                        }
                        else {
                            if (other.actHealth / other.Maxhealth < 0.3) {
                                critCPlus += 15;
                            }
                        }




                    }
                    if (player.BLADE_BIGPLAY) {
                        if (player.health / player.MaxHealth < 80) {
                            critCPlus += 2 * player.BLADE_BIGPLAY_LEVEL;
                        }
                        if (player.health / player.MaxHealth < 60) {
                            critCPlus += 2 * player.BLADE_BIGPLAY_LEVEL;
                        }
                        if (player.health / player.MaxHealth < 40) {
                            critCPlus += 2 * player.BLADE_BIGPLAY_LEVEL;
                        }
                        if (player.health / player.MaxHealth < 20) {
                            critCPlus += 2 * player.BLADE_BIGPLAY_LEVEL;
                        }
                    }

                    if (player.weapon.SPECIAL["Frozen Death"] &&
                     other.chillInvoked === true &&
                     (name === "EntityFireBlast" || name === "EntityFrostFire")
                     ) critCPlus += 25;

                    if (player.weapon.SPECIAL["Master of Fire"] &&
                    
                     (name === "EntityFireBlast" || name === "EntityFrostFire")
                     ) critCPlus += 25;


      
                   
                    var randomnumber = Math.floor(Math.random() * 100) + 1;

                    if (other.chillInvoked === true && isTrue === true) {
                        damage *= 1 + (player.SPELL_ELEMENTALSYNERGY_LEVEL * 0.1);

                    }
             
                    var critBonus = 100;

                    //Critical Hit

                    if (player.weapon.SPECIAL["Intense Pain"] && type === "MAGIC") {
                        critBonus += 50;
                    }
                    if (player.BLADE_PHANTOMSTRIKES === false) {
                        
                            if (randomnumber <= player.CRIT + critCPlus) {
                                
                                                                if (isTrue === true) {
                                                                    //critFLAG = true;
                                                                }
                                                                else {
                                                                    damage *= (critBonus + player.CRIT_DAMAGE) / 100; critFLAG = true;
                                                                }
                            }           
                            if (player.BLADE_ESCALATION === true && player.ESCALATION_SureCrit === true && critFLAG === false) {



                                                                player.ESCALATION_SureCrit = false; ig.game.damageTimer(1, 'escalation', 'escalation');

                                                                damage *= (critBonus + player.CRIT_DAMAGE) / 100; critFLAG = true;
                                                            }



                            


                        
                    }
                  
             
                 
                    if (name == 'EntityLifeSlash') {
                        var randomnumber2 = Math.floor(Math.random() * 100); 
                        if (randomnumber2 < ((player.LIFE_LIFESLASH_CHANCE + (player.LIFE_EMPOWEREDSLASH_LEVEL * 4)) )) {
                       
                            game.spawnEntity('EntityHolyPower', game.player.pos.x, game.player.pos.y);
                            var retHP = game.CheckOverFlowHeal(player, 10, 'hp');

                            player.health += retHP;

                          
                            var retMP = game.CheckOverFlowHeal(player, 10, 'mp');

                            player.mana += retMP;
             
                            game.damageTimer(1, '+', 'green');
                           
                            if (player.LIFE_HOLYSLASH) {
                                damage *= 1.25;
                                if (other.name === "monster") damage *= 1.25;
                            }
                            if (player.LIFE_RADIANTFURY) {
                                //Check with bosses
                                if(other.name === "boss")damage += other.actHealth * (0.01 * player.LIFE_RADIANTFURY_LEVEL);
                                else damage += other.health * (0.01 * player.LIFE_RADIANTFURY_LEVEL);
                            }
                            if (player.weapon.SPECIAL["Mad Tap"]) {
                                var damageBuffer3 = 0;
                                if (other.name === "boss") damageBuffer3 = other.actHealth * (0.03 * player.LIFE_RADIANTFURY_LEVEL);
                                else damageBuffer3 = other.health * (0.03 * player.LIFE_RADIANTFURY_LEVEL);
                                if (player.health - damageBuffer3 > 0) damage += damageBuffer;

                            }
                            if (player.LIFE_HOLYBARRIER) {
                                game.spawnEntity("EntityHolyBarrier", player.pos.x, player.pos.y);
                            }
                        }
                    }
                    if (player.weapon.SPECIAL["Frostburn"]) {
                        other.chillInvoked = true;
                        game.spawnEntity("EntityBurningEffect", other.pos.x, other.pos.y);
                    }
                    if (player.weapon.SPECIAL["Chilly"] && type !== "MAGIC") {
                        other.chillInvoked = true;
                    }
                    if (player.weapon.SPECIAL["Fiery"] && type !== "MAGIC") {
                        game.spawnEntity("EntityBurningEffect", other.pos.x, other.pos.y);
                    }

                    if (name !== 'EntityFireExplosion' && player.weapon.SPECIAL["Exploding Slams"]  && critFLAG === true) {
                        var x_coord_b = 0;
                        if (other.flip) x_coord_b = -12;
                        else { x_coord_b = -16; }
                        game.spawnEntity("EntityFireExplosion", other.pos.x + x_coord_b, other.pos.y-8, {flip:player.flip});
                    }
                  
                    if (player.weapon.SPECIAL["Singularity Strike"]) {

                       
                        game.spawnEntity("EntityPlayerSingularity", other.pos.x, other.pos.y-4, { flip: player.flip });
                    }
                  
                    if (player.shield.SPECIAL["Sovereign"]) {
                        if (other.name !== "boss") damage *= 1.3;
                    }
                    if (player.weapon.SPECIAL["Grudge"]) {
                        damage *= 1.3;
                    }
                    var mod = 1;
                    if (player.SPELL_ARCANEBALL_LEVEL > 0 && name === "EntityArcaneBall") {
                        //IF ENEMY IS CHILLED
                        //
                       
                        mod = 1;
                        if (other.chillInvoked === true) {
                            mod += 0.25;
                        }
                        if (other.IsBurning === true) {
                            mod += 0.25;
                        }
                        damage *= mod;



                    }
                    
                    if (player.SPELL_ELEMENTALSYNERGY) {
                        //IF ENEMY IS CHILLED
                        //
                        mod = 1;
                        if (other.chillInvoked === true && isTrue=== true) {
                            mod += (player.SPELL_ELEMENTALSYNERGY_LEVEL * 0.2);
                        }
                      
                        damage *= mod;



                    }

                    if (player.BLADE_AXESPECIALIST &&
                        player.weapon.wType && player.weapon.wType === "AXE")
                    {
                       if (other.name === "boss")
                       {
                           if (other.health / other.Maxhealth < 0.33) {
                               damage *= (1 + (player.BLADE_AXESPECIALIST_LEVEL * 0.05));
                           }
                       }
                       else {
                           if (other.actHealth / other.Maxhealth < 0.33) {
                               damage *= (1 + (player.BLADE_AXESPECIALIST_LEVEL * 0.05));
                           }
                       }
                       
                    }


                    if (player.BLADE_ESCALATION === true && !isDuplicate) {
                        player.ESCALATION_DamageCounter += damage;
                      
                       
                        if (player.ESCALATION_DamageCounter >= (350 - (50 * player.BLADE_ESCALATION_LEVEL))) { player.ESCALATION_SureCrit = true; player.ESCALATION_DamageCounter = 0; }
                    }
               
                    if (player.BLADE_FRENZY === true && !isTrue) {

                        if (player.weapon.SPECIAL["Crazed Frenzy"]) {
                            if (other.FRENZYCOUNTER === 0) { player.Maxhealth -= player.FrenzyBonusDBLATK; player.FrenzyBonusDBLATK = 0; }
                            if (other.FRENZYCOUNTER < 10) {
                                player.DBLATKCHC += 1; player.FrenzyBonusDBLATK += 1;
                                other.FRENZYCOUNTER++;
                                ig.game.damageTimer(1, 'frenzy', 'frenzy');
                            }
                        }
                        else {
                            if (other.FRENZYCOUNTER === 0) { player.Maxhealth -= player.FrenzyBonusHp; player.FrenzyBonusHp = 0; }
                            if (other.FRENZYCOUNTER < 10) {
                                player.Maxhealth += player.BASE_HP * (0.01 + player.BLADE_FRENZY_LEVEL * 0.01); player.FrenzyBonusHp += player.BASE_HP * (0.01 + player.BLADE_FRENZY_LEVEL * 0.01);
                                other.FRENZYCOUNTER++;
                                ig.game.damageTimer(1, 'frenzy', 'frenzy');
                            }
                        }
                        



                    }
                    if (player.weapon.SPECIAL["Arcane Devotion"]) {
                        game.spawnEntity("EntityArcaneDevotionBuff", player.pos.x, player.pos.y);
                        game.damageTimer(1, '+', 'cyan');
                        
                    }
                   
                    if ((type === "MAGIC" || type === "MIXED") && player.armor.SPECIAL["Wizard Armor"]) {
                        damage *= 1.1;
                    }
                    if ((type === "MAGIC" || type === "MIXED") && player.armor.SPECIAL["Mage's Will"]) {
                        damage *= 1.2;
                    }
                    if (isTrue && player.armor.SPECIAL["Heat"]) {
                        damage *= 1.5;
                    }

                    if (player.CLASS === "DEMON" && player.DEMON_SACRIFICIALDRIVE) {
                        damage *= (1 + (0.05 * player.DEMON_SACRIFICIALDRIVE_LEVEL));
                    }
                    else if (name === "EntityDarkWave" && player.DEMON_SACRIFICIALDRIVE) {
                        damage *= (1 + (0.05 * player.DEMON_SACRIFICIALDRIVE_LEVEL));
                    }
                    else if (name === "EntityDreadWave" && player.DEMON_SACRIFICIALDRIVE) {
                        damage *= (1 + (0.05 * player.DEMON_SACRIFICIALDRIVE_LEVEL));
                    }
                    //End of damage calculations

                    
                    if (player.SPELL_CRITICALRETURN && critFLAG === true && isTrue === false) {

                        var randomnumber = Math.floor(Math.random() * 10);

                        if (randomnumber-100 < player.SPELL_CRITICALRETURN_LEVEL * 2) {
                            //SPAWN SAME SPELL, needs to get name of the spell
                            //Get current spell's manacost
                            var modVal = 0;
                            if (player.armor.SPECIAL["Grand Return"]) modVal += 0.25;
                            var retMP = game.CheckOverFlowHeal(player, ((player.SPELL_CRITICALRETURN_LEVEL * 0.2) + modVal) *  game.getBasicManaCost(name), 'mp');
                         
                            player.mana += retMP;
                           
                            game.damageTimer(1, '+', 'cyan');
                        }
                        
                      
                       
                    }
                    if (player.weapon.SPECIAL["Arcane Sap"]) {

                       
                            //SPAWN SAME SPELL, needs to get name of the spell
                            //Get current spell's manacost
                            var modVal = 0;
                           
                            var retMP = game.CheckOverFlowHeal(player, damage * 0.1, 'mp');

                            player.mana += retMP;
                            game.damageTimer(1, '+', 'cyan');
                        



                    }
                    if (
                        player.SPELL_CRITICALCOMBO
                       
                        && critFLAG
                        && !isDuplicate
                        ) {
                        var randomnumber = Math.floor(Math.random() * 10);

                        if (randomnumber < player.SPELL_CRITICAL_COMBO_LEVEL * 2) {
                            //SPAWN SAME SPELL, needs to get name of the spell
                            var settings = { canDuplicate: false , flip:player.flip};

                            ig.game.spawnEntity("EntityArcaneBall", player.pos.x, player.pos.y-8, settings);

                        }

                    }
                    if (player.weapon.SPECIAL["Desert Storm"] && !isDuplicate) {
                        var settings = { canDuplicate: false, flip: player.flip };
                        ig.game.spawnEntity("EntitySandMissile", player.pos.x, player.pos.y, settings);
                    }
                    if (player.weapon.SPECIAL["Backstab"] &&
                        (player.flip === other.flip)
                        ) damage *= 1.5;
                    if (player.weapon.SPECIAL["Honor"] &&
                        (player.flip === other.flip)
                        ) damage *= 0.5;
                    if (player.weapon.SPECIAL["Dull"]) damage *= 1.25;
                    if (player.weapon.SPECIAL["Blaze"]&&
                        (name === "EntityFireBlast" || name === "EntityFrostFire")
                        ) damage *= 1.2;
                    if (player.weapon.SPECIAL["Ember Pyre"] && isTrue) {
                        damage *= 1.5;
                    }
                    if (player.weapon.SPECIAL["Hero's Protection"]) {
                        var randomnumber4 = Math.floor(Math.random() * 5);

                        if (randomnumber4 === 0) {
                            var retMP = game.CheckOverFlowHeal(player, player.Maxmana * 0.1, 'mp');
                            player.mana += retMP;
                            //game.damageTimer(1, '+' + ((Math.round(quarterPercentDamage * 10) / 10)), 'cyan');
                            game.damageTimer(1, '+', 'cyan');

                            var retHP = game.CheckOverFlowHeal(player, player.Maxhealth * 0.1, 'hp');
                            player.health += retHP;
                            //game.damageTimer(1, '+' + ((Math.round(quarterPercentDamage * 10) / 10)), 'cyan');
                            game.damageTimer(1, '+', 'green');
                        }
                    }
                 
                    if(player.weapon.SPECIAL["Emberburn"] &&
                        isTrue === true && critFlag === true) {
                        var quarterPercentDamage = player.Maxmana * 0.02;
                        var retMP = game.CheckOverFlowHeal(player, quarterPercentDamage, 'mp');
                        player.mana += retMP;
                        //game.damageTimer(1, '+' + ((Math.round(quarterPercentDamage * 10) / 10)), 'cyan');
                        game.damageTimer(1, '+', 'cyan');
                    }
                   
                    if (player.weapon.SPECIAL["Demonic"]) damage *= 1.2;
                    if (player.shield.SPECIAL["Focus Strength"]) damage *= 1.15;
                    if (player.weapon.SPECIAL["Superiority"]) {
                        if (other.name === "boss") {
                            if (other.Acthealth < player.health) damage *= 1.15;
                        }
                        else{
                            if (other.health< player.health ) damage *= 1.15;
                        }
                    }

                    

                    if (player.weapon.SPECIAL["Legendary Spring"]
                        && other.chillInvoked === true) {
                      
                        var retMP = game.CheckOverFlowHeal(player, player.Maxmana  * 0.04, 'mp');
                        player.mana += retMP;
                        //game.damageTimer(1, '+' + ((Math.round(quarterPercentDamage * 10) / 10)), 'cyan');
                        game.damageTimer(1, '+', 'cyan');

                        var retHP = game.CheckOverFlowHeal(player, player.Maxhealth * 0.04, 'hp');
                        player.health += retHP;
                        //game.damageTimer(1, '+' + ((Math.round(quarterPercentDamage * 10) / 10)), 'cyan');
                        game.damageTimer(1, '+', 'green');
                    }
                    if (name === "EntityShockwave" && player.armor.SPECIAL["Shock Therapy"]) {
                        var retMP = game.CheckOverFlowHeal(player, 10, 'mp');
                        player.mana += retMP;
                        //game.damageTimer(1, '+' + ((Math.round(quarterPercentDamage * 10) / 10)), 'cyan');
                        game.damageTimer(1, '+', 'cyan');
                    }
                    //Vampiric Effects

                    if (player.VAMPIRIC > 0) {
                        var retHP = game.CheckOverFlowHeal(player, damage * (player.VAMPIRIC/100), 'hp');
                        player.health += retHP;
                        //game.damageTimer(1, '+' + ((Math.round(quarterPercentDamage * 10) / 10)), 'green');
                        game.damageTimer(1, '+', 'green');
                    }
                    if (player.shield.SPECIAL["Demonic Leech"]) {
                        var retMP = game.CheckOverFlowHeal(player, damage * 0.03, 'mp');
                        player.mana += retMP;
                        //game.damageTimer(1, '+' + ((Math.round(quarterPercentDamage * 10) / 10)), 'cyan');
                        game.damageTimer(1, '+', 'cyan');
                    }
                  


                    var color = "white";
                    var Timer_damage = Math.round(damage * 10) / 10;
                    if (isTrue == true && critFLAG == true) {

                        color = "burning_orange";
                        game.checkDamage(other, this, type, Timer_damage, false, isTrue, color);
                    }
                    else if (isTrue == true) {

                        color = "burning_orange";
                        game.checkDamage(other, this, type, Timer_damage, false, isTrue, color);
                    }
                    else if (critFLAG == true) {

                        color = "orange";
                        game.checkDamage(other, this, type, Timer_damage, false, isTrue, color);
                    }
                    else {

                        game.checkDamage(other, this, type, Timer_damage, false, isTrue, color);
                    }

                    //Check enemy defenses




                    if (isTrue == true) { callback(damage, other); }
                    else { callback(damage); }
                }
            },
            calcManaCost: function (currentActionSkill, currentActionManacost,state) {
                var player = ig.game.player;
                //Add manacost modifiers
                var canCast = false;
                var life_canCast = true;

                //Life as a manacost
                if (player.weapon.SPECIAL["Demonic"] && Math.floor(player.health - player.Maxhealth * 0.05) <= 0) {
                    life_canCast = false;
                }
           
                //If demon class
                if (player.CLASS === "DEMON") {

                    var modifier3 = 1;

                    if (player.DEMON_SACRIFICIALDRIVE) {
                        modifier3 += 0.04 * player.DEMON_SACRIFICIALDRIVE_LEVEL;
                    }
                    if (currentActionSkill === "EntityDemonSlash") {

                        if (Math.floor(player.health - (player.Maxhealth * 0.15*modifier3)) <= 0) {
                            life_canCast = false;
                        }

                    }
                    
                    else if ((currentActionManacost*modifier3) < player.health) {
                        life_canCast = true;
                    }
                }
                var modifier4 = 1;

                if (player.DEMON_SACRIFICIALDRIVE) {
                    modifier4 += 0.04 * player.DEMON_SACRIFICIALDRIVE_LEVEL;
                }
                if (currentActionSkill === "EntityDarkWave") {

                    if (Math.floor(player.health - (player.Maxhealth * 0.15 * modifier4)) <= 0) {
                        life_canCast = false;
                    }

                }
                else if (currentActionSkill === "EntityDreadWave") {

                    if (Math.floor(player.health - (player.Maxhealth * 0.3*modifier4)) <= 0) {
                        life_canCast = false;
                    }

                }
                //Dynamic manacosts 
                


                if (currentActionSkill === "EntityRadiance") {

                    if (player.weapon.SPECIAL["Wise Radiance"]) currentActionManacost = player.Maxmana * 0.7;
                    else currentActionManacost = player.Maxmana * 0.9;
                }


                if (currentActionSkill === 'EntityFireBlast' || currentActionSkill === 'EntityFrostFire') {

                    if (player.weapon.SPECIAL["Blaze"]) currentActionManacost *= 1.2;
                  

                }
                if (currentActionSkill === "EntityFrostball" ||
                    currentActionSkill === 'EntityFireBlast' || 
                    currentActionSkill === 'EntityFrostFire') {
                    if (player.weapon.SPECIAL["Elemental Focus"]) { currentActionManacost *= 0.8; }
                }
              
                if (player.weapon.SPECIAL["Chromatic Focus"]) { currentActionManacost *= 0.9; }
                if (player.shield.SPECIAL["Sage's Will"]) { currentActionManacost *= 0.5; }
                if (state && state === "getState") {
                    if (currentActionManacost <= player.mana  && life_canCast === true) canCast = true;

                    return canCast;
                }
                else if (state && state === "reduceMana") {
                    //DEMON Class doesn't have mana
                    if (currentActionManacost <= player.mana && player.CLASS !== "DEMON") {
                     
                        player.mana -= currentActionManacost;
                    }
                    if (player.weapon.SPECIAL["Demonic"] &&  Math.floor(player.health - player.health * 0.05) > 0) {
                        player.health -= player.health * 0.05;
                        player.health = Math.floor(player.health);
                    }
                    if (player.CLASS === "DEMON") {

                        var modifier = 1;

                        if (player.DEMON_SACRIFICIALDRIVE) {
                            modifier += 0.04 * player.DEMON_SACRIFICIALDRIVE_LEVEL;
                        }
                        if(currentActionSkill === "EntityDemonSlash"){
                            player.health -= (player.Maxhealth * 0.05) * modifier;
                        }
                        
                        else {
                            player.health -= currentActionManacost * modifier
                        }
                    }
                    var modifier2 = 1;
                    if (player.DEMON_SACRIFICIALDRIVE) {
                        modifier2 += 0.04 * player.DEMON_SACRIFICIALDRIVE_LEVEL;
                    }
                    if (currentActionSkill === "EntityDarkWave") {
                        player.health -= (player.Maxhealth * 0.15) * modifier2;
                    }
                    else if (currentActionSkill === "EntityDreadWave") {
                        player.health -= (player.Maxhealth * 0.3) * modifier2;
                    }
                }
                else {
                    var modifier5 = 1;
                    if (player.DEMON_SACRIFICIALDRIVE) {
                        modifier5 += 0.04 * player.DEMON_SACRIFICIALDRIVE_LEVEL;
                    }
                    if (currentActionSkill === "EntityDarkWave") {
                        return (0.15*player.Maxhealth*modifier5);
                    }  
                    else if (currentActionSkill === "EntityDreadWave") {
                        return (0.3 * player.Maxhealth * modifier5);
                    }
                    else if (currentActionSkill === "EntityDemonSlash") {
                        return (0.05 * player.Maxhealth * modifier5);
                    }
                    else {
                        return currentActionManacost;
                    }
                  
                
                }
            


            },
            textWriterTimer: null,
            textWriterTile: 0,
            textWriterState: '',

            
            introText: '',
            textWriterFunc: function(){

                

                if (ig.game.textWriterState === 'introState1' && ig.game.introText != 'The land of Supra was at peace.') {
                    ig.game.introText = 'The land of Supra was at peace.';
                    ig.game.textWriterTile = 0;
              
                }
                else if (ig.game.textWriterState === 'introState2' && ig.game.introText != 'Until the Demon Knights.') {
                    ig.game.introText = 'Until the Demon Knights.';
                    ig.game.textWriterTile = 0;
                }
                else if (ig.game.textWriterState === 'introState3' && ig.game.introText != 'Kingdoms fell.') {
                    ig.game.introText = 'Kingdoms fell.';
                    ig.game.textWriterTile = 0;
                  
                }
                else if (ig.game.textWriterState === 'introState4' && ig.game.introText != '') {
                    ig.game.introText = '';
                    ig.game.textWriterTile = 0;
            
                }
            /*    else if (ig.game.textWriterState === 'introState5') introText = 'You have to escape!';
                else if (ig.game.textWriterState === 'introState6') introText = 'Guess we are late.';
                else if (ig.game.textWriterState === 'introState7') introText = 'Oilver, deal with this human.';*/
         
              
                if (!ig.game.textWriterTimer) {
                    ig.game.textWriterTimer = new ig.Timer();
                    ig.game.textWriterTimer.set(0.07);
                }

                else if (ig.game.introText.length > (ig.game.textWriterTile) && ig.game.textWriterTimer.delta() > 0) {
                    ig.game.textWriterTimer.set(0.07);
                    ig.game.textWriterTile++;


                }
                if(ig.game.textWriterState !== 'introState5' && ig.game.textWriterTile > 0)ig.game.font.draw(ig.game.introText.substr(0, ig.game.textWriterTile), 50, 125);
                /*

                var introText = 'Until the Demon Knights came.';

                var introText3 = 'Kingdoms fell one by one, and all but one was left.'

                var introText4 = 'Our tale starts at the siege of the last kingdom, Everia.'


                var introText5 = 'We cannot hold them!';


                var introText6 = 'You have to escape with the [ORB].';

                var introText7 = 'Guess we are late.';

                var introText8 = "Oilver, deal with this trash.";
                */
            },
            getBasicManaCost: function(name){

                if (name === "EntityWeakSlash") return ig.game.calcManaCost(name, 3);
                else if (name === "EntityPlayerSlash") return ig.game.calcManaCost(name, 4);
                else if (name === "EntityShockpulse") return ig.game.calcManaCost(name, 10);
                else if (name === "EntityLifeSlash") return ig.game.calcManaCost(name, 1);
                else if (name === "EntityFrostball") return ig.game.calcManaCost(name, 10);
                else if (name === "EntityFireBlast") return ig.game.calcManaCost(name, 15);
                else if (name === "EntityArcaneBall") return ig.game.calcManaCost(name, 50);
                else if (name === "EntityFrostFire") return ig.game.calcManaCost(name, 25);
                else if (name === "EntityRadiance") return ig.game.calcManaCost(name, 0);
                else if (name === "EntityDemonSlash") return ig.game.calcManaCost(name, 0);
                else if (name === "EntityDarkWave") return ig.game.calcManaCost(name, 0);
                else if (name === "EntityDreadWave") return ig.game.calcManaCost(name, 0);

            },
            burningCalc: function (obj) {
                if (obj) {
                    if (obj.IsBurning === true) {
                        if (obj.frameCalc == 20) {
                            var AttackModifier = 0;
                            var BurningDamageTick = 0.0;
                            //Check talent burning specific talent modifiers

                          
                            ig.game.spawnEntity(EntityDeathExplosion, obj.pos.x - 2, obj.pos.y + 2, { colorOffset: 14 });

                            

                            BurningDamageTick = (obj.BurningDMG / 3); 
                          
                            if (BurningDamageTick < 1) { BurningDamageTick = 1; }
                            ig.game.CalculateDamage(ig.game.player, BurningDamageTick, obj, function (data, target) {

                                target.receiveDamage(data, ig.game.player);

                            }, true);
                            obj.frameCalc = 0;
                        } else { obj.frameCalc++; }

                    }
                    if (obj.resetBurn.delta() > 0 && obj.IsBurning == true) { obj.IsBurning = false; }
                }
            },
            //Check if healing will overflow
            CheckOverFlowHeal: function (object, value, checkType) {
                var retVal = 0;
                switch (checkType) {
                    case 'hp':
                        retVal = ((object.health + value) <= object.Maxhealth) ? value : (object.Maxhealth - object.health);
                        break;
                    case 'mp':
                        retVal = ((object.mana + value) <= object.Maxmana) ? value : (object.Maxmana - object.mana);
                        break;
                    default:
                        break;
                }
                return retVal;
            },
            destroyBossWalls: function () {
                var i_len = ig.game.entities.length;
                while(i_len--) {

                    if (ig.game.entities[i_len].name === "BossWall") ig.game.entities[i_len].kill();

                }
            },
            menuOpen: function (mod) {
                var retVal = false;
                var game = ig.game;
                //Check if any of these is open
                if (mod) {
                    if (mod == 'game_menu') {
                        retVal = ((!game.equip_menu && !game.item_menu && !game.setting_menu && !game.save_menu && !game.status_menu &&
                        !game.life_talents_menu && !game.magic_talents_menu && !game.blade_talents_menu && !game.demon_talents_menu && !game.talentHUD
                         && !game.skillMenu1Selected && !game.skillMenu2Selected && !game.skill_menu && !game.classSelection)) ? true : false;
                    }

                    else if (mod == 'skillmenu') {
                        retVal = ((!game.equip_menu && !game.item_menu && !game.setting_menu && !game.save_menu && !game.status_menu &&
                        !game.life_talents_menu && !game.magic_talents_menu && !game.blade_talents_menu && !game.demon_talents_menu && !game.talentHUD
                         && !game.classSelection)) ? true : false;
                    }

                }

                else {
                    retVal = ((!game.classSelection && !game.game_menu && !game.equip_menu && !game.item_menu && !game.setting_menu && !game.save_menu && !game.status_menu &&
                    !game.life_talents_menu && !game.magic_talents_menu && !game.blade_talents_menu && !game.demon_talents_menu && !game.talentHUD
                     && !game.skillMenu1Selected && !game.skillMenu2Selected && !game.skill_menu && !game.LevelSelect && !game.Main_Menu && !game.hopOver)) ? true : false;
                }


                return retVal;
            },
            checkRES: function (mod, sRES, BLK, damage) {
                var Blocked = false;
             
                if (mod) sRES *= mod;

                if (ig.game.player) {
                    if (ig.game.player.shield.SPECIAL["Focus Strength"]) sRES *= 0.5;
                    if (ig.game.player.shield.SPECIAL["Heavy S"]) sRES *= 1.25;
                }
                



                if (sRES) {
                    sRES = (sRES > 95) ? 95 : sRES
                    damage -= (damage * (sRES / 100));
                }
                if (BLK) {


                    var randomnumber_2 = Math.floor(Math.random() * 101);
                    if (randomnumber_2 < BLK) {
                        damage *= 0.5;

                        Blocked = true;
                    }
                }
                var retA = { damage: damage, isBlocked: Blocked }
                return retA;
            },


            splitCheck: function (array, mod) {
                var arrayL = array.length;
                if (mod == null) { mod = 0; }
                if (arrayL > 4 + mod) {
                    array.splice(4, arrayL - 4);
                    array.push('.');
                }
                array.push('\n');
                return array;
            },
            checkCharLength: function (string_v) {
                var short_char_m = 0;
               

                if (string_v && string_v !== '') {
                //    short_char_m += (string_v.indexOf('Light') == 'Light') ? 1 : 0;

                    var buffer_a = string_v.split('');
                    var buffer_a_L = buffer_a.length;
                    var split_point = -1;
                    for (var i = 0; i < buffer_a_L; i++) {

                        if (buffer_a[i] == buffer_a[i].toUpperCase() && i != 0)
                        { split_point = i; break; }

                    }

                    if (split_point < 0) {

                        buffer_a = ig.game.splitCheck(buffer_a, short_char_m);
                        string_v = buffer_a.join("");

                    } else {

                        buffer_a.splice(split_point, 0, ':');

                        var joined_a = buffer_a.join("");
                        var separ_a = joined_a.split(":");

                        var first_p = separ_a[0];
                        var second_p = separ_a[1];
                        var first_a = ig.game.splitCheck(first_p.split(""), short_char_m);
                        var second_a = ig.game.splitCheck(second_p.split(""), short_char_m);
                        var final_a = first_a.concat(second_a);
                        string_v = final_a.join("");
                    }
                } else { string_v = ""; }
                return string_v;

            },
            checkCharLength_E: function (string_v) {
               
                if (string_v && string_v !== '') {
                    var buffer_a = string_v.split('');
                    var buffer_a_L = buffer_a.length;
                    for (var i = 0; i < buffer_a_L; i++) {
                        if (buffer_a[i] == buffer_a[i].toUpperCase() && i != 0) {
                            buffer_a.splice(i, 0, '\n');
                            break;
                        }
                    }

                    string_v = buffer_a.join("");
                } else { string_v = "EMPTY"; }
                return string_v;
            },
            
            getSelectionUp: function (value) {
                if (!ig.game.maxLevels) ig.game.maxLevels = 0;
                if (ig.game.maxLevels !== null && ig.game.maxLevels < value) {
                    ig.game.maxLevels = value;
                   
                }
            },
            deleteLevelUp: function () {
              
                var ent_a = ig.game.getEntityByName("lvlup");
                if (ent_a) { ent_a.kill(); }
                ig.game.InformLevelUp = false;
                ig.game.LevelUpInfo = false;
            },

            checkIfEnding: function (isSellMenu) {
                var retVal = false;
                var game = ig.game;



                if (isSellMenu) {
                    if (game.EndScreen == false
                        && game.EndScreen_WinterWitch == false
                        && game.EndScreen_Finale == false

                        && game.EndScreen_Elemental == false
                        && game.EndScreen_VoidZone == false) {
                        retVal = true;
                    }
                }

                else {
                    if (game.EndScreen == false
                        && game.EndScreen_WinterWitch == false
                        && game.EndScreen_Finale == false
                        && game.SellMenu == false
                        && game.EndScreen_Elemental == false
                        && game.EndScreen_VoidZone == false) {
                        retVal = true;
                    }
                }


                return retVal;
            },
            checkEvents: function (data) {
                return;
                var killEvents = null;
                var chestEvents = null;
                var skillEvents = null;
                if (data) {
                    killEvents = data["killEvents"];
                    chestEvents = data["chestEvents"];
                    skillEvents = data["skillEvents"];
                }
                else if (ig.game.player)
                {
                    killEvents = ig.game.player.killEvents;
                    chestEvents = ig.game.player.chestEvents;
                    skillEvents = ig.game.player.skillEvents;
                }
                else {
                    return;
                }

                var eventsDone = 0;
                if (killEvents.monsterKills > 0) { ig.game.player.completeList["monsterKills"] = true; }
                if (killEvents.knightKills > 0) { eventsDone += 1; }
                if (killEvents.wizardKills > 0) { eventsDone += 1; }

                

              
                // 10 more normal units
                // 3 more bosses
                // 28 armor -1
                // 22 shield - 2 ("Hero's shield")
                // 27 sword - 1
                // 73 items total
                eventsDone += chestEvents.chestPicked; //49 - 3 max
                ig.game.availableEvents = 118;

                ig.game.completeMeter = (Math.ceil((eventsDone / ig.game.availableEvents) * 100));
                if (eventsDone < ig.game.availableEvents && ig.game.completeMeter >= 100) { ig.game.completeMeter = 99; }

                ig.game.completeMeterAmount = eventsDone;






            },
            requestLevelChange: function (level) {
                window.external.notify(level);
            },
            clearStorage: function () {
                return;
                for (var j = localStorage.length - 1; 0 <= j; j--) {
                    (localStorage.key(j) == "SUPRARPG_TRANSACTION_ARRAY" ||
                    localStorage.key(j) == "SUPRARPG_GOLD"
                     || localStorage.key(j) == "buttonScheme"
                     || localStorage.key(j) == "version"
                     || localStorage.key(j) == "checkedAlready"
                     ) ? false : localStorage.removeItem(localStorage.key(j));

                }
            },

            destroyTimerArray: function () {
                if (ig.game.dmgTextArray[0])
                { ig.game.dmgTextArray.splice(0, ig, game.dmgTextArray.length); }
                if (ig.game.dmgAmountArray[0]) {
                    ig.game.dmgAmountArray.splice(0, ig.game.dmgAmountArray.length);
                }
                if (ig.game.dmgColorArray[0]) {
                    ig.game.dmgColorArray.splice(0, ig.game.dmgColorArray.length);
                }




            },

            CalculateStats: function (player,equipCheck,potentialItem) {





                if (!ig.game.player) return;
                //Empty Buffs
                if (!equipCheck) {
                    ig.game.emptyBuffs();
                   
                }
                else {
                    if (potentialItem) {
                        if (potentialItem.isSword) {
                            player.weapon   = potentialItem;
                            player.armor    = ig.game.player.armor;
                            player.shield   = ig.game.player.shield;
                        }
                        else if (potentialItem.isShield) {
                            player.weapon   = ig.game.player.weapon;
                            player.armor    = ig.game.player.armor;
                            player.shield   = potentialItem;
                        }
                        else if (potentialItem.isArmor) {
                            player.weapon   = ig.game.player.weapon;
                            player.armor    = potentialItem;
                            player.shield   = ig.game.player.shield;
                        }
                    }
                    
                }
              
             
                player.STR = player.BASE_STR;
                player.AGI = player.BASE_AGI;
                player.INT = player.BASE_INT;

                player.ATK = player.BASE_ATK;
                player.MATK = player.BASE_MATK;
                player.MCRIT = player.BASE_MCRIT;
                player.RES = player.BASE_RES;
                player.ATKSPEED = player.BASE_ATKSPEED;
                player.MAG_RES = player.BASE_MAG_RES;
                player.Maxhealth = player.BASE_HP;
                player.Maxmana = player.BASE_MP;
                player.VAMPIRIC = player.BASE_VAMPIRIC;
                player.MANA_REGEN = player.BASE_MANA_REGEN;
                player.HP_REGEN = player.BASE_HP_REGEN;
                player.BLK_AMOUNT = player.BASE_BLK_AMOUNT;

                player.DBLATKCHC = player.BASE_DBLATKCHC;
                player.CRIT_DAMAGE = player.BASE_CRIT_DAMAGE;
                player.MCRIT_DAMAGE = player.BASE_MCRIT_DAMAGE;
                player.CRIT = player.BASE_CRIT;
                player.maxVel.x = player.BASE_MAX_VEL_X;
                player.accelGround = player.BASE_ACCEL_G;
                player.accelAir = player.BASE_ACCEL_A;
                player.BLK = player.BASE_BLK;

                player.spellVelo = 1;
                player.spellCD = 1;
                //Set base specialities
                
                              
                

                player.SPEED_M = 0;


                //Not that the values are initialized check the levelupped stats;
                
                var levelUpHP = ig.game.player.BASE_HP - 100;
                var levelUpMP = ig.game.player.BASE_MP - 50;
                if (player.weapon !== null) {
                    var special_a = player.weapon.SPECIAL;
               
                    var weaponSTR = 0;
                    weaponSTR = player.weapon.STR;
                    weaponINT = player.weapon.INT;
                    weaponAGI = player.weapon.AGI;
                    if (ig.game.player.BLADE_AXESPECIALIST && player.weapon.Wtype && player.weapon.Wtype === "AXE")
                    {
                        weaponSTR *= (1 + (ig.game.player.BLADE_AXESPECIALIST_LEVEL * 0.1));
                    }
                    else if (ig.game.player.BLADE_SWORDSPECIALIST && player.weapon.Wtype && player.weapon.Wtype === "SWORD") {
                        weaponAGI *= (1 + (ig.game.player.BLADE_SWORDSPECIALIST_LEVEL * 0.1));
                    }
                    var weaponMod = 1;
                    
                    player.ATK += player.weapon.ATK * weaponMod;
                    player.STR += player.weapon.STR;
                    player.AGI += player.weapon.AGI;
                    player.INT += player.weapon.INT;
                    player.MATK += player.weapon.MATK;
                    player.MCRIT += player.weapon.MCRIT;

                    player.RES += player.weapon.RES;
                    player.VAPIRIC += player.weapon.VAMPIRIC;
                    player.MAG_RES += player.weapon.M_RES;
                    player.Maxhealth += player.weapon.HP;
                    player.Maxmana += player.weapon.MP;

                    player.MANA_REGEN += player.weapon.MP_R;
                    player.HP_REGEN += player.weapon.HP_R;
                    player.CRIT += player.weapon.CRIT_CHANCE;
                    player.CRIT_DAMAGE += player.weapon.CRIT_DAMAGE;
                    player.MCRIT_DAMAGE += player.weapon.MCRIT_DAMAGE;
                    player.BLK += player.weapon.BLK;
                    player.BLK_AMOUNT += player.weapon.BLK_AMOUNT;
                    player.VAMPIRIC += player.weapon.VAMPIRIC;


                }
               
                if (player.shield !== null) {

                  
                    
                    player.ATK += player.shield.ATK;
                
                    player.STR += player.shield.STR;
                    player.AGI += player.shield.AGI;
                    player.INT += player.shield.INT;
                    player.MATK += player.shield.MATK;
                    player.MCRIT += player.shield.MCRIT;

                    player.RES += player.shield.RES;

                    player.MAG_RES += player.shield.M_RES;
                    player.Maxhealth += player.shield.HP;
                    player.Maxmana += player.shield.MP;
                    player.VAPIRIC += player.shield.VAMPIRIC;
                    player.MANA_REGEN += player.shield.MP_R;
                    player.HP_REGEN += player.shield.HP_R;

                    player.CRIT += player.shield.CRIT_CHANCE;
                    player.CRIT_DAMAGE += player.shield.CRIT_DAMAGE;
                    player.MCRIT_DAMAGE += player.shield.MCRIT_DAMAGE;
              

                
                    
                    player.BLK += player.shield.BLK ;
                    player.BLK_AMOUNT += player.shield.BLK_AMOUNT;
                    player.VAMPIRIC += player.shield.VAMPIRIC;

                }
             
                if (player.armor !== null) {
                   
                   
                    player.ATK += player.armor.ATK;
                 
                    player.STR += player.armor.STR;
                    player.AGI += player.armor.AGI;
                    player.INT += player.armor.INT;
                    player.MATK += player.armor.MATK;
                    player.MCRIT += player.armor.MCRIT;

                    player.RES += player.armor.RES;
                    player.VAPIRIC += player.armor.VAMPIRIC;
                    player.MAG_RES += player.armor.M_RES;
                    player.Maxhealth += player.armor.HP;
                    player.Maxmana += player.armor.MP;

                    player.MANA_REGEN += player.armor.MP_R;
                    player.HP_REGEN += player.armor.HP_R;

                    player.CRIT += player.armor.CRIT_CHANCE;
                    player.CRIT_DAMAGE += player.armor.CRIT_DAMAGE;
                    player.MCRIT_DAMAGE += player.armor.MCRIT_DAMAGE;
                    player.BLK += player.armor.BLK;

                    player.BLK_AMOUNT += player.armor.BLK_AMOUNT;
                    player.VAMPIRIC += player.armor.VAMPIRIC;

                }
           
                //Check Weapon Specialities
                var STRMOD = 1;
                var INTMOD = 1;
                var AGIMOD = 1;
                var HPRMOD = 1;
                var MPRMOD = 1;
                var HPMOD = 1;
                var MPMOD = 1;
                var RESMOD = 1;
                var MRESMOD = 1;
                var CRITMOD = 1;
                var MCRITMOD = 1;
                var CRITDMOD = 1;
                var MCRITDMOD = 1;
                var BLKMOD = 1;
                var BLKAMOD = 1;
                //Chage mov. speed according to modifier, if modifier "0" no change
                //I.E. Heavy, Light and VeryHeavy calculated here
           

               
           

                var s_modifier = (100 + (player.SPEED_M * 20));
                var s_modifier_p = (s_modifier / 100);
                if (s_modifier < 0) { s_modifier = 0; }



                player.maxVel.x *= s_modifier_p;
                player.accelAir *= s_modifier_p;
                player.accelGround *= s_modifier_p;


                 

               
                if (player.weapon.SPECIAL["Grudge"]) {
                    if (player.killEvents.totalKills > 20) {
                        HPMOD -= 0.1;
                    }
                    else if (player.killEvents.totalKills > 40) {
                        HPMOD -= 0.2;
                    }
                    else if (player.killEvents.totalKills > 80) {
                        HPMOD -= 0.3;
                    }
                    else if (player.killEvents.totalKills > 160) {
                        HPMOD -= 0.4;
                    }
                    else if (player.killEvents.totalKills > 320) {
                        HPMOD -= 0.5;
                    }
                }

                if (player.weapon.SPECIAL["Demonic Blessing"]) {
                    HPMOD += 0.35;
                }
                if (ig.game.player.LIFE_BURNINGHEART) {
                    STRMOD += ((ig.game.player.LIFE_BURNINGHEART_LEVEL * 0.01));
                    INTMOD += ((ig.game.player.LIFE_BURNINGHEART_LEVEL * 0.01));
                }

               
               
                if (ig.game.player.LIFE_CALMMIND) {
                  
                    if (player.armor.SPECIAL["Redemption"]) {
                        STRMOD += ((ig.game.player.LIFE_CALMMIND_LEVEL * 0.05));
                        INTMOD += ((ig.game.player.LIFE_CALMMIND_LEVEL * 0.05));
                    }
                    else {
                        STRMOD += ((ig.game.player.LIFE_CALMMIND_LEVEL * 0.08));
                        INTMOD += ((ig.game.player.LIFE_CALMMIND_LEVEL * 0.08));
                    }
                    STRMOD += ((ig.game.player.LIFE_CALMMIND_LEVEL * 0.08));
                    INTMOD += ((ig.game.player.LIFE_CALMMIND_LEVEL * 0.08));
                }
                //Vigor
                if (ig.game.player.BLADE_VIGOR) {
                    player.STR += ((ig.game.player.BLADE_VIGOR_LEVEL * 2));
                    player.AGI += ((ig.game.player.BLADE_VIGOR_LEVEL * 2));
                }
                if (ig.game.player.SPELL_INTELLIGENCE > 0) {
                    INTMOD += ((ig.game.player.SPELL_INTELLIGENCE_LEVEL * 0.03));
                 
                }
               
                player.STR *= STRMOD;
                player.INT *= INTMOD;
                player.AGI *= AGIMOD;

              /*
             
                player.RES += player.STR * STRTORESMOD;
               
                player.MATK += player.INT * INTTOMATKMOD;
                player.MAG_RES += player.MAG_RES * INTTOMRESMOD;

                player.MCRIT += player.MCRIT * INTTOMCRITMOD;
        
         */
                player.CRIT += player.AGI * AGITOCRITMOD;
              

                player.HP_REGEN += 2;
                player.MANA_REGEN += 2;

                if (player.shield.SPECIAL["Greatworm's Heart"] && player) {
                    player.HP_REGEN = Math.floor(ig.game.player.Maxhealth * 0.12);

                }
                if (player.weapon.SPECIAL["Relife"] && player) {
                    player.HP_REGEN = Math.floor(ig.game.player.Maxhealth * 0.10);

                }
               
                if (ig.game.player.LIFE_LASTSTAND > 0) {
                    player.RES += (ig.game.player.LIFE_LASTSTAND_LEVEL * 5);
                    player.MAG_RES += (ig.game.player.LIFE_LASTSTAND_LEVEL * 5);
                }
                if (ig.game.player.LIFE_WALLOFJUSTICE > 0) {
                    player.BLK += (ig.game.player.LIFE_WALLOFJUSTICE_LEVEL * 4);
                    BLKAMOD += 0.5;
                }

                if (ig.game.player.LIFE_LIFESPIRIT) {
                    HPMOD += ((ig.game.player.LIFE_LIFESPIRIT_LEVEL * 0.02));
                    MPMOD += ((ig.game.player.LIFE_LIFESPIRIT_LEVEL * 0.02));
                }

                if (ig.game.player.BLADE_FLURRY) {
                    player.CRIT += ((ig.game.player.BLADE_FLURRY_LEVEL * 2));
                }
                if (player.shield.SPECIAL["Grand Energy"]) {

                    player.CRIT += 40;
                }
                if (player.shield.SPECIAL["Insanity"]) {

                    player.CRIT += 25;
                }
                if (ig.game.player.BLADE_DOUBLEATTACK) {
                    player.DBLATKCHC += (ig.game.player.BLADE_DOUBLEATTACK_LEVEL * 4);
                }

                if (ig.game.player.BLADE_SWORDSPECIALIST) {
                    player.DBLATKCHC += (ig.game.player.BLADE_SWORDSPECIALIST_LEVEL * 3);

                }
                if (player.weapon.SPECIAL["Time Warp"]) {
                    player.DBLATKCHC += 8;

                }
                if (player.armor.SPECIAL["Berserk"]) {
                    player.DBLATKCHC += 15;

                }
                if (ig.game.player.SPELL_FOCUS) {
                    player.MANA_REGEN += (ig.game.player.SPELL_FOCUS_LEVEL * 1);
                    
                }

                
                if (ig.game.player.SPELL_ENDLESSPOOL) {
                    MPMOD += ((ig.game.player.SPELL_ENDLESSPOOL_LEVEL * 0.05));
                }


                //Item specialities

                //Weapons
        
                if (player.weapon.SPECIAL["Vampiric"]) player.VAMPIRIC += 3;
                
                if (ig.game.player.DEMON_VAMPIRISM) {
                    player.VAMPIRIC += ig.game.player.DEMON_VAMPIRISM_LEVEL * 2;
                }
              
              

                //Convert stats (Multiplication);
                if (player.weapon.SPECIAL["Fury"]) {
                    CRITMOD  -= 0.5;
                    MCRITMOD -= 0.5;
                    CRITDMOD += 1;
                    CRITDMOD += 1;
                }
             
                if (ig.game.player.BLADE_PHANTOMSTRIKES) {
                    player.DBLATKCHC += player.CRIT;

                }
               
               
                
                //Multiplication calc
                if (ig.game.player.LIFE_CALMMIND) {

                    if (!player.armor.SPECIAL["Redemption"]) CRITMOD -= 0.5;
                    
                   
                }


                if (ig.game.player.DEMON_DEMONICFORTITUDE) {
                    player.HP_REGEN += ig.game.player.DEMON_DEMONICFORTITUDE_LEVEL
                }

                if (player.name === "dummy") {
                    player.Maxhealth += levelUpHP;
                    player.Maxmana += levelUpMP;
                }
                //Check to avoid unnecessary calculations
                //Increase max health from 0-25%
                if (ig.game.player.CLASS === "BLADE") {
                    player.STR *= 1.25;
                    player.INT *= 0.25;
                    player.AGI *= 1.25;

                    player.Maxhealth *= 1.25;
                    player.Maxmana *= 0.5;
                    player.HP_REGEN *= 1;
                    player.MANA_REGEN *= 0.50;

                }
                else if (ig.game.player.CLASS === "WIZARD") {
                    player.STR *= 0.25;
                    player.INT *= 1.5;
                    player.AGI *= 0.25;

                    player.Maxhealth *= 0.75;
                    player.Maxmana *= 1;
                    player.HP_REGEN *= 0.5;
                    player.MANA_REGEN *= 1.5;
                }
                else if (ig.game.player.CLASS === "LIFE") {
                    player.STR *= 0.95;
                    player.INT *= 0.95;
                    player.AGI *= 0.20;

                    player.Maxhealth *= 1;
                    player.Maxmana *= 0.9;
                    player.HP_REGEN *= 0.85;
                    player.MANA_REGEN *= 1.15;
                }
                else if (ig.game.player.CLASS === "DEMON") {
                    player.STR *= 1.5;
                    player.INT *= 0;
                    player.AGI *= 0.75;

                    player.Maxhealth *= 1.2;
                    player.Maxmana *= 0.2;
                    player.HP_REGEN *= 1.2;

                 
                    player.MANA_REGEN *= 0.2;
             }  
                
             
                player.Maxhealth *= HPMOD;
                player.Maxmana *= MPMOD;
                player.HP_REGEN *= HPRMOD;
                player.MANA_REGEN *= MPRMOD;
               
            
                player.RES *= RESMOD;
                player.MAG_RES *= MRESMOD;

                player.CRIT *= CRITMOD;
                player.MCRIT *= MCRITMOD;

                player.CRIT_DAMAGE *= CRITDMOD;
                player.MCRIT_DAMAGE *= MCRITDMOD;
               
                player.BLK *= BLKMOD;

                //Mana R to Health R conversion

                if (ig.game.player.DEMON_DEMONBLOOD) {
              
                    player.HP_REGEN += ig.game.player.DEMON_DEMONBLOOD_LEVEL * (player.MANA_REGEN * 0.8);
                }
             //   player.BLK_AMOUNT *= BLKAMOD;
               
                //Maximum for normal RES
                if (player.RES > 90) { player.RES = 90; }
                else if (player.RES < 0) { player.RES = 0; }
                if (player.MAG_RES > 90) { player.MAG_RES = 90; }
                else if (player.MAG_RES < 0) { player.MAG_RES = 0; }

                //Maximum for critical %
                if (player.CRIT > 100) { player.CRIT = 100; }
                else if (player.CRIT < 0) { player.CRIT = 0; }
                //Maximum for block %
                if (player.BLK > 90) { player.BLK = 90; }
                else if (player.BLK < 0) { player.BLK = 0; }

               // if (player.BLK_AMOUNT > 90) { player.BLK_AMOUNT = 90; }
                else if (player.BLK_AMOUNT < 0) { player.BLK_AMOUNT = 0; }

              // if(player.addAnim) player.addAnim('attack', player.ATKSPEED/5, [10, 11, 12, 13, 14]);
                if (equipCheck) {

                    if (equipCheck === "HP") {
                     
                        return player.Maxhealth;
                    }
                    else if (equipCheck === "MP") {
                        return player.Maxmana;
                    }
                    else if (equipCheck === "RES") {
                        return player.RES;
                    }
                    else if (equipCheck === "MAG_RES") {
                        return player.MAG_RES;
                    }
                    else if (equipCheck === "HP_REGEN") {
                        return player.HP_REGEN;
                    }
                    else if (equipCheck === "MANA_REGEN") {
                        return player.MANA_REGEN;
                    }

                    else if (equipCheck === "ATK") {
                        return player.ATK;
                    }
                    else if (equipCheck === "MATK") {
                        return player.MATK;
                    }

                    else if (equipCheck === "STR") {
                        return player.STR;
                    }
                    else if (equipCheck === "AGI") {
                        return player.AGI;
                    }
                    else if (equipCheck === "INT") {
                        return player.INT;
                    }

                    else if (equipCheck === "BLK") {
                        return player.BLK;
                    }
                }
            },

            checkShopWindows: function(){
                return (ig.game.shop_menu === true && (!(ig.game.special_1_info || ig.game.special_2_info || ig.game.special_3_info)) && ig.game.shop_prompt === false)
            },
            checkSpecialLevel: function (level) {
                level = level.toString();

             
                if(
                   level.indexOf("TutorialCastle") > -1 ||
                   level.indexOf("FirstCastle") > -1 ||
                   level.indexOf("GrassLand") > -1) { return 1;}

                else if (
                     level.indexOf("SwampOfDesolation") > -1 ||
                     level.indexOf("DeadlyDesert") > -1 ) { return 2; }
                   
                else if (
                    level.indexOf("DesertCave") > -1 ||
                    level.indexOf("DesertCastle") > -1 ||
                    level.indexOf("MagicForest") > -1 ) { return 3; }
                   
                else if (
                     level.indexOf("SpikyMountains") > -1 ||
                    level.indexOf("NecromancerCave") > -1 ||
                    level.indexOf("RoadToVolcano") > -1 ||
                      level.indexOf("InsideVolcano") > -1 
                    
                    ) { return 4; }
                else if (
                     level.indexOf("TowerOfInsanity") > -1 ||
                  
                    level.indexOf("RedBridge") > -1 ||
                    level.indexOf("TheCapital") > -1 
                    ) { return 5; }


                else if (
                    level.indexOf("DesolatedAltar") > -1 ||
                    level.indexOf("DimensionOfDespair") > -1 ||
                    level.indexOf("FortressOfDarkness") > -1 ||
                    level.indexOf("DemonCave") > -1 
                    
                    
                    ) { return 6; }

        else if (

        level.indexOf("RoadToSkyCannon") > -1||
                            level.indexOf("SkyCannon") > -1 ||
                         level.indexOf("VoidCitadel") > -1
                   ) { return 7; }
        

            },
            CalculateDynamicStats: function (type,amount) {

                if (type === "STR") {
                    return amount * STRTOATKMOD;
                }
                else if(type === "INT") {
                    return amount * INTTOMATKMOD;
                }
                else if (type === "AGI") {
                    return amount * AGITOCRITMOD;
                }
                return 0;
               
            },
            setPause: function () {
                game.paused = true;
                try {
                    window.external.notify(game.paused);
                } catch (err) {
                    alert(err);
                }
            },


            returnSkillNumber: function (entityName) {
                var skillNumber = 0;

                if (entityName == 'EntityPlayerSlash') { skillNumber = 0; }
                else if (entityName == 'EntityShockpulse') { skillNumber = 1; }
                else if (entityName == 'EntityFrostball') { skillNumber = 2; }
                else if (entityName == 'EntityFireBlast') { skillNumber = 3; }
                else if (entityName == 'EntityFrostFire') { skillNumber = 4; }
                else if (entityName == 'EntityArcaneBall') { skillNumber = 5; }
                else if (entityName == 'EntityLifeSlash') { skillNumber = 6; }
                else if (entityName == 'EntityRadiance') { skillNumber = 7; }
                else if (entityName == 'EntityWeakSlash') { skillNumber = 8; }
                else if (entityName == 'EntityDemonSlash') { skillNumber = 9; }
                else if (entityName == 'EntityDarkWave') { skillNumber = 10; }
                else if (entityName == 'EntityDreadWave') { skillNumber = 11; }

                return skillNumber;

            },
            checkFound: function (name) {
                var retVal = [];
                if (name) {

                    var killEvents = ig.game.player.killEvents;

                    switch (name) {
                        case 'monster':

                            if (killEvents.green_zombieKills > 0) { retVal.push('GreenZombie'); }
                            if (killEvents.blue_zombieKills > 0) { retVal.push('BlueZombie'); }
                            if (killEvents.purple_zombieKills > 0) { retVal.push('PurpleZombie'); }
                            if (killEvents.speedpurple_zombieKills > 0) { retVal.push('SpeedPurpleZombie'); }
                            if (killEvents.winterYetiKills > 0) { retVal.push('WinterYeti'); }
                            if (killEvents.flame_zombieKills > 0) { retVal.push('FlameZombie'); }
                            if (killEvents.ice_zombieKills > 0) { retVal.push('IceZombie'); }

                            if (killEvents.rusherGreenKills > 0) { retVal.push('RusherGreen'); }
                            if (killEvents.rusherBlueKills > 0) { retVal.push('RusherBlue'); }
                            if (killEvents.rusherOrangeKills > 0) { retVal.push('RusherOrange'); }

                            if (killEvents.wormKills > 0) { retVal.push('Worm'); }
                            break;
                        case 'knight':
                            if (killEvents.heavy_knightKills > 0) { retVal.push('HeavyKnight'); }
                            if (killEvents.zombie_knightKills > 0) { retVal.push('ZombieKnight'); }
                            if (killEvents.dread_knightKills > 0) { retVal.push('DreadKnight'); }
                            if (killEvents.dark_knightKills > 0) { retVal.push('DarkKnight'); }
                            if (killEvents.ice_knightKills > 0) { retVal.push('IceKnight'); }

                            if (killEvents.bombThrowerWeakKills > 0) { retVal.push('BombThrowerWeak'); }
                            if (killEvents.bombThrowerKills > 0) { retVal.push('BombThrower'); }
                            if (killEvents.bombThrowerStrongKills > 0) { retVal.push('BombThrowerStrong'); }


                            break;
                        case 'wizard':
                            if (killEvents.red_wizardKills > 0) { retVal.push('RedWizard'); }
                            if (killEvents.blue_wizardKills > 0) { retVal.push('BlueWizard'); }
                            if (killEvents.dark_wizardKills > 0) { retVal.push('DarkWizard'); }
                            if (killEvents.purple_wizardKills > 0) { retVal.push('PurpleWizard'); }
                            if (killEvents.winterMageKills > 0) { retVal.push('WinterMage'); }
                            if (killEvents.thunder_wizardKills > 0) { retVal.push('ThunderWizard'); }

                            if (killEvents.necromancerWeakKills > 0) { retVal.push('NecromancerWeak'); }
                            if (killEvents.necromancerKills > 0) { retVal.push('Necromancer'); }
                            if (killEvents.necromancerStrongKills > 0) { retVal.push('NecromancerStrong'); }

                            break;
                        case 'boss':
                            if (killEvents.giantZombieKills > 0) { retVal.push('GiantZombie'); }
                            if (killEvents.mageKnightKills > 0) { retVal.push('MageKnight'); }
                            if (killEvents.kozKills > 0) { retVal.push('Koz'); }
                            if (killEvents.winterWitchKills > 0) { retVal.push('WinterWitch'); }
                            if (killEvents.fallenKnightKills > 0) { retVal.push('FallenKnight'); }
                            if (killEvents.elementalKnightKills > 0) { retVal.push('ElementalKnight'); }

                            if (killEvents.sandWormKills > 0) { retVal.push('SandWorm'); }
                            if (killEvents.grandMancerKills > 0) { retVal.push('Grandmancer'); }
                            if (killEvents.voidKnightKills > 0) { retVal.push('VoidKnight'); }


                            break;
                        default:
                            break;
                    }

                }

                return retVal;
            },
            checkPopUpPress: function (t1, t2, t3, t4, t5, t6) {
                if (ig.game.player) {
                 
                    if ((ig.input.pressed("popup")) && ig.game.gotItem == false && ig.game.menuOpen()) {

                        if (ig.game.InfoText == true) {
                            ig.game.InfoText = false;

                        }
                        else if (ig.game.InfoText == false) {

                            ig.game.infoText = '';
                            ig.game.infoText += t1;
                            ig.game.infoText += '\n';
                            ig.game.infoText += t2;
                            ig.game.infoText += '\n';
                            ig.game.infoText += t3;
                            ig.game.infoText += '\n';
                            ig.game.infoText += t4;
                            ig.game.infoText += '\n';
                            ig.game.infoText += t5;
                            ig.game.infoText += '\n';
                            ig.game.infoText += t6;
                            ig.game.infoText += '\n';
                            ig.game.InfoText = true;

                        }
                       

                    }
                    else if ((ig.input.pressed('space') || ig.input.pressed('lootButton') || ig.input.pressed("screen")) && ig.game.InfoText == true) {


                        ig.game.infoText = '';
                        ig.game.InfoText = false;
                    }

                }


            },

            specialOpen: function () {
                

                return !(ig.game.special_1_info || ig.game.special_2_info || ig.game.special_3_info);
            },
            checkSpecialBtn: function (btn) {
                var game = ig.game;

                if (ig.input.released('special_1')) {

                 
                    //EquipElementsTo(false);
                    var buffer_i = (game.special_1_info == false) ? true : false;
                    if (buffer_i == false) { game.special_1_info = false; }
                    else {
                        switch (btn) {
                            case 'w':
                                game.special_1_info = (game.firstSpecial_w) ? true : false;

                                game.show_special = (game.special_1_info) ? game.firstSpecial_w : game.show_special;
                                break;
                            case 's':
                                game.special_1_info = (game.firstSpecial_s) ? true : false;
                                game.show_special = (game.special_1_info) ? game.firstSpecial_s : game.show_special;
                                break;
                            case 'a':
                                game.special_1_info = (game.firstSpecial_a) ? true : false;
                                game.show_special = (game.special_1_info) ? game.firstSpecial_a : game.show_special;
                                break;
                            default:
                                break;
                        }
                    }

                }
                else if (ig.input.released('special_2')) {
                   // EquipElementsTo(false);
                    var buffer_i = (game.special_2_info == false) ? true : false;
                    if (buffer_i == false) { game.special_2_info = false; }

                    else {
                        switch (btn) {
                            case 'w':

                                game.special_2_info = (game.secondSpecial_w) ? true : false;

                                game.show_special = (game.special_2_info) ? game.secondSpecial_w : game.show_special;
                                break;
                            case 's':
                                game.special_2_info = (game.secondSpecial_s) ? true : false;

                                game.show_special = (game.special_2_info) ? game.secondSpecial_s : game.show_special;
                                break;
                            case 'a':
                                game.special_2_info = (game.secondSpecial_a) ? true : false;
                                game.show_special = (game.special_2_info) ? game.secondSpecial_a : game.show_special;
                                break;
                            default:
                                break;
                        }
                    }
                }
                else if (ig.input.released('special_3')) {
                  //  EquipElementsTo(false);
                    var buffer_i = (game.special_3_info == false) ? true : false;
                    if (buffer_i == false) { game.special_3_info = false; }
                    else {
                        switch (btn) {
                            case 'w':
                                game.special_3_info = (game.thirdSpecial_w) ? true : false;
                                game.show_special = (game.special_3_info) ? game.thirdSpecial_w : game.show_special;
                                break;
                            case 's':
                                game.special_3_info = (game.thirdSpecial_s) ? true : false;
                                game.show_special = (game.special_3_info) ? game.thirdSpecial_s : game.show_special;
                                break;
                            case 'a':
                                game.special_3_info = (game.thirdSpecial_a) ? true : false;
                                game.show_special = (game.special_3_info) ? game.thirdSpecial_a : game.show_special;
                                break;
                            default:
                                break;
                        }
                    }
                }
                else if ((game.special_1_info || game.special_2_info || game.special_3_info) && ig.input.released('screen')) {
                    game.special_1_info = false;
                    game.special_2_info = false;
                    game.special_3_info = false;
                }

            },

            returnCorrectHealth: function (object) {

                var retVal = 0;
                retVal = (object.actHealth < object.health) ? object.actHealth : object.health;

                return retVal;
            },
            checkIfInArea: function (a, b, b_val_x, b_val_y) {
                var retVal = false;

                if (a.pos.x + (a.size.x / 2) <= (b.pos.x + (b.size.x / 2)) + b_val_x && (a.pos.x + (a.size.x / 2)) >= (b.pos.x + (b.size.x / 2)) - b_val_x
               && (a.pos.y + (a.size.y / 2)) <= (b.pos.y + (b.size.y / 2)) + b_val_y && (a.pos.y + (a.size.y / 2)) >= (b.pos.y + (b.size.y / 2)) - b_val_y
                ) { retVal = true; }
                return retVal;

            },
            loopAndCheck: function (v) {
                var array = ig.game.BeastiaryFound;
                var array_L = array.length;
                var retVal = false;
                for (var i = 0; i < array_L; i++) {
                    if (array[i] == v) { retVal = true; break; }
                }
                return retVal;
            },

            QuestionMark: function () {
                //ig.game.QuestionMark_Pic.draw(0, 0);

                ig.game.EnemyInfo_Desc = '?';
            },
            returnSpecialText: function (special,secondVal) {
                var retText = "";
                if (special == 'Light W' ) {
                    retText = " 3% Increased critical chance, but 10% less weapon damage";
                }
                else if (special == 'Heavy W' ) {
                    retText = "10% Increased weapon damage";
                }
                else if (special == 'Sharp') {
                    retText = "5% increased critical chance";
                }
                else if (special == 'Vampiric') {
                    retText = "3% of damage done is returned to the user";
                }

                else if (special == 'Superiority') {
                    retText = "Having more health than the enemy increases your damage by 15%";
                }
                else if (special == 'Fury') {
                    retText = "Critical damage is +100%, but the chance -50%";
                }
                else if (special == 'Backstab') {
                    retText = "Backattack damage is doubled.";
                }
                else if (special == 'Honor') {
                    retText = "Backattack damage is halved. +10% Critical Chance";
                }
                else if (special == 'Concentration') {
                    retText = "Mana regeneration +10";
                }

                else if (special == 'Chilly') {
                    retText = "Attacks apply 'Chill' to the enemy";
                }
                else if (special == 'Fiery') {
                    retText = "Attacks apply 'Burn' to the enemy";
                }
                else if (special == 'Dull') {
                    retText = "Weapon's critical chance drops to 0%, but the damage is increased by 25%";
                }
                else if (special == 'Blaze') {
                    retText = "Fire spell mana cost and damage +20%";
                }
                else if (special == 'Emberburn') {
                    retText = "Critical burns restore 2% of maximum mana";
                }
                else if (special == 'Chromatic Focus') {
                    retText = "All resource costs -10%";
                }
                else if (special == 'Elemental Focus') {
                    retText = "'Fire Blast' & 'Ice Ball' mana cost -20%";
                }
                else if (special == 'Blessed') {
                    retText = "STR, INT and AGI of the item +10%";
                }
                else if (special == 'Cursed') {
                    retText = "STR, INT and AGI of the item -10%. Chance to get 'Demon Power'";
                }
                else if (special == 'Demonic') {
                    retText = "All attacks are amplified but cost 5% of your current health";
                }
                else if (special == 'Time Warp') {
                    retText = "8% chance to attack twice. Stacks with the 'Double Attack'";
                }
                else if (special == 'Arcane Devotion') {
                    retText = "Each attack increase mana regen by 2 for 5 seconds";
                }
                else if (special == 'Executioner') {
                    retText = "4% chance to instantly dispatch lesser foe";
                }
                else if (special == 'Finisher') {
                    retText = "15% increased critical chance against opponents lower than 30% health";
                }

                else if (special == 'Heavy S') {
                    retText = "Block amount +25%, Block chance -8%";
                }
                else if (special == 'Light S') {
                    retText = "Block chance +16%";
                }
                else if (special == 'Spikes') {
                    retText = "Return 10% of the damage taken";
                }
                else if (special == 'Leech') {
                    retText = "Blocks return 20% of the blocked amount as health";
                }
                else if (special == 'Absorb') {
                    retText = "Blocks return 20% of the blocked amount as mana";
                }
                else if (special == 'Focus Strength') {
                    retText = "Block amount -50%, Damage +15%";
                }
                else if (special == 'Frozen') {
                    retText = "Blocks apply 'Chill' to the attacker";
                }
                else if (special == 'Imbued') {
                    retText = "+25% Increased magic resistance.";
                }
                else if (special == 'Great Wall') {
                    retText = "On hit 20% chance to double the block % for 5 seconds";
                }
                else if (special == 'Heavy Spikes') {
                    retText = "Return 15% of the damage taken";
                }
                else if (special == 'Furious Blocks') {
                    retText = "Blocks increase critical chance by 5% for 5 seconds";
                }
                else if (special == 'Grand Shield') {
                    retText = "Dramatically increased block chance";
                }
                else if (special == 'Negation') {
                    retText = "10% Chance to negate all damage";
                }
                else if (special == 'Raging Slam') {
                    retText = "Blocks cause a 'Shockwave' to be launched against the enemy";
                }
                else if (special == 'Burning') {
                    retText = "Blocks apply 'Burn' to the attacker";
                }

                else if (special == 'Heavy A') {
                    retText = "+15 HP Bonus";
                }
                else if (special == 'Light A') {
                    retText = "+3 HP Regen Bonus";
                }
                else if (special == 'Treasure Hunt') {
                    retText = "Increased chance to find 'Rare' items";
                }

                else if (special == 'Replenish') {
                    retText = "+4 health & mana regeneration";
                }
                else if (special == 'High Spirit') {
                    retText = "+5 HP Bonus";
                }
                else if (special == 'Resourceful') {
                    retText = "+5 MP Bonus";
                }
                else if (special == 'Great Hunt') {
                    retText = "Increased chance to find 'Epic' items";
                }

                else if (special == 'Wizard Armor') {
                    retText = "10% increased spell damage";
                }
                else if (special == 'Demon Armor') {
                    retText = "Increased HP Regen. Decreased HP Bonus.";
                }
                else if (special == 'Second Wind') {
                    retText = "20% chance to cheat death on fatal hit";
                }
                else if (special == "Hero's Aura") {
                    retText = "Every attack against the player has a chance to give 5% HP & MP";
                }
                else if (special == 'Fade') {
                    retText = "20% chance to negate damage";
                }
                else if (special == "Chromatic") {
                    retText = "+20% Magical resistance";
                }
                else if (special == 'Legendary Hunt') {
                    retText = "Increased chance to find 'Legendary' items";
                }


                else if (special == "Demon Execute") {
                    retText = "'Execute' now works if the health is lower than 50%";
                }
                else if (special == 'Wise Radiance') {
                    retText = "Reduce 'Radiance' -manacost";
                }
                else if (special == "Dark Aura") {
                    retText = "Attacks against you damage the enemies based on your HP";
                }
                else if (special == 'Grand Return') {
                    retText = "The mana returned by 'Critical return' +25%";
                }
                else if (special == "Mage's Will") {
                    retText = "Spellpower +20%";
                }


                else if (special == "Crazed Lust") {
                    retText = "'Bloodlust' bonus +100%. Buff duration -1 sec.";
                }
                else if (special == 'Mana Pummel') {
                    retText = "Each attack replenish 5 mana.";
                }
                else if (special == "Giant Barrier") {
                    retText = "'Holy Barrier' damage reduction -33%. Buff duration +1 sec.";
                }
                else if (special == 'Frozen Death') {
                    retText = "+25 Critical %  of 'Fire Blast' and 'Frostfire'.";
                }

                else if (special == "Exploding Slams") {
                    retText = "All critical hits cause explosion that does magical damage.";
                }


                else if (special == 'Venom Slash') {
                    retText = "Apply a poison that damages enemies.";
                }
                else if (special == 'Green Fire') {
                    retText = "'Fire Blast' also applies weakening poison";
                }
                else if (special == "Harsh Nature") {
                    retText = "All Resistances +25%";
                }
                else if (special == 'Green Glimmer') {
                    retText = "Health regeneration increased when 'Radiance' is used";
                }
                else if (special == "Poisonous Feedback") {
                    retText = "Blocks cause 10 damage to the attacker";
                }

                else if (special == "Desert Storm") {
                    retText = "Attacks have chance to spawn 'Sand Missiles'";
                }
                else if (special == 'Legendary Spring') {
                    retText = "Attacking frozen enemies replenishes 4% Max. health & mana";
                }
                else if (special == "Mirage") {
                    retText = "25% chance to dodge spells";
                }
                else if (special == 'Dragonbone') {
                    retText = "Double attacks replenish 5% of Max. mana";
                }
                else if (special == "Final Stand") {
                    retText = "'Last Stand' also increases STR and INT";
                }

                else if (special == "Dark Light") {
                    retText = "'Burning Light' damage +100%, Range -50%";
                }
                else if (special == 'Flesh Blade') {
                    retText = "Defeating foes increase the potency of the weapon";
                }
                else if (special == "Dark Matter") {
                    retText = "'Arcane Ball' replaced by 'Dark Matter' that has up to +50 Critical chance";
                }
                else if (special == 'Shock Therapy') {
                    retText = "Shockwave hits replenish 10 mana";
                }
                else if (special == "Spell Focus") {
                    retText = "Spell critical chance +10%";
                }


                else if (special == "Heat") {
                    retText = "Enemies near you get 'Burn'";
                }
                else if (special == 'Flame Slashes') {
                    retText = "Slashes do burning damage according to Strength & Agility";
                }
                else if (special == "Greatworm's Heart") {
                    retText = "You regen 12% of HP every second. Mana regen decreased.";
                }
                else if (special == 'Master of Fire') {
                    retText = "'Fire Blast' and 'Frost Fire' have +15% Critical chance";
                }
                else if (special == "Flame Shield") {
                    retText = "Attacking you while you have 'Holy Barrier' on, causes 'Burn'";
                }


                else if (special == "Berserk") {
                    retText = "Increased regen and double attack rate. Decreased resistances.";
                }
                else if (special == 'Crazed Frenzy') {
                    retText = "Instead of giving health bonus 'Frenzy' now gives Double Attack %";
                }
                else if (special == "Intense Pain") {
                    retText = "Spell critical damage +50%";
                }
                else if (special == 'Mad Tap') {
                    retText = "'Life Slash' now saps and leechs 3% of enemy's current health";
                }
                else if (special == "Bloodrage") {
                    retText = "All defeated foes return 20 health and mana";
                }


                else if (special == "Demon's Bane") {
                    retText = "Shockwave damage +40% against Knights and Bosses";
                }
                else if (special == 'Redemption') {
                    retText = "'Calm Mind' STR and INT reduced, but the critical chance isn't halved.";
                }
                else if (special == "Mystic Sphere") {
                    retText = "20% of all damage is negated";
                }
                else if (special == 'Demonic Leech') {
                    retText = "All damage received replenish 3% Max. mana";
                }
                else if (special == "Hero's' Protection") {
                    retText = "Attacks have chance to replenish 10% Max mana & health";
                }

                else if (special == "Ember Pyre") {
                    retText = "All burning damage +50%";
                }
                else if (special == 'Dispersion') {
                    retText = "All magical damage taken -30%";
                }
                else if (special == "Frostburn") {
                    retText = "All attacks apply 'Burn' & 'Chill'";
                }
                else if (special == 'Fortitude') {
                    retText = "+50 HP & +5 HP regeneration";
                }
                else if (special == "Sovereign") {
                    retText = "+30% damage against lesser foes";
                }

                else if (special == "Singularity Strike") {
                    retText = "All attacks have chance to spawn singularity";
                }
                else if (special == 'Grudge') {
                    retText = "Defeated enemies decrease HP & MP up to 50%. +30% damage";
                }
                else if (special == "Grand Energy") {
                    retText = "-10% HP & MP regeneration, +40% Critical chance";
                }
                else if (special == 'Dark Energy') {
                    retText = "+15 MP regeneration ";
                }
                else if (special == "Guarding Light") {
                    retText = "All attacks against you replenish 5% HP & MP";
                }



                else if (special == "Chosen's Power") {
                    retText = "Weapon damage +20%";
                }
                else if (special == 'Demonic Blessing') {
                    retText = "HP +100";
                }
                else if (special == "Sage's Will") {
                    retText = "-50% mana cost";
                }
                else if (special == 'Arcane Sap') {
                    retText = "10% of the damage is returned as mana";
                }
                else if (special == "Insanity") {
                    retText = "+25% Critical chance. -5 INT";
                }
                else if (special == "Titan's Signet") {
                    retText = "+20 STR";
                }
                else if (special == "Koz's Whisper") {
                    retText = "+20 INT";
                }
                else if (special == "Godlike blocks") {
                    retText = "Block chance +24%";
                }
                else if (special == "Relife") {
                    retText = "Regenerate 10% HP every second";
                }





                retText = ig.game.parseRetText(retText, 'specialInfo');
                return retText;
            },
            parseRetText: function (text, type) {
                var splitPoint = 30;
                if (type) {
                    switch (type) {
                        case 'description':
                            splitPoint = 105;
                            break;
                        case 'skilldesc':
                            splitPoint = 136;
                            break;
                        case 'specialInfo':
                            splitPoint = 176;
                            break;
                        case 'beastiaryD':
                            splitPoint = 160;
                            break;
                        case 'beastiaryS':
                            splitPoint = 64;
                            break;
                        case 'GreatAdventure':
                            splitPoint = 92;
                            break;
                        case 'infopanel':
                            splitPoint = 176;
                            break;
                        case 'Title':
                            splitPoint = 80;
                            break;
                        case 'confirmPanel':
                            splitPoint = 160;
                            break;

                        case 'confirmPanel2':
                            splitPoint = 150;
                            break;
                        default:
                            splitPoint = 150;
                            break;
                    }
                }
                var split_a = text.split('');
                var split_a_L = split_a.length;
                var split_b = [];
                var b = 0;
                for (var i = 0; i < split_a_L; i++) {

                    //Fix for euro letter
                    if(split_a[i] === '€') split_a[i] = 'e';
                    split_b[b] = split_a[i];
                    if (ig.game.font.widthForString((split_b.join(''))) >= splitPoint) {
                      

                        if (split_a[i] == ' ') { split_a.splice(i, 1, '\n'); i += 2; split_b = []; }
                        else {
                            for (var z = i; z > 0; z--) {

                               
                                if (split_a[z] == ' ') {
                                    split_b = [];
                                    for (var y = z; y < i; y++) {
                                        split_b.push(split_a[y]);
                                    }

                                    split_a.splice(z, 1, '\n'); i += 2;


                                    break;
                                }
                            }
                        }

                    }

                    b++;

                }
                text = split_a.join('');
                return text;
            },
            shutTalentMenu: function (name) {
                var game = ig.game;
                switch (name) {
                    case 'BLADE':
                        ig.game.myTouchButtons.toggleByString("BLADE", false);
                        game.blade_talents_menu = false;
                        break;
                    case 'SPELL':
                        ig.game.myTouchButtons.toggleByString("SPELL", false);
                        game.magic_talents_menu = false;
                        break;
                    case 'LIFE':
                        ig.game.myTouchButtons.toggleByString("LIFE", false);
                        game.life_talents_menu = false;
                        break;
                    case 'DEMON':
                        ig.game.myTouchButtons.toggleByString("DEMON", false);
                        game.demon_talents_menu = false;
                        break;
                   
                }
            },
            openTalentMenu: function (name) {
               
                switch (name) {
                    case 'BLADE':

                        ig.game.myTouchButtons.toggleByString("BLADE", true);
                        ig.game.blade_talents_menu = true;
                       
                        SkillElementsTo(true);

                        break;
                    case 'SPELL':
                        ig.game.myTouchButtons.toggleByString("SPELL", true);
                        ig.game.magic_talents_menu = true;
                        

                    
                        SkillElementsTo(true);
                        break;
                    case 'LIFE':
                        ig.game.myTouchButtons.toggleByString("LIFE", true);
                        ig.game.life_talents_menu = true;
                       
                    
                        SkillElementsTo(true);
                        break;
                    case 'DEMON':
                        ig.game.myTouchButtons.toggleByString("DEMON", true);
                        ig.game.demon_talents_menu = true;
                       
                        SkillElementsTo(true);
                        break;
                   
                }
                ig.game.current_talent_menu = name;
            },
            changeArmorGFX: function (changed_player) {
              
                var player = changed_player;

                var armor = ig.game.getEntityByName('armor');
                if (player) {
                    var armor_name = player.armor.itemName;

                }



                if (armor != null) { armor.kill(); }


                switch (armor_name) {
                    case 'Leather Armor':

                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_LeatherVest.png', 32, 32) });

                        break;
                    case 'Heavy Leather':

                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_SturdyArmor.png', 32, 32) });

                        break;
                    
                    case 'Demon Mail':
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_DemonMail.png', 32, 32) });

                        break;
                    case 'Copper Armor':
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_CopperArmor.png', 32, 32)});

                        break;
                    case 'Bronze Armor':
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_BronzeArmor.png', 32, 32)});

                        break;
                    case 'Spell Vest':
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_SpellWeavedVest.png', 32, 32), animatedWeapon: true });

                        break;
                    case 'Leather Robe':
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_LeatherRobe.png', 32, 32) });

                        break;
                    case 'Iron Armor':
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_IronArmor.png', 32, 32) });

                        break;
                    case 'Heavy Armor':
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_HeavyArmor.png', 32, 32) });
                        break;
                    case 'Scale Armor':
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_Scalearmor.png', 32, 32) });

                        break;
                    case 'Bonemail':
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_Bonemail.png', 32, 32) });

                        break;
                    case 'Whirlwind':
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_Whirlwind.png', 32, 32) });

                        break;
                    case 'Steel Armor':
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_SteelArmor.png', 32, 32) });
                        break;
                    case 'Chainmail':
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('mediaItems/equipmentAnimations/armor/armorSprites_Chainmail.png', 32, 32) });
                        break;
                    case 'Heavy Steel':
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_HeavySteel.png', 32, 32) });
                        break;
                    case 'Cotton Robe':
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_CottonRobe.png', 32, 32) });
                        break;
                    case 'Black Hood':
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_BlackHood.png', 32, 32) });
                        break;
                    case 'Terrafire':
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_Terrafire.png', 32, 32), animatedWeapon: true });
                        break;
                    case 'Flame Guard':
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_Flameguard.png', 32, 32), animatedWeapon: true });
                        break;
                    case 'Mythril Armor':
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_MythrilArmor.png', 32, 32) });
                        break;
                    case 'Imbued Robe':
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_ImbuedRobe.png', 32, 32), animatedWeapon: true });
                        break;

                
                    case 'Berserker':
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_Berserker.png', 32, 32), animatedWeapon: true });
                        break;
                    case 'Delisirrian Arm.':
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_DelisirrianArmor.png', 32, 32), animatedWeapon: true });
                        break;
                    case 'Delisirrian Rob.':
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_DelisirrianRobe.png', 32, 32), animatedWeapon: true });
                        break;
                    case 'Fallen Armor':
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_FallenArmor.png', 32, 32), animatedWeapon: true });
                        break;

                    case 'Elemental Armor':
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_ElementalArmor.png', 32, 32), animatedWeapon: true });
                        break;
                    case "Hero's Armor":
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_HerosArmor.png', 32, 32), animatedWeapon: true });
                        break;
                    case "Sage's Robe":
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_SagesRobe.png', 32, 32), animatedWeapon: true });
                        break;
                    case "Mage's Robe":
                        ig.game.spawnEntity('EntityArmor', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/armor/armorSprites_MagesRobe.png', 32, 32), animatedWeapon: true });
                        break;

                    default:
                        break;

                }
                ig.game.resetAnim();
                //Add other items so shield wont be glitched behind armor graphics
                ig.game.changeWeaponGFX(player);
                ig.game.changeShieldGFX(player);

            },
            changeWeaponGFX: function (changed_player) {

 

                var player = changed_player;
                var weapon = ig.game.getEntityByName('weapon');

                if (player) {

                    var weapon_name = player.weapon.itemName;
                }

               
                if (weapon != null) { weapon.kill(); }
                switch (weapon_name) {
                    case 'Wooden Sword':

                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_WoodenSword.png', 32, 32) });

                        break;
                    case 'Stone Sword':

                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_StoneSword.png', 32, 32) });

                        break;
                    case 'Practice Sword':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_PracticeSword.png', 32, 32) });
                        break;
                    case 'Stick':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_Stick.png', 32, 32) });

                        break;
                    case 'Wooden Staff':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_WoodenStaff.png', 32, 32) });

                        break;
                    case "Piggy's Spike":
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_PiggysSpike.png', 32, 32) });

                        break;
                    case 'Holy Sword':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_HolySword.png', 32, 32) });

                        break;
                    case 'Blessed Staff':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_BlessedStaff.png', 32, 32) });
                        break;
                    case 'Copper Sword':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_CopperSword.png', 32, 32) });

                        break;
                    case 'Bronze Sword':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_BronzeSword.png', 32, 32) });

                        break;
                    case 'Slasher':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_Slasher.png', 32, 32) });

                        break;
                    case 'Copper Stick':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_CopperStick.png', 32, 32) });
                        break;
                    case 'Bronze Staff':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_BronzeStaff.png', 32, 32) });
                        break;
                    case 'Exploding Axe':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_ExplodingAxe.png', 32, 32), animatedWeapon: true });
                        break;
                    case 'Devastator':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_Devastator.png', 32, 32), animatedWeapon: true });
                        break;
                    case 'Oaken Pole':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_OakenPole.png', 32, 32) });
                        break;
                    case 'Viper Slicer':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_ViperSlicer.png', 32, 32) });
                        break;
                    case 'Green Staff':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_GreenStaff.png', 32, 32) });
                        break;
                    case 'Iron Blade':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_IronBlade.png', 32, 32) });
                        break;
                    case 'Iron Sword':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_IronSword.png', 32, 32),  });
                        break;
                    case 'Iron Grand':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_IronGrandsword.png', 32, 32),});
                        break;
                    case 'Iron Staff':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_IronStaff.png', 32, 32),  });
                        break;
                    case 'Imbued Stick':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_ImbuedStick.png', 32, 32), animatedWeapon: true });
                        break;


                    case 'Sand Sword':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_SandSword.png', 32, 32), animatedWeapon: true });
                        break;
                    case 'Desert Star':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_DesertStar.png', 32, 32), animatedWeapon: true });
                        break;
                    case 'Blood Sword':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_BloodSword.png', 32, 32), animatedWeapon: true });
                        break;
                    case 'Dark Staff':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_DarkStaff.png', 32, 32), animatedWeapon: true });
                        break;


                    case 'Steel Sword':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_SteelSword.png', 32, 32) });
                        break;
                    case 'Cleaver':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_Cleaver.png', 32, 32) });
                        break;
                    case 'Iron Mallet':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_IronMallet.png', 32, 32) });
                        break;
                    case 'Imbued Staff':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_ImbuedStaff.png', 32, 32), animatedWeapon: true });
                        break;
                    case 'Grand Staff':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_GrandStaff.png', 32, 32), animatedWeapon: true });
                        break;
                    case 'Flamebrand':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_Flamebrand.png', 32, 32), animatedWeapon: true });
                        break;
                    case 'Pyroforian':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_Pyroforian.png', 32, 32), animatedWeapon: true });
                        break;


                    case 'Mythril Sword':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_MyhtrilSword.png', 32, 32) });
                        break;
                    case 'Elven Blade':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_ElvenBlade.png', 32, 32) });
                        break;
                    case 'Great Sword':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_GreatSword.png', 32, 32)});
                        break;
                    case 'Mythril Staff':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_MythrilStaff.png', 32, 32) });
                        break;


                    case 'Golden Oak':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_GoldenOakStaff.png', 32, 32), animatedWeapon: true });
                        break;
                    case 'Axe of Madman':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_AxeOfTheMadman.png', 32, 32) });
                        break;
                    case 'Mad Fury':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_MadFury.png', 32, 32), animatedWeapon: true });
                        break;
                    case 'Agony':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_Agony.png', 32, 32), animatedWeapon: true });
                        break;


                    case 'Delisirrian Swd.':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_DelisirrianSword.png', 32, 32) });
                        break;
                    case 'Noble Blade':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_NobleBlade.png', 32, 32) });
                        break;
                    case 'Claymore':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_Claymore.png', 32, 32) });
                        break;
                    case "Executor's Axe":
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_ExecutorsAxe.png', 32, 32), animatedWeapon: true });
                        break;


                    case 'Delisirrian Sta.':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_DelisirrianStaff.png', 32, 32), animatedWeapon: true });
                        break;
                    case 'Tetrarz':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_Tetrarz.png', 32, 32), animatedWeapon: true });
                        break;
                    case 'Frostfire Sword':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_FrostFireSword.png', 32, 32), animatedWeapon: true });
                        break;
                    case "Cursed Mageslayer":
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_CursedMageslayer.png', 32, 32) });
                        break;

                    case 'Yggdrassil':
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_Yggdrassil.png', 32, 32), animatedWeapon: true });
                        break;
                    case "Duelist's Blade":
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_DuelistsBlade.png', 32, 32) });
                        break;
                    case "Hero's Sword":
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_HerosSword.png', 32, 32), animatedWeapon: true });
                        break;
                    case "Grand Mallet":
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_GrandMallet.png', 32, 32) });
                        break;

                    case "Wizard's Staff":
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_WizardsStaff.png', 32, 32), animatedWeapon: true });
                        break;

                    case "The Void":
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_TheVoid.png', 32, 32), animatedWeapon: true });
                        break;
                    case "Abyss":
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_Abyss.png', 32, 32), animatedWeapon: true });
                        break;

                    case "Black Staff":
                        ig.game.spawnEntity('EntityWeapon', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/weapon/weaponSprites_BlackStaff.png', 32, 32), animatedWeapon: true });
                        break;
                    default:
                        break;

                }
                ig.game.resetAnim();


            },
            
            changeShieldGFX: function (changed_player) {




                var player = changed_player;
                var shield = ig.game.getEntityByName('shield');

                if (player != null && player.shield != null) {

                    var shield_name = player.shield.itemName;
                }

                if (shield != null) { shield.kill(); }
                switch (shield_name) {
                    case 'Wooden Shield':

                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_WoodenShield.png', 32, 32) });

                        break;
                    case 'Stone Shield':

                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_StoneShield.png', 32, 32) });

                        break;
                    case 'Practice Shield':
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_PracticeShield.png', 32, 32) });
                        break;
                    case 'Copper Shield':
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_CopperShield.png', 32, 32) });

                        break;
                    case 'Bronze Shield':
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_BronzeShield.png', 32, 32) });
                        break;
                    case "Giant's Shield":
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_GiantShield.png', 32, 32) });

                        break;
                    case 'Magic Orb':
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_MagicOrb.png', 32, 32), animatedWeapon: true });

                        break;
                    case 'Iron Shield':
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_IronShield.png', 32, 32) });

                        break;
                    case 'Heavy Shield':
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_HeavyShield.png', 32, 32) });
                        break;
                    case "Scorpion's Heart":
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_HeartOfScropion.png', 32, 32) });

                        break;
                    case 'Sting Shield':
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_StingShield.png', 32, 32) });
                        break;
                    case 'Sacred Relic':
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_SacredRelic.png', 32, 32) });
                        break;
                    case 'Steel Shield':
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_SteelShield.png', 32, 32) });
                        break;
                    case 'Hardened Shield':
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_HeavySteel.png', 32, 32) });
                        break;
                    case 'Necro Book':
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_NecroBook.png', 32, 32) });
                        break;
                    case 'Mystic Skull':
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_DeformedSkull.png', 32, 32) });
                        break;
                    case "Emberstone":
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_Emberstone.png', 32, 32) });
                        break;
                    case 'Mythril Shield':
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_MithrilShield.png', 32, 32) });
                        break;

                    case 'Magic Shield':
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_MagicShield.png', 32, 32) });
                        break;
                    case 'Rage':
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_Rage.png', 32, 32) });
                        break;
                    case "Delisirrian Sld.":
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_DelisirrianShield.png', 32, 32) });
                        break;
                    case 'Red Shield':
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_RedShield.png', 32, 32) });
                        break;

                    case 'Blue Shield':
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_BlueShield.png', 32, 32) });
                        break;
                    case 'Yellow Shield':
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_YellowShield.png', 32, 32) });
                        break;
                    case "Demon Shield":
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_DemonShield.png', 32, 32) });
                        break;
                    case 'Demon Orb':
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_DemonOrb.png', 32, 32) });
                        break;

                    case "Demon's Heart":
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_DemonsHeart.png', 32, 32) });
                        break;
                    case 'Sovereign':
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_Sovereign.png', 32, 32) });
                        break;
                    case "Power Orb":
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_PowerOrb.png', 32, 32) });
                        break;
                    case 'Mana Orb':
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_MageOrb.png', 32, 32) });
                        break;

                    case "Hero's Shield":
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_HerosShield.png', 32, 32) });
                        break;
                    case "Duelist's Shield":
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_DuelistsShield.png', 32, 32) });
                        break;
                    case "Summoning Stone":
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_SummoningStone.png', 32, 32) });
                        break;
                    case "Sage's Memento":
                        ig.game.spawnEntity('EntityShield', player.pos.x, player.pos.y, { flip: this.flip, animSheet: new ig.AnimationSheet('media/Items/equipmentAnimations/shield/shieldSprites_SagesMemento.png', 32, 32) });
                        break;

                    default:
                        break;

                }


                ig.game.resetAnim();

            },
            resetAnim: function () {
                //Reset player, weapon, shield and armor animations

                var player = ig.game.getEntityByName('player1');
                var weapon = ig.game.getEntityByName('weapon');
                var shield = ig.game.getEntityByName('shield');
                var armor = ig.game.getEntityByName('armor');
                if (player) {
                    player.anims.run.rewind();
                    player.anims.fall.rewind();
                    player.anims.idle.rewind();
                    player.anims.jump.rewind();
                    player.anims.attack.rewind();
                }
                if (weapon) {
                    weapon.anims.run.rewind();
                    weapon.anims.fall.rewind();
                    weapon.anims.idle.rewind();
                    weapon.anims.jump.rewind();
                    weapon.anims.attack.rewind();
                }
                if (shield) {
                    shield.anims.run.rewind();
                    shield.anims.fall.rewind();
                    shield.anims.idle.rewind();
                    shield.anims.jump.rewind();
                    shield.anims.attack.rewind();
                }
                if (armor) {
                    armor.anims.run.rewind();
                    armor.anims.fall.rewind();
                    armor.anims.idle.rewind();
                    armor.anims.jump.rewind();
                    armor.anims.attack.rewind();
                }

            },

            checkLockedLevels: function () {
                var unlockLevel = 1;
                var clearLevel = 0;


                if (localStorage.getItem('SUPRARPG_killEvents') != null) {
                    killEvents = JSON.parse(localStorage.getItem('SUPRARPG_killEvents'));

                    if (killEvents.giantZombieKills > 0 //||
                    ) { unlockLevel = 2; }
                    if (killEvents.mageKnightKills > 0//||
                        ) { unlockLevel = 4; }
                    if (killEvents.kozKills > 0 //||
                        ) { unlockLevel = 6; }
                    if (killEvents.winterWitchKills > 0 //||
                       ) { unlockLevel = 8; }
                    if (killEvents.fallenKnightKills > 0 //||
                        ) { unlockLevel = 9; }
                    if (killEvents.elementalKnightKills > 0 //||
                        ) { unlockLevel = 10; }
                    if (killEvents.sandWormKills > 0 //||
                        ) { unlockLevel = 11; }
                    if (killEvents.grandMancerKills > 0 //||
                        ) { unlockLevel = 12; }
                    if (killEvents.voidKnightKills > 0 //||
                        ) { unlockLevel = 13; }


                }
                if (localStorage.getItem('SUPRARPG_clearLevel') != null && localStorage.getItem('SUPRARPG_killEvents') != null) {
                    clearLevel = parseInt(localStorage.getItem('SUPRARPG_clearLevel'));
                    if (clearLevel > unlockLevel) { unlockLevel = clearLevel; }

                }

                //Legacy modifications so that earlier versions will be able to continue to new content
                return unlockLevel;



            },
            //For testing
            FillInventory: function (amount) {
                

                return;
                var settings = { _killed: true, itemName: 'The Void', STR: 2, INT: 0, AGI: 3, HP: 10, MP: 0, HP_R: 0, MP_R: 0, ATK: 10, MATK: 0, SPECIAL: new special(), isSword: true, description: 'Weak sword made of wood.', doNotRandomize: true };
                var setValue = 7;
                for (var i = 0; i < amount; i++) {
                    if (ig.game.player) ig.game.player.armorArray.push(new EntityRandomTreasure(-128, -128, { bossNumber: "MAGMAWORM" }));
                }
              
        
              

                
              /*  var itemArray = ig.game.itemArray;
            
            
                if (obj) {
                    for (var i = 0; i < itemArray.length; i++) {
                 
                        if (itemArray[i].isSword) { obj.weaponArray.push(itemArray[i]); }
                        else if (itemArray[i].isShield ) { obj.shieldArray.push(itemArray[i]); }
                        else if (itemArray[i].isArmor) { obj.armorArray.push(itemArray[i]); }
                    }
                }
       */
            },
            PopulateItems: function () {
                // Armor
                return;
                var itemArray = ig.game.itemArray;
                var settings = { _killed: true, itemName: 'Leather Armor' ,isArmor:true};
                var myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'H. Leather Armor' ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Leather Robe' ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Copper Armor' ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Bronze Armor' ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Iron Armor' ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Heavy Armor' ,isArmor:true}
                var myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Steel Armor' ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Chainmail' ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Heavy Steel' ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Cotton Robe' ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Mythril Armor' ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Imbued Robe' ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Delisirrian Arm.' ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Delisirrian Rob.' ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Hero's Armor"  ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Sage's Robe"  ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Mage's Robe"  ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Demon Mail"  ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);
                var settings = { _killed: true, itemName: "Spellweaved Robe"  ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Scorpion's Heart"  ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Scale Armor"  ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);


                var settings = { _killed: true, itemName: "Whirlwind Cape"  ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Bonemail"  ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Black Hood"  ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Terrafire"  ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Berserker"  ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Fallen Armor"  ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Flame Guard", isArmor: true };
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Elemental Armor"  ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);
                var settings = { _killed: true, itemName: "Demon's Heart"  ,isArmor:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                //Shield
                var settings = { _killed: true, itemName: 'Wooden Shield' ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Stone Shield' ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Practice Shield' ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Copper Shield' ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Bronze Shield' ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Iron Shield' ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Heavy Shield' ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Steel Shield' ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Hardened Shield' ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Mythril Shield' ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Magic Shield' ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Delisirrian Sld.' ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Red Shield' ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Blue Shield' ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Yellow Shield' ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Power Orb' ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Imbued Orb' ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);
                var settings = { _killed: true, itemName: "Hero's Shield" ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Giant's Shield" ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Magic Orb" ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

          

                var settings = { _killed: true, itemName: "Sting Shield" ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);



                var settings = { _killed: true, itemName: "Sacred Relic" ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Deformed Skull" ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Necro Book" ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Emberstone" ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

             

            

                var settings = { _killed: true, itemName: "Rage" ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);


               

                var settings = { _killed: true, itemName: "Demon Shield" ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);
                var settings = { _killed: true, itemName: "Demon Orb" ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

        
                var settings = { _killed: true, itemName: "Sovereign" ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);
                var settings = { _killed: true, itemName: "Summoning Stone" ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);
                var settings = { _killed: true, itemName: "Sage's Memento" ,isShield:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                //Sword
                
                var settings = { _killed: true, itemName: 'Wooden Sword'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Stone Sword'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Practice Sword'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Stick'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Wooden Staff'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Copper Sword'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Bronze Sword'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Slasher'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Copper Stick'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Bronze Staff'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Iron Blade'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                


                //
                var settings = { _killed: true, itemName: 'Iron Sword'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Iron Grand'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Iron Staff'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Imbued Stick'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Steel Sword'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Cleaver'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Iron Mallet'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Imbued Staff'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Grand Staff'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Mythril Sword'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Elven Blade'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Great Sword'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Mythril Staff'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Golden Oak'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Delisirrian Swd.'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Noble Blade'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Claymore'  ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Executor's Axe" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: 'Delisirrian Sta.' };
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Duelist's Blade" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Hero's Sword" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Grand Mallet" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Wizard's Staff" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);
                
                var settings = { _killed: true, itemName: "Piggy's Spike" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Holy Sword" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Blessed Staff" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Exploding Axe" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Devastator" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Oaken Pole" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Viper Slicer" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Green Staff" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Sand Sword" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Desert Star" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Blood Sword" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

            

                var settings = { _killed: true, itemName: "Dark Staff" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Flamebrand" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);



                var settings = { _killed: true, itemName: "Pyroforian" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);



             

             

                var settings = { _killed: true, itemName: "Axe of the Madman" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

              

                var settings = { _killed: true, itemName: "Agony" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);



                var settings = { _killed: true, itemName: "Mad Fury" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

                var settings = { _killed: true, itemName: "Cursed Mageslayer" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);





      

                var settings = { _killed: true, itemName: "Yggdrassil" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);



                var settings = { _killed: true, itemName: "Tetrarz" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);




                var settings = { _killed: true, itemName: "Frostfire Sword" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

          


              

                var settings = { _killed: true, itemName: "The Void" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);



                var settings = { _killed: true, itemName: "Abyss" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);

             

                var settings = { _killed: true, itemName: "Black Staff" ,isSword:true};
                myEnt = new EntityTreasureBig(-64, -64, settings);
                itemArray.push(myEnt);



             

        
            },

            buy_and_save: function(name,price){
   
           


                 
                    var maxTier = 7;
                    var extraTier = 0;
                    if(name === 'Wooden Chest'){
                        extraTier = 0;
                    }
                    else if(name === 'Iron Chest'){
                        extraTier = 1;
                    }
                    else if(name === 'Steel Chest'){
                        extraTier = 2;
                    }
                    else if(name === 'Magic Chest'){
                        extraTier = 3;
                    }
                    else if(name === 'Ancient Chest'){
                        extraTier = 4;
                    }
                  
                    if (ig.game.saveSlot === 1 && localStorage.getItem("SupraSave_1")) ig.game.loadObject1 = JSON.parse(localStorage.getItem("SupraSave_1"));
                    else if (ig.game.saveSlot === 2 && localStorage.getItem("SupraSave_2")) ig.game.loadObject2 = JSON.parse(localStorage.getItem("SupraSave_2"));
                    else if (ig.game.saveSlot === 3 && localStorage.getItem("SupraSave_3")) ig.game.loadObject3 = JSON.parse(localStorage.getItem("SupraSave_3"));
                   
                    var loadObject = null;
                    if (ig.game.saveSlot === 1 && ig.game.loadObject1) loadObject = ig.game.loadObject1;
                    else if (ig.game.saveSlot === 2 && ig.game.loadObject2) loadObject = ig.game.loadObject2;
                    else if (ig.game.saveSlot === 3 && ig.game.loadObject3) loadObject = ig.game.loadObject3;
                

                    var tier = ig.game.checkSpecialLevel(loadObject['Level']);
                    tier += extraTier;
                    if (tier > maxTier) tier = maxTier;
                    ig.game.itemLevel = tier;
                  
                    var item = new EntityRandomTreasure(-128, -128, { legbuf: extraTier / 2, epicbuf: extraTier, bonusStats: (1 + (0.05 * extraTier)), fixedItemLevel: true })
                
                    ig.game.gotItemBuy = true;
                    ig.game.lastItemBuy = item.itemName;

                    ig.game.lastItemQualityBuy = item.QualityLevel;

                    if (item.isSword) {
                        loadObject['weapon_array'].push(ig.game.ConvertItems(item));
                    }
                    if (item.isShield) {
                        loadObject['shield_array'].push(ig.game.ConvertItems(item));
                    }
                    if (item.isArmor) {
                        loadObject['armor_array'].push(ig.game.ConvertItems(item));
                    }

                    if (ig.game.saveSlot === 1) localStorage.setItem("SupraSave_1", JSON.stringify(loadObject));
                    else if (ig.game.saveSlot === 2) localStorage.setItem("SupraSave_2", JSON.stringify(loadObject));
                    else if (ig.game.saveSlot === 3) localStorage.setItem("SupraSave_3", JSON.stringify(loadObject));
                    return item.itemName;
                
               
            },
            repopulateArray: function (name, array) {
                var itemArray_length = ig.game.itemArray.length;
                var itemArray = ig.game.itemArray;
                for (var i = 0; i < itemArray_length; i++) {

                    if (itemArray[i].itemName === name) {

                        array.push(itemArray[i]);
                        break;
                    }
                }
            },
            extractName: function (array) {
                var newArray = new Array();
                var array_length = array.length;
                for (var i = 0; i < array_length; i++) {
                    newArray.push(array[i].itemName);

                }
                return newArray;
            },
            checkItemPrice: function(ArrayObj,isSingle){

                var item = null;

                if (!isSingle) {
                    if (ArrayObj[ig.game.input_location_equip]) item = ArrayObj[ig.game.input_location_equip];
                    else { return "null"; }
                }
                else {
                    if (ArrayObj) {
                        item = ArrayObj;
                    }
                    else {
                        return "null;"
                    }
                }
                // 
                
                return item.itemTier * 1 * item.QualityLevel * item.QualityLevel;
               
            },
            menuInput: function(){
                
                var game = ig.game;
                var player = game.player;
                if ((ig.input.pressed("screen")) && !ig.input.pressed("popup")) { ig.game.InfoText = false; }
                if (welcomeInvoked == true && ig.input.pressed('screen')) {
                    if (welcomeTimer > 0) {welcomeInvoked = false;}
                }
                else if (ig.input.released('menu') &&
					game.menuOpen('game_menu') && !ig.game.levelChangeButtonInvoked) {
                 
                    if (!game.game_menu && game.classSelection === false ) {
                        game.game_menu = true;
                        HUDElementsTo(false);
                        OptionElementsTo(true);
                        player.accel.x = 0;
					   
                    }
                    else {
                        game.game_menu = false;
                        HUDElementsTo(true);
                        OptionElementsTo(false);
                    }

                }
				/*				
                else if (ig.input.released('status') && game.game_menu === true) {
                    game.status_menu = true;
                    game.game_menu = false;
                    OptionElementsTo(false);
                }*/
			   
                else if ((ig.input.released('menu_musicOn')) && game.game_menu === true) {
                    if (!isMusicOn) { ig.music.volume = 0; isMusicOn = true; localStorage.setItem('isMusicOn', isMusicOn); ig.game.playMusic(ig.game.currentSong); }
                    else if (isMusicOn) { isMusicOn = false; localStorage.setItem('isMusicOn', isMusicOn); ig.music.stop(); }
                }
              /*  else if (ig.input.released("switch") && game.game_menu === true) {
									
                    if(game.buttonScheme == 6){game.buttonScheme = 0;}
                    else{game.buttonScheme++;}
                    localStorage.setItem("buttonScheme",ig.game.buttonScheme);
                    game.alignHUDButtons();
                }*/

                else if (ig.input.released('saveandquit') && game.game_menu === true) {
                    game.game_menu = false;
                   
            
                    player.HP_REGEN -= player.Amount_REGEN_Increased;
                    player.RegenOnFive = 0;
                    player.Amount_REGEN_Increased = 0;
                 
                  
                    OptionElementsTo(false);
                    HUDElementsTo(false);
                    ig.game.saveGame(ig.game.player);
                    if (CloudSyncOn) {
                        refreshAuthDisplay('microsoftaccount');
                    }
                    saveSkip = ig.game.saveSlot;
                    ig.system.setGame(MyGame);
                   
                }
									
                else if (ig.input.released('equipmenu')
                   && game.menuOpen() && !ig.game.levelChangeButtonInvoked
                    ) {
                   
                    HUDElementsTo(false);
                 
                    
                    EquipElementsTo(true);
                    game.CalculateStats(game.player);
                    if (player.weaponArray.length > 0) { game.equip_menu_swords = true; game.input_location_equip = player.checkEquipPos('weapon');}
                    else if (player.shieldArray.length > 0) { game.equip_menu_shields = true; game.input_location_equip = player.checkEquipPos('shield'); }
                    else if (player.armorArray.length > 0) { game.equip_menu_armor = true; game.input_location_equip = player.checkEquipPos('armor'); }
                    game.equip_menu = true;
                    player.accel.x = 0;
                }
/*
                else if (ig.input.released('shopmenu')
               && game.menuOpen()
                ) {

                    HUDElementsTo(false);


                    ShopElementsTo(true);

                   
                    game.shop_menu = true;
                    player.accel.x = 0;
                }
				*/					
									
                else if (ig.input.released('talents') && game.menuOpen()&&!ig.game.levelChangeButtonInvoked) {

                    HUDElementsTo(false);
                
                    if (game.player && game.player.CLASS === ''
                        ) {
                        game.classSelection = true;
                        ClassElements2To(true);
                   
                    }

                    else if (game.current_talent_menu != '') { game.openTalentMenu(game.current_talent_menu); } else {
                    
                       
                        game.openTalentMenu(game.player.CLASS);
                    }
                    player.TalentMenu = false;
                    player.accel.x = 0;
                    game.game_menu = false;
                }
                else if (ig.input.released('screen') && game.game_menu == true) {
                    game.game_menu = false;
                    HUDElementsTo(true);
                    OptionElementsTo(false);
                }

                else if((ig.game.blade_talents_menu === true ||
                    ig.game.magic_talents_menu === true ||
                    ig.game.life_talents_menu === true ||
                    ig.game.demon_talents_menu === true) &&
                    ig.game.talentConfirm === false
                    ){
                    
                    if (ig.input.released('BLDTalents')) {
                        ig.game.openTalentMenu("BLADE");
                        ig.game.shutTalentMenu("SPELL");
                        ig.game.shutTalentMenu("LIFE");
                        ig.game.shutTalentMenu("DEMON");
                    }
                    else if (ig.input.released('SPLTalents')) {
                        ig.game.openTalentMenu("SPELL");
                        ig.game.shutTalentMenu("BLADE");
                        ig.game.shutTalentMenu("LIFE");
                        ig.game.shutTalentMenu("DEMON");
                    }
                    else if (ig.input.released('LIFTalents')) {
                        ig.game.openTalentMenu("LIFE");
                        ig.game.shutTalentMenu("SPELL");
                        ig.game.shutTalentMenu("BLADE");
                        ig.game.shutTalentMenu("DEMON");
                    }
                    else if (ig.input.released('DEMTalents')) {
                        ig.game.openTalentMenu("DEMON");
                        ig.game.shutTalentMenu("LIFE");
                        ig.game.shutTalentMenu("SPELL");
                        ig.game.shutTalentMenu("BLADE");
                      
                    }
                    else if (ig.input.pressed('resetTalents')) {
                        if (game.blade_talents_menu ||
                            game.magic_talents_menu ||
                            game.life_talents_menu ||
                            game.demon_talents_menu

                            ) {





                            ig.game.player.BLADE_BIGPLAY = false;
                            ig.game.player.BLADE_BIGPLAY_LEVEL = 0;

                            ig.game.player.BLADE_BLOODLUST = false;
                            ig.game.player.BLADE_BLOODLUST_LEVEL = 0;

                            ig.game.player.BLADE_DOUBLEATTACK = false,
                            ig.game.player.BLADE_DOUBLEATTACK_LEVEL = 0;

                            ig.game.player.BLADE_ESCALATION = false;
                            ig.game.player.BLADE_ESCALATION_LEVEL = 0;

                            ig.game.player.BLADE_EXECUTE = false;
                            ig.game.player.BLADE_EXECUTE_LEVEL = 0;

                            ig.game.player.BLADE_FLURRY = false;
                            ig.game.player.BLADE_FLURRY_LEVEL = 0;

                            ig.game.player.BLADE_FRENZY = false;
                            ig.game.player.BLADE_FRENZY_LEVEL = 0;

                            ig.game.player.BLADE_PHANTOMSTRIKES = false;
                            ig.game.player.BLADE_PHANTOMSTRIKES_LEVEL = 0;

                            ig.game.player.BLADE_VIGOR = false;
                            ig.game.player.BLADE_VIGOR_LEVEL = 0;

                            ig.game.player.BLADE_SWORDSPECIALIST = false;
                            ig.game.player.BLADE_SWORDSPECIALIST_LEVEL = 0;

                            ig.game.player.BLADE_AXESPECIALIST = false;
                            ig.game.player.BLADE_AXESPECIALIST_LEVEL = 0;

                            ig.game.player.BLADE_SHOCKPULSE = false;
                            ig.game.player.BLADE_SHOCKPULSE_LEVEL = 0;

                            ig.game.player.BLADE_AMOUNT = 0;

                            ig.game.player.SPELL_ARCANEBALL = false;
                            ig.game.player.SPELL_ARCANEBALL_LEVEL = 0;

                            ig.game.player.SPELL_CRITICAL_COMBO_LEVEL = 0;
                            ig.game.player.SPELL_CRITICALCOMBO = false;

                            ig.game.player.SPELL_CRITICALRETURN = false;
                            ig.game.player.SPELL_CRITICALRETURN_LEVEL = 0;

                            ig.game.player.SPELL_DEEPFREEZE = false;
                            ig.game.player.SPELL_DEEPFREEZE_LEVEL = 0;

                            ig.game.player.SPELL_DEMOLISH = false;
                            ig.game.player.SPELL_DEMOLISH_LEVEL = 0;

                            ig.game.player.SPELL_ELEMENTALSYNERGY = false;
                            ig.game.player.SPELL_ELEMENTALSYNERGY_LEVEL = 0;

                            ig.game.player.SPELL_ENDLESSPOOL = false;
                            ig.game.player.SPELL_ENDLESSPOOL_LEVEL = 0;

                            ig.game.player.SPELL_FIRE_BLAST_LEVEL = 0;
                            ig.game.player.SPELL_FIREBLAST = false;

                            ig.game.player.SPELL_FOCUS = false;
                            ig.game.player.SPELL_FOCUS_LEVEL = 0;

                            ig.game.player.SPELL_FROSTFIRE = false;
                            ig.game.player.SPELL_FROSTFIRE_LEVEL = 0;

                            ig.game.player.SPELL_INTELLIGENCE = false;
                            ig.game.player.SPELL_INTELLIGENCE_LEVEL = 0;

                            ig.game.player.SPELL_AMOUNT = 0;

                            ig.game.player.LIFE_BURNINGHEART = false;
                            ig.game.player.LIFE_BURNINGHEART_LEVEL = 0;

                            ig.game.player.LIFE_BURNINGLIGHT = false;
                            ig.game.player.LIFE_BURNINGLIGHT_LEVEL = 0;

                            ig.game.player.LIFE_CALMMIND = false;
                            ig.game.player.LIFE_CALMMIND_LEVEL = 0;

                            ig.game.player.LIFE_EMPOWEREDSLASH = false;
                            ig.game.player.LIFE_EMPOWEREDSLASH_LEVEL = 0;

                            ig.game.player.LIFE_HOLYSLASH = false;
                            ig.game.player.LIFE_HOLYSLASH_LEVEL = 0;

                            ig.game.player.LIFE_HOLYBARRIER = false;
                            ig.game.player.LIFE_HOLYBARRIER_LEVEL = 0;

                            ig.game.player.LIFE_LASTSTAND = false;
                            ig.game.player.LIFE_LASTSTAND_LEVEL = 0;

                            ig.game.player.LIFE_LIFESPIRIT = false;
                            ig.game.player.LIFE_LIFESPIRIT_LEVEL = 0;

                            ig.game.player.LIFE_RADIANCE = false;
                            ig.game.player.LIFE_RADIANCE_LEVEL = 0;

                            ig.game.player.LIFE_RADIANTFURY = false;
                            ig.game.player.LIFE_RADIANTFURY_LEVEL = 0;

                            ig.game.player.LIFE_WALLOFJUSTICE = false;
                            ig.game.player.LIFE_WALLOFJUSTICE_LEVEL = 0;

                            ig.game.player.LIFE_ZEAL = false;
                            ig.game.player.LIFE_ZEAL_LEVEL = 0;

                            ig.game.player.LIFE_AMOUNT = 0;

                            ig.game.player.DEMON_DEMONICFORTITUDE= false;
                            ig.game.player.DEMON_VAMPIRISM= false;
                            
                            ig.game.player.DEMON_DARKRAGE= false;
                            ig.game.player.DEMON_MYSTICBARRIER= false;

                            ig.game.player.DEMON_DARKWAVE= false;
                            ig.game.player.DEMON_SACRIFICIALDRIVE= false;
                            ig.game.player.DEMON_EMPOWEREDDARKRAGE= false;

                            ig.game.player.DEMON_DEMONSTRENGTH= false;
                            ig.game.player.DEMON_DREADWAVE= false;
                            ig.game.player.DEMON_DEMONBLOOD= false;

                            ig.game.player.DEMON_DARKWILL = false;

                            ig.game.player.DEMON_DARKWILL_LEVEL = 0;

                            ig.game.player.DEMON_DEMONICFORTITUDE_LEVEL = 0;
                            ig.game.player.DEMON_VAMPIRISM_LEVEL = 0;

                            ig.game.player.DEMON_DARKRAGE_LEVEL = 0;
                            ig.game.player.DEMON_MYSTICBARRIER_LEVEL = 0;

                            ig.game.player.DEMON_DARKWAVE_LEVEL = 0;
                            ig.game.player.DEMON_SACRIFICIALDRIVE_LEVEL = 0;
                            ig.game.player.DEMON_EMPOWEREDDARKRAGE_LEVEL = 0;

                            ig.game.player.DEMON_DEMONSTRENGTH_LEVEL = 0;
                            ig.game.player.DEMON_DREADWAVE_LEVEL = 0;
                            ig.game.player.DEMON_DEMONBLOOD_LEVEL = 0;

                            ig.game.player.DEMON_DARKWILL_LEVEL = 0;

                            ig.game.player.skillSpheres = ig.game.player.LEVEL;

                            //Change skills according to CLASS

                            if (ig.game.player.CLASS === "BLADE") {
                                ig.game.player.currentActionSkill1 = "EntityPlayerSlash";
                                ig.game.player.currentActionSkill2 = "EntityPlayerSlash";

                                ig.game.player.currentAction1Manacost = 4;
                                ig.game.player.currentAction2Manacost = 4;
                            }
                            else if (ig.game.player.CLASS === "LIFE") {
                                ig.game.player.currentActionSkill1 = "EntityLifeSlash";
                                ig.game.player.currentActionSkill2 = "EntityLifeSlash";

                                ig.game.player.currentAction1Manacost = 1;
                                ig.game.player.currentAction2Manacost = 1;
                            }
                            else if (ig.game.player.CLASS === "SPELL") {
                                ig.game.player.currentActionSkill1 = "EntityFrostball";
                                ig.game.player.currentActionSkill2 = "EntityFrostball";

                                ig.game.player.currentAction1Manacost = 10;
                                ig.game.player.currentAction2Manacost = 10;
                            }
                            else if (ig.game.player.CLASS === "DEMON") {
                                ig.game.player.currentActionSkill1 = "EntityDemonSlash";
                                ig.game.player.currentActionSkill2 = "EntityDemonSlash";

                                ig.game.player.currentAction1Manacost = 0;
                                ig.game.player.currentAction2Manacost = 0;
                            }
                            else {
                                ig.game.player.currentActionSkill1 = "EntityWeakSlash";
                                ig.game.player.currentActionSkill2 = "EntityWeakSlash";

                                ig.game.player.currentAction1Manacost = 4;
                                ig.game.player.currentAction2Manacost = 4;
                            }

                            if (ig.game.player) ig.game.saveGame(null, ig.game.player, ig.game.saveSlot, true);

                            /*
                                this.currentActionSkill1 = "EntityPlayerSlash";
                                this.currentActionSkill2 = "EntityFireBlast";
                                this.currentAction1Manacost = 3;
                                this.currentAction2Manacost = 3;
                            */
                            this.equipmentChanged = true;
                        }
                    }
                }
                else if (game.status_menu) {
                    if (ig.game.BeastiaryOn == false) {
                        if (ig.input.pressed('esc')) { game.status_menu = false; game.game_menu = true; }

                        if (ig.input.pressed('status_goback')) {
                            player.StatusMenuGoBack = false;
                            game.status_menu = false; game.game_menu = true;
                            OptionElementsTo(true);
                            game.BeastiaryOn = false;
                            game.statusSpecialDraw = false;
                        }
                        else if (ig.input.pressed('monster_beast') && game.statusSpecialDraw == false) {
                            ig.game.BeastiaryOn = true;
                            ig.game.BeastiaryFound = ig.game.checkFound('monster');
                            ig.game.BeastiaryType = 'Monster';
                            // In 2.00 there are 11 monsters
                            // Decrease one because of the indexing in computers
                            ig.game.BeastiaryAvail = 10;
                            ig.game.BeastiaryInput = 0;

                        }
                        else if (ig.input.pressed('knight_beast') && game.statusSpecialDraw == false) {
                            ig.game.BeastiaryOn = true;
                            ig.game.BeastiaryFound = ig.game.checkFound('knight');
                            ig.game.BeastiaryType = 'Knight';
                            // In 2.00 there are 8 knights
                            ig.game.BeastiaryAvail = 7;
                            ig.game.BeastiaryInput = 0;
                        }
                        else if (ig.input.pressed('wizard_beast') && game.statusSpecialDraw == false) {
                            ig.game.BeastiaryOn = true;
                            ig.game.BeastiaryFound = ig.game.checkFound('wizard');
                            ig.game.BeastiaryType = 'Wizard';
                            // In 2.00 there are 9 wizards
                            ig.game.BeastiaryAvail = 8;
                            ig.game.BeastiaryInput = 0;
                        }
                        else if (ig.input.pressed('boss_beast') && game.statusSpecialDraw == false) {
                            ig.game.BeastiaryOn = true;
                            ig.game.BeastiaryFound = ig.game.checkFound('boss');
                            ig.game.BeastiaryType = 'Boss';
                            // In 2.00 there are 9 bosses
                            ig.game.BeastiaryAvail = 8;
                            ig.game.BeastiaryInput = 0;
                        }
                        else if (ig.input.pressed('specialButton') && game.statusSpecialDraw == true) {
                            game.statusSpecialDraw = false;
                        }
                        else if ((ig.input.pressed('special_1_sw') && game.firstSpecial_w != "")) {
                            game.statusSpecialDraw = (game.statusSpecialDraw == true) ? false : true;
                            game.statusSpecialDraw_text = game.firstSpecial_w;
                         
                        }
                        else if (ig.input.pressed('special_2_sw') && game.secondSpecial_w != "") {
                            game.statusSpecialDraw = (game.statusSpecialDraw == true) ? false : true;
                            game.statusSpecialDraw_text = game.secondSpecial_w;
                        }
                        else if (ig.input.pressed('special_3_sw') && game.thirdSpecial_w != "") {
                            game.statusSpecialDraw = (game.statusSpecialDraw == true) ? false : true;
                            game.statusSpecialDraw_text = game.thirdSpecial_w;
                        }

                        else if (ig.input.pressed('special_1_ss') && game.firstSpecial_s != "") {
                            game.statusSpecialDraw = (game.statusSpecialDraw == true) ? false : true;
                            game.statusSpecialDraw_text = game.firstSpecial_s;
                        }
                        else if (ig.input.pressed('special_2_ss') && game.secondSpecial_s != "") {
                            game.statusSpecialDraw = (game.statusSpecialDraw == true) ? false : true;
                            game.statusSpecialDraw_text = game.secondSpecial_s;
                        }
                        else if (ig.input.pressed('special_3_ss') && game.thirdSpecial_s != "") {
                            game.statusSpecialDraw = (game.statusSpecialDraw == true) ? false : true;
                            game.statusSpecialDraw_text = game.thirdSpecial_s;
                        }

                        else if (ig.input.pressed('special_1_sa') && game.firstSpecial_a != "") {
                            game.statusSpecialDraw = (game.statusSpecialDraw == true) ? false : true;
                            game.statusSpecialDraw_text = game.firstSpecial_a;
                        }
                        else if (ig.input.pressed('special_2_sa') && game.secondSpecial_a != "") {
                            game.statusSpecialDraw = (game.statusSpecialDraw == true) ? false : true;
                            game.statusSpecialDraw_text = game.secondSpecial_a;
                        }
                        else if (ig.input.pressed('special_3_sa') && game.thirdSpecial_a != "") {

                            game.statusSpecialDraw = (game.statusSpecialDraw == true) ? false : true;
                            game.statusSpecialDraw_text = game.thirdSpecial_a;
                        }
                    } else {
                        if (ig.input.pressed('beast_Back')) {
                            ig.game.BeastiaryOn = false;
                        }
                        else if (ig.input.pressed('beast_Next')) {
                            if (ig.game.BeastiaryInput >= ig.game.BeastiaryAvail) { ig.game.BeastiaryInput = 0; }
                            else { ig.game.BeastiaryInput++; }

                        }
                        else if (ig.input.pressed('beast_Prev')) {
                            if (ig.game.BeastiaryInput <= 0) { ig.game.BeastiaryInput = ig.game.BeastiaryAvail; }
                            else { ig.game.BeastiaryInput--; }
                        }
                    }

                }

            
                    // equip menu
                else if (game.equip_menu) {

             
                   
                    if (!(game.specialOpen()) && ig.input.released('specialButton')) { game.special_1_info = false; game.special_2_info = false; game.special_3_info = false; EquipElementsTo(false,'goBackequipmenu'); }
                    else if (ig.input.released('goBackequipmenu') && game.specialOpen()) {
                        HUDElementsTo(true);
                        EquipElementsTo(false);
                        
                        game.special_1_info = false; game.special_2_info = false; game.special_3_info = false; game.equip_menu = false; player.EquipGoBack = false; player.EquipMenu = false; game.equip_menu_swords = false; game.equip_menu_shields = false; game.equip_menu_armor = false;
                    }

                    else if (ig.input.released('equipsword') && game.specialOpen()) {
                        console.log("HEP");
                        if (game.equip_menu_swords) {

                            game.input_location_equip = 0; game.equip_menu_swords = false;
                        } else {

                            game.input_location_equip = game.player.checkEquipPos('weapon'); game.equip_menu_swords = true; game.equip_menu_shields = false; game.equip_menu_armor = false; game.equip_menu_accessory_1 = false; game.equip_menu_accessory_2 = false; game.equip_menu_amulet = false;
                        }
                    }
                    else if (ig.input.released('equipshield') && game.specialOpen()) {
                        if (game.equip_menu_shields) {

                            game.input_location_equip = 0; game.equip_menu_shields = false;
                        } else {

                            game.input_location_equip = game.player.checkEquipPos('shield'); game.equip_menu_swords = false; game.equip_menu_shields = true; game.equip_menu_armor = false; game.equip_menu_accessory_1 = false; game.equip_menu_accessory_2 = false; game.equip_menu_amulet = false;
                        }
                    }
                    else if (ig.input.released('equiparmor') && game.specialOpen()) {
                        if (game.equip_menu_armor) {

                            game.input_location_equip = 0; game.equip_menu_armor = false;
                        } else {

                            game.input_location_equip = game.player.checkEquipPos('armor'); game.equip_menu_swords = false; game.equip_menu_shields = false; game.equip_menu_armor = true; game.equip_menu_accessory_1 = false; game.equip_menu_accessory_2 = false; game.equip_menu_amulet = false;
                        }
                    }


                    else if ((ig.input.released('equipItem') || ig.input.released('equipItem2')) && game.specialOpen()) {
                        player.EquipItem = false; game.equip_invoke = true; 
                        
                    }
                    //else if(ig.input.pressed('unequipItem')){game.unequip_invoke = true;this.equipmentChanged=true;}
                    if ((ig.input.pressed('up') || ig.input.released('equipItemScrollUp')) && game.specialOpen()) {
                        ig.game.equipmentSmoother = 0;
                        ig.game.bufferEquipmentY = 0;
                      
                        if (game.input_location_equip === 0) { game.input_location_equip = 0; } else { game.input_location_equip--; } player.GoUp = false;
                    }
                    if ((ig.input.pressed('down') || ig.input.released('equipItemScrollDown')) && game.specialOpen()) {
                        ig.game.equipmentSmoother = 0;
                        ig.game.bufferEquipmentY = 0;
                     
                        if (game.equip_menu_armor == true) {


                            if (game.input_location_equip == (game.player.armorArray.length - 1)) {
                                game.input_location_equip = (game.player.armorArray.length - 1);
                            } else { game.input_location_equip++; }


                        }
                        else if (game.equip_menu_shields == true) {

                            if (game.input_location_equip == (game.player.shieldArray.length - 1)) {
                                game.input_location_equip = (game.player.shieldArray.length - 1);
                            } else { game.input_location_equip++; }
                        }
                        else if (game.equip_menu_swords == true) {

                            if (game.input_location_equip == (game.player.weaponArray.length - 1)) {
                                game.input_location_equip = (game.player.weaponArray.length - 1);
                            } else { game.input_location_equip++; }
                        }
                    }
                   
                    if (game.equip_menu_swords) { ig.game.checkSpecialBtn('w'); }
                    else if (game.equip_menu_armor) { ig.game.checkSpecialBtn('a'); }
                    else if (game.equip_menu_shields) { ig.game.checkSpecialBtn('s'); }

                }
            },
            displayClassInformation: function(){

            },
            //Class Selection
            checkClassInput: function(){
               
                var game = ig.game;
                var player = game.player;
                if (!(game.lifeClassInfo === true || game.bladeClassInfo === true || game.wizardClassInfo === true || game.demonClassInfo === true)) {
                    if (ig.input.released('BladeClass')) {
                        game.bladeClassInfo = true;
                        ig.game.myTouchButtons.searchButton("SelectClass", true);
                        ig.game.myTouchButtons.searchButton("CancelClass", true);
                        ClassElements2To(false);
                        ClassElementsTo(false);
                        ClassElementsTo(true, "BLADE");
                    }
                    else if (ig.input.released('WizardClass')) {
                        game.wizardClassInfo = true;
                        ig.game.myTouchButtons.searchButton("SelectClass", true);
                        ig.game.myTouchButtons.searchButton("CancelClass", true);
                        ClassElements2To(false);

                        ClassElementsTo(false);
                        ClassElementsTo(true, "SPELL");
                    }
                    else if (ig.input.released('LifeClass')) {
                        game.lifeClassInfo = true;
                        ig.game.myTouchButtons.searchButton("SelectClass", true);
                        ig.game.myTouchButtons.searchButton("CancelClass", true);
                        ClassElements2To(false);

                        ClassElementsTo(false);
                        ClassElementsTo(true, "LIFE");
                    }
                    else if (ig.input.released('DemonClass')) {
                        game.demonClassInfo = true;
                        ig.game.myTouchButtons.searchButton("SelectClass", true);
                        ig.game.myTouchButtons.searchButton("CancelClass", true);
                        ClassElements2To(false);

                        ClassElementsTo(false);
                        ClassElementsTo(true, "DEMON");
                    }

                }

                if (game.bladeClassInfo === true && ig.input.released('PlayerSlashInfo')) {
                    ig.game.myTouchButtons.searchButton("SelectClass", false);
                    ig.game.myTouchButtons.searchButton("CancelClass", false);
                    game.talent_info = game.parseRetText('Slash: \nBasic melee attack. ', 'skilldesc');
                    game.talentSelected = 'BLADE_PLAYERSLASH_INFO';
                    game.smallDesc = "Physical";
                    game.talentConfirm = true;
                    ClassElementsTo(true, "INFO");
                }
                else if (game.bladeClassInfo === true && ig.input.released('ShockWaveInfo')) {
                    ig.game.myTouchButtons.searchButton("SelectClass", false);
                    ig.game.myTouchButtons.searchButton("CancelClass", false);
                    game.talent_info = game.parseRetText("Shock Hands: \nEvery 5th attack causes a 'Shock Wave'.", 'skilldesc');
                    game.talentSelected = 'BLADE_SHOCKWAVE_INFO';
                    game.smallDesc = "Physical";
                    game.talentConfirm = true;
                    ClassElementsTo(true, "INFO");
                }
                else if (game.wizardClassInfo === true && ig.input.released('FrostBallInfo')) {
                    ig.game.myTouchButtons.searchButton("SelectClass", false);
                    ig.game.myTouchButtons.searchButton("CancelClass", false);
                    game.talent_info = game.parseRetText("Frost Ball: \nMagical projectile that has increased chance to hit critically (+25%). Chills enemies.", 'skilldesc');
                    game.talentSelected = 'SPELL_FROSTBALL_INFO';
                    game.smallDesc = "Magical";
                    game.talentConfirm = true;
                    ClassElementsTo(true, "INFO");
                }
                else if (game.lifeClassInfo === true && ig.input.released('LifeSlashInfo')) {
                    ig.game.myTouchButtons.searchButton("SelectClass", false);
                    ig.game.myTouchButtons.searchButton("CancelClass", false);
                    game.talent_info = game.parseRetText("Life Slash: \nMelee attack imbued with holy energies. Chance of giving 'Holy Power' buff.", 'skilldesc');
                    game.talentSelected = 'LIFE_LIFESLASH_INFO';
                    game.smallDesc = "Mixed";
                    game.talentConfirm = true;
                    ClassElementsTo(true, "INFO");
                }
                  
                else if (game.lifeClassInfo === true && ig.input.released('HolyPowerInfo')) {
                    ig.game.myTouchButtons.searchButton("SelectClass", false);
                    ig.game.myTouchButtons.searchButton("CancelClass", false);
                    game.talent_info = game.parseRetText("Holy Power: \nReplenishes 10 HP & MP. The 'Holy Power' can be amplified greatly.", 'skilldesc');
                    game.talentSelected = 'LIFE_HOLYPOWER_INFO';
                    game.smallDesc = "";
                    game.talentConfirm = true;
                    ClassElementsTo(true,"INFO");
                }

                else if (game.demonClassInfo === true && ig.input.released('DemonSlashInfo')) {
                    
                    ig.game.myTouchButtons.searchButton("SelectClass", false);
                    ig.game.myTouchButtons.searchButton("CancelClass", false);
                    game.talent_info = game.parseRetText("Demon Slash: \nDemonic Melee Slash. 5% of health is used to power up attacks.", 'skilldesc');
                    game.talentSelected = 'DEMON_DEMONSLASH_INFO';
                    game.smallDesc = "Mixed";
                    game.talentConfirm = true;
                    ClassElementsTo(true, "INFO");
                }

                else if (game.demonClassInfo === true && ig.input.released('BloodEnergyInfo')) {
                    ig.game.myTouchButtons.searchButton("SelectClass", false);
                    ig.game.myTouchButtons.searchButton("CancelClass", false);
                    game.talent_info = game.parseRetText("Blood Energy: \Health is used instead of mana for abilities.", 'skilldesc');
                    game.talentSelected = 'DEMON_BLOODENERGY_INFO';
                    game.smallDesc = "";
                    game.talentConfirm = true;
                    ClassElementsTo(true, "INFO");
                }

                else if ((game.lifeClassInfo === true || game.bladeClassInfo === true || game.wizardClassInfo === true || game.demonClassInfo) &&
                    
                    ig.input.released('CancelInfo') && game.talentConfirm === true) {
                    game.talent_info = "";
                    game.talentSelected = '';
                    game.smallDesc = "";
                    game.talentConfirm = false;
                    ClassElementsTo(false, "INFO");
                    ig.game.myTouchButtons.searchButton("SelectClass", true);
                    ig.game.myTouchButtons.searchButton("CancelClass", true);
           
                }
                else if (game.bladeClassInfo === true && ig.input.released('SelectClass') && game.talentConfirm === false) {
                    ig.game.myTouchButtons.searchButton("SelectClass", false);
                    ig.game.myTouchButtons.searchButton("CancelClass", false);
                    ClassElementsTo(false, "BLADE");
                    game.openTalentMenu('BLADE');
                    game.classSelection = false;
                    game.classSelected = 'Blademaster';
                    ig.game.player.CLASS = "BLADE";
                    game.bladeClassInfo = false;
                    game.lifeClassInfo = false;
                    game.wizardClassInfo = false;
                    game.demonClassInfo = false;
                    ig.game.player.currentActionSkill1 = 'EntityPlayerSlash'; ig.game.player.currentAction1Manacost = 4;
                    ig.game.player.currentActionSkill2 = 'EntityPlayerSlash'; ig.game.player.currentAction2Manacost = 4;
                    ig.game.player.equipmentChanged = true;
                }
                else if (game.wizardClassInfo === true && ig.input.released('SelectClass') && game.talentConfirm === false) {
                    ig.game.myTouchButtons.searchButton("SelectClass", false);
                    ig.game.myTouchButtons.searchButton("CancelClass", false);
                    ClassElementsTo(false, "SPELL");
                    game.openTalentMenu('SPELL');
                    game.classSelection = false;
                    game.classSelected = 'Wizard';
                    ig.game.player.CLASS = "SPELL";
                    game.bladeClassInfo = false;
                    game.lifeClassInfo = false;
                    game.wizardClassInfo = false;
                    game.demonClassInfo = false;
                    ig.game.player.currentActionSkill1 = 'EntityFrostball'; ig.game.player.currentAction1Manacost = 10;
                    ig.game.player.currentActionSkill2 = 'EntityFrostball'; ig.game.player.currentAction2Manacost = 10;
                    ig.game.player.equipmentChanged = true;
                }
                else if (game.lifeClassInfo === true && ig.input.released('SelectClass') && game.talentConfirm === false) {
                    ig.game.myTouchButtons.searchButton("SelectClass", false);
                    ig.game.myTouchButtons.searchButton("CancelClass", false);
                    ClassElementsTo(false, "LIFE");
                    game.openTalentMenu('LIFE');
                    game.classSelection = false;
                    game.classSelected = 'Life Warrior';
                    ig.game.player.CLASS = "LIFE";
                    game.bladeClassInfo = false;
                    game.lifeClassInfo = false;
                    game.wizardClassInfo = false;
                    game.demonClassInfo = false;
                    ig.game.player.currentActionSkill1 = 'EntityLifeSlash'; ig.game.player.currentAction1Manacost = 1;
                    ig.game.player.currentActionSkill2 = 'EntityLifeSlash'; ig.game.player.currentAction2Manacost = 1;
                    ig.game.player.equipmentChanged = true;
                }
                else if (game.demonClassInfo === true && ig.input.released('SelectClass') && game.talentConfirm === false) {
                    ig.game.myTouchButtons.searchButton("SelectClass", false);
                    ig.game.myTouchButtons.searchButton("CancelClass", false);
                    ClassElementsTo(false, "DEMON");
                    game.openTalentMenu('DEMON');
                    game.classSelection = false;
                    game.classSelected = 'Demon Knight';
                    ig.game.player.CLASS = "DEMON";
                    game.bladeClassInfo = false;
                    game.lifeClassInfo = false;
                    game.wizardClassInfo = false;
                    game.demonClassInfo = false;
                    ig.game.player.currentActionSkill1 = 'EntityDemonSlash'; ig.game.player.currentAction1Manacost = 0;
                    ig.game.player.currentActionSkill2 = 'EntityDemonSlash'; ig.game.player.currentAction2Manacost = 0;
                    ig.game.player.equipmentChanged = true;
                }
                else if ((game.lifeClassInfo === true || game.bladeClassInfo === true || game.wizardClassInfo === true || game.demonClassInfo === true) &&

                    ig.input.released('CancelClass')) {
                    ig.game.myTouchButtons.searchButton("SelectClass", false);
                    ig.game.myTouchButtons.searchButton("CancelClass", false);
                    game.bladeClassInfo = false;
                    game.lifeClassInfo = false;
                    game.wizardClassInfo = false;
                    game.demonClassInfo = false;
                    ClassElementsTo(false, "BLADE");
                    ClassElementsTo(false, "SPELL");
                    ClassElementsTo(false, "LIFE");
                    ClassElementsTo(false, "DEMON");
                    ClassElements2To(true);

                }

                
                return game.talentConfirm;

               
            },
            checkIfCanBeSelected: function () {

                var game = ig.game;
                var player = game.player;
                game.talentCannotBeSelected = 0;
                if (game.talentSelected == 'BLADE_VIGOR') {
                    if (player.skillSpheres > 0) {


                     

                      
                    } else { game.talentCannotBeSelected = 2; }

                    if (player.BLADE_VIGOR_LEVEL < 5)
                    { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if(game.talentSelected == 'BLADE_FLURRY') {
                    if (player.skillSpheres > 0) {


                     

                      
                    } else { game.talentCannotBeSelected = 2; }

                    if (player.BLADE_FLURRY_LEVEL < 5) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if(game.talentSelected == 'BLADE_FRENZY') {
                    if (player.skillSpheres > 0 && player.BLADE_AMOUNT >= 5) {


                    
                    } else { game.talentCannotBeSelected = 2; }


                    if (player.BLADE_FRENZY_LEVEL < 5) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if(game.talentSelected == 'BLADE_DOUBLEATTACK') {
                    if (player.skillSpheres > 0 && player.BLADE_AMOUNT >= 5) {


                
                    } else { game.talentCannotBeSelected = 2; }

                    if (player.BLADE_DOUBLEATTACK_LEVEL < 4) { }
                    else { game.talentCannotBeSelected = 1; }
                }

                else if(game.talentSelected == 'BLADE_SHOCKPULSE') {
                    if (player.skillSpheres > 0 && player.BLADE_AMOUNT >= 5) {


                  
                    } else { game.talentCannotBeSelected = 2; }

                    if (player.BLADE_SHOCKPULSE_LEVEL < 1) { }
                    else { game.talentCannotBeSelected = 1; }
                }

                else if(game.talentSelected == 'BLADE_ESCALATION') {
                    if (player.skillSpheres > 0 && player.BLADE_AMOUNT >= 10) {


                     
                    } else { game.talentCannotBeSelected = 2; }

                    if (player.BLADE_ESCALATION_LEVEL < 4) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if(game.talentSelected == 'BLADE_EXECUTE') {
                    if (player.skillSpheres > 0 && player.BLADE_AMOUNT >= 10) {


                       
                       
                    } else { game.talentCannotBeSelected = 2; }

                    if (player.BLADE_EXECUTE_LEVEL < 1) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if(game.talentSelected == 'BLADE_BLOODLUST') {
                    if (player.skillSpheres > 0 && player.BLADE_AMOUNT >= 10 && player.BLADE_FRENZY_LEVEL === 5) {

                    } else { game.talentCannotBeSelected = 2; }


                    if (player.BLADE_BLOODLUST_LEVEL < 5) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if(game.talentSelected == 'BLADE_FRENZY') {
                    if (player.skillSpheres > 0 && player.BLADE_AMOUNT >= 5) {


                    } else { game.talentCannotBeSelected = 2; }


                    if (player.BLADE_FRENZY_LEVEL < 4) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if(game.talentSelected == 'BLADE_BIGPLAY') {
                    if (player.skillSpheres > 0 && player.BLADE_AMOUNT >= 15) {


                    } else { game.talentCannotBeSelected = 2; }


                    if (player.BLADE_BIGPLAY_LEVEL < 4) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if(game.talentSelected == 'BLADE_SWORDSPECIALIST') {
                    if (player.skillSpheres > 0 && player.BLADE_AMOUNT >= 15) {


                     
                       
                    } else { game.talentCannotBeSelected = 2; }
                    if (player.BLADE_SWORDSPECIALIST_LEVEL < 3) { }
                    else { game.talentCannotBeSelected = 1; }
                }

                else if(game.talentSelected == 'BLADE_AXESPECIALIST') {
                    if (player.skillSpheres > 0 && player.BLADE_AMOUNT >= 15) {

                       
                  
                    } else { game.talentCannotBeSelected = 2; }
                    if (player.BLADE_AXESPECIALIST_LEVEL < 3) { }
                    else { game.talentCannotBeSelected = 1; }
                }

                else if(game.talentSelected == 'BLADE_PHANTOMSTRIKES') {
                    if (player.skillSpheres > 0 && player.BLADE_AMOUNT >= 20) {

                       
                
                    } else { game.talentCannotBeSelected = 2; }
                    if (player.BLADE_PHANTOMSTRIKES_LEVEL < 1) { }
                    else { game.talentCannotBeSelected = 1; }
                }

                if (game.talentSelected == 'LIFE_BURNINGHEART') {
                  
                    if (player.skillSpheres > 0) {

                       
                       
                    
                    } else { game.talentCannotBeSelected = 2; }
                    if (player.LIFE_BURNINGHEART_LEVEL < 5) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if (game.talentSelected == 'LIFE_LIFESPIRIT') {
                    if (player.skillSpheres > 0) {

                       
                        
                    } else { game.talentCannotBeSelected = 2; }
                    if (player.LIFE_LIFESPIRIT_LEVEL < 5) { }
                    else { game.talentCannotBeSelected = 1; }
                }

                else if (game.talentSelected == 'LIFE_EMPOWEREDSLASH') {
                    if (player.skillSpheres > 0 && player.LIFE_AMOUNT >= 5) {

                        
                     
                    } else { game.talentCannotBeSelected = 2; }
                    if (player.LIFE_EMPOWEREDSLASH_LEVEL < 6) { }
                    else { game.talentCannotBeSelected = 1; }

                }

                else if (game.talentSelected == 'LIFE_RADIANCE') {
                    if (player.skillSpheres > 0 && player.LIFE_AMOUNT >= 5) {

                        
                   
                    } else { game.talentCannotBeSelected = 2; }
                    if (player.LIFE_RADIANCE_LEVEL < 1) { }

                    else { game.talentCannotBeSelected = 1; }
                }
                else if (game.talentSelected == 'LIFE_CALMMIND') {
                    if (player.skillSpheres > 0 && player.LIFE_AMOUNT >= 5) {


                       
                
                       
                    } else { game.talentCannotBeSelected = 2; }
                    if (player.LIFE_CALMMIND_LEVEL < 3) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if (game.talentSelected == 'LIFE_HOLYBARRIER') {
                    if (player.skillSpheres > 0 && player.LIFE_AMOUNT >= 10) {

                       
                    
                       
                    } else { game.talentCannotBeSelected = 2; }
                    if (player.LIFE_HOLYBARRIER_LEVEL < 1) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if (game.talentSelected == 'LIFE_WALLOFJUSTICE') {
                    if (player.skillSpheres > 0 && player.LIFE_AMOUNT >= 10) {

                       
                  
                        
                    } else { game.talentCannotBeSelected = 2; }
                    if (player.LIFE_WALLOFJUSTICE_LEVEL < 5) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if (game.talentSelected == 'LIFE_RADIANTFURY') {
                    if (player.skillSpheres > 0 && player.LIFE_AMOUNT >= 10) {

                       
                   
                        
                    } else { game.talentCannotBeSelected = 2; }
                    if (player.LIFE_RADIANTFURY < 4) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if (game.talentSelected == 'LIFE_ZEAL') {
                    if (player.skillSpheres > 0 && player.LIFE_AMOUNT >= 15) {

                        
                  
                        
                    } else { game.talentCannotBeSelected = 2; }
                    if (player.LIFE_ZEAL_LEVEL < 1) { }
                    else { game.talentCannotBeSelected = 1; }
                }

                else if (game.talentSelected == 'LIFE_BURNINGLIGHT') {
                    if (player.skillSpheres > 0 && player.LIFE_AMOUNT >= 15) {

                      
             
                        
                    } else { game.talentCannotBeSelected = 2; }
                    if (player.LIFE_BURNINGLIGHT_LEVEL < 5) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if (game.talentSelected == 'LIFE_LASTSTAND') {
                    if (player.skillSpheres > 0 && player.LIFE_AMOUNT >= 15) {

                        
                
                       
                    } else { game.talentCannotBeSelected = 2; }
                    if (player.LIFE_LASTSTAND_LEVEL < 4) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if (game.talentSelected == 'LIFE_HOLYSLASH') {
                    if (player.skillSpheres > 0 && player.LIFE_AMOUNT >= 20) {

                       
           
                    
                    } else { game.talentCannotBeSelected = 2; }
                    if (player.LIFE_HOLYSLASH_LEVEL < 1) { }
                    else { game.talentCannotBeSelected = 1; }
                }

                if (game.talentSelected == 'SPELL_INTELLIGENCE') {
                    if (player.skillSpheres > 0) {

                        
                    
                       
                    } else { game.talentCannotBeSelected = 2; }
                    if (player.SPELL_INTELLIGENCE_LEVEL < 5) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if (game.talentSelected == 'SPELL_FOCUS') {
                    if (player.skillSpheres > 0) {

                        
              
                      
                    } else { game.talentCannotBeSelected = 2; }
                    if (player.SPELL_FOCUS_LEVEL < 5) { }
                    else { game.talentCannotBeSelected = 1; }
                }

                else if (game.talentSelected == 'SPELL_CRITICALRETURN') {
                    if (player.skillSpheres > 0 && player.SPELL_AMOUNT >= 5) {

                       
             
                    } else { game.talentCannotBeSelected = 2; }
                    if (player.SPELL_CRITICALRETURN_LEVEL < 4) { }
                    else { game.talentCannotBeSelected = 1; }

                }

                else if (game.talentSelected == 'SPELL_FIREBLAST') {
                    if (player.skillSpheres > 0 && player.SPELL_AMOUNT >= 5) {

                        
                   
                        
                    } else { game.talentCannotBeSelected = 2; }
                    if (player.SPELL_FIRE_BLAST_LEVEL < 1) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if (game.talentSelected == 'SPELL_ENDLESSPOOL') {
                    if (player.skillSpheres > 0 && player.SPELL_AMOUNT >= 5) {


                        
                  
                        
                    } else { game.talentCannotBeSelected = 2; }
                    if (player.SPELL_ENDLESSPOOL_LEVEL < 5) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if (game.talentSelected == 'SPELL_DEMOLISH') {
              
                    if (player.skillSpheres > 0 && player.SPELL_AMOUNT >= 10 && player.SPELL_FIRE_BLAST_LEVEL === 1) {

            
                       
                    } else { game.talentCannotBeSelected = 2; }

                    if (player.SPELL_DEMOLISH_LEVEL < 5) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if (game.talentSelected == 'SPELL_CRITICALCOMBO') {
                    if (player.skillSpheres > 0 && player.SPELL_AMOUNT >= 10) {

                     
              
                    } else { game.talentCannotBeSelected = 2; }
                    if (player.SPELL_CRITICAL_COMBO_LEVEL < 5) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if (game.talentSelected == 'SPELL_ELEMENTALSYNERGY') {
                    if (player.skillSpheres > 0 && player.SPELL_AMOUNT >= 15) {

                
                    } else { game.talentCannotBeSelected = 2; }

                    if (player.SPELL_ELEMENTALSYNERGY_LEVEL < 5) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if (game.talentSelected == 'SPELL_DEEPFREEZE') {
                    if (player.skillSpheres > 0 && player.SPELL_AMOUNT >= 15) {

                 
                    } else { game.talentCannotBeSelected = 2; }

                    if (player.SPELL_DEEPFREEZE_LEVEL < 4) { }
                    else { game.talentCannotBeSelected = 1; }
                }

                else if (game.talentSelected == 'SPELL_FROSTFIRE') {
                    if (player.skillSpheres > 0 && player.SPELL_AMOUNT >= 15) {

                
                    } else { game.talentCannotBeSelected = 2; }

                    if (player.SPELL_FROSTFIRE_LEVEL < 1) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if (game.talentSelected == 'SPELL_ARCANEBALL') {
                    if (player.skillSpheres > 0 && player.SPELL_AMOUNT >= 20 && player.SPELL_FROSTFIRE_LEVEL >= 1) {

                      
                    } else { game.talentCannotBeSelected = 2; }

                    if (player.SPELL_ARCANEBALL_LEVEL < 1) { }
                    else { game.talentCannotBeSelected = 1; }
                }


                //HEP

                if (game.talentSelected == 'DEMON_DEMONICFORTITUDE') {
                    if (player.skillSpheres > 0) {




                    } else { game.talentCannotBeSelected = 2; }
                    if (player.DEMON_DEMONICFORTITUDE_LEVEL < 5) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if (game.talentSelected == 'DEMON_VAMPIRISM') {
                    if (player.skillSpheres > 0) {




                    } else { game.talentCannotBeSelected = 2; }
                    if (player.DEMON_VAMPIRISM_LEVEL < 5) { }
                    else { game.talentCannotBeSelected = 1; }
                }

                else if (game.talentSelected == 'DEMON_MYSTICBARRIER') {
                    if (player.skillSpheres > 0 && player.DEMON_AMOUNT >= 5) {



                    } else { game.talentCannotBeSelected = 2; }
                    if (player.DEMON_MYSTICBARRIER_LEVEL < 5) { }
                    else { game.talentCannotBeSelected = 1; }

                }

                else if (game.talentSelected == 'DEMON_DARKRAGE') {
                    if (player.skillSpheres > 0 && player.DEMON_AMOUNT >= 5) {




                    } else { game.talentCannotBeSelected = 2; }
                    if (player.DEMON_DARKRAGE_LEVEL < 5) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                
                else if (game.talentSelected == 'DEMON_DARKWAVE') {

                    if (player.skillSpheres > 0 && player.DEMON_AMOUNT >= 10) {



                    } else { game.talentCannotBeSelected = 2; }

                    if (player.DEMON_DARKWAVE_LEVEL < 1) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if (game.talentSelected == 'DEMON_EMPOWEREDDARKRAGE') {
                    if (player.skillSpheres > 0 && player.DEMON_AMOUNT >= 10 && player.DEMON_DARKRAGE) {



                    } else { game.talentCannotBeSelected = 2; }
                    if (player.DEMON_EMPOWEREDDARKRAGE_LEVEL < 4) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if (game.talentSelected == 'DEMON_SACRIFICIALDRIVE') {
                    if (player.skillSpheres > 0 && player.DEMON_AMOUNT >= 10) {


                    } else { game.talentCannotBeSelected = 2; }

                    if (player.DEMON_SACRIFICIALDRIVE_LEVEL < 5) { }
                    else { game.talentCannotBeSelected = 1; }
                }
                else if (game.talentSelected == 'DEMON_DREADWAVE') {
                    if (player.skillSpheres > 0 && player.DEMON_AMOUNT >= 15 && player.DEMON_DARKWAVE) {


                    } else { game.talentCannotBeSelected = 2; }

                    if (player.DEMON_DREADWAVE_LEVEL < 1) { }
                    else { game.talentCannotBeSelected = 1; }
                }

                else if (game.talentSelected == 'DEMON_DEMONSTRENGTH') {
                    if (player.skillSpheres > 0 && player.DEMON_AMOUNT >= 15) {


                    } else { game.talentCannotBeSelected = 2; }
                   
                    if (player.DEMON_DEMONSTRENGTH_LEVEL < 5) { }
                    else { game.talentCannotBeSelected = 1; }
         
                }

                else if (game.talentSelected == 'DEMON_DEMONBLOOD') {
                    if (player.skillSpheres > 0 && player.DEMON_AMOUNT >= 15) {


                    } else { game.talentCannotBeSelected = 2; }

                    if (player.DEMON_DEMONBLOOD_LEVEL < 4) { }
                    else { game.talentCannotBeSelected = 1; }
                }

                else if (game.talentSelected == 'DEMON_DARKWILL') {
                    if (player.skillSpheres > 0 && player.DEMON_AMOUNT >= 20) {


                    } else { game.talentCannotBeSelected = 2; }

                    if (player.DEMON_DARKWILL_LEVEL < 1) { }
                    else { game.talentCannotBeSelected = 1; }
                }


            },
            //Talent Selection input
            checkSelectionInput: function(type){
                var game = ig.game;
               
                
                if (ig.input.released('Select_Talent') && game.talentConfirm === true && game.talentCannotBeSelected === 0) {
                    ig.game.myTouchButtons.searchButton("Select_Talent", false);
                    ig.game.myTouchButtons.searchButton("Cancel_Talent", false);
                    ig.game.myTouchButtons.toggleByString(type,true);
                    game.talentConfirm = false;
                    
                    if (type === "BLADE") {
                      
                        if(game.talentSelected == 'BLADE_VIGOR') {
                            if (ig.game.player.skillSpheres > 0) {
                                

                                ig.game.player.BLADE_VIGOR = true;
                                if (ig.game.player.BLADE_VIGOR_LEVEL < 5)
                                {  ig.game.player.BLADE_VIGOR_LEVEL++; ig.game.player.skillSpheres -= 1; }

                                ig.game.player.equipmentChanged = true;
                            }
                        }
                        else if(game.talentSelected == 'BLADE_FLURRY') {
                            if (ig.game.player.skillSpheres > 0) {


                                ig.game.player.BLADE_FLURRY = true;
                                if (ig.game.player.BLADE_FLURRY_LEVEL < 5) { ig.game.player.BLADE_FLURRY_LEVEL++; ig.game.player.skillSpheres -= 1; }

                                ig.game.player.equipmentChanged = true;
                            }
                        }
                        else if(game.talentSelected == 'BLADE_FRENZY') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.BLADE_AMOUNT >= 5) {


                                ig.game.player.BLADE_FRENZY = true;
                                if (ig.game.player.BLADE_FRENZY_LEVEL < 5) { ig.game.player.BLADE_FRENZY_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }
                        else if(game.talentSelected == 'BLADE_DOUBLEATTACK') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.BLADE_AMOUNT >= 5) {


                                ig.game.player.BLADE_DOUBLEATTACK = true;
                                if (ig.game.player.BLADE_DOUBLEATTACK_LEVEL < 4) { ig.game.player.BLADE_DOUBLEATTACK_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }

                        else if(game.talentSelected == 'BLADE_SHOCKPULSE') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.BLADE_AMOUNT >= 5) {


                                ig.game.player.BLADE_SHOCKPULSE = true;
                                if (ig.game.player.BLADE_SHOCKPULSE_LEVEL < 1) { ig.game.player.BLADE_SHOCKPULSE_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                                ig.game.player.currentAction2Manacost = 10;
                                ig.game.player.currentActionSkill2 = "EntityShockpulse";
                            }
                        }

                        else if(game.talentSelected == 'BLADE_ESCALATION') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.BLADE_AMOUNT >= 10) {


                                ig.game.player.BLADE_ESCALATION = true;
                                if (ig.game.player.BLADE_ESCALATION_LEVEL < 4) { ig.game.player.BLADE_ESCALATION_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }
                        else if(game.talentSelected == 'BLADE_EXECUTE') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.BLADE_AMOUNT >= 10) {


                                ig.game.player.BLADE_EXECUTE = true;
                                if (ig.game.player.BLADE_EXECUTE_LEVEL < 1) { ig.game.player.BLADE_EXECUTE_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }
                        else if(game.talentSelected == 'BLADE_BLOODLUST') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.BLADE_AMOUNT >= 10 && ig.game.player.BLADE_FRENZY_LEVEL === 5) {


                                ig.game.player.BLADE_BLOODLUST = true;
                                if (ig.game.player.BLADE_BLOODLUST_LEVEL < 5) { ig.game.player.BLADE_BLOODLUST_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }
                        else if(game.talentSelected == 'BLADE_FRENZY') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.BLADE_AMOUNT >= 5) {


                                ig.game.player.BLADE_FRENZY = true;
                                if (ig.game.player.BLADE_FRENZYY_LEVEL < 5) { ig.game.player.BLADE_FRENZY_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }
                        else if(game.talentSelected == 'BLADE_BIGPLAY') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.BLADE_AMOUNT >= 15) {


                                ig.game.player.BLADE_BIGPLAY = true;
                                if (ig.game.player.BLADE_BIGPLAY_LEVEL < 4) { ig.game.player.BLADE_BIGPLAY_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }
                        else if(game.talentSelected == 'BLADE_SWORDSPECIALIST') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.BLADE_AMOUNT >= 15) {


                                ig.game.player.BLADE_SWORDSPECIALIST = true;
                                if (ig.game.player.BLADE_SWORDSPECIALIST_LEVEL < 3) { ig.game.player.BLADE_SWORDSPECIALIST_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }

                        else if(game.talentSelected == 'BLADE_AXESPECIALIST') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.BLADE_AMOUNT >= 15) {

                                ig.game.player.BLADE_AXESPECIALIST = true;
                                if (ig.game.player.BLADE_AXESPECIALIST_LEVEL < 3) { ig.game.player.BLADE_AXESPECIALIST_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }

                        else if(game.talentSelected == 'BLADE_PHANTOMSTRIKES') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.BLADE_AMOUNT >= 20) {

                                ig.game.player.BLADE_PHANTOMSTRIKES = true;
                                if (ig.game.player.BLADE_PHANTOMSTRIKES_LEVEL < 1) { ig.game.player.BLADE_PHANTOMSTRIKES_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }

              
                    }
                    else if (type === "LIFE") {
                        if(game.talentSelected == 'LIFE_BURNINGHEART') {
                            if (ig.game.player.skillSpheres > 0) {

                                ig.game.player.LIFE_BURNINGHEART = true;
                                if (ig.game.player.LIFE_BURNINGHEART_LEVEL < 5) { ig.game.player.LIFE_BURNINGHEART_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }
                        else if(game.talentSelected == 'LIFE_LIFESPIRIT') {
                            if (ig.game.player.skillSpheres > 0) {

                                ig.game.player.LIFE_LIFESPIRIT = true;
                                if (ig.game.player.LIFE_LIFESPIRIT_LEVEL < 5) { ig.game.player.LIFE_LIFESPIRIT_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }

                        else if(game.talentSelected == 'LIFE_EMPOWEREDSLASH') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.LIFE_AMOUNT >= 5) {

                                ig.game.player.LIFE_EMPOWEREDSLASH = true;
                                if (ig.game.player.LIFE_EMPOWEREDSLASH_LEVEL < 6) { ig.game.player.LIFE_EMPOWEREDSLASH_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }

                        else if(game.talentSelected == 'LIFE_RADIANCE') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.LIFE_AMOUNT >= 5) {

                                ig.game.player.LIFE_RADIANCE = true;
                                if (ig.game.player.LIFE_RADIANCE_LEVEL < 1) { ig.game.player.LIFE_RADIANCE_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                                ig.game.player.currentAction2Manacost = ig.game.player.Maxmana * 0.9;
                                ig.game.player.currentActionSkill2 = "EntityRadiance";
                            }
                        }
                        else if(game.talentSelected == 'LIFE_CALMMIND') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.LIFE_AMOUNT >= 5) {


                                ig.game.player.LIFE_CALMMIND = true;
                                if (ig.game.player.LIFE_CALMMIND_LEVEL < 3) { ig.game.player.LIFE_CALMMIND_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }
                        else if(game.talentSelected == 'LIFE_HOLYBARRIER') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.LIFE_AMOUNT >= 10) {

                                ig.game.player.LIFE_HOLYBARRIER = true;
                                if (ig.game.player.LIFE_HOLYBARRIER_LEVEL < 1) { ig.game.player.LIFE_HOLYBARRIER_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }
                        else if(game.talentSelected == 'LIFE_WALLOFJUSTICE') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.LIFE_AMOUNT >= 10) {

                                ig.game.player.LIFE_WALLOFJUSTICE = true;
                                if (ig.game.player.LIFE_WALLOFJUSTICE_LEVEL < 5) { ig.game.player.LIFE_WALLOFJUSTICE_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }
                        else if(game.talentSelected == 'LIFE_RADIANTFURY') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.LIFE_AMOUNT >= 10) {

                                ig.game.player.LIFE_RADIANTFURY = true;
                                if (ig.game.player.LIFE_RADIANTFURY_LEVEL < 4) { ig.game.player.LIFE_RADIANTFURY_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }
                        else if(game.talentSelected == 'LIFE_ZEAL') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.LIFE_AMOUNT >= 15) {

                                ig.game.player.LIFE_ZEAL = true;
                                if (ig.game.player.LIFE_ZEAL_LEVEL < 1) { ig.game.player.LIFE_ZEAL_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }

                        else if(game.talentSelected == 'LIFE_BURNINGLIGHT') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.LIFE_AMOUNT >= 15) {

                                ig.game.player.LIFE_BURNINGLIGHT = true;
                                if (ig.game.player.LIFE_BURNINGLIGHT_LEVEL < 5) { ig.game.player.LIFE_BURNINGLIGHT_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }
                        else if(game.talentSelected == 'LIFE_LASTSTAND') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.LIFE_AMOUNT >= 15) {

                                ig.game.player.LIFE_LASTSTAND = true;
                                if (ig.game.player.LIFE_LASTSTAND_LEVEL < 4) { ig.game.player.LIFE_LASTSTAND_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }
                        else if(game.talentSelected == 'LIFE_HOLYSLASH') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.LIFE_AMOUNT >= 20) {

                                ig.game.player.LIFE_HOLYSLASH = true;
                                if (ig.game.player.LIFE_HOLYSLASH_LEVEL < 1) { ig.game.player.LIFE_HOLYSLASH_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }


                    }
                    else if (type === "SPELL") {
                        if(game.talentSelected == 'SPELL_INTELLIGENCE') {
                            if (ig.game.player.skillSpheres > 0) {

                                ig.game.player.SPELL_INTELLIGENCE = true;
                                if (ig.game.player.SPELL_INTELLIGENCE_LEVEL < 5) { ig.game.player.SPELL_INTELLIGENCE_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }
                        else if(game.talentSelected == 'SPELL_FOCUS') {
                            if (ig.game.player.skillSpheres > 0) {

                                ig.game.player.SPELL_FOCUS = true;
                                if (ig.game.player.SPELL_FOCUS_LEVEL < 5) { ig.game.player.SPELL_FOCUS_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }

                        else if(game.talentSelected == 'SPELL_CRITICALRETURN') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.SPELL_AMOUNT >= 5) {

                                ig.game.player.SPELL_CRITICALRETURN = true;
                                if (ig.game.player.SPELL_CRITICALRETURN_LEVEL < 4) { ig.game.player.SPELL_CRITICALRETURN_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }

                        else if(game.talentSelected == 'SPELL_FIREBLAST') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.SPELL_AMOUNT >= 5) {

                                ig.game.player.SPELL_FIREBLAST = true;
                                if (ig.game.player.SPELL_FIRE_BLAST_LEVEL < 1) { ig.game.player.SPELL_FIRE_BLAST_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                                ig.game.player.currentAction2Manacost = 15;
                                ig.game.player.currentActionSkill2 = "EntityFireBlast";
                          
                            }
                        }
                        else if(game.talentSelected == 'SPELL_ENDLESSPOOL') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.SPELL_AMOUNT >= 5) {


                                ig.game.player.SPELL_ENDLESSPOOL = true;
                                if (ig.game.player.SPELL_ENDLESSPOOL_LEVEL < 5) { ig.game.player.SPELL_ENDLESSPOOL_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }
                        else if (game.talentSelected == 'SPELL_DEMOLISH') {
                          
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.SPELL_AMOUNT >= 10 && ig.game.player.SPELL_FIRE_BLAST_LEVEL === 1) {

                                ig.game.player.SPELL_DEMOLISH = true;
                                if (ig.game.player.SPELL_DEMOLISH_LEVEL < 5) { ig.game.player.SPELL_DEMOLISH_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }
                        else if(game.talentSelected == 'SPELL_CRITICALCOMBO') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.SPELL_AMOUNT >= 10) {

                                ig.game.player.SPELL_CRITICALCOMBO = true;
                                if (ig.game.player.SPELL_CRITICAL_COMBO_LEVEL < 5) { ig.game.player.SPELL_CRITICAL_COMBO_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }
                        else if(game.talentSelected == 'SPELL_ELEMENTALSYNERGY') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.SPELL_AMOUNT >= 15) {

                                ig.game.player.SPELL_ELEMENTALSYNERGY = true;
                                if (ig.game.player.SPELL_ELEMENTALSYNERGY_LEVEL < 5) { ig.game.player.SPELL_ELEMENTALSYNERGY_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }
                        else if(game.talentSelected == 'SPELL_DEEPFREEZE') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.SPELL_AMOUNT >= 15) {

                                ig.game.player.SPELL_DEEPFREEZE = true;
                                if (ig.game.player.SPELL_DEEPFREEZE_LEVEL < 4) { ig.game.player.SPELL_DEEPFREEZE_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }

                        else if(game.talentSelected == 'SPELL_FROSTFIRE') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.SPELL_AMOUNT >= 15) {

                                ig.game.player.SPELL_FROSTFIRE = true;
                                if (ig.game.player.SPELL_FROSTFIRE_LEVEL < 1) { ig.game.player.SPELL_FROSTFIRE_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                                ig.game.player.currentAction1Manacost = 25;
                                ig.game.player.currentAction2Manacost = 25;
                                ig.game.player.currentActionSkill1 = "EntityFrostFire";
                                ig.game.player.currentActionSkill2 = "EntityFrostFire";
                            }
                        }
                        else if(game.talentSelected == 'SPELL_ARCANEBALL') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.SPELL_AMOUNT >= 20) {

                                ig.game.player.SPELL_ARCANEBALL = true;
                                if (ig.game.player.SPELL_ARCANEBALL_LEVEL < 1) { ig.game.player.SPELL_ARCANEBALL_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                                ig.game.player.currentAction2Manacost = 50;
                                ig.game.player.currentActionSkill2 = "EntityArcaneBall";
                            }
                        }

                      
                    }
                    else if (type === "DEMON") {
                        if (game.talentSelected == 'DEMON_DEMONICFORTITUDE') {
                            if (ig.game.player.skillSpheres > 0) {

                                ig.game.player.DEMON_DEMONICFORTITUDE = true;
                                if (ig.game.player.DEMON_DEMONICFORTITUDE_LEVEL < 5) { ig.game.player.DEMON_DEMONICFORTITUDE_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }
                        else if (game.talentSelected == 'DEMON_VAMPIRISM') {
                            if (ig.game.player.skillSpheres > 0) {

                                ig.game.player.DEMON_VAMPIRISM = true;
                                if (ig.game.player.DEMON_VAMPIRISM_LEVEL < 5) { ig.game.player.DEMON_VAMPIRISM_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }

                        else if (game.talentSelected == 'DEMON_DARKRAGE') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.DEMON_AMOUNT >= 5) {

                                ig.game.player.DEMON_DARKRAGE = true;
                                if (ig.game.player.DEMON_DARKRAGE_LEVEL < 5) { ig.game.player.DEMON_DARKRAGE_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }

                        else if (game.talentSelected == 'DEMON_MYSTICBARRIER') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.DEMON_AMOUNT >= 5) {

                                ig.game.player.DEMON_MYSTICBARRIER = true;
                                if (ig.game.player.DEMON_MYSTICBARRIER_LEVEL < 5) { ig.game.player.DEMON_MYSTICBARRIER_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                              
                            }
                        }
                        
                        else if (game.talentSelected == 'DEMON_DARKWAVE') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.DEMON_AMOUNT >= 10) {

                                ig.game.player.DEMON_DARKWAVE = true;
                                if (ig.game.player.DEMON_DARKWAVE_LEVEL < 1) { ig.game.player.DEMON_DARKWAVE_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                                ig.game.player.currentAction2Manacost = 0;
                                ig.game.player.currentActionSkill2 = "EntityDarkWave";
                            }
                        }
                        else if (game.talentSelected == 'DEMON_SACRIFICIALDRIVE') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.DEMON_AMOUNT >= 10) {

                                ig.game.player.DEMON_SACRIFICIALDRIVE = true;
                                if (ig.game.player.DEMON_SACRIFICIALDRIVE_LEVEL < 5) { ig.game.player.DEMON_SACRIFICIALDRIVE_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }
                        else if (game.talentSelected == 'DEMON_EMPOWEREDDARKRAGE') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.DEMON_AMOUNT >= 10) {

                                ig.game.player.DEMON_EMPOWEREDDARKRAGE = true;
                                if (ig.game.player.DEMON_EMPOWEREDDARKRAGE_LEVEL < 4) { ig.game.player.DEMON_EMPOWEREDDARKRAGE_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }
                        else if (game.talentSelected == 'DEMON_DEMONSTRENGTH') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.DEMON_AMOUNT >= 15) {

                                ig.game.player.DEMON_DEMONSTRENGTH = true;
                                if (ig.game.player.DEMON_DEMONSTRENGTH_LEVEL < 5) { ig.game.player.DEMON_DEMONSTRENGTH_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }

                        else if (game.talentSelected == 'DEMON_DEMONBLOOD') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.DEMON_AMOUNT >= 15) {

                                ig.game.player.DEMON_DEMONBLOOD = true;
                                if (ig.game.player.DEMON_DEMONBLOOD_LEVEL < 4) { ig.game.player.DEMON_DEMONBLOOD_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }
                        else if (game.talentSelected == 'DEMON_DREADWAVE') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.DEMON_AMOUNT >= 15) {

                                ig.game.player.DEMON_DREADWAVE = true;
                                if (ig.game.player.DEMON_DREADWAVE_LEVEL < 1) { ig.game.player.DEMON_DREADWAVE_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                                ig.game.player.currentAction2Manacost = 0;
                                ig.game.player.currentActionSkill2 = "EntityDreadWave";
                            }
                        }
                        else if (game.talentSelected == 'DEMON_DARKWILL') {
                            if (ig.game.player.skillSpheres > 0 && ig.game.player.DEMON_AMOUNT >= 20) {

                                ig.game.player.DEMON_DARKWILL = true;
                                if (ig.game.player.DEMON_DARKWILL_LEVEL < 1) { ig.game.player.DEMON_DARKWILL_LEVEL++; ig.game.player.skillSpheres -= 1; }
                                ig.game.player.equipmentChanged = true;
                            }
                        }


                    }
                    game.CalculateStats(game.player);
                    game.talentSelected = "";
                    game.skipInput = false;
                    if(ig.game.player)ig.game.saveGame(null, ig.game.player, ig.game.saveSlot, true);
                }
                else if (ig.input.released('Cancel_Talent')) {
                    ig.game.myTouchButtons.toggleByString(type, true);
                    ig.game.myTouchButtons.searchButton("Select_Talent", false);
                    ig.game.myTouchButtons.searchButton("Cancel_Talent", false);
                    game.talentConfirm = false;
                    game.talentSelected = "";

                }
            },
            checkTalentInput: function () {
                var game = ig.game;
                var player = game.player;
                if (!player) return;
              
                if (game.blade_talents_menu) {

                    if (game.skipInput === false) {
                        game.skipInput = true;
                        return;
                    }
                    if (ig.input.released('GoBackTalentScreen') &&
                    ig.game.talentConfirm === false) {
                        player.Talent_GoBackSelection = false;
                        game.skipInput = false;
                        SkillElementsTo(false);
                        HUDElementsTo(true);
                       
                        ig.game.myTouchButtons.toggleByString("BLADE", false);
                        game.talent_info = ''; game.blade_talents_menu = false;
                    }
                    
                    if (game.talentConfirm === false) {
                       
                        var bufVal = 1;
                        if (ig.input.released('BLADE_VIGOR')) {

                            ig.game.myTouchButtons.toggleByString('BLADE', false);
                            game.talentSelected = 'BLADE_VIGOR';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            
                      
                       
                           
                           
                            if (game.talentCannotBeSelected === 1 ) {
                                bufVal = 0;
                            }
                            game.talent_info = 'Vigor: \nIncrease STR & AGI by ' + (game.player.BLADE_VIGOR_LEVEL + bufVal) * 2;
                         
                            game.talentConfirm = true;
                        }
                        if (ig.input.released('BLADE_FLURRY')) {

                            ig.game.myTouchButtons.toggleByString('BLADE', false);
                            game.talentSelected = 'BLADE_FLURRY';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = 'Flurry: \nIncrease critical chance by ' +( (game.player.BLADE_FLURRY_LEVEL + bufVal) * 2) + '%';
                            game.talentConfirm = true;
                        }

                        if (ig.input.released('BLADE_FRENZY')) {
                          
                            ig.game.myTouchButtons.toggleByString('BLADE', false);
                            game.talentSelected = 'BLADE_FRENZY';
                            game.checkIfCanBeSelected();
                       
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = 'Frenzy: \nEach consecutive hit temporarily gives '+((game.player.BLADE_FRENZY_LEVEL+ bufVal) * 0.5)+'% health bonus. (Up to 20%)';
                            game.talentConfirm = true;
                        }
                        if (ig.input.released('BLADE_SHOCKPULSE')) {

                            ig.game.myTouchButtons.toggleByString('BLADE', false);
                            game.talentSelected = 'BLADE_SHOCKPULSE';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            game.talent_info = ' Shock Pulse: [SKILL]\nLess desctructive version of Shock Wave. Projectile.';
                            game.talentConfirm = true;
                        }

                        if (ig.input.released('BLADE_DOUBLEATTACK')) {

                            ig.game.myTouchButtons.toggleByString('BLADE', false);
                            game.talentSelected = 'BLADE_DOUBLEATTACK';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = 'Double Attack: \n'+((game.player.BLADE_DOUBLEATTACK_LEVEL+ bufVal) * 4)+'% Chance to duplicate the attack.';
                            game.talentConfirm = true;
                        }
                        if (ig.input.released('BLADE_ESCALATION')) {

                            ig.game.myTouchButtons.toggleByString('BLADE', false);
                            game.talentSelected = 'BLADE_ESCALATION';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = 'Escalation: \nWhen a total sum of '+(400 - ((game.player.BLADE_ESCALATION_LEVEL+ bufVal) * 50))+' damage has been done, increase crit % by 15 for 5 seconds.';
                            game.talentConfirm = true;
                        }

                        if (ig.input.released('BLADE_EXECUTE')) {

                            ig.game.myTouchButtons.toggleByString('BLADE', false);
                            game.talent_info = 'Execute: \n+25% Critical chance if the target has less than 33% health.';
                            game.talentSelected = 'BLADE_EXECUTE';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            game.talentConfirm = true;
                        }
                        if (ig.input.released('BLADE_BLOODLUST')) {

                            ig.game.myTouchButtons.toggleByString('BLADE', false);
                            game.talentSelected = 'BLADE_BLOODLUST';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = 'BLADE - Bloodlust: \nEach kill gives +'+((game.player.BLADE_BLOODLUST_LEVEL+ bufVal) * 1)+'STR/AGI buff for 10 seconds. Overkill damage restores mana.';
                            game.talentConfirm = true;
                        }
                        if (ig.input.released('BLADE_BIGPLAY')) {
                            ig.game.myTouchButtons.toggleByString('BLADE', false);
                            game.talent_info = 'Big Play: \nThe lower health, the higher critical damage.';
                            game.talentSelected = 'BLADE_BIGPLAY';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            game.talentConfirm = true;
                        }
                        if (ig.input.released('BLADE_SWORDSPECIALIST')) {

                            ig.game.myTouchButtons.toggleByString('BLADE', false);
                            game.talentSelected = 'BLADE_SWORDSPECIALIST';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = 'Sword Specialist: \n'+((game.player.BLADE_SWORDSPECIALIST_LEVEL+ bufVal) * 10)+'% more AGI from Swords. +'+((game.player.BLADE_SWORDSPECIALIST_LEVEL+ bufVal) * 3)+'% chance for "Double Attack"';
                            game.talentConfirm = true;
                        }
                        if (ig.input.released('BLADE_AXESPECIALIST')) {
                            ig.game.myTouchButtons.toggleByString('BLADE', false);
                            game.talentSelected = 'BLADE_AXESPECIALIST';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = 'Axe Specialist: \n' + ((game.player.BLADE_SWORDSPECIALIST_LEVEL + bufVal) * 10) + '% more STR from Axes. +' + ((game.player.BLADE_SWORDSPECIALIST_LEVEL + bufVal) * 5) + '% damage on low health target';
                           
                            game.talentConfirm = true;
                        }

                        if (ig.input.released('BLADE_PHANTOMSTRIKES')) {
                            ig.game.myTouchButtons.toggleByString('BLADE', false);
                            game.talent_info = 'Phantom Strikes: \nInstead of critically hitting, you now attack twice.';
                            game.talentSelected = 'BLADE_PHANTOMSTRIKES';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            game.talentConfirm = true;
                        }
                    }
                    else {
                        game.checkSelectionInput("BLADE");
                    }
             
                    /*if (ig.input.released('Select_Talent') || player.Talent_Selection === true) {
                    
                        player.Talent_Selection = false;*/

                   
                    //  }
                   

                }

                else if (game.magic_talents_menu) {
                    if (game.skipInput === false) {
                        game.skipInput = true;
                        return;
                    }
                    if (ig.input.released('GoBackTalentScreen') &&
                    ig.game.talentConfirm === false) {
                        player.Talent_GoBackSelection = false;
                        SkillElementsTo(false);
                        HUDElementsTo(true);
                        ig.game.myTouchButtons.toggleByString("SPELL", false);
                        game.talent_info = ''; game.magic_talents_menu = false; 
                        game.skipInput = false;
                    }
                 
                    if (game.talentConfirm === false) {
                        var bufVal = 1;
                        if (ig.input.released('SPELL_INTELLIGENCE')) {

                            ig.game.myTouchButtons.toggleByString('SPELL', false);
                            game.talentSelected = 'SPELL_INTELLIGENCE';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = 'Intelligence: \nIncreases INT by '+(game.player.SPELL_INTELLIGENCE_LEVEL+ bufVal)*3+'%.';
                            game.talentConfirm = true;
                        }
                        if (ig.input.released('SPELL_FOCUS')) {

                            ig.game.myTouchButtons.toggleByString('SPELL', false);
                            game.talentSelected = 'SPELL_FOCUS';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = 'Focus: \nIncreases mana regen by '+(game.player.SPELL_FOCUS_LEVEL+ bufVal)*1+'.';
                            game.talentConfirm = true;
                        }


                        if (ig.input.released('SPELL_CRITICALRETURN')) {

                            ig.game.myTouchButtons.toggleByString('SPELL', false);
                            game.talentSelected = 'SPELL_CRITICALRETURN';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                        
                            game.talent_info = 'Critical Return: \n' + (game.player.SPELL_CRITICALRETURN_LEVEL + bufVal) * 20 + '% chance of refunding spell manacost on critical hit.';
                            game.talentConfirm = true;
                        }

                        if (ig.input.released('SPELL_FIREBLAST')) {
                            ig.game.myTouchButtons.toggleByString('SPELL', false);
                            game.talent_info = 'Fireblast: [SKILL]\nHigh damage, high manacost spell. Burns.';
                            game.talentSelected = 'SPELL_FIREBLAST';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            game.talentConfirm = true;
                        
                        }
                        if (ig.input.released('SPELL_ENDLESSPOOL')) {

                            ig.game.myTouchButtons.toggleByString('SPELL', false);
                            game.talentSelected = 'SPELL_ENDLESSPOOL';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = 'Endless Pool:\nIncreases MP by '+(game.player.SPELL_ENDLESSPOOL_LEVEL+ bufVal)*5+'%';
                            game.talentConfirm = true;
                        }

                        if (ig.input.released('SPELL_DEMOLISH')) {

                            ig.game.myTouchButtons.toggleByString('SPELL', false);
                            game.talentSelected = 'SPELL_DEMOLISH';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = (game.player.SPELL_DEMOLISH_LEVEL+ bufVal)*10 +'% Chance of causing fire-explosion that transforms ' + (game.player.SPELL_DEMOLISH_LEVEL + bufVal)  + "% of enemy's max health to mana. ";
                            game.talentConfirm = true;
                        }
                        if (ig.input.released('SPELL_CRITICALCOMBO')) {
                            ig.game.myTouchButtons.toggleByString('SPELL', false);
                           
                            game.talentSelected = 'SPELL_CRITICALCOMBO';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = "Critical Combo: \nScoring critical hit has\n" + (game.player.SPELL_CRITICAL_COMBO_LEVEL+bufVal) * 20 + "% chance to spawn\n'Arcane Ball' -spell.";
                            game.talentConfirm = true;
                        }



                        if (ig.input.released('SPELL_ELEMENTALSYNERGY')) {

                            ig.game.myTouchButtons.toggleByString('SPELL', false);
                            game.talentSelected = 'SPELL_ELEMENTALSYNERGY';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = 'Elemental Synergy: \nChilled enemies take '+(game.player.SPELL_ELEMENTALSYNERGY_LEVEL+ bufVal)*20+'% increased burn damage.';
                            game.talentConfirm = true;
                        }
                        if (ig.input.released('SPELL_DEEPFREEZE')) {

                            ig.game.myTouchButtons.toggleByString('SPELL', false);
                            game.talentSelected = 'SPELL_DEEPFREEZE';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = 'Deep Freeze: \nIncreases chill duration for '+((game.player.SPELL_DEEPFREEZE_LEVEL+ bufVal)*0.5+0.5)+' second(s).';
                            game.talentConfirm = true;
                        }
                        if (ig.input.released('SPELL_FROSTFIRE')) {
                            ig.game.myTouchButtons.toggleByString('SPELL', false);
                            game.talent_info = 'Frost Fire: [SKILL]\nSpell that inflicts both burn and chill to the enemy.';
                            game.talentSelected = 'SPELL_FROSTFIRE';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            game.talentConfirm = true;
                        
                        }

                        if (ig.input.released('SPELL_ARCANEBALL')) {
                            ig.game.myTouchButtons.toggleByString('SPELL', false);
                            game.talent_info = 'Arcane Ball: [SKILL]\nSpell that inflicts extra damage if target is chilled and burning.';
                            game.talentSelected = 'SPELL_ARCANEBALL';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            game.talentConfirm = true;
                      
                        }
                    }
                    else {
                        game.checkSelectionInput("SPELL");
                    }
                   
                    /*if (ig.input.pressed('Select_Talent') || player.Talent_Selection === true) {
                        player.Talent_Selection = false;*/
                   
                    // }


                }
                else if (game.life_talents_menu) {

                    if (game.skipInput === false) {
                        game.skipInput = true;
                        return;
                    }
                    if (ig.input.released('GoBackTalentScreen') &&
                    ig.game.talentConfirm === false) {
                        player.Talent_GoBackSelection = false;
                        SkillElementsTo(false);
                        HUDElementsTo(true);
                        ig.game.myTouchButtons.toggleByString("LIFE", false);
                        game.skipInput = false;

                        game.talent_info = ''; game.life_talents_menu = false;
                    }

                    if (game.talentConfirm === false) {

                        var bufVal = 1;
                        if (ig.input.released('LIFE_BURNINGHEART')) {


                            ig.game.myTouchButtons.toggleByString('LIFE', false);
                            game.talentSelected = 'LIFE_BURNINGHEART';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);
                             
                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                           
                            game.talent_info = 'Burning Heart: \nIncrease STR  & INT by '+(game.player.LIFE_BURNINGHEART_LEVEL+ bufVal)*1+'%';
                            game.talentConfirm = true;
                        }
                        if (ig.input.released('LIFE_LIFESPIRIT')) {


                            ig.game.myTouchButtons.toggleByString('LIFE', false);
                            game.talentSelected = 'LIFE_LIFESPIRIT';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = 'Life Spirit: \nIncrease Max. HP & MP by '+(game.player.LIFE_LIFESPIRIT_LEVEL+ bufVal)*2+'%';
                            game.talentConfirm = true;
                        }

                        if (ig.input.released('LIFE_EMPOWEREDSLASH')) {

                            ig.game.myTouchButtons.toggleByString('LIFE', false);
                            game.talentSelected = 'LIFE_EMPOWEREDSLASH';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = "Empowered Slash:\nIncreases chance to trigger 'Holy Power' by "+(game.player.LIFE_EMPOWEREDSLASH_LEVEL+ bufVal)*5+"%" ;
                            game.talentConfirm = true;
                        }
                        if (ig.input.released('LIFE_RADIANCE')) {

                            ig.game.myTouchButtons.toggleByString('LIFE', false);
                            game.talent_info = 'Radiance: [SKILL]\nExplode your mana reserves for magical damage.';
                            game.talentSelected = 'LIFE_RADIANCE';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            game.talentConfirm = true;
                           
                        }

                        if (ig.input.released('LIFE_CALMMIND')) {

                            ig.game.myTouchButtons.toggleByString('LIFE', false);
                            game.talentSelected = 'LIFE_CALMMIND';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = "Calm Mind:\nHalve the critical chance. Increases STR/INT by " + (game.player.LIFE_CALMMIND_LEVEL + bufVal) * 8 + "%.";
                            game.talentConfirm = true;
                        }
                        if (ig.input.released('LIFE_HOLYBARRIER')) {
                            ig.game.myTouchButtons.toggleByString('LIFE', false);
                            game.talent_info = "Holy Barrier: \n'Holy Power' also casts a barrier that shields from damage.";
                            game.talentSelected = 'LIFE_HOLYBARRIER';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            game.talentConfirm = true;
                        }

                        if (ig.input.released('LIFE_WALLOFJUSTICE')) {


                            ig.game.myTouchButtons.toggleByString('LIFE', false);
                            game.talentSelected = 'LIFE_WALLOFJUSTICE';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = 'Wall of Justice:\n Block chance +'+(game.player.LIFE_WALLOFJUSTICE_LEVEL+ bufVal)*4+'%. Block amount increased by 50%.';
                            game.talentConfirm = true;
                        }
                        if (ig.input.released('LIFE_RADIANTFURY')) {

                            ig.game.myTouchButtons.toggleByString('LIFE', false);
                            game.talentSelected = 'LIFE_RADIANTFURY';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = "Radiant Fury:\n'Holy Power' also saps "+(game.player.LIFE_RADIANTFURY_LEVEL+ bufVal)*1+"% of enemy's current health.";
                            game.talentConfirm = true;
                        }
                        if (ig.input.released('LIFE_ZEAL')) {
                            ig.game.myTouchButtons.toggleByString('LIFE', false);
                            game.talent_info = "Zeal: \nEach time 'Radiance' is triggered the chance\nfor 'Holy Power' +25% for 5 secs.";
                            game.talentSelected = 'LIFE_ZEAL';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            game.talentConfirm = true;
                        }
                        if (ig.input.released('LIFE_BURNINGLIGHT')) {

                            ig.game.myTouchButtons.toggleByString('LIFE', false);
                            game.talentSelected = 'LIFE_BURNINGLIGHT';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = 'Burning Light: \nEnemies take gradual damage ('+(game.player.LIFE_BURNINGLIGHT_LEVEL+ bufVal) * 8+'/sec) around you.';
                            game.talentConfirm = true;
                        }
                        if (ig.input.released('LIFE_LASTSTAND')) {
                            ig.game.myTouchButtons.toggleByString('LIFE', false);
                            game.talentSelected = 'LIFE_LASTSTAND';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = 'Last Stand: \nIncrease RES/M.RES by '+(game.player.LIFE_LASTSTAND_LEVEL+ bufVal)*5+'% when lower than 33% health.';
                        
                            game.talentConfirm = true;
                        }

                        if (ig.input.released('LIFE_HOLYSLASH')) {
                            

                            ig.game.myTouchButtons.toggleByString('LIFE',false);
                            game.talent_info = "Holy Slash:\n'Holy Power' also causes heavy magical damage to enemy.";
                            game.talentSelected = 'LIFE_HOLYSLASH';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            game.talentConfirm = true;
                        }
                    }
                    else {
                        game.checkSelectionInput("LIFE");
                    }

                    /*if (ig.input.released('Select_Talent') || player.Talent_Selection === true) {
                    
                        player.Talent_Selection = false;*/


                    //  }


                }
                else if (game.demon_talents_menu) {

                    if (game.skipInput === false) {
                        game.skipInput = true;
                        return;
                    }
                    if (ig.input.released('GoBackTalentScreen') &&
                    ig.game.talentConfirm === false) {
                        player.Talent_GoBackSelection = false;
                        SkillElementsTo(false);
                        HUDElementsTo(true);
                        ig.game.myTouchButtons.toggleByString("DEMON", false);
                        game.skipInput = false;

                        game.talent_info = ''; game.demon_talents_menu = false;
                    }

                    if (game.talentConfirm === false) {

                        var bufVal = 1;
                        if (ig.input.released('DEMON_DEMONICFORTITUDE')) {


                            ig.game.myTouchButtons.toggleByString('DEMON', false);
                            game.talentSelected = 'DEMON_DEMONICFORTITUDE';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }

                            game.talent_info = 'Demonic Fortitude: \nIncrease HP regen by ' + (game.player.DEMON_DEMONICFORTITUDE_LEVEL + bufVal) * 1 + ".";
                            game.talentConfirm = true;
                        }
                        if (ig.input.released('DEMON_VAMPIRISM')) {


                            ig.game.myTouchButtons.toggleByString('DEMON', false);
                            game.talentSelected = 'DEMON_VAMPIRISM';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = 'Vampirism: \nLeech ' + (game.player.DEMON_VAMPIRISM_LEVEL + bufVal) * 2 + '% of damage done.';
                            game.talentConfirm = true;
                        }

                        if (ig.input.released('DEMON_DARKRAGE')) {

                            ig.game.myTouchButtons.toggleByString('DEMON', false);
                            game.talentSelected = 'DEMON_DARKRAGE';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = "Dark Rage:\n" + (game.player.DEMON_DARKRAGE_LEVEL + bufVal) * 8 + "% chance of receiving 'Dark Rage' when under 20% HP. +3 STR & +2 HP Regen for 5 sec.";
                            game.talentConfirm = true;
                        }
                       

                        if (ig.input.released('DEMON_MYSTICBARRIER')) {

                            ig.game.myTouchButtons.toggleByString('DEMON', false);
                            game.talentSelected = 'DEMON_MYSTICBARRIER';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = "Mystic Barrier:\n " + (game.player.DEMON_MYSTICBARRIER_LEVEL + bufVal) * 4 + "% chance of negating damage.";
                            game.talentConfirm = true;
                        }
                        if (ig.input.released('DEMON_DARKWAVE')) {
                            ig.game.myTouchButtons.toggleByString('DEMON', false);
                            game.talent_info = "Dark Wave: \nProjectile. Convert 15% of HP as damage.";
                            game.talentSelected = 'DEMON_DARKWAVE';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            game.talentConfirm = true;
                        }

                        if (ig.input.released('DEMON_SACRIFICIALDRIVE')) {


                            ig.game.myTouchButtons.toggleByString('DEMON', false);
                            game.talentSelected = 'DEMON_SACRIFICIALDRIVE';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = 'Sacrificial Drive:\n+' + (game.player.DEMON_SACRIFICIALDRIVE_LEVEL + bufVal) * 4 + '% HP cost of abilities. +' + (game.player.DEMON_SACRIFICIALDRIVE_LEVEL + bufVal) * 5 +'% damage.';
                            game.talentConfirm = true;
                        }
                        if (ig.input.released('DEMON_EMPOWEREDDARKRAGE')) {

                            ig.game.myTouchButtons.toggleByString('DEMON', false);
                            game.talentSelected = 'DEMON_EMPOWEREDDARKRAGE';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            console.log(bufVal + " HYH22G");
                            game.talent_info = "Emp. Dark Rage:\n'Dark Rage' can trigger below " + (((game.player.DEMON_EMPOWEREDDARKRAGE_LEVEL + bufVal) * 5)+20) + "% HP instead of 20% HP.";
                            game.talentConfirm = true;
                        }
                        if (ig.input.released('DEMON_DEMONSTRENGTH')) {
                            ig.game.myTouchButtons.toggleByString('DEMON', false);
                            game.talentSelected = 'DEMON_DEMONSTRENGTH';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                        
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                         
                            game.talent_info = "Demon Strength: \nAttacks have chance of triggering +" + ((game.player.DEMON_DEMONSTRENGTH_LEVEL + bufVal) * 1) + " STR buff.";
                           
                            game.talentConfirm = true;
                        }
                        if (ig.input.released('DEMON_DREADWAVE')) {

                            ig.game.myTouchButtons.toggleByString('DEMON', false);
                            game.talentSelected = 'DEMON_DREADWAVE';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = "Dread Wave: \nProjectile. Upgraded 'Dark Wave'. Convert 30% of HP as damage.";
                            game.talentConfirm = true;
                        }
                        if (ig.input.released('DEMON_DEMONBLOOD')) {
                            ig.game.myTouchButtons.toggleByString('DEMON', false);
                            game.talentSelected = 'DEMON_DEMONBLOOD';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            if (game.talentCannotBeSelected === 1) {
                                bufVal = 0;
                            }
                            game.talent_info = 'Demon Blood: \nConvert ' + (game.player.DEMON_DEMONBLOOD_LEVEL + bufVal) * 20 + '% of MP Regen as HP Regen.';

                            game.talentConfirm = true;
                        }

                        if (ig.input.released('DEMON_DARKWILL')) {


                            ig.game.myTouchButtons.toggleByString('DEMON', false);
                            game.talent_info = "Dark Will:\nWhen struck with fatal hit, 50% chance to instantly heal for 20% of Max. HP.";
                            game.talentSelected = 'DEMON_DARKWILL';
                            game.checkIfCanBeSelected();
                            ig.game.myTouchButtons.searchButton("Cancel_Talent", true);
                            if (game.talentCannotBeSelected === 0) {
                                ig.game.myTouchButtons.searchButton("Select_Talent", true);

                            }
                            game.talentConfirm = true;
                        }
                    }
                    else {
                        game.checkSelectionInput("DEMON");
                    }

                    /*if (ig.input.released('Select_Talent') || player.Talent_Selection === true) {
                    
                        player.Talent_Selection = false;*/


                    //  }


                }

                var RAGE_BUFFER = 0;
                RAGE_BUFFER += player.BLADE_VIGOR_LEVEL;
                RAGE_BUFFER += player.BLADE_FLURRY_LEVEL;
      
                RAGE_BUFFER += player.BLADE_DOUBLEATTACK_LEVEL;
                RAGE_BUFFER += player.BLADE_SHOCKPULSE_LEVEL;
                RAGE_BUFFER += player.BLADE_FRENZY_LEVEL;

             
                RAGE_BUFFER += player.BLADE_ESCALATION_LEVEL;
                RAGE_BUFFER += player.BLADE_EXECUTE_LEVEL;
                RAGE_BUFFER += player.BLADE_BLOODLUST_LEVEL;
          
                RAGE_BUFFER += player.BLADE_BIGPLAY_LEVEL;
 
                RAGE_BUFFER += player.BLADE_SWORDSPECIALIST_LEVEL;
         
                RAGE_BUFFER += player.BLADE_AXESPECIALIST_LEVEL;
     
                RAGE_BUFFER += player.BLADE_PHANTOMSTRIKES_LEVEL;

                player.BLADE_AMOUNT = RAGE_BUFFER;

                var SPELL_BUFFER = 0;
                SPELL_BUFFER += player.SPELL_FOCUS_LEVEL;
                SPELL_BUFFER += player.SPELL_INTELLIGENCE_LEVEL;

                SPELL_BUFFER += player.SPELL_FIRE_BLAST_LEVEL;
                SPELL_BUFFER += player.SPELL_ENDLESSPOOL_LEVEL;
                SPELL_BUFFER += player.SPELL_CRITICALRETURN_LEVEL;

                SPELL_BUFFER += player.SPELL_DEMOLISH_LEVEL;
                SPELL_BUFFER += player.SPELL_CRITICAL_COMBO_LEVEL;

                SPELL_BUFFER += player.SPELL_ELEMENTALSYNERGY_LEVEL;
                SPELL_BUFFER += player.SPELL_DEEPFREEZE_LEVEL;
                SPELL_BUFFER += player.SPELL_FROSTFIRE_LEVEL;

                SPELL_BUFFER += player.SPELL_ARCANEBALL_LEVEL;

                player.SPELL_AMOUNT = SPELL_BUFFER;

                var LIFE_BUFFER = 0;
                LIFE_BUFFER += player.LIFE_BURNINGHEART_LEVEL;
                LIFE_BUFFER += player.LIFE_LIFESPIRIT_LEVEL;

                LIFE_BUFFER += player.LIFE_CALMMIND_LEVEL;
                LIFE_BUFFER += player.LIFE_RADIANCE_LEVEL;
                LIFE_BUFFER += player.LIFE_EMPOWEREDSLASH_LEVEL;

                LIFE_BUFFER += player.LIFE_HOLYBARRIER_LEVEL;
                LIFE_BUFFER += player.LIFE_WALLOFJUSTICE_LEVEL;
                LIFE_BUFFER += player.LIFE_RADIANTFURY_LEVEL;

                LIFE_BUFFER += player.LIFE_ZEAL_LEVEL;
                LIFE_BUFFER += player.LIFE_BURNINGLIGHT_LEVEL;
                LIFE_BUFFER += player.LIFE_LASTSTAND_LEVEL;

                LIFE_BUFFER += player.LIFE_HOLYSLASH_LEVEL;

                player.LIFE_AMOUNT = LIFE_BUFFER;

                var DEMON_BUFFER = 0;
                DEMON_BUFFER += player.DEMON_DEMONICFORTITUDE_LEVEL;
                DEMON_BUFFER += player.DEMON_VAMPIRISM_LEVEL;

                DEMON_BUFFER += player.DEMON_DARKRAGE_LEVEL;
                DEMON_BUFFER += player.DEMON_MYSTICBARRIER_LEVEL;
               

                DEMON_BUFFER += player.DEMON_DARKWAVE_LEVEL;
                DEMON_BUFFER += player.DEMON_SACRIFICIALDRIVE_LEVEL;
                DEMON_BUFFER += player.DEMON_EMPOWEREDDARKRAGE_LEVEL;

                DEMON_BUFFER += player.DEMON_DEMONSTRENGTH_LEVEL;
                DEMON_BUFFER += player.DEMON_DREADWAVE_LEVEL;
                DEMON_BUFFER += player.DEMON_DEMONBLOOD_LEVEL;

                DEMON_BUFFER += player.DEMON_DARKWILL_LEVEL;

                player.DEMON_AMOUNT = DEMON_BUFFER;

            },

        })
    })


