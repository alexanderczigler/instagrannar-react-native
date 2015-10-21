var React = require('react-native');
var moment = require('moment');
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');

var {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight
} = React;

module.exports = React.createClass({

  // TODO: picture.likes.count

  render: function () {
    var picture = this.props.picture;
    var _onPicturePress = this._onPicturePress;
    var onPicturePress = function () {
      _onPicturePress(picture);
    };
    return (
      <TouchableHighlight activeOpacity={0.8} onPress={onPicturePress} underlayColor={'white'}>
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
            <Text style={styles.caption}>{this._wrapCaption(picture.caption)}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  },

  _calculateTime: function (timestamp) {
    return moment(parseInt(timestamp * 1000, 10)).toNow(true);
  },

  _wrapCaption: function (caption) {
    if (caption != null) {
      return caption.text;
    }
    return '';
  },

  _onPicturePress: function (picture) {
    this.setState({
      selectedPicture: picture
    });
    console.log('Picture was clicked...');
  }

});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
    marginBottom: 10,
    position: 'relative'
  },
  thumbnail: {
    width: width,
    height: width
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
    flexDirection: 'row'
  },
  ts: {
    fontSize: 14,
    paddingRight: 8,
    color: '#999',
    textAlign: 'right'
  },
  profilePicture: {
    borderRadius: 20,
    width: 40,
    height: 40,
    borderWidth: 3,
    borderColor: '#fff'
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 5,
    width: width
  },
  caption: {
    fontSize: 14,
    paddingLeft: 8,
    color: '#444f5a'
  }
});
