 $(function () {
    
        var data = {
          "serviceName" : "bookmycab.com"
        };
        $.ajax({
                  type: "POST",
                  contentType:"application/json",
                  dataType : "json",
                  crossDomain: true,
                  url: "http://taxiapp.azurewebsites.net/ratings/servicecomments",
                  data: JSON.stringify(data)
            })
            .done(function(response) {
                //$.mobile.loading( "hide" );
                //alert(response);
                $.each(response, function(index, review){
                  var reviewObj = review;
                  var rating = reviewObj.ratingNumber;
                  var comment = reviewObj.comment;
                  var showReviewAndComment = "Rating : "+rating+ "<p>"+comment+"</p>";
                  $("#reviewList").append('<li>'+showReviewAndComment+'</li>');
                });
                //window.location = "home.html";
                $('#reviewList').listview('refresh');

            })
            .fail(function (){
                //$.mobile.loading( "hide" ); 

             })
             .always(function(){
                //$.mobile.loading( "hide" );
             });

});

