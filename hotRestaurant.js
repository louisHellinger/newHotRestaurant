// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");

var fs = require("fs");

//like FS part of Node

var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Star Wars Characters (DATA)
// =============================================================
var reservations = [];

var waitlist = [];


// Routes
// =============================================================

// routes to pages
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function(req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

// Get all characters
app.get("/allReservations", function(req, res) {
    res.json(reservations);
});

app.get("/waitlist", function(req, res) {
    res.json(waitlist);
});






// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:reservationView?", function(req, res) {
    var chosen = req.params.reservationView;

    if (chosen) {
        console.log(chosen);

        for (var i = 0; i < reservations.length; i++) {
            if (chosen === reservations[i].id) {
                return res.json(reservations[i]);
            }
        }
        return res.json(false);
    }
    return res.json(reservations);
});

// Create New Reservation - takes in JSON input
app.post("/api/tables", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body-parser middleware

    // regex /s+ means spaces, + means multiple spaces. /g means globally, in case there are multiple words with spaces

    var newReservation = req.body;

    console.log(newReservation);

    if (reservations.length<5) {
    reservations.push(newReservation);

    console.log(reservations);

    res.json(newReservation);

  } else {

    waitlist.push(newReservation);
  }

    // for (var i =0; i<reservations.length; i++) {

    // fs.appendFile("reservationLog.json", reservations[i], function(err) {
    //    if (err) throw err;
    //       console.log("this works");

    // });

    // }

});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});