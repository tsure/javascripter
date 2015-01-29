 $(function () {
    
    $("#scriptRating").igRating({
        value: 3
     });

     $("#saveRatings").on("click", function(){
         var ratingValue = $("#htmlRating").igRating("option","value");
         var comment = $("#bookmycabcomments").val();
         if(comment === "") {
         	comment = "N/A";
         }
         var data = {
          "ratingNumber" : ratingValue,
          "comment" : comment,
          "serviceName" : "bookmycab.com"

         };
          //alert("Rating value = "+ratingValue+" Comments = "+comment);
         $.ajax({
                  type: "POST",
                  contentType:"application/json",
                  dataType : "json",
                  crossDomain: true,
                  url: "http://taxiapp.azurewebsites.net/ratings/addrating",
                  data: JSON.stringify(data)
            })
            .done(function( msg ) {
                //$.mobile.loading( "hide" );
                alert(msg); 
                window.location = "home.html";
            })
            .fail(function (){
                //$.mobile.loading( "hide" ); 

             })
             .always(function(){
                //$.mobile.loading( "hide" );
             });

       });
});

    

