saturnApp.controller('TeamInfoCtrl', function($scope, $modalInstance, $rootScope, Team, team) {
	$scope.team = angular.copy(team);
	$scope.submitted = false;

    $scope.saveTeamInfo = function() {
    	$scope.submitted = true;

    	if ($scope.team.confidence > 0) {
    		Team.update({id: $scope.team.id}, $scope.team, function(team) {
				console.log("Updated");
				$modalInstance.close(team);
			}, function(error) {
				$rootScope.showErrorMsg('Could not update PSI Capacity on server', error.status, error.statusText);
			});
    	}
	};

	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
	};
});
