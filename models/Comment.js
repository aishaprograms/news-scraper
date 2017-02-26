// Require mongoose
var mongoose = require("mongoose");
// Create a schema object contructor
var Schema = mongoose.Schema;

// Create the Comment schema
var CommentSchema = new Schema({
  // name of commentor is required string
  name: {
    type: String,
    required: true
  },
  // body is required string
  body: {
    type: String,
    required: true
  }
});

// Create the Comment model with the CommentSchema
var Comment = mongoose.model("Comment", CommentSchema);

// Export the Comment model
module.exports = Comment;
