var React = require('react-native');

var {
  Text,
  View,
  StyleSheet
} = React;

module.exports = React.createClass({

  render: function() {
    return (
      <View style={styles.toolbar}>
        <Text style={styles.toolbarButton}></Text>
        <Text style={styles.toolbarTitle}>Instagrannar</Text>
        <Text style={styles.toolbarButton}>Search</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
    toolbar: {
        backgroundColor: '#444f5a',
        paddingTop: 30,
        paddingBottom: 10,
        marginBottom: 0,
        flexDirection:'row',
    },
    toolbarButton:{
        width: 65,
        color:'#fff',
        textAlign:'center'
    },
    toolbarTitle:{
        color:'#fff',
        textAlign:'center',
        fontWeight:'bold',
        flex:1
    }
});
