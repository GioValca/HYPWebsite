'use strict';

let sqlDb;

exports.eventsDbSetup = function(connection){
  sqlDb = connection;
  console.log("Checking if events table exists");
  return sqlDb.schema.hasTable("events").then((exists) => {
    if(!exists) {
      console.log("it doesn't exists");
    } else {
      console.log("It exists");
    }
  });
}
/**
 * Find event by Id
 * Returns an event
 *
 * eventId Long Id of an event
 * returns Event
 **/
exports.eventsEventIdGET = function(eventId) {
  return sqlDb("events").where("eventId", eventId);
}


/**
 * Find all the events for a specific Month
 * Returns events
 *
 * monthId Long Month of the events
 * returns List
 **/
exports.eventsEventsbymonthMonthIdGET = function(monthId) {
  return sqlDb("events").where("month", monthId);
}


/**
 * Events of the Association
 * List of events of the association
 *
 * offset Integer Pagination offset (optional)
 * limit Integer Maximum number of item per page. Default is 20. (optional)
 * returns List
 **/
exports.eventsGET = function(offset,limit) {
  if(!limit) limit = 10;
  return sqlDb("events").limit(limit).offset(offset);
}


/**
 * Events of the current day
 * List of events of taday
 *
 * offset Integer Pagination offset (optional)
 * limit Integer Maximum number of item per page. Default is 20. (optional)
 * returns List
 **/
exports.eventsTodayseventsGET = function(offset,limit) {
  var today = new Date();

  var day = today.getDate();
  var month = today.getMonth()+1;
  var year = today.getFullYear();

  if(!limit) limit = 10;
  return sqlDb("events").where('day', day).andWhere('month', month).andWhere('year', year).limit(limit).offset(offset);

}
