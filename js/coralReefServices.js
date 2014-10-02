angular.module('app').factory('Candidates', function(coralReefUrl, $resource) {
    return $resource(coralReefUrl + '/build?shush=2Sed5qDTFx9pxp6zxLfH');
});