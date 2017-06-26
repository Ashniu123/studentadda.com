var notesData, pgno = 1, notesno = getNumberOfBooks(), images,
    delTrack = "none", toggle = 1, i, index, noteTitle, len, pages, bks = 0, ind,
    modal = document.getElementById('myModal'),
    modalImg = document.getElementById("img01"), colourIndex1 = 0, colourIndex2 = 1, swapped = 0 ,showFullCal=false,toggleSlider="false",sliderOrientation='vertical';

$(document).ready(function () {
    var url = noTrailingSlash(window.location.href) + '/user/notes';
    $.ajax({
        url: url,
        method: "GET"
    }).done(function (data) {
        //console.log(data);
        notesData = data;
        len = getNotesNumber(notesData);
        //console.log("Success in fetching previous data!");
        $(function () {
            $('#darkswitch').bootstrapToggle({
                size:'mini',
                on:"<img src='img/bulbon.png' width='50%'>",
                off:"<img src='img/bulboff.png' width='50%'>",
                onstyle:"primary",
                offstyle:"warning",
                style:"ios"
            });
        });
        init();
    }).fail(function (err) {
        //console.log(err);
    })

});

$(".slider-selection").css({'background-image': 'linear-gradient(to bottom,#ff6633 ,#ff6600 100%)'});
$(".tick-slider-selection").css({'background-image': 'linear-gradient(to bottom,#ff6633 ,#ff6600 100%)'});
function jumpToPage(newPage) {

    pgno = newPage;
    init();

}
function toggleX() {
    //console.log("In / toggleX /");

    if (toggle == 1) {
        delTrack = "block";
        toggle = 0;
        $("#note1").addClass("wiggles");
        $("#note2").addClass("wiggles");
        $("#note3").addClass("wiggles");
        $("#note4").addClass("wiggles");
    }
    else {
        delTrack = "none";
        toggle = 1;
        $("#note1").removeClass("wiggles");
        $("#note2").removeClass("wiggles");
        $("#note3").removeClass("wiggles");
        $("#note4").removeClass("wiggles");
    }
    init();
}

function getNumberOfBooks() {
    //console.log("In / getNumberOfBooks /");
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
    //console.log("In / getSubjectName /");

    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].orderno === ind + 1) {
            return myArray[i].subject;
        }
    }
}

function getSubejectColor(ind, myArray) {
    for (var colCtr = 0; colCtr < myArray.length; colCtr++) {
        if (myArray[colCtr].orderno == ind + 1) {
            return myArray[colCtr].color;
        }
    }
}

function getNotesNumber(myArray) {
    //console.log("In / getNotesNumber /");
    if (myArray.length) {
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

function getNoteAddress(subject, pg, myArray) {
    //console.log("In / getImageAddress /");

    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].subject === subject) {
            if ("data" in myArray[i]) {
                for (var j = 0; j < myArray[i].data.length; j++) {
                    if (parseInt(myArray[i].data[j].pgno) == pg) {
                        return myArray[i].data[j].note;
                    }
                }
                return 'img/noimage.svg';
            }
            else {
                return 'img/noimage.svg';
            }
        }
    }
}

function getNotesLength(subject, myArray) {
    //console.log("In / getImagesNumber /");

    for (var i = 0; i < myArray.length; i++) {
        var large = 0;
        if (myArray[i].subject === subject) {
            // alert(myArray[i].data.length);
            // if (myArray[i].data[0].pgno != -1)
            if (myArray[i].data.length > 0) {
                //console.log("Inside img no loop with length modification.");
                large = parseInt(myArray[i].data[0].pgno);
               // alert("Start of getNotesLength "+large+" "+myArray[i].data.length);
                for (var j = 0; j < myArray[i].data.length; j++) {
                   // alert("Compared pg no: "+myArray[i].data[j].pgno+" Value of large: "+ large );

                    if ( parseInt(myArray[i].data[j].pgno) > large) {
                       // alert(j+" "+myArray[i].data[j].pgno);
                        large = parseInt(myArray[i].data[j].pgno);
                    }else {
                      //  alert("Skipped "+j);

                    }

                }
              //  alert("here after "+j+"iterations.");
                return large;
            }
            else {
                //console.log("Outside img no loop with length modification.");
                return large;
            }
        }
    }
}

function getOrderNo(subject, myArray) {
    //console.log("In / getOrderNo /");

    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].subject === subject) {
            return myArray[i].orderno;
        }
    }
    return -1;
}

function getIndexToDelete(subject, myArray) {
    //console.log("In / getIndexToDelete /");

    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].subject === subject) {
            return i;
        }
    }
    return -1;
}

