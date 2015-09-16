saturnApp.controller('DependencyCtrl', function($scope, $modalInstance, $modal, commitment, Dependency, Team) {
	$scope.commitment = commitment;
    $scope.teams = Team.query();

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
	};

	$scope.showConfirmationPrompt = function(id) {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/static/js/templates/deleteConfirmation.html',
			controller: 'DeleteDependencyCtrl',
			size: '',
			resolve: {
				id: function () {
					return id;
				}
			}
		});
	};

	$scope.close = function () {
    	$modalInstance.dismiss('cancel');
	};
});

saturnApp.controller('EditDependencyCtrl', function($scope, $modalInstance, Dependency, Team, dependency, teams) {
	$scope.dependency = dependency;
    $scope.teams = teams;

	$scope.updateDependency = function() {
		Dependency.update({id: $scope.dependency.id}, $scope.dependency, function() {
			console.log("Updated");
		});

	  $modalInstance.close();
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});

saturnApp.controller('DeleteDependencyCtrl', function($scope, $modalInstance, $modal, id, Dependency) {
	$scope.dependency_id = id;
    $scope.confirmationText = 'Are you sure you want to delete this dependency?';

	$scope.delete = function() {
		Dependency.delete({id: $scope.dependency_id}, function() {
			console.log("Dependency deleted.");
		});

		$modalInstance.close();
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});
