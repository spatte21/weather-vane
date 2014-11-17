var Reflux = require('reflux');
var request = require('browser-request');
var buildListStore = require('./buildListStore');

var buildSelectedStore = Reflux.createStore({

  init: function() {
    this.build = {};
    this.listenTo(buildListStore, this.refreshSelectedBuild);
  },

  refreshSelectedBuild: function(builds) {
    var self = this;
    if (!!builds.selectedId) {
      request('http://coral-reef.azurewebsites.net/build/' + builds.selectedId, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          self.build = JSON.parse(body);
          self.trigger(self.build);
        }
      });
    }
  }

});

module.exports = buildSelectedStore;