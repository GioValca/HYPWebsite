$(document).ready(function() {

    $(".date_item").attr("onclick", "getNextEvents()")

})

function getNextEvents() {

    var id_day = $(".present").attr("data");

    console.log(id_day);

    var month = id_day.split('-')[1];
    var day = id_day.split('-')[0];
    var next_events = new Array();
    var card_max_width = "100%";
    var month_right = String(parseInt(month) + 1);

    console.log(month);
    console.log(day);

    $.ajax({
        type: 'GET',
        url: 'https://hyp-ave.herokuapp.com/v2/events/eventsbymonth/' + month_right,
        dataType: 'json',
        success: function(json) {


            $.each(json, function(index, event) {
                if (event.month >= parseInt(month_right) && event.day >= parseInt(day)) {
                    var temp = new Object();
                    temp["eventId"] = event.eventId;
                    temp["img_path"] = event.picturePath;
                    temp["name"] = event.name;
                    temp["day"] = event.day;
                    temp["month"] = event.month;
                    temp["descriptionText"] = event.descriptionText;
                    next_events.push(temp);
                }
            })
        }
    });

    console.log(next_events);

	//sort the events incrementally
    next_events.sort(function(a, b) {
        return a.day - b.day;
    })


	setTimeout(function(){
		for (var i = 0; i < 3; i++) {
        if (i < next_events.length) {
            let event = next_events[i];
            console.log(event);
            let img_path = event.img_path;
            let name = event.name;
            let descriptionText = event.descriptionText;
            let eventId = String(event.eventId)
            var new_card = createNextEventCard(eventId, card_max_width, img_path, name, descriptionText, i);
        }
    }
	}, 500)

}


function createNextEventCard(eventId, card_max_width, img_path, name, descriptionText, i) {

    var id_tag = "#next-event" + i;

    console.log(id_tag);

    var blockDiv = $('<div />')
        .addClass("row center-block")
        .attr("id", eventId)
        .appendTo($(id_tag)); //div in which load the card

    var card = $('<div />')
        .addClass("card top-10")
        .attr("style", "max-width: " + card_max_width + ";")
        .appendTo(blockDiv)

    var row = $('<div />')
        .addClass("row no-gutters")
        .appendTo(card)

    var col4 = $('<div />')
        .addClass("col-md-4")
        .appendTo(row)

    $('<img />')
        .attr('src', img_path) //image relative path
        .addClass("img-fluid card-img")
        .attr('name', name)
        .width("100%").height("100%")
        .appendTo(col4);

    var col8 = $('<div />')
        .addClass("col-md-8")
        .appendTo(row)

    var cardbody = $("<div />")
        .addClass("card-body")
        .appendTo(col8);

    $("<h5 />")
        .addClass("card-title")
        .appendTo(cardbody)
        .text(name)

    var brief_description = descriptionText.slice(0, 30);

    $("<p />")
        .addClass("card-text")
        .appendTo(cardbody)
        .text(brief_description + "...")

    $("<a />")
        .addClass("button-card btn btn-info text-light")
        .attr("onclick", "goToEvent(" + eventId + ")")
        .appendTo(cardbody)
        .text("Read more")

}

function goToEvent(eventId) {
    console.log("Going to event ".concat(eventId));
    eventId = String(eventId);
    //window.sessionStorage.setItem("event_to_display", eventId);
    window.location = "./event.html" + "?id=" + eventId + "&event-gt=none";
}