// Create the audio object and start playing it
const audioPath = "looping_audio/"
const tracks = [
  {
    id: "rain",
    label: "Rain.wav",
    src: "rain_02.mp3",
    volume: 0.5,
  },
  {
    id: "wind",
    label: "Wind.wav",
    src: "wind_01.mp3",
    volume: 0.5,
  },
  {
    id: "fire",
    label: "Fireplace.wav",
    src: "fire_01.mp3",
    volume: 0.5,
  },
  {
    id: "birds",
    label: "Birds.wav",
    src: "birds_01.mp3",
    volume: 0.5,
  },
  {
    id: "crickets",
    label: "Crickets.wav",
    src: "crickets_01.mp3",
    volume: 0.5,
  },
  {
    id: "thunder",
    label: "Thunder.wav",
    src: "thunder_01.mp3",
    volume: 0.5,
  },
  {
    id: "waves",
    label: "Waves.wav",
    src: "waves_01.mp3",
    volume: 0.5,
  },
  {
    id: "forgs",
    label: "Frogs.wav",
    src: "frogs_01.mp3",
    volume: 0.5,
  }
  
  // Add more tracks here!
];

const container = document.getElementById("card-container");

tracks.forEach((track) => {
  // Create audio
  const audio = new Audio(audioPath + track.src);
  audio.loop = true;
  audio.volume = track.volume;
  track.audio = audio; // Store it for control later

  // Create card
  const card = document.createElement("div");
  card.className = "audio-card";
  card.innerHTML = `
    <h2>${track.label}</h2>
    <input type="range" id="${track.id}-volume" min="0" max="1" step="0.01" value="${track.volume}">
    <div class="button-row">
      <button id="${track.id}-toggle">Play</button>
    </div>
  `;
  card.classList.add("paused");

  container.appendChild(card);

  // Volume control
  const volumeSlider = card.querySelector(`#${track.id}-volume`);
  volumeSlider.addEventListener("input", () => {
    track.audio.volume = parseFloat(volumeSlider.value);
  });
  const toggleButton = card.querySelector(`#${track.id}-toggle`);

  toggleButton.addEventListener("click", () => {
    if (track.audio.paused) {
      track.audio.play();
      toggleButton.textContent = "Pause"; // update icon
      card.classList.remove("paused");
    } else {
      track.audio.pause();
      toggleButton.textContent = "Play";
      card.classList.add("paused");
    }
  });
});

document.getElementById('loadVideoBtn').addEventListener('click', () => {
  const url = document.getElementById('youtubeInput').value;
  const videoId = extractYouTubeId(url);
  if (videoId) {
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}`;
    document.getElementById('ytVideo').src = embedUrl;
  }
});

// Extracts video ID from various YouTube URL formats
function extractYouTubeId(url) {
  const regExp = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : null;
}