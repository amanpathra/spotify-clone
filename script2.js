console.log('Welcome to Spotify');

// Elements
const masterPlay = document.getElementById('masterPlay');
const backwardPlay = document.getElementById('backwardPlay');
const forwardPlay = document.getElementById('forwardPlay');
const muteBtn = document.getElementById('muteBtn');
const soundBar = document.getElementById('soundBar');
const playingLikeBtn = document.getElementById('playingLikeBtn');
const songsList = document.getElementsByClassName('songsList')[0];
const playingSA = document.getElementsByClassName('playingSA')[0];
const playingCover = document.getElementById('playingCover');
const playingBar = document.getElementById('playingBar');
const myProgressBar = document.getElementById('myProgressBar');
const root = document.querySelector(":root");
// HTML Collection
const songItem = document.getElementsByClassName('songItem');
const SA = document.getElementsByClassName('SA');

// Initializing Variables
const spgreen = '#1ed760';
let audioElement = new Audio('songs/1.mp3');
audioElement.volume = 0.25;

// Songs
let songs = [
    {songName: "On & On", Artist: "Cartoon", songPath: "songs/1.mp3", coverPath: "covers/1.jpg", songDur: "3:50"},
    {songName: "Heroes Tonight", Artist: "Janji", songPath: "songs/2.mp3", coverPath: "covers/2.jpg", songDur: "2:33"},
    {songName: "Invincible", Artist: "DEAF KEV", songPath: "songs/3.mp3", coverPath: "covers/3.jpg", songDur: "4:33"},
    {songName: "My Heart", Artist: "Different Heaven", songPath: "songs/4.mp3", coverPath: "covers/4.jpg", songDur: "4:27"},
    {songName: "Mortals", Artist: "Warriyo", songPath: "songs/5.mp3", coverPath: "covers/5.jpg", songDur: "3:28"},
    {songName: "Blank", Artist: "Disfigure", songPath: "songs/6.mp3", coverPath: "covers/6.jpg", songDur: "3:28"},
    {songName: "Sky High", Artist: "Elektronomia", songPath: "songs/7.mp3", coverPath: "covers/7.jpg", songDur: "4:33"},
    {songName: "Symbolism", Artist: "Electro-Light", songPath: "songs/8.mp3", coverPath: "covers/8.jpg", songDur: "3:50"},
    {songName: "Why We Lose", Artist: "Cartoon", songPath: "songs/9.mp3", coverPath: "covers/9.jpg", songDur: "3:28"},
    {songName: "Fearless", Artist: "Lost Sky", songPath: "songs/10.mp3", coverPath: "covers/10.jpg", songDur: "4:27"},
]

// Load Song List
for(let i = 0; i < songs.length; i++){
    songsList.innerHTML += `
        <div class="songItem">
            <img src="${songs[i].coverPath}" alt="">
            <div class="SA">
                <span>${songs[i].songName}</span>
                <span>${songs[i].Artist}</span>
            </div>
            <span class="songLength">${songs[i].songDur}</span>
            <i class="fa-solid fa-xl fa-play songPlay"></i>
        </div>
    `
}

const songPlay = Array.from(document.getElementsByClassName('songPlay'))

// Actions
// Play
const playTheSong = (song) => {
    song = parseInt(song);
    audioElement.src = `songs/${song}.mp3`
    audioElement.currentTime = 0;
    audioElement.play();
    SA[song-1].firstElementChild.style.color = spgreen;
    songPlay[song-1].classList.remove('fa-play');
    songPlay[song-1].classList.add('fa-sliders');
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    playingSA.firstElementChild.innerHTML = songs[song-1].songName;
    playingSA.lastElementChild.innerHTML = songs[song-1].Artist;
    playingCover.src = songs[song-1].coverPath;
}
// Play the paused
const playThePausedSong = (song) => {
    audioElement.play();
    songPlay[song-1].classList.remove('fa-play');
    songPlay[song-1].classList.add('fa-sliders');
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
}
// Pause
const pauseTheSong = (song) => {
    song = parseInt(song);
    audioElement.pause();
    songPlay[song-1].classList.remove('fa-sliders');
    songPlay[song-1].classList.add('fa-play');
    masterPlay.classList.remove('fa-circle-pause');
    masterPlay.classList.add('fa-circle-play');
}
// Rsest
const resetAll = () =>{
    songPlay.forEach((element, index)=>{
        element.classList.remove('fa-sliders');
        element.classList.add('fa-play');
        SA[index].firstElementChild.style.color = 'white';
    })
}
// Previous 
const previousSong = () => {
    playTheSong(parseInt(audioElement.src.slice(-5, -4))-1);
}
// Mext
const nextSong = () => {
    playTheSong(parseInt(audioElement.src.slice(-5, -4))+1);
}

function secToMin(sec) {
    const mins = ~~(sec/60);
    const secs = ~~(sec%60);
    let ret = mins + ":" + (secs < 10 ? "0" : "") + secs;
    return ret;
}

// Seek Bar
audioElement.addEventListener('timeupdate', ()=>{
    progress = (audioElement.currentTime/audioElement.duration)*1000;
    myProgressBar.value = progress;
    playingBar.firstElementChild.innerHTML = secToMin(audioElement.currentTime);
    playingBar.lastElementChild.innerHTML = secToMin(audioElement.duration);
    root.style.setProperty("--pgbarwidth", `${progress/10}%`);
    if(audioElement.currentTime == audioElement.duration){
        resetAll();
        nextSong();
    }
})

// Seek
myProgressBar.addEventListener('input', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 1000;
})

// Buttons
// Master Button
masterPlay.addEventListener('click', ()=>{
    let song = audioElement.src.slice(-5, -4)
    console.log(song)
    if(audioElement.currentTime == 0){
        playTheSong(song);
    }else if(audioElement.paused){
        playThePausedSong(song);
    }else{
        pauseTheSong(song);
    }
})

// Song Aside Buttons
songPlay.forEach((element)=>{
    element.addEventListener('click', (event)=>{
        resetAll();
        let song = songPlay.indexOf(event.target) + 1
        playTheSong(song);
    })
})

// Backword Buttons
backwardPlay.addEventListener('click', (element)=>{
    resetAll();
    previousSong();
})

// Forward Buttons
forwardPlay.addEventListener('click', (element)=>{
    resetAll();
    nextSong();
})


// Volume
soundBar.addEventListener('input', (element)=>{
    audioElement.volume = soundBar.value / 100;
    root.style.setProperty("--sdbarwidth", `${soundBar.value}%`);
    if(audioElement.volume == 0){
        muteBtn.classList.remove('fa-volume-low');
        muteBtn.classList.add('fa-volume-xmark');
    }else if((audioElement.volume < 0.5)){
        muteBtn.classList.remove('fa-volume-xmark');
        muteBtn.classList.remove('fa-volume-high');
        muteBtn.classList.add('fa-volume-low');
    }else{
        muteBtn.classList.remove('fa-volume-low');
        muteBtn.classList.add('fa-volume-high');
    }
})