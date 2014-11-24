var React = require('react');
var moment = require('moment');
var MessagesList = require('./MessagesList.react');
var _ = require('lodash');

var GeneralTab = React.createClass({

  render: function() {
    var build = this.props.build;
    var buildCompleted = moment(build.startTime);
    var latestMessage = _.findLast(_.sortBy(build.messages,'timestamp'));

    return <div className='container-fluid'>
        <div className='row'>
          <div className='col-md-12'>
            <div className='ro-form'>
              <div className='ro-form-item'>
                <label>Status</label>
                <div>
                  <span>{build.status.capitalise()}</span>
                </div>
              </div>
              <div className='ro-form-item'>
                <label>Latest Message</label>
                <div>
                  {latestMessage.description + ' (' + moment(latestMessage.timestamp).fromNow() + ')'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>;
  }

});

module.exports = GeneralTab;
