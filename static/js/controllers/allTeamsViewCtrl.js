saturnApp.controller('allTeamsViewCtrl', function($scope, $modal, Team) {
    $scope.teams = Team.query(function() {}, function(error) {
    	$rootScope.showErrorMsg('Could not get teams list from server', error.status, error.statusText);
    });

    $scope.showRisks = function(commitment) {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/static/js/templates/risks/risksTable.html',
			controller: 'RiskCtrl',
			size: 'lg',
			resolve: {
	        	commitment: function () {
					return commitment;
	        	}
			}
	    });
	};

    $scope.showDependencies = function(commitment) {
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: '/static/js/templates/dependencies/dependenciesTable.html',
			controller: 'DependencyCtrl',
			size: 'lg',
			resolve: {
	        	commitment: function () {
					return commitment;
	        	}
			}
	    });
	};
});
