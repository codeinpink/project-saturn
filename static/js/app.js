var saturnApp = angular.module('missionControlApp',['ui.bootstrap', 'angucomplete-alt']);

saturnApp.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
