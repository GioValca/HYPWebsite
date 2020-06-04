//getting the month to display from the cache
console.log("Showing today's events");

var months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
}

$(document).ready(function(){
    
    var title = document.getElementById("page-title");
	var card_max_width = "100%";

    title.innerHTML = " Events of Today";

    fetch("https://hyp-ave.herokuapp.com/v2/events/todaysevents").then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);

        var list_len = json.length;

        if(list_len == 0){
            title.innerHTML = "There are no Events planned for today";
            var col_container = document.getElementById("col-container");
            var back_button = $("<button />")
                                .addClass("our-button-color btn btn-info")
                                .attr("onclick", "window.location =" + " \"" +  "./index.html"  +" \"")
                                .text("Go back to the home page");

            back_button.appendTo(col_container);
            
            return;
        }

        var col_in_use = 1;

        var col1 = document.getElementById("col1");
        var col2 = document.getElementById("col2");

        //put a cards respectively into one column and another!

        for(i = 0; i < list_len; i++){
            let {eventId, name, hour, day, month, year, address, city, picturePath, descriptionText, contactPerson} = json[i];
			 var string_day = pretty_day(day);
				var date = months[month] + " " + string_day + " " + year;
            if(col_in_use == 1){
                var card = createEventCard(eventId, card_max_width, picturePath, name, date, hour);
                card.appendTo(col1);
                console.log("appending card to col 1");
                col_in_use = 2;
                continue
            }

            if(col_in_use == 2){
                var card = createEventCard(eventId, card_max_width, picturePath, name, date, hour);
                card.appendTo(col2);
                console.log("appending card to col 2");
                col_in_use = 1;
                continue
            }

        }

    });

});

function goToEvent(eventId){
    console.log("Going to event ".concat(eventId));  
    eventId = String(eventId);  
    //window.sessionStorage.setItem("event_to_display", eventId);
    window.location = "./event.html" + "?id=" + eventId + "&event-gt=today";
  }


function createEventCard(eventId, card_max_width, img_path, name, date, hour) {

    var blockDiv = $('<div />')
        .addClass("row center-block top-10")
        .attr("id", eventId)
	
    var card = $('<div />')
        .addClass("card card-dim")
        .attr("style", "max-width: " + card_max_width + ";")
        .appendTo(blockDiv)

    var row = $('<div />')
        .addClass("row-card")
        .appendTo(card)

    var col4 = $('<div />')
        .addClass("col-img-card")
        .appendTo(row)

    $('<img />')
        .attr('src', img_path) //image relative path
        .addClass("img-card-madsomma card-img")
        .attr("alt", "image-event-" + eventId)
        .appendTo(col4);

    var col8 = $('<div />')
        .addClass("col-body-card")
        .appendTo(row)

    var cardbody = $("<div />")
        .addClass("card-body-mad")
        .appendTo(col8);

    $("<h5 />")
        .addClass("card-title")
        .appendTo(cardbody)
        .text(name)

    $("<p />")
        .addClass("card-text")
        .appendTo(cardbody)
        .text(date)
	
	$("<div />")
        .addClass("card-text description-text")
        .appendTo(cardbody)
	.text("Time: " + hour)

	var button_div = $("<div />")
		.addClass("text-right")
		.appendTo(cardbody)
	
    $("<button />")
        .addClass("button-card btn text-light")
       	.attr("onclick", "goToService("  +  eventId  +  ")")
        .appendTo(button_div)
        .text("Read more about this event")
	
	return blockDiv;

}

function pretty_day(day){
    var j = day % 10,
    k = day % 100;
    if (j == 1 && k != 11) {
        return day + "st";
    }
    if (j == 2 && k != 12) {
        return day + "nd";
    }
    if (j == 3 && k != 13) {
        return day + "rd";
    }
    return day + "th";
}