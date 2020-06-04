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


//aggiungere codice che dalla cashe tira fuori quale servizio far vedere
// e dare ID in input alla chiamata API per servizio

//TODO sostituire sessionStorage con meccanismo di retrieve di parametri dalla URL
//riporto qui sotto un esempio!
/*

*/

//var service_to_display = window.sessionStorage.getItem("service_to_display");
//service_to_display = 0

//loading from the URL which is the event to display
console.log("Loading service page");
let urlParams = new URLSearchParams(window.location.search);
let service_to_display = urlParams.get('id');

//retrieve the guided tour mode from the URL
let gt_mode = urlParams.get("service-gt");
let service_type = urlParams.get("service-type");

//variabili che sono modificate appena vengono caricate le informazioni del servizio
var event_to_display = 0;
    var card_max_width = "100%";

//guided tour functions, work on the paramenter service-gt
//there are 4 possibilities
//among all the services
//among the services of a certain type
//among the services related to a person ??
//among the services related to an event ??
function nextService(){
  var nextService_id = 0;

  if(gt_mode == "all"){
    all_services = window.sessionStorage.getItem("allServices");
    all_services = JSON.parse(all_services);

    var len = all_services.length;

    if(service_to_display == len - 1){
      nextService_id = 0;
    }
    else{
      nextService_id = parseInt(service_to_display) + 1;
    }

    window.location = "./service.html" + "?id=" + nextService_id + "&service-gt=all";
  }

  if(gt_mode == "type"){
    services_by_type = window.sessionStorage.getItem("servicesByType");
    services_by_type = JSON.parse(services_by_type);

    id_list = getListOfIds(services_by_type);
    id_list_len = id_list.length;

    event_to_show = 0;
    
    index = findIndex(service_to_display, id_list);
    if(index == id_list_len - 1){
        service_to_show = id_list[0];
    }
    else{
        service_to_show = id_list[index + 1];
    }

    window.location = "./service.html" + "?id=" + service_to_show + "&type=" + service_type + "&service-gt=type";
  }

  if(gt_mode == "person"){
    //si fa o no?
  }

  if(gt_mode == "event"){
    //si fa o no?
  }
  
}

function previousService(){
  var prevService_id = 0;

  if(gt_mode == "all"){
    all_services = window.sessionStorage.getItem("allServices");
    all_services = JSON.parse(all_services);

    var len = all_services.length;

    if(service_to_display == 0){
      prevService_id = len - 1;
    }
    else{
      prevService_id = parseInt(service_to_display) - 1;
    }

    window.location = "./service.html" + "?id=" + prevService_id + "&service-gt=all";
  }

  if(gt_mode == "type"){
    services_by_type = window.sessionStorage.getItem("servicesByType");
    services_by_type = JSON.parse(services_by_type);

    id_list = getListOfIds(services_by_type);
    id_list_len = id_list.length;

    event_to_show = 0;
    
    index = findIndex(service_to_display, id_list);
    if(index == 0){
        service_to_show = id_list[id_list_len - 1];
    }
    else{
        service_to_show = id_list[index - 1];
    }

    window.location = "./service.html" + "?id=" + service_to_show + "&type=" + service_type + "&service-gt=type";
 
  }

  //inserire qui altri casi


 
}

function getListOfIds(services){
  id_list = [];
  for(service of services){
      id_list.push(service["serviceId"]);
  }
  return id_list;
}

function findIndex(service_code, code_list){
  return code_list.findIndex(function check(el){
      return el == service_code;
  });
}


