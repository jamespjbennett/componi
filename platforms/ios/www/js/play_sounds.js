Object.prototype.getKeyByValue = function( value ) {
    for( var prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
             if( this[ prop ] === value )
                 return prop;
        }
    }
}

// set up the oscillator sound
var saw = new Wad({source : 'sawtooth'})
var noteMatchObject = {
	1: 'C',
	2: 'C#',
	3: 'D',
	4: 'Eb',
	5: 'E',
	6: 'F',
	7: 'F#',
	8: 'G',
	9: 'Ab',
	10: 'A',
	11: 'Bb',
	12: 'B'
}

function generateMajorChord(chord){
	var chordArray = chord.split('');
	chordArray.pop();
	var note1 = chordArray.join('');
	var numberIndex = Number(noteMatchObject.getKeyByValue(note1))
	var secondNote = noteMatchObject[numberIndex + 4] + chord.split('')[chord.length - 1];
	var thirdNote = noteMatchObject[numberIndex +7] + chord.split('')[chord.length - 1];
	return [chord,secondNote, thirdNote ]
}

function playChordMajor(){
	var chord = $(this).attr('id');
	var freqs = generateMajorChord(chord);
	saw.play({
	    volume  : 0.8,
	    wait    : 0,     // Time in seconds between calling play() and actually triggering the note.
	    loop    : false, // This overrides the value for loop on the constructor, if it was set. 
	    pitch   : chord,  // A4 is 440 hertz.
	    label   : 'A',   // A label that identifies this note.
	    env     : {hold : 0.1, release: 0.5},
	    panning : [1, -1, 10],
	    filter  : {frequency : 100},
	    delay   : {delayTime : .8}
	})
}
// setTimeout(function(){
// 	saw.stop();
// }, 200)


$(document).ready(function(){
	$('.chord-circle').on('click', playChordMajor);
})