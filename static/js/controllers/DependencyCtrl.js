saturnApp.controller('DependencyCtrl', function($scope, $modalInstance, $modal, commitment, Dependency, Team) {
	$scope.commitment = commitment;
    $scope.teams = Team.query();
    $scope.dependency = {};

    $scope.saveDependency = function(dependency) {
        dependency.commitment_id = $scope.commitment.id;
        dependency.dependent_on_id = (dependency.dependent_on ? dependency.dependent_on.id : null);

        Dependency.save(dependency, function(dependency) {
			console.log("Saved");
			$scope.commitment.dependency_set.push(dependency);
			$scope.dependency = {};
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

saturnApp.controller('EditDependencyCtrl', function($scope, $modalInstance, Dependency, Team, dependency, teams) {
	$scope.dependency = angular.copy(dependency);
    $scope.teams = teams;

	$scope.updateDependency = function() {
		Dependency.update({id: $scope.dependency.id}, $scope.dependency, function(dependency) {
			console.log("Updated");
			$modalInstance.close(dependency);
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});

saturnApp.controller('DeleteDependencyCtrl', function($scope, $modalInstance, $modal, Dependency, dependency) {
	$scope.dependency = dependency;
    $scope.confirmationText = 'Are you sure you want to delete this dependency?';

	$scope.delete = function() {
		Dependency.delete({id: $scope.dependency.id}, function() {
			console.log("Dependency deleted.");
			$modalInstance.close($scope.dependency);
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});
