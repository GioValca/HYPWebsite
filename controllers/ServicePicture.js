'use strict';

var utils = require('../utils/writer.js');
var ServicePicture = require('../service/ServicePictureService');

module.exports.servicePicturesGET = function servicePicturesGET (req, res, next) {
  var offset = req.swagger.params['offset'].value;
  var limit = req.swagger.params['limit'].value;
  ServicePicture.servicePicturesGET(offset,limit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.servicePicturesServiceIdGET = function servicePicturesServiceIdGET (req, res, next) {
  var serviceId = req.swagger.params['serviceId'].value;
  ServicePicture.servicePicturesServiceIdGET(serviceId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
