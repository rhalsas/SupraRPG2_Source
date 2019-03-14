var maxLevels = 14;
var PI = Math.PI;
//because of indexing reduce by one
maxLevels--;
var saveSkip = 0;
var levelSelectScroll = -179;
var levelSelectScrollY = 0;
var goingScrollerUp = false;
var isBossKilled = false;
var ts_width = 267 ;
var ts_height = 160;
var CloudSyncOn = false;
var slideObject = function (x, y, slideTo_X, slideTo_Y, img) {
    this.x = x;
    this.temp_x = this.x;
    this.y = y;
    this.temp_y = this.y;
    this.slideTo_X = slideTo_X;
    this.slideTo_Y = slideTo_Y;
    this.bufferNum = 0;
    this.img = img || null;

    this.reset = function(){
        this.bufferNum = 0;
    }
    this.slideTo = function (slideTo) {
       
        if (slideTo === "up") {
           
            this.temp_y = (this.y - this.slideTo_Y) + (this.slideTo_Y * Math.cos((this.bufferNum / 100) * 0.5 * 3.14));
          
            if (this.bufferNum < 100) this.bufferNum += 5;
            else { this.temp_y = Math.floor(this.temp_y); }
        }
        else if (slideTo === "down") {

            this.temp_y = (this.y) + (this.slideTo_Y * Math.cos((this.bufferNum / 100) * 0.5 * 3.14));
        
            if (this.bufferNum > 0) this.bufferNum -= 5;
            else { this.temp_y = Math.floor(this.temp_y); }
            
        } 
    }
}


