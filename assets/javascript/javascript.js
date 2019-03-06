// Initial array of movies
var topics =  [
	"ivanka trump",
	"kerry washington",
	"olivia munn",
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

$("#topic-view").empty();
for(i=0; i< topics.length; i++){

var a = $("<button>");
a.addClass("celeb-button")
a.attr("data-name", topics[i]);
a.text(topics[i]);
$("#buttons-view").append(a);
}



$("#add-topic").on("click", function(event) {
    event.preventDefault();

    var exist = false;
	if(topics.indexOf($("#topic-input").val()) !== -1) {
		exist = true;
	}
	if($("#topic-input").val() !== "" && exist === false) {
		var newCeleb = $("#topic-input").val().toLowerCase();
		topics.push(newCeleb);
		var button = $("<button>").text(newCeleb);
		button.attr("data-celeb", newCeleb);
		button.addClass("celeb-button");
		$("#buttons-view").append(button);

}
	$("#topic-input").val("");
});

// this function displays the gify images when clicked

$(document).on("click", ".celeb-button", function() {
	var celeb = $(this).attr("data-babe");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        celeb + "&api_key=wScGTRx7pLpVHN7HmwsyQN1B2p7MWPNr&limit=10";

    $.ajax({
    	url: queryURL,
    	method: "GET"
    }).done(function(response) {
    	var results = response.data;
    	// console.log(results);
console.log(results);

var results = $("<section class='results'>");
    
        for(var i = 0; i < results.length; i++) {
    		var resultDiv = $("<div class='result-div'>");
    		
    		var rating = results[i].rating;

            var p = $("<p>").text("Rating: " + rating);
            
            var celebImg = $("<img class='result'>");
			celebImg.attr("src", results[i].images.fixed_height.url);
            celebImg.attr("data-state", "still");
    		celebImg.attr("data-still", results[i].images.fixed_heighturl);
    		celebImg.attr("data-animate", results[i].images.fixed_height.url);

    		resultDiv.prepend(celebImg);
    		resultDiv.prepend(p);

    		results.prepend(resultDiv);
    	}

    	$("#topic-view").prepend(results);
    }
    )
});



$(document).on("click", ".celeb-button", function() {
	var state = $(this).attr("data-state");

	if(state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});
