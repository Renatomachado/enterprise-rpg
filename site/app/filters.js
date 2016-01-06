var app = angular.module('App');

app.filter('getById', function() {
    return function(input, id) {
        var i=0, len=input.length;
        for (; i<len; i++) {
            if (input[i]._id == id) {
                return input[i];
            }
        }
        return null;
    }
});

app.filter('getByValue', function() {
    return function(input, id) {
        var i=0, len=input.length;
        for (; i<len; i++) {
            if (input[i].value == id) {
                return input[i];
            }
        }
        return null;
    }
});