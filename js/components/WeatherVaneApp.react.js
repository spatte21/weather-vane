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
      builds: [],
      selectedBuild: {}
    };
  },

  componentDidMount: function() {
    this.listenTo(buildListStore, this.onBuildListChange);
    this.listenTo(buildSelectedStore, this.onBuildSelectedChange);
    setInterval(function() {
      WeatherVaneActions.refreshBuildList();
    }, 5000);
  },

  onBuildListChange: function(buildList) {
    this.setState({
      builds: buildList
    });
  },

  onBuildSelectedChange: function(build) {
    this.setState({
      selectedBuild: build
    });
  },

  render: function() {
    return <div className='row weather-vane'>
      <BuildList builds={this.state.builds} />
      <BuildDetails build={this.state.selectedBuild} />
    </div>;
  }

});

module.exports = WeatherVaneApp;
