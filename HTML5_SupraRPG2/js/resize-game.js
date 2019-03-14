

// these variables are only used by iapPurchase, do not write to them, read-only by external codes

var currentApp;
var licenseInformation;

var iapPurchaseStarted = false;
var iapPurchaseCompleted = true;
var iapPurchaseSuccess = false;
var loadingStarted = false;
var loadingSuccess = false;
var invokedResult = false;
var allowedToDisplayInfo = false;
var selectedProduct = null;

var purchaseLoadingStarted = false;
var purchaseLoadingEnded = false;
var restoreTransactionSuccess = false;
var restoreTransactionInvoked = false;
var myTouchButtons = null;

var Store = Windows.ApplicationModel.Store;
//window.addEventListener('resize', resizeGame, false);
function promptBuy() {
    state = "promptBuy"; try {
  //      window.external.notify(state);
    } catch (err) {
        alert(err);
    }
}
function reviewURL() {
    var uriToLaunch = "ms-windows-store:reviewapp?appid=5b420b82-aa4b-418d-8012-244ca052264c";
    //var uriToLaunch = "ms-windows-store:REVIEW?PFN=24982Evasleipa.TheDemonicRealmSupraRPGII_mctkncjckvmcc";
   
    // Create a Uri object from a URI string 
    var uri = new Windows.Foundation.Uri(uriToLaunch);

    // Launch the URI with a warning prompt
    var options = new Windows.System.LauncherOptions();
    options.treatAsUntrusted = true;

    Windows.System.Launcher.launchUriAsync(uri, options).then(
       function (success) {
           if (success) {
               // URI launched
               console.log(success);
           } else {
               // URI launch failed
           }
       });

}


function appInit() {

        // some app initialization functions

        // Get current product object 
        // Execute only one of these statements. 
        // The next line is commented out for testing.
        // currentApp = Windows.ApplicationModel.Store.CurrentApp;

        // The next line is commented out for production/release.
        currentApp = Store.CurrentApp;

        // We should have either a real or a simulated CurrentProduct object here.

       // Get the license info
        licenseInformation = currentApp.licenseInformation;

    // other app initializations function
}

function buyProduct(product) {
  
    try{
        Windows.ApplicationModel.Store.CurrentApp.loadListingInformationAsync().then(
    function (listing) {
        // loadListingInformationAsync returns the ListingInformation object in listing.

    }
);
        
      
            // note: currentApp is a reference to CurrentAppSimulator from a previous declaration
        Windows.ApplicationModel.Store.CurrentApp.requestProductPurchaseAsync(product).then(
                function (success) {
                    console.log(Windows.ApplicationModel.Store.ProductPurchaseStatus);
                    console.log(success.status);
                    var ProductPurchaseStatus = Windows.ApplicationModel.Store.ProductPurchaseStatus;
                    if (success.status === ProductPurchaseStatus.succeeded) {
                       
                        fulfillProduct(product, success.transactionId);
                    }
                    else if (success.status === ProductPurchaseStatus.notFulfilled) {
                       /* if (isNotLocallyFulfilled("product1", purchaseResults.transactionId)) {
                            grantFeatureLocally("product1", purchaseResults.transactionId);
                        } */
                        fulfillProduct1(product, purchaseResults.transactionId);
                    } else if (success.status === ProductPurchaseStatus.notPurchased) {
                        console.log(product + " was not purchased.", "sample", "status");
                    }
                    //Check the license state to determine if the in-app purchase was successful.
                    
                    
                   
                },
                function () {
                    // The in-app purchase was not completed because 
                    // there was an error.
                    console.log("failure");
                });
       
    }
    catch (e) {
        console.log(e);
    }
}

function receiveProduct(product) {
    if (product === 'TINY_HARD_CRC') {

        accountHardCurrency += 50;
    }
    if (product === 'SMALL_HARD_CRC') {
        accountHardCurrency += 150;
    }
    if (product === 'MED_HARD_CRC') {
        accountHardCurrency += 500;
    }
    if (product === 'GREAT_HARD_CRC') {
        accountHardCurrency += 1100;
    }
    if (product === 'HIGH_HARD_CRC') {
        accountHardCurrency += 2500;
    }
}
function fulfillProduct(productId, transactionId) {
    currentApp.reportConsumableFulfillmentAsync(productId, transactionId).done(
        function (result) {
            switch (result) {
                case Windows.ApplicationModel.Store.FulfillmentResult.succeeded:
                    console.log("You bought and fulfilled " + productId + ".", "sample", "status");
                    receiveProduct(product);
                    break;
                case Windows.ApplicationModel.Store.FulfillmentResult.nothingToFulfill:
                    console.log("There is no purchased "  +productId +" to fulfill.", "sample", "status");
                    break;
                case Windows.ApplicationModel.Store.FulfillmentResult.purchasePending:
                    console.log("You bought " + productId + " The purchase is pending so we cannot fulfill the product.", "sample", "status");
                    break;
                case Windows.ApplicationModel.Store.FulfillmentResult.purchaseReverted:
                    console.log("You bought " + productId + " But your purchase has been reverted.", "sample", "status");
                    // Since the user's purchase was revoked, they got their money back.
                    // You may want to revoke the user's access to the consumable content that was granted.
                    break;
                case Windows.ApplicationModel.Store.FulfillmentResult.serverError:
                    console.log("You bought " + productId + " There was an error when fulfilling.", "sample", "status");
                    break;
            }
        },
        function (error) {
            console.log("You bought " + productId + " There was an error when attempting to fulfill.", "sample", "error");
        });
}
function checkLicence() {

    if (licenseInformation.isTrial) {
       
        return true;
    }
    return false;
}
function buyFullGame() {
    //currentApp.requestAppPurchaseAsync(false);
    var uriToLaunch = "ms-windows-store:navigate?appid=5b420b82-aa4b-418d-8012-244ca052264c";
    //var uriToLaunch = "ms-windows-store:REVIEW?PFN=24982Evasleipa.TheDemonicRealmSupraRPGII_mctkncjckvmcc";
  
    // Create a Uri object from a URI string 
    var uri = new Windows.Foundation.Uri(uriToLaunch);

    // Launch the URI with a warning prompt
    var options = new Windows.System.LauncherOptions();
    options.treatAsUntrusted = true;

    Windows.System.Launcher.launchUriAsync(uri, options).then(
       function (success) {
           if (success) {
               // URI launched
               console.log(success);
           } else {
               // URI launch failed
           }
       });

}

function checkListing(type) {

    if (type === "trial") {
       currentApp.loadListingInformationAsync().then(function (listing) {
            ig.game.trialText = ("Upgrade to the Full Version for " + listing.formattedPrice).toString();
        });
    }
   
}

