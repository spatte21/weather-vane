var React = require('react');
var Reflux = require('reflux');
var Router = require('react-router');
var Link = Router.Link;
var Builds = require('./Builds.react');

var WeatherVaneApp = React.createClass({

  mixins: [Reflux.ListenerMixin],

  render: function() {

    return <div>
      <nav className="top-bar" data-topbar role="navigation">
        <ul className="title-area">
          <li className="name">
            <h1><a href="#">Weather Vane</a></h1>
          </li>
        </ul>
        <section className='top-bar-section'>
          <ul className='left'>
            <li><Link to='app'>Builds</Link></li>
            <li><Link to='queues'>Queues</Link></li>
            <li><Link to='messages'>Messages</Link></li>
          </ul>
        </section>
      </nav>
      <div className='row weather-vane'>
        <this.props.activeRouteHandler />
      </div>
    </div>;
  }

});

module.exports = WeatherVaneApp;

//<div>
//  <BuildList builds={buildList} />
//  <BuildDetails build={selectedBuild} />
//</div>