function decrementIndex(ind, myArray) {
    //console.log("In / decrementIndex /");

    for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].orderno > ind) {
            myArray[i].orderno--;
        }
    }
}

function getImageIndex(subject, pgno, myArray) {
    //console.log("In / getImageIndex /");

    var ind;
    for (ind = 0; ind < myArray.length; ind++) {
        if (subject == myArray[ind].subject) {
            var ind2;
            for (ind2 = 0; ind2 < getNotesLength(subject, notesData); ind2++) {
                if (parseInt(myArray[ind].data[ind2].pgno) == pgno) {
                    return ind2;
                }
            }
        }
    }
}

function deleteNote() {
    //console.log("In / removeImage /");

    var delind = (getImageIndex(noteTitle, i, notesData)), ind, decInd;
    if (delind != null) {
        var data = {
                "subject": noteTitle,
                "index": delind,
                "pgno": i,
                "remove": 1//so that it doesnt mix up with other operation
            },
            url = noTrailingSlash(window.location.href) + '/user/notes';

        $.ajax({
            url: url,
            method: "PUT",
            data: data,
            success: function (data) {
                //console.log(data);
                for (ind = 0; ind < notesData.length; ind++) {
                    if (notesData[ind].subject == noteTitle) {
                        if (getNotesLength(noteTitle, notesData) > 0) {
                            //console.log(images);
                            notesData[ind].data.splice(delind, 1);
                            for (decInd = 0; decInd < notesData[ind].data.length; decInd++) {
                                if (parseInt(notesData[ind].data[decInd].pgno)> i) {
                                    notesData[ind].data[decInd].pgno--;
                                    //         }
                                    //     }
                                    //     displayNote();
                                    //     //console.log(images);
                                    // }
                                    // // else if(getNotesLength(noteTitle,notesData)==1){
                                    //     notesData[ind].data.splice(delind,1);
                                }
                            }
                            displayNote();
                        }
                    }
                }
                toastr.warning("Note Deleted Successfully!");
            },
            error: function (err) {
                //console.log(err);
                toastr.error("Oops! Something went Wrong!", "Please Try Again!");
            }
        });
    }

}

$(window).resize(function () {
    init();
});

