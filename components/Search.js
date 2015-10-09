var React = require('react-native');
var RNLocalSearch = require('.././node_modules/react-native-localsearch/RNLocalSearch.ios.js');

var LocationStore   = require('../stores/LocationStore');
var ToolbarActions  = require('../actions/ToolbarActions');
var LocationActions = require('../actions/LocationActions');

var {
  Text,
  View,
  ListView,
  TextInput,
  StyleSheet,
  TouchableHighlight
} = React;

var __TimeoutId = 0;

module.exports = React.createClass({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      searchText: {
        text: ''
      },
      location: LocationStore.state.location
    };
  },

  render: function() {
    return (
      <View>
        <View style={styles.searchFieldContainer}>
          <TextInput style={styles.searchField} onChangeText={(text) => this._onTextChange({text})} />
        </View>
        <View style={styles.searchResultContainer}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow}
            style={styles.listView}
            />
        </View>
      </View>
    );
  },

  _renderRow: function(item) {
    var _onResultPress = this._onResultPress;
    var onResultPress = function() {
      _onResultPress(item);
    }
    if (item.title === null || item.title === '') {
      return null;
    }
    return (
      <TouchableHighlight style={styles.listViewRow} activeOpacity={0.8} onPress={onResultPress}>
        <View>
          <Text style={styles.searchResultName}>{item.name}</Text>
          <Text style={styles.searchResultTitle}>{item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  },

  _onTextChange: function(text) {
    this.setState({searchText: text});
    if (__TimeoutId > 0) {
      clearTimeout(__TimeoutId);
    }
    __TimeoutId = setTimeout(this._doSearch, 1500);
  },

  _doSearch: function() {
    __TimeoutId = 0;

    const region = {
      latitude: this.state.location.latitude,
      longitude: this.state.location.longitude,
      latitudeDelta: 5,
      longitudeDelta: 5
    };
    console.log(RNLocalSearch, this.state.searchText.text);
    if (RNLocalSearch) {
      RNLocalSearch.searchForLocations(this.state.searchText.text, region, this._handleResponse);
    }
  },

  _handleResponse: function(err, resp) {
    if (err) {
      console.log(err);
    }
    else {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(resp)
      });
    }
  },

  _onResultPress: function(something) {
    something.showUserLocation = false;
    LocationActions.set(something.location);
    ToolbarActions.set({ currentView: 'Home' });
  }

});

var styles = StyleSheet.create({
  searchFieldContainer: {
    flexDirection: 'row',
    height: 42
  },
  searchField: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 5,
    paddingRight: 5
  },
  searchResultContainer: {
    flexDirection: 'row',
    height: 550,
    paddingLeft: 5,
    paddingRight: 5
  },
  searchResultName: {
    fontWeight: 'bold'
  },
  searchResultTitle: {
    fontSize: 12
  },
  listView: {
    flex: 1,
    paddingTop: 0,
    marginTop: 0
  },
  listViewRow: {
    marginBottom: 5
  }
});
