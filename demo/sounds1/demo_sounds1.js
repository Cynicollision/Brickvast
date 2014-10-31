
// add a test sound to the the asset manager
var testSound1 = 'zelda_rupee';
Game.Audio.add(testSound1, '../sounds/LOZ_Get_Rupee.wav');
Game.Audio.load();

// also works with mp3!

// set some ugly background color?
Game.Canvas.setBackgroundColor('#9A5');

// looping is annoying
var sound1 = Game.Audio.getById(testSound1);
for (var i = 0; i <= 5; i++) {
    setTimeout(function () {
        sound1.play();
    }, i * 1000);
}