function backKeySave() {
    var state = "continue";
    if (ig.game.Main_Menu == true) {
        if (ig.game.changeLog_Show == true) { ig.game.changeLog_Show = false; }
        else if (ig.game.LevelSelect == true) {
            if (ig.game.resetConfirmInvoked == true) { ig.game.resetConfirmInvoked = false; }
            else { ig.game.LevelSelect = false; }
        }
        else {
            state = "close"; try {
            //    window.external.notify(state);
            } catch (err) {
                alert(err);
            }
        }
    }
    else {
        if (ig.game.game_menu == false && ig.game.equip_menu == false && ig.game.status_menu == false
            && ig.game.talentHUD == false &&
            ig.game.life_talents_menu == false
            && ig.game.blade_talents_menu == false && ig.game.magic_talents_menu == false && ig.game.devastation_talents_menu == false
            && ig.game.hunter_talents_menu == false && ig.game.skill_menu == false) { ig.game.saveandquit = true; }
        if (ig.game.game_menu == true) {
            ig.game.game_menu = false;
        }
        else if (ig.game.equip_menu == true) { ig.game.equip_menu = false; }
        else if (ig.game.life_talents_menu == true
            || ig.game.blade_talents_menu == true
            || ig.game.magic_talents_menu == true
            || ig.game.devastation_talents_menu == true
            || ig.game.hunter_talents_menu == true) {
            ig.game.life_talents_menu = false;
            ig.game.blade_talents_menu = false;
            ig.game.devastation_talents_menu = false;
            ig.game.magic_talents_menu = false;
            ig.game.hunter_talents_menu = false;
        }
        else if (ig.game.status_menu == true && ig.game.BeastiaryOn == false) { ig.game.status_menu = false; ig.game.game_menu = true; }
        else if (ig.game.status_menu == true && ig.game.BeastiaryOn == true) { ig.game.BeastiaryOn = false; }
        else if (ig.game.skill_menu == true) {
            ig.game.skill_menu = false;
            
        }
     
      
    }


}
/*
function purchaseProduct(){
    var licenseInformation = currentApp.licenseInformation;

    try {
        if (!licenseInformation.productLicenses.lookup("Handful of Gold").isActive) {
            WinJS.log && WinJS.log("Buying Product 1...", "sample", "status");
            currentApp.requestProductPurchaseAsync("product1", false).done(
                function () {
                    if (licenseInformation.productLicenses.lookup("Handful of Gold").isActive) {
                        WinJS.log && WinJS.log("You bought Product 1.", "sample", "status");
                    } else {
                        WinJS.log && WinJS.log("", "sample", "status");
                    }
                },
                function () {
                    WinJS.log && WinJS.log("Unable to buy Product 1.", "sample", "error");
                });
        } else {
            WinJS.log && WinJS.log("You already own Product 1.", "sample", "error");
        }
    }
    catch (e) {
        console.log(e);
    }
}*/

/*
var loginToken = null;
var client = new WindowsAzure.MobileServiceClient(
    "https://supra2cloudservicenoeu.azure-mobile.net/",
    "ZishtEVtatjZZEorDsZvBpHneukXtv56"
);

function refreshAuthDisplay() {
    var isLoggedIn = client.currentUser !== null;
   

    if (isLoggedIn) {
        cloudSync();
    }
    else {
        logIn();
    }
}*/
//Windows Phone 8.1 is bad
//hence
/*
function logIn() {
    console.log(client,"hep");
    if (sessionStorage.loggedInUser) {

   
        client.currentUser = JSON.parse(sessionStorage.loggedInUser);
    } else {
       
        client.login('microsoftaccount').done(function (results) {
            loginToken = results;
            // After logging in
           
            sessionStorage.loggedInUser = JSON.stringify(client.currentUser);

            CloudSyncOn = true;
            refreshAuthDisplay();
        }, function (err) {
            // alert("Error: " + err);
            console.log(err + "error on login");
        });
    }
}

*//*
function logIn() {
     if (sessionStorage.loggedInUser) {

   
        client.currentUser = JSON.parse(sessionStorage.loggedInUser);
    } else {
       
        try{
            client.login('microsoftaccount');
        }
        catch (e) {
            console.log(e);
        }
    }
}
function logOut() {
    // Log out
    client.logout();
    CloudSyncOn = false;
    sessionStorage.loggedInUser = null;
    refreshAuthDisplay();
  
}

// On page init, fetch the data and set up event handlers
/*$(function () {
    refreshAuthDisplay();
  
});*/

