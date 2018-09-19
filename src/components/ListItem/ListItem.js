import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';

export const ListItem = props => {
    return (
      <TouchableHighlight onPress={props.onItemPressed}>
        <View style={styles.listItem}>
          <Image resizeMode="cover" source={{uri: props.storeImage}} style={styles.storeImage} />
          <Text>{props.storeName}</Text>
        </View>
      </TouchableHighlight>

    )
};

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    marginBottom: 5,
    padding: 10,
    backgroundColor: "#eee",
    flexDirection: "row",
    alignItems: "center"
  },
  storeImage: {
    marginRight: 8,
    height: 30,
    width: 30
  }
});

export default ListItem;
