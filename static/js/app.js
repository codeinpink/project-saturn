var saturnApp = angular.module('missionControlApp',['ui.bootstrap', 'ngResource', 'angucomplete-alt', 'datatables']);

saturnApp.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

saturnApp.config(function($resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
});

var PSI_CYCLES = [
    '18-1',
    '18-2',
    '18-3',
    '18-4',
    '18-5'
];

var COMMITMENT_STATUS_OPTIONS = [
    'COMMIT',
    'STRETCH'
];

var DEFINITION_OF_DONE_OPTIONS = [
    'READY FOR SYSTEM/PQ TEST',
    'MOVE TO STATUS 22',
    'MOVE TO STATUS 25',
    'DESIGN SPIKE COMPLETE',
    'PASSING DATA',
    'PACKAGES RELEASED',
    'OTHER - DESCRIBED IN COMMENTS'
];

var RISK_GENERAL_OPTIONS = [
    'LOW',
    'MEDIUM',
    'HIGH'
];

var RISK_RESOLUTION_OPTIONS = [
    'ASSUME/ACCEPT',
    'AVOID',
    'CONTROL',
    'TRANSFER',
    'WATCH/MONITOR'
];
