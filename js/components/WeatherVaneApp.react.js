var React = require('react');
var Reflux = require('reflux');
var BuildList = require('./BuildList.react');
var BuildDetails = require('./BuildDetails.react');
var buildListStore = require('../stores/buildListStore');
var buildSelectedStore = require('../stores/buildSelectedStore');
var WeatherVaneActions = require('../actions');

var WeatherVaneApp = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      buildList: [],
      selectedBuild: {}
    };
  },

  componentDidMount: function() {
    this.listenTo(buildListStore, this.onBuildListChange);
    this.listenTo(buildSelectedStore, this.onBuildSelectedChange);
    setInterval(function() {
      WeatherVaneActions.refreshBuildList();
    }, 10000);
  },

  onBuildListChange: function(buildList) {
    this.setState({
      buildList: buildList
    });
  },

  onBuildSelectedChange: function(build) {
    this.setState({
      selectedBuild: build
    });
  },

  render: function() {
    var buildList = this.state.buildList;
    var selectedBuild = this.state.selectedBuild;

    return <div className='row weather-vane'>
      <div>
        <BuildList builds={buildList} />
        <BuildDetails build={selectedBuild} />
      </div>
    </div>;
  }

});

module.exports = WeatherVaneApp;
