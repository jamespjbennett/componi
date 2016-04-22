// set up the oscillator sound
var saw = new Wad({source : 'sawtooth'})

function playChord(){
	var chord = $(this).attr('id');

	saw.play({
	    volume  : 0.8,
	    wait    : 0,     // Time in seconds between calling play() and actually triggering the note.
	    loop    : false, // This overrides the value for loop on the constructor, if it was set. 
	    pitch   : chord,  // A4 is 440 hertz.
	    label   : 'A',   // A label that identifies this note.
	    env     : {hold : 0.1, release: 1},
	    panning : [1, -1, 10],
	    filter  : {frequency : 100},
	    delay   : {delayTime : .8}
	})
}
// setTimeout(function(){
// 	saw.stop();
// }, 200)


$(document).ready(function(){
	$('.chord-circle').on('click', playChord);
})