var React = require('react-native');

var LocationStore   = require('../stores/LocationStore');
var LocationActions = require('../actions/LocationActions');

var {
  StyleSheet,
  MapView
} = React;

var __TimeoutId = 0;

module.exports = React.createClass({

  getInitialState: function() {
    return LocationStore.state;
  },

  render: function() {
    if (this.state.location.showUserLocation) {
      return (
        <MapView style={styles.container} showsUserLocation={true} onRegionChangeComplete={this._regionChange} />
      );
    }
    else {
      var region = {
        latitude: this.state.location.latitude,
        longitude: this.state.location.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
      return (
        <MapView style={styles.container} region={region} onRegionChangeComplete={this._regionChange} />
      );
    }

  },

  _regionChange: function(r) {
    if (__TimeoutId > 0) {
      clearTimeout(__TimeoutId);
    }
    __TimeoutId = setTimeout(function () {
      LocationActions.set(r);
      __TimeoutId = 0;
    }, 1500);
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
