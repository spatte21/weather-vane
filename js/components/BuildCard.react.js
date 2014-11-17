var React = require('react');
var moment = require('moment');
var WeatherVaneActions = require('../actions');

var BuildCard = React.createClass({

  selectBuild: function() {
    WeatherVaneActions.selectBuild(this.props.build._id);
  },

  render: function() {
    var className = 'build-card';
    if (this.props.selected) {
      className += ' selected';
    }
    return <div className={className} onClick={this.selectBuild}>
      <div className='title'>
        <i className='fi-info'/>
        <span>{this.props.build.branch}</span>
        <span className='right'>{this.props.build.buildId}</span>
      </div>
      <p className='summary'>
        <i className='fi-clock'/>
        <span>{moment(this.props.build.startTime).fromNow()}</span>
      </p>
    </div>;
  }
});

module.exports = BuildCard;
