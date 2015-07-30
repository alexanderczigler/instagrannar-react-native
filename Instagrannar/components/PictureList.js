var React             = require('react-native');

var LocationStore     = require('../stores/LocationStore');
var PictureListRow    = require('./PictureListRow');
var Message           = require('./Message');
var LoadingIndicator  = require('./LoadingIndicator');

var {
  ListView,
  StyleSheet
} = React;

var API_URL = 'http://instagrannar.se:3000/pictures?lng={lng}&lat={lat}&dst=350&max_ts=&min_ts=/-';

module.exports = React.createClass({

  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
      selectedPicture: {}
    };
  },

  componentDidMount: function() {
    LocationStore.listen(this._changePosition);
  },

  componentWillUnmount: function () {
    LocationStore.unlisten(this._changePosition);
  },

  fetchData: function(lat, lng) {
    var url = API_URL;
    url = url.replace('{lng}', lng);
    url = url.replace('{lat}', lat);
    fetch(url)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.data),
          loaded: true,
        });
      })
      .done();
  },

  render: function () {
    console.log('DAS DATA', this.state.dataSource._cachedRowCount);
    if (this.state.loaded) {
      if (this.state.dataSource._cachedRowCount == 0) {
        var header = 'Nothing found';
        var body = 'Trying changing the zoom or moving the map to another location.';
        return (
          <Message header={header} body={body} />
        );
      }
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          style={styles.listView}
          />
      );
    }
    else {
      return (
        <LoadingIndicator />
      );
    }
  },

  _renderRow: function (picture) {
    return (
      <PictureListRow picture={picture} />
    );
  },

  _changePosition: function(l) {
    this.setState(this.getInitialState());
    this.fetchData(l.location.latitude, l.location.longitude);
  },

});

var styles = StyleSheet.create({
  listView: {
    flex: 1,
    paddingTop: 0,
    marginTop: 0,
  }
});
