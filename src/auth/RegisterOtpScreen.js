import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useNetInfo from '../OtherScreens/useNetInfo';
import NoConnection from '../OtherScreens/NoConnection';

const RegisterOtpScreen = () => {
  const [otp, setOtp] = useState('');
  let [msg, setMsg] = useState('');
  let [err, setErr] = useState('');
  let [status, setStaus] = useState(null);
  const navigation = useNavigation();
  const netInfo = useNetInfo();
  const [buttonIndicator, setButttonIndicator] = useState(false);

  // redux
  const details = useSelector(state => state.details.values);

  const Submit = () => {
    // console.log("hiii")
    setButttonIndicator(true);
    let ob = {
      otp: otp,
      phone: details.phone,
      email: details.email,
      name: details.name,
    };

    fetch('https://kwikm.in/dev_kwikm/api/verify_otp.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(ob),
    })
      .then(response => response.json())
      .then(data => {
        // storing the user id generated at the time of otp varification in async storage
        // console.log("checking user id is comming or not from api", data)
        const id = JSON.stringify(data.user_id);
        console.log("otp id:",id)
        AsyncStorage.setItem('id', id);

        setStaus(data.status);
        setMsg(data.message);
        setErr(data.error);
        if (data.status) {
          setTimeout(() => {
            setButttonIndicator(false);
            setOtp('');
            setMsg('');
            navigation.navigate('registerMPIN');
          }, 2000);
        } else {
          // console.log(data.error)

          setTimeout(() => {
            setOtp('');
            setErr('');
            setButttonIndicator(false);
            // navigation.navigate("registerMPIN")
          }, 2000);
        }
      })
      
  };

  return (
    <>
      {netInfo ? (
        <View style={styles.container}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.view1}>
              <Image
                source={{uri: 'https://kwikm.in/live/images/top-image.png'}}
                style={{
                  width: responsiveWidth(100),
                  height: responsiveHeight(30),
                  marginTop: responsiveWidth(8),
                  resizeMode: 'contain',
                }}
              />
            </View>
            <View style={styles.view2}>
              <View style={{width: responsiveWidth(100)}}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(3),
                    fontWeight: '700',
                    color: '#8F0592',
                    margin: responsiveWidth(5),
                    marginLeft: responsiveWidth(10),
                  }}>
                  Enter OTP
                </Text>
              </View>
              <OTPInputView
                style={{
                  width: responsiveWidth(80),
                  height: responsiveHeight(10),
                }}
                pinCount={4}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                onCodeFilled={code => {
                  setOtp(`${code}`);
                }}
              />
              <View style={styles.submitButtonContainer}>
                <TouchableOpacity onPress={Submit} style={styles.submitButton}>
                  {buttonIndicator ? (
                    <ActivityIndicator size="large" color="white" />
                  ) : (
                    <Text style={styles.submitButtonText}>Submit OTP</Text>
                  )}
                </TouchableOpacity>
                <View style={{margin: responsiveWidth(3)}}>
                  {status ? (
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.8),
                        color: 'green',
                        fontWeight: '500',
                      }}>
                      {msg}
                    </Text>
                  ) : (
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.8),
                        color: 'red',
                        fontWeight: '500',
                      }}>
                      {err}
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.legalTextContainer}>
                <Text style={styles.legalText}>By continuing you agree</Text>
                <Text style={styles.legalLink}>Terms & Conditions</Text>
                <Text style={styles.legalText}>and</Text>
                <Text style={styles.legalLink}>Privacy Policy</Text>
              </View>
            </View>
          </ScrollView>
        </View>
      ) : (
        <NoConnection />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    // backgroundColor: 'yellow',
  },
  view1: {
    width: responsiveWidth(100),
    height: responsiveHeight(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: responsiveWidth(60),
    height: responsiveHeight(25),
    marginTop: responsiveWidth(8),
  },
  view2: {
    width: responsiveWidth(100),
    height: responsiveHeight(62),
    backgroundColor: '#EAFFEA',
    borderTopLeftRadius: responsiveWidth(8),
    borderTopRightRadius: responsiveWidth(8),
    alignItems: 'center',
  },

  otpTitle: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '700',
    color: '#8F0592',
    width: responsiveWidth(85),
  },

  submitButtonContainer: {
    width: responsiveWidth(90),
    height: responsiveHeight(25),
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    width: responsiveWidth(85),
    height: responsiveHeight(6.5),
    backgroundColor: '#0B3F70',
    borderRadius: responsiveWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: responsiveFontSize(2),
  },
  legalTextContainer: {
    width: responsiveWidth(85),
    height: responsiveHeight(15),
    // marginTop: responsiveWidth(8),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  legalText: {
    marginLeft: responsiveWidth(1),
    color: 'black',
  },
  legalLink: {
    color: '#8F0592',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: 'black',
  },

  underlineStyleBase: {
    width: responsiveWidth(16),
    height: responsiveHeight(8),
    borderRadius: responsiveWidth(3),
    borderWidth: 1,
    borderBottomWidth: 1,
    backgroundColor: 'white',
    borderColor: 'black',
    fontSize: responsiveFontSize(2),
    color: 'black',
  },

  underlineStyleHighLighted: {
    borderColor: 'black',
  },
});

export default RegisterOtpScreen;
