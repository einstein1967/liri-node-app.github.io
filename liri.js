require("dotenv").config();
var moment = require("moment");
var axios = require("axios");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var fs = require("fs");
var spotify = new Spotify(keys.spotify);
var userInput = process.argv;
var command = userInput[2];
var name = "";
var sort = true;

for (var i = 3; i < userInput.length; i++) {
    name += userInput[i] + " ";
}
name = name.trim();

var concert = function () {
    var nameUrl = "https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp"
    axios.get(nameUrl).then(function (response) {
        console.log("Venue: " + response.data[0].venue.name + ".");
        console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.country + ".");
        console.log("Date: " + moment(response.data[0].datetime).format('MM DD YYYY'));
    })
        .catch(function (error) {
            console.log("error", error);
        });
}

var movie = function () {
    if (name === "") {
        name = 'Mr. Nobody';
    };
    axios.get("http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            // console.log(response);
            console.log("Title: " + response.data.Title);
            console.log("Release date: " + response.data.Released);
            console.log("IMDB rating: " + response.data.imdbRating);
            console.log("Country where produced: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        })
        .catch(function (error) {
            console.log("error", error);
        });
};

var justDoIt = function () {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }
        console.log(data);
        var dataArr = data.split(",");
        console.log(dataArr);
        command = dataArr[0];
        name = dataArr[1];
        if (command === 'spotify-this-song') {
            if (name === "") {
                name = 'The Sign';
            };
            spotify.search({ type: 'track', query: name }, function (err, response) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                // console.log(response.tracks.items[0].album);
                console.log("Artist(s): " + response.tracks.items[0].artists[0].name);
                console.log("Song name: " + response.tracks.items[0].name);
                console.log("Preview link: " + response.tracks.items[0].preview_url);
                console.log("Album: " + response.tracks.items[0].album);
                sort = false;
            });
        } else {
            sort = false;
            sortItOut();
        }
    });
}

if (sort) {
    sortItOut();
}

var sortItOut = function () {
    switch (command) {
        case 'concert-this':
            concert();
            break;

        case 'movie-this':
            movie();
            break;

        case 'do-what-it-says':
            justDoIt();
            break;
    };
};

if (command === 'spotify-this-song') {
    if (name === "") {
        name = 'The Sign';
    };
    spotify.search({ type: 'track', query: name }, function (err, response) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(response.tracks.items[0].album);
        console.log("Artist(s): " + response.tracks.items[0].artists[0].name);
        console.log("Song name: " + response.tracks.items[0].name);
        console.log("Preview link: " + response.tracks.items[0].preview_url);
        console.log("Album: " + response.tracks.items[0].album);
    });
}