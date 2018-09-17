import React from 'react';
import {
  View, Text, Platform,
  Button, ScrollView, StyleSheet,
  Image, Dimensions
} from 'react-native';
import Mapview from 'react-native-maps';

class PickLocation extends React.Component {
  state = {
    focusedLocation: {
      latitude: 37.900352,
      longitude: -122.4013726,
      latitudeDelta: 0.0122,
      longitudeDelta: Dimensions.get('window').width / Dimensions.get('window').height * 0.0122
    }
  };

  pickLocationHandler = event => {
     const coords = event.nativeEvent.coordinate;
     this.map.animateToRegion({
       ...this.state.focusedLocation,
       latitude: coords.latitude,
       longitude: coords.longitude,
     });
     this.setState(prev => ({
       focusedLocation: {
         ...prev.focusedLocation,
         latitude: coords.latitude,
         longitude: coords.longitude,
       }
     }));
    this.props.onLocationPick({
      latitude: coords.latitude,
      longitude: coords.longitude,
    })
  };
  getLocationHandler = () => {
    navigator.geolocation.getCurrentPosition(pos => {
      const event = {
        nativeEvent: {
          coordinate: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          }
        }
      };
      this.pickLocationHandler(event)
    }, err => {

    })
  };
  render() {
    return (
      <View style={styles.container}>
        <Mapview
          initialRegion={this.state.focusedLocation}
          // region={this.state.focusedLocation}
          style={styles.map}
          onPress={this.pickLocationHandler}
          ref={node => this.map = node}
        >
          <Mapview.Marker coordinate={this.state.focusedLocation} />
        </Mapview>
        <View style={styles.button}>
          <Button title="Locate me" onPress={this.getLocationHandler} />
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
  button: {
    marginVertical: 8
  },
  map: {
    width: '100%',
    height: 200
  }
});


export default PickLocation;
