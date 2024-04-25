import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Modal,
  FlatList,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState, useMemo} from 'react';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Font6 from 'react-native-vector-icons/FontAwesome6';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Font from 'react-native-vector-icons/FontAwesome';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useNetInfo from '../OtherScreens/useNetInfo';
import NoConnection from '../OtherScreens/NoConnection';
import {useSelector} from 'react-redux';
import ActivityLoader from './ActivityLoader';
import {encode} from 'base-64';

const PurchaseInsuarance = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [full_name, setFull_Name] = useState('');
  const [mobile_nun, setMobile_Num] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [user_id, setUser_id] = useState('');
  const [auth_token, setAuth_token] = useState('');
  const insuarance = route.params.name;
  const netInfo = useNetInfo();
  const [buttonStatus, setButtonStatus] = useState(false);
  const [err, setErr] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);
  const [msg, setMsg] = useState('');
  const [activityIndicator, setActivityIndicator] = useState(false);
  const storedUserDetailes = useSelector(state => state.details.login_data);
  // console.log(storedUserDetailes)

  useEffect(() => {
    getUserDetails();
  }, [insuarance]);

  useEffect(() => {
    CheckValue();
  }, [full_name, mobile_nun, email, state, address]);

  const getUserDetails = async () => {
    await AsyncStorage.getItem('user_id').then(id =>
      setUser_id(JSON.parse(id)),
    );
    await AsyncStorage.getItem('auth_token').then(token =>
      setAuth_token(JSON.parse(token)),
    );
  };

  const CheckValue = async () => {
    if (
      full_name.length >= 2 &&
      mobile_nun.length == 10 &&
      email.length >= 11 &&
      state.length >= 2 &&
      address.length >= 3
    ) {
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
  };

  // Insuarance
  const openInsuaranceSite = async () => {
    setActivityIndicator(true);
    const url =
      'https://partnerapi.insurancedekho.com/iam-pos/api/v1/user/auth/partner';
    const username = 'growwell';
    const password = 'DINSGBcMzf';

    const base64credentials = encode(`${username}:${password}`);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Basic ${base64credentials}`);
    headers.append('x-api-key', 'OH7J6dNXE8p5GvcF8QZY0RopF3fK');
    headers.append('x-correlation-id', '1705484329808');

    const ob = {
      referenceAuthId: `${storedUserDetailes.phone}`,
      mobile: `${storedUserDetailes.phone}`,
    };
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(ob),
      });
      const token = response.headers.get('One-Time-Token');
      if (token) {
        setActivityIndicator(false);
        navigation.navigate('openWebView', {token});
      } else {
        setActivityIndicator(false);
      }
    } catch (error) {
      console.log('Catch error: >>>>>' + error);
    }
  };

  const Purchase = async () => {
    const ob = {
      name: full_name,
      phone: mobile_nun,
      email: email,
      insurance: insuarance,
      state: state,
      address: address,
      auth_token: auth_token,
      user_id: user_id,
    };
    // console.log(ob)
    const response = await fetch(
      'https://kwikm.in/dev_kwikm/api/insurance_enquiry.php',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(ob),
      },
    )
      .then(response => response.json())
      .then(data => {
        // console.log(data)
        openInsuaranceSite();
        if (data.status) {
          setErrorStatus(false);
          setMsg(data.message);
          // setTimeout(() => {
          //   setMsg('');
          //   setFull_Name('');
          //   setMobile_Num('');
          //   // setMobile_Num('')
          //   setEmail('');
          //   setAddress('');
          //   setState('');
          // }, 500);
        } else {
          setErr(data.error);
          // setTimeout(() => {
          //   setErrorStatus(true);
          //   setErr('');
          // }, 500);
        }
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#eaffea'}}>
      {activityIndicator ? (
        <View style={{flex: 1, backgroundColor: '#eaffea'}}>
          <ActivityLoader />
        </View>
      ) : (
        <>
          {netInfo ? (
            <>
              <StatusBar backgroundColor={'#eaffea'} />

              <View style={{height: responsiveHeight(8), flexDirection: 'row'}}>
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
                    flex: 5,
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
                      Purchase Insurance
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <>
                  <View
                    style={{
                      width: responsiveWidth(100),
                      height: responsiveHeight(60),
                      padding: responsiveWidth(5),
                    }}>
                    <View
                      style={{
                        marginTop: responsiveWidth(4),
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderRadius: responsiveWidth(3),
                        borderColor: '#DADADA',
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Font5
                          name="user-alt"
                          size={responsiveWidth(5.2)}
                          color="#686868"
                        />
                      </View>
                      <View style={{flex: 5}}>
                        <TextInput
                          onChangeText={text => setFull_Name(text)}
                          placeholderTextColor={'gray'}
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}
                          value={full_name}
                          placeholder="Full Name"
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        marginTop: responsiveWidth(4),
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderRadius: responsiveWidth(3),
                        borderColor: '#DADADA',
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Font5
                          name="phone-alt"
                          size={responsiveWidth(5.5)}
                          color="#686868"
                        />
                      </View>
                      <View style={{flex: 5}}>
                        <TextInput
                          onChangeText={text => setMobile_Num(text)}
                          placeholderTextColor={'gray'}
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}
                          keyboardType="numeric"
                          value={mobile_nun}
                          placeholder="Mobile Number"
                          maxLength={10}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        marginTop: responsiveWidth(4),
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderRadius: responsiveWidth(3),
                        borderColor: '#DADADA',
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Font
                          name="envelope"
                          size={responsiveWidth(5.5)}
                          color="#686868"
                        />
                      </View>
                      <View style={{flex: 5}}>
                        <TextInput
                          onChangeText={text => setEmail(text)}
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}
                          value={email}
                          placeholder="Email"
                          placeholderTextColor={'gray'}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        marginTop: responsiveWidth(4),
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderRadius: responsiveWidth(3),
                        borderColor: '#DADADA',
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Font6
                          name="location-dot"
                          size={responsiveWidth(5.5)}
                          color="#686868"
                        />
                      </View>
                      <View style={{flex: 5}}>
                        <TextInput
                          onChangeText={text => setState(text)}
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}
                          value={state}
                          placeholder="State"
                          placeholderTextColor={'gray'}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        marginTop: responsiveWidth(4),
                        flexDirection: 'row',
                        backgroundColor: 'white',
                        borderWidth: 1,
                        borderRadius: responsiveWidth(3),
                        borderColor: '#DADADA',
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Font6
                          name="map-location-dot"
                          size={responsiveWidth(5.5)}
                          color="#686868"
                        />
                      </View>
                      <View style={{flex: 5}}>
                        <TextInput
                          onChangeText={text => setAddress(text)}
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}
                          value={address}
                          placeholder="Address"
                          placeholderTextColor={'gray'}
                        />
                      </View>
                    </View>
                  </View>

                  <View
                    style={{
                      width: responsiveWidth(100),
                      height: responsiveHeight(30),
                      justifyContent: 'center',
                      alignItems: 'center',
                      // backgroundColor:"red"
                    }}>
                    {errorStatus ? (
                      <View style={{height: responsiveHeight(3)}}>
                        <Text
                          style={{
                            color: 'red',
                            fontSize: responsiveFontSize(2),
                          }}>
                          {err}
                        </Text>
                      </View>
                    ) : (
                      <View style={{height: responsiveHeight(3)}}>
                        <Text
                          style={{
                            color: 'green',
                            fontSize: responsiveFontSize(2),
                          }}>
                          {msg}
                        </Text>
                      </View>
                    )}

                    {buttonStatus ? (
                      <TouchableOpacity
                        onPress={Purchase}
                        style={{
                          width: responsiveWidth(80),
                          height: responsiveHeight(6),
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#A2159C',
                          borderRadius: responsiveWidth(10),
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'white',
                            fontWeight: '700',
                          }}>
                          Continue
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        disabled
                        style={{
                          width: responsiveWidth(80),
                          height: responsiveHeight(6),
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: 'gray',
                          borderRadius: responsiveWidth(10),
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'white',
                            fontWeight: '700',
                          }}>
                          Continue
                        </Text>
                      </TouchableOpacity>
                    )}

                    <View
                      style={{
                        marginTop: responsiveWidth(3),
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}>
                      <Font
                        name="whatsapp"
                        color="#02A208"
                        size={responsiveWidth(5)}
                      />
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.8),
                          color: 'black',
                          marginLeft: responsiveWidth(4),
                        }}>
                        We will notify you on WhatsApp{' '}
                      </Text>
                    </View>
                  </View>
                </>
              </View>
            </>
          ) : (
            <NoConnection />
          )}
        </>
      )}
    </View>
  );
};

export default PurchaseInsuarance;
