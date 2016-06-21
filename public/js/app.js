'use strict';

var app = angular.module('dashboard', []);

app.factory('Service', ['$http', function ($http) {
  var service = {};

  var apiOpenWeatherMap = '3e9bf4b44d91035d2b502d445af152ce';
  var apiSteam = 'BF5F20D59B3A29772A03EDD9470780C5';
  var apiFM = '6e945ef718dcf6eaabef5ec3e448f358';
  var apiNews = 'd59c3a96787a47fbac3c5883285a660e';
  var idSteam = '76561198046827360';
  var userFM = 'cynthiacrescent';

  service.getCurrentWeather = function (location) {
    return $http({
      method: 'GET',
      url: 'http://api.openweathermap.org/data/2.5/weather?lat=' + location.lat + '&lon=' + location.long + '&units=metric&APPID=' + apiOpenWeatherMap
    }).then(function (response) {
      if (response.status !== 200) {
        throw new Error('Failed to get weather data.');
      }

      return response.data;
    });
  };

  service.getSteamData = function () {
    return $http({
      method: 'GET',
      url: 'https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=' + apiSteam + '&steamids=' + idSteam
    }).then(function (response) {
      if (response.status !== 200) {
        throw new Error('Failed to get steam profile.');
      }

      return response.data.response.players[0];
    });
  };

  service.getSteamFriends = function () {
    return $http({
      method: 'GET',
      url: 'https://api.steampowered.com/ISteamUser/GetFriendList/v0001/?key=' + apiSteam + '&steamid=' + idSteam + '&relationship=friend'
    }).then(function (response) {
      if (response.status !== 200) {
        throw new Error('Failed to get steam profile.');
      }

      return response.data.friendslist.friends;
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

  service.getAlbumChart = function () {
    return $http({
      method: 'GET',
      url: 'https://ws.audioscrobbler.com/2.0/?method=user.getweeklyalbumchart&user=' + userFM + '&api_key=' + apiFM + '&format=json'
    }).then(function (response) {
      if (response.status !== 200) {
        throw new Error('Failed to get album chart.');
      }

      return response.data.weeklyalbumchart;
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

app.controller('BaseController', function ($scope) {});

app.controller('MusicController', ['Service', '$scope', function (Service, $scope) {

  Service.getRecentTracks().then(function (results) {
    $scope.tracks = results.track;
  }).catch(function (err) {
    console.log(err);
  });

  Service.getAlbumChart().then(function (results) {
    $scope.chart = results.album;
  }).catch(function (err) {
    console.log(err);
  });
}]);

app.controller('NewsController', ['Service', '$scope', function (Service, $scope) {

  Service.getNews().then(function (results) {
    $scope.news = results;
  }).catch(function (err) {
    console.log(err);
  });
}]);

app.controller('SteamController', ['Service', '$scope', function (Service, $scope) {

  Service.getSteamFriends().then(function (results) {
    $scope.friends = results;
  }).catch(function (err) {
    console.log(err);
  });

  Service.getSteamData().then(function (results) {
    $scope.profile = results;
  }).catch(function (err) {
    console.log(err);
  });
}]);

app.controller('WeatherController', ['Service', '$scope', function (Service, $scope) {
  navigator.geolocation.getCurrentPosition(function (location) {
    $scope.location = {
      lat: location.coords.latitude,
      long: location.coords.longitude
    };

    Service.getCurrentWeather($scope.location).then(function (results) {
      $scope.weather = results;
    }).catch(function (err) {
      console.log(err);
    });
  });
}]);