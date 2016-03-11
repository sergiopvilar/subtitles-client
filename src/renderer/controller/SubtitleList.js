const Extractor = remote.require('./browser/index.js');
const Subtitles = remote.require('./browser/model/Subtitle.js');
const Serie = remote.require('./browser/model/Serie.js');
const shell = remote.shell;

app.controller('SubtitleListController', ['$scope', '$rootScope','$routeParams', '$location', ($scope, $rootScope, $routeParams, $location) => {

  function retrieveSubtitles() {
    return Subtitles
      .chain()
      .filter({serieid: $routeParams.serieId})
      .sortBy('text')
      .value();
  }

  $scope.subtitles = retrieveSubtitles();
  $scope.tvshow = Serie.find({id: $routeParams.serieId})
  $scope.loading = true;

  $scope.open = (url) => {
    shell.openExternal(url);
  };

  $scope.removeSerie = () => {
    Serie.remove({id: $scope.tvshow.id});
    $rootScope.$broadcast('serie:changed');
    $location.path( "/");
  };

  Extractor($routeParams.serieId).then(result => {

    [].concat.apply([], result).forEach(item => {
      const existent = Subtitles.find({text: item.text});
      if(existent || item.serieid != $routeParams.serieId) return;
      Subtitles.push(item);
    });

    $scope.loading = false;
    $scope.subtitles = retrieveSubtitles();
    $scope.$apply();

  }).catch(error => {
    console.log(error);
  });

}]);
