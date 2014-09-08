var app = angular.module('app', ['ui.router', 'ngResource']);

app.constant('coralReefUrl', 'http://coral-reef.azurewebsites.net');

app.config(function ($stateProvider, $locationProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/partials/home.html',
      controller: function ($scope, $interval, Candidates) {
        var repeater;
        repeater = $interval(function () {
          Candidates.query(function (data) {
            $scope.candidates = data;
            $scope.now = moment();
          });
        }, 15000);

        $scope.published = function (publishTime) {
          return moment(publishTime).fromNow();
        }

        $scope.testResults = function (testing) {
          var results = 'n/a'
          if (testing.started !== null) {
            var test = testing.tests[0];
            results = test.module + ' - tests (' + test.stats.tests + '), passes(' + test.stats.passes + '), fails (' + test.stats.failures + ')';
          }
          return results;
        }

        $scope.stopRefresh = function () {
          if (angular.isDefined(repeater)) {
            $interval.cancel(repeater);
            repeater = undefined;
          }
        };

        $scope.$on('$destroy', function () {
          $scope.stopRefresh();
        });
      }
    })
    .state('display', {
      url: '/display',
      templateUrl: '/partials/display.html',
      resolve: {
        forecasts: function($resource, $q, coralReefUrl) {
          var defer = $q.defer();
          $resource(coralReefUrl + '/weatherforecast/develop').query(function(data) {
            defer.resolve(data);
          });
          return defer.promise;
        }
      },
      controller: function($scope, forecasts) {
        $scope.forecast = forecasts[0];
        forecasts.shift();
        $scope.olderForecasts = forecasts;

        $scope.getBuildAge = function(buildDate) {
          return moment(buildDate).fromNow();
        };

        $scope.getForecastSymbols = function(failures, size) {
          var symbols = {};

          if (size === 'large') {
            size = '256x256';
          }
          else {
            size = '128x128';
          }

          if (failures === 0) {
            symbols.foreground = 'img/PNGs_' + size + '/wsymbol_0001_sunny.png';
            symbols.background = 'sunny';
          }
          else if (failures === 1) {
            symbols.foreground = 'img/PNGs_' + size + '/wsymbol_0002_sunny_intervals.png';
            symbols.background = 'sunny';
          }
          else if (failures <= 3) {
            symbols.foreground = 'img/PNGs_' + size + '/wsymbol_0003_white_cloud.png';
            symbols.background = 'cloudy';
          }
          else if (failures <= 5) {
            symbols.foreground = 'img/PNGs_' + size + '/wsymbol_0004_black_low_cloud.png';
            symbols.background = 'cloudy';
          }
          else if (failures <= 10) {
            symbols.foreground = 'img/PNGs_' + size + '/wsymbol_0033_cloudy_with_light_rain_night.png';
            symbols.background = 'rainy';
          }
          else if (failures <= 25) {
            symbols.foreground = 'img/PNGs_' + size + '/wsymbol_0018_cloudy_with_heavy_rain.png';
            symbols.background = 'rainy';
          }
          else if (failures <= 50) {
            symbols.foreground = 'img/PNGs_' + size + '/wsymbol_0040_thunderstorms_night.png';
            symbols.background = 'stormy';
          }
          else if (failures <= 100) {
            symbols.foreground = 'img/PNGs_' + size + '/wsymbol_0072_blizzard_night.png';
            symbols.background = 'stormy';
          }
          else {
            symbols.foreground = 'img/PNGs_' + size + '/wsymbol_0091_volcanic_ash.png';
            symbols.background = 'stormy';
          }

          return symbols;
        };
      }
    });

});
