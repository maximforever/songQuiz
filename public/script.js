var BAND_NAME = "panic! at the disco";
var QUIZ_TIME = 120;              // seconds
var PHOTO_COUNT = 3;             

var songsInThisQuiz = [];

var app = new Vue({
    el: "#main-app",
    data: {
        band: null,
        quizStarted: false,
        endTime: 0,
        timeLeft: QUIZ_TIME,
        allSongs: null,
        currentSong: null,
        correctGuesses: 0,
        completedGuesses: 0,
        currentSongCounter: 0,
        interval: null,
        difficulty: {
            regular: true,
            hard: false
        },
        albums: null,
        leaderboard: {
            name: "",
            invite: false,
            nameSubmitted: false,
            display: false,
            currentLeaderboard: null,
            error: ""
        },
        songStats: {
            display: false,
            data: null
        },
        coffeeHover: false
    },
    mounted: function(){

        var self = this;

        document.addEventListener("keydown", function(e){
            if(self.quizStarted && !isNaN(self.timeLeft) && self.timeLeft > 0 && e.which >= 49 && e.which <=52){

                var thisChoice = document.getElementById("option-" + (e.which - 49 + 1)).innerText; 
                self.submitChoice(thisChoice);


            }
        });
    },

    computed: {
        timeStillRemaining(){
            if(this.timeLeft == null || parseInt(this.timeLeft) > 0){
                return true;
            } else {
                return false;
            }
        },
        getAccuracy(){
            var accuracy = Math.floor(this.correctGuesses / this.completedGuesses * 10000)/100;
            if(isNaN(accuracy)){ accuracy = 0 }
            return accuracy;
        },
        formattedTime(){

            var time = this.timeLeft;

            if(typeof(time) == "number"){
                var mins = Math.floor(time/60);
                var seconds = (time - mins*60);

                if(seconds < 10){
                    seconds = "0" + seconds.toString();
                }

                return `${mins}:${seconds}`;

            } else {
                return time;
            }
        },

        noAlbumsSelected(){

            for(var key in this.albums){
                if(this.albums[key].on){
                    return false;
                }
            }

            return true;
        
        },

        thereIsALeaderboardError(){


            var allowedCharacters = "abcdefghijklmnopqrstuvwxyz1234567890";

            this.leaderboard.error = "";

            var self = this;
            var name = this.leaderboard.name;

            var profanity = ["fuck", "cock", "cunt", "nigger", "pussy", "bitch", "asswipe", "ballsack", "bitch", "blowjob", "clit", "clitoris", "cock", "coon", "cunt", "cum", "dick", "dildo", "dyke", "fag", "felching", "fuck", "fucking", "fucker", "fucktard", "fuckface", "fudgepacker", "fudge packer", "flange", "jizz", "pussy", "smegma", "spunk", "tosser", "turd", "twat", "vagina", "wank"];

            for(var i = 0; i < name.length; i++){
                if(allowedCharacters.indexOf(name[i].toLowerCase()) == "-1"){
                    self.leaderboard.error = "Please only use letters and numbers";
                }
            }

            if(name == null || name.trim().length == 0){
                self.leaderboard.error = "Please enter a name";
            }

            for(var j = 0; j < profanity.length; j++){
                if(name.indexOf(profanity[j]) != "-1"){
                    self.leaderboard.error = "That's not very nice";
                }
            }

            if(name.indexOf(" ") != "-1"){
                self.leaderboard.error = "No spaces in you name, please!";
            }

            if(name.length > 16){
                self.leaderboard.error = "Name must be under 16 characters";
            }

            return (this.leaderboard.error.trim().length) ? true : false;      // 0 == false       <3 JS

            
        }
    },
    methods: {
        createNewQuestion(){

            var selectedSong = songsInThisQuiz[this.currentSongCounter];
            this.currentSongCounter++;

            if(this.currentSongCounter >= songsInThisQuiz.length){
                this.endGame("You guessed 'em all!");
            }

            var lyricsSnippet = getLyricsSnippet(selectedSong);

            this.currentSong = {
                lyrics: lyricsSnippet,
                name: selectedSong.name,
                correct: false,
                incorrect: false,
                guess: "",
                choices: []
            };

            tempChoices = [];
            tempChoices.push(selectedSong.name);


            var tryCount = 0;

            // get a 3 other random song names
            while(tempChoices.length < 4 && tryCount < 1000){
                var randomIndex = Math.floor(Math.random()*this.allSongs.length);
                var randomSong = this.allSongs[randomIndex].name;

                if(tempChoices.indexOf(randomSong) == -1){
                    tempChoices.push(randomSong);
                }

                if(tryCount >= 999){
                    this.endGame("Something went wrong. Sorry!")
                }
            }

            this.currentSong.choices = shuffle(tempChoices);

        },
        submitChoice(choice){

            // if we've already submitted a song, no need to do anything else
            if(this.currentSong.correct || this.currentSong.incorrect){
                return;
            }

            this.completedGuesses++;

            var self = this;
            this.currentSong.guess = choice;

            if(this.currentSong.name == choice){
                this.correctGuesses++;
                this.currentSong.correct = true;
                recordSongGuess(this.band, choice.toLowerCase(), "correct");
            } else {
                recordSongGuess(this.band, this.currentSong.name.toLowerCase(), "incorrect");

                this.currentSong.incorrect = true;
            }

            setTimeout(function(){
                self.createNewQuestion();
            }, 1000)
            
        },
        songIsCorrect(choice){

            if(this.currentSong.correct && this.currentSong.guess == choice){
                return true;   
            }

        },
        songIsIncorrect(choice){

            if(this.currentSong.incorrect && this.currentSong.guess == choice){
                return true;   
            }
        },
        displayCorrectAnswer(choice){
            if(this.currentSong.guess && this.currentSong.name == choice){
                return true;
            }

        },
        selectAlbum(album){
            this.albums[album].on = (this.albums[album].on) ? false : true;
        },
        startQuiz(){

            var self = this;

            // build a subset of songs in the selected albums;
            songsInThisQuiz = [];
            var filteredSongs = this.allSongs.filter(function(song){
                return self.albums[song.album].on;
            })



            // make deep copies of the song objects
            for(var i = 0; i < filteredSongs.length; i++){
                var newSongCopy = JSON.parse(JSON.stringify(filteredSongs[i]));
                newSongCopy.correct = false;
                newSongCopy.incorrect = false;
                newSongCopy.done = false;

                songsInThisQuiz.push(newSongCopy);
            }
 
            songsInThisQuiz = shuffle(songsInThisQuiz);

            this.quizStarted = true;
            this.endTime = Date.now() + 1000 * QUIZ_TIME;
            this.createNewQuestion();

            this.interval = setInterval(function(){
                var timeNow = Date.now();
                var secondsLeft = Math.floor((self.endTime - timeNow)/1000);

                self.timeLeft = secondsLeft;

                if(self.timeLeft <= 0 ){
                    self.endGame("YOUR TIME IS NOW");
                }
            }, 1000)
        },
        playAgain(){

            console.log("resetting");

            setBackground(this.band);
            songsInThisQuiz = [];

            this.inteval = null;
            this.quizStarted = false;
            this.endTime = 0;
            this.timeLeft = null;
            this.currentSong = null;
            this.currentSongCounter = 0;
            this.correctGuesses = 0;
            this.completedGuesses = 0;

        },
        optionId(id){
            return "option-" + id;
        },
        endGame(message){
            clearInterval(this.interval);
            this.timeLeft = message;
            var self = this;
            document.getElementById("time-left").innerText = message;


            submitQuizResults(this.completedGuesses, this.correctGuesses, this.band);


            getCurrentLeaderboard(this.band, function(response){

                if(response != "error"){

                    // response should be current leaderboard;
                    self.leaderboard.currentLeaderboard = response;
                    
                    for(var i = 0; i < response.length; i++){
                        if(self.correctGuesses > response[i].score){
                            // if this score beats one in the leaderboard, we invite you to add your name to the leaderboard
                            self.leaderboard.invite = true;
                            break; 
                        }
                    }

                }
            })

        },
        submitLeaderboardName(){
            var name = this.leaderboard.name;

            var self = this;
            if(this.leaderboard.invite){
                addToLeaderboard(self.leaderboard, self.correctGuesses, self.band, function(response){
                    
                    if(response != "error"){
                        console.log(response);
                        self.leaderboard.currentLeaderboard = response;
                        self.leaderboard.invite = false;
                        self.leaderboard.display = true;
                        self.leaderboard.nameSubmitted = true;
                    } else {
                        console.log(response);
                    }                    
                });
            }
        },
        selectBand(choice){
            

            
            choice = choice.toLowerCase();
            this.band = choice;
            this.band = choice;
            this.allSongs = allSongs[choice];
            this.albums = albums[choice];
            setBackground(choice);
        },

        seeSongStats(){
            
            var self = this;

            getSongStats(self.band, function(response){
                if(response != "error"){
                    self.songStats.display = true;
                    self.songStats.data = response;
                } else {
                    console.log(error);
                }
            })
        },

        seeLeaderboard(){
            
            var self = this;

            getCurrentLeaderboard(self.band, function(response){
                if(response != "error"){
                    self.leaderboard.display = true;
                    self.leaderboard.currentLeaderboard = response;
                } else {
                    console.log(error);
                }
            })
        },

        closeStats(){
            this.songStats.display = false;
        },

        closeLeaderboard(){
            this.leaderboard.display = false;
        },

        sortSongStats(property){
            
            var self = this;

            if(property == "accuracy" || property == "count" || property == "name"){

                var descencing = (property == "name") ? false : true;

                self.songStats.data = sortObjectArray(self.songStats.data, property, descencing);
            }
        }
    }
});




