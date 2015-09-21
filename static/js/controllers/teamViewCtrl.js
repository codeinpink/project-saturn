var TEAM_COLUMN_LABELS = ['Commitment','Feature', 'Commit Status', 'Def. of Done', 'Start Iteration', 'Finish Iteration', 'Comments'];
var psiCapacitySet = false;

saturnApp.controller('teamViewCtrl', function($scope, $http, $resource, $modal, $window, DTOptionsBuilder, DTColumnDefBuilder, $rootScope, Team, Feature, Commitment) {
	$scope.teamId = $('#teamId').html();
	$scope.columns = TEAM_COLUMN_LABELS;

	$scope.teamObj = Team.get({id: $scope.teamId}, function() {
		$scope.getTotalRisks = function() {
			var total = 0;

			for (var i = 0; i < $scope.teamObj.commitment_set.length; i++) {
				commitment = $scope.teamObj.commitment_set[i];
				total += commitment.risk_set.length;
			}

			return total;
		};

		$scope.getTotalDependencies = function() {
			var total = 0;

			for (var i = 0; i < $scope.teamObj.commitment_set.length; i++) {
				commitment = $scope.teamObj.commitment_set[i];
				total += commitment.dependency_set.length;
			}

			return total;
		};

		$scope.isPSICapacitySet = function() {
			psiCapacitySet = $scope.teamObj.confidence;
			return psiCapacitySet;
		};

		$scope.hasAddedCommitment = function() {
			return $scope.teamObj.commitment_set.length;
		};

		$scope.hasGoodStatus = function() {
			return $scope.isPSICapacitySet() && $scope.hasAddedCommitment();
		};

		$scope.getStatusTooltip = function() {
			if ($scope.hasGoodStatus()) {
				return 'This Team Has Set Its Confidence and Has Added a Commitment';
			} else {
				var confidence = $scope.isPSICapacitySet();
				var commitment = $scope.hasAddedCommitment();

				if (!confidence && !commitment) {
					return 'This Team Has NOT Set Its Confidence and Has NOT Added a Commitment';
				} else if (!confidence) {
					return 'This Team Has NOT Set Its Confidence';
				} else if (!commitment) {
					return 'This Team Has NOT Added a Commitment';
				}
			}
		};
	}, function(error) {
		$rootScope.showErrorMsg('Could not get team data from server', error.status, error.statusText);
	});

	$scope.allFeatures = Feature.query(function() {}, function(error) {
		$rootScope.showErrorMsg('Could not get features list from server', error.status, error.statusText);
	});

	$scope.dtOptions = DTOptionsBuilder.newOptions()
	.withPaginationType('full_numbers')
	.withTableTools('/static/lib/copy_csv_xls_pdf.swf')
	.withTableToolsButtons([
        'print',
        {
        	'sExtends': 'csv',
            'sButtonText': 'Export',
            'oSelectorOpts': {filter: 'applied'}
        }
    ])
    .withBootstrap()
    .withBootstrapOptions({
        TableTools: {
            classes: {
                container: 'btn-group pull-right table-tools-group',
                buttons: {
                    normal: 'btn btn-default'
                }
            }
        }
	});

	$scope.dtColumnDefs = [
		DTColumnDefBuilder.newColumnDef(0),
		DTColumnDefBuilder.newColumnDef(1),
		DTColumnDefBuilder.newColumnDef(2),
		DTColumnDefBuilder.newColumnDef(3),
		DTColumnDefBuilder.newColumnDef(4),
		DTColumnDefBuilder.newColumnDef(5),
		DTColumnDefBuilder.newColumnDef(6),
		DTColumnDefBuilder.newColumnDef(7),
		DTColumnDefBuilder.newColumnDef(8).notSortable(),
		DTColumnDefBuilder.newColumnDef(9).notSortable(),
		DTColumnDefBuilder.newColumnDef(10).notSortable(),
		DTColumnDefBuilder.newColumnDef(11).notSortable(),
	];

	$scope.addTeamInfo = function() {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/static/js/templates/addTeamInfo.html',
			controller: 'TeamInfoCtrl',
			size: '',
			resolve: {
				team: function() {
					return $scope.teamObj;
				}
			}
	    });

		modalInstance.result.then(function(team) {
			$scope.teamObj = team;
		});
	};

	$scope.addCommitment = function() {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/static/js/templates/addCommitment.html',
			controller: 'NewCommitmentCtrl',
			size: '',
			resolve: {
				allFeatures: function() {
					return $scope.allFeatures;
				},
	        	teamFeatures: function() {
					return $scope.teamObj.feature_set;
	        	},
				teamId: function() {
					return $scope.teamId;
				}
			}
	    });

		modalInstance.result.then(function(commitment) {
			$scope.teamObj.commitment_set.push(commitment);
		});
	};

	$scope.showRisks = function(commitment) {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/static/js/templates/showRisks.html',
			controller: 'RiskCtrl',
			size: 'lg',
			resolve: {
	        	commitment: function () {
					return commitment;
	        	}
			}
	    });
	};

	$scope.showDependencies = function(commitment) {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/static/js/templates/showDependencies.html',
			controller: 'DependencyCtrl',
			size: 'lg',
			resolve: {
	        	commitment: function () {
					return commitment;
	        	}
			}
	    });
	}

	$scope.editCommitment = function(size, commitment) {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/static/js/templates/editCommitment.html',
			controller: 'EditCommitmentCtrl',
			size: size,
			resolve: {
	        	commitment: function () {
					return commitment;
	        	}
			}
	    });

		modalInstance.result.then(function(updated_commitment) {
			$scope.teamObj.commitment_set[$scope.teamObj.commitment_set.indexOf(commitment)] = updated_commitment;
		});
	};

	$scope.showConfirmationPrompt = function(size, commitment) {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/static/js/templates/deleteConfirmation.html',
			controller: 'DeleteCommitmentCtrl',
			size: size,
			resolve: {
				commitment: function () {
					return commitment;
				}
			}
	    });

		modalInstance.result.then(function(commitment) {
			$scope.teamObj.commitment_set.splice($scope.teamObj.commitment_set.indexOf(commitment), 1);
		});
	};

});

