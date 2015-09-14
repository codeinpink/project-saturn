var saturnApp = angular.module('missionControlApp',['ui.bootstrap', 'ngResource', 'angucomplete-alt', 'datatables']);

saturnApp.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});
