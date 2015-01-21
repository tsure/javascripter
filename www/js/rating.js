 $(function () {
    
    $("#scriptRating").igRating({
        value: 3
     });

     $("#saveRatings").on("click", function(){
         var ratingValue = $("#htmlRating").igRating("option","value");
          alert("Rating value = "+ratingValue);
       });
});

    

