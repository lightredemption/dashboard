app.controller(`NewsController`, [`Service`, `$scope`, (Service, $scope) => {

  Service
  .getNews()
  .then(results => {
    console.log(results);
    $scope.news = results;
  })
  .catch(err => {
    console.log(err);
  });

}]);
