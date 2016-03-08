const Series = remote.require('./browser/model/Serie.js');

app.controller('SeriesListController', ['$scope', '$rootScope', '$location', ($scope, $rootScope, $location) => {

  $scope.series = Series.chain().value();
  $scope.selected = '';

  $scope.load = (id) => {
    $scope.selected = id;
    $location.path( "/subtitles/"+id );
  };

  $rootScope.$on('serie:added', () => {
    $scope.series = Series.chain().value();
  });

}]);
