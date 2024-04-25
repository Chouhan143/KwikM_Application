import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Font6 from 'react-native-vector-icons/FontAwesome6';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Font from 'react-native-vector-icons/FontAwesome';
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

const MyLeadRetailer = () => {
  const navigation = useNavigation();
  const netinfo = useNetInfo();
  const [userId, setUserId] = useState(null);
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [myLeadList, setLeadList] = useState([]);
  const [auth_token, setAuth_Token] = useState('');
  const storedUserDetailes = useSelector(state => state.details.login_data);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     setActivityIndicator(true);
  //     FetchRetailerAllLead();
  //   }, [userId, auth_token]),
  // );
  
  useEffect(() => {
    setActivityIndicator(true);
    FetchRetailerAllLead();
  }, []);

  // const getUserDetails = async () => {
  //   await AsyncStorage.getItem("user_id").then((user_id) => {
  //     setUserId(JSON.parse(user_id))
  //   })
  //   await AsyncStorage.getItem("auth_token").then((token) => {
  //     setAuth_Token(JSON.parse(token))
  //   })
  // }

  const FetchRetailerAllLead = async () => {
    // setActivityIndicator(true)
    try {
      let ob = {
        user_id: storedUserDetailes.user_id,
        auth_token: storedUserDetailes.auth_token,
      };
      let response = await fetch(
        'https://kwikm.in/dev_kwikm/api/my_leads.php',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(ob),
        },
      );
      let allLeadData = await response.json();
      // console.log(allLeadData)
      if (allLeadData.status) {
        setLeadList(allLeadData.data);
      } else {
        setLeadList([]);
      }

      setTimeout(() => {
        setActivityIndicator(false);
      }, 300);
    } catch (error) {
      console.error('Error fetching leads:', error);
      setLeadList([]);
    }
  };

  return (
    <>
      {activityIndicator ? (
        <View style={{flex: 1, backgroundColor: '#eaffea'}}>
          <ActivityLoader />
        </View>
      ) : (
        <>
          {netinfo ? (
            <View style={{flex: 1, backgroundColor: '#EAFFEA'}}>
              <StatusBar backgroundColor="#EAFFEA" />

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
                      My Lead
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{flex: 1, alignItems: 'center'}}>
                {myLeadList.length > 0 ? (
                  <View>
                    <FlatList
                      data={myLeadList}
                      showsVerticalScrollIndicator={false}
                      // style={{ marginBottom: responsiveHeight(0) }}
                      renderItem={({item}) => {
                        const logo = item.full_name[0]
                          ? item.full_name[0].toUpperCase()
                          : null;

                        return (
                          <View
                            style={{
                              width: responsiveWidth(94),
                              height: responsiveHeight(15),
                              borderRadius: responsiveWidth(3),
                              backgroundColor: 'white',
                              marginTop: responsiveWidth(3),
                              marginBottom: responsiveWidth(3),
                              borderWidth: 1,
                              borderColor: '#E3E3E3',
                            }}>
                            <View style={{flex: 2, flexDirection: 'row'}}>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    width: responsiveWidth(14),
                                    height: responsiveWidth(14),
                                    borderRadius: responsiveWidth(7),
                                    backgroundColor: '#00D4C7',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: responsiveFontSize(4.5),
                                      color: 'white',
                                      fontWeight: '700',
                                    }}>
                                    {logo}
                                  </Text>
                                </View>
                              </View>
                              <View style={{flex: 4, flexDirection: 'row'}}>
                                <View
                                  style={{flex: 3, justifyContent: 'center'}}>
                                  <Text
                                    style={{
                                      color: 'black',
                                      fontWeight: '700',
                                      fontSize: responsiveFontSize(1.7),
                                    }}>
                                    {item.full_name}
                                  </Text>
                                  {/* <Text style={{ color: 'black', fontSize: responsiveFontSize(1.6) }}>Name : {item.full_name}</Text> */}
                                  <Text
                                    style={{
                                      color: 'black',
                                      fontSize: responsiveFontSize(1.6),
                                    }}>
                                    {item.email}
                                  </Text>
                                  <Text
                                    style={{
                                      color: 'black',
                                      fontSize: responsiveFontSize(1.6),
                                    }}>
                                    +91 {item.mobile_no}
                                  </Text>
                                </View>
                                <View style={{flex: 2, alignItems: 'center'}}>
                                  <View
                                    style={{
                                      width: responsiveWidth(25),
                                      height: responsiveHeight(3),
                                      borderRadius: responsiveWidth(2),
                                      backgroundColor: '#99FFAF',
                                      marginTop: responsiveWidth(3),
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      flexDirection: 'row',
                                    }}>
                                    <Font5 name="rupee-sign" color="black" />
                                    <Text
                                      style={{
                                        fontSize: responsiveFontSize(1.65),
                                        marginLeft: responsiveWidth(1.5),
                                        color: 'black',
                                        fontWeight: '700',
                                      }}>
                                      {item.required_amount}
                                    </Text>
                                  </View>
                                </View>
                              </View>
                            </View>
                            <View
                              style={{
                                height: responsiveWidth(0.2),
                                backgroundColor: '#BFBFBF',
                              }}
                            />
                            <View style={{flex: 1, flexDirection: 'row'}}>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <Text style={{color: 'black'}}>{item.pan}</Text>
                              </View>
                              <View
                                style={{
                                  width: responsiveWidth(0.3),
                                  backgroundColor: '#BFBFBF',
                                }}
                              />
                              {item.status === 'Success' ? (
                                <View
                                  style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      color: '#03A013',
                                      fontWeight: '700',
                                    }}>
                                    {item.status}
                                  </Text>
                                </View>
                              ) : null}
                              {item.status === 'InProgress' ? (
                                <View
                                  style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      color: '#FF6B00',
                                      fontWeight: '700',
                                    }}>
                                    {item.status}
                                  </Text>
                                </View>
                              ) : (
                                <View
                                  style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      color: '#FF6B00',
                                      fontWeight: '700',
                                    }}>
                                    {item.status}
                                  </Text>
                                </View>
                              )}
                              {item.status === 'Rejected' ? (
                                <View
                                  style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      color: '#FF0000',
                                      fontWeight: '700',
                                    }}>
                                    {item.status}
                                  </Text>
                                </View>
                              ) : null}
                            </View>
                          </View>
                        );
                      }}
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      height: responsiveHeight(80),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <View>
                      <LottieView
                        source={require('../../assets/noDataFound.json')}
                        style={{
                          width: responsiveWidth(80),
                          height: responsiveHeight(40),
                        }}
                        autoPlay
                        loop
                      />
                    </View>

                    <View style={{height: responsiveHeight(5)}}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: responsiveFontSize(2.2),
                          fontWeight: '700',
                        }}>
                        No Lead Found. . .
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          ) : (
            <NoConnection />
          )}
        </>
      )}
    </>
  );
};

export default MyLeadRetailer;