//Performs validation and adds to subject name array
function addSubject() {
    //console.log("In / adding /");
    var newsubject = document.getElementById("subject").value;
    newsubject = newsubject.toUpperCase();

    if (newsubject == '') {
        $("#err").html("<br><span style='color:red; font-size:15px; margin-left:40%;'>Invalid entry... </span><br><br><br>");
    }
    else if (getOrderNo(newsubject, notesData) >= 0) {
        $("#err").html("<br><span style='color:red; font-size:15px; margin-left:40%;'>Already added... </span><br><br><br>");
    }
    else if (/<(.|\n)*?>/g.test(newsubject)) {
        $("#err").html("<br><span style='color:red; font-size:15px; margin-left:40%;'>HTML Not Allowed... </span><br><br><br>");
    }
    else {
        var subjectColor = col();////////PUT BGCOLOUR HERE
        var id = Math.floor(Math.random() * 1000);
        var url = noTrailingSlash(window.location.href) + '/user/notes';
        var data = {
            "orderno": getNotesNumber(notesData) + 1,
            "subject": newsubject,
            "color": subjectColor
        };
        $.ajax({
            method: "POST",
            url: url,
            data: data,
            success: function (data) {
                toastr.success('Now you can Upload Notes!', 'Subject Added successfully!');
                notesData.push(
                    {
                        "id": id,
                        "orderno": getNotesNumber(notesData) + 1,
                        "subject": newsubject,
                        "color": subjectColor,
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
            error: function (err) {
                toastr.error('Try again!', 'Something went wrong in adding subject!');
                //console.log(err);
            }
        });
    }
}

document.getElementById("hides1").onclick = function () {
    reset1();
};


//Performs validation and deletes string from array
function deleteSubject() {
    //console.log("In / deleting /");
    // var newsubject = document.getElementById("subject2").value;
    var newsubject = noteTitle;
    newsubject = newsubject.toUpperCase();
    var url = noTrailingSlash(window.location.href) + '/user/notes';
    var data = {
        "subject": newsubject
    };
    $.ajax({
        method: "DELETE",
        url: url,
        data: data,
        success: function (data) {
            toastr.warning('Less cluttered bookshelf!', 'Removed successfully!');
            //console.log(data);
            var i = getIndexToDelete(newsubject, notesData);
            notesData.splice(i, 1);
            decrementIndex(i, notesData);
            len = getNotesNumber(notesData);
            pages = Math.ceil((len / notesno));
            init();
        },
        error: function (err) {
            toastr.error('Try again!', 'Something went wrong in deleting subject!');
            //console.log(err);
        }
    });
}

//Functions to reset the text input field to blank in case of both modals to add and delete notes
function reset1() {
    //console.log("In / reset1 /");
    document.getElementById("subject").value = '';
    document.getElementById("err").innerHTML = "<br>" + "<br>" + "<br>" + "<br>";
}

function reset2() {
    //console.log("In / reset2 /");
    document.getElementById("subject2").value = '';
    document.getElementById("err2").innerHTML = "<br>" + "<br>" + "<br>" + "<br>";
}

function replaceAt(string, index, replace) {
    return string.substring(0, index) + replace + string.substring(index + 1);
}

function ColorLuminance(hex, lum) {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i * 2, 2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00" + c).substr(c.length);
    }

    return rgb;
}

function col() //Assignes random color
{
    //console.log("In / col /");

    var colors = ['#003300', '#006666', '#0099ff', '#00cc66', '#00cc99', '#00ccff', '#660033', '#660099',
        '#6633ff', '#666699', '#6699cc', '#990033', '#9900ff', '#cc0033', '#cc6666', '#cccc00', '#ff0099',
        '#ff3300', '#ff6600', '#ff6699', '#ff9966', '#ffff66', '#ffccff'];
    var colourTop, colourBottom;
    colourIndex1 = Math.floor(Math.random() * 10000 % 23);
    //console.log("Index 1 is: "+colourIndex1+" Index 2 is:"+colourIndex2);
    if (colourIndex1 != colourIndex2) {
        //console.log("Not same index.");
        colourTop = colors[colourIndex1];
        //console.log("Colourtop : "+colourTop);
        colourBottom = ColorLuminance(colourTop, -.30);
        colourTop = ColorLuminance(colourTop, +.30);
        colourIndex2 = colourIndex1;
        return 'linear-gradient(to bottom,' + colourTop + ',' + colourBottom + ')';
    }
    else {
        //console.log("Got repeated index recalling.");
        col();
    }


}

function prevsub() {
    bks = 0;
    if (pgno != 1) {
        //No changes if user on first page
        pgno--;
        init();


    }
}

function nextsub() {
    bks = 0;
    if (pgno != pages) {
        //No changes if user on last page
        pgno++;
        init();

    }
}


function init() {

    //console.log("In / init /");
    // $("#miniTable.sorting").css({"display": "none", "background-color": "blue"});
    var oldpgno = pgno;
    var oldnotesno = notesno;
    $("#img01").css({'width':'100%'});
    $("#books").css({"justify-content": "space-around"});
    $('#miniTable tr:nth-child(1)').addClass("customHeader");
    if (!swapped) {
        $('#miniTable td:nth-child(4),#miniTable th:nth-child(4)').show();
        $('#miniTable td:nth-child(5),#miniTable th:nth-child(5)').show();
    } else if (swapped) {
        $('#miniTable td:nth-child(4),#miniTable th:nth-child(4)').show();
        $('#miniTable td:nth-child(5),#miniTable th:nth-child(5)').show();
    }

    $('#miniTable td:nth-child(1),#miniTable th:nth-child(1)').css({"font-weight": "bold"});
    $("#miniEventsContainer").css({"height": $("#miniTable").height()+60});
    $("#eventsBanner").css({'font-size':'30px'});
    bks = 0;
    {
        $('.changenotes').css('height', '380px');
        $("#books").css('margin-top', 'auto');

        var width = $("#centeralbook").width();

        if (width >= 1000) //Full screen
        {
            //$('#darkswitch').bootstrapToggle('destroy');
            $(function () {
                $('#darkswitch').bootstrapToggle({
                    size:'normal',
                    on:"<img src='img/bulbon.png' width='50%'>",
                    off:"<img src='img/bulboff.png' width='50%'>",
                    onstyle:"primary",
                    offstyle:"warning",
                    style:"ios"
                });
            });

            $("#events").show();
            $('#calendar').fullCalendar('option', 'height', 800);
           // alert(showFullCal);
            if(!showFullCal){
                $("#events").hide();
            }
            $(".fc-toolbar").css({'font-size': '15px'});
            pages = Math.ceil((len / 4));
            notesno = 4;
            pgno = Math.ceil((oldnotesno * (oldpgno - 1) + 1) / notesno);
            ind = notesno * (pgno - 1);
            if (ind < len) {
                document.getElementById("s1").innerHTML = getSubjectName(ind, notesData);
                $("#note1").css({"background": getSubejectColor(ind, notesData)});
                note1.style.display = "block";
                del1.style.display = delTrack;

                if (ind + 1 < len) {
                    document.getElementById("s2").innerHTML = getSubjectName(ind + 1, notesData);
                    $("#note2").css({"background": getSubejectColor(ind + 1, notesData)});
                    note2.style.display = "block";
                    del2.style.display = delTrack;

                    if (ind + 2 < len) {
                        document.getElementById("s3").innerHTML = getSubjectName(ind + 2, notesData);
                        $("#note3").css({"background": getSubejectColor(ind + 2, notesData)});
                        note3.style.display = "block";
                        del3.style.display = delTrack;

                        if (ind + 3 < len) {
                            document.getElementById("s4").innerHTML = getSubjectName(ind + 3, notesData);
                            $("#note4").css({"background": getSubejectColor(ind + 3, notesData)});
                            note4.style.display = "block";
                            del4.style.display = delTrack;
                        }
                        else {
                            note4.style.display = "none";
                            del4.style.display = "none";
                        }
                    }
                    else {
                        note3.style.display = "none";
                        del3.style.display = "none";
                        note4.style.display = "none";
                        del4.style.display = "none";
                    }
                }
                else {
                    note2.style.display = "none";
                    del2.style.display = "none";
                    note3.style.display = "none";
                    del3.style.display = "none";
                    note4.style.display = "none";
                    del4.style.display = "none";
                }
            }
            else {
                note1.style.display = "none";
                del1.style.display = "none";
                note2.style.display = "none";
                del2.style.display = "none";
                note3.style.display = "none";
                del3.style.display = "none";
                note4.style.display = "none";
                del4.style.display = "none";

                if (pgno != 1) {
                    pgno--;
                    init();
                }
            }
        }
        else if (width >= 820) // 3/4rth width
        {
            //$('#darkswitch').bootstrapToggle('destroy');
            $(function () {
                $('#darkswitch').bootstrapToggle({
                    size:'small',
                    on:"<img src='img/bulbon.png' width='50%'>",
                    off:"<img src='img/bulboff.png' width='50%'>",
                    onstyle:"primary",
                    offstyle:"warning",
                    style:"ios"
                });
            });

            $("#events").show();
            $('#calendar').fullCalendar('option', 'height', 600);
            if(!showFullCal){
                $("#events").hide();
            }

            $(".fc-toolbar").css({'font-size': '15px'});
            pages = Math.ceil((len / 3));
            notesno = 3;
            pgno = Math.ceil((oldnotesno * (oldpgno - 1) + 1) / notesno);
            ind = notesno * (pgno - 1);

            if (ind < len) {
                document.getElementById("s1").innerHTML = getSubjectName(ind, notesData);
                $("#note1").css({"background": getSubejectColor(ind, notesData)});
                note1.style.display = "block";
                del1.style.display = delTrack;

                if (ind + 1 < len) {
                    document.getElementById("s2").innerHTML = getSubjectName(ind + 1, notesData);
                    $("#note2").css({"background": getSubejectColor(ind + 1, notesData)});
                    note2.style.display = "block";
                    del2.style.display = delTrack;

                    if (ind + 2 < len) {
                        document.getElementById("s3").innerHTML = getSubjectName(ind + 2, notesData);
                        $("#note3").css({"background": getSubejectColor(ind + 2, notesData)});
                        note3.style.display = "block";
                        del3.style.display = delTrack;
                        note4.style.display = "none";
                        del4.style.display = "none";
                    }
                    else {
                        note3.style.display = "none";
                        del3.style.display = "none";
                        note4.style.display = "none";
                        del4.style.display = "none";
                    }
                }
                else {
                    note2.style.display = "none";
                    del2.style.display = "none";
                    note3.style.display = "none";
                    del3.style.display = "none";
                    note4.style.display = "none";
                    del4.style.display = "none";
                }
            }
            else {
                note1.style.display = "none";
                del1.style.display = "none";
                note2.style.display = "none";
                del2.style.display = "none";
                note3.style.display = "none";
                del3.style.display = "none";
                note4.style.display = "none";
                del4.style.display = "none";
                if (pgno != 1) {
                    pgno--;
                    init();
                }
            }
        }
        else if (width >= 470) //1/2 width
        {
           //$('#darkswitch').bootstrapToggle('destroy');
            $(function () {
                $('#darkswitch').bootstrapToggle({
                    size:'small',
                    on:"<img src='img/bulbon.png' width='50%'>",
                    off:"<img src='img/bulboff.png' width='50%'>",
                    onstyle:"primary",
                    offstyle:"warning",
                    style:"ios"
                });
            });

            $(".fc-toolbar").css({'font-size': '12px'});
            $("#events").show();
            $('#calendar').fullCalendar('option', 'height', 600);
            // alert(showFullCal);
            if(!showFullCal){
                $("#events").hide();
            }
            pages = Math.ceil((len / 2));
            notesno = 2;
            pgno = Math.ceil((oldnotesno * (oldpgno - 1) + 1) / notesno);
            ind = notesno * (pgno - 1);
            if (ind < len) {
                document.getElementById("s1").innerHTML = getSubjectName(ind, notesData);
                $("#note1").css({"background": getSubejectColor(ind, notesData)});
                note1.style.display = "block";
                del1.style.display = delTrack;

                if (ind + 1 < len) {
                    document.getElementById("s2").innerHTML = getSubjectName(ind + 1, notesData);
                    $("#note2").css({"background": getSubejectColor(ind + 1, notesData)});
                    note2.style.display = "block";
                    del2.style.display = delTrack;
                    note3.style.display = "none";
                    del3.style.display = "none";
                    note4.style.display = "none";
                    del4.style.display = "none";
                }
                else {
                    note2.style.display = "none";
                    del2.style.display = "none";
                    note3.style.display = "none";
                    del3.style.display = "none";
                    note4.style.display = "none";
                    del4.style.display = "none";
                }
            }
            else {
                note1.style.display = "none";
                del1.style.display = "none";
                note2.style.display = "none";
                del2.style.display = "none";
                note3.style.display = "none";
                del3.style.display = "none";
                note4.style.display = "none";
                del4.style.display = "none";

                if (pgno != 1) {
                    pgno--;
                    init();
                }
            }
        }
        else if (width < 470)  // Phablet width
        {


            // $('#darkswitch').bootstrapToggle('destroy');
            $(function () {
                $('#darkswitch').bootstrapToggle({
                    size:'small',
                    on:"<img src='img/bulbon.png' width='50%'>",
                    off:"<img src='img/bulboff.png' width='50%'>",
                    onstyle:"primary",
                    offstyle:"warning",
                    style:"ios"
                });
            });
           $('#calendar').fullCalendar('option', 'height', 550);
           //  $('#calendar').fullCalendar('option', 'aspectRatio', .8);
            // alert(showFullCal);
            if(!showFullCal){
                $("#events").hide();
            }
            $(".fc-toolbar").css({'font-size': '9px'});
            // $("#eventsBanner").css({'font-size':'20px'});
            $("#books").css({"justify-content": "center"});
            if (!swapped) {
                //alert("Swapping and updating 2 "+ swapped);
                $('#miniTable td:nth-child(4),#miniTable th:nth-child(4)').hide();
                $('#miniTable td:nth-child(5),#miniTable th:nth-child(5)').hide();
                $("#miniEventsContainer").css({"height": $("#miniTable").height()+50});
                //console.log( $("#miniTable").height());
            } else if (swapped) {

                // alert("Swapping and updating 3 "+swapped);
                $('#miniTable td:nth-child(4),#miniTable th:nth-child(4)').show();
                $('#miniTable td:nth-child(5),#miniTable th:nth-child(5)').show();

                //$('#miniTable tr:nth-child(4)').hide();
                //$('#miniTable tr:nth-child(5)').hide();
            }
            $("#miniEvents").css({"height": $("#miniTable").height() + 20});


            pages = Math.ceil((len / 1));
            notesno = 1;
            pgno = Math.ceil((oldnotesno * (oldpgno - 1) + 1) / notesno);
            ind = notesno * (pgno - 1);

            if (ind < len) {
                document.getElementById("s1").innerHTML = getSubjectName(ind, notesData);
                $("#note1").css({"background": getSubejectColor(ind, notesData)});
                note1.style.display = "block";
                del1.style.display = delTrack;
                note2.style.display = "none";
                del2.style.display = "none";
                note3.style.display = "none";
                del3.style.display = "none";
                note4.style.display = "none";
                del4.style.display = "none";
            }
            else {
                note1.style.display = "none";
                del1.style.display = "none";
                note2.style.display = "none";
                del2.style.display = "none";
                note3.style.display = "none";
                del3.style.display = "none";
                note4.style.display = "none";
                del4.style.display = "none";
                if (pgno != 1) {
                    pgno--;
                    init();
                }
            }
        }
    }

    var dotCounter;

    $("#pageDots").empty();

    for (dotCounter = 1; dotCounter <= pages; dotCounter++) {
        var dotsContaint = $("#pageDots").html();
        //console.log(dotsContaint);
        if (pgno != dotCounter) {
            $("#pageDots").html(dotsContaint + "<i class='fa fa-dot-circle-o dots'  style='color: ghostwhite;' aria-hidden='true' onclick='jumpToPage(" + dotCounter + ")'></i> ");
        }

        else if (pgno == dotCounter) {
            $("#pageDots").html(dotsContaint + "<i class='fa fa-circle dots' style='color: snow;' aria-hidden='true' onclick='jumpToPage(" + dotCounter + ")'></i> ");
        }

    }

}

//Functions to identify the note number pressed ie. first note from left,second from left et...
function one() {

    noteTitle = document.getElementById("s1").innerHTML;
    index = getOrderNo(noteTitle, notesData);
    $("#noteModalTitle").html(noteTitle);
    i = 1;

}

function two() {
    noteTitle = document.getElementById('s2').innerHTML;
    index = getOrderNo(noteTitle, notesData);
    $("#noteModalTitle").html(noteTitle);
    i = 1;

}

function three() {
    noteTitle = document.getElementById('s3').innerHTML;
    index = getOrderNo(noteTitle, notesData);
    $("#noteModalTitle").html(noteTitle);
    i = 1;

}

function four() {
    noteTitle = document.getElementById('s4').innerHTML;
    index = getOrderNo(noteTitle, notesData);
    $("#noteModalTitle").html(noteTitle);
    i = 1;


}

//Function of hide the image displaying modal
function off() {
    modal.style.display = "none";
}

function displayNote() //function to make the popup images visible
{
    i = 1;
    modalImg.src = getNoteAddress(noteTitle, i, notesData);
    imgpgno = parseInt(getNotesLength(noteTitle, notesData));
    images = getNotesLength(noteTitle, notesData);
    $("#imgno").html("Pg." + 1);
}

function next() //Change image to next page
{
    if (i < images) {
        i++;
        modalImg.src = getNoteAddress(noteTitle, i, notesData);
        $("#imgno").html("Pg." + i);
    }
}

function previous() //Change image to previous page
{
    if (i > 1) { //No changes if first image
        i--;
        modalImg.src = getNoteAddress(noteTitle, i, notesData);
        $("#imgno").html("Pg." + i);
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
    elErrorContainer: '#notesUploadError',
    msgErrorClass: 'alert alert-block alert-danger',
    allowedFileExtensions: ["jpg", "png", "jpeg"],
    showRemove: false,
    maxFileCount: 10,
    validateInitialCount: true
});
//console.log("In global scope title is:"+ noteTitle);

/*
var uploadInProgress = $.when();
$('#uploadNoteImage').on('fileloaded', function (event, file, previewId, index, reader) {
    // here, we chain the "pending" upload to this one
    uploadInProgress = uploadInProgress.then(function() {
        var url = noTrailingSlash(window.location.href) + '/user/notes';
        console.log("1) Notes upload number: "+index);

        var imgpgno = parseInt(getNotesLength(noteTitle, notesData));
        console.log("2) Got page number of image "+imgpgno);

        var data = {
            "subject": noteTitle,
            "pgno": imgpgno + 1,
            "note": reader.result
        };

        console.log("3) Formed data object:");
        console.log(data);
        return $.ajax({
            url: url,
            method: "PUT",
            data: data
            // since we are using Promise pattern, use .then for success, and .catch for error conditions
        }).then(function (data) {
            console.log("4) Successfully uploaded data");
            console.log(data);
            toastr.success('', 'Added!');
            var order = getIndexToDelete(noteTitle, notesData);
            console.log("5) Fetched order number: "+order);
            var id = Math.floor(Math.random() * 1000);
            if (imgpgno == 0) {
                console.log("6)(No notes uploaded yet state) Images before uploading"+images);
                modalImg.src = reader.result;
                notesData[order].data.push({
                    "id": id, "pgno": imgpgno + 1,
                    "note": reader.result
                });
                images = imgpgno + 1;
                console.log("7)(No notes uploaded yet state) Images after uploading: "+images);
                // imgpgno++;

            }
            else { // if(imgpgno!=0) { // the check is redundant since when the above if condition is false, this has to be true
                var newPageNo=imgpgno + 1;
                console.log("6)(1 note uploaded state) Pushing data with pgno: "+newPageNo);
                notesData[order].data.push({
                    "id": id, "pgno": newPageNo,
                    "note": reader.result
                });
                images = imgpgno + 1;
                console.log("7)(1 note uploaded state) Images after uploading: "+images);
            }
        }).catch(function (err) {
            // this catch ensures that the next upload will be able to run regardless of this upload's failure
            toastr.error('Try again!', 'Something went wrong in uploading note!');
            console.log(err);
        });
    });
});
*/
var imgpgno;
$('#uploadNoteImage').on('fileloaded', function (event, file, previewId, index, reader) {
    var url = noTrailingSlash(window.location.href) + '/user/notes';
    console.log("1) Notes upload number: "+index);

    console.log("2) Got page number of image "+imgpgno);

    var data = {
        "subject": noteTitle,
        "pgno": imgpgno + index +1,
        "note": reader.result
    };

    var order = getIndexToDelete(noteTitle, notesData);
    console.log("5) Fetched order number: "+order);
    var id = Math.floor(Math.random() * 1000);
    if (imgpgno === 0) {
        console.log("6)(No notes uploaded yet state) Images before uploading"+images);
        modalImg.src = reader.result;
        notesData[order].data.push({
            "id": id,
            "pgno": imgpgno + index+ 1,
            "note": reader.result
        });
        images = imgpgno + index+1;
        console.log("7)(No notes uploaded yet state) Images after uploading: "+images);
        // imgpgno++;

    }
    else if(imgpgno!==0) {
        var newPageNo=imgpgno + index+1;
        console.log("6)(1 note uploaded state) Pushing data with pgno: "+newPageNo);
        notesData[order].data.push({
            "id": id, "pgno": newPageNo,
            "note": reader.result
        });
        images = imgpgno + index+1;
        console.log("7)(1 note uploaded state) Images after uploading: "+images);
    }

    console.log("3) Formed data object:");
    console.log(data);
    $.ajax({
        url: url,
        method: "PUT",
        data: data,
        success: function (data) {
            console.log("4) Successfully uploaded data");
            console.log(data);
            toastr.success('', 'Added!');
            /*var order = getIndexToDelete(noteTitle, notesData);
            console.log("5) Fetched order number: "+order);
            var id = Math.floor(Math.random() * 1000);
            if (imgpgno === 0) {
                console.log("6)(No notes uploaded yet state) Images before uploading"+images);
                modalImg.src = reader.result;
                notesData[order].data.push({
                    "id": id,
                    "pgno": imgpgno + index+ 1,
                    "note": reader.result
                });
                images = imgpgno + index+1;
                console.log("7)(No notes uploaded yet state) Images after uploading: "+images);
                // imgpgno++;

            }
            else if(imgpgno!==0) {
                var newPageNo=imgpgno + index+1;
                console.log("6)(1 note uploaded state) Pushing data with pgno: "+newPageNo);
                notesData[order].data.push({
                    "id": id, "pgno": newPageNo,
                    "note": reader.result
                });
                images = imgpgno + index+1;
                console.log("7)(1 note uploaded state) Images after uploading: "+images);
            }*/
        },
        error: function (err) {
            toastr.error('Try again!', 'Something went wrong in uploading image number'+(index+1)+'!');
            console.log(err);
        }
    });
});

//Click events

$("#deleteSubjectButton").click(function () {
    toggleX();
});

$("#previousSubjectArrowDiv").click(function () {
    prevsub();
});

$("#nextSubjectArrowDiv").click(function () {
    nextsub();
});

$("#note1").click(function () {
    one();
    displayNote();
});
$("#note2").click(function () {
    two();
    displayNote();
});
$("#note3").click(function () {
    three();
    displayNote();
});
$("#note4").click(function () {
    four();
    displayNote();
});

$("#del1").click(function () {
    one();
    deleteSubject();
});
$("#del2").click(function () {
    two();
    deleteSubject();
});
$("#del3").click(function () {
    three();
    deleteSubject();
});
$("#del4").click(function () {
    four();
    deleteSubject();
});

$("#deleteNoteButton").click(function () {
    deleteNote();
});

$("#prevNote").click(function () {
    previous();
});
$("#nextNote").click(function () {
    next();
});

$("#addSubjectButton").click(function () {
    addSubject();
});
$("#clearSubjectEntered").click(function () {
    reset1();
});


$("#deleteSubject").click(function () {
    deleteSubject();
});
$("#clearDeleteSubjectEntered").click(function () {
    reset2();
});

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
            document.getElementById('prevNote').click();
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
            document.getElementById('nextNote').click();
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
            document.getElementById('addSubjectButton').click();
        }
        if (ch3 == true) {
            document.getElementById("deleteSubject").click();
        }
    }
}); //Configuring enter key for modals

