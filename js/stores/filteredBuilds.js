var Reflux = require('reflux');
var Actions = require('./../actions');
var request = require('browser-request');
var buildsStore = require('./builds');
var _ = require('lodash');

var filteredBuildsStore = Reflux.createStore({

  init: function() {

    this.filter = '';
    this.buildsModel = {};

    this.listenTo(buildsStore, this.onBuildsRefreshed);
    this.listenTo(Actions.buildsFilterChanged, this.onBuildsFilterChanged);
  },

  onBuildsRefreshed: function(buildsModel) {
    this.buildsModel = buildsModel;
    this.onBuildsFilterChanged(this.filter);
  },

  onBuildsFilterChanged: function(filter) {
    var self = this;
    self.filter = filter;

    var filteredBuilds = _.where(this.buildsModel.builds, function(build) {
      return self.filter === '' || build.buildId.indexOf(self.filter) >= 0 || build.branch.indexOf(self.filter) >= 0;
    });

    self.trigger({
      builds: filteredBuilds,
      selectedBuild: self.buildsModel.selectedBuild
    });
  }

});

module.exports = filteredBuildsStore;
