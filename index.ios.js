'use strict';

var React = require('react-native');
var Dashboard = require('./components/Dashboard');
var Orientation = require('react-native-orientation');

var {
  AppRegistry
} = React;

var Instagrannar = React.createClass({

  componentDidMount: function () {
    try {
      console.log(Orientation);
      Orientation.lockToPortrait();
    } catch (e) {
      console.log('ERROR', 'Unable to lock rotation.');
    }
  },

  render: function () {
    return (
      <Dashboard/>
    );
  }

});

AppRegistry.registerComponent('Instagrannar', () => Instagrannar);
