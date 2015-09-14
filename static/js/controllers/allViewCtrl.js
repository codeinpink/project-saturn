var ALL_FEATURE_COLUMN_LABELS = ['Feature','Commitment','Team','Commit Status','Def. of Done','Start Iteration','Finish Iteration','Comments'];

saturnApp.controller("allViewCtrl",['$scope','$http',
	function($scope,$http){
		$scope.commitments = {};
		$scope.columns = ALL_FEATURE_COLUMN_LABELS;

        refreshCommitments($scope,$http);


	}

]);

function refreshCommitments($scope,$http){
			$http.get('api/commitments/').then(function(response) {
                $scope.commitments = response.data;
                $('#allFeatures').DataTable();
		    // this callback will be called asynchronously
		    // when the response is available
		  	}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  	});
		}
