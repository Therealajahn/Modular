const array = ["1", "2", "3", "4"];
const sequence = new Tone.Sequence(doThis, array, "8n");

console.log("sequencer:", color);

const buttonList = [16, 17, 18, 19];
const colorList = ["white", "yellow", "blue"];

let x = 0;

let i = x % 4;
let j = x % 3;

function doThis(time, note) {
  console.log("i:", i, "j:", j);
  sendButtonColor("on", buttonList[i], colorList[j]);
  x += 1;
}
