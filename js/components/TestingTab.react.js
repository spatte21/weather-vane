var React = require('react');
var Reflux = require('reflux');
var WeatherVaneActions = require('../actions');
var moment = require('moment');
var testStore = require('../stores/test');
var _ = require('lodash');
var Button = require('react-bootstrap').Button;

var TestingTab = React.createClass({

  mixins: [Reflux.ListenerMixin],
  
  getInitialState: function() {
    return {
      tests: [],
      selectedTestId: null
    };
  },

  componentWillMount: function() {
    this.setState({
      tests: this.props.tests,
      selectedTestId: null
    });
  },

  componentDidMount: function() {
    this.listenTo(testStore, this.testCancelled);
  },

  componentWillReceiveProps: function() {
    this.setState({
      tests: this.props.tests
    });
  },

  clickTestSuite: function(testId) {
    this.setState({
      selectedTestId: testId
    });
  },

  cancelTest: function(testId, event) {
    console.log('cancelTest handler');
    WeatherVaneActions.testCancelled(testId);
    event.preventDefault();
  },

  testCancelled: function() {
    console.log('test has been cancelled');
  },

  showAllTestSuites: function(event) {
    this.setState({
      selectedTestId: null
    });
    event.preventDefault();
  },

  render: function() {
    var tests = _.sortBy(this.state.tests, 'module');
    if (!!this.state.selectedTestId) {
      tests = _.where(tests, { _id: this.state.selectedTestId});
    }

    var testRows = tests.map(function(test) {
      var rowClass = 'test-result';
      var queued = moment(test.queued);

      if (test.status === 'complete') {
        var completed = moment(test.completed);
        var duration = completed.diff(queued, 'minutes') + ' minute(s)';
      }

      if (!!test.results && !!test.results.stats) {
        var tests = test.results.stats.tests;
        var passes = test.results.stats.passes;
        var fails = test.results.stats.failures;

        if (fails > 0) {
          rowClass += ' bg-danger';
        }
        else if (passes > 0) {
          rowClass += ' bg-success';
        }
      }

      return <tr className={rowClass} key={test._id} onClick={this.clickTestSuite.bind(this, test._id)}>
        <td>{test.module.capitalise()}</td>
        <td>{test.suite}</td>
        <td>{test.status.capitalise()}</td>
        <td>{duration}</td>
        <td>{tests}</td>
        <td>{passes}</td>
        <td>{fails}</td>
        <td>
        { !_.contains(['complete', 'cancelled'], test.status) ? 
          <Button bsStyle='warning' bsSize='xsmall' onClick={this.cancelTest.bind(this, test._id)}>Cancel</Button>
        : null }
        </td>
      </tr>;
    }.bind(this));

    var testCases = [];
    if (!!this.state.selectedTestId && tests.length > 0 && !!tests[0].results.tests) {
      testCases = tests[0].results.tests.map(function(test) {
        return <tr>
          <td>{test.name}</td>
          <td>{test.status}</td>
          <td>{test.duration}</td>
          <td>{test.err.message || ''}</td>
        </tr>
      });
    }

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
          <th></th>
        </thead>
        <tbody>
        {testRows}
        </tbody>
      </table>
    { !!this.state.selectedTestId ?
      <a href='#' onClick={this.showAllTestSuites}>&lt; Show all test suites</a>
        : null }
    { !!this.state.selectedTestId && tests.length > 0 && !!tests[0].results.tests ?
      <div>
        <table className='table table-condensed'>
          <thead>
            <th>Name</th>
            <th>Status</th>
            <th>Duration (ms)</th>
            <th>Error Message</th>
          </thead>
          <tbody>
            {testCases}
          </tbody>
        </table>
      </div>
      : null }
    </div>;
  }
});

module.exports = TestingTab;
