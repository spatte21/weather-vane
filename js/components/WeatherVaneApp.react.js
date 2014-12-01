var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Builds = require('./Builds.react');

var WeatherVaneApp = React.createClass({

  mixins: [Reflux.ListenerMixin],

  render: function() {

    return <div className='full-height'>
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
              <li><Link to='test-config'>Test Suites</Link></li>
              <li><Link to='data-config'>Data</Link></li>
              <li><Link to='user-config'>Users</Link></li>
            </ul>
          </div>
  
        </div>
      </nav>
      <div className='row full-height'>
        <RouteHandler />
      </div>
    </div>;
  }

});

module.exports = WeatherVaneApp;

