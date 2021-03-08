import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Calendar from '../components/Calendar';

const App = createStackNavigator(
  {
    Home: {
      screen: Calendar,
      navigationOptions: {
        headerShown: false,
      },
    },
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(App);
