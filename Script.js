const bpmText = document.querySelector("#bpm");
const moodText = document.querySelector("#mood");
const songTitle = document.querySelector("#song-title");
const moodButtons = document.querySelectorAll(".mood-button");
const playButton = document.querySelector("#play-button");
const sliderButton = document.querySelector("#myRange");

let isPlaying = false;

moodButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    moodButtons.forEach(function (item) {
      item.classList.remove("active");
    });

    button.classList.add("active");
    bpmText.textContent = button.dataset.bpm;
    moodText.textContent = button.dataset.mood;
    songTitle.textContent = button.dataset.song;

    sliderButton.value = button.dataset.bpm;
    updateSliderColor();
    
  });
});

sliderButton.addEventListener("input", function () {
  const bpm = Number(sliderButton.value);

  bpmText.textContent = bpm;
 
  updateSliderColor();
  
  moodButtons.forEach(function (button) {
    button.classList.remove("active");
  });

  if (bpm < 95) {
    moodText.textContent = "Relaxed mood";
    songTitle.textContent = "Moonlight Drive";
    moodButtons[0].classList.add("active");
  }
  else if (bpm < 125) {
    moodText.textContent = "Focused mood";
    songTitle.textContent = "Deep Focus";
    moodButtons[1].classList.add("active");
  }
  else {
    moodText.textContent = "Workout mood";
    songTitle.textContent = "Run Fast";
    moodButtons[2].classList.add("active");
  }
});

function updateSliderColor() {

  const percent =
   ((sliderButton.value - sliderButton.min) / 
   (sliderButton.max - sliderButton.min)) * 100;
  
  sliderButton.style.background = 
  `linear-gradient(to right , #ff3b69 ${percent}%, #555 ${percent}%)`;
}



playButton.addEventListener("click", function () {
  isPlaying = !isPlaying;

  if (isPlaying) {
    playButton.textContent = "❚❚";
    playButton.setAttribute("aria-label", "Pause music");
  } else {
    playButton.textContent = "▶";
    playButton.setAttribute("aria-label", "Play music");
  }
});

