saturnApp.factory('Team', function($resource) {
    return $resource('/api/teams/:id/');
});

saturnApp.factory('Commitment', function($resource) {
    return $resource('/api/commitments/:id/', {id: '@id'}, {
        update: {
            method: 'PUT'
        }
    });
});
saturnApp.factory('Commitments', function($resource) {
    return $resource('/api/commitments/');
});