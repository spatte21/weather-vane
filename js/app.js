/** @jsx React.DOM */
(function () {
  'use strict';

  String.prototype.capitalise = function(lower) {
    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
  };

  var React = require('react');
  var Router = require('react-router');
  var Route = Router.Route;
  var DefaultRoute = Router.DefaultRoute;
  var WeatherVaneApp = require('./components/WeatherVaneApp.react');
  var DataConfig = require('./components/DataConfiguration.react');
  var TestConfig = require('./components/TestConfiguration.react');
  var UserConfig = require('./components/UserConfiguration.react');
  var Home = require('./components/Home.react');
  var Builds = require('./components/Builds.react');
  var BuildDetails = require('./components/BuildDetails.react');

  var routes = (
    <Route name='app' path='/' handler={WeatherVaneApp}>
      <Route name='builds' handler={Builds} />
      <Route name='data-config' handler={DataConfig} />
      <Route name='test-config' handler={TestConfig} />
      <Route name='user-config' handler={UserConfig} />
      <DefaultRoute handler={Home} />
    </Route>
  );

  Router.run(routes, function(Handler) {
    React.render(<Handler/>, document.body);
  })

})();