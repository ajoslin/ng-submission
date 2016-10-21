'use strict'

var angular = require('angular')

module.exports = angular.module('ng-submission', [])
  .service('ngSubmission', require('./service'))
  .name
