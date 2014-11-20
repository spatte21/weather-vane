var React = require('react');
var moment = require('moment');

var DeploymentTab = React.createClass({

  render: function() {
    var deployment = this.props.deployment;
    var queued = moment(deployment.queued);

    return <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-12'>
          <div className='ro-form'>
            <div className='ro-form-item'>
              <label>Status</label>
              <div>
                <span>{deployment.status}
                { deployment.status === 'deploying' ?
                  <span>
                      &nbsp;({moment().diff(moment(deployment.dequeued), 'm')} mins and counting...)
                  </span>
                  : null
                }
                </span>
              </div>
            </div>
          { !!deployment.completed ?
            <div>
            <div className='ro-form-item'>
              <label>Environment</label>
              <div>
                <span>{deployment.environment} ({deployment.environmentStatus})</span>
              </div>
            </div>
            <div className='ro-form-item'>
              <label>HR Site</label>
              <div>
                <span>{deployment.hrUrl}</span>
              </div>
            </div>
            <div className='ro-form-item'>
              <label>Recruitment Site</label>
              <div>
                <span>{deployment.recruitmentUrl}</span>
              </div>
            </div>
            <div className='ro-form-item'>
              <label>Mobile Site</label>
              <div>
                <span>{deployment.mobileUrl}</span>
              </div>
            </div>
            </div>
            :
              null }
            <div className='ro-form-item'>
              <label>Snapshot Name</label>
              <div>
                <span>{deployment.snapshotName}</span>
              </div>
            </div>
            <div className='ro-form-item'>
              <label>Snapshot File</label>
              <div>
                <span>{deployment.snapshotFile}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }

});

module.exports = DeploymentTab;
