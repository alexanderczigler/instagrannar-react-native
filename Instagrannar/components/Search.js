var React = require('react-native');
var RNLocalSearch = require('.././node_modules/react-native-localsearch/RNLocalSearch.ios.js');

var {
  Text,
  View,
  StyleSheet
} = React;

module.exports = React.createClass({

  getInitialState: function() {
    return {};
  },

  render: function() {
    this._doSearch();
    return (
      <View style={styles.searchContainer}>
        <Text>search...</Text>
      </View>
    );
  },

  _doSearch: function() {
    const region = {
      latitude: 30.2669444,
      longitude: -97.7427778,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1
    };

    var handleResults = function (err, resp) {
      console.log('results!!!', err, resp);
    };
    console.log('R', RNLocalSearch);
    if (RNLocalSearch) {
      RNLocalSearch.searchForLocations('Lalas', region, handleResults);
    }
  }

});

var styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    height: 600
  },
});
