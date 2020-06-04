let urlParams = new URLSearchParams(window.location.search);
let gt_mode = urlParams.get("person-gt");

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


$(document).ready(function() {

    if(gt_mode == "none"){
        nextButton = document.getElementById("next-person");
        prevButton = document.getElementById("previous-person");
        nextButton.classList.add("disappear");
        prevButton.classList.add("disappear");
    }

    var card_max_width = "100%";
    //var person_to_display = window.sessionStorage.getItem("person_to_display");

    //loading from the URL which is the event to display
    console.log("Loading person page");
    let urlParams = new URLSearchParams(window.location.search);
    let person_to_display = urlParams.get('id');

    $.ajax({
        type: 'GET',
        url: 'https://hyp-ave.herokuapp.com/v2/people/' + person_to_display,
        dataType: 'json',
        success: function(json) {
					
					var person_json = json[0];
					console.log(person_json);
                    name = person_json.nameAndSurname;
                    descriptionText = person_json.descriptionText;
                    birthday = person_json.birthday;
                    var today = new Date;
                    var birth_date = new Date(parseInt(birthday.split("/")[2]), parseInt(birthday.split("/")[1]) - 1, parseInt(birthday.split("/")[0]))
                    age = Math.floor((today.getTime() - birth_date.getTime()) / (1000 * 3600 * 24 * 365))
                    profession = person_json.profession;
                    role = person_json.role;
                    img_path = person_json.picturePath;
					phone = person_json.telephone;
					mail = person_json.email;

                    $("#name").text(name);
                    $("#age").text("Age: " + age);
                    $("#profession").text("Profession: " + profession);
                    $("#role").text("Role: " + role);
                    $("#descriptionText").text(descriptionText);
                    $("#img_person").attr("src", img_path);
                    $("#img_person").attr("alt", "main-image-person-"+person_json.personId)
                    $("#current-page").text(name);
					$("#mail").text(mail)
							  .attr("href", "mailto:" + mail)
					$("#phone").text(phone)
							   .attr("href", "tel:" + phone)
		}
    });

    $.ajax({
        type: 'GET',
		url: 'https://hyp-ave.herokuapp.com/v2/peopleInvolvedInServices/findByPerson/' + person_to_display,
        //url: './assets/js/services.json',
        dataType: 'json',
        success: function(json) {

            if (json.length > 0) {
                $("#involved-services-title").text("Related services");
            }

            $.each(json, function(index, service) {
				
				$.ajax({
					type: 'GET',
		url: 'https://hyp-ave.herokuapp.com/v2/services/' + service.serviceId,
        dataType: 'json',
        success: function(json_service) {

                img_path = json_service[0].picturePath;
                name = json_service[0].name;
                type = json_service[0].type;
                serviceId = String(json_service[0].serviceId)
				text = json_service[0].descriptionText;

                var new_card = createServiceCard(serviceId, card_max_width, img_path, name, type, text)
				}
				});

            });
        }
    });


    $.ajax({
        type: 'GET',
		url: 'https://hyp-ave.herokuapp.com/v2/events/eventsOfAPerson/' + person_to_display,
        dataType: 'json',
        success: function(json) {
			
            if (json.length > 0) {
                $("#involved-events-title").text("Related events");
            }
			
			
            $.each(json, function(index, event) {

                img_path = event.picturePath;
                name = event.name;
                var string_day = pretty_day(event.day);
				var date = months[event.month] + " " + string_day + " " + event.year;
                eventId = String(event.eventId);
				hour = event.hour;

                var new_card = createEventCard(eventId, card_max_width, img_path, name, date, hour)
            });
        }
    });
	
	 $.ajax({
        type: 'GET',
        url: 'https://hyp-ave.herokuapp.com/v2/people/',
        dataType: 'json',
        success: function(json) {
					
					var num_of_people = json.length;
					let current_id = parseInt(person_to_display);
			
					if ((current_id + 1) == num_of_people) {
						var next_person_id = 0;
					} else {
						var next_person_id = current_id + 1;
					}
			
					if ((current_id) == 0) {
						var prev_person_id = num_of_people - 1;
					} else {
						var prev_person_id = current_id - 1;
					}
			
					$("#previous-person").attr("onclick", "goToPerson("  +  prev_person_id  +  ")")
					
					$("#next-person").attr("onclick", "goToPerson("  +  next_person_id  +  ")")
		}
    });

});

function createServiceCard(serviceId, card_max_width, img_path, name, type, descriptionText) {

var blockDiv = $('<div />')
        .addClass("row center-block top-10")
        .attr("id", serviceId)
        .appendTo($('#show_services')); //div in which load the images

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
        .attr("alt", "image-service-" + serviceId)
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
        .text(type)
	
	var brief_description = descriptionText.slice(0, 70);
	
	$("<div />")
        .addClass("card-text description-text")
        .appendTo(cardbody)
	.text(brief_description + "...")

	
	var button_div = $("<div />")
		.addClass("text-right")
		.appendTo(cardbody)
	
    $("<button />")
        .addClass("button-card btn text-light")
       	.attr("onclick", "goToService("  +  serviceId  +  ")")
        .appendTo(button_div)
        .text("Read more about this service")

}

function createEventCard(eventId, card_max_width, img_path, name, date, hour) {

    var blockDiv = $('<div />')
        .addClass("row center-block top-10")
        .attr("id", eventId)
        .appendTo($('#show_events')); //div in which load the images

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
       	.attr("onclick", "goToEvent("  +  eventId  +  ")")
        .appendTo(button_div)
        .text("Read more about this event")

}

function goToService(serviceId){
  console.log("Going to service ".concat(serviceId));
  personId = String(serviceId);
  //window.sessionStorage.setItem("service_to_display", serviceId);
  window.location = "./service.html" + "?id=" + serviceId + "&service-gt=none";

}

function goToEvent(eventId){
  console.log("Going to event ".concat(eventId));
  eventId = String(eventId);
  //window.sessionStorage.setItem("event_to_display", eventId);
  window.location = "./event.html" + "?id=" + eventId + "&event-gt=none";
}

function goToPerson(personId){
  console.log("Going to person ".concat(personId));
  personId = String(personId);
  //window.sessionStorage.setItem("event_to_display", eventId);
  window.location = "./person.html" + "?id=" + personId;
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