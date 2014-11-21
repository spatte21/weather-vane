var React = require('react');
var moment = require('moment');
var WeatherVaneActions = require('../actions');

var BuildCard = React.createClass({

  selectBuild: function() {
    WeatherVaneActions.selectBuild(this.props.build._id);
  },

  render: function() {
    var build = this.props.build;

    var cardClass = 'build-card';
    if (build.selected) {
      cardClass += ' selected';
    }

    var iconClass = 'fa fa-fw';
    switch (build.status) {
      case: 'deployment queued':
        iconClass += ' fa-pause';
        break;

      case: 'deploying':
        iconClass += ' fa-cog fa-spin';
        break;

      case: 'tests queued':
        iconClass += ' fa-pause';
        break;

      case: 'testing':
        iconClass += ' fa-spinner fa-spin';
        break;

      case: 'complete':
        iconClass += ' fa-check';
        break;

      case: 'not for testing':
        iconClass += ' fa-minus';
        break;
    }

    return <div className={cardClass} onClick={this.selectBuild}>
      <div className='title'>
        <i className={iconClass}/>
        <span>{this.props.build.branch}</span>
        <span className='pull-right'>{this.props.build.buildId}</span>
      </div>
      <p className='summary'>
        <i className='fi-clock'/>
        <span>{moment(this.props.build.startTime).fromNow()}</span>
      </p>
    </div>;
  }
});

module.exports = BuildCard;
