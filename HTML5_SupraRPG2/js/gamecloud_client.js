/* Under work, will be finished later when the documentation is complete
 */


/*
function getData(callback) {
    //  ig.allowedToWorkWithNewData = false;
    var queryJSON = {callType: callType, authkey: "authkey"};
    $.post("http://ec2-54-220-223-184.eu-west-1.compute.amazonaws.com:8080", JSON.stringify(queryJSON), function (json_packet, textStatus, jqXHR) {

        //getData(data, function(json_packet){
        //Do something with the data received
        if (data === null) {
            callback(null);
        }
        else {
           
            callback(data);
        }
    });
}*/
/*

    SendUser_Data: function (data_type, data) {

        switch(data_type)
        {
            case 'send_achievement':
                data.type = 'addAchievement';
                sendData(data, playerID, function(){

                        case "createAchievement":

                        console.log("callType:" + json_packet["callType"]);
                        console.log("authkey:" + json_packet["authkey"]);
                        console.log("name:" + json_packet["name"]);
                        console.log("gameName:" + json_packet["gameName"]);
                        console.log("achievementType:" + json_packet["achievementType"]);
                        console.log("comment:" + json_packet["comment"]);

                        // Process it
                        ProcessAtMediator(json_packet, callback);


                        break;
                        case "createItem":

                        console.log("callType:" + json_packet["callType"]);
                        console.log("authkey:" + json_packet["authkey"]);
                        console.log("gameName:" + json_packet["gameName"]);
                        console.log("name:" + json_packet["name"]);
                        console.log("itemType:" + json_packet["itemType"]);
                        console.log("comment:" + json_packet["comment"]);

                        // Process it
                        ProcessAtMediator(json_packet, callback);

                        break;
                        case "createEvent":

                        console.log("callType:" + json_packet["callType"]);
                        console.log("authkey:" + json_packet["authkey"]);
                        console.log("gameName:" + json_packet["gameName"]);
                        console.log("name:" + json_packet["name"]);
                        console.log("eventType:" + json_packet["eventType"]);
                        console.log("comment:" + json_packet["comment"]);

                        // OKay, create the event

                        // Send the information to mediator for processing
                        mediator.Process(json_packet, function(err, result) {

                            // Once done, return the information
                            callback(null, result);

                        });

                        break;
                        case "createGame":
                        jsonvalid.validateGameSchema(json_packet, function(valid) {
                            if(valid.hasOwnProperty("valid")){
                                if(valid["valid"]){
                                    console.log("callType:" + json_packet["callType"]);
                                    console.log("authkey:" + json_packet["authkey"]);
                                    console.log("name:" + json_packet["name"]);
                                    console.log("genre:" + json_packet["genre"]);
                                    console.log("releaseDate:" + json_packet["releaseDate"]);
                                    console.log("comment:" + json_packet["comment"]);
                                    console.log("creator:" + json_packet["creator"]);

                                    // LETS CREATE A GAME! REALLY! REALLY! WE WILL!
                                    // <----------------------------->>>>>>>>>>>

                                    // Send the information to mediator for processing
                                    mediator.Process(json_packet, function(err, result) {



                                        // Once done, return the information
                                        callback(null, result);


                                    });



                                }
                            }
                        });
                        break;
                        break;



                    },
                    // Error callback
                    function (jqXHR, textStatus, errorThrown) {
                        console.log(jqXHR);
                        console.log(textStatus);
                        console.log(errorThrown);
                        callbackRetData(null);
                        // TODO: Do more fancy stuff here
                        // wizard.submitError(); // display the error card
                    });

        }
        function sendData(json_packet, authkey,  callback) {

            $.post("http://ec2-54-220-223-184.eu-west-1.compute.amazonaws.com:8080", JSON.stringify(json_packet), function (data, textStatus, jqXHR) {

                    callbackRetData(data);

                    // How to parse the data ** Will be parsed in front-end
                    //achievement_name = data.entries[i].achievement.split('#', 2);
                },
                // Error callback
                function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                    callbackRetData(null);
                    // TODO: Do more fancy stuff here
                    // wizard.submitError(); // display the error card
                });


        }*/