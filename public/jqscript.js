$(document).ready(function(){
    $(".show-cards").hide();
    $("#make-bet").click(function(){
        $(".show-cards").show();
    });
    $("#hide-cards").click(function(){
        $(".show-cards").hide();
    });
  var form = $('#signform');
  $(form).on('submit', function(e){
    if($('#userPassword').val() === "") {
         e.preventDefault();
         $('.error-2').addClass('alert alert-danger');
         $('.error-2').text('Fill the password');
         $('#userPassword').css('border', '1px solid red');
    }   else {
         $('.error-2').removeClass('alert alert-danger');
         $('.error-2').text('');
         $('#userPassword').css('border', '');
    }


        if(!$('#userEmail').val().match(/\S+@\S+\.\S+/)) {
          e.preventDefault();
          $('.error').text('Email is incorrect');
          $('.error').addClass('alert alert-danger');
          $('#userEmail').css('border', '1px solid red');

        } else {
          $('.error').text('');
          $('.error').removeClass('alert alert-danger');
          $('#userEmail').css('border', '');

        }
     })
        $('#userEmail').on('blur', function(){
              if($('#userEmail').val() === ""){
                    $('.error').text('Fill the email');
                    $('.error').addClass('alert alert-danger');
                    $('#userEmail').css('border', '1px solid red');

              } else {
                $('.error').text('');
                $('.error').removeClass('alert alert-danger');
                $('#userEmail').css('border', '');
              }

        })
             $('#userEmail').on('focus', function(){
             $('.error').text('');
             $('.error').removeClass('alert alert-danger');
             $('#userEmail').css('border', '');

           })
           $('#userPassword').on('blur', function(){
                 if($('#userPassword').val() === ""){
                       $('.error-2').text('Fill the password');
                       $('.error-2').addClass('alert alert-danger');
                       $('#userPassword').css('border', '1px solid red');

                 } else {
                   $('.error').text('');
                   $('.error').removeClass('alert alert-danger');
                   $('#userEmail').css('border', '');
                 }

           })




           $('#userPassword').on('focus', function(){
             $('.error-2').text('');
             $('.error-2').removeClass('alert alert-danger');
             $('#userPassword').css('border', '');

           })




});
