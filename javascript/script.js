console.log("Game");
var bubbles = [];
var squares = [];
var colours = ['Aqua','DarkMagenta','DarkViolet','SpringGreen', 'deepskyblue','darkslategray','deeppink'];
var numSquares = 30;
var lose = false;
var found = false;
var livescount = 5;
var points = 0;
var myMusic = new sound("../img/ChetFaker1998.mp3");
var moveBubbles;

var phasePoints = 20;

var highScoreArray = [];
var name = '';

//---------------class & IDs----------------
var start = document.querySelector(".start_button");
var box = document.querySelector(".gameBox");
var background = document.querySelector(".back_ground");
var leftbox = document.querySelector(".leftbox");
var live = document.querySelector(".livesDisplay");
var topleft = document.querySelector(".topLeft");
var scoreDis = document.querySelector(".score");
var scoreArray = document.querySelector("#scores");
var newname = document.querySelector(".new");
var pop = document.querySelector(".pop");
var whole = document.querySelector(".Background");

//--------- left display ----------------------
checkingUser();
start.addEventListener("click", createGame);
start.addEventListener("click", playmusic);
var live = document.createElement("div");
live.className = "livesDisplay";
live.innerHTML = `LIVES LEFT: ${livescount}`;
scoreDis.innerHTML = `SCORE: ${points}`
topleft.appendChild(live);


//---------- game creation----------------
function gameBox(){
    var box = document.createElement("div");
    box.className = "gameBox" ;
    document.querySelector(".back_ground").appendChild(box);
}
//------------------Bubble------------------------
function clickBubble(){
    for (var i = 0; i < bubbles.length; i++) {
        bubbles[i].addEventListener('click', foundCheck )
    }
}
//----random colour-------------
function randomcolour(){
    if(points < 1000){
  return Math.floor(Math.random() * 6);
} else {
    return Math.floor(Math.random() * 8);
    }
}

function bubble(){
//--------- Styling of bubble-------------------
    if(points < 1000){
    var bubble = document.createElement("div");
    bubble.style.borderRadius = "50%";
    bubble.style.height = "100px";
    bubble.style.width = "100px";
    bubble.style.backgroundColor = "deeppink";
    bubble.className = "bubble";
    if(points < 300){
       bubble.id = "shake";
    }
//---------Random positioning of bubble-----------
    var posx = (Math.random() * 600).toFixed();
    var posy = (Math.random() * 600).toFixed();
    bubble.style.position = "absolute";
    bubble.style.left = posx + "px";
    bubble.style.top = posy + "px";
//-------------appending to gamebox-------------
    box.appendChild(bubble);
    bubbles.push(bubble);
}
if(points >= 100 && points < 300){
            for (var i = 0; i < 5; i++) {
            var bubble = document.createElement("div");
            bubble.style.borderRadius = "50%";
            bubble.style.height = "100px";
            bubble.style.width = "100px";
            bubble.className = "bubble";
            bubble.id = "shake";
            bubble.style.display = "inline-block";
            bubble.style.backgroundColor = colours[randomcolour()];
            var posx = (Math.random() * 200).toFixed();
            var posy = (Math.random() * 500).toFixed();
            bubble.style.position = "relative";
            bubble.style.left = posx + "px";
            bubble.style.top = posy + "px";
            box.appendChild(bubble);
            bubbles.push(bubble);

        }
    }else if(points >= 300 && points < 1000){
            for (var i = 0; i < 5; i++) {
            var bubble = document.createElement("div");
            bubble.style.borderRadius = "50%";
            bubble.style.height = "100px";
            bubble.style.width = "100px";
            bubble.className = "bubble";
            bubble.style.display = "inline-block";
            bubble.style.backgroundColor = colours[randomcolour()];
            var posx = (Math.random() * 200).toFixed();
            var posy = (Math.random() * 500).toFixed();
            bubble.style.position = "relative";
            bubble.style.left = posx + "px";
            bubble.style.top = posy + "px";
            box.appendChild(bubble);
            bubbles.push(bubble);

        }
    } else if (points >= 1000) {
        for (var i = 0; i < 5; i++){
        var bubble = document.createElement("div");
        bubble.className = "bubble";
        box.appendChild(bubble);
        bubbles.push(bubble);
        }
    }
}

