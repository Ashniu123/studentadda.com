//For modal-tabs
$("#signupLoginModal").on('show.bs.modal', function(e) {
var tab = e.relatedTarget.hash;
console.log(tab);
$('.nav-tabs a[href="'+tab+'"]').tab('show')
$(tab).addClass('active');
});

//For Disabled State of Buttons
$('#signupLoginModal').on('shown.bs.modal',function(){
  $('#buttonForForget').prop('disabled',true);
  $('#buttonForSignup').prop('disabled',true);
  $('#buttonForLogin').prop('disabled',true);


  //Forget Pwd Button
  $('#inputEmailForForget').keyup(function(){
    console.log($(this).val());
      if($(this).val().length !=0){
          $('#buttonForForget').prop('disabled', false);
      }
      else
      {
          $('#buttonForForget').prop('disabled', true);
      }
  });

  //Login Button
  $('#loginForm').focus(function(){
    var flag=0;//if flag is 0 disabled
    if($('#inputEmailForLogin').val().length!=0){
      flag=1;
    }
    else {
      flag=0;
    }

    if($('#inputPasswordForLogin').val().length==0){
      flag=0;
    }
    else {
      flag=1;
    }

    if(flag==1)
    {
        $('#buttonForLogin').prop('disabled', false);
    }
    else {
        $('#buttonForLogin').prop('disabled', true);
    }
  });


});
