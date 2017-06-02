$(document).ready(function(){




  function getCard(){
    var randomCard = [];
    var Card = $('.card-1');
    var num = Math.floor( Math.random() * Card.length);
    randomCard.push(Card[num]);
    //console.log(randomCard);
    if (Card.length > 1) {
  $(randomCard).appendTo('#test').fadeIn(500, function(){
        console.log(randomCard.length);
	$(randomCard).animate({
				"margin-top"    : "20%",
				"margin-left"   : "55%"

       }, 1000);
  });

} else  if(Card.length > 1) {
          $(randomCard).appendTo('#test').fadeIn(500, function(){
          $(randomCard).animate({
              "margin-top"    : "10%",
              "margin-left"   : "15%"

             }, 1000);

      });

    }

  };
      $('#make-bet').on('click', function(){
          getCard();
      });

  $('#file-submit').on('click', function(){
        var data = new FormData();
        var myFile = $('#file-input').prop('files');
        data.append('uploadFile', myFile[0]);

            $.ajax({
            url: '/upload',
            data: data,
            cache: false,
            contentType: false,
            processData: false,
            type: 'POST',
            success: function(response) {

                if(response.status == 'ok') {
                    $('#avatar-profile').attr('src', response.fileurl);

                }
            },

        });
    });

    $('#editProfiles').on('click', function(){
        $('.success-update').addClass('alert alert-success');
        $('.success-update').text('Updated Successfully');
        setTimeout(function(){
          $('.success-update').removeClass('alert alert-success').text('');
        }, 7000);
    });
    $('#editProfilesFacebook').on('click', function(e){
        e.preventDefault();
        $('.success-update').addClass('alert alert-success');
        $('.success-update').text('Updated Successfully');
        setTimeout(function(){
          $('.success-update').removeClass('alert alert-success').text('');
        }, 3000);
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

        if(!$('#userEmail').val().match(/\S+@{1}\S+\.\S+/)) {
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
