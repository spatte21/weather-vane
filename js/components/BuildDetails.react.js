var React = require('react');
var Router = require('react-router');
var Reflux = require('reflux');
var buildsStore = require('../stores/builds');
var GeneralTab = require('./GeneralTab.react');
var DeploymentTab = require('./DeploymentTab.react');
var TestingTab = require('./TestingTab.react');
var MessagesTab = require('./MessagesTab.react');
var PassFailIndicator = require('./PassFailIndicator.react');
var TabbedArea = require('react-bootstrap').TabbedArea;
var TabPane = require('react-bootstrap').TabPane;
var WeatherVaneActions = require('../actions');
var _ = require('lodash');

var BuildDetails = React.createClass({

  mixins: [Router.State, Reflux.ListenerMixin],

  render: function() {
    var build = this.props.build;
    if (!build) {
     return false;
    }

    if (!!build.tests) {
      // reduce the test results so we can display summary figures
      build.testResults = _.reduce(build.tests, function (result, test) {
        if (!!test.results && !!test.results.stats) {
          result.tests += test.results.stats.tests;
          result.passes += test.results.stats.passes;
          result.failures += test.results.stats.failures;
        }
        return result;
      }, {tests: 0, passes: 0, failures: 0});
    }

    var showDeploymentPanel = !!build.deployment;
    var showTestPanel = !!build.tests && build.tests.length > 0;

    return <div className='build-details'>
      <div>
        <h3 className='title'>{build.branch}<small>{build.buildId}</small></h3>
      { _.contains(['testing','complete'], build.status) ?
        <PassFailIndicator passes={build.testResults.passes} failures={build.testResults.failures} />
          : null }
      </div>
      <TabbedArea defaultActiveKey={1}>
        <TabPane eventKey={1} tab='General'>
          <GeneralTab build={build} />
        </TabPane>
        { showDeploymentPanel ?
        <TabPane eventKey={2} tab='Deployment'>
          <DeploymentTab deployment={build.deployment} />
        </TabPane>
        : null }
        { showTestPanel ?
        <TabPane eventKey={3} tab='Testing'>
            <TestingTab tests={build.tests} />
        </TabPane>
        : null }
        <TabPane eventKey={4} tab='Messages'>
            <MessagesTab messages={build.messages} />
        </TabPane>
      </TabbedArea>
    </div>;
  }
});

module.exports = BuildDetails;