//-------------Square-----------------------
function clickSquare(){
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener('click', loseCheck)
    }
}

function square(){
    for (var i = 0; i < numSquares; i++) {
        var square = document.createElement("div");
//---------Styling of Boxes---------------------
        square.style.height = "100px";
        square.style.width = "100px" ;
        square.style.backgroundColor = "blue";
        square.style.border = "2px solid black";
        square.style.display = "inline-block";
        square.className = "square";
        square.id = "square";
//-------Random positioning of square----------
        var posx = (Math.random() * 200) + i.toFixed();
        var posy = (Math.random() * 400) + i.toFixed();
        square.style.position = "relative";
        square.style.left = posx + "px";
        square.style.top = posy + "px";
//-------appending to gamebox-----------
        box.appendChild(square);
        squares.push(square);
    }
}

//-----------checks----------------
function loseCheck(){
    if(livescount === 0){
        alert0();
        live.innerHTML = `LIVES LEFT: ${livescount}`;
        highScoreArray.push({name:name, score:points});
        points = 0;
        name = "";
        livescount = 5;
        scoreDis.innerHTML = `SCORE: ${points}`
        live.innerHTML = `LIVES LEFT: ${livescount}`
        displayhighscore();
        clearGameBox(box);
        checkingUser();

    }
    else{
        live.innerHTML = ``;
        livescount--;
        live.innerHTML = `LIVES LEFT: ${livescount}`;
    }
}

function foundCheck(){
    found = true;
    console.log(this.getAttribute("style").includes("deeppink"));
    if(found && this.getAttribute("style").includes("deeppink")){
                points = points + phasePoints;
                scoreDis.innerHTML = `SCORE: ${points}`;
                console.log(points);
                createGame();
            } else if (!this.getAttribute("style").includes("deeppink") && livescount > 0){
                live.innerHTML = ``;
                livescount--;
                live.innerHTML = `LIVES LEFT: ${livescount}`;
            } else if(livescount === 0){
                    alert0();
                    live.innerHTML = `LIVES LEFT: ${livescount}`;
                    highScoreArray.push({name:name, score:points});
                    points = 0;
                    name = "";
                    livescount = 5;
                    live.innerHTML = `LIVES LEFT: ${livescount}`
                    scoreDis.innerHTML = `SCORE: ${points}`
                    displayhighscore();
                    clearGameBox(box);
                    checkingUser();
                    }
found = false;
}

//-----------Reset board-----------
function clearGameBox(inputElement){
    console.log(inputElement);
     while (inputElement.firstChild) {
        inputElement.removeChild(inputElement.firstChild);
    }

}

//----------Phase 2----------------
function square2(){
    for (var i = 0; i < numSquares; i++) {
        var square = document.createElement("div");
//---------Styling of Boxes---------------------
        square.style.height = "100px";
        square.style.width = "100px" ;
        square.style.backgroundColor = "blue";
        square.style.border = "2px #03e8fc solid";
        square.style.display = "inline-block";
        square.className = `square${i}`;
        square.id = "square";
//-------Random positioning of square----------
        var posx = (Math.random() * 100) + i.toFixed();
        var posy = (Math.random() * 500) + i.toFixed();
        square.style.position = "relative";
        square.style.left = posx + "px";
        square.style.top = posy + "px";
//-------appending to gamebox-----------
        box.appendChild(square);
        squares.push(square);
    }
}

//------- Phase 2 -----------------------
function movementPhaseTwo(){
    var squaremovementup = [
  { transform: 'translateX(00px)' },
  { transform: 'translateY(-450px)' }
    ];

var squaremovementdown = [
  { transform: 'translateX(00px)' },
  { transform: 'translateY(400px)' }
    ];

var squaretiming = {
    duration: 1500,
    iterations: Infinity,
    direction: 'alternate',
}

for (var i = 15; i < squares.length; i++) {
        document.querySelector(`.square${i}`).animate(
        squaremovementup,
        squaretiming
        )
    }
for (var i = 0; i < squares.length; i++) {
    if (i < 10 ) {
        document.querySelector(`.square${i}`).animate(
        squaremovementdown,
        squaretiming
        )
    }
}
}

