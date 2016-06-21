app.controller(`WeatherController`, [`Service`, `$scope`, (Service, $scope) => {
  navigator.geolocation.getCurrentPosition((location) => {
    $scope.location = {
      lat: location.coords.latitude,
      long: location.coords.longitude
    };

    Service
      .getCurrentWeather($scope.location)
      .then(results => {
        $scope.weather = results;
      })
      .catch(err => {
        console.log(err);
      })
  });
}]);
