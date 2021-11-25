/*
<summary>
    This function verifies if the date is higher than today
    and if the hour is higher than the current hour.

    If the date is higher than today and the hour is higher than the current hour,
    the function returns true.

    <param name="date">The date to be verified</param>
</summary>
*/

function shake(element){
    element.effect("shake", {times:2}, 750);
}

function isDateHigherThanToday(date) {
    var today = new Date();
    var dateToCompare = new Date(date);
    var hours = getHourValues("hours");
    var minutes = getHourValues("minutes");

    if (hours == null || minutes == null) {
        return false;
    } else {

        if (hours.length == 1) {
            hours = "0" + hours;
        }

        if (minutes.length == 1) {
            minutes = "0" + minutes;
        }

        if (hours.length > 2 || minutes.length > 2) {
            return false;
        } else {
            if (hours > 23 || minutes > 59 || hours < 0 || minutes < 0 || minutes != 0) {
                return false;
            } else {
                //verify if the hours are out of range between the 08:00 and 23:00
                if (parseInt(hours) < 8 || parseInt(hours) > 23) {
                    return false;
                } else {
                    dateToCompare.setHours(hours);
                    dateToCompare.setMinutes(minutes);
                }
            }
        }

        dateToCompare.setDate(dateToCompare.getDate() + 1);
        if (dateToCompare >= today) {
            return true;
        } else {
            return false;
        }
    }
}

$(document).ready(function () {
    $("#form_alert").hide();
    var actual_hour = parseInt(new Date().getHours()) + 1 + ":00";
    $("#start_booking").val(actual_hour);
});

/*
<summary>
    This function return the hour and the minute of the date filled in the input

    <param name="value">A string that defines witch value do you want to get (Minutes / Hours)</param>
</summary>
*/
function getHourValues(value) {
    var hour = $("#start_booking").val();

    if (value == "") {
        console.error("main.js:16 The parameter of 'getHourValues' cannot be null");
        return null;
    } else if (value == "hours") {
        return hour.split(":")[0];
    } else if (value == "minutes") {
        return hour.split(":")[1];
    } else {
        console.error("main.js:16 The parameter of 'getHourValues' was not recognized");
        return null;
    }
}

//When the user press the confirm button make all the checks
$("#confirm").on("click", function () {
    var date = $("#date_booking").val();
    if (isDateHigherThanToday(date)) {
        $("#form_booking").submit();
    } else {
        shake($("#date_booking"));
        shake($("#start_booking"));
        sendAlert("Verifica que la hora y fecha introducidas sean en válidas");
        $("#form_booking").preventDefault();
        return;
    }
});

$("#date_booking").change(function () {
    var date = $("#date_booking").val();
    if (isDateHigherThanToday(date)) {
        $("#date_booking").css("border-color", "green");
        $("#date_booking").css("border-width", "1px");
        return true;
    } else {
        $("#date_booking").css("border-color", "red");
        $("#date_booking").css("border-width", "2px");
        return false;
    }
});

$("#start_booking").change(function () {
    var date = $("#date_booking").val();
    if (isDateHigherThanToday(date)) {
        $("#start_booking").css("border-color", "green");
        $("#start_booking").css("border-width", "1px");
        return true;
    } else {
        $("#start_booking").css("border-color", "red");
        $("#start_booking").css("border-width", "2px");
        return false;
    }
});

$("#form_booking").keypress(function (e) {
    var keycode = (e.keyCode ? e.keyCode : e.which);
    if (keycode == 13) {
        var date = $("#date_booking").val();
        if (isDateHigherThanToday(date)) {
            $("#form_booking").submit();
        } else {
            shake($("#date_booking"));
            shake($("#start_booking"));
            sendAlert("Verifica que la hora y fecha introducidas sean en válidas");
            e.preventDefault();
            return;
        }
    }
});
/*
<summary>
    This function send an alert to the user when is called

    <param name="text">The text that will be displayed</param>
</summary>
*/
function sendAlert(text) {
    var alert = $("#form_alert");
    alert.fadeIn("slow");
    alert.text(text);

    setTimeout(function () {
        alert.fadeOut("slow");
    }, 5000);
}
//LIVE URL UPDATE
function changeQueryString(searchString, documentTitle){      
    documentTitle = typeof documentTitle !== 'undefined' ? documentTitle : document.title;      
    var urlSplit=( window.location.href ).split( "?" );      
    var obj = { Title: documentTitle, Url: urlSplit[0] + searchString };      
    history.pushState(obj, obj.Title, obj.Url);      
}