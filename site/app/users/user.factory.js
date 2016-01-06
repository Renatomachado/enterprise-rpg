app.factory('userFactory', function($resource, CONSTANTS) {
    return $resource(CONSTANTS.urlApi + '/users', null, null);
});