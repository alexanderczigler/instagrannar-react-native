var React = require('react-native');

var ToolbarStore   = require('../stores/ToolbarStore');
var ToolbarActions = require('../actions/ToolbarActions');

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
    ToolbarStore.listen(this._changeToolbarState);
  },

  componentWillUnmount: function () {
    ToolbarStore.unlisten(this._changeToolbarState);
  },

  render: function() {
    return (
      <View style={styles.toolbar}>
        <Text style={styles.toolbarButton} onPress={this._handleLeftToolbarButton}>{this.state.left}</Text>
        <Text style={styles.toolbarTitle}>Instagrannar</Text>
        <Text style={styles.toolbarButton} onPress={this._handleRightToolbarButton}>{this.state.right}</Text>
      </View>
    );
  },

  _handleLeftToolbarButton(position, caption) {
    if (this.state.left === 'Back') {
      ToolbarActions.set({ currentView: 'Home' });
    }
  },

  _handleRightToolbarButton(position, caption) {
    if (this.state.right === 'Search') {
      ToolbarActions.set({ currentView: 'Search' });
    }
  },

  _changeToolbarState: function(toolbarState) {
    this.setState(toolbarState.toolbarState);
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
