var saturnApp = angular.module('missionControlApp',['ui.bootstrap', 'ngResource', 'datatables','datatables.tabletools', 'datatables.bootstrap']);

saturnApp.config(function($interpolateProvider) {
  $interpolateProvider.startSymbol('{[{');
  $interpolateProvider.endSymbol('}]}');
});

saturnApp.config(function($resourceProvider) {
  $resourceProvider.defaults.stripTrailingSlashes = false;
});

saturnApp.config(['$resourceProvider', '$httpProvider',
    function($resourceProvider, $httpProvider) {
        $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';
        $httpProvider.defaults.xsrfCookieName = 'csrftoken';
    }
]);
saturnApp.constant('REFRESH_RATE','5000');//data refresh rate 5000 = 5sec

var PSI_CYCLES = [
    '19-1',
    '19-2',
    '19-3',
    '19-4',
    '19-5'
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

saturnApp.constant('THEMES',[
    'AOS-5525',
    'Business CPE',
    'EoCu',
    'FTTN-TA',
    'FTTP',
    'FTTP/FTTDP',
    'FTTP-AOE',
    'FTTP-Legacy',
    'FTTP-ONT',
    'HW',
    'MSAN',
    'NM Convergence',
    'Packet Optical',
    'SDN/NFV',
    'Solutions & Applications',
    'Voice'
]);//data refresh rate 5000 = 5sec