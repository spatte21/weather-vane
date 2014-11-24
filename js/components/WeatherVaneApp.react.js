var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Builds = require('./Builds.react');

var WeatherVaneApp = React.createClass({

  mixins: [Reflux.ListenerMixin],

  render: function() {

    return <div>
      <nav className='navbar navbar-default' role='navigation'>
        <div className='container'>

          <div className='navbar-header'>
            <button type='button' className='navbar-toggle collapsed' data-toggle='collapse' data-target='#bs-example-navbar-collapse-1'>
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </button>
            <a className='navbar-brand' href='#'>Weather Vane</a>
          </div>

          <div className='collapse navbar-collapse' id='bs-example-navbar-collapse-1'>
            <ul className='nav navbar-nav'>
              <li><Link to='builds'>Builds</Link></li>
              <li><Link to='queues'>Queues</Link></li>
              <li><Link to='messages'>Messages</Link></li>
            </ul>
          </div>
  
        </div>
      </nav>
      <div className='row weather-vane'>
        <RouteHandler />
      </div>
    </div>;
  }

});

module.exports = WeatherVaneApp;

