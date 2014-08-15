var app = angular.module('app', ['ui.router', 'ngResource']);

app.constant('coralReefUrl', 'http://coral-reef.azurewebsites.net');

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

                $scope.published = function(publishTime) {
                    return moment(publishTime).fromNow();
                }

                $scope.testResults = function(testing) {
                    var results = 'n/a'
                    if (testing.started !== null) {
                        var test = testing.tests[0];
                        results = test.module + ' - tests (' + test.tests + '), passes(' + test.passes + '), fails (' + test.fails + ')';
                    }
                    return results;
                }

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
