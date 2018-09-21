import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, YellowBox } from 'react-native';
import { Provider } from 'react-redux';
//
import AppNavigator from './src/navigator/AppNavigator';
import NavigationService from './src/navigator/NavigationService';

import configureStore from './src/redux/configureStore';
//

YellowBox.ignoreWarnings([
  'Warning:',
  'Warning: isMounted(...) is deprecated', 'Module RCTImageLoader'
]);

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <AppNavigator
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }}
          />
        </SafeAreaView>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
