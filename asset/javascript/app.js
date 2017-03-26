var triviaQuestions = [];
var countAnswers = 1;
var triviaLength = 0;
var killTime = 0;
var questions = [];
var wrong = 0;
var right = 0;

$( document ).ready(function() {
    $("#options").hide();
    $("#hideQuestion").hide();
    $("#timeBar").hide();
    $("#correct").hide();
    $("#incorrect").hide();
    startGame();
});




function triviaDataRequest(numQuestion) {

    var numOfQuestion = numQuestion || 20;

    triviaLength = numOfQuestion;

    $.ajax({
            url: "https://opentdb.com/api.php?amount=" +numOfQuestion,
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
        countAnswers = 1;
        wrong = 0;
        right = 0;

        $("#correct").attr("data-badge",right);
        $("#incorrect").attr("data-badge",wrong);

        $("#options").show();
        $("#hideQuestion").show();
        $("#timeBar").show();
        $("#correct").show();
        $("#incorrect").show();

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
    timeCountdown(question.correct_answer, scrambledOptions);
    countAnswers++;
}




function answerPicked(answer, allOptions) {
    $("#question0, #question1, #question2, #question3").parent().on("click",function(e) {
        clearInterval(killTime);
        $("div").off("click");
        if( $(this).text() === answer) {
            $(this).css("background-color","green");
            right++;
            $("#correct").attr("data-badge",right);
            nextQuestion();
            return true;
        }
        else {
            $(this).css("background-color","red");

            var rightAnswer = allOptions.indexOf(answer);
            $("#question"+rightAnswer).parent().css("background-color","green");

            wrong++;
            $("#incorrect").attr("data-badge",wrong);
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




function timeCountdown(answer, allOptions) {
    time = 23;
    killTime = setInterval(function(){
        $("#timeBar input").val(time);
        if(time === 0) {
            clearInterval(killTime);
            $("#timeBar input").val(time);
            wrong++;
            $("#incorrect").attr("data-badge",wrong);
            if(questions.length-1 === 0) {
                endGame();
            }
            else {
                var rightAnswer = allOptions.indexOf(answer);
                $("#question"+rightAnswer).parent().css("background-color","green");
                nextQuestion();
            }
        }
        else {
            time--;
        }
    },1000);
}




function nextQuestion() {
    time = 3;
    killTime = setInterval(function(){
        $("#timeBar input").val(time);
        if(time === 0) {
            clearInterval(killTime);
            $("#timeBar input").val(time);
            $("#question0").parent().css("background-color","#FFFFFF");
            $("#question1").parent().css("background-color","#FFFFFF");
            $("#question2").parent().css("background-color","#FFFFFF");
            $("#question3").parent().css("background-color","#FFFFFF");
            console.log(questions.length-1);
            if(questions.length === 0) {
                endGame();
            }
            else {
                displayTrivia();
            }
        }
        else {
            time--;
        }
    },1000);
}




function endGame() {
    $("#options").hide();
    $("#hideQuestion").hide();
    $("#timeBar").hide();
    $("#correct").hide();
    $("#incorrect").hide();
    $("#startButton").show();
    $("#welcome").show();
    $("#finalScore").text(right);
    startGame();
}
