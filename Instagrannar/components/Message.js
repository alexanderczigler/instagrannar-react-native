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
        <View style={styles.messageWrap}>
          <Text style={styles.messageHeader}>{this.props.header}</Text>
          <Text style={styles.messageBody}>{this.props.body}</Text>
        </View>
      </View>
    );
  }

});

var styles = StyleSheet.create({
  messageView: {
    flex: 1,
    marginTop: 180,
    alignItems: 'center'
  },
  messageWrap: {
    width: 300
  },
  messageHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  messageBody: {
    fontSize: 14,
    marginTop: 24,
    textAlign: 'center'
  }
});
