$(document).on('pageinit', function () {
    
    $(".submit").on("click", function(){

        $("#signInForm").validate({

            errorElement: "div",

            errorPlacement: function(error, element) {
                    //error.appendTo( element.parent().parent().find("div.errorPlacement"));
                    if (element.attr("name") === "txt_email") {
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
                $.mobile.loading( "show", {
                  text: "Verifying Credentials",
                  textVisible: true,
                  theme: "z",
                  html: ""
                });
                //save the user details.
                $.ajax({
                    type: "POST",
                    contentType:"application/json",
                    dataType : "json",
                    crossDomain: true,
                    url: "http://taxiapp.azurewebsites.net/users/logintry",
                    data: JSON.stringify(data)
                })
                .done(function( msg ) {
                   $.mobile.loading( "hide" ); 
                   window.location = "home.html";
                })
                .fail(function (){
                   $.mobile.loading( "hide" ); 

                })
                .always(function(){
                    $.mobile.loading( "hide" );
                });

            } 

        });

    });
});