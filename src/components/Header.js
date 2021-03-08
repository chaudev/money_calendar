import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import Sizes from '../res/Size';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      Ionicons: 'chevron-back',
      Octicons: 'plus',
    };
  }

  render() {
    return (
      <View
        style={[Styles.Header, {backgroundColor: this.props.BackgroundColor}]}>
        <TouchableOpacity style={Styles.Icon} onPress={this.props.onPressLeft}>
          <Ionicons
            name={this.props.Ionicons}
            color={this.props.ColorIcon}
            size={Sizes.h52}
          />
        </TouchableOpacity>
        <Text style={[Styles.Title, {color: this.props.ColorTitle}]}>
          {this.props.Title}
        </Text>
        <TouchableOpacity style={Styles.Icon} onPress={this.props.onPressRight}>
          <Octicons
            name={this.props.Octicons}
            color={this.props.ColorIcon}
            size={Sizes.h42}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

Header.defaultProps = {
  BackgroundColor: null,
  Ionicons: null,
  Octicons: null,
  Title: '',
  ColorTitle: '#555555',
  ColorIcon: '#d4d5d8',
  onPressLeft: () => {},
  onPressRight: () => {},
};

const Styles = StyleSheet.create({
  Header: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    height: Sizes.h100 + Sizes.h20,
    borderBottomColor: 'grey',
    alignItems: 'center',
    marginBottom: '2%',
    marginHorizontal: -3,
    marginTop: -3,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  Title: {
    flex: 8,
    textAlign: 'center',
    fontSize: Sizes.h32,
    fontWeight: 'bold',
    marginTop: 3,
  },
  Icon: {
    flex: 1,
    padding: '2%',
    alignItems: 'center',
    marginTop: 3,
  },
});
