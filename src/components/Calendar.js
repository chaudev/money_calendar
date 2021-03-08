import React, {useState} from 'react';

import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Alert,
} from 'react-native';

import CalendarPicker from 'react-native-calendar-picker';
import DialogInput from './Popup';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import 'intl';
import 'intl/locale-data/jsonp/en';
import SplapScreen from './SplapScreen';
console.disableYellowBox = true;

const formatDate = (value) => {
  let day = new Date(value);
  let stringDate =
    checkLength(day.getDate()) +
    '/' +
    checkLength(day.getMonth() + 1) +
    '/' +
    day.getFullYear() +
    '';
  return stringDate;
};

const getDate = (value) => {
  let day = new Date(value);
  let strDate = day.getDate();
  return strDate;
};

const getMonth = (value) => {
  let day = new Date(value);
  let strDate = day.getMonth() + 1;
  return strDate;
};

const checkLength = (text1) => {
  let text = text1 + '';
  if (text.length === 1) {
    return '0' + text;
  } else {
    return text;
  }
};

export default class App extends React.Component {
  constructor(props) {
    super(props),
      (this.state = {
        selectedStartDate: new Date(),
        isDialogVisible: false,
        moneySave: '',
        moneySaved: 0,
        allMoneySaved: 0,
        isSplapVisible: true,
        isMainVisible: false,
      });
  }

  componentDidMount() {
    this.setMoney();
    this.setAllMoney();

    let that = this;
    setTimeout(function () {
      that.Splap();
    }, 500);
  }

