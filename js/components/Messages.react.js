var React = require('react');
var Reflux = require('reflux');
//var BuildCard = require('./BuildCard.react');
//var BuildDetails = require('./BuildDetails.react');
//var buildsStore = require('../stores/builds');
var WeatherVaneActions = require('../actions');
var _ = require('lodash');

var Messages = React.createClass({

  //mixins: [Reflux.ListenerMixin],
  //
  //getInitialState: function() {
  //  return {
  //    builds: []
  //  };
  //},
  //
  //componentDidMount: function() {
  //  this.listenTo(buildsStore, this.onBuildsChange);
  //  setInterval(function() {
  //    WeatherVaneActions.refreshBuilds();
  //  }, 10000);
  //},
  //
  //onBuildsChange: function(builds) {
  //  this.setState({
  //    builds: builds
  //  });
  //},

  render: function() {

//    var builds = this.state.builds;
    console.log('Rendering messages component');

    return <div>ya message page</div>;

    //return <div>
    //  <div className='small-3 medium-3 column'>
    //    <div className='build-list'>
    //      <input type='text' placeholder='Search for build' />
    //      <div>
    //        <ul>
    //          {builds.map(function (build) {
    //            return <li>
    //              <BuildCard build={build} selected={true} />
    //            </li>
    //          })}
    //        </ul>
    //      </div>
    //    </div>
    //  </div>
    //  <div className='small-9 medium-9 column'>
    //    <BuildDetails build={_.first(builds)} />
    //  </div>
    //</div>;

  }
});

module.exports = Messages;
