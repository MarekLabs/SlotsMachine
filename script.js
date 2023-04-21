var slotGra = ["banana.jpg", "bell.jpg", "coin.jpg", "grape.jpg", "heart.jpg", "orange.jpg", "seven.jpg"];
var audio = new Audio('csgo.mp3');
var iloscSlotow = 3;
var trwaGenerowanie = false;
function odtworzDzwiek()
{
    audio.currentTime = 0;
    audio.play();
}

function losujOwoc()
{
    var los = Math.floor(Math.random()*slotGra.length);
    return los;
}

function generujLosoweObrazki() {
    var wylosowaneDane = [];
    let wygrana = true;

    for (var i = 0; i < iloscSlotow; i++) {
        var los = losujOwoc();

        wylosowaneDane.push(los);

        if (i > 0 && wylosowaneDane[i] !== wylosowaneDane[i - 1]) {
            wygrana = false;
        }
    }

    ustawObrazki(wylosowaneDane);

    return wygrana;
}

function czekaj() {
    return new Promise(resolve => setTimeout(resolve, 100));
}

async function graj() {
    odtworzDzwiek();
    if (trwaGenerowanie) {
        return;
    }
    trwaGenerowanie = true;
    for (var i = 0; i < 70; i++) {
        generujLosoweObrazki();
        await czekaj();
    }

    const wygrana = generujLosoweObrazki();

    trwaGenerowanie = false;

    if (wygrana) {
        setTimeout(function() {
            alert('Wygrales');
        }, 10);
    }
}

function ustawObrazki(wylosowane)
{
    for (var i = 0; i < iloscSlotow; i++) {
        var wylosowany = wylosowane[i];
        var slot = document.getElementById("slot" + (i + 1));
        var path = "<img src="+slotGra[wylosowany] +">";
        slot.innerHTML = path;
    }
}