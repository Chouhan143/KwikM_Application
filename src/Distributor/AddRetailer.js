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
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
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
import {useDispatch, useSelector} from 'react-redux';
import {add_distributor_leadMessage} from '../redux/Slice';

const AddRetailer = () => {
  const naviagtion = useNavigation();
  const route = useRoute();
  const [full_name, setFull_Name] = useState('');
  const [mobile_nun, setMobile_Num] = useState('');
  const [email, setEmail] = useState('');
  const [mpin, setMpin] = useState('');
  const netInfo = useNetInfo();
  const [msg, setMsg] = useState('');
  const [userId, setUserId] = useState(null);
  const [storedToken, setStoredToken] = useState('');
  const [buttonStatus, setButtonStatus] = useState(true);
  const [err, setErr] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);
  const [nextScreenStatus, setNextScreenStatus] = useState(false);
  // const [nextScreen, setNextScreen] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    getUserDetails();
  }, [userId, storedToken]);

  useEffect(() => {
    CorporateValidation();
  }, [full_name, mobile_nun, email, mpin]);

  const getUserDetails = async () => {
    await AsyncStorage.getItem('user_id').then(user_id => {
      setUserId(JSON.parse(user_id));
      // console.log("check user id",user_id)
    });
    await AsyncStorage.getItem('auth_token').then(token => {
      setStoredToken(JSON.parse(token));
    });
  };

  const CorporateValidation = () => {
    if (
      full_name.length >= 2 &&
      mobile_nun.length == 10 &&
      mpin.length == 4 &&
      email.length >= 11
    ) {
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
  };

  const AddDistributor = async () => {
    const ob = {
      user_id: userId,
      name: full_name.trim(),
      phone: mobile_nun.trim(),
      email: email.trim(),
      mpin: mpin.trim(),
      upline: userId,
      auth_token: storedToken,
    };

    try {
      await fetch('https://kwikm.in/dev_kwikm/api/add_retailer.php', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(ob),
      })
        .then(response => response.json())
        .then(addDistributorStatus => {
          if (addDistributorStatus.message) {
            setErrorStatus(false);
            setMsg(addDistributorStatus.message);
            let details = {
              name: full_name,
              phone: mobile_nun,
              email: email,
              mpin: mpin,
            };
            dispatch(add_distributor_leadMessage(details));
            setTimeout(() => {
              naviagtion.navigate('leadMessage');
              setMsg('');
              setEmail('');
              setFull_Name('');
              setMobile_Num('');
              setMpin('');
            }, 3000);
          } else if (addDistributorStatus.error) {
            // console.log(addDistributorStatus.error)
            setErr(addDistributorStatus.error);
            setErrorStatus(true);
            setTimeout(() => {
              setErr('');
            }, 3000);
          }
        });
    } catch (error) {
      console.log('Catch Error: ', error);
    }
  };

  const goBack = async () => {
    setNextScreenStatus(false);
    naviagtion.navigate('Home');
  };

  return (
    <View style={{flex: 1, backgroundColor: '#eaffea'}}>
      {netInfo ? (
        <>
          <StatusBar backgroundColor={'#eaffea'} />
          <View style={{height: responsiveHeight(8), flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => naviagtion.goBack()}
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
                  Add Retailer
                </Text>
              </View>
            </View>
          </View>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            {nextScreenStatus ? (
              <>
                <View
                  style={{
                    width: responsiveWidth(100),
                    height: responsiveHeight(65),
                    padding: responsiveWidth(5),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2.5),
                      fontWeight: '700',
                      color: '#2C582E',
                    }}>
                    Retailer added successfully, We sent
                  </Text>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2.5),
                      fontWeight: '700',
                      color: '#2C582E',
                    }}>
                    Whatsapp message with link.
                  </Text>
                </View>

                <View
                  style={{
                    width: responsiveWidth(100),
                    height: responsiveHeight(30),
                    justifyContent: 'center',
                    alignItems: 'center',
                    // backgroundColor:"red"
                  }}>
                  <TouchableOpacity
                    onPress={goBack}
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
                      Go Back
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
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
                        color="#535353"
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
                        color="#535353"
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
                        maxLength={10}
                        placeholder="Mobile Number"
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
                        color="#535353"
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
                        placeholder="Email Address"
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
                      <Font5
                        name="lock"
                        size={responsiveWidth(5.5)}
                        color="#535353"
                      />
                    </View>

                    <View style={{flex: 5}}>
                      <TextInput
                        onChangeText={text => setMpin(text)}
                        style={{
                          fontSize: responsiveFontSize(2),
                          color: 'black',
                        }}
                        keyboardType="numeric"
                        value={mpin}
                        maxLength={4}
                        placeholder="MPIN"
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
                    <View
                      style={{
                        height: responsiveHeight(5),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{color: 'red', fontSize: responsiveFontSize(2)}}>
                        {err}
                      </Text>
                    </View>
                  ) : (
                    <View
                      style={{
                        height: responsiveHeight(5),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
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
                      onPress={AddDistributor}
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
            )}
          </View>
        </>
      ) : (
        <NoConnection />
      )}
    </View>
  );
};

export default AddRetailer;
