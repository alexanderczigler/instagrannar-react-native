var React = require('react-native');

var Map          = require('./Map');
var PictureList  = require('./PictureList');
var ToolbarStore = require('../stores/ToolbarStore');

var {
  View,
  Text,
  StyleSheet
} = React;

module.exports = React.createClass({

  getInitialState: function() {
    return ToolbarStore.state.toolbarState;
  },

  componentDidMount: function() {
    ToolbarStore.listen(this._changeToolbarState);
  },

  componentWillUnmount: function () {
    ToolbarStore.unlisten(this._changeToolbarState);
  },

  render: function() {
    if (this.state.currentView === 'Search') {
      return this._renderSearch();
    }

    return this._renderListAndMap();
  },

  _renderListAndMap: function() {
    return (
      <View>
        <View style={styles.pictureListContainer}>
          <PictureList />
        </View>
        <View style={styles.mapContainer}>
          <Map />
        </View>
      </View>
    );
  },

  _renderSearch: function() {
    return (
      <View style={styles.searchContainer}>
        <Text>search...</Text>
      </View>
    );
  },

  _changeToolbarState: function(toolbarState) {
    this.setState(toolbarState.toolbarState, function () {
      //console.log('setState callback!', this.state);
    });
  }

});

var styles = StyleSheet.create({
    searchContainer: {
      flexDirection: 'row',
      height: 600
    },
    pictureListContainer: {
      flexDirection:'row',
      height: 388,
    },
    mapContainer: {
      flexDirection:'row',
      height: 220
    }
});
