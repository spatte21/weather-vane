var React = require('react');
var Reflux = require('reflux');
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
   setInterval(function() {
     WeatherVaneActions.refreshBuilds();
   }, 30000);
  },
  
  onBuildsChange: function(builds) {
    console.info('we got ', builds);
   this.setState({
     builds: builds
   });
  },

  filterBuilds: function(event) {
//    var filter = this.refs.filterBox.getDOMNode().value;
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
              <input type='text' placeholder='Search for build' ref='filterBox' onChange={this.filterBuilds} />
              <button type='button' onClick={this.filterBuilds}>Search</button>
            </div>  
            <div>
              <ul>
                {builds.list.map(function (build) {
                  return <li>
                    <BuildCard build={build} selected={build._id === builds.selectedId} />
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
