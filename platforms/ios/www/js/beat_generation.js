soundManager.setup({
  url: '/path/to/swf-files/',
  onready: function() {
    mySound = soundManager.createSound({
      id: 'aSound',
      url: '../../audio/RS.WAV'
    });
    tempo = 200
    function loopSound(sound) {
      sound.play({
        onfinish: function() {
          setTimeout(function(){
            loopSound(mySound);
          }, tempo)
        }
      });
    }

    function startMetronome(){
      if($(this).hasClass('stopped')){
        loopSound(mySound)
        if(!$(this).hasClass('record')){
          $(this).removeClass('stopped');
          $(this).find('p').text('STOP');
        }
      }else{
        mySound.stop();
        if(!$(this).hasClass('record')){
          $(this).addClass('stopped');
          $(this).find('p').text('TAP');
        };
      }
    }

    function increaseTempo(){
      tempo = tempo - 50;
    };

    function decreaseTempo(){
      tempo = tempo + 50;
    }
   
    $('#metronome').on('click', startMetronome);
    $('.go-button.record').on('click', startMetronome);
    $('.increase-tempo').on('click', increaseTempo);
    $('.decrease-tempo').on('click', decreaseTempo);
    $('.stop-recording').click(function(){
      mySound.stop();
      $('.go-button').addClass('stopped');
      $('.go-button').find('p').text('TAP');

    })
  },

  // mySound.stop();
  ontimeout: function() {
    // Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
  }
});


