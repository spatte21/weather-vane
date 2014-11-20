var React = require('react');
var GeneralTab = require('./GeneralTab.react');
var DeploymentTab = require('./DeploymentTab.react');
var TestingTab = require('./TestingTab.react');
var MessagesTab = require('./MessagesTab.react');
var TabbedArea = require('react-bootstrap').TabbedArea;
var TabPane = require('react-bootstrap').TabPane;

var BuildDetails = React.createClass({
  render: function() {
    var build = this.props.build;
    if (!build) {
      return false;
    }

    var showDeploymentPanel = !!build.deployment;
    var showTestPanel = build.tests && build.tests.length > 0;

    return <div className='build-details'>
        <h3>{build.branch}</h3>
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
