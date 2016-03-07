const Extractor = remote.require('./browser/index.js');
const Subtitles = remote.require('./browser/model/Subtitle.js');
const shell = remote.shell;

app.controller('SubtitleListController', ['$scope', '$routeParams', function ($scope, $routeParams) {

  $scope.subtitles = Subtitles.filter({serieid: $routeParams.serieId});
  $scope.loading = true;

  $scope.open = function(url) {
    shell.openExternal(url);
  };

  Extractor($routeParams.serieId, function(result){

    $scope.loading = false;
    if(result.serie_id != $routeParams.serieId) return;

    result.subtitles.forEach(function(item) {

      var existent = Subtitles.find({
        serieid: $routeParams.serieId,
        text: item.text,
        url: item.url
      });

      if(!existent)
        Subtitles.push({
          serieid: $routeParams.serieId,
          text: item.text,
          url: item.url
        });

    })

    $scope.subtitles = Subtitles.filter({serieid: $routeParams.serieId});
    $scope.$apply();

  });


}]);
