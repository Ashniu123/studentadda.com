
$('#calendar').css('font-size', '20px');
$('#calendar').css('color', 'black');

//Dark mode Toggle

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
