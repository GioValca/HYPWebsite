'use strict';

let sqlDb;

exports.peopleDbSetup = function(connection){
  sqlDb = connection;
  console.log("Checking if people table exists");
  return sqlDb.schema.hasTable("people").then((exists) => {
    if(!exists) {
      console.log("it doesn't exists");
    } else {
      console.log("It exists");
    }
  });
}

/**
 * People that work in the Association
 * List of the people that works in the Association
 *
 * offset Integer Pagination offset (optional)
 * limit Integer Maximum number of item per page. Default is 20. (optional)
 * returns List
 **/
exports.peopleGET = function(offset,limit) {
  if(!limit) limit = 10;
  return sqlDb("people").limit(limit).offset(offset);
}


/**
 * Find person by Id
 * Returns a person
 *
 * personId Long Id of a person
 * returns Person
 **/
exports.peoplePersonIdGET = function(personId) {
  return sqlDb("people").where("personId", personId);
}
