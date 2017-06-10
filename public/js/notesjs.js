var notesData;

$(document).ready(function(){

    var url=noTrailingSlash(window.location.href)+'/user/notes';
    $.ajax({
        url: url,
        method: "GET"
    }).done(function (data) {
        console.log(data);
        notesData=data;
        len = getNotesNumber(notesData);
        console.log("Success in fetching previous data!");
        init();
        col();
    }).fail(function (err) {
        console.log(err);
    });
});




var pgno = 1, notesno = getNumberOfBooks();

function getNumberOfBooks() {
    var width = $("#centeralbook").width();
    if (width >= 1000) {
        return 4;
    }
    else if (width >= 820) {
        return 3;
    }
    else if (width >= 470) {
        return 2;
    }
    else if (width < 470) {
        return 1;
    }
}

function getSubjectName(ind, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].orderno === ind + 1) {
            return myArray[i].subject;
        }
    }
}

function getNotesNumber(myArray) {
    if(myArray.length){
        if ("orderno" in myArray[0]) {
            var large = myArray[0].orderno;
            for (var i = 0; i < myArray.length; i++) {
                if (myArray[i].orderno > large) {

                    large = myArray[i].orderno;
                }
            }
            return large;
        }
    }
    return 0;
}

function getImageAddress(subject, pg, myArray) {

    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].subject === subject) {
            if ("data" in myArray[i]) {
                for (var j = 0; j < myArray[i].data.length; j++) {
                    if (myArray[i].data[j].pgno == pg) {
                        return myArray[i].data[j].note;
                    }
                }
                return 'img/noimage.svg';
            }
            else{
                return 'img/noimage.svg';
            }
        }
    }
}

function getImagesNumber(subject, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        var large=0;
        if (myArray[i].subject === subject) {
           // alert(myArray[i].data.length);
           // if (myArray[i].data[0].pgno != -1)
             if(myArray[i].data.length>0)
            {
                console.log("Inside img no loop with length modification.");
                large = myArray[i].data[0].pgno;
                for (var j = 0; j < myArray[i].data.length; j++) {
                    if (myArray[i].data[j].pgno > large) {
                        large = myArray[i].data[j].pgno
                    }
                }
                return large;
            }
            else
            {
                console.log("Outside img no loop with length modification.");
                return large;
            }
        }
    }
}

function getOrderNo(subject, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].subject === subject) {
            return myArray[i].orderno;
        }
    }
    return -1;
}

function getIndexToDelete(subject, myArray) {
    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].subject === subject) {
            return i;
        }
    }
    return -1;
}

function decrementIndex(ind, myArray) {

    for(var i=0; i<myArray.length; i++)
    {
        if(myArray[i].orderno>ind)
        {
            myArray[i].orderno--;
        }
    }
}

function getImageIndex(subject,pgno,myArray) {
    var ind;
    for(ind=0;ind<myArray.length;ind++)
    {
        if(subject==myArray[ind].subject)
        {
            var ind2;
            for(ind2=0;ind2<getImagesNumber(subject,notesData);ind2++)
            {
                if(myArray[ind].data[ind2].pgno==pgno)
                {
                    return ind2;
                }
            }
        }
    }

}

function removeImage() {

    var delind = (getImageIndex(title, i, notesData)),ind, decInd;
    if(delind!= null)
    {
        var data={
                "subject":title,
                "index":delind,
                "pgno":i,
                "remove":1//so that it doesnt mix up with other operation
            },
            url=noTrailingSlash(window.location.href)+'/user/notes';

        $.ajax({
            url:url,
            method:"PUT",
            data:data,
            success:function(data){
                console.log(data);
                for (ind = 0; ind < notesData.length; ind++) {
                    if (notesData[ind].subject == title) {
                        if (getImagesNumber(title, notesData) > 0) {
                            console.log(images);
                            notesData[ind].data.splice(delind, 1);
                            for (decInd = 0; decInd < notesData[ind].data.length; decInd++) {
                                if (notesData[ind].data[decInd].pgno > i) {
                                    notesData[ind].data[decInd].pgno--;
                                    //         }
                                    //     }
                                    //     a();
                                    //     console.log(images);
                                    // }
                                    // // else if(getImagesNumber(title,notesData)==1){
                                    //     notesData[ind].data.splice(delind,1);
                                }
                            }
                            a();
                        }
                    }
                }
                toastr.warning("Note Deleted Successfully!");
            },
            error:function(err){
                console.log(err);
                toastr.error("Oops! Something went Wrong!","Please Try Again!");
            }
        });
    }

}

