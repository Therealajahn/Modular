document.getElementById("start")?.addEventListener("click", async () => {
  await Tone.start();
  console.log("audio is ready");
});

const player = new Tone.Player("knarl_loop.wav").toDestination();

const slowerButton = document.querySelector("#slower");
const fasterButton = document.querySelector("#faster");

slowerButton.addEventListener("click", () => {
  player.playbackRate = 0.5;
  player.start();
});
fasterButton.addEventListener("click", () => {
  player.playbackRate = 2;
  player.start();
});
