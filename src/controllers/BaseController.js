app.controller(`BaseController`, [`Service`, `$scope`, `$interval`, (Service, $scope, $interval) => {

  Service
  .getRecentTracks()
  .then(results => {
    $scope.tracks = results.track;
  })
  .catch(err => {
    console.log(err);
  });

  Service
  .getAlbumChart()
  .then(results => {
    $scope.chart = results.album;
  })
  .catch(err => {
    console.log(err);
  });

  Service
  .getNews()
  .then(results => {
    console.log(results);
    $scope.news = results;
  })
  .catch(err => {
    console.log(err);
  });

  $scope.clock = Date.now();

  var tick = () => {
    $scope.clock = Date.now();
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
          console.log(weather);
          $scope.weather = weather;
          $scope.$apply();
        },
        error: err => {
          console.log(err);
        }
      });
    }

  });

}]);
