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

$(document).ready(function (){

    var contact_id = 0;
    var event_id = 0; //qui verrà caricato dalla variabile cache nel caso di raggiungimento dall'esterno
    
    //con questa prima fetch andiamo a RIEMPIRE gli elementi statici della pagina
    fetch("./assets/js/events.json").then(function(response){ //qui la query la facciamo all'evento specifico con ID
        return response.json();
    }).then( function(json){
        console.log(json);

        //TODO fare controllo sul risultato della chiamata (serve??)

        var title = document.getElementById("event-title");
        var description = document.getElementById("description-text");
        var image_path = document.getElementById("main-image");
        var breadcrumb = document.getElementById("current-page");
        var date = document.getElementById("date");
        var time = document.getElementById("time");
        var city_html = document.getElementById("city");
        var address_html = document.getElementById("address");
    
        let {eventId, name, hour, day, month, year, address, city, picturePath, descriptionText, contactPerson} = json[0];

        contact_id = contactPerson;
        event_id = eventId;
    
        title.innerHTML = name;
        description.innerHTML = descriptionText;
        image_path.src = picturePath;
        breadcrumb.innerHTML = name;

        var string_month = months[month];
        var string_day = pretty_day(day);
        var pretty_date = string_month.concat(" ").concat(string_day).concat(" ".concat(year));

        date.children[0].innerHTML = pretty_date;
        time.innerHTML = hour;
        city_html.children[0].innerHTML = city;
        address_html.innerHTML = address;

    });

    //con questa fetch andiamo a prendere e COSTRUIRE l'elenco di servizi che sono stati presentati all'evento in questione
    fetch("./assets/js/people.json").then(function(response){ //chiamata specifica alla persona con id contact_id
        return response.json();
    }).then(function(json){
        
        //TODO fare controllo sul risultato della chiamata (serve??)
        console.log(json);

        if(json.length > 1){
            console.log("ERROR, TOO MANY PEOPLE");
            var related_person_col = document.getElementById("related-person-col")
            related_person_col.classList.add("disappear");
            return;
        }
        if(json.length == 0){
            console.log("ERROR, NO PEOPLE FOUND FOR THIS SERVICE");
            var related_person_col = document.getElementById("related-person-col")
            related_person_col.classList.add("disappear");
            return;
        }

        let {personId, nameAndSurname, birthday, picturePath, telephone, email, descriptionText, profession, role} = json[0];

        var contact_card_div = document.getElementById("contact-person-card");
        var card = createPersonCard(personId, nameAndSurname, role, picturePath); //fatto apposta così è facile da iterare
        card.appendTo(contact_card_div);

    });

    //creazione dell'elenco di servizi legati allo specifico evento
    fetch("./assets/js/services.json").then(function(response){ //chiamata specifica all'elenco di servizi legati all'evento (API pronta)
        return response.json();
    }).then(function(json){

        //TODO aggiungere controllo, se il return è vuoto eliminare il div dei servizi aggiungendo disappear come classe
        //TODO fare controllo sul risultato della chiamata (serve??)
        console.log(json);

        var list_len = json.length;
        var i = 0;
        var services_div = document.getElementById("presented-services-cards");

        if(list_len == 0){
            console.log("ERROR, NO SERVICES FOUND");
            var related_services_col = document.getElementById("presented-service-col")
            related_services_col.classList.add("disappear");
            return;
        }

        if(list_len > 2){
            console.log("ERROR, TOO MANY SERVICES");
            var related_services_col = document.getElementById("presented-service-col")
            related_services_col.classList.add("disappear");
            return;
        }

        for(i = 0; i < list_len; i++){
            
            let {serviceId, name, type, picturePath, descriptionText, address, eventId} = json[i];
            var card = createServiceCard(serviceId, name, type, picturePath); //fatto apposta così è facile da iterare
            card.appendTo(services_div);

        }

    });

});

function createPersonCard(personId, personNameSurname, personRole, img_path){
    var card = $('<div />')
        .addClass("card mb-3")
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
        .text("More about ".concat(personNameSurname));

    return card;
}

function createServiceCard(serivceId, serviceName, serviceType, img_path){
    var card = $('<div />')
        .addClass("card mb-3")
        .attr("id", serivceId);

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
        .text(serviceName)
        .appendTo(cardbody);

    $("<p />")
        .addClass("card-text left-15")
        .text(serviceType)
        .appendTo(cardbody);
    
    $("<button />")
        .addClass("button-card btn btn-info left-15")
        .appendTo(cardbody)
        .text("More");

    return card;
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

    /*
    var myList = document.querySelector("ul");
        fetch("v2/events/todaysevents").then(function(response){
            return response.json();
        }).then(function(json) {
            console.log(json);

            for (var i=0; i<json.length; i++){
                console.log("in da for");
                console.log(JSON.stringify(json));
                var listItem = document.createElement("li");
                let {eventId, name, hour, day, month, year, address, city, picturePath, descriptionText, contactPerson} = json[i];
                listItem.innerHTML = `${eventId} - ${day} - ${descriptionText} (${contactPerson}) `;
                myList.appendChild(listItem);
                console.log("my list", myList);
            }
        });
    */