ig.module(
    'game.screens.myGame'
)
.requires(
    'impact.game',
    'impact.font',

    'plugins.map-size',

    'plugins.screenfader',
    'bootstrap.plugins.utils',


    'plugins.touch-button',
          
    'impact.entity-pool',
    'game.levels.level_House_1',
    'game.levels.level_House_2',

    'game.levels.level_TutorialCastle_0',
    'game.levels.level_TutorialCastle_1',
    'game.levels.level_TutorialCastle_2',

    'game.levels.level_GrassLand_0', 
    'game.levels.level_GrassLand_1',
    'game.levels.level_GrassLand_2',
    'game.levels.level_GrassLand_3',

    'game.levels.level_FirstCastle_0',
    'game.levels.level_FirstCastle_1',
    'game.levels.level_FirstCastle_2',

    'game.levels.level_SwampOfDesolation_1',
    'game.levels.level_SwampOfDesolation_2',
    'game.levels.level_SwampOfDesolation_3',

    'game.levels.level_SpikyMountains_1',
    'game.levels.level_SpikyMountains_2',
    'game.levels.level_SpikyMountains_3',
    'game.levels.level_SpikyMountains_4',
    'game.levels.level_SpikyMountains_5',
    'game.levels.level_SpikyMountains_6',

    'game.levels.level_RedBridge_1',
    'game.levels.level_RedBridge_2',
    'game.levels.level_RedBridge_3',
    'game.levels.level_RedBridge_4',

    'game.levels.level_TowerOfInsanity1',
    'game.levels.level_TowerOfInsanity2',

    'game.levels.level_DeadlyDesert_1',
    'game.levels.level_DeadlyDesert_2',
    'game.levels.level_DeadlyDesert_3',
    'game.levels.level_DeadlyDesert_4',

    'game.levels.level_DesertCave_1',
    'game.levels.level_DesertCave_2',

    'game.levels.level_DesertCastle_1',
    'game.levels.level_DesertCastle_2',
    'game.levels.level_DesertCastle_3',

    'game.levels.level_MagicForest_1',
    'game.levels.level_MagicForest_2',

	'game.levels.level_NecromancerCave_1',
     

    'game.levels.level_RoadToVolcano_1',
    'game.levels.level_InsideVolcano_1',

  

    'game.levels.level_DemonCave1',
    'game.levels.level_DemonCave2',

    'game.levels.level_DimensionOfDespair1',
    'game.levels.level_DesolatedAltar1',

       'game.levels.level_RoadToSkyCannon1',
          'game.levels.level_RoadToSkyCannon2',
          'game.levels.level_SkyCannon',

            'game.levels.level_VoidCitadel1',
    'game.levels.level_VoidCitadel2',
     'game.levels.level_VoidCitadel3',
    'game.levels.level_VoidCitadel4',

    'game.levels.level_TheCapital',
    'game.levels.level_VIEW_Castle',
     'game.levels.level_VIEW_TheCapital',
      'game.levels.level_VIEW_TheCapital2',
    'game.levels.level_FortressOfDarkness1',
    'game.levels.level_FortressOfDarkness2',


    'game.entities.summonEffect',
    'game.entities.treasureBig',
    'game.entities.player',
    'game.entities.bossBar',
    'game.entities.levelUp',
    'game.entities.star',
    'game.entities.goblin',
    'game.entities.gold'
     

)
    .defines(function () {
        
        MyGame = ig.Game.extend({

            lightDark: new ig.Image('media/lightDark.png'),
            medDark: new ig.Image('media/medDark.png'),
            hardDark: new ig.Image('media/hardDark.png'),
            blackDark: new ig.Image('media/blackDark.png'),
            introViewTimer: null,
            introView: false,
            loadObject1: null,
            loadObject2: null,
            loadObject3: null,
            gravity: 300,
            hopOver: false,
            drawWhite: false,
            lastItem: '',
            lastItemBuy: '',
            lastItemQualityBuy: 0,
            lastItemQuality: 0,
            gotItem: false,
            gotItemBuy: false,
            drawSpot: { x: -32, y: -32 },
            textDelay: new ig.Timer(),
            drawBlack: false,
            presentationTimer: null,
            presentationOn: false,
            currentSong: '',

       
          
            loginScreenOn: false,


            destroyedEntitiesArray: new Array(),
            restoreSuccess: new ig.Image('media/restoreSuccess.png'),
            restoreFailure: new ig.Image('media/restoreFailure.png'),
            askConfirmation: false,
            EquipScrollUp: new ig.Image("media/Buttons/EquipScrollUp.png"),
            EquipScrollDown: new ig.Image("media/Buttons/EquipScrollDown.png"),
           
            confirmPanel: new ig.Image('media/Buttons/ConfirmationPanel.png'),

          
            CloudSyncButton: new ig.Image('media/Buttons/CloudSyncButton1.png'),
            CloudSyncButton2: new ig.Image('media/Buttons/CloudSyncButton2.png'),
            RedTalentButton: new ig.Image('media/Talents/RedTalentButton.png'),
            WhiteTalentButton: new ig.Image('media/Talents/WhiteTalentButton.png'),
            BlueTalentButton: new ig.Image('media/Talents/BlueTalentButton.png'),
            EquipButton2: new ig.Image("media/Buttons/EquipButton2.png"),
            BackButton: new ig.Image("media/Buttons/BackButton.png"),
            EquipCategoryButton2: new ig.Image("media/Buttons/EquipCategoryButton.png"),
            EquipCategoryButton: new ig.Image("media/Buttons/EquipCategoryButton2.png"),
            SaveAndQuitButton: new ig.Image("media/Buttons/SaveAndQuitButton.png"),
            SwitchButton: new ig.Image("media/Buttons/SwitchButton.png"),
            StatusButton: new ig.Image("media/Buttons/StatusButton.png"),
            MusicOnButton: new ig.Image("media/Buttons/MusicOnButton.png"),
            MusicOffButton: new ig.Image("media/Buttons/MusicOffButton.png"),
            RateThisAppButton: new ig.Image("media/Buttons/RateThisAppButton.png"),
            MenuButton: new ig.Image("media/Buttons/MenuButton.png"),
            EquipMenuButton: new ig.Image("media/Buttons/EquipButton.png"),
            SkillMenuButton: new ig.Image("media/Buttons/SkillButton.png"),

            SPECIALBUTTON: new ig.Image("media/Buttons/SpecialButton.png"),
            ACTIONBUTTON: new ig.Image("media/Buttons/ActionButton.png"),
            JUMPBUTTON1: new ig.Image("media/Buttons/JumpButton2.png"),
            JUMPBUTTON2: new ig.Image("media/Buttons/JumpButton1.png"),
            LEFTBUTTON: new ig.Image("media/Buttons/MoveLeftButton.png"),
            RIGHTBUTTON: new ig.Image("media/Buttons/MoveRightButton.png"),

            BUTTONHUD1IPAD: new ig.Image("media/BUTTONHUDNEW_IPAD.png"),
            BUTTONHUD2IPAD: new ig.Image("media/BUTTONHUDNEW_IPAD2.png"),
            BUTTONHUD3IPAD: new ig.Image("media/BUTTONHUDNEW_IPAD3.png"),
            BUTTONHUD4IPAD: new ig.Image("media/BUTTONHUDNEW_IPAD4.png"),
            BUTTONHUD5IPAD: new ig.Image("media/BUTTONHUDNEW_IPAD5.png"),
            BUTTONHUD6IPAD: new ig.Image("media/BUTTONHUDNEW_IPAD6.png"),
            BUTTONHUD7IPAD: new ig.Image("media/BUTTONHUDNEW_IPAD7.png"),

            BUTTONHUD1IPHONE: new ig.Image("media/BUTTONHUDNEW_IPHONE.png"),
            BUTTONHUD2IPHONE: new ig.Image("media/BUTTONHUDNEW_IPHONE2.png"),
            BUTTONHUD3IPHONE: new ig.Image("media/BUTTONHUDNEW_IPHONE3.png"),
            BUTTONHUD4IPHONE: new ig.Image("media/BUTTONHUDNEW_IPHONE4.png"),
            BUTTONHUD5IPHONE: new ig.Image("media/BUTTONHUDNEW_IPHONE5.png"),
            BUTTONHUD6IPHONE: new ig.Image("media/BUTTONHUDNEW_IPHONE6.png"),
            BUTTONHUD7IPHONE: new ig.Image("media/BUTTONHUDNEW_IPHONE7.png"),

            BLADE_TALENT_SELECT: new ig.Image("media/Buttons/SelectBladeTalentMenu.png"),
            LIFE_TALENT_SELECT: new ig.Image("media/Buttons/SelectLifeTalentMenu.png"),
            SPELL_TALENT_SELECT: new ig.Image("media/Buttons/SelectWizardTalentMenu.png"),
            DEMON_TALENT_SELECT: new ig.Image("media/Buttons/SelectDemonTalentMenu.png"),

            ironkey: new ig.Image('media/ironkey.png'),
            SelectButton: new ig.Image("media/Buttons/SelectButton.png"),
            CancelButton: new ig.Image("media/Buttons/CancelButton.png"),
            ResetButton: new ig.Image("media/Buttons/ResetButton.png"),
            goLevelButton: new ig.Image("media/Buttons/GoLevelButton.png"),
            touchbubble: new ig.Image("media/TouchBubble.png"),
            //      touchbubble_FINGER: new ig.Image("media/TouchBubble_FINGER.png"),
            SMALLBUYBUTTON: new ig.Image("media/Buttons/SmallBuyButton.png"),
            BUYSHOPBUTTON: new ig.Image("media/Buttons/BuyButton.png"),
            DELETEBUTTON: new ig.Image('media/Buttons/DeleteButton.png'),
            UPGRADESHOPBUTTON: new ig.Image('media/Buttons/ConfirmUpgradeButton.png'),
            CONFIRMBIGBUTTON: new ig.Image('media/Buttons/ConfirmButton.png'),
            DELETEBIGBUTTON: new ig.Image('media/Buttons/DeleteBigButton.png'),
            SELLSHOPBUTTON: new ig.Image("media/Buttons/SellButton.png"),
            MICROSOFTBUTTON: new ig.Image("media/Buttons/MicrosoftButton.png"),
            FACEBOOKBUTTON: new ig.Image("media/Buttons/FacebookButton.png"),
            TWITTERBUTTON: new ig.Image("media/Buttons/TwitterButton.png"),
            GOOGLEBUTTON: new ig.Image("media/Buttons/GooglePlusButton.png"),

            CANCELSHOPBUTTON: new ig.Image("media/Buttons/CancelShopButton.png"),
            CANCELPOSSHOPBUTTON: new ig.Image("media/Buttons/CancelPosShopButton.png"),
            SELECTSHOPBUTTON: new ig.Image("media/Buttons/GoShopButton.png"),
            SELECTSMITHBUTTON: new ig.Image("media/Buttons/GoSmithButton.png"),
            SELECTCHALLENGEBUTTON: new ig.Image("media/Buttons/GoChallengeButton.png"),
            SELECTLEVELBUTTON: new ig.Image("media/Buttons/SelectLevelButton2.png"),
            CONTINUEBUTTON: new ig.Image("media/Buttons/ContinueNew3Button.png"),

            SELECTSMITHBUTTON: new ig.Image("media/Buttons/GoSmithButton.png"),
            SELECTCHALLENGEBUTTON: new ig.Image("media/Buttons/GoChallengeButton.png"),
            SELECTLEVELBUTTON: new ig.Image("media/Buttons/SelectLevelButton2.png"),
           

            STARTGAMEBUTTON: new ig.Image("media/Buttons/StartNew3Button.png"),
            BACKMENUBUTTON: new ig.Image("media/Buttons/BackMenuButton.png"),
            CHANGELEVELBUTTON: new ig.Image("media/Buttons/ChangeLevelButton.png"),
            levelPointer: new ig.Image('media/Buttons/LevelPointer.png'),
            levelOptions: new ig.Image('media/Buttons/LevelSelectionOptions.png'),
            goLeftButton: new ig.Image('media/Buttons/LevelSelectLeft.png'),
            goRightButton: new ig.Image('media/Buttons/LevelSelectRight.png'),


            chestIcons: new ig.Image('media/BuyChestIcons.png'),
            blank: new ig.Image('media/Blank.png'),
            welcome: new ig.Image('media/Welcome.png'),
            extraorno: new ig.Image('media/ExtraOrNo.png'),
            // Load a font
            /*Supra RPG By Rasmus Halsas 10.8.2013*/
            // Need menu cursor
            healthbar: new ig.Image('media/healthbar.png'),
            manabar: new ig.Image('media/manabar.png'),
            PopUp: new ig.Image('media/POPUP.png'),

            itemLevel: 1,
            darkScreen: new ig.Image('media/empty_Epilogue.png'),
            exp_p: new ig.Image('media/exp_prompt.png'),
            //crit_p: new ig.Image('media/critical_prompt.png'),
            free_cast: new ig.Image('media/free_cast_prompt.png'),
            eventIcons: new ig.Image('media/eventIcons_S.png'),
           
            splash: new ig.Image('media/MainMenu_1.2.png'),
            splash_TRIAL: new ig.Image('media/MainMenu_1.2_TRIAL.png'),
            endScreenWinterWitch: new ig.Image('media/endScreenWinterWitch.png'),
            smallIcons: new ig.Image('media/smallIcons.png'),
            smallIcon_B: new ig.Image('media/smallIcon_B.png'),
            LevelSelection: new ig.Image('media/LevelSelectionNew.png'),
            LevelSelection_TRIAL: new ig.Image('media/LevelSelectionNew.png'),
            resetConfirm: new ig.Image('media/resetConfirm.png'),
            levelLocked: new ig.Image('media/levelLocked.png'),
            changeLog: new ig.Image('media/changeLog.png'),
            blank: new ig.Image('media/Blank.png'),

            bossHealthBarDraw: new ig.Image('media/boss_healthbar.png'),

            shopHUD: new ig.Image('media/ShopHUDNew.png'),
            buyHUD: new ig.Image('media/BuyHUDNew2.png'),
            equipHUD: new ig.Image('media/EquipHUDNew.png'),
            bigButtons: new ig.Image('media/bigButtons.png'),
            optionsHUD: new ig.Image('media/OptionsHUD.png'),
            statusHUD: new ig.Image('media/StatsHUD.png'),
            PauseScreen: new ig.Image('media/PauseScreen.png'),
            TalentSelect: new ig.Image('media/Talents/TalentSelect.png'),
            font: new ig.Font('media/04b03.font.png'),
            full_font_YELLOW: new ig.Font('media/full_04b03_YELLOW.png'),
            font_YELLOW: new ig.Font('media/04b03_YELLOW.font.png'),
            font_YELLOW_16: new ig.Font('media/04b03_YELLOW_16.png'),
            font_YELLOW_32: new ig.Font('media/04b03_YELLOW_32.png'),
            font_YELLOW_STYLED: new ig.Font('media/04b03_YELLOW_STYLED.font.png'),
            font_CYAN: new ig.Font('media/04b03_CYAN.font.png'),
            font_GREY: new ig.Font('media/04b03_GREY.font.png'),
            font_RED: new ig.Font('media/04b03_RED.font.png'),
            font_PURPLE: new ig.Font('media/04b03_PURPLE.font.png'),
            font_ORANGE: new ig.Font('media/04b03_ORANGE.font.png'),
            font_GREEN: new ig.Font('media/04b03_GREEN.font.png'),
            font_DARKGREEN: new ig.Font('media/04b03_DARKGREEN.font.png'),
            playerIcons: new ig.Image('media/playerIcons.png'),
            EndScreen_I: new ig.Image('media/EndScreen.png'),
            EndScreen_OverLay_I: new ig.Image('media/Epilogue.png'),
            EndScreen_OverLay_I_WW: new ig.Image('media/Epilogue_WinterWitch.png'),
            EndScreen_OverLay_I_Finale: new ig.Image('media/Epilogue_FallenWarrior.png'),
            EndScreen_OverLay_I_Elemental: new ig.Image('media/Epilogue_ElementalPalace.png'),
            EndScreen_OverLay_I_VoidZone: new ig.Image('media/Epilogue_FinalAdventure.png'),
            EndScreen_Credits_I: new ig.Image('media/Credits.png'),

            specialInfo: new ig.Image('media/specialInfo.png'),
            dialog_i: new ig.Image('media/DialogBar.png'),
            display96: new ig.Image('media/display96.png'),

            itemicons: new ig.Image('media/itemicons.png'),
            talentSpheres: new ig.Image('media/Talents/TalentSpheres.png'),
            talentGrid: new ig.Image('media/Talents/TalentsSmall.png'),
            TalentsOptionHUD: new ig.Image('media/Talents/TalentsOptionHUD.png'),
            LifeTalents: new ig.Image('media/Talents/LifeTalents.png'),
            BladeTalents: new ig.Image('media/Talents/BladeTalents.png'),
            MagicTalents: new ig.Image('media/Talents/MagicTalents.png'),
            DemonTalents: new ig.Image('media/Talents/DemonTalents.png'),
            HunterTalents: new ig.Image('media/Talents/HunterTalents.png'),
            DevastationTalents: new ig.Image('media/Talents/DevastationTalents.png'),
            skillGrid: new ig.Image('media/AttackAnimation/SelectSkills.png'),
            skillGridObj: null,
            lock_transparent: new ig.Image('media/Talents/LockedSkill.png'),
            HUD: new ig.Image('media/HUD.png'),
            HUD_minimap: new ig.Image('media/HUD_minimap.png'),
            shieldImage: new ig.Image('media/Items/shields/shields2.png'),
            armorImage: new ig.Image('media/Items/armors/armors2.png'),
            weaponImage: new ig.Image('media/Items/weapons/weapons2.png'),

            s_shieldImage: new ig.Image('media/Items/shields/shields_small.png'),
            s_armorImage: new ig.Image('media/Items/armors/armors_small.png'),
            s_weaponImage: new ig.Image('media/Items/weapons/weapons_small.png'),


            SellMenu_IMG: new ig.Image('media/SellMenu.png'),
            cloud: new ig.Image('media/Main_Screen_Cloud.png', 32, 32),

            ExpLine: new ig.Image('media/expbar.png'),
            WhiteTile: new ig.Image('media/WhiteTile.png'),
            MusicButton: new ig.Image('media/MusicButtons.png'),
            skillsheet: new ig.Image('media/AttackAnimation/skill_sheet2.png'),
            skillsheetG: new ig.Image('media/skill_sheet_GREYSCALE.png'),
            currentChestID: 0,
            b_pixel: new ig.Image('media/b_pixel.png'),
            LoadingIMG: new ig.Image('media/LoadingIMG.png'),
            LoadingIMG_calc: 0,
            img_multi: 0,
            InvokedMenuTimer: new ig.Timer(),
            InvokedMenuTimer_ONCE: false,
            //Weapons
            levelChangeButtonInvoked: false,
            completeMeterAmount: 0,
            completeMeter: 0,
            shop_prompt: false,
            buy_prompt: false,
            buy_item_draw_anim: false,
            buy_item_name: '',
            buy_item_price: 0,
            upgrade_prompt_type: "",
            upgrade_prompt_quality: 1,
            upgrade_prompt: false,

            ChooseBladeClass: new ig.Image('media/Buttons/ChooseBladeClass.png'),
            ChooseLifeClass: new ig.Image('media/Buttons/ChooseLifeClass.png'),
            ChooseWizardClass: new ig.Image('media/Buttons/ChooseWizardClass.png'),
            ChooseDemonClass: new ig.Image('media/Buttons/ChooseDemonClass.png'),

            difficultyLocked: new ig.Image('media/difficultyLocked.png'),
            SelectableButton: new ig.Image('media/Buttons/SelectableTalent.png'),
            LockedTalent: new ig.Image('media/LockedTalent.png'),
            biggerItems: new ig.Image('media/BiggerItems.png'),
            aegonthegiant: new ig.Image('media/aegonthegiant.png'),
            themageknight: new ig.Image('media/themageknight.png'),
            kozthedarkwizard: new ig.Image('media/kozthedarkwizard.png'),
            thewinterwitch: new ig.Image('media/thewinterwitch.png'),
            thefallenwarrior: new ig.Image('media/thefallenwarrior.png'),

            BeastBG: new ig.Image('media/Beastiary/BeastiaryBG.png'),
            GiantZombie: new ig.Image('media/Beastiary/BeastiaryBoss_GiantZombie160.png'),
            Monsters: new ig.Image('media/Beastiary/BeastiaryMonsters32.png'),
            Knights: new ig.Image('media/Beastiary/BeastiaryKnights32.png'),
            Wizards: new ig.Image('media/Beastiary/BeastiaryWizards32.png'),
            Bosses: new ig.Image('media/Beastiary/BeastiaryBosses32.png'),
            QuestionM: new ig.Image('media/QuestionM.png'),
            difficultySelectionFlash: new ig.Image('media/Buttons/DifficultySelectionFlash.png'),
            difficultyUnlocked: new ig.Image('media/difficultyUnlocked.png'),
            easyDifficulty: new ig.Image('media/easyDifficulty.png'),
            hardDifficulty: new ig.Image('media/hardDifficulty.png'),
            hellDifficulty: new ig.Image('media/hellDifficulty.png'),
            heroDifficulty: new ig.Image('media/heroDifficulty.png'),
            //Backgrounds
            //grassLandBGround: new ig.Image('media/backGroundGrassLand.png'),
  
            WeaponSpecialArray: new Array(),
            WeaponSpecialArrayTier1: new Array(),
            WeaponSpecialArrayTier2: new Array(),
            WeaponSpecialArrayTier3: new Array(),
            WeaponSpecialArrayTier4: new Array(),
            WeaponSpecialArrayTier5: new Array(),

            ArmorSpecialArray: new Array(),
            ArmorSpecialArrayTier1: new Array(),
            ArmorSpecialArrayTier2: new Array(),
            ArmorSpecialArrayTier3: new Array(),
            ArmorSpecialArrayTier4: new Array(),
            ArmorSpecialArrayTier5: new Array(),

            ShieldSpecialArray: new Array(),
            ShieldSpecialArrayTier1: new Array(),
            ShieldSpecialArrayTier2: new Array(),
            ShieldSpecialArrayTier3: new Array(),
            ShieldSpecialArrayTier4: new Array(),
            ShieldSpecialArrayTier5: new Array(),
            //Special Selection
            firstSpecial: "",
            secondSpecial: "",
            thirdSpecial: "",

            firstSpecial_w: "",
            secondSpecial_w: "",
            thirdSpecial_w: "",
            firstSpecial_s: "",
            secondSpecial_s: "",
            thirdSpecial_s: "",
            firstSpecial_a: "",
            secondSpecial_a: "",
            thirdSpecial_a: "",
            //Dialogue scenes
            perf_w_font: null,
            jumpToMainMenu: 0,
            showSkillSelect:'',
            actionTimer1:null,
            actionTimer2:null,
            SellMenu: false,
            SellItemInfo: null,
            sellMenuCounter: 0,
            BeastiaryOn: false,
            BeastiaryInput: 0,
            BeastiaryFound: [],
            BeastiaryAvail: 0,
            BeastiaryType: '',
            BeastiaryStats: { HP: 0, MP: 0, HP_REGEN: 0, MP_REGEN: 0, ATK: 0, SPECIAL: '', DESCRIPTION: '' },
            sceneIMG: new ig.Image('media/diagbox.png'),
            sceneInvoked: false,
            sceneLength: 0,
            scenePos: 0,
            bossHealthBar: false,

            confirmText: '',
            tutorialFlag: false,
            InvokedChangeLevel: false,
            checkPointVar: 0,
            data_packet: { x_coord: 0, y_coord: 0 },
            buttons: [],
            itemArray: new Array(),

            player: null,
            ShowCredits: false,
            EndScreen: false,
            EndScreen_OverLay: false,

            EndScreen_Credits: false,
            EndScreen_WinterWitch: false,
            EndScreen_OverLay_WinterWitch: false,
            EndScreen_Credits_WinterWitch: false,

            EndScreen_Finale: false,
            EndScreen_OverLay_Finale: false,
            EndScreen_Credits_Finale: false,


            EndScreen_Elemental: false,
            EndScreen_OverLay_Elemental: false,
            EndScreen_Credits_Elemental: false,

            EndScreen_VoidZone: false,
            EndScreen_OverLay_VoidZone: false,
            EndScreen_Credits_VoidZone: false,

            popUpFrameCount: 0,
            currentInfoText: '',
            currentLevel: 'LevelLevel_GrassLand_0',
       

            touchHelper: false,
            //Dialogues
            sceneArray: new Array(),

            beginningDialogue: new Array(),
            gameSaved: false,

            gameSaved1: false,
            gameSaved2: false,
            gameSaved3: false,
            scalingVar: 1,

            arrayOfBuffs: new Array(),
            currentWeaponInventory: new Array(),
            currentShieldInventory: new Array(),
            currentArmorInventory: new Array(),
            currentAccessoryInventory: new Array(),
            currentAmuletInventory: new Array(),
            dmgTimerArray: new Array(),
            dmgTextArray: new Array(),
            dmgAmountArray: new Array(),
            dmgColorArray: new Array(),
            input_location: 0,
            input_location_equip: 0,
            currentItemGot: '',
            currentPlayerLevel: 1,
            currentPlayerXp: 0,
            loadGame: false,
            currentWeaponSelected: null,
            currentArmorSelected: null,
            currentShieldSelected: null,
            currentMagicSelected: null,
            currentAccessory1Selected: null,
            currentAccessory2Selected: null,
            currentAmuletSelected: null,
            currentActionSkillSelected: null,
            currentActionSkill2Selected: null,
            currentThing: '',
            skill_menu: false,
            leftClickIsDown: false,
            game_menu: false,
            equip_menu: false,
            status_menu: false,
            talent_menu: false,
            save_menu: false,
            Main_Menu: true,
            buy_menu: false,
            shop_menu: false,
            equip_menu_swords: true,
            equip_menu_shields: false,
            equip_menu_armor: false,
            equip_menu_accessory_1: false,
            equip_menu_accessory_2: false,
            equip_menu_amulet: false,
            equip_invoke: false,
            InfoStandAreaCounter: 0,
            InfoStandAreaBuffer: 0,
            unequip_invoke: false,
            spawnedPlayer: false,
            damageDone: false,
            damageNumber: 0,
            damageDelayTimer: null,
            delayChangeLevel: null,
            HenchMenDead1: false,
            HenchMenDead2: false,
            CrystalDead1: false,
            CrystalDead2: false,
            secondBossKilled: false,


          
            initiateMenu: 0,
            paused: false,
            DoItOnce: 0,
            x_cloud_1: 0,
            x_cloud_2: 30,
            x_cloud_3: 75,
            x_cloud_4: 112,
            x_cloud_5: 130,
            y_cloud_1: 34,
            y_cloud_2: 104,
            y_cloud_3: 120,
            y_cloud_4: 30,
            y_cloud_5: 6,
            InformLevelUp: false,
            LevelUpInfo: false,
            talentHUD: false,
            life_talents_menu: false,
            blade_talents_menu: false,
            magic_talents_menu: false,
            demon_talents_menu: false,
            hunter_talents_menu: false,
            devastation_talents_menu: false,
            currentLevelBuffer: '',
            LevelUpHp: 0,
            LevelUpMp: 0,
            LevelUpATK: 0,
            talentSelected: '',
            talent_info: '',
            infoText: '',
            InfoText: false,
            changeLog_Show: false,
            pause_initiated: false,
            soft_paused: false,
            forceStart: false,
            addBlockToCurse: 0,
            playerID: 0,
            title: '',
            version: "0.2",
            isGoingUp: 0,
            LevelSelect: false,
            resetConfirmInvoked: false,
            skinCurrent: 'default',
            levelReseted: false,
            imageData_base: null,
            bossKill_Event: false,
            killDelay: null,
            data_packet: null,
            bossKill_EndScreen: false,
            bossKillWinter_EndScreen: false,
            bossKillFinale_EndScreen: false,
            bossKillElemental_EndScreen: false,
            bossKillVoidZone_EndScreen: false,
            minimap_Open: false,
            current_talent_menu: '',
            dialog: false,

            difficultyConfirm: false,
            difficultyTarget: 0,
            needUnlockConfirm: 0,
            dialogText: 'TESTING',
            dialogDelay: null,
            bossBarPause_T: false,
            bossBarPause: null,
            invokedBossMusic: false,
            availableEvents: 0,
            show_special: '',
            special_1_info: false,
            special_2_info: false,
            special_3_info: false,
            statusSpecialDraw: false,
            statusSpecialDraw_text: '',
            PopUpPressed: false,
            showPopUp: false,
            typePopUp: "",
           
            currentDevice: 2, //0 == IPAD , 2 == IPHONE

            TouchMoveXLimit: 0,
            TouchMoveYLimit: 0,
            popUpActivated: null,
            POPUP: null,
            POPUPRead: null,
            POPUPPick: null,
            POPUPOpen: null,
            POPUPTravel: null,
            currentX: 0,
            currentY: 0,
            invokedInfo: false,
            loadPackage: null,
            buttonScheme: 0,
            buttonSchemeChangeInvoked: false,
            movementScheme: 0,
            SOUNDON: false,
            specialEntity: null,
            saveSlot: 1,
            saveSelection: false,
            // Gets leaderboard information or other online statistics
            // Gets users achievement data from several games that are connected to the gamecloud
            // Changes the skin / title accordingly
            // Leaderboard would optimically consists of finished %
            // Currently its too easy to reach 100% since there isn't much content
            // The game world should have lots of bosses (more than 3, at least triple that amount)
            // InitUser: function () {
            /*
            game.player.achievementsArray.push(json.packet.achievements);
            var array_lenght = game.player.achievementsArray.lenght;
            for (var i = 0; i < array_lenght; i++) {
                if (game.player.achievementsArray[i] == "Blood Ball") {

                    var settings = { _killed: true, itemName: 'Blue Blood', HP: 6, MP: 6, HP_R: 6, MP_R: 6, RES: 12, M_RES: 18, isShield: true, description: 'Shield made from a\nblue bloody ball.' };
                    myEnt = new EntityTreasureBig(0, 0, settings);
                    game.itemArray.push(myEnt);
                    game.player.weaponArray.push(myEnt);
                }

            }
            game.player.eventsArray.push(json.packet.events);
            var array_lenght = game.player.eventsArray.lenght;
            for (var i = 0; i < array_lenght; i++) {
                if (game.player.eventsArray[i] == "Killed 10 zombies") {
                    //game.player.titleArray.push("Zombie Killer");
                    game.player.title = "Zombie Killer";
                }
            }*/
            // },

            /* saveFromCloud: function (json_packet) {
 
                 game.player.achievements = json.packet.achievements;
 
             },*/


           
            init: function () {
                // Initialize your game here; bind keys etc.

                //ig.music.add( 'media/Music/DST_BarbarianBros.*','Barbarian' );
              
                //ig.music.loop = true;
                //localStorage.clear();
               
                //    ig.game.checkReviewStatus();
                ig.game.checkOSVersion(window.navigator.userAgent);
                
            
                ig.game.cellSize = 64;
                
                ig.game.initDialog();

                if (LevelSelectOptionSkip > 0) {
                    ig.game.optionSelectedLevel = LevelSelectOptionSkip;
                }
                //Init Special Arrays
               
                ig.game.WeaponSpecialArrayTier1.push('Heavy W'); //+10% Weapon ATK
                ig.game.WeaponSpecialArrayTier1.push('Light W'); //+5% CRIT, -5% Damage
                ig.game.WeaponSpecialArrayTier1.push('Sharp'); //+3% CRIT
                ig.game.WeaponSpecialArrayTier1.push('Vampiric'); //+3% Leech damage

                ig.game.WeaponSpecialArrayTier2.push('Superiority'); //Having > HP increases damage by 15%
                ig.game.WeaponSpecialArrayTier2.push('Fury'); //Crit damage is doubled, but chance is halved
                ig.game.WeaponSpecialArrayTier2.push('Backstab'); //Attack from behind do +50% damage
                ig.game.WeaponSpecialArrayTier2.push('Concentration'); //+25% Mana regen
                ig.game.WeaponSpecialArrayTier2.push('Honor'); //+10% Crit chance, Halved damage from behind
               
                ig.game.WeaponSpecialArrayTier3.push('Chilly'); //Applies 'Chill' to target
                ig.game.WeaponSpecialArrayTier3.push('Fiery'); //Applies 'Burn' to target
                ig.game.WeaponSpecialArrayTier3.push('Dull'); //Critical chance to 0%, Increase dmg by 25%
                ig.game.WeaponSpecialArrayTier3.push('Blaze'); //Fire spell mana cost +20% damage +20%
                ig.game.WeaponSpecialArrayTier3.push('Emberburn'); //Critical burns restore 2% of mana
               
               
            
                ig.game.WeaponSpecialArrayTier4.push('Chromatic Focus'); //All resource cost -10%
                ig.game.WeaponSpecialArrayTier4.push('Elemental Focus'); //All Fire & Ice spell cost -20%
                ig.game.WeaponSpecialArrayTier4.push('Blessed'); //All stats increased by 10%
                ig.game.WeaponSpecialArrayTier4.push('Cursed'); //-10% All stats. 30% chance on hit to increase stats for 50% for 5 seconds
                ig.game.WeaponSpecialArrayTier4.push('Demonic'); //All attacks are amplified, but cost 5% of your current health


                ig.game.WeaponSpecialArrayTier5.push('Time Warp'); //+8% Chance to attack twice
                ig.game.WeaponSpecialArrayTier5.push('Arcane Devotion'); //Continous attacks increase mana regen by 1
                ig.game.WeaponSpecialArrayTier5.push('Executioner'); //Chance to instantly dispatch lesser foe (2%)
                ig.game.WeaponSpecialArrayTier5.push('Finisher'); //15% increased crit chance against opponents lower than 30% health

                ig.game.WeaponSpecialArray.push(ig.game.WeaponSpecialArrayTier1);
                ig.game.WeaponSpecialArray.push(ig.game.WeaponSpecialArrayTier1);
             
                ig.game.WeaponSpecialArray.push(ig.game.WeaponSpecialArrayTier2);
                ig.game.WeaponSpecialArray.push(ig.game.WeaponSpecialArrayTier2);
            
                ig.game.WeaponSpecialArray.push(ig.game.WeaponSpecialArrayTier3);
        
                ig.game.WeaponSpecialArray.push(ig.game.WeaponSpecialArrayTier4);
           
          
                ig.game.WeaponSpecialArray.push(ig.game.WeaponSpecialArrayTier5);


                ig.game.ShieldSpecialArrayTier1.push('Heavy S'); //+25% Block Amount -8% block
                ig.game.ShieldSpecialArrayTier1.push('Light S');//+16% Block Chance 
                ig.game.ShieldSpecialArrayTier1.push('Spikes'); //Return 10% of the damage taken


                ig.game.ShieldSpecialArrayTier2.push('Leech'); //Blocks return 10% of the blocked amount is returned to the player
                ig.game.ShieldSpecialArrayTier2.push('Absorb'); //Blocks return 5% of the blocked amount as mana to the player
                ig.game.ShieldSpecialArrayTier2.push('Focus Strength'); //Halve block amount, increase damage by 15%

                ig.game.ShieldSpecialArrayTier3.push('Frozen'); //Hits against player apply "Chill" -effect (Blocks)
                ig.game.ShieldSpecialArrayTier3.push('Imbued'); //+25% Mag Res
                ig.game.ShieldSpecialArrayTier3.push('Great Wall'); //Taking damage has chance to increase to double block % for 5 seconds
                

                ig.game.ShieldSpecialArrayTier4.push('Heavy Spikes'); //Return 15% of the damage taken
                ig.game.ShieldSpecialArrayTier4.push('Furious Blocks'); //Blocks increase crit by 5 % for 5 seconds
                ig.game.ShieldSpecialArrayTier4.push('Grand Shield'); //Increase block chance by 25%


                ig.game.ShieldSpecialArrayTier5.push('Negation'); //10% Chance to negate all damage
                ig.game.ShieldSpecialArrayTier5.push('Raging Slam'); //Block causes raging slam shockwave to burst against enemy (100 dmg)
                ig.game.ShieldSpecialArrayTier5.push('Burning Shield'); //Hits against player apply "Burn" -effect (Blocks)
              
                ig.game.ShieldSpecialArray.push(ig.game.ShieldSpecialArrayTier1);
                ig.game.ShieldSpecialArray.push(ig.game.ShieldSpecialArrayTier1);
         
                ig.game.ShieldSpecialArray.push(ig.game.ShieldSpecialArrayTier2);
                ig.game.ShieldSpecialArray.push(ig.game.ShieldSpecialArrayTier2);

                ig.game.ShieldSpecialArray.push(ig.game.ShieldSpecialArrayTier3);
           
             
                ig.game.ShieldSpecialArray.push(ig.game.ShieldSpecialArrayTier4);
            
                ig.game.ShieldSpecialArray.push(ig.game.ShieldSpecialArrayTier5);
          
                
                ig.game.ArmorSpecialArrayTier1.push('Heavy A'); //+10% HP, -MOV SPD
                ig.game.ArmorSpecialArrayTier1.push('Light A'); //+10% HP Regen
                ig.game.ArmorSpecialArrayTier1.push('Treasure Hunt'); //Slightly increased chance to find better loot (25%)
               
                
                ig.game.ArmorSpecialArrayTier2.push('Replenish'); //+20% HP/MP Regen
                ig.game.ArmorSpecialArrayTier2.push('High Spirit'); //+5% HP/5% STR
                ig.game.ArmorSpecialArrayTier2.push('Resourceful'); //+5% MP/5% INT

                ig.game.ArmorSpecialArrayTier3.push('Great Hunt'); //Slightly increased chance to find better loot (50%)
                ig.game.ArmorSpecialArrayTier3.push('Wizard Armor'); //+10% Spell damage
              

                ig.game.ArmorSpecialArrayTier4.push('Demon Armor'); //+50% HP REGEN, -20% HP
                ig.game.ArmorSpecialArrayTier4.push('Second Wind'); //When health drops below 15% Increase HP REGEN by 33%
                ig.game.ArmorSpecialArrayTier4.push("Hero's Aura"); //Every attack against player has a chance to give 8% health & manafor 5 seconds

                ig.game.ArmorSpecialArrayTier5.push('Fade'); //+15% Negate damage
                ig.game.ArmorSpecialArrayTier5.push('Chromatic'); //Mag res +20%
                ig.game.ArmorSpecialArrayTier5.push('Legendary Hunt'); //Enemies only drop uncommon or better loot. (50%)


                ig.game.ArmorSpecialArray.push(ig.game.ArmorSpecialArrayTier1);
                ig.game.ArmorSpecialArray.push(ig.game.ArmorSpecialArrayTier1);

                ig.game.ArmorSpecialArray.push(ig.game.ArmorSpecialArrayTier2);
                ig.game.ArmorSpecialArray.push(ig.game.ArmorSpecialArrayTier2);

                ig.game.ArmorSpecialArray.push(ig.game.ArmorSpecialArrayTier3);
              
         
                ig.game.ArmorSpecialArray.push(ig.game.ArmorSpecialArrayTier4);

                ig.game.ArmorSpecialArray.push(ig.game.ArmorSpecialArrayTier5);
                //Check the users achievements on different games and other data
                /*
                getData(function (data) {co

                    //  ig.allowedToWorkWithNewData = true;
                    if(data)game.InitUser(data);
                });
                */
                ig.game.gameSaved1 = false;
                ig.game.gameSaved2 = false;
                ig.game.gameSaved3 = false;
                if (localStorage.getItem('SupraSave_1') 
                    ) {
                    ig.game.gameSaved1 = true;
                }
                if (
                    localStorage.getItem('SupraSave_2')
                    ) {
                    ig.game.gameSaved2 = true;
                }
                if (
                    localStorage.getItem('SupraSave_3')
                    ) {
                    ig.game.gameSaved3 = true;
                }
                //checkLicence();
              
                if (localStorage.getItem('isMusicOn')) {
                    isMusicOn = JSON.parse(localStorage.getItem('isMusicOn'));
                }
                ig.music.add('media/Music/SupraRPG2/8bitAction.m4a', 'boss');
                ig.music.add('media/Music/SupraRPG2/modern8bit.m4a', 'gearup');
            
                ig.music.add('media/Music/SupraRPG2/8bitAdventure.m4a', 'oolongkong');
              

                ig.game.loadObject1 = null;
                ig.game.loadObject2 = null;
                ig.game.loadObject3 = null;
                // ig.game.PopulateItems();
                // game.loadLevel(ig.global[game.currentLevel]);

                ig.game.player = ig.game.getEntityByName('player1');
               
               
                if(localStorage.getItem('SupraSave_1')||
                    localStorage.getItem('SupraSave_2')||
                    localStorage.getItem('SupraSave_3')) {
                    ig.game.currentSong = 'gearup';
                    ig.game.playMusic(ig.game.currentSong);
                    
                }
               
                var bufferObject = null;
                if (ig.game.saveSlot === 1) {
                    bufferObject = JSON.parse(localStorage.getItem('SupraSave_1'));

                }
                else if (ig.game.saveSlot === 2) {
                    bufferObject = JSON.parse(localStorage.getItem('SupraSave_2'));
                }
                else if (ig.game.saveSlot === 3) {
                    bufferObject = JSON.parse(localStorage.getItem('SupraSave_3'));
                }
                if (bufferObject) {
                    difficultyLevel = parseInt(bufferObject["difficultyLevel"]);
                    // difficultyAvailable = parseInt(bufferObject["difficultyAvailable"]);
                    difficultyAvailable = 3;
                }
            
                // checkLicence();
                var defaultScheme = 0;
                if (ig.game.currentDevice == 0) { defaultScheme = 3; }
                else { defaultScheme = 0; }
                ig.game.buttonScheme = (localStorage.getItem("buttonScheme")) ? parseInt(localStorage.getItem("buttonScheme")) : defaultScheme;


               
                localStorage.setItem("version", ig.game.version);

               

                localStorage.setItem("buttonScheme", ig.game.buttonScheme);
                /*
                                 if (ig.game.version) {
                                     if (localStorage.getItem("version")) {
                                         var version = localStorage.getItem("version");
                                         version = version << 0;
                                         if (version < ig.game.version) {
                                             //Current newest if older --> prompt to update
                                         }
 
                                     }
                                     else {
                                         //Clear the devices ->> Earlier versions
                                         localStorage.clear();
                                         
                                     }
                                    // localStorage.setItem("version",ig.game.version);
                                 }
                                 ig.game.buttonScheme = (localStorage.getItem("buttonScheme")) ? localStorage.getItem("buttonScheme") : ig.game.checkDeviceLayout();
                                 localStorage.setItem("buttonScheme",ig.game.buttonScheme);
                          
                              
                              */
              
                ig.input.bind(ig.KEY._1, 'selectLevel');
                ig.input.bind(ig.KEY._3, 'dungeon');
                ig.input.bind(ig.KEY._2, 'continue');
                ig.input.bind(ig.KEY._4, 'equipmenu');
                ig.input.bind(ig.KEY._5, 'menu');
                ig.input.bind(ig.KEY._6, 'status');
                ig.input.bind(ig.KEY._7, 'equipshield');
                ig.input.bind(ig.KEY._0, 'equiparmor');
                ig.input.bind(ig.KEY._8, 'minimap_Open');
                ig.input.bind(ig.KEY._9, 'equipItemScrollDown');

                //new ig.TouchButton( 'continue',0, 0, 240, 160);
                
                if (ig.game.loadGame === true) { ig.game.Load(ig.game.saveSlot); ig.game.loadGame = false; }
                // Bind keys
                ig.input.bind(ig.KEY.LEFT_ARROW, 'left');
                ig.input.bind(ig.KEY.RIGHT_ARROW, 'right');
                ig.input.bind(ig.KEY.DOWN_ARROW, 'down');
                ig.input.bind(ig.KEY.UP_ARROW, 'up');
                ig.input.bind(ig.KEY.SPACE, 'space');
                ig.input.bind(ig.KEY.X, 'action1');
                ig.input.bind(ig.KEY.Z, 'action2');
                ig.input.bind(ig.KEY.C, 'jump');
                ig.input.bind(ig.KEY.K, 'saveandquit');
                ig.input.bind(ig.KEY.L, 'continue');
                ig.input.bind(ig.KEY.TAB, 'menu');
                ig.input.bind(ig.KEY.ENTER, 'enter');
                ig.input.bind(ig.KEY.ESC, 'esc');

                // ig.input.bindTouch('#buttonLeft', 'left');
                //   ig.input.bindTouch("#buttonRight", 'right');

                // Bind mouse controls
                //  ig.input.initMouse();
                //ig.input.bind(ig.KEY.MOUSE1, 'click');


                //ig.input.bind (ig.KEY.MOUSE2, 'right_click');


                // Touch controls

                // if( ig.ua.mobile ) {


                //	}
                this.gameCanvas = document.getElementById('canvas');
                this.scale = ig.system.width / this.gameCanvas.clientWidth;
                var newWidth = window.innerWidth;
                var newHeight = window.innerHeight;
                var newWidthToHeight = newWidth / newHeight;
                var widthToHeight = 267 / 160;
                                
                //check if ratio is 16:9
                if (newWidthToHeight > widthToHeight) {
                    newWidth = newHeight * widthToHeight;
                                
                } else {
                    newHeight = newWidth / widthToHeight;
                                
                }
                this.scalingVar = Math.floor(gscalinVar);
                                
                var s_width = 267;
                var s_height = 160;
                this.width = s_width;
                this.height = s_height;
                //check scales and assign values accordingly
                                
                                
                              
                var ms_width = ig.system.width;
                var ms_height = ig.system.height;

                var x_scale = window.innerWidth / 267;
                var y_scale = window.innerHeight / 160;
                /* if((ms_width/ms_height) >(window.innerWidth / window.innerHeight)){
                  ms_height = (ms_width / (window.innerWidth/window.innerHeight));
                  
                  }else{
                  
                  ms_width = (ms_height * (window.innerWidth/window.innerHeight));
                  }*/
                //Hack to fix margin with touch buttons
                //Margin is initialized in main.js
                /*   var baseSize = 30;
                   var stickSize = 15;
                   var margin = 20;
                   var y = ig.system.height - baseSize - margin - 40;
                   var x1 = baseSize + margin;
                   var x2 = ig.system.width - baseSize - margin;
                   
                   this.stickLeft = new ig.AnalogStick( x1, y, baseSize, stickSize); */
                                
                   
                ig.game.spawnMainMenuBG();
                
                if (!myTouchButtons || (myTouchButtons && !ig.game.myTouchButtons)) {
                   
                    ig.game.myTouchButtons = SetButtons();
                  
                }
             
           
              
                                
                ig.game.damageDelayTimer = new ig.Timer();
                ig.game.delayChangeLevel = new ig.Timer();
                ig.game.bossBarPause = new ig.Timer();

                if (ig.game.myTouchButtons.perfButtons["popup"]) {
                    ig.game.POPUP = ig.game.myTouchButtons.perfButtons["popup"];
                }
             /*   var touchL = ig.game.myTouchButtons.buttons.length;
                for (var i = 0; i < touchL; i++) {

                    if (ig.game.myTouchButtons.buttons[i].action == "popup") { ig.game.POPUP = ig.game.myTouchButtons.buttons[i];break; }


                }*/




                if (ig.game.myTouchButtons && alignOnce == true) { ig.game.myTouchButtons.align(); alignOnce = false; }

                //   ig.game.alignHUDButtons();
               
        
               
                canvas.addEventListener('pointerdown', function (e) {


                    e.preventDefault();
                    var bs_width = window.innerWidth;
                    var bs_height = window.innerHeight;

                    var startX = (e.clientX);

                    var startY = (e.clientY);

                    var game = ig.game;
                    var TouchMoveXLimit = ig.game.TouchMoveXLimit;
                    var TouchMoveYLimit = ig.game.TouchMoveYLimit;
                    game.player = game.getEntityByName('player1');
                    if (game.player) {

                        if (game.menuOpen() && !game.scene_Invoked) {
                            var player = game.player;
                            var accel = player.standing ? player.accelGround : player.accelAir;


                            if (startX < (TouchMoveXLimit) && startX >= 0 && startY >= (TouchMoveYLimit) && startY <= bs_height) {
                                //Move Left

                                player.MovingRight = false;
                                player.MovingLeft = true;





                            }
                            else if (startX < (TouchMoveXLimit * 2) && startX >= (TouchMoveXLimit) && startY >= (TouchMoveYLimit) && startY <= bs_height) {
                                //Move Right

                                player.MovingRight = true;
                                player.MovingLeft = false


                            }

                            if (startX >= 0.76 * bs_width && startX < 0.88 * bs_width && startY >= 0.8 * bs_height && startY < bs_height

                       ) {

                                if (!ig.game.actionTimer1) ig.game.actionTimer1 = new ig.Timer();
                                ig.game.actionTimer1.set(1);
                                ig.game.actionTimer2 = null;

                                ig.game.skillSelectNum = 1;
                            }
                            else if (startX >= 0.88 * bs_width && startX < bs_width && startY >= 0.8 * bs_height && startY < bs_height

                                ) {

                                if (!ig.game.actionTimer2) ig.game.actionTimer2 = new ig.Timer();
                                ig.game.actionTimer2.set(1);
                                ig.game.actionTimer1 = null;

                                ig.game.skillSelectNum = 2;

                            }


                        }


                    }

                }, false);
                canvas.addEventListener('pointerup', function (e) {


                    e.preventDefault();
                    var bs_width = window.innerWidth;
                    var bs_height = window.innerHeight;




                    var startX = (e.clientX);

                    var startY = (e.clientY);

                    var game = ig.game;
                    var TouchMoveXLimit = ig.game.TouchMoveXLimit;
                    var TouchMoveYLimit = ig.game.TouchMoveYLimit;
                    var player = game.getEntityByName('player1');
                    if (player) {
                        if ((player.MovingRight == true || player.MovingLeft == true) &&
                            ((startX < (TouchMoveXLimit) && startX >= 0 && startY >= (TouchMoveYLimit) && startY <= bs_height) ||
                             (startX < (TouchMoveXLimit * 2) && startX >= (TouchMoveXLimit) && startY >= (0.55 * bs_height) && startY <= bs_height)) ||
                            !(startX < bs_width && startX >= (TouchMoveXLimit * 2) && startY >= (0.55 * bs_height) && startY <= bs_height)) {

                            player.MovingRight = false;
                            player.MovingLeft = false;

                        }
                        if (ig.game.showSkillSelect === "up") {

                            if (startX >= 0.5206 * bs_width && startX < 0.6404 * bs_width && startY >= 0.4 * bs_height && startY < 0.6 * bs_height && ig.game.player.CLASS === "BLADE") {

                                if (ig.game.skillSelectNum === 1) {
                                    player.currentActionSkill1 = 'EntityPlayerSlash';
                                    player.currentAction1Manacost = 4;
                                }
                                else if (ig.game.skillSelectNum === 2) {
                                    player.currentActionSkill2 = 'EntityPlayerSlash';
                                    player.currentAction2Manacost = 4;
                                }
                                ig.game.showSkillSelect = "down";
                            }
                            else if (startX >= 0.5206 * bs_width && startX < 0.6404 * bs_width && startY >= 0.6 * bs_height && startY < 0.8 * bs_height && ig.game.player.CLASS === "SPELL") {

                                if (ig.game.skillSelectNum === 1) {
                                    player.currentActionSkill1 = 'EntityFrostball';
                                    player.currentAction1Manacost = 10;
                                }
                                else if (ig.game.skillSelectNum === 2) {
                                    player.currentActionSkill2 = 'EntityFrostball';
                                    player.currentAction2Manacost = 10;
                                }
                                ig.game.showSkillSelect = "down";
                            }
                            else if (startX >= 0.6404 * bs_width && startX < 0.7603 * bs_width && startY >= 0.4 * bs_height && startY < 0.6 * bs_height && ig.game.player.BLADE_SHOCKPULSE) {

                                if (ig.game.skillSelectNum === 1) {
                                    player.currentActionSkill1 = 'EntityShockpulse';
                                    player.currentAction1Manacost = 10;
                                }
                                else if (ig.game.skillSelectNum === 2) {
                                    player.currentActionSkill2 = 'EntityShockpulse';
                                    player.currentAction2Manacost = 10;
                                }
                                ig.game.showSkillSelect = "down";

                            }
                            else if (startX >= 0.6404 * bs_width && startX < 0.7603 * bs_width && startY >= 0.6 * bs_height && startY < 0.8 * bs_height && ig.game.player.SPELL_FIREBLAST) {

                                if (ig.game.skillSelectNum === 1) {
                                    player.currentActionSkill1 = 'EntityFireBlast';
                                    player.currentAction1Manacost = 15;
                                }
                                else if (ig.game.skillSelectNum === 2) {
                                    player.currentActionSkill2 = 'EntityFireBlast';
                                    player.currentAction2Manacost = 15;
                                }
                                ig.game.showSkillSelect = "down";

                            }
                            else if (startX >= 0.7603 * bs_width && startX < 0.8801 * bs_width && startY >= 0.4 * bs_height && startY < 0.6 * bs_height && ig.game.player.CLASS === "LIFE") {

                                if (ig.game.skillSelectNum === 1) {
                                    player.currentActionSkill1 = 'EntityLifeSlash';
                                    player.currentAction1Manacost = 1;
                                }
                                else if (ig.game.skillSelectNum === 2) {
                                    player.currentActionSkill2 = 'EntityLifeSlash';
                                    player.currentAction2Manacost = 1;
                                }
                                ig.game.showSkillSelect = "down";

                            }
                            else if (startX >= 0.7603 * bs_width && startX < 0.8801 * bs_width && startY >= 0.6 * bs_height && startY < 0.8 * bs_height && ig.game.player.SPELL_FROSTFIRE) {

                                if (ig.game.skillSelectNum === 1) {
                                    player.currentActionSkill1 = 'EntityFrostFire';
                                    player.currentAction1Manacost = 25;
                                }
                                else if (ig.game.skillSelectNum === 2) {
                                    player.currentActionSkill2 = 'EntityFrostFire';
                                    player.currentAction2Manacost = 25;
                                }
                                ig.game.showSkillSelect = "down";

                            }
                            else if (startX >= 0.8801 * bs_width && startX < bs_width && startY >= 0.4 * bs_height && startY < 0.6 * bs_height && ig.game.player.LIFE_RADIANCE) {

                                if (ig.game.skillSelectNum === 1) {
                                    player.currentActionSkill1 = 'EntityRadiance';
                                    player.currentAction1Manacost = 0;
                                }
                                else if (ig.game.skillSelectNum === 2) {
                                    player.currentActionSkill2 = 'EntityRadiance';
                                    player.currentAction2Manacost = 0;
                                }
                                ig.game.showSkillSelect = "down";

                            }
                            else if (startX >= 0.8801 * bs_width && startX < bs_width && startY >= 0.6 * bs_height && startY < 0.8 * bs_height && ig.game.player.SPELL_ARCANEBALL) {

                                if (ig.game.skillSelectNum === 1) {
                                    player.currentActionSkill1 = 'EntityArcaneBall';
                                    player.currentAction1Manacost = 50;
                                }
                                else if (ig.game.skillSelectNum === 2) {
                                    player.currentActionSkill2 = 'EntityArcaneBall';
                                    player.currentAction2Manacost = 50;
                                }
                                ig.game.showSkillSelect = "down";

                            }

//MORE
                            else if (startX >= 0.5206 * bs_width && startX < 0.6404 * bs_width && startY >= 0.2 * bs_height && startY < 0.4 * bs_height) {

                                if (ig.game.skillSelectNum === 1) {
                                    player.currentActionSkill1 = 'EntityWeakSlash';
                                    player.currentAction1Manacost = 4;
                                }
                                else if (ig.game.skillSelectNum === 2) {
                                    player.currentActionSkill2 = 'EntityWeakSlash';
                                    player.currentAction2Manacost = 4;
                                }
                                ig.game.showSkillSelect = "down";

                            }
                            else if (startX >= 0.7603 * bs_width && startX < 0.8801 * bs_width && startY >= 0.2 * bs_height && startY < 0.4 * bs_height && ig.game.player.DEMON_DARKWAVE) {

                                if (ig.game.skillSelectNum === 1) {
                                    player.currentActionSkill1 = 'EntityDarkWave';
                                    player.currentAction1Manacost = 0;
                                }
                                else if (ig.game.skillSelectNum === 2) {
                                    player.currentActionSkill2 = 'EntityDarkWave';
                                    player.currentAction2Manacost = 0;
                                }
                                ig.game.showSkillSelect = "down";

                            }
                            else if (startX >= 0.8801 * bs_width && startX < bs_width && startY >= 0.2 * bs_height && startY < 0.4 * bs_height && ig.game.player.DEMON_DREADWAVE) {

                                if (ig.game.skillSelectNum === 1) {
                                    player.currentActionSkill1 = 'EntityDreadWave';
                                    player.currentAction1Manacost = 0;
                                }
                                else if (ig.game.skillSelectNum === 2) {
                                    player.currentActionSkill2 = 'EntityDreadWave';
                                    player.currentAction2Manacost = 0;
                                }
                                ig.game.showSkillSelect = "down";

                            }
                            else if (startX >= 0.6404 * bs_width && startX < 0.7603 * bs_width && startY >= 0.2 * bs_height && startY < 0.4 * bs_height && ig.game.player.CLASS === "DEMON") {

                                if (ig.game.skillSelectNum === 1) {
                                    player.currentActionSkill1 = 'EntityDemonSlash';
                                    player.currentAction1Manacost = 0;
                                }
                                else if (ig.game.skillSelectNum === 2) {
                                    player.currentActionSkill2 = 'EntityDemonSlash';
                                    player.currentAction2Manacost = 0;
                                }
                                ig.game.showSkillSelect = "down";

                            }

                        }
                    }



                }, false);

                canvas.addEventListener('pointermove', function (e) {

                    e.preventDefault();
                    var bs_width = window.innerWidth;
                    var bs_height = window.innerHeight;



                    var startX = (e.clientX);

                    var startY = (e.clientY);

                    var game = ig.game;
                    var TouchMoveXLimit = ig.game.TouchMoveXLimit;
                    var TouchMoveYLimit = ig.game.TouchMoveYLimit;

                    game.player = game.getEntityByName('player1');
                    if (game.player) {

                        if (game.menuOpen() && !game.scene_Invoked) {
                            var player = game.player;
                            var accel = player.standing ? player.accelGround : player.accelAir;

                            player.navigating = false;
                            if (startX < (TouchMoveXLimit) && startX >= 0 && startY >= (TouchMoveYLimit) && startY <= bs_height) {
                                //Move Left

                                player.MovingRight = false;
                                player.MovingLeft = true;





                            }
                            else if (startX < (TouchMoveXLimit * 2) && startX >= (TouchMoveXLimit) && startY >= (TouchMoveYLimit) && startY <= bs_height) {
                                //Move Right

                                player.MovingRight = true;
                                player.MovingLeft = false


                            }
                            else {
                                if (!(startX < bs_width && startX >= (TouchMoveXLimit * 2) && startY >= (0.55 * bs_height) && startY <= bs_height)) {
                                    player.MovingRight = false;
                                    player.MovingLeft = false;
                                }
                            }


                        }



                        if (ig.game.showSkillSelect === "up" && startX >= 0.5206 * bs_width && startX < 0.6404 * bs_width && startY >= 0.4 * bs_height && startY < 0.6 * bs_height) {

                            ig.game.drawSpot.x = 267 - 128;
                            ig.game.drawSpot.y = 64;


                        }
                        else if (ig.game.showSkillSelect === "up" && startX >= 0.5206 * bs_width && startX < 0.6404 * bs_width && startY >= 0.6 * bs_height && startY < 0.8 * bs_height) {
                            ig.game.drawSpot.x = 267 - 128;
                            ig.game.drawSpot.y = 96;


                        }
                        else if (ig.game.showSkillSelect === "up" && startX >= 0.6404 * bs_width && startX < 0.7603 * bs_width && startY >= 0.4 * bs_height && startY < 0.6 * bs_height) {
                            ig.game.drawSpot.x = 267 - 96;
                            ig.game.drawSpot.y = 64;


                        }
                        else if (ig.game.showSkillSelect === "up" && startX >= 0.6404 * bs_width && startX < 0.7603 * bs_width && startY >= 0.6 * bs_height && startY < 0.8 * bs_height) {
                            ig.game.drawSpot.x = 267 - 96;
                            ig.game.drawSpot.y = 96;


                        }
                        else if (ig.game.showSkillSelect === "up" && startX >= 0.7603 * bs_width && startX < 0.8801 * bs_width && startY >= 0.4 * bs_height && startY < 0.6 * bs_height) {

                            ig.game.drawSpot.x = 267 - 64;
                            ig.game.drawSpot.y = 64;


                        }
                        else if (ig.game.showSkillSelect === "up" && startX >= 0.7603 * bs_width && startX < 0.8801 * bs_width && startY >= 0.6 * bs_height && startY < 0.8 * bs_height) {
                            ig.game.drawSpot.x = 267 - 64;
                            ig.game.drawSpot.y = 96;


                        }
                        else if (ig.game.showSkillSelect === "up" && startX >= 0.8801 * bs_width && startX < bs_width && startY >= 0.4 * bs_height && startY < 0.6 * bs_height) {
                            ig.game.drawSpot.x = 267 - 32;
                            ig.game.drawSpot.y = 64;


                        }
                        else if (ig.game.showSkillSelect === "up" && startX >= 0.8801 * bs_width && startX < bs_width && startY >= 0.6 * bs_height && startY < 0.8 * bs_height) {
                            ig.game.drawSpot.x = 267 - 32;
                            ig.game.drawSpot.y = 96;


                        }

                        else if (ig.game.showSkillSelect === "up" && startX >= 0.8801 * bs_width && startX < bs_width && startY >= 0.2 * bs_height && startY < 0.4 * bs_height) {

                            ig.game.drawSpot.x = 267 - 32;
                            ig.game.drawSpot.y = 32;


                        }
                        else if (ig.game.showSkillSelect === "up" && startX >= 0.7603 * bs_width && startX < 0.8801 * bs_width && startY >= 0.2 * bs_height && startY < 0.4 * bs_height) {
                            ig.game.drawSpot.x = 267 - 64;
                            ig.game.drawSpot.y = 32;


                        }
                        else if (ig.game.showSkillSelect === "up" && startX >= 0.6404 * bs_width && startX < 0.7603 * bs_width && startY >= 0.2 * bs_height && startY < 0.4 * bs_height) {
                            ig.game.drawSpot.x = 267 - 96;
                            ig.game.drawSpot.y = 32;


                        }
                        else if (ig.game.showSkillSelect === "up" && startX >= 0.5206 * bs_width && startX < 0.6404 * bs_width && startY >= 0.2 * bs_height && startY < 0.4 * bs_height) {
                            ig.game.drawSpot.x = 267 - 128;
                            ig.game.drawSpot.y = 32;


                        }



                        else if ((ig.game.actionTimer1 && ig.game.actionTimer1.delta() > 0) ||
                            (ig.game.actionTimer2 && ig.game.actionTimer2.delta() > 0)) {
                            ig.game.showSkillSelect = "up";
                            if (ig.game.ChangeTutorialDone === false && ig.game.CurrentTutImg) {
                                ig.game.ChangeTutorialDone = true;
                                ig.game.CurrentTutImg = null;
                            }
                            ig.game.actionTimer2 = null;
                            ig.game.actionTimer1 = null;
                        }
                        else if (startX >= 0.76 * bs_width && startX < 0.88 * bs_width && startY >= 0.8 * bs_height && startY < bs_height

                               ) {


                        }
                        else if (startX >= 0.88 * bs_width && startX < bs_width && startY >= 0.8 * bs_height && startY < bs_height

                            ) {




                        }
                        else {
                            ig.game.showSkillSelect = "down";
                        }


                        if (startX >= 0.76 * bs_width && startX < 0.88 * bs_width && startY >= 0.8 * bs_height && startY < bs_height

                            && ig.game.actionTimer1 && ig.game.actionTimer1.delta() <= 0) {


                        }
                        else if (startX >= 0.88 * bs_width && startX < bs_width && startY >= 0.8 * bs_height && startY < bs_height

                            && ig.game.actionTimer2 && ig.game.actionTimer2.delta() <= 0) {




                        }
                        else {

                            if (ig.game.actionTimer1 || ig.game.actionTimer2) {
                                ig.game.showSkillSelect = "down";
                                ig.game.actionTimer2 = null;
                                ig.game.actionTimer1 = null;
                            }
                        }
                    }

                }, false);

            },
            loadIntro: function(){
                ig.game.textDelay.set(1);
                ig.game.loadLevel(ig.global['LevelLevel_VIEW_TheCapital']);
                ig.game.introView = true;
                ig.game.myTouchButtons.removeButton("menu_musicOn");
                ig.game.textWriterTile = 0;
                ig.game.textWriterState = 'introState1';
                if (!ig.game.introViewTimer) { ig.game.introViewTimer = new ig.Timer(); }
                ig.game.introViewTimer.set(0.05);

                if (!ig.game.presentationTimer2) {
                    ig.game.presentationTimer2 = new ig.Timer();
                    ig.game.presentationTimer2.set(8);
                }
                ig.game.presentationOn = true;
                ig.game.Main_Menu = false;
                ig.game.screen.x = 400;
                ig.game.screen.y = 500;
                MainMenuElementsTo(false);
                
            },
            playMusic: function (value) {
                var game = ig.game;
                var music = ig.music;
          
        
                if (!music.getIsPlaying() && isMusicOn) music.fadeInAndPlay(0.5, value);
                else if(isMusicOn) {
                    music.fadeOutAndPlay(0.5,value);
                }
                
               // game.musicTimer.set(1);
                //if (game.musicTimer.delta() > 0)
             //   {
                  //  music.crossFade(1,value);
                    music.loop = true;

            //    }
              
            
     


            },
       
            update: function () {

             
                var music = ig.music;
                var game = ig.game;
                if(game.hopOver)game.hopOver = false;
              
                if(controller) state = buttons.Update();
               
             
                //Dunno if this is ok to be here??
                ig.game.updateScene();
                
                
                /* if (game.bossBasrPause_T == true && game.bossBarPause.delta() > 0) {
                     game.bossBarPause_T = false;
                 }
                 else if (game.dialog == true) {
                     if (ig.input.pressed('dialog_P') && game.dialogDelay.delta() > 0) {
 
                         game.dialog = false;
 
                     }
                 }*/
        
                if (game.InvokedChangeLevel === true) {

                    game.soft_paused = false;
                    /*
                    if (ig.game.currentLevel == 'LevelLevel_GrassLand_0' && isTrial == true) {
                        ig.game.myTouchButtons = null; ig.system.setGame(MyGame);
                    }*/
                    game.destroyTimerArray();
                    game.InvokedChangeLevel = false;
                    
                    game.levelReseted = true;
                 
              /*      if (game.checkPointVar > 0) {
                        if (loadObj['clearLevel']) {
                            var clearLevel = parseInt(loadObj['clearLevel']);

                            if (game.checkPointVar > clearLevel) {
                                game.player.clearLevel = game.checkPointVar;
                              
                            }
                        }


                    }*/
                    game.itemLevel = game.checkSpecialLevel(ig.game.currentLevel);
                    game.saveGame(game.data_packet,game.player,game.saveSlot);
                
                    game.Load(game.saveSlot);
                    game.deleteLevelUp();
                    game.generateMiniMap("minimap", 267, 160, [ig.game.backgroundMaps.length-2]);
                    game.screenFader = new ig.ScreenFader({ fade: 'out', speed: 2.0 });
            
                    HUDElementsTo(true);
                }
                
                if (game.paused === true)
                { music.pause(); game.DoItOnce = 1; }
                else {
                    if (!game.EndScreen && !game.EndScreen_WinterWitch && !game.EndScreen_Finale && !game.EndScreen_Elemental && !game.EndScreen_VoidZone) {
                        
                    }
                    if (ig.input.released('trialButton') && ig.game.trialConfirm  && !game.saveSelection && game.Main_Menu === true && !game.introGoing && !game.askConfirmation) {
                        ig.game.trialConfirm = false;
                        trialElementsTo(false);
                        LevelSelectElementsTo(true);
                        buyFullGame();
                        return;
                    }
                    else if (ig.input.released('trialCancel') && ig.game.trialConfirm  && !game.saveSelection && game.Main_Menu === true && !game.introGoing && !game.askConfirmation) {
                        ig.game.trialConfirm = false;
                        trialElementsTo(false);
                        LevelSelectElementsTo(true);
                        return;
                    }
                    if (ig.input.released('screen') && ig.game.needUnlockConfirm > 0 && !game.saveSelection && game.Main_Menu === true && !game.LevelSelect && !game.introGoing && !game.askConfirmation) {
                        ig.game.needUnlockConfirm = 0;
                        return;
                    }
                    if (ig.input.released('screen') && informUnlock > 0 && !game.saveSelection && game.Main_Menu === true && !game.LevelSelect && !game.introGoing && !game.askConfirmation) {
                   
                        informUnlock = 0;
                     
                        return;
                    }
                  
                    if (ig.input.released('levelChangeButtonInvoked') && ig.game.levelChangeButtonInvoked && ig.game.menuOpen()) {
                        ig.game.myTouchButtons.searchButton("levelChangeButtonInvoked", false);
                     
                        ig.game.hopOver = true;
                        ig.game.screenFader = new ig.ScreenFader({ fade: 'in', speed: 2.0 });
                        ig.game.soft_paused = true;
                      //  ig.game.bossKill_Event = true;
                      
                        OptionElementsTo(false);
                        HUDElementsTo(false);
                        ig.game.saveGame(ig.game.player);
                        saveSkip = ig.game.saveSlot;
                        if(informUnlock === 0) LevelSelectSkip = true;
                      
                        ig.system.setGame(MyGame);
                       
                        
                        
                    }
                    if (ig.input.pressed('minimap_Open') && ig.game.Main_Menu == false && ig.game.minimap_Open == false && ig.game.menuOpen()) {

                        ig.game.minimap_Open = true;

                    }
                    else if (ig.input.pressed('minimap_Close') && ig.game.Main_Menu == false && ig.game.minimap_Open == true && ig.game.menuOpen()) {

                        ig.game.minimap_Open = false;

                    }
                    
                    else if (
                        (ig.input.pressed('skillmenu2')) && game.menuOpen('skillmenu') && game.LevelSelect == false
                        ) {
                        if (game.skill_menu) { game.skill_menu = false; game.player.skillMenu2Selected = false; }
                        else { game.skill_menu = true; game.player.skillMenu1Selected = false; game.player.skillMenu2Selected = true; }
                        game.player.SkillMenu2 = false;
                    }
                    else if (
                             (ig.input.pressed('skillmenu1')) && game.menuOpen('skillmenu') && game.LevelSelect == false
                             ) {
                        if (game.skill_menu) { game.skill_menu = false; game.player.skillMenu1Selected = false; game.player.skillMenu2Selected = false; }
                        else { game.skill_menu = true; game.player.skillMenu2Selected = false; game.player.skillMenu1Selected = true; }
                        game.player.SkillMenu1 = false;
                    }
                    //CHANGE BEFORE SUBMIT
                    welcomeTimer = (welcomeInvoked) ? 1 : 0;

                    // Update all entities and backgroundMaps

                    game.currentLevelBuffer = game.currentLevel;

                    if (game.Main_Menu === true) {

                        ig.game.ScrollLevelSelectionScreenTo();


                      

                        ig.game.invokedBossMusic = false;

                       

                        if(ig.input.released('cancelShopBuy') 
                             && !game.trialConfirm && !ig.game.buy_item_draw_anim && !ig.game.gotItemBuy
                            && game.buy_prompt&& game.buy_menu && !game.introGoing && game.changeLog_Show == false && game.saveSelection === false && game.LevelSelect === false && game.SellMenu === false && game.ShowCredits === false && restoreTransactionInvoked === false && sellPromptInvoked === false) 
                        {
                            game.buy_prompt = false;
                            game.buy_item = '';
                            game.buy_item_price = 0;
                            ConfirmationElementsBuyTo(false);
                           
                        }
                        else if (ig.input.released('buyShopConfirm')
                             && !game.trialConfirm && (accountHardCurrency >= game.buy_item_price) && !ig.game.buy_item_draw_anim && !ig.game.gotItemBuy &&
                            game.buy_prompt && game.buy_menu && !game.introGoing && game.changeLog_Show == false && game.saveSelection === false && game.LevelSelect === false && game.SellMenu === false && game.ShowCredits === false && restoreTransactionInvoked === false && sellPromptInvoked === false)
                        {
                            //game.generateItem();
                            accountHardCurrency -= game.buy_item_price;

                            localStorage.setItem('SUPRARPG_GOLD', accountHardCurrency);
                            game.chest_presentationTile = 0;
                            game.buy_item_draw_anim = true;
                            //Restore values
                           
                       
                            game.buy_price = 0;
                            ConfirmationElementsBuyTo(false);
                        }


                        if (ig.input.released('selectShopBuy_TINYGOLD')
                                 && !ig.game.buy_item_draw_anim && !ig.game.gotItemBuy && !ig.game.buy_prompt
                   && game.buy_menu && !game.introGoing && game.changeLog_Show == false && game.saveSelection === false && game.LevelSelect === false && game.SellMenu === false && game.ShowCredits === false && restoreTransactionInvoked === false && sellPromptInvoked === false) {
                           buyProduct("TINY_HARD_CRC");
                       
                        }
                        else if (ig.input.released('selectShopBuy_SMALLGOLD')
                                 && !ig.game.buy_item_draw_anim && !ig.game.gotItemBuy && !ig.game.buy_prompt
                   && game.buy_menu && !game.introGoing && game.changeLog_Show == false && game.saveSelection === false && game.LevelSelect === false && game.SellMenu === false && game.ShowCredits === false && restoreTransactionInvoked === false && sellPromptInvoked === false) {
                     

                          //  buyProduct("SMALL_HARD_CRC");

                        }
                        else if (ig.input.released('selectShopBuy_MEDGOLD')
                                 && !ig.game.buy_item_draw_anim && !ig.game.gotItemBuy && !ig.game.buy_prompt
                   && game.buy_menu && !game.introGoing && game.changeLog_Show == false && game.saveSelection === false && game.LevelSelect === false && game.SellMenu === false && game.ShowCredits === false && restoreTransactionInvoked === false && sellPromptInvoked === false) {
                          //  buyProduct("MED_HARD_CRC");
                        }
                        else if (ig.input.released('selectShopBuy_GREATGOLD')
                                 && !ig.game.buy_item_draw_anim && !ig.game.gotItemBuy && !ig.game.buy_prompt
                  && game.buy_menu && !game.introGoing && game.changeLog_Show == false && game.saveSelection === false && game.LevelSelect === false && game.SellMenu === false && game.ShowCredits === false && restoreTransactionInvoked === false && sellPromptInvoked === false) {
                        //    buyProduct("GREAT_HARD_CRC");
                        }
                        else if (ig.input.released('selectShopBuy_HIGHGOLD')
                                 && !ig.game.buy_item_draw_anim && !ig.game.gotItemBuy && !ig.game.buy_prompt
                  && game.buy_menu && !game.introGoing && game.changeLog_Show == false && game.saveSelection === false && game.LevelSelect === false && game.SellMenu === false && game.ShowCredits === false && restoreTransactionInvoked === false && sellPromptInvoked === false) {
                        //    buyProduct("HIGH_HARD_CRC");
                        }

                        else if (ig.input.released('selectShopBuy_FIRSTCHEST')
                                 && !ig.game.buy_item_draw_anim && !ig.game.gotItemBuy && !ig.game.buy_prompt
                            && !ig.game.buy_item_draw_anim && !ig.game.gotItemBuy  
                   && game.buy_menu && !game.introGoing && game.changeLog_Show == false && game.saveSelection === false && game.LevelSelect === false && game.SellMenu === false && game.ShowCredits === false && restoreTransactionInvoked === false && sellPromptInvoked === false) {
                            game.buy_prompt = true;
                            game.buy_item = 'Wooden Chest';
                            game.buy_item_price = 15;
                            if (game.buy_item_price <= accountHardCurrency) {
                                ConfirmationElementsBuyTo(true,true);
                            }
                            else {
                                ConfirmationElementsBuyTo(true);
                            }
                           
                        }
                        else if (ig.input.released('selectShopBuy_SECONDCHEST')
                                 && !ig.game.buy_item_draw_anim && !ig.game.gotItemBuy && !game.buy_prompt
                   && game.buy_menu && !game.introGoing && game.changeLog_Show == false && game.saveSelection === false && game.LevelSelect === false && game.SellMenu === false && game.ShowCredits === false && restoreTransactionInvoked === false && sellPromptInvoked === false) {
                            game.buy_prompt = true;
                            game.buy_item = 'Iron Chest';
                            game.buy_item_price = 50;
                            if (game.buy_item_price <= accountHardCurrency) {
                                ConfirmationElementsBuyTo(true, true);
                            }
                            else {
                                ConfirmationElementsBuyTo(true);
                            }
                        }
                        else if (ig.input.released('selectShopBuy_THIRDCHEST')
                                 && !ig.game.buy_item_draw_anim && !ig.game.gotItemBuy  &&  !game.buy_prompt
                  && game.buy_menu && !game.introGoing && game.changeLog_Show == false && game.saveSelection === false && game.LevelSelect === false && game.SellMenu === false && game.ShowCredits === false && restoreTransactionInvoked === false && sellPromptInvoked === false) {
                            game.buy_prompt = true;
                            game.buy_item = 'Steel Chest';
                            game.buy_item_price = 100;
                            if (game.buy_item_price <= accountHardCurrency) {
                                ConfirmationElementsBuyTo(true, true);
                            }
                            else {
                                ConfirmationElementsBuyTo(true);
                            }
                        }
                        else if (ig.input.released('selectShopBuy_FOURTHCHEST')
                                 && !ig.game.buy_item_draw_anim && !ig.game.gotItemBuy && !game.buy_prompt
                   && game.buy_menu && !game.introGoing && game.changeLog_Show == false && game.saveSelection === false && game.LevelSelect === false && game.SellMenu === false && game.ShowCredits === false && restoreTransactionInvoked === false && sellPromptInvoked === false) {
                            game.buy_prompt = true;
                            game.buy_item = 'Magic Chest';
                            game.buy_item_price = 150;
                            if (game.buy_item_price <= accountHardCurrency) {
                                ConfirmationElementsBuyTo(true, true);
                            }
                            else {
                                ConfirmationElementsBuyTo(true);
                            }
                        }
                        else if (ig.input.released('selectShopBuy_FIFTHCHEST')
                                 && !ig.game.buy_item_draw_anim && !ig.game.gotItemBuy && !game.buy_prompt
                   && game.buy_menu && !game.introGoing && game.changeLog_Show == false && game.saveSelection === false && game.LevelSelect === false && game.SellMenu === false && game.ShowCredits === false && restoreTransactionInvoked === false && sellPromptInvoked === false) {
                            game.buy_prompt = true;
                            game.buy_item = 'Ancient Chest';
                            game.buy_item_price = 300;
                            if (game.buy_item_price <= accountHardCurrency) {
                                ConfirmationElementsBuyTo(true, true);
                            }
                            else {
                                ConfirmationElementsBuyTo(true);
                            }
                        }


                        if (ig.input.released('sellConfirm') && !game.trialConfirm && game.shop_menu === true && game.shop_prompt === true && game.sell_prompt === true && !game.upgrade_prompt) {


                   


                            game.UpdateItemArray("sell", ig.game.loadPackage.itemArray[ig.game.input_location_equip].id);
                            accountHardCurrency += game.checkItemPrice(ig.game.loadPackage.itemArray[ig.game.input_location_equip], true);
                            localStorage.setItem('SUPRARPG_GOLD', accountHardCurrency);


                            game.loadPackage.itemArray.splice(ig.game.input_location_equip, 1);
                            if (game.input_location_equip === game.loadPackage.itemArray.length) {
                                game.input_location_equip--;
                            }

                            if (!ig.game.loadPackage.itemArray[game.input_location_equip].isBossItem && ig.game.loadPackage.itemArray[game.input_location_equip].QualityLevel < 5) {
                                ig.game.myTouchButtons.searchButton("upgradeShop", true);
                            }
                            else {
                                ig.game.myTouchButtons.searchButton("upgradeShop", false);
                            }

                            if (!ig.game.loadPackage.itemArray[game.input_location_equip].itemEquipped) {
                              
                            }
                            else {
                                ig.game.myTouchButtons.searchButton("sellShop", false);
                            }
                            game.sell_prompt = false;
                            game.shop_prompt = false;
                            ConfirmationElementsTo(false, "sell");
                            ShopElementsTo(true, true);


                        }
                        else if (ig.input.released('upgradeConfirm') && !game.trialConfirm && game.shop_menu === true && game.shop_prompt === true && game.upgrade_prompt === true && game.shop_upgrade_price <= accountHardCurrency) {
                            game.loadPackage.itemArray[game.input_location_equip].QualityLevel++;
                            
                            var QualityLevel = game.loadPackage.itemArray[game.input_location_equip].QualityLevel;
                            if (QualityLevel == 5) { game.loadPackage.itemArray[game.input_location_equip].QualityScale = 2; }
                            else if (QualityLevel === 4) { game.loadPackage.itemArray[game.input_location_equip].QualityScale = 1.75; }
                            else if (QualityLevel === 3) { game.loadPackage.itemArray[game.input_location_equip].QualityScale = 1.5; }
                            else if (QualityLevel === 2) { game.loadPackage.itemArray[game.input_location_equip].QualityScale = 1.25; }

                            game.loadPackage.itemArray[game.input_location_equip].reRandomize();

                            game.UpdateItemArray("upgrade", game.loadPackage.itemArray[game.input_location_equip].id);
                            accountHardCurrency -= game.shop_upgrade_price;
                            localStorage.setItem('SUPRARPG_GOLD', accountHardCurrency);

                            game.confirmText = "";
                            game.upgrade_prompt_type = "";
                            game.upgrade_prompt_quality = 1;
                            game.upgrade_prompt = false;
                            game.shop_prompt = false;
                            ConfirmationElementsTo(false, "upgrade");
                            ShopElementsTo(true, true);

                        }
                        else if (ig.input.released('cancelShop') && !game.trialConfirm && game.shop_menu === true && game.shop_prompt === true) {

                          
                            game.shop_prompt = false;
                            game.upgrade_prompt = false;
                            game.sell_prompt = false;
                            game.confirmText = "";
                            game.upgrade_prompt_type = "";
                            game.upgrade_prompt_quality = 1;
                            ConfirmationElementsTo(false, "upgrade");
                            ConfirmationElementsTo(false, "sell");
                            ShopElementsTo(true, true);
                        }
                        else if (ig.input.released('goBackshop') && !game.trialConfirm && game.checkShopWindows()) {
                            game.shop_menu = false;
                            ig.game.myTouchButtons.searchButton("menu_musicOn", true);
                            MainMenuElementsTo(true);
                            ShopElementsTo(false);
                            return;
                        }

                        else if (ig.input.released('sellShop') && !game.loginScreenOn && !game.trialConfirm && !game.difficultyConfirm && game.needUnlockConfirm === 0 && game.checkShopWindows() && !game.shop_prompt) {

                            var checkAgainst = null;
                            if(ig.game.loadPackage.itemArray[ig.game.input_location_equip].isSword){
                                checkAgainst = ig.game.loadPackage.weapon.id
                            }
                            else if(ig.game.loadPackage.itemArray[ig.game.input_location_equip].isShield){
                                checkAgainst = ig.game.loadPackage.shield.id
                            }
                            else if(ig.game.loadPackage.itemArray[ig.game.input_location_equip].isArmor){
                                checkAgainst = ig.game.loadPackage.armor.id
                            }
                        

                            if (checkAgainst && ig.game.loadPackage && ig.game.loadPackage.itemArray[ig.game.input_location_equip] && (

                                checkAgainst!== ig.game.loadPackage.itemArray[ig.game.input_location_equip].id
                                )) {

                                game.confirmText = "Selling " + ig.game.loadPackage.itemArray[ig.game.input_location_equip].itemName + " gives you " + game.checkItemPrice(ig.game.loadPackage.itemArray[ig.game.input_location_equip], true) + " gold.";
                                game.sell_prompt = true;
                                game.shop_prompt = true;
                                ConfirmationElementsTo(true, "sell");
                                ShopElementsTo(false, true);
                            }


                        }

                        else if (ig.input.released('upgradeShop') && !game.trialConfirm && !game.difficultyConfirm && game.needUnlockConfirm === 0 && game.checkShopWindows() && !ig.game.loadPackage.itemArray[game.input_location_equip].isBossItem && !game.shop_prompt) {



                            game.shop_upgrade_price = (ig.game.loadPackage.itemArray[ig.game.input_location_equip].QualityLevel * ig.game.loadPackage.itemArray[ig.game.input_location_equip].QualityLevel * ig.game.loadPackage.itemArray[ig.game.input_location_equip].QualityLevel * ig.game.loadPackage.itemArray[ig.game.input_location_equip].itemTier * 2);


                            if (ig.game.loadPackage && ig.game.loadPackage.itemArray[ig.game.input_location_equip] &&
                                
                                (ig.game.loadPackage.itemArray[ig.game.input_location_equip].QualityLevel < 5)

                                ) {
                                game.shop_prompt = true;
                                game.upgrade_prompt = true;
                                if (ig.game.loadPackage.itemArray[ig.game.input_location_equip].isSword) game.upgrade_prompt_type = "weapon";
                                else if (ig.game.loadPackage.itemArray[ig.game.input_location_equip].isShield) game.upgrade_prompt_type = "shield";
                                else if (ig.game.loadPackage.itemArray[ig.game.input_location_equip].isArmor) game.upgrade_prompt_type = "armor";

                                game.upgrade_prompt_quality = ig.game.loadPackage.itemArray[ig.game.input_location_equip].QualityLevel;

                                game.confirmText = "Upgrading this item costs " + game.shop_upgrade_price + " gold.";

                                var upgradeAvailable = "yes";
                                if (game.shop_upgrade_price >= accountHardCurrency) upgradeAvailable = "not";
                                ConfirmationElementsTo(true, "upgrade", upgradeAvailable);
                                ShopElementsTo(false, true);

                            }


                        }


                        else if (ig.input.released('shopItemScrollUp') && !game.trialConfirm && game.checkShopWindows()) {

                            if (game.input_location_equip === 0) { game.input_location_equip = 0; } else { game.input_location_equip--; }


                            if (!ig.game.loadPackage.itemArray[game.input_location_equip].isBossItem && ig.game.loadPackage.itemArray[game.input_location_equip].QualityLevel < 5) {
                                ig.game.myTouchButtons.searchButton("upgradeShop", true);
                            }
                            else {
                                ig.game.myTouchButtons.searchButton("upgradeShop", false);
                            }


                            if (!ig.game.loadPackage.itemArray[game.input_location_equip].itemEquipped) {
                                ig.game.myTouchButtons.searchButton("sellShop", true);
                            }
                            else {
                                ig.game.myTouchButtons.searchButton("sellShop", false);
                            }
                        }
                        else if (ig.input.released('shopItemScrollDown') && !game.trialConfirm && game.checkShopWindows()) {


                            if (game.input_location_equip == (ig.game.loadPackage.itemArray.length - 1)) {
                                game.input_location_equip = (ig.game.loadPackage.itemArray.length - 1);
                            } else { game.input_location_equip++; }

                            if (!ig.game.loadPackage.itemArray[game.input_location_equip].isBossItem && ig.game.loadPackage.itemArray[game.input_location_equip].QualityLevel < 5) {
                                ig.game.myTouchButtons.searchButton("upgradeShop", true);
                            }
                            else {
                                ig.game.myTouchButtons.searchButton("upgradeShop", false);
                            }


                            if (!ig.game.loadPackage.itemArray[game.input_location_equip].itemEquipped) {
                                ig.game.myTouchButtons.searchButton("sellShop", true);
                            }
                            else {
                                ig.game.myTouchButtons.searchButton("sellShop", false);
                            }
                        }

                        if (ig.input.released('onmusic')&& !game.trialConfirm && !game.introGoing && !game.shop_menu && !isMusicOn && !game.buy_menu) { ig.music.volume = 0; isMusicOn = true; localStorage.setItem('isMusicOn', isMusicOn); ig.game.playMusic(ig.game.currentSong); }
                        else if (ig.input.released('offmusic')  && !game.trialConfirm && !game.introGoing && !game.shop_menu && isMusicOn && !game.buy_menu) { isMusicOn = false; localStorage.setItem('isMusicOn', isMusicOn); ig.music.stop(); }
                        else if (ig.input.released('DeleteConfirm') && !game.loginScreenOn && !game.trialConfirm && game.saveSelection === false && game.askConfirmation === true) {
                           
                            if (game.deletionNum === 1) {
                                localStorage.removeItem('SupraSave_1');
                            }
                            else if (game.deletionNum === 2) {
                                localStorage.removeItem('SupraSave_2');
                            }
                            else if (game.deletionNum === 3) {
                                localStorage.removeItem('SupraSave_3');
                            } 

                            game.saveSelection = false;
                            ConfirmationDeleteElementsTo(false);
                            FirstMainMenuElementsTo(false);
                            game.askConfirmation = false;
                            game.deletionNum = 0;
                            ig.system.setGame(MyGame);
                        }
                        else if (ig.input.released('CancelDelete') && !game.loginScreenOn && !game.trialConfirm && game.saveSelection === false && game.askConfirmation === true) {
                  
                            game.askConfirmation = false;
                            game.saveSelection = true;
                            ConfirmationDeleteElementsTo(false);
                            FirstMainMenuElementsTo(true);
                        }


                        else if (ig.input.released('saveSlot1') && !game.loginScreenOn && !game.trialConfirm && !game.introGoing && game.saveSelection === true && game.askConfirmation === false) {
                            ig.game.saveSlot = 1;
                            ig.game.saveSelection = false;
                            //ig.game.loadObject1 = null;
                            if (!ig.game.loadObject1) {
                                ig.game.createSave();
                                ig.game.loadIntro();
                                ig.game.currentSong = 'gearup';
                                ig.game.playMusic(ig.game.currentSong);
                            }
                            else {
                                MainMenuElementsTo(true);
                                ig.game.maxLevels = parseInt(ig.game.loadObject1['maxLevels']);
                            }
                          
                      
                            ig.game.loadObject2 = null;
                            ig.game.loadObject3 = null;
                            FirstMainMenuElementsTo(false);
                        

                       
                        }
                        else if (ig.input.released('saveSlot2') && !game.loginScreenOn && !game.trialConfirm && !game.introGoing && game.saveSelection === true && game.askConfirmation === false) {
                            ig.game.saveSlot = 2;
                            ig.game.saveSelection = false;
                            ig.game.loadObject1 = null;
                            //  ig.game.loadObject2 = null;
                            if (!ig.game.loadObject2) {
                                ig.game.createSave(); ig.game.loadIntro();
                                ig.game.currentSong = 'gearup';
                                ig.game.playMusic(ig.game.currentSong);
                            }
                            else {
                                MainMenuElementsTo(true);
                                ig.game.maxLevels = parseInt(ig.game.loadObject2['maxLevels']);
                            }
                          
                           
                            ig.game.loadObject3 = null;
                            FirstMainMenuElementsTo(false);
                          
                        }
                        else if (ig.input.released('saveSlot3') && !game.loginScreenOn && !game.trialConfirm && !game.introGoing && game.saveSelection === true && game.askConfirmation === false) {
                            ig.game.saveSlot = 3;
                            ig.game.saveSelection = false;
                            ig.game.loadObject1 = null;
                            ig.game.loadObject2 = null;
                            if (!ig.game.loadObject3) {

                                ig.game.createSave(); ig.game.loadIntro();
                                ig.game.currentSong = 'gearup';
                                ig.game.playMusic(ig.game.currentSong);
                            }
                            else {
                                MainMenuElementsTo(true);
                                ig.game.maxLevels = parseInt(ig.game.loadObject3['maxLevels']);
                            }
                      
                        
                           // ig.game.loadObject3 = null;
                            FirstMainMenuElementsTo(false);
                           
                        }
                        else if (ig.input.released('deleteSlot1') && !game.loginScreenOn && !game.trialConfirm && !game.introGoing && game.saveSelection === true && game.askConfirmation === false) {
                         
                        


                            if (localStorage.getItem('SupraSave_1')) {
                                ConfirmationDeleteElementsTo(true);

                                FirstMainMenuElementsTo(false);
                                game.saveSelection = false;
                                game.askConfirmation = true;
                                game.deletionNum = 1;
                            }
                           
                           
                        }
                        else if (ig.input.released('deleteSlot2') && !game.loginScreenOn && !game.trialConfirm && !game.introGoing && game.saveSelection === true && game.askConfirmation === false) {
                            if (localStorage.getItem('SupraSave_2')) {
                                ConfirmationDeleteElementsTo(true);

                                FirstMainMenuElementsTo(false);
                                game.saveSelection = false;
                                game.askConfirmation = true;
                                game.deletionNum = 2
                            }
                        }
                        else if (ig.input.released('deleteSlot3') && !game.loginScreenOn && !game.trialConfirm && !game.introGoing && game.saveSelection === true && game.askConfirmation === false) {
                         
                            if (localStorage.getItem('SupraSave_3')) {
                                ConfirmationDeleteElementsTo(true);

                                FirstMainMenuElementsTo(false);
                                game.saveSelection = false;
                                game.askConfirmation = true;
                                game.deletionNum = 3;
                            }
                        }
                        else if (ig.input.released('selectLevel') && !game.loginScreenOn && !game.trialConfirm && !game.difficultyConfirm && game.needUnlockConfirm === 0 && !game.askConfirmation && !game.buy_menu && !game.shop_menu && !game.introGoing && game.changeLog_Show == false && game.saveSelection === false && game.LevelSelect === false && game.SellMenu === false && game.ShowCredits === false && restoreTransactionInvoked === false && sellPromptInvoked === false) {
                       
                            
                      
                          
                            ig.game.hopOver = true;
                            MainMenuElementsTo(false);
                            LevelSelectElementsTo(true);
                            ig.game.LevelSelect = true;
                            
                        }
                        else if (ig.input.released('selectShopBuy') && !game.loginScreenOn && !game.trialConfirm && !game.difficultyConfirm && game.needUnlockConfirm === 0 && !game.askConfirmation && !game.shop_menu
                            && !game.introGoing && game.changeLog_Show == false && game.saveSelection === false && game.LevelSelect === false && game.SellMenu === false && game.ShowCredits === false && restoreTransactionInvoked === false && sellPromptInvoked === false) {
                            game.buy_menu = true;
                            MainMenuElementsTo(false);
                            ig.game.myTouchButtons.searchButton("menu_musicOn", false);
                          
                            BuyShopElementsTo(true);
                        }
                        else if (ig.input.released('goBackshopBuy') && !game.loginScreenOn && !game.trialConfirm && !game.askConfirmation && !ig.game.buy_item_draw_anim && !ig.game.gotItemBuy && !ig.game.buy_prompt
                                              && game.buy_menu && !game.introGoing && game.changeLog_Show == false && game.saveSelection === false && game.LevelSelect === false && game.SellMenu === false && game.ShowCredits === false && restoreTransactionInvoked === false && sellPromptInvoked === false) {
                            game.buy_menu = false;
                            MainMenuElementsTo(true);
                            ig.game.myTouchButtons.searchButton("menu_musicOn", true);
                            BuyShopElementsTo(false);
                        }

                    

                        else if (ig.input.released('selectShopSell') && !game.loginScreenOn && !game.trialConfirm && !game.difficultyConfirm && game.needUnlockConfirm === 0 && !game.askConfirmation
                    && !game.introGoing && !game.buy_menu &&game.changeLog_Show == false && game.saveSelection === false && game.LevelSelect === false && game.SellMenu === false && game.ShowCredits === false && restoreTransactionInvoked === false && sellPromptInvoked === false
           ) {
                            var skipThis = false;
                            MainMenuElementsTo(false);
                          
                            if (ig.game.saveSlot === 1 && localStorage.getItem("SupraSave_1")) ig.game.loadObject1 = JSON.parse(localStorage.getItem("SupraSave_1"));
                            else if (ig.game.saveSlot === 2 && localStorage.getItem("SupraSave_2")) ig.game.loadObject2 = JSON.parse(localStorage.getItem("SupraSave_2"));
                            else if (ig.game.saveSlot === 3 && localStorage.getItem("SupraSave_3")) ig.game.loadObject3 = JSON.parse(localStorage.getItem("SupraSave_3"));
                            ig.game.loadPackage = {itemArray: new Array()}
                            var loadObject = null;
                            if (ig.game.saveSlot === 1 && ig.game.loadObject1) loadObject = ig.game.loadObject1;
                            else if (ig.game.saveSlot === 2 && ig.game.loadObject2) loadObject = ig.game.loadObject2;
                            else if (ig.game.saveSlot === 3 && ig.game.loadObject3) loadObject = ig.game.loadObject3;
                            else {
                                skipThis = true;
                       
                            }
                            if (skipThis === true) {

                            }
                            else {
                              
                            
                            if (loadObject['weapon_array']) {


                                for (var i = 0; i < loadObject['weapon_array'].length; i++) {
                                    ig.game.loadPackage.itemArray.push(game.ConvertItems(loadObject['weapon_array'][i]));
                                }


                            }
                            if (loadObject['shield_array']) {


                                for (var i = 0; i < loadObject['shield_array'].length; i++) {
                                    ig.game.loadPackage.itemArray.push(game.ConvertItems(loadObject['shield_array'][i]));
                                }


                            }
                            if (loadObject['armor_array']) {


                                for (var i = 0; i < loadObject['armor_array'].length; i++) {
                                    ig.game.loadPackage.itemArray.push(game.ConvertItems(loadObject['armor_array'][i]));
                                }


                            }
                            ig.game.loadPackage.weapon = game.ConvertItems(loadObject['weapon']);
                            ig.game.loadPackage.shield = game.ConvertItems(loadObject['shield']);
                            ig.game.loadPackage.armor = game.ConvertItems(loadObject['armor']);
                    
                            }

                            ShopElementsTo(true);
                            ig.game.myTouchButtons.searchButton("menu_musicOn", false);

                            game.shop_menu = true;
                           
                            if (ig.game.loadPackage.itemArray[game.input_location_equip]) {
                                if (!ig.game.loadPackage.itemArray[game.input_location_equip].isBossItem && ig.game.loadPackage.itemArray[game.input_location_equip].QualityLevel < 5) {
                                    ig.game.myTouchButtons.searchButton("upgradeShop", true);
                                }
                                else {
                                    ig.game.myTouchButtons.searchButton("upgradeShop", false);
                                }

                                if (!ig.game.loadPackage.itemArray[game.input_location_equip].itemEquipped) {
                                    ig.game.myTouchButtons.searchButton("sellShop", true);
                                }
                                else {
                                    ig.game.myTouchButtons.searchButton("sellShop", false);
                                }
                            }
                           
                           
                        }
                        else if ((ig.input.released('backmenu')) && !game.loginScreenOn && !game.trialConfirm && !game.difficultyConfirm && game.needUnlockConfirm === 0 && !game.askConfirmation && !game.buy_menu && !game.shop_menu && !game.introGoing && game.saveSelection === false && game.changeLog_Show === false && game.LevelSelect === false && game.SellMenu === false && game.ShowCredits === false && restoreTransactionInvoked === false && sellPromptInvoked === false) {

                            MainMenuElementsTo(false);
                            ig.game.saveGame(null);
                            ig.system.setGame(MyGame);
                          /*  if (ig.game.gameSaved === true) {
                                
                                game.Main_Menu = false;
                                game.forceStart = false;
                                game.playerNormalMusic = true;
                                game.minimap_Open = false;
                               
                                game.LevelSelect = false;

                                //Load items
                                game.Load(ig.game.saveSlot);
                           
                                ig.game.myTouchButtons.removeButton("menu_musicOn");
                                ig.game.setAndAlign("menu_musicOn", 0.3803 * 267, 0.3 * 160, 0.12 * 267, 0.2 * 160, ig.game.MusicOnButton, ig.game.MusicOffButton, 3);
                                HUDElementsTo(true);
                               
                            }
                            else {
                                game.Continue = false;
                            
                                levelLoader('LevelLevel_GrassLand_0', 32, 608);
                            }

                            */
                        }
                        else if (ig.input.released('buyApp') && licenseInformation.isTrial && !game.introGoing && !game.loginScreenOn && !game.trialConfirm && !game.shop_menu && !game.buy_menu && !game.askConfirmation && game.saveSelection === false && game.LevelSelect == false && game.ShowCredits == false && game.SellMenu == false && restoreTransactionInvoked == false && sellPromptInvoked == false) {


                            buyFullGame();
                            ig.game.myTouchButtons.searchButton("buyApp", false);
                        }

                        else if (ig.input.released('reviewApp')  && !game.introGoing && !game.loginScreenOn && !game.trialConfirm && !game.shop_menu && !game.buy_menu && !game.askConfirmation && game.saveSelection === false && game.LevelSelect == false && game.ShowCredits == false && game.SellMenu == false && restoreTransactionInvoked == false && sellPromptInvoked == false) {
                         
                            reviewURL();
                             
                        }
                      
                        else if (ig.input.pressed('changeLog') && !game.loginScreenOn && !game.trialConfirm && !game.askConfirmation && game.saveSelection === false && game.LevelSelect == false && game.SellMenu == false && game.ShowCredits == false)
                        { //game.changeLog_Show = true;
                                }
                     /*   else if (ig.input.pressed('credits') && game.saveSelection === false && game.LevelSelect == false && game.SellMenu == false && game.ShowCredits == false && restoreTransactionInvoked == false && sellPromptInvoked == false)
                                { game.ShowCredits = true; }*/
                        else if (ig.input.released('screen') && !game.loginScreenOn && !game.trialConfirm && !game.askConfirmation && game.introGoing === true && game.saveSelection === false && game.LevelSelect === false && game.SellMenu === false && restoreTransactionInvoked === false && sellPromptInvoked === false)
                               
                        {
                            game.saveSelection = true;
                            game.introGoing = false;
                            game.introTile = 0;
                            ig.game.myTouchButtons.removeButton("menu_musicOn");
                            ig.game.setAndAlign("menu_musicOn", 2, 38, 0.12 * 267, 0.2 * 160, ig.game.MusicOnButton, ig.game.MusicOffButton, 3);
                            ig.game.myTouchButtons.searchButton("menu_musicOn", true);
                            
                            FirstMainMenuElementsTo(true);


                            if (localStorage.getItem("SupraSave_1")) ig.game.loadObject1 = JSON.parse(localStorage.getItem("SupraSave_1"));
                            if (localStorage.getItem("SupraSave_2")) ig.game.loadObject2 = JSON.parse(localStorage.getItem("SupraSave_2"));
                            if (localStorage.getItem("SupraSave_3")) ig.game.loadObject3 = JSON.parse(localStorage.getItem("SupraSave_3"));
                        }
                     
                                
                        else if (ig.input.pressed('GoBackChangeLog') && !game.askConfirmation && game.changeLog_Show == true && game.saveSelection === false && game.LevelSelect == false)
                        { game.changeLog_Show = false; }
                            // else if (ig.input.pressed('levelSelectReset') && game.saveSelection === false && game.LevelSelect == true) { game.resetConfirmInvoked = true; }


                       
                    
                       
                        else if (ig.input.released('levelSelectGoBack') && !game.trialConfirm && !game.askConfirmation && game.saveSelection === false && game.LevelSelect == true) {
                            game.LevelSelect = false; MainMenuElementsTo(true);
                            LevelSelectElementsTo(false);
                        }
                   //     else if (ig.input.pressed('levelSelectResetConfirm') && !game.trialConfirm && !game.askConfirmation && game.saveSelection === false && game.resetConfirmInvoked == true && game.LevelSelect == true) { game.resetConfirmInvoked = false; game.clearStorage(); ig.game.gameSaved = false; }
                     //   else if (ig.input.pressed('levelSelectResetCancel') && !game.trialConfirm && !game.askConfirmation && game.saveSelection === false && game.resetConfirmInvoked == true && game.LevelSelect == true) { game.resetConfirmInvoked = false; }

                        
                        else if (ig.input.released('goRightLevel') && !game.trialConfirm && !game.askConfirmation  && game.LevelSelect === true && game.saveSelection === false) {
                            if (game.optionSelectedLevel <

                              ig.game.maxLevels
                                ) game.optionSelectedLevel++;
                         
                         
                            ig.game.levelSelectScrollSmoother = 0;
                            ig.game.bufferScroller = 0;
                        }
                        else if (ig.input.released('goLeftLevel') && !game.trialConfirm && !game.askConfirmation && game.LevelSelect === true && game.saveSelection === false) {
                            if (game.optionSelectedLevel > 0) game.optionSelectedLevel--;
                            ig.game.levelSelectScrollSmoother = 0;
                            ig.game.bufferScroller = 0;
                        }

                        else if (ig.input.released('goLevel') && !game.loginScreenOn && !game.trialConfirm && !game.difficultyConfirm && game.needUnlockConfirm === 0 && !game.askConfirmation && ig.game.hopOver === false && game.LevelSelect === true && game.saveSelection === false) {
                           
                            //Empty destroyed enemies
                            isBossKilled = false;
                            ig.game.destroyedEntitiesArray = [];
                            if (ig.game.LevelSelect === true) {
                                if (game.optionSelectedLevel === 0) {
                                    // levelLoader('LevelLevel_DeadlyDesert_4', 1668, 104);
                                  //  levelLoader('LevelLevel_MagicForest_1', 32, 608);
                                    levelLoader('LevelLevel_TutorialCastle_0', 68, 464);
                                   // levelLoader('LevelLevel_NecromancerCave_1', 800, 464);
                                   
                                   //levelLoader('LevelLevel_VoidCitadel4', 500, 344);
                                    //   levelLoader('LevelLevel_DesertCastle_3', 544, 288);
                                  // levelLoader('LevelLevel_FirstCastle_2', 244, 188);
                                    //   levelLoader('LevelLevel_DemonCave1', 168, 192);
                                    //levelLoader('LevelLevel_MagicForest_1', 32, 500);
                                }
                                else if (game.optionSelectedLevel === 1) {
                                  //  levelLoader('LevelLevel_SkyCannon', 400, 608);
                                 levelLoader('LevelLevel_GrassLand_0', 28, 264);
                                  // levelLoader('LevelLevel_FirstCastle_2',244, 188);
                                
                                }
                                else if (game.optionSelectedLevel === 2 && !licenseInformation.isTrial) {

                                    levelLoader('LevelLevel_SwampOfDesolation_1', 32, 608);
                                   
                                   // levelLoader('LevelLevel_SwampOfDesolation_3', 344, 64);
                                }
                                else if (game.optionSelectedLevel === 3 && !licenseInformation.isTrial) {
                                 
                              
                                   levelLoader('LevelLevel_DeadlyDesert_1', 32, 608);
                                   
                                }
                                else if (game.optionSelectedLevel === 4 && !licenseInformation.isTrial) {

                                    levelLoader('LevelLevel_DeadlyDesert_4', 32, 608);
                                    //levelLoader('LevelLevel_DesertCastle_3', 532, 380);
                                   
                                }
                                else if (game.optionSelectedLevel === 5 && !licenseInformation.isTrial) {

                                    levelLoader('LevelLevel_MagicForest_1', 32, 608);
                                   // levelLoader('LevelLevel_NecromancerCave_1', 32, 1208);
                                }
                                else if (game.optionSelectedLevel === 6 && !licenseInformation.isTrial) {

                                    levelLoader('LevelLevel_SpikyMountains_1', 352, 560);
                                    
                                }
                                else if (game.optionSelectedLevel === 7 && !licenseInformation.isTrial) {

                                    levelLoader('LevelLevel_InsideVolcano_1', 28, 80);
                                
                                }
                                else if (game.optionSelectedLevel === 8 && !licenseInformation.isTrial) {

                                    levelLoader('LevelLevel_RedBridge_1', 100, 48);
                                }
                                else if (game.optionSelectedLevel === 9 && !licenseInformation.isTrial ) {

                                  levelLoader('LevelLevel_RedBridge_4', 16, 608);
                               // levelLoader('LevelLevel_TowerOfInsanity2',356, 30);
                                }
                                else if (game.optionSelectedLevel === 10 && !licenseInformation.isTrial) {

                                   levelLoader('LevelLevel_DemonCave1', 168, 192);
                                    //levelLoader('LevelLevel_FortressOfDarkness2', 32, 508);
                         
                                }

                                else if (game.optionSelectedLevel === 11 && !licenseInformation.isTrial) {

                                    levelLoader('LevelLevel_DimensionOfDespair1', 44, 608);
                                    //levelLoader('LevelLevel_SkyCannon', 432, 408);
                                }
                                else if (game.optionSelectedLevel === 12 && !licenseInformation.isTrial) {

                                  levelLoader('LevelLevel_RoadToSkyCannon1', 32, 608);

                              
                                }
                                else if (game.optionSelectedLevel === 13 && !licenseInformation.isTrial) {

                                    levelLoader('LevelLevel_VoidCitadel1', 32, 544);
                                    //levelLoader('LevelLevel_VoidCitadel4', 500, 344);
                                }
                                else {
                                    game.trialConfirm = true;
                                    ig.game.trialText = "Loading information...";
                                    checkListing("trial");
                                    trialElementsTo(true);
                                }
                                ig.game.currentSong = 'oolongkong';
                                ig.game.playMusic(ig.game.currentSong);
                           
                                LevelSelectElementsTo(false);
                            }

                            return;
                            
                        }
                        
                        else if (ig.input.released('confirmDifficulty')  && !game.trialConfirm && ig.game.difficultyConfirm && !game.saveSelection && game.Main_Menu === true && !game.LevelSelect && !game.introGoing && !game.askConfirmation) {
                            ig.game.difficultyConfirm = false;
                            difficultyElementsTo(false);
                            difficultyLevel = ig.game.difficultyTarget;
                            ig.game.maxLevels = 1;
                            ig.game.optionSelectedLevel = 1;
                            ig.game.saveDifficulty(ig.game.saveSlot);
                        }
                        else if (ig.input.released('cancelDifficulty') && !game.trialConfirm && ig.game.difficultyConfirm && !game.saveSelection && game.Main_Menu === true && !game.LevelSelect && !game.introGoing && !game.askConfirmation) {
                            ig.game.difficultyConfirm = false;
                            difficultyElementsTo(false);
                        }
                        else if (ig.input.released('selectEasy')
                             && !game.trialConfirm && !game.shop_menu && !game.buy_menu
                            && difficultyLevel !== 0 && !game.saveSelection
                            && game.Main_Menu === true && !game.LevelSelect && !game.introGoing && !game.askConfirmation) {
                            ig.game.difficultyConfirm = true;
                            ig.game.difficultyTarget = 0;
                            difficultyElementsTo(true);
                           


                        }
                        else if (ig.input.released('selectHard')
                              && !game.trialConfirm && !game.shop_menu && !game.buy_menu
                            && difficultyLevel !== 1 && !game.saveSelection && game.Main_Menu === true && !game.LevelSelect && !game.introGoing && !game.askConfirmation) {

                       
                            if (difficultyAvailable < 1) {
                                ig.game.needUnlockConfirm = 1;
                            }
                            else {
                                ig.game.difficultyConfirm = true;
                                ig.game.difficultyTarget = 1;
                                difficultyElementsTo(true);
                            }
                        }
                        else if (ig.input.released('selectHell')
                             && !game.trialConfirm && !game.shop_menu && !game.buy_menu
                            && difficultyLevel !== 2 && !game.saveSelection && game.Main_Menu === true && !game.LevelSelect && !game.introGoing && !game.askConfirmation) {
                            if (difficultyAvailable < 2) {
                                ig.game.needUnlockConfirm = 2;
                            }
                            else {
                                ig.game.difficultyConfirm = true;
                                ig.game.difficultyTarget = 2;
                                difficultyElementsTo(true);
                            }
                        }
                        else if (ig.input.released('selectHero')
                             && !game.trialConfirm && !game.shop_menu && !game.buy_menu
                            && difficultyLevel !== 3 && !game.saveSelection && game.Main_Menu === true && !game.LevelSelect && !game.introGoing && !game.askConfirmation) {
                            if (difficultyAvailable < 3) {
                                ig.game.needUnlockConfirm = 3;
                            }
                            else {
                                ig.game.difficultyConfirm = true;
                                ig.game.difficultyTarget = 3;
                                difficultyElementsTo(true);
                            }
                        }
                            
                      /*  else if (ig.input.released('cloudSync')) {
                           
                            if (!client.currentUser) {
                                refreshAuthDisplay('microsoftaccount')
                            }
                            else {
                                logOut();
                            }*/
                            
                         /*   ig.game.loginScreenOn = true;
                            MainMenuElementsTo(false);
                            loginElementsTo(true);*/

                      //  }
                        /*
                        if (ig.game.loginScreenOn) {
                            if (ig.input.released('microsoftLogin')) {
                                logIn('microsoftaccount');
                            }
                            else if (ig.input.released('facebookLogin')) {
                                logIn('facebook');
                            }
                            else if (ig.input.released('twitterLogin')) {
                                logIn('twitter');
                            }
                            else if (ig.input.released('googleLogin')) {
                                logIn('google');
                            }
                            else if (ig.input.released('LoginGoBack')) {
                                ig.game.loginScreenOn =false;
                                MainMenuElementsTo(true);
                                loginElementsTo(false);
                            }
                        }*/
                        if (game.shop_menu === true && game.shop_prompt === false) {

                           // if (game.loadPackage.itemArray[game.input_location_equip].isSword) { ig.game.checkSpecialBtn('w'); }
                          //  else if (game.loadPackage.itemArray[game.input_location_equip].isShield) { ig.game.checkSpecialBtn('s'); }
                          //  else if (game.loadPackage.itemArray[game.input_location_equip].isArmor) { ig.game.checkSpecialBtn('a'); }
                        }
 
                      

                    }
                    game.player = game.getEntityByName('player1');



                    if (ig.game.soft_paused == false) {
                        
                        game.parent();
                     
                    }
                    // Add your own, additional update code here

                    if (ig.game.introView) {
                      
                        if ((ig.game.textWriterState === 'introState4' ||
                              ig.game.textWriterState === 'introState5' ||
                              ig.game.textWriterState === 'introState6' ) &&

                              ig.game.textDelay.delta() > 0) {
                       
                            ig.game.textDelay.set(5);
                         
                            if (ig.game.textWriterState === 'introState4') {
                       
                           
                                game.loadLevel(ig.global['LevelLevel_VIEW_Castle']);
                                ig.game.introView = true;
                                ig.game.textWriterState = 'introState5';
                              
                                if (!ig.game.introViewTimer) { ig.game.introViewTimer = new ig.Timer(); }
                                ig.game.introViewTimer.set(0.05);

                                if (!ig.game.presentationTimer2) {
                                    ig.game.presentationTimer2 = new ig.Timer();
                                    ig.game.presentationTimer2.set(8);
                                }
                       
                               // ig.game.presentationOn = true;
                                
                                ig.game.Main_Menu = false;
                                ig.game.screen.x = 400;
                                ig.game.screen.y = 500;
                            
                            }
                            else if (ig.game.textWriterState === 'introState5') {
                           
                              // 
                                ig.game.introView = false;
                                ig.game.Main_Menu = true;
                                ig.game.LevelSelect = true;
                                LevelSelectElementsTo(true);
                                
                            }
                            

                        }
                     
                     
                        if (ig.game.screen.x < 680 && ig.game.introViewTimer.delta() > 0 && ig.game.presentationTimer2.delta() > 0) {
                            

                                ig.game.screen.x++;

                                if (ig.game.screen.x === 615) {
                            
                                    if (ig.game.textWriterState === 'introState1') {
                                        ig.game.textWriterState = 'introState2';
                                    }
                                    else if (ig.game.textWriterState === 'introState2') {
                                        ig.game.textWriterState = 'introState3';
                                    }
                                    else if (ig.game.textWriterState === 'introState3') {
                                        ig.game.textWriterState = 'introState4';

                                     
                                        
                                    }
                                 
                                }
                            
                            ig.game.introViewTimer.set(0.05);

                            
                           

                            if (ig.game.screen.x >= 680) {
                                //load Next scene level

                              
                                if (ig.game.textWriterState === 'introState4') {

                                    ig.game.textWriterState = 'introState5';
                                    ig.game.drawBlack = true;


                                }
                                  if(ig.game.textWriterState === 'introState2'){
                                    game.loadLevel(ig.global['LevelLevel_VIEW_TheCapital2']);
                                    ig.game.introView = true;
                                    ig.game.textWriterState = 'introState3';
                                  
                                    if (!ig.game.introViewTimer) { ig.game.introViewTimer = new ig.Timer(); }
                                    ig.game.introViewTimer.set(0.05);

                                    if (!ig.game.presentationTimer2) {
                                        ig.game.presentationTimer2 = new ig.Timer();
                                        ig.game.presentationTimer2.set(8);
                                    }
                                    // ig.game.presentationOn = true;
                                    ig.game.Main_Menu = false;
                                    ig.game.screen.x = 400;
                                    ig.game.screen.y = 500;
                                }


                                
                              
                               
                            
                            }
                           
                           
                        }
                       
                        //ig.game.screen.y = 500;
                    }
                  
                    if (game.bossKill_Event == true) {
                        game.killDelay = new ig.Timer();
                        game.killDelay.set(2);
                        game.bossKill_Event = false;
                    }
                    if (game.killDelay != null) {
                        if (game.killDelay.delta() > 0) {
                                game.deleteLevelUp();
                            if (game.bossKill_EndScreen == true) {
                                game.screenFader = new ig.ScreenFader({ fade: 'out', speed: 2.0 });
                                game.EndScreen_OverLay = true; game.EndScreen = true; game.bossKill_EndScreen = false;
                                game.killDelay = null;
                            }
                            else if (game.bossKillWinter_EndScreen == true) {
                                game.screenFader = new ig.ScreenFader({ fade: 'out', speed: 2.0 });
                                game.EndScreen_OverLay_WinterWitch = true; game.EndScreen_WinterWitch = true; game.bossKillWinter_EndScreen = false;
                                game.killDelay = null;
                            }
                            else if (game.bossKillFinale_EndScreen == true) {
                                game.screenFader = new ig.ScreenFader({ fade: 'out', speed: 2.0 });
                                game.EndScreen_OverLay_Finale = true; game.EndScreen_Finale = true; game.bossKillFinale_EndScreen = false;
                                game.killDelay = null;
                            }
                            else if (game.bossKillElemental_EndScreen == true) {
                                game.screenFader = new ig.ScreenFader({ fade: 'out', speed: 2.0 });
                                game.EndScreen_OverLay_Elemental = true; game.EndScreen_Elemental = true; game.bossKillElemental_EndScreen = false;
                                game.killDelay = null;
                            }
                            else if (game.bossKillVoidZone_EndScreen == true) {
                                game.screenFader = new ig.ScreenFader({ fade: 'out', speed: 2.0 });
                                game.EndScreen_OverLay_VoidZone = true; game.EndScreen_VoidZone = true; game.bossKillVoidZone_EndScreen = false;
                                game.killDelay = null;
                            }
                            else { game.killDelay = null;game.InvokedChangeLevel = true;
                   
                            }

                        }
                    }
                 
                    if ((ig.input.pressed('space') || ig.input.pressed('lootButton') || buttons.y_button.pressed) && ig.game.gotItem === true)
                    { ig.game.gotItem = false; }

                    if ((ig.input.released('space') || ig.input.released('lootButton') || buttons.y_button.pressed) && ig.game.gotItemBuy === true)
                    { ig.game.gotItemBuy = false; }
                   
                    if (game.player) {
                        
                        if (ig.game.classSelection === true) {
                            var retVal = ig.game.checkClassInput();
                            if (retVal) return;
                        }
                        ig.game.menuInput();
                        ig.game.checkTalentInput();
                        var s_width = 267;
                        var s_height = 160;
                        var x_coord_buffer = 0;
                       

                        if (0 > game.player.pos.x - s_width / 2) { game.screen.x = 0; }

                        else if ((ig.game.collisionMap.pxWidth - s_width) < game.player.pos.x - s_width / 2) { game.screen.x = (ig.game.collisionMap.pxWidth - s_width); }

                        else { game.screen.x = game.player.pos.x - s_width / 2; }


                        if (-32 > game.player.pos.y - s_height / 2) { game.screen.y = -32; }

                        else if ((ig.game.collisionMap.pxHeight - 128) < game.player.pos.y - s_height / 2) { game.screen.y = (ig.game.collisionMap.pxHeight - 128); }

                        else { game.screen.y = game.player.pos.y - s_height / 2; }

                        var lvlup = game.getEntityByName('lvlup');
                        if (lvlup) { lvlup.pos.x = game.screen.x; lvlup.pos.y = game.screen.y;}
                        





                    }
                  
                }
                
            },
            
          
            
            draw: function () {
                // Draw all entities and backgroundMaps
                var game = ig.game;
                var player = ig.game.player;
               
                game.parent();
                if(ig.game.specialEntity)ig.game.specialEntity.draw(true);
                if (game.screenFader) {
                    game.screenFader.draw();
                }
                var s_width = 267;
                var s_height = 160;
             
               
                /* if (game.sceneInvoked == true)
                 {
                     game.drawDiag();}*/
                if (game.paused === true)
                {
                    game.saveGame(null,game.player,game.saveSlot);
                    game.PauseScreen.draw(0, 0); game.pause_initiated = true;
                }
                else {
                    if (game.pause_initiated == true) { game.Load(ig.game.saveSlot); game.pause_initiated = false; }

                    if (game.EndScreen == true) {
                        game.endScreenWinterWitch.draw(0, 0);
                        if (game.EndScreen_OverLay == true) {
                            game.EndScreen_OverLay_I.draw(0, 0);
                        }
                       
                    }
                    else if (game.EndScreen_WinterWitch == true) {

                        game.endScreenWinterWitch.draw(0, 0);
                        if (game.EndScreen_OverLay_WinterWitch == true) {
                            game.EndScreen_OverLay_I_WW.draw(0, 0);
                        }
                       

                    }
                    else if (game.EndScreen_Finale == true) {

                        game.endScreenWinterWitch.draw(0, 0);
                        if (game.EndScreen_OverLay_Finale == true) {
                            game.EndScreen_OverLay_I_Finale.draw(0, 0);
                        }
                       

                    }
                    else if (game.EndScreen_Elemental == true) {
                                
                                game.endScreenWinterWitch.draw(0, 0);
                                if (game.EndScreen_OverLay_Elemental == true) {
                                game.EndScreen_OverLay_I_Elemental.draw(0, 0);
                                }
                                
                                
                    }
                    else if (game.EndScreen_VoidZone == true) {

                        game.endScreenWinterWitch.draw(0, 0);
                        if (game.EndScreen_OverLay_VoidZone == true) {
                            game.EndScreen_OverLay_I_VoidZone.draw(0, 0);
                        }


                    }
                    else {
                        game.damageText();
                        //game.drawButtons();
                        if (game.Main_Menu == false) {

//Draw Background
                         
                            if (!ig.game.introView) {
                                //  game.DrawMiniMap();
                                if (game.minimap_Open == true) {
                                    game.HUD_minimap.draw(0, 0);
                                    game.drawMiniMap("minimap", 0, 0, ["EntityPlayer"], true);

                                } else {
                                    game.HUD.draw(0, 0);
                                }
                            }



                            if (ig.game.introView) {
                                if (ig.game.presentationOn) {

                                    ig.game.drawPresentation();
                                }
                                else if (ig.game.drawBlack) {
                                    ig.game.blackDark.draw(0, 0);
                                    ig.game.textWriterFunc();
                                }
                                else {
                                    if (ig.game.screen.x >= 400 && ig.game.screen.x < 405) {

                                        ig.game.blackDark.draw(0, 0);
                                    }
                                    else if (ig.game.screen.x >= 405 && ig.game.screen.x < 410) {

                                        ig.game.hardDark.draw(0, 0);
                                    }
                                    else if (ig.game.screen.x >= 410 && ig.game.screen.x < 415) {
                                        ig.game.medDark.draw(0, 0);
                                    }
                                    // else if (ig.game.screen.x >= 415 && ig.game.screen.x < 420) {





                                    //ig.game.lightDark.draw(0, 0);

                                    // }


                                    ig.game.medDark.draw(0, 0);
                                    //if (ig.game.screen.x >= 600 && ig.game.screen.x < 605) {
                                    // ig.game.lightDark.draw(0, 0);

                                    // }
                                    if (ig.game.screen.x >= 605 && ig.game.screen.x < 610) {
                                        ig.game.medDark.draw(0, 0);
                                    }
                                    else if (ig.game.screen.x >= 610 && ig.game.screen.x < 615) {
                                        ig.game.hardDark.draw(0, 0);

                                    }

                                    else if (ig.game.screen.x >= 615



                                        ) {
                                        ig.game.blackDark.draw(0, 0);

                                    }

                                    ig.game.textWriterFunc();
                                }


                            }
                            if (game.skill_menu === false && game.menuOpen() && game.classSelection === false) {


                                if (game.player && !game.scene_Invoked) {


                                    if (game.player.MovingLeft === true) {
                                        game.LEFTBUTTON.drawTile(0, 100, 1, 60);

                                    }
                                    else {
                                        game.LEFTBUTTON.drawTile(0, 100, 0, 60);
                                    }
                                    if (game.player.MovingRight === true) {
                                        game.RIGHTBUTTON.drawTile(60, 100, 1, 60);
                                    }
                                    else {
                                        game.RIGHTBUTTON.drawTile(60, 100, 0, 60);
                                    }
                                }

                                var buttonScheme = ig.game.buttonScheme;
                                var isIphone = ig.game.currentDevice;
                                if (buttonScheme == 0) {
                                    if (isIphone == 2) { game.BUTTONHUD1IPHONE.draw(0, 0); }
                                    else { game.BUTTONHUD1IPAD.draw(0, 0); }

                                }
                                /*   else if (buttonScheme == 1) {
                                       if (isIphone == 2) { game.BUTTONHUD2IPHONE.draw(0, 0); }
                                       else { game.BUTTONHUD2IPAD.draw(0, 0); }
                                   }
                                   else if (buttonScheme == 2) {
                                       if (isIphone == 2) { game.BUTTONHUD3IPHONE.draw(0, 0); }
                                       else { game.BUTTONHUD3IPAD.draw(0, 0); }
                                   }
                                   else if (buttonScheme == 3) {
                                       if (isIphone == 2) { game.BUTTONHUD4IPHONE.draw(0, 0); }
                                       else { game.BUTTONHUD4IPAD.draw(0, 0); }
                                   }
                                   else if (buttonScheme == 4) {
                                       if (isIphone == 2) { game.BUTTONHUD5IPHONE.draw(0, 0); }
                                       else { game.BUTTONHUD5IPAD.draw(0, 0); }
                                   }
                                   else if (buttonScheme == 5) {
                                       if (isIphone == 2) { game.BUTTONHUD6IPHONE.draw(0, 0); }
                                       else { game.BUTTONHUD6IPAD.draw(0, 0); }
                                   }
                                   else if (buttonScheme == 6) {
                                       if (isIphone == 2) { game.BUTTONHUD7IPHONE.draw(0, 0); }
                                       else { game.BUTTONHUD7IPAD.draw(0, 0); }
                                   }
                                   */
                            }
                            //game.drawBouncy();

                            if (player) {
                                //Test touch buttons
                                    var ms_width = ig.system.width;
                                    var ms_height = ig.system.height;
                                    var x_scale = window.innerWidth / 267;
                                    var y_scale = window.innerHeight / 160;
                                   
                                    if (ig.game.scene_Invoked === true && ig.game.dialog_Invoked === true) {
                                        ig.game.specialInfo.draw(s_width * 0.10, s_height * 0.75);
    
                                        ig.game.font.draw(ig.game.parseRetText(ig.game.currentDialog[ig.game.currentDialogPos], 'infopanel'), s_width * 0.12, s_height * 0.80);
    
    
                                    }
                                    //   game.blank.draw(0.88 * ms_width, 0.8 * ms_height);
                                    if (ig.game.showPopUp === true) { ig.game.drawPopUp(ig.game.currentX, ig.game.currentY); ig.game.showPopUp = false; }
                                    //if(welcomeInvoked == true){game.welcome.draw(ig.system.width / 2 - game.welcome.width/2,80 - game.welcome.height / 2); welcomeTimer = 1;}
                                    if (ig.game.gotItem === true) {
                                      
                                        game.currentGotItem = ig.game.lastItem;
    
                                           game.display96.draw((s_width / 2) - (game.display96.width / 2) , 60);
    
                                           game.font_YELLOW.draw(ig.game.lastItem, ((s_width / 2) - (game.display96.width / 2)) + 10, 74);
                                       game.drawSmallItem(ig.game.lastItem, (s_width / 2) - 16, 88);
                                       game.rarityBubble.drawTile(130, 119, ig.game.lastItemQuality - 1, 8);
    
                                    }
    
                                    if (game.InfoText === true) {
                                        game.specialInfo.draw(s_width * 0.10, s_height * 0.45);
    
                                        game.font.draw(game.parseRetText(game.infoText, 'infopanel'), s_width * 0.12, s_height * 0.50);
                                    }
                                    if (game.LevelUpInfo === true) {
                                        if (game.tutorialFlag == true) { }
                                        game.font.draw(game.LevelUpHp, 0.55 * s_width, 0.55 * s_height);
                                        game.font.draw(game.LevelUpMp, 0.55 * s_width, 0.65 * s_height);
    
                                    }
                                    if (game.InformLevelUp === true) {
    
    
                                        game.font.draw(game.LevelUpHp, 0.55 * s_width, 0.55 * s_height);
                                        game.font.draw(game.LevelUpMp, 0.55 * s_width, 0.65 * s_height);
    
                                    }
                                   
    
    
    
    
    
                                    //var mp_modifier = player.mana / player.Maxmana;
                                    var mp_modifier = player.mana / player.Maxmana;
                                    var hp_modifier = player.health / player.Maxhealth;
    
                                 
                                    if (0 < hp_modifier && 1 >= hp_modifier) {
                                        game.healthbar.draw(5, 5, 0, 0, 77 * hp_modifier, 5);
                                    }
    
                                    if (0 < mp_modifier && 1 >= mp_modifier) {
                                        game.manabar.draw(5, 15, 0, 0, 77 * mp_modifier, 5);
                                    }
    
    
    
                                 
    
                                    game.font.draw((player.health << 0), 10,4, 'left');
                                    game.font.draw((player.mana << 0), 10, 14, 'left');
    
    
                                    var add_char = (player.HP_REGEN < 0) ? '' : '+';
                                    if (add_char === '') { game.font_RED.draw(Math.round(player.HP_REGEN * player.REGENMODIFIER), 14 + (52 * hp_modifier),4, ig.Font.ALIGN.LEFT); }
                                    else { game.font_GREEN.draw(Math.round(player.HP_REGEN * player.REGENMODIFIER), 14 + (52 * hp_modifier), 4, ig.Font.ALIGN.LEFT); }
    
                                    add_char = (player.MANA_REGEN < 0) ? '' : '+';
                                    if (add_char === '') { game.font_RED.draw(Math.round(player.MANA_REGEN * player.REGENMODIFIER), 14 + (52 * mp_modifier), 14, ig.Font.ALIGN.LEFT); }
                                    else { game.font_CYAN.draw(Math.round(player.MANA_REGEN * player.REGENMODIFIER), 14 + (52 * mp_modifier), 14, ig.Font.ALIGN.LEFT); }
    
    
    
                                    game.font_YELLOW.draw(accountHardCurrency, s_width * 0.75, 6, 'left', 'rgba( 255, 255, 0, 1 )');
    
                                    if(player  && player.ironKey > 0) game.ironkey.draw(s_width * 0.93,2);
                                    game.font.draw(player.skillSpheres, s_width * 0.89, 6, 'left', 'rgba( 255, 255, 0, 1 )');
                                    var skillNumber1 = game.returnSkillNumber(player.currentActionSkill1);
                                    var skillNumber2 = game.returnSkillNumber(player.currentActionSkill2);
    
    
    
                                    //Draw skills and their manacost
    
                                   
    
    
                                    
    
                                    if (player.EXP <= player.EXP_GOAL) {
                                        var exp_buffer = player.EXP - player.EXP_GOAL_BUFFER;
                                        if (exp_buffer == 0) { var ModifierValue = 0.01; }
                                        else { var ModifierValue = exp_buffer / (player.EXP_GOAL - player.EXP_GOAL_BUFFER); }
                                        ModifierValue = (ModifierValue < 0) ? 0 : ModifierValue;
                                        ModifierValue = (1 < ModifierValue) ? 1 : ModifierValue;
                                        game.ExpLine.draw(0.70 * s_width, 18, 0, 0, 75 * ModifierValue, 5);
                                    }
                                    
                            }
                            //game.HUDbottom.draw(0,s_height - game.HUDbottom.height);


                            // Add your own drawing code here
                            var x = s_width / 2,
                                y = s_height / 2;

                            //game.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );


                            // drawing Menu when Tab is pressed

                            if (game.game_menu === true) {
                                // X: 68.5, Y: 16




                            }

                            // drawing Talents menu when selected
                            //Should skip over this
                            if (player) {

                                ig.game.drawTalents(player,s_width,s_height);

                            }
                         

                            if (game.status_menu === true) {
                                // draw player statistics
                                game.statusHUD.draw(0, 0);
                               

                            }
                                // drawing Equip menu when selected

                            else if (game.equip_menu === true) {

                                game.equipHUD.draw(s_width / 2 - game.equipHUD.width / 2, 0);

                            }

                            
                        
                            
                        }

                        else {

                            if (game.LevelSelect === false) {

                                
                               // if (isTrial === false) { game.splash.draw(0, 0); } else { game.splash_TRIAL.draw(0, 0); }
                                if (isTrial == false) { game.LevelSelection.draw(levelSelectScroll - 60, -160); }
                                else { game.LevelSelection_TRIAL.draw(levelSelectScroll - 60, -160); }

                                if (!game.levelSelectScrollTimer) {
                                    game.levelSelectScrollTimer = new ig.Timer();
                                    game.levelSelectScrollTimer.set(0.05);
                                }
                             
                                if (game.levelSelectScrollTimer.delta() > 0) {
                                    game.levelSelectScrollTimer.set(0.05);
                                    if (goingScrollerUp === false && levelSelectScroll > -453) levelSelectScroll -= 0.5;
                                    else {
                                        goingScrollerUp = true;
                                    }
                                    if (goingScrollerUp === true && levelSelectScroll <0) levelSelectScroll+=0.5;
                                    else {
                                        goingScrollerUp = false;
                                    }
                               
                                }
                                if (iapPurchaseCompleted === false && ig.game.SellMenu === false) {


                                    game.drawLoading(0, 0.7 * s_height, 'loading');


                                }

                          
                                if (game.introGoing === true) {
                                   
                                    if (saveSkip > 0) {
                                        ig.game.saveSlot = saveSkip;
                                        ig.game.saveSelection = false;
                                        saveSkip = 0;
                                        MainMenuElementsTo(true);
                                        game.introGoing = false;

                                        game.introTile = 0;
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
                                        if (ig.game.saveSlot === 1 ||
                                            ig.game.saveSlot === 2 ||
                                            ig.game.saveSlot === 3) {
                                            ig.game.maxLevels = parseInt(loadObject['maxLevels']);
                                        
                                        }
                                        //Load Difficulty Levels

                                     
                                        ig.game.myTouchButtons.removeButton("menu_musicOn");
                                        ig.game.setAndAlign("menu_musicOn", 2, 38, 0.12 * 267, 0.2 * 160, ig.game.MusicOnButton, ig.game.MusicOffButton, 3);
                                        ig.game.myTouchButtons.searchButton("menu_musicOn", true);

                                      
                                        if (LevelSelectSkip) {
                                           
                                            LevelSelectSkip = false;
                                            ig.game.optionSelectedLevel = LevelSelectOptionSkip;
                                            LevelSelectOptionSkip = 0;
                                            MainMenuElementsTo(false);
                                            LevelSelectElementsTo(true);
                                            ig.game.LevelSelect = true;
                                        }
                                    }
                                    else {
                                        game.drawIntro();
                                    }
                                  
                                }

                              

                                game.drawMapEffects(1);
                                
                            }
              
                            else if(game.LevelSelect === true ){
                                //game.endScreenWinterWitch.draw(0, 0);
                              
                                if (isTrial == false) { game.LevelSelection.draw(levelSelectScroll-60, levelSelectScrollY - 160); }
                                else { game.LevelSelection_TRIAL.draw(levelSelectScroll - 60, levelSelectScrollY - 160); }
                                game.drawMapOptions();
/*
                                unlockedLevels = ig.game.checkLockedLevels();
                                var x_buffer = 3;
                                var y_buffer = 2;
                                var MaxLevels = 12;
                                for (var i = MaxLevels; i > unlockedLevels; i--) {
                                    ig.game.levelLocked.draw(0.2875 * ig.system.height + (x_buffer * (0.3125 * ig.system.height)), 0.1375 * ig.system.height + (y_buffer * (0.311 * ig.system.height)));
                                    x_buffer -= 1;

                                    if (x_buffer == -1) { x_buffer = 3; y_buffer -= 1; }
                                }
                                if (game.resetConfirmInvoked == true) { game.resetConfirm.draw(s_width / 2 - game.resetConfirm.width / 2, s_height / 2 - game.resetConfirm.height / 2); }
                                */
                                game.drawMapEffects(1);
                            }
                            if (game.saveSelection === true) {
                                // game.endScreenWinterWitch.draw(0, 0);

                              
/*
                                //should draw all the items of the user here too, but let's do that later
                                var bufferVal = 0;
                                if (ig.game.loadObject1 && ig.game.loadObject1["completeList"]) bufferVal = ig.game.loadObject1["completeList"].length / 12;
                               // game.bigButtons.drawTile(32, 48, 0, 64);
                                game.font_YELLOW_STYLED.draw(bufferVal + "%", 72, 90);
                                bufferVal = 0;
                                if (ig.game.loadObject2 && ig.game.loadObject2["completeList"]) bufferVal = ig.game.loadObject2["completeList"].length / 12;
                               // game.bigButtons.drawTile(32 + 80, 48, 0, 64);
                                game.font_YELLOW_STYLED.draw(bufferVal + "%", 152, 90);
                                bufferVal = 0;
                                if (ig.game.loadObject3 && ig.game.loadObject3["completeList"]) bufferVal = ig.game.loadObject3["completeList"].length / 12;
                             //   game.bigButtons.drawTile(32 + 160, 48, 0, 64);
                                game.font_YELLOW_STYLED.draw(bufferVal + "%", 232, 90);
                               */
                              

                            }
                          
                            game.cloud.draw(game.x_cloud_1 + 179 + levelSelectScroll, game.y_cloud_1 +levelSelectScrollY);
                            game.cloud.draw(game.x_cloud_2 + 179 + levelSelectScroll, game.y_cloud_2 + levelSelectScrollY);
                            game.cloud.draw(game.x_cloud_3 + 179 + levelSelectScroll, game.y_cloud_3 + levelSelectScrollY);
                            game.cloud.draw(game.x_cloud_4 + 179 + levelSelectScroll, game.y_cloud_4 + levelSelectScrollY);
                            game.cloud.draw(game.x_cloud_5 + 179 + levelSelectScroll, game.y_cloud_5 + levelSelectScrollY); game.x_cloud_1 += 0.75; game.x_cloud_2 += 1; game.x_cloud_3 += 1.5; game.x_cloud_4 += 0.3; game.x_cloud_5 += 1.2;
                            var randomnumber = Math.floor(Math.random() * 128);
                            randomnumber *= 3;
                            if (game.x_cloud_1 >= 840) { game.x_cloud_1 = -192; game.y_cloud_1 = randomnumber; }
                            randomnumber = Math.floor(Math.random() * 128);
                            if (game.x_cloud_2 >= 840) { game.x_cloud_2 = -192; game.y_cloud_2 = randomnumber; }
                            randomnumber = Math.floor(Math.random() * 128);
                            if (game.x_cloud_3 >= 840) { game.x_cloud_3 = -192; game.y_cloud_3 = randomnumber; }
                            randomnumber = Math.floor(Math.random() * 128);
                            if (game.x_cloud_4 >= 840) { game.x_cloud_4 = -192; game.y_cloud_4 = randomnumber; }
                            randomnumber = Math.floor(Math.random() * 128);
                            if (game.x_cloud_5 >= 840) { game.x_cloud_5 = -192; game.y_cloud_5 = randomnumber; }


                            if (game.changeLog_Show === true) { game.changeLog.draw(s_width / 2 - game.changeLog.width / 2, s_height / 2 - game.changeLog.height / 2); }
                                
                            if (game.SellMenu === true) {
                                game.SellMenu_IMG.draw(s_width / 2 - game.SellMenu_IMG.width / 2, s_height / 2 - game.SellMenu_IMG.height / 2);
                                ig.system.context.font = "6pt ArialMT";
                                ig.system.context.fillStyle = "white";
                             
                                
                                
                               
                                if(loadingStarted == true){
                                game.drawLoading(0.65 * s_width,0.3*s_height,'loading');
                                }
                                else if(invokedResult == true){
                                game.drawLoading(0.65 * s_width,0.3*s_height,loadingSuccess);
                                
                                }
                                else if(allowedToDisplayInfo = true && game.SellItemInfo)
                                {
                                game.font_YELLOW_16.draw(game.parseRetText(game.SellItemInfo.title,'Title'),0.07*s_width, 0.12*s_height);
                                  //  game.font_YELLOW_16.draw(game.parseRetText(game.SellItemInfo.title),0.15*s_width, 0.1*s_height);
                                    game.font_YELLOW.draw(game.parseRetText(game.SellItemInfo.description,'GreatAdventure'),0.582*s_width, 0.375*s_height);
                                ig.system.context.font = "6pt ArialMT";
                                ig.system.context.fillStyle = "white";
                                
                                ig.system.context.fillText(game.SellItemInfo.price, 0.59 * s_width,0.25*s_height);
                               
                                }
                                
                                
                                if(purchaseLoadingEnded == true){
                                purchaseLoadingStarted = false;
                                purchaseLoadingEnded = false;
                                }
                                else if(purchaseLoadingStarted == true)
                                {
                                game.drawLoading(0.4 * s_width,0.3*s_height,'loading');
                                
                                }
                            }
                            if(game.ShowCredits == true){
                                game.EndScreen_Credits_I.draw(0, 0);
                            }


                            if (game.shop_menu === true) {

                                game.shopHUD.draw(s_width / 2 - game.shopHUD.width / 2, 0);
                                //if(game.shop_prompt === true) game.drawequipment(true, true);
                             
                            

                            }

                            if (game.buy_menu === true) {

                                game.buyHUD.draw(s_width / 2 - game.buyHUD.width / 2, 0);
                                
                                game.font_YELLOW.draw(accountHardCurrency, 120, 16, ig.Font.ALIGN.CENTER);

                                //Need to GET the prices from the server

                                //Placeholders for now
                                var x_buffer_c = 33;
                                game.font_YELLOW.draw('15', x_buffer_c, 64, ig.Font.ALIGN.CENTER);
                                game.font_YELLOW.draw('50', x_buffer_c + 49, 64, ig.Font.ALIGN.CENTER);
                                game.font_YELLOW.draw('100', x_buffer_c + 49 * 2, 64, ig.Font.ALIGN.CENTER);
                                game.font_YELLOW.draw('150', x_buffer_c + 49 * 3, 64, ig.Font.ALIGN.CENTER);
                                game.font_YELLOW.draw('300', x_buffer_c + 49 * 4, 64, ig.Font.ALIGN.CENTER);

                         /*       var y_buffer_c2 = 96;
                                game.font_YELLOW.draw('+50', x_buffer_c, y_buffer_c2, ig.Font.ALIGN.CENTER);
                                game.font_YELLOW.draw('+200', x_buffer_c + 49, y_buffer_c2, ig.Font.ALIGN.CENTER);
                                game.font_YELLOW.draw('+500', x_buffer_c + 49 * 2, y_buffer_c2, ig.Font.ALIGN.CENTER);
                                game.font_YELLOW.draw('+1100', x_buffer_c + 49 * 3, y_buffer_c2, ig.Font.ALIGN.CENTER);
                                game.font_YELLOW.draw('+2500', x_buffer_c + 49 * 4, y_buffer_c2, ig.Font.ALIGN.CENTER);
                                */
                                //y_buffer_c2 += 16;


                                //Need to GET the prices from the server
                               

                               

                            }
                            if(restoreTransactionInvoked == true){
                                var img = ((restoreTransactionSuccess) ? game.restoreSuccess : game.restoreFailure);
                                img.draw(0,0);
                                }
                                if(sellPromptInvoked == true){
                                game.extraorno.draw(69.5,48);
                                                             
                                }

                        }
                    }
                }
               
                
                
                ig.game.myTouchButtons.draw();
                if (player) {
                  
                   ig.game.drawClassExtraInfo(s_width, s_height);

                    if (ig.game.showSkillSelect === "up") {
                        //if (ig.game.drawWhite)
                            ig.game.WhiteTile.draw(ig.game.drawSpot.x, ig.game.drawSpot.y);
                            if (!ig.game.skillGridObj) ig.game.skillGridObj = new slideObject(s_width - ig.game.skillGrid.width, s_height, 0, 128, ig.game.skillGrid);

                            ig.game.drawSkillToGrid();

                        ig.game.skillGridObj.slideTo("up");
                        ig.game.skillGridObj.img.draw(ig.game.skillGridObj.temp_x, ig.game.skillGridObj.temp_y);
                    }
                    else if (ig.game.showSkillSelect === "down") {

                        ig.game.drawSpot.x = -32;
                        ig.game.drawSpot.y = -32;
                        if (!ig.game.skillGridObj) ig.game.skillGridObj = new slideObject(s_width - ig.game.skillGrid.width, s_height, 0, 128, ig.game.skillGrid);
                      //  else { ig.game.skillGridObj.reset(); }
                        ig.game.skillGridObj.slideTo("down");
                        ig.game.skillGridObj.img.draw(ig.game.skillGridObj.temp_x, ig.game.skillGridObj.temp_y);
                   
                    }
                
                       
                }
                if( game.saveSelection === true && game.Main_Menu === true){
                   if(ig.game.loadObject1) game.drawDummyPlayer(ig.game.loadObject1,0);
                   if (ig.game.loadObject2) game.drawDummyPlayer(ig.game.loadObject2, 1);
                   if (ig.game.loadObject3) game.drawDummyPlayer(ig.game.loadObject3, 2);
                }
                if (game.classSelection === true) ig.game.drawTalentSelectGFX(s_width, s_height);
               
                if (game.skill_menu === false && player && game.menuOpen() && game.classSelection === false && !game.scene_Invoked) {


                     ig.game.drawSkills(player.currentActionSkill1, 0, true);
                     if (player.CLASS === "DEMON" || player.currentActionSkill1 === "EntityDarkWave" || player.currentActionSkill1 === "EntityDreadWave") {
                         ig.game.font_RED.draw(Math.floor(game.calcManaCost(player.currentActionSkill1, player.currentAction1Manacost)), 207, 130);
                     }
                     else {
                         ig.game.font_CYAN.draw(Math.floor(game.calcManaCost(player.currentActionSkill1, player.currentAction1Manacost)), 207, 130);
                     }
                         
                     ig.game.drawSkills(player.currentActionSkill2, 1, true);
               
                     if (player.CLASS === "DEMON" || player.currentActionSkill2 === "EntityDarkWave" || player.currentActionSkill2 === "EntityDreadWave") {
                         ig.game.font_RED.draw(Math.floor(game.calcManaCost(player.currentActionSkill2, player.currentAction1Manacost)), 239, 130);
                     }
                     else {
                         ig.game.font_CYAN.draw(Math.floor(game.calcManaCost(player.currentActionSkill21, player.currentAction2Manacost)), 239, 130);
                     }

               
                 }
                 if (!game.loginScreenOn && !game.saveSelection && game.Main_Menu === true && !game.LevelSelect && !game.introGoing && !game.askConfirmation  && !game.shop_menu  && !game.buy_menu) {
                 

                     
                     for (var i = difficultyAvailable + 1; i < 4 ; i++) {
                         
                         ig.game.difficultyLocked.draw(65 + i * 32, 19);
                       
                     }
                
                     if (difficultyLevel === 0) {
                         ig.game.difficultySelectionFlash.drawTile(66 , 18, 0, 29);
                     }
                     else if (difficultyLevel === 1) {
                         ig.game.difficultySelectionFlash.drawTile(66 + 1 * 32, 18, 0, 29);
                     }
                     else if (difficultyLevel === 2) {
                         ig.game.difficultySelectionFlash.drawTile(66 + 2 * 32, 18, 0, 29);
                     }
                     else if (difficultyLevel === 3) {
                         ig.game.difficultySelectionFlash.drawTile(66 + 3 * 32, 18, 0, 29);
                     }
                 }
                 if (game.shop_menu === true) {
                     if (game.shop_prompt === false) game.drawequipment(true, true);

                     if (game.special_1_info == true) {
                         var infoText = game.returnSpecialText(game.show_special);

                         game.specialInfo.draw(s_width * 0.10, s_height * 0.45);

                         game.font.draw(infoText, s_width * 0.12, s_height * 0.50);


                     }
                     else if (game.special_2_info == true) {
                         var infoText = game.returnSpecialText(game.show_special);

                         game.specialInfo.draw(s_width * 0.10, s_height * 0.45);

                         game.font.draw(infoText, s_width * 0.12, s_height * 0.50);

                     }
                     else if (game.special_3_info == true) {
                         var infoText = game.returnSpecialText(game.show_special);

                         game.specialInfo.draw(s_width * 0.10, s_height * 0.45);

                         game.font.draw(infoText, s_width * 0.12, s_height * 0.50);

                     }
                     
                     if (game.shop_prompt === true) {
                       
                         game.confirmPanel.draw(60, 40);
                         game.font.draw(game.parseRetText(game.confirmText, 'confirmPanel'), 62, 72);
                        
                         if (game.upgrade_prompt === true) {
                             game.drawUpgradeGFX(game.upgrade_prompt_type, game.upgrade_prompt_quality);
                         }
                         else if (game.sell_prompt === true) {
                             game.drawSmallItem(ig.game.loadPackage.itemArray[ig.game.input_location_equip].itemName, 125, 42);
                         }
                         
                     }
                 }
                 if (game.Main_Menu === true && game.difficultyConfirm === true) {

                     game.confirmPanel.draw(60, 40);
                     game.font_YELLOW.draw(game.parseRetText("Changing difficulty sends you back  to the FIRST level!", 'confirmPanel2'), 63, 55);
                 }
                 if (game.Main_Menu === true && game.trialConfirm === true) {

                     game.confirmPanel.draw(60, 40);
                   
                     game.full_font_YELLOW.draw(game.parseRetText(ig.game.trialText, 'confirmPanel2'), 63, 55);
                 }
                 if (game.Main_Menu === true && game.needUnlockConfirm > 0) {

                     game.confirmPanel.draw(60, 40);
                     if (game.needUnlockConfirm === 1) {
                         game.font_YELLOW.draw(game.parseRetText("UNLOCK HARD difficulty by finishing the game on EASY difficulty.", 'confirmPanel2'), 63, 50);
                         game.font_RED.draw(game.parseRetText("Strong enemies", 'confirmPanel2'), 63, 78);
                         game.font_PURPLE.draw(game.parseRetText("+1.5% EPIC find", 'confirmPanel2'), 63, 85);
                         game.font_ORANGE.draw(game.parseRetText("+0.25% LEGENDARY find", 'confirmPanel2'), 63, 92);
                     }
                     else if (game.needUnlockConfirm === 2) {
                         game.font_YELLOW.draw(game.parseRetText("UNLOCK HELL difficulty by finishing the game on HARD difficulty.", 'confirmPanel2'), 63, 50);
                         game.font_RED.draw(game.parseRetText("Very Strong enemies", 'confirmPanel2'), 63, 78);
                         game.font_PURPLE.draw(game.parseRetText("+3% EPIC find", 'confirmPanel2'), 63, 85);
                         game.font_ORANGE.draw(game.parseRetText("+0.5% LEGENDARY find", 'confirmPanel2'), 63, 92);
                     }
                     else if (game.needUnlockConfirm === 3) {
                         game.font_YELLOW.draw(game.parseRetText("UNLOCK HERO difficulty by finishing the game on HELL difficulty.", 'confirmPanel2'), 63, 50);
                         game.font_RED.draw(game.parseRetText("Extremely Strong enemies", 'confirmPanel2'), 63, 78);
                         game.font_PURPLE.draw(game.parseRetText("+4.5% EPIC find", 'confirmPanel2'), 63, 85);
                         game.font_ORANGE.draw(game.parseRetText("+0.75% LEGENDARY find", 'confirmPanel2'), 63, 92);
                     }
                   
                  
                 }
        
                 if (game.Main_Menu === true && informUnlock > 0) {
                    
                     game.difficultyUnlocked.draw(64, 55);
                     if (informUnlock === 1) {
                         game.hardDifficulty.drawTile(67, 58,0,26);
                     }
                     else if (informUnlock === 2) {
                         game.hellDifficulty.drawTile(67, 58, 0, 26);
                     }
                     else if (informUnlock === 3) {
                         game.heroDifficulty.drawTile(67, 58, 0, 26);
                     }
                 }
                  
                 if (game.saveSelection === false && game.askConfirmation === true) {
                     
                     game.confirmPanel.draw(60, 40);
                     game.font_YELLOW.draw(game.parseRetText("Pressing 'DELETE' will erase all saved data. The gold won't be erased.", 'confirmPanel2'), 63, 55);
                 }
                 if (game.buy_menu === true) {

                     if (game.buy_prompt === true)
                     {
                         game.confirmPanel.draw(60, 40);
                         if (!game.buy_item_draw_anim) {
                                 if (game.buy_item === 'Wooden Chest') {
                                     game.chestIcons.drawTile(128, 48, 0, 16);


                                 }
                                 else if (game.buy_item === 'Iron Chest') {
                                     game.chestIcons.drawTile(128, 48, 1, 16);

                                 }
                                 else if (game.buy_item === 'Steel Chest') {
                                     game.chestIcons.drawTile(128, 48, 2, 16);

                                 }
                                 else if (game.buy_item === 'Magic Chest') {
                                     game.chestIcons.drawTile(128, 48, 3, 16);

                                 }
                                 else if (game.buy_item === 'Ancient Chest') {
                                     game.chestIcons.drawTile(128, 48, 4, 16);

                                }
                         
                         }

                         else {
                            
                             game.drawChestOpening(game.buy_item, 119, 40);
                         }
                         
                         game.font.draw(game.parseRetText(game.buy_item + " costs " + game.buy_item_price + ' GOLD.', 'confirmPanel'), 63, 72);


                        

                     }
                     if (ig.game.gotItemBuy === true) {

                         game.currentGotItem = ig.game.lastItemBuy;

                         game.display96.draw((s_width / 2) - (game.display96.width / 2), 60);

                         game.font_YELLOW.draw(ig.game.lastItemBuy, ((s_width / 2) - (game.display96.width / 2)) + 10, 74);
                         game.drawSmallItem(ig.game.lastItemBuy, (s_width / 2) - 16, 88);
                         game.rarityBubble.drawTile(130, 119, ig.game.lastItemQualityBuy - 1, 8);

                     }
                    
                 }
                 if (game.equip_menu === true) {
                    
                     //game.font.draw(game.itemArray[0].itemName,0.205*s_width,0.2875*s_height,ig.Font.ALIGN.LEFT);
                     if (game.player) {

                     
                     if (player.weapon !== null) {
                         game.font.draw(player.weapon.itemName, 0.12 * s_width, 0.27 * s_height, ig.Font.ALIGN.LEFT);
                         game.drawSmallItem(player.weapon.itemName, 0, 0.19 * s_height);

                     }


                     if (player.armor !== null) {
                         game.font.draw(player.armor.itemName, 0.12 * s_width, (0.27 * s_height)+27, ig.Font.ALIGN.LEFT);
                         game.drawSmallItem(player.armor.itemName, 0, 0.3725 * s_height);
                     }

                     if (player.shield !== null) {
                         game.font.draw(player.shield.itemName, 0.12 * s_width, (0.27 * s_height) + 54, ig.Font.ALIGN.LEFT);
                         game.drawSmallItem(player.shield.itemName, 0, 0.520 * s_height);
                     }


                 
                   


                     

                     //game.arrow.drawTile(s_width/2 - game.equipHUD.width/2 + game.input_location * 32, s_height/2- game.optionsHUD.height*2,0,16);
                   


                         if (game.equip_invoke) {

                             if (game.equip_menu_swords && game.player.weaponArray[game.input_location_equip]) {
                                 var length_buf = game.player.weaponArray.length;

                                 for (var a = 0; a < length_buf; a++) {
                                     game.player.weaponArray[a].itemEquipped = false;
                                 }
                                 game.player.weapon = game.player.weaponArray[game.input_location_equip]; game.player.weapon.itemEquipped = true; game.player.weaponArray[game.input_location_equip].itemEquipped = true;
                                 game.changeArmorGFX(game.player);

                             }

                             else if (game.equip_menu_shields && game.player.shieldArray[game.input_location_equip]) {
                                 var length_buf = game.player.shieldArray.length;
                                 for (var a = 0; a < length_buf; a++) {
                                     game.player.shieldArray[a].itemEquipped = false;
                                 }
                                 game.player.shield = game.player.shieldArray[game.input_location_equip]; game.player.shield.itemEquipped = true; game.player.shieldArray[game.input_location_equip].itemEquipped = true;
                                 game.changeArmorGFX(game.player);
                             }
                             else if (game.equip_menu_armor && game.player.armorArray[game.input_location_equip]) {
                                 var length_buf = game.player.armorArray.length;
                                 for (var a = 0; a < length_buf; a++) {
                                     game.player.armorArray[a].itemEquipped = false;
                                 }

                                 game.player.armor = game.player.armorArray[game.input_location_equip]; game.player.armor.itemEquipped = true; game.player.armorArray[game.input_location_equip].itemEquipped = true;
                                 game.changeArmorGFX(game.player);
                             }

                             game.equip_invoke = false;
                             game.CalculateStats(game.player);

                         }


                       
                       
                       
                        game.drawequipment();
                     
                        if (game.special_1_info == true) {
                            var infoText = game.returnSpecialText(game.show_special);

                            game.specialInfo.draw(s_width * 0.10, s_height * 0.45);

                            game.font.draw(infoText, s_width * 0.12, s_height * 0.50);


                        }
                        else if (game.special_2_info == true) {
                            var infoText = game.returnSpecialText(game.show_special);

                            game.specialInfo.draw(s_width * 0.10, s_height * 0.45);

                            game.font.draw(infoText, s_width * 0.12, s_height * 0.50);

                        }
                        else if (game.special_3_info == true) {
                            var infoText = game.returnSpecialText(game.show_special);

                            game.specialInfo.draw(s_width * 0.10, s_height * 0.45);

                            game.font.draw(infoText, s_width * 0.12, s_height * 0.50);

                        }

                      
                     }
                 
                    
                 }
                 if (game.player && game.equipmentChanged) {
                 
                     game.CalculateStats(game.player); game.equipmentChanged = false;

                 }

                
                                
            }
           
        });



        




    });