var React             = require('react-native');
var Hashtag           = require('./Hashtag');
var Dimensions        = require('Dimensions');
var SinglePicture     = require('./SinglePicture');
var LoadingIndicator  = require('./LoadingIndicator');
var LocationStore     = require('../stores/LocationStore');
var moment            = require('moment');
var {width, height}   = Dimensions.get('window');

var {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  ListView,
  View,
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

  _changePosition: function(l) {
    this.setState(this.getInitialState());
    this.fetchData(l.location.latitude, l.location.longitude);
  },

  componentDidMount: function() {
    LocationStore.listen(this._changePosition);
    var lng = 18.05935107885739;
    var lat = 59.33640477604537;
    this.fetchData(lat, lng);
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

  _onPicturePress: function (picture) {
    this.setState({
      selectedPicture: picture
    });
  },

  render: function () {
    if (this.state.loaded) {
      return (
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderPicture}
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

  wrapCaption: function (caption) {
    if (caption != null) {
      return caption.text;
    }
    return '';
  },

  _calculateTime: function (timestamp) {
    return moment(parseInt(timestamp * 1000, 10)).toNow(true);
  },

  renderPicture: function (picture) {

    var _onPicturePress = this._onPicturePress;
    var onPicturePress = function () {
      _onPicturePress(picture);
    }

    return (
      <TouchableHighlight activeOpacity={0.8} onPress={onPicturePress}>
        <View style={styles.container}>
          <Image
              source={{uri: picture.images.standard_resolution.url}} style={styles.thumbnail} />
          <View style={styles.userTime}>
            <Image
                source={{uri: picture.user.profile_picture}}
                style={styles.profilePicture} />
            <Text style={styles.title}>{picture.user.username}</Text>
            <Text style={styles.ts}>{this._calculateTime(picture.created_time)}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.caption}>{this.wrapCaption(picture.caption)}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    marginBottom: 10,
    position: 'relative'
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
    width: width
  },
  actionContainer: {
    flex: 1,
  },
  profilePicture: {
    borderRadius: 20,
    width: 40,
    height: 40,
    borderWidth: 3,
    borderColor: '#fff'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    color: '#444f5a',
    paddingLeft: 10
  },
  userTime: {
    marginTop: -8,
    alignItems: 'center',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
  },
  ts: {
    fontSize: 14,
    paddingRight: 8,
    color: '#999',
    textAlign: 'right'
  },
  caption: {
    fontSize: 14,
    paddingLeft: 8,
    color: '#444f5a'
  },
  thumbnail: {
    width: width,
    height: width,
  },
  listView: {
    flex: 1,
    paddingTop: 0,
    marginTop: 0,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
});
