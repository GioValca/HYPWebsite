'use strict';

var utils = require('../utils/writer.js');
var PeopleInvolved = require('../service/PeopleInvolvedService');

module.exports.peopleInvolvedInServicesFindByPersonPersonIdGET = function peopleInvolvedInServicesFindByPersonPersonIdGET (req, res, next) {
  var personId = req.swagger.params['personId'].value;
  PeopleInvolved.peopleInvolvedInServicesFindByPersonPersonIdGET(personId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.peopleInvolvedInServicesFindByServiceServiceIdGET = function peopleInvolvedInServicesFindByServiceServiceIdGET (req, res, next) {
  var serviceId = req.swagger.params['serviceId'].value;
  PeopleInvolved.peopleInvolvedInServicesFindByServiceServiceIdGET(serviceId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.peopleInvolvedInServicesGET = function peopleInvolvedInServicesGET (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  PeopleInvolved.peopleInvolvedInServicesGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
