var React = require('react-native');
var Hashtag = require('./Hashtag');

var {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions
} = React;

var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;

module.exports = React.createClass({
  render: function () {
    var picture = this.props.picture;

    var tags = picture.tags.map(function (tag, i) {
      return <Hashtag key={i} tag={tag} />;
    });

    var caption = picture.caption ? picture.caption.text : '';

    return (
      <ScrollView style={styles.singlePicture}>
        <Image
            source={{uri: picture.images.standard_resolution.url}}
            style={styles.picture} />
        <View style={styles.content}>
          <Text style={styles.username}>@{picture.user.username}</Text>
          <Text style={styles.text}>{caption}</Text>
          <View style={styles.hashtags}>
            {tags}
          </View>
        </View>
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  singlePicture: {
    backgroundColor: '#000',
    flex: 1
  },
  content: {
    padding: 20
  },
  username: {
    color: '#666666',
    marginBottom: 20
  },
  picture: {
    width: screenWidth,
    height: screenWidth,
  },
  hashtags: {
    marginTop: 10
  }
});
