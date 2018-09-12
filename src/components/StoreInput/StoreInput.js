import React, { Component } from "react";
import { View, TextInput, Button, StyleSheet } from 'react-native';

class StoreInput extends Component {
  state = {
    storeName: ''
  };

  storeNameChangedHandler = val => {
    this.setState({
      storeName: val
    });
  };

  storeSubmitHandler = () => {
    const { storeName } = this.state
    if (storeName.trim() === '') {
      return;
    }
    this.props.onStoreAdded(storeName);
  };

  render() {
    return (
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="An Great Store"
          value={this.state.storeName}
          onChangeText={this.storeNameChangedHandler}
          style={styles.storeInput}
        />
        <Button
          title="Add"
          style={styles.storeButton}
          onPress={this.storeSubmitHandler}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    // flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  storeInput: {
    width: "70%"
  },
  storeButton: {
    width: "30%"
  }
});

export default StoreInput;
