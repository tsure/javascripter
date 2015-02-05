 $(function () {
    
        var data = {
          "serviceName" : "olacabs"
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
                  var ratingInStars = buildStarsToShowRating(rating);
                  var showReviewAndComment = ratingInStars+ "<p>"+comment+"</p><p>"+String(new Date(dateWhenRated))+"</p>";
                  $("#reviewList").append('<li style="padding-left: 16px;">'+showReviewAndComment+'</li>');
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

function buildStarsToShowRating(rating) {
  var startHtml="";
  for(var i=1; i<=rating; i++) {
    startHtml += '<img src="images/reviewstarsmall.png" style="position:relative"></img>'
  }
  return startHtml;
}   

