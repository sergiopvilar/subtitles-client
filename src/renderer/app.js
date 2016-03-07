const app = angular.module('series-subtitles', ['ngRoute']);
const remote = require('electron').remote;

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/add', {
        templateUrl: 'renderer/view/add.html',
        controller: 'AddSerieController'
      }).
      when('/subtitles/:serieId', {
        templateUrl: 'renderer/view/subtitles.html',
        controller: 'SubtitleListController'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);
