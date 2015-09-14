var TEAM_COLUMN_LABELS = ['Feature','Commitment', 'Commit Status','Def. of Done','Start Iteration','Finish Iteration','Comments'];





saturnApp.controller("teamViewCtrl",['$scope','$http',
	function($scope,$http){
		$scope.teamId = $('#teamId').html();
		$scope.columns=TEAM_COLUMN_LABELS;
		$scope.teamObj = {}

		refreshCommits($scope,$http);
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
