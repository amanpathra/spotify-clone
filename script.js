console.log('Welcome to Spotify');

// Elements
const masterPlay = document.getElementById('masterPlay');
const backwardPlay = document.getElementById('backwardPlay');
const forwardPlay = document.getElementById('forwardPlay');
const myProgressBar = document.getElementById('myProgressBar');
const muteBtn = document.getElementById('muteBtn');
const soundBar = document.getElementById('soundBar');
const playingLikeBtn = document.getElementById('playingLikeBtn');
const songsList = document.getElementsByClassName('songsList')[0];
const songPlay = document.getElementsByClassName('songPlay');
const SA = document.getElementsByClassName('SA');
const playingSA = document.getElementsByClassName('playingSA')[0];
const playingCover = document.getElementById('playingCover');
const playingBar = document.getElementById('playingBar');


// Initializing Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');

// audioElement.play();

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


// Listen to events

masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    }
})

function secToMin(sec) {
    const mins = ~~(sec/60);
    const secs = ~~(sec%60);
    let ret = mins + ":" + (secs < 10 ? "0" : "") + secs;
    return ret;
}

audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
    playingBar.firstElementChild.innerHTML = secToMin(audioElement.currentTime);
    playingBar.lastElementChild.innerHTML = secToMin(audioElement.duration);
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(songPlay).forEach((element, index)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
        SA[index].firstElementChild.style.color = 'white';
    })
}

let songName;
let artist;
Array.from(songPlay).forEach((element, index)=>{
    element.addEventListener('click', (event)=>{
        makeAllPlays();
        event.target.classList.remove('fa-play');
        event.target.classList.add('fa-pause');
        SA[index].firstElementChild.style.color = '#1ed760';
        audioElement.src = `songs/${index + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        playingCover.src = `covers/${index + 1}.jpg`;
        playingSA.firstElementChild.innerHTML = songs[index].songName;
        playingSA.lastElementChild.innerHTML = songs[index].Artist;
    })
})

backwardPlay.addEventListener('click', ()=>{
    // makeAllPlays();
    let currentSrc = parseInt(audioElement.src.slice(28).replace('.mp3', ''));
    audioElement.src = `songs/${currentSrc - 1}.mp3`;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
    // Array.from(SA).forEach((element)=>{
    //     console.log(element)
    //     if(element.firstElementChild.style.color == 'rgb(30, 215, 96)'){
    //         console.log(element);
    //         element.parentElement.previousElementSibling.firstElementChild.nextElementSibling.firstElementChild.style.color = '#1ed760';
    //     }
    // })
})