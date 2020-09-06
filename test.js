const rp = require("request-promise");
const cheerio = require("cheerio");
const url = 'https://en.wikipedia.org/wiki/Special:Random';

rp(url)
    .then(function(html){
        console.log("Title: \t"+cheerio(".firstHeading",html).text());
        const pageInfo = cheerio("#bodyContent > div > div > p", html).text()
        console.log("Extract: \t"+pageInfo)
        console.log("Read More at: \t"+"https://en.wikipedia.org"+cheerio("#t-permalink > a", html).attr("href"));
    })
    .catch(function(err){
        console.log("You messed up right around Here:");
        console.error(err)
    });

