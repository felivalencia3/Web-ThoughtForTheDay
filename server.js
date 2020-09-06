/*const express = require("express");
const app = express();
const rp = require("request-promise");
const cheerio = require("cheerio");
const url = 'https://en.wikipedia.org/wiki/Special:Random';
*/
const express = require("express")
    , app = express()
    , rp = require("request-promise")
    , cheerio = require("cheerio")
    , url = 'https://en.wikipedia.org/wiki/Special:Random'
    , name_generator = "https://www.name-generator.org.uk/quick/";

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/random", (req,res,next) => {
    rp(url)
        .then(function(html){
            //console.log("Title: \t"+cheerio(".firstHeading",html).text());
            //console.log("Read More at: \t"+"https://en.wikipedia.org"+cheerio("#t-permalink > a", html).attr("href"));
            const articleInfo = cheerio("#bodyContent > div > div > p", html).text()
            const articleTitle = cheerio(".firstHeading",html).text()
                ,articleLink = "https://en.wikipedia.org"+cheerio("#t-permalink > a", html).attr("href")
                , final = {
                title: articleTitle,
                info: articleInfo,
                url: articleLink
            };
            res.send(final)

        })
        .catch(function(err){
            console.log("You messed up right around Here:");
            console.error(err)
        });


});
app.get("/name", (req,res) => {
    rp(name_generator)
        .then(function(html){
            //console.log("Title: \t"+cheerio(".firstHeading",html).text());
            //console.log("Read More at: \t"+"https://en.wikipedia.org"+cheerio("#t-permalink > a", html).attr("href"));
            const names = cheerio(".name_heading", html);
            const nameArray = []
            for (let i = 0; i < 10; i++) {
                let foo = names.eq(i).text();
                nameArray.push(foo)
            }
            console.log(nameArray);
            res.send(nameArray)
        })
        .catch(function(err){
            console.log("You messed up right around Here:");
            console.error(err)
        });
});
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)

});