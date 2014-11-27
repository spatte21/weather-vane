'use strict';

var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var Button = require('react-bootstrap').Button;
var WeatherVaneActions = require('../actions');
var currentUserStore = require('../stores/currentUser');

var Login = React.createClass({

  mixins: [Reflux.ListenerMixin, Router.Navigation],

  getInitialState: function() {
    return {};
  },

  componentWillMount: function() {
    this.listenTo(currentUserStore, this.currentUserChanged);
  },

  currentUserChanged: function(result) {
    if (!result.error && !!result.user.token) {
      this.transitionTo('app');
    }
    else {
      this.setState({
        error: result.error
      });
    }
  },

  attemptLogin: function(event) {
    event.preventDefault();
    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    WeatherVaneActions.login({
      username: username,
      password: password
    });
  },

  render: function() {
    return <div className='container'>
      <div className='row'>
        <div className='col-md-4'>
          <h4>Please Login</h4>
          <form role='form'>
            <div className='form-group'>
              <label>Username</label>
              <input ref='username' type='text' className='form-control' placeholder='Enter Username' />
            </div>
            <div className='form-group'>
              <label>Password</label>
              <input ref='password' type='password' className='form-control' placeholder='Enter Password' />
            </div>
          { !!this.state.error ?
            <div>
              {this.state.error.message}
            </div>
            : null }
            <Button bsStyle='primary' onClick={this.attemptLogin}>Login</Button>
          </form>
        </div>
      </div>
    </div>;
  }
});

module.exports = Login;
