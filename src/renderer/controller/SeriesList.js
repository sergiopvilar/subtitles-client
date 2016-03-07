const Series = remote.require('./browser/model/Serie.js');

app.controller('SeriesListController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {

  $scope.series = Series.chain().value();

  $scope.load = function(id) {
    $location.path( "/subtitles/"+id );
  };

  $rootScope.$on('serie:added', function() {
    $scope.series = Series.chain().value();
  });

}]);
