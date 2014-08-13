var app = angular.module('app', ['ui.router', 'ngResource']);

app.config(function($stateProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'home.html',
            controller: function($scope, $interval, Candidates) {
                var repeater;
                repeater = $interval(function() {
                    Candidates.query(function(data) {
                        $scope.candidates = data;
                        $scope.now = moment();
                    });
                }, 15000);

                $scope.stopRefresh = function() {
                    if (angular.isDefined(repeater)) {
                        $interval.cancel(repeater);
                        repeater = undefined;
                    }
                };

                $scope.$on('$destroy', function() {
                    $scope.stopRefresh();
                });
            }
        })
        .state('display', {
            url: '/display',
            templateUrl: 'display.html'
        });

})
.run(function($state) {
    $state.transitionTo('home');
});
