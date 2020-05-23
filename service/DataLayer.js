let {eventsDbSetup} = require("./EventService");
let {peopleInvolvedDbSetup} = require("./PeopleInvolvedService");
let {peopleDbSetup} = require("./PersonService");
let {servicePicturesDbSetup} = require("./ServicePictureService");
let {servicesDbSetup} = require("./ServiceService");
const sqlDbFactory = require("knex");

console.log("Database:", process.env.DATABASE_URL);

let sqlDb = sqlDbFactory({
  client: "pg",
  debug: true,
  connection: process.env.DATABASE_URL,
  ssl: true
});

function setupDataLayer(){
  console.log("Setting up data Layer");
  return ( eventsDbSetup(sqlDb) &&
           peopleInvolvedDbSetup(sqlDb) &&
           peopleDbSetup(sqlDb) &&
           servicePicturesDbSetup(sqlDb) &&
           servicesDbSetup(sqlDb)
          );
}

module.exports = {database: sqlDb, setupDataLayer};
