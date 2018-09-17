import React from 'react';
import {
  View, Text, Platform,
  Button, ScrollView, StyleSheet,
  Image
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

class PickImage extends React.Component {
  state = {
    pickedImage: null
  };

  pickImageHandler = () => {
    const options = {
      title: 'Pick an Image'
    }
    ImagePicker.showImagePicker(options, response => {
      if(response.didCancel) {

      } else if (response.error) {
        alert('Error happened while picking up the image')
      } else {
        this.setState({
          pickedImage: {
            uri: response.uri,
          }
        })
        this.props.onImagePick({
          uri: response.uri,
          base64: response.data,
        })
      }
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          <Image
            style={styles.previewImage}
            // source={{ uri: "https://c1.staticflickr.com/5/4096/4744241983_34023bf303_b.jpg" }}
            source={this.state.pickedImage}
          />
        </View>
        <View style={styles.button}>
          <Button title="Pick image" onPress={this.pickImageHandler} />
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center'
  },
  placeholder: {
    width: '80%',
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: '#eee'
  },
  previewImage: {
    width: '100%',
    height: '100%'
  },
  button: {
    marginVertical: 8
  }
});


export default PickImage;
