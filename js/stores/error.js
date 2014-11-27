'use strict';

var React = require('react');
var Reflux = require('reflux');
var WeatherVaneActions = require('../actions');

var errorStore = Reflux.createStore({

  init: function() {
    this.listenTo(WeatherVaneActions.authenticationFailure, this.authenticationFailure);
  },

  authenticationFailure: function() {
    this.trigger({
      type: 'authentication'
    });
  }

});

module.exports = errorStore;