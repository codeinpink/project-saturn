saturnApp.controller('TeamInfoCtrl', function($scope, $modalInstance, Team, team) {
	$scope.team = angular.copy(team);

    $scope.saveTeamInfo = function() {
		Team.update({id: $scope.team.id}, $scope.team, function(team) {
			console.log("Updated");
			$modalInstance.close(team);
		});
	};

	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
	};
});
