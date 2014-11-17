var Reflux = require('reflux');

var WeatherVaneActions = Reflux.createActions([
  'refreshBuildList',
  'selectBuild'
]);

module.exports = WeatherVaneActions;
