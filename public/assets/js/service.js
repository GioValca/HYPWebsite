//aggiungere codice che dalla cashe tira fuori quale servizio far vedere
// e dare ID in input alla chiamata API per servizio

//TODO sostituire sessionStorage con meccanismo di retrieve di parametri dalla URL
//riporto qui sotto un esempio!
/*

*/

//var service_to_display = window.sessionStorage.getItem("service_to_display");
//service_to_display = 0

console.log("Loading service page");
let urlParams = new URLSearchParams(window.location.search);
let service_to_display = urlParams.get('id');


//variabili che sono modificate appena vengono caricate le informazioni del servizio
var event_to_display = 0;


$(document).ready(function() {
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
      var image_path = document.getElementById("main-image");
      var breadcrumb = document.getElementById("current-page");
      var address_html = document.getElementById("service-address");

      let {serviceId, name, type, picturePath, descriptionText, address, eventId} = json[0];

      event_to_display = eventId;

      title.innerHTML = name;
      breadcrumb.innerHTML = name;
      description.innerHTML = descriptionText;
      type_html.innerHTML = type;
      address_html.innerHTML = address;
      image_path.src = picturePath;
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

        var shortDesc = descriptionText.slice(0, 100).concat("...");
        
        var card = createEventCard(eventId, name, shortDesc, picturePath);
        
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
            var card = createPersonCard(json_person[0]['personId'],json_person[0]['nameAndSurname'], json_person[0]['role'], json_person[0]['picturePath']); //fatto apposta così è facile da iterare
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

            console.log(gallery_image.src, picturePath)
  
          }
            
        });

});

function createPersonCard(personId, personNameSurname, personRole, img_path){
  var card = $('<div />')
      .addClass("card mb-3 top-10")
      .attr("id", personId);

  var row = $('<div />')
      .addClass("row no-gutters")
      .appendTo(card);

  var col4 = $('<div />')
      .addClass("col-md-4")
      .appendTo(row);
  
  $('<img />')
      .attr('src', img_path)    //image relative path
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
      .text(personNameSurname)
      .appendTo(cardbody);
      

  $("<p />")
      .addClass("card-text left-15")
      .text(personRole)
      .appendTo(cardbody);
  
  $("<button />")
      .addClass("button-card btn btn-info left-15")
      .appendTo(cardbody)
      .attr("onclick", "goToPerson("  +  personId  +  ")")
      .text("More about ".concat(personNameSurname));

  return card;
}

function createEventCard(eventId, eventName, shortEventDesc, img_path){
  var card = $('<div />')
    .addClass("card left-15 ")
    .attr("id", eventId);

  $('<img />')
    .attr('src', img_path)    //image relative path
    .addClass("img-fluid card-img-top ")
    .width("100%").height("100%")
    .appendTo(card);

  var body = $('<div />')
      .addClass("card-body")
      .appendTo(card);

  
  $("<h5 />")
      .addClass("card-title ")
      .text(eventName)
      .appendTo(body);
      

  $("<p />")
      .addClass("card-text ")
      .text(shortEventDesc)
      .appendTo(body);
  
  $("<button />")
      .addClass("btn btn-info ")
      .attr("onclick", "goToEvent(" + eventId  + ")")
      .appendTo(body)
      .text("More about ".concat(eventName));

  return card;
}

function goToPerson(personId){
  console.log("Going to person ".concat(personId));
  personId = String(personId);
  //window.sessionStorage.setItem("person_to_display", personId);
  //lacia la pagina nuova (person.html).
  window.location = "./person.html" + "?id=" + personId;

}

function goToEvent(eventId){
  console.log("Going to event ".concat(eventId));
  eventId = String(eventId);
  //window.sessionStorage.setItem("event_to_display", eventId);
  window.location = "./event.html" + "?id=" + eventId;
}