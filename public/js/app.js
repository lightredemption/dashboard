'use strict';

var app = angular.module('dashboard', []);

app.directive('weather', function () {
  return {
    templateUrl: '../partials/weather.html'
  };
});

app.controller('BaseController', function ($scope) {});