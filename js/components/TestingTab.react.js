var React = require('react');
var moment = require('moment');

var TestingTab = React.createClass({
  render: function() {
    var tests = this.props.test;

    return <div>
      <b>Test Results</b>
      <table className='test-result-list'>
        <thead>
          <th>Module</th>
          <th>Suite</th>
          <th>Status</th>
          <th>Duration</th>
          <th>Tests</th>
          <th>Passed</th>
          <th>Failed</th>
        </thead>
        <tbody>
        {tests.map(function(test) {
          var queued = moment(test.queued);
          if (test.status === 'complete') {
            var completed = moment(test.completed);
            var duration = completed.diff(queued, 'minutes') + ' minute(s)';
          }
          if (!!test.results && !!test.results.stats) {
            var tests = test.results.stats.tests;
            var passes = test.results.stats.passes;
            var fails = test.results.stats.failures;
            var results = test.results;
          }

          return <tr className='test-result' key={test._id} >
            <td>{test.module}</td>
            <td>{test.suite}</td>
            <td>{test.status}</td>
            <td>{duration}</td>
            <td>{tests}</td>
            <td>{passes}</td>
            <td>{fails}</td>
          </tr>;
          })}
        </tbody>
      </table>
    </div>;
  }
});

module.exports = TestingTab;
