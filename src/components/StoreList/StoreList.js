import React from "react";
import { StyleSheet, FlatList } from "react-native";

import ListItem from "../ListItem/ListItem";

const storeList = props => {
  return (
    <FlatList
      style={styles.listContainer}
      data={props.stores}
      renderItem={(info) => (
        <ListItem
          storeName={info.item.name || info.item.storeName}
          storeImage={info.item.image}
          onItemPressed={() => props.onItemSelected(info.item.key)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});

export default storeList;