var len,pages,bks=0;

$(window).resize(function () {
    init();
});

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
        document.getElementById('gotonote').click();
    }
});// Go to notes page

$(document).keydown(function (e) {
    if (e.keyCode == 40) {
        viewevents();
    }
}); // Go to events page

function viewevents() {
    $('html, body').animate({
        scrollTop: $("#events").offset().top
    }, 500);
}

function viewnotes() {
    $('html, body').animate({
        scrollTop: $("#nav").offset().top
    }, 500);
}

//Shows the modal on screen

//Performs validation and adds to subject name array

function adding() {
    var newsubject = document.getElementById("subject").value;
    newsubject = newsubject.toUpperCase();

    if (newsubject == '') {
        $("#err").html("<br><span style='color:red; font-size:15px; margin-left:40%;'>Invalid entry... </span><br><br><br>");
    }
    else if (getOrderNo(newsubject, notesData) >= 0) {
        $("#err").html("<br><span style='color:red; font-size:15px; margin-left:40%;'>Already added... </span><br><br><br>");    }
    else if(/<(.|\n)*?>/g.test(newsubject)) {
        $("#err").html("<br><span style='color:red; font-size:15px; margin-left:40%;'>HTML Not Allowed... </span><br><br><br>");
    }
    else {
        var id = Math.floor(Math.random() * 1000);
        var url = noTrailingSlash(window.location.href) + '/user/notes';
        var data = {
            "orderno": getNotesNumber(notesData) + 1,
            "subject": newsubject
        };
        $.ajax({
            method:"POST",
            url:url,
            data:data,
            success:function(data){
                toastr.success('Now you can Upload Notes!','Subject Added successfully!');
                notesData.push(
                    {
                        "id": id,
                        "orderno": getNotesNumber(notesData) + 1,
                        "subject": newsubject,
                        "data": [
                        //     {
                        //     "id":666,
                        //     "pgno":-1,
                        //     "note":"img/noimage"
                        // }
                        ]
                    });
                len = getNotesNumber(notesData);
                pages = Math.ceil((len / notesno));

                document.getElementById("subject").value = '';
                document.getElementById("hides1").click();

                init();
            },
            error:function(err){
                toastr.error('Try again!','Something went wrong in adding subject!');
                console.log(err);
            }
        });
    }
}

document.getElementById("hides1").onclick = function () {
    reset1();
};


document.getElementById("hides2").onclick = function () {
    reset2();
};

//Performs validation and deletes string from array
function deleting() {
    var newsubject = document.getElementById("subject2").value;
    newsubject = newsubject.toUpperCase();

    if (newsubject == '') {
        $("#err2").html("<br><span style='color:red; font-size:15px; margin-left:40%;'>Invalid entry... </span><br><br><br>");
    }
    else if (getOrderNo(newsubject, notesData) < 0) {
        $("#err2").html("<br><span style='color:red; font-size:15px; margin-left:40%;'>Subject not added... </span><br><br><br>");    }
    else {
        var url=noTrailingSlash(window.location.href)+'/user/notes';
        var data={
          "subject":newsubject
        };
        $.ajax({
            method:"DELETE",
            url:url,
            data:data,
            success:function(data){
                toastr.warning('Less cluttered bookshelf!','Removed successfully!');
                console.log(data);
                var i = getIndexToDelete(newsubject, notesData);
                notesData.splice(i, 1);
                decrementIndex(i,notesData);
                len = getNotesNumber(notesData);
                pages = Math.ceil((len / notesno));
                document.getElementById("subject2").value = "";
                document.getElementById("hides2").click();
                init();
            },
            error:function(err){
                toastr.error('Try again!','Something went wrong in deleting subject!');
                console.log(err);
            }
        });
    }
}

