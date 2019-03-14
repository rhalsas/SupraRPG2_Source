
ig.module(
    'game.tutorial_helpers'
)
.requires(


    'impact.game'
    
)
    .defines(function () {

        ig.Game.inject({

            //Tutorial stuff
            TutorialArrow: new ig.Image('media/TutorialBoxes/TutorialArrow.png'),
            DoubleJumpTutorial: new ig.Image('media/TutorialBoxes/DoubleJump.png'),
            AttackTutorial: new ig.Image('media/TutorialBoxes/Attack.png'),
            ChangeTutorial: new ig.Image('media/TutorialBoxes/ChangeSkill.png'),
            BaseTutorialPos: { x: 0, y: 0},
            CrtTutorialPos: { x: 0, y: 0},
            CurrentTutImg: null,
            TutArrowTimer: 0,
            TutTimer: null,
            TutGoingBack: false,
            numberOfTicks: 0,
            //All tutorials, should be saved

            DoubleJumpTutorialDone: false,
            AttackTutorialDone: false,
            ChangeTutorialDone: false,

            TutGoingUp: false,

            drawBouncy: function () {
               
                if (!ig.game.CurrentTutImg) return;
               

                if (!ig.game.TutTimer) {
                    ig.game.TutTimer = new ig.Timer();
                    ig.game.TutTimer.set(0.1);
                }
                else if (ig.game.TutTimer.delta() > 0) {
                    ig.game.TutTimer.set(0.1);
                    if (ig.game.TutGoingBack === true) {
                        ig.game.TutArrowTimer--;
                    }
                    else {
                        ig.game.TutArrowTimer++;
                    }
                    if (ig.game.TutArrowTimer > 3) {
                        ig.game.TutGoingBack = true;
                        ig.game.TutArrowTimer = 3;
                    }
                    else if (ig.game.TutArrowTimer < 0) {
                        ig.game.TutGoingBack = false;
                        ig.game.TutArrowTimer = 0;
                    }
                }
             
                ig.game.calcPos();
                ig.game.CurrentTutImg.draw(ig.game.CrtTutorialPos.x - 32, ig.game.CrtTutorialPos.y);
                ig.game.TutorialArrow.drawTile(ig.game.CrtTutorialPos.x, ig.game.CrtTutorialPos.y + 32, ig.game.TutArrowTimer, 32, 32);
            },
            calcPos: function () {
                ig.game.CrtTutorialPos.y = (16 * Math.sin(ig.game.numberOfTicks /33)) + (ig.game.BaseTutorialPos.y-16);
                ig.game.numberOfTicks++;
            }

        });
    });