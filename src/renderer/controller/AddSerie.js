const Series = remote.require('./browser/model/Serie.js');
const uuid = remote.require('uuid');

app.controller('AddSerieController', ['$scope', '$rootScope', ($scope, $rootScope) => {

  $scope.seasons = [];
  for(var i = 1; i <= 12; i++) {
    $scope.seasons.push((i<10) ? '0'+i : i);
  }

  $scope.name = '';
  $scope.season = '01';

  $scope.submit = () => {

    if($scope.name == '') return;

    Series.push({
      id: uuid(),
      name: $scope.name,
      season: $scope.season
    });

    $rootScope.$broadcast('serie:added');

  }

}]);
