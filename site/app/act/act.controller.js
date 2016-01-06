app.controller('actCreateController', function($scope, $rootScope, actFactory, userFactory, $state, $filter){

    $scope.goodGrades = [
        {value : 4, text : 'Épico'},
        {value : 3, text : 'Muito bom'},
        {value : 2, text : 'Bom'},
        {value : 1, text : 'Regular'}
    ];

    $scope.badGrades = [
        {value : 4, text : 'Fez merda'},
        {value : 3, text : 'Muito ruim'},
        {value : 2, text : 'Ruim'},
        {value : 1, text : 'Regular'}
    ];

    userFactory.query(function(response) {
        $scope.users = response;

        console.log(response);
    }, function(error) {
        console.log(error);
    });

    $scope.types = [
        {value : 1, name : 'Valor'},
        {value : -1, name :'Vergonha'}
    ];

    $scope.act = {
        anonymous : false
    };

    $scope.saveAct = function () {
        console.log($scope.act);

        var act = {
            username : $filter('getById')($scope.users, $scope.act.user).username,
            type : $scope.act.type,
            //gradeNum: $scope.act.avaliation,
            userGrade: $rootScope.LOGGED_USER,
            anonymous: $scope.act.anonymous,
            act : $scope.act.comment
        };

        actFactory.save(act, function (data) {
            if(data.message == 'Success!'){
                $state.go('home');
            }else{
                //todo : show error
            }
        });
    };

});