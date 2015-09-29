saturnApp.controller('allFeaturesViewCtrl', function($scope, $rootScope, Feature, DTOptionsBuilder, DTColumnDefBuilder) {
    $scope.features = Feature.query(function() {}, function() {
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
        DTColumnDefBuilder.newColumnDef(4)
	];

    $scope.getTotalRisks = function(commitments) {
        var total = 0;

        commitments.forEach(function(commitment) {
            total += commitment.risk_set.length;
        });

        return total;
    };

    $scope.getTotalDependencies = function(commitments) {
        var total = 0;

        commitments.forEach(function(commitment) {
            total += commitment.dependency_set.length;
        });

        return total;
    };
});
