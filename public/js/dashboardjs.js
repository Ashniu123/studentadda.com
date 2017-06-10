//For Modal pills
$("#changeSettingsModal").on('show.bs.modal', function (e) {
    var tab = e.relatedTarget.hash;
    console.log(tab);
    $('.nav-pills a[href="' + tab + '"]').tab('show');
    $(tab).addClass('active');
});

//DOB picker
$(document).ready(function () {
    $('#inputDOB').datepicker({
        dateFormat: "dd-mm-yy",
        maxDate: 0
    });

    tour.init();

    toastr.options = {
        timeOut: 4000,
        extendedTimeOut: 2000,
        positionClass: 'toast-top-center',
        progressBar: 'checked',
        closeButton: true,
        showEasing: "swing",
        closeEasing: "linear",
        hideEasing: "linear"
    }
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
            $('.profile-img').attr('src', reader.result);
            toastr.warning("Avatar Successfuly Uploaded!");
        },
        error: function (err) {
            console.log(err);
        }
    });
});

//Modal Autofocus
$('#newNoteName').on('shown.bs.modal', function () {
    $('#subject').focus();
});

$('#deleteNoteName').on('shown.bs.modal', function () {
    $('#subject2').focus();
});


//Bootstrap Tour
var tour = new Tour({
    name: "studentaddaTour",
    smartPlacement: true,
    template: `
    <div class='popover tour'>
    <div class='arrow'></div>
    <h3 class='popover-title' style="background-color: #eb9316;"></h3>
    <div class='popover-content' id="tour_content"></div>
    <div class='popover-navigation'>
        <button class='btn btn-default' data-role='prev'>« Prev</button>
        <span data-role='separator'>|</span>
        <button class='btn btn-default' data-role='next'>Next »</button>
        <button class='btn btn-warning' data-role='end'>End tour</button>
    </div>
    </div>
    `,
    backdropPadding:10,
    steps: [
        {
            element: "#addNoteButton",
            title: "Add a subject",
            content: "You can use '&#8963; + n' for Quick Access.",
            duration: 3000,
            backdrop: true
        },
        {
            element: "#deleteNoteButton",
            title: "Delete a subject",
            content: "You can use '&#8963; + &#9003;' or '&#8984;/Ctrl + &#9003;' for Quick Access.",
            duration: 3000,
            placement: 'bottom',
            backdrop: true

        },
        {
            title: "Navigation",
            content: "You can change page with '&larr;&#92;&rarr;' or click the white arrows.<br><hr>Press '&darr;' to go to events.<br><hr>Up '&uarr;' to view notes.",
            duration: 3000,
            orphan: true,
            backdrop: true
        },
        {
            element: ".ios",
            title: "Dark mode",
            backdrop:true,
            content: "Press this button to go <strong>Dark</strong>!",
            duration: 3000
        },
        {
            element: "#tour_event",
            title: "Add your events",
            content: "Use the toolbar to add your events.<br><hr>Drag on a date to add an event with multiple days.",
            duration:3000,
            backdrop:true,
            placement: 'top'
        },
        {
            element: "#tour_help",
            title: "Tour Help",
            content: "To Review the Tour, you can Click here at any time when in doubt!<br>Click on <span class='text-warning'>End Tour</span> to Finish the Tour!",
            placement: "bottom",
            backdrop:true
        }
    ]
});

$("#tour_help").click(function () {
    tour.start(true);
    tour.goTo(0);
});

//Ajax Calls here

function noTrailingSlash(site) {// Removes Trailing / or # in webpage's URL
    return site.replace(/(\/|#)$|/g, "");
}

function getUserData() {
    var data = {};
    var getDOB = $("#inputDOB").datepicker("getDate");
    getDOB = moment(getDOB).local().toDate();
    if (getDOB !== null) {
        data.dob = getDOB;
    }
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
        $("#inputDOB").datepicker("setDate", moment(data.dob).local().format("DD-MM-YYYY"));
    }
    if (data.hasOwnProperty('gender') && data.gender !== null) {
        if (data.gender === 'male') {
            $('#genderMale').prop('checked', true);
        } else if (data.gender === 'female') {
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
    if (data.hasOwnProperty('tutorial') && data.tutorial == true) {
        // Start the tour
        tour.start();
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
    console.log(userData);
    console.log('getUserData\n', userData);
    $.ajax({
        url: url,
        method: "POST",
        data: userData,
        success: function (data) {
            setUserData(data);
            toastr.success("Your Details have been Saved!");
        },
        error: function (err) {
            console.log(err);
            toastr.error("Oops! Something Went Wrong", "Please Try Again");
        }
    });
}

$('#buttonForPersonal').click(sendAndRetrieveUserData);
$('#buttonForCollege').click(sendAndRetrieveUserData);

/*Setting Key Presses*/
$(document).keydown(function (e) {
    if (e.keyCode == 78 && e.ctrlKey || e.keyCode == 78 && e.metaKey) {
        document.getElementById('addNoteButton').click();
    }
}); //New Note


$(document).keydown(function (e) {
    if ((e.keyCode == 8 && e.ctrlKey) || e.keyCode == 8 && e.metaKey) {
        document.getElementById('deleteNoteButton').click();
    }
}); // Delete Note


$(document).keydown(function (e) {
    if (e.keyCode == 37) {
        var check = $('#noteImage').is(':visible');
        if (check == false) {
            document.getElementById('goleft').click();
        }
        else if (check == true) {
            document.getElementById('previmg').click();
        }
    }
}); //Previous page


$(document).keydown(function (e) {
    if (e.keyCode == 39) {
        var check = $('#noteImage').is(':visible');
        if (check == false) {
            document.getElementById('goright').click();
        }
        else if (check == true) {
            document.getElementById('nextimg').click();
        }
    }
});// Next Page


$(document).keydown(function (e) {
    if (e.keyCode == 27) {

        var ch1 = $('#noteImage').is(':visible');
        var ch2 = $('#newNoteName').is(':visible');
        var ch3 = $('#deleteNoteName').is(':visible');

        if (ch1 == true) {
            document.getElementById('close1').click();
        }
        if (ch2 == true) {
            document.getElementById('hides1').click();
        }
        if (ch3 == true) {
            document.getElementById('hides2').click();
        }
    }
}); //Configuring escape key for modals


$(document).keydown(function (e) {
    if (e.keyCode == 13) {

        var ch2 = $('#newNoteName').is(':visible');
        var ch3 = $('#deleteNoteName').is(':visible');

        if (ch2 == true) {
            document.getElementById('addNote').click();
        }
        if (ch3 == true) {
            document.getElementById('delNote').click();
        }
    }
}); //Configuring enter key for modals

$(document).keydown(function (e) {
    if (e.keyCode == 38) {
        // Go to notes page
        $('html, body').animate({
            scrollTop: $("#notes").offset().top
        }, 500);
    }
});// Go to notes page

$(document).keydown(function (e) {
    if (e.keyCode == 40) {
        // Go to events page
        $('html, body').animate({
            scrollTop: $("#events").offset().top
        }, 500);
    }
});
