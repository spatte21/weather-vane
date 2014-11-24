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

var BuildDetails = React.createClass({

  mixins: [Router.State, Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      build: null
    };
  },

  componentDidMount: function() {
    this.listenTo(selectedBuildStore, this.onSelectedBuildChanged);
  },

  onSelectedBuildChanged: function(build) {
    this.setState({
       build: build
    });
}, 

  render: function() {
    var build = this.state.build;
    if (!build) {
     return false;
    }
    
    var showDeploymentPanel = !!build.deployment;
    var showTestPanel = !!build.tests && build.tests.length > 0;

    console.log(this.getParams());
    return <div className='build-details'>
       <h3 className='title'>{build.branch}<small>{build.buildId}</small></h3>
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
