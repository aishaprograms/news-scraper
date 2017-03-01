# news-scraper
This is a web app that lets users leave comments on the latest news. It uses Mongoose and Cheerio to scrape news from another site.

## Technologies used
- Node.js
- Express
- cheerio
- request
- handlebars
- mongodb
- mongoose
- mongolab

## Getting Started
Visit the Heroku app:

* **Wanderlust Daily** - [Wanderlust Daily](https://lit-journey-52664.herokuapp.com/)

## Updates
02/28/2017: New articles are added to the top of the list instead of the bottom. The list is sorted by object id in a descending order.

## Understand
Whenever a user visits this site, the app will scrape stories from [HuffPost Travel](http://www.huffingtonpost.com/section/travel). The data scraped includes the title and the link. This app uses Cheerio to grab the site content and Mongoose to save it to the MongoDB database. There are no duplicates and the database doesn't get cleared at any point.
All users can leave comments on the articles. They are also allowed to delete whatever comments associated with an article (that is, until authentication is required on this site). All stored comments are visible to every user.

## Screenshots
![Screenshot of home page](/img/home.png)
![Screenshot of pre comment page](/img/pre-comment.png)
![Screenshot of post comment page](/img/post-comment.png)

## Default test (included in package.json file)

The default test to run the local server is
```
node server.js
```

## Built With

* SublimeText

## Authors

* **Aisha Ahmad** - [Aisha Ahmad](https://github.com/aishaprograms)
