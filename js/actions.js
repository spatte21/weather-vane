var Reflux = require('reflux');

var WeatherVaneActions = Reflux.createActions([
  'refreshBuilds',
  'selectBuild',
  'buildsFilterChanged'
]);

module.exports = WeatherVaneActions;
