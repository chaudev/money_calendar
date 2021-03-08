import React from 'react';
import {Image, View, Text} from 'react-native';
import Sizes from '../res/Size';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default class SplapScreen extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#000'}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{
                resizeMode: 'contain',
                height: undefined,
                aspectRatio: 2.5,
              }}
              source={require('../res/images/icon_splap.png')}
            />
          </View>
        </View>
        <Text
          style={{
            position: 'relative',
            textAlign: 'center',
            marginBottom: '3%',
            fontSize: Sizes.h26,
            color: '#fff',
          }}>
          Application by Châu Nguyễn{' '}
          {/* <FontAwesome5 name={'dragon'} color={'#fff'} size={Sizes.h30} /> */}
        </Text>
      </View>
    );
  }
}