saturnApp.controller('NewCommitmentCtrl', function($scope, $modalInstance, $rootScope, Commitment, Feature, allFeatures, teamFeatures, teamId, THEMES) {
	$scope.addingNewFeature = false;
    $scope.showTeamFeaturesOnly = true;

	$scope.allFeatures = allFeatures;
	$scope.teamFeatures = teamFeatures;
	$scope.features = teamFeatures;
	$scope.teamId = teamId;

	$scope.THEMES = THEMES;
	$scope.iterationOptions = PSI_CYCLES;
	$scope.commitmentStatusOptions = COMMITMENT_STATUS_OPTIONS;
	$scope.defOfDoneOptions = DEFINITION_OF_DONE_OPTIONS;

	$scope.submitted = false;

	$scope.toggleFeatureSource = function() {
        $scope.showTeamFeaturesOnly = ($scope.showTeamFeaturesOnly ? false : true);
		$scope.features = ($scope.showTeamFeaturesOnly == false ? $scope.allFeatures : $scope.teamFeatures);
		$scope.addingNewFeature = false;
	};

	$scope.toggleAddingFeature = function() {
        $scope.showTeamFeaturesOnly = false;
        if ($scope.commitment) {$scope.commitment.feature =null;}
        $scope.newCommitmentForm.$setPristine();
		$scope.addingNewFeature = ($scope.addingNewFeature ? false : true);
	};

	$scope.doneDefinitionIsValid = function() {
		var valid = true;

		// If they chose 'OTHER', make sure they fill out the comment field
		if ($scope.commitment && $scope.commitment.done_definition) {
			if ($scope.commitment.done_definition === 'OTHER - DESCRIBED IN COMMENTS' &&
			((typeof $scope.commitment.notes === 'undefined' || !$scope.commitment.notes))) {
				valid = false;
			}
		}

		return valid;
	};

	$scope.saveCommitment = function(commitment) {
		$scope.submitted = true;

        if ($scope.addingNewFeature) {
            var newFeature = {
                'name': commitment.feature.name,
                'theme': commitment.feature.theme
            };

            Feature.save(newFeature, function (savedFeature) {
            	commitment.feature = savedFeature;
                saveCommit();
                $scope.allFeatures.push(savedFeature);
            });
        } else {
        	saveCommit();
        }

        function saveCommit() {
            if (commitment && commitment.feature) {
            	commitment.feature_id = commitment.feature.id;
            	commitment.team_id = $scope.teamId;
	        }

			if ($scope.doneDefinitionIsValid()) {
				Commitment.save(commitment, function(commitment) {
					console.log('Saved');
					$scope.teamFeatures.push(commitment.feature);
					$modalInstance.close(commitment);
				}, function(error) {
					$rootScope.showErrorMsg('Could not save commitment on server', error.status, error.statusText);
				});
			}
		}
	};

	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
	};
});

saturnApp.controller('DeleteCommitmentCtrl', function($scope, $modalInstance, $modal, $rootScope, Commitment, commitment) {
	$scope.commitment = commitment;
	$scope.confirmationText = 'Are you sure you want to delete this commitment? ' +
	'Deleting this commitment will also delete any associated risks and dependencies.';

	$scope.delete = function() {
		Commitment.delete({id: $scope.commitment.id}, function() {
			console.log('Commitment deleted.');
			$modalInstance.close($scope.commitment);
		}, function(error) {
			$rootScope.showErrorMsg('Could not delete commitment on server', error.status, error.statusText);
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});

saturnApp.controller('EditCommitmentCtrl', function($scope, $modalInstance, $rootScope, commitment, Commitment) {
	$scope.commitment = angular.copy(commitment);
	$scope.iterationOptions = PSI_CYCLES;
	$scope.commitmentStatusOptions = COMMITMENT_STATUS_OPTIONS;
	$scope.defOfDoneOptions = DEFINITION_OF_DONE_OPTIONS;

	$scope.updateCommitment = function() {
		Commitment.update({id: $scope.commitment.id}, $scope.commitment, function(commitment) {
			console.log("Updated");
			$modalInstance.close(commitment);
		}, function(error) {
			$rootScope.showErrorMsg('Could not update commitment on server', error.status, error.statusText);
		});
	};

	$scope.cancel = function () {
    	$modalInstance.dismiss('cancel');
	};
});
