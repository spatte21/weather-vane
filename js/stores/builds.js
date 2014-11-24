var Reflux = require('reflux');
var Actions = require('./../actions');
var request = require('browser-request');

var buildsStore = Reflux.createStore({

  init: function() {

    this.builds = {
      list: [],
      selectedId: null
    };

    this.listenTo(Actions.refreshBuilds, this.refreshBuilds);
    this.listenTo(Actions.selectBuild, this.selectBuild);
  },

  selectBuild: function(id) {
    this.builds.selectedId = id;
    this.trigger(this.builds);
  },

  refreshBuilds: function() {
    var self = this;
    console.info('refreshBuilds action has been handled by the buildsStore');

    request('http://localhost:3000/build', function(error, response, body) {
      if (!!error) {
        console.error(error);
      }
      var data = JSON.parse(body);

      if (!!data && data.length > 0) {
        self.builds.list = data;
        if (self.builds.selectedId === null) {
          self.builds.selectedId = self.builds.list[0]._id;
        }
      }
      else {
        self.builds.list = [];
        self.builds.selectedId = null;
      }

      self.trigger(self.builds);
    });
  }

});

module.exports = buildsStore;
