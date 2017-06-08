$('#calendar').css('font-size', '20px');
$('#calendar').css('color', 'black');

//Dark mode Toggle
$("#darkswitch").change(function () {

    var on = $('#darkswitch').prop('checked');
    if (on) {
        $("#calbg").css({
            'background': 'url(img/calendar4.jpg) no-repeat center center fixed',
            '-webkit-background-size': 'cover',
            '-moz-background-size': 'cover',
            '-o-background-size': 'cover',
            'background-size': 'cover'
        });
        $('#calendar').css('color', 'white');
        $('#eventtitle').css('color', 'white');

        $('#calendarHelp').css({'color': '#fff', 'background-color': '#000'});
    } else {
        $("#calbg").css({
            'background': 'url(img/calendar5.jpg) no-repeat center center fixed',
            '-webkit-background-size': 'cover',
            '-moz-background-size': 'cover',
            '-o-background-size': 'cover',
            'background-size': 'cover'
        });
        $('#calendar').css('color', 'black');
        $('#eventtitle').css('color', 'black');
        $('#calendarHelp').css({'color': '#000', 'background-color': 'transparent'});
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

$(document).ready(function () {
    /******Ajax Calls******/
    var eventsData;
    var url = noTrailingSlash(window.location.href) + '/user/events';
    var timer = $.Deferred();
    setTimeout(timer.resolve, 50);
    var ajaxEventsCall = $.ajax({
        url: url,
        method: "GET"
    }).done(function (data) {
        data.forEach(function (val) {
            val.start = moment(parseInt(val.start)).local();
            val.end = moment(parseInt(val.end)).local();
            if (val.allDay === "false") val.allDay = false;
            else val.allDay = true;
        });
        eventsData = data;
    }).fail(function (err) {
        console.log(err);
    });

    $('#calendarHelp').tooltip({
        trigger: 'hover',
        title: 'Click/Drag across day(s) to Create an Event!'
    });
    //when timer is up and data is parsed
    $.when(timer, ajaxEventsCall).done(function () {
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
            events: eventsData
            ,
            /*
             when user select timeslot this option code will execute.
             */
            select: function (start, end, allDay) {

                $('.event-header').css({
                    'background-color': '#fff',
                    'color': '#000'
                });
                $('#createEventModal').modal();

                $('#createEventStartTime').val(moment(start).format('DD/MM/YYYY HH:mm', true));
                $('#createEventEndTime').val(moment(end).format('DD/MM/YYYY HH:mm', true));

                $('#createEventStartTime').datetimepicker({
                    format: 'DD/MM/YYYY HH:mm',
                    useCurrent: false,
                    sideBySide: true
                });

                $('#createEventEndTime').datetimepicker({
                    format: 'DD/MM/YYYY HH:mm',
                    useCurrent: false,
                    sideBySide: true
                });

                var color = '#3a87ad',
                    textColor = '#ffffff';
                $('#createEventColor').val(color);
                $('#createEventColor').change(function () { //Works Brilliantly!!
                    console.log("Changed Color:", $('#createEventColor').val());
                    color = $('#createEventColor').val();
                    textColor = invertColor($('#createEventColor').val());
                });

                var allDay = false;
                if ($('#createEventAllDay').attr('checked'))
                    allDay = true;

                $('#createEventModal').on('shown.bs.modal', function () {
                    $('#createEventTitle').focus();
                });

                $('#createEventButton').click(function (e) {
                    var title = $('#createEventTitle').val();
                    var desc = '';
                    if ($('#createEventInfo').val()) {
                        desc = $('#createEventInfo').val();
                    }

                    // var dow = [];
                    // $.each($("input[name='createEventRecurring']:checked"), function () {
                    //     dow.push(parseInt($(this).val()));
                    // });

                    if ($('#createEventStartTime').val() == '' || $('#createEventEndTime').val() == '') {
                        $('#createEventError').html('Start and End is Required');
                    } else if ($('#createEventTitle').val() == '') {
                        $('#createEventError').html('Title is Required');
                    } else {

                        $('#createEventError').html('');


                        //make better id by server
                        function getId() {
                            return Math.floor(Math.random() * 999);
                        }
                        var id = getId(), flag = 0;

                        for (var i = 0; i < calendar.fullCalendar('clientEvents').length; i++) {
                            var temp_id = calendar.fullCalendar('clientEvents')[i].id;
                            if (id == temp_id) {
                                id = getId();
                                i = 0;
                                flag = 1;
                            }
                            else {
                                flag = 0;
                            }
                        }
                        //check if id exists in the events before render

                        if (!flag) {//if id is unique only then
                            var event = {
                                //Compulsory Id
                                id: id,
                                title: title,
                                start: moment($('#createEventStartTime').val(), 'DD/MM/YYYY HH:mm', true).unix() * 1000,
                                end: moment($('#createEventEndTime').val(), 'DD/MM/YYYY HH:mm', true).unix() * 1000,
                                description: desc,
                                color: color,
                                textColor: textColor,
                                allDay: allDay
                            };

                            var url = noTrailingSlash(window.location.href) + '/user/events';
                            $.ajax({
                                url: url,
                                method: "POST",
                                data: event,
                                success: function (data) {
                                    console.log(data);
                                    eventsData = data;
                                    // location.reload();
                                    event.start=moment(parseInt(event.start)).local();
                                    event.end=moment(parseInt(event.end)).local();
                                    console.log(event);
                                    calendar.fullCalendar('renderEvent',
                                        event,
                                        true // make the event "stick"
                                    );
                                    toastr.success("Event Created Successfully");
                                },
                                error: function (err) {
                                    console.log(err);
                                    toastr.error("Oops! Something Went Wrong","Please Try Again");
                                }
                            });

                        }
                        // location.reload();
                    }
                    $(this).off('click');//This is what stops multiple events to stick
                });

                $('#createEventModal').on('hide.bs.modal', function () {
                    $('#createEventError').html(''); //Default View
                    $(':input', '#createEventForm')
                        .not(':button, :submit, :reset, :hidden')
                        .val('')
                        .removeAttr('checked')
                        .removeAttr('selected');
                    $('#createEventColor').val('#000000');
                    //trying to unset things
                    $.each($("input[name='eventClickRecurring']"), function () {
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

                $('#eventClickModal').on('show.bs.modal', function () {
                    $('#eventClickStartTime').val(moment(event.start).format('DD/MM/YYYY HH:mm',true));
                    $('#eventClickEndTime').val(moment(event.end).format('DD/MM/YYYY HH:mm',true));
                });

                $('#eventClickModal').modal('show');

                console.log("Event Id", event.id);

                if (event.color) {
                    $('.event-header').css({
                        'background-color': event.color,
                        'color': '#fff'
                    });
                } else {
                    $('.event-header').css({
                        'background-color': '#fff',
                        'color': '#000'
                    });
                }

                $('#eventClickLabel').html(event.title);

                if (event.description) {
                    $('#eventClickInfo').val(event.description);
                }

                $('#eventClickStartTime').datetimepicker({
                    format: 'DD/MM/YYYY HH:mm',
                    useCurrent: false,
                    sideBySide: true
                });

                $('#eventClickEndTime').datetimepicker({
                    format: 'DD/MM/YYYY HH:mm',
                    useCurrent: false,
                    sideBySide: true
                });

                if (event.allDay == true) {
                    $('#eventClickAllDay').prop('checked', true);
                } else {
                    $('#eventClickAllDay').prop('checked', false);
                }

                $('#eventClickAllDay').click(function () {
                    if ($("#eventClickAllDay").is(':checked'))
                        event.allDay = true;
                    else
                        event.allDay = false;
                });

                if (event.color)
                    $('#eventClickColor').val(event.color);
                else
                    $('#eventClickColor').val('#ffffff');

                if (event.dow) { //If repeated events exist then check checkbox with the corresponding day
                    $.each($("input[name='eventClickRecurring']"), function () {
                        if ($.inArray(parseInt($(this).val()), event.dow) + 1) {
                            console.log(this);
                            console.log($.inArray(parseInt($(this).val()), event.dow));
                            $(this).prop('checked', true);
                        }
                    });
                } else {
                    $.each($("input[name='eventClickRecurring']"), function () {
                        $(this).prop('checked', false);
                    });
                }

                $('#eventClickUpdate').click(function() {

                    // var dow = [];
                    // $.each($("input[name='eventClickRecurring']:checked"), function () {
                    //     dow.push(parseInt($(this).val()));
                    // });

                    var invertedColor;
                    if(event.color==$('#eventClickColor').val()){
                        invertedColor=event.textColor;
                    }else{
                        invertedColor=invertColor($('#eventClickColor').val());
                    }

                    var data = {
                        //Compulsory Id
                        id: event.id,
                        title: event.title,
                        start: moment($('#eventClickStartTime').val(), 'DD/MM/YYYY HH:mm', true).unix() * 1000,
                        end: moment($('#eventClickEndTime').val(), 'DD/MM/YYYY HH:mm', true).unix() * 1000,
                        description: $('#eventClickInfo').val(),
                        color: $('#eventClickColor').val(),
                        textColor: invertedColor,
                        allDay: event.allDay
                    };

                    if (data.end - data.start > 0) {
                        console.log("Sending AJAX req for Put\n");
                        var url = noTrailingSlash(window.location.href) + '/user/events';
                        $.ajax({
                            method: "PUT",
                            url: url,
                            data: data
                        }).done(function (response) {
                            console.log(response);
                            event.start=moment($('#eventClickStartTime').val(), 'DD/MM/YYYY HH:mm', true);
                            event.end=moment($('#eventClickEndTime').val(), 'DD/MM/YYYY HH:mm', true);
                            event.description=data.description;
                            event.color=data.color;
                            event.textColor=data.textColor;
                            calendar.fullCalendar('updateEvent', event);
                            toastr.success("Event Updated Successfully");
                            // location.reload();
                        }).fail(function (err) {
                            toastr.error("Oops! Something Went Wrong","Please Try Again");
                            console.log(err);
                        });
                    } else {
                        $('#eventClickError').html('Invalid Dates');
                    }

                    $(this).off('click');

                }); //end of button function

                $('#eventClickRemove').click(function () {

                    var data={
                        id:event.id
                    };

                    var url = noTrailingSlash(window.location.href) + '/user/events';
                    $.ajax({
                        method: "DELETE",
                        data: data,
                        url: url
                    }).done(function (data) {
                        console.log(data);
                        calendar.fullCalendar('removeEvents', event.id);
                        toastr.success("Event Removed Successfully");
                        // location.reload();//need a better workaround than this
                    }).fail(function (err) {
                        toastr.error("Oops! Something Went Wrong","Please Try Again");
                        console.log(err);
                    });
                    $(this).off('click');
                });
            }, //eventClick ends
            eventRender: function (event, element) {
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
});
