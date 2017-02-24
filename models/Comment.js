// Require mongoose
var mongoose = require("mongoose");
// Create a schema object contructor
var Schema = mongoose.Schema;

// Create the Comment schema
var CommentSchema = new Schema({
  // Just a string
  title: {
    type: String
  },
  // Just a string
  body: {
    type: String
  }
});

// Create the Comment model with the CommentSchema
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Comment model
module.exports = Comment;
