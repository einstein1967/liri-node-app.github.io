# liri-node-app.github.io

This code will take input from the user and look up information on concerts, movies, or a song on Spotify. The last bit if functionality will read from a text file and run the above searches based on the contents of that file.

The commands to enter are 'concert-this', 'movie-this, 'spotify-this-song', and 'do-what-it-says'. The first three should be followed by a music artist, movie, or song respectively. The last command needs nothing else entered by the user.

Axios, moment, and Spotify npm's are used and the API keys are protected.

The Spotify portion of the program is duplicated because I was having issues with the spotify.search function somehow being unrecognized.