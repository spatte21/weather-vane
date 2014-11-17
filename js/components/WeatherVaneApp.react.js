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
    var builds = this.state.builds;
    var selectedBuild = this.state.selectedBuild;

    return <div className='row weather-vane'>
      { builds.length > 0 ?
        <div>
          <BuildList builds={this.state.builds} />
          <BuildDetails build={this.state.selectedBuild} />
        </div>
        :
        <div className='small-12 medium-12 no-builds'>
          <img src='/img/no_builds.jpg' />
        </div>
      }
    </div>;
  }

});

module.exports = WeatherVaneApp;
