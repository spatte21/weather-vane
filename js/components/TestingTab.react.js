var React = require('react');
var moment = require('moment');
var _ = require('lodash');

var TestingTab = React.createClass({
  render: function() {
    var tests = _.sortBy(this.props.tests, 'module');

    return <div>
      <table className='table test-results'>
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
            <td>{test.module.capitalise()}</td>
            <td>{test.suite.capitalise()}</td>
            <td>{test.status.capitalise()}</td>
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
