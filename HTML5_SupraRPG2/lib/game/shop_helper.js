ig.module(
   'game.scene_helper'
)
.requires(
    
    
   'impact.game',
 'game.entities.player'
)
   .defines(function () {

       ig.Game.inject({

           buyButtons: function () {
               //Buy hard currency with actual money
               //Secure with recipe (Do azure checker service!)


               //1,29$
               if (ig.input.released('buyTINY')) {
                   accountHardCurrency += 15;
               }
               //4,99$
               else if (ig.input.released('buySMALL')) {
                   accountHardCurrency += 60;
               }
               //9,99$
               else if (ig.input.released('buyMED')) {
                   accountHardCurrency += 150;
               }
               //19,99$
               else if (ig.input.released('buyGREAT')) {
                   accountHardCurrency += 320;
               }
               //39,99$
               else if (ig.input.released('buyHIGH')) {
                   accountHardCurrency += 900;
               }
               //1 to 20 ratio
               else if (ig.input.released('buyTINYSOFT')) {
                   accountHardCurrency -= 1;
                   accountSoftCurrency += 20;
               }
               else if (ig.input.released('buySMALLSOFT')) {
                   accountHardCurrency -= 10;
                   accountSoftCurrency += 200;
               }
                 
               else if (ig.input.released('buyMEDSOFT')) {
                   accountHardCurrency -= 100;
                   accountSoftCurrency += 2000;
               }
           }


       });

 });