/*
function cloudSync() {
   


        var itemTable = client.getTable("SupraSave");
 
       
        itemTable.lookup(client.currentUser.userId).done(function (result) {
            //Load data to save files

         
            var bufferObj = null;
            if (localStorage.getItem('SupraSave_1')) {
                bufferObj = JSON.parse(localStorage.getItem('SupraSave_1'));

            }
            else if (localStorage.getItem('SupraSave_2')) {
                bufferObj = JSON.parse(localStorage.getItem('SupraSave_2'));

            }
            else if (localStorage.getItem('SupraSave_3')) {
                bufferObj = JSON.parse(localStorage.getItem('SupraSave_3'));

            }
            if (bufferObj) {


                var firstLoad = JSON.parse(result.json_savedata_1);
                var secondLoad = JSON.parse(result.json_savedata_2);
                var thirdLoad = JSON.parse(result.json_savedata_3);

                var compareDate = null;
                if (firstLoad && firstLoad["savedDate"]) {
                    compareDate = new Date(firstLoad["savedDate"]);
                }
                if (secondLoad && secondLoad["savedDate"]) {
                    compareDate = new Date(secondLoad["savedDate"]);
                }
                if (thirdLoad && thirdLoad["savedDate"]) {
                    compareDate = new Date(thirdLoad["savedDate"]);
                }


                var currentSavedDate = new Date(bufferObj.savedDate);

                if (!compareDate || compareDate < currentSavedDate) {


                    cloudSave('update');
                }
                else {
                    cloudLoad(result);
                }
            }
            else {

                cloudLoad(result);

            }

        }, function (err) {

           // console.log(err);
                cloudSave('insert');
                if (ig.game.saveSelection) {
                    FirstMainMenuElementsTo(false);
                    ig.game.saveSelection = false;
                    ig.system.setGame(MyGame);
                    //reload saves
                }

            
         
        });

        
   
 
}
function cloudLoad(result) {
    localStorage.setItem('SupraSave_1', result.json_savedata_1);
    localStorage.setItem('SupraSave_2', result.json_savedata_2);
    localStorage.setItem('SupraSave_3', result.json_savedata_3);


    if (ig.game.saveSelection) {
    FirstMainMenuElementsTo(false);
    ig.game.saveSelection = false;
    ig.system.setGame(MyGame);
    //reload saves
    }
}
function cloudSave(saveType) {

 
 
    var load1 = null;
    var load2 = null;
    var load3 = null;

    if (localStorage.getItem('SupraSave_1')) load1 = localStorage.getItem('SupraSave_1');
    if (localStorage.getItem('SupraSave_2')) load2 = localStorage.getItem('SupraSave_2');
    if (localStorage.getItem('SupraSave_3')) load3 = localStorage.getItem('SupraSave_3');

    var item = null;
    console.log("täs olla0a1");
    item = {
        id: client.currentUser.userId,
        json_savedata_1: load1,
        json_savedata_2: load2,
        json_savedata_3: load3
    };

    console.log("täs ollaa1");
    if (!item) return;

    console.log("täs ollaa");
    var itemTable = client.getTable("SupraSave");

    //Check if the itemTable already have record for this account
    try{

    
    if (saveType === 'update') {
        itemTable.update(item);
    }
    else if (saveType === 'insert') {
        itemTable.insert(item);
    }
    }
    catch(e){
        console.log("mita", e);
    }
    

    
}
*/
function resizeGame() {

    var gameCanvas = document.getElementById('canvas');
    var modifier = 1;
    var Is720p = 0;
    
    var widthToHeight = gameCanvas.width / gameCanvas.height;
    var ratio = window.devicePixelRatio || 1;
    
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
   
    var Is720p = parseFloat(newWidth)  / parseFloat(newHeight);
    if (Is720p > 1.57 && Is720p < 1.59)
    { modifier = 0.95; alert("is 720p");}
    var newWidthToHeight = newWidth / newHeight;

    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;
        gameCanvas.style.height = (newHeight * modifier) + 'px';
        gameCanvas.style.width = (newWidth * modifier) + 'px';
    } else {
        newHeight = newWidth / widthToHeight;
       gameCanvas.style.width = (newWidth  * modifier)  + 'px';
        gameCanvas.style.height = (newHeight  * modifier)  + 'px';
    }
    
  //  var ctx = gameCanvas.getContext("2d");
  
    //gameCanvas.style.marginTop = '3%';
  //  gameCanvas.style.marginLeft = ((-newWidth * modifier) / 2) + 'px';
  

    
}
function SetButtons() {

    var ms_width = 267;
    var ms_height = 160;
    if (!myTouchButtons) {
        myTouchButtons = new ig.TouchButtonCollection([

            
                                                    
                                                         new ig.TouchButton('popup', { left: 0, top: 0 }, 0.2 * ms_height, 0.2 * ms_height),
                                                             new ig.TouchButton('levelChangeButtonInvoked', { left: 0, top: 48 }, 64, 32, ig.game.CHANGELEVELBUTTON),
                                                       new ig.TouchButton('lootpopup', { left: 0, top: ms_height * 0.2 }, ms_width * 0.36, ms_height * 0.6),
                                                       new ig.TouchButton('screen', { left: 0, top: 0 }, ms_width, ms_height),
                                                       new ig.TouchButton('onmusic', { left: 0, top: 0.25 * ms_height }, 0.12 * ms_width, 0.2 * ms_height),
                                                       new ig.TouchButton('offmusic', { left: 0, top: 0.25 * ms_height }, 0.12 * ms_width, 0.2 * ms_height),
                                                       new ig.TouchButton('saveSlot1', { left: 0.24 * ms_width, top: 0.12 * ms_height }, 128, 32, ig.game.CONTINUEBUTTON, 0, 1, 7, ig.game.STARTGAMEBUTTON),
                                                       new ig.TouchButton('saveSlot2', { left: 0.24 * ms_width, top: 0.34 * ms_height }, 128, 32, ig.game.CONTINUEBUTTON, 0, 1, 8, ig.game.STARTGAMEBUTTON),
                                                       new ig.TouchButton('saveSlot3', { left: 0.24 * ms_width, top: 0.56 * ms_height }, 128, 32, ig.game.CONTINUEBUTTON, 0, 1, 9, ig.game.STARTGAMEBUTTON),
                                                        new ig.TouchButton('deleteSlot1', { left: 0.72 * ms_width, top: 0.12 * ms_height }, 0.2 * ms_height, 0.2 * ms_height, ig.game.DELETEBUTTON),
                                                           new ig.TouchButton('deleteSlot2', { left: 0.72 * ms_width, top: 0.34 * ms_height }, 0.2 * ms_height, 0.2 * ms_height, ig.game.DELETEBUTTON),
                                                              new ig.TouchButton('deleteSlot3', { left: 0.72 * ms_width, top: 0.56 * ms_height }, 0.2 * ms_height, 0.2 * ms_height, ig.game.DELETEBUTTON),
                                                       new ig.TouchButton('space', { left: 0.52 * ms_width, top: 0.6 * ms_height }, 0.12 * ms_width, 0.2 * ms_height),


                                                     
                                                     new ig.TouchButton('selectLevel', { left: 0.24 * ms_width, top: 0.460 * ms_height },0.4 * ms_height,0.2 * ms_height,ig.game.SELECTLEVELBUTTON),
                                                     new ig.TouchButton('backmenu', { left: 0.485 * ms_width, top: ms_height * 0.460 },0.4 * ms_height,0.2 * ms_height,ig.game.BACKMENUBUTTON),
                                                       new ig.TouchButton('selectShopBuy', { left: 0.24 * ms_width, top: 0.670 * ms_height }, 0.4 * ms_height, 0.2 * ms_height, ig.game.SELECTSHOPBUTTON),
                                                     
                                                        new ig.TouchButton('selectShopSell', { left: 0.485 * ms_width, top: 0.670 * ms_height }, 0.4 * ms_height, 0.2 * ms_height, ig.game.SELECTSMITHBUTTON),

                                                              new ig.TouchButton('goBackshop', { left: 3, top: 3 }, 29, 29, ig.game.BackButton),
                                                          new ig.TouchButton('goBackshopBuy', { left: 3, top: 3 }, 29, 29, ig.game.BackButton),
                                                       //new ig.TouchButton('buyShop', { left: 123, top: 64 }, 80,32, ig.game.BUYSHOPBUTTON),

                                                           new ig.TouchButton('cancelShopBuy', { left: 140, top: 100 }, 80, 32, ig.game.CANCELSHOPBUTTON),

                                                    new ig.TouchButton('sellShop', { left: 123, top: 64 }, 80, 32, ig.game.SELLSHOPBUTTON),
                                                       new ig.TouchButton('upgradeShop', { left: 123, top: 96 }, 80, 32, ig.game.UPGRADESHOPBUTTON),
                                                       new ig.TouchButton('shopItemScrollUp', { left: 16 + 0.40 * ms_width, top: 0.22 * ms_height }, 19, 19, ig.game.EquipScrollUp),
                                                       new ig.TouchButton('shopItemScrollDown', { left: 16 + 0.40 * ms_width, top: 0.86 * ms_height }, 19, 19, ig.game.EquipScrollDown),
                                                       new ig.TouchButton('sellConfirm', { left: 140, top: 100 }, 80, 32, ig.game.SELLSHOPBUTTON),
                                                       new ig.TouchButton('upgradeConfirm', { left: 140, top: 100 }, 80, 32, ig.game.UPGRADESHOPBUTTON),

                                                      new ig.TouchButton('selectShopBuy_TINYGOLD', { left: 0.06 * ms_width, top: 0.77 * ms_height }, 0.2 * ms_height, 0.1 * ms_height, ig.game.SMALLBUYBUTTON),
                                                          new ig.TouchButton('selectShopBuy_SMALLGOLD', { left: 0.245 * ms_width, top: 0.77 * ms_height }, 0.2 * ms_height, 0.1 * ms_height, ig.game.SMALLBUYBUTTON),
                                                            new ig.TouchButton('selectShopBuy_MEDGOLD', { left: 0.43 * ms_width, top: 0.77 * ms_height }, 0.2 * ms_height, 0.1 * ms_height, ig.game.SMALLBUYBUTTON),
                                                              new ig.TouchButton('selectShopBuy_GREATGOLD', { left: 0.615 * ms_width, top: 0.77 * ms_height }, 0.2 * ms_height, 0.1 * ms_height, ig.game.SMALLBUYBUTTON),
                                                                new ig.TouchButton('selectShopBuy_HIGHGOLD', { left: 0.80 * ms_width, top: 0.77 * ms_height }, 0.2 * ms_height, 0.1 * ms_height, ig.game.SMALLBUYBUTTON),

                                                                  new ig.TouchButton('selectShopBuy_FIRSTCHEST', { left: 0.06 * ms_width, top: 0.47 * ms_height }, 0.2 * ms_height, 0.1 * ms_height, ig.game.SMALLBUYBUTTON),
                                                                    new ig.TouchButton('selectShopBuy_SECONDCHEST', { left: 0.245 * ms_width, top: 0.47 * ms_height },  0.2 * ms_height, 0.1 * ms_height, ig.game.SMALLBUYBUTTON),
                                                                      new ig.TouchButton('selectShopBuy_THIRDCHEST', { left: 0.43 * ms_width, top: 0.47 * ms_height }, 0.2 * ms_height, 0.1 * ms_height, ig.game.SMALLBUYBUTTON),
                                                                        new ig.TouchButton('selectShopBuy_FOURTHCHEST', { left: 0.615 * ms_width, top: 0.47 * ms_height }, 0.2 * ms_height, 0.1 * ms_height, ig.game.SMALLBUYBUTTON),
                                                                          new ig.TouchButton('selectShopBuy_FIFTHCHEST', { left: 0.80 * ms_width, top: 0.47 * ms_height }, 0.2 * ms_height, 0.1 * ms_height, ig.game.SMALLBUYBUTTON),



                                                   //    new ig.TouchButton('selectChallenge', { left: 0.485 * ms_width, top: 0.670 * ms_height },0.4 * ms_height, 0.2 * ms_height, ig.game.SELECTCHALLENGEBUTTON),
                                                            new ig.TouchButton('menu', { left: 87+32, top: 0 }, 0.12 * ms_width, 0.2 * ms_height, ig.game.MenuButton),
                                                       new ig.TouchButton('equipmenu', { left: 87, top: 0 }, 0.12 * ms_width, 0.2 * ms_height, ig.game.EquipMenuButton),
                                                       new ig.TouchButton('talents', { left: 151, top: 0 }, 0.12 * ms_width, 0.2 * ms_height, ig.game.SkillMenuButton),
                                                       new ig.TouchButton('equipsword', { left: 3, top: 35 }, 103, 24, ig.game.EquipCategoryButton, 0, 1, 4, ig.game.EquipCategoryButton2),
                                                       new ig.TouchButton('equiparmor', { left: 3, top: 62 }, 103, 24, ig.game.EquipCategoryButton, 0, 1, 6, ig.game.EquipCategoryButton2),
                                                       new ig.TouchButton('equipshield', { left: 3, top: 89 }, 103, 24, ig.game.EquipCategoryButton, 0, 1, 5, ig.game.EquipCategoryButton2),

                                                       new ig.TouchButton('equipItem2', { left: 0.645 * ms_width, top: 0.22 * ms_height }, 92, 92,ig.game.EquipButton2),
                                                     
                                                       new ig.TouchButton('goBackequipmenu', { left: 3, top: 3 },29, 29, ig.game.BackButton),



                                                       new ig.TouchButton('special_1_sw', { left: 0.506 * ms_width, top: 0.61875 * ms_height }, 0.161 * ms_width, 0.125 * ms_height),
                                                       new ig.TouchButton('special_2_sw', { left: 0.506 * ms_width, top: 0.75 * ms_height }, 0.161 * ms_width, 0.125 * ms_height),
                                                       new ig.TouchButton('special_3_sw', { left: 0.506 * ms_width, top: 0.875 * ms_height }, 0.161 * ms_width, 0.125 * ms_height),

                                                       new ig.TouchButton('special_1_ss', { left: 0.67 * ms_width, top: 0.61875 * ms_height }, 0.26875 * ms_height, 0.125 * ms_height),
                                                       new ig.TouchButton('special_2_ss', { left: 0.67 * ms_width, top: 0.75 * ms_height }, 0.161 * ms_width, 0.125 * ms_height),
                                                       new ig.TouchButton('special_3_ss', { left: 0.67 * ms_width, top: 0.875 * ms_height }, 0.161 * ms_width, 0.125 * ms_height),

                                                       new ig.TouchButton('special_1_sa', { left: 0.835 * ms_width, top: 0.61875 * ms_height }, 0.161 * ms_width, 0.125 * ms_height),
                                                       new ig.TouchButton('special_2_sa', { left: 0.835 * ms_width, top: 0.75 * ms_height }, 0.161 * ms_width, 0.125 * ms_height),
                                                       new ig.TouchButton('special_3_sa', { left: 0.835 * ms_width, top: 0.875 * ms_height }, 0.161 * ms_width, 0.125 * ms_height),

                                                       new ig.TouchButton('monster_beast', { left: 0, top: 0.5 * ms_height }, 0.12 * ms_width, 0.2 * ms_height),
                                                       new ig.TouchButton('wizard_beast', { left: 0.12 * ms_width, top: 0.5 * ms_height }, 0.12 * ms_width, 0.2 * ms_height),
                                                       new ig.TouchButton('knight_beast', { left: 0.24 * ms_width, top: 0.5 * ms_height }, 0.12 * ms_width, 0.2 * ms_height),
                                                       new ig.TouchButton('boss_beast', { left: 0.36 * ms_width, top: 0.5 * ms_height }, 0.12 * ms_width, 0.2 * ms_height),
                                                       new ig.TouchButton('beast_Back', { left: 0.14 * ms_width, top: 0.8 * ms_height }, 0.2 * ms_height, 0.2 * ms_height),
                                                       new ig.TouchButton('beast_Next', { left: 0.704 * ms_width, top: 0.8 * ms_height }, 0.12 * ms_width, 0.2 * ms_height),
                                                       new ig.TouchButton('beast_Prev', { left: 0.577 * ms_width, top: 0.8 * ms_height }, 0.12 * ms_width, 0.2 * ms_height),

                                                       new ig.TouchButton('special_1', { left: 35, top: 2 }, 75, 31, ig.game.SPECIALBUTTON),
                                                       new ig.TouchButton('special_2', { left: 112, top: 2 }, 75, 31, ig.game.SPECIALBUTTON),
                                                       new ig.TouchButton('special_3', { left: 189, top: 2}, 75, 31, ig.game.SPECIALBUTTON),

                                                       new ig.TouchButton('equipItemScrollUp', { left: 0.322 * ms_width, top: 0.725 * ms_height }, 19, 19,ig.game.EquipScrollUp),
                                                       new ig.TouchButton('equipItemScrollDown', { left: 0.322 * ms_width, top: 0.86 * ms_height }, 19,19, ig.game.EquipScrollDown),

                                                       // 68.5, Y: 16
                                                       new ig.TouchButton('status', { left: 0.2603 * ms_width, top: 0.3 * ms_height }, 0.12 * ms_width, 0.2 * ms_height, ig.game.StatusButton),
                                                       new ig.TouchButton('menu_musicOn', { left: 0.3803 * ms_width, top: 0.3 * ms_height }, 0.12 * ms_width, 0.2 * ms_height, ig.game.MusicOnButton, 0, 1, 3, ig.game.MusicOffButton),
                                                       new ig.TouchButton('switch', { left: 0.5002 * ms_width, top: 0.3 * ms_height }, 0.12 * ms_width, 0.2 * ms_height, ig.game.SwitchButton),
                                                       new ig.TouchButton('saveandquit', { left: 0.6203 * ms_width, top: 0.3 * ms_height }, 0.12 * ms_width, 0.2 * ms_height,ig.game.SaveAndQuitButton),

                                                       new ig.TouchButton('GoBackTalentScreen', { left: 3, top: 3 }, 29, 29, ig.game.BackButton),
                                                       new ig.TouchButton('BLDTalents', { left:74, top: 3 }, 28, 27,ig.game.BLADE_TALENT_SELECT),
                                                       new ig.TouchButton('SPLTalents', { left: 105, top: 3 }, 28, 27, ig.game.SPELL_TALENT_SELECT),
                                                       new ig.TouchButton('LIFTalents', { left: 136, top: 3 }, 28, 27, ig.game.LIFE_TALENT_SELECT),
                                                       new ig.TouchButton('DEMTalents', { left: 167, top: 3 }, 28, 27, ig.game.DEMON_TALENT_SELECT),



                                                       new ig.TouchButton('PlayerSlashInfo', { left: 0.515 * ms_width, top: 0.3125 * ms_height }, 25, 25,ig.game.RedTalentButton),
                                                       new ig.TouchButton('ShockWaveInfo', { left: 0.6 * ms_width, top: 0.3125 * ms_height }, 25, 25,ig.game.RedTalentButton),
                                                       new ig.TouchButton('BladeClass', { left: 40, top: 0.3 * ms_height }, 48, 48, ig.game.ChooseBladeClass),

                                                       new ig.TouchButton('FrostBallInfo', { left: 0.575 * ms_width, top: 0.3125 * ms_height }, 25, 25, ig.game.BlueTalentButton),

                                                       new ig.TouchButton('WizardClass', { left: 92, top: 0.3 * ms_height }, 48, 48, ig.game.ChooseWizardClass),

                                                       new ig.TouchButton('LifeSlashInfo', { left: 0.515 * ms_width, top: 0.3125 * ms_height }, 25, 25, ig.game.WhiteTalentButton),
                                                       new ig.TouchButton('HolyPowerInfo', { left: 0.6 * ms_width, top: 0.3125 * ms_height }, 25, 25, ig.game.WhiteTalentButton),
                                                       new ig.TouchButton('LifeClass', { left: 144, top: 0.3 * ms_height }, 48, 48, ig.game.ChooseLifeClass),

                                                       new ig.TouchButton('DemonSlashInfo', { left: 0.515 * ms_width, top: 0.3125 * ms_height }, 25, 25, ig.game.WhiteTalentButton),
                                                       new ig.TouchButton('BloodEnergyInfo', { left: 0.6 * ms_width, top: 0.3125 * ms_height }, 25, 25, ig.game.WhiteTalentButton),
                                                       new ig.TouchButton('DemonClass', { left: 198, top: 0.3 * ms_height }, 48, 48, ig.game.ChooseDemonClass),

                                                       new ig.TouchButton('SelectClass', { left: 0.5262 * ms_width, top: 0.6 * ms_height }, 52, 0.4 * ms_height, ig.game.SelectButton),

                                                       new ig.TouchButton('CancelClass', { left: 0.2921 * ms_width, top: 0.6 * ms_height }, 52, 0.4 * ms_height, ig.game.CancelButton),

                                                       new ig.TouchButton('CancelInfo', { left: 0.2921 * ms_width, top: 0.6 * ms_height }, 52, 0.4 * ms_height, ig.game.CancelButton),
                                                       new ig.TouchButton('status_goback', { left: 0, top: 0.325 * ms_height }, 0.12 * ms_width, 0.2 * ms_height),



                                                    new ig.TouchButton('BLADE_VIGOR', { left: 19, top: 97 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('BLADE_FLURRY', { left: 19, top: 65 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),


                                                    new ig.TouchButton('BLADE_FRENZY', { left: 59, top: 44 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('BLADE_SHOCKPULSE', { left: 59, top: 82 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('BLADE_DOUBLEATTACK', { left: 59, top: 120 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),

                                                    new ig.TouchButton('BLADE_BLOODLUST', { left: 99, top: 44 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('BLADE_ESCALATION', { left: 99, top: 82 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('BLADE_EXECUTE', { left: 99, top: 120 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),

                                                    new ig.TouchButton('BLADE_SWORDSPECIALIST', { left: 139, top: 44 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('BLADE_AXESPECIALIST', { left: 139, top: 120 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('BLADE_BIGPLAY', { left: 139, top: 82 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),

                                                    new ig.TouchButton('BLADE_PHANTOMSTRIKES', { left: 179, top: 82 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),

                                                    new ig.TouchButton('LIFE_BURNINGHEART', { left: 19, top: 97 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('LIFE_LIFESPIRIT', { left: 19, top: 65 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),


                                                    new ig.TouchButton('LIFE_CALMMIND', { left: 59, top: 44 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('LIFE_RADIANCE', { left: 59, top: 82 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('LIFE_EMPOWEREDSLASH', { left: 59, top: 120 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),

                                                    new ig.TouchButton('LIFE_WALLOFJUSTICE', { left: 99, top: 44 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('LIFE_HOLYBARRIER', { left: 99, top: 82 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('LIFE_RADIANTFURY', { left: 99, top: 120 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),

                                                    new ig.TouchButton('LIFE_BURNINGLIGHT', { left: 139, top: 44 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('LIFE_LASTSTAND', { left: 139, top: 120 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('LIFE_ZEAL', { left: 139, top: 82 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),

                                                    new ig.TouchButton('LIFE_HOLYSLASH', { left: 179, top: 82 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),

                                                    new ig.TouchButton('SPELL_INTELLIGENCE', { left: 19, top: 97 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('SPELL_FOCUS', { left: 19, top: 65 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),

                                                    new ig.TouchButton('SPELL_CRITICALRETURN', { left: 59, top: 44 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('SPELL_FIREBLAST', { left: 59, top: 82 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('SPELL_ENDLESSPOOL', { left: 59, top: 120 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),

                                                    new ig.TouchButton('SPELL_DEMOLISH', { left: 99, top: 82 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('SPELL_CRITICALCOMBO', { left: 99, top: 44 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),


                                                    new ig.TouchButton('SPELL_ELEMENTALSYNERGY', { left: 139, top: 44 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('SPELL_FROSTFIRE', { left: 139, top: 82 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('SPELL_DEEPFREEZE', { left: 139, top: 120 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),

                                                    new ig.TouchButton('SPELL_ARCANEBALL', { left: 179, top: 82 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),


                                                    new ig.TouchButton('DEMON_DEMONICFORTITUDE', { left: 19, top: 65 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('DEMON_VAMPIRISM', { left: 19, top: 97 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                  
                                                    new ig.TouchButton('DEMON_MYSTICBARRIER', { left: 59, top: 44 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('DEMON_DARKRAGE', { left: 59, top: 82 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),


                                                    new ig.TouchButton('DEMON_DARKWAVE', { left: 99, top: 44 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('DEMON_SACRIFICIALDRIVE', { left: 99, top: 120 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('DEMON_EMPOWEREDDARKRAGE', { left: 99, top: 82 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),


                                                    new ig.TouchButton('DEMON_DEMONSTRENGTH', { left: 139, top: 82 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('DEMON_DREADWAVE', { left: 139, top: 44 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),
                                                    new ig.TouchButton('DEMON_DEMONBLOOD', { left: 139, top: 120 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),

                                                    new ig.TouchButton('DEMON_DARKWILL', { left: 179, top: 82 }, 31, 31, ig.game.SelectableButton, 0, 4, 1),


                                                  
                                                      

                                                       new ig.TouchButton('Select_Talent', { left: 0.5262 * ms_width, top: 0.6 * ms_height }, 52, 0.4 * ms_height, ig.game.SelectButton),

                                                       new ig.TouchButton('Cancel_Talent', { left: 0.2921 * ms_width, top: 0.6 * ms_height }, 52, 0.4 * ms_height, ig.game.CancelButton),

                                                       new ig.TouchButton('resetTalents', { left: 0.88 * ms_width, top: 3 },29, 29, ig.game.ResetButton),
                                                    /*  new ig.TouchButton('changeLog', { left: 0.03371 * ms_width, top: 0.775 * ms_height }, 0.19101 * ms_width, 0.1875 * ms_height),
                                                       new ig.TouchButton('GoBackChangeLog', { left: 0.0187 * ms_width, top: 0.03125 * ms_height }, 0.12 * ms_width, 0.2 * ms_height),
                                                       */
                                                       new ig.TouchButton('levelSelectGoBack', { left: 0.03371 * ms_width, top: 0.03125 * ms_height }, 0.4 * ms_height, 0.2 * ms_height, ig.game.BACKMENUBUTTON),
                                                       new ig.TouchButton('levelSelectReset', { left: 0.86517 * ms_width, top: 0.79375 * ms_height }, 0.19101 * ms_width, 0.1875 * ms_height),
                                                       new ig.TouchButton('levelSelectResetConfirm', { left: 0.26023 * ms_width, top: 0.4 * ms_height }, 0.24 * ms_width, 0.2 * ms_height),
                                                       new ig.TouchButton('levelSelectResetCancel', { left: 0.5 * ms_width, top: 0.4 * ms_height }, 0.24 * ms_width, 0.2 * ms_height),

                                                   
                                                     

                                                       new ig.TouchButton('endGame', { left: 0, top: 0 }, ms_width, ms_height),

                                                   //    new ig.TouchButton('minimap_Open', { left: 0, top: 0.2 * ms_height }, 0.27 * ms_width, 0.10 * ms_height),
                                                     //new ig.TouchButton('minimap_Close', { left: 0, top: 0.2 * ms_height }, 0.27 * ms_width, 0.275 * ms_height),

                                                       new ig.TouchButton('buyButton', { left: 0.775 * ms_width, top: 0.8125 * ms_height }, 0.375 * ms_height, 0.1875 * ms_height),
                                                       new ig.TouchButton('lootButton', { left: 0.36 * ms_width, top: 0.46 * ms_height }, 0.225 * ms_width, 0.4 * ms_height),
                                                       new ig.TouchButton('specialButton', { left: ms_width * 0.10, top: ms_height * 0.45 }, 0.72 * ms_width, 0.4 * ms_height),

                                                       new ig.TouchButton('buyConfirm', { left: 0.659 * ms_width, top: 0.15 * ms_height }, 0.195 * ms_width, 0.175 * ms_height),
                                                       new ig.TouchButton('buyCancel', { left: ms_width * 0.584, top: ms_height * 0.63125 }, 0.371 * ms_width, 0.275 * ms_height),
                                                       new ig.TouchButton('reviewApp', { left: 0, top: 0 }, 64, 32, ig.game.RateThisAppButton),
                                                           new ig.TouchButton('buyApp', { left: 203, top: 0 }, 64, 32, ig.game.BuyThisAppButton), 
                                                       new ig.TouchButton('credits', { left: 0.76 * ms_width, top: 0 }, 0.24 * ms_width, 0.2 * ms_height),
                                                     //  new ig.TouchButton('restorePurchases', { left: 0, top: 0.8125 * ms_height }, 0.375 * ms_width, 0.1875 * ms_height),
                                                       new ig.TouchButton('YesExtra', { left: 0.26 * ms_width, top: 0.3 * ms_height }, 0.24 * ms_width, 0.4 * ms_height),
                                                       new ig.TouchButton('NoExtra', { left: 0.5 * ms_width, top: 0.3 * ms_height }, 0.24 * ms_width, 0.4 * ms_height),

                                                       new ig.TouchButton('dialog_P', { left: 0, top: 0.8 * ms_height }, ms_width, 0.2 * ms_height),

                                                       new ig.TouchButton('goLeftLevel', { left: 63.5, top: 48 },0.2 * ms_height,0.2 * ms_height, ig.game.goLeftButton),
                                                       new ig.TouchButton('goRightLevel', { left: 159.5, top: 48 },0.2 * ms_height,0.2 * ms_height, ig.game.goRightButton),

                                                      // new ig.TouchButton('SelectLevel', { left: 63.5, top: 48 },0.2 * ms_height,0.2 * ms_height, ig.game.goLeftButton),
                                                   
                                                       new ig.TouchButton('selectEasy', { left: 67, top: 20 }, 26, 26, ig.game.easyDifficulty),
                                                       new ig.TouchButton('selectHard', { left: 99, top: 20 }, 26, 26, ig.game.hardDifficulty),
                                                       new ig.TouchButton('selectHell', { left: 131, top: 20 }, 26, 26, ig.game.hellDifficulty),
                                                       new ig.TouchButton('selectHero', { left: 163, top: 20 }, 26, 26, ig.game.heroDifficulty),

                                                       new ig.TouchButton('goLevel', { left: 96, top: 20 }, 0.4 * ms_height, 0.4 * ms_height, ig.game.goLevelButton),

                                                  
                                                           new ig.TouchButton('buyShopConfirm', { left: 60, top: 100 }, 80, 32, ig.game.BUYSHOPBUTTON),

                                                           new ig.TouchButton('CancelDelete', { left: 140, top: 100 }, 80, 32, ig.game.CANCELPOSSHOPBUTTON),
                                                           new ig.TouchButton('DeleteConfirm', { left: 60, top: 100 }, 80, 32, ig.game.DELETEBIGBUTTON),

                                                             new ig.TouchButton('cancelDifficulty', { left: 140, top: 100 }, 80, 32, ig.game.CANCELPOSSHOPBUTTON),
                                                           new ig.TouchButton('confirmDifficulty', { left: 60, top: 100 }, 80, 32, ig.game.CONFIRMBIGBUTTON),
                                                              new ig.TouchButton('trialButton', { left: 60, top: 100 }, 80, 32, ig.game.CONFIRMBIGBUTTON),
                                                                  new ig.TouchButton('trialCancel', { left: 140, top: 100 }, 80, 32, ig.game.CANCELPOSSHOPBUTTON),
                                                       new ig.TouchButton('cancelShop', { left: 60, top: 100 }, 80, 32, ig.game.CANCELSHOPBUTTON),

                                                    //      new ig.TouchButton('LoginGoBack', { left: 0.03371 * ms_width, top: 0.03125 * ms_height }, 0.4 * ms_height, 0.2 * ms_height, ig.game.BACKMENUBUTTON),
                                                           //  new ig.TouchButton('cloudSync', { left: 203, top: 0 }, 0.4 * ms_height, 0.2 * ms_height, ig.game.CloudSyncButton, 0, 1, 10, ig.game.CloudSyncButton2),
                                                        //           new ig.TouchButton('microsoftLogin', { left: 60, top: 64 }, 32, 32, ig.game.MICROSOFTBUTTON),
                                                        //      new ig.TouchButton('facebookLogin', { left: 94, top: 64 }, 32, 32, ig.game.FACEBOOKBUTTON),
                                                          //      new ig.TouchButton('twitterLogin', { left: 128, top: 64 }, 32, 32, ig.game.TWITTERBUTTON),
                                                              //     new ig.TouchButton('googleLogin', { left: 164, top: 64 }, 32, 32, ig.game.GOOGLEBUTTON)
                                           

        ]);
    }
 
    return myTouchButtons;
}
function loginElementsTo(bool) {
    
 //   ig.game.myTouchButtons.searchButton("LoginGoBack", bool);
  //  ig.game.myTouchButtons.searchButton("microsoftLogin", bool);
  //  ig.game.myTouchButtons.searchButton("facebookLogin", bool);
  //  ig.game.myTouchButtons.searchButton("twitterLogin", bool);
  //  ig.game.myTouchButtons.searchButton("googleLogin", bool);
}
function ClassElements2To(bool) {
    ig.game.myTouchButtons.searchButton("BladeClass", bool);
    ig.game.myTouchButtons.searchButton("LifeClass", bool);
    ig.game.myTouchButtons.searchButton("WizardClass", bool);
    ig.game.myTouchButtons.searchButton("DemonClass", bool);
}
function SkillElementsTo(bool) {

    ig.game.myTouchButtons.searchButton("BLDTalents", bool);
    ig.game.myTouchButtons.searchButton("LIFTalents", bool);
    ig.game.myTouchButtons.searchButton("SPLTalents", bool);
    ig.game.myTouchButtons.searchButton("DEMTalents", bool);
    ig.game.myTouchButtons.searchButton("GoBackTalentScreen", bool);
    ig.game.myTouchButtons.searchButton("resetTalents", bool);
}
function trialElementsTo(bool) {
    ig.game.myTouchButtons.searchButton("trialButton", bool);
    ig.game.myTouchButtons.searchButton("trialCancel", bool);
}
function difficultyElementsTo(bool) {
    ig.game.myTouchButtons.searchButton("confirmDifficulty", bool);
    ig.game.myTouchButtons.searchButton("cancelDifficulty", bool);
}
function HideMenu(bool) {
    ig.game.myTouchButtons.searchButton("menu", bool);
}
function ConfirmationDeleteElementsTo(bool) {
    ig.game.myTouchButtons.searchButton("CancelDelete", bool);
    ig.game.myTouchButtons.searchButton("DeleteConfirm", bool);
}
function ConfirmationElementsBuyTo(bool,canBuy) {
    if (bool && canBuy) ig.game.myTouchButtons.searchButton("buyShopConfirm", bool);
    else if(!bool){ ig.game.myTouchButtons.searchButton("buyShopConfirm", bool); }
    ig.game.myTouchButtons.searchButton("cancelShopBuy", bool);
}
function ConfirmationElementsTo(bool, type, available) {

    if (type === "upgrade") {
        if (available !== "not") ig.game.myTouchButtons.searchButton("upgradeConfirm", bool);
   
    }
    else if (type === "sell") ig.game.myTouchButtons.searchButton("sellConfirm", bool);
   
    ig.game.myTouchButtons.searchButton("cancelShop", bool);
}
function BuyShopElementsTo(bool) {

  
    
  //  ig.game.myTouchButtons.searchButton("selectShopBuy_TINYGOLD", bool);
  //  ig.game.myTouchButtons.searchButton("selectShopBuy_SMALLGOLD", bool);
  //  ig.game.myTouchButtons.searchButton("selectShopBuy_MEDGOLD", bool);
   // ig.game.myTouchButtons.searchButton("selectShopBuy_GREATGOLD", bool);
   // ig.game.myTouchButtons.searchButton("selectShopBuy_HIGHGOLD", bool);

    ig.game.myTouchButtons.searchButton("selectShopBuy_FIRSTCHEST", bool);
    ig.game.myTouchButtons.searchButton("selectShopBuy_SECONDCHEST", bool);
    ig.game.myTouchButtons.searchButton("selectShopBuy_THIRDCHEST", bool);
    ig.game.myTouchButtons.searchButton("selectShopBuy_FOURTHCHEST", bool);
    ig.game.myTouchButtons.searchButton("selectShopBuy_FIFTHCHEST", bool);
    ig.game.myTouchButtons.searchButton("goBackshopBuy", bool);

}

function ShopElementsTo(bool,onlySellAndUpgrade) {

    // 
    if (onlySellAndUpgrade) {
      
        ig.game.myTouchButtons.searchButton("sellShop", bool);
        ig.game.myTouchButtons.searchButton("upgradeShop", bool);
    } else {
        ig.game.myTouchButtons.searchButton("sellShop", bool);
        ig.game.myTouchButtons.searchButton("upgradeShop", bool);
        ig.game.myTouchButtons.searchButton('shopItemScrollUp', bool);
        ig.game.myTouchButtons.searchButton('shopItemScrollDown', bool);
        ig.game.myTouchButtons.searchButton('goBackshop', bool);
        ig.game.myTouchButtons.searchButton('special_1', bool);
        ig.game.myTouchButtons.searchButton('special_2', bool);
        ig.game.myTouchButtons.searchButton('special_3', bool);
    }
   
   
  
}

function LevelSelectElementsTo(bool) {

    ig.game.myTouchButtons.searchButton("goLevel", bool);
    ig.game.myTouchButtons.searchButton("goLeftLevel", bool);
    ig.game.myTouchButtons.searchButton("goRightLevel", bool);
    ig.game.myTouchButtons.searchButton("levelSelectGoBack", bool);
    
}


function TopHUDElementsTo(bool) {


    ig.game.myTouchButtons.searchButton("equipmenu", bool);
    ig.game.myTouchButtons.searchButton("talents", bool);
    ig.game.myTouchButtons.searchButton("menu", bool);

}
function HUDElementsTo(bool) {

    ig.game.myTouchButtons.searchButton("jump", bool);
    ig.game.myTouchButtons.searchButton("action1", bool);
    ig.game.myTouchButtons.searchButton("action2", bool);
    ig.game.myTouchButtons.searchButton("equipmenu", bool);
    ig.game.myTouchButtons.searchButton("talents", bool);
    ig.game.myTouchButtons.searchButton("menu", bool);
    
}

function OptionElementsTo(bool) {
    
    ig.game.myTouchButtons.searchButton("saveandquit", bool);
    ig.game.myTouchButtons.searchButton("menu_musicOn", bool);
   // ig.game.myTouchButtons.searchButton("status", bool);
   // ig.game.myTouchButtons.searchButton("switch", bool);
  

}
function EquipElementsTo(bool,val) {
    
    if (!val || !val === 'equipsword') ig.game.myTouchButtons.searchButton('equipsword', bool);
    if (!val || !val === 'equipshield') ig.game.myTouchButtons.searchButton('equipshield', bool);
    if (!val || !val === 'equiparmor') ig.game.myTouchButtons.searchButton('equiparmor', bool);
    if (!val || !val === 'equiparmor') ig.game.myTouchButtons.searchButton('equipItem2', bool);
    if (!val || !val === 'equiparmor') ig.game.myTouchButtons.searchButton('equipItemScrollUp', bool);
    if (!val || !val === 'equiparmor') ig.game.myTouchButtons.searchButton('equipItemScrollDown', bool);
    if (!val || !val === 'goBackequipmenu') ig.game.myTouchButtons.searchButton('goBackequipmenu', bool);
    if (!val || !val === 'special_1') ig.game.myTouchButtons.searchButton('special_1', bool);
    if (!val || !val === 'special_2') ig.game.myTouchButtons.searchButton('special_2', bool);
    if (!val || !val === 'special_3') ig.game.myTouchButtons.searchButton('special_3', bool);
   
    

}
function ClassElementsTo(bool, className) {
    if (!className) {
        ig.game.myTouchButtons.searchButton("PlayerSlashInfo", bool);
        ig.game.myTouchButtons.searchButton("ShockWaveInfo", bool);

        ig.game.myTouchButtons.searchButton("LifeSlashInfo", bool);
        ig.game.myTouchButtons.searchButton("HolyPowerInfo", bool);

        ig.game.myTouchButtons.searchButton("FrostBallInfo", bool);

        ig.game.myTouchButtons.searchButton("DemonSlashInfo", bool);
        ig.game.myTouchButtons.searchButton("BloodEnergyInfo", bool);

        ig.game.myTouchButtons.searchButton("CancelInfo", bool);
    }
    else if (className === "BLADE") {
        ig.game.myTouchButtons.searchButton("PlayerSlashInfo", bool);
        ig.game.myTouchButtons.searchButton("ShockWaveInfo", bool);
    }
    else if (className === "LIFE") {
        ig.game.myTouchButtons.searchButton("LifeSlashInfo", bool);
        ig.game.myTouchButtons.searchButton("HolyPowerInfo", bool);
    }
    else if (className === "SPELL") {
        ig.game.myTouchButtons.searchButton("FrostBallInfo", bool);
    }
    else if (className === "DEMON") {
        ig.game.myTouchButtons.searchButton("DemonSlashInfo", bool);
        ig.game.myTouchButtons.searchButton("BloodEnergyInfo", bool);
    }
    else if (className === "INFO") {
       
        ig.game.myTouchButtons.searchButton("CancelInfo", bool);
    }
    
   
    
   
   

 
} 
function MainMenuElementsTo(bool) {
  
    // ig.game.myTouchButtons.searchButton("cloudSync", bool);
    if(currentApp.licenseInformation.isTrial)ig.game.myTouchButtons.searchButton("buyApp", bool);
    ig.game.myTouchButtons.searchButton("reviewApp", bool);
    ig.game.myTouchButtons.searchButton("selectEasy", bool);
    ig.game.myTouchButtons.searchButton("selectHard", bool);
    ig.game.myTouchButtons.searchButton("selectHell", bool);
    ig.game.myTouchButtons.searchButton("selectHero", bool);


    ig.game.myTouchButtons.searchButton("backmenu", bool);
    ig.game.myTouchButtons.searchButton("selectLevel", bool);
    ig.game.myTouchButtons.searchButton("selectShopBuy", bool);
    ig.game.myTouchButtons.searchButton("selectShopSell", bool);
   
}
function FirstMainMenuElementsTo(bool) {
    //  ig.game.myTouchButtons.searchButton("continue", bool);
 //   ig.game.myTouchButtons.searchButton("cloudSync", bool);
    ig.game.myTouchButtons.searchButton("saveSlot1", bool);
    ig.game.myTouchButtons.searchButton("saveSlot2", bool);
    ig.game.myTouchButtons.searchButton("saveSlot3", bool);

    if(localStorage.getItem('SupraSave_1'))ig.game.myTouchButtons.searchButton("deleteSlot1", bool);
    if (localStorage.getItem('SupraSave_2')) ig.game.myTouchButtons.searchButton("deleteSlot2", bool);
    if (localStorage.getItem('SupraSave_3')) ig.game.myTouchButtons.searchButton("deleteSlot3", bool);
}

function levelLoader(levelName, x, y) {
    var game = ig.game;
    game.Main_Menu = false;
    game.levelSelect = false;
    game.currentLevel = levelName;
    game.itemLevel = game.checkSpecialLevel(ig.game.currentLevel);
    ig.game.myTouchButtons.removeButton("menu_musicOn");
    ig.game.setAndAlign("menu_musicOn",  0.3803 * 267, 0.3 * 160 ,0.12 * 267, 0.2 * 160, ig.game.MusicOnButton, ig.game.MusicOffButton, 3);
  
    game.a_loadLevel(ig.global[levelName], function () {
        if (game.currentLevel.indexOf('TutorialCastle') > -1) { game.spawnEntity(EntitySummonEffect, x- 8, y - 24, { flip: game.flip }); }
        game.spawnEntity(EntityPlayer, x, y- 16, { flip: game.flip });
        game.LoadStats(function () { game.saveGame(null, null, ig.game.saveSlot); }, ig.game.saveSlot);

   
    //    game.generateMiniMap("minimap", 267,160, [ig.game.backgroundMaps.length - 2]);
    });
  
   // ig.game.alignHUDButtons();
  //  ig.game.deleteLevelUp();

    
    //Load items
    HUDElementsTo(true);
    //Check if first time playing
    welcomeInvoked = (game.checkLockedLevels() >  1) ? false : true;
  
    game.minimap_Open = false;

    game.playerNormalMusic = true;
    game.LevelSelect = false;
    
}



function setPixel(imageData, x, y, r, g, b, a) {
    index = (x + y * imageData.width) * 4;
    imageData.data[index + 0] = r;
    imageData.data[index + 1] = g;
    imageData.data[index + 2] = b;
    imageData.data[index + 3] = a;
}
function resumeMusic() {

    ig.music.play();
}
function scaleFunc() {
    var gameCanvas = document.getElementById('canvas');
    var newWidth = window.innerWidth;
    var newHeight = window.innerHeight;
    var newWidthToHeight = newWidth / newHeight;
    var widthToHeight = 400 / 240;

    //check if ratio is 16:9
    if (newWidthToHeight > widthToHeight) {
        newWidth = newHeight * widthToHeight;

    } else {
        newHeight = newWidth / widthToHeight;

    }
    var scalingVar = newWidth / 400;
    scalingVar = Math.floor(scalingVar);
    var ctx = gameCanvas.getContext("2d");

    ctx.scale(scalingVar, scalingVar);


    //Scale the rest to CSS minimap fix


    gameCanvas.style.height = newHeight + 'px';
    gameCanvas.style.width = newWidth + 'px';
    marginBuffer_left = (window.innerWidth - newWidth);
    marginBuffer_left = (newWidth / 2 + marginBuffer_left);
    gameCanvas.style.left = marginBuffer_left + 'px';

    marginBuffer_top = (window.innerHeight - newHeight);

    //marginBuffer_top = (newHeight / 2 + (marginBuffer_top * 1.5));
    gameCanvas.style.top = marginBuffer_top + 'px';


}