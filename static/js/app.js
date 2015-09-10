var saturnApp = angular.module('missionControlApp',['ui.bootstrap']);

saturnApp.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});