saturnApp.controller('allFeaturesViewCtrl', function($scope, $rootScope, Feature, DTOptionsBuilder, DTColumnDefBuilder) {
    $scope.features = Feature.query(function() {}, function() {
        $rootScope.showErrorMsg('Could not get features list from server', error.status, error.statusText);
    });

    $scope.dtOptions = DTOptionsBuilder.newOptions()
	.withPaginationType('full_numbers')
    .withBootstrap();

	$scope.dtColumnDefs = [
		DTColumnDefBuilder.newColumnDef(0),
		DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3),
        DTColumnDefBuilder.newColumnDef(4),
        DTColumnDefBuilder.newColumnDef(5),
        DTColumnDefBuilder.newColumnDef(6),
        DTColumnDefBuilder.newColumnDef(7),
        DTColumnDefBuilder.newColumnDef(8).notSortable(),
	];

    $scope.getTeams = function(feature) {
        var teams = [];

        feature.teams.forEach(function(team) {
            teams.push(team.name);
        });

        return teams.join(', ');
    };

    function getStatusTotal(commitments, status) {
        var total = 0;

        commitments.forEach(function(commitment) {
            total += commitment.status === status ? 1 : 0;
        });

        return total;
    }

    $scope.getCommitTotal = function(commitments) { return getStatusTotal(commitments, 'COMMIT'); };

    $scope.getStretchTotal = function(commitments) { return getStatusTotal(commitments, 'STRETCH'); };

    $scope.getNATotal = function(commitments) { return getStatusTotal(commitments, 'N/A'); };

    $scope.getNoTotal = function(commitments) { return getStatusTotal(commitments, 'NO'); };

    $scope.toggleDetails = function(repeatScope, $event, feature) {
        if (!feature.commitment_set.length) { return; }

        function get_details_table(commitments) {
            function wrap_th(string) { return '<th>' + string + '</th>'; }

            function wrap_tr(string) { return '<tr>' + string + '</tr>'; }

            function wrap_td(string) { return '<td>' + string + '</td>'; }

            function get_commitment_rows() {
                var rows = '';

                commitments.forEach(function(commitment) {
                    rows += wrap_tr(wrap_td(commitment.name) + wrap_td(commitment.team.name) +
                    wrap_td(commitment.status) + wrap_td(commitment.done_definition) +
                    wrap_td(commitment.notes));
                });

                return rows;
            }

            return '<div class="slider"><table class="table table-bordered detail-table"><thead>' +
                wrap_tr(wrap_th('Commitment') + wrap_th('Team') + wrap_th('Commitment Status') +
                wrap_th('Definition of Done') + wrap_th('Comments')) + '</tr></thead>' +
                '<tbody>' + get_commitment_rows() + '</tbody></table></div>';
        }

        var dt = $('table#DataTables_Table_0').DataTable();
        var tr = $($event.currentTarget);
        var row = dt.row(tr);

        if (row.child.isShown()) {
            $('div.slider', row.child()).slideUp(function() {
                tr.removeClass('details');
                row.child.hide();
            });

        } else {
            tr.addClass('details');
            row.child(get_details_table(feature.commitment_set), 'detail-row').show();
            $('div.slider', row.child()).slideDown();
        }

        repeatScope.expanded = !repeatScope.expanded; // toggle button
    }
});