//Functions to reset the text input field to blank in case of both modals to add and delete notes
function reset1() {
    document.getElementById("subject").value = '';
    document.getElementById("err").innerHTML = "<br>" + "<br>" + "<br>" + "<br>";
}

function reset2() {
    document.getElementById("subject2").value = '';
    document.getElementById("err2").innerHTML = "<br>" + "<br>" + "<br>" + "<br>";
}

//Update by Parth 9/3/17 Add/Delete Notes
function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}

function col() //Assignes random color
{

    var colors = ['#003300', '#006666', '#0099ff', '#00cc66', '#00cc99', '#00ccff', '#660033', '#660099', '#6633ff', '#666699', '#6699cc', '#990033', '#9900ff', '#cc0033', '#cc6666', '#cccc00', '#ff0099', '#ff3300', '#ff6600', '#ff6699', '#ff9966', '#ffff66', '#ffccff'];
    var i, c, j, d;

    // $("#note1").css('background-color', '#' + (Math.random() * 0xFFFFFF << 0).toString(16));
    // $("#note2").css('background-color', '#' + (Math.random() * 0xFFFFFF << 0).toString(16));
    // $("#note3").css('background-color', '#' + (Math.random() * 0xFFFFFF << 0).toString(16));
    // $("#note4").css('background-color', '#' + (Math.random() * 0xFFFFFF << 0).toString(16));
    c = Math.floor(Math.random() * 10000 % 23);
    i = colors[c];
    j = replaceAt(i, 1, 'c');
    // j=replaceAt(j,3,'8');
    // j=replaceAt(j,6,'2');

    $("#note1").css('background', 'linear-gradient(to bottom,' + i + ',' + j + ')');

    c = Math.floor(Math.random() * 10000 % 23);
    i = colors[c];
    j = replaceAt(i, 1, '8');
    // j=replaceAt(j,3,'e');
    // j=replaceAt(j,6,'a');

    $("#note2").css('background', 'linear-gradient(to bottom,' + i + ',' + j + ')');

    c = Math.floor(Math.random() * 10000 % 23);
    i = colors[c];
    j = replaceAt(i, 1, '6');
    // j=replaceAt(j,3,'2');
    // j=replaceAt(j,6,'1');
    $("#note3").css('background', 'linear-gradient(to bottom,' + i + ',' + j + ')');

    c = Math.floor(Math.random() * 10000 % 23);
    i = colors[c];
    j = replaceAt(i, 1, 'b');
    // j=replaceAt(j,3,'9');
    // j=replaceAt(j,6,'7');
    $("#note4").css('background', 'linear-gradient(to bottom,' + i + ',' + j + ')');
}

var ind;

