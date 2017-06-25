 var config = {
    apiKey: "AIzaSyBxEI7_WT-djtP2KiG2e0BeZ_uhGZUg7LI",
    authDomain: "train-schedule-78c55.firebaseapp.com",
    databaseURL: "https://train-schedule-78c55.firebaseio.com",
    projectId: "train-schedule-78c55",
    storageBucket: "train-schedule-78c55.appspot.com",
    messagingSenderId: "106860155139"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

// Button for adding Employees

$("#submitButton").on("click", function(event) {
  event.preventDefault();
  // Grabs user input
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var frequency = moment($("#frequencyInput").val().trim(), "DD/MM/YY").format("X");
  var firstTrain = moment($("#firstTrainInput").val().trim(), "DD/MM/YY").format("X");
  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    trainDestination: destination,
    freq: frequency,
    fTrain: firstTrain,
  };
  // Uploads train data to the database
  database.ref().push(newTrain);
  // Clears all of the text-boxes
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#frequencyInput").val("");
  $("#firstTrainInput").val("");
});
// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
  console.log(childSnapshot.val());
  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().trainDestination;
  var frequency = childSnapshot.val().freq;
  var firstTrain = childSnapshot.val().fTrain;
  // Train Info in the console log.
  console.log(trainName);
  console.log(destination);
  console.log(frequency);
  console.log(firstTrain);
  // Prettify the employee start
  // var empStartPretty = moment.unix(empStart).format("MM/DD/YY");
  // // Calculate the months worked using hardcore math
  // // To calculate the months worked
  // var empMonths = moment().diff(moment.unix(empStart, "X"), "months");
  // console.log(empMonths);
  // // Calculate the total billed rate
  // var empBilled = empMonths * empRate;
  // console.log(empBilled);
  // Add each train's data into the table
  $("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  frequency);
});