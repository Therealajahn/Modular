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
//     sequence.start(0);
    seqOne.start(0);
    seqTwo.start(0); 
    getPlugs("inputs", "print");
    updateMIDI();
    getSmartPad();
    demoColors();
  });
}

askForMIDI();

function getPlugs(interface, print) {
  const interfaceList = {};
  let i = 0;
  state.midiAccess[interface].forEach((plug, id) => {
    if (print) console.log(`${interface}: ${plug.name}`);
    interfaceList[`${i}`] = {
      name: plug.name,
      object: plug,
      id: id,
    };
    i += 1;
  });

  return interfaceList;
}

function updateMIDI() {
  state.midiAccess.onstatechange = (event) => {
    getPlugs("inputs");
  };
}

function getSmartPad() {
  let smartPadOutput = getPlugs("inputs")[1].object;
  smartPadOutput.onmidimessage = (event) => {
    midiMessage = event.data.reduce(
      //Print the first three numbers of the midi data
      (output, current, i) => (i < 3 ? [...output, current] : [...output]),
      []
    );
    currentNote = midiMessage;
    console.log(midiMessage);
  };
}

const color = {
  white: 10,
  yellow: 30,
  lblue: 35,
  purple: 50,
  blue: 65,
  green: 85,
  red: 100,
};

function sendButtonColor(onOrOff, buttonNumber, buttonColor) {
  const { white, yellow, lblue, purple, blue, green, red } = color;

  const statusByte = onOrOff === "on" ? 144 : 128;
  const dataByte1 = buttonNumber;
  const dataByte2 = color[buttonColor];
  console.log("midi output:", [statusByte, dataByte1, dataByte2]);
  getPlugs("outputs")[1].object.send([statusByte, dataByte1, dataByte2]);
}

function demoColors() {
  const { white, yellow, lblue, purple, blue, green, red } = color;

  getPlugs("outputs")[1].object.send([144, 0, white]);
  getPlugs("outputs")[1].object.send([144, 1, red]);
  getPlugs("outputs")[1].object.send([144, 2, yellow]);
  getPlugs("outputs")[1].object.send([144, 3, green]);
  getPlugs("outputs")[1].object.send([144, 4, blue]);
  getPlugs("outputs")[1].object.send([144, 5, lblue]);
  getPlugs("outputs")[1].object.send([144, 6, purple]);
}
