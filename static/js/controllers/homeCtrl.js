
saturnApp.controller("homeCtrl",['$scope','$http',
	function($scope,$http){
		$scope.teams = {};
		getAllTeams($scope,$http);
		$scope.team = "";
		$scope.hideInput = true;
		$scope.goToTeam =function(teamName) {
			window.location = '/' + slugify(teamName);
		}
		
	}
]);

function getAllTeams($scope,$http){
	$http.get('api/teams').then(function(response) {
		$scope.teams = response.data;
		console.log($scope.teams);
	// this callback will be called asynchronously
	// when the response is available
	}, function(response) {
		return "error getting teams"
	// called asynchronously if an error occurs
	// or server returns response with an error status.
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
