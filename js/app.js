/** @jsx React.DOM */
(function () {
  'use strict';

  var React = require('react');
  var WeatherVaneApp = require('./components/WeatherVaneApp.react');

  React.render(<WeatherVaneApp />, document.getElementById('app'));

})();