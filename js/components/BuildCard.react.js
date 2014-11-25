var React = require('react');
var Router = require('react-router');
var moment = require('moment');
var WeatherVaneActions = require('../actions');

var BuildCard = React.createClass({

  mixins: [Router.State, Router.Navigation],

  selectBuild: function() {
    WeatherVaneActions.selectBuild(this.props.build._id);
  },

  render: function() {
    var build = this.props.build;

    var cardClass = 'build-card';
    if (this.props.selected) {
      cardClass += ' selected';
    }

    var iconClass = 'fa fa-fw';
    switch (build.status) {
      case 'deployment queued':
        iconClass += ' fa-pause';
        break;

      case 'deploying':
        iconClass += ' fa-cog fa-spin';
        break;

      case 'tests queued':
        iconClass += ' fa-pause';
        break;

      case 'testing':
        iconClass += ' fa-spinner fa-spin';
        break;

      case 'complete':
        if (build.testResults.failures > 0) {
          cardClass += ' bg-danger';
          iconClass += ' fa-remove failure';
        }
        else {
          cardClass += ' bg-success';
          iconClass += ' fa-check success';
        }
        break;

      case 'not for testing':
        cardClass += ' bg-disabled';
        iconClass += ' fa-question';
        break;
    }

    return <div className={cardClass} onClick={this.selectBuild}>
      <div className='title'>
        <i className={iconClass}/>
        <span>{build.branch}</span>
        <span className='pull-right'>{build.buildId}</span>
      </div>
      <div className='summary status'>
        <i className='fa fa-fw fa-angle-right'/>
        <span>{build.status.capitalise()}</span>
      </div>
      <div className='summary time'>
        <i className='fa fa-fw fa-clock-o'/>
        <span>{moment(build.startTime).fromNow()}</span>
      </div>
    </div>;
  }
});

module.exports = BuildCard;
