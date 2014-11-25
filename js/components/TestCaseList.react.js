var React = require('react');

var TestCasesList = React.createClass({

  render: function() {
    var testCases = this.props.testCases;

    return <div>
      <table className='table table-condensed'>
        <thead>
          <th>Name</th>
          <th>Status</th>
          <th>Duration (ms)</th>
          <th>Error Message</th>
        </thead>
        <tbody>
        { testCases.map(function (testCase) {
          return <tr>
            <td>{testCase.name}</td>
            <td>{testCase.status}</td>
            <td>{testCase.duration}</td>
            <td>{testCase.err.message || ''}</td>
          </tr>;
          })
        }
        </tbody>
      </table>
    </div>;
  }
});

module.exports = TestCasesList;
