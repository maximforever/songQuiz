var BAND_NAME = "panic! at the disco";

/*
var songList = [
  {
    "song": "Backdoor",
    "album": "Other & Unreleased"
  },
  {
    "song": "Boredom",
    "album": "Other & Unreleased"
  },
  {
    "song": "Falling with the Crowd",
    "album": "Other & Unreleased"
  },
  {
    "song": "Feed",
    "album": "Other & Unreleased"
  },
  {
    "song": "Forameus",
    "album": "Other & Unreleased"
  },
  {
    "song": "Jigsaw Memory",
    "album": "Other & Unreleased"
  },
  {
    "song": "Rain",
    "album": "Other & Unreleased"
  },
  {
    "song": "Sling",
    "album": "Other & Unreleased"
  },
  {
    "song": "Soaked",
    "album": "Other & Unreleased"
  },
  {
    "song": "Dead Star",
    "album": "Other & Unreleased"
  },
  {
    "song": "Agitated",
    "album": "B-side"
  },
  {
    "song": "Ashamed",
    "album": "B-side"
  },
  {
    "song": "Bedroom Acoustics",
    "album": "B-side"
  },
  {
    "song": "Can't Take My Eyes Off You",
    "album": "B-side"
  },
  {
    "song": "Coma",
    "album": "B-side"
  },
  {
    "song": "Con-Science",
    "album": "B-side"
  },
  {
    "song": "Crying Shame",
    "album": "B-side"
  },
  {
    "song": "Do We Need This",
    "album": "B-side"
  },
  {
    "song": "Easily",
    "album": "B-side"
  },
  {
    "song": "Eternally Missed",
    "album": "B-side"
  },
  {
    "song": "Execution Commentary",
    "album": "B-side"
  },
  {
    "song": "Forced In",
    "album": "B-side"
  },
  {
    "song": "Fury",
    "album": "B-side"
  },
  {
    "song": "Futurism",
    "album": "B-side"
  },
  {
    "song": "The Gallery",
    "album": "B-side"
  },
  {
    "song": "Glorious",
    "album": "B-side"
  },
  {
    "song": "The Groove",
    "album": "B-side"
  },
  {
    "song": "Host",
    "album": "B-side"
  },
  {
    "song": "Hyper Chondriac Music",
    "album": "B-side"
  },
  {
    "song": "Jimmy Kane",
    "album": "B-side"
  },
  {
    "song": "Map of Your Head",
    "album": "B-side"
  },
  {
    "song": "Minimum",
    "album": "B-side"
  },
  {
    "song": "Nature 1",
    "album": "B-side"
  },
  {
    "song": "Neutron Star Collision (Love Is Forever)",
    "album": "Other & Unreleased"
  },
  {
    "song": "Nishe",
    "album": "B-side"
  },
  {
    "song": "Piano Thing",
    "album": "B-side"
  },
  {
    "song": "Pink Ego Box",
    "album": "B-side"
  },
  {
    "song": "Popcorn",
    "album": "B-side"
  },
  {
    "song": "Prague",
    "album": "B-side"
  },
  {
    "song": "Recess",
    "album": "B-side"
  },
  {
    "song": "Shine",
    "album": "B-side"
  },
  {
    "song": "Shrinking Universe",
    "album": "B-side"
  },
  {
    "song": "Spiral Static",
    "album": "B-side"
  },
  {
    "song": "Twin",
    "album": "B-side"
  },
  {
    "song": "Who Knows Who",
    "album": "B-side"
  },
  {
    "song": "Yes Please",
    "album": "B-side"
  },
  {
    "song": "In Your World",
    "album": "Other & Unreleased"
  },
  {
    "song": "Uprising",
    "album": "The Resistance"
  },
  {
    "song": "Resistance",
    "album": "The Resistance"
  },
  {
    "song": "Undisclosed Desires",
    "album": "The Resistance"
  },
  {
    "song": "United States of Eurasia",
    "album": "The Resistance"
  },
  {
    "song": "Guiding Light",
    "album": "The Resistance"
  },
  {
    "song": "Unnatural Selection",
    "album": "The Resistance"
  },
  {
    "song": "MK ULTRA",
    "album": "The Resistance"
  },
  {
    "song": "I Belong to You",
    "album": "The Resistance"
  },
  {
    "song": "Supremacy",
    "album": "The 2nd Law"
  },
  {
    "song": "Madness",
    "album": "The 2nd Law"
  },
  {
    "song": "Panic Station",
    "album": "The 2nd Law"
  },
  {
    "song": "Prelude",
    "album": "The 2nd Law"
  },
  {
    "song": "Survival",
    "album": "The 2nd Law"
  },
  {
    "song": "Follow Me",
    "album": "The 2nd Law"
  },
  {
    "song": "Animals",
    "album": "The 2nd Law"
  },
  {
    "song": "Explorers",
    "album": "The 2nd Law"
  },
  {
    "song": "Big Freeze",
    "album": "The 2nd Law"
  },
  {
    "song": "Save Me",
    "album": "The 2nd Law"
  },
  {
    "song": "Liquid State",
    "album": "The 2nd Law"
  },
  {
    "song": "The 2nd Law: Unsustainable",
    "album": "The 2nd Law"
  },
  {
    "song": "The 2nd Law: Isolated System",
    "album": "The 2nd Law"
  },
  {
    "song": "Sunburn",
    "album": "Showbiz"
  },
  {
    "song": "Muscle Museum",
    "album": "Showbiz"
  },
  {
    "song": "Fillip",
    "album": "Showbiz"
  },
  {
    "song": "Falling Down",
    "album": "Showbiz"
  },
  {
    "song": "Cave",
    "album": "Showbiz"
  },
  {
    "song": "Showbiz",
    "album": "Showbiz"
  },
  {
    "song": "Unintended",
    "album": "Showbiz"
  },
  {
    "song": "Uno",
    "album": "Showbiz"
  },
  {
    "song": "Sober",
    "album": "Showbiz"
  },
  {
    "song": "Escape",
    "album": "Showbiz"
  },
  {
    "song": "Overdue",
    "album": "Showbiz"
  },
  {
    "song": "Hate This & I'll Love You",
    "album": "Showbiz"
  },
  {
    "song": "New Born",
    "album": "Origin of Symmetry"
  },
  {
    "song": "Bliss",
    "album": "Origin of Symmetry"
  },
  {
    "song": "Space Dementia",
    "album": "Origin of Symmetry"
  },
  {
    "song": "Hyper Music",
    "album": "Origin of Symmetry"
  },
  {
    "song": "Plug In Baby",
    "album": "Origin of Symmetry"
  },
  {
    "song": "Citizen Erased",
    "album": "Origin of Symmetry"
  },
  {
    "song": "Micro Cuts",
    "album": "Origin of Symmetry"
  },
  {
    "song": "Screenager",
    "album": "Origin of Symmetry"
  },
  {
    "song": "Darkshines",
    "album": "Origin of Symmetry"
  },
  {
    "song": "Feeling Good",
    "album": "Origin of Symmetry"
  },
  {
    "song": "Megalomania",
    "album": "Origin of Symmetry"
  },
  {
    "song": "Dead Inside",
    "album": "Drones"
  },
  {
    "song": "Drill Sergeant",
    "album": "Drones"
  },
  {
    "song": "Psycho",
    "album": "Drones"
  },
  {
    "song": "Mercy",
    "album": "Drones"
  },
  {
    "song": "Reapers",
    "album": "Drones"
  },
  {
    "song": "The Handler",
    "album": "Drones"
  },
  {
    "song": "JFK",
    "album": "Drones"
  },
  {
    "song": "Defector",
    "album": "Drones"
  },
  {
    "song": "Revolt",
    "album": "Drones"
  },
  {
    "song": "Aftermath",
    "album": "Drones"
  },
  {
    "song": "The Globalist",
    "album": "Drones"
  },
  {
    "song": "Drones",
    "album": "Drones"
  },
  {
    "song": "Feeling Good",
    "album": "Cover"
  },
  {
    "song": "House of the Rising Sun",
    "album": "Cover"
  },
  {
    "song": "Take a Bow",
    "album": "Black Holes and Revelations"
  },
  {
    "song": "Starlight",
    "album": "Black Holes and Revelations"
  },
  {
    "song": "Supermassive Black Hole",
    "album": "Black Holes and Revelations"
  },
  {
    "song": "Map of the Problematique",
    "album": "Black Holes and Revelations"
  },
  {
    "song": "Soldier's Poem",
    "album": "Black Holes and Revelations"
  },
  {
    "song": "Invincible",
    "album": "Black Holes and Revelations"
  },
  {
    "song": "Assassin",
    "album": "Black Holes and Revelations"
  },
  {
    "song": "Exo-Politics",
    "album": "Black Holes and Revelations"
  },
  {
    "song": "City of Delusion",
    "album": "Black Holes and Revelations"
  },
  {
    "song": "Hoodoo",
    "album": "Black Holes and Revelations"
  },
  {
    "song": "Knights of Cydonia",
    "album": "Black Holes and Revelations"
  },
  {
    "song": "Intro",
    "album": "Absolution"
  },
  {
    "song": "Apocalypse Please",
    "album": "Absolution"
  },
  {
    "song": "Time Is Running Out",
    "album": "Absolution"
  },
  {
    "song": "Sing for Absolution",
    "album": "Absolution"
  },
  {
    "song": "Stockholm Syndrome",
    "album": "Absolution"
  },
  {
    "song": "Falling Away with You",
    "album": "Absolution"
  },
  {
    "song": "Interlude",
    "album": "Absolution"
  },
  {
    "song": "Hysteria",
    "album": "Absolution"
  },
  {
    "song": "Blackout",
    "album": "Absolution"
  },
  {
    "song": "Butterflies & Hurricanes",
    "album": "Absolution"
  },
  {
    "song": "The Small Print",
    "album": "Absolution"
  },
  {
    "song": "Endlessly",
    "album": "Absolution"
  },
  {
    "song": "Thoughts of a Dying Atheist",
    "album": "Absolution"
  },
  {
    "song": "Ruled by Secrecy",
    "album": "Absolution"
  }
]*/


