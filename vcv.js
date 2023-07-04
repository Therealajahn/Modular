//const quantizer = [a minor scale];
const notes = [1,2,3,5,6,7,8];


const seqOne = new Tone.Sequence((time)=>{playNotes("seqOne",time,note)},notes,"8n");
const seqTwo = new Tone.Sequence((time)=>{playNotes("seqTwo",time,note)},notes,"4n");

function playNotes(/*parameter that changes instrument that plays*/){
    console.log("playNotes",arguments);
}


// function synthOne(){
// }
