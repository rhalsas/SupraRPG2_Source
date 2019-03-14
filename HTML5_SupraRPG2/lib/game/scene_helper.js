ig.module(
   'game.scene_helper'
)
.requires(
    
    
   'impact.game',
 'game.entities.player'
)
   .defines(function () {

       ig.Game.inject({

           startKnightDialog: new Array(),
            
           ExtremePiggyDialog: new Array(),
           ExtremePiggy2Dialog: new Array(),
           DesertKnightDialog: new Array(),
           DesertKnight2Dialog: new Array(),
          RageKnightDialog: new Array(),
          RageKnight2Dialog: new Array(),

          DarkKnightDialog: new Array(),
          DarkKnight2Dialog: new Array(),
           GrandMancerDialog: new Array(),
           GrandMancer2Dialog: new Array(),

           VoidKnightDialog: new Array(),
           VoidKnight2Dialog: new Array(),
           currentDialog: null,
           currentDialogLength: 0,
           currentDialogPos: 0,
           scene_Invoked: false,

           dialog_Invoked: false,


           initDialog: function(){


               //Start Knight Dialogue
               ig.game.startKnightDialog.push("What's happening?");
               ig.game.startKnightDialog.push("Where am I?");
               ig.game.startKnightDialog.push("The 'Life Orb'!");



               //Extreme Piggy Dialogue
               ig.game.ExtremePiggyDialog.push("????: I've been waiting for you.");
               ig.game.ExtremePiggyDialog.push("You: ...");
               ig.game.ExtremePiggyDialog.push("Piggy: I knew you'd try to reach the Sand Caves.");
               ig.game.ExtremePiggyDialog.push("Piggy: I don't really care what happens to that Sand Clown.");
               ig.game.ExtremePiggyDialog.push("Piggy: But that's some fancy treasure you are carrying...");
               ig.game.ExtremePiggyDialog.push("You: My journey has nothing to do with you!");
               ig.game.ExtremePiggyDialog.push("Piggy: *SNORT SNORT*");


               ig.game.ExtremePiggy2Dialog.push("Piggy: Such...Power...");
               

               //Sand Knight
               ig.game.DesertKnightDialog.push("Desert Knight: I see that you survived the battle.");
               ig.game.DesertKnightDialog.push("You: This is the end of road for you demons." );
               ig.game.DesertKnightDialog.push("Desert Knight: We are the true rulers of this land.");
               ig.game.DesertKnightDialog.push("Desert Knight: Countless men have fallen before me.");
               ig.game.DesertKnightDialog.push("Desert Knight: What makes you think that you can defeat me,");
               ig.game.DesertKnightDialog.push("Desert Knight: a Demon knight?");
               ig.game.DesertKnightDialog.push("You: My blade has already tasted demon blood.");
               ig.game.DesertKnightDialog.push("Desert Knight: Demon? Those mindless abominations?");
              
               ig.game.DesertKnightDialog.push("Desert Knight: I'll bury you with sand!");
           

               ig.game.DesertKnight2Dialog.push("Desert Knight: Nghh!!");
               ig.game.DesertKnight2Dialog.push("You: One down, two more to go.");
               ig.game.DesertKnight2Dialog.push("Desert Knight: What is this...");
               ig.game.DesertKnight2Dialog.push("Desert Knight: power?");

               ig.game.GrandMancerDialog.push("Grandmancer: I've been waiting for you!");

               ig.game.GrandMancer2Dialog.push("Grandmancer: Curse...you!!");
              

               /*  
              ig.game.RedBridge.push("You: The bloody bridge...'Red Bridge'.");
               ig.game.RedBridge.push("You: I must be close to the the 'Tower of Insanity'.");
                 */

               ig.game.RageKnightDialog.push("Rage Knight: I WILL PURGE YOU.");
          
               ig.game.RageKnightDialog.push("You: !");
         

               ig.game.RageKnight2Dialog.push("Rage Knight: Urhh!!!");
               ig.game.RageKnight2Dialog.push("You: ...");
               ig.game.RageKnight2Dialog.push("Rage Knight: I feel...");
               ig.game.RageKnight2Dialog.push("Rage Knight: calm.");
            
             

               ig.game.DarkKnightDialog.push("Dark Knight: I've been waiting for you.");

               ig.game.DarkKnightDialog.push("You: !");

               ig.game.DarkKnightDialog.push("You: I don't sense demonic energy...");

               ig.game.DarkKnightDialog.push("You: You are...");

               ig.game.DarkKnightDialog.push("Dark Knight: Indeed I'm human.");
               ig.game.DarkKnightDialog.push("You: Only a human could have opened the demonic portals!");

               ig.game.DarkKnightDialog.push("Dark Knight: It's better to give in to greater power.");
               ig.game.DarkKnightDialog.push("Dark Knight: You don't understand I'm trying to achieve!");
              
            
             

               ig.game.DarkKnight2Dialog.push("Dark Knight: Hng...");
               ig.game.DarkKnight2Dialog.push("You: ...");
               ig.game.DarkKnight2Dialog.push("Dark Knight: I had the power...");
               ig.game.DarkKnight2Dialog.push("Dark Knight: to stop...him...");
               ig.game.DarkKnight2Dialog.push("You: Him?");
               ig.game.DarkKnight2Dialog.push("Dark Knight: Pre...pare...");
               ig.game.DarkKnight2Dialog.push("Dark Knight: ...");

               ig.game.DarkKnight2Dialog.push("...");
               ig.game.DarkKnight2Dialog.push("You: The demon knights are done.");


               ig.game.VoidKnightDialog.push("????: Your journey ends here.");
               ig.game.VoidKnightDialog.push("You: !!?");
               ig.game.VoidKnightDialog.push("????: I won't let you continue your destruction.");
               ig.game.VoidKnightDialog.push("You: I thought I destroyed all the demons!");
               ig.game.VoidKnightDialog.push("????: Demons?");
               ig.game.VoidKnightDialog.push("????: They were useful.");
               ig.game.VoidKnightDialog.push("????: But failed to stop you.");
               ig.game.VoidKnightDialog.push("You: Don't be too hard on them.");
               ig.game.VoidKnightDialog.push("You: You will fall too.");

               ig.game.VoidKnightDialog.push("????: Stop me?");
               ig.game.VoidKnightDialog.push("????: I've already summoned the portal for 'Oilver'!");
               ig.game.VoidKnightDialog.push("????: You're too late!");

               ig.game.VoidKnightDialog.push("????: You will meet your doom before The Great Void Lord,");
               ig.game.VoidKnightDialog.push("????: NULL!");
               ig.game.VoidKnightDialog.push("You: !");
               ig.game.VoidKnightDialog.push("The Great Void Lord NULL: Prepare!");


               ig.game.VoidKnight2Dialog.push("TGVL NULL: Not even with the power of the void...");
               ig.game.VoidKnight2Dialog.push("TGVL NULL: 'Oilver' will...avenge...me");
               ig.game.VoidKnight2Dialog.push("TGVL NULL: ...");
               ig.game.VoidKnight2Dialog.push("You: Something is coming.");
               ig.game.VoidKnight2Dialog.push("You: I have to use the time I have for preparations!");
         

        
            



              
      








           },
           invokeDialog: function(dialogName){
               ig.game.currentDialog = null;
               switch (dialogName) {

               
                   case "extremePiggy1":
                       ig.game.currentDialog = ig.game.ExtremePiggyDialog;
                       break;

                   case "extremePiggy2":
                       ig.game.currentDialog = ig.game.ExtremePiggy2Dialog;
                       break;



                   case "desertKnight1":
                       ig.game.currentDialog = ig.game.DesertKnightDialog;
                       break;

                   case "desertKnight2":
                       ig.game.currentDialog = ig.game.DesertKnight2Dialog;
                       break;

                   case "rageKnight":
                       ig.game.currentDialog = ig.game.RageKnightDialog;
                       break;

                   case "rageKnight2":
                       ig.game.currentDialog = ig.game.RageKnight2Dialog;
                       break;

                   case "darkKnight":
                       ig.game.currentDialog = ig.game.DarkKnightDialog;
                       break;

                   case "darkKnight2":
                       ig.game.currentDialog = ig.game.DarkKnight2Dialog;
                       break;


                   case "voidKnight1":
                       ig.game.currentDialog = ig.game.VoidKnightDialog;
                       break;

                   case "voidKnight2":
                       ig.game.currentDialog = ig.game.VoidKnight2Dialog;
                       break;
                       
               }

               if (ig.game.currentDialog) {
                   ig.game.scene_Invoked = true;

                   HUDElementsTo(false);
               }
           },
           updateScene: function () {


               if(ig.game.scene_Invoked === true 
                   ) {
                   
                   if (ig.game.currentDialogLength === 0) { ig.game.currentDialogLength = ig.game.currentDialog.length; }
                   
                   
                   if(ig.game.dialog_Invoked === false){

                       ig.game.dialog_Invoked = true;
                       

                   }
                   else if(ig.game.dialog_Invoked === true && (ig.input.pressed('screen') || buttons.y_button.pressed))
                   {
                       if (ig.game.currentDialogLength-1 > ig.game.currentDialogPos) {
                           ig.game.currentDialogPos++;
                       }
                       else if (ig.game.currentDialogLength - 1 === ig.game.currentDialogPos) {
                           HUDElementsTo(true);
                           var bossIsAlive = true;
                           var entL = ig.game.entities;
                           for (var i = 0; i < entL.length; i++) {
                               if (entL[i].name === "boss" && entL[i].actHealth <= 0) {
                                   ig.game.playMusic('oolongkong');
                                   bossIsAlive = false;
                                   break;
                               }
                               
                           }
                           if (bossIsAlive) ig.game.playMusic('boss');
                           ig.game.scene_Invoked = false;
                           ig.game.currentDialogLength = 0;
                           ig.game.currentDialogPos = 0;
                       }

                   }
                   
    
               }




           }
           



       });

 });