$(document).keydown(function (e) {
    if (e.keyCode == 38) {
        scrollToNote();
    }
});// Go to notes page

$(document).keydown(function (e) {
    if (e.keyCode == 40) {
        scrollToEvent();
        // Go to events page

    }
});

function scrollToEvent() {
    $('html, body').animate({
        scrollTop: $("#events").offset().top
    }, 500);
    $("#hideFullCalendar").show();
}

function scrollToNote() {
    $('html, body').animate({
        scrollTop: $("#myNavbar").offset().top
    }, 500);
    $("#showFullCalendar").show();
    setTimeout(function () {
        $("#events").hide()
    }, 500);
}

function setTitleExternally(title) {
    noteTitle = title;
}


$("#setPageSlider").bootstrapSlider({
    min:1,
    max:35,
    orientation:'horizontal',
    ticks:[7,14,21,28,35],
    formatter: function(value) {
        return 'View ' + value +' upcoming events.';
    },
    step:7,
});

// $("#showPageSizeSlider").click(function () {
//     if(!toggleSlider){
//         $("#sliderContainer").hide();
//
//     }else{
//         $("#sliderContainer").show();
//
//     }
//     toggleSlider=!toggleSlider;
// });


$("#centeralbook").hammer().on("swipeleft", function() { nextsub();});
$("#centeralbook").hammer().on("swiperight", function() { prevsub();});



