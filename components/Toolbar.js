var React = require('react-native');

var ToolbarStore = require('../stores/ToolbarStore');
var ToolbarActions = require('../actions/ToolbarActions');
var ViewConstraintStore = require('../stores/ViewConstraintStore');
var LocationStore = require('../stores/LocationStore');
var LocationActions = require('../actions/LocationActions');

var {
  Text,
  View,
  StyleSheet
} = React;

var __home = {
  latitude: 0.0,
  longitude: 0.0
};

module.exports = React.createClass({

  getInitialState: function () {
    return ToolbarStore.state.toolbarState;
  },

  componentDidMount: function () {
    ToolbarStore.listen(this._changeToolbarState);
    LocationStore.listen(this._setHome);
  },

  componentWillUnmount: function () {
    ToolbarStore.unlisten(this._changeToolbarState);
    LocationStore.unlisten(this._setHome);
  },

  render: function () {
    return (
      <View style={styles.toolbar}>
        <Text style={styles.toolbarButton} onPress={this._handleLeftToolbarButton}>{this.state.left}</Text>
        <Text style={styles.toolbarTitle}>Instagrannar</Text>
        <Text style={styles.toolbarButton} onPress={this._handleRightToolbarButton}>{this.state.right}</Text>
      </View>
    );
  },

  _handleLeftToolbarButton (position, caption) {
    if (this.state.left === 'Back') {
      ToolbarActions.set({ currentView: 'Home' });
    }

    if (this.state.left === 'Home') {
      LocationActions.set(__home);
      ToolbarActions.set({ currentView: 'Home' });
    }
  },

  _handleRightToolbarButton (position, caption) {
    if (this.state.right === 'Search') {
      ToolbarActions.set({ currentView: 'Search' });
    }
  },

  _changeToolbarState: function (toolbarState) {
    this.setState(toolbarState.toolbarState);
  },

  _setHome: function (home) {
    if (__home.latitude === 0.0 && __home.longitude === 0.0) {
      __home.latitude = home.location.latitude;
      __home.latitudeDelta = home.location.latitudeDelta;
      __home.longitude = home.location.longitude;
      __home.longitudeDelta = home.location.longitudeDelta;
    }
  }

});

var styles = StyleSheet.create({
  toolbar: {
    backgroundColor: '#444f5a',
    paddingTop: 30,
    paddingBottom: 10,
    marginBottom: 0,
    flexDirection: 'row',
    height: ViewConstraintStore.state.toolbarHeight
  },
  toolbarButton: {
    width: 65,
    color: '#fff',
    textAlign: 'center'
  },
  toolbarTitle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    flex: 1
  }
});
