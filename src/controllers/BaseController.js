app.controller(`BaseController`, [`Service`, `$scope`, `$interval`, `$window`, (Service, $scope, $interval, $window) => {

  $scope.config = {
    name: `Cynthia Crescent`
  };

  Service
  .getRecentTracks()
  .then(results => {
    results.track.forEach(result => {
      result.artist_name = result.artist['#text'];
    })
    $scope.tracks = results.track;
  })
  .catch(err => {
    console.log(err);
  });

  Service
  .getNews()
  .then(results => {
    $scope.news = results;
  })
  .catch(err => {
    console.log(err);
  });

  $scope.clock = Date.now();
  $scope.time = `Morning`;

  var tick = () => {
    $scope.clock = new Date();
    let hour = new Date().getHours();
    if (hour > 6 && hour <= 12) {
      $scope.time = `Morning`;
    }
    if (hour > 12 && hour <= 18) {
      $scope.time = `Afternoon`;
    }
    if (hour > 18 || hour <= 6) {
      $scope.time = `Evening`;
    }
  }
  tick();
  $interval(tick, 1000);

  navigator.geolocation.getCurrentPosition((location) => {

    Service
    .getLocation(location.coords.latitude, location.coords.longitude)
    .then(data => {
      $scope.getWeather(data.results[3].address_components[0].short_name);
    })
    .catch(err => {
      console.log(err);
    });

    $scope.getWeather = (zip) => {
      $.simpleWeather({
        location: zip,
        unit: 'c',
        success: weather => {
          $scope.weather = weather;
          $scope.$apply();
        },
        error: err => {
          console.log(err);
        }
      });
    }

  });

  $scope.search = (event, text) => {
    if (event.which === 13) {
      $window.open(`https://www.google.com/search?q=` + text, `_blank`);
    }
  };

}]);