var zoomed=false;

$("#img01").hammer().on("swipeleft", function(ev) {
    var velocity = ev.gesture.velocity;
    var velocityX =Math.abs(ev.gesture.velocityX);
    var velocityY = ev.gesture.velocityY;
    var horizontalSwipeDistance=ev.gesture.deltaX;
    var currentPosition=$("#noteImageContainer").scrollLeft();
    console.log("Swipe left x-velocity: "+velocityX+" Swipe distance: "+horizontalSwipeDistance+" Scroll position:"+currentPosition);
    if(velocityX> 1.3){
        next();
    }else{
        $('#noteImageContainer').animate({
            scrollLeft: currentPosition-horizontalSwipeDistance
        }, 700);

}
});

$("#img01").hammer().on("swiperight", function(ev) {
    var velocity = ev.gesture.velocity;
    var velocityX =Math.abs(ev.gesture.velocityX);
    var velocityY = ev.gesture.velocityY;
    var horizontalSwipeDistance=ev.gesture.deltaX;
    var currentPosition=$("#noteImageContainer").scrollLeft();
    console.log("Swipe right x-velocity: "+velocityX+" Swipe distance: "+horizontalSwipeDistance+" Scroll position:"+currentPosition);
    if(velocityX> 1.3){
        previous();
    }else{
        $('#noteImageContainer').animate({
            scrollLeft: currentPosition-horizontalSwipeDistance
        }, 700);

    }});


