app.controller('userIndexController', function($scope, userFactory){

    $scope.users = userFactory.query();
    console.log($scope.users);
});

app.controller('userCreateController', function($scope, userFactory, $state){


    $scope.user = {};

    $scope.saveUser = function(){
        userFactory.save($scope.user, function(){

            $state.go('users');
        });
    };
});