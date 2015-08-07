var React = require('react-native');

var Map          = require('./Map');
var PictureList  = require('./PictureList');
var ToolbarStore = require('../stores/ToolbarStore');

var {
  View,
  StyleSheet
} = React;

module.exports = React.createClass({

  render: function() {
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
      <View>
        <Text>search...</Text>
      </View>
    );
  },

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
