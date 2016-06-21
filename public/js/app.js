'use strict';

var app = angular.module('dashboard', []);

app.directive('weatherModuleDirective', ['Service', function (Service) {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: '../partials/weather',
    link: function link(scope) {
      scope.terror = '101';
      console.log('sds ');
    }
  };
}]);

app.controller('BaseController', function ($scope) {
  console.log('pleas');
});