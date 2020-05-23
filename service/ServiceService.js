'use strict';

let sqlDb;

exports.servicesDbSetup = function(connection){
  sqlDb = connection;
  console.log("Checking if services table exists");
  return sqlDb.schema.hasTable("services").then((exists) => {
    if(!exists) {
      console.log("it doesn't exists");
    } else {
      console.log("It exists");
    }
  });
}

/**
 * Services offered by the Association
 * List of services of the association
 *
 * offset Integer Pagination offset (optional)
 * limit Integer Maximum number of item per page. Default is 20. (optional)
 * returns List
 **/
exports.servicesGET = function(offset,limit) {
  if(!limit) limit = 10;
  return sqlDb("services").limit(limit).offset(offset);
}


/**
 * Find service by Id
 * Returns a service
 *
 * serviceId Long Id of a service
 * returns Service
 **/
exports.servicesServiceIdGET = function(serviceId) {
  return sqlDb("services").where("serviceId", serviceId);
}


/**
 * Types of services
 * List of the type of the services
 *
 * offset Integer Pagination offset (optional)
 * limit Integer Maximum number of item per page. Default is 20. (optional)
 * returns List
 **/
exports.servicesTypeOfServicesGET = function(offset,limit) {
  return sqlDb.select('type').table('services');
}


/**
 * Find all the services for a specific type
 * Returns services
 *
 * typeId String Type of the service
 * returns List
 **/
exports.servicesTypeOfServicesTypeIdGET = function(typeId) {
  return sqlDb("services").where("type", typeId);
}