//----------Phase 3----------------
function square3(){
    for (var i = 0; i < numSquares; i++) {
        var square = document.createElement("div");
//---------Styling of Boxes---------------------
        square.style.height = "100px";
        square.style.width = "100px" ;
        square.style.backgroundColor = colours[randomcolour()];
        square.style.border = "2px #03e8fc solid";
        square.style.display = "inline-block";
        square.className = `square${i}`;
        square.id = "square";
//-------Random positioning of square----------
        var posx = (Math.random() * 100) + i.toFixed();
        var posy = (Math.random() * 200) + i.toFixed();
        square.style.position = "relative";
        square.style.left = posx + "px";
        square.style.top = posy + "px";
//-------appending to gamebox-----------
        box.appendChild(square);
        squares.push(square);
    }
}

function movementPhaseThree(){
var squaremovementup = [
  { transform: 'translateX(00px)' },
  { transform: 'translateY(-450px)' }
    ];

var squaremovementdown = [
  { transform: 'translateX(00px)' },
  { transform: 'translateY(400px)' }
    ];

var squaremovementside = [
  { transform: 'translateX(250px)' },
  { transform: 'translateY(00px)' }
    ];

var squaretiming = {
    duration: 1500,
    iterations: Infinity,
    direction: 'alternate',
}

for (var i = 25; i < squares.length; i++) {
    squares[i]
        document.querySelector(`.square${i}`).animate(
        squaremovementup,
        squaretiming
        )
    }
for (var i = 0; i < squares.length; i++) {
    if (i < 10 ) {
        document.querySelector(`.square${i}`).animate(
        squaremovementdown,
        squaretiming
        )
    }
}
for (var i = 11; i < squares.length; i++) {
    if (i < 20 ) {
        document.querySelector(`.square${i}`).animate(
        squaremovementside,
        squaretiming
        )
    }
}
 
var bubblemovement1 = [
  { transform: 'translateX(250px)' },
  { transform: 'translateY(00px)' }
    ];

 
var bubbletiming = {
    duration: 2000,
    direction: "alternate",
    iterations: Infinity
  }

for (var i = 0; i < bubbles.length; i++) {
var bubblemovement = document.querySelectorAll(".bubble");
  var bubble = bubblemovement[i];
    bubble.animate(
        bubblemovement1,
        bubbletiming
        )
    }
}



//-----phase 4--------------------
function square4(){
    for (var i = 0; i < numSquares; i++) {
        var square = document.createElement("div");
//---------Styling of Boxes---------------------
        square.style.height = "100px";
        square.style.width = "100px" ;
        square.style.backgroundColor = colours[randomcolour()];
        square.style.border = "2px #03e8fc solid";
        square.style.display = "inline-block";
        square.className = `square${i}`;
        square.id = "square";
//-------Random positioning of square----------
        var posx = (Math.random() * 100) + i.toFixed();
        var posy = (Math.random() * 200) + i.toFixed();
        square.style.position = "relative";
        square.style.left = posx + "px";
        square.style.top = posy + "px";
//-------appending to gamebox-----------
        box.appendChild(square);
        squares.push(square);
    }
}

function movementPhaseFour(){
var squaremovementup = [
  { transform: 'translateX(00px)' },
  { transform: 'translateY(-450px)' }
    ];

var squaremovementdown = [
  { transform: 'translateX(00px)' },
  { transform: 'translateY(400px)' }
    ];

var squaremovementside = [
  { transform: 'translateX(250px)' },
  { transform: 'translateY(00px)' }
    ];

var squaremovementdialeft = [
  { transform: 'translateX(250px)' },
  { transform: 'translateY(450px)' }
    ];


var squaremovementdiaright = [
  { transform: 'translateX(-250px)' },
  { transform: 'translateY(450px)' }
    ];

var squaretiming = {
    duration: 1500,
    iterations: Infinity,
    direction: 'alternate',
}
for (var i = 0; i < squares.length; i++) {
    if (i < 5 ) {
        document.querySelector(`.square${i}`).animate(
        squaremovementdown,
        squaretiming
        )
    }
}
for (var i = 5; i < squares.length; i++) {
    if (i < 10 ) {
        document.querySelector(`.square${i}`).animate(
        squaremovementdialeft,
        squaretiming
        )
    }
}

for (var i = 10; i < squares.length; i++) {
    if (i < 15 ) {
        document.querySelector(`.square${i}`).animate(
        squaremovementdiaright,
        squaretiming
        )
    }
}

for (var i = 15; i < squares.length; i++) {
    if (i < 20 ) {
        document.querySelector(`.square${i}`).animate(
        squaremovementside,
        squaretiming
        )
    }
}

for (var i = 20; i < squares.length; i++) {
    squares[i]
        document.querySelector(`.square${i}`).animate(
        squaremovementup,
        squaretiming
        )
    } 
}

