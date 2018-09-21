import React from 'react';
import { View, Text, Button, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
//
import StoreList from '../../components/StoreList';
import StoreDetail from "../StoreDetail";
import { getStores } from '../../redux/actions/stores';

class FindStore extends React.Component {
  static navigationOptions = ({ }) => ({
    title: 'Find Store',
  });
  componentDidMount() {
    this.props.getStores();
  }
  itemSelectedHandler = key => {
    const selectedStore = this.props.stores.find(store => store.key === key);
    this.props.navigation.navigate('StoreDetail', {
      selectedStore,
    });
  };
  signout = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth')
  }
  render() {
    const { stores } = this.props;
    return (
      <View>
        <Button onPress={this.signout} title="sign out" />
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

export default connect(mapStateToProps, { getStores })(FindStore);
