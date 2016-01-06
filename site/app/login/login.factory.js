app.factory('loginFactory', function($resource, CONSTANTS) {
    return $resource(CONSTANTS.urlApi + '/login', null, null);
});