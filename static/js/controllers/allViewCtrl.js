
saturnApp.controller("allViewCtrl",['$scope',
	function($scope){

}]);

saturnApp.controller("commitTabCtrl",['$scope', 'DTOptionsBuilder', 'DTColumnBuilder','Commitments','REFRESH_RATE',
    function($scope,  DTOptionsBuilder, DTColumnBuilder, Commitments, REFRESH_RATE){

        $scope.dtInstance ={};
        $scope.reloadData = reloadData;
        $scope.dtOptions = DTOptionsBuilder
        .fromFnPromise(function() {
            return Commitments.query().$promise;
        })
        .withPaginationType('full_numbers')
        .withTableTools('/static/lib/copy_csv_xls_pdf.swf')
        .withTableToolsButtons([
            'print', {
                'sExtends': 'collection',
                "oSelectorOpts": { filter: 'applied', order: 'current' },
                'sButtonText': 'Save',
                'aButtons': ['csv', 'xls', 'pdf']
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

        $scope.dtColumns = [
            DTColumnBuilder.newColumn('feature.name').withTitle('Feature'),
            DTColumnBuilder.newColumn('feature.theme').withTitle('Theme'),
            DTColumnBuilder.newColumn('name').withTitle('Commitment'),
            DTColumnBuilder.newColumn('team.name').withTitle('Team'),
            DTColumnBuilder.newColumn('status').withTitle('Commit Status'),
            DTColumnBuilder.newColumn('done_definition').withTitle('Def. of Done'),
            DTColumnBuilder.newColumn('start').withTitle('Start Iteration'),
            DTColumnBuilder.newColumn('stop').withTitle('Finish Iteration'),
            DTColumnBuilder.newColumn('notes').withTitle('Comment'),
            DTColumnBuilder.newColumn('feature.clarity_or_jira_id').withTitle('Database id').notVisible(),
            ];

        function reloadData() {
            var resetPaging = true;
            $scope.dtInstance.reloadData(callback, resetPaging);
        }
        function callback(json) {
            return;
        }
        setInterval($scope.reloadData,REFRESH_RATE)
    }]);
saturnApp.controller("riskTabCtrl",['$scope','$http', 'DTOptionsBuilder', 'DTColumnBuilder','Risks','REFRESH_RATE',
    function($scope,$http, DTOptionsBuilder, DTColumnBuilder, Risks,REFRESH_RATE){

        $scope.dtInstance ={};
        $scope.reloadData = reloadData;
        $scope.dtOptions = DTOptionsBuilder
        .fromFnPromise(function() {
            return Risks.query().$promise;
        })
        .withPaginationType('full_numbers')
        .withTableTools('/static/lib/copy_csv_xls_pdf.swf')
        .withTableToolsButtons([
            'print', {
                'sExtends': 'collection',
                'sButtonText': 'Save',
                'aButtons': ['csv', 'xls', 'pdf']
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

        $scope.dtColumns = [
            DTColumnBuilder.newColumn('commitment.feature.name').withTitle('Feature'),
            DTColumnBuilder.newColumn('commitment.name').withTitle('Commitment'),
            DTColumnBuilder.newColumn('name').withTitle('Risk'),
            DTColumnBuilder.newColumn('probability').withTitle('Probability'),
            DTColumnBuilder.newColumn('impact').withTitle('Impact'),
            DTColumnBuilder.newColumn('severity').withTitle('Severity'),
            DTColumnBuilder.newColumn('resolution').withTitle('Resolution'),
            DTColumnBuilder.newColumn('notes').withTitle('Comments'),
            DTColumnBuilder.newColumn('commitment.feature.clarity_or_jira_id').withTitle('Database id').notVisible(),
            ];

        function reloadData() {
            var resetPaging = true;
            $scope.dtInstance.reloadData(callback, resetPaging);
        }
        function callback(json) {
            return;
        }
        setInterval($scope.reloadData,REFRESH_RATE);

    }]);



saturnApp.controller("dependencyTabCtrl",['$scope', 'DTOptionsBuilder', 'DTColumnBuilder','Dependencies','REFRESH_RATE',
    function($scope,  DTOptionsBuilder, DTColumnBuilder, Dependencies,REFRESH_RATE){

       $scope.dtInstance ={};
       $scope.reloadData = reloadData;
       $scope.dtOptions = DTOptionsBuilder
       .fromFnPromise(function() {
           return Dependencies.query().$promise;
       })
       .withPaginationType('full_numbers')
       .withTableTools('/static/lib/copy_csv_xls_pdf.swf')
       .withTableToolsButtons([
           'print', {
               'sExtends': 'collection',
               'sButtonText': 'Save',
               'aButtons': ['csv', 'xls', 'pdf']
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

       $scope.dtColumns = [
           DTColumnBuilder.newColumn('commitment.feature.name').withTitle('Feature'),
           DTColumnBuilder.newColumn('commitment.name').withTitle('Commitment'),
           DTColumnBuilder.newColumn('name').withTitle('Dependency'),
           DTColumnBuilder.newColumn('dependent_on.name').withTitle('Dependent On'),
           DTColumnBuilder.newColumn('notes').withTitle('Comments'),
           DTColumnBuilder.newColumn('commitment.feature.clarity_or_jira_id').withTitle('Database id').notVisible(),
           ];

           function reloadData() {
               var resetPaging = true;
               $scope.dtInstance.reloadData(callback, resetPaging);
           }
           function callback(json) {
               return;
           }
           setInterval($scope.reloadData,REFRESH_RATE);

    }]);
