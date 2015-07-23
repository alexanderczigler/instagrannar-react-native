'use strict';

var React = require('react-native');
var Dashboard = require('./components/Dashboard');

var {
  AppRegistry
} = React;

var Instagrannar = React.createClass({
  render: function() {
    return (
      <Dashboard/>
    );
  }
});

AppRegistry.registerComponent('Instagrannar', () => Instagrannar);
