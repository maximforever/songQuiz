var BAND_NAME = "hush sound";


var songList = [
  {
    "name": "City Traffic Puzzle",
    "album": "So Sudden"
  },
  {
    "name": "Weeping Willow",
    "album": "So Sudden"
  },
  {
    "name": "Crawling Towards the Sun",
    "album": "So Sudden"
  },
  {
    "name": "The Artist",
    "album": "So Sudden"
  },
  {
    "name": "Unsafe Safe",
    "album": "So Sudden"
  },
  {
    "name": "Momentum",
    "album": "So Sudden"
  },
  {
    "name": "Hourglass",
    "album": "So Sudden"
  },
  {
    "name": "Echo",
    "album": "So Sudden"
  },
  {
    "name": "My Apologies",
    "album": "So Sudden"
  },
  {
    "name": "The Market",
    "album": "So Sudden"
  },
  {
    "name": "Tides Change",
    "album": "So Sudden"
  },
  {
    "name": "Carry Me Home",
    "album": "So Sudden"
  },
  {
    "name": "Eileen",
    "album": "So Sudden"
  },
  {
    "name": "We Intertwined",
    "album": "Like Vines"
  },
  {
    "name": "A Dark Congregation",
    "album": "Like Vines"
  },
  {
    "name": "Sweet Tangerine",
    "album": "Like Vines"
  },
  {
    "name": "Lions Roar",
    "album": "Like Vines"
  },
  {
    "name": "Lighthouse",
    "album": "Like Vines"
  },
  {
    "name": "Don't Wake Me Up",
    "album": "Like Vines"
  },
  {
    "name": "Where We Went Wrong",
    "album": "Like Vines"
  },
  {
    "name": "Magnolia",
    "album": "Like Vines"
  },
  {
    "name": "Wine Red",
    "album": "Like Vines"
  },
  {
    "name": "Out Through the Curtain",
    "album": "Like Vines"
  },
  {
    "name": "You Are the Moon",
    "album": "Like Vines"
  },
  {
    "name": "Intro",
    "album": "Goodbye Blues"
  },
  {
    "name": "Honey",
    "album": "Goodbye Blues"
  },
  {
    "name": "Medicine Man",
    "album": "Goodbye Blues"
  },
  {
    "name": "The Boys Are Too Refined",
    "album": "Goodbye Blues"
  },
  {
    "name": "Hurricane",
    "album": "Goodbye Blues"
  },
  {
    "name": "As You Cry",
    "album": "Goodbye Blues"
  },
  {
    "name": "Six",
    "album": "Goodbye Blues"
  },
  {
    "name": "Molasses",
    "album": "Goodbye Blues"
  },
  {
    "name": "That's Okay",
    "album": "Goodbye Blues"
  },
  {
    "name": "Not Your Concern",
    "album": "Goodbye Blues"
  },
  {
    "name": "Love You Much Better",
    "album": "Goodbye Blues"
  },
  {
    "name": "Hospital Bed Crawl",
    "album": "Goodbye Blues"
  },
  {
    "name": "Break the Sky",
    "album": "Goodbye Blues"
  }
]


var songCounter = 0;
var allSongData = [];
var noSongName = [];

var app = new Vue({
    el: "#main-app",
    data: {
        songData: allSongData,
        noData: noSongName,
        counter: songCounter
    }

});


addSongLyrics(songList[songCounter]);


function addSongLyrics(songData){

    console.log(songData.name);


    var url = "http://lyric-api.herokuapp.com/api/find/" +  BAND_NAME + "/" + songData.name.replace(new RegExp("/", "g"), "%2F");

    console.log(`fetching ${url}`);

    axios.get(url)
      .then(function(response) {
        console.log(response);
        if(response.data.err != "none"){
            console.log("ERROR: " + response.data.err);
            noSongName.push(songData.name);
        } else {

            console.log(`got lyrics for ${songData.name}`);
            var songLyrics = response.data.lyric;

            var newSong = {
                name: songData.name,
                album: songData.album,
                lyrics: songLyrics,
            }


            allSongData.push(newSong);

        }

        songCounter++;

        if(songCounter < (songList.length - 1)){
            addSongLyrics(songList[songCounter]);
        } else {
            console.log("=========DONE======");
            console.log(songData);
        }


      })
}
