var React = require('react-native');

var Toolbar = require('./Toolbar');
var Browser = require('./Browser');

var {
  View
} = React;

module.exports = React.createClass({

  render: function () {
    return (
      <View>
        {this._renderToolbar()}
        {this._renderBrowser()}
      </View>
    );
  },

  _renderToolbar: function () {
    return (
      <Toolbar />
    );
  },

  _renderBrowser: function () {
    return (
      <Browser />
    );
  }

});
