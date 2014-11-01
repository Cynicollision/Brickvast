
// add a test sound to the the asset manager
var testSound1 = 'zelda_rupee';
$vast.Game.Audio.add(testSound1, '../_sounds/LOZ_Get_Rupee.wav');
$vast.Game.Audio.load();

// also works with mp3!

// set some ugly background color?
$vast.Game.Canvas.setBackgroundColor('#9A5');

// looping is annoying
var sound1 = $vast.Game.Audio.getById(testSound1);
for (var i = 0; i <= 5; i++) {
    setTimeout(function () {
        sound1.play();
    }, i * 1000);
}