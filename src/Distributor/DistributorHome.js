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
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Font from 'react-native-vector-icons/FontAwesome';
import Font6 from 'react-native-vector-icons/FontAwesome6';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import ActivityLoader from '../OtherScreens/ActivityLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useNetInfo from '../OtherScreens/useNetInfo';
import NoConnection from '../OtherScreens/NoConnection';
import LottieView from 'lottie-react-native';
import {addLogin_data} from '../redux/Slice';

const DistributorHome = () => {
  // states
  const [refreshing, setRefreshing] = useState(false);
  const [name, setName] = useState('');
  const [userId, setUserId] = useState('');
  const [banner, setBanner] = useState(null);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [activityIndicator, setActivityIndicator] = useState(false);
  const netinfo = useNetInfo();
  const [lead_balance, setLeadBalance] = useState(0);
  const [actual_balance, setActualBalance] = useState(0);
  const [socialIcons, setSocialIcons] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const reduxRecentTransactions = useSelector(
    state => state.details.recentTransactions,
  );
  const storedUserDetailes = useSelector(state => state.details.login_data);

  useEffect(() => {
    AsyncStorage.setItem('login', JSON.stringify(true));
    FetchBalance();
    getUserDetails();
    FetchRecentTransactions();
    BannerImg();
    fetchSocialIcons()
    BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    return () => {
      // Remove the custom back button handler when the component unmounts
      BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
    };
  }, []);

  const getUserDetails = async () => {
    await AsyncStorage.getItem('user_details').then(details => {
      // console.log('distributor: ', details);
      dispatch(addLogin_data(JSON.parse(details)));
    });
    await AsyncStorage.getItem('name').then(user_name => {
      const user = JSON.parse(user_name);
      setName(user.split(' ')[0]);
    });
  };

  const BannerImg = async () => {
    await fetch('https://kwikm.in/dev_kwikm/api/app_banner.php', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(img => {
        setBanner(img);
      });
  };

  const FetchRecentTransactions = async () => {
    const ob = {
      user_id: storedUserDetailes.user_id,
    };
    try {
      const response = await fetch(
        'https://kwikm.in/dev_kwikm/api/upline_trans_history.php',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            iv: 'cW0rMzBoS1VwM08xY1JpSXM3OWx6dz09',
            'x-api-key':
              'SW1MNk5lTERieEI4emQvaE43U0tvK1ZyVUs5V2RQMkdVZEZYay9POCswZlo2bk9yN1BTa0hYZnU0NU9ORG42WQ==',
          },
          body: JSON.stringify(ob),
        },
      );
      setRefreshing(false);
      if (response.ok) {
        const recentTransactionData = await response.json();
        // console.log(recentTransactionData)
        setActivityIndicator(false);
        setRecentTransactions(recentTransactionData);
      } else {
        setRecentTransactions([]);
        setActivityIndicator(false);
      }
    } catch (error) {
      // console.log('Failed to fetch recent transactions', error);
    }
  };

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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    FetchBalance();
    getUserDetails();
    FetchRecentTransactions();
    BannerImg();
  }, []);

  return (
    <>
      {netinfo ? (
        <>
          {activityIndicator ? (
            <ActivityLoader />
          ) : (
            <ScrollView
              refreshControl={
                <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
              }
              showsVerticalScrollIndicator={false}
              style={{
                width: responsiveWidth(100),
                height: responsiveHeight(100),
                backgroundColor: '#eaffea',
              }}>
              <StatusBar backgroundColor="#eaffea" />
              <View style={styles.main_container}>
                <View>
                  <View style={styles.name_sec}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingLeft: responsiveWidth(1),
                      }}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('userProfile')}
                        style={styles.name_sec_user}>
                        <Font5
                          name="user-alt"
                          size={responsiveWidth(5)}
                          color="white"
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={{flex: 4.5, flexDirection: 'row'}}>
                      <View
                        style={{
                          flex: 1.2,
                          flexDirection: 'row',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(2),
                            color: 'black',
                          }}>
                          Hii,
                        </Text>
                        <Text style={styles.name_txt}> {name}</Text>
                      </View>
                      <View
                        style={{
                          flex: 2.5,
                          flexShrink: 2,
                          justifyContent: 'center',
                          alignItems: 'flex-start',
                          paddingLeft: responsiveWidth(1),
                        }}>
                        <Image
                          style={{
                            marginLeft: responsiveWidth(4),
                            width: responsiveWidth(25),
                            height: responsiveHeight(4),
                          }}
                          source={{
                            uri: 'https://kwikm.in/live/images/app-logo.png',
                          }}
                        />
                      </View>
                    </View>

                    <View style={styles.name_sec_icon}>
                      <TouchableOpacity>
                        <Font
                          name="bell"
                          size={responsiveWidth(6)}
                          color="red"
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* Distributor home screen banner */}
                  <FlatList
                    data={banner}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                      <TouchableOpacity style={styles.gradient_container}>
                        <Image
                          source={{uri: item.image_url}}
                          style={{
                            width: responsiveWidth(94),
                            height: responsiveHeight(17),
                            borderRadius: responsiveWidth(3),
                            resizeMode: 'contain',
                          }}
                        />
                      </TouchableOpacity>
                    )}
                  />

                  <View style={styles.help_details}>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('trainingVideo')}
                      style={styles.help_details_item1}>
                      <View
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
                      </View>
                      <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={styles.help_details_item_txt}>LIVE</Text>
                        <Text style={styles.help_details_item_txt}>
                          TRAINING
                        </Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => navigation.navigate('myTeamDistributor')}
                      style={styles.help_details_item2}>
                      <View
                        style={{
                          flex: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View style={styles.help_details_item_img2}>
                          <Font5
                            name="user-friends"
                            size={responsiveWidth(5.2)}
                            color="#065399"
                          />
                        </View>
                      </View>
                      <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={styles.help_details_item_txt}>MY</Text>
                        <Text style={styles.help_details_item_txt}>TEAM</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => navigation.navigate('help')}
                      style={styles.help_details_item3}>
                      <View
                        style={{
                          flex: 2,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View style={styles.help_details_item_img3}>
                          <Font5
                            name="headset"
                            size={responsiveWidth(5.4)}
                            color="#065399"
                          />
                        </View>
                      </View>
                      <View style={{flex: 1, alignItems: 'center'}}>
                        <Text style={styles.help_details_item_txt}>GET</Text>
                        <Text style={styles.help_details_item_txt}>HELP</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Earning section */}
              <View style={{width: responsiveWidth(100)}}>
                {/*  wallet amount */}
                <View
                  style={{
                    height: responsiveHeight(8),
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity>
                    <LinearGradient
                      colors={['#4DA3C9', '#8DF0E4']}
                      style={{
                        width: responsiveWidth(42.4),
                        height: responsiveHeight(8),
                        borderRadius: responsiveWidth(3),
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        borderWidth: responsiveWidth(0.2),
                        borderColor: '#FFDDDD',
                      }}>
                      <View
                        style={{
                          flex: 1.3,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            width: responsiveWidth(13),
                            height: responsiveWidth(13),
                            borderRadius: responsiveWidth(6.5),
                            backgroundColor: '#D4F7FF',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Font6
                            name="wallet"
                            size={responsiveWidth(6.5)}
                            color="#065399"
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 2,
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                          paddingRight: responsiveWidth(3),
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(1.8),
                            color: 'white',
                            fontWeight: '700',
                          }}>
                          Lead Wallet
                        </Text>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(1.7),
                            color: 'white',
                          }}>
                          {lead_balance}.00
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <LinearGradient
                      colors={['#9D51FF', '#EF8BFF']}
                      style={{
                        width: responsiveWidth(42),
                        height: responsiveHeight(8),
                        borderRadius: responsiveWidth(3),
                        backgroundColor: 'white',
                        flexDirection: 'row',
                        borderWidth: responsiveWidth(0.2),
                        borderColor: '#FFDDDD',
                      }}>
                      <View
                        style={{
                          flex: 1.3,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            width: responsiveWidth(13),
                            height: responsiveWidth(13),
                            borderRadius: responsiveWidth(6.5),
                            backgroundColor: '#D4F7FF',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Font5
                            name="rupee-sign"
                            size={responsiveWidth(6.5)}
                            color="#065399"
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 2,
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                          paddingRight: responsiveWidth(3),
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(1.8),
                            color: 'white',
                            fontWeight: '700',
                          }}>
                          Actual Wallet
                        </Text>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(1.7),
                            color: 'white',
                          }}>
                          {actual_balance}.00
                        </Text>
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>

              {/* recent transactions */}
              <View style={{flex: 1}}>
                <View>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: 'black',
                      fontWeight: '700',
                      margin: responsiveWidth(3),
                      marginLeft: responsiveWidth(4),
                    }}>
                    Recent Transactions
                  </Text>
                </View>

                {/* recent transaction ui and api  */}
                <View
                  style={{
                    alignItems: 'center',
                    paddingBottom: responsiveWidth(15),
                  }}>
                  {recentTransactions.length > 0 ? (
                    <>
                      <FlatList
                        data={
                          reduxRecentTransactions.length == 0
                            ? recentTransactions
                            : reduxRecentTransactions
                        }
                        style={{marginBottom: responsiveWidth(6)}}
                        renderItem={({item}) => {
                          const logo =
                            item.logo === null
                              ? item.name[0].toUpperCase()
                              : item.logo;
                          // console.log(logo)

                          return (
                            <View
                              style={{
                                width: responsiveWidth(94),
                                height: responsiveHeight(8),
                                backgroundColor: 'white',
                                borderRadius: responsiveWidth(3),
                                flexDirection: 'row',
                                margin: responsiveWidth(1.5),
                                borderWidth: 1,
                                borderRadius: responsiveWidth(3),
                                borderColor: '#DADADA',
                              }}>
                              <View
                                style={{
                                  flex: 1.2,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                {item.logo ? (
                                  <Image
                                    source={{uri: logo}}
                                    style={{
                                      width: responsiveWidth(14),
                                      height: responsiveWidth(14),
                                      borderRadius: responsiveWidth(7),
                                      resizeMode: 'cover',
                                    }}
                                  />
                                ) : (
                                  <View
                                    style={{
                                      width: responsiveWidth(14),
                                      height: responsiveWidth(14),
                                      borderRadius: responsiveWidth(7),
                                      justifyContent: 'center',
                                      alignItems: 'center',
                                      backgroundColor: '#7BD7FF',
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: responsiveFontSize(4.2),
                                        color: 'black',
                                        fontWeight: '700',
                                      }}>
                                      {logo}
                                    </Text>
                                  </View>
                                )}
                              </View>
                              <View style={{flex: 3, justifyContent: 'center'}}>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1.8),
                                    color: 'black',
                                    fontWeight: '700',
                                  }}>
                                  {item.title}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1.7),
                                    color: 'black',
                                    fontWeight: '400',
                                  }}>
                                  Dist: {item.name} [ID: {item.product_id}]
                                </Text>
                              </View>
                              <View
                                style={{
                                  flex: 1.2,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}>
                                  <Font5 name="rupee-sign" color="#0D950A" />
                                  <Text
                                    style={{
                                      fontSize: responsiveFontSize(1.7),
                                      color: '#0D950A',
                                      fontWeight: '700',
                                    }}>
                                    {' '}
                                    {item.commission}.00
                                  </Text>
                                </View>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1.6),
                                    color: 'black',
                                    fontWeight: '400',
                                  }}>
                                  {item.date}
                                </Text>
                              </View>
                            </View>
                          );
                        }}
                      />
                    </>
                  ) : (
                    <View
                      style={{
                        width: responsiveWidth(100),
                        height: responsiveHeight(30),
                        // backgroundColor: "red",
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <LottieView
                        source={require('../../assets/noDataFound.json')}
                        style={{
                          width: responsiveWidth(50),
                          height: responsiveHeight(20),
                        }}
                        autoPlay
                        loop
                      />
                      <View style={{height: responsiveHeight(3)}}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: responsiveFontSize(2.2),
                            fontWeight: '700',
                          }}>
                          No Recent Transaction Available . . .
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>

              {/* social icon */}
              <View
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
                        style={{marginHorizontal: responsiveWidth(4)}}
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
              </View>
            </ScrollView>
          )}
        </>
      ) : (
        <NoConnection />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  main_container: {
    width: responsiveWidth(100),
    height: responsiveHeight(43),
    padding: responsiveWidth(2),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:"red"
  },
  name_sec: {
    width: responsiveWidth(100),
    height: responsiveHeight(7),
    flexDirection: 'row',
    // backgroundColor:"pink"
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
    fontSize: responsiveFontSize(2.5),
    color: 'black',
    fontWeight: '700',
    // marginHorizontal: responsiveWidth(1)
  },
  name_sec_icon: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradient_container: {
    width: responsiveWidth(100),
    height: responsiveHeight(18),
    // borderRadius: responsiveWidth(6),
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:"yellow"
  },
  withdraw_container: {
    width: responsiveWidth(100),
    height: responsiveHeight(16),
    alignItems: 'center',
    // backgroundColor:"yellow"
  },
  help_details: {
    width: responsiveWidth(100),
    height: responsiveHeight(16),
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  help_details_item1: {
    width: responsiveWidth(26),
    height: responsiveHeight(13),
    backgroundColor: '#bfffda',
    borderRadius: responsiveWidth(6),
    borderWidth: responsiveWidth(0.2),
    borderColor: '#FFDDDD',
  },
  help_details_item2: {
    width: responsiveWidth(26),
    height: responsiveHeight(13),
    backgroundColor: '#bfffda',
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
    fontSize: responsiveFontSize(1.5),
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

export default DistributorHome;
