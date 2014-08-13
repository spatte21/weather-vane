angular.module('app').factory('Candidates', function($resource) {
    return $resource('http://localhost:3000/candidates');
});