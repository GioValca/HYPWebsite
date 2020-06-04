//getting the month to display from the cache

console.log("Loading services by type page");
let urlParams = new URLSearchParams(window.location.search);
let type_to_display = urlParams.get('service-type');


console.log("Showing services of type " + type_to_display);

$(document).ready(function(){
    
    var title = document.getElementById("page-title");
    var bread = document.getElementById("breadcrumb");
	var card_max_width = "100%";

    bread.innerHTML = "Services of Type " + type_to_display;
    title.innerHTML = "Services of type " + type_to_display;

    fetch("https://hyp-ave.herokuapp.com/v2/services/typeOfServices/" + type_to_display).then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);

        var list_len = json.length;

        window.sessionStorage.setItem("servicesByType", JSON.stringify(json));

        if(list_len == 0){
            title.innerHTML = "There are no services stored of this type";
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
            let {serviceId, name, type, picturePath, descriptionText, address, eventId} = json[i];
            if(col_in_use == 1){
                var card = createServiceCard(serviceId, card_max_width, picturePath, name, type, descriptionText);
                card.appendTo(col1);
                console.log("appending card to col 1");
                col_in_use = 2;
                continue
            }

            if(col_in_use == 2){
                var card = createServiceCard(serviceId, card_max_width, picturePath, name, type, descriptionText);
                card.appendTo(col2);
                console.log("appending card to col 2");
                col_in_use = 1;
                continue
            }

        }

    });

});

function goToService(serviceId){
    console.log("Going to service of type ".concat(serviceId));  
    serviceId = String(serviceId);  
    //window.sessionStorage.setItem("service_to_display", serviceId);
    window.location = "./service.html" + "?id=" + serviceId + "&service-type=" + type_to_display + "&service-gt=type";
  }


function createServiceCard(serviceId, card_max_width, img_path, name, type, descriptionText) {

    var card = $('<div />')
        .addClass("card card-dim top-10")
        .attr("style", "max-width: " + card_max_width + ";")

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
	
	return card;

}