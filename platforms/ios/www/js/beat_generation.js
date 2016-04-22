soundManager.setup({
  url: '/path/to/swf-files/',
  onready: function() {
    var mySound = soundManager.createSound({
      id: 'aSound',
      url: '../../audio/RS.WAV'
    });
    mySound.play();
  },
  ontimeout: function() {
    // Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
  }
});