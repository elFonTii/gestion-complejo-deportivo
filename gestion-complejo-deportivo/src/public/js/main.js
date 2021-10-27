/*
<summary>
    This function verifies if the date is higher than today
    and if the hour is higher than the current hour.

    If the date is higher than today and the hour is higher than the current hour,
    the function returns true.

    <param name="date">The date to be verified</param>
</summary>
*/
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
                dateToCompare.setHours(hours);
                dateToCompare.setMinutes(minutes);
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
        sendAlert("Verifica que la hora y fecha introducidas sean en válidas");
        return;
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