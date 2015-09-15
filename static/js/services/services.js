saturnApp.factory('Team', function($resource) {
    return $resource('/api/teams/:id');
});
