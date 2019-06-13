require("dotenv").config();
var axios = require("axios");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var userInput = process.argv;
var command = userInput[2];
var name = "";

for (var i=3; i<userInput.length; i++) {
    name += userInput[i] + " ";
}
console.log(name);

if (command === 'concert-this') {
    
}

if (command === 'movie-this') {
    axios.get("http://www.omdbapi.com/?t=" + name + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            // console.log(resonse);
            console.log("The movie's rating is: " + response.data.imdbRating);
        })
}


// break;
//     case 'spotify-this-song':
// //code
// break;
//     case 'movie-this':
// axios.get('http://www.omdbapi.com/?t=remember+the+titans&y=&plot=short&apikey=trilogy').then(
//     function (response) {
//         console.log("The movie's rating is: " + response.data.imdbRating);
//     });
// break;
//     case 'do-what-it-says':
// //code
// break;

// .catch (function(error) {
//     console.log(error)
// });
