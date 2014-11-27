var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;
var Builds = require('./Builds.react');
var WeatherVaneActions = require('../actions');
var errorStore = require('../stores/error');
var currentUserStore = require('../stores/currentUser');

var WeatherVaneApp = React.createClass({

  mixins: [Reflux.ListenerMixin, Router.Navigation],

  getInitialState: function() {
    return {
      user: require('../localStorage/currentUser').load()
    }
  },

  componentWillMount: function() {
    this.listenTo(errorStore, this.onError);
    this.listenTo(currentUserStore, this.currentUserChange);
  },

  logout: function() {
    WeatherVaneActions.logout();
  },

  onError: function(error) {
    switch (error.type) {
      case 'authentication':
        this.transitionTo('login');
        break;
    };
  },

  currentUserChange: function(currentUser) {
    this.setState(currentUser);
    if (!this.user) {
      this.transitionTo('login');
    }
  },

  render: function() {

    var user = this.state.user;

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

            <ul className='nav navbar-nav navbar-right'>
            { !!user ?
              <Nav>
                <DropdownButton title={'Logged in as ' + user.user.username}>
                  <MenuItem eventKey="1" onClick={this.logout}>Logout</MenuItem>
                </DropdownButton>
              </Nav>
              : null }
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
