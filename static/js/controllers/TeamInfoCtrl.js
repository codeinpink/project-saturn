saturnApp.controller('TeamInfoCtrl', function($scope, $modalInstance, $modal, $rootScope, Team, team) {
	$scope.team = angular.copy(team);
	$scope.submitted = false;

    $scope.saveTeamInfo = function() {
    	$scope.submitted = true;

    	if ($scope.team.confidence > 0) {
			if ($scope.team.planned_unplanned_work === 0 || $scope.team.previous_unplanned_work === 0) {
				$scope.showConfirmationPrompt();
			} else {
				$scope.save();
			}
    	}
	};

	$scope.save = function() {
		Team.update({id: $scope.team.id}, $scope.team, function(team) {
			$rootScope.showSuccessMsg('Updated PSI Capacity on server');
			$modalInstance.close(team);
		}, function(error) {
			$rootScope.showErrorMsg('Could not update PSI Capacity on server', error.status, error.statusText);
		});
	};

	$scope.showConfirmationPrompt = function() {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/static/js/templates/saveConfirmation.html',
			controller: 'ConfirmSaveTeamInfoCtrl',
			size: 'sm'
		});

		modalInstance.result.then(function(result) {
			if (result) $scope.save();
		});
	};

	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
	};
});

saturnApp.controller('ConfirmSaveTeamInfoCtrl', function($scope, $modalInstance) {
	$scope.continue = function() {
		$modalInstance.close(true);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});
