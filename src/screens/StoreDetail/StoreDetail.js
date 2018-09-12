import React, { Component } from "react";
import {
  View,
  Image,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import Icon from "react-native-vector-icons/Ionicons";
import { deleteStore } from "../../redux/actions/stores";

class StoreDetail extends Component {
  storeDeletedHandler = () => {
    const { navigation } = this.props;
    const selectedStore = navigation.getParam('selectedStore', {});
    this.props.deleteStore(selectedStore.key);
    this.props.navigation.goBack();
  };

  render() {
    const { navigation } = this.props;
    const selectedStore = navigation.getParam('selectedStore', {});
    return (
      <View style={styles.container}>
        <View>
          <Image source={selectedStore.image} style={styles.storeImage} />
          <Text style={styles.storeName}>{selectedStore.name}</Text>
        </View>
        <View>
          <TouchableOpacity onPress={this.storeDeletedHandler}>
            <View style={styles.deleteButton}>
              <Icon size={30} name="ios-trash" color="red" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 22
  },
  storeImage: {
    width: "100%",
    height: 200
  },
  placeName: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 28
  },
  storeName: {
    alignItems: "center"
  }
});

const mapDispatchToProps = dispatch => bindActionCreators({
  deleteStore
}, dispatch);

export default connect(null, mapDispatchToProps)(StoreDetail);
