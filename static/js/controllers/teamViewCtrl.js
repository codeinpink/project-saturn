var TEAM_COLUMN_LABELS = ['Feature','Commitment', 'Commit Status','Def. of Done','Start Iteration','Finish Iteration','Comments'];

saturnApp.controller("teamViewCtrl",['$scope','$http', '$resource', 'DTOptionsBuilder', 'DTColumnDefBuilder',
	function($scope, $http, $resource, DTOptionsBuilder, DTColumnDefBuilder){
		$scope.teamId = $('#teamId').html();
		$scope.columns=TEAM_COLUMN_LABELS;

		/* TODO: Move resource into factory?
		see:	https://docs.angularjs.org/api/ngResource/service/$resource
				http://www.sitepoint.com/creating-crud-app-minutes-angulars-resource/
		*/
		var Team = $resource('/api/teams/:id/')
		$scope.teamObj = Team.get({id: $scope.teamId}), function() {
			console.log($scope.teamObj);
		};

		//refreshCommits($scope,$http);

		$scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers');

    	$scope.dtColumnDefs = [
			DTColumnDefBuilder.newColumnDef(0),
			DTColumnDefBuilder.newColumnDef(1),
			DTColumnDefBuilder.newColumnDef(2),
			DTColumnDefBuilder.newColumnDef(3),
			DTColumnDefBuilder.newColumnDef(4),
			DTColumnDefBuilder.newColumnDef(5),
			DTColumnDefBuilder.newColumnDef(6),
			DTColumnDefBuilder.newColumnDef(7).notSortable(),
			DTColumnDefBuilder.newColumnDef(8).notSortable(),
		];

		$scope.editCommitment = function(index) {
			console.log(index);
		};

		$scope.deleteCommitment = function(index) {
			console.log(index);
		};

}]);

function refreshCommits($scope,$http){
	$http.get('/api/teams/'+$scope.teamId).then(function(response) {
        $scope.teamObj=response.data;
		$('#myCommits').DataTable({
			dom: 'Bfrtip',
			buttons: [
				'copy', 'csv'
			]
		});
  	}, function(response) {
  	});
}



function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}
