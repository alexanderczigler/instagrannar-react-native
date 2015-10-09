'use strict';

var React = require('react-native');
var Dashboard = require('./components/Dashboard');
var Orientation = require('react-native-orientation');

var {
  AppRegistry
} = React;

var Instagrannar = React.createClass({

  componentDidMount: function () {
    Orientation.shouldRotate(0); // Disable orientation.
  },

  render: function () {
    return (
      <Dashboard/>
    );
  }

});

AppRegistry.registerComponent('Instagrannar', () => Instagrannar);
