//Dark mode Toggle
$("#darkswitch").change(function () {
    if ($('#darkswitch').is(':checked')) {
        $("#calbg").css({
            'background': 'url(img/calendar4.jpg) no-repeat center center scroll',
            '-webkit-background-size': 'contain',
            '-moz-background-size': 'contain',
            '-o-background-size': 'contain',
            'background-size': 'contain',
            'background-color': 'rgb(54,52,66)'
        });
        $('#calendar').css('color', '#ffffff');
        $('.eventslabel').css('color', '#ffffff');
        $('#calendarHelp').css({'color': '#ffffff', 'background-color': '#000000'});
        $("#hideFullCalendar").css({'color': '#ffffff'});
    } else {
        $("#calbg").css({
            'background': 'url(img/calendar5.jpg) no-repeat center center scroll',
            '-webkit-background-size': 'cover',
            '-moz-background-size': 'cover',
            '-o-background-size': 'cover',
            'background-size': 'cover'
        });
        $('#calendar').css('color', '#000000');
        $('.eventslabel').css('color', '#000000');
        $('#calendarHelp').css({'color': '#000000', 'background-color': 'transparent'});
        $("#hideFullCalendar").css({'color': '#000000'});
    }
});

var eventsData, oldStartTime, table,
dataTablePages = 8,innitialRender=0;
$(document).ready(function () {
    /******Ajax Calls******/
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
            if(val.allDay === "false") val.allDay = false;
            else val.allDay = true;
        });
        eventsData = data;
    }).fail(function (err) {
        //console.log(err);
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
            /* Click delays */
            longPressDelay:1,
            eventLongPressDelay:1,
            selectLongPressDelay:1,
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
                    'background-color': '#ffffff',
                    'color': '#000000'
                });
                $('#createEventModal').modal();

                $('#createEventStartTime').val(moment(start).add(9, 'h').format('DD/MM/YYYY HH:mm', true));
                oldStartTime = $("#createEventStartTime").val();
                $('#createEventEndTime').val(moment(start).add(11, 'h').format('DD/MM/YYYY HH:mm', true));
                setInterval(checkStartEventTimeUpdate, 1000);
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


                /*
                 var color = '#3a87ad',
                 textColor = '#ffffff';
                 $('#createEventColor').val(color);
                 $('#createEventColor').change(function () { //Works Brilliantly!!
                 //console.log("Changed Color:", $('#createEventColor').val());
                 color = $('#createEventColor').val();
                 textColor = invertColor($('#createEventColor').val());
                 });*/
                allDay=false;
                if($('#createEventAllDay').is(':checked'))
                    allDay = true;

                $('#createEventModal').on('shown.bs.modal', function () {
                    $('#createEventTitle').focus();
                });

                $('#createEventButton').click(function (e) {
                    e.stopPropagation();
                    var title = $('#createEventTitle').val();
                    var desc = '';
                    if ($('#createEventInfo').val()) {
                        desc = $('#createEventInfo').val();
                    }

                    // var dow = [];
                    // $.each($("input[name='createEventRecurring']:checked"), function () {
                    //     dow.push(parseInt($(this).val()));
                    // });

                    var color = $("input[name='createEventColor']:checked").val();

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
                            if (id === temp_id) {
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
                                id: id,
                                title: title,
                                start: moment($('#createEventStartTime').val(), 'DD/MM/YYYY HH:mm', true).unix() * 1000,
                                end: moment($('#createEventEndTime').val(), 'DD/MM/YYYY HH:mm', true).unix() * 1000,
                                description: desc,
                                color: color,
                                textColor: '#FFFFFF',
                                allDay: allDay
                            };

                            console.log(event);

                            var url = noTrailingSlash(window.location.href) + '/user/events';
                            $.ajax({
                                url: url,
                                method: "POST",
                                data: event,
                                success: function (data) {
                                    console.log(data);
                                    eventsData = data;
                                    event.start = moment(parseInt(event.start)).local();
                                    event.end = moment(parseInt(event.end)).local();
                                    //console.log(event);
                                    calendar.fullCalendar('renderEvent',
                                        event,
                                        true // make the event "stick"
                                    );
                                    $('#createEventModal').modal('toggle');
                                    toastr.success("Event Created Successfully");
                                    updateMiniTable();
                                },
                                error: function (err) {
                                    // console.log(err);
                                    toastr.error("Oops! Something Went Wrong", "Please Try Again");
                                }
                            });

                        }
                    }
                    $('#createEventButton').off('click');//This is what stops multiple events to stick
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
                    /*$.each($("input[name='eventClickRecurring']"), function () {
                     $(this).prop('checked', false);
                     });*/
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
                    $('#eventClickStartTime').val(moment(event.start).format('DD/MM/YYYY HH:mm', true));
                    $('#eventClickEndTime').val(moment(event.start).format('DD/MM/YYYY HH:mm', true));
                });

                $('#eventClickModal').modal('show');

                // //console.log("Event Id", event.id);

                if (event.color) {
                    $('.event-header').css({
                        'background-color': event.color,
                        'color': '#ffffff'
                    });
                } else {
                    $('.event-header').css({
                        'background-color': '#fff',
                        'color': '#000000'
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


                $('input[name="eventClickColor"][value="' + event.color + '"]').prop('checked', true);


                /*if (event.dow) { //If repeated events exist then check checkbox with the corresponding day
                 $.each($("input[name='eventClickRecurring']"), function () {
                 if ($.inArray(parseInt($(this).val()), event.dow) + 1) {
                 //console.log(this);
                 //console.log($.inArray(parseInt($(this).val()), event.dow));
                 $(this).prop('checked', true);
                 }
                 });
                 } else {
                 $.each($("input[name='eventClickRecurring']"), function () {
                 $(this).prop('checked', false);
                 });
                 }*/

                $('#eventClickUpdate').click(function () {

                    // var dow = [];
                    // $.each($("input[name='eventClickRecurring']:checked"), function () {
                    //     dow.push(parseInt($(this).val()));
                    // });

                    var data = {
                        //Compulsory Id
                        id: event.id,
                        title: event.title,
                        start: moment($('#eventClickStartTime').val(), 'DD/MM/YYYY HH:mm', true).unix() * 1000,
                        end: moment($('#eventClickEndTime').val(), 'DD/MM/YYYY HH:mm', true).unix() * 1000,
                        description: $('#eventClickInfo').val(),
                        color: $("input[name='eventClickColor']:checked").val(),
                        textColor: '#FFFFFF',
                        allDay: event.allDay
                    };

                    if (data.end - data.start > 0) {
                        //console.log("Sending AJAX req for Put\n");
                        var url = noTrailingSlash(window.location.href) + '/user/events';
                        $.ajax({
                            method: "PUT",
                            url: url,
                            data: data
                        }).done(function (response) {
                            //console.log(response);
                            event.start = moment($('#eventClickStartTime').val(), 'DD/MM/YYYY HH:mm', true);
                            event.end = moment($('#eventClickEndTime').val(), 'DD/MM/YYYY HH:mm', true);
                            event.description = data.description;
                            event.color = data.color;
                            event.textColor = data.textColor;
                            calendar.fullCalendar('updateEvent', event);
                            toastr.success("Event Updated Successfully");
                            updateMiniTable();

                        }).fail(function (err) {
                            toastr.error("Oops! Something Went Wrong", "Please Try Again");
                            //console.log(err);
                        });
                    } else {
                        $('#eventClickError').html('Invalid Dates');
                    }

                    $('#eventClickUpdate').off('click');

                }); //end of button function

                $('#eventClickRemove').click(function () {

                    var data = {
                        id: event.id
                    };

                    var url = noTrailingSlash(window.location.href) + '/user/events';
                    $.ajax({
                        method: "DELETE",
                        data: data,
                        url: url
                    }).done(function (data) {
                        //console.log(data);
                        calendar.fullCalendar('removeEvents', event.id);
                        toastr.warning("Event Removed Successfully");

                        scrollToNote();
                        updateMiniTable();

                    }).fail(function (err) {
                        toastr.error("Oops! Something Went Wrong", "Please Try Again");
                        //console.log(err);
                    });
                    $('#eventClickRemove').off('click');
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

        if(!innitialRender){
            renderMiniTable();
            console.log("Called here");
            innitialRender=!innitialRender;
        }


        function renderMiniTable() {

            //$("#events").hide();
            var miniTableEvents = [], srno = 1;

            var miniEventHeader = {
                "SrNo": "<i class='fa fa-expand' aria-hidden='true' id='swapTable'></i>",
                "title": "Event",
                "start": "Start",
                "end": "End",
                "duration": "Duration",
                "description": "Description",
                "hiddenStartEvent": 0
            };


            miniTableEvents.push(miniEventHeader);

            for (var miniCtr = 0; miniCtr < calendar.fullCalendar('clientEvents').length; miniCtr++) {
                var entry = new Date(calendar.fullCalendar('clientEvents')[miniCtr].start);
                var today = new Date().getTime();
                entry = entry.getTime();

                //console.log(calendar.fullCalendar('clientEvents'));

                function pad(d) {
                    return (d < 10) ? '0' + d.toString() : d.toString();
                }

                if (entry >= today) { //Show only future events
                    var title = calendar.fullCalendar('clientEvents')[miniCtr].title;
                    var duration = moment(calendar.fullCalendar('clientEvents')[miniCtr].end - calendar.fullCalendar('clientEvents')[miniCtr].start).valueOf();
                    //console.log("Duration",duration);
                    var durationHours = Math.floor(duration / 3600000);
                    var durationDays = Math.floor(durationHours / 24);
                    durationHours = durationHours - durationDays * 24;
                    var durationMinutes = pad((duration % 3600000).toString().slice(0, 2));
                    if (durationDays !== 0) {
                        duration = (durationDays) + ' day(s) ' + pad(durationHours) + ' hr(s) ' + durationMinutes + " min(s)";
                    } else {
                        duration = durationHours + ' hr(s) ' + durationMinutes + " min(s)";
                    }
                    //console.log("Diff Duration",duration);
                    var startEvent = moment(calendar.fullCalendar('clientEvents')[miniCtr].start).format('DD/MM/YYYY', true);
                    var endEvent = moment(calendar.fullCalendar('clientEvents')[miniCtr].end).format('DD/MM/YYYY', true);
                    var description = calendar.fullCalendar('clientEvents')[miniCtr].description;
                    var hiddenStartEvent = moment(calendar.fullCalendar('clientEvents')[miniCtr].start).format('YYYYMMDD', true);
                    // //console.log(startEvent+" "+hiddenStartEvent+" "+duration);

                    var miniEvent = {
                        "SrNo": srno,
                        "title": title,
                        "start": startEvent,
                        "end": endEvent,
                        "duration": duration,
                        "description": description,
                        "hiddenStartEvent": hiddenStartEvent
                    };
                    miniTableEvents.push(miniEvent);
                    srno++;

                }
            }
            
            miniTableEvents.sort(function (a,b) {
                return (a.hiddenStartEvent-b.hiddenStartEvent);
            });
            for(miniCtr=1;miniCtr<miniTableEvents.length;miniCtr++){
                miniTableEvents[miniCtr].SrNo=miniCtr;
            }
            table = $('#miniTable').DataTable( {
                responsive: false,
                "pageLength": dataTablePages,
                "data": miniTableEvents,
                "info": false,
                "paging": true,
                "searching": false,
                "scrollX": false,
                "bSort": false,
               // "order": [[6, "asc"]],
                "columns": [
                    {"data": "SrNo"},//,"title":"<i class='fa fa-expand' aria-hidden='true' id='swapTable'></i>","width": "3%","orderable":false},
                    {"data": "title"},//,"title":"Subject","width": "16%","orderable":false},
                    {"data": "start"},//"title":"Start","width": "15%","orderable":false},
                    {"data": "end"},//"title":"End","width": "15%","orderable":false},
                    {"data": "duration"},//"title":"Duration","width": "25%","orderable":false},
                    {"data": "description"},//"title":"Description","width": "39%","orderable":false},
                    {"data": "hiddenStartEvent", "visible": false}
                ],
                // "columnDefs": [
                //     {
                //         "orderData": 6, "targets": [2, 3]
                //     }
                // ],
                "destroy": true
            });

            init();
        }

        $("#createEventColorRedBox").click(function () {
            $("#createEventColorRed").prop("checked", true);
            $(this).addClass("borderColourPick");
            $("#createEventColorBlueBox").removeClass("borderColourPick");
            $("#createEventColorYellowBox").removeClass("borderColourPick");
            $("#createEventColorPurpleBox").removeClass("borderColourPick");
            $("#createEventColorGreenBox").removeClass("borderColourPick");

        });

        $("#createEventColorGreenBox").click(function () {
            $("#createEventColorGreen").prop("checked", true);
            $(this).addClass("borderColourPick");
            $("#createEventColorBlueBox").removeClass("borderColourPick");
            $("#createEventColorYellowBox").removeClass("borderColourPick");
            $("#createEventColorPurpleBox").removeClass("borderColourPick");
            $("#createEventColorRedBox").removeClass("borderColourPick");
        });

        $("#createEventColorPurpleBox").click(function () {
            $("#createEventColorPurple").prop("checked", true);
            $(this).addClass("borderColourPick");
            $("#createEventColorBlueBox").removeClass("borderColourPick");
            $("#createEventColorYellowBox").removeClass("borderColourPick");
            $("#createEventColorRedBox").removeClass("borderColourPick");
            $("#createEventColorGreenBox").removeClass("borderColourPick");
        });

        $("#createEventColorBlueBox").click(function () {
            $("#createEventColorBlue").prop("checked", true);
            $(this).addClass("borderColourPick");
            $("#createEventColorRedBox").removeClass("borderColourPick");
            $("#createEventColorYellowBox").removeClass("borderColourPick");
            $("#createEventColorPurpleBox").removeClass("borderColourPick");
            $("#createEventColorGreenBox").removeClass("borderColourPick");
        });

        $("#createEventColorYellowBox").click(function () {
            $("#createEventColorYellow").prop("checked", true);
            $(this).addClass("borderColourPick");
            $("#createEventColorBlueBox").removeClass("borderColourPick");
            $("#createEventColorRedBox").removeClass("borderColourPick");
            $("#createEventColorPurpleBox").removeClass("borderColourPick");
            $("#createEventColorGreenBox").removeClass("borderColourPick");
        });





        function similarity(s1, s2) {
            var longer = s1;
            var shorter = s2;
            if (s1.length < s2.length) {
                longer = s2;
                shorter = s1;
            }
            var longerLength = longer.length;
            if (longerLength === 0) {
                return 1.0;
            }
            return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
        }

        function editDistance(s1, s2) {
            s1 = s1.toLowerCase();
            s2 = s2.toLowerCase();

            var costs =[];
            for (var i = 0; i <= s1.length; i++) {
                var lastValue = i;
                for (var j = 0; j <= s2.length; j++) {
                    if (i === 0)
                        costs[j] = j;
                    else {
                        if (j > 0) {
                            var newValue = costs[j - 1];
                            if (s1.charAt(i - 1) !== s2.charAt(j - 1))
                                newValue = Math.min(Math.min(newValue, lastValue),
                                        costs[j]) + 1;
                            costs[j - 1] = lastValue;
                            lastValue = newValue;
                        }
                    }
                }
                if (i > 0)
                    costs[s2.length] = lastValue;
            }
            return costs[s2.length];
        }


        function checkStartEventTimeUpdate() {
            if (oldStartTime != $("#createEventStartTime").val()) {
                oldStartTime = $("#createEventStartTime").val();
                var updatedEndTime = moment(oldStartTime, 'DD/MM/YYYY HH:mm', true).add(2, 'h').format('DD/MM/YYYY HH:mm', true);
                $('#createEventEndTime').val(updatedEndTime);
            }
        }


        // $("#swapTable").click(function () {
        //     swapsTable();
        // }
        // );x
        function swapsTable() {
            {
                //console.log(table);
                //alert("Clicked swap");
                $('#miniTable td:nth-child(4),#miniTable th:nth-child(4)').show();
                $('#miniTable td:nth-child(5),#miniTable th:nth-child(5)').show();
                $("#miniTable").each(function () {
                    var $this = $(this);
                    var newrows = [];
                    $this.find("tr").each(function () {
                        var i = 0;
                        $(this).find("td").each(function () {
                            i++;
                            if (newrows[i] === undefined) {
                                newrows[i] = $("<tr></tr>");
                            }
                            newrows[i].append($(this));
                        });
                    });
                    $this.find("tr").remove();
                    $.each(newrows, function () {
                        $this.append(this);
                    });
                });
                swapped = !swapped;
                init();

            }
            if(swapped){
                $("#miniTable").addClass("centerContent");
            }
        }


        $("#showFullCalendar").click(function () {
            showFullCal=true;
            $("#showFullCalendar").hide();
            $("#hideFullCalendar").show();
            $("#events").show();
            scrollToEvent();
        });

        $("#hideFullCalendar").click(function () {
            showFullCal=false;
            $("#showFullCalendar").show();
            $("#hideFullCalendar").hide();
            scrollToNote();
        });

        /* $("#prevMiniEventPage").click(function () {

         if(swapped){
         //alert("Swapped and going to previous page");
         $("#swapTable").click();
         $(".previous").click();
         // $("#swapTable").click();
         //  init();
         }else if(!swapped){

         $(".previous").click();
         init();
         }

         });

         $("#nextMiniEventPage").click(function () {
         ////alert("Clicked");
         //
         if(swapped){
         //alert("Swapped and going to next page");
         $("#swapTable").click();
         //renderMiniTable();
         $(".next").click();
         //swapped=!swapped;
         //$("#swapTable").click();
         //$("#swapTable").click();

         }else if(!swapped){

         $(".next").click();
         init();
         }
         });*/


        $(document).keydown(function (e) {
            if (e.keyCode === 13) {
                var ch1 = $('#createEventModal').is(':visible');
                if (ch1) {
                    $("#createEventButton").click();
                }
            }
        });

        $('#setPageSlider').slider().on('slideStop', function(ev){
            $("#showPageSizeSlider").click();
            dataTablePages =$('#setPageSlider').bootstrapSlider('getValue')+1;
            updateMiniTable();
              //$("#miniTableContainer").html("<table id='miniTable' class='miniTableClass'> </table>");
            // if(!swapped){
            //     $("#miniTable").DataTable().destroy();
            //    // $("#miniTable").empty();
            //     //console.log("Called here!");
            //     renderMiniTable();
            // }else{
            //     console.log("Here in second half of slider");
            //     //$("#swapTable").click();
            //     //$("#miniTable").dataTable().destroy();
            //
            //     // $("#miniTable").DataTable().destroy();
            //     // $("#miniTable").empty();
            //     // renderMiniTable();
            // }
            //
            //    // if(swapped){
            //    //     swapped=!swapped;
            //    //     swapsTable();
            //    // }
            //    // $("#miniTableContainer").html("<table id='miniTable' class='miniTableClass'>"+$("#miniTable").html()+" </table>");
        });

        function updateMiniTable() {
            $("#miniTableContainer").empty();
            $("#miniTableContainer").html("<table id='miniTable' class='miniTableClass'></table>");
            renderMiniTable();
            if(swapped){
                swapped=!swapped;
                swapsTable();
            }
        }

            $("#showPageSizeSlider").hover(function () {
                $(this).click();
            },function () {
            });

        $(".sliderContainer").hover(function () {
        },function () {
            $("#showPageSizeSlider").click();
        });

        $('#miniTableContainer').on('click','td',function () {
            //alert("inside");
           // $("#miniTable").dataTable().destroy();
            var content = $(this).html();
            var col = $(this).parent().children().index($(this));
            var row = $(this).parent().parent().children().index($(this).parent());
            var clickedSubject, titleToOpen, sim;
           // alert("Clicked: "+row+" "+col+" "+content);
            if(col==0 && row==0){
                swapsTable();
            }
            else {
                if (!swapped) {
                    if (col === 1) {
                        clickedSubject = content;
                        //alert(clickedSubject);
                    }
                } else if (swapped) {
                    if (row === 1) {
                        clickedSubject = content;
                        //alert(clickedSubject);
                    }
                }

                if (notesData.length > 0) {
                    sim = similarity(clickedSubject, notesData[0].subject);
                    titleToOpen = notesData[0].subject;
                }
                for (var subjectsCtr = 0; subjectsCtr < notesData.length; subjectsCtr++) {
                    //console.log("Current similarity is:"+similarity(data.title,notesData[subjectsCtr].subject)+" "+notesData[subjectsCtr].subject);
                    if (similarity(clickedSubject, notesData[subjectsCtr].subject) > sim) {
                        sim = similarity(clickedSubject, notesData[subjectsCtr].subject);
                        titleToOpen = notesData[subjectsCtr].subject;
                    }
                }

                if (sim > .6) {

                    noteTitle = titleToOpen;
                    index = getOrderNo(noteTitle, notesData);
                    $("#noteModalTitle").html(noteTitle);
                    i = 1;
                    modalImg.src = getNoteAddress(noteTitle, i, notesData);
                    images = getNotesLength(noteTitle, notesData);
                    $("#imgno").html("Pg." + 1);
                    $("#noteImage").modal("show");

                }
            }

        });


    });
});