function shuffle(arr) {
    var j, x, i;
    for (i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = arr[i];
        arr[i] = arr[j];
        arr[j] = x;
    }
    return arr;
}


function setBackground(band){
    var randomBackground = Math.floor(Math.random() * PHOTO_COUNT) + 1;
    document.getElementById("background-overlay").style = "background: url('assets/images/" + band.toLowerCase() + "/" + randomBackground + ".jpg') center center / cover no-repeat;";
}



function getLyricsSnippet(song){

    var lyrics = song.lyrics;
    var songName = song.name;
    
    var stanzaArray = lyrics.split("\n\n");

    var randomIndex;
    var tryCount = 0;
    var responseLyrics = false;

    while(!responseLyrics && tryCount < 100){

        randomIndex = Math.floor(Math.random() * (stanzaArray.length));
        
        var thisStanza = stanzaArray[randomIndex];                  // pick a random stanza
        var lineArray = thisStanza.split("\n");                     // split it into an array of lines

        if(lineArray.length >= 4){

            // pick line 1-3
            var randomStartIndex = Math.floor(Math.random() * 3);
            var remainingLines = lineArray.length - 1 - randomStartIndex;
            remainingLines = (remainingLines > 4) ? 4 : remainingLines;

            var randomEndIndex = randomStartIndex + Math.floor(1 + Math.random() * remainingLines);     // start + random number of lines
            lineArray = lineArray.slice(randomStartIndex, (randomEndIndex + 1));        // adding one here because slice works BEFORE the index

        } else {
            if(stanzaArray.length % 3 == 0) {
                lineArray = lineArray.slice(0,3);
            } else{
                lineArray = lineArray.slice(0,2);
            }

        }


        thisStanza = lineArray.join("<br>");

        if(thisStanza.toLowerCase().indexOf(songName.toLowerCase()) == -1 || tryCount == 99){
            responseLyrics = thisStanza;
        } else {
        }

        tryCount++;

        // after 100 tries, we'll just grab the last stanza that comes up, no matter if the song name's in it.

    }

    return responseLyrics;
}




