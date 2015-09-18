saturnApp.factory('Team', function($resource) {
    return $resource('/api/teams/:id/');
});

saturnApp.factory('Feature', function($resource) {
    return $resource('/api/features/:id/', {id: '@id'}, {
        update: {
            method: 'PUT'
        }
    });
});

saturnApp.factory('Commitment', function($resource) {
    return $resource('/api/commitments/:id/', {id: '@id'}, {
        update: {
            method: 'PUT'
        }
    });
});

saturnApp.factory('Risk', function($resource) {
    return $resource('/api/risks/:id/', {id: '@id'}, {
        update: {
            method: 'PUT'
        }
    });
});

saturnApp.factory('Dependency', function($resource) {
    return $resource('/api/dependencies/:id/', {id: '@id'}, {
        update: {
            method: 'PUT'
        }
    });
});

saturnApp.factory('Commitments', function($resource) {
    return $resource('/api/commitments/');
});

saturnApp.factory('Risks', function($resource) {
    return $resource('/api/risks/');
});

saturnApp.factory('Dependencies', function($resource) {
    return $resource('/api/dependencies/');
});