let menu = $('#menu');
let start = $('#start');
let stop = $('#stop');
let play = $('#audio')[0];
let running = false;

let recognition = new webkitSpeechRecognition() || new SpeechRecognition;
recognition.lang = 'es-ES';
recognition.continuou = true;
recognition.interimResults = false;

//estados de la grabacion
recognition.onstart = function() {
    running = true;
    $("body").css("background-color", "red");
    start.addClass('recording');

};

recognition.onend = function() {
    running = false;
    $("body").css("background-color", "#AED6F1");
    start.removeClass('recording');
    play.play();
    start.addClass('bounceIn');
    setTimeout(function() {
        start.removeClass('bounceIn');
    }, 100);
};

recognition.onerror = function(event) {
    running = false;
    $("body").css("background-color", "red");
};

/////////////////funcion de grabar main////////////////////////////
recognition.onresult = (event) => {

    const results = event.results;
    let option = results[results.length - 1][0].transcript;
    console.log(option);


    if (option.indexOf('menú') > -1 || option.indexOf('opciones') > -1) {
        start.css("display", "none");
        menu.css("display", "block");
    }

    if (option.indexOf('nada') > -1) {
        start.css("display", "block");
        menu.css("display", "none");
    }


}

//escuchando audio
start.click(function(e) {

    play.play();

    start.addClass('bounceIn');
    setTimeout(function() {
        start.removeClass('bounceIn');
    }, 100);

    if (running === false) {
        recognition.start();
    }

})

$('#go_back').click(function(e) {
    start.css("display", "block");
    menu.css("display", "none");
})