var React = require('react');
var Reflux = require('reflux');
var BuildCard = require('./BuildCard.react');
var BuildDetails = require('./BuildDetails.react');
var buildsStore = require('../stores/builds');
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
   this.listenTo(buildsStore, this.onBuildsChange);
   setInterval(function() {
     WeatherVaneActions.refreshBuilds();
   }, 30000);
  },
  
  onBuildsChange: function(builds) {
   this.setState({
     builds: builds
   });
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
              <input type='text' placeholder='Search for build' />
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
