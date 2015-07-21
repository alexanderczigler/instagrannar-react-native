var React = require('react-native');
var {
  Text,
  View,
  StyleSheet
} = React;

module.exports = React.createClass({
  render: function () {
    return (
      <Text style={styles.hashtagText}>#{this.props.tag}</Text>
    );
  }
});

var styles = StyleSheet.create({
  hashtagText: {
    fontSize: 10
  }
});