function prevsub() {
    bks = 0;
    if (pgno != 1) {
        //No changes if user on first page
        pgno--;
        ind = notesno * (pgno - 1);
        if (notesno == 4) {
            document.getElementById("s1").innerHTML = getSubjectName(ind, notesData);
            note1.style.display = "block";
            document.getElementById("s2").innerHTML = getSubjectName(ind + 1, notesData);
            note2.style.display = "block";
            document.getElementById("s3").innerHTML = getSubjectName(ind + 2, notesData);
            note3.style.display = "block";
            document.getElementById("s4").innerHTML = getSubjectName(ind + 3, notesData);
            note4.style.display = "block";
        }
        else if (notesno == 3) {
            document.getElementById("s1").innerHTML = getSubjectName(ind, notesData);
            note1.style.display = "block";
            document.getElementById("s2").innerHTML = getSubjectName(ind + 1, notesData);
            note2.style.display = "block";
            document.getElementById("s3").innerHTML = getSubjectName(ind + 2, notesData);
            note3.style.display = "block";
        }
        else if (notesno == 2) {
            document.getElementById("s1").innerHTML = getSubjectName(ind, notesData);
            note1.style.display = "block";
            document.getElementById("s2").innerHTML = getSubjectName(ind + 1, notesData);
            note2.style.display = "block";
        }
        else if (notesno == 1) {
            document.getElementById("s1").innerHTML = getSubjectName(ind, notesData);
            note1.style.display = "block";
        }
        if (ind > len - 1) {
            note1.style.display = "none";
            bks++;
        }
        if (ind + 1 > len - 1) {
            note2.style.display = "none";
            bks++;
        }
        if (ind + 2 > len - 1) {
            note3.style.display = "none";
            bks++;
        }
        if (ind + 3 > len - 1) {
            note4.style.display = "none";
            bks++;
        }
    }
}

function nextsub() {
    bks = 0;
    if (pgno != pages) {
        //No changes if user on last page
        pgno++;
        ind = notesno * (pgno - 1);
        if (notesno == 4) {
            document.getElementById("s1").innerHTML = getSubjectName(ind, notesData);
            note1.style.display = "block";
            document.getElementById("s2").innerHTML = getSubjectName(ind + 1, notesData);
            note2.style.display = "block";
            document.getElementById("s3").innerHTML = getSubjectName(ind + 2, notesData);
            note3.style.display = "block";
            document.getElementById("s4").innerHTML = getSubjectName(ind + 3, notesData);
            note4.style.display = "block";
        }
        else if (notesno == 3) {
            document.getElementById("s1").innerHTML = getSubjectName(ind, notesData);
            note1.style.display = "block";
            document.getElementById("s2").innerHTML = getSubjectName(ind + 1, notesData);
            note2.style.display = "block";
            document.getElementById("s3").innerHTML = getSubjectName(ind + 2, notesData);
            note3.style.display = "block";
        }
        else if (notesno == 2) {
            document.getElementById("s1").innerHTML = getSubjectName(ind, notesData);
            note1.style.display = "block";
            document.getElementById("s2").innerHTML = getSubjectName(ind + 1, notesData);
            note2.style.display = "block";
        }
        else if (notesno == 1) {
            document.getElementById("s1").innerHTML = getSubjectName(ind, notesData);
            note1.style.display = "block";
        }
        if (ind > len - 1) {
            note1.style.display = "none";
            bks++;
        }
        if (ind + 1 > len - 1) {
            note2.style.display = "none";
            bks++;
        }
        if (ind + 2 > len - 1) {
            note3.style.display = "none";
            bks++;
        }
        if (ind + 3 > len - 1) {
            note4.style.display = "none";
            bks++;
        }
    }
}


