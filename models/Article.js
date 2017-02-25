// Require mongoose
var mongoose = require("mongoose");
// Create Schema object constructor
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({
  // title is a required string
  title: {
    type: String,
    required: true,
    unique: true
  },
  // link is a required string; must be unique
  link: {
    type: String,
    required: true,
    unique: true
  },
  // This only saves one note's ObjectId, ref refers to the Comment model
  comment: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
