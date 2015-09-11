var ALL_FEATURE_COLUMN_LABELS = ['Feature','Commitment','Team','Commit Status','Def. of Done','Start Iteration','Finish Iteration','Comments'];

saturnApp.controller("allFeaturesCtrl",['$scope','$http',
	function($scope,$http){
		$scope.features={};
		$scope.columns=ALL_FEATURE_COLUMN_LABELS;

        refreshFeatures($scope,$http);


	}

]);

function refreshFeatures($scope,$http){
			$http.get('api/features').then(function(response) {
                $scope.features=response.data;
                $('#allFeatures').DataTable();
		    // this callback will be called asynchronously
		    // when the response is available
		  	}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  	});
		}
