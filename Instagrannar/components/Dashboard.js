var React = require('react-native');

var Map = require('./Map');
var Toolbar = require('./Toolbar');
var PictureList = require('./PictureList');

var {
  View,
  StyleSheet
} = React;

module.exports = React.createClass({

  render: function() {
    return (
      <View>
        {this._renderToolbar()}
        {this._renderPictureListView()}
        {this._renderMapContainer()}
      </View>
    );
  },

  _renderToolbar: function() {
    return (
      <Toolbar />
    );
  },

  _renderPictureListView: function() {
    return (
      <View style={styles.pictureListContainer}>
        <PictureList />
      </View>
    );
  },

  _renderMapContainer: function() {
    return (
      <View style={styles.mapContainer}>
        <Map />
      </View>
    );
  }
});

var styles = StyleSheet.create({
    pictureListContainer: {
      flexDirection:'row',
      height: 388,
    },
    mapContainer: {
      flexDirection:'row',
      height: 220
    }
});
