'use strict';

let sqlDb;

exports.servicePicturesDbSetup = function(connection){
  sqlDb = connection;
  console.log("Checking if servicePictures table exists");
  return sqlDb.schema.hasTable("servicePictures").then((exists) => {
    if(!exists) {
      console.log("it doesn't exists");
    } else {
      console.log("It exists");
    }
  });
}

/**
 * Pictures of the services
 * List of images of the services
 *
 * offset Integer Pagination offset (optional)
 * limit Integer Maximum number of item per page. Default is 20. (optional)
 * returns List
 **/
exports.servicePicturesGET = function(offset,limit) {
  if(!limit) limit = 10;
  return sqlDb("servicePictures").limit(limit).offset(offset);
}


/**
 * Images for a specific service Id
 * Images URL
 *
 * serviceId Long Id of a service
 * returns ServicePicture
 **/
exports.servicePicturesServiceIdGET = function(serviceId) {
  return sqlDb("servicePictures").where("serviceId", serviceId);
}
