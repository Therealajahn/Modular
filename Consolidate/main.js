
const player = new Tone.Player("Samples/knarl_loop.wav").toDestination();
const start = 0.2;
const end = 0.5;
const stop = end - start

const slowerButton = document.getElementById("slower");
const fasterButton = document.getElementById("faster");
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

/////SEQUENCER////////
const pitch = [1,2,3,4,5,6,7,8];
const rhythm = [1,0,1,0,1,0,1,0];
let playhead = 0;
const sequence = new Tone.Sequence(doThis,pitch,"8n");


function doThis(time,note){
    console.log("pitch:",pitch[playhead % 8],
                "rhythm:",rhythm[playhead % 8])
    playhead += 1;
}
////CONTROL//////
let currentNote = [];
const state = {
  midiAccess: {},
};

async function askForMIDI() {
  state.midiAccess = await navigator.requestMIDIAccess();
  console.log(state.midiAccess);

  document.getElementById("start").addEventListener("click", async () => {
    await Tone.start();
    Tone.Transport.start();
    console.log("transport started")
    sequence.start();
//     seqOne.start(0);
//     seqTwo.start(0); 
//     getPlugs("inputs", "print");
//     updateMIDI();
//     getSmartPad();
//     demoColors();
    });
}

askForMIDI();

/////SAMPLER/////
