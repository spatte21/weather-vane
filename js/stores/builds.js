var Reflux = require('reflux');
var Actions = require('./../actions');
var request = require('browser-request');

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

    request('http://coral-reef.azurewebsites.net/build', function(error, response, body) {
      if (!!error) {
        console.log('ERROR - ', err);
      }

      var data = JSON.parse(body);
      self.model.builds = data;
      self.trigger(self.model);
    });
  },

  onSelectBuild: function(buildId) {
    var self = this;

    request('http://coral-reef.azurewebsites.net/build/' + buildId, function(error, response, body) {
      if (!!error) {
        console.log('ERROR - ', err);
      }

      var data = JSON.parse(body);
      self.model.selectedBuild = data;
      self.trigger(self.model);
    });
  },

  cancelTest: function(testId) {
    var self = this;
    console.log(testId);
    request({method:'POST', url:'http://coral-reef.azurewebsites.net/test/' + testId + '/actions', json:{type:'cancelled'}}, function(error, response, body) {
      if (!error) {
        self.onSelectBuild(self.model.selectedBuild._id);
      }
    });
  }

});

module.exports = buildsStore;
