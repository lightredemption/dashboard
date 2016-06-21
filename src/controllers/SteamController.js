app.controller(`SteamController`, [`Service`, `$scope`, (Service, $scope) => {

  Service
  .getSteamFriends()
  .then(results => {
    $scope.friends = results;
  })
  .catch(err => {
    console.log(err);
  });

  Service
  .getSteamData()
  .then(results => {
    $scope.profile = results;
  })
  .catch(err => {
    console.log(err);
  });
}]);
