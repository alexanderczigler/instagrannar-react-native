var React = require('react-native');

var {
  StyleSheet,
  MapView
} = React;

module.exports = React.createClass({

  _regionChange: function(r) {
    this.setState({
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    });
    this.fetchData(r.latitude, r.longitude);
  },

  render: function() {
    var region = {
      latitude: 59.33389,
      longitude: 18.056288,
      latitudeDelta: 1,
      longitudeDelta: 1
    };
    return (
      //<MapView style={styles.container} showsUserLocation={true} onRegionChangeComplete={this._regionChange} />
      <MapView style={styles.container} showsUserLocation={true} />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
