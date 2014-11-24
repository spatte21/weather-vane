var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var selectedBuildStore = require('../stores/selectedBuild');
var GeneralTab = require('./GeneralTab.react');
var DeploymentTab = require('./DeploymentTab.react');
var TestingTab = require('./TestingTab.react');
var MessagesTab = require('./MessagesTab.react');
var TabbedArea = require('react-bootstrap').TabbedArea;
var TabPane = require('react-bootstrap').TabPane;
var WeatherVaneActions = require('../actions');
var _ = require('lodash');

var BuildDetails = React.createClass({

  mixins: [Router.State, Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      build: null
    };
  },

  onSelectedBuildChanged: function(build) {
    // reduce the test results so we can display summary figures
    build.testResults = _.reduce(build.tests, function(result, test) {
      if (!!test.results && !!test.results.stats) {
        result.tests += test.results.stats.tests;
        result.passes += test.results.stats.passes;
        result.failures += test.results.stats.failures;
      }
      return result;
    }, { tests: 0, passes: 0, failures: 0});

    this.setState({
       build: build
    });
  },

  componentDidMount: function() {
    this.listenTo(selectedBuildStore, this.onSelectedBuildChanged);

    var idFromQueryString = this.getParams().id;
    if (!!idFromQueryString) {
      WeatherVaneActions.selectBuild(idFromQueryString);
    }
  },

  render: function() {
    var build = this.state.build;
    if (!build) {
     return false;
    }

    var showDeploymentPanel = !!build.deployment;
    var showTestPanel = !!build.tests && build.tests.length > 0;

    return <div className='build-details'>
      <div>
        <h3 className='title'>{build.branch}<small>{build.buildId}</small></h3>
        <div className='wee-circle failure pull-right'>
          <div className='circle circle-border'>
            <div className='circle-inner'>
              <div className='score-text'>
              {build.testResults.failures}
              </div>
            </div>
          </div>
        </div>
        <div className='wee-circle success pull-right'>
          <div className='circle circle-border'>
            <div className='circle-inner'>
              <div className='score-text'>
              {build.testResults.passes}
              </div>
            </div>
          </div>
        </div>
      </div>
      <TabbedArea defaultActiveKey={1}>
        <TabPane eventKey={1} tab='General'>
          <GeneralTab build={build} />
        </TabPane>
        <TabPane eventKey={2} tab='Deployment'>
          { showDeploymentPanel ?
          <DeploymentTab deployment={build.deployment} />
          : null }
        </TabPane>
        <TabPane eventKey={3} tab='Testing'>
          { showTestPanel ?
            <TestingTab tests={build.tests} />
            : null }
        </TabPane>
        <TabPane eventKey={4} tab='Messages'>
            <MessagesTab messages={build.messages} />
        </TabPane>
      </TabbedArea>
    </div>;
  }
});

module.exports = BuildDetails;
