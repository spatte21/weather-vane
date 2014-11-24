var React = require('react');

var PassFailIndicator = React.createClass({

  render: function() {
    var passes = this.props.passes || 0;
    var failures = this.props.failures || 0;

    return <div className='pass-fail-indicator pull-right'>
    { passes > 0 ?
      <div className='indicator success'>
        <div className='circle circle-border bg-success'>
          <div className='circle-inner'>
            <div className='score-text'>
              {passes}
            </div>
          </div>
        </div>
      </div>
        : null }
    { failures > 0 ?
      <div className='indicator failure'>
        <div className='circle circle-border bg-danger'>
          <div className='circle-inner'>
            <div className='score-text'>
              {failures}
            </div>
          </div>
        </div>
      </div>
         : null }
    </div>;
  }
});

module.exports = PassFailIndicator;
