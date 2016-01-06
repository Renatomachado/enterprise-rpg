
app.controller('homeController', function($scope, $localStorage, $state, $mdToast, $rootScope, $filter, actFactory, ToastConfig){

    $scope.accordion = {
        open: false
    };

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

    var jaAvaliou = function() {
        $mdToast.show(
            $mdToast.simple('Amiguinho ja foi avaliado por vc')
        );
    };

    var naoSeAvalie = function () {
        $mdToast.show(
            $mdToast.simple('Não pode se avaliar safadinho!')
        );
    };
    $scope.acts = actFactory.query(function(data){

       $scope.acts.forEach(function(item){
          console.log(item);

           if(item.type == 1){
               item.evaluations.forEach(function(ev){
                  ev.grade =   $filter('getByValue')($scope.goodGrades, ev.gradeNum).text
               });
           }else if(item.type == -1){
               item.evaluations.forEach(function(ev){
                   ev.grade =   $filter('getByValue')($scope.badGrades, ev.gradeNum).text
               });
           }

       });
    });

    var showSimpleToast = function() {
        $mdToast.show(
            $mdToast.simple()
                .textContent('Coleguinha foi avaliado!')
                .position(ToastConfig.getToastPosition())
                .hideDelay(3000)
        );
    };


    $scope.evaluateFriend = function(act, val) {
        var eval = {
            gradeNum: val,
            userGrade: $localStorage.login,
            anonymous: false
        };

        act.evaluations.push(eval);

        act.$update(function(response) {
            console.log(response);
            $scope.accordion.open = false;

            showSimpleToast();
        });
    };

    // Desabilita o act se o usuario já avaliou
    $scope.disableIfEvaluated = function(act) {
        var matches = _.findWhere(act.evaluations, { 
            userGrade: $localStorage.login
        });

        if (matches || act.username === $localStorage.login) {
            return true;
        } else {
            return false;
        };
    };

    $scope.evaluation = {
        anonymous : false
    };

    $scope.evaluateFriend = function(act) {

        var eval = {
            gradeNum: $scope.evaluation.grade,
            userGrade: $rootScope.LOGGED_USER,
            anonymous: $scope.evaluation.anonymous
        };

        act.evaluations.push(eval);
        actFactory.update(act, function (response) {
            $state.go($state.current, {}, {reload: true});
            showSimpleToast();
        });

    };


    $scope.doLogout = function(){

        delete $localStorage.login;
        $state.go('login');
    }
});