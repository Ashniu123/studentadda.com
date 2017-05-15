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


//---------------------UPDATED BY PARTH 3/2/17-------------------  Ends on 491//


var pgno = 1,nono,notesno=4;


var subjects = ['CN', 'COA', 'WP', 'ITC', 'M1', 'ADBMS', 'PHYSICS', 'CHEMISTRY', 'ED', 'ADC', 'PADC']; //Default subject array

//var subjects = ['1','2','3','4','5','6','7','8','9','10','11'];

var len = subjects.length;

var pages;

var bks = 0;

$(window).resize(function(){

    init();
});
// var h2=$(window).height();


//     $(window).resize(function() {



//      if(h2<600)
//     {
//        $('#note1').css({'height':'305px','width':'192px','margin-top':'-5px'});
//        $('.changenotes').css('height','250px');
//        $('#gotoevent').css('margin-top','0px');
//        $('#goleft').css('top','150px');
//        $('#goright').css('top','150px');
//        $('#mynotes').css('height','529px');
//        $('#foot').css('margin-top','-150px');

//     }

//     else{

//     }

//     //$("#gotonote").click();

// });



$(document).keydown(function(e) {
    if (e.keyCode == 78 && e.ctrlKey || e.keyCode == 78 && e.metaKey) {
        document.getElementById('addNoteButton').click();

    }
}); //New Note


$(document).keydown(function(e) {
    if ((e.keyCode == 8 && e.ctrlKey) || e.keyCode==8 && e.metaKey ) {
        document.getElementById('deletenote').click();
    }
}); // Delete Note



