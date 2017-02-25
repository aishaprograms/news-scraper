// Require mongoose
var mongoose = require("mongoose");
// Create a schema object contructor
var Schema = mongoose.Schema;

// Create the Comment schema
var CommentSchema = new Schema({
  // Just a required string
  name: {
    type: String,
    required: true
  },
  // Just a required string
  body: {
    type: String,
    required: true
  }
});

// Create the Comment model with the CommentSchema
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Comment model
module.exports = Comment;
