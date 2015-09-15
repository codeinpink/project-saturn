var TEAM_COLUMN_LABELS = ['Feature','Commitment', 'Commit Status','Def. of Done','Start Iteration','Finish Iteration','Comments'];

saturnApp.controller("teamViewCtrl",['$scope','$http', '$resource', '$modal', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'Team', 'Commitment',
	function($scope, $http, $resource, $modal, DTOptionsBuilder, DTColumnDefBuilder, Team, Commitment){
		$scope.teamId = $('#teamId').html();
		$scope.columns=TEAM_COLUMN_LABELS;

		$scope.teamObj = Team.get({id: $scope.teamId}), function() {
			console.log($scope.teamObj);
		};

		$scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');

    	$scope.dtColumnDefs = [
			DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3),
			DTColumnDefBuilder.newColumnDef(4),
			DTColumnDefBuilder.newColumnDef(5),
			DTColumnDefBuilder.newColumnDef(6),
			DTColumnDefBuilder.newColumnDef(7).notSortable(),
			DTColumnDefBuilder.newColumnDef(8).notSortable(),
		];

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
		};

		$scope.showConfirmationPrompt = function(size, id) {
			var modalInstance = $modal.open({
				animation: true,
				templateUrl: '/static/js/templates/deleteConfirmation.html',
				controller: 'DeleteCommitmentCtrl',
				size: size,
				resolve: {
					id: function () {
						return id;
					}
				}
		    });
		};

}]);


saturnApp.controller('DeleteCommitmentCtrl', function($scope, $modalInstance, id, Commitment) {
	$scope.commitment_id = id;

	$scope.deleteCommitment = function() {
		Commitment.delete({id: $scope.commitment_id}, function() {
			console.log("Commitment deleted.");
		});

		$modalInstance.close();
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});

saturnApp.controller('EditCommitmentCtrl', function($scope, $modalInstance, commitment, Commitment) {
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


function refreshCommits($scope,$http){
	$http.get('/api/teams/'+$scope.teamId).then(function(response) {
        $scope.teamObj=response.data;
		$('#myCommits').DataTable({
			dom: 'Bfrtip',
			buttons: [
				'copy', 'csv'
			]
		});
  	}, function(response) {
  	});
}



function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
