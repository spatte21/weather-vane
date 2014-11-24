/** @jsx React.DOM */
(function () {
  'use strict';

  String.prototype.capitalise = function(lower) {
    return (lower ? this.toLowerCase() : this).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
  };

  var React = require('react');
  var Router = require('react-router');
  var Routes = Router.Routes;
  var Route = Router.Route;
  var DefaultRoute = Router.DefaultRoute;
  var WeatherVaneApp = require('./components/WeatherVaneApp.react');
  var Queues = require('./components/Queues.react');
  var Home = require('./components/Home.react');
  var Messages = require('./components/Messages.react');
  var Builds = require('./components/Builds.react');
  var BuildDetails = require('./components/BuildDetails.react');

  var routes = (
    <Route name='app' path='/' handler={WeatherVaneApp}>
      <Route name='builds' handler={Builds}>
        <DefaultRoute handler={Home} />
        <Route name='build' path='/build/:id' handler={BuildDetails} />
      </Route>
      <Route name='queues' handler={Queues} />
      <Route name='messages' handler={Messages} />
      <DefaultRoute handler={Home} />
    </Route>
  );

  Router.run(routes, function(Handler) {
    React.render(<Handler/>, document.body);
  })

})();