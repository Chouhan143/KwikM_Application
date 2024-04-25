import {
  View,
  Text,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  BackHandler,
  Alert,
  StyleSheet,
  StatusBar,
  Linking,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import User from 'react-native-vector-icons/FontAwesome';

import Left from 'react-native-vector-icons/Feather';
import Font from 'react-native-vector-icons/FontAwesome';
import Font6 from 'react-native-vector-icons/FontAwesome6';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import ActivityLoader from '../OtherScreens/ActivityLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NoConnection from '../OtherScreens/NoConnection';
import useNetInfo from '../OtherScreens/useNetInfo';
import {addCategoryId, addProductId, addLogin_data} from '../redux/Slice';

const HomeScreen = () => {
  // states
  const [refreshing, setRefreshing] = useState(false);
  const [sellData, setSellData] = useState();
  const [highEarnData, setHighEarnData] = useState();
  const [name, setName] = useState('');
  const [userProfile, setUserProfile] = useState(null);
  const [lead_balance, setLeadBalance] = useState(null);
  const [actual_balance, setActualBalance] = useState(null);
  const [highEarningCategory, setHighEarningCategory] = useState('');
  const [socialIcons, setSocialIcons] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [activityIndicator, setActivityIndicator] = useState(false);
  const netinfo = useNetInfo();
  const storedUserDetailes = useSelector(state => state.details.login_data);

  useEffect(() => {
    AsyncStorage.setItem('login', JSON.stringify(true));
    getUserDetails();
    FetchBalance();
    SellDataFun();
    // HighEarningFun();
    // BannerImg();
    fetchSocialIcons();
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, [highEarningCategory, lead_balance, actual_balance]);

  const getUserDetails = async () => {
    try {
      await AsyncStorage.getItem('user_details').then(details => {
        const userDetails = JSON.parse(details);
        console.log('user details 1 >>>', userDetails);
        dispatch(addLogin_data(userDetails));
        const userName = userDetails.name;
        const userImage = userDetails.image;
        console.log(userImage);
        setUserProfile(userImage);
        setName(userName.split(' ')[0]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackButton = () => {
    if (navigation.isFocused()) {
      // Show an alert only when on the home screen
      Alert.alert(
        'Exit App',
        'Do you want to exit the app?',
        [
          {
            text: 'No',
            onPress: () => {},
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => {
              // Clear the login status when the user exits
              BackHandler.exitApp();
            },
          },
        ],
        {cancelable: false},
      );
    } else {
      // Navigate to the previous screen if not on the home screen
      navigation.goBack();
    }
    return true; // Prevent the default back button behavior
  };

  // balance
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

  // sell and earn  (working api)
  const SellDataFun = () => {
    fetch('https://kwikm.in/dev_kwikm/api/allcategory.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        iv: 'cW0rMzBoS1VwM08xY1JpSXM3OWx6dz09',
        'x-api-key':
          'SW1MNk5lTERieEI4emQvaE43U0tvK1ZyVUs5V2RQMkdVZEZYay9POCswZlo2bk9yN1BTa0hYZnU0NU9ORG42WQ==',
      },
    })
      .then(response => response.json())
      .then(data => {
        setSellData(data.data);
        console.log('selldata', data.data);
      });
  };

  // high earning
  // const HighEarningFun = async () => {
  //   setActivityIndicator(true);
  //   await fetch('https://kwikm.in/dev_kwikm/api/higher_earnings.php', {
  //     method: 'POST',
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       // console.log(data.higher_earnings[0])
  //       setHighEarningCategory(data.higher_earnings[0]);
  //     });

  //   await fetch('https://kwikm.in/dev_kwikm/api/productByCategory.php', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       iv: 'cW0rMzBoS1VwM08xY1JpSXM3OWx6dz09',
  //       'x-api-key':
  //         'SW1MNk5lTERieEI4emQvaE43U0tvK1ZyVUs5V2RQMkdVZEZYay9POCswZlo2bk9yN1BTa0hYZnU0NU9ORG42WQ==',
  //     },
  //     body: JSON.stringify({
  //       category_id: highEarningCategory,
  //     }),
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       setHighEarnData(data.data);
  //       setRefreshing(false);
  //       setTimeout(() => {
  //         setActivityIndicator(false);
  //       }, 300);
  //     });
  // };

  // refreshing function
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getUserDetails();
    FetchBalance();
    SellDataFun();
    // HighEarningFun();
    // BannerImg();
  }, [highEarningCategory, lead_balance, userProfile]);

  // Social Icons
  const fetchSocialIcons = async () => {
    await fetch('https://kwikm.in/dev_kwikm/api/social_links.php', {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => setSocialIcons(data));
  };

  // const Icons = [
  //   {
  //     icon: 'https://cdn-icons-png.flaticon.com/512/145/145802.png',
  //     id: '1',
  //     name: 'Facebook',
  //     url: 'https://www.facebook.com/profile.php?id=61553748237205',
  //   },
  //   {
  //     icon: 'https://cdn-icons-png.flaticon.com/512/145/145802.png',
  //     id: '2',
  //     name: 'Facebook',
  //     url: 'https://www.facebook.com/profile.php?id=61553748237205',
  //   },
  //   {
  //     icon: 'https://cdn-icons-png.flaticon.com/512/145/145802.png',
  //     id: '3',
  //     name: 'Facebook',
  //     url: 'https://www.facebook.com/profile.php?id=61553748237205',
  //   },
  //   {
  //     icon: 'https://cdn-icons-png.flaticon.com/512/145/145802.png',
  //     id: '4',
  //     name: 'Facebook',
  //     url: 'https://www.facebook.com/profile.php?id=61553748237205',
  //   },
  //   {
  //     icon: 'https://cdn-icons-png.flaticon.com/512/145/145802.png',
  //     id: '5',
  //     name: 'Facebook',
  //     url: 'https://www.facebook.com/profile.php?id=61553748237205',
  //   },
  // ];

  return (
    <>
      {activityIndicator ? (
        <View style={{flex: 1, backgroundColor: '#eaffea'}}>
          <ActivityLoader />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
          }
          style={{
            width: responsiveWidth(100),
            height: responsiveHeight(100),
            backgroundColor: '#eaffea',
          }}>
          {netinfo ? (
            <>
              <StatusBar
                backgroundColor="#2F4BAF"
                barStyle="light-content"
                // hidden={true}
              />

              <View
                style={{
                  backgroundColor: '#2F4BAF',
                  width: responsiveWidth(100),
                  height: responsiveHeight(20),
                  borderBottomLeftRadius: responsiveWidth(5),
                  borderBottomRightRadius: responsiveWidth(5),
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    padding: responsiveWidth(3),
                    paddingTop: responsiveHeight(2),
                  }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('userProfile')}>
                    <Image
                      source={require('../../assets/Vector.png')}
                      style={{
                        width: responsiveWidth(6),
                        height: responsiveWidth(6),
                      }}
                    />
                  </TouchableOpacity>

                  <Image
                    source={require('../../assets/K.png')}
                    style={{
                      width: responsiveWidth(8),
                      height: responsiveWidth(8),
                    }}
                  />
                </View>

                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: responsiveWidth(3),
                  }}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(3.7),
                      color: 'white',
                      fontWeight: '700',
                    }}>
                    Welcome <Text style={styles.name_txt}>{name}!</Text>
                  </Text>

                  <Image
                    source={
                      userProfile
                        ? {uri: userProfile}
                        : require('../../assets/mystatsUser.png')
                    }
                    // source={require('../../assets/mystatsUser.png')}
                    style={{
                      width: responsiveWidth(22),
                      height: responsiveWidth(22),
                      resizeMode: 'contain',
                      borderRadius: responsiveWidth(11),
                      borderWidth: 1,
                      borderColor: '#fff',
                      marginRight: responsiveWidth(7),
                    }}
                  />
                </View>
              </View>
              {/* header  */}

              <View style={styles.main_container}>
                <View>
                  <View
                    style={{
                      height: responsiveHeight(23),
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    {/* <TouchableOpacity> */}
                    <LinearGradient
                      colors={['#C7FFAD', '#C7FFAD']}
                      style={{
                        width: responsiveWidth(95),
                        height: responsiveHeight(20),
                        borderRadius: responsiveWidth(3),
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        borderWidth: responsiveWidth(0.2),
                        borderColor: '#FFDDDD',
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexDirection: 'row',
                          paddingHorizontal: responsiveWidth(4),
                          marginBottom: responsiveHeight(4),
                        }}>
                        <View>
                          <Text
                            style={{
                              color: '#000',
                              fontSize: responsiveFontSize(2),
                            }}>
                            Wallet Balance
                          </Text>
                          <Text
                            style={{
                              fontSize: responsiveFontSize(4.5),
                              fontWeight: '800',
                              color: '#000',
                            }}>
                            {actual_balance}/-
                          </Text>
                        </View>
                        <View>
                          <Image
                            source={require('../../assets/wallet1.png')}
                            style={{
                              width: responsiveWidth(30),
                              height: responsiveWidth(30),
                            }}
                          />
                        </View>
                      </View>

                      <View
                        style={{
                          width: responsiveWidth(95),
                          height: responsiveHeight(5),
                          backgroundColor: '#E698F9',
                          position: 'absolute',
                          bottom: 0,
                          borderBottomLeftRadius: responsiveWidth(3.5),
                          borderBottomRightRadius: responsiveWidth(3.5),
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexDirection: 'row',
                          paddingHorizontal: responsiveWidth(5),
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2.2),
                            color: '#000',
                            fontWeight: '800',
                          }}>
                          Lead Wallet
                        </Text>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2.2),
                            color: 'black',
                            fontWeight: '800',
                          }}>
                          Rs.{lead_balance} /-
                        </Text>
                      </View>
                    </LinearGradient>
                    {/* </TouchableOpacity> */}
                  </View>

                  <View style={styles.help_details}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('trainingVideo')}
                      style={styles.help_details_item1}>
                      {/* <View
                        style={{
                          flex: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View style={styles.help_details_item_img1}>
                          <Font5
                            name="desktop"
                            size={responsiveWidth(5.2)}
                            color="#065399"
                          />
                        </View>
                      </View> */}
                      <View
                        style={{
                          flex: 1,
                          // alignItems: 'center',
                          justifyContent: 'center',
                          paddingHorizontal: responsiveWidth(3),
                          paddingVertical: responsiveHeight(1),
                        }}>
                        <Text
                          style={[
                            styles.help_details_item_txt,
                            {
                              fontWeight: '800',
                              fontSize: responsiveFontSize(2.6),
                              alignItems: 'center',
                            },
                          ]}>
                          Training Videos
                        </Text>
                        <Text style={styles.help_details_item_txt}>
                          Get our expert Training Videos
                        </Text>

                        <Font5
                          name="video"
                          size={responsiveWidth(12)}
                          color="#277772"
                          style={{
                            alignSelf: 'flex-end',
                            paddingRight: responsiveWidth(3),
                            paddingTop: responsiveWidth(3),
                          }}
                        />
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => navigation.navigate('mylead')}
                      style={styles.help_details_item2}>
                      <View
                        style={{
                          flex: 1,
                          // alignItems: 'center',
                          justifyContent: 'center',
                          paddingHorizontal: responsiveWidth(3),
                          paddingVertical: responsiveHeight(2),
                        }}>
                        <Text
                          style={[
                            styles.help_details_item_txt,
                            {
                              fontWeight: '800',
                              fontSize: responsiveFontSize(2.6),
                              alignItems: 'center',
                            },
                          ]}>
                          My Leads
                        </Text>
                        <Text style={styles.help_details_item_txt}>
                          Checkout your added leads here
                        </Text>

                        <User
                          name="users"
                          size={responsiveWidth(11.5)}
                          color="#AF6060"
                          style={{
                            alignSelf: 'flex-end',
                            paddingRight: responsiveWidth(3),
                            paddingTop: responsiveWidth(3),
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* home screen banner */}
              </View>

              {/* Earning section */}
              <View style={{width: responsiveWidth(100)}}>
                {/* High earning section  */}

                {/* sell and earn section */}
                <View style={{flex: 1}}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginTop: responsiveHeight(2),
                    }}>
                    <View>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2.3),
                          color: '#585555',
                          fontWeight: '700',
                          margin: responsiveWidth(4),
                          marginTop: 0,
                        }}>
                        Sell & Earn
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        dispatch(addCategoryId(3));
                        navigation.navigate('products');
                      }}
                      style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(2.2),
                          color: '#0668C3',
                          fontWeight: '800',
                          marginRight: responsiveWidth(2),
                          marginBottom: responsiveWidth(3),
                          marginRight: responsiveHeight(2),
                        }}>
                        View All
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={sellData}
                    // horizontal
                    showsHorizontalScrollIndicator={false}
                    numColumns={2}
                    renderItem={({item}) => {
                      const id = item.id;
                      // console.log(id)

                      const iconColorMapping = {
                        'piggy-bank': '#793391',
                        'credit-card': 'green',
                        wallet: '#A40404',
                      };

                      const getColorForIcon = item => {
                        // Check if the icon exists in the color mapping
                        if (iconColorMapping[item.icon]) {
                          return iconColorMapping[item.icon];
                        } else {
                          // Default color if no mapping found
                          return 'black'; // Or any default color you prefer
                        }
                      };

                      return (
                        <>
                          <TouchableOpacity
                            onPress={() => {
                              dispatch(addCategoryId(id));
                              navigation.navigate('products');
                            }}
                            style={{
                              marginLeft: responsiveWidth(3),
                              marginRight: responsiveWidth(2),
                              marginBottom: responsiveWidth(4),
                              width: responsiveWidth(45),
                              height: responsiveHeight(17),
                              backgroundColor: '#D5FFBC',
                              borderRadius: responsiveWidth(5),
                              borderWidth: responsiveWidth(0.2),
                              borderColor: '#FFDDDD',
                            }}>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                              <View style={{flex: 1, justifyContent: 'center'}}>
                                <Text
                                  style={{
                                    marginLeft: responsiveWidth(3),
                                    fontSize: responsiveFontSize(2.2),
                                    fontWeight: '600',
                                    color: 'black',
                                    alignSelf: 'center',
                                  }}>
                                  {item.title}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flex: 1,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                  paddingTop: responsiveWidth(2),
                                }}>
                                {/* <View
                                  style={{
                                    width: responsiveWidth(10),
                                    height: responsiveWidth(10),
                                    borderRadius: responsiveWidth(5),
                                    backgroundColor: 'white',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}> */}
                                {item.icon ? (
                                  <Font6
                                    name={`${item.icon}`}
                                    size={responsiveWidth(7)}
                                    color={getColorForIcon(item)}
                                  />
                                ) : (
                                  <Font6
                                    name="circle-question"
                                    size={responsiveWidth(7)}
                                    color="gray"
                                  />
                                )}
                              </View>
                            </View>
                            {/* </View> */}
                            <View
                              style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <Text
                                style={{
                                  fontWeight: '400',
                                  color: '#000',
                                  alignSelf: 'center',
                                  marginLeft: responsiveWidth(3),
                                  marginBottom: responsiveWidth(5),
                                  fontSize: responsiveFontSize(2.2),
                                  marginBottom: responsiveHeight(5),
                                }}>
                                Earn upto
                              </Text>
                            </View>
                            <View
                              style={{
                                width: responsiveWidth(45),
                                height: responsiveHeight(4.5),
                                backgroundColor: '#154FA8',
                                position: 'absolute',
                                bottom: 0,
                                borderBottomLeftRadius: responsiveWidth(5),
                                borderBottomRightRadius: responsiveWidth(5),
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  color: '#fff',
                                  fontWeight: '500',
                                  fontSize: responsiveFontSize(2),
                                }}>
                                Rs.{item.commission}
                              </Text>
                            </View>
                          </TouchableOpacity>
                        </>
                      );
                    }}
                  />
                </View>
              </View>

              {/* Referal and subscription */}
              <View
                style={{
                  marginHorizontal: responsiveWidth(5),
                  marginVertical: responsiveHeight(2),
                }}>
                <Text
                  style={{
                    color: '#585555',
                    fontSize: responsiveFontSize(2.2),
                    fontWeight: '800',
                  }}>
                  Subscriptions
                </Text>
              </View>

              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: responsiveHeight(3),
                }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('apkSubscription')}>
                    <LinearGradient
                      colors={['#D5FFBC', '#D5FFBC']}
                      style={{
                        width: responsiveWidth(45),
                        height: responsiveHeight(10),
                        borderRadius: responsiveWidth(6),
                        flexDirection: 'row',
                        marginLeft: responsiveWidth(3),
                        marginRight: responsiveWidth(2),
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            width: responsiveWidth(10),
                            height: responsiveWidth(10),
                            borderRadius: responsiveWidth(5),
                            backgroundColor: '#154FA8',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={require('../../assets/VectorHand.png')}
                          />
                        </View>
                      </View>
                      <View style={{flex: 2, justifyContent: 'center'}}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2.2),
                            fontWeight: '700',
                            color: 'black',
                          }}>
                          APK Subscription
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('insuaranceProducts')}>
                    <LinearGradient
                      colors={['#D5FFBC', '#D5FFBC']}
                      style={{
                        width: responsiveWidth(45),
                        height: responsiveHeight(10),
                        borderRadius: responsiveWidth(6),
                        flexDirection: 'row',
                        marginLeft: responsiveWidth(3),
                        marginRight: responsiveWidth(2),
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            width: responsiveWidth(10),
                            height: responsiveWidth(10),
                            borderRadius: responsiveWidth(5),
                            backgroundColor: '#154FA8',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Image
                            source={require('../../assets/VectorInsurance.png')}
                            style={{resizeMode: 'contain'}}
                          />
                        </View>
                      </View>
                      <View style={{flex: 2, justifyContent: 'center'}}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2.2),
                            fontWeight: '700',
                            color: 'black',
                          }}>
                          Insurance Dekho
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </ScrollView>
              </View>

              {/* social icon */}
              {/* <View
                style={{
                  width: responsiveWidth(100),
                  // marginBottom: responsiveWidth(6),
                  paddingVertical: responsiveWidth(3),
                }}>
                <FlatList
                  data={socialIcons}
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  contentContainerStyle={{
                    // width: responsiveWidth(100),
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}
                  renderItem={({item}) => {
                    return (
                      <TouchableOpacity
                        style={{marginHorizontal: responsiveWidth(5)}}
                        onPress={() => Linking.openURL(item.url)}>
                        <Image
                          source={{uri: item.icon}}
                          style={{
                            width: responsiveWidth(16),
                            height: responsiveWidth(16),
                          }}
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    );
                  }}
                />
              </View> */}
            </>
          ) : (
            <>{activityIndicator ? <ActivityLoader /> : <NoConnection />}</>
          )}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  main_container: {
    width: responsiveWidth(100),
    height: responsiveHeight(45),
    padding: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:"red"
  },
  name_sec: {
    width: responsiveWidth(100),
    height: responsiveHeight(8),
    flexDirection: 'row',
  },
  name_sec_user: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    backgroundColor: '#A6A6A6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name_txt: {
    fontSize: responsiveFontSize(3),
    color: 'white',
    fontWeight: '700',
    // marginHorizontal: responsiveWidth(1)
  },
  name_sec_icon: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient_container: {
    width: responsiveWidth(95.5),
    height: responsiveHeight(16),
    // borderRadius: responsiveWidth(6),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:"yellow"
  },

  help_details: {
    width: responsiveWidth(100),
    height: responsiveHeight(20),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: responsiveHeight(1),
  },
  help_details_item1: {
    width: responsiveWidth(45),
    height: responsiveHeight(21),
    backgroundColor: '#B7FFFF',
    borderRadius: responsiveWidth(6),
    borderWidth: responsiveWidth(0.2),
    borderColor: '#FFDDDD',
  },
  help_details_item2: {
    width: responsiveWidth(45),
    height: responsiveHeight(21),
    backgroundColor: '#FFD3D3',
    borderRadius: responsiveWidth(6),
    borderWidth: responsiveWidth(0.2),
    borderColor: '#FFDDDD',
  },
  help_details_item3: {
    width: responsiveWidth(26),
    height: responsiveHeight(13),
    backgroundColor: '#bfffda',
    borderRadius: responsiveWidth(6),
    borderWidth: responsiveWidth(0.2),
    borderColor: '#FFDDDD',
  },
  help_details_item_img1: {
    width: responsiveWidth(13),
    height: responsiveWidth(13),
    borderRadius: responsiveWidth(6.5),
    backgroundColor: '#8effbe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  help_details_item_img2: {
    width: responsiveWidth(13),
    height: responsiveWidth(13),
    borderRadius: responsiveWidth(6.5),
    backgroundColor: '#8effbe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  help_details_item_img3: {
    width: responsiveWidth(13),
    height: responsiveWidth(13),
    borderRadius: responsiveWidth(6.5),
    backgroundColor: '#8effbe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  help_details_item_txt: {
    color: 'black',
    fontSize: responsiveFontSize(2.2),
  },

  sub_main_container2: {
    width: responsiveWidth(100),
    height: responsiveHeight(15),
    backgroundColor: 'white',
  },
  sub_main_container2_txt: {
    marginLeft: responsiveWidth(6),
    fontSize: responsiveFontSize(1.8),
    fontWeight: '400',
    color: 'black',
  },
  sub_main_container2_img: {
    width: responsiveWidth(18),
    flex: 1,
    backgroundColor: '#CBE4FC',
    alignSelf: 'flex-end',
    borderRadius: responsiveWidth(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
