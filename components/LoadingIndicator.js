var React = require('react-native');

var {
  StyleSheet,
  Text,
  View
} = React;

module.exports = React.createClass({

  render: function () {
    return (
      <View style={styles.loadingView}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

});

var styles = StyleSheet.create({
  loadingView: {
    alignItems: 'center',
    marginTop: 180,
    flex: 1
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
