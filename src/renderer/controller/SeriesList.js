const Series = remote.require('./browser/model/Serie.js');

app.controller('SeriesListController', ['$scope', '$rootScope', '$location', ($scope, $rootScope, $location) => {

  $scope.series = Series.chain().value();

  $scope.load = (id) => {
    $location.path( "/subtitles/"+id );
  };

  $rootScope.$on('serie:added', () => {
    $scope.series = Series.chain().value();
  });

}]);