$("#img01").hammer().on('doubletap',function(){
    if(zoomed){
        $("#img01").css({'width':'100%'});
    }else{
        $("#img01").css({'width':'150%'});
    }
    zoomed=!zoomed;
});

//Delete note gesture setting
$("#img01").hammer()
    .data('hammer')
    .get('press')
    .set({ time: 500 });
$("#img01").hammer().on("press",function () {$("#deleteNoteButton").click();});



$("#img01").hammer().data('hammer').get('swipe').set({ direction: Hammer.DIRECTION_ALL, velocity:.1});

//Swipe down gesture to close modal or scroll up
$("#img01").hammer().on('swipedown',function (ev) {
    var velocity = ev.gesture.velocity;
    var velocityX = ev.gesture.velocityX;
    var velocityY = ev.gesture.velocityY;
    var verticalSwipeDistance=ev.gesture.deltaY;
    console.log('Velocity Y: '+velocityY);
    if(velocityY> 2){
        $("#close1").click();
    }else{
        var currentPosition = $("#noteImage").scrollTop();  //your current y position on the page
        $('#noteImage').animate({
            scrollTop: currentPosition-verticalSwipeDistance
        }, 700);
        console.log("Current position of scroll bar: "+ currentPosition+"      Swipe distance: "+verticalSwipeDistance);
    }
});




//Swipe up gesture to open file upload or scroll down

$("#img01").hammer().on('swipeup',function (ev) {
    var velocity = ev.gesture.velocity;
    var velocityX = ev.gesture.velocityX;
    var velocityY = Math.abs(ev.gesture.velocityY);
    var verticalSwipeDistance=ev.gesture.deltaY;
    velocityY=parseFloat(velocityY);
    console.log('Velocity Y: '+velocityY);



    if(velocityY > 2){
        console.log("Inside uploadNotesPopup Trigger");
         $("#uploadNoteImage").click();
    }else{
        console.log("Velocity less than 2");
        var currentPosition = $("#noteImage").scrollTop();  //your current y position on the page
        $('#noteImage').animate({
            scrollTop: currentPosition-verticalSwipeDistance
        }, 700);
        //console.log("Current position of scroll bar: "+ currentPosition+"      Swipe distance: "+verticalSwipeDistance);
    }
});