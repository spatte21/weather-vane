var React = require('react');
var moment = require('moment');

var DeploymentTab = React.createClass({

  render: function() {
    var deployment = this.props.deployments[0];
    var queued = moment(deployment.queued);

    return <div>
      <div className='row'>
        <div className='small-12 columns'>
          <div className='row'>
            <div className='small-3 columns'>
              <span>Status</span>
            </div>
            <div className='small-9 columns'>
              <span>{deployment.status}</span>
            </div>
          </div>
          <div className='row'>
            <div className='small-3 columns'>
              <span>Queued</span>
            </div>
            <div className='small-9 columns'>
              <span>{queued.fromNow()} ({queued.format('dddd Do MMM') + ' at ' + queued.format('HH:mm:ss')})</span>
            </div>
          </div>
          <div className='row'>
            <div className='small-3 columns'>
              <span>Snapshot Name</span>
            </div>
            <div className='small-9 columns'>
              <span>{deployment.snapshotName}</span>
            </div>
          </div>
          <div className='row'>
            <div className='small-3 columns'>
              <span>Snapshot File</span>
            </div>
            <div className='small-9 columns'>
              <span>{deployment.snapshotFile}</span>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }

});

module.exports = DeploymentTab;
