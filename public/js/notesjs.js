

var pgno = 1,notesno=4;


var subjects = ['CN', 'COA', 'WP', 'ITC', 'M1', 'ADBMS', 'PHYSICS', 'CHEMISTRY', 'ED', 'ADC', 'PADC']; //Default subject array


function getSubjectName(ind, myArray)
{
    for (var i=0; i < myArray.length; i++)
    {
        if (myArray[i].orderno === ind+1)
        {
            return myArray[i].subject;
        }
    }
}

function getNotesNumber(myArray)
{
    var large= myArray[0].orderno;
    for (var i=0; i < myArray.length; i++)
    {
        if (myArray[i].orderno > large)
        {

            large=myArray[i].orderno;
        }
    }
    return large;
}

function getImageAddress(subject,pg, myArray) {

    for (var i=0; i < myArray.length; i++)
    {
        if (myArray[i].subject === subject) {

        if("data" in myArray[i])
        {
            for(var j=0; j<myArray[i].data.length;j++)
            {
                if(myArray[i].data[j].pgno===pg)
                {
                    return myArray[i].data[j].note;
                }
            }

            return 'img/noimage.svg';

        }

        else

        return 'img/noimage.svg';
        }
    }
}

function getImagesNumber(subject ,myArray)
{
    for (var i=0; i < myArray.length; i++)
    {
        if (myArray[i].subject === subject)
        {

            var large=myArray[i].data[0].pgno;

            for(var j=0; j<myArray[i].data.length;j++)
            {
                if (myArray[i].data[j].pgno > large)
                {

                   large=myArray[i].data[j].pgno
                }
            }
            //noinspection JSAnnotator
            return large;
        }
    }
}

function getOrderNo(subject, myArray)
{
 for (var i=0; i<myArray.length; i++)
    {
        if(myArray[i].subject===subject)
        {
            return myArray[i].orderno;
        }
    }
}
var notesData=
    [
        {
            id:666,
            orderno:1,
            subject:"WP",
            data:[
                {
                    id:123,
                    pgno:1,
                    note:'img/WP1.jpeg'
                },
                {
                    id:124,
                    pgno:2,
                    note:'img/WP2.jpeg'
                },
                {
                    id:124,
                    pgno:3,
                    note:'img/WP3.jpeg'
                }
            ]
        },
        {
            id:676,
            orderno:2,
            subject:"COA",
            data:[
                {
                    id:123,
                    pgno:1,
                    note:'img/COA1.jpeg'
                },
                {
                    id:126,
                    pgno:2,
                    note:'img/COA2.jpg'
                }
            ]
        },

        {
            id:686,
            orderno:3,
            subject:"ITC",
            data:[
                {
                    id:123,
                    pgno:1,
                    note:'img/ITC1.png'
                },
                {
                    id:126,
                    pgno:2,
                    note:'img/ITC2.png'
                }
            ]
        },

        {
            id:476,
            orderno:4,
            subject:"Maths",
            data:[
                {
                    id:123,
                    pgno:1,
                    note:'img/M1.jpeg'
                },
                {
                    id:126,
                    pgno:2,
                    note:'img/M2.jpeg'
                }
            ]
        },

        {
            id:376,
            orderno:5,
            subject:"Physics",
            data:[
                {
                    id:123,
                    pgno:1,
                    note:'img/Physics1.jpeg'
                },
                {
                    id:126,
                    pgno:2,
                    note:'img/Physics2.jpeg'
                }
            ]
        },

        {
            id:674,
            orderno:6,
            subject:"CN",
            data:[
                {
                    id:123,
                    pgno:1,
                    note:'img/CN1.jpeg'
                },
                {
                    id:126,
                    pgno:2,
                    note:'img/CN2.jpeg'
                }
            ]
        },

        {
            id:176,
            orderno:7,
            subject:"AT",
            data:[
                {
                    id:123,
                    pgno:1,
                    note:'img/AT1.jpeg'
                },
                {
                    id:126,
                    pgno:2,
                    note:'img/AT2.jpeg'
                }
            ]
        },

        {
            id:175,
            orderno:8,
            subject:"iT",

        }

    ];


var len = getNotesNumber(notesData);

var pages;

var bks = 0;

