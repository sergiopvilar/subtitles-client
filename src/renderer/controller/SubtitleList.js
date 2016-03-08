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

  Extractor($routeParams.serieId).then(results => {

    $scope.loading = false;
    if(results[0].serie_id != $routeParams.serieId) return;

    results.forEach(result => {

      result.subtitles.forEach(item => {

        var existent = Subtitles.find({
          text: item.text
        });

        if(!existent)
          Subtitles.push({
            serieid: result.serie_id,
            text: item.text,
            url: item.url,
            source: item.source
          });

      });

    });

    $scope.subtitles = retrieveSubtitles();
    $scope.$apply();

  }).catch(error => {
    console.log(error);
  });

}]);
