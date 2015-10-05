saturnApp.controller('commitTabCtrl', function($scope, $rootScope, DTOptionsBuilder, DTColumnBuilder, Commitment, REFRESH_RATE) {
    $scope.dtInstance = {};
    $scope.reloadData = reloadData;
    $scope.dtOptions = DTOptionsBuilder
    .fromFnPromise(function() {
        return Commitment.query(function() {}, function(error) {
            $rootScope.showErrorMsg('Could not get commitments list from server', error.status, error.statusText);
        }).$promise;
    })
    .withPaginationType('full_numbers')
    .withLanguage({
		'sEmptyTable': 'No data available in table yet',
		'sZeroRecords': 'No matching commitments found',
		'sInfo': 'Showing _START_ to _END_ of _TOTAL_ commitments',
		'sInfoEmpty': 'Showing 0 to 0 of 0 commitments',
		'sInfoFiltered': '(filtered from _MAX_ total commitments)',
		'sLengthMenu': 'Show _MENU_ commitments',
	})
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

    $scope.dtColumns = [
        DTColumnBuilder.newColumn('feature.name').withTitle('Feature'),
        DTColumnBuilder.newColumn('feature.theme').withTitle('Theme'),
        DTColumnBuilder.newColumn('name').withTitle('Commitment'),
        DTColumnBuilder.newColumn('team.name').withTitle('Team'),
        DTColumnBuilder.newColumn('status').withTitle('Commit Status'),
        DTColumnBuilder.newColumn('done_definition').withTitle('Def. of Done'),
        DTColumnBuilder.newColumn('start').withTitle('Start Iteration'),
        DTColumnBuilder.newColumn('stop').withTitle('Finish Iteration'),
        DTColumnBuilder.newColumn('notes').withTitle('Comments'),
        DTColumnBuilder.newColumn('feature.clarity_or_jira_id').withTitle('Database id').notVisible(),
    ];

    function reloadData() {
        $scope.dtInstance.reloadData(null, false);
    }

    setInterval($scope.reloadData, REFRESH_RATE);
});

saturnApp.controller('riskTabCtrl', function($scope, $http, $rootScope, DTOptionsBuilder, DTColumnBuilder, Risk, REFRESH_RATE) {
    $scope.dtInstance ={};
    $scope.reloadData = reloadData;
    $scope.dtOptions = DTOptionsBuilder
    .fromFnPromise(function() {
        return Risk.query(function() {}, function(error) {
            $rootScope.showErrorMsg('Could not get risks list from server', error.status, error.statusText);
        }).$promise;
    })
    .withPaginationType('full_numbers')
    .withLanguage({
		'sEmptyTable': 'No data available in table yet',
		'sZeroRecords': 'No matching risks found',
		'sInfo': 'Showing _START_ to _END_ of _TOTAL_ risks',
		'sInfoEmpty': 'Showing 0 to 0 of 0 risks',
		'sInfoFiltered': '(filtered from _MAX_ total risks)',
		'sLengthMenu': 'Show _MENU_ risks',
	})
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

    $scope.dtColumns = [
        DTColumnBuilder.newColumn('commitment.feature.name').withTitle('Feature'),
		DTColumnBuilder.newColumn('commitment.feature.theme').withTitle('Theme'),
        DTColumnBuilder.newColumn('commitment.name').withTitle('Commitment'),
		DTColumnBuilder.newColumn('commitment.team.name').withTitle('Team'),
        DTColumnBuilder.newColumn('name').withTitle('Risk'),
        DTColumnBuilder.newColumn('probability').withTitle('Probability'),
        DTColumnBuilder.newColumn('impact').withTitle('Impact'),
        DTColumnBuilder.newColumn('severity').withTitle('Severity'),
        DTColumnBuilder.newColumn('resolution').withTitle('Resolution'),
        DTColumnBuilder.newColumn('notes').withTitle('Comments'),
        DTColumnBuilder.newColumn('commitment.feature.clarity_or_jira_id').withTitle('Database id').notVisible(),
    ];

    function reloadData() {
        $scope.dtInstance.reloadData(null, false);
    }

    setInterval($scope.reloadData, REFRESH_RATE);
});

saturnApp.controller('dependencyTabCtrl', function($scope, $rootScope, DTOptionsBuilder, DTColumnBuilder, Dependency, REFRESH_RATE) {
   $scope.dtInstance = {};
   $scope.reloadData = reloadData;
   $scope.dtOptions = DTOptionsBuilder
   .fromFnPromise(function() {
        return Dependency.query(function() {}, function(error) {
            $rootScope.showErrorMsg('Could not get dependencies list from server', error.status, error.statusText);
        }).$promise;
   })
   .withPaginationType('full_numbers')
   .withLanguage({
       'sEmptyTable': 'No data available in table yet',
       'sZeroRecords': 'No matching dependencies found',
       'sInfo': 'Showing _START_ to _END_ of _TOTAL_ dependencies',
       'sInfoEmpty': 'Showing 0 to 0 of 0 dependencies',
       'sInfoFiltered': '(filtered from _MAX_ total dependencies)',
       'sLengthMenu': 'Show _MENU_ dependencies',
   })
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

   $scope.dtColumns = [
       DTColumnBuilder.newColumn('commitment.feature.name').withTitle('Feature'),
	   DTColumnBuilder.newColumn('commitment.feature.theme').withTitle('Theme'),
       DTColumnBuilder.newColumn('commitment.name').withTitle('Commitment'),
	   DTColumnBuilder.newColumn('commitment.team.name').withTitle('Team'),
       DTColumnBuilder.newColumn('name').withTitle('Dependency'),
       DTColumnBuilder.newColumn('dependent_on.name').withTitle('Dependent On'),
       DTColumnBuilder.newColumn('notes').withTitle('Comments'),
       DTColumnBuilder.newColumn('commitment.feature.clarity_or_jira_id').withTitle('Database id').notVisible(),
   ];

   function reloadData() {
       $scope.dtInstance.reloadData(null, false);
   }

   setInterval($scope.reloadData, REFRESH_RATE);
});
