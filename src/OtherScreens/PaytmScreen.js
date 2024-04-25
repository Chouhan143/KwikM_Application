import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Font6 from 'react-native-vector-icons/FontAwesome6';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Font from 'react-native-vector-icons/FontAwesome';
import Details from './Details';
import MyStats from './MyStats';
import Training from './Training';
import ActivityLoader from './ActivityLoader';
import useNetInfo from './useNetInfo';
import NoConnection from './NoConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaytmScreen = () => {
  // variables
  const naviagtion = useNavigation();
  const [stats, setStats] = useState(true);
  const [details, setDetails] = useState(false);
  const [training, setTraining] = useState(false);
  const [activityIndicator, setActivityIndicator] = useState(false);
  const route = useRoute();
  const [product_id, setProduct_id] = useState(0);
  const [commission, setCommission] = useState(0);
  const [screenName, setScreenName] = useState('paytm');
  const [content, setContent] = useState(null);
  const [paySprintLeadLists, setPaySprintLeadLists] = useState([]);
  const [user_id, setUser_Id] = useState(null);
  const netInfo = useNetInfo();

  const fetchData = async () => {
    try {
      const userId = await AsyncStorage.getItem('user_id');
      setUser_Id(JSON.parse(userId));
      if (userId) {
        await FetchPaySprintLead(userId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const FetchPaySprintLead = async userId => {
    try {
      await fetch('https://kwikm.in/dev_kwikm/api/pay_sprint_leads.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
        }),
      })
        .then(response => response.json())
        .then(apiData => {
          setPaySprintLeadLists(apiData.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    setActivityIndicator(true);
    fetchData();
    fetchCommissions();
    setTimeout(() => {
      setActivityIndicator(false);
    }, 1000);
  }, []);

  // useFocusEffect to fetch data when the component comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, []),
  );

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
      console.log('commission data>>>>', data);
      setCommission(data.paytm[0]);
    }
  };

  return (
    <>
      {netInfo ? (
        <>
          {activityIndicator ? (
            <View style={{flex: 1, backgroundColor: '#EAFFEA'}}>
              <ActivityLoader />
            </View>
          ) : (
            <>
              <View style={{flex: 1, backgroundColor: '#EAFFEA'}}>
                <View
                  style={{height: responsiveHeight(8), flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => naviagtion.goBack()}
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
                      flex: 4,
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
                        {' '}
                        Paytm
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <LinearGradient
                    colors={['#DB3DB8', '#3546A0']}
                    style={{
                      width: responsiveWidth(92),
                      height: responsiveHeight(10),
                      borderRadius: responsiveWidth(3),
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        paddingLeft: responsiveWidth(3),
                      }}>
                      <Image
                        source={{
                          uri: 'https://kwikm.in/live/images/paytm.png',
                        }}
                        style={{
                          borderRadius: responsiveWidth(3),
                          width: responsiveWidth(21),
                          height: responsiveHeight(8),
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                    <View style={{flex: 2, justifyContent: 'center'}}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2.2),
                          color: 'white',
                        }}>
                        Paytm UPI Registration
                      </Text>
                    </View>
                  </LinearGradient>
                </View>

                {/* <View style={{
                                        flexDirection: "row",
                                        justifyContent: "space-evenly",
                                        alignItems: "center",
                                        height: responsiveHeight(8),
                                        padding: responsiveWidth(5),
                                        paddingBottom:0
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setStats(true)
                                                setDetails(false)
                                                setTraining(false)
                                            }}
                                            style={{ justifyContent: "center", alignItems: "center" }}
                                        >
                                            <Text style={{ fontSize: responsiveFontSize(2), fontWeight: "700", color: "black" }}>My Stats</Text>
                                            <View
                                                style={{ width: responsiveWidth(33.33), height: responsiveWidth(0.5), backgroundColor: stats ? "#6D0E8F" : "#C6C6C6" }}>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setDetails(true)
                                                setStats(false)
                                                setTraining(false)
                                            }}
                                            style={{ justifyContent: "center", alignItems: "center" }}
                                        >
                                            <Text style={{ fontSize: responsiveFontSize(2), fontWeight: "700", color: "black" }}>Details</Text>
                                            <View
                                                style={{ width: responsiveWidth(33.33), height: responsiveWidth(0.5), backgroundColor: details ? "#6D0E8F" : "#C6C6C6" }}>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setTraining(true)
                                                setStats(false)
                                                setDetails(false)
                                            }}
                                            style={{ justifyContent: "center", alignItems: "center" }}
                                        >
                                            <Text style={{ fontSize: responsiveFontSize(2), fontWeight: "700", color: "black" }}>Training Videos</Text>
                                            <View
                                                style={{ width: responsiveWidth(33.33), height: responsiveWidth(0.5), backgroundColor: training ? "#6D0E8F" : "#C6C6C6" }}>
                                            </View>
                                        </TouchableOpacity>
                                    </View> */}
                {paySprintLeadLists ? (
                  <View
                    style={{
                      height: responsiveHeight(84),
                      alignItems: 'center',
                    }}>
                    <FlatList
                      data={paySprintLeadLists}
                      showsVerticalScrollIndicator={false}
                      style={{
                        marginTop: responsiveWidth(2),
                        height: responsiveHeight(40),
                      }}
                      renderItem={({item}) => {
                        const logo = item.customer_name[0];

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
                                    width: responsiveWidth(12),
                                    height: responsiveWidth(12),
                                    borderRadius: responsiveWidth(6),
                                    // backgroundColor:"red",
                                    backgroundColor: '#00D4C7',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Text
                                    style={{
                                      fontSize: responsiveFontSize(4.2),
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
                                      fontSize: responsiveFontSize(1.8),
                                    }}>
                                    {item.customer_name}
                                  </Text>
                                  {/* <Text style={{ color: 'black', fontSize: responsiveFontSize(1.6) }}>{item.email}</Text> */}
                                  <Text
                                    style={{
                                      color: 'black',
                                      fontSize: responsiveFontSize(1.7),
                                    }}>
                                    +91 {item.customer_mobile}
                                  </Text>
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
                                <Text style={{color: 'black'}}>
                                  {item.lead_date}
                                </Text>
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
                    <TouchableOpacity
                      onPress={() =>
                        naviagtion.navigate('addcustomer', {screenName})
                      }
                      style={{
                        width: responsiveWidth(16),
                        height: responsiveWidth(16),
                        borderRadius: responsiveWidth(8),
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#A2159C',
                        position: 'absolute',
                        margin: responsiveWidth(4),
                        zIndex: 1,
                        // marginTop:responsiveWidth(3)
                        top: responsiveHeight(70),
                        left: responsiveWidth(73),
                        // right:1
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(7),
                          color: 'white',
                        }}>
                        +
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <>
                    <View
                      style={{
                        width: responsiveWidth(92),
                        height: responsiveHeight(10),
                        borderRadius: responsiveWidth(3),
                        backgroundColor: 'white',
                        alignSelf: 'center',
                        flexDirection: 'row',
                        marginTop: responsiveWidth(5),
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image source={require('../../assets/mystats.png')} />
                      </View>
                      <View style={{flex: 3, justifyContent: 'center'}}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2.4),
                            color: '#690B6A',
                            fontWeight: '700',
                          }}>
                          Earn up to {commission}
                        </Text>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(1.9),
                            color: 'black',
                          }}>
                          On your customer’s successful card activation.
                        </Text>
                      </View>
                    </View>

                    <View style={{alignItems: 'center'}}>
                      <View
                        style={{
                          width: responsiveWidth(92),
                          height: responsiveHeight(32),
                          borderRadius: responsiveWidth(3),
                          backgroundColor: 'white',
                          marginTop: responsiveWidth(5),
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={require('../../assets/mystatsUser.png')}
                          />
                        </View>
                        <View style={{flex: 1}}>
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              flex: 1,
                            }}>
                            <Text
                              style={{
                                fontSize: responsiveFontSize(2.2),
                                color: 'black',
                                fontWeight: '700',
                              }}>
                              No Customer Found
                            </Text>
                          </View>
                          <View
                            style={{
                              flex: 1,
                              alignSelf: 'center',
                              width: responsiveWidth(80),
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: responsiveFontSize(1.9),
                                color: 'black',
                              }}>
                              Add customer and earn extra income. Track the
                              details anytime.
                            </Text>
                          </View>
                        </View>
                        <View
                          style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={() =>
                              naviagtion.navigate('addcustomer', {screenName})
                            }
                            style={{
                              width: responsiveWidth(70),
                              height: responsiveHeight(6),
                              borderRadius: responsiveWidth(10),
                              justifyContent: 'center',
                              alignItems: 'center',
                              backgroundColor: '#A2159C',
                            }}>
                            <Text
                              style={{
                                fontSize: responsiveFontSize(2),
                                color: 'white',
                              }}>
                              Add New Customer
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </>
                )}

                {/* <View>
                                    {stats ? <MyStats data={[commission, productId, screenName, paySprintLeadLists]} /> : null}
                                    {details ? <Details content={content} /> : null}
                                    {training ? <Training /> : null}
                                </View> */}
              </View>
            </>
          )}
        </>
      ) : (
        <NoConnection />
      )}
    </>
  );
};

export default PaytmScreen;
