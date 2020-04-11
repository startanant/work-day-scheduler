$(document).ready(function () {
    
    //displays current day
    var now = moment().format("dddd, MMMM DD, YYYY");
    const currentDayDisplay = $("#currentDay");
    currentDayDisplay.text(now);

    ///retrieves events from local storage, if present
    if (localStorage.storageArray) {
        var localStorageArray = JSON.parse(localStorage.storageArray);
        generateTimeBlocks();
        for (var i = 0; i < localStorageArray.length; i++) {
            for (var j = 0; j <= 24; j++) {
                if (localStorageArray[i].time == `hour${j}`) {
                    $(`#hour${j}`).val(localStorageArray[i].event);
                }
            }
        }
    } else {
        generateTimeBlocks();
    }
    
    //creates timeblocks
    function generateTimeBlocks() {
        for (var i = 1; i <= 24; i++) {
            $(".container").append(
                `<div class="row">
                <div class="col-1 hour">${i}:00</div>
                <input id="hour${i}"class="col-10" type="text">
                <div class="col-1 saveBtn" >
                    <i class="fas fa-save" onclick='saveEvent("${i}")'></i> 
                </div>
            </div>
            `
            );
        }
    }

    //adds past present future classes
    var hoursArray = [01, 02, 03, 04, 05, 06, 07, 08, 09, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    const currentHour = moment().hours();

    for (var i = 0; i < hoursArray.length; i++) {
        const activeHour = hoursArray[i];

        if (activeHour < currentHour) {
            $(`#hour${activeHour}`).addClass("past");
        } else if (activeHour == currentHour) {
            $(`#hour${activeHour}`).addClass("present");
        } else {
            $(`#hour${activeHour}`).addClass("future");
        }

    }

});

//sets localstorage
var storageArray = localStorage.storageArray ? JSON.parse(localStorage.storageArray) : [];

function saveEvent(i) {
    var storageObj = {
        event: $(`#hour${i}`).val(),
        time: `hour${i}`
    };


    storageArray.push(storageObj);
    localStorage.setItem("storageArray", JSON.stringify(storageArray));

}





