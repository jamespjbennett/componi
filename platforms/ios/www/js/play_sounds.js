Object.prototype.getKeyByValue = function( value ) {
    for( var prop in this ) {
        if( this.hasOwnProperty( prop ) ) {
             if( this[ prop ] === value )
                 return prop;
        }
    }
}

metroNomeStatus = false;

// set up the oscillator sound
var saw = new Wad({source : 'sawtooth'})
var triangle = new Wad({source : 'triangle'})

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

function playExample(){
	var freqs1 = generateMajorChord('C4');
	var freqs2 = generateMajorChord('F4');
	var freqs3 = generateMajorChord('G4');
	if($(this).attr('id') == "example_1"){
		basicHarmonyExample1(freqs1, freqs2, freqs3 );
	}else if($(this).attr('id') == "example_2"){
		basicHarmonyExample2(freqs1, freqs2, freqs3 );
	}else{
		basicHarmonyExample3(freqs1, freqs2, freqs3 );
	};
}

function basicHarmonyExample1(freqs1, freqs2, freqs3 ){
	playChordMajor(freqs1);
	setTimeout(function(){
		playChordMajor(freqs2);
		setTimeout(function(){
			playChordMajor(freqs3);
			setTimeout(function(){
				playChordMajor(freqs2);
				setTimeout(function(){
					playChordMajor(freqs1);
				}, 1000);
			}, 1000);
		}, 1000);
	}, 1000);

	// playChordMajor(freqs3);
}

function basicHarmonyExample2(freqs1, freqs2, freqs3 ){
	playChordMajor(freqs1);
	setTimeout(function(){
		playChordMajor(freqs1);
		setTimeout(function(){
			playChordMajor(freqs2);
			setTimeout(function(){
				playChordMajor(freqs1);
				setTimeout(function(){
					playChordMajor(freqs3);
					setTimeout(function(){
						playChordMajor(freqs2);
						setTimeout(function(){
							playChordMajor(freqs1);
						}, 1000);
					}, 1000);
				}, 1000);
			}, 1000);
		}, 1000);
	}, 1000);

	// playChordMajor(freqs3);
}

function basicHarmonyExample3(freqs1, freqs2, freqs3 ){
	playChordMajor(freqs1);
	setTimeout(function(){
		playChordMajor(freqs3);
		setTimeout(function(){
			playChordMajor(freqs2);
			setTimeout(function(){
				playChordMajor(freqs3);
				setTimeout(function(){
					playChordMajor(freqs1);
				}, 1000);
			}, 1000);
		}, 1000);
	}, 1000);

	// playChordMajor(freqs3);
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

function playChordMajor(freqs){
	if(Object.prototype.toString.call( freqs ) !== '[object Array]' ){
		var chord = $(this).attr('id');
		var freqs = generateMajorChord(chord);
	};
	$.each(freqs, function(index, note){
		saw.play({
		    volume  : 0.8,
		    wait    : 0,     // Time in seconds between calling play() and actually triggering the note.
		    loop    : false, // This overrides the value for loop on the constructor, if it was set. 
		    pitch   : note,  // A4 is 440 hertz.
		    label   : 'A',   // A label that identifies this note.
		    env     : {hold : 0.1, release: 0.8},
		    panning : [1, -1, 10],
		    filter  : {frequency : 100},
		    delay   : {delayTime : .8}
		})
	});

}

function startMetronome(){
	
		triangle.play({
		    volume  : 0.8,
		    wait    : 0,     // Time in seconds between calling play() and actually triggering the note.
		    loop    : true, // This overrides the value for loop on the constructor, if it was set. 
		    pitch   : 'A4',  // A4 is 440 hertz.
		    label   : 'A',   // A label that identifies this note.
		    env     : {hold : 0.07},
		    panning : [1, -1, 10],
		    filter  : {frequency : 100},
		    // delay   : {delayTime : .8}
		})
		setTimeout(function(){

		}, 800);
	
}

function metroNomeChangeState(){
	if(metroNomeStatus == false){
		metroNomeStatus = true;
		startMetronome()
	}else{
		metroNomeStatus = false;
	}
}



$(document).ready(function(){
	$('.chord-circle-major').on('click', playChordMajor);
	$('.play-example').on('click', playExample);
	$('.go-button').on('click', metroNomeChangeState);
})