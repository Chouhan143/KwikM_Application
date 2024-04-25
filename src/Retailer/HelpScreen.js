import {
  View,
  Text,
  Linking,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Font6 from 'react-native-vector-icons/FontAwesome6';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Font from 'react-native-vector-icons/MaterialCommunityIcons';

import LottieView from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import useNetInfo from '../OtherScreens/useNetInfo';
import NoConnection from '../OtherScreens/NoConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActivityLoader from '../OtherScreens/ActivityLoader';
import {addMyDistibutorList} from '../redux/Slice';

const HelpScreen = () => {
  // variables
  const navigation = useNavigation();
  const netinfo = useNetInfo();
  const [userId, setUserId] = useState(null);
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [upline_details, setUpline_Details] = useState({});
  const [company_details, setCompany_details] = useState({});
  const [userRole, setUserRole] = useState(null);
  // const reduxMyDistributorsList = useSelector(state => state.details.myDistributorsList)
  const token = useSelector(state => state.details.login_data.auth_token);
  const [auth_token, setAuth_Token] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      getUserDetails();
      FetchHelpDetails();
    }, [userId, auth_token]),
  );

  const getUserDetails = async () => {
    await AsyncStorage.getItem('user_id').then(user_id => {
      setUserId(JSON.parse(user_id));
    });
    await AsyncStorage.getItem('auth_token').then(auth => {
      // console.log(auth)
      setAuth_Token(JSON.parse(auth));
    });
    await AsyncStorage.getItem('role').then(role => {
      setUserRole(JSON.parse(role));
    });
  };
  // console.log(userRole)

  // All Lead
  const FetchHelpDetails = async () => {
    // console.log("fetch help details function",auth_token)
    let ob = {
      user_id: userId,
      auth_token: auth_token,
    };
    // console.log(ob)
    await fetch('https://kwikm.in/dev_kwikm/api/get_help.php', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(ob),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status) {
          setCompany_details(data.company_details);
          setUpline_Details(data.upline_details);
        }
      });
  };

  return (
    <>
      {netinfo ? (
        <View style={{flex: 1, backgroundColor: '#EAFFEA'}}>
          <StatusBar backgroundColor="#EAFFEA" />

          <View style={{height: responsiveHeight(8), flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
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
                  Get Help
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              // backgroundColor: "red",
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <LottieView
              source={require('../../assets/support.json')}
              style={{width: responsiveWidth(50), height: responsiveWidth(48)}}
              autoPlay
            />
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.5),
                  color: '#A2159C',
                  fontWeight: '700',
                }}>
                How can we help you ?
              </Text>
            </View>
          </View>

          {/* details */}
          <View style={{flex: 2.2}}>

            {/* upline details */}
            {userRole === 1 ? null : (
              <View style={{flex: 1}}>
                <View style={{flex: 1, justifyContent: 'flex-end'}}>
                  <Text
                    style={{
                      marginLeft: responsiveWidth(2),
                      fontSize: responsiveFontSize(2.2),
                      color: 'black',
                      fontWeight: '700',
                    }}>
                    Upline Details :
                  </Text>
                </View>

                <View
                  style={{
                    flex: 4,
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      width: responsiveWidth(30),
                      height: responsiveHeight(15),
                      borderRadius: responsiveWidth(3),
                      backgroundColor: '#BFFFDA',
                      justifyContent: 'center',
                      alignItems: 'center',
                      elevation: 1,
                    }}>
                    <View>
                      <Font5
                        name="user-alt"
                        size={responsiveWidth(6)}
                        color="#A2159C"
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.8),
                        color: 'black',
                        marginTop: responsiveWidth(4),
                      }}>
                      <Text style={{color: 'black', fontWeight: '400'}}>
                        {upline_details.name
                          ? upline_details.name
                          : 'Not Available'}
                      </Text>
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => {
                      const phoneNumber = upline_details.phone;
                      if (phoneNumber) {
                        const phoneUrl = `tel:${phoneNumber}`;
                        Linking.openURL(phoneUrl);
                      }
                    }}
                    style={{
                      width: responsiveWidth(30),
                      height: responsiveHeight(15),
                      borderRadius: responsiveWidth(3),
                      backgroundColor: '#BFFFDA',
                      justifyContent: 'center',
                      alignItems: 'center',
                      elevation: 1,
                    }}>
                    <View>
                      <Font5
                        name="phone-alt"
                        size={responsiveWidth(6)}
                        color="#A2159C"
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.8),
                        color: 'black',
                        marginTop: responsiveWidth(4),
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontWeight: '400',
                        }}>
                        {upline_details.phone
                          ? upline_details.phone
                          : 'Not Available'}
                      </Text>
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      const emailAddress = upline_details.email;
                      if (emailAddress) {
                        const emailUrl = `mailto:${emailAddress}`;
                        Linking.openURL(emailUrl);
                      }
                    }}
                    style={{
                      width: responsiveWidth(30),
                      height: responsiveHeight(15),
                      borderRadius: responsiveWidth(3),
                      backgroundColor: '#BFFFDA',
                      justifyContent: 'center',
                      alignItems: 'center',
                      elevation: 1,
                    }}>
                    <View>
                      <Font
                        name="email"
                        size={responsiveWidth(6.8)}
                        color="#A2159C"
                      />
                    </View>
                    <Text
                      style={{
                        fontSize: responsiveFontSize(1.8),
                        color: 'black',
                        marginTop: responsiveWidth(4),
                      }}>
                      <Text
                        style={{
                          color: 'black',
                          fontWeight: '400',
                        }}>
                        {upline_details.email
                          ? upline_details.email
                          : 'Not Available'}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* company details */}
            <View style={{flex: 1}}>
              <View style={{flex: 1, justifyContent: 'flex-end'}}>
                <Text
                  style={{
                    marginLeft: responsiveWidth(2),
                    fontSize: responsiveFontSize(2.2),
                    color: 'black',
                    fontWeight: '700',
                  }}>
                  Company details:
                </Text>
              </View>

              <View
                style={{
                  flex: 4,
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <View
                  style={{
                    width: responsiveWidth(30),
                    height: responsiveHeight(15),
                    borderRadius: responsiveWidth(3),
                    backgroundColor: '#BFFFDA',
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 1,
                  }}>
                  <View>
                    <Font5
                      name="user-alt"
                      size={responsiveWidth(6)}
                      color="#A2159C"
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.8),
                      color: 'black',
                      marginTop: responsiveWidth(4),
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: '400',
                      }}>
                      {company_details.name
                        ? company_details.name
                        : 'Not Available'}
                    </Text>
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    const phoneNumber = company_details.phone;
                    if (phoneNumber) {
                      const phoneUrl = `tel:${phoneNumber}`;
                      Linking.openURL(phoneUrl);
                    }
                  }}
                  style={{
                    width: responsiveWidth(30),
                    height: responsiveHeight(15),
                    borderRadius: responsiveWidth(3),
                    backgroundColor: '#BFFFDA',
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 1,
                  }}>
                  <View>
                    <Font5
                      name="phone-alt"
                      size={responsiveWidth(6)}
                      color="#A2159C"
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.8),
                      color: 'black',
                      marginTop: responsiveWidth(4),
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: '400',
                      }}>
                      {company_details.phone
                        ? company_details.phone
                        : 'Not Available'}
                    </Text>
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    const emailAddress = company_details.email;
                    if (emailAddress) {
                      const emailUrl = `mailto:${emailAddress}`;
                      Linking.openURL(emailUrl);
                    }
                  }}
                  style={{
                    width: responsiveWidth(30),
                    height: responsiveHeight(15),
                    borderRadius: responsiveWidth(3),
                    backgroundColor: '#BFFFDA',
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 1,
                  }}>
                  <View>
                    <Font
                      name="email"
                      size={responsiveWidth(6.8)}
                      color="#A2159C"
                    />
                  </View>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.8),
                      color: 'black',
                      marginTop: responsiveWidth(4),
                    }}>
                    <Text
                      style={{
                        color: 'black',
                        fontWeight: '400',
                      }}>
                      {company_details.email
                        ? company_details.email
                        : 'Not Available'}
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* view just to manage flex */}
            <View style={{flex:1}}></View>
          </View>
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
    padding: 16,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
});
export default HelpScreen;
