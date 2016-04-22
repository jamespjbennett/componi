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
	var numberIndex = Number(noteMatchObject.getKeyByValue(note1));
	var secondNoteIndex = numberIndex + 4;
	var thirdNoteIndex = numberIndex + 7;
	var secondNoteScaleValue = chord.split('')[chord.length - 1];
	var thirdNoteScaleValue = chord.split('')[chord.length - 1];
	if(secondNoteIndex > 12){
		secondNoteIndex = secondNoteIndex - 12;
		secondNoteScaleValue = String(Number(chord.split('')[chord.length - 1]) + 1)
	}
	if(thirdNoteIndex> 12){
		thirdNoteIndex = thirdNoteIndex - 12;
		thirdNoteScaleValue = String(Number(chord.split('')[chord.length - 1]) + 1)
	}
	var secondNote = noteMatchObject[secondNoteIndex] + secondNoteScaleValue;
	var thirdNote = noteMatchObject[thirdNoteIndex] + thirdNoteScaleValue;
	return [chord,secondNote, thirdNote ]
}

function playChordMajor(){
	var chord = $(this).attr('id');
	var freqs = generateMajorChord(chord);
	$.each(freqs, function(index, note){
		saw.play({
		    volume  : 0.8,
		    wait    : 0,     // Time in seconds between calling play() and actually triggering the note.
		    loop    : false, // This overrides the value for loop on the constructor, if it was set. 
		    pitch   : note,  // A4 is 440 hertz.
		    label   : 'A',   // A label that identifies this note.
		    env     : {hold : 0.1, release: 0.5},
		    panning : [1, -1, 10],
		    filter  : {frequency : 100},
		    delay   : {delayTime : .8}
		})
	});
}
// setTimeout(function(){
// 	saw.stop();
// }, 200)


$(document).ready(function(){
	$('.chord-circle').on('click', playChordMajor);
})