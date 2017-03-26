var triviaQuestions = [];
var countAnswers = 1;
var triviaLength = 0;
var time = 23;
var killTime = 0;
var questions = [];

$( document ).ready(function() {
    $("#options").hide();
    $("#hideQuestion").hide();
    $("#timeBar").hide();
    startGame();
});

function triviaDataRequest(numQuestion, catagory) {

    var numOfQuestion = numQuestion || 20;
    var catagoryID= catagory || "";
    var buildCat = "&category="+catagoryID;

    triviaLength = numOfQuestion;

    $.ajax({
            url: "https://opentdb.com/api.php?amount=" +numOfQuestion+buildCat,
            type: "GET",
            dataType:"json"
    }).done(function(data) {
        console.log(data.results);
        questions = data.results;
        displayTrivia();

    }).fail(function() {
        console.log("something went wrong");
    });
}

function startGame() {

    $( "#startButton" ).on("click", function() {
        var questionNumber = $("#numQuestion").val();

        $("#options").show();
        $("#hideQuestion").show();
        $("#timeBar").show();

        $("#startButton").hide();
        $("#welcome").hide();

        triviaDataRequest(questionNumber);
    });
}

function displayTrivia() {

    var question = questions.pop();
    var questionStart = 0;
    var questionEnd = 0;
    var scrambledOptions = []
    var optionsArray = []

    $("#questionTrack").text("Question "+countAnswers+" of " + triviaLength);
    if(question.type === 'boolean') {
        $("#hideQuestion2").hide();
        $("#hideQuestion3").hide();
    }
    else{
        $("#hideQuestion0").show();
        $("#hideQuestion1").show();
        $("#hideQuestion2").show();
        $("#hideQuestion3").show();
    }

    for(var formatArray in question.incorrect_answers) {
        optionsArray.push(question.incorrect_answers[formatArray]);

    }
    optionsArray.push(question.correct_answer);
    questionEnd = optionsArray.length-1;

    scrambledOptions = mixOptions(optionsArray);

    for(questionStart; questionStart <= questionEnd; questionStart++) {
        $("#question"+questionStart).html(scrambledOptions[questionStart]);
    }

    $("#questionToAnswer").html(question.question);

    answerPicked(question.correct_answer, scrambledOptions);
    timeCountdown();
    countAnswers++;

}

function answerPicked(answer, allOptions) {
    $("#question0, #question1, #question2, #question3").click(function(e){
        time = 3;
        clearInterval(killTime);

        if( $(this).text() === answer) {
            $(this).parent().css("background-color","green");
            nextQuestion();
            return true;
        }
        else {
            $(this).parent().css("background-color","red");

            var rightAnswer = allOptions.indexOf(answer);
            $("#question"+rightAnswer).parent().css("background-color","green");
            nextQuestion();
            return false;
        }
    });
}

function mixOptions(optionsArray){

    var random  = 0;
    var selectionRandom = [];
    var alreadyGenerated = [];

    for(var run = optionsArray.length-1; run >= 0; run--) {
        random = Math.floor(Math.random() * run);

        if(random === optionsArray.length-1) {
            selectionRandom.push(optionsArray.splice(random)[0]);
        }
        else {
            selectionRandom.push(optionsArray.splice(random,1)[0]);
        }

    }
    return selectionRandom;
}

function timeCountdown() {
    killTime = setInterval(function(){
        $("#timeBar input").val(time);
        if(time === 0) {
            clearInterval(killTime);
            time = 23;
            $("#timeBar input").val(time);
            // if out of questions end
            displayTrivia();
        }
        else {
            time--;
        }
    },1000);
}
function nextQuestion() {
    killTime = setInterval(function(){
        $("#timeBar input").val(time);
        if(time === 0) {
            clearInterval(killTime);
            $("#timeBar input").val(time);
            $("#question0").parent().css("background-color","#FFFFFF");
            $("#question1").parent().css("background-color","#FFFFFF");
            $("#question2").parent().css("background-color","#FFFFFF");
            $("#question3").parent().css("background-color","#FFFFFF");
            time = 23;
            // if out of question end
            displayTrivia();
        }
        else {
            time--;
        }
    },1000);
}
// function selectedCatagory() {
//     $( "#categorySelected" ).children().click(function() {
//         console.log(this);
//     });
// }

/*
* 9 = General Knowledge
*
* 10 = Entertainment: Books
* 11 = Entertainment: Film
* 12 = Entertainment: Music
* 13 = Entertainment: Musicals and Theatres
* 14 = Entertainment: Television
* 15 = Entertainment: Video Games
* 16 = Entertainment: Board Games
* 31 = Entertainment: Japanese Anime and Manga
* 32 = Entertainment: Cartoon and amp; Animations
* 29 = Entertainment: Comics
*
* 17 = Science and Nature
* 18 = Science: Computers
* 19 = Science: Mathematics
* 30 = Science: Gadgets
*
* 21 = Sports
* 26 = Celebrities
* * 27 = Animals
* 28 = Vehicles
* 9 = General Knowledge
*
* 22 = Geography
* 23 = History
* 24 = Politics
* 25 = Art
* 20 = Mythology

 */
