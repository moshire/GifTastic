// Initial array of movies
var topics = [
	"ronaldo",
	"messi",
	"lebron James",
	"keira knightley",
	"natalie portman",
	"scarlett johansson",
	"jennifer lawrence",
	"emma watson",
	"kate upton",
	"salma hayek",
	"ariana grande",
	"carmen electra",
	"beyonce",
	"jessica biel",
	"adriana lima",
	"emilia clarke",
	"mila kunis",
	"alison brie",
	"lucy liu",
	"jamie chung"
];

for (var i = 0; i < topics.length; i++) {
	var button = $("<button>").text(topics[i]);
	button.attr("data-celeb", topics[i]);
	button.addClass("celeb-button")
	$("#buttons-view").append(button);
}

//this function will let the user to add their favorite celebrity and it prevents the user to add the same person twice

$("#add-celeb").on("click", function (event) {
	event.preventDefault();

	var exist = false;
	if (topics.indexOf($("#newCeleb-input").val()) !== -1) {
		exist = true;
	}
	else if ($("#newCeleb-input").val() !== "" && exist === false) {
		var newCeleb = $("#newCeleb-input").val().toLowerCase();

		topics.push(newCeleb);

		var button = $("<button>").text(newCeleb);

		button.attr("data-celeb", newCeleb);

		button.addClass("celeb-button");
		$("#buttons-view").append(button);

	}
	$("#newCeleb-input").val("");
});




// this function displays the gify images when clicked
$(document).on("click", ".celeb-button", function () {

	var celeb = $(this).attr("data-celeb");

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + celeb + "&api_key=wScGTRx7pLpVHN7HmwsyQN1B2p7MWPNr&limit=10";
	$.ajax({
		url: queryURL,
		method: "GET"
	}).then(function (response) {
		var results = response.data;
		// console.log(results) for testing;
		console.log(results);

		// creating anew variable to hold the whole results
		var resultsCountainer = $("<section class='result-container'>")
		for (var i = 0; i < results.length; i++) {

			// Creating a div for the one gif result
			var gifDiv = $("<div class='result-container'>");

			var rating = results[i].rating;

			var p = $("<p>").text("Rating: " + rating);


			// Creating an image tag
			var celebImage = $("<img class='result'>");

			// Giving the image tag an src attribute of a proprty pulled off the
			// result item
			celebImage.attr("src", results[i].images.fixed_height_still.url);
			celebImage.attr("data-state", "still");
			celebImage.attr("data-still", results[i].images.fixed_height_still.url);
			celebImage.attr("data-animate", results[i].images.fixed_height.url);


			// Appending the paragraph and celebImage we created to the "gifDiv" div we created
			gifDiv.prepend(celebImage);
			gifDiv.prepend(p);


			resultsCountainer.prepend(gifDiv);
		}
		$("#topic-view").prepend(resultsCountainer);
	});
});

// this function pauses the gif when clicked and starts moving when clicked again
$(document).on("click", ".result", function () {
	var state = $(this).attr("data-state");

	if (state === "still") {
		$(this).attr("src", $(this).attr("data-animate"));
		$(this).attr("data-state", "animate");
	} else {
		$(this).attr("src", $(this).attr("data-still"));
		$(this).attr("data-state", "still");
	}
});


