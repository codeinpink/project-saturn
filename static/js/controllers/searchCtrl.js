
saturnApp.controller('searchCtrl', function($scope, $http, Team) {
	$scope.teams = [];
	$scope.hideInput = true;

	$scope.teams = Team.query();

	$scope.goToTeam =function(slug) {
		if (slug) {
			window.location = '/' + slug;
		}
	};
});
