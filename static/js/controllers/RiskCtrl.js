saturnApp.controller('RiskCtrl', function($scope, $modalInstance, $modal, Risk, commitment) {
	$scope.commitment = commitment;
	$scope.generalOptions = RISK_GENERAL_OPTIONS;
	$scope.resolutionOptions = RISK_RESOLUTION_OPTIONS;

    $scope.saveRisk = function(risk) {
        risk.commitment_id = $scope.commitment.id;

        Risk.save(risk, function(risk) {
			console.log("Saved");
			$scope.commitment.risk_set.push(risk);
		});
    };

	$scope.editRisk = function(size, risk, commitmentName) {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/static/js/templates/editRisk.html',
			controller: 'EditRiskCtrl',
			size: size,
			resolve: {
				risk: function () {
					return risk;
				},
				commitmentName: function() {
					return commitmentName;
				}
			}
		});

		modalInstance.result.then(function(updated_risk) {
			$scope.commitment.risk_set[$scope.commitment.risk_set.indexOf(risk)] = updated_risk;
		});
	};

	$scope.showConfirmationPrompt = function(risk) {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/static/js/templates/deleteConfirmation.html',
			controller: 'DeleteRiskCtrl',
			size: '',
			resolve: {
				risk: function () {
					return risk;
				}
			}
		});

		modalInstance.result.then(function(risk) {
			$scope.commitment.risk_set.splice($scope.commitment.risk_set.indexOf(risk), 1);
		});
	};

	$scope.close = function () {
    	$modalInstance.dismiss('cancel');
	};
});

saturnApp.controller('EditRiskCtrl', function($scope, $modalInstance, risk, commitmentName, Risk) {
	$scope.risk = angular.copy(risk);
	$scope.commitmentName = commitmentName;
	$scope.generalOptions = RISK_GENERAL_OPTIONS;
	$scope.resolutionOptions = RISK_RESOLUTION_OPTIONS;

	$scope.updateRisk = function() {
		Risk.update({id: $scope.risk.id}, $scope.risk, function(risk) {
			console.log("Updated");
			$modalInstance.close(risk);
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});

saturnApp.controller('DeleteRiskCtrl', function($scope, $modalInstance, $modal, Risk, risk) {
	$scope.risk = risk;
    $scope.confirmationText = 'Are you sure you want to delete this risk?';

	$scope.delete = function() {
		Risk.delete({id: $scope.risk.id}, function() {
			console.log("Risk deleted.");
			$modalInstance.close($scope.risk);
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});
