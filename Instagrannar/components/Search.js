var React = require('react-native');
//var RNLocalSearch = require('react-native-localsearch');

var {
  Text,
  View,
  StyleSheet
} = React;

module.exports = React.createClass({

  getInitialState: function() {
    return {};
  },

  render: function() {
    return (
      <View style={styles.searchContainer}>
        <Text>search...</Text>
      </View>
    );
  }

});

var styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    height: 600
  },
});
