window.onload = function () {
    var topics = ['Hockey', 'Game of Thrones', 'Winter Olympics', 'Play Station 4'];

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

    $('#add-topic').on("click", function(event) {   
        event.preventDefault();
        var topic = $('#topic-input').val();
        console.log(topic);
        topics.push(topic);
        renderTopicButtons();
    })

    function displayTopicGifs() {
        $('.gif-display').empty();
        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=WzbwbqfQttRx0QHozd4msZfKf8ijKE4E&q=" + topic + "&limit=10&lang=en";

        $.ajax({
            url: queryURL,
            method: 'GET',
        }).then(function(response) {
            console.log(response);
            // console.log(response.data);
            for (let i = 0; i < response.data.length; i++) {
                var gif = response.data[i].images.downsized.url;
                $('.gif-display').append('<img src=' + gif + ">");
                $('.gif-display').prop('border', '2px black solid');
            }   
        })
    }

    $(document).on("click", ".topic", displayTopicGifs);
}