$(window).resize(function(){

    init();
});

$(document).keydown(function(e) {
    if (e.keyCode == 78 && e.ctrlKey || e.keyCode == 78 && e.metaKey) {

        document.getElementById('addNoteButton').click();

    }
}); //New Note


$(document).keydown(function(e) {
    if ((e.keyCode == 8 && e.ctrlKey) || e.keyCode==8 && e.metaKey ) {
        document.getElementById('deleteNoteButton').click();
    }
}); // Delete Note



$(document).keydown(function(e) {
    if(e.keyCode == 37) {
        var check= $('#noteImage').is(':visible');
        if(check == false)
        {
            document.getElementById('goleft').click();
        }

        else if (check==true)
        {
            document.getElementById('previmg').click();
        }

    }
}); //Previous page



$(document).keydown(function(e) {
    if(e.keyCode == 39) {

        var check = $('#noteImage').is(':visible');

        if(check == false)
        {
            document.getElementById('goright').click();
        }

        else if (check==true)
        {
            document.getElementById('nextimg').click();
        }


    }
});// Next Page


$(document).keydown(function(e){
    if(e.keyCode==27){

        var ch1= $('#noteImage').is(':visible');
        var ch2= $('#newNoteName').is(':visible');
        var ch3= $('#deleteNoteName').is(':visible');

        if(ch1== true)
        {
            document.getElementById('close1').click();
        }

        if(ch2== true)
        {
            document.getElementById('hides1').click();
        }

        if(ch3== true)
        {
            document.getElementById('hides2').click();
        }

    }
}); //Configuring escape key for modals



$(document).keydown(function(e){
    if(e.keyCode==13){

        var ch2= $('#newNoteName').is(':visible');
        var ch3= $('#deleteNoteName').is(':visible');



        if(ch2== true)
        {
            document.getElementById('addNote').click();
        }

        if(ch3== true)
        {
            document.getElementById('delNote').click();
        }

    }
}); //Configuring enter key for modals



$(document).keydown(function(e) {

    if(e.keyCode == 38) {

        document.getElementById('gotonote').click();

    }
});// Go to notes page

$(document).keydown(function(e) {

    if(e.keyCode == 40) {

        viewevents();

    }
}); // Go to events page

function viewevents()
{

    $('html, body').animate({
        scrollTop: $("#events").offset().top
    }, 500);

}

function viewnotes()
{

    $('html, body').animate({
        scrollTop: $("#nav").offset().top
    }, 500);

}

//Shows the modal on screen


//Performs validation and adds to subject name array

function adding() {
    var newsubject = document.getElementById("subject").value;

    if (newsubject=='')
    {
        document.getElementById("err").innerHTML = "<br>" + "<span style='color:red; font-size:15px; margin-left:40%; ' >" + "Invalid entry..." + "</span>" +"<br>"+"<br>";

    }
    else if (subjects.indexOf((newsubject).toUpperCase()) >= 0 ) {
        document.getElementById("err").innerHTML = "<br>" + "<span style='color:red; font-size:15px; margin-left:40%; '>" + "Already present..." + "</span>" +"<br>"+"<br>"+"<br>";
    }
    else {
        subjects[len] = (newsubject.toUpperCase());
        len = getNotesNumber(notesData);
        pages = Math.ceil((len / notesno));

        document.getElementById("subject").value = '';

        document.getElementById("hides1").click();

        init();
    }

}

document.getElementById("hides1").onclick=function()
{
    reset1();
}


document.getElementById("hides2").onclick=function()
{
    reset2();
}

//Performs validation and deletes string from array
function deleting() {
    var newsubject = document.getElementById("subject2").value;

    if (subjects.indexOf(newsubject.toUpperCase()) < 0) {
        document.getElementById("err2").innerHTML = "<br>" +"<br>"+ "<span style='color:red; font-size:15px; margin-left:40%; '>" + "Subject not added..." + "</span>"+"<br>"+"<br>";
    }
    else {
        var i = subjects.indexOf(newsubject.toUpperCase());
        subjects.splice(i, 1);
        len = getNotesNumber(notesData);
        pages = Math.ceil((len / 4));
        document.getElementById("subject2").value = "";
        document.getElementById("hides2").click();
        init();
    }
}

