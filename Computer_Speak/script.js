const playButton = document.getElementById("play-button");
const pauseButton = document.getElementById("pause-button");
const stopButton = document.getElementById("stop-button");
const textInput = document.getElementById("text");
const speedInput = document.getElementById("speed");

let currentCharacter;

playButton.addEventListener("click", () => {
  playText(textInput.value);
});

pauseButton.addEventListener("click", pauseText);
stopButton.addEventListener("click", stopText);
speedInput.addEventListener("input", () => {
  stopText();
  playText(utterence.text.substring(currentCharacter));
});

const utterence = new SpeechSynthesisUtterance();

utterence.addEventListener("end", () => {
  textInput.disabled = false;
});

utterence.addEventListener("boundary", (e) => {
  currentCharacter = e.charIndex;
});

function playText(text) {
  if (speechSynthesis.pause && speechSynthesis.speaking) {
    return speechSynthesis.resume();
  }
  utterence.text = text;
  utterence.rate = speedInput.value || 1;
  textInput.disabled = true;
  speechSynthesis.speak(utterence);
}

function pauseText() {
  if (speechSynthesis.speaking) speechSynthesis.pause();
}

function stopText() {
  speechSynthesis.resume();
  speechSynthesis.cancel();
}
