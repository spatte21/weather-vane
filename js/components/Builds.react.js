var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;
var BuildCard = require('./BuildCard.react');
var BuildDetails = require('./BuildDetails.react');
var filteredBuildsStore = require('../stores/filteredBuilds');
var WeatherVaneActions = require('../actions');
var _ = require('lodash');

var Builds = React.createClass({

  mixins: [Reflux.ListenerMixin],
  
  getInitialState: function() {
    return {
      builds: [],
      selectedBuild: null
    };
  },

  componentWillMount: function() {
    this.listenTo(filteredBuildsStore, this.onBuildsChange);
  },

  componentDidMount: function() {
    this.intervalId = setInterval(function() {
       WeatherVaneActions.refreshBuilds();
    }, 20000);

    WeatherVaneActions.refreshBuilds();
  },

  componentWillUnmount: function() {
    clearInterval(this.intervalId);
  },

  onBuildsChange: function(builds) {
    this.setState({
      builds: builds.builds,
      selectedBuild: builds.selectedBuild
    });
  },

  filterBuilds: function(event) {
    var filter = event.target.value;
    WeatherVaneActions.buildsFilterChanged(filter);
  },

  render: function() {

    var builds = this.state.builds;
    var selectedBuild = this.state.selectedBuild;

    if (!builds) {
      return null;
    }

    return <div className='container full-height'>
      <div className='row full-height'>
        <div className='col-md-3 full-height'>
          <div className='build-list full-height'>
            <div className='text-center'>
              <input type='text' placeholder='Search for build or branch' ref='filterBox' onChange={this.filterBuilds} />
            </div>
            <div>
              <ul>
                {builds.map(function (build) {
                  return <li key={build._id}>
                    <BuildCard build={build} selected={selectedBuild && selectedBuild._id === build._id} />
                  </li>
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className='col-md-9'>
          <BuildDetails build={selectedBuild} />
        </div>
      </div>
    </div>;
  }

});

module.exports = Builds;
