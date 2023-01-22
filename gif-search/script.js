var gifs = ["lol", "duh", "aww", "waiting", "thanks", "confused", "shocked"];

function displayGif() {
    var gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gif + "&api_key=tIVAz8SszsSyP8j7STkRirOn6zDvC3Vf&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (var i = 0; i < response.data.length; i++) {

            var showGif = response.data[i].images.original.url;
            var pauseGif = response.data[i].images.original_still.url;
            var ratingGif = response.data[i].rating;

            var $gifContainer = $("<div>").attr("class", "gifCont");
            var $showGif = $("<img>").attr("src", pauseGif).attr("class", "gifs").attr("data-still", pauseGif).attr("data-animate", showGif).attr("data-state", "still").attr("data-rating", ratingGif);

            $gifContainer.append($showGif);
            var showRating = "Rating: " + $(".gifs").attr("data-rating");
            $gifContainer.append("<p>" + showRating + "<p>");

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

function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < gifs.length; i++) {
        var a = $("<button class='col-1 btn mx-1 my-1'>");
        a.addClass("gif");
        a.attr("data-name", gifs[i]);
        a.text(gifs[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-gif").on("click", function (event) {
    event.preventDefault();
    var movie = $("#gif-input").val().trim();
    gifs.push(movie);
    renderButtons();
    $("#gif-input").val("");
});

$(".reset-button").on("click", function (event) {
    event.preventDefault();
    $("#gifs-view").empty();
})

$(document).on("click", ".gif", displayGif);

renderButtons();
