
saturnApp.controller("homeCtrl",['$scope','$http',
	function($scope,$http){
		$scope.teams = $http.get('api/teams').then(function(response) {
				console.log(response)
		    // this callback will be called asynchronously
		    // when the response is available
		  	}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  	});
		$scope.msg="hello from hoem view";
		$scope.goToTeam =function(teamName){
			$http.get('/'+slugify(teamName)).then(function(response) {
				console.log(response)
		    // this callback will be called asynchronously
		    // when the response is available
		  	}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  	});
	
		}

	}

]);




function slugify(text)
{
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}