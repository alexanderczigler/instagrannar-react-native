var React = require('react-native');

var ToolbarStore = require('../stores/ToolbarStore');

var {
  Text,
  View,
  StyleSheet
} = React;

module.exports = React.createClass({

  getInitialState: function() {
    return ToolbarStore.state.toolbarState;
  },

  componentDidMount: function() {
    ToolbarStore.listen(this._changePosition);
  },

  componentWillUnmount: function () {
    ToolbarStore.unlisten(this._changePosition);
  },

  render: function() {
    return (
      <View style={styles.toolbar}>
        <Text style={styles.toolbarButton}>{this.state.left}</Text>
        <Text style={styles.toolbarTitle}>Instagrannar</Text>
        <Text style={styles.toolbarButton}>{this.state.right}</Text>
      </View>
    );
  },

  _changeToolbarState: function(toolbarState) {
    this.setState(toolbarState);
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
