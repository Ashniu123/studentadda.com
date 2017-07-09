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
    backdropPadding: 10,
    steps: [
        {
            element: "#addNoteButton",
            title: "Add a subject",
            content: "You can use '&#8963; + n' for Quick Access.",
            duration: false,
            backdrop: true
        },
        {
            element: "#deleteSubjectButton",
            title: "Delete a subject",
            content: "You can use '&#8963; + &#9003;' or '&#8984;/Ctrl + &#9003;' for Quick Access.",
            duration: false,
            placement: 'bottom',
            backdrop: true

        },
        {
            title: "Navigation",
            content: "You can change page with '&larr;&#92;&rarr;' or click the white arrows.<br><hr>Press '&darr;' to go to events.<br><hr>Up '&uarr;' to view notes.",
            duration: false,
            orphan: true,
            backdrop: true
        },
        {
            element: "#miniEvents",
            title: "Upcoming Events",
            content: "Your upcoming events will be displayed here.Click a row to view uploaded notes if any.",
            duration: false,
            placement: 'bottom',
            backdrop: true
        },
        {
            element: "#showFullCalendar",
            title: "Add events!",
            content: "Press this button to view full calendar to add events.",
            duration: false,
            placement: "bottom",
            backdrop: true,
            onHide: function () {
                $("#showFullCalendar").click();
            }
        },
        {
            element: ".ios",
            title: "Dark mode",
            backdrop: true,
            content: "Press this button to go <strong>Dark</strong>!",
            duration: false
        },
        {
            element: "#tour_event",
            title: "Add your events",
            content: "Click on the day to add your events.<br><hr>Drag on a date to add an event with multiple days.",
            duration: false,
            backdrop: true
        },
        {
            element: "#hideFullCalendar",
            title: "Hide full calendar",
            content: "Press this to hide this panel and scroll to top",
            duration: false,
            backdrop: true,
            placement: 'top',
            onHide: function () {
                $("#hideFullCalendar").click();
            }
        },
        {
            element: "#fullSliderContainer",
            title: "Change number of table entries",
            content: "Press this and change to slider value to increase/decrease table entries by 7<br>",
            backdrop: true,
            onShown: function () {
                $("#showPageSizeSlider").click();
            },
            onHide: function () {
                $("#showPageSizeSlider").click();
            },
            placement: 'bottom'
        },
        {
            onShow: function () {
                $("#navExpand").click();
            },
            element: "#tour_help_button",
            title: "Tour Help",
            content: "To Review the Tour, you can Click here at any time when in doubt!<br>Click on <span class='text-warning'>End Tour</span> to Finish the Tour!",
            placement: "bottom",
            onHide: function () {
                $("#tour_help").css('color', 'white');
                $("#navExpand").click();
            }
        }
    ]
});

var mobileTour = new Tour({
    name: "studentaddaMobileTour",
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
    backdropPadding: 10,
    steps: [
        {
            element: "#addNoteButton",
            title: "Add a subject",
            content: "Press this to add subject.",
            duration: false,
            backdrop: true
        },
        {
            element: "#deleteSubjectButton",
            title: "Delete a subject",
            content: "Press this and then tap X to delete the subject.",
            duration: false,
            placement: 'bottom',
            backdrop: true

        },
        {
            title: "Navigation",
            content: "You can change page by swiping left or right.",
            duration: false,
            orphan: true,
            backdrop: true
        },
        {
            element: "#miniEvents",
            title: "Upcoming Events",
            content: "Your upcoming events will be displayed here.Click a row to view uploaded notes if any.",
            duration: false,
            placement: 'bottom',
            backdrop: true
        },
        {
            element: "#showFullCalendar",
            title: "Add events!",
            content: "Press this button to view full calendar to add events.",
            duration: false,
            placement: "bottom",
            backdrop: true,
            onHide: function () {
                $("#showFullCalendar").click();
            }
        },
        {
            element: ".ios",
            title: "Dark mode",
            backdrop: true,
            content: "Press this button to go <strong>Dark</strong>!",
            duration: false
        },
        {
            element: "#tour_event",
            title: "Add your events",
            content: "Click on the day to add your events.<br><hr>Drag on a date to add an event with multiple days.",
            duration: false,
            backdrop: true
        },
        {
            element: "#hideFullCalendar",
            title: "Hide full calendar",
            content: "Press this to hide this panel and scroll to top",
            duration: false,
            backdrop: true,
            placement: 'top',
            onHide: function () {
                $("#hideFullCalendar").click();
            }
        },
        {
            element: "#fullSliderContainer",
            title: "Change number of table entries",
            content: "Press this and change to slider value to increase/decrease table entries by 7<br>",
            backdrop: true,
            onShown: function () {
                $("#showPageSizeSlider").click();
            },
            onHide: function () {
                $("#showPageSizeSlider").click();
            },
            placement: 'bottom'
        },
        {
            onShow: function () {
                $("#navExpand").click();
            },
            element: "#tour_help_button",
            title: "Tour Help",
            content: "To Review the Tour, you can Click here at any time when in doubt!<br>Click on <span class='text-warning'>End Tour</span> to Finish the Tour!",
            placement: "bottom",
            onHide: function () {
                $("#tour_help").css('color', 'white');
                $("#navExpand").click();
            }
        }
    ]
});


$("#tour_help").click(function () {

    var mobile = false;
    (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    console.log(mobile);
    if (!mobile) {
        tour.start(true);
        tour.goTo(0);
    } else {
        mobileTour.start(true);
        mobileTour.goTo(0);
    }
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
        tour.start(true);
        tour.goTo(0);
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

$("#deleteAccount").on('click', function (e) {
    e.preventDefault();
    var url = noTrailingSlash(window.location.href) + '/user';
    console.log('Deleting Account');
    $.ajax({
        url: url,
        method: "DELETE",
        success: function (data) {
            if(data.success) {
                toastr.success("Your Account has been Deleted!","Wait! You are being redirected to our Home Page.");
                setTimeout(function () {
                    window.location = "/"
                }, 2000);
            }else{
                toastr.error("Oops! Something Went Wrong", "Please Try Again");
            }
        },
        error: function (err) {
            console.log(err);
            toastr.error("Oops! Something Went Wrong", "Please Try Again");
        }
    });
});
