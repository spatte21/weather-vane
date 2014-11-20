var React = require('react');
var moment = require('moment');

var TestingTab = React.createClass({
  render: function() {
    var tests = this.props.tests;

    return <div>
      <h4>Test Results</h4>
      <table>
        <thead>
          <th>Module</th>
          <th>Suite</th>
          <th>Queued</th>
          <th>Status</th>
          <th>Duration</th>
        </thead>
        <tbody>
        {tests.map(function(test) {
          var queued = moment(test.queued);
          if (test.status === 'complete') {
            var completed = moment(test.completed);
            var duration = completed.diff(queued, 'minutes') + ' minute(s)';
          }

          return <tr>
            <td>{test.module}</td>
            <td>{test.suite}</td>
            <td>{queued.fromNow()}</td>
            <td>{test.status}</td>
            <td>{duration}</td>
          </tr>;
          })}
        </tbody>
      </table>
      </div>;
  }
});

module.exports = TestingTab;
