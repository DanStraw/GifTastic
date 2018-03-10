window.onload = function () {
    var topics = ['Hockey', 'Game of Thrones', 'PS4', 'Winter Olympics', 'cars', 'dogs'];
    //renders the buttons onto the page. Runs on page load to render original topics array and whenever user clicks add a topic button
    function renderTopicButtons() {
        $("#topic-buttons").empty();
        topics.forEach(element => {
            var b = $('<button>');
            b.addClass("topic");
            b.attr('data-name', element);
            b.text(element);
            $('#topic-buttons').append(b);
        })
    }
    renderTopicButtons(); 
    //on click function to add new topic button onto page
    function addTopicButton() {
        event.preventDefault();
        var topic = $('#topic-input').val().trim();
        if (topic === '') {
            return false;
        } else {
            topics.push(topic);
            renderTopicButtons();
            $("#topic-input").val(" ");
        }
    }
    //on click function that displays 10 gifs of the chosen topic button
    function displayTopicGifs() {
        $('.display-area').empty();
        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=WzbwbqfQttRx0QHozd4msZfKf8ijKE4E&q=" + topic + "&limit=10&offset=0&lang=en";
        var test = "test";
        $.ajax({
            url: queryURL,
            method: 'GET',
        }).then(function(response) {
            for (let i = 0; i < response.data.length; i++) {
                //create a div for each gif. this will hold the gif and the rating
                var gifDisplay = $('<div>')
                gifDisplay.addClass("gif-Display");
                var gif = $('<img>');
                console.log(response);
                var stillState = response.data[i].images.fixed_height_still.url;
                var animatedState = response.data[i].images.fixed_height.url;
                gif.attr({
                    "src": stillState,
                    "data-still": stillState,
                    "data-animate": animatedState,
                    "data-state": "still",
                });
                gif.addClass('gif');
                gifDisplay.append(gif);
                var rating = $("<p>").text("Rating: " + response.data[i].rating.toUpperCase());
                gifDisplay.append(rating);
                $('.display-area').append(gifDisplay);   
            }     
        })  
    }
    //on click function that changes data state of giphy from still to animated and back
    function changeDataState() {
        var state = $(this).attr("data-state");
        if (state === 'still') {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr('data-state', "animate");
        } else if (state === 'animate') {
            $(this).attr("src", $(this).data("still"));
            $(this).attr('data-state', "still");
        }
    } 
    $(document).on("click", ".gif", changeDataState); 
    $(document).on("click", '#add-topic', addTopicButton);
    $(document).on("click", ".topic", displayTopicGifs);
}

