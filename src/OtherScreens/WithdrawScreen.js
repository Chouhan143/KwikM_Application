import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import {Input} from 'react-native-elements';
import {useSelector} from 'react-redux';

const WithdrawScreen = () => {
  const navigation = useNavigation();
  const storedUserDetailes = useSelector(state => state.details.login_data);
  const [lead_balance, setLeadBalance] = useState(null);
  const [actual_balance, setActualBalance] = useState(null);
  const [amount, setAmount] = useState('');
  useEffect(() => {
    FetchBalance();
  }, []);

  const FetchBalance = async () => {
    try {
      const response = await fetch(
        'https://kwikm.in/dev_kwikm/api/wallet_balance.php',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({user_id: storedUserDetailes.user_id}),
        },
      );

      const userBalance = await response.json();
      if (userBalance.wallet) {
        setActualBalance(userBalance.wallet.balance);
        setLeadBalance(userBalance.wallet.lead_balance);
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const requestWithdrawal = async () => {
    const payload = {
      user_id: storedUserDetailes.user_id,
      amount: amount,
    };
    const response = await fetch(
      'https://kwikm.in/dev_kwikm/api/withdraw-request.php',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );
    if (response.ok) {
      let data = await response.json();
      if (data.success) {
        Alert.alert('Success', `${data.message}`, [
          {
            text: 'OK',
            onPress: () => {
              setAmount(0);
            },
          },
        ]);
      } else {
        Alert.alert('Failed', `${data.message}`, [
          {
            text: 'OK',
            onPress: () => {
              setAmount(0);
            },
          },
        ]);
      }
      console.log(data);
    }
  };

  return (
    <>
      <StatusBar backgroundColor="white" />

      <ScrollView style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{height: responsiveHeight(8), flexDirection: 'row'}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.headerIcone}>
            <Font5 name="arrow-left" color="black" size={responsiveWidth(6)} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <View>
              <Text style={styles.headerTitleTxt}>Withdraw request</Text>
            </View>
          </View>
        </View>

        <View style={styles.amountContainer}>
          <Text style={styles.walletText}>Wallet Balance</Text>
          <Text style={styles.walletAmountText}>{actual_balance}.00/-</Text>
        </View>
        <View style={styles.withdrawInputContainer}>
          <Input
            placeholder="Enter Amount"
            onChangeText={text => setAmount(text)}
            inputContainerStyle={styles.inputStyle}
          />

          <TouchableOpacity
            onPress={requestWithdrawal}
            style={styles.buttonStyle}>
            <Text style={styles.buttonText}>send request</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  headerIcone: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleContainer: {
    flex: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  headerTitleTxt: {
    fontSize: responsiveFontSize(2.5),
    color: 'black',
    fontWeight: '700',
  },
  amountContainer: {
    width: responsiveWidth(95),
    height: responsiveHeight(15),
    borderRadius: responsiveWidth(3),
    backgroundColor: '#EF940B',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletText: {
    fontSize: responsiveFontSize(2.5),
    color: 'white',
    fontWeight: '500',
  },
  walletAmountText: {
    fontSize: responsiveFontSize(6),
    color: 'white',
    fontWeight: '700',
  },
  withdrawInputContainer: {
    flex: 1,
    paddingVertical: responsiveWidth(10),
    alignItems: 'center',
  },
  inputStyle: {
    borderColor: '#CDCDCD',
    borderWidth: 1,
    height: responsiveHeight(7),
    borderRadius: responsiveWidth(3),
    paddingLeft: responsiveWidth(4),
  },
  buttonStyle: {
    width: responsiveWidth(94),
    height: responsiveHeight(6.5),
    borderRadius: responsiveWidth(3),
    backgroundColor: '#CB01CF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: responsiveFontSize(2.4),
    color: 'white',
    fontWeight: '700',
  },
});

export default WithdrawScreen;
