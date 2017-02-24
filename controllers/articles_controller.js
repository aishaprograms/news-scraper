// Scraping tools
var request = require("request");
var cheerio = require("cheerio");
// Requiring our Comment and Article models
var Comment = require("../models/Comment.js");
var Article = require("../models/Article.js");

// ROUTES
module.exports = function (app) {
    // A GET request to scrape the Hacker News website
    app.get("/scrape", function (req, res) {
        // Make a request for the news section of ycombinator
        request("https://news.ycombinator.com/", function (error, response, html) {
            // Load the html body from request into cheerio
            var $ = cheerio.load(html);
            // For each element with a "title" class
            $(".title").each(function (i, element) {
                // Save the text of each link enclosed in the current element
                var title = $(this).children("a").text();
                // Save the href value of each link enclosed in the current element
                var link = $(this).children("a").attr("href");

                // If this title element had both a title and a link
                if (title && link) {

                    // Save an empty result object
                    var result = {};
                    // Add the text and href of every link, and save them as properties of the result object
                    result.title = $(this).children("a").text();
                    result.link = $(this).children("a").attr("href");
                    // Using our Article model, create a new entry
                    // This effectively passes the result object to the entry (and the title and link)
                    var entry = new Article(result);
                    // Now, save that entry to the db
                    entry.save(function (err, document) {
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
            });
        });
        // Tell the browser that we finished scraping the text
        res.send("Scrape Complete");
    });

    // This will get the articles we scraped from the mongoDB
    app.get("/articles", function (req, res) {
        // Grab every doc in the Articles array
        Article.find({}, function (error, doc) {
            // Log any errors
            if (error) {
                console.log(error);
            }
            // Or send the doc to the browser as a json object
            else {
                res.json(doc);
            }
        });
    });
}