'use strict';

var React = require('react');
var Reflux = require('reflux');
var WeatherVaneActions = require('../actions');
var request = require('browser-request');
var currentUser = require('../localStorage/currentUser');
var errorStore = require('../stores/error');

var currentUserStore = Reflux.createStore({

  init: function() {

    this.user = currentUser.load();

    this.listenTo(WeatherVaneActions.login, this.login);
    this.listenTo(WeatherVaneActions.logout, this.logout);
    this.listenTo(errorStore, this.onError);
  },

  onError: function(error) {
    switch (error.type) {
      case 'authentication':
        this.user = currentUser.clear();
        break;
    }
  },

  login: function(credentials) {
    var self = this;

    request({method:'POST', url:'http://localhost:3000/login', json:credentials}, function(err, response) {

      if (!!err) {
        console.log('ERROR - ', err);
      }
      else if (response.status === 401) {
        this.user = currentUser.clear();
        self.trigger({
          user: this.user,
          error: {
            message: JSON.parse(response.response).message
          }
        });
      }
      else {
        this.user = currentUser.save(response.response);
        self.trigger({
          user: this.user
        });
      }
    });
  },

  logout: function() {
    this.user = currentUser.clear();
    this.trigger({
      user: this.user
    });
  }

});

module.exports = currentUserStore;