/* firebase functions */

function recordSongGuess(band, song, type){

    var theseSongStats = db.collection("song-stats").doc(band.toLowerCase());

    theseSongStats.get().then(function(doc) {
        if (doc.exists) {

            doc = doc.data();

            if(typeof(doc[song]) == "undefined"){
                // if this song record doesn't exist, create it
                doc[song] = {
                    "correct": 0,
                    "incorrect": 0
                }
            }

            doc[song][type]++;

            theseSongStats.update(doc)
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

        } else {
            // doc.data() will be undefined in this case
            console.log("Can't find a doc for this band");
        }

    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

}



function submitQuizResults(completedGuesses, correctGuesses, band){

    var theseQuizResults = db.collection("quiz-results").doc(band.toLowerCase());

    theseQuizResults.get().then(function(doc) {
        if (doc.exists) {

            doc = doc.data();

            var currentDate = new Date().toString();
            var accuracyStat = Math.floor(correctGuesses/completedGuesses * 100)/100

            doc[currentDate] = {
                songs: correctGuesses,
                accuracy: accuracyStat
            };


            theseQuizResults.update(doc)
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });

        } else {
            // doc.data() will be undefined in this case
            console.log("Can't find a doc for this band");
        }

    }).catch(function(error) {
        console.log("Error getting document:", error);
    });


}

