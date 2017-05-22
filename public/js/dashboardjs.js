//For Modal pills
$("#changeSettingsModal").on('show.bs.modal', function(e) {
    var tab = e.relatedTarget.hash;
    console.log(tab);
    $('.nav-pills a[href="' + tab + '"]').tab('show')
    $(tab).addClass('active');
});

//Update Year in footer automatically
$('#copyrightYear').html(new Date().getFullYear());

//disabled button for change password|add server side for current password
$("#changeSettingsModal").on('shown.bs.modal', function() {
    $('#buttonForPassword').prop('disabled', true);
    $('#inputConfirmPassword').keyup(function() {
        var pwd = $('#inputNewPassword').val();
        console.log(this);
        console.log(pwd + "\n" + $(this).val());
        if ($(this).val() === pwd) {
            $('#buttonForPassword').prop('disabled', false);
            $('#validityError').html('');
        } else {
            $('#buttonForPassword').prop('disabled', true);
            $('#validityError').html('The two passwords must match.');
        }
    });

});

//Avatar
$("#inputAvatar").fileinput({
    overwriteInitial: true,
    maxFileSize: 1500,
    showClose: false,
    showCaption: false,
    browseLabel: '',
    removeLabel: '',
    browseIcon: '<i class="glyphicon glyphicon-folder-open"></i>',
    browseTitle: 'Choose Avatar',
    removeIcon: '<i class="glyphicon glyphicon-remove"></i>',
    removeTitle: 'Cancel or reset changes',
    elErrorContainer: '#kv-avatar-errors',
    msgErrorClass: 'alert alert-block alert-danger',
    defaultPreviewContent: '<img src="img/avatar-default.png" alt="Your Avatar" class="avatar-preview">',
    layoutTemplates: {
        main2: '{preview} {remove} {browse}'
    },
    allowedFileExtensions: ["jpg", "png", "gif", "jpeg"]
});

//Ajax Calls here
$('#logoutButton').click(function(){
    var url=window.location.href+'/logout';
    $.ajax({
        url:url,
        method:"GET",
        contentType:"application/json",
        success:function(data){
            console.log(JSON.stringify(data));
            if(data.status==true){
                localStorage.token=undefined;
                window.location.href='../';
            }
        },
        error:function(){
            console.log('error');
        }
    })
});


//TODO: Avatar and user info
$(document).ready(function(){
   var url=window.location.href+'/user';
   $.ajax({
       url:url,
       method:"GET",
       contentType:"application/json",
       headers:{'x-access-token':localStorage.token},
       success:function(data){
           console.log(data);
           $('#modal-title-firstName').text(data.firstName);
           $('#inputFirstName').val(data.firstName);
           $('#inputLastName').val(data.lastName);
           $('#inputEmail').val(data.username);
           if(data.hasOwnProperty('dob')){
               $('#inputDOB').val(data.dob);
           }
           if(data.hasOwnProperty('gender')){
               if(data.gender=='male'){
                   $('#genderMale').prop('checked',true);
               }else{
                   $('#genderFemale').prop('checked',true);
               }
           }
           if(data.hasOwnProperty('college')){
               $('#inputCollegeName').val(data.college);
           }
           if(data.hasOwnProperty('stream')){
               $('#inputcollegestream').val(data.stream);
           }
           if(data.hasOwnProperty('current')){
               $('#inputCollegeYear').val(data.current).prop('selected',true);
           }
           if(data.hasOwnProperty('branch')){
                $('#inputCollegeBranch').val(data.branch);
           }
       },
       error:function(err){
           console.log(err);
       }
   });
});