function init() {

    var oldpgno = pgno;
    var oldnotesno = notesno;

    // var sheight=$(window).height();
    // $('#img01').css('height',sheight);

    bks = 0;
    {
        $('#note1').css({'height': '300px', 'width': '230px', 'margin-top': 'auto'});
        // alert('here');
        $('.changenotes').css('height', '380px');
        $('#gotoevent').css('margin-top', '145px');
        $('#goleft').css('top', '200px');
        $('#goright').css('top', '200px');
        $('#mynotes').css('height', '760px');
        $('#foot').css('margin-top', 'auto');
        $("#books").css('margin-top', 'auto');

        var width = $("#centeralbook").width();

        if (width >= 1000) //Full screen
        {
            $(".fc-toolbar").css({'font-size': '15px'});
            pages = Math.ceil((len / 4));
            notesno = 4;
            pgno = Math.ceil((oldnotesno * (oldpgno - 1) + 1) / notesno);
            ind = notesno * (pgno - 1);

            if (ind < len) {
                document.getElementById("s1").innerHTML = getSubjectName(ind, notesData);
                note1.style.display = "block";

                if (ind + 1 < len) {
                    document.getElementById("s2").innerHTML = getSubjectName(ind + 1, notesData);
                    note2.style.display = "block";

                    if (ind + 2 < len) {
                        document.getElementById("s3").innerHTML = getSubjectName(ind + 2, notesData);
                        note3.style.display = "block";

                        if (ind + 3 < len) {
                            document.getElementById("s4").innerHTML = getSubjectName(ind + 3, notesData);
                            note4.style.display = "block";
                        }
                        else {
                            note4.style.display = "none";
                        }
                    }
                    else {
                        note3.style.display = "none";
                    }
                }
                else {
                    note2.style.display = "none";
                }
            }
            else {
                note1.style.display = "none";
                if (pgno != 1) {
                    pgno--;
                    init();
                }
            }
        }
        else if (width >= 820) // 3/4rth width
        {

            $(".fc-toolbar").css({'font-size': '15px'});
            pages = Math.ceil((len / 3));
            notesno = 3;
            pgno = Math.ceil((oldnotesno * (oldpgno - 1) + 1) / notesno);
            ind = notesno * (pgno - 1);

            if (ind < len) {
                document.getElementById("s1").innerHTML = getSubjectName(ind, notesData);
                note1.style.display = "block";

                if (ind + 1 < len) {
                    document.getElementById("s2").innerHTML = getSubjectName(ind + 1, notesData);
                    note2.style.display = "block";

                    if (ind + 2 < len) {
                        document.getElementById("s3").innerHTML = getSubjectName(ind + 2, notesData);
                        note3.style.display = "block";
                        note4.style.display = "none";
                    }
                    else {
                        note3.style.display = "none";
                    }
                }
                else {
                    note2.style.display = "none";
                }
            }
            else {
                note1.style.display = "none";
                if (pgno != 1) {
                    pgno--;
                    init();
                }
            }
        }
        else if (width >= 470) //1/2 width
        {
            $(".fc-toolbar").css({'font-size': '12px'});

            pages = Math.ceil((len / 2));
            notesno = 2;
            pgno = Math.ceil((oldnotesno * (oldpgno - 1) + 1) / notesno);
            ind = notesno * (pgno - 1);
            if (ind < len) {
                document.getElementById("s1").innerHTML = getSubjectName(ind, notesData);
                note1.style.display = "block";

                if (ind + 1 < len) {
                    document.getElementById("s2").innerHTML = getSubjectName(ind + 1, notesData);
                    note2.style.display = "block";
                    note3.style.display = "none";
                    note4.style.display = "none";
                }
                else {
                    note2.style.display = "none";
                }
            }
            else {
                note1.style.display = "none";
                if (pgno != 1) {
                    pgno--;
                    init();
                }
            }
        }
        else if (width < 470)  // Phablet width
        {
            $(".fc-toolbar").css({'font-size': '9px'});
            $("#books").css('margin-top', '55px');

            var h2 = $(window).height();
            if (h2 < 600) {

                //  $('#note1').css({'height':'305px','width':'192px','margin-top':'-5px'});
                //  $('.changenotes').css('height','250px');
                //  $('#gotoevent').css('margin-top','20px');
                //  $('#goleft').css('top','150px');
                //  $('#goright').css('top','150px');
                //  $('#mynotes').css('height','529px');
                $('#foot').css('margin-top', '-150px');
            }

            pages = Math.ceil((len / 1));
            notesno = 1;
            pgno = Math.ceil((oldnotesno * (oldpgno - 1) + 1) / notesno);
            ind = notesno * (pgno - 1);

            if (ind < len) {
                document.getElementById("s1").innerHTML = getSubjectName(ind, notesData);
                note1.style.display = "block";
                note2.style.display = "none";
                note3.style.display = "none";
                note4.style.display = "none";
            }
            else {
                note1.style.display = "none";
                if (pgno != 1) {
                    pgno--;
                    init();
                }
            }
        }
    }
}