//Functions to reset the text input field to blank in case of both modals to add and delete notes

function reset1() {
    document.getElementById("subject").value = '';
    document.getElementById("err").innerHTML = "<br>" + "<br>" +"<br>" + "<br>";
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


    var colors=['#003300', '#006666', '#0099ff', '#00cc66', '#00cc99', '#00ccff', '#660033', '#660099', '#6633ff', '#666699', '#6699cc', '#990033', '#9900ff', '#cc0033', '#cc6666', '#cccc00', '#ff0099', '#ff3300', '#ff6600', '#ff6699', '#ff9966', '#ffff66', '#ffccff' ];

    var i,c,j,d;

    // $("#note1").css('background-color', '#' + (Math.random() * 0xFFFFFF << 0).toString(16));
    // $("#note2").css('background-color', '#' + (Math.random() * 0xFFFFFF << 0).toString(16));
    // $("#note3").css('background-color', '#' + (Math.random() * 0xFFFFFF << 0).toString(16));
    // $("#note4").css('background-color', '#' + (Math.random() * 0xFFFFFF << 0).toString(16));
    c=Math.floor(Math.random()*10000%23); i= colors[c];
    j=replaceAt(i,1,'c');
    // j=replaceAt(j,3,'8');
    // j=replaceAt(j,6,'2');

    $("#note1").css('background', 'linear-gradient(to bottom,'+i+','+j+')' );

    c=Math.floor(Math.random()*10000%23); i= colors[c];
    j=replaceAt(i,1,'8');
    // j=replaceAt(j,3,'e');
    // j=replaceAt(j,6,'a');

    $("#note2").css('background','linear-gradient(to bottom,'+i+','+j+')' );


    c=Math.floor(Math.random()*10000%23); i= colors[c];
    j=replaceAt(i,1,'6');
    // j=replaceAt(j,3,'2');
    // j=replaceAt(j,6,'1');
    $("#note3").css('background', 'linear-gradient(to bottom,'+i+','+j+')');


    c=Math.floor(Math.random()*10000%23); i= colors[c];
    j=replaceAt(i,1,'b');
    // j=replaceAt(j,3,'9');
    // j=replaceAt(j,6,'7');
    $("#note4").css('background', 'linear-gradient(to bottom,'+i+','+j+')');
}

var ind;

