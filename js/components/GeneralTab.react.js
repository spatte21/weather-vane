var React = require('react');
var moment = require('moment');

var GeneralTab = React.createClass({

  render: function() {
    var build = this.props.build;
    var buildCompleted = moment(build.startTime);

    return <div>
        <div className='row'>
          <div className='small-12 columns'>
            <div className='row'>
              <div className='small-3 columns'>
                <span>Branch</span>
              </div>
              <div className='small-9 columns'>
                <span>{build.branch}</span>
              </div>
            </div>
            <div className='row'>
              <div className='small-3 columns'>
                <span>Build Id</span>
              </div>
              <div className='small-9 columns'>
                <span>{build.buildId}</span>
              </div>
            </div>
            <div className='row'>
              <div className='small-3 columns'>
                <span>Build Completed</span>
              </div>
              <div className='small-9 columns'>
                <span>{buildCompleted.fromNow()} ({buildCompleted.format('dddd Do MMM') + ' at ' + buildCompleted.format('HH:mm:ss')})</span>
              </div>
            </div>
          </div>
        </div>
      </div>;
  }

});

module.exports = GeneralTab;
