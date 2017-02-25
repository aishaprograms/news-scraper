// Scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Requiring our Comment and Article models
var Comment = require("../models/Comment.js");
var Article = require("../models/Article.js");

// ROUTES
module.exports = function (app) {

    // This will get the articles we scraped from the mongoDB
    app.get("/", function (req, res) {
        // Grab every doc in the Articles array
        Article.find({}, function (error, doc) {
            // Log any errors
            if (error) {
                console.log(error);
            }
            // Or render the articles hbs template
            else {
                res.render("articles", {
                    article: doc
                });
            }
        });
    });

    // A GET request to scrape the Hacker News website
    app.get("/scrape", function (req, res) {
        // Make a request for the news section of ycombinator
        request("http://huffingtonpost.com/section/travel", function (error, response, html) {
            // Load the html body from request into cheerio
            var $ = cheerio.load(html);
            // For each element with a "title" class
            $(".card__headlines").each(function (index, element) {
                // skip the first card because it is a topics card
                if (index !== 0) {
                    // Save the text of each link enclosed in the current element
                    var title = $(this).children("h2").text();
                    // Save the href value of each link enclosed in the current element
                    var link = $(this).children("h2").children("a").attr("href");
                    // If this title element had both a title and a link
                    if (title && link) {
                        // Save an empty result object
                        var result = {};
                        // Add the text and href of every link, and save them as properties of the result object
                        result.title = title;
                        result.link = link;
                        // Using our Article model, create a new entry
                        Article.create(result, function (err, document) {
                            // Log any errors
                            if (err) {
                                console.log(err);
                            }
                            // Or log the document
                            else {
                                console.log(document);
                            }
                        });
                    }
                }
            });
        });
        res.redirect('/');
    });

    // Grab an article by it's ObjectId
    app.get("/:id", function (req, res) {
        // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
        Article.findOne({
                "_id": req.params.id
            })
            // ..and populate all of the comments associated with it
            .populate("comment")
            // now, execute our query
            .exec(function (error, doc) {
                // Log any errors
                if (error) {
                    console.log(error);
                } else {
                    res.render("comments", {
                        article: doc
                    });
                }
            });
    });


    // Create a new comment or replace a00n existing comment
    app.post("/:id", function (req, res) {
        // Create a new Comment and pass the req.body to the entry
        Comment.create(req.body, function (error, doc) {
            // Log any errors
            if (error) {
                console.log(error);
            }
            // Otherwise
            else {
                console.log(doc);
                // Use the article id to find and update it's Comment
                Article.findOneAndUpdate({
                        "_id": req.params.id
                    }, {
                        $push: {
                            "comment": doc._id
                        }
                    }, {
                        safe: true,
                        upsert: true,
                        new: true
                    })
                    // Execute the above query
                    .exec(function (err, doc) {
                        // Log any errors
                        if (err) {
                            console.log(err);
                        } else {
                            // reload current page
                            var loc = req.params.id;
                            res.redirect('/' + loc);
                        }
                    });
            }
        });
    });

    app.delete("/:id/:comment", function (req, res) {
        Comment.findByIdAndRemove(req.params.comment, function (error, doc) {
            // Log any errors
            if (error) {
                console.log(error);
            }
            // Otherwise
            else {
                console.log(doc);
                // Use the article id to find and update it's Comment
                Article.findOneAndUpdate({
                        "_id": req.params.id
                    }, {
                        $pull: {
                            "comment": doc._id
                        }
                    })
                    // Execute the above query
                    .exec(function (err, doc) {
                        // Log any errors
                        if (err) {
                            console.log(err);
                        } 
                    });
            }
        });
    });

}