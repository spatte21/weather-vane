var Reflux = require('reflux');
var Actions = require('./../actions');
var request = require('browser-request');

var buildListStore = Reflux.createStore({

  init: function() {

    this.builds = {
      list: [],
      selectedId: undefined
    };

    this.listenTo(Actions.refreshBuildList, this.refreshBuildList);
    this.listenTo(Actions.selectBuild, this.selectBuild);
  },

  selectBuild: function(id) {
    this.builds.selectedId = id;
    this.trigger(this.builds);
  },

  refreshBuildList: function() {
    var self = this;
    request('http://coral-reef.azurewebsites.net/build', function(error, response, body) {
      if (!!error) {
        console.error(error);
      }

      var buildList = JSON.parse(body);
      if (!!buildList && buildList.length > 0) {
        self.builds.list = buildList;
        if (self.builds.selectedId === undefined) {
          self.builds.selectedId = self.builds.list[0]._id;
        }
      }
      else {
        self.builds.list = [];
        self.builds.selectedId = undefined;
      }

      self.trigger(self.builds);
    });
  }

});

Actions.refreshBuildList();

module.exports = buildListStore;