function prevsub() {
    bks = 0;
    if (pgno == 1)

    {
        //No changes if user on first page
    } else {
        pgno--;
        ind = notesno * (pgno - 1);
        if(notesno==4)
        {
            document.getElementById("s1").innerHTML = getSubjectName(ind,notesData);
            note1.style.display = "block";
            document.getElementById("s2").innerHTML = getSubjectName(ind+1,notesData);
            note2.style.display = "block";
            document.getElementById("s3").innerHTML = getSubjectName(ind+2,notesData);
            note3.style.display = "block";
            document.getElementById("s4").innerHTML = getSubjectName(ind+3,notesData);
            note4.style.display = "block";
        }

        else if(notesno==3)
        {
            document.getElementById("s1").innerHTML = getSubjectName(ind,notesData);
            note1.style.display = "block";
            document.getElementById("s2").innerHTML = getSubjectName(ind+1,notesData);
            note2.style.display = "block";
            document.getElementById("s3").innerHTML = getSubjectName(ind+2,notesData);
            note3.style.display = "block";
        }

        else if(notesno==2)
        {
            document.getElementById("s1").innerHTML = getSubjectName(ind,notesData);
            note1.style.display = "block";
            document.getElementById("s2").innerHTML = getSubjectName(ind+1,notesData);
            note2.style.display = "block";
        }

        else if(notesno==1)
        {
            document.getElementById("s1").innerHTML = getSubjectName(ind,notesData);
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
    if (pgno == pages) {
        //No changes if user on last page
    } else {

        pgno++;
        ind = notesno * (pgno - 1);
        if(notesno==4)
        {
            document.getElementById("s1").innerHTML = getSubjectName(ind,notesData);
            note1.style.display = "block";
            document.getElementById("s2").innerHTML = getSubjectName(ind+1,notesData);
            note2.style.display = "block";
            document.getElementById("s3").innerHTML = getSubjectName(ind+2,notesData);
            note3.style.display = "block";
            document.getElementById("s4").innerHTML = getSubjectName(ind+3,notesData);
            note4.style.display = "block";
        }

        else if(notesno==3)
        {
            document.getElementById("s1").innerHTML = getSubjectName(ind,notesData);
            note1.style.display = "block";
            document.getElementById("s2").innerHTML = getSubjectName(ind+1,notesData);
            note2.style.display = "block";
            document.getElementById("s3").innerHTML = getSubjectName(ind+2,notesData);
            note3.style.display = "block";
        }

        else if(notesno==2)
        {
            document.getElementById("s1").innerHTML = getSubjectName(ind,notesData);
            note1.style.display = "block";
            document.getElementById("s2").innerHTML = getSubjectName(ind+1,notesData);
            note2.style.display = "block";
        }

        else if(notesno==1)
        {
            document.getElementById("s1").innerHTML = getSubjectName(ind,notesData);
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

    var oldpgno=pgno;
    var oldnotesno=notesno;

    // var sheight=$(window).height();
    // $('#img01').css('height',sheight);


    bks = 0;
    {

        $('#note1').css({'height':'300px','width':'230px','margin-top':'auto'});
        // alert('here');
        $('.changenotes').css('height','380px');
        $('#gotoevent').css('margin-top','145px');
        $('#goleft').css('top','200px');
        $('#goright').css('top','200px');
        $('#mynotes').css('height','760px');
        $('#foot').css('margin-top','auto');
        $("#books").css('margin-top','auto');

        var width=$("#centeralbook").width();


        if(width>=1000) //Full screen
        {

            $(".fc-toolbar").css({'font-size': '15px'});
            pages = Math.ceil((len / 4));
            notesno=4;
            pgno= Math.ceil((oldnotesno*(oldpgno-1)+1)/notesno);
            ind = notesno * (pgno - 1);

            if(ind<len)
            {
                document.getElementById("s1").innerHTML =getSubjectName(ind,notesData);
                note1.style.display = "block";

                if(ind+1<len)
                {
                    document.getElementById("s2").innerHTML =getSubjectName(ind+1,notesData);
                    note2.style.display = "block";

                    if(ind+2<len)
                    {
                        document.getElementById("s3").innerHTML = getSubjectName(ind+2,notesData);
                        note3.style.display = "block";

                        if(ind+3<len)
                        {
                            document.getElementById("s4").innerHTML = getSubjectName(ind+3,notesData);
                            note4.style.display = "block";
                        }
                        else
                        {
                            note4.style.display = "none";
                        }

                    }
                    else
                    {
                        note3.style.display = "none";

                    }
                }
                else
                {
                    note2.style.display = "none";
                }
            }
            else
            {
                note1.style.display = "none";
                if(pgno!=1)
                {
                    pgno--;
                    init();
                }




            }
        }

        else if( width>=820) // 3/4rth width
        {
            $(".fc-toolbar").css({'font-size': '15px'});
            pages = Math.ceil((len / 3));
            notesno=3;
            pgno= Math.ceil((oldnotesno*(oldpgno-1)+1)/notesno);
            ind = notesno * (pgno - 1);

            if(ind<len)
            {
                document.getElementById("s1").innerHTML = getSubjectName(ind,notesData);
                note1.style.display = "block";

                if(ind+1<len)
                {
                    document.getElementById("s2").innerHTML = getSubjectName(ind+1,notesData);
                    note2.style.display = "block";

                    if(ind+2<len)
                    {
                        document.getElementById("s3").innerHTML = getSubjectName(ind+2,notesData);
                        note3.style.display = "block";


                        document.getElementById("s4").innerHTML = getSubjectName(ind+3,notesData);
                        note4.style.display = "none";

                    }
                    else
                    {
                        note3.style.display = "none";

                    }
                }
                else
                {
                    note2.style.display = "none";
                }
            }
            else
            {
                note1.style.display = "none";
                if(pgno!=1)
                {
                    pgno--;
                    init();
                }



            }

        }

        else if(width>=470) //1/2 width
        {
            $(".fc-toolbar").css({'font-size': '12px'});

            pages = Math.ceil((len / 2));
            notesno=2;
            pgno= Math.ceil((oldnotesno*(oldpgno-1)+1)/notesno);
            ind = notesno * (pgno - 1);

            if(ind<len)
            {
                document.getElementById("s1").innerHTML =getSubjectName(ind,notesData);;
                note1.style.display = "block";

                if(ind+1<len)
                {
                    document.getElementById("s2").innerHTML = getSubjectName(ind+1,notesData);
                    note2.style.display = "block";


                    document.getElementById("s3").innerHTML = getSubjectName(ind+2,notesData);
                    note3.style.display = "none";


                    document.getElementById("s4").innerHTML = getSubjectName(ind+3,notesData);
                    note4.style.display = "none";

                }
                else
                {
                    note2.style.display = "none";
                }
            }
            else
            {
                note1.style.display = "none";

                if(pgno!=1)
                {
                    pgno--;
                    init();

                }

            }
        }

        else if(width<470)  // Phablet width
        {
            $(".fc-toolbar").css({'font-size': '9px'});
            $("#books").css('margin-top','55px');

            var h2=$(window).height();
            if(h2<600)
            {


                //  $('#note1').css({'height':'305px','width':'192px','margin-top':'-5px'});
                //  $('.changenotes').css('height','250px');
                //  $('#gotoevent').css('margin-top','20px');
                //  $('#goleft').css('top','150px');
                //  $('#goright').css('top','150px');
                //  $('#mynotes').css('height','529px');
                $('#foot').css('margin-top','-150px');
            }

            pages = Math.ceil((len / 1));
            notesno=1;
            pgno= Math.ceil((oldnotesno*(oldpgno-1)+1)/notesno);

            ind = notesno * (pgno - 1);

            if(ind<len)
            {
                document.getElementById("s1").innerHTML = getSubjectName(ind,notesData);
                note1.style.display = "block";


                document.getElementById("s2").innerHTML = subjects[ind + 1];
                note2.style.display = "none";

                document.getElementById("s3").innerHTML = subjects[ind + 2];
                note3.style.display = "none";


                document.getElementById("s4").innerHTML = subjects[ind + 3];
                note4.style.display = "none";


            }
            else
            {
                note1.style.display = "none";
                if(pgno!=1)
                {
                    pgno--;
                    init();
                }


            }

        }

    }
}


//Functions to identify the note number pressed ie. first note from left,second from left et...

var i = 1;
var index;
var title;

function one() {

    title=document.getElementById("s1").innerHTML;
    index=getOrderNo(title,notesData);
    $("#noteModalTitle").html(title);
    i = 1;
}

function two() {
    title=document.getElementById('s2').innerHTML;
    index=getOrderNo(title,notesData);
    $("#noteModalTitle").html(title);
    i = 1;
}

function three() {
    title=document.getElementById('s3').innerHTML;
    index=getOrderNo(title,notesData);
    $("#noteModalTitle").html(title);
    i = 1;
}

function four() {
    title=document.getElementById('s4').innerHTML;
    index=getOrderNo(title,notesData);
    $("#noteModalTitle").html(title);
    i = 1;
}


//Innitializing images//
{
    var Notes = new Array(len);
    var uplen = 0;
    Notes[0] = new Array(3);
    Notes[0][0] = new Image();
    Notes[0][0].src = "img/CN1.jpeg";
    uplen++;
    Notes[0][1] = new Image();
    Notes[0][1].src = "img/CN2.jpg";
    Notes[0][2] = new Image();
    Notes[0][2].src = "img/CN3.jpg";
    Notes[1] = new Array(3);
    Notes[1][0] = new Image();
    Notes[1][0].src = "img/COA1.jpeg";
    uplen++;
    Notes[1][1] = new Image();
    Notes[1][1].src = "img/COA2.jpg";
    Notes[1][2] = new Image();
    Notes[1][2].src = "img/COA3.jpeg";
    Notes[2] = new Array(3);
    Notes[2][0] = new Image();
    Notes[2][0].src = "img/WP1.jpeg";
    uplen++;
    Notes[2][1] = new Image();
    Notes[2][1].src = "img/WP2.jpeg";
    Notes[2][2] = new Image();
    Notes[2][2].src = "img/WP3.jpeg";
    Notes[3] = new Array(3);
    Notes[3][0] = new Image();
    Notes[3][0].src = "img/ITC1.png";
    uplen++;
    Notes[3][1] = new Image();
    Notes[3][1].src = "img/ITC2.png";
    Notes[3][2] = new Image();
    Notes[3][2].src = "img/ITC3.png";
    Notes[4] = new Array(3);
    Notes[4][0] = new Image();
    Notes[4][0].src = "img/M1.jpeg";
    uplen++;
    Notes[4][1] = new Image();
    Notes[4][1].src = "img/M2.jpeg";
    Notes[4][2] = new Image();
    Notes[4][2].src = "img/M3.jpeg";
    Notes[5] = new Array(3);
    Notes[5][0] = new Image();
    Notes[5][0].src = "img/ADBMS1.jpeg";
    uplen++;
    Notes[5][1] = new Image();
    Notes[5][1].src = "img/ADBMS2.jpeg";
    Notes[5][2] = new Image();
    Notes[5][2].src = "img/ADBMS3.jpeg";
    Notes[6] = new Array(3);
    Notes[6][0] = new Image();
    Notes[6][0].src = "img/Physics1.jpeg";
    uplen++;
    Notes[6][1] = new Image();
    Notes[6][1].src = "img/Physics2.jpeg";
    Notes[6][2] = new Image();
    Notes[6][2].src = "img/Physics3.jpeg";
    Notes[7] = new Array(3);
    Notes[7][0] = new Image();
    Notes[7][0].src = "img/Chemistry1.png";
    uplen++;
    Notes[7][1] = new Image();
    Notes[7][1].src = "img/Chemistry2.png";
    Notes[7][2] = new Image();
    Notes[7][2].src = "img/Chemistry3.png";
    Notes[8] = new Array(3);
    Notes[8][0] = new Image();
    Notes[8][0].src = "img/ED1.jpeg";
    uplen++;
    Notes[8][1] = new Image();
    Notes[8][1].src = "img/ED2.jpg";
    Notes[8][2] = new Image();
    Notes[8][2].src = "img/ED3.jpeg";
    Notes[9] = new Array(3);
    Notes[9][0] = new Image();
    Notes[9][0].src = "img/ADC1.jpeg";
    uplen++;
    Notes[9][1] = new Image();
    Notes[9][1].src = "img/ADC2.jpg";
    Notes[9][2] = new Image();
    Notes[9][2].src = "img/ADC3.jpg";
    Notes[10] = new Array(3);
    Notes[10][0] = new Image();
    Notes[10][0].src = "img/PADC1.png";
    uplen++;
    Notes[10][1] = new Image();
    Notes[10][1].src = "img/PADC2.png";
    Notes[10][2] = new Image();
    Notes[10][2].src = "img/PADC3.png";
}

uplen=getNotesNumber(notesData);

//Function of hide the image displaying modal
function off() {
    modal.style.display = "none";
}



var modal = document.getElementById('myModal');

var modalImg = document.getElementById("img01");

var images;

function a() //function to make the popup images visible
{


    if (index < uplen) {

        modalImg.src = getImageAddress(title,1,notesData);
        images=getImagesNumber(title,notesData);
    }
    else {
        modalImg.src = "img/noimage.svg";
    }
}


function next() //Change image to next page
{
    if(i<images)
    {
        i++;
        modalImg.src = getImageAddress(title,i,notesData);
        //alert(getImageAddress(title,i,notesData) );
    }
}

function previous() //Change image to previous page
{

    if (i > 1) {
        i--;
        modalImg.src =getImageAddress(title,i,notesData);
        //alert(getImageAddress(title,i,notesData) );
    } else {
        //No changes if first image
    }

}

$("#uploadNoteImage").fileinput({
    overwriteInitial: false,
    maxFileSize: 10000,
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
    defaultPreviewContent: '<img src="img/pages.png" alt="Your Avatar" class="avatar-preview">',
    allowedFileExtensions: ["jpg", "png", "jpeg"]
});

$('#uploadNoteImage').on('fileloaded', function (event, file, previewId, index, reader) {
    console.log("fileloaded");
    // console.log(reader.result);
    var url = noTrailingSlash(window.location.href) + '/user/avatar';   ////////THIS WONT BE USER/AVATAR ////////
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
