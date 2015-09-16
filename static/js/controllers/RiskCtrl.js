saturnApp.controller('RiskCtrl', function($scope, $modalInstance, $modal, commitment) {
	$scope.commitment = commitment;
	$scope.generalOptions = RISK_GENERAL_OPTIONS;
	$scope.resolutionOptions = RISK_RESOLUTION_OPTIONS;

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
	};

	$scope.showConfirmationPrompt = function(id) {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/static/js/templates/deleteConfirmation.html',
			controller: 'DeleteRiskCtrl',
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

saturnApp.controller('EditRiskCtrl', function($scope, $modalInstance, risk, commitmentName, Risk) {
	$scope.risk = risk;
	$scope.commitmentName = commitmentName;
	$scope.generalOptions = RISK_GENERAL_OPTIONS;
	$scope.resolutionOptions = RISK_RESOLUTION_OPTIONS;

	$scope.updateRisk = function() {
		Risk.update({id: $scope.risk.id}, $scope.risk, function() {
			console.log("Updated");
		});

	  $modalInstance.close();
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});

saturnApp.controller('DeleteRiskCtrl', function($scope, $modalInstance, $modal, id, Risk) {
	$scope.risk_id = id;
    $scope.confirmationText = 'Are you sure you want to delete this risk?';
    
	$scope.delete = function() {
		Risk.delete({id: $scope.risk_id}, function() {
			console.log("Risk deleted.");
		});

		$modalInstance.close();
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});
