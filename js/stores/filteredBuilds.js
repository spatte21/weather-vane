var Reflux = require('reflux');
var Actions = require('./../actions');
var request = require('browser-request');
var buildListStore = require('./builds');
var _ = require('lodash');

var filteredBuildsStore = Reflux.createStore({

  init: function() {

    this.filter = '';

    this.builds = {
      list: [],
      selectedId: null
    };

    this.listenTo(buildListStore, this.buildListRefreshed);
    this.listenTo(Actions.buildsFilterChanged, this.filterBuilds);
  },

  buildListRefreshed: function(builds) {
    this.builds = builds;
    this.filterBuilds(this.filter);
  },

  filterBuilds: function(filter) {
    var self = this;
    self.filter = filter;

    var filteredBuilds = _.where(this.builds.list, function(build) {
      return self.filter === '' || build.buildId.indexOf(self.filter) >= 0 || build.branch.indexOf(self.filter) >= 0;
    });

    self.trigger({
      list: filteredBuilds,
      selectedId: self.builds.selectedId
    });
  }

});

module.exports = filteredBuildsStore;
