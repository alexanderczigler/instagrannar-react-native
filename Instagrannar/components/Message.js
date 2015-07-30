var React           = require('react-native');

var {
  StyleSheet,
  Text,
  View,
} = React;

module.exports = React.createClass({

  render: function() {
    return (
      <View style={styles.messageView}>
        <Text style={styles.messageHeader}>{this.props.header}</Text>
        <Text style={styles.messageBody}>{this.props.body}</Text>
      </View>
    );
  }

});

var styles = StyleSheet.create({
  messageView: {
    alignItems: 'center',
    marginTop: 180,
    flex: 1
  },
  messageHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  messageBody: {
    fontSize: 16,
    textAlign: 'center'
  }
});
