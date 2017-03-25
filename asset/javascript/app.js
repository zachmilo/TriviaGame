var triviaQuestions = [];
var countAnswers = 1;
var triviaLength = 0;

$( document ).ready(function() {
    $("#options").hide();
    $("#hideQuestion").hide();
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

        displayTrivia(data.results);

    }).fail(function() {
        console.log("something went wrong");
    });
}

function startGame() {

    $( "#startButton" ).click(function() {
        var questionNumber = $("#numQuestion").val();

        $("#options").show();
        $("#hideQuestion").show();
        $("#startButton").hide();
        $("#welcome").hide();

        triviaDataRequest(questionNumber);
    });
}

function displayTrivia(questions) {
    var question = {};

    for (var hold in questions) {
        if(questions[hold].type === "boolean"){
            question = questions[hold];
            break;
        }
    }

    // handle question type question.type

    $("#questionTrack").text("Question "+countAnswers+" of " + triviaLength);

    var questionStart = 0;
    var questionEnd = 0;
    if(question.type === 'boolean') {
        $("#hideQuestion2").hide();
        $("#hideQuestion3").hide();
    }

    var optionsArray = question.incorrect_answers
    optionsArray.push(question.correct_answer)
    questionEnd = optionsArray.length-1;
    var scrambledOptions = mixOptions(optionsArray);

    for(questionStart; questionStart <= questionEnd; questionStart++) {
        $("#question"+questionStart).text(scrambledOptions[questionStart]);
    }


    countAnswers++;
    console.log(questions);
    $("#questionToAnswer").html(question.question);

    answerPicked(question.correct_answer);
}

function answerPicked(answer) {
    $("#question0, #question1, #question2, #question3").click(function(e){
        if( $(this).text() === answer) {
            $(this).parent().css("background-color","green");
            return true;
        }
        else {
        $(this).parent().css("background-color","red");    
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
            selectionRandom.push(optionsArray.splice(random));
        }
        else {
            selectionRandom.push(optionsArray.splice(random,1));
        }

    }
    return selectionRandom;
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
