var React = require('react-native');

var PixelRatio = require('PixelRatio');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var ViewConstraintStore = require('../stores/ViewConstraintStore');

var __D = 64;

var {
  View,
  StyleSheet
} = React;

module.exports = React.createClass({
  render: function () {
    return (
      <View style={styles.circle} />
    );
  }
});

var styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    bottom: (ViewConstraintStore.state.mapHeight / 2) - (__D / 2),
    left: (width / 2) - (__D / 2),
    backgroundColor: '#000000',
    height: __D,
    width: __D,
    borderRadius: __D / PixelRatio.get(),
    opacity: 0.3
  }
});
