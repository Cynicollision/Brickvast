(function () {
    $vast.Game.init();

    // add a test sound to the the asset manager - also works with mp3!
    $vast.Audio.add('zelda_rupee', '../sounds/LOZ_Get_Rupee.wav');
    $vast.Audio.load();

    // set some ugly background color?
    $vast.Canvas.setBackgroundColor('#9A5');

    // looping is annoying!
    var sound1 = $vast.Audio.getById('zelda_rupee');
    for (var i = 0; i <= 5; i++) {
        setTimeout(function () {
            sound1.play();
        }, i * 1000);
    }
})();
