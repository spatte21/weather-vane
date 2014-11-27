'use strict';

var Reflux = require('reflux');
var Actions = require('./../actions');
var request = require('browser-request');
var currentUser = require('../localStorage/currentUser');
var WeatherVaneActions = require('../actions');

var buildsStore = Reflux.createStore({

  init: function() {

    this.model = {
      builds: []
    };

    this.listenTo(Actions.refreshBuilds, this.onRefreshBuilds);
    this.listenTo(Actions.selectBuild, this.onSelectBuild);
    this.listenTo(Actions.testCancelled, this.cancelTest);
  },

  onRefreshBuilds: function() {
    var self = this;

    var user = currentUser.load();
    var bearerToken = user && user.token;

    if (!!bearerToken) {
      request('http://localhost:3000/build?access_token=' + bearerToken, function(error, response, body) {
        if (!!error) {
          console.log('ERROR - ', err);
        }
        else if (response.status === 401) {
          WeatherVaneActions.authenticationFailure();
        }
        else {
          var data = JSON.parse(body);
          self.model.builds = data;
          self.trigger(self.model);
        }
      });
    }
    else {
      WeatherVaneActions.authenticationFailure();
    }
  },

  onSelectBuild: function(buildId) {
    var self = this;

    var user = currentUser.load();
    var bearerToken = user && user.token;

    request('http://localhost:3000/build/' + buildId + '?access_token=' + bearerToken, function(error, response, body) {
      if (!!error) {
        console.log('ERROR - ', err);
      }
      else if (response.status === 401) {
        WeatherVaneActions.authenticationFailure();
      }
      else {
        var data = JSON.parse(body);
        self.model.selectedBuild = data;
        self.trigger(self.model);
      }
    });
  },

  cancelTest: function(testId) {
    var self = this;

    var user = currentUser.load();
    var bearerToken = user && user.token;

    request({method:'POST', url:'http://coral-reef.azurewebsites.net/test/' + testId + '/actions?access_token=' + bearerToken, json:{type:'cancelled'}}, function(error, response, body) {
      if (!!error) {
        console.log('ERROR - ', err);
      }
      else if (response.status === 401) {
        WeatherVaneActions.authenticationFailure();
      }
      else {
        self.onSelectBuild(self.model.selectedBuild._id);
      }
    });
  }

});

module.exports = buildsStore;
