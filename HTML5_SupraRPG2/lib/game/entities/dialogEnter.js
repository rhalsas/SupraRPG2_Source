ig.module(
	'game.entities.dialogEnter'
	)
.requires(
	'impact.entity'
	)
.defines(function () {
    EntityDialogEnter = ig.Entity.extend({



        size: { x: 32, y: 32 },

        name: "clickable",
        Text_1: '',
        Text_2: '',
        Text_3: '',
        Text_4: '',
        Text_5: '',
        Text_6: '',
        checkAgainst: ig.Entity.TYPE.A,
        entityInvoked: false,
        tutPart: 'DoubleJump',
        init: function (x, y, settings) {
            this.parent(x, y, settings);


        },


        update: function () {

        },

        check: function (other) {
           
            if (
                //Doesn't need to be disabled
                //ig.game.DoubleJumpTutorialDone === false &&
                this.tutPart === 'DoubleJump' &&
                !ig.game.CurrentTutImg) {
              
              
               
                ig.game.DoubleJumpTutorialDone = false;
                ig.game.CurrentTutImg = ig.game.DoubleJumpTutorial;
                ig.game.BaseTutorialPos.x = 170;
                ig.game.BaseTutorialPos.y = 64;
                ig.game.CrtTutorialPos.x = ig.game.BaseTutorialPos.x;
                ig.game.CrtTutorialPos.y = ig.game.BaseTutorialPos.y;
              
            }
            else if (
                //Doesn't need to be disabled
                ig.game.AttackTutorialDone === false &&
                this.tutPart === 'Attack' &&
               !ig.game.CurrentTutImg) {




                ig.game.CurrentTutImg = ig.game.AttackTutorial;
                ig.game.BaseTutorialPos.x = 198;
                ig.game.BaseTutorialPos.y = 64;
                ig.game.CrtTutorialPos.x = ig.game.BaseTutorialPos.x;
                ig.game.CrtTutorialPos.y = ig.game.BaseTutorialPos.y;

            }
            else if (
                //Doesn't need to be disabled
                ig.game.ChangeTutorialDone === false &&
                this.tutPart === 'Change' &&
               !ig.game.CurrentTutImg) {




                ig.game.CurrentTutImg = ig.game.ChangeTutorial;
                ig.game.BaseTutorialPos.x = 198;
                ig.game.BaseTutorialPos.y = 64;
                ig.game.CrtTutorialPos.x = ig.game.BaseTutorialPos.x;
                ig.game.CrtTutorialPos.y = ig.game.BaseTutorialPos.y;

            }
            /*
            if (other instanceof EntityPlayer && this.entityInvoked === false) {
                var tempArray = new Array();
                if (this.Text_1) tempArray.push(this.Text_1);
                if (this.Text_2) tempArray.push(this.Text_2);
                if (this.Text_3) tempArray.push(this.Text_3);
                if (this.Text_4) tempArray.push(this.Text_4);
                if (this.Text_5) tempArray.push(this.Text_5);
                if (this.Text_6) tempArray.push(this.Text_6);
                ig.game.currentDialog = tempArray;
                ig.game.scene_Invoked = true;
                this.entityInvoked = true;
            }
            */


        }
    });

});