$(document).ready(function() {
  if(gt_mode == "none"){
    nextButton = document.getElementById("next-service");
    prevButton = document.getElementById("previous-service");
    nextButton.classList.add("disappear");
    prevButton.classList.add("disappear");
  }

	
  $("#gallery-carousel").on("slide.bs.carousel", function(e) {
    var $e = $(e.relatedTarget);
    var idx = $e.index();
    var itemsPerSlide = 3;
    var totalItems = $(".carousel-item").length;

    if (idx >= totalItems - (itemsPerSlide - 1)) {
      var it = itemsPerSlide - (totalItems - idx);
      for (var i = 0; i < it; i++) {
        // append slides to end
        if (e.direction == "left") {
          $(".carousel-item")
            .eq(i)
            .appendTo(".carousel-inner");
        } else {
          $(".carousel-item")
            .eq(0)
            .appendTo($(this).find(".carousel-inner"));
        }
      }
    }
  });

  //al posto del numero fissato andrà messo un qualcosa di dinamico che varia in base a cosa l'utente ha cliccato sul front End
  fetch("https://hyp-ave.herokuapp.com/v2/services/".concat(service_to_display)).then(function(response){ //chiamata specifica all'elenco di servizi legati all'evento (API pronta)
  return response.json();
    }).then(function(json){

      //TODO aggiungere controllo, se il return è vuoto eliminare il div dei servizi aggiungendo disappear come classe
      //TODO fare controllo sul risultato della chiamata (serve??)
      console.log(json);

      var title = document.getElementById("service-title");
      var description = document.getElementById("description-text");
      var type_html = document.getElementById("service-type");
      var image = document.getElementById("img_person");
      var breadcrumb = document.getElementById("current-page");
      var address_html = document.getElementById("service-address");

      let {serviceId, name, type, picturePath, descriptionText, address, eventId} = json[0];

      event_to_display = eventId;

      title.innerHTML = name;
      breadcrumb.innerHTML = name;
      description.innerHTML = descriptionText;
      type_html.innerHTML = type;
      address_html.innerHTML = address;
      image.src = picturePath;
      image.alt = "main-service-image-" + serviceId;
    }).then( function (){   

    fetch("https://hyp-ave.herokuapp.com/v2/events/".concat(event_to_display)).then(function(response){ //chiamata specifica all evento con id event_id_local
      return response.json();
      }).then(function(json){

        if(json.length == 0){
          var related_event_col = document.getElementById("related-event-column")
          related_event_col.classList.add("disappear");
          return;
        }
        if(json.length > 1){
          console.log("ERROR TOO MANY EVENTS FOUND");
          var related_event_col = document.getElementById("related-event-column")
          related_event_col.classList.add("disappear");
          return;
        }          

        let {eventId, name, hour, day, month, year, address, city, picturePath, descriptionText, contactPerson} = json[0];
        var event_card_div = document.getElementById("related-event");

        var string_month = months[month];
        var string_day = pretty_day(day);
        var pretty_date = string_month.concat(" ").concat(string_day).concat(" ".concat(year));
        
        var card = createEventCard(eventId, card_max_width, picturePath, name, pretty_date, hour);
        
        card.appendTo(event_card_div);

      });

    });

    fetch("https://hyp-ave.herokuapp.com/v2/peopleInvolvedInServices/findByService/".concat(service_to_display)).then(function(response){ //chiamata specifica all elenco di persone del servizio (API pronta)
      return response.json();
      }).then(function(people_in_service_json){
          
        console.log(people_in_service_json);

        var list_len = people_in_service_json.length;
        var i = 0;

        console.log("People for this service: ".concat(list_len));

        if(list_len > 5){
          console.log("ERROR TOO MANY PEOPLE IN THIS SERVICE");
          var related_people_col = document.getElementById("involved-people-col")
          related_people_col.classList.add("disappear");
          return;
        }

        if(list_len == 0){
          console.log("ERROR THERE ARE NO PEOPLE IN THIS SERVICE");
          var related_people_col = document.getElementById("involved-people-col")
          related_people_col.classList.add("disappear");
          return;
        }

        var contact_card_div = document.getElementById("contact-people-cards");

        for(i = 0; i < list_len; i++){
          let {personId, serviceId} = people_in_service_json[i];
          fetch("https://hyp-ave.herokuapp.com/v2/people/".concat(personId)).then(function(response){ //chiamata specifica all elenco di persone del servizio (API pronta)
          return response.json();
          }).then(function(json_person){
            console.log("logging json person")
            console.log(json_person);
            var card = createPersonCard(json_person[0]['personId'],json_person[0]['nameAndSurname'], json_person[0]['role'], json_person[0]['picturePath'], card_max_width, json_person[0]['profession']); //fatto apposta così è facile da iterare
            card.appendTo(contact_card_div)              
          });
          
        }
          
      });

      fetch("https://hyp-ave.herokuapp.com/v2/servicePictures/".concat(service_to_display)).then(function(response){ //chiamata specifica all elenco di persone del servizio (API pronta)
        return response.json();
        }).then(function(json){
            
          //TODO aggiungere controllo per lista vuota. se vuota bisogna eliminare il master div che contiene le related people.
          //TODO fare controllo sul risultato della chiamata (serve??)
          console.log(json);
  
          var list_len = json.length;
          var i = 0;
  
          if(list_len > 6){
            console.log("ERROR TOO MANY IMAGES IN THIS SERVICE, showing  the first 6");
            list_len = 6;
          }

          if(list_len <= 3){ //tolgo i comandi per andare avanti e indietro e blocco il carousel
            console.log("KILLING CAROUSEL CONTROLS");
            var carousel_controls = document.getElementById("carousel-controls")
            carousel_controls.classList.add("disappear");

            var second_slide_carousel = document.getElementById("gallery-carousel-item-2");
            second_slide_carousel.parentNode.removeChild(second_slide_carousel);

          }
  
          if(list_len == 0){
            console.log("ERROR THERE ARE NO IMAGES IN THIS SERVICE");
            var gallery_carousel = document.getElementById("gallery-row")
            gallery_carousel.classList.add("disappear");
            return;
          }
           
          for(i = 0; i < list_len; i++){
            let {serviceId, picturePath} = json[i];
            
            var gallery_image = document.getElementById("gallery-".concat(i+1));
            gallery_image.src = picturePath;
            gallery_image.alt = "service-image-gallery-"+i;

            console.log(gallery_image.src, picturePath)
  
          }
            
        });

});

