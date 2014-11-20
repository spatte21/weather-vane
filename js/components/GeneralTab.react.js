var React = require('react');
var moment = require('moment');

var GeneralTab = React.createClass({

  render: function() {
    var build = this.props.build;
    var buildCompleted = moment(build.startTime);

    return <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='ro-form'>
              <div className='ro-form-item'>
                <label>Status</label>
                <div>
                  <span>{build.status}</span>
                </div>
              </div>
              <div className='ro-form-item'>
                <label>Build Id</label>
                <div>
                  <span>{build.buildId}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>;
  }

});

module.exports = GeneralTab;

//<div className='row'>
//  <div className='small-3 columns'>
//    <span>Build Id</span>
//  </div>
//  <div className='small-9 columns'>
//    <span>{build.buildId}</span>
//  </div>
//</div>
//<div className='row'>
//<div className='small-3 columns'>
//  <span>Build Completed</span>
//</div>
//<div className='small-9 columns'>
//<span>{buildCompleted.fromNow()} ({buildCompleted.format('dddd Do MMM') + ' at ' + buildCompleted.format('HH:mm:ss')})</span>
//</div>
//</div>
