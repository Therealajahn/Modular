const player = new Tone.Player("knarl_loop.wav").toDestination();
const start = 0.2;
const end = 0.5;
const stop = end - start;

const slowerButton = document.querySelector("#slower");
const fasterButton = document.querySelector("#faster");
const controls = document.getElementById("controls");

let loop = "one-shot";
controls.addEventListener("click", (event) => {
  if (event.target.type !== "radio") {
    return;
  }
  const radio = event.target;
  if (radio.classList[0] === "loop") {
    console.log(radio.value);
    loop = radio.value;
  }
});

slowerButton.addEventListener("click", () => {
  playSample(0.5, loop);
});

fasterButton.addEventListener("click", () => {
  playSample(2, loop);
});

function playSample(rate, loop) {
  player.playbackRate = rate;
  switch (loop) {
    case "loop":
      loopSample();
      break;

    case "one-shot":
      oneShot();
      break;
  }
}
function oneShot() {
  player.start(start);
  player.stop(`+${end}`);
}

function loopSample() {
  player.start();
  player.setLoopPoints(start, end);
  player.loop = true;
}
