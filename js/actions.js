var Reflux = require('reflux');

var WeatherVaneActions = Reflux.createActions([
  'refreshBuilds',
  'selectBuild',
  'buildsFilterChanged',
  'testCancelled',
  'authenticationFailure',
  'login',
  'logout'
]);

module.exports = WeatherVaneActions;
