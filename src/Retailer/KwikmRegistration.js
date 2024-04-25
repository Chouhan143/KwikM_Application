import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  StatusBar,
  Linking,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState, useMemo, useCallback} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunity from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useNetInfo from '../OtherScreens/useNetInfo';
import NoConnection from '../OtherScreens/NoConnection';

const KwikmRegistration = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [mobile_num, setMobile_Num] = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState(false);
  const [userId, setUserId] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [commission, setCommission] = useState(0);
  const [activityIndicator, setActivityIndicatiors] = useState(false);
  const netInfo = useNetInfo();
  const [err, setErr] = useState('');

  useEffect(() => {
    setActivityIndicatiors(true);
    getUserDetails();
    setTimeout(() => {
      setActivityIndicatiors(false);
    }, 1000);
  }, []);

  const getUserDetails = async () => {
    await AsyncStorage.getItem('user_id').then(user_id => {
      setUserId(JSON.parse(user_id));
    });
    await AsyncStorage.getItem('auth_token').then(auth => {
      // console.log(auth)
      setAuthToken(JSON.parse(auth));
    });
  };

  const submitHandler = async () => {
    const payload = {
      user_id: userId,
      auth_token: authToken,
      name: name,
      email: email,
      phone: mobile_num,
    };
    // console.log(payload);
    let response = await fetch(
      'https://kwikm.in/dev_kwikm/api/kwikm_onboarding.php',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(payload),
      },
    );

    const apiResponse = await response.json();
    // console.log(apiResponse);
    if (apiResponse.success) {
      setStatus(true);
      setMsg(apiResponse.success);
      setTimeout(() => {
        setMsg('');
        // setName('');
        // setEmail('');
        // setMobile_Num('');
      }, 4000);
    } else {
      setStatus(false);
      setErr(apiResponse.error);
      setTimeout(() => {
        setErr('');
      }, 2000);
    }
  };

  const handleShare = () => {
    // console.log(ob)
    const message = `

  KwikM App :

  Name: ${name}\n
  Phone: ${mobile_num}\n
  Email:${email}\n
  Joining Link: ${'joining link'}\n
  Playstore Link:  https://play.google.com/store/apps/details?id=com.kwikm.app\n`;

    const whatsappUrl = `whatsapp://send?phone=+91${mobile_num}&text=${encodeURIComponent(
      message,
    )}`;
    Linking.openURL(whatsappUrl).catch(err => {
      console.error('Error opening WhatsApp:', err);
      Alert.alert(
        'WhatsApp Error',
        'An error occurred while trying to open WhatsApp. Please make sure it is installed on your device.',
        [
          {
            text: 'Ok',
            onPress: () => {},
          },
        ],
        {cancelable: false},
      );
    });
  };

  const fetchCommissions = async () => {
    let response = await fetch(
      'https://kwikm.in/dev_kwikm/api/commission_api.php',
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      },
    );
    if (response.ok) {
      let data = await response.json();
      // console.log('commission data>>>>', data);
      setCommission(data.pice[0]);
    }
  };


  return (
    <>
      {netInfo ? (
        <>
          <View style={{flex: 1, backgroundColor: '#eaffea'}}>
            {/* screen title */}
            <View style={{height: responsiveHeight(7), flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Font5
                  name="arrow-left"
                  color="black"
                  size={responsiveWidth(6)}
                />
              </TouchableOpacity>
              <View
                style={{
                  flex: 6,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2.5),
                      color: 'black',
                      fontWeight: '700',
                    }}>
                    KwikM Registration
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                flex: 1,
                marginHorizontal: responsiveWidth(3),
                borderRadius: responsiveWidth(3),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
              }}>
              <Image
                source={{
                  uri: 'https://kwikm.in/live/images/app-logo.png',
                }}
                style={{
                  width: responsiveWidth(96),
                  height: responsiveHeight(30),
                  resizeMode: 'contain',
                  borderRadius: responsiveWidth(4),
                }}
              />
            </View>

            <View style={{flex: 2}}>
              <View
                style={{
                  flex: 1,
                  //   backgroundColor: 'red',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    color: 'black',
                    fontWeight: '500',
                    marginLeft: responsiveWidth(4),
                  }}>
                  KwikM onboarding
                </Text>
              </View>

              <View
                style={{
                  flex: 6,
                  alignItems: 'center',
                }}>
                <View style={style.inputFieldContainer}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Font5
                      name="user-alt"
                      size={responsiveWidth(5.5)}
                      color="#535353"
                    />
                  </View>
                  <View style={{flex: 5, justifyContent: 'center'}}>
                    <TextInput
                      placeholder="Full Name"
                      placeholderTextColor={'gray'}
                      onChangeText={txt => setName(txt)}
                      value={name}
                      style={{
                        fontSize: responsiveFontSize(2),
                        color: 'black',
                      }}
                    />
                  </View>
                </View>

                <View style={style.inputFieldContainer}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Font5
                      name="phone-alt"
                      size={responsiveWidth(5.5)}
                      color="#535353"
                    />
                  </View>
                  <View style={{flex: 5, justifyContent: 'center'}}>
                    <TextInput
                      placeholder="Mobile Number"
                      placeholderTextColor={'gray'}
                      keyboardType="numeric"
                      value={mobile_num}
                      maxLength={10}
                      onChangeText={txt => setMobile_Num(txt)}
                      style={{
                        fontSize: responsiveFontSize(2),
                        color: 'black',
                      }}
                    />
                  </View>
                </View>

                <View style={style.inputFieldContainer}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaterialCommunity
                      name="email"
                      size={responsiveWidth(6.8)}
                      color="#535353"
                    />
                  </View>
                  <View style={{flex: 5, justifyContent: 'center'}}>
                    <TextInput
                      placeholder="Email"
                      placeholderTextColor={'gray'}
                      autoCapitalize="none"
                      value={email}
                      onChangeText={txt => setEmail(txt)}
                      style={{
                        fontSize: responsiveFontSize(2),
                        color: 'black',
                      }}
                    />
                  </View>
                </View>
              </View>

              {status ? (
                <View>
                  <Text
                    style={{
                      alignSelf: 'center',
                      marginBottom: responsiveWidth(3),
                      fontSize: responsiveFontSize(2),
                      color: 'green',
                    }}>
                    {msg}
                  </Text>
                </View>
              ) : (
                <View>
                  <Text
                    style={{
                      alignSelf: 'center',
                      marginBottom: responsiveWidth(3),
                      fontSize: responsiveFontSize(2),
                      color: 'red',
                    }}>
                    {err}
                  </Text>
                </View>
              )}

              {/* button container */}
              <View style={style.btnContainer}>
                {status ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'space-evenly',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setName('');
                        setEmail('');
                        setMobile_Num('');
                        setStatus(null);
                      }}
                      style={style.cancleBtn}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: 'black',
                        }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={handleShare}
                      style={style.shareBtn}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: 'white',
                          fontWeight: '700',
                        }}>
                        Share On Whatsapp
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}
                      style={style.cancleBtn}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: 'black',
                        }}>
                        Cancel
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={submitHandler}
                      style={style.activeBtn}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: 'white',
                          fontWeight: '700',
                        }}>
                        Save
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>
            </View>
          </View>
        </>
      ) : (
        <NoConnection />
      )}
    </>
  );
};

const style = StyleSheet.create({
  inputFieldContainer: {
    width: responsiveWidth(94),
    height: responsiveHeight(6),
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: responsiveWidth(3),
    marginVertical: responsiveWidth(2),
    borderWidth: 1,
    borderColor: '#BCB4B4',
  },
  activeBtn: {
    width: responsiveWidth(42),
    paddingVertical: responsiveWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0545A6',
    borderWidth: 1,
    borderColor: '#0545A6',
    borderRadius: responsiveWidth(3),
  },
  shareBtn: {
    width: responsiveWidth(42),
    paddingVertical: responsiveWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CB01CF',
    borderWidth: 1,
    borderColor: '#CB01CF',
    borderRadius: responsiveWidth(3),
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    //   backgroundColor: 'red',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cancleBtn: {
    width: responsiveWidth(42),
    paddingVertical: responsiveWidth(3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#0545A6',
    borderRadius: responsiveWidth(3),
  },
});
export default KwikmRegistration;
