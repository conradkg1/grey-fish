var instructionsDisplay = document.querySelector("#instructions");
var quizDisplay = document.querySelector("#quiz");
var scoreDisplay = document.querySelector("#highScores");
var scoreForm = document.querySelector("#scoreForm");
var firstInitialsSpan = document.querySelector("#initials1");
var firstScoreSpan = document.querySelector("#score1");
var secondInitialsSpan = document.querySelector("#initials2");
var secondScoreSpan = document.querySelector("#score2");
var thirdInitialsSpan = document.querySelector("#initials3");
var thirdScoreSpan = document.querySelector("#score3");
var fourthInitialsSpan = document.querySelector("#initials4");
var fourthScoreSpan = document.querySelector("#score4");
var fifthInitialsSpan = document.querySelector("#initials5");
var fifthScoreSpan = document.querySelector("#score5");

let highInitialsSpanArray = [
    firstInitialsSpan, 
    secondInitialsSpan,
    thirdInitialsSpan,
    fourthInitialsSpan,
    fifthInitialsSpan
];
let highScoresSpanArray = [
    firstScoreSpan,
    secondScoreSpan,
    thirdScoreSpan,
    fourthScoreSpan,
    fifthScoreSpan
];

var scoreArray = [
    {initials: 'placeholder',
    score: 0
    },
    {initials: 'placeholder',
    score: 0
    },
    {initials: 'placeholder',
    score: 0
    },    
    {initials: 'placeholder',
    score: 0
    },
    {initials: 'placeholder',
    score: 0
    },
];
localStorage.setItem("scoreArray", JSON.stringify(scoreArray));

function init() {
    renderHighScores();

    instructionsDisplay.style.display = "flex";
    scoreDisplay.style.display = "none";
    quizDisplay.style.display = "none";
    scoreForm.style.display = "none";
};

function renderHighScores() {
    var storedScores = JSON.parse(localStorage.getItem("userScoreAndInitials"));
    var scoreArray = JSON.parse(localStorage.getItem("scoreArray"));
    if (storedScores !== null) {
        scoreArray.push(storedScores);
        localStorage.setItem("scoreArray", JSON.stringify(scoreArray));
        localStorage.setItem("userScoreAndInitials", null);
    }

    if (scoreArray !== null && scoreArray.length > 1){
            for (var i = 0; i < 5; i++) {
                var scoreArray = JSON.parse(localStorage.getItem("scoreArray"));

                scoreArray.sort(function(a,b){return parseInt(b.score) - parseInt(a.score)});

                highInitialsSpanArray[i].textContent = scoreArray[i].initials;
                highScoresSpanArray[i].textContent = scoreArray[i].score;
            }
        }
};

var submitButton = document.querySelector("#submit");
submitButton.addEventListener("click", function(event) {
    event.preventDefault();

    var userScoreAndInitials = {
        initials: document.querySelector("#initials").value.trim(),
        score: userScoreSpan.textContent
    };
    
    localStorage.setItem("userScoreAndInitials", JSON.stringify(userScoreAndInitials));

    renderHighScores();

    instructionsDisplay.style.display = "none";
    scoreDisplay.style.display = "flex";
    quizDisplay.style.display = "none";
    scoreForm.style.display = "none";
});

var viewHighScoreButton = document.querySelector('#highScoreBtn');
viewHighScoreButton.addEventListener('click', function(){
    instructionsDisplay.style.display = "none";
    scoreDisplay.style.display = "flex";
    quizDisplay.style.display = "none";
    scoreForm.style.display = "none";
});

var homeButton = document.querySelector('.home');
homeButton.addEventListener('click', function(event){
    event.preventDefault();
    instructionsDisplay.style.display = "flex";
    scoreDisplay.style.display = "none";
    quizDisplay.style.display = "none";
    scoreForm.style.display = "none";
});

var playButton = document.querySelector("#play");
var timerSpan = document.querySelector("#timer");
var userScoreSpan = document.querySelector("#userScoreSpan");
var timerCard = document.querySelector("#timerCard")
var secondsLeft = 180;

var firstQuestion = document.querySelector("#q1");
firstQuestion.addEventListener("click", function(){gradeMessage.style.display = "flex";})

var gradeMessage = document.querySelector("#grade");
var gradeSpan = document.querySelector("#gradeSpan");
var incorrectBtns = document.querySelectorAll(".opt");
var correctBtns = document.querySelectorAll(".correct");

incorrectBtns.forEach(function(element) {
    element.addEventListener("click", function() {
        secondsLeft = secondsLeft - 3;
    timerCard.style.backgroundColor = "red";
    setTimeout(function(){timerCard.style.backgroundColor = "white"}, 1000);
    gradeSpan.textContent = "incorrect. 3 seconds deducted."
    plusCards(1);
    });
});
correctBtns.forEach(function(element) {
    element.addEventListener("click", function() {
        gradeSpan.textContent = "correct! Well done!";
        plusCards(1);
    });
});
playButton.addEventListener("click", function() {
    quizDisplay.style.display = "flex";
    instructionsDisplay.style.display = "none";
    gradeMessage.style.display = "none";
    initTimer();
    quizCardDisplay();
});
function gameOver() {
    quizDisplay.style.display = "none";
    scoreForm.style.display = "flex";
};
let cardIndex = 1;
function plusCards(n) {
    if (cardIndex <= 19) {
    cardIndex += n
    quizCardDisplay()
    }
    else {cardIndex = 1};
};
function quizCardDisplay() {
    var quizCardArray = Array.from(document.querySelector("#questions").children)
    
    quizCardArray.forEach(function(element) {
        element.style.display = "none";
    });

    quizCardArray[cardIndex-1].style.display = "flex";
};

init();