var Reflux = require('reflux');

var WeatherVaneActions = Reflux.createActions([
  'refreshBuilds',
  'selectBuild',
  'buildsFilterChanged',
  'testCancelled'
]);

module.exports = WeatherVaneActions;
