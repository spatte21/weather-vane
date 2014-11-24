var React = require('react');
var MessagesList = require('./MessagesList.react');

var MessagesTab = React.createClass({
  render: function() {
    var messages = this.props.messages;

    return <div>
      <MessagesList messages={messages} />
    </div>;
  }
});

module.exports = MessagesTab;