//------ Random movement of bubbles-------
const rand = (multi) => {
return parseInt(multi * Math.random() ,10);
}

function move(){
var divs = document.querySelectorAll(".bubble");

var ww = window.innerWidth;
var wh = window.innerHeight;

let constraint = Math.min(ww, wh);
    for (var i = 0; i < divs.length; i++){
        var div = divs[i];
        var w = rand(constraint);
        var x = rand((ww - w));
        var y = rand((wh - w));

        div.style.width = (w - 500) + 'px';
        div.style.height = (w - 500) + 'px';
        div.style.top = y + 'px';
        div.style.left = x + 'px';

        div.style.transition = (rand(100) + 700) +'ms';

        div.style.background = colours[randomcolour()];
        div.style.opacity = Math.random() + 0.5;
        };
    }


//--------Game creation-------------------
function createGame(){
if(points < 100){
    clearInterval(moveBubbles);
    clearGameBox(box);
    bubbles = [];
    squares = [];
    bubble();
    clickBubble();
    square();
    clickSquare();
}else if (points >= 100 && points < 300){
        clearGameBox(box);
        bubbles = [];
        squares = [];
        bubble();
        clickBubble();
        square2();
        clickSquare();
        movementPhaseTwo();
    }else if (points >= 300 && points < 1000){
            clearGameBox(box);
            bubbles = [];
            squares = [];
            bubble();
            clickBubble();
            square3();
            clickSquare();
            movementPhaseThree();
        }else if (points >= 1000){
            clearInterval(moveBubbles);
            clearGameBox(box);
            bubbles = [];
            squares = [];
            bubble();
            clickBubble();
            square3();
            clickSquare();
            movementPhaseFour();
            moveBubbles = setInterval(move, 1000);
        }
}


//------function to display HIGH scores-----
function displayhighscore(){
scoreArray.innerHTML = "";
    for (var i = 0; i < highScoreArray.length; i++) {
        highScoreArray.sort(function(a, b){return b.score - a.score});
        var x = document.createElement("li");
        x.innerText = `${highScoreArray[i].name} : ${highScoreArray[i].score}`;
        scoreArray.appendChild(x);
        if(i === 4){
            highScoreArray.pop()
        }
    }

}

//----- keying in username-----------
function gettingPlayerName(){
    var x = document.createElement("INPUT");
    x.placeholder= "USERNAME";
    x.className = "username";
    x.setAttribute("type", "text");
    document.querySelector(".popup").appendChild(x);
    x.addEventListener('keypress', function(e){
        if(e.key === 'Enter'){
               if(x.value === ''){
                alertusername();
               }else{
                name = x.value;
                checkingUser();
               }
        x.value = '';
        }
    })
}

//---------username Request Pop up-----
function userpopup(){
    var popup = document.createElement("div");
    popup.className = "popup";
    newname.appendChild(popup);
    var h = document.createElement("h1");
    h.innerText = "FIND ME"
    popup.appendChild(h);
    gettingPlayerName();
    blurfilter();
}

//------- blur function -----------
function blurfilter(){
    whole.classList.add("blurfilter");
}

//----check if user input a username------
function checkingUser(){
    if (name === '') {
        userpopup();
    }else{
        whole.classList.remove("blurfilter");
        newname.removeChild(document.querySelector(".popup"));
    }
}

//---------Alerts and sound-----------
function alert0(){
Swal.fire({
        icon: 'info',
        title: 'GAME OVER',
        text: 'Try Again!',
    });
}

function alertusername(){
    Swal.fire({
        icon: 'info',
        title: 'please enter a username',
    });
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.querySelector(".Background").appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}

function playmusic(){
    myMusic.play()
}