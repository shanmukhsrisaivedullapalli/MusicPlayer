const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('playPause');
const volumeSlider = document.getElementById('volume');
const coverPhoto = document.getElementsByTagName('img')[0];
const playPauseButtonImg = document.getElementsByTagName('img')[2];
let current = 0;
let songs = {
  0:{
    'cover':'Assets/daku_img.jpeg',
    'source':'Assets/Daku.mp3'
  },
  1:{
    'cover':'Assets/HarHarShambhu.jpeg',
    'source':'Assets/HarHarShambhuShivMahadeva.mp3'
  },
};

function playPause() {
    if(audio.paused){
      audio.play();
      playPauseButtonImg.src='Assets/Stop.svg';
      playPauseButtonImg.alt='play';
    }else{
      audio.pause();
      playPauseButtonImg.src='Assets/play_arrow_FILL0_wght400_GRAD0_opsz48.svg';
      playPauseButtonImg.alt='pause';
    };
};

function next() {
  current++;
  if (current>1){
    current=1;
  };
    console.log('next'+current);
    coverPhoto.src=songs[current]['cover'];
    audio.src=songs[current]['source'];
};

function prev() {
  current--;
  if (current<0) {
    current=0;
  };
    console.log('prev'+current);
    coverPhoto.src=songs[current]['cover'];
    audio.src=songs[current]['source'];
};

function SoundUp() {
    if (audio.volume>=0.99) {
      audio.volume=0.99;
    }else{
      audio.volume+=0.01;
      volumeSlider.value=audio.volume;
    };
};

function SoundDown() {
  if (audio.volume<=0.01) {
    audio.volume=0;
  }else{
    audio.volume-=0.01;
    volumeSlider.value=audio.volume;
  };
};

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

const seekBar = document.getElementById('seekBar');

seekBar.addEventListener('input', () => {
  const seekTime = (seekBar.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

audio.addEventListener('timeupdate', () => {
  const seekPercentage = (audio.currentTime / audio.duration) * 100;
  seekBar.value = seekPercentage;
});

document.addEventListener('keydown', (event) => {
  var code = event.code;
  switch (code) {
    case 'Space':
      playPause();
      break;
    case 'ArrowRight':
      next();
      break;
    case 'ArrowLeft':
      prev();
      break;
    case 'ArrowUp':
      SoundUp();
      break;
    case 'ArrowDown':
      SoundDown();
      break;
    default:
      break;
  }
}, false);