saturnApp.controller('DependencyCtrl', function($scope, $modalInstance, $modal, $rootScope, commitment, Dependency, Team) {
	$scope.commitment = commitment;
    $scope.dependency = {};
    $scope.submitted = false;

    $scope.teams = Team.query(function() {}, function(error) {
    	$rootScope.showErrorMsg('Could not get teams list from server', error.status, error.statusText);
    });

    $scope.saveDependency = function(dependency) {
    	$scope.submitted = true;
        dependency.commitment_id = $scope.commitment.id;
        dependency.dependent_on_id = (dependency.dependent_on ? dependency.dependent_on.id : null);

        Dependency.save(dependency, function(dependency) {
			$rootScope.showSuccessMsg('Saved dependency on server');
			$scope.commitment.dependency_set.push(dependency);
			$scope.dependency = {};
			$scope.submitted = false;
		}, function(error) {
			$rootScope.showErrorMsg('Could not save dependency on server', error.status, error.statusText);
		});
    };

    $scope.editDependency = function(size, dependency) {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/static/js/templates/editDependency.html',
			controller: 'EditDependencyCtrl',
			size: size,
			resolve: {
				dependency: function () {
					return dependency;
				},
				teams: function() {
					return $scope.teams;
				}
			}
		});

		modalInstance.result.then(function(updated_dependency) {
			$scope.commitment.dependency_set[$scope.commitment.dependency_set.indexOf(dependency)] = updated_dependency;
		});
	};

	$scope.showConfirmationPrompt = function(dependency) {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/static/js/templates/deleteConfirmation.html',
			controller: 'DeleteDependencyCtrl',
			size: '',
			resolve: {
				dependency: function () {
					return dependency;
				}
			}
		});

		modalInstance.result.then(function(dependency) {
			$scope.commitment.dependency_set.splice($scope.commitment.dependency_set.indexOf(dependency), 1);
		});
	};

	$scope.close = function () {
    	$modalInstance.dismiss('cancel');
	};
});

saturnApp.controller('EditDependencyCtrl', function($scope, $modalInstance, $rootScope, Dependency, Team, dependency, teams) {
	$scope.dependency = angular.copy(dependency);
    $scope.teams = teams;
    $scope.submitted = false;

	$scope.updateDependency = function() {
		$scope.submitted = true;

		Dependency.update({id: $scope.dependency.id}, $scope.dependency, function(dependency) {
			$rootScope.showSuccessMsg('Updated dependency on server');
			$modalInstance.close(dependency);
		}, function(error) {
			$rootScope.showErrorMsg('Could not update dependency on server', error.status, error.statusText);
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});

saturnApp.controller('DeleteDependencyCtrl', function($scope, $modalInstance, $modal, $rootScope, Dependency, dependency) {
	$scope.dependency = dependency;
    $scope.confirmationText = 'Are you sure you want to delete this dependency?';

	$scope.delete = function() {
		Dependency.delete({id: $scope.dependency.id}, function() {
			$rootScope.showSuccessMsg('Deleted dependency on server');
			$modalInstance.close($scope.dependency);
		}, function(error) {
			$rootScope.showErrorMsg('Could not delete dependency on server', error.status, error.statusText);
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});
