var ALL_FEATURE_COLUMN_LABELS = ['Feature','Theme','Commitment',
                                 'Team','Commit Status','Def. of Done',
                                 'Start Iteration','Finish Iteration','Comments'];
var ALL_RISK_COLUMN_LABELS = ['Risk','Feature','Commitment','Probability','Impact',
                                'Severity','Resolution','Comments'];
var ALL_DEPENDENCY_COLUMN_LABELS = ['Dependency','Commitment','Feature','Dependent On','Comments'];

saturnApp.controller("allViewCtrl",['$scope', 
	function($scope){
		
}]);

saturnApp.controller("commitTabCtrl",['$scope', 'DTOptionsBuilder', 'DTColumnDefBuilder','Commitments',
    function($scope,  DTOptionsBuilder, DTColumnDefBuilder, Commitments){

        $scope.feature_columns=ALL_FEATURE_COLUMN_LABELS;
        $scope.reloadCommits = function(){refreshCommits();};
        $scope.commitments =null;

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
            DTColumnDefBuilder.newColumnDef(8),
        ];
        function refreshCommits() {
            Commitments.query(function (commits) {
                $scope.commitments = commits;
            });
        }
        refreshCommits();

    }]);
saturnApp.controller("riskTabCtrl",['$scope','$http', 'DTOptionsBuilder', 'DTColumnDefBuilder','Risks',
    function($scope,$http, DTOptionsBuilder, DTColumnDefBuilder, Risks){

        $scope.risk_columns= ALL_RISK_COLUMN_LABELS;
        $scope.reloadRisk = function(){refreshRisks();};
        $scope.risks = null;

        $scope.riskDtOptions = DTOptionsBuilder.newOptions().withTableTools('/static/lib/copy_csv_xls_pdf.swf')
        .withTableToolsButtons([
            'print', {
                'sExtends': 'collection',
                'sButtonText': 'Save',
                'aButtons': ['csv', 'xls', 'pdf']
            }
        ]).withPaginationType('full_numbers');
        $scope.riskDtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3),
            DTColumnDefBuilder.newColumnDef(4),
            DTColumnDefBuilder.newColumnDef(5),
            DTColumnDefBuilder.newColumnDef(6),
            DTColumnDefBuilder.newColumnDef(7),
        ];
        function refreshRisks() {
            Risks.query( function(risk){
                $scope.risks = risk;
            });
        }

        refreshRisks();

    }]);



saturnApp.controller("dependencyTabCtrl",['$scope', 'DTOptionsBuilder', 'DTColumnDefBuilder','Dependencies',
    function($scope,  DTOptionsBuilder, DTColumnDefBuilder, Dependencies){

        $scope.dependency_columns=ALL_DEPENDENCY_COLUMN_LABELS;
        $scope.dependencies =null;
        $scope.reloadDependencies = function(){refreshDependencies();};

        $scope.depenDtOptions = DTOptionsBuilder.newOptions().withTableTools('/static/lib/copy_csv_xls_pdf.swf')
        .withTableToolsButtons([
            'print', {
                'sExtends': 'collection',
                'sButtonText': 'Save',
                'aButtons': ['csv', 'xls', 'pdf']
            }
        ]).withPaginationType('full_numbers');
        $scope.depenDtColumnDefs = [
            DTColumnDefBuilder.newColumnDef(0),
            DTColumnDefBuilder.newColumnDef(1),
            DTColumnDefBuilder.newColumnDef(2),
            DTColumnDefBuilder.newColumnDef(3),
            DTColumnDefBuilder.newColumnDef(4),
        ];
        
        function refreshDependencies() {
            Dependencies.query(function (dependencies) {
                $scope.dependencies = dependencies;
            });
        }
        refreshDependencies();

    }]);