var songList = [
  {
    "song": "The Only Difference Between Martyrdom and Suicide Is Press Coverage",
    "album": "A Fever You Can't Sweat Out"
  },
  {
    "song": "London Beckoned Songs About Money Written by Machines",
    "album": "A Fever You Can't Sweat Out"
  },
  {
    "song": "Nails for Breakfast, Tacks for Snacks",
    "album": "A Fever You Can't Sweat Out"
  },
  {
    "song": "Camisado",
    "album": "A Fever You Can't Sweat Out"
  },
  {
    "song": "Time to Dance",
    "album": "A Fever You Can't Sweat Out"
  },
  {
    "song": "Lying Is the Most Fun a Girl Can Have Without Taking Her Clothes Off",
    "album": "A Fever You Can't Sweat Out"
  },
  {
    "song": "But It's Better If You Do",
    "album": "A Fever You Can't Sweat Out"
  },
  {
    "song": "I Write Sins Not Tragedies",
    "album": "A Fever You Can't Sweat Out"
  },
  {
    "song": "I Constantly Thank God for Esteban",
    "album": "A Fever You Can't Sweat Out"
  },
  {
    "song": "There's a Good Reason These Tables Are Numbered Honey, You Just Haven't Thought of It Yet",
    "album": "A Fever You Can't Sweat Out"
  },
  {
    "song": "Build God, Then We'll Talk",
    "album": "A Fever You Can't Sweat Out"
  },
  {
    "song": "We're So Starving",
    "album": "Pretty. Odd."
  },
  {
    "song": "Nine in the Afternoon",
    "album": "Pretty. Odd."
  },
  {
    "song": "She's a Handsome Woman",
    "album": "Pretty. Odd."
  },
  {
    "song": "Do_You_Know_What_I%27m_Seeing%3F",
    "album": "Pretty. Odd."
  },
  {
    "song": "That Green Gentleman (Things Have Changed)",
    "album": "Pretty. Odd."
  },
  {
    "song": "I Have Friends in Holy Spaces",
    "album": "Pretty. Odd."
  },
  {
    "song": "Northern Downpour",
    "album": "Pretty. Odd."
  },
  {
    "song": "When the Day Met the Night",
    "album": "Pretty. Odd."
  },
  {
    "song": "Pas de Cheval",
    "album": "Pretty. Odd."
  },
  {
    "song": "The Piano Knows Something I Don't Know",
    "album": "Pretty. Odd."
  },
  {
    "song": "Behind the Sea",
    "album": "Pretty. Odd."
  },
  {
    "song": "Folkin' Around",
    "album": "Pretty. Odd."
  },
  {
    "song": "She Had the World",
    "album": "Pretty. Odd."
  },
  {
    "song": "From a Mountain in the Middle of the Cabins",
    "album": "Pretty. Odd."
  },
  {
    "song": "Mad as Rabbits",
    "album": "Pretty. Odd."
  },
  {
    "song": "The Ballad of Mona Lisa",
    "album": "Vices & Virtues"
  },
  {
    "song": "Let's Kill Tonight",
    "album": "Vices & Virtues"
  },
  {
    "song": "Hurricane",
    "album": "Vices & Virtues"
  },
  {
    "song": "Memories",
    "album": "Vices & Virtues"
  },
  {
    "song": "Trade Mistakes",
    "album": "Vices & Virtues"
  },
  {
    "song": "Ready to Go (Get Me Out of My Mind)",
    "album": "Vices & Virtues"
  },
  {
    "song": "Always",
    "album": "Vices & Virtues"
  },
  {
    "song": "The Calendar",
    "album": "Vices & Virtues"
  },
  {
    "song": "Sarah Smiles",
    "album": "Vices & Virtues"
  },
  {
    "song": "Nearly Witches (Ever Since We Met...)",
    "album": "Vices & Virtues"
  },
  {
    "song": "This Is Gospel",
    "album": "Too Weird to Live, Too Rare to Die!"
  },
  {
    "song": "Miss Jackson (featuring Lolo)",
    "album": "Too Weird to Live, Too Rare to Die!"
  },
  {
    "song": "Vegas Lights",
    "album": "Too Weird to Live, Too Rare to Die!"
  },
  {
    "song": "Girl That You Love",
    "album": "Too Weird to Live, Too Rare to Die!"
  },
  {
    "song": "Nicotine",
    "album": "Too Weird to Live, Too Rare to Die!"
  },
  {
    "song": "Girls/Girls/Boys",
    "album": "Too Weird to Live, Too Rare to Die!"
  },
  {
    "song": "Casual Affair",
    "album": "Too Weird to Live, Too Rare to Die!"
  },
  {
    "song": "Far Too Young to Die",
    "album": "Too Weird to Live, Too Rare to Die!"
  },
  {
    "song": "Collar Full",
    "album": "Too Weird to Live, Too Rare to Die!"
  },
  {
    "song": "The End of All Things",
    "album": "Too Weird to Live, Too Rare to Die!"
  },
  {
    "song": "Victorious",
    "album": "Death of a Bachelor"
  },
  {
    "song": "Don't Threaten Me with a Good Time",
    "album": "Death of a Bachelor"
  },
  {
    "song": "Hallelujah",
    "album": "Death of a Bachelor"
  },
  {
    "song": "Emperor's New Clothes",
    "album": "Death of a Bachelor"
  },
  {
    "song": "Death of a Bachelor",
    "album": "Death of a Bachelor"
  },
  {
    "song": "Crazy=Genius",
    "album": "Death of a Bachelor"
  },
  {
    "song": "LA Devotee",
    "album": "Death of a Bachelor"
  },
  {
    "song": "Golden Days",
    "album": "Death of a Bachelor"
  },
  {
    "song": "The Good, the Bad and the Dirty",
    "album": "Death of a Bachelor"
  },
  {
    "song": "House of Memories",
    "album": "Death of a Bachelor"
  },
  {
    "song": "Impossible Year",
    "album": "Death of a Bachelor"
  },
  {
    "song": "(Fuck A) Silver Lining",
    "album": "Pray for the Wicked"
  },
  {
    "song": "Say Amen (Saturday Night)",
    "album": "Pray for the Wicked"
  },
  {
    "song": "Hey Look Ma, I Made It",
    "album": "Pray for the Wicked"
  },
  {
    "song": "High Hopes",
    "album": "Pray for the Wicked"
  },
  {
    "song": "Roaring 20s",
    "album": "Pray for the Wicked"
  },
  {
    "song": "Dancing's Not a Crime",
    "album": "Pray for the Wicked"
  },
  {
    "song": "One of the Drunks",
    "album": "Pray for the Wicked"
  },
  {
    "song": "The Overpass",
    "album": "Pray for the Wicked"
  },
  {
    "song": "King of the Clouds",
    "album": "Pray for the Wicked"
  },
  {
    "song": "Old Fashioned",
    "album": "Pray for the Wicked"
  },
  {
    "song": "Dying in LA",
    "album": "Pray for the Wicked"
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

    console.log(songData);


    var url = "http://lyric-api.herokuapp.com/api/find/" +  BAND_NAME + "/" + songData.song.replace(new RegExp("/", "g"), "%2F");

    console.log(`fetching ${url}`);

    axios.get(url)
      .then(function(response) {
        console.log(response);
        if(response.data.err != "none"){
            console.log("ERROR: " + response.data.err);
            noSongName.push(songData.song);
        } else {

            console.log(`got lyrics for ${songData.song}`);
            var songLyrics = response.data.lyric;

            var newSong = {
                name: songData.song,
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
