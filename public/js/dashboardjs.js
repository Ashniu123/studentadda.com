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
    $.ajax({
        url:'/login',
        method:"GET",
        contentType:"application/json",
        success:function(data){
            console.log("Success");
            console.log(JSON.stringify(data));
            if(data.status==true){
                localStorage.token=undefined;
                window.location.href='/index';
            }
        },
        error:function(){
            console.log('error');
        }
    })
});