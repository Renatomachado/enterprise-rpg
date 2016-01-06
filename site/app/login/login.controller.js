app.controller('LoginController', function($scope, loginFactory, userFactory, $localStorage, $state){

    $scope.login = "";
    $scope.pass = "";

    $scope.doLogin = function() {
        var obj = {
            username: $scope.login,
            password: $scope.pass
        };

        var l = new loginFactory(obj);

        l.$save(function(response) {
            $localStorage.login = response.username;
            $state.go('home');
        });

        // loginFactory.save({
        //     username : $scope.login,
        //     password : $scope.pass
        // }, function(data){
        //     $localStorage.login = data.user;
        //     $state.go('home');
        // });
    }

});