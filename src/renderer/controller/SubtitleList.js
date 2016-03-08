const Extractor = remote.require('./browser/index.js');
const Subtitles = remote.require('./browser/model/Subtitle.js');
const shell = remote.shell;

app.controller('SubtitleListController', ['$scope', '$routeParams', function ($scope, $routeParams) {

  $scope.subtitles = Subtitles.filter({serieid: $routeParams.serieId});
  $scope.loading = true;

  $scope.open = function(url) {
    shell.openExternal(url);
  };

  Extractor($routeParams.serieId).then(results => {

    $scope.loading = false;
    if(results[0].serie_id != $routeParams.serieId) return;

    results.forEach(result => {

      result.subtitles.forEach(function(item) {

        var existent = Subtitles.find({
          serieid: $routeParams.serieId,
          text: item.text,
          url: item.url
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

    $scope.subtitles = Subtitles.filter({serieid: $routeParams.serieId});
    $scope.$apply();

  }).catch(error => {
    console.log(error);
  });

}]);
