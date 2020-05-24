$(document).ready(function() {

    var card_max_width = "95%"
    var person_to_display = window.sessionStorage.getItem("person_to_display");

    $.ajax({
        type: 'GET',
        url: 'https://hyp-ave.herokuapp.com/v2/people/' + person_to_display,
        dataType: 'json',
        success: function(json) {

            $.each(json, function(index, obj) {
                if (obj.personId == person_to_display) {
                    name = obj.nameAndSurname;
                    descriptionText = obj.descriptionText;
                    birthday = obj.birthday;
                    var today = new Date;
                    var birth_date = new Date(parseInt(birthday.split("/")[2]), parseInt(birthday.split("/")[1]) - 1, parseInt(birthday.split("/")[0]))
                    age = Math.floor((today.getTime() - birth_date.getTime()) / (1000 * 3600 * 24 * 365))
                    profession = obj.profession;
                    role = obj.role;
                    img_path = obj.picturePath;

                    $("#name").text(name);
                    $("#age").text("Age: " + age);
                    $("#profession").text("Profession: " + profession);
                    $("#role").text("Role: " + role);
                    $("#descriptionText").text(descriptionText);
                    $("#img_person").attr("src", img_path);
                    $("#current-page").text(name);
                }
            })

        }
    });

    $.ajax({
        type: 'GET',
        // url: 'https://hyp-ave.herokuapp.com/v2/services{person-id}',
		url: 'https://hyp-ave.herokuapp.com/v2/services/',
        //url: './assets/js/services.json',
        dataType: 'json',
        success: function(json) {

            if (Object.keys(json).length > 0) {
                $("#involved-services-title").text("Related services");
            }

            $.each(json, function(index, service) {

                img_path = service.picturePath;
                name = service.name;
                descriptionText = service.descriptionText;
                serviceId = String(service.serviceId)

                var new_card = createServiceCard(serviceId, card_max_width, img_path, name, descriptionText)

            });
        }
    });


    $.ajax({
        type: 'GET',
		url: 'https://hyp-ave.herokuapp.com/v2/events/',
        //url: './assets/js/events.json',
        dataType: 'json',
        success: function(json) {

            if (Object.keys(json).length > 0) {
                $("#involved-events-title").text("Related events");
            }

            $.each(json, function(index, event) {

                img_path = event.picturePath;
                name = event.name;
                descriptionText = event.descriptionText;
                eventId = String(event.eventId)

                var new_card = createEventCard(eventId, card_max_width, img_path, name, descriptionText)
            });
        }
    });

});

function createServiceCard(serviceId, card_max_width, img_path, name, descriptionText) {

    var blockDiv = $('<div />')
        .addClass("row center-block")
        .attr("id", serviceId)
        .appendTo($('#show_services')); //div in which load the images

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
        .attr("style", "max-width:90%")
        .appendTo(col8);

    $("<h5 />")
        .addClass("card-title")
        .appendTo(cardbody)
        .text(name)

    var brief_description = descriptionText.slice(0, 50);

    $("<p />")
        .addClass("card-text")
        .appendTo(cardbody)
        .text(brief_description + "...")

    $("<a />")
        .addClass("button-card btn btn-info text-light")
        .attr("onclick", "goToService("  +  serviceId  +  ")")
        .appendTo(cardbody)
        .text("Read more")

}

function createEventCard(eventId, card_max_width, img_path, name, descriptionText) {

    var blockDiv = $('<div />')
        .addClass("row center-block")
        .attr("id", eventId)
        .appendTo($('#show_events')); //div in which load the images

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

    var brief_description = descriptionText.slice(0, 50);

    $("<p />")
        .addClass("card-text")
        .appendTo(cardbody)
        .text(brief_description + "...")

    $("<a />")
        .addClass("button-card btn btn-info text-light")
       	.attr("onclick", "goToEvent("  +  eventId  +  ")")
        .appendTo(cardbody)
        .text("Read more")

}

function goToService(serviceId){
  console.log("Going to service ".concat(serviceId));

  personId = String(serviceId);

  window.sessionStorage.setItem("service_to_display", serviceId);
  window.location = "./service.html";

}

function goToEvent(eventId){
  console.log("Going to event ".concat(eventId));

  eventId = String(eventId);

  window.sessionStorage.setItem("event_to_display", eventId);
  window.location = "./event.html";
}