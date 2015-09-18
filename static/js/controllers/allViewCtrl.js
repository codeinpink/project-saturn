var ALL_FEATURE_COLUMN_LABELS = ['Feature','Theme','Commitment','Team','Commit Status','Def. of Done','Start Iteration','Finish Iteration','Comments'];

saturnApp.controller("allViewCtrl",['$scope','$http', '$resource', '$modal', 'DTOptionsBuilder', 'DTColumnDefBuilder', 'Commitments','Risks','Dependencies',
	function($scope, $http, $resource, $modal, DTOptionsBuilder, DTColumnDefBuilder, Commitments,Risks,Dependencies){
		$scope.columns=ALL_FEATURE_COLUMN_LABELS;
		$scope.commitments =null;
        $scope.risks =null;
        $scope.dependencies =null;
		$scope.reloadCommits = function(){refreshCommits();};
		$scope.reloadRisk = function(){refreshRisk();};
        $scope.reloadDependencies = function(){refreshDependencies();};
        refreshCommits();
        refreshRisks();
        refreshDependencies();

		$scope.dtOptions = DTOptionsBuilder.newOptions().withTableTools('/static/lib/copy_csv_xls_pdf.swf')
        .withTableToolsButtons([
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
            DTColumnDefBuilder.newColumnDef(7),
		];
        function refreshCommits() {
            Commitments.query(function (commits) {
                $scope.commitments = commits;
            });
        }
        function refreshRisks() {
            Risks.query(function (risks) {
                $scope.risks = risks;
            });
        }
        function refreshDependencies() {
            Dependencies.query(function (dependencies) {
                $scope.dependencies = dependencies;
            });
        }


}]);