$(document).keydown(function(e) {
     if(e.keyCode == 37) {
         var check= $('#').is(':visible');
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

//Update by Parth 9/3/17 Add/Delete Notes


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
        document.getElementById("err").innerHTML = "<br>" + "<span style='color:red; font-size:15px; margin-left:40%; '>" + "Already present..." + "</span>" +"<br>"+"<br>";
    }
    else {
        subjects[len] = (newsubject.toUpperCase());
        len = subjects.length;
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
        len = subjects.length;
        pages = Math.ceil((len / 4));
       document.getElementById("subject2").value = "";
        document.getElementById("hides2").click();

        init();


    }



}


//File input innitating function
document.getElementById('addimg').onclick = function()

{
    document.getElementById('myFile').click();
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
            document.getElementById("s1").innerHTML = subjects[ind];
            note1.style.display = "block";
            document.getElementById("s2").innerHTML = subjects[ind + 1];
            note2.style.display = "block";
            document.getElementById("s3").innerHTML = subjects[ind + 2];
            note3.style.display = "block";
            document.getElementById("s4").innerHTML = subjects[ind + 3];
            note4.style.display = "block";
        }

        else if(notesno==3)
        {
            document.getElementById("s1").innerHTML = subjects[ind];
            note1.style.display = "block";
            document.getElementById("s2").innerHTML = subjects[ind + 1];
            note2.style.display = "block";
            document.getElementById("s3").innerHTML = subjects[ind + 2];
            note3.style.display = "block";
        }

        else if(notesno==2)
        {
            document.getElementById("s1").innerHTML = subjects[ind];
            note1.style.display = "block";
            document.getElementById("s2").innerHTML = subjects[ind + 1];
            note2.style.display = "block";
        }

        else if(notesno==1)
        {
            document.getElementById("s1").innerHTML = subjects[ind];
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
        document.getElementById("s1").innerHTML = subjects[ind];
        document.getElementById("s2").innerHTML = subjects[ind + 1];
        document.getElementById("s3").innerHTML = subjects[ind + 2];
        document.getElementById("s4").innerHTML = subjects[ind + 3];

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
    //alert(width);




        if(width>=1000) //Full screen
        {
            $("#img01").css({'width': '50%', 'height': 'auto', 'display' : 'block', 'margin' : 'auto'});

            $(".fc-toolbar").css({'font-size': '15px'});
            pages = Math.ceil((len / 4));
            notesno=4;
            pgno= Math.ceil((oldnotesno*(oldpgno-1)+1)/notesno);
            ind = notesno * (pgno - 1);

            if(ind<len)
            {
                document.getElementById("s1").innerHTML = subjects[ind];
                note1.style.display = "block";

                if(ind+1<len)
                {
                    document.getElementById("s2").innerHTML = subjects[ind + 1];
                    note2.style.display = "block";

                    if(ind+2<len)
                    {
                        document.getElementById("s3").innerHTML = subjects[ind + 2];
                        note3.style.display = "block";

                        if(ind+3<len)
                        {
                            document.getElementById("s4").innerHTML = subjects[ind + 3];
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
                document.getElementById("s1").innerHTML = subjects[ind];
                note1.style.display = "block";

                if(ind+1<len)
                {
                    document.getElementById("s2").innerHTML = subjects[ind + 1];
                    note2.style.display = "block";

                    if(ind+2<len)
                    {
                        document.getElementById("s3").innerHTML = subjects[ind + 2];
                        note3.style.display = "block";


                            document.getElementById("s4").innerHTML = subjects[ind + 3];
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



            // document.getElementById("s1").innerHTML = subjects[ind];
            // note1.style.display = "block";
            // document.getElementById("s2").innerHTML = subjects[ind + 1];
            // note2.style.display = "block";
            // document.getElementById("s3").innerHTML = subjects[ind + 2];
            // note3.style.display = "block";
            // document.getElementById("s4").innerHTML = subjects[ind + 3];
            // note4.style.display = "none";
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
                document.getElementById("s1").innerHTML = subjects[ind];
                note1.style.display = "block";

                if(ind+1<len)
                {
                    document.getElementById("s2").innerHTML = subjects[ind + 1];
                    note2.style.display = "block";


                        document.getElementById("s3").innerHTML = subjects[ind + 2];
                        note3.style.display = "none";


                            document.getElementById("s4").innerHTML = subjects[ind + 3];
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

            // document.getElementById("s1").innerHTML = subjects[ind];
            // note1.style.display = "block";
            // document.getElementById("s2").innerHTML = subjects[ind + 1];
            // note2.style.display = "block";
            // document.getElementById("s3").innerHTML = subjects[ind + 2];
            // note3.style.display = "none";
            // document.getElementById("s4").innerHTML = subjects[ind + 3];
            // note4.style.display = "none";
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
                document.getElementById("s1").innerHTML = subjects[ind];
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


            // document.getElementById("s1").innerHTML = subjects[ind];
            // note1.style.display = "block";
            // document.getElementById("s2").innerHTML = subjects[ind + 1];
            // note2.style.display = "none";
            // document.getElementById("s3").innerHTML = subjects[ind + 2];
            // note3.style.display = "none";
            // document.getElementById("s4").innerHTML = subjects[ind + 3];
            // note4.style.display = "none";
        }


        // if (ind > len - 1) {
        //     note1.style.display = "none";
        //     bks++;
        // }
        // if (ind + 1 > len - 1) {
        //     note2.style.display = "none";
        //     bks++;
        // }
        // if (ind + 2 > len - 1) {
        //     note3.style.display = "none";
        //     bks++;
        // }
        // if (ind + 3 > len - 1) {
        //     note4.style.display = "none";
        //     bks++;
        // }

        // {

        //     if (bks == 0) {
        //         $("#books").css({
        //             "margin-left": "0%"
        //         });
        //     } else if (bks == 1) {
        //         $("#books").css({
        //             "margin-left": "10%"
        //         });
        //     } else if (bks == 2) {
        //         $("#books").css({
        //             "margin-left": "20%"
        //         });
        //     } else if (bks == 3) {
        //         $("#books").css({
        //             "margin-left": "30%"
        //         });
        //     }

        // }
    }
}


//Functions to identify the note number pressed ie. first note from left,second from left et...

var i = 0;
var index;
var title;

function one() {

    title=document.getElementById("s1").innerHTML;
    index=subjects.indexOf(title);

    i = 0;
}

function two() {
    title=document.getElementById('s2').innerHTML;
    index=subjects.indexOf(title);

    i = 0;
}

function three() {
    title=document.getElementById('s3').innerHTML;
    index=subjects.indexOf(title);

    i = 0;
}

function four() {
    title=document.getElementById('s4').innerHTML;
    index=subjects.indexOf(title);

    i = 0;
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

//Function of hide the image displaying modal
function off() {
    modal.style.display = "none";
}



var modal = document.getElementById('myModal');

var modalImg = document.getElementById("img01");


function a() //function to make the popup images visible
{


    if (index < uplen) {



        modalImg.src = Notes[index][i].src;
    } else {
        modalImg.src = "img/noimage.svg";
    }
}


function next() //Change image to next page
{

    if (i < 2) {
        i++;
        modalImg.src = Notes[index][i].src;
    } else {
        //No changes if last image
    }
}

function previous() //Change image to previous page
{

    if (i > 0) {
        i--;
        modalImg.src = Notes[index][i].src;

    } else {
        //No changes if first image
    }

}



//---------------------UPDATED BY PARTH 3/2/17 ENDS-------------------//


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


$.fn.singleAndDouble = function(singleClickFunc, doubleClickFunc) {
    // This means it'll take a minimum of 200ms to take the single
    // click action. If it's too short the single and double actions
    // will be called.
    // The default time between clicks on windows is 500ms (http://en.wikipedia.org/wiki/Double-click)
    // Adjust accordingly.
    var timeOut = 200;
    var timeoutID = 0;
    var ignoreSingleClicks = false;

    this.on('click', function(e) {
        if (!ignoreSingleClicks) {
            // The double click generates two single click events
            // and then a double click event so we always clear
            // the last timeoutID
            clearTimeout(timeoutID);

            timeoutID = setTimeout(function() {
                singleClickFunc(e);
            }, timeOut);
        }
    });

    this.on('dblclick', function(e) {
        clearTimeout(timeoutID);
        ignoreSingleClicks = true;

        setTimeout(function() {
            ignoreSingleClicks = false;
        }, timeOut);

        doubleClickFunc(e);
    });

};

//Calendar



//This is parth fixing the ui for good

$('#calendar').css('font-size', '20px');
$('#calendar').css('color', 'black');

//Dark mode

$("#darkswitch").change(function(){

    var on=$('#darkswitch').prop('checked');
    if(on)
    {
        $("#calbg").css({
        'background': 'url(img/calendar4.jpg) no-repeat center center fixed' , '-webkit-background-size': 'cover' , '-moz-background-size': 'cover' , '-o-background-size' : 'cover' , 'background-size': 'cover'
        });
        $('#calendar').css('color', 'white');
        $('#eventtitle').css('color','white');

        $('#calendarHelp').css({'color':'#fff','background-color':'#000'});
    }else
    {
      $("#calbg").css({
        'background': 'url(img/calendar5.jpg) no-repeat center center fixed' , '-webkit-background-size': 'cover' , '-moz-background-size': 'cover' , '-o-background-size' : 'cover' , 'background-size': 'cover'
        });
    $('#calendar').css('color', 'black');
    $('#eventtitle').css('color','black');
    $('#calendarHelp').css({'color':'#000','background-color':'transparent'});
    }

});



//To invert Color
function invertColor(hexTripletColor) {
    var color = hexTripletColor;
    color = color.substring(1); // remove #
    color = parseInt(color, 16); // convert to integer
    color = 0xFFFFFF ^ color; // invert three bytes
    color = color.toString(16); // convert to hex
    color = ("000000" + color).slice(-6); // pad with leading zeros
    color = "#" + color; // prepend #
    return color;
}

$(document).ready(function() {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $('#calendarHelp').tooltip({
        trigger: 'hover',
        title: 'Click/Drag across day(s) to Create an Event!'
    });


    var calendar = $('#calendar').fullCalendar({
        buttonText: {
            today: 'Today',
            month: 'Month',
            week: 'Week',
            listWeek: 'List',
            day: 'Day'
        },
        header: {
            left: 'prev,next,today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay,listWeek'

        },
        defaultView: 'month',
        fixedWeekCount: false,
        allDayDefault: false,
        /*
  			selectable:true will enable user to select datetime slot
  			selectHelper will add helpers for selectable.
  		*/
        selectable: true,
        selectHelper: true,
        events: [ //Demo Data!!
            {
                id: 1,
                title: 'All Day Event',
                start: moment(new Date(y, m, 1), "DD/MM/YYYY HH:mm", true),
                end: moment(new Date(y, m, 2), "DD/MM/YYYY HH:mm", true),
                allDay: true,
                color: "#ff0000"
            },
            {
                id: 2,
                title: 'Long Event',
                start: moment(new Date(y, m, d - 5), "DD/MM/YYYY HH:mm", true),
                end: moment(new Date(y, m, d - 2), "DD/MM/YYYY HH:mm", true),
                allDay: true
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: moment(new Date(y, m, d - 3, 16, 0), "DD/MM/YYYY HH:mm", true),
                end: moment(new Date(y, m, d - 2, 8, 0), "DD/MM/YYYY HH:mm", true),
                description: "Cool Stuff Bru!"
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: moment(new Date(y, m, d + 4, 16, 0), "DD/MM/YYYY HH:mm", true),
                end: moment(new Date(y, m, d + 5, 8, 0), "DD/MM/YYYY HH:mm", true)
            },
            {
                id: 3,
                title: 'Meeting',
                start: moment(new Date(y, m, d, 10, 30), "DD/MM/YYYY HH:mm", true),
                end: moment(new Date(y, m, d, 12, 0), "DD/MM/YYYY HH:mm", true),
                color: '#00ff00'
            },
            {
                id: 4,
                title: 'Lunch',
                start: moment(new Date(y, m, d, 12, 0), "DD/MM/YYYY HH:mm", true),
                end: moment(new Date(y, m, d, 14, 0), "DD/MM/YYYY HH:mm", true)
            },
            {
                id: 5,
                title: 'Birthday Party',
                start: moment(new Date(y, m, d + 1, 19, 0), "DD/MM/YYYY HH:mm", true),
                end: moment(new Date(y, m, d + 1, 22, 30), "DD/MM/YYYY HH:mm", true)
                // dow:[1,5]//for repeating events
            },
            {
                id: 6,
                title: 'Click for Google',
                start: moment(new Date(y, m, 27), "DD/MM/YYYY HH:mm", true),
                end: moment(new Date(y, m, 28), "DD/MM/YYYY HH:mm", true)
                // url: 'http://google.com/'
            }
        ],
        /*
        	when user select timeslot this option code will execute.
        */
        select: function(start, end, allDay) {

            $('.modal-header').css({
                'background-color': '#fff',
                'color': '#000'
            });
            $('#createEventModal').modal();

            $('#createEventStartTime').val(moment(start).format('DD/MM/YYYY HH:mm', true));
            $('#createEventEndTime').val(moment(end).format('DD/MM/YYYY HH:mm', true));

            $('#createEventStartTime').datetimepicker({
                format: 'DD/MM/YYYY HH:mm',
                useCurrent: false,
                sideBySide: true,
            });

            $('#createEventEndTime').datetimepicker({
                format: 'DD/MM/YYYY HH:mm',
                useCurrent: false,
                sideBySide: true,
            });

            var color = '#3a87ad',
                textColor = '#ffffff';
            $('#createEventColor').val(color);
            $('#createEventColor').change(function() { //Works Brilliantly!!
                console.log("Changed Color:", $('#createEventColor').val());
                color = $('#createEventColor').val();
                textColor = invertColor($('#createEventColor').val());
            });

            var allDay;
            if ($('#createEventAllDay').attr('checked'))
                allDay = true;
            // else//NOTE:set via allDayDefault
            //   allDay=false;

            $('#createEventModal').on('shown.bs.modal', function() {
                $('#createEventTitle').focus();
            });

            $('#createEventButton').click(function(e){
              e.stopPropagation();
              var title = $('#createEventTitle').val();
              var desc='';
              if($('#createEventInfo').val()){
                desc=$('#createEventInfo').val();
              }

              var dow = [];
              $.each($("input[name='createEventRecurring']:checked"), function() {
                  dow.push(parseInt($(this).val()));
              });
              //TODO:Check for valid start and end time

              if($('#createEventStartTime').val()==''||$('#createEventEndTime').val()==''){
                $('#createEventError').html('Start and End is Required');
              }else if($('#createEventTitle').val()==''){
                $('#createEventError').html('Title is Required');
              }else{

                $('#createEventError').html('');


                //make better id by server
                function getId(){return Math.floor(Math.random()*999)};
                var id=getId(),flag=0;

                for(var i=0;i<calendar.fullCalendar('clientEvents').length;i++){
                  var temp_id=calendar.fullCalendar('clientEvents')[i].id;
                  if(id==temp_id){id=getId();i=0;flag=1;}else{flag=0;}
                }
                //check if id exists in the events before render

                if(flag==0){//if id is unique only then
                    //we only need to send this json to db then reload page or call rerenderEvents function
        				  calendar.fullCalendar('renderEvent',
        					{
                    //Compulsory Id
                    id:id,//TODO:make better unique id
        						title: title,
                    start: moment($('#createEventStartTime').val(),'DD/MM/YYYY HH:mm',true),
        						end: moment($('#createEventEndTime').val(),'DD/MM/YYYY HH:mm',true),
                    description:desc,
                    color:color,
                    textColor:textColor,
        						allDay: allDay
        					},
        					true // make the event "stick"
        				  );
                }
          			calendar.fullCalendar('unselect');
                calendar.fullCalendar('rerenderEvents');

                }
              });

            $('#createEventModal').on('hide.bs.modal', function() {
                $('#createEventError').html(''); //Default View
                $(':input', '#createEventForm')
                    .not(':button, :submit, :reset, :hidden')
                    .val('')
                    .removeAttr('checked')
                    .removeAttr('selected');
                $('#createEventColor').val('#000000');
                //trying to unset things
                $.each($("input[name='eventClickRecurring']"), function() {
                    $(this).prop('checked', false);
                });
                id = undefined;
                title = undefined;

            });
        },
        /*
        	editable: true allow user to edit events.
        */
        editable: true,
        /*
			events is the main option for calendar.
			for demo we have added predefined events in json object.
      Date & Time format: DD/MM/YYYYTHH:mm | DD/MM/YYYY HH:mm
      add ajax/get from db here or whatever
		*/
        eventClick: function onEventClick(event, jsEvent, view) {

            //run this code on click also
            $('#eventClickError').html('');

            $('#eventClickModal').on('show.bs.modal', function() {
                $('#eventClickStartTime').val(moment(event.start).format('DD/MM/YYYY HH:mm'));
                $('#eventClickEndTime').val(moment(event.end).format('DD/MM/YYYY HH:mm'));
            });

            $('#eventClickModal').modal('show');

            if (event.color)
                $('.modal-header').css({
                    'background-color': event.color,
                    'color': '#fff'
                });
            else
                $('.modal-header').css({
                    'background-color': '#fff',
                    'color': '#000'
                });

            console.log("Before everything:", event); //proper object here

            $('#eventClickLabel').html(event.title);

            if (event.description) {
                $('#eventClickInfo').val(event.description);
            }
            $('#eventClickInfo').on('change', function() {
                event.description = $('#eventClickInfo').val();
            });

            $('#eventClickStartTime').datetimepicker({
                format: 'DD/MM/YYYY HH:mm',
                useCurrent: false,
                sideBySide: true,
            });

            $('#eventClickEndTime').datetimepicker({
                format: 'DD/MM/YYYY HH:mm',
                useCurrent: false,
                sideBySide: true,
            });

            $('#eventClickStartTime').on('keyup', function() {
                event.start = moment($('#eventClickStartTime').val(), "DD/MM/YYYY HH:mm", true);
            });


            $('#eventClickEndTime').on('keyup', function() {
                event.end = moment($('#eventClickEndTime').val(), "DD/MM/YYYY HH:mm", true);
            });

            if (event.allDay == true) {
                $('#eventClickAllDay').prop('checked', true);
            } else {
                $('#eventClickAllDay').prop('checked', false);
            }

            $('#eventClickAllDay').click(function() {
                if ($("#eventClickAllDay").is(':checked'))
                    event.allDay = true;
                else
                    event.allDay = false;
            });

            // ColorPicker BFH: http://bootstrapformhelpers.com/colorpicker/#jquery-plugins
            //Till then:
            if (event.color)
                $('#eventClickColor').val(event.color);
            else
                $('#eventClickColor').val('#ffffff');

            console.log("Color:", $('#eventClickColor').val());

            $('#eventClickColor').change(function() { //Works Brilliantly!!
                event.color = $('#eventClickColor').val();
                event.textColor = invertColor($('#eventClickColor').val());
            });

            if (event.dow) { //If repeated events exist then check checkbox with the corresponding day
                $.each($("input[name='eventClickRecurring']"), function() {
                    if ($.inArray(parseInt($(this).val()), event.dow) + 1) {
                        console.log(this);
                        console.log($.inArray(parseInt($(this).val()), event.dow));
                        $(this).prop('checked', true);
                    }
                });
            } else {
                $.each($("input[name='eventClickRecurring']"), function() {
                    $(this).prop('checked', false);
                });
            }

            $('#eventClickUpdate').click(function(e) {
                var dow = [];
                $.each($("input[name='eventClickRecurring']:checked"), function() {
                    dow.push(parseInt($(this).val()));
                });

                console.log(dow);
                event.dow = dow; //I think only server side can solve this
                // e.preventDefault();
                console.log("Just Before Update:\n", event);

                if ((moment(event.end) - moment(event.start)) > 0) {
                    calendar.fullCalendar('updateEvent', event); //TODO:Not happening with time--to be tested further
                } else {
                    $('#eventClickError').html('Invalid Dates');
                }
                //TODO: If updating event, new same event should not be added - DONE
                //RUDRESH TODO: Refresh Page after this save event function
                // calendar.fullCalendar('rerenderEvents');
                calendar.fullCalendar('unselect');

            }); //end of button function

            $('#eventClickRemove').click(function() {
                calendar.fullCalendar('removeEvents', event.id);
                calendar.fullCalendar('unselect');
            });
        }, //eventClick ends

        eventRender: function(event, element) {
            if (event.start) {
                if (event.description)
                    $(element).popover({
                        title: event.title,
                        html: true,
                        content: "<b>Start:</b>" + moment(event.start).format('MMM Do, YYYY HH:mm') + "<br><b>End:</b>" + moment(event.end).format('MMM Do, YYYY HH:mm') + "<br>" + event.description + "<br><small>Click to Edit</small>",
                        trigger: "hover",
                        placement: "right",
                        container: "body"
                    });
                else
                    $(element).popover({
                        title: event.title,
                        html: true,
                        content: "<b>Start:</b>" + moment(event.start).format('MMM Do, YYYY HH:mm') + "<br><b>End:</b>" + moment(event.end).format('MMM Do, YYYY HH:mm') + "<br><small>Click to Edit</small>",
                        trigger: "hover",
                        placement: "right",
                        container: "body"
                    });
            } else {
                if (event.description)
                    $(element).popover({
                        title: event.title,
                        html: true,
                        content: event.description + "<br><small>Click to Edit</small>",
                        trigger: "hover",
                        placement: "right",
                        container: "body"
                    });
                else
                    $(element).popover({
                        title: event.title,
                        html: true,
                        content: "<small>Click to Edit</small>",
                        trigger: "hover",
                        placement: "right",
                        container: "body"
                    });
            }

        },
        eventLimit: true

    });


});

