//For modal-tabs
$("#signupLoginModal").on('show.bs.modal', function(e) {
var tab = e.relatedTarget.hash;
console.log(tab);
$('.nav-tabs a[href="'+tab+'"]').tab('show')
$(tab).addClass('active');
});

//disabled button for signup
$("#signupLoginModal").on('shown.bs.modal',function(){
  $('#inputConfirmPasswordForSignup').change(function(){
    var pwd=$('#inputPasswordForSignup').val();
    console.log(pwd+"\n"+$(this).val());
    if($(this).val()===pwd){
      $('#buttonForSignup').prop('disabled',false);
      $('#validityError').html('');

    }
    else {
      $('#buttonForSignup').prop('disabled',true);
      $('#validityError').html('The two passwords must match.');
    }
  });
});
