
let tracker = 0;
let track_1 = {title: "out of time", artist: "the weeknd", artwork: "images/the_weeknd.jpg", url: "musics/Out-of-time.mp3"};
let track_2 = {title: "Rich Baby Daddy", artist: "drake", artwork: "images/drake.jpg", url: "musics/Rich-Baby-Daddy.mp3"};
let track_3 = {title: "the off season", artist: "j cole", artwork: "images/j_cole.jpg", url: "musics/the-off-season.mp3"};
let trackes = [track_1,track_2,track_3]

let isPlaying = false;
let playBtn = document.getElementById('play');
let myAudio = document.getElementById('myAudio');
let nextBtn = document.getElementById('next');
let prevBtn = document.getElementById('prev');
let loopBtn = document.getElementById('loop');
let volumeBtn = document.getElementById('volume');
let volumeSlider = document.querySelector('.volume-slider');
let volumeControl = document.querySelector('.volume-controls');
function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }

}
function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    myAudio.play();

}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    myAudio.pause();
}
let image = document.getElementById("musicPicture");

image.addEventListener("click", function() {
    let currentRotation = parseInt(image.style.transform.replace('rotate(', '').replace('deg)', ''));
    let newRotation = (currentRotation + 90) % 360;
    image.style.transform = "rotate(" + newRotation + "deg)";
});
function prevMusic(){
    tracker--;
    if(tracker >= trackes.length){
        tracker = 0;
    }
    let artistName = document.getElementById('artistName');
    let musicTitle = document.getElementById('musicTitle');
    artistName.textContent =  trackes[tracker].artist;
    musicTitle.textContent = trackes[tracker].title
    let myAudio = document.getElementById('myAudio');
    let musicPicture = document.getElementById('musicPicture');
    myAudio.src = trackes[tracker].url;
    musicPicture.src = trackes[tracker].artwork;
    myAudio.play();
    if(!isPlaying){
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause'); 
    }
}
function nextMusic(){
    tracker++;
    if(tracker >= trackes.length){
        tracker = 0;
    }
    let artistName = document.getElementById('artistName');
    let musicTitle = document.getElementById('musicTitle');
    artistName.textContent =  trackes[tracker].artist;
    musicTitle.textContent = trackes[tracker].title
    let myAudio = document.getElementById('myAudio');
    let musicPicture = document.getElementById('musicPicture');
   
    
    myAudio.src = trackes[tracker].url;
    musicPicture.src = trackes[tracker].artwork;
    
    if(!isPlaying){
        playBtn.classList.replace('fa-play', 'fa-pause');
        playBtn.setAttribute('title', 'Pause'); 
    }
    myAudio.play();
}
function loopPlay(){

}
function updateVolumeIcon(e){
    const volume = e.target.value;
    if (volume > 0.5) {
       volumeControl.querySelector('i').className = 'fa-solid fa-volume-up';
    } else if (volume > 0) {
       volumeControl.querySelector('i').className = 'fa-solid fa-volume-down';
    } else {
       volumeControl.querySelector('i').className = 'fa-solid fa-volume-mute';
    }
    myAudio.volume=volume;
  }

playBtn.addEventListener('click', togglePlay);
nextBtn.addEventListener('click', nextMusic);
prevBtn.addEventListener('click', prevMusic);
loopBtn.addEventListener('click', loopPlay);
volumeSlider.addEventListener('input', (e) => updateVolumeIcon(e));
volumeBtn.addEventListener('click',toggleMute);

const audioElement = document.getElementById("myAudio");

function adjustVolume(event) {
  const key = event.keyCode;
  const currentVolume = audioElement.volume;
  const volumeStep = 0.1; // Adjust this value to change volume sensitivity

  if (key === 38 && currentVolume < 1) { // Up arrow (increase)
    audioElement.volume = Math.min(currentVolume + volumeStep, 1);
  } else if (key === 40 && currentVolume > 0) { // Down arrow (decrease)
    audioElement.volume = Math.max(currentVolume - volumeStep, 0);
  }
}
function togglePlayPause(event) {
    if (event.keyCode === 9) { // Tab key
      if (audioElement.paused) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
}
    
document.addEventListener("keydown", adjustVolume);
document.addEventListener("keyup", adjustVolume);
document.addEventListener("keydown", togglePlayPause);



const progressBar = document.getElementById('progress-bar');

audio.addEventListener('loadedmetadata', () => {
  progressBar.max = myAudio.duration;
});

audio.addEventListener('timeupdate', () => {
  progressBar.value = myAudio.currentTime;
});
let isLooping = false; // Flag to track loop state

function updateProgressBar() {
  const currentTime = myAudio.currentTime;
  const duration = myAudio.duration;
  const progress = currentTime / duration;

  progressBar.style.width = `${progress * 100}%`;
}

audio.addEventListener('timeupdate', updateProgressBar);

loopBtn.addEventListener('click', () => {
  isLooping = !isLooping; // Toggle loop state on click

  // Update loop behavior based on state
  if (isLooping) {
    myAudio.loop = true;
    loopBtn.classList.add('active'); // Add a visual indicator (optional)
  } else {
    myAudio.loop = false;
    loopBtn.classList.remove('active'); // Remove visual indicator
  }
});