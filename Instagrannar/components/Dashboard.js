var React = require('react-native');

var Map = require('./Map');
var PictureList = require('./PictureList');

var {
  StyleSheet,
  Text,
  ListView,
  View,
  Component
} = React;

module.exports = React.createClass({

  getInitialState: function() {
    return {
      selectedTab: 'mapTab',
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      selectedPicture: {}
    };
  },

  render: function() {

    return (
      <View>
        <View style={styles.toolbar}>
          <Text style={styles.toolbarButton}>Settings</Text>
          <Text style={styles.toolbarTitle}>Instagrannar</Text>
          <Text style={styles.toolbarButton}>Search</Text>
        </View>
        <View style={styles.pictureList}>
          <PictureList dataSource={this.state.dataSource}></PictureList>
        </View>
        <View style={styles.map}>
          <Map></Map>
        </View>
      </View>
    );
  }
});

var styles = StyleSheet.create({
    toolbar:{
        backgroundColor:'#07afca',
        paddingTop:30,
        paddingBottom:10,
        flexDirection:'row'
    },
    toolbarButton:{
        width: 65,
        color:'#ffffff',
        textAlign:'center'
    },
    toolbarTitle:{
        color:'#ffffff',
        textAlign:'center',
        fontWeight:'bold',
        flex:1
    },
    pictureList: {
      flexDirection:'row',
      height: 380
    },
    map: {
      flexDirection:'row',
      height: 220
    }
});
