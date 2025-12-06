
function operation(opNum) {
    let textbox = document.getElementById('txt');
    let button = document.getElementById('operation' + opNum);
    var text = button.textContent;
    if (text == 'x') textbox.value += '*';
    else if (text == '÷') textbox.value += '/';
    else textbox.value += text;
}

function home() {
    window.location.href = 'main.html';
}

function submit() {
    let text = document.getElementById('txt').value;
    var answer = eval(text);
    var correct = document.getElementById("correct");
    var incorrect = document.getElementById("incorrect");
    var giveup = document.getElementById("giveup_msg")
    var reset = document.getElementById("reset");
    if (text.length >= 7 && answer == 24) {
        correct.style.display = "block";
        incorrect.style.display = "none";
        giveup.style.display = "none";
        reset.textContent = "Play Again"
        reset.style.display = "block"
        invalid.style.display = "none";
    }
    else if (text.length < 7) {
        correct.style.display = "none";
        incorrect.style.display = "none";
        giveup.style.display = "none";
        reset.style.display = "none"
        invalid.style.display = "block";
    }
    else {
        reset.textContent = "Reset Cards";
        reset.style.display = "none";
        incorrect.style.display = "block";
        correct.style.display = "none";
        giveup.style.display = "none";
        invalid.style.display = "none";
    }
}

function giveup() {
    var giveup = document.getElementById("giveup_msg")
    var correct = document.getElementById("correct");
    var incorrect = document.getElementById("incorrect");
    var reset = document.getElementById("reset");
    reset.textContent = "Reset Cards";
    giveup.style.display = "block";
    reset.style.display = "block";
    incorrect.style.display = "none";
    correct.style.display = "none";
    invalid.style.display = "none";
}

function reset() {
    for (var i=1; i<=4; i++) {
        var randInt = Math.floor(Math.random()*13+1);
        var randLetter = Math.floor(Math.random()*4);
        if (randInt == '1') randInt = 'a';
        else if (randInt == '11') randInt = 'j';
        else if (randInt == '12') randInt = 'q';
        else if (randInt == '13') randInt = 'k';

        if (randLetter == 0) randLetter = 'c';
        else if (randLetter == 1) randLetter = 'd';
        else if (randLetter == 2) randLetter = 'h';
        else randLetter = 's';
        var url = "url('simple/simple_"+randLetter+"_"+randInt+".svg')";
        let bg = document.getElementById("card"+i);
        bg.style.backgroundImage = url;
    }
    let textbox = document.getElementById('txt');
    textbox.value = "";
    textbox.placeholder = "Press the buttons to enter your expression";
}

function card(cardNum) {
    //textbox.value += '1';
    let textbox = document.getElementById('txt');
    let element = document.getElementById('card' + cardNum);
    const computedStyle = window.getComputedStyle(element);
    const backgroundImage = computedStyle.getPropertyValue('background-image');
    //textbox.value += backgroundImage;
    var index = backgroundImage.lastIndexOf('/') + 10;
    let s = backgroundImage.substring(index, index+1);
    if (backgroundImage.substring(index+1, index+2) == '0') textbox.value += '10';
    else if (s == 'j') textbox.value += '11';
    else if (s == 'q') textbox.value += '12';
    else if (s == 'k') textbox.value += '13';
    else if (s == 'a') textbox.value += '1';
    else textbox.value += s;
}