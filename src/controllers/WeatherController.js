app.controller(`WeatherController`, [`Service`, `$scope`, (Service, $scope) => {
  navigator.geolocation.getCurrentPosition((location) => {
    $scope.location = {
      lat: location.coords.latitude,
      long: location.coords.longitude
    };

    Service
      .getCurrentWeather($scope.location)
      .then(results => {
        console.log(results);
        results.main.temp = parseInt(results.main.temp);
        results.wind.speed = results.wind.speed * 3600 / 1000;
        $scope.weather = results;
      })
      .catch(err => {
        console.log(err);
      })
  });
}]);
