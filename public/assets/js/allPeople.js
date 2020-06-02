console.log("Showing all People");

$(document).ready(function(){
	
	$.ajax({
        type: 'GET',
        url: 'https://hyp-ave.herokuapp.com/v2/people/',
        dataType: 'json',
        success: function(json) {
					
			$.each(json, function(index, person){
				
				role = person.role;
				
				console.log(role);
				
				switch(role) {
					case "President":
						var card = createPersonCard(person.personId, person.nameAndSurname, person.picturePath, "350px");
						$("#president").append(card);
						break;
					case "Vice-President":
						var card = createPersonCard(person.personId, person.nameAndSurname, person.picturePath, "300px");
						$("#vice-pres").append(card);
						break;
					case "Secretary":
						var card = createPersonCard(person.personId, person.nameAndSurname, person.picturePath, "300px");
						$("#secretary").append(card);
						break;
					case "Councilor":
						var card = createPersonCard(person.personId, person.nameAndSurname, person.picturePath, "250px");
						var col = $('<div />').addClass("col-md-auto");
						card.appendTo(col);
						$("#third-row").append(col);
						break;		
				}
				
			});
		}
    });
});


function createPersonCard(personId, name, img_path, max_width){
    var container = $('<div />')
        .addClass("card-box-a container_img top-10 center-block")
        .attr("id", "person" + personId)
		.attr("style", "max-width:" + max_width + ";");
	
	var link_img = $('<a />')
		.attr("href", "./person.html" + "?id=" + personId)
		.appendTo(container);
	
		$('<img />')
			.attr("src", img_path)
			.attr("alt", "image-person-"+personId)
			.addClass("img-fluid")
			.appendTo(link_img);
	
	var bottom = $('<div />')
			.addClass("bottom_center")
			.appendTo(container);
	
		$('<a />')
			.attr("href", "./person.html" + "?id=" + personId)
			.addClass("text-light")
			.text(name.toLocaleUpperCase())
			.appendTo(bottom);

    return container;
}