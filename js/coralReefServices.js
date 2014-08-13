angular.module('app').factory('Candidates', function(coralReefUrl, $resource) {
    return $resource(coralReefUrl + '/candidate');
});