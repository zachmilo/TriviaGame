$( document ).ready(function() {
    $("#options").hide();
    $("#hideQuestion").hide();
    startGame();
});

function triviaDataRequest(numQuestion, catagory) {

    var numOfQuestion = numQuestion || 20
    var catagoryID= catagory || "";
    var buildCat = "&category="+catagoryID;

    $.ajax({
            url: "https://opentdb.com/api.php?amount=" +numQuestion+buildCat,
            type: "GET",
            dataType:"json"
    }).done(function(data) {
        return data;

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

        var triviaQuestions = triviaDataRequest(questionNumber);
    });
}

function displayQuestion() {

}

function displayOptions() {

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
