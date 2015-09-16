saturnApp.controller('DependencyCtrl', function($scope, $modalInstance, commitment, Dependency) {
	$scope.commitment = commitment;
	$scope.iterationOptions = PSI_CYCLES;
	$scope.commitmentStatusOptions = COMMITMENT_STATUS_OPTIONS;
	$scope.defOfDoneOptions = DEFINITION_OF_DONE_OPTIONS;

	$scope.updateCommitment = function() {
		Commitment.update({id: $scope.commitment.id}, $scope.commitment, function() {
			console.log("Updated");
		});

	  $modalInstance.close();
	};

	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
	};
});

saturnApp.controller('EditDependencyCtrl', function($scope, $modalInstance, dependency, commitmentName, Dependency) {
	$scope.dependency = dependency;
	$scope.commitmentName = commitmentName;

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
