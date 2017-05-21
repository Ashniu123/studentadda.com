//For modal-tabs
$("#signupLoginModal").on('show.bs.modal', function (e) {
    var tab = e.relatedTarget.hash;
    console.log(tab);
    $('.nav-tabs a[href="' + tab + '"]').tab('show');
    $(tab).addClass('active');
});

//Update Year in footer automatically
$('#copyrightYear').html(new Date().getFullYear());

//disabled button for signup
$("#signupLoginModal").on('shown.bs.modal', function () {
    function checkButton() {
        if ($('#inputPasswordForSignup').val() == $('#inputConfirmPasswordForSignup').val() &&
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi.test($('#inputEmailForSignup').val()) &&
            $('#inputFirstName').val().length > 2 && $('#inputLastName').val().length > 2 &&
            $('#terms_conditions').is(':checked')) {
            $('#buttonForSignup').prop('disabled', false);
        } else {
            $('#buttonForSignup').prop('disabled', true);
        }
    }
    checkButton();
    $('#inputConfirmPasswordForSignup').change(function () {
        var pwd = $('#inputPasswordForSignup').val();
        if ($(this).val() === pwd) {
            $('#validityError').html('');
        } else {
            $('#validityError').html('The two passwords must match.');
        }
        checkButton();
    });
    $('#terms_conditions').click(function () {
        if ($('#terms_conditions').is(':checked')) {
            $('#validityError').html('');
        } else {
            $('#validityError').html('Please read the Terms & Conditions');
        }
        checkButton();
    });
    $('#inputEmailForSignup').change(function () {
        if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi.test($(this).val())) {
            $('#validityError').html('');
        } else {
            $('#validityError').html('Invalid Email');
        }
        checkButton();
    });
    $('#inputFirstName').change(function () {
        if (/[a-z]{3,}/gi.test($(this).val())) {
            $('#validityError').html('');
        } else {
            $('#validityError').html('Name should be at least 3 letters long and should contain only alphabets');
        }
        checkButton();
    });
    $('#inputLastName').change(function () {
        if (/[a-z]{3,}/gi.test($(this).val())) {
            $('#validityError').html('');
        } else {
            $('#validityError').html('Name should be at least 3 letters long and should contain only alphabets');
        }
        checkButton();
    });
    $('#inputPasswordForSignup').change(function () {
        if (/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}/ig.test($(this).val())) {
            $('#validityError').html('');
        } else {
            $('#validityError').html('Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters');
        }
        checkButton();
    });
});

/*Ajax Calls here*/
$('#buttonForSignup').click(function(){
   if($(this).is(':disabled')){
       console.log('Should not work');
   }else{
       var signupData={};
       signupData.firstName=$('#inputFirstName').val();
       signupData.lastName=$('#inputLastName').val();
       signupData.email=$('#inputEmailForSignup').val();
       signupData.password=$('#inputpasswordforsignup').val();
       $.ajax({
           url:'/signup',
           method:"POST",
           contentType:"application/json",
           data:signupData,
           success:function(data){
               console.log("Success");
               console.log(JSON.stringify(data));
               if(data.status==true){
                    $('#validityError').html('Registration Successful!');
               }else{
                   $('#validityError').html('Registration Unsuccessful! User Already Exists!');
               }
           },
           error:function(){
               console.log('error');
           }
       });
   }
});

$('#buttonForLogin').click(function(){
    var loginData={};
    loginData.email=$('#inputEmailForLogin').val();
    loginData.password=$('#inputPasswordForLogin').val();
    if(loginData.email.length>5 && loginData.password.length>5){
        $.ajax({
            url:'/login',
            method:"POST",
            contentType:"application/json",
            data:loginData,
            success:function(data){
                console.log("Success");
                console.log(JSON.stringify(data));
                if(data.status==true){
                    localStorage.token=data.token;
                    window.location.href='/dashboard';
                }else{
                    $('#LoginError').html('Invalid Login Credentials!');
                }
            },
            error:function(){
                console.log('error');
            }
        });

    }else{
        $('#LoginError').html('Invalid Login Credentials');
    }
});