soundManager.setup({
  url: '/path/to/swf-files/',
  onready: function() {
    mySound = soundManager.createSound({
      id: 'aSound',
      url: '../../audio/RS.WAV'
    });

    function loopSound(sound) {
      sound.play({
        onfinish: function() {
          setTimeout(function(){
            loopSound(mySound);
          }, 200)
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
          $(this).find('p').text('GO');
        };
      }
    }
   
    $('#metronome').on('click', startMetronome);
    $('.go-button.record').on('click', startMetronome);
    $('.stop-recording').click(function(){
      mySound.stop();
      $(this).addClass('stopped');
    })
  },

  // mySound.stop();
  ontimeout: function() {
    // Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
  }
});


