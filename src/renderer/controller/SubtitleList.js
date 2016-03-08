const Extractor = remote.require('./browser/index.js');
const Subtitles = remote.require('./browser/model/Subtitle.js');
const shell = remote.shell;

app.controller('SubtitleListController', ['$scope', '$routeParams', ($scope, $routeParams) => {

  function retrieveSubtitles() {
    return Subtitles
      .chain()
      .filter({serieid: $routeParams.serieId})
      .sortBy('text')
      .value();
  }

  $scope.subtitles = retrieveSubtitles();
  $scope.loading = true;

  $scope.open = (url) => {
    shell.openExternal(url);
  };

  Extractor($routeParams.serieId).then(result => {

    [].concat.apply([], result).forEach(item => {

      var existent = Subtitles.find({
        text: item.text
      });

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
