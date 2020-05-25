'use strict';

var utils = require('../utils/writer.js');
var Service = require('../service/ServiceService');

module.exports.servicesGET = function servicesGET (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Service.servicesGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.servicesServiceIdGET = function servicesServiceIdGET (req, res, next) {
  var serviceId = req.swagger.params['serviceId'].value;
  Service.servicesServiceIdGET(serviceId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.servicesServicesOfEventEventIdGET = function servicesServicesOfEventEventIdGET (req, res, next) {
  var eventId = req.swagger.params['eventId'].value;
  Service.servicesServicesOfEventEventIdGET(eventId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.servicesTypeOfServicesGET = function servicesTypeOfServicesGET (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  Service.servicesTypeOfServicesGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.servicesTypeOfServicesTypeIdGET = function servicesTypeOfServicesTypeIdGET (req, res, next) {
  var typeId = req.swagger.params['typeId'].value;
  Service.servicesTypeOfServicesTypeIdGET(typeId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
