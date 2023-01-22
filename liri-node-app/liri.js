//code to read and set any environment variables with the dotenv package
const DotEnv = require("dotenv").config();
const Spotify = require('node-spotify-api');
const keys = require("./keys.js");
const request = require('request');
const moment = require("moment");
const fs = require('fs');

//var search = process.argv.splice(3).join(" ");

var spotify = new Spotify(keys.spotify);

var spotSearch = function(search){
    spotify.search({
        type: 'track',
        query: search
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        for (let i = 0; i < data.tracks.items.length; i++) {
            console.log("========================================");
            console.log("Artist: " + data.tracks.items[i].artists[0].name);
            console.log("Song: " + data.tracks.items[i].name);
            console.log("Album: " + data.tracks.items[i].album.name);
            console.log("Preview: " + data.tracks.items[i].external_urls.spotify);
            console.log("========================================");
        }
    });
}

var omdbSearch = function(search){
    request("http://www.omdbapi.com/?apikey=" + keys.omdb + "&t=" + search, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("========================================");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("RT Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Language: " + JSON.parse(body).Language);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("========================================");
        }
    });
}

var bitSearch = function(search){
    request("https://rest.bandsintown.com/artists/" + search + "/events?app_id=codingbootcamp", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            for (let i = 0; i < JSON.parse(body).length; i++) {
                console.log("========================================");
                console.log("Venue: " + JSON.parse(body)[i].venue.name);
                console.log("Location: " + JSON.parse(body)[i].venue.city);
                console.log("Date: " + moment(JSON.parse(body)[i].datetime).format("MM/DD/YYYY"));
                console.log("========================================");
            }
        }
    })
}

var justDoIt = function(){
    fs.readFile("./random.txt", "utf8", function (error, data) {
        if (!error) {
            var format = data.split(',');
            if (format.length == 2) {
                choice(format[0], format[1]);
            } else if (format.length == 1){
                choice(format[0]);
            }
        }
    });
}

var choice = function(searchParam, funcParam){
    switch(searchParam){
        case "spotify-this-song":
            spotSearch(funcParam);
            break;
        case "movie-this":
            omdbSearch(funcParam);
            break;
        case "concert-this":
            bitSearch(funcParam);
            break;
        case "do-what-it-says":
            justDoIt(funcParam);
            break;
        default:
            console.log('I have no idea what you are trying to do...');
        
    }
}

var runSwitch = function(a, b){
    choice(a, b);
    var text = a + " " + b + "\n";
    fs.appendFile("log.txt", text, function(err){
        if (err){
            console.log(err);
        }
    })
};
runSwitch(process.argv[2], process.argv.splice(3).join(" "));