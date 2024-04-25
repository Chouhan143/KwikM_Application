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
import Font5 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation, useRoute} from '@react-navigation/native';
import ActivityLoader from '../OtherScreens/ActivityLoader';
import LottieView from 'lottie-react-native';
import useNetInfo from '../OtherScreens/useNetInfo';
import NoConnection from '../OtherScreens/NoConnection';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EarningDetailsCorporate = () => {
  // variables
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState([]);
  const [activityIndicator, setActivityIndicator] = useState(false);
  const netinfo = useNetInfo();
  const route = useRoute();
  const distributor_id = route.params.distributor_id;
  const distributor_name = route.params.distributor_name;
  const distributor_balance = route.params.distributor_balance;
  const distributor_logo = route.params.logo;

  useEffect(() => {
    setActivityIndicator(true);
    FethchTransactions();
  }, []);

  const FethchTransactions = async () => {
    try {
      await fetch('https://kwikm.in/dev_kwikm/api/transaction_history.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          iv: 'cW0rMzBoS1VwM08xY1JpSXM3OWx6dz09',
          'x-api-key':
            'SW1MNk5lTERieEI4emQvaE43U0tvK1ZyVUs5V2RQMkdVZEZYay9POCswZlo2bk9yN1BTa0hYZnU0NU9ORG42WQ==',
        },
        body: JSON.stringify({user_id: distributor_id}),
      })
        .then(resposne => resposne.json())
        .then(apiData => {
          if (apiData.length > 0) {
            setActivityIndicator(false);
            setTransactions(apiData);
          } else {
            setActivityIndicator(false);
            setTransactions([]);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {netinfo ? (
        <>
          {activityIndicator ? (
            <View style={{flex: 1, backgroundColor: '#eaffea'}}>
              <ActivityLoader />
            </View>
          ) : (
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
                      Earning Details
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{flex: 1}}>
                {/* distributor section */}
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      width: responsiveWidth(94),
                      height: responsiveHeight(8),
                      backgroundColor: 'white',
                      borderRadius: responsiveWidth(3),
                      flexDirection: 'row',
                    }}>
                    <View
                      style={{
                        flex: 1.2,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {distributor_logo.length > 1 ? (
                        <Image
                          source={{uri: distributor_logo}}
                          style={{
                            width: responsiveWidth(12),
                            height: responsiveWidth(12),
                            borderRadius: responsiveWidth(6),
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
                            {distributor_logo}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View style={{flex: 2, justifyContent: 'center'}}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.8),
                          color: 'black',
                          fontWeight: '700',
                        }}>
                        {distributor_name}
                      </Text>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.7),
                          color: 'black',
                          fontWeight: '400',
                        }}>
                        ID: {distributor_id}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontSize: responsiveFontSize(1.6),
                          color: 'black',
                          fontWeight: '400',
                        }}>
                        Balance
                      </Text>
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
                          {distributor_balance}.00
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('corpRetailerList', {
                            Dist_id:distributor_id,
                          })
                        }
                        style={{
                          width: responsiveWidth(24),
                          paddingVertical: responsiveWidth(2),
                          borderRadius: responsiveWidth(1),
                          backgroundColor: '#CB01CF',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: responsiveFontSize(1.8),
                            color: 'white',
                          }}>
                          view retailers
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                {/* transaction history */}
                <View>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(2),
                      color: 'black',
                      fontWeight: '700',
                      margin: responsiveWidth(3),
                      marginLeft: responsiveWidth(4),
                    }}>
                    Transaction History
                  </Text>
                </View>

                <View style={{flex: 1}}>
                  {transactions.length > 0 ? (
                    <View>
                      <FlatList
                        data={transactions}
                        renderItem={({item}) => {
                          return (
                            <>
                              <View style={{alignItems: 'center'}}>
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
                                      flex: 3,
                                      justifyContent: 'center',
                                      paddingLeft: responsiveWidth(4),
                                    }}>
                                    <Text
                                      style={{
                                        fontSize: responsiveFontSize(1.8),
                                        color: 'black',
                                        fontWeight: '700',
                                      }}>
                                      Commission Received
                                    </Text>
                                    <Text
                                      style={{
                                        fontSize: responsiveFontSize(1.7),
                                        color: 'black',
                                        fontWeight: '400',
                                      }}>
                                      Lead Code: {item.lead_code}
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
                                      <Font5
                                        name="rupee-sign"
                                        color="#0D950A"
                                      />
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
                              </View>
                            </>
                          );
                        }}
                      />
                    </View>
                  ) : (
                    <View
                      style={{
                        height: responsiveHeight(60),
                        justifyContent: 'center',
                        alignItems: 'center',
                        // backgroundColor:"red"
                      }}>
                      <View>
                        <LottieView
                          source={require('../../assets/noDataFound.json')}
                          style={{
                            width: responsiveWidth(80),
                            height: responsiveHeight(45),
                          }}
                          autoPlay
                          loop
                        />
                      </View>

                      <View style={{height: responsiveHeight(3)}}>
                        <Text
                          style={{
                            color: 'black',
                            fontSize: responsiveFontSize(2.2),
                            fontWeight: '700',
                          }}>
                          No Transaction Found For This Distributor . . .
                        </Text>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}
        </>
      ) : (
        <NoConnection />
      )}
    </>
  );
};

export default EarningDetailsCorporate;

