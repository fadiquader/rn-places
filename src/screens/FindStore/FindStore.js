import React from 'react';
import { View, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
//
import StoreList from '../../components/StoreList';
import StoreDetail from "../StoreDetail";

class FindStore extends React.Component {
  static navigationOptions = ({ }) => ({
    title: 'Find Store',
  });
  itemSelectedHandler = key => {
    const selectedStore = this.props.stores.find(store => store.key === key);
    this.props.navigation.navigate('StoreDetail', {
      selectedStore,
    });
  };
  render() {
    const { stores } = this.props;
    return (
      <View>
        <StoreList
          stores={stores}
          onItemSelected={this.itemSelectedHandler}
        />
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    stores: state.stores.stores
  };
};

export default connect(mapStateToProps)(FindStore);
