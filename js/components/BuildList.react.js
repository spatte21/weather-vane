var React = require('react');
var BuildCard = require('./BuildCard.react');

var BuildList = React.createClass({
  render: function() {
    var builds = this.props.builds;
    var list = builds.list || [];

    return <div className='small-3 medium-3 column build-list'>
        <input type='text' placeholder='Search for build' />
        <div>
          <ul>
            {list.map(function (build) {
              return <li>
                <BuildCard build={build} selected={build._id === builds.selectedId} />
              </li>
            })}
          </ul>
        </div>
      </div>;
  }
});

module.exports = BuildList;
