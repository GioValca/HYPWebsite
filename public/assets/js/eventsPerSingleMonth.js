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

//getting the month to display from the cache
//var month_to_display = window.sessionStorage.getItem("month_to_display");
//console.log("Month to display " + month_to_display);

console.log("Loading events per month page");
let urlParams = new URLSearchParams(window.location.search);
let month_to_display = urlParams.get('month');

$(document).ready(function(){
    
    var breadcrumb = document.getElementById("current-page");
    var title = document.getElementById("page-title");

    breadcrumb.innerHTML = "Events of " + months[parseInt(month_to_display)];
    title.innerHTML = " Events of " + months[parseInt(month_to_display)];

    fetch("https://hyp-ave.herokuapp.com/v2/events/eventsbymonth/" + month_to_display).then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);

        var list_len = json.length;

        //saving the list of events of the spiecific month in the cache
        window.sessionStorage.setItem("events-of-month", JSON.stringify(json));

        if(list_len == 0){
            title.innerHTML = "There are no Events planned for " + months[month_to_display];
            var col_container = document.getElementById("col-container");
            var back_button = $("<button />")
                                .addClass("btn btn-info")
                                .attr("onclick", "window.location =" + " \"" +  "./eventsByMonth.html"  +" \"")
                                .text("Go back to the months view");

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
    window.location = "./event.html" + "?id=" + eventId + "&month=" + month_to_display + "&event-gt=month";
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