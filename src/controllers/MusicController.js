app.controller(`MusicController`, [`Service`, `$scope`, (Service, $scope) => {

  Service
  .getRecentTracks()
  .then(results => {
    $scope.tracks = results.track
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

}]);
