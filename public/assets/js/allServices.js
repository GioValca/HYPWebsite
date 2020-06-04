//getting the month to display from the cache
console.log("Showing all Services");

$(document).ready(function () {

	var title = document.getElementById("page-title");

	title.innerHTML = "All of our Services";

	fetch("https://hyp-ave.herokuapp.com/v2/services").then(function (response) {
		return response.json();
	}).then(function (json) {
		console.log(json);

		var list_len = json.length;

		//storing all the services for the guided tour thing
		window.sessionStorage.setItem("allServices", JSON.stringify(json));

		if (list_len == 0) {
			title.innerHTML = "There are no Services stored";
			var col_container = document.getElementById("col-container");
			var back_button = $("<button />")
				.addClass("our-button-color btn btn-info")
				.attr("onclick", "window.location =" + " \"" + "./index.html" + " \"")
				.text("Go back to the home page");

			back_button.appendTo(col_container);

			return;
		}

		var col_in_use = 1;

		var col1 = document.getElementById("col1");
		var col2 = document.getElementById("col2");

		//put a cards respectively into one column and another!

		for (i = 0; i < list_len; i++) {
			let {
				serviceId,
				name,
				type,
				picturePath,
				descriptionText,
				address,
				eventId
			} = json[i];
			if (col_in_use == 1) {
				var card = createServiceCard(serviceId, name, type, picturePath);
				card.appendTo(col1);
				console.log("appending card to col 1");
				col_in_use = 2;
				continue
			}

			if (col_in_use == 2) {
				var card = createServiceCard(serviceId, name, type, picturePath);
				card.appendTo(col2);
				console.log("appending card to col 2");
				col_in_use = 1;
				continue
			}

		}

	});

});

function goToService(serviceId) {
	console.log("Going to service ".concat(serviceId));
	serviceId = String(serviceId);
	//window.sessionStorage.setItem("service_to_display", serviceId);
	window.location = "./service.html" + "?id=" + serviceId + "&service-gt=all";
}

function createServiceCard(serviceId, serviceTitle, shortDesc, serviceImagePath) {

	var card = $('<div />')
		.addClass("card mb-3 top-10")
		.attr("id", serviceId);

	var row = $('<div />')
		.addClass("row no-gutters")
		.appendTo(card);

	var col4 = $('<div />')
		.addClass("col-md-4")
		.appendTo(row);

	$('<img />')
		.attr('src', serviceImagePath) //image relative path
		.addClass("img-fluid card-img")
		.attr('alt', "img-service-" + serviceId)
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
		.text(serviceTitle)
		.appendTo(cardbody);


	$("<p />")
		.addClass("card-text left-15")
		.text(shortDesc)
		.appendTo(cardbody);

	$("<button />")
		.addClass("button-card btn btn-info left-15")
		.appendTo(cardbody)
		.attr("onclick", "goToService" + "(" + serviceId + ")")
		.text("More about ".concat(serviceTitle));

	return card;
}