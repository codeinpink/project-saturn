
saturnApp.controller('searchCtrl', function($scope, $http, $rootScope, Team) {
	$scope.teams = [];
	$scope.hideInput = true;

	$scope.teams = Team.query(function() {}, function(error) {
		$rootScope.showErrorMsg('Could not get teams list from server', error.status, error.statusText);
	});

	$scope.goToTeam =function(slug) {
		if (slug) {
			window.location = '/' + slug;
		}
	};
});
