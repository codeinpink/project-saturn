var COLUMN_LABELS = ['Feature','Commitment','Team','Commit Status','Def. of Done','Start Iteration','Finish Iteration','Comments'];





saturnApp.controller("teamViewCtrl",['$scope','$http',
	function($scope,$http){
		$scope.columns=COLUMN_LABELS;
		$scope.msg="hello from team view";




	}

]);