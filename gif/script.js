//API Key: tIVAz8SszsSyP8j7STkRirOn6zDvC3Vf

// Initial array of movies
var gifs = ["lol", "duh", "aww", "waiting", "thanks", "confused", "shocked"];

// As the name suggests, this function will display the Gifs
function displayGif() {
    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=tIVAz8SszsSyP8j7STkRirOn6zDvC3Vf&limit=10";

    // Creates AJAX call for the specific topic
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // Un-commenting the line below will delete the Gifs before displaying new ones.
        //$("#gifs-view").empty(); 
        console.log(response);
        for (var i = 0; i < response.data.length; i++) {
            var showGif = response.data[i].images.original.url;
            var pauseGif = response.data[i].images.original_still.url;
            var ratingGif = response.data[i].rating;
            console.log(ratingGif)
        // Creates a div to hold the gif and rating
            var $gifContainer = $("<div>").attr("class", "gifCont");
            var $showGif = $("<img>").attr("src", pauseGif).attr("class", "gifs").attr("data-still", pauseGif).attr("data-animate", showGif).attr("data-state", "still").attr("data-rating", ratingGif);
        // Appends the image
            $gifContainer.append($showGif);
            var showRating = "Rating: " + $(".gifs").attr("data-rating");
            $gifContainer.append("<p>" + showRating + "<p>");
        // Places all gifs inside the gifs-view container.
            $("#gifs-view").append($gifContainer);
        }
        $(".gifs").on("click", function () {
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
            } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
            }
        })

    });
}

// This function displays the buttons
function renderButtons() {
    // This function deletes the bottons before displaying new ones, saving memory.
    $("#buttons-view").empty();
    for (var i = 0; i < gifs.length; i++) {
        var a = $("<button class='col-1 btn mx-1 my-1'>");
        a.addClass("gif");
        a.attr("data-name", gifs[i]);
        a.text(gifs[i]);
        $("#buttons-view").append(a);
    }
}

// This function handles events where the add gif button is clicked
$("#add-gif").on("click", function (event) {
    event.preventDefault();
    // The line below will get the information from the user input and trim any folloing whitespace.
    var movie = $("#gif-input").val().trim();
    gifs.push(movie);
    renderButtons();
    $("#gif-input").val("");
});

$(".reset-button").on("click", function (event) {
    event.preventDefault();
    $("#gifs-view").empty();
})

// The below line adds an event listener for clicking any element with the "gif" class.
$(document).on("click", ".gif", displayGif);

// The function is called here to render the initial buttons.
renderButtons();
