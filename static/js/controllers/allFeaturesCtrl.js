var COLUMN_LABELS = ['Feature','Commitment','Team','Commit Status','Def. of Done','Start Iteration','Finish Iteration','Comments'];


var dummyData = [{
    "feature": 860,
    "commit": "Superman",
    "team": "Yoda",
    "commit_stat": 860,
    "def_done": "Superman",
    "start": "Yoda",
    "end": "Yoda",
    "comment": "Yoda",
}, {
	"feature": 860,
    "commit": "Superman",
    "team": "Yoda",
    "commit_stat": 860,
    "def_done": "Superman",
    "start": "Yoda",
    "end": "Yoda",
    "comment": "Yoda",
}, {
	"feature": 860,
    "commit": "Superman",
    "team": "Yoda",
    "commit_stat": 860,
    "def_done": "Superman",
    "start": "Yoda",
    "end": "Yoda",
    "comment": "Yoda",
}, {
	"feature": 860,
    "commit": "Superman",
    "team": "Yoda",
    "commit_stat": 860,
    "def_done": "Superman",
    "start": "Yoda",
    "end": "Yoda",
    "comment": "Yoda",
},{
	"feature": 860,
    "commit": "Superman",
    "team": "Yoda",
    "commit_stat": 860,
    "def_done": "Superman",
    "start": "Yoda",
    "end": "Yoda",
    "comment": "Yoda",
}, {
	"feature": 860,
    "commit": "Superman",
    "team": "Yoda",
    "commit_stat": 860,
    "def_done": "Superman",
    "start": "Yoda",
    "end": "Yoda",
    "comment": "Yoda",
},{
	"feature": 860,
    "commit": "Superman",
    "team": "Yoda",
    "commit_stat": 860,
    "def_done": "Superman",
    "start": "Yoda",
    "end": "Yoda",
    "comment": "Yoda",
}, {
	"feature": 860,
    "commit": "Superman",
    "team": "Yoda",
    "commit_stat": 860,
    "def_done": "Superman",
    "start": "Yoda",
    "end": "Yoda",
    "comment": "Yoda",
},{
	"feature": 860,
    "commit": "Superman",
    "team": "Yoda",
    "commit_stat": 860,
    "def_done": "Superman",
    "start": "Yoda",
    "end": "Yoda",
    "comment": "Yoda",
}, {
	"feature": 860,
    "commit": "Superman",
    "team": "Yoda",
    "commit_stat": 860,
    "def_done": "Superman",
    "start": "Yoda",
    "end": "Yoda",
    "comment": "Yoda",
},
{
	"feature": 860,
    "commit": "Superman",
    "team": "Yoda",
    "commit_stat": 860,
    "def_done": "Superman",
    "start": "Yoda",
    "end": "Yoda",
    "comment": "Yoda",
}, {
	"feature": 860,
    "commit": "Superman",
    "team": "Yoda",
    "commit_stat": 860,
    "def_done": "Superman",
    "start": "Yoda",
    "end": "Yoda",
    "comment": "Yoda",
},
{
	"feature": 860,
    "commit": "Superman",
    "team": "Yoda",
    "commit_stat": 860,
    "def_done": "Superman",
    "start": "Yoda",
    "end": "Yoda",
    "comment": "Yoda",
}, {
	"feature": 860,
    "commit": "Superman",
    "team": "Yoda",
    "commit_stat": 860,
    "def_done": "Superman",
    "start": "Yoda",
    "end": "Yoda",
    "comment": "Yoda",
},];

saturnApp.controller("allFeaturesCtrl",['$scope','$http',
	function($scope,$http){
		$scope.features={};
		$scope.columns=COLUMN_LABELS;
		function refreshFeatures(){
			$http.get('api/features').then(function(response) {
                $scope.features=response.data;
		    // this callback will be called asynchronously
		    // when the response is available
		  	}, function(response) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  	});
		}
        refreshFeatures();





	}

]);

