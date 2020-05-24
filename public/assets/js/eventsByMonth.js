
function goToMonth(month){
    console.log("Going to the events of the month: " + month);

    month = String(month);
    window.sessionStorage.setItem("month_to_display", month);
    window.location = "./eventsPerSingleMonth.html";
}
