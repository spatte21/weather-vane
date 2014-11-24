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
     builds: {
      list: [],
      selectedId: null
     }
   };
  },
  
  componentDidMount: function() {
    this.listenTo(filteredBuildsStore, this.onBuildsChange);
    this.intervalId = setInterval(function() {
       WeatherVaneActions.refreshBuilds();
    }, 30000);
    WeatherVaneActions.refreshBuilds();
  },

  componentWillUnmount: function() {
    clearInterval(this.intervalId);
  },

  onBuildsChange: function(builds) {
    this.setState({
       builds: builds
    });
  },

  filterBuilds: function(event) {
    var filter = event.target.value;
    WeatherVaneActions.buildsFilterChanged(filter);
  },

  render: function() {

    var builds = this.state.builds;
    var selectedBuild;
    if (!!builds.selectedId) {
      selectedBuild = _.find(builds.list, {_id: builds.selectedId});
    }

    return <div className='container'>
      <div className='row'>
        <div className='col-md-3'>
          <div className='build-list'>
            <div className='text-center'>
              <input type='text' placeholder='Search for build or branch' ref='filterBox' onChange={this.filterBuilds} />
            </div>
            <div>
              <ul>
                {builds.list.map(function (build) {
                  return <li key={build._id}>
                    <BuildCard build={build} selected={build._id == builds.selectedId} />
                  </li>
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className='col-md-9'>
          <RouteHandler />
        </div>
      </div>
    </div>;
  }

});

module.exports = Builds;
