var React = require('react-native');

var LocationActions = require('../actions/LocationActions');

var {
  StyleSheet,
  MapView
} = React;

var __TimeoutId = 0;

module.exports = React.createClass({

  _regionChange: function(r) {
    if (__TimeoutId > 0) {
      clearTimeout(__TimeoutId);
    }
    __TimeoutId = setTimeout(function () {
      LocationActions.set(r);
      __TimeoutId = 0;
    }, 1500);
  },

  render: function() {
    var region = {
      latitude: 59.33389,
      longitude: 18.056288,
      latitudeDelta: 1,
      longitudeDelta: 1
    };
    return (
      <MapView style={styles.container} showsUserLocation={true} onRegionChangeComplete={this._regionChange} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
