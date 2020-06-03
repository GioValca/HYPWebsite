//getting the month to display from the cache
console.log("Showing today's events");

$(document).ready(function(){
    
    var title = document.getElementById("page-title");

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
            if(col_in_use == 1){
                var card = createEventCard(eventId, name, descriptionText, picturePath);
                card.appendTo(col1);
                console.log("appending card to col 1");
                col_in_use = 2;
                continue
            }

            if(col_in_use == 2){
                var card = createEventCard(eventId, name, descriptionText, picturePath);
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

function createEventCard(eventId, eventTitle, eventDesc, eventImagePath){

    var shortDesc = eventDesc.slice(0, 100).concat("..."); 

    var card = $('<div />')
    .addClass("card mb-3 top-10")
    .attr("id", eventId);

    var row = $('<div />')
        .addClass("row no-gutters")
        .appendTo(card);

    var col4 = $('<div />')
        .addClass("col-md-4")
        .appendTo(row);

    $('<img />')
        .attr('src', eventImagePath)    //image relative path
        .addClass("img-fluid card-img")
        .attr('alt', "event-image-"+eventId)
        .width("100%").height("100%")
        .appendTo(col4);

    var col8 = $('<div />')
        .addClass("col-md-8")
        .appendTo(row)

    var cardbody = $("<div />")
        .addClass("card-body")
        .appendTo(col8);

    $("<h5 />")
        .addClass("card-title left-15")
        .text(eventTitle)
        .appendTo(cardbody);
        

    $("<p />")
        .addClass("card-text left-15")
        .text(shortDesc)
        .appendTo(cardbody);

    $("<button />")
        .addClass("button-card btn btn-info left-15")
        .appendTo(cardbody)
        .attr("onclick", "goToEvent"+ "("  +  eventId  +  ")")
        .text("More about ".concat(eventTitle));
    
    return card;
}