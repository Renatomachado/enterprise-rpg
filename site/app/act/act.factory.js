app.factory('actFactory', function($resource, CONSTANTS) {
    return $resource(CONSTANTS.urlApi + '/acts/:_id', {
    		_id: '@_id'
    	}, {
    		'update': {
    			method: 'PUT'
    		} 
    	});
});