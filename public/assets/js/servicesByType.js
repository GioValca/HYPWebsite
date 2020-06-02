//getting the month to display from the cache
console.log("Showing all types of Services");

$(document).ready(function(){
    
    var title = document.getElementById("page-title");

    title.innerHTML = "Types Of Services";

    fetch("https://hyp-ave.herokuapp.com/v2/services/typeOfServices").then(function(response){
        return response.json();
    }).then(function(json){
        console.log(json);

        var list_len = json.length;

        if(list_len == 0){
            title.innerHTML = "There are no Types stored";
            var col_container = document.getElementById("col-container");
            var back_button = $("<button />")
                                .addClass("btn btn-info")
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
            let {type, picturePath} = json[i];
            if(col_in_use == 1){
                var card = createTypeCard(type, picturePath);
                card.appendTo(col1);
                console.log("appending card to col 1");
                col_in_use = 2;
                continue
            }

            if(col_in_use == 2){
                var card = createTypeCard(type, picturePath);
                card.appendTo(col2);
                console.log("appending card to col 2");
                col_in_use = 1;
                continue
            }

        }

    });

});

function goToServicsOfType(typeId){
    console.log("Going to service of type ".concat(typeId));  
    typeId = String(typeId);  
    //window.sessionStorage.setItem("service_to_display", typeId);
    window.location = "./servicesOfType.html" + "?service-type=" + typeId;
}

function createTypeCard(type, picturePath){

    var card = $('<div />')
    .addClass("card mb-3 top-10")
    .attr("id", type);

    var row = $('<div />')
        .addClass("row no-gutters")
        .appendTo(card);

    var col4 = $('<div />')
        .addClass("col-md-4")
        .appendTo(row);

    $('<img />')
        .attr('src', picturePath)    //image relative path
        .addClass("img-fluid card-img")
        .attr('alt', "img-service-" + type)
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
        .text(type)
        .appendTo(cardbody);        

    $("<button />")
        .addClass("button-card btn btn-info left-15")
        .appendTo(cardbody)
        .attr("onclick", "goToServicsOfType"+ "("  + "\"" + type  + "\"" +   ")")
        .text("More "+ type + " services");
    
    return card;
}