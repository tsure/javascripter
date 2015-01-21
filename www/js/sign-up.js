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
                    required : true,
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
                $.ajax({
                    type: "POST",
                    contentType:"application/json",
                    dataType : "json",
                    crossDomain: true,
                    url: "http://127.0.0.1:3000/users/createuser",
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