function createPersonCard(personId, personNameSurname, personRole, img_path, card_max_width, profession){
	
	var container = $('<div />')
		.addClass("row no-gutters top-10")
	
    var card = $('<div />')
        .addClass("card card-dim")
        .attr("style", "max-width: " + card_max_width + ";")
	.appendTo(container)
	

    var row = $('<div />')
        .addClass("row-card")
        .appendTo(card)

    var col4 = $('<div />')
        .addClass("col-img-card")
        .appendTo(row)

    $('<img />')
        .attr('src', img_path) //image relative path
        .addClass("img-card-madsomma card-img")
        .attr("alt", "image-person-" + personId)
			.attr("style", "max-width: 350px;")
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
        .text(personNameSurname)

    $("<p />")
        .addClass("card-text")
        .appendTo(cardbody)
        .text("Role: " + personRole)
	
	$("<p />")
        .addClass("card-text description-text")
        .appendTo(cardbody)
        .text("Profession: " + profession)

	var button_div = $("<div />")
		.addClass("text-right")
		.appendTo(cardbody)
	
    $("<button />")
        .addClass("button-card btn text-light")
       	.attr("onclick", "goToPerson("  +  personId  +  ")")
        .appendTo(button_div)
        .text("Read more about this person")
	
	return container;
}

function createEventCard(eventId, card_max_width, img_path, name, date, hour) {

	var container = $('<div />')
		.addClass("row no-gutters top-10")
	
    var card = $('<div />')
        .addClass("card card-dim")
        .attr("style", "max-width: " + card_max_width + ";")
	.appendTo(container)

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
	
	return container;

}

function goToPerson(personId){
  console.log("Going to person ".concat(personId));
  personId = String(personId);
  //window.sessionStorage.setItem("person_to_display", personId);
  //lacia la pagina nuova (person.html).
  window.location = "./person.html" + "?id=" + personId + "&person-gt=none";

}

function goToEvent(eventId){
  console.log("Going to event ".concat(eventId));
  eventId = String(eventId);
  //window.sessionStorage.setItem("event_to_display", eventId);
  window.location = "./event.html" + "?id=" + eventId + "&event-gt=none";
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