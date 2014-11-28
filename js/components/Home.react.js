var React = require('react');
var Reflux = require('reflux');
var buildsStore = require('../stores/builds');
var WeatherVaneActions = require('../actions');
var _ = require('lodash');
var moment = require('moment');

function getForecastSymbols(failures, size) {
  var symbols = {};

  if (size === 'large') {
    size = '256x256';
  }
  else {
    size = '128x128';
  }

  if (failures === 0) {
    symbols.foreground = 'img/PNGs_' + size + '/wsymbol_0001_sunny.png';
    symbols.background = 'sunny';
  }
  else if (failures === 1) {
    symbols.foreground = 'img/PNGs_' + size + '/wsymbol_0002_sunny_intervals.png';
    symbols.background = 'sunny';
  }
  else if (failures <= 3) {
    symbols.foreground = 'img/PNGs_' + size + '/wsymbol_0003_white_cloud.png';
    symbols.background = 'cloudy';
  }
  else if (failures <= 5) {
    symbols.foreground = 'img/PNGs_' + size + '/wsymbol_0004_black_low_cloud.png';
    symbols.background = 'cloudy';
  }
  else if (failures <= 10) {
    symbols.foreground = 'img/PNGs_' + size + '/wsymbol_0033_cloudy_with_light_rain_night.png';
    symbols.background = 'rainy';
  }
  else if (failures <= 25) {
    symbols.foreground = 'img/PNGs_' + size + '/wsymbol_0018_cloudy_with_heavy_rain.png';
    symbols.background = 'rainy';
  }
  else if (failures <= 50) {
    symbols.foreground = 'img/PNGs_' + size + '/wsymbol_0040_thunderstorms_night.png';
    symbols.background = 'stormy';
  }
  else if (failures <= 100) {
    symbols.foreground = 'img/PNGs_' + size + '/wsymbol_0072_blizzard_night.png';
    symbols.background = 'stormy';
  }
  else {
    symbols.foreground = 'img/PNGs_' + size + '/wsymbol_0091_volcanic_ash.png';
    symbols.background = 'stormy';
  }
  
  return symbols;
}

var Home = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      builds: [],
      selectedBuild: null
    };
  },

  componentWillMount: function() {
    this.listenTo(buildsStore, this.onBuildsChange);
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
      builds: builds.builds
    });
  },

  render: function() {

    if (this.state.builds.length < 1) {
      return null;
    }

    var builds = _.where(this.state.builds, {status:'complete'}).slice(0, 5);

    var backgroundClass = 'container-fluid display-height ' + getForecastSymbols(builds[0].testResults.failures, 'large').background;

    return <div className='container-fluid home'>
      <div className='row'>
        <div className='col-md-12'>
          <div className={backgroundClass}>
            <div className='row bottom-margin'>
              <div className='col-md-12 text-center'>
                <h1>Today's 5 Build Forecast</h1>
              </div>
            </div>
            <div className='row text-center'>
              <div className='col-md-4'>
                <div className='row'>
                  <div className='col-md-12'>
                    <h2>{builds[0].branch}</h2>
                    <h3>{builds[0].buildId}</h3>
                    <h5>{moment(builds[0].startTime).fromNow()}</h5>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-md-12'>
                    <img src={getForecastSymbols(builds[0].testResults.failures, 'large').foreground } />
                  </div>
                </div>
                <div className='row results-latest'>
                  <div className='col-md-12'>
                    <h3>{builds[0].testResults.failures} fails</h3>
                    <h4>{builds[0].testResults.tests} tests</h4>
                  </div>
                </div>
              </div>
              <div className='col-md-8 top-margin'>
                <div className='row text-center'>
                  {builds.slice(1,5).map(function(build) {
                  return <div key={build._id} className='col-md-3'>
                    <div className='row'>
                      <div className='col-md-12'>
                        <h3>{build.branch}</h3>
                        <h5>{build.buildId}</h5>
                        <h6>{moment(build.startTime).fromNow()}</h6>
                      </div>
                    </div>
                    <div className='row'>
                      <div className='col-md-12'>
                        <img src={getForecastSymbols(build.testResults.failures, 'small').foreground } />
                      </div>
                    </div>
                    <div className='row results-previous'>
                      <div className='col-md-12'>
                        <h4>{build.testResults.failures} fails</h4>
                        <h5>{build.testResults.tests} tests</h5>
                      </div>
                    </div>
                  </div>;
                })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;  
  }
});

module.exports = Home;
