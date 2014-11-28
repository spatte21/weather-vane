var React = require('react');
var _ = require('lodash');

var TestCasesList = React.createClass({

  render: function() {
    var testCases = this.props.testCases;

    var rows = _.map(_.sortBy(testCases, 'status'), function (testCase) {
      var imageClass = 'fa fa-fw';
      if (testCase.status.toLowerCase().indexOf('pass') >= 0) {
        imageClass += ' fa-check success';
      }
      else {
        imageClass += ' fa-remove failure';
      }

      return <tr>
        <td><i className={imageClass}/></td>
        <td>{testCase.name}</td>
        <td>{testCase.status.capitalise()}</td>
        <td>{testCase.err.message || ''}</td>
      </tr>;
    });

    return <div>
      <table className='table table-condensed'>
        <thead>
          <th></th>
          <th>Name</th>
          <th>Status</th>
          <th>Error Message</th>
        </thead>
        <tbody>
        {rows}
        </tbody>
      </table>
    </div>;
  }
});

module.exports = TestCasesList;
