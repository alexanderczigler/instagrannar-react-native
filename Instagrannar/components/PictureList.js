var React = require('react-native');
var Hashtag = require('./Hashtag');

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

  setSinglePicture: function () {
    this.props.setSinglePicture(this.props.picture);
  },

  setSinglePicture: function (picture: Object) {
    console.log(picture);
    this.setState({
      selectedTab: 'pictureTab',
      selectedPicture: picture
    });
  },

  render: function () {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderPicture}
        style={styles.listView}/>
    );
  },

  renderPicture: function (picture) {
    //var picture = this.props.picture;

    return (
      <TouchableHighlight activeOpacity={0.8} onPress={this.setSinglePicture}>
        <View style={styles.container}>
          <Image
            source={{uri: picture.images.thumbnail.url}}
            style={styles.thumbnail} />
          <View style={styles.rightContainer}>
            <Text style={styles.title}>@{picture.user.username}</Text>
            <Text style={styles.year}>Filter: {picture.filter}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
    marginTop: 0
  },
  rightContainer: {
    flex: 1
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
    color: '#efefef'
  },
  year: {
    textAlign: 'center',
    color: '#efefef'
  },
  thumbnail: {
    width: 90,
    height: 90,
  },
  listView: {
    flex: 1,
    paddingTop: 0,
    marginTop: 0,
    backgroundColor: '#F5FCFF',
  },
});
