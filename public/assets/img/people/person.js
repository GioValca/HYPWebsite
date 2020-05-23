 $(document).ready(function () {
	 
	 	var card_max_width = "500px"

        $.ajax({
            type: 'GET',
            url: './assets/img/people/persons.xml',
            dataType: 'xml',
            success: function (xml) {
				
				var i = 0;

                $(xml).find('ref').each(function () {
					
					if( i < 5) {
						
						img = $(this).find('image').text();
						img_path = "assets/img/people/" + img
						title = $(this).find('title').text();
						alt = $(this).find('alt').text();
						id_div = "col_img_service_" + String(i)

						var blockDiv = $('<div />')
							.addClass("col-md-auto justify-content-center")
							.attr("id", id_div)
							.appendTo($('#show_services'));   //div in which load the images
						
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
							.attr('src', img_path)    //image relative path
							.addClass("img-fluid card-img")
							.attr('title', title)
							.attr('alt', alt)
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
							.text(title)
						
						
						$("<p />")
							.addClass("card-text")
							.appendTo(cardbody)
						
						$("<a />")
							.addClass("button-card btn btn-primary")
							.attr("href", "#")		//TODO update dinamically
							.appendTo(cardbody)
							.text("Read more")
						
					
					}
					
					i++;
                });
            }
        });
	 
	 $.ajax({
            type: 'GET',
            url: './assets/img/events/events.xml',
            dataType: 'xml',
            success: function (xml) {
				
				var i = 0;

                $(xml).find('ref').each(function () {
					
					if( i < 4) {
						
						img = $(this).find('image').text();
						img_path = "assets/img/events/" + img
						title = $(this).find('title').text();
						alt = $(this).find('alt').text();
						id_div = "col_img_event_" + String(i)

						var blockDiv = $('<div />')
							.addClass("col-md-auto justify-content-center")
							.attr("id", id_div)
							.appendTo($('#show_events'));   //div in which load the images
						
						var card = $('<div />')
							.addClass("card top-10")
							.attr("style", "width: " + card_max_width + ";")
							.appendTo(blockDiv)

						$('<img />')
							.attr('src', img_path)    //image relative path
							.addClass("img-fluid card-img-top")
							.attr('title', title)
							.attr('alt', alt)
							.width(card_max_width).height(card_max_width)
							.appendTo(card);
						
						var cardbody = $("<div />")
							.addClass("card-body")
							.appendTo(card);
						
						$("<h5 />")
							.addClass("card-title")
							.appendTo(cardbody)
							.text(title)
						
						
						$("<p />")
							.addClass("card-text")
							.appendTo(cardbody)
						
						$("<a />")
							.addClass("btn btn-primary stretched-link")
							.attr("href", "#")		//TODO update dinamically
							.appendTo(cardbody)
							.text("More")
					
					}
					
					i++;
                });
            }
        });
	 
    });