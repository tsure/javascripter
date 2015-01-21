$(function () {
    
    $(".submit").on("click", function(){

        $("#signInForm").validate({

            errorElement: "div",

            errorPlacement: function(error, element) {
                    //error.appendTo( element.parent().parent().find("div.errorPlacement"));
                    if (element.attr("name") == "txt_email") {
                      $(".txt_email_error").html(error.text());
                    } else {
                      $(".txt_password_error").html(error.text());
                    }
            },
            rules : {
                txt_email: {
                    required: true,
                    email: true
                },
                txt_password:"required"
            },
            submitHandler: function(form) {

               var data = {
                    "email" : $("#txt_email").val(),
                    "password": $("#txt_password").val()

                }

                //save the user details.
                $.ajax({
                    type: "POST",
                    contentType:"application/json",
                    dataType : "json",
                    crossDomain: true,
                    url: "http://taxiapp.azurewebsites.net:3000/users/logintry",
                    data: JSON.stringify(data)
                })
                .done(function( msg ) {
                   window.location = "home.html";
                })
                .fail(function (){
                    

                })
                .always(function(){

                });

            } 

        });

    });
});