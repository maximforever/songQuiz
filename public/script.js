var BAND_NAME = "panic! at the disco";
var QUIZ_TIME = 15;              // seconds
var PHOTO_COUNT = 3;             

var songsInThisQuiz = [];

var app = new Vue({
    el: "#main-app",
    data: {
        band: null,
        quizStarted: false,
        endTime: 0,
        timeLeft: null,
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
            name: null,
            invite: false,
            nameSubmitted: false,
            display: false,
            currentLeaderboard: null
        }
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

        noNameEntered(){

            if(this.leaderboard.name == null || this.leaderboard.name.length == 0){
                return true;
            } else {
                return false;
            }

        }
    },
    methods: {
        createNewQuestion(){


            var selectedSong = songsInThisQuiz[this.currentSongCounter];
            this.currentSongCounter++;




            if(this.currentSongCounter >= songsInThisQuiz.length){
                this.endGame("You guessed 'em all!");
            }

            var lyricsSnippet = getLyricsSnippet(selectedSong.lyrics);

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

            getCurrentLeaderboard(this.band, function(response){

                if(response != "error"){

                    // response should be current leaderboard;
                    self.leaderboard.currentLeaderboard = response;
                    
                    for(var key in response){
                        if(self.correctGuesses > response[key].songs){
                            // if this score beats one in the leaderboard, we should add it to the leaderboard
                            self.leaderboard.invite = true;
                            break; 
                        }
                    }

                }
            })

        },

        submitLeaderboardName(){
            var name = this.leaderboard.name;

            console.log(`submitting ${name}`);
            var self = this;
            if(this.leaderboard.invite){
                addToLeaderboard(self.leaderboard, self.correctGuesses, function(newLeaderboard){
                    
                    console.log(newLeaderboard);
                    self.leaderboard.currentLeaderboard = newLeaderboard;
                    self.leaderboard.invite = false;
                    self.leaderboard.display = true;
                    self.leaderboard.nameSubmitted = true;
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



function getLyricsSnippet(lyrics){
    var lyricsArray = lyrics.split("\n");

    var stanzaDeliniators = [0];
    var selectedStanza = [];

    var endOfFirstStanza = lyricsArray.indexOf("");

    for(var i = 0; i < lyricsArray.length; i++){
        if(lyricsArray[i] == ""){
            if(stanzaDeliniators.indexOf(i) == -1){
                stanzaDeliniators.push(i);
            }
        }
    }

    stanzaDeliniators.push(lyricsArray.length);         // push last stanza


    var randomIndex = Math.floor(Math.random() * (stanzaDeliniators.length - 1));
    var startIndex = stanzaDeliniators[randomIndex];
    var endIndex = stanzaDeliniators[randomIndex + 1]; 

    for(var j = startIndex; j < endIndex; j++){
        if(lyricsArray[j].length){
            selectedStanza.push(lyricsArray[j]);
        }
    }

    if(selectedStanza.length % 3 == 0) {
        selectedStanza = selectedStanza.slice(0,3);
    } else{
        selectedStanza = selectedStanza.slice(0,2);
    }

    var responseLyrics = selectedStanza.join("<br>");

    return responseLyrics;
}

/* firebase functions */

function recordSongGuess(band, song, type){

    var thisBand = db.collection("song-stats").doc(band.toLowerCase());

    thisBand.get().then(function(doc) {
        if (doc.exists) {

            doc = doc.data();

            if(typeof(doc[song]) == "undefined"){
                // if this song record doesn't exist, create it
                console.log("creating song record");

                doc[song] = {
                    "correct": 0,
                    "incorrect": 0
                }
            }

            doc[song][type]++;

            thisBand.update(doc)
            .then(function() {
                console.log("Document successfully updated!");
            })
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



function submitQuizResults(songsCompleted, correctGuesses, band){

    var thisBand = db.collection("quiz-results").doc(band.toLowerCase());

    thisBand.get().then(function(doc) {
        if (doc.exists) {

            doc = doc.data();

            var currentDate = new Date().toString();

            var accuracyStat = Math.floor(correctGuesses/songsCompleted * 100)/100

            doc[currentDate] = {
                songs: correctGuesses,
                accuracy: accuracyStat
            };

            thisBand.update(doc)
            .then(function() {
                console.log("Document successfully updated!");
            })
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

    qualifiesForLeaderboard(band, correctGuesses);

}

function getCurrentLeaderboard(band, callback){
    var thisBand = db.collection("leaderboard").doc(band.toLowerCase());

    thisBand.get().then(function(doc) {
        if (doc.exists) {

            doc = doc.data();

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

function addToLeaderboard(data, newScore, callback){

    // I'd add to the leaderboard here

    console.log("ADDING TO LEADERBOARD!");

    /*
        data format should be:

        currentLeaderboard 
        name
    */

    /*
        1. get leaderboard object
        2. split object into array
        2. iterate through object
            a. when our score > any score in current leaderboard, note index
            b. insert our object into array at this index
            c. cut array down to 10 objects, reconstruct leaderboard object
            d. submit object update

    */
    var leaderboard = data.currentLeaderboard;
    var leaderboardRecords = [];
    var newLeaderboardRecord = [];
    var newLeaderboard = {};
    var maxIndex;

    for(var key in leaderboard){
        leaderboardRecords.push(leaderboard[key]);
    }

    /* THIS IS REALLY SLOPPY */

    console.log(leaderboardRecords);

    for(var i = 0; i < leaderboardRecords.length; i++){
        if(newScore > leaderboardRecords[i].score){
            maxIndex = i;
            break;
        }
    }

    var newRecord = [{
        name: data.name,
        songs: newScore
    }]

    newLeaderboardRecord = newLeaderboardRecord.concat(leaderboardRecords.slice(0, i), newRecord, leaderboardRecords.slice(i+1)).slice(0, 10);


    for(var j = 0; j < newLeaderboardRecord.length; j++){
        newLeaderboard[j] = newLeaderboardRecord[j];
        console.log(newLeaderboard);
    }

    console.log(newLeaderboard);

    //var newLeaderboard = data.currentLeaderboard;       // !!! replace with actual leaderboard
    callback(newLeaderboard);


}