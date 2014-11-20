var React = require('react');
var moment = require('moment');

var MessagesTab = React.createClass({
  render: function() {
    var messages = this.props.messages;

    return <div>
      <table className='table'>
        <thead>
          <th></th>
          <th>Time</th>
          <th>Date</th>
          <th>Description</th>
        </thead>
        <tbody>
        {messages.map(function(message) {
          var icon = 'fa fa-fw ';
          var rowClass;
          switch (message.type) {
            case 'info':
              icon += 'fa-info';
              break;
            case 'warning':
              icon += 'fa-question-circle';
              rowClass = 'warning';
              break;
            case 'error':
              icon += 'fa-warning';
              rowClass = 'danger';
              break;
          }

          return <tr className={rowClass}>
            <td>
              <i className={icon}/>
            </td>
            <td>{moment(message.timestamp).format('HH:mm:ss')}</td>
            <td>{moment(message.timestamp).format('ddd do MMM')}</td>
            <td>{message.description}</td>
          </tr>;
        })}
        </tbody>
      </table>
    </div>;
  }
});

module.exports = MessagesTab;
