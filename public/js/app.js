'use strict';

var app = angular.module('dashboard', []);

app.factory('Service', ['$http', function ($http) {
  var service = {};
  var apiFM = '6e945ef718dcf6eaabef5ec3e448f358';
  var apiNews = 'd59c3a96787a47fbac3c5883285a660e';
  var userFM = 'cynthiacrescent';

  service.getLocation = function (lat, lon) {
    return $http({
      method: 'GET',
      url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon
    }).then(function (response) {
      if (response.status !== 200) {
        throw new Error('Failed to get location.');
      }

      return response.data;
    });
  };

  service.getRecentTracks = function () {
    return $http({
      method: 'GET',
      url: 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=' + userFM + '&api_key=' + apiFM + '&format=json'
    }).then(function (response) {
      if (response.status !== 200) {
        throw new Error('Failed to get recent tracks.');
      }

      return response.data.recenttracks;
    });
  };

  service.getNews = function () {
    return $http({
      method: 'GET',
      url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=' + apiNews
    }).then(function (response) {
      if (response.status !== 200) {
        throw new Error('Failed to get recent news.');
      }

      return response.data.response.docs;
    });
  };

  return service;
}]);

app.controller('BaseController', ['Service', '$scope', '$interval', '$window', function (Service, $scope, $interval, $window) {

  $scope.config = {
    name: 'Cynthia Crescent'
  };

  Service.getRecentTracks().then(function (results) {
    results.track.forEach(function (result) {
      result.artist_name = result.artist['#text'];
    });
    $scope.tracks = results.track;
  }).catch(function (err) {
    console.log(err);
  });

  Service.getNews().then(function (results) {
    $scope.news = results;
  }).catch(function (err) {
    console.log(err);
  });

  $scope.clock = Date.now();
  $scope.time = 'Morning';

  var tick = function tick() {
    $scope.clock = new Date();
    var hour = new Date().getHours();
    if (hour > 6 && hour <= 12) {
      $scope.time = 'Morning';
    }
    if (hour > 12 && hour <= 18) {
      $scope.time = 'Afternoon';
    }
    if (hour > 18 || hour <= 6) {
      $scope.time = 'Evening';
    }
  };
  tick();
  $interval(tick, 1000);

  navigator.geolocation.getCurrentPosition(function (location) {

    Service.getLocation(location.coords.latitude, location.coords.longitude).then(function (data) {
      $scope.getWeather(data.results[3].address_components[0].short_name);
    }).catch(function (err) {
      console.log(err);
    });

    $scope.getWeather = function (zip) {
      $.simpleWeather({
        location: zip,
        unit: 'c',
        success: function success(weather) {
          $scope.weather = weather;
          $scope.$apply();
        },
        error: function error(err) {
          console.log(err);
        }
      });
    };
  });

  $scope.search = function (event, text) {
    if (event.which === 13) {
      $window.open('https://www.google.com/search?q=' + text, '_blank');
    }
  };
}]);