import React from 'react';
import {
  View, Text, Platform,
  Button, ScrollView, StyleSheet,
  Image
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
//
import StoreInput  from '../../components/StoreInput';
import { addStore }  from '../../redux/actions/stores';
import Input from '../../components/Input/Input';
import PickImage from '../../components/PickImage/PickImage';
import PickLocation from '../../components/PickLocation/PickLocation';

class ShareStore extends React.Component {
  static navigationOptions = ({ }) => ({
    title: 'Share Store',
  });
  state = {
    storeName: '',
    location: null,
    image: null
  };

  storeNameChangedHandler = val => {
    this.setState({
      storeName: val
    });
  };

  storeSubmitHandler = () => {
    const { storeName, location, image } = this.state;
    if (storeName.trim() === '' && !location && !image) return;

    this.props.addStore(storeName, location, image);
  };

  locationPickHandler = location => {
    this.setState({
      location
    })
  };

  handlePickImage = image => {
    this.setState({
      image
    })
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text>Add Place</Text>
          <PickImage onImagePick={this.handlePickImage} />
          <PickLocation onLocationPick={this.locationPickHandler} />
          <Input
            placeholder="Place Name"
            onChangeText={this.storeNameChangedHandler}
          />
          <View style={styles.button}>
            <Button title="Add Place" onPress={this.storeSubmitHandler} />
          </View>
        </View>
      </ScrollView>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    addStore
  }, dispatch)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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

export default connect(null, mapDispatchToProps)(ShareStore);