  Splap() {
    this.setState({isSplapVisible: false});
    this.setState({isMainVisible: true});
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.isSplapVisible && <SplapScreen />}
        {this.state.isMainVisible && (
          <View style={{flex: 1}}>
            <DialogInput
              isDialogVisible={this.state.isDialogVisible}
              title={'Nhập số tiền'}
              hintInput={'VD: 200000'}
              submitInput={(inputText) => {
                this.setState({isDialogVisible: false});
                this.setState({moneySave: inputText}, () =>
                  this.rememberMoney(),
                );
              }}
              closeDialog={() => {
                this.setState({isDialogVisible: false});
                console.log(formatDate(this.state.selectedStartDate));
              }}
              inputText={'xxxxxxx'}
            />
            <Text
              style={{
                textAlign: 'center',
                color: '#000',
                fontSize: 22,
                fontWeight: 'bold',
                paddingTop: 10,
                paddingBottom: 10,
                // borderBottomWidth: 1,
                // marginHorizontal: '3.5%',
                // borderColor: 'grey',
              }}>
              Tính tiền hàng tháng
            </Text>
            {/* <View style={{marginVertical: '1%'}} /> */}
            <View style={styles.container}>
              <CalendarPicker
                startFromMonday={true}
                allowRangeSelection={false}
                minDate={new Date(2018, 1, 1)}
                maxDate={new Date(2050, 6, 3)}
                weekdays={['Hai', 'Ba', 'Tư', 'Năm', 'Sáu', 'Bảy', 'CN']}
                months={[
                  'Tháng 1',
                  'Tháng 2',
                  'Tháng 3',
                  'Tháng 4',
                  'Tháng 5',
                  'Tháng 6',
                  'Tháng 7',
                  'Tháng 8',
                  'Tháng 9',
                  'Tháng 10',
                  'Tháng 11',
                  'Tháng 12',
                ]}
                previousTitle="Tháng trước"
                nextTitle="Tháng sau"
                todayBackgroundColor="#000"
                todayTextStyle={{color: '#fff'}}
                selectedDayColor="#008800"
                selectedDayTextColor="#fff"
                scaleFactor={375}
                textStyle={{
                  fontFamily: 'Cochin',
                  color: '#000000',
                }}
                onDateChange={(date) => this.onDateChange(date, 'Start')}
              />
            </View>
            <View
              style={{
                margin: 10,
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: '#000',
                }}>
                Ngày đã chọn: {formatDate(this.state.selectedStartDate)}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: '#000',
                  }}>
                  Số tiền:
                </Text>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: 'bold',
                    marginLeft: 5,
                    color: '#000',
                  }}>
                  {this.state.moneySaved}đ
                </Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    color: '#000',
                  }}>
                  Tổng tiền:
                </Text>
                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: 'bold',
                    marginLeft: 5,
                    color: '#000',
                  }}>
                  {this.state.allMoneySaved}đ
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 10}}>
                <TouchableOpacity
                  style={{
                    flex: 4,
                    backgroundColor: '#000',
                    paddingVertical: 10,
                    marginRight: 5,
                    alignItems: 'center',
                    borderRadius: 10,
                  }}
                  onPress={() => this.setState({isDialogVisible: true})}>
                  <FontAwesome5
                    name={'edit'}
                    color={'#fff'}
                    size={20}
                    style={{marginBottom: 5}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: '#000',
                    paddingVertical: 10,
                    alignItems: 'center',
                    borderRadius: 10,
                  }}
                  onPress={() => this.setState(() => this.DeleteMoney())}>
                  <FontAwesome5
                    name={'trash-alt'}
                    color={'#fff'}
                    size={20}
                    style={{marginBottom: 5}}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }

  DeleteMoney() {
    Alert.alert('Thông báo', 'Bạn có chắc là muốn xóa không ?', [
      {
        text: 'Thôi',
        onPress: () => {
          console.log('không xóa');
        },
        style: 'cancel',
      },
      {
        text: 'Chơi luôn',
        onPress: () => {
          console.log('Xoá');
          this.forgetMoney();
          this.setMoney();
          this.setAllMoney();
        },
      },
    ]);
  }

  async onDateChange(date, type) {
    if (type === 'END_DATE') {
      console.log('onDateChange : chay : END_DATE : ' + date.getDate());
    } else {
      this.setState({selectedStartDate: date}, () => this.setMoney());
    }
  }

  rememberMoney = async () => {
    try {
      await AsyncStorage.setItem(
        'date' +
          getDate(this.state.selectedStartDate) +
          '/' +
          getMonth(this.state.selectedStartDate),
        this.state.moneySave,
      );
    } catch (error) {
      console.log('Khong the luu');
    }
    this.setAllMoney();
    this.setMoney();
  };

  forgetMoney = async () => {
    try {
      await AsyncStorage.removeItem(
        'date' +
          getDate(this.state.selectedStartDate) +
          '/' +
          getMonth(this.state.selectedStartDate),
      );
    } catch (error) {}
  };

  getRememberedMoney = async () => {
    console.log('getRememberedMoney : chay : ' + this.state.selectedStartDate);
    try {
      const Money = await AsyncStorage.getItem(
        'date' +
          getDate(this.state.selectedStartDate) +
          '/' +
          getMonth(this.state.selectedStartDate),
      );
      if (Money !== null && Money !== undefined) {
        console.log('khac null : ' + Money);
        return Money;
      } else {
        console.log('null');
        return 0;
      }
    } catch (error) {
      console.log('Khong the lay');
    }
  };

  getAllRememberedMoney = async (date) => {
    console.log('getRememberedMoney : chay : ' + date);
    try {
      const Money = await AsyncStorage.getItem(
        'date' + date + '/' + getMonth(this.state.selectedStartDate),
      );
      if (Money !== null && Money !== undefined) {
        console.log('khac null : ' + Money);
        return Money;
      } else {
        console.log('null');
        return 0;
      }
    } catch (error) {
      console.log('Khong the lay');
    }
  };

  async setMoney() {
    const money = await this.getRememberedMoney();
    console.log(
      'Money saved : ' + new Intl.NumberFormat('vn-VN').format(money) + 'đ',
    );
    this.setState({moneySaved: new Intl.NumberFormat('vn-VN').format(money)});

    this.setAllMoney();
  }

  async setAllMoney() {
    let money = 0;

    for (let i = 1; i <= 30; i++) {
      let a = parseInt(await this.getAllRememberedMoney(i));
      money = money + a;
    }

    console.log(
      'setAllMoney : ' + new Intl.NumberFormat('vn-VN').format(money) + 'đ',
    );

    this.setState({
      allMoneySaved: new Intl.NumberFormat('vn-VN').format(money),
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // borderTopWidth: 1,
  },
  textStyle: {
    marginTop: 10,
  },
  titleStyle: {
    textAlign: 'center',
    fontSize: 20,
    margin: 20,
  },
});
