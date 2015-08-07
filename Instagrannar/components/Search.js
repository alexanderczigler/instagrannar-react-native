var React = require('react-native');
var RNLocalSearch = require('.././node_modules/react-native-localsearch/RNLocalSearch.ios.js');

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
      }
    };
  },

  render: function() {
    console.log('rendering and', this.state);
    return (
      <View>
        <View style={styles.searchFieldContainer}>
          <TextInput style={styles.searchField} onChangeText={(text) => this._onTextChange({text})} value={this.state.searchText.text} />
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
    return (
      <TouchableHighlight activeOpacity={0.8} onPress={onResultPress}>
        <View>
          <Text>{item.name}</Text>
          <Text>{item.title}</Text>
        </View>
      </TouchableHighlight>
    );
  },

  _onTextChange: function(text) {
    this.setState({searchText: text}, function() {
      if (text !== '') {
        this._doSearch();
      }
    });
  },

  _doSearch: function() {
    const region = {
      latitude: 30.2669444,
      longitude: -97.7427778,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    };

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
    console.log('something is', something.location);
    LocationActions.set(something.location);
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
    borderWidth: 1
  },
  searchResultContainer: {
    flexDirection: 'row',
    height: 550
  },
  listView: {
    flex: 1,
    paddingTop: 0,
    marginTop: 0,
  }
});
