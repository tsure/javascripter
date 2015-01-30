 $(function () {
    
        var data = {
          "serviceName" : "meeru"
        };
        //show the loading icon
        $.mobile.loading( "show", {
                  text: "Loading reviews...",
                  textVisible: true,
                  theme: "z",
                  html: ""
        });
        $.ajax({
                  type: "POST",
                  contentType:"application/json",
                  dataType : "json",
                  crossDomain: true,
                  url: "http://taxiapp.azurewebsites.net/ratings/servicecomments",
                  data: JSON.stringify(data)
            })
            .done(function(response) {
                $.mobile.loading( "hide" );
                //alert(response);
                $.each(response, function(index, review){
                  var reviewObj = review;
                  var rating = reviewObj.ratingNumber;
                  var comment = reviewObj.comment;
                  var dateWhenRated = reviewObj.dateOfRating;
                  var showReviewAndComment = "Rating : "+rating+ "<p>"+comment+"</p><p>"+String(new Date(dateWhenRated))+"</p>";
                  $("#reviewList").append('<li>'+showReviewAndComment+'</li>');
                });
                $('#reviewList').listview('refresh');
            })
            .fail(function (){
                $.mobile.loading( "hide" ); 

             })
             .always(function(){
                $.mobile.loading( "hide" );
             });

});

