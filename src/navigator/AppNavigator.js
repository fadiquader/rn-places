import React from 'react';
import { Image, StyleSheet } from 'react-native';
import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createStackNavigator,
  createDrawerNavigator,
} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//
import { Login, Signup } from '../screens/Auth';
import FindStore from '../screens/FindStore';
import ShareStore from '../screens/ShareStore';
import StoreDetail from '../screens/StoreDetail';
import Launch from '../screens/Auth/Launch';

import logo from '../assets/images/logo.png';

const labels = {
  'FindStore': 'Find Store',
  'ShareStore': 'Share Store',
};

const styles = StyleSheet.create({
  logo: {
    width: 30,
    height: 30,
    marginHorizontal: 16
  }
});

const StoreScreens = createBottomTabNavigator({
  FindStore: FindStore,
  ShareStore: ShareStore,
}, {
    navigationOptions: ({ navigation }) => ({
      title: labels[navigation.state.routeName],
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'FindStore') {
          iconName = `ios-map`;
        } else if (routeName === 'ShareStore') {
          iconName = `ios-share-alt`;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      // activeTintColor: 'tomato',
      // inactiveTintColor: 'gray',
    },
  }
);

const AppScreens = createStackNavigator({
  StoreScreens,
}, {
  navigationOptions: {
    title: 'Stores App',
    headerLeft: (
      <Image
        source={logo}
        style={styles.logo}
      />
    )
  }
});

const FullAppScreens = createStackNavigator({
  AppScreens: {
    screen: AppScreens,
    navigationOptions: {
      header: null
    }
  },
  StoreDetail
});

const AuthScreens = createStackNavigator({
  Login,
  Signup,
}, {
  headerMode: 'none',
});


const AppNavigator = createSwitchNavigator({
  Launch,
  Auth: AuthScreens,
  App: FullAppScreens,
}, {
  initialRouteName: 'Launch',
});


export default AppNavigator;
