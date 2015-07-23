'use strict';

var React = require('react-native');
var SinglePicture = require('./components/SinglePicture');
var PictureList = require('./components/PictureList');

var Dashboard = require('./components/Dashboard');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
  MapView,
  Image,
  TabBarIOS,
  TouchableHighlight
} = React;

var TabBarItemIOS = TabBarIOS.Item;

var API_URL = 'http://instagrannar.se:3000/pictures?lng={lng}&lat={lat}&dst=350&max_ts=&min_ts=/-';

var Instagrannar = React.createClass({

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

  componentDidMount: function() {
    var lng = 18.05935107885739;
    var lat = 59.33640477604537;
    this.fetchData(lat, lng);
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

  renderMap: function() {
    var region = {
      latitude: 59.33389,
      longitude: 18.056288,
      latitudeDelta: 1,
      longitudeDelta: 1
    };
    return (
      <MapView style={styles.container} showsUserLocation={true} onRegionChangeComplete={this._regionChange} />
    );
  },

  _regionChange: function(r) {
    this.setState({
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      })
    });
    this.fetchData(r.latitude, r.longitude);
  },

  renderLoadingView: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>
          Instagrannar
        </Text>
      </View>
    );
  },

  renderProfileView: function() {
    return (
      <View style={styles.container}>
        <Text>
          Status: du är awesome.
        </Text>
      </View>
    );
  },

  renderPictureList: function () {
    if (this.state.selectedPicture.id === undefined) {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderPicture}
          style={styles.listView}/>
      );
    }

    return this.renderSinglePicture(this.state.selectedPicture);
  },

  renderPicture: function (picture: Object) {
    return (
      <PictureList
        setSinglePicture={this.setSinglePicture}
        picture={picture} />
    );
  },

  setSinglePicture: function (picture: Object) {
    console.log(picture);
    this.setState({
      selectedTab: 'pictureTab',
      selectedPicture: picture
    });
  },

  renderSinglePicture: function (picture: Object) {
    return <SinglePicture {...picture} />
  },

  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    return (
      <Dashboard/>
    );
  },

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#07afca'
  },
  loadingText: {
    color: '#ffffff'
  }
});

AppRegistry.registerComponent('Instagrannar', () => Instagrannar);
