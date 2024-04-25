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
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import useNetInfo from '../OtherScreens/useNetInfo';
import NoConnection from '../OtherScreens/NoConnection';
import LottieView from 'lottie-react-native';
import ActivityLoader from '../OtherScreens/ActivityLoader';
import {useSelector} from 'react-redux';

const CorpRetailerList = () => {
  // variables
  const navigation = useNavigation();
  const netinfo = useNetInfo();
  const route = useRoute();
  const [activityIndicator, setActivityIndicator] = useState(false);
  const [myRetailerList, setMyRetailerList] = useState([]);
  const distributor_id = route.params.Dist_id;
  //   console.log(distributor_id)

  useFocusEffect(
    React.useCallback(() => {
      setActivityIndicator(true);
      FetchMyRetailerList();
    }, []),
  );

  const FetchMyRetailerList = async () => {
    const ob = {
      user_id: distributor_id,
    };
    try {
      await fetch('https://kwikm.in/dev_kwikm/api/my_downline.php', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          iv: 'cW0rMzBoS1VwM08xY1JpSXM3OWx6dz09',
          'x-api-key':
            'SW1MNk5lTERieEI4emQvaE43U0tvK1ZyVUs5V2RQMkdVZEZYay9POCswZlo2bk9yN1BTa0hYZnU0NU9ORG42WQ==',
        },
        body: JSON.stringify(ob),
      })
        .then(response => response.json())
        .then(myRetailerListData => {
          // console.log(myRetailerListData)
          if (myRetailerListData.length > 0) {
            // dispatch(addMyDistibutorList(myDistributorsListData))
            setMyRetailerList(myRetailerListData);
          } else {
            setMyRetailerList([]);
          }
          setTimeout(() => {
            setActivityIndicator(false);
          }, 300);
        });
    } catch (error) {
      console.log('Failed to fetch recent transactions', error);
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
                      Available retailers
                    </Text>
                  </View>
                </View>
              </View>

              <View style={{flex: 1}}>
                {myRetailerList.length > 0 ? (
                  <View>
                    <FlatList
                      data={myRetailerList}
                      style={{marginBottom: responsiveWidth(2)}}
                      renderItem={({item}) => {
                        const logo = item.logo
                          ? 'https://s3-alpha-sig.figma.com/img/84db/5113/c2841571834c3cd25628689742a5efea?Expires=1701648000&Signature=ifwqttdhyo9FKMnEZeOP8JRhFFrpmoQYcNQ1vbuYsG4E2lr9UeHo0hFSyG39XMs6TEXJcP8v-pVtmUhoMRtYgFhZfsAJduV9P8j4d9GJuwQoyjG2~9~WiYSCT8LdrY6I848LkiA7GwhcGN5FIhh-AGzWsv0DtFDOdnrBhdQ-5zVJbEnY9gx8uZht582ySIIGUCj0wYoGEfNSgTN8MhDWsFzaKb--k8ovAjWK7xoNSW~M1HGtBki4a-x3t7uSm7iPWl0gbZ7yTGnC1hMkIT5EhsMrAq0BT1VumaMbVNMjl~kwudws77IhRtTlhWHoWTFsMVT-rWbUlfnd5gUc3fr~GQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4'
                          : item.name.length > 0
                          ? item.name[0].toUpperCase()
                          : '?';
                        // console.log(item.name)
                        const retailer_id = item.id;
                        const retailer_name = item.name;
                        const retailer_balance = item.balance;

                        return (
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
                                  flex: 1.2,
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}>
                                {logo.length > 1 ? (
                                  <Image
                                    source={{uri: logo}}
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
                                  {item.name}
                                </Text>
                                <Text
                                  style={{
                                    fontSize: responsiveFontSize(1.7),
                                    color: 'black',
                                    fontWeight: '400',
                                  }}>
                                  ID: {item.id}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flex: 1.2,
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
                                    {item.balance}.00
                                  </Text>
                                </View>
                              </View>
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
                          height: responsiveHeight(45),
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
                        No retailers are available for this distributor...
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

export default CorpRetailerList;
