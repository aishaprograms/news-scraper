// Dependencies
var express = require("express");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Using es6 promise
mongoose.Promise = Promise;

// Initialize Express
var app = express();
var PORT = process.env.PORT || 8000;

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Define handlesbars engine
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main'
}));
// Set handlebars engine
app.set('view engine', 'handlebars');

// Make public a static directory
app.use(express.static("public"));

// Database configuration with mongoose
mongoose.connect("mongodb://heroku_755258rk:ae4o5th3lnc482b5q89aj1616c@ds161109.mlab.com:61109/heroku_755258rk");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function (error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function () {
  console.log("Mongoose connection successful.");
});

// Require the routes in controllers
require("./controllers/articles_controller.js")(app);

// Listen on PORT
app.listen(PORT, function () {
  console.log("App running on port: " + PORT);
});