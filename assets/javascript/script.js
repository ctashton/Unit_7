 // Initialize Firebase
var config = {
    apiKey: "AIzaSyAwo-xrM1ERIkYwXGs2o_-P1VKE_tSXgSc",
    authDomain: "traintimes-2ad62.firebaseapp.com",
    databaseURL: "https://traintimes-2ad62.firebaseio.com",
    projectId: "traintimes-2ad62",
    storageBucket: "traintimes-2ad62.appspot.com",
    messagingSenderId: "188043617848"
  };
  firebase.initializeApp(config);

var database = firebase.database();
// Initial Values
var name = "";
var destination = "";
var firstTime = 0;
var frequency = "";

// Capture Button Click
$("#submit").on("click", function(event) {
    // Don't refresh the page!
    event.preventDefault();
    // grab user input
    name = $("#name-input").val().trim();
    destination= $("#dest-input").val().trim();
    frequency = $("#freq-input").val().trim();
    firstTime = $("#firstTime-input").val().trim();

    var newTrain = {
        name: name,
        destination: destination,
        firstTime: firstTime,
        frequency: frequency
    }

    database.ref().push(newTrain);
    console.log(newTrain.name)
    console.log(newTrain.destination)
    console.log(newTrain.firstTime)
    console.log(newTrain.frequency)

    $("#name-input").val("");
    $("#dest-input").val("");
    $("#freq-input").val("");
    $("#firstTime-input").val("");
  

});

database.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val())
    var name = childSnapshot.val().name;
    var destination= childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var firstTime = childSnapshot.val().firstTime;

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted)

    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("hh:mm"));

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("difference in Time: " + diffTime);
    
    var tRemainder = diffTime%frequency
    console.log(tRemainder);

    var minutesTillTrain = frequency - tRemainder;
    console.log("Minutes till train: " + minutesTillTrain)

    var nextTrain = moment().add(minutesTillTrain, "minutes");
    console.log("Arrival Time:" + moment(nextTrain).format("hh:mm"));

    var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(minutesTillTrain),
    );

    $("tbody").append(newRow);
    
});