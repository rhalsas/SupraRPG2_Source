// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;
 
    app.onactivated = function (args) {
        
       
        
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
                app.onsettings = function (args) {
                    args.detail.applicationcommands = {
                        "priv": {
                            title: "Privacy Policy", href: "/privacy.html"
                        }
                    };
                    WinJS.UI.SettingsFlyout.populateSettings(args);
                };
            }
           
            else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
           
               

            }
           
         
        }
        if (args.detail.kind == activation.ActivationKind.webAuthenticationBrokerContinuation) {

            //  client.login(
          //  loginLogic(args.detail.webAuthenticationResult.responseData);
          
            
        }
        console.log(args, "täs mä");
        args.setPromise(WinJS.UI.processAll());
    };
    
    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
        console.log("hup");
    };
   
    app.start();
  
})();
/*
function responseParser(data) {
    //data = data.replace('}', "");
   // data.concat('"}');
    data = decodeURIComponent(data);

    var bufSpot = data.indexOf('{"user"');
    if (bufSpot < 0) return null;
    data = data.substring(bufSpot, data.length);
   
    data = data.replace(/%3A/g, ":").replace(/%2C/g, ",");


    data = JSON.parse(data);

   
    return data;

}
function loginLogic(data) {
  
    loginToken = data;
          // After logging in

    loginToken = responseParser(loginToken);
    if (loginToken) {
        client.currentUser = loginToken.user;

        client.currentUser.mobileServiceAuthenticationToken = loginToken.authenticationToken;
        sessionStorage.loggedInUser = JSON.stringify(client.currentUser);

        CloudSyncOn = true;
        refreshAuthDisplay();
      
        //take oauth response and continue login process
        //  client.login(args.detail.webAuthenticationResult);
    }
    else {
        //login failed
    }
}

function alert(message) {

    var msgBox = new Windows.UI.Popups.MessageDialog(message);

    msgBox.showAsync();

}*/