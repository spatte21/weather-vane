var React = require('react');
var GeneralTab = require('./GeneralTab.react');
var DeploymentTab = require('./DeploymentTab.react');
var TestingTab = require('./TestingTab.react');

var BuildDetails = React.createClass({
  render: function() {
    var build = this.props.build;
    var showDeploymentPanel = build.deployments && build.deployments.length > 0;
    var showTestPanel = build.tests && build.tests.length > 0;

    return <div className='build-details small-9 medium-9 column'>
        <h3>{build.branch}</h3>
        <dl className='tabs' data-tab>
          <dd className='active'>
            <a href='#panelGeneral'>General</a>
          </dd>
          { showDeploymentPanel ?
          <dd>
            <a href='#panelDeployment'>Deployment</a>
          </dd>
            : null }
          { showTestPanel ?
          <dd>
            <a href='#panelTests'>Tests</a>
          </dd>
            : null }
        </dl>
        <div className="tabs-content">
          <div className="content active" id="panelGeneral">
            <GeneralTab build={build} />
          </div>
          { showDeploymentPanel ?
          <div className="content" id="panelDeployment">
            <DeploymentTab deployments={build.deployments} />
          </div>
            : null }
          { showTestPanel ?
          <div className="content" id="panelTests">
            <TestingTab test={build.tests} />
          </div>
            : null }
        </div>
      </div>;
  }
});

module.exports = BuildDetails;
