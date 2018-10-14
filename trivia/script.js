//Todo:
/*
If a user clicks a button more than once before the next question is displayed, the entire game breaks.
    - the reset button did not fix this.
    * could try removing button functionality during interval/ timeout.
    
Add functionality to the topics list on the side.
    * Use the api at the bottom to select a new topic.
    
Make each answer display on a random button, instead of the same every time.
    - Might need to use a Math.random() to give each button a new class name
*/


/* Possible variables */
var time = 10;
var timeInterval;
var runningQuestion = 0;
var correctAns = 0;
var questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: ["js", "JavaScript", "Java", "script"],
        answerIndex: "script"
            },
    {
        question: "What is the correct JavaScript syntax to select an element's ID?",
        answers: ["document.ElementId()", "document.getElementById()", "document.getElement()", "$('#ID')"],
        answerIndex: "document.getElementById()"
            },
    {
        question: "Where is the correct place to insert a JavaScript?",
        answers: ["The head section", "The body section", "All are correct", "External .js"],
        answerIndex: "All are correct"
            },
    {
        question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
        answers: ["script src='xxx.js'", "script href='xxxjs'", "script name='xxx.js'", "script link='xxx.js'"],
        answerIndex: "script src='xxx.js'"
            },
        ];

$("#start").on("click", function () {
    $(".button-start, #intro").addClass("hidden");
    $("#trivia, #answer-container, #question").removeClass("hidden");
    renderQuestion();
});

$(".btn-answer").on("click", function (event) {
    selectedAns(event);
})

$("#reset").on("click", function (event) {
    reset();
})

$(".topic").on("click", function (event) {
    alert("Coming soon!");
})

function timer() {
    time--;
    $("#timer").html(time);
    if (time === 0) {
        noTime();
    }
};

function renderQuestion() {
    timeInterval = setInterval(timer, 1000);
    $("#question").html('<h2>' + questions[runningQuestion].question + '<h2>')

    for (var i = 0; i < questions[runningQuestion].answers.length; i++) {
        $(".button-" + [i]).html(questions[runningQuestion].answers[i]).attr('data-name', questions[runningQuestion].answers[i])
    }
}

function next() {
    time = 10;
    $("#timer").html(time);
    runningQuestion++;
    renderQuestion();

};

function noTime() {
    clearInterval(timeInterval);
    $("#question").html("<h1> Out of time! </h1>");
    if (runningQuestion === questions.length - 1) {
        setTimeout(showScore, 3000);
    } else {
        setTimeout(next, 3000);
    }
};

function showScore() {
    clearInterval(timeInterval);
    $("#question").append("<h1> Finished! </h1>");
    $("#question").append("<h1> Score: " + correctAns + "/" + (runningQuestion + 1) + "</h1>");

};

function selectedAns(event) { //https://api.jquery.com/event.target/
    clearInterval(timeInterval);
    if ($(event.target).data("name") == questions[runningQuestion].answerIndex) {
        correctCheck();
    } else {
        incorrectCheck();
    }

};

function correctCheck() {
    console.log("yes");
    correctAns++;
    $("#question").html("<h1> Correct! </h1>");
    if (runningQuestion === questions.length - 1) {
        setTimeout(showScore, 3000);
    } else {
        setTimeout(next, 3000);
    }
};

function incorrectCheck() {
    console.log("no");
    $("#question").html("<h1> Nope! </h1>");
    if (runningQuestion === questions.length - 1) {
        setTimeout(showScore, 3000);
    } else {
        setTimeout(next, 3000);
    }
};

function reset() {
    /* Eventually change this using jQuery UI, as system objects can't be styled.*/
    /* Will also need a way to pause the entire script until user confirms (or not, because it can be used to cheat). Browser will also error if script takes too long.*/
    var userConfirm = confirm("Are you sure you want to reset the game?");
    if (userConfirm == true) {
        clearInterval(timeInterval);
        time = 10;
        runningQuestion = 0;
        correctAns = 0;
        renderQuestion();
    }
};



/*
//https://opentdb.com/api_config.php
var queryURL = "https://opentdb.com/api.php?amount=20";
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
 
 
})
*/
