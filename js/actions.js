var Reflux = require('reflux');

var WeatherVaneActions = Reflux.createActions([
  'refreshBuilds',
  'selectBuild'
]);

module.exports = WeatherVaneActions;
