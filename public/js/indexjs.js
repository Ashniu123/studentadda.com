//For modal-tabs
$("#signupLoginModal").on('show.bs.modal', function(e) {
var tab = e.relatedTarget.hash;
console.log(tab);
$('.nav-tabs a[href="'+tab+'"]').tab('show')
$(tab).addClass('active');
});

//Update Year in footer automatically
$('#copyrightYear').html(new Date().getFullYear());

//disabled button for signup
$("#signupLoginModal").on('shown.bs.modal',function(){
    var flag=true;
    function checkButton(){
        $('#buttonForSignup').prop('disabled',flag);
    }
    checkButton();
  $('#inputConfirmPasswordForSignup').change(function(){
    var pwd=$('#inputPasswordForSignup').val();
    if($(this).val()===pwd){
      flag=false;
      $('#validityError').html('');
    }else {
      flag=true;
      $('#validityError').html('The two passwords must match.');
    }

  });
  $('#terms_conditions').click(function(){
      if($('#terms_conditions').is(':checked')){
          flag=false;
          $('#validityError').html('');
      }else{
          flag=true;
          $('#validityError').html('Please read the Terms & Conditions');
      }
  });
  $('#inputEmailForSignup').change(function(){
     if(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi.test($(this).val())){
         flag=false;
         $('#validityError').html('');
     }else{
         $('#validityError').html('Invalid Email');
         flag=true;
     }
      checkButton();
  });
    $('#inputFirstName').change(function(){
        if(/[a-z]{3,}/gi.test($(this).val())){
            flag=false;
            $('#validityError').html('');
        }else{
            $('#validityError').html('Name should be at least 3 letters long and should contain only alphabets');
            flag=true;
        }
        checkButton();
    });
    $('#inputLastName').change(function(){
        if(/[a-z]{3,}/gi.test($(this).val())){
            flag=false;
            $('#validityError').html('');
        }else {
            $('#validityError').html('Name should be at least 3 letters long and should contain only alphabets');
            flag=true;
        }
        checkButton();
    });
    $('#inputPasswordForSignup').change(function(){
        if(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/ig.test($(this).val())){
            flag=false;
            $('#validityError').html('');
        }else {
            $('#validityError').html('Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters');
            flag=true;
        }
        checkButton();
    });

});
