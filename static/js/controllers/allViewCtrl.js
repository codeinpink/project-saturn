var ALL_FEATURE_COLUMN_LABELS = ['Feature','Commitment','Team','Commit Status','Def. of Done','Start Iteration','Finish Iteration','Comments'];

saturnApp.controller("allViewCtrl",['$scope','$http', '$resource', '$modal', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'Commitments',
	function($scope, $http, $resource, $modal, DTOptionsBuilder, DTColumnDefBuilder, Commitments){
		$scope.columns=ALL_FEATURE_COLUMN_LABELS;
		$scope.commitments =null;
		$scope.reloadCommits = function(){refreshCommits();};
		function refreshCommits() {
			Commitments.query(function (commits) {
                $scope.commitments = commits;
                
            });
		}
        refreshCommits();

		$scope.dtOptions = DTOptionsBuilder.newOptions().withTableTools('/static/lib/copy_csv_xls_pdf.swf')
        .withTableToolsButtons([
            'copy',
            'print', {
                'sExtends': 'collection',
                'sButtonText': 'Save',
                'aButtons': ['csv', 'xls', 'pdf']
            }
        ]).withPaginationType('full_numbers');
    	$scope.dtColumnDefs = [
			DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3),
			DTColumnDefBuilder.newColumnDef(4),
			DTColumnDefBuilder.newColumnDef(5),
			DTColumnDefBuilder.newColumnDef(6),
		];


}]);
