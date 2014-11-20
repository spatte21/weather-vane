/** @jsx React.DOM */
(function () {
  'use strict';

  var React = require('react');
  var Router = require('react-router');
  var Routes = Router.Routes;
  var Route = Router.Route;
  var DefaultRoute = Router.DefaultRoute;
  var WeatherVaneApp = require('./components/WeatherVaneApp.react');
  var Queues = require('./components/Queues.react');
  var Messages = require('./components/Messages.react');
  var Builds = require('./components/Builds.react');

  var routes = (
    <Routes location='hash'>
      <Route name='app' path='/' handler={WeatherVaneApp}>
        <Route name='queues' handler={Queues} />
        <Route name='messages' handler={Messages} />
        <DefaultRoute handler={Builds} />
      </Route>
    </Routes>
  );

  React.render(routes, document.body);

})();