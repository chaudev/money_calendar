import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import App from './container/App';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      aaa: '',
    };
  }

  render() {
    return <App />;
  }
}
