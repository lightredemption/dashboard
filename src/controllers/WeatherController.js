app.controller(`WeatherController`, [`Service`, `$scope`, `$interval`, (Service, $scope, $interval) => {

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
