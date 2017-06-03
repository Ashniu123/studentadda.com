//For Modal pills
$("#changeSettingsModal").on('show.bs.modal', function (e) {
    var tab = e.relatedTarget.hash;
    console.log(tab);
    $('.nav-pills a[href="' + tab + '"]').tab('show')
    $(tab).addClass('active');
});

//Update Year in footer automatically
$('#copyrightYear').html(new Date().getFullYear());

//disabled button for change password|add server side for current password
$("#changeSettingsModal").on('shown.bs.modal', function () {
    $('#buttonForPassword').prop('disabled', true);
    $('#inputConfirmPassword').keyup(function () {
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
    overwriteInitial: false,
    maxFileSize: 1000,
    showClose: false,
    showCaption: false,
    showUpload: false,
    browseLabel: '',
    removeLabel: '',
    uploadLabel: '',
    browseIcon: '<i class="glyphicon glyphicon-folder-open"></i> ',
    browseTitle: 'Choose Avatar',
    removeIcon: '<i class="glyphicon glyphicon-remove"></i> ',
    removeTitle: 'Cancel or reset changes',
    elErrorContainer: '#kv-avatar-errors',
    msgErrorClass: 'alert alert-block alert-danger',
    defaultPreviewContent: '<img src="img/avatar-default.png" alt="Your Avatar" class="avatar-preview">',
    allowedFileExtensions: ["jpg", "png", "gif", "jpeg"]
});

$('#inputAvatar').on('fileloaded', function (event, file, previewId, index, reader) {
    console.log("fileloaded");
    // console.log(reader.result);
    var url = noTrailingSlash(window.location.href) + '/user/avatar';
    var data = {
        "avatar": reader.result
    };
    $.ajax({
        url: url,
        method: "POST",
        data: data,
        success: function (data) {
            console.log(data);
        },
        error: function (err) {
            console.log(err);
        }
    });
});

//Ajax Calls here
function noTrailingSlash(site) {
    return site.replace(/\/$/g, "");
}

function getUserData() {
    var data = {};
    if (data.dob !== 'dd/mm/yyyy') data.dob = moment($('#inputDOB').val()).format('DD-MM-YYYY');
    if ($('#genderMale').is(':checked')) {
        data.gender = 'male';
    } else if ($('#genderFemale').is(':checked')) {
        data.gender = 'female';
    } else {
        data.gender = '';
    }
    data.college = $('#inputCollegeName').val();
    data.stream = $('#inputCollegeStream').val();
    if ($('#inputCollegeYear').find('option:selected').text() != '--Current Year--')
        data.current = $('#inputCollegeYear').find('option:selected').text();
    else
        data.current = '';
    data.branch = $('#inputCollegeBranch').val();
    return data;
}

function setUserData(data) {
    $('#navbarName').text(data.firstName + ' ' + data.lastName);
    $('#modal-title-firstName').text(data.firstName);
    $('#inputFirstName').val(data.firstName);
    $('#inputLastName').val(data.lastName);
    $('#inputEmail').val(data.username);
    if (data.hasOwnProperty('dob')) {
        $('#inputDOB').val(moment(data.dob).format('YYYY-DD-MM'));
    }
    if (data.hasOwnProperty('gender') && data.gender != null) {
        if (data.gender == 'male') {
            $('#genderMale').prop('checked', true);
        } else if (data.gender == 'female') {
            $('#genderFemale').prop('checked', true);
        }
    }
    if (data.hasOwnProperty('college')) {
        $('#inputCollegeName').val(data.college);
    }
    if (data.hasOwnProperty('stream')) {
        $('#inputcollegestream').val(data.stream);
    }
    if (data.hasOwnProperty('current')) {
        $('#inputCollegeYear').val(data.current).prop('selected', true);
    }
    if (data.hasOwnProperty('branch')) {
        $('#inputCollegeBranch').val(data.branch);
    }
    if (data.hasOwnProperty('avatar')) {
        $('.file-default-preview>img').attr('src', data.avatar);
        $('.profile-img').attr('src', data.avatar);
    }
}

$('#logoutButton').click(function () {
    var url = noTrailingSlash(window.location.href) + '/logout';
    $.ajax({
        url: url,
        method: "GET",
        contentType: "application/json",
        success: function (data) {
            if (data.status == true) {
                window.location.href = '../';
            }
        },
        error: function () {
            console.log('error');
        }
    })
});


//TODO: Avatar and user info
$(document).ready(function () {
    var url = noTrailingSlash(window.location.href) + '/user';
    $.ajax({
        url: url,
        method: "GET",
        contentType: "application/json",
        success: function (data) {
            setUserData(data);
        },
        error: function (err) {
            console.log(err);
        }
    });
});

function sendAndRetrieveUserData() {
    var url = noTrailingSlash(window.location.href) + '/user';
    var userData = getUserData();
    console.log('getUserData\n', userData);
    $.ajax({
        url: url,
        method: "POST",
        data: userData,
        success: function (data) {
            setUserData(data);
        },
        error: function (err) {
            console.log(err);
        }
    });
}

$('#buttonForPersonal').click(sendAndRetrieveUserData);
$('#buttonForCollege').click(sendAndRetrieveUserData);