function getCurrentLeaderboard(band, callback){
    var firebaseLeaderboard = db.collection("leaderboard").doc(band.toLowerCase());

    firebaseLeaderboard.get().then(function(doc) {
        if (doc.exists) {

            doc = doc.data().leaderboard;
            callback(doc);

        } else {
            // doc.data() will be undefined in this case
            console.log("Can't find a doc for this band");
            callback("error");
        }

    }).catch(function(error) {
        console.log("Error getting document:", error);
        callback("error");
    });
}




function addToLeaderboard(data, newScore, band, callback){

    var thisLeaderboard = data.currentLeaderboard;
    var newLeaderboard = [];
    var thisName = data.name;
    var insertIndex;

    // sort the leaderboard (just to be safe);


    thisLeaderboard = sortObjectArray(thisLeaderboard, "score", true);

    for(var i = 0; i < thisLeaderboard.length; i++){
        if(newScore > thisLeaderboard[i].score){
            insertIndex = i;
            break;
        }
    }

    var newRecord = {
        name: data.name,
        score: newScore
    }

    // insert the new record into the array at the specified index, cut down to 10.
    thisLeaderboard.splice(insertIndex, 0, newRecord);
    newLeaderboard = thisLeaderboard.slice(0, 10);


    /* firebase ops */

    var firebaseLeaderboard = db.collection("leaderboard").doc(band.toLowerCase());

    firebaseLeaderboard.get().then(function(doc) {
        if (doc.exists) {

            // the thing we're inserting into the DB has to be an object

            doc = {
                leaderboard: newLeaderboard
            }
            
            firebaseLeaderboard.update(doc)
            .then(function() {
                console.log("Leaderboard successfully updated!");
                callback(newLeaderboard);
            })
            .catch(function(error) {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
                callback(doc);
            });

        } else {
            // doc.data() will be undefined in this case
            console.log("Can't find a doc for this band");
            callback("error");
        }

    }).catch(function(error) {
        console.log("Error getting document:", error);
        callback("error");
    });
}

function getSongStats(band, callback){

    var theseStats = db.collection("song-stats").doc(band.toLowerCase());

    theseStats.get().then(function(doc) {
        if (doc.exists) {
            doc = doc.data();

//            console.log(doc)
            
            var songRecords = [];

            for(var key in doc){

                var song = doc[key];
                var accuracyStat = Math.floor(song.correct/(song.incorrect + song.correct) * 100);

                var thisSongRecord = {
                    name: key,
                    accuracy: accuracyStat,
                    count: song.correct + song.incorrect
                }



                songRecords.push(thisSongRecord);
            }

            songRecords = sortObjectArray(songRecords, "accuracy", true);
            

            callback(songRecords);

        } else {
            // doc.data() will be undefined in this case
            console.log("Can't find a doc for this band");
            callback("error");
        }

    }).catch(function(error) {
        console.log("Error getting document:", error);
        callback("error");
    });

}


function sortObjectArray(object, property, descencing){

    console.log(`sorting by ${property}, descencing: ${descencing}`);

    var sortedObject = object.sort(function(a, b) {
        if (a[property] > b[property])
            return -1;
        if (a[property] < b[property])
            return 1;
        return 0;
    });

    if(!descencing){
        sortedObject.reverse();
    }

    return sortedObject;

}
