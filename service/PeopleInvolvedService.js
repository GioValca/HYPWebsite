'use strict';

let sqlDb;

exports.peopleInvolvedDbSetup = function(connection){
  sqlDb = connection;
  console.log("Checking if peopleInvolved table exists");
  return sqlDb.schema.hasTable("peopleInvolved").then((exists) => {
    if(!exists) {
      console.log("it doesn't exists");
    } else {
      console.log("It exists");
    }
  });
}

/**
 * Find served services by PersonId
 * Returns a the person Id and related Id of services
 *
 * personId Long Id of a person
 * returns PersonInvolvment
 **/
exports.peopleInvolvedInServicesFindByPersonPersonIdGET = function(personId) {
  return sqlDb("peopleInvolved").where("personId", personId);
}


/**
 * Find involved people by serviceId
 * Returns a the person Id and related Id of services
 *
 * serviceId Long Id of a service
 * returns PersonInvolvment
 **/
exports.peopleInvolvedInServicesFindByServiceServiceIdGET = function(serviceId) {
  return sqlDb("peopleInvolved").where("serviceId", serviceId);
}


/**
 * Id of the people that are involved in some services
 * List of the id of people that take part of some services
 *
 * offset Integer Pagination offset (optional)
 * limit Integer Maximum number of item per page. Default is 20. (optional)
 * returns List
 **/
exports.peopleInvolvedInServicesGET = function(offset,limit) {
  if(!limit) limit = 10;
  return sqlDb("peopleInvolved").limit(limit).offset(offset);
}