//Functions to identify the note number pressed ie. first note from left,second from left et...
var i,index,title;

function one() {

    title = document.getElementById("s1").innerHTML;
    index = getOrderNo(title, notesData);
    $("#noteModalTitle").html(title);
    i = 1;
}

function two() {
    title = document.getElementById('s2').innerHTML;
    index = getOrderNo(title, notesData);
    $("#noteModalTitle").html(title);
    i = 1;
}

function three() {
    title = document.getElementById('s3').innerHTML;
    index = getOrderNo(title, notesData);
    $("#noteModalTitle").html(title);
    i = 1;
}

function four() {
    title = document.getElementById('s4').innerHTML;
    index = getOrderNo(title, notesData);
    $("#noteModalTitle").html(title);
    i = 1;
}

//Function of hide the image displaying modal
function off() {
    modal.style.display = "none";
}

var modal = document.getElementById('myModal'),
    modalImg = document.getElementById("img01"),
    images;

function a() //function to make the popup images visible
{
    i=1;
    modalImg.src = getImageAddress(title, i, notesData);
    images = getImagesNumber(title, notesData);
    $("#imgno").html("Pg."+1);
}

function next() //Change image to next page
{
    if (i < images) {
        i++;
        modalImg.src = getImageAddress(title, i, notesData);
        $("#imgno").html("Pg."+i);
    }
}

function previous() //Change image to previous page
{
    if (i > 1) { //No changes if first image
        i--;
        modalImg.src = getImageAddress(title, i, notesData);
        $("#imgno").html("Pg."+i);
    }
}

$("#uploadNoteImage").fileinput({
    overwriteInitial: false,
    maxFileSize: 5000,
    showClose: false,
    showCaption: false,
    showUpload: false,
    browseLabel: '',
    removeLabel: '',
    uploadLabel: '',
    browseIcon: '<i class="glyphicon glyphicon-folder-open"></i> ',
    browseTitle: 'Choose Notes',
    removeIcon: '<i class="glyphicon glyphicon-remove"></i> ',
    removeTitle: 'Cancel or reset changes',
    elErrorContainer: '#kv-avatar-errors',
    msgErrorClass: 'alert alert-block alert-danger',
    allowedFileExtensions: ["jpg", "png", "jpeg"],
    showPreview: false,
    showRemove: false
});

$('#uploadNoteImage').on('fileloaded', function (event, file, previewId, index, reader) {
    //console.log("fileloaded");
    var url = noTrailingSlash(window.location.href) + '/user/notes';
    var imgpgno = parseInt(getImagesNumber(title, notesData));
    console.log("Number of images: "+ imgpgno);
    var data = {
        "subject":title,
        "pgno": imgpgno + 1,
        "note": reader.result
    };
    //console.log("Sending data",data);
    $.ajax({
        url: url,
        method: "PUT",
        data: data,
        success: function (data) {
            toastr.success('','Added!');
            console.log(data);
            var order=getIndexToDelete(title,notesData);
            var id = Math.floor(Math.random() * 1000);
            images=imgpgno+1;

            if(imgpgno == 0)
            {
                console.log("No notes...Updating!");
                modalImg.src = reader.result;
                imgpgno++;
                //console.log(imgpgno);
                //notesData[order].data.pop();
                console.log("Before Updated notes!: "+parseInt(getImagesNumber(title, notesData)));
                notesData[order].data.push({"id":id,"pgno": imgpgno,
                    "note": reader.result});
                console.log("Updates: "+parseInt(getImagesNumber(title, notesData)));
                images=imgpgno;
            }
            else {
                notesData[order].data.push({"id":id,"pgno": imgpgno + 1,
                    "note": reader.result});
            }
        },
        error: function (err) {
            toastr.error('Try again!','Something went wrong in uploading note!');
            console.log(err);
        }
    });
});



