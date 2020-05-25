var months = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December"
}

function goToMonth(month){
    console.log("Going to the events of the month: " + month);
    month = String(month);
    //window.sessionStorage.setItem("month_to_display", month);
    window.location = "./eventsPerSingleMonth.html" + "?month=" + month;
}
