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

module.exports = React.createClass({
  setSinglePicture: function () {
    this.props.setSinglePicture(this.props.picture);
  },

  render: function () {
    return (
      <ListView
        dataSource={this.props.dataSource}
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
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  thumbnail: {
    width: 90,
    height: 90,
  },
  listView: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});
