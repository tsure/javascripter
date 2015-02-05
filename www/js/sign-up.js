$(function () {
    
    $(".submit").on("click", function(){

        $("#signUpForm").validate({
            rules : {
                txt_first_name : "required",
                txt_last_name:"required",
                txt_email: {
                    required: true,
                    email: true
                },
                txt_password:"required",
                txt_password_confirm : {
                    //required : true,
                    equalTo : "#txt_password"
                }

            },
            submitHandler: function(form) {

                var data = {

                    "firstname" : $("#txt_first_name").val(),
                    "lastname" : $("#txt_last_name").val(),
                    "email" : $("#txt_email").val(),
                    "password": $("#txt_password").val()

                }
                 //save the user details.
                $.mobile.loading( "show", {
                  text: "Saving your data ...",
                  textVisible: true,
                  theme: "b",
                  html: ""
                });
                $.ajax({
                    type: "POST",
                    contentType:"application/json",
                    dataType : "json",
                    crossDomain: true,
                    url: "http://taxiapp.azurewebsites.net/users/createuser",
                    data: JSON.stringify(data)
                })
                .done(function( msg ) {
                   $.mobile.loading("hide");
                   window.location = "home.html"; 
                })
                .fail(function (){
                   $.mobile.loading("hide"); 

                })
                .always(function(){
                   $.mobile.loading("hide"); 
                });

            } 